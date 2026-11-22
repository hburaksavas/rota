interface FollowUpsApi {
  state(): WorkspaceState;
  save(): boolean;
  id(prefix: string): string;
  icon(name: string): string;
  esc(value: unknown): string;
  toast(message: string): void;
  openRecord(kind: FollowUpRecordKind, id: string): void;
  openItem(id: string): void;
  closeModal(): void;
  onSelectView?(): void;
  /** Senden yanıt bekleyen talepler ve sorular; aynı Takipler panelinde listelenir. */
  responses: { pending(): number; markup(resolved: boolean): { filters: string; list: string } };
}

type FollowUpView = "due" | "responses" | "waiting" | "answered";
const FOLLOW_UP_VIEWS: FollowUpView[] = ["due", "responses", "waiting", "answered"];
const ALL_OWNERS = "*";

export function createFollowUps(api: FollowUpsApi) {
  const root = document.getElementById("view-root")!;
  const modalRoot = document.getElementById("modal-root")!;
  const e = api.esc;
  const icon = api.icon;
  const state = api.state;
  let view: FollowUpView = "due";
  let ownerFilter: string | null = null;
  let snoozing = "";
  const dateFormat = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });
  const kindLabels: Record<FollowUpRecordKind, string> = { task: "Görev", note: "Not", question: "Soru" };
  const kindIcons: Record<FollowUpRecordKind, string> = { task: "task", note: "note", question: "help" };

  const list = (): PersonalFollowUp[] => (state().followUps ||= []);
  const me = () => state().profile.userName.trim() || "Ben";
  const format = (value?: string) => value && Number.isFinite(Date.parse(value)) ? dateFormat.format(new Date(value)) : "";
  const pad = (value: number) => String(value).padStart(2, "0");
  const localInput = (date: Date) => date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes());
  function tomorrowMorning(): Date { const date = new Date(); date.setDate(date.getDate() + 1); date.setHours(9, 0, 0, 0); return date; }

  function people(): string[] {
    const names = [me(), ...state().teams.flatMap((team) => team.members)].map((name) => name.trim()).filter(Boolean);
    return [...new Map(names.map((name) => [name.toLocaleLowerCase("tr-TR"), name])).values()];
  }

  function record(kind?: FollowUpRecordKind, id?: string): { title: string; version: number; linkedItemId?: string } | undefined {
    if (!kind || !id) return undefined;
    const stamp = (...values: (string | undefined)[]) => Math.max(0, ...values.map((value) => Date.parse(value || "") || 0));
    if (kind === "task") { const task = state().tasks.find((entry) => entry.id === id); return task && { title: task.title, version: stamp(task.updatedAt), linkedItemId: task.linked || undefined }; }
    if (kind === "note") { const note = state().notes.find((entry) => entry.id === id); return note && { title: note.title, version: stamp(note.updatedAt, note.createdAt), linkedItemId: note.linked || undefined }; }
    const question = state().openQuestions?.find((entry) => entry.id === id);
    return question && { title: question.text, version: stamp(question.updatedAt, question.answeredAt, question.createdAt), linkedItemId: question.linkedItemId };
  }

  /** Takibin şu an görünme nedeni; zamanı gelmemişse undefined. */
  function dueReason(followUp: PersonalFollowUp, now = Date.now()): string | undefined {
    if (followUp.doneAt) return undefined;
    if (followUp.snoozedUntil && Date.parse(followUp.snoozedUntil) > now) return undefined;
    if (followUp.recordKind) {
      const source = record(followUp.recordKind, followUp.recordId);
      if (!source) return "Bağlı kayıt silindi";
      if (followUp.trigger === "update") return source.version > (Date.parse(followUp.baseline || "") || 0) ? "Kayıt güncellendi · " + format(new Date(source.version).toISOString()) : undefined;
    }
    if (followUp.trigger === "date" && followUp.dueAt && Date.parse(followUp.dueAt) <= now) return "Tarih geldi · " + format(followUp.dueAt);
    return undefined;
  }

  function waitingReason(followUp: PersonalFollowUp): string {
    if (followUp.snoozedUntil && Date.parse(followUp.snoozedUntil) > Date.now()) return "Ertelendi · " + format(followUp.snoozedUntil);
    return followUp.trigger === "update" ? "Kayıt güncellendiğinde" : "Tarih · " + format(followUp.dueAt);
  }

  const titleOf = (followUp: PersonalFollowUp) => record(followUp.recordKind, followUp.recordId)?.title || followUp.title;
  const linkedItemOf = (followUp: PersonalFollowUp) => followUp.recordKind ? record(followUp.recordKind, followUp.recordId)?.linkedItemId : followUp.linkedItemId;
  const activeFor = (kind: FollowUpRecordKind, id: string) => list().filter((entry) => !entry.doneAt && entry.recordKind === kind && entry.recordId === id);

  function persist(rollback: () => void): boolean {
    if (api.save()) { refresh(); return true; }
    rollback(); return false;
  }

  function bell(kind: FollowUpRecordKind, id: string): string {
    const active = activeFor(kind, id).length;
    const label = active ? "Takip ediliyor · " + active + " kişi" : "Takip başlat";
    return '<button type="button" class="personal-icon followup-bell' + (active ? " is-active" : "") + '" data-followup-kind="' + kind + '" data-followup-record="' + e(id) + '" aria-pressed="' + Boolean(active) + '" aria-label="' + e(label) + '" data-tooltip="' + e(label) + '">' + icon("bell") + '</button>';
  }

  function syncBells(): void {
    root.querySelectorAll<HTMLButtonElement>("[data-followup-kind][data-followup-record]").forEach((button) => {
      button.outerHTML = bell(button.dataset.followupKind as FollowUpRecordKind, button.dataset.followupRecord || "");
    });
  }

  function refresh(): void { renderPanel(); syncBells(); }

  function ownedFollowUps() {
    const owners = people();
    if (ownerFilter === null || (ownerFilter !== ALL_OWNERS && !owners.includes(ownerFilter))) ownerFilter = me();
    const mine = list().filter((entry) => !entry.doneAt && (ownerFilter === ALL_OWNERS || entry.owner === ownerFilter));
    const due = mine.map((entry) => ({ entry, reason: dueReason(entry) })).filter((row): row is { entry: PersonalFollowUp; reason: string } => !!row.reason);
    const waiting = mine.filter((entry) => !dueReason(entry)).map((entry) => ({ entry, reason: waitingReason(entry) }));
    return { owners, due, waiting };
  }

  const segmentLabels: Record<FollowUpView, string> = { due: "Zamanı gelen", responses: "Yanıt bekleyen", waiting: "Planlı", answered: "Yanıtlanan" };
  function segmentCounts(due: number, waiting: number): Partial<Record<FollowUpView, number>> {
    return { due, responses: api.responses.pending(), waiting };
  }

  function renderPanel(): void {
    const panel = root.querySelector<HTMLElement>("#workspace-followups");
    if (!panel) return;
    const { owners, due, waiting } = ownedFollowUps();
    const counts = segmentCounts(due.length, waiting.length);
    const integrated = panel.closest(".workspace-panel");
    const segments = FOLLOW_UP_VIEWS.map((key) => '<button type="button" data-followup-view="' + key + '" aria-pressed="' + (view === key && (!integrated || !panel.hidden)) + '">' + segmentLabels[key] + (counts[key] === undefined ? "" : ' · <span data-followup-segment-count="' + key + '">' + counts[key] + '</span>') + '</button>').join("");
    const quick = '<button type="button" class="personal-icon icon-action" data-followup-quick aria-label="Hızlı takip ekle" data-tooltip="Hızlı takip ekle">' + icon("add") + '</button>';
    const heading = integrated ? '<div class="workspace-followup-actions">' + quick + '</div>' : '<header class="personal-panel-heading"><h2 id="workspace-followups-title">' + icon("bell") + 'Takipler <span data-followup-count>' + (due.length + (counts.responses || 0)) + '</span></h2>' + quick + '</header>';
    const navigation = integrated?.querySelector("[data-workspace-segments]");
    if (navigation) navigation.innerHTML = '<button type="button" data-workspace-notes aria-pressed="' + panel.hidden + '">Notlar</button>' + segments;
    const segmentBar = integrated ? "" : '<div class="po-segments">' + segments + '</div>';

    if (view === "responses" || view === "answered") {
      const responses = api.responses.markup(view === "answered");
      panel.innerHTML = heading + '<div class="po-mine-toolbar followup-toolbar">' + segmentBar + responses.filters + '</div><div class="po-request-list">' + responses.list + '</div>';
      return;
    }
    const rows = (view === "due" ? due : waiting).sort((a, b) => (Date.parse(a.entry.snoozedUntil || a.entry.dueAt || a.entry.createdAt) || 0) - (Date.parse(b.entry.snoozedUntil || b.entry.dueAt || b.entry.createdAt) || 0));
    const ownerOptions = '<option value="' + ALL_OWNERS + '"' + (ownerFilter === ALL_OWNERS ? " selected" : "") + '>Tüm kişiler</option>' + owners.map((name) => '<option value="' + e(name) + '"' + (name === ownerFilter ? " selected" : "") + '>' + e(name === me() ? name + " (ben)" : name) + '</option>').join("");
    panel.innerHTML = heading +
      '<div class="po-mine-toolbar followup-toolbar">' + segmentBar + '<select data-followup-owner aria-label="Takip eden kişi">' + ownerOptions + '</select></div>' +
      '<div class="followup-list">' + (rows.map(({ entry, reason }) => row(entry, reason, view === "due")).join("") || '<p class="po-empty">' + (view === "due" ? "Zamanı gelen takip yok." : "Planlı takip yok. Görev, not ve sorulardaki zil simgesiyle takip başlatabilirsin.") + '</p>') + '</div>';
  }

  /** Paneli yeniden çizmeden sayaçları günceller; yazma odağını korur. */
  function syncCounts(): void {
    const panel = root.querySelector<HTMLElement>("#workspace-followups");
    if (!panel) return;
    const { due, waiting } = ownedFollowUps();
    const counts = segmentCounts(due.length, waiting.length);
    (panel.closest(".workspace-panel") || panel).querySelectorAll<HTMLElement>("[data-followup-segment-count]").forEach((node) => { node.textContent = String(counts[node.dataset.followupSegmentCount as FollowUpView] ?? 0); });
    const total = panel.querySelector("[data-followup-count]");
    if (total) total.textContent = String(due.length + (counts.responses || 0));
  }

  function row(entry: PersonalFollowUp, reason: string, due: boolean): string {
    const kind = entry.recordKind;
    const linked = linkedItemOf(entry);
    const item = linked ? state().items.find((candidate) => candidate.id === linked) : undefined;
    const missing = kind && !record(kind, entry.recordId);
    const open = kind && !missing ? 'data-followup-open="' + e(entry.id) + '"' : 'data-followup-edit="' + e(entry.id) + '"';
    const snoozeOptions = snoozing === entry.id ? '<div class="followup-snooze" role="group" aria-label="Ertele"><button type="button" data-followup-snooze="' + e(entry.id) + '" data-until="hour">1 saat</button><button type="button" data-followup-snooze="' + e(entry.id) + '" data-until="tomorrow">Yarın 09:00</button><button type="button" data-followup-snooze="' + e(entry.id) + '" data-until="week">1 hafta</button>' + (entry.trigger === "update" && !missing ? '<button type="button" data-followup-snooze="' + e(entry.id) + '" data-until="next-update">Sonraki güncellemede</button>' : "") + '</div>' : "";
    return '<article class="followup-row' + (due ? " is-due" : "") + '"><span class="personal-record-symbol">' + icon(kind ? kindIcons[kind] : "bell") + '</span><div class="followup-main"><button type="button" class="personal-record-open" ' + open + '><strong>' + e(titleOf(entry)) + '</strong><small><span class="followup-reason">' + e(reason) + '</span>' + e(" · " + (kind ? kindLabels[kind] : "Hızlı takip")) + '</small></button><div class="followup-meta"><span class="po-chip">' + e(entry.owner) + '</span>' + (item ? '<button type="button" class="po-item-link" data-followup-item="' + e(item.id) + '">' + e(item.id + " · " + item.title) + icon("chevronRight") + '</button>' : linked ? '<small>' + e(linked) + '</small>' : "") + (entry.note ? '<small class="followup-note">' + e(entry.note) + '</small>' : "") + '</div>' + snoozeOptions + '</div>' +
      '<button type="button" class="personal-icon" data-followup-edit="' + e(entry.id) + '" aria-label="Takibi düzenle" data-tooltip="Takibi düzenle">' + icon("edit") + '</button>' +
      '<button type="button" class="personal-icon' + (snoozing === entry.id ? " is-pinned" : "") + '" data-followup-snooze-toggle="' + e(entry.id) + '" aria-expanded="' + (snoozing === entry.id) + '" aria-label="Ertele" data-tooltip="Ertele">' + icon("clock") + '</button>' +
      '<button type="button" class="personal-icon" data-followup-done="' + e(entry.id) + '" aria-label="Takibi bitir" data-tooltip="Takibi bitir">' + icon("check") + '</button></article>';
  }

  function dialogShell(kicker: string, title: string, body: string): void {
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal followup-modal" role="dialog" aria-modal="true" aria-labelledby="followup-dialog-title"><header class="modal-header"><div><div class="panel-kicker">' + kicker + '</div><h2 id="followup-dialog-title">' + e(title) + '</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header>' + body + '</section></div>';
  }

  const ownerSelect = (selected: string) => '<select class="field-input" name="owner">' + people().map((name) => '<option value="' + e(name) + '"' + (name === selected ? " selected" : "") + '>' + e(name === me() ? name + " (ben)" : name) + '</option>').join("") + '</select>';

  /** Görev, not veya soru için takip penceresi. Aynı kişi aynı kayıtta tek etkin takibe sahiptir. */
  function openRecordDialog(kind: FollowUpRecordKind, id: string, owner = me()): void {
    const source = record(kind, id);
    if (!source) { api.toast("Kayıt bulunamadı."); return; }
    const active = activeFor(kind, id);
    const current = active.find((entry) => entry.owner === owner);
    const existing = active.map((entry) => '<li><span class="po-chip">' + e(entry.owner) + '</span><span>' + e(entry.trigger === "update" ? "Kayıt güncellendiğinde" : "Tarih · " + format(entry.dueAt)) + '</span><button type="button" class="text-button" data-followup-pick-owner="' + e(entry.owner) + '">Düzenle</button><button type="button" class="text-button" data-followup-done="' + e(entry.id) + '" data-followup-in-dialog>Bitir</button></li>').join("");
    const trigger = current?.trigger || "date";
    dialogShell("TAKİP · " + kindLabels[kind].toLocaleUpperCase("tr-TR"), source.title,
      '<form id="followup-record-form" class="settings-form" data-kind="' + kind + '" data-id="' + e(id) + '">' +
      (existing ? '<div class="followup-existing"><strong>Bu kaydı takip edenler</strong><ul>' + existing + '</ul></div>' : '') +
      '<label class="field-label">Takip eden' + ownerSelect(owner) + '</label>' +
      '<fieldset class="followup-trigger"><legend>Ne zaman hatırlatılsın?</legend><label><input type="radio" name="trigger" value="date"' + (trigger === "date" ? " checked" : "") + '><span>Belirli bir tarihte</span></label><label><input type="radio" name="trigger" value="update"' + (trigger === "update" ? " checked" : "") + '><span>Kayıt güncellendiğinde</span></label></fieldset>' +
      '<label class="field-label" data-followup-date' + (trigger === "date" ? "" : " hidden") + '>Tarih ve saat<input class="field-input" type="datetime-local" name="dueAt" value="' + e(current?.dueAt || localInput(tomorrowMorning())) + '"' + (trigger === "date" ? " required" : "") + '></label>' +
      '<label class="field-label">Not <small>(isteğe bağlı)</small><input class="field-input" name="note" maxlength="300" placeholder="Neyi kontrol edeceksin?" value="' + e(current?.note || "") + '"></label>' +
      '<footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">' + (current ? "Takibi güncelle" : "Takibi başlat") + '</button></footer></form>');
    modalRoot.querySelector<HTMLSelectElement>('#followup-record-form select[name="owner"]')?.addEventListener("change", (event) => openRecordDialog(kind, id, (event.target as HTMLSelectElement).value));
  }

  /** Kayda bağlı olmayan hızlı takip; sonradan bir backlog işine bağlanabilir. */
  function openQuickDialog(followUpId?: string): void {
    const current = followUpId ? list().find((entry) => entry.id === followUpId) : undefined;
    const items = state().items.filter((item) => !item.archived);
    dialogShell("HIZLI TAKİP", current ? "Takibi düzenle" : "Hızlı takip ekle",
      '<form id="followup-quick-form" class="settings-form" data-id="' + e(current?.id || "") + '"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="200" required autofocus placeholder="Örn. Hazine ekibinden limit onayını sor" value="' + e(current?.title || "") + '"></label>' +
      '<div class="form-two-col"><label class="field-label">Tarih ve saat<input class="field-input" type="datetime-local" name="dueAt" required value="' + e(current?.dueAt || localInput(tomorrowMorning())) + '"></label><label class="field-label">Takip eden' + ownerSelect(current?.owner || me()) + '</label></div>' +
      '<label class="field-label">Bağlı backlog işi<select class="field-input" name="linkedItemId"><option value="">Bağımsız takip</option>' + items.map((item) => '<option value="' + e(item.id) + '"' + (item.id === current?.linkedItemId ? " selected" : "") + '>' + e(item.id + " · " + item.title) + '</option>').join("") + '</select></label>' +
      '<label class="field-label">Not <small>(isteğe bağlı)</small><input class="field-input" name="note" maxlength="300" value="' + e(current?.note || "") + '"></label>' +
      '<footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">' + (current ? "Değişiklikleri kaydet" : "Takip ekle") + '</button></footer></form>');
  }

  function saveRecordForm(form: HTMLFormElement): void {
    const kind = form.dataset.kind as FollowUpRecordKind;
    const id = form.dataset.id || "";
    const source = record(kind, id);
    if (!source) return;
    const values = new FormData(form);
    const owner = String(values.get("owner") || me());
    const trigger = values.get("trigger") === "update" ? "update" : "date";
    const dueAt = String(values.get("dueAt") || "");
    if (trigger === "date" && !Number.isFinite(Date.parse(dueAt))) { api.toast("Takip için geçerli bir tarih seç."); return; }
    const now = new Date().toISOString();
    const snapshot = list().slice();
    const existing = activeFor(kind, id).find((entry) => entry.owner === owner);
    const next: PersonalFollowUp = { ...(existing || { id: api.id("FUP"), createdAt: now }), title: source.title, owner, trigger, recordKind: kind, recordId: id, dueAt: trigger === "date" ? dueAt : undefined, baseline: trigger === "update" ? new Date(Math.max(source.version, Date.now())).toISOString() : undefined, note: String(values.get("note") || "").trim() || undefined, snoozedUntil: undefined, notifiedAt: undefined, updatedAt: now };
    state().followUps = existing ? list().map((entry) => entry === existing ? next : entry) : [next, ...list()];
    if (persist(() => { state().followUps = snapshot; })) { api.closeModal(); api.toast(existing ? "Takip güncellendi." : "Takip başlatıldı."); }
  }

  function saveQuickForm(form: HTMLFormElement): void {
    const values = new FormData(form);
    const title = String(values.get("title") || "").trim();
    const dueAt = String(values.get("dueAt") || "");
    if (!title || !Number.isFinite(Date.parse(dueAt))) { api.toast("Başlık ve geçerli bir tarih gir."); return; }
    const now = new Date().toISOString();
    const snapshot = list().slice();
    const existing = list().find((entry) => entry.id === form.dataset.id);
    const next: PersonalFollowUp = { ...(existing || { id: api.id("FUP"), createdAt: now }), title, owner: String(values.get("owner") || me()), trigger: "date", dueAt, linkedItemId: String(values.get("linkedItemId") || "") || undefined, note: String(values.get("note") || "").trim() || undefined, snoozedUntil: existing?.dueAt === dueAt ? existing.snoozedUntil : undefined, notifiedAt: existing?.dueAt === dueAt ? existing.notifiedAt : undefined, updatedAt: now };
    state().followUps = existing ? list().map((entry) => entry === existing ? next : entry) : [next, ...list()];
    if (persist(() => { state().followUps = snapshot; })) { api.closeModal(); api.toast(existing ? "Takip güncellendi." : "Hızlı takip eklendi."); }
  }

  function update(id: string, change: (entry: PersonalFollowUp) => void, message: string): void {
    const entry = list().find((candidate) => candidate.id === id);
    if (!entry) return;
    const previous = { ...entry };
    change(entry);
    entry.updatedAt = new Date().toISOString();
    if (persist(() => { Object.keys(entry).forEach((key) => delete (entry as unknown as Record<string, unknown>)[key]); Object.assign(entry, previous); })) api.toast(message);
  }

  function snooze(id: string, until: string): void {
    const entry = list().find((candidate) => candidate.id === id);
    if (!entry) return;
    snoozing = "";
    if (until === "next-update") {
      const version = record(entry.recordKind, entry.recordId)?.version || Date.now();
      update(id, (target) => { target.baseline = new Date(Math.max(version, Date.now())).toISOString(); target.snoozedUntil = undefined; target.notifiedAt = undefined; }, "Takip sonraki güncellemeye kadar bekleyecek.");
      return;
    }
    const date = until === "tomorrow" ? tomorrowMorning() : new Date(Date.now() + (until === "week" ? 7 * 24 : 1) * 3_600_000);
    update(id, (target) => { target.snoozedUntil = date.toISOString(); target.notifiedAt = undefined; }, "Takip " + dateFormat.format(date) + " tarihine ertelendi.");
  }

  /** Yeni zamanı gelen takipleri bir kez bildirir. */
  function check(): void {
    const now = Date.now();
    const fresh = list().filter((entry) => !entry.notifiedAt && dueReason(entry, now));
    if (!fresh.length) return;
    const notifiedAt = new Date(now).toISOString();
    fresh.forEach((entry) => { entry.notifiedAt = notifiedAt; });
    if (!api.save()) return;
    renderPanel();
    api.toast("Takip zamanı geldi: " + fresh.slice(0, 3).map(titleOf).join("; ") + (fresh.length > 3 ? " +" + (fresh.length - 3) : ""));
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const button = target.closest<HTMLElement>("[data-followup-kind], [data-followup-quick], [data-followup-view], [data-followup-open], [data-followup-edit], [data-followup-item], [data-followup-snooze-toggle], [data-followup-snooze], [data-followup-done], [data-followup-pick-owner]");
    if (!button) return;
    const data = button.dataset;
    if (data.followupKind) { event.preventDefault(); event.stopPropagation(); openRecordDialog(data.followupKind as FollowUpRecordKind, data.followupRecord || ""); return; }
    if (data.followupQuick !== undefined) { openQuickDialog(); return; }
    if (data.followupView) { api.onSelectView?.(); view = FOLLOW_UP_VIEWS.includes(data.followupView as FollowUpView) ? data.followupView as FollowUpView : "due"; snoozing = ""; renderPanel(); root.querySelector<HTMLButtonElement>('[data-followup-view="' + view + '"]')?.focus(); return; }
    if (data.followupItem) { api.openItem(data.followupItem); return; }
    if (data.followupSnoozeToggle) { snoozing = snoozing === data.followupSnoozeToggle ? "" : data.followupSnoozeToggle; renderPanel(); root.querySelector<HTMLElement>('[data-followup-snooze-toggle="' + CSS.escape(data.followupSnoozeToggle) + '"]')?.focus(); return; }
    if (data.followupSnooze) { snooze(data.followupSnooze, data.until || "hour"); return; }
    if (data.followupPickOwner) { const form = modalRoot.querySelector<HTMLFormElement>("#followup-record-form"); if (form) openRecordDialog(form.dataset.kind as FollowUpRecordKind, form.dataset.id || "", data.followupPickOwner); return; }
    if (data.followupDone) {
      const inDialog = data.followupInDialog !== undefined;
      const form = modalRoot.querySelector<HTMLFormElement>("#followup-record-form");
      update(data.followupDone, (entry) => { entry.doneAt = new Date().toISOString(); }, "Takip bitirildi.");
      if (inDialog && form) openRecordDialog(form.dataset.kind as FollowUpRecordKind, form.dataset.id || "");
      return;
    }
    const entry = list().find((candidate) => candidate.id === (data.followupOpen || data.followupEdit));
    if (!entry) return;
    if (data.followupOpen && entry.recordKind && entry.recordId) api.openRecord(entry.recordKind, entry.recordId);
    else if (entry.recordKind && entry.recordId && record(entry.recordKind, entry.recordId)) openRecordDialog(entry.recordKind, entry.recordId, entry.owner);
    else if (!entry.recordKind) openQuickDialog(entry.id);
    else api.toast("Bağlı kayıt silinmiş. Takibi bitirebilirsin.");
  }, true);

  document.addEventListener("change", (event) => {
    const input = event.target;
    if (input instanceof HTMLSelectElement && input.dataset.followupOwner !== undefined) { ownerFilter = input.value; renderPanel(); return; }
    if (input instanceof HTMLInputElement && input.name === "trigger" && input.closest("#followup-record-form")) {
      const date = modalRoot.querySelector<HTMLElement>("[data-followup-date]");
      const field = date?.querySelector<HTMLInputElement>("input");
      if (date && field) { date.hidden = input.value !== "date"; field.required = input.value === "date"; }
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.id === "followup-record-form") { event.preventDefault(); event.stopPropagation(); saveRecordForm(form); }
    else if (form.id === "followup-quick-form") { event.preventDefault(); event.stopPropagation(); saveQuickForm(form); }
  }, true);

  return { bell, renderPanel, syncCounts, check, dueReason };
}
