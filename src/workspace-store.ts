interface WorkspaceStoreHooks {
  failed(error: unknown): void;
  saved(): void;
}

/**
 * Çalışma alanının kalıcı kaydı.
 * Masaüstünde ana kayıt host'taki workspace.json dosyasıdır; localStorage geçiş süresince yedek kopya olarak güncellenir.
 * Host yoksa (tarayıcıda açılan index.html ve testler) yalnızca localStorage kullanılır.
 */
export function createWorkspaceStore(key: string, bridge: DesktopBridge | undefined, hooks: WorkspaceStoreHooks) {
  const boot = window.__ROTA_WORKSPACE__;
  const fileMode = Boolean(boot && typeof bridge?.writeWorkspace === "function");
  const readLocal = (): string | null => { try { return localStorage.getItem(key); } catch { return null; } };
  let sequence = 0;
  let current: string | null = fileMode && boot?.status === "ok" ? boot.raw : fileMode && boot?.status === "error" ? null : readLocal();
  const bootError = fileMode && boot?.status === "error" ? boot.message || "Çalışma alanı dosyası okunamadı." : null;

  function send(raw: string): void {
    const id = ++sequence;
    bridge!.writeWorkspace(raw, id).then(() => { if (id === sequence) hooks.saved(); }, (error) => { if (id === sequence) hooks.failed(error); });
  }

  // İlk masaüstü açılışında mevcut localStorage kaydı değiştirilmeden dosyaya kopyalanır; localStorage silinmez.
  let migrated = false;
  if (fileMode && boot?.status === "missing" && current !== null) {
    try { JSON.parse(current); send(current); migrated = true; } catch { /* Okunamayan veri kurtarma akışında ele alınır. */ }
  }

  return {
    fileMode,
    bootError,
    migrated,
    read: (): string | null => current,
    /** Masaüstünde yazma arka planda tamamlanır; hata hooks.failed ile bildirilir. Tarayıcıda localStorage hatası fırlatılır. */
    persist(raw: string): void {
      if (!fileMode) { localStorage.setItem(key, raw); current = raw; return; }
      current = raw;
      try { localStorage.setItem(key, raw); } catch { /* Yedek kopya dolarsa ana kayıt dosyada sürer. */ }
      send(raw);
    },
    clear(): void {
      current = null;
      try { localStorage.removeItem(key); } catch { /* Yedek kopya zaten yok. */ }
    }
  };
}
