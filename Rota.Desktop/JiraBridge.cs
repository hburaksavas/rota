using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Rota.Desktop;

public partial class MainWindow
{
    private static readonly HttpClient JiraClient = new(new HttpClientHandler { AllowAutoRedirect = false }) { Timeout = TimeSpan.FromSeconds(20) };
    private static readonly byte[] JiraEntropy = Encoding.UTF8.GetBytes("Rota.Jira.PAT.v1");
    private string JiraTokenPath => Path.Combine(_dataDirectory, "jira-pat.enc");

    private object JiraHasToken() => File.Exists(JiraTokenPath);

    private object JiraSaveToken(JsonElement payload)
    {
        var token = payload.GetProperty("token").GetString() ?? "";
        if (token.Trim().Length < 8 || token.Length > 2048) throw new InvalidOperationException("Jira PAT geçerli değil.");
        var encrypted = ProtectedData.Protect(Encoding.UTF8.GetBytes(token.Trim()), JiraEntropy, DataProtectionScope.CurrentUser);
        Directory.CreateDirectory(_dataDirectory);
        WriteAtomic(JiraTokenPath, encrypted);
        return null!;
    }

    private object JiraRemoveToken()
    {
        if (File.Exists(JiraTokenPath)) File.Delete(JiraTokenPath);
        return null!;
    }

    private object JiraOpenTokenPage(JsonElement payload)
    {
        var baseUrl = ValidateJiraBaseUrl(payload.GetProperty("baseUrl").GetString());
        var url = new Uri(baseUrl.AbsoluteUri.TrimEnd('/') + "/secure/ViewProfile.jspa?selectedTab=com.atlassian.pats.pats-plugin%3Ajira-user-personal-access-tokens");
        Process.Start(new ProcessStartInfo(url.ToString()) { UseShellExecute = true });
        return null!;
    }

    private object JiraOpenIssue(JsonElement payload)
    {
        var key = payload.GetProperty("issueKey").GetString() ?? "";
        if (!System.Text.RegularExpressions.Regex.IsMatch(key, "^[A-Z][A-Z0-9_]{0,29}-\\d{1,12}$")) throw new InvalidOperationException("Jira issue key geçersiz.");
        var baseUrl = ValidateJiraBaseUrl(payload.GetProperty("baseUrl").GetString());
        Process.Start(new ProcessStartInfo(new Uri(baseUrl.AbsoluteUri.TrimEnd('/') + "/browse/" + Uri.EscapeDataString(key)).ToString()) { UseShellExecute = true });
        return null!;
    }

    private async Task<object?> JiraListDashboards(JsonElement payload)
    {
        var baseUrl = payload.GetProperty("baseUrl").GetString();
        var result = await JiraRequestAsync(baseUrl, "/rest/api/2/dashboard");
        var values = result.ValueKind == JsonValueKind.Array ? result.EnumerateArray().ToArray() : GetArray(result, "dashboards");
        return values.Where(entry => Has(entry, "id") && Has(entry, "name")).Select(entry => new { id = String(entry, "id"), name = String(entry, "name"), viewUrl = OptionalString(entry, "view") }).ToArray();
    }

    private async Task<object?> JiraListFilters(JsonElement payload)
    {
        var baseUrl = payload.GetProperty("baseUrl").GetString();
        var results = new List<JsonElement>();
        foreach (var resource in new[] { "/rest/api/2/filter/favourite", "/rest/api/2/filter/my" })
        {
            try
            {
                var result = await JiraRequestAsync(baseUrl, resource);
                results.AddRange(result.ValueKind == JsonValueKind.Array ? result.EnumerateArray() : GetArray(result, "values"));
            }
            catch { }
        }
        return results.Where(entry => Has(entry, "id") && Has(entry, "name")).GroupBy(entry => String(entry, "id")).Select(group => group.First())
            .Select(entry => new { id = String(entry, "id"), name = String(entry, "name"), jql = OptionalString(entry, "jql") }).ToArray();
    }

