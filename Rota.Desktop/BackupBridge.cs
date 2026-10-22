using System.IO.Compression;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using System.Windows;
using ClosedXML.Excel;
using Microsoft.Win32;

namespace Rota.Desktop;

public partial class MainWindow
{
    private const long MaxBackupBytes = 1024L * 1024 * 1024;
    private readonly Dictionary<string, RestoreStage> _restoreStages = new();

    private object? ExportWorkspaceBackup(JsonElement payload)
    {
        var format = payload.GetProperty("format").GetString();
        if (format is not ("rota" or "json")) throw new InvalidOperationException("Yedek biçimi seçimi geçersiz.");
        var workspace = payload.GetProperty("workspace");
        ValidateWorkspace(workspace);
        var picker = new SaveFileDialog
        {
            Title = "Rota çalışma alanını yedekle",
            FileName = $"Rota-yedek-{DateTime.UtcNow:yyyy-MM-dd}.{format}",
            Filter = format == "rota" ? "Rota sıkıştırılmış yedek|*.rota" : "JSON yedek|*.json"
        };
        if (picker.ShowDialog(this) != true) return null;

        var files = new List<BackupAttachment>();
        long total = 0;
        foreach (var name in CollectStoredNames(workspace))
        {
            var path = ResolveStoredAttachment(name);
            var info = new FileInfo(path);
            if (!info.Exists || info.Length > MaxAttachmentBytes) throw new InvalidOperationException($"Yedeklenemeyen ek dosya: {name}");
            total += info.Length;
            if (total > MaxBackupBytes) throw new InvalidOperationException("Eklerin toplam boyutu 1 GB sınırını aşıyor.");
            var bytes = File.ReadAllBytes(path);
            files.Add(new BackupAttachment(name, bytes.Length, Convert.ToHexStringLower(SHA256.HashData(bytes)), Convert.ToBase64String(bytes)));
        }
        var envelope = new BackupEnvelope("rota-workspace-backup", 1, DateTimeOffset.UtcNow, JsonNode.Parse(workspace.GetRawText())!, files);
        var json = JsonSerializer.SerializeToUtf8Bytes(envelope, JsonOptions);
        if (json.LongLength > MaxBackupBytes) throw new InvalidOperationException("Yedek dosyası 1 GB sınırını aşıyor.");
        var output = format == "rota" ? CompressBackup(json) : json;
        WriteAtomic(picker.FileName, output);
        return new { path = picker.FileName, attachmentCount = files.Count };
    }

    private object? ExportBacklogExcel(JsonElement payload)
    {
        var sheetsElement = payload.GetProperty("sheets");
        if (sheetsElement.ValueKind != JsonValueKind.Array || sheetsElement.GetArrayLength() is < 1 or > 12) throw new InvalidOperationException("Excel dışa aktarım sayfaları geçersiz.");
        var picker = new SaveFileDialog { Title = "Backlog'u Excel olarak dışa aktar", FileName = $"Rota-backlog-{DateTime.UtcNow:yyyy-MM-dd}.xlsx", Filter = "Excel çalışma kitabı|*.xlsx" };
        if (picker.ShowDialog(this) != true) return null;

