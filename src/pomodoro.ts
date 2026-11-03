export function initPomodoro({ desktop, modalRoot, record, toast }: {
  desktop: DesktopBridge | undefined;
  modalRoot: HTMLElement;
  record: (kind: WorkspaceFocusKind, id: string) => { title: string; label: string } | undefined;
  toast: (message: string) => void;
}): void {
  let session: PomodoroSession | null = null;
  let generation = 0;
  let polling = false;
  let busy = false;
  let announced = "";
  const dock = document.createElement("div");
  dock.id = "pomodoro-dock"; dock.hidden = true;
  document.body.append(dock);
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));
  const time = () => {
    const ms = session?.status === "running" && session.endsAt !== null ? Math.max(0, session.endsAt - Date.now()) : session?.remainingMs || 0;
    const seconds = Math.ceil(ms / 1000);
    return { ms, text: String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0") };
  };
  const status = () => !session ? "" : session.status === "completed" ? (session.phase === "focus" ? "Odak süren tamamlandı" : "Molan tamamlandı") : session.status === "paused" ? "Duraklatıldı" : session.phase === "focus" ? "Odaklanıyorsun" : "Mola zamanı";
  const controls = () => !session ? "" : session.status === "completed"
    ? (session.phase === "focus" ? '<button class="button button-primary" data-pomodoro-command="break">' + session.breakMinutes + ' dk mola ver</button>' : '<button class="button button-primary" data-pomodoro-command="again">Yeniden odaklan</button>') + '<button class="button button-quiet" data-pomodoro-command="cancel">Bitir</button>'
    : '<button class="button button-primary" data-pomodoro-command="' + (session.status === "paused" ? 'resume">Devam et' : 'pause">Duraklat') + '</button><button class="button button-quiet" data-pomodoro-command="cancel">Oturumu bitir</button>';
  function refresh() {
    dock.hidden = !session;
    if (!session) return;
    const remaining = time();
    const progress = Math.min(100, Math.max(0, 100 * (1 - remaining.ms / session.durationMs)));
    dock.innerHTML = '<button type="button" data-pomodoro-show aria-label="Pomodoro oturumunu aç"><span class="pomodoro-dock-pulse' + (session.status === "running" ? ' is-running' : '') + '"></span><span><strong>' + escape(status()) + '</strong><small>' + escape(session.title) + '</small></span><b>' + remaining.text + '</b></button>';
    const panel = modalRoot.querySelector<HTMLElement>("[data-pomodoro-session]");
    if (!panel) return;
    panel.classList.toggle("is-running", session.status === "running");
    panel.classList.toggle("is-break", session.phase === "break");
    panel.style.setProperty("--pomodoro-progress", progress + "%");
    const clock = panel.querySelector<HTMLElement>("[data-pomodoro-time]"); if (clock) clock.textContent = remaining.text;
    const heading = panel.querySelector<HTMLElement>("[data-pomodoro-status]"); if (heading) heading.textContent = status();
    const actions = panel.querySelector<HTMLElement>("[data-pomodoro-controls]");
    const controlState = session.status + session.phase;
    if (actions && actions.dataset.state !== controlState) { actions.innerHTML = controls(); actions.dataset.state = controlState; }
    panel.querySelectorAll<HTMLButtonElement>("[data-pomodoro-command]").forEach(button => { button.disabled = busy; });
    const notification = panel.querySelector<HTMLElement>("[data-pomodoro-notification]");
    if (notification) notification.textContent = session.notification === "failed" ? "Windows bildirimi gönderilemedi. Bildirim ayarlarını kontrol edebilirsin." : session.status === "completed" ? (session.notification === "sent" ? "Windows bildirimi gönderildi." : "Windows bildirimi gönderiliyor…") : "Süre dolduğunda Windows bildirimi alacaksın.";
    if (session.status === "completed" && announced !== session.id) { announced = session.id; toast(status()); }
  }
  function showSession() {
    if (!session) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal pomodoro-modal" role="dialog" aria-modal="true" aria-labelledby="pomodoro-title" data-pomodoro-session><header class="modal-header"><div><div class="panel-kicker">POMODORO · ' + (session.phase === "focus" ? "ÇALIŞMA" : "MOLA") + '</div><h2 id="pomodoro-title" data-pomodoro-status></h2></div><button class="modal-close" data-close-modal aria-label="Küçült; süre devam etsin">×</button></header><div class="pomodoro-content"><p class="pomodoro-record">' + escape(session.title) + '</p><div class="pomodoro-ring" role="img" aria-label="Oturum ilerlemesi"><div class="pomodoro-ring-center"><span class="pomodoro-orbit" aria-hidden="true"></span><strong data-pomodoro-time></strong><small>' + (session.phase === "focus" ? session.minutes : session.breakMinutes) + ' dakika ' + (session.phase === "focus" ? "odak" : "mola") + '</small></div></div><p class="pomodoro-caption">' + (session.phase === "focus" ? "Tek bir konuya zaman ayır. Diğer işler bekleyebilir." : "Ekrandan uzaklaş, kısa bir nefes al.") + '</p><div class="pomodoro-controls" data-pomodoro-controls></div><p class="pomodoro-notification" data-pomodoro-notification aria-live="polite"></p></div></section></div>';
    refresh(); modalRoot.querySelector<HTMLButtonElement>(".modal-close")?.focus();
  }
  function configure(kind: WorkspaceFocusKind, id: string) {
    if (session && session.status !== "completed") { showSession(); return; }
    const selected = record(kind, id); if (!selected) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal pomodoro-modal" role="dialog" aria-modal="true" aria-labelledby="pomodoro-title"><header class="modal-header"><div><div class="panel-kicker">POMODORO · ' + escape(selected.label) + '</div><h2 id="pomodoro-title">Odaklanmaya hazır mısın?</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><form id="pomodoro-form" class="settings-form"><p class="pomodoro-record">' + escape(selected.title) + '</p><div class="pomodoro-presets" role="group" aria-label="Çalışma süresi"><button type="button" data-pomodoro-preset="15" aria-pressed="false">15 dk</button><button type="button" data-pomodoro-preset="25" aria-pressed="true">25 dk</button><button type="button" data-pomodoro-preset="50" aria-pressed="false">50 dk</button></div><div class="form-two-col"><label class="field-label">Çalışma süresi (dakika)<input class="field-input" name="minutes" type="number" min="1" max="180" step="1" value="25" required></label><label class="field-label">Mola süresi (dakika)<input class="field-input" name="breakMinutes" type="number" min="1" max="60" step="1" value="5" required></label></div><p class="pomodoro-notification">Çalışmanı tamamla, ardından kısa bir mola ver. Dört turdan sonra daha uzun bir mola seçebilirsin.</p><p class="pomodoro-error" role="alert"></p><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button class="button button-primary" type="submit">Odaklan</button></footer></form></section></div>';
    const form = modalRoot.querySelector<HTMLFormElement>("#pomodoro-form")!;
    form.addEventListener("input", () => form.querySelectorAll<HTMLButtonElement>("[data-pomodoro-preset]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.pomodoroPreset === form.querySelector<HTMLInputElement>('[name="minutes"]')!.value))));
    form.addEventListener("submit", async event => {
      event.preventDefault(); if (busy || !form.reportValidity()) return;
      const error = form.querySelector<HTMLElement>(".pomodoro-error")!;
      if (!desktop?.pomodoroStart) { error.textContent = "Pomodoro’yu Windows masaüstü uygulamasında başlatabilirsin."; return; }
      busy = true; const epoch = ++generation;
      const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!; submit.disabled = true;
      try {
        const values = new FormData(form);
        const result = await desktop.pomodoroStart({ kind, recordId: id, title: selected.title.slice(0, 2000), minutes: Number(values.get("minutes")), breakMinutes: Number(values.get("breakMinutes")) });
        if (epoch === generation) { session = result; showSession(); }
      } catch { error.textContent = "Odak oturumu başlatılamadı. Tekrar dene."; }
      finally { busy = false; submit.disabled = false; refresh(); }
    });
    form.querySelector<HTMLInputElement>('[name="minutes"]')?.focus();
  }
  document.addEventListener("click", async event => {
    const target = event.target instanceof Element ? event.target : null; if (!target) return;
    const start = target.closest<HTMLElement>("[data-pomodoro-kind][data-pomodoro-record]");
    if (start) { configure(start.dataset.pomodoroKind as WorkspaceFocusKind, start.dataset.pomodoroRecord!); return; }
    if (target.closest("[data-pomodoro-show]")) { showSession(); return; }
    const preset = target.closest<HTMLButtonElement>("[data-pomodoro-preset]");
    if (preset) {
      const input = modalRoot.querySelector<HTMLInputElement>('#pomodoro-form [name="minutes"]');
      if (input) { input.value = preset.dataset.pomodoroPreset!; input.dispatchEvent(new Event("input", { bubbles: true })); }
      return;
    }
    const action = target.closest<HTMLButtonElement>("[data-pomodoro-command]");
    if (!action || !session || busy || !desktop) return;
    if (action.dataset.pomodoroCommand === "again") { configure(session.kind, session.recordId); return; }
    busy = true; refresh(); const epoch = ++generation;
    try {
      const command = action.dataset.pomodoroCommand;
      const result = await (command === "pause" ? desktop.pomodoroPause(session.id) : command === "resume" ? desktop.pomodoroResume(session.id) : command === "break" ? desktop.pomodoroBreak(session.id) : desktop.pomodoroCancel(session.id));
      if (epoch === generation) {
        session = result;
        if (session) showSession(); else { modalRoot.innerHTML = ""; dock.hidden = true; }
      }
    } catch { toast("Oturum güncellenemedi. Tekrar dene."); }
    finally { busy = false; refresh(); }
  });
  async function sync() {
    if (!desktop?.pomodoroGet || polling || busy) return;
    polling = true; const epoch = generation;
    try { const result = await desktop.pomodoroGet(); if (epoch === generation) { session = result; refresh(); } }
    catch { /* Keep the last known deadline during temporary bridge interruptions. */ }
    finally { polling = false; }
  }
  void sync();
  window.setInterval(() => { if (session) { refresh(); void sync(); } }, 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) void sync(); });
}