    private async Task<object?> JiraFetchFilterIssues(JsonElement payload)
    {
        var filterId = payload.GetProperty("filterId").GetString() ?? "";
        if (!System.Text.RegularExpressions.Regex.IsMatch(filterId, "^\\d{1,20}$")) throw new InvalidOperationException("Jira filtresi geçersiz.");
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), "/rest/api/2/search", HttpMethod.Post,
            new { jql = $"filter = {filterId} ORDER BY updated DESC", fields = JiraFields, startAt = 0, maxResults = 100 });
        return MapJiraIssues(result, payload.GetProperty("baseUrl").GetString());
    }

    private async Task<object?> JiraListBoards(JsonElement payload)
    {
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), "/rest/agile/1.0/board?startAt=0&maxResults=100");
        return GetArray(result, "values").Where(entry => Has(entry, "id") && Has(entry, "name"))
            .Select(entry => new { id = String(entry, "id"), name = String(entry, "name"), type = OptionalString(entry, "type") ?? "" }).ToArray();
    }

    private async Task<object?> JiraListBoardProjects(JsonElement payload)
    {
        var boardId = JiraNumericId(payload.GetProperty("boardId").GetString(), "Jira board");
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), $"/rest/agile/1.0/board/{boardId}/project?startAt=0&maxResults=100");
        var values = result.ValueKind == JsonValueKind.Array ? result.EnumerateArray().ToArray() : GetArray(result, "values");
        return values.Where(entry => Has(entry, "id") && Has(entry, "key") && Has(entry, "name"))
            .Select(entry => new { id = String(entry, "id"), key = String(entry, "key"), name = String(entry, "name") }).ToArray();
    }

    private async Task<object?> JiraListSprints(JsonElement payload)
    {
        var boardId = JiraNumericId(payload.GetProperty("boardId").GetString(), "Jira board");
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), $"/rest/agile/1.0/board/{boardId}/sprint?state=active,future,closed&startAt=0&maxResults=100");
        return GetArray(result, "values").Where(entry => Has(entry, "id") && Has(entry, "name")).Select(entry => new
        {
            id = String(entry, "id"), name = String(entry, "name"), state = OptionalString(entry, "state") ?? "unknown",
            startDate = OptionalString(entry, "startDate"), endDate = OptionalString(entry, "endDate"), goal = OptionalString(entry, "goal")
        }).ToArray();
    }

    private async Task<object?> JiraFetchBoardIssues(JsonElement payload)
    {
        var boardId = JiraNumericId(payload.GetProperty("boardId").GetString(), "Jira board");
        var scope = payload.GetProperty("scope").GetString();
        var resource = scope switch
        {
            "backlog" => $"/rest/agile/1.0/board/{boardId}/backlog",
            "board" => $"/rest/agile/1.0/board/{boardId}/issue",
            "sprint" => $"/rest/agile/1.0/board/{boardId}/sprint/{JiraNumericId(payload.TryGetProperty("sprintId", out var sprint) ? sprint.GetString() : null, "Jira sprint")}/issue",
            _ => throw new InvalidOperationException("Jira kayıt kapsamı geçersiz.")
        };
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), resource + "?startAt=0&maxResults=100&fields=summary,issuetype,status,priority,assignee,updated");
        return MapJiraIssues(result, payload.GetProperty("baseUrl").GetString());
    }

    private async Task<object?> JiraListIssueTypes(JsonElement payload)
    {
        var projectKey = payload.GetProperty("projectKey").GetString() ?? "";
        if (!System.Text.RegularExpressions.Regex.IsMatch(projectKey, "^[A-Z][A-Z0-9_]{0,29}$")) throw new InvalidOperationException("Jira proje anahtarı geçersiz.");
        var result = await JiraRequestAsync(payload.GetProperty("baseUrl").GetString(), $"/rest/api/2/issue/createmeta?projectKeys={Uri.EscapeDataString(projectKey)}&expand=projects.issuetypes");
        var project = GetArray(result, "projects").FirstOrDefault(entry => String(entry, "key") == projectKey);
        return GetArray(project, "issuetypes").Where(entry => Has(entry, "id") && Has(entry, "name"))
            .Select(entry => new { id = String(entry, "id"), name = String(entry, "name"), subtask = Bool(entry, "subtask") }).ToArray();
    }

    private async Task<object?> JiraCreateIssue(JsonElement payload)
    {
        var baseValue = payload.GetProperty("baseUrl").GetString();
        var boardId = JiraNumericId(payload.GetProperty("boardId").GetString(), "Jira board");
        var projectKey = payload.GetProperty("projectKey").GetString() ?? "";
        var typeId = JiraNumericId(payload.GetProperty("issueTypeId").GetString(), "Jira issue türü");
        var summary = payload.GetProperty("summary").GetString() ?? "";
        var description = payload.GetProperty("description").GetString() ?? "";
        if (!System.Text.RegularExpressions.Regex.IsMatch(projectKey, "^[A-Z][A-Z0-9_]{0,29}$")) throw new InvalidOperationException("Jira proje anahtarı geçersiz.");
        if (summary.Trim().Length is < 1 or > 255) throw new InvalidOperationException("Issue başlığı 1–255 karakter olmalı.");
        if (description.Length > 30_000) throw new InvalidOperationException("Issue açıklaması 30.000 karakteri aşamaz.");
        var projectsResult = await JiraRequestAsync(baseValue, $"/rest/agile/1.0/board/{boardId}/project?startAt=0&maxResults=100");
        var projects = projectsResult.ValueKind == JsonValueKind.Array ? projectsResult.EnumerateArray().ToArray() : GetArray(projectsResult, "values");
        if (!projects.Any(entry => String(entry, "key") == projectKey)) throw new InvalidOperationException("Seçilen Jira projesi bu board’un proje kapsamı içinde görünmüyor; issue oluşturulmadı.");
        var types = await JiraRequestAsync(baseValue, $"/rest/api/2/issue/createmeta?projectKeys={Uri.EscapeDataString(projectKey)}&expand=projects.issuetypes");
        var project = GetArray(types, "projects").FirstOrDefault(entry => String(entry, "key") == projectKey);
        if (!GetArray(project, "issuetypes").Any(entry => String(entry, "id") == typeId && !Bool(entry, "subtask"))) throw new InvalidOperationException("Issue türü bu Jira projesinde oluşturulabilir değil.");
        var result = await JiraRequestAsync(baseValue, "/rest/api/2/issue", HttpMethod.Post, new { fields = new { project = new { key = projectKey }, issuetype = new { id = typeId }, summary = summary.Trim(), description = description.Trim() } });
        if (!Has(result, "key") || !Has(result, "id")) throw new InvalidOperationException("Jira issue oluşturdu ancak yanıt anahtarını doğrulayamadı.");
        return new { id = String(result, "id"), key = String(result, "key") };
    }

    private static readonly string[] JiraFields = ["summary", "issuetype", "status", "priority", "assignee", "updated"];

    private static object[] MapJiraIssues(JsonElement result, string? baseValue)
    {
        if (!result.TryGetProperty("issues", out var issues) || issues.ValueKind != JsonValueKind.Array) throw new InvalidOperationException("Jira issue yanıtı beklenen biçimde değil.");
        var baseUrl = ValidateJiraBaseUrl(baseValue);
        return issues.EnumerateArray().Where(entry => Has(entry, "key") && entry.TryGetProperty("fields", out var fields) && fields.ValueKind == JsonValueKind.Object).Select(entry =>
        {
            var fields = entry.GetProperty("fields");
            var assignee = fields.TryGetProperty("assignee", out var owner) && owner.ValueKind == JsonValueKind.Object
                ? OptionalString(owner, "displayName") ?? OptionalString(owner, "name") ?? "Atanmadı" : "Atanmadı";
            var key = String(entry, "key");
            return (object)new
            {
                id = OptionalString(entry, "id") ?? key, key, summary = ReadNested(fields, "summary"),
                issueType = ReadNested(fields, "issuetype", "name"), status = ReadNested(fields, "status", "name"),
                priority = ReadNested(fields, "priority", "name"), assignee, updated = ReadNested(fields, "updated"),
                browseUrl = new Uri(baseUrl, "/browse/" + Uri.EscapeDataString(key)).ToString()
            };
        }).ToArray();
    }

    private async Task<JsonElement> JiraRequestAsync(string? baseValue, string resource, HttpMethod? method = null, object? body = null)
    {
        var baseUrl = ValidateJiraBaseUrl(baseValue);
        var path = baseUrl.AbsolutePath.TrimEnd('/');
        var url = new Uri(baseUrl, baseUrl.AbsolutePath.TrimEnd('/') + resource);
        if (url.Scheme != baseUrl.Scheme || url.Host != baseUrl.Host || url.Port != baseUrl.Port || !url.AbsolutePath.StartsWith(path + "/rest/", StringComparison.Ordinal)) throw new InvalidOperationException("Jira isteği adres doğrulamasından geçemedi.");
        var token = ReadJiraToken();
        using var request = new HttpRequestMessage(method ?? HttpMethod.Get, url);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        if (body is not null) request.Content = new StringContent(JsonSerializer.Serialize(body, JsonOptions), Encoding.UTF8, "application/json");
        HttpResponseMessage response;
        try { response = await JiraClient.SendAsync(request); }
        catch { throw new InvalidOperationException("Jira’ya ulaşılamadı. Base URL, VPN/ağ erişimi ve TLS sertifikasını kontrol edin."); }
        using (response)
        {
            var responseText = await response.Content.ReadAsStringAsync();
            if (response.StatusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden) throw new InvalidOperationException("Jira PAT geçersiz olabilir veya bu hesapta gerekli izin yok.");
            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    try
                    {
                        using var error = JsonDocument.Parse(responseText);
                        var messages = GetArray(error.RootElement, "errorMessages").Select(value => value.GetString()).Where(value => !string.IsNullOrWhiteSpace(value)).ToArray();
                        var fields = error.RootElement.TryGetProperty("errors", out var issueErrors) && issueErrors.ValueKind == JsonValueKind.Object ? issueErrors.EnumerateObject().Select(property => property.Name).ToArray() : [];
                        var hints = string.Join(" ", messages.Concat(fields.Length > 0 ? ["Ek zorunlu/geçersiz alanlar: " + string.Join(", ", fields)] : [])).Trim();
                        if (hints.Length > 0) throw new InvalidOperationException("Jira issue oluşturamadı. " + hints[..Math.Min(500, hints.Length)]);
                    }
                    catch (JsonException) { }
                }
                throw new InvalidOperationException($"Jira isteği başarısız oldu ({(int)response.StatusCode}). REST API izinlerini ve issue alanlarını kontrol edin.");
            }
            try { using var document = JsonDocument.Parse(responseText); return document.RootElement.Clone(); }
            catch { throw new InvalidOperationException("Jira geçerli JSON yanıtı vermedi."); }
        }
    }

    private string ReadJiraToken()
    {
        if (!File.Exists(JiraTokenPath)) throw new InvalidOperationException("Jira PAT kaydedilmemiş. Jira panelinden token ekleyin.");
        try { return Encoding.UTF8.GetString(ProtectedData.Unprotect(File.ReadAllBytes(JiraTokenPath), JiraEntropy, DataProtectionScope.CurrentUser)); }
        catch { throw new InvalidOperationException("Kaydedilmiş Jira PAT okunamadı. Tokenı yeniden kaydedin."); }
    }

    private static Uri ValidateJiraBaseUrl(string? value)
    {
        if (string.IsNullOrWhiteSpace(value) || value.Length > 2048 || !Uri.TryCreate(value.Trim(), UriKind.Absolute, out var url)) throw new InvalidOperationException("Jira Base URL geçersiz.");
        var localHttp = url.Scheme == "http" && (url.Host is "localhost" or "127.0.0.1" or "::1");
        if ((url.Scheme != "https" && !localHttp) || url.UserInfo.Length > 0 || url.Query.Length > 0 || url.Fragment.Length > 0) throw new InvalidOperationException("Jira adresi HTTPS olmalı. Yalnızca localhost için HTTP kullanılabilir; adres kullanıcı bilgisi veya sorgu içermemeli.");
        return new Uri(url.GetLeftPart(UriPartial.Path).TrimEnd('/') + "/");
    }

    private static string JiraNumericId(string? value, string label) => value is not null && System.Text.RegularExpressions.Regex.IsMatch(value, "^\\d{1,20}$") ? value : throw new InvalidOperationException(label + " geçersiz.");
    private static bool Has(JsonElement value, string key) => value.ValueKind == JsonValueKind.Object && value.TryGetProperty(key, out var item) && item.ValueKind is not (JsonValueKind.Null or JsonValueKind.Undefined);
    private static string String(JsonElement value, string key) => value.TryGetProperty(key, out var item) ? item.ToString() : "";
    private static string? OptionalString(JsonElement value, string key) => Has(value, key) ? value.GetProperty(key).ToString() : null;
    private static bool Bool(JsonElement value, string key) => value.TryGetProperty(key, out var item) && item.ValueKind == JsonValueKind.True;
    private static string ReadNested(JsonElement value, string key, string? nested = null)
    {
        if (!value.TryGetProperty(key, out var item)) return "";
        return nested is not null && item.ValueKind == JsonValueKind.Object && item.TryGetProperty(nested, out var child) ? child.ToString() : nested is null ? item.ToString() : "";
    }
    private static JsonElement[] GetArray(JsonElement value, string key) => value.ValueKind == JsonValueKind.Object && value.TryGetProperty(key, out var result) && result.ValueKind == JsonValueKind.Array ? result.EnumerateArray().ToArray() : [];
}