        using var workbook = new XLWorkbook();
        workbook.Properties.Author = "Rota · PO çalışma alanı";
        workbook.Properties.Created = DateTime.Now;
        var names = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var sheetIndex = 0;
        foreach (var sheet in sheetsElement.EnumerateArray())
        {
            sheetIndex++;
            var rawName = sheet.GetProperty("name").GetString() ?? "";
            var name = Regex.Replace(rawName, "[\\\\/*?:\\[\\]]", " ").Trim();
            name = name[..Math.Min(name.Length, 31)];
            if (string.IsNullOrWhiteSpace(name)) name = $"Sayfa {sheetIndex}";
            var unique = name;
            var suffix = 2;
            while (!names.Add(unique))
            {
                var tail = $" ({suffix++})";
                unique = name[..Math.Min(name.Length, 31 - tail.Length)] + tail;
            }
            var columns = sheet.GetProperty("columns");
            if (columns.ValueKind != JsonValueKind.Array || columns.GetArrayLength() is < 1 or > 60) throw new InvalidOperationException($"Excel sayfa {sheetIndex} yapısı geçersiz.");
            var rows = sheet.GetProperty("rows");
            if (rows.ValueKind != JsonValueKind.Array || rows.GetArrayLength() > 1_000_000) throw new InvalidOperationException("Excel dışa aktarımı bir sayfada izin verilen satır sınırını aşıyor.");
            var worksheet = workbook.Worksheets.Add(unique);
            var columnNames = columns.EnumerateArray().Select(value => value.GetString() ?? "").ToArray();
            for (var column = 0; column < columnNames.Length; column++)
            {
                if (string.IsNullOrWhiteSpace(columnNames[column]) || columnNames[column].Length > 120) throw new InvalidOperationException("Excel kolon başlığı geçersiz.");
                worksheet.Cell(1, column + 1).Value = columnNames[column];
                worksheet.Column(column + 1).Width = Math.Clamp(columnNames[column].Length + 3, 14, 42);
            }
            var rowNumber = 2;
            foreach (var row in rows.EnumerateArray())
            {
                if (row.ValueKind != JsonValueKind.Array || row.GetArrayLength() != columnNames.Length) throw new InvalidOperationException("Excel satırındaki alan sayısı kolonlarla eşleşmiyor.");
                for (var column = 0; column < columnNames.Length; column++)
                {
                    var cell = row[column];
                    var target = worksheet.Cell(rowNumber, column + 1);
                    switch (cell.ValueKind)
                    {
                        case JsonValueKind.Null: case JsonValueKind.Undefined: break;
                        case JsonValueKind.String:
                            var text = cell.GetString() ?? "";
                            if (text.Length > 32767) throw new InvalidOperationException("Excel hücre metni 32.767 karakter sınırını aşıyor.");
                            target.Value = text;
                            break;
                        case JsonValueKind.Number when cell.TryGetDouble(out var number) && double.IsFinite(number): target.Value = number; break;
                        default: throw new InvalidOperationException("Excel hücresinde desteklenmeyen veri var.");
                    }
                }
                rowNumber++;
            }
            var lastRow = Math.Max(1, worksheet.LastRowUsed()?.RowNumber() ?? 1);
            worksheet.Range(1, 1, 1, columnNames.Length).Style.Font.Bold = true;
            worksheet.Range(1, 1, 1, columnNames.Length).Style.Font.FontColor = XLColor.White;
            worksheet.Range(1, 1, 1, columnNames.Length).Style.Fill.BackgroundColor = XLColor.FromHtml("#28365B");
            worksheet.SheetView.FreezeRows(1);
            worksheet.Range(1, 1, lastRow, columnNames.Length).SetAutoFilter();
            if (lastRow > 1) worksheet.Range(2, 1, lastRow, columnNames.Length).Style.Alignment.WrapText = true;
        }
        var temp = picker.FileName + "." + Guid.NewGuid().ToString("N") + ".tmp";
        try { workbook.SaveAs(temp); File.Move(temp, picker.FileName, true); }
        catch { File.Delete(temp); throw; }
        return picker.FileName;
    }

