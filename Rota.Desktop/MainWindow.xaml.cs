using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using Microsoft.Win32;
using MimeKit;
using Message = MsgReader.Outlook.Storage.Message;

namespace Rota.Desktop;

public partial class MainWindow : Window
{
    private const int MaxAttachmentBytes = 25 * 1024 * 1024;
    private readonly string _dataDirectory = Environment.GetEnvironmentVariable("ROTA_USER_DATA_DIR") is { Length: > 0 } dataDirectory
        ? Path.GetFullPath(dataDirectory)
        : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "rota-po");
    private string? _trustedAppEntry;
    private readonly Dictionary<string, List<MailAttachment>> _emailAttachments = new();
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    { "pdf", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv", "txt", "md", "json", "msg", "eml" };
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public MainWindow()
    {
        InitializeComponent();
        Loaded += InitializeBrowserAsync;
    }

    private async void InitializeBrowserAsync(object sender, RoutedEventArgs e)
    {
        try
        {
            var webViewData = Path.Combine(_dataDirectory, "webview2");
            if (Environment.GetEnvironmentVariable("ROTA_WEBVIEW2_USER_DATA") is { Length: > 0 } testProfile) webViewData = Path.GetFullPath(testProfile);
            Directory.CreateDirectory(webViewData);
            var debugPort = Environment.GetEnvironmentVariable("ROTA_WEBVIEW2_DEBUG_PORT");
            Browser.CreationProperties = new CoreWebView2CreationProperties
            {
                UserDataFolder = webViewData,
                AdditionalBrowserArguments = int.TryParse(debugPort, out var port) && port is > 0 and < 65536
                    ? $"--remote-debugging-port={port} --remote-allow-origins=*" : ""
            };
            await Browser.EnsureCoreWebView2Async();
            Browser.CoreWebView2.Settings.AreDefaultContextMenusEnabled = true;
            Browser.CoreWebView2.Settings.AreDevToolsEnabled = int.TryParse(debugPort, out _);
            Browser.CoreWebView2.WebMessageReceived += OnWebMessageReceived;
            Browser.CoreWebView2.NavigationStarting += OnNavigationStarting;

            var root = FindWorkspaceRoot();
            var entry = Path.Combine(root, "index.html");
            if (!File.Exists(entry)) throw new FileNotFoundException("Rota arayüz dosyaları bulunamadı. Önce npm run build:renderer çalıştırın.", entry);
            _trustedAppEntry = Path.GetFullPath(entry);
            Browser.Source = new Uri(entry);
        }
        catch (Exception error)
        {
            MessageBox.Show(this, error.Message, "Rota başlatılamadı", MessageBoxButton.OK, MessageBoxImage.Error);
            Close();
        }
    }

    private static string FindWorkspaceRoot()
    {
        var current = new DirectoryInfo(AppContext.BaseDirectory);
        while (current is not null)
        {
            if (File.Exists(Path.Combine(current.FullName, "index.html")) && Directory.Exists(Path.Combine(current.FullName, "src"))) return current.FullName;
            current = current.Parent;
        }
        throw new DirectoryNotFoundException("Rota'nın yerel arayüzü bulunamadı.");
    }

    private async void OnWebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        string? requestId = null;
        try
        {
            if (!Uri.TryCreate(e.Source, UriKind.Absolute, out var source) || !source.IsFile || _trustedAppEntry is null ||
                !string.Equals(Path.GetFullPath(source.LocalPath), _trustedAppEntry, StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Güvenilmeyen uygulama kaynağı.");
            using var request = JsonDocument.Parse(e.WebMessageAsJson);
            var root = request.RootElement;
            requestId = root.GetProperty("id").GetString();
            var command = root.GetProperty("command").GetString() ?? "";
            var payload = root.TryGetProperty("payload", out var value) ? value : default;
            var result = await DispatchAsync(command, payload);
            Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { id = requestId, result }, JsonOptions));
        }
        catch (Exception error)
        {
            Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { id = requestId, error = error.Message }, JsonOptions));
        }
    }

    private void OnNavigationStarting(object? sender, CoreWebView2NavigationStartingEventArgs e)
    {
        if (Uri.TryCreate(e.Uri, UriKind.Absolute, out var destination) && destination.IsFile && _trustedAppEntry is not null &&
            string.Equals(Path.GetFullPath(destination.LocalPath), _trustedAppEntry, StringComparison.OrdinalIgnoreCase)) return;
        e.Cancel = true;
        if (Uri.TryCreate(e.Uri, UriKind.Absolute, out destination) && destination.Scheme is "https" or "http")
            Process.Start(new ProcessStartInfo(destination.ToString()) { UseShellExecute = true });
    }

    private Task<object?> DispatchAsync(string command, JsonElement payload) => command switch
    {
        "attachments.pick" => Task.FromResult<object?>(PickAttachments()),
        "attachments.import" => Task.FromResult<object?>(ImportFiles(payload)),
        "email.parse" => Task.FromResult<object?>(ParseEmail(payload)),
        "email.importSelected" => Task.FromResult<object?>(ImportSelectedEmailAttachments(payload)),
        "attachments.open" => Task.FromResult<object?>(OpenAttachment(payload)),
        "attachments.preview" => Task.FromResult<object?>(PreviewAttachment(payload)),
        "attachments.remove" => Task.FromResult<object?>(RemoveAttachment(payload)),
        "backup.export" => Task.FromResult(ExportWorkspaceBackup(payload)),
        "backlog.exportExcel" => Task.FromResult(ExportBacklogExcel(payload)),
        "backup.stageRestore" => Task.FromResult(StageWorkspaceRestore()),
        "backup.commitRestore" => Task.Run(() => { CommitWorkspaceRestore(payload); return (object?)null; }),
        "backup.cancelRestore" => Task.Run(() => { CancelWorkspaceRestore(payload); return (object?)null; }),
        "jira.hasToken" => Task.FromResult<object?>(JiraHasToken()),
        "jira.saveToken" => Task.FromResult<object?>(JiraSaveToken(payload)),
        "jira.removeToken" => Task.FromResult<object?>(JiraRemoveToken()),
        "jira.openTokenPage" => Task.FromResult<object?>(JiraOpenTokenPage(payload)),
        "jira.openIssue" => Task.FromResult<object?>(JiraOpenIssue(payload)),
        "jira.listDashboards" => JiraListDashboards(payload),
        "jira.listFilters" => JiraListFilters(payload),
        "jira.fetchFilterIssues" => JiraFetchFilterIssues(payload),
        "jira.listBoards" => JiraListBoards(payload),
        "jira.listBoardProjects" => JiraListBoardProjects(payload),
        "jira.listSprints" => JiraListSprints(payload),
        "jira.fetchBoardIssues" => JiraFetchBoardIssues(payload),
        "jira.listIssueTypes" => JiraListIssueTypes(payload),
        "jira.createIssue" => JiraCreateIssue(payload),
        _ => Task.FromException<object?>(new NotSupportedException($"'{command}' WebView2 geçişinde henüz taşınmadı."))
    };

    private object PickAttachments()
    {
        var picker = new OpenFileDialog
        {
            Title = "Dosya ekle",
            Multiselect = true,
            Filter = "Belgeler ve görseller|" + string.Join(";", AllowedExtensions.Select(ext => "*." + ext)) + "|Tüm dosyalar|*.*"
        };
        return picker.ShowDialog(this) == true ? ImportPaths(picker.FileNames) : Array.Empty<object>();
    }

    private object ImportFiles(JsonElement payload)
    {
        var paths = new List<string>();
        foreach (var file in ReadIncomingFiles(payload))
        {
            var extension = Path.GetExtension(file.Name).TrimStart('.');
            if (!AllowedExtensions.Contains(extension)) continue;
            var destination = Path.Combine(AttachmentDirectory(), file.StoredName);
            File.WriteAllBytes(destination, file.Bytes);
            paths.Add(JsonSerializer.Serialize(new { storedName = file.StoredName, name = file.Name, size = file.Bytes.Length }, JsonOptions));
        }
        return paths.Select(value => JsonSerializer.Deserialize<JsonElement>(value, JsonOptions)).ToArray();
    }

    private object ImportPaths(IEnumerable<string> paths)
    {
        var results = new List<object>();
        foreach (var source in paths.Take(20))
        {
            if (!File.Exists(source)) continue;
            var info = new FileInfo(source);
            var extension = info.Extension.TrimStart('.');
            if (!AllowedExtensions.Contains(extension) || info.Length > MaxAttachmentBytes) continue;
            var storedName = $"{Guid.NewGuid():D}.{Regex.Replace(extension, "[^a-zA-Z0-9]", "").ToLowerInvariant()}";
            var destination = Path.Combine(AttachmentDirectory(), storedName);
            File.Copy(source, destination, false);
            results.Add(new { storedName, name = info.Name, size = info.Length });
        }
        return results;
    }

    private object ParseEmail(JsonElement payload)
    {
        var files = ReadIncomingFiles(payload);
        if (files.Count != 1) throw new InvalidOperationException("Bir seferde tek bir .msg veya .eml e-postası bırak.");
        var file = files[0];
        var extension = Path.GetExtension(file.Name).ToLowerInvariant();
        if (extension is not (".msg" or ".eml")) throw new InvalidOperationException("E-postadan kayıt oluşturmak için .msg veya .eml dosyası kullan.");

        string subject, from, to, date, body;
        var attachments = new List<MailAttachment>();
        try
        {
            if (extension == ".msg")
            {
                using var stream = new MemoryStream(file.Bytes, writable: false);
                using var message = new Message(stream, FileAccess.Read);
                subject = message.Subject ?? Path.GetFileNameWithoutExtension(file.Name);
                from = message.Sender?.ToString() ?? "";
                to = string.Join(", ", message.Recipients?.Select(recipient => recipient.ToString()) ?? Enumerable.Empty<string>());
                date = message.ReceivedOn?.ToString("O") ?? message.SentOn?.ToString("O") ?? "";
                body = message.BodyText ?? "";
                attachments = message.Attachments?.OfType<MsgReader.Outlook.Storage.Attachment>()
                    .Where(item => !item.IsInline && item.Data is { Length: > 0 })
                    .Take(20)
                    .Select(item => new MailAttachment(SafeFileName(item.FileName ?? "ek"), item.Data!))
                    .Where(item => item.Bytes.Length <= MaxAttachmentBytes)
                    .ToList() ?? new List<MailAttachment>();
            }
            else
            {
                using var stream = new MemoryStream(file.Bytes, writable: false);
                var message = MimeMessage.Load(stream);
                subject = message.Subject ?? Path.GetFileNameWithoutExtension(file.Name);
                from = message.From.ToString();
                to = message.To.ToString();
                date = message.Date.ToString("O");
                body = message.TextBody ?? "";
                foreach (var part in message.Attachments.OfType<MimePart>().Where(part => !string.IsNullOrWhiteSpace(part.FileName) && part.Content is not null).Take(20))
                {
                    var content = part.Content;
                    if (content is null) continue;
                    using var output = new MemoryStream();
                    content.DecodeTo(output);
                    if (output.Length <= MaxAttachmentBytes) attachments.Add(new MailAttachment(SafeFileName(part.FileName!), output.ToArray()));
                }
            }
        }
        catch (Exception error) when (error is not InvalidOperationException)
        {
            throw new InvalidOperationException("E-posta okunamadı. Dosya bozuk veya desteklenmeyen bir ileti biçiminde.");
        }

        var original = SaveAttachment(file.Name, file.Bytes);
        var token = Guid.NewGuid().ToString("D");
        _emailAttachments[token] = attachments;
        foreach (var staleToken in _emailAttachments.Keys.Take(Math.Max(0, _emailAttachments.Count - 20)).ToArray()) _emailAttachments.Remove(staleToken);
        return new
        {
            subject = subject[..Math.Min(subject.Length, 120)],
            from = from[..Math.Min(from.Length, 1000)],
            to = to[..Math.Min(to.Length, 1000)],
            date = date[..Math.Min(date.Length, 100)],
            body = body[..Math.Min(body.Length, 12000)],
            originalEmail = original,
            attachmentToken = token,
            attachments = attachments.Select((attachment, index) => new { id = index.ToString(), name = attachment.Name, size = attachment.Bytes.Length }).ToArray()
        };
    }

    private object ImportSelectedEmailAttachments(JsonElement payload)
    {
        var token = payload.GetProperty("token").GetString() ?? "";
        if (!_emailAttachments.TryGetValue(token, out var available)) throw new InvalidOperationException("E-posta eki önizlemesinin süresi doldu. E-postayı yeniden bırak.");
        var ids = payload.GetProperty("selectedIds").EnumerateArray().Select(item => int.TryParse(item.GetString(), out var index) ? index : -1).Distinct().ToArray();
        if (ids.Length > 20 || ids.Any(index => index < 0 || index >= available.Count)) throw new InvalidOperationException("E-posta eki seçimi geçersiz.");
        var selected = ids.Select(index => available[index]).Where(file => AllowedExtensions.Contains(Path.GetExtension(file.Name).TrimStart('.'))).ToArray();
        if (selected.Sum(file => (long)file.Bytes.Length) > MaxAttachmentBytes) throw new InvalidOperationException("Seçilen e-posta eklerinin toplamı 25 MB sınırını aşıyor.");
        _emailAttachments.Remove(token);
        return selected.Select(file => SaveAttachment(file.Name, file.Bytes)).ToArray();
    }

    private object OpenAttachment(JsonElement payload)
    {
        var path = ResolveStoredAttachment(payload);
        if (!File.Exists(path)) return "Dosya bulunamadı.";
        Process.Start(new ProcessStartInfo(path) { UseShellExecute = true });
        return "";
    }

    private object? PreviewAttachment(JsonElement payload)
    {
        var path = ResolveStoredAttachment(payload);
        if (!File.Exists(path) || new FileInfo(path).Length > 12 * 1024 * 1024) return null;
        var mime = Path.GetExtension(path).ToLowerInvariant() switch
        {
            ".png" => "image/png", ".jpg" or ".jpeg" => "image/jpeg", ".gif" => "image/gif", ".webp" => "image/webp", ".pdf" => "application/pdf", _ => null
        };
        return mime is null ? null : new { mimeType = mime, dataUrl = $"data:{mime};base64,{Convert.ToBase64String(File.ReadAllBytes(path))}" };
    }

    private bool RemoveAttachment(JsonElement payload)
    {
        var path = ResolveStoredAttachment(payload);
        if (File.Exists(path)) File.Delete(path);
        return true;
    }

    private List<IncomingFile> ReadIncomingFiles(JsonElement payload)
    {
        if (payload.ValueKind != JsonValueKind.Array || payload.GetArrayLength() is < 1 or > 20) throw new InvalidOperationException("Ek dosya listesi geçersiz.");
        var files = new List<IncomingFile>();
        long total = 0;
        foreach (var entry in payload.EnumerateArray())
        {
            var name = SafeFileName(entry.GetProperty("name").GetString() ?? "dosya");
            var bytes = Convert.FromBase64String(entry.GetProperty("data").GetString() ?? "");
            total += bytes.Length;
            if (bytes.Length > MaxAttachmentBytes || total > MaxAttachmentBytes) throw new InvalidOperationException("E-posta veya ekleri 25 MB sınırını aşıyor.");
            files.Add(new IncomingFile(name, bytes));
        }
        return files;
    }

    private object SaveAttachment(string name, byte[] bytes)
    {
        var extension = Path.GetExtension(name).TrimStart('.');
        if (!AllowedExtensions.Contains(extension)) extension = "file";
        var storedName = $"{Guid.NewGuid():D}.{Regex.Replace(extension, "[^a-zA-Z0-9]", "").ToLowerInvariant()}";
        File.WriteAllBytes(Path.Combine(AttachmentDirectory(), storedName), bytes);
        return new { storedName, name, size = bytes.Length };
    }

    private string ResolveStoredAttachment(JsonElement payload)
    {
        var storedName = payload.GetProperty("storedName").GetString() ?? "";
        return ResolveStoredAttachment(storedName);
    }

    private string ResolveStoredAttachment(string storedName)
    {
        if (!Regex.IsMatch(storedName, "^[a-f0-9-]+\\.[a-zA-Z0-9]{1,12}$")) throw new InvalidOperationException("Geçersiz ek dosya.");
        return Path.Combine(AttachmentDirectory(), storedName);
    }

    private string AttachmentDirectory()
    {
        var directory = Path.Combine(_dataDirectory, "attachments");
        Directory.CreateDirectory(directory);
        return directory;
    }

    private static string SafeFileName(string name)
    {
        var safe = Regex.Replace(Path.GetFileName(name), "[<>:\"/\\\\|?*\\x00-\\x1f]", "_");
        return safe[..Math.Min(safe.Length, 180)];
    }

    private sealed record IncomingFile(string Name, byte[] Bytes)
    {
        public string StoredName => $"{Guid.NewGuid():D}.{Path.GetExtension(Name).TrimStart('.').ToLowerInvariant()}";
    }
    private sealed record MailAttachment(string Name, byte[] Bytes);
}