    private object? StageWorkspaceRestore()
    {
        var picker = new OpenFileDialog { Title = "Rota yedeğini geri yükle", Filter = "Rota yedeği|*.rota;*.json" };
        if (picker.ShowDialog(this) != true) return null;
        var info = new FileInfo(picker.FileName);
        if (info.Length > MaxBackupBytes) throw new InvalidOperationException("Yedek dosyası geçersiz veya 1 GB sınırını aşıyor.");
        byte[] json;
        try
        {
            var bytes = File.ReadAllBytes(picker.FileName);
            json = bytes.AsSpan().StartsWith(Encoding.UTF8.GetBytes("ROTA1\n")) ? DecompressBackup(bytes.AsSpan(6).ToArray()) : bytes;
        }
        catch { throw new InvalidOperationException("Yedek dosyası okunamadı. Dosya bozuk veya JSON değil."); }
        using var document = JsonDocument.Parse(json);
        var payload = document.RootElement;
        if (payload.GetProperty("format").GetString() != "rota-workspace-backup" || payload.GetProperty("version").GetInt32() != 1) throw new InvalidOperationException("Bu dosya desteklenen Rota yedeği değil.");
        var workspace = JsonNode.Parse(payload.GetProperty("workspace").GetRawText())!;
        ValidateWorkspace(payload.GetProperty("workspace"));
        var rawFiles = payload.GetProperty("attachments");
        if (rawFiles.ValueKind != JsonValueKind.Array || rawFiles.GetArrayLength() > 20_000) throw new InvalidOperationException("Yedekte ek listesi eksik veya çok büyük.");
        var entries = new Dictionary<string, (byte[] Bytes, string Extension)>(StringComparer.Ordinal);
        long total = 0;
        foreach (var entry in rawFiles.EnumerateArray())
        {
            var storedName = entry.GetProperty("storedName").GetString() ?? "";
            _ = ResolveStoredAttachment(JsonDocument.Parse(JsonSerializer.Serialize(new { storedName })).RootElement);
            if (!entries.TryAdd(storedName, (Array.Empty<byte>(), ""))) throw new InvalidOperationException("Yedekte yinelenen veya geçersiz ek kaydı var.");
            var encoded = entry.GetProperty("data").GetString() ?? "";
            var bytes = Convert.FromBase64String(encoded);
            var hash = Convert.ToHexStringLower(SHA256.HashData(bytes));
            if (bytes.Length != entry.GetProperty("size").GetInt32() || bytes.Length > MaxAttachmentBytes || !CryptographicOperations.FixedTimeEquals(Encoding.ASCII.GetBytes(hash), Encoding.ASCII.GetBytes(entry.GetProperty("sha256").GetString() ?? ""))) throw new InvalidOperationException($"Yedek eki doğrulanamadı: {storedName}");
            total += bytes.Length;
            if (total > MaxBackupBytes) throw new InvalidOperationException("Eklerin toplam boyutu 1 GB sınırını aşıyor.");
            entries[storedName] = (bytes, Path.GetExtension(storedName).TrimStart('.'));
        }
        var referenced = CollectStoredNames(payload.GetProperty("workspace"));
        foreach (var name in referenced) if (!entries.ContainsKey(name)) throw new InvalidOperationException($"Yedekte başvurulan ek bulunamadı: {name}");
        var mapping = entries.Keys.ToDictionary(name => name, name => $"{Guid.NewGuid():D}.{entries[name].Extension}", StringComparer.Ordinal);
        RewriteStoredNames(workspace, mapping);

        var token = Guid.NewGuid().ToString("D");
        var directory = Path.Combine(_dataDirectory, "restore-staging", token);
        Directory.CreateDirectory(directory);
        try
        {
            foreach (var (oldName, entry) in entries) File.WriteAllBytes(Path.Combine(directory, mapping[oldName]), entry.Bytes);
        }
        catch
        {
            Directory.Delete(directory, true);
            throw;
        }
        _restoreStages[token] = new RestoreStage(directory, mapping.Values.ToArray());
        return new { token, workspace, attachmentCount = entries.Count };
    }

    private void CommitWorkspaceRestore(JsonElement payload)
    {
        var token = payload.GetProperty("token").GetString() ?? "";
        if (!_restoreStages.TryGetValue(token, out var stage)) throw new InvalidOperationException("Geri yükleme oturumunun süresi dolmuş. Tekrar deneyin.");
        var destination = AttachmentDirectory();
        var copied = new List<string>();
        try
        {
            foreach (var file in stage.Files)
            {
                var path = Path.Combine(destination, file);
                File.Copy(Path.Combine(stage.Directory, file), path, false);
                copied.Add(path);
            }
            Directory.Delete(stage.Directory, true);
            _restoreStages.Remove(token);
        }
        catch
        {
            foreach (var path in copied) File.Delete(path);
            throw;
        }
    }

    private void CancelWorkspaceRestore(JsonElement payload)
    {
        var token = payload.GetProperty("token").GetString() ?? "";
        if (_restoreStages.Remove(token, out var stage) && Directory.Exists(stage.Directory)) Directory.Delete(stage.Directory, true);
    }

    private static void ValidateWorkspace(JsonElement workspace)
    {
        if (workspace.ValueKind != JsonValueKind.Object) throw new InvalidOperationException("Yedekte çalışma alanı nesnesi bulunamadı.");
        foreach (var key in new[] { "items", "tasks", "notes", "projects", "teams", "assets", "roadmap", "releases" })
            if (!workspace.TryGetProperty(key, out var list) || list.ValueKind != JsonValueKind.Array || list.GetArrayLength() > 100_000) throw new InvalidOperationException($"Yedek uyumsuz: {key} listesi eksik veya bozuk.");
        if (!workspace.TryGetProperty("profile", out var profile) || profile.ValueKind != JsonValueKind.Object) throw new InvalidOperationException("Yedek uyumsuz: profil eksik veya bozuk.");
    }

    private static HashSet<string> CollectStoredNames(JsonElement value)
    {
        var result = new HashSet<string>(StringComparer.Ordinal);
        Visit(value);
        return result;
        void Visit(JsonElement entry)
        {
            if (entry.ValueKind == JsonValueKind.Array) { foreach (var child in entry.EnumerateArray()) Visit(child); return; }
            if (entry.ValueKind != JsonValueKind.Object) return;
            if (entry.TryGetProperty("storedName", out var name) && name.ValueKind == JsonValueKind.String)
            {
                var stored = name.GetString() ?? "";
                if (!Regex.IsMatch(stored, "^[a-f0-9-]+\\.[a-zA-Z0-9]{1,12}$")) throw new InvalidOperationException("Yedekte geçersiz ek adı var.");
                result.Add(stored);
            }
            foreach (var property in entry.EnumerateObject()) Visit(property.Value);
        }
    }

    private static void RewriteStoredNames(JsonNode? node, IReadOnlyDictionary<string, string> mapping)
    {
        if (node is JsonObject obj)
        {
            if (obj["storedName"] is JsonValue value && value.TryGetValue<string>(out var name) && mapping.TryGetValue(name, out var replacement)) obj["storedName"] = replacement;
            foreach (var child in obj.Select(pair => pair.Value).ToArray()) RewriteStoredNames(child, mapping);
        }
        else if (node is JsonArray array) foreach (var child in array) RewriteStoredNames(child, mapping);
    }

    private static void WriteAtomic(string destination, byte[] bytes)
    {
        var temporary = destination + "." + Guid.NewGuid().ToString("N") + ".tmp";
        try { File.WriteAllBytes(temporary, bytes); File.Move(temporary, destination, true); }
        catch { if (File.Exists(temporary)) File.Delete(temporary); throw; }
    }

    private static byte[] CompressBackup(byte[] json)
    {
        using var output = new MemoryStream();
        output.Write(Encoding.UTF8.GetBytes("ROTA1\n"));
        using (var gzip = new GZipStream(output, CompressionLevel.Optimal, leaveOpen: true)) gzip.Write(json);
        return output.ToArray();
    }

    private static byte[] DecompressBackup(byte[] bytes)
    {
        using var input = new MemoryStream(bytes);
        using var gzip = new GZipStream(input, CompressionMode.Decompress);
        using var output = new MemoryStream();
        var buffer = new byte[81920];
        int read;
        while ((read = gzip.Read(buffer)) > 0)
        {
            if (output.Length + read > MaxBackupBytes) throw new InvalidOperationException("Yedek dosyası 1 GB sınırını aşıyor.");
            output.Write(buffer, 0, read);
        }
        return output.ToArray();
    }

    private sealed record BackupAttachment(string StoredName, int Size, string Sha256, string Data);
    private sealed record BackupEnvelope(string Format, int Version, DateTimeOffset CreatedAt, JsonNode Workspace, IReadOnlyList<BackupAttachment> Attachments);
    private sealed record RestoreStage(string Directory, string[] Files);
}
