interface PoToolsApi {
  state(): WorkspaceState;
  save(): boolean;
  id(prefix: string): string;
  icon(name: string): string;
  esc(value: unknown): string;
  navigate(view: string): void;
  view(): string;
  activeProject(): string | null;
  openItem(id: string): void;
  toast(message: string): void;
  commitItemEdit(): boolean;
}
type ThreadRow = { id: string; text: string; label: string; author: string; at: string; source?: { kind: string; id: string } };
export function createPoTools(api: PoToolsApi) {
  const root = document.getElementById('view-root')!;
  const modalRoot = document.getElementById('modal-root')!;
  const e = api.esc;
  const icon = api.icon;
  const state = api.state;
  const now = () => new Date().toISOString();
  const kindLabels: Record<PoRequestKind, string> = { clarification: 'Açıklama', example: 'Örnek', confirmation: 'Teyit', decision: 'Karar' };
  const meetingLabels: Record<PoMeetingKind, string> = { task: 'Görev', question: 'Soru', decision: 'Karar' };
  let meetingId = '';
  let mineFilter = '';
  let mineResolved = false;
  let mineQuery = '';
  let splitItem = '';
  let referenceKind: 'note' | 'rule' = 'note';
  let referenceId = '';
  const drafts = new Map<string, string>();
  const dateLabel = (value: string) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Tarih belirtilmedi';
  const tool = (name: string, label: string, glyph: string, attrs = '') => '<button type="button" class="personal-icon icon-action" data-po="' + name + '" ' + attrs + ' aria-label="' + label + '" title="' + label + '">' + icon(glyph) + '</button>';
  const projects = () => state().projects.filter(project => !project.archived);
  const liveItems = () => state().items.filter(item => !item.archived && projects().some(project => project.name === item.project));
  const itemOptions = (selected: string, projectId = '') => '<option value="">Bağımsız kayıt</option>' + liveItems().filter(item => !projectId || state().projects.find(project => project.id === projectId)?.name === item.project).map(item => '<option value="' + e(item.id) + '" ' + (selected === item.id ? 'selected' : '') + '>' + e(item.id + ' · ' + item.title) + '</option>').join('');
  const heading = (title: string, sub: string, glyph: string, action = '') => '<header class="page-title-row inventory-heading"><div class="inventory-identity"><span class="inventory-mark">' + icon(glyph) + '</span><div><h1>' + title + '</h1><p>' + sub + '</p></div></div>' + action + '</header>';
  const empty = (text: string) => '<p class="po-empty">' + text + '</p>';
  function syncBadge() {
    const profile = state().profile.userName.trim().toLocaleLowerCase('tr-TR');
    const count = (state().poRequests || []).filter(request => !request.resolvedAt && liveItems().some(item => item.id === request.itemId)).length + (state().openQuestions || []).filter(question => question.status === 'Açık' && [profile, 'po', profile + ' (po)'].includes(question.owner.trim().toLocaleLowerCase('tr-TR')) && !!question.owner.trim() && (!question.linkedItemId || liveItems().some(item => item.id === question.linkedItemId))).length;
    document.querySelectorAll('[data-po-mine-count]').forEach(node => { node.textContent = String(count); });
  }
  function persist(): boolean { const saved = api.save(); if (saved) syncBadge(); return saved; }
  function currentMeeting() { return (state().meetings || []).find(meeting => meeting.id === meetingId); }
  function renderMeetings() {
    const meetings = state().meetings || [];
    if (!currentMeeting()) meetingId = meetings[0]?.id || '';
    const meeting = currentMeeting();
    const content = meeting ? '<div class="po-meeting-meta"><label>Oturum adı<input data-po-meeting-title maxlength="140" aria-label="Toplantı adı" value="' + e(meeting.title) + '"></label><label>Ürün / proje<select data-po-meeting-project ' + (meeting.entries.length ? 'disabled' : '') + '><option value="">Tüm projeler</option>' + projects().map(project => '<option value="' + e(project.id) + '" ' + (project.id === meeting.projectId ? 'selected' : '') + '>' + e(project.name) + '</option>').join('') + '</select></label></div><div class="po-meeting-lines">' + (meeting.entries.map(entry => '<article class="po-meeting-line" data-po-entry="' + e(entry.id) + '"><select data-po-entry-kind aria-label="Kayıt türü" ' + (entry.recordId ? 'disabled' : '') + '>' + Object.entries(meetingLabels).map(([key, label]) => '<option value="' + key + '" ' + (entry.kind === key ? 'selected' : '') + '>' + label + '</option>').join('') + '</select><textarea data-po-entry-text rows="2" maxlength="12000" aria-label="Toplantı satırı" ' + (entry.recordId ? 'readonly' : '') + '>' + e(entry.text) + '</textarea><select data-po-entry-link aria-label="İlişkili iş" ' + (entry.recordId ? 'disabled' : '') + '>' + itemOptions(entry.linkedItemId, meeting.projectId) + '</select>' + (entry.recordId ? '<span class="po-record-created">' + icon('check') + 'Oluşturuldu</span>' : tool('delete-entry', 'Satırı kaldır', 'delete', 'data-id="' + e(entry.id) + '"')) + '</article>').join('') || empty('Görüşme sırasında görev, soru ve kararları aşağıya yaz.')) + '</div><form data-po-form="meeting-entry" class="po-meeting-composer"><div><select name="kind" aria-label="Yeni kayıt türü">' + Object.entries(meetingLabels).map(([key, label]) => '<option value="' + key + '">' + label + '</option>').join('') + '</select><select name="linkedItemId" aria-label="Yeni satırın ilişkili işi">' + itemOptions('', meeting.projectId) + '</select></div><div class="po-message-box"><textarea name="text" rows="2" maxlength="12000" aria-label="Toplantıya satır ekle" placeholder="Görüşmede konuşulanı yaz…">' + e(drafts.get('meeting:' + meeting.id) || '') + '</textarea><button type="submit" aria-label="Satır ekle" title="Satır ekle">' + icon('arrowUp') + '</button></div></form><footer class="po-meeting-footer"><span>' + meeting.entries.filter(entry => entry.recordId).length + ' kayıt oluşturuldu · ' + meeting.entries.filter(entry => !entry.recordId).length + ' bekliyor</span><button type="button" class="button button-primary button-small" data-po="distribute" ' + (!meeting.entries.some(entry => !entry.recordId) ? 'disabled' : '') + '>Kayıtları oluştur</button></footer>' : '<div class="po-meeting-welcome">' + icon('note') + '<h2>Toplantıyı kayda dönüştür</h2><p>Satırları görev, soru veya karar olarak yakala; hazır olduğunda ilgili işlere bağla.</p><button type="button" class="button button-secondary" data-po="new-meeting">Toplantı başlat</button></div>';
    root.innerHTML = '<div class="page-content po-page" data-scroll-layout="ready">' + heading('Toplantı modu', 'Görüşmeden aksiyona, bağlamı kaybetmeden', 'note', tool('new-meeting', 'Yeni toplantı', 'add')) + '<div class="po-meeting-layout"><aside class="po-meeting-list">' + (meetings.map(entry => '<button type="button" data-po="select-meeting" data-id="' + e(entry.id) + '" aria-pressed="' + (meetingId === entry.id) + '"><strong>' + e(entry.title || 'Adsız toplantı') + '</strong><small>' + e(dateLabel(entry.createdAt)) + ' · ' + entry.entries.length + ' satır</small></button>').join('') || empty('Kayıtlı toplantı yok.')) + '</aside><section class="po-meeting-editor">' + content + '</section></div></div>';
  }
  function createMeetingRecord(kind: PoMeetingKind | "note", text: string, meetingTitle: string, at: string, item?: WorkItem, projectId?: string): string {
    const workspace = state();
    const title = text.split('\n')[0];
    if (kind === 'task') {
      const id = api.id('TASK');
      workspace.tasks.unshift({ id, title: title.slice(0, 120), description: text, due: '', done: false, linked: item?.id || '' });
      return id;
    }
    if (kind === 'question') {
      const id = api.id('Q');
      (workspace.openQuestions ||= []).unshift({ id, text, owner: '', expectedAt: '', linkedItemId: item?.id, status: 'Açık', createdAt: at });
      return id;
    }
    if (kind === 'note') {
      const id = api.id('N');
      workspace.notes.unshift({ id, title: title.slice(0, 120), body: text, linked: item?.id || '', updated: 'Az önce', createdAt: at });
      return id;
    }
    const id = api.id('DEC');
    (workspace.decisions ||= []).unshift({
      id, title: title.slice(0, 140), context: 'Toplantı: ' + meetingTitle, rationale: text, options: [],
      owner: workspace.profile.userName || 'PO', decidedAt: at.slice(0, 10), status: 'Taslak',
      workItemIds: item ? [item.id] : [],
      projectIds: item ? workspace.projects.filter(project => project.name === item.project).map(project => project.id) : projectId ? [projectId] : [],
      assetIds: [], releaseIds: [], history: [], updatedAt: at
    });
    return id;
  }

  function saveStageRecord(kind: PoMeetingKind | "note", text: string, item: WorkItem): string | undefined {
    const workspace = state();
    const snapshot = {
      tasks: [...workspace.tasks], notes: [...workspace.notes],
      openQuestions: workspace.openQuestions?.slice(), decisions: workspace.decisions?.slice()
    };
    const id = createMeetingRecord(kind, text, 'Toplantı sahnesi', now(), item);
    if (persist()) return id;
    Object.assign(workspace, snapshot);
  }

  function distributeMeeting() {
    const meeting = currentMeeting(); if (!meeting) return;
    const pending = meeting.entries.filter(entry => !entry.recordId);
    if (!pending.length) return;
    if (meeting.projectId && !projects().some(project => project.id === meeting.projectId)) { api.toast('Toplantının projesi arşivlenmiş. Kayıtlar oluşturulmadı.'); return; }
    if (pending.some(entry => !entry.text.trim() || entry.linkedItemId && !liveItems().some(item => item.id === entry.linkedItemId && (!meeting.projectId || state().projects.find(project => project.id === meeting.projectId)?.name === item.project)))) { api.toast('Boş satırları veya artık bulunmayan iş bağlantılarını düzelt.'); return; }
    const snapshot = structuredClone({ tasks: state().tasks, openQuestions: state().openQuestions, decisions: state().decisions, meetings: state().meetings });
    const at = now();
    pending.forEach(entry => {
      const item = state().items.find(item => item.id === entry.linkedItemId);
      entry.recordId = createMeetingRecord(entry.kind, entry.text.trim(), meeting.title, at, item, meeting.projectId);
    });
    meeting.updatedAt = at;
    if (!persist()) { Object.assign(state(), snapshot); return; }
    renderMeetings(); api.toast(pending.length + ' kayıt oluşturuldu. Kararlar taslak olarak kaydedildi.');
  }
  function isMine(question: OpenQuestion) {
    const name = state().profile.userName.trim().toLocaleLowerCase('tr-TR');
    return [name, 'po', name + ' (po)'].includes(question.owner.trim().toLocaleLowerCase('tr-TR')) && !!question.owner.trim();
  }
  function renderMine() {
    const mine = (state().poRequests || []).filter(request => liveItems().some(item => item.id === request.itemId) && !!request.resolvedAt === mineResolved && (!mineFilter || request.kind === mineFilter));
    const questions = (state().openQuestions || []).filter(question => isMine(question) && (question.status === 'Yanıtlandı') === mineResolved && !mineFilter && (!question.linkedItemId || liveItems().some(item => item.id === question.linkedItemId)));
    const query = mineQuery.toLocaleLowerCase('tr-TR');
    const requests = mine.filter(request => [request.text, request.requestedBy, state().items.find(item => item.id === request.itemId)?.title, request.answer].join(' ').toLocaleLowerCase('tr-TR').includes(query));
    const cards = requests.map(request => {
      const item = state().items.find(item => item.id === request.itemId)!;
      return '<article class="po-request-card"><header><span class="po-chip">' + kindLabels[request.kind] + '</span><small>' + e(request.requestedBy + ' · ' + dateLabel(request.createdAt)) + '</small></header><p>' + e(request.text) + '</p><button type="button" class="po-item-link" data-po="open-item" data-id="' + e(item.id) + '">' + e(item.id + ' · ' + item.title) + icon('chevronRight') + '</button>' + (request.resolvedAt ? '<div class="po-answer"><strong>Yanıtın</strong><p>' + e(request.answer || '') + '</p><small>' + e(dateLabel(request.resolvedAt)) + '</small></div><button type="button" class="po-text-button" data-po="reopen-request" data-id="' + e(request.id) + '">Yeniden aç</button>' : answerForm('request', request.id)) + '</article>';
    }).join('') + questions.filter(question => [question.text, question.answer, question.linkedItemId].join(' ').toLocaleLowerCase('tr-TR').includes(query)).map(question => '<article class="po-request-card"><header><span class="po-chip">Soru</span><small>' + e(dateLabel(question.createdAt)) + '</small></header><p>' + e(question.text) + '</p>' + (question.linkedItemId ? '<button type="button" class="po-item-link" data-po="open-item" data-id="' + e(question.linkedItemId) + '">' + e(question.linkedItemId) + icon('chevronRight') + '</button>' : '') + (question.status === 'Yanıtlandı' ? '<div class="po-answer"><strong>Yanıtın</strong><p>' + e(question.answer || '') + '</p></div>' : answerForm('question', question.id)) + '</article>').join('');
    root.innerHTML = '<div class="page-content po-page" data-scroll-layout="ready">' + heading('Bana düşenler', 'Açıklama, örnek, teyit ve karar bekleyen konular', 'help') + '<div class="po-mine-toolbar"><div class="po-segments"><button type="button" data-po="mine-open" aria-pressed="' + !mineResolved + '">Bekleyen</button><button type="button" data-po="mine-resolved" aria-pressed="' + mineResolved + '">Yanıtlanan</button></div><select id="po-mine-kind" aria-label="Beklenti türü"><option value="">Tüm beklentiler</option>' + Object.entries(kindLabels).map(([key, label]) => '<option value="' + key + '" ' + (mineFilter === key ? 'selected' : '') + '>' + label + '</option>').join('') + '</select><label class="po-search">' + icon('search') + '<input id="po-mine-search" type="search" aria-label="Bana düşenlerde ara" value="' + e(mineQuery) + '"></label></div><div class="po-request-list">' + (cards || empty(mineResolved ? 'Bu görünümde yanıtlanmış konu yok.' : 'Bu görünümde senden yanıt bekleyen konu yok. İşin Konuşma sekmesinden PO beklentisi ekleyebilirsin.')) + '</div></div>';
    syncBadge();
  }
  function answerForm(kind: string, id: string) {
    return '<form data-po-form="answer" data-kind="' + kind + '" data-id="' + e(id) + '" class="po-answer-form"><textarea name="answer" rows="2" maxlength="12000" aria-label="Yanıtın" placeholder="Yanıtını yaz…">' + e(drafts.get('answer:' + id) || '') + '</textarea><button type="submit" class="button button-secondary button-small">Yanıtı kaydet</button></form>';
  }
  function threadRows(item: WorkItem): ThreadRow[] {
    const rows: ThreadRow[] = (state().workConversations || []).filter(entry => entry.itemId === item.id).map(entry => ({ ...entry, label: 'Konuşma notu', at: entry.createdAt }));
    (item.activity || []).filter(entry => entry.kind === 'comment').forEach(entry => rows.push({ id: entry.id, text: entry.message, author: entry.actor, at: entry.occurredAt, label: 'İlerleme notu' }));
    state().notes.filter(note => note.linked === item.id).forEach(note => rows.push({ id: 'note:' + note.id, text: note.title + (note.body ? '\n' + note.body : ''), label: 'İlişkili not', author: '', at: note.createdAt || '', source: { kind: 'note', id: note.id } }));
    (state().openQuestions || []).filter(question => question.linkedItemId === item.id).forEach(question => {
      rows.push({ id: question.id, text: question.text, label: 'Soru', author: question.owner || '', at: question.createdAt });
      if (question.answer) rows.push({ id: question.id + ':answer', text: question.answer, label: 'Yanıt', author: question.owner || '', at: question.answeredAt || '' });
    });
    (state().decisions || []).filter(decision => decision.workItemIds.includes(item.id)).forEach(decision => rows.push({ id: decision.id, text: decision.title === decision.rationale ? decision.title : decision.title + '\n' + decision.rationale, label: decision.status === 'Taslak' ? 'Karar taslağı' : 'Karar', author: decision.owner, at: decision.updatedAt || decision.decidedAt }));
    (state().poRequests || []).filter(request => request.itemId === item.id).forEach(request => {
      rows.push({ id: request.id, text: request.text, label: 'PO’dan ' + kindLabels[request.kind].toLocaleLowerCase('tr-TR') + ' bekleniyor', author: request.requestedBy, at: request.createdAt });
      if (request.replies?.length) request.replies.forEach((reply, index) => rows.push({ id: request.id + ':reply:' + index, text: reply.text, label: 'PO yanıtı', author: reply.author, at: reply.createdAt }));
      else if (request.answer) rows.push({ id: request.id + ':answer', text: request.answer, label: 'PO yanıtı', author: state().profile.userName || 'PO', at: request.resolvedAt || request.createdAt });
    });
    return rows.sort((a, b) => (Date.parse(a.at) || 0) - (Date.parse(b.at) || 0) || a.id.localeCompare(b.id));
  }
  function renderThread(dialog: HTMLElement, item: WorkItem, query = '') {
    const list = dialog.querySelector('.po-thread-list'); if (!list) return;
    const rows = threadRows(item).filter(row => (row.text + ' ' + row.author + ' ' + row.label).toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR')));
    list.innerHTML = rows.map(row => '<article class="po-thread-row"><header><span class="po-chip">' + e(row.label) + '</span><small>' + e([row.author, dateLabel(row.at)].filter(Boolean).join(' · ')) + '</small></header><p>' + e(row.text) + '</p>' + (row.source ? '<button type="button" class="po-text-button" data-po="reference-note" data-id="' + e(row.source.id) + '">Notu yan yana aç</button>' : '') + '</article>').join('') || empty(query ? 'Eşleşen konuşma yok.' : 'Bu işin konuşma geçmişi henüz boş.');
  }
  function enhanceDetail(item: WorkItem) {
    const dialog = modalRoot.querySelector<HTMLElement>('.detail-modal'); if (!dialog) return;
    if (!dialog.querySelector('[data-detail-tab="conversation"]')) {
      dialog.querySelector('.detail-tabs')?.insertAdjacentHTML('beforeend', '<button type="button" data-detail-tab="conversation">Konuşma</button>');
      dialog.querySelector('.detail-main')?.insertAdjacentHTML('beforeend', '<section class="detail-section po-conversation" data-detail-tab-section="conversation" hidden><header><h3>Konuşma geçmişi</h3><label class="po-search">' + icon('search') + '<input type="search" data-po-thread-search aria-label="Konuşmada ara"></label></header><div class="po-thread-list"></div><form data-po-form="conversation" data-item="' + e(item.id) + '"><div class="po-conversation-controls"><select name="mode" aria-label="Mesaj türü"><option value="note">Konuşma notu</option><option value="request">PO’dan yanıt bekle</option></select><select name="kind" aria-label="PO beklentisi" hidden>' + Object.entries(kindLabels).map(([key, label]) => '<option value="' + key + '">' + label + '</option>').join('') + '</select><input name="requestedBy" maxlength="100" aria-label="Yanıt bekleyen kişi" placeholder="Yanıt bekleyen kişi" hidden></div><div class="po-message-box"><textarea name="text" rows="2" maxlength="12000" aria-label="Konuşmaya yaz" placeholder="İşe dair notunu veya beklenen yanıtı yaz…">' + e(drafts.get('conversation:' + item.id) || '') + '</textarea><button type="submit" aria-label="Konuşmaya ekle">' + icon('arrowUp') + '</button></div></form></section>');
      dialog.querySelector('.detail-header .modal-close')?.insertAdjacentHTML('beforebegin', tool('toggle-split', 'Yan yana çalış', 'board'));
    }
    renderThread(dialog, item);
    if (splitItem) openSplit(dialog, item);
  }
  function closeSplit(dialog: HTMLElement) {
    const primary = dialog.querySelector('.po-detail-primary');
    if (primary) dialog.replaceChildren(...primary.childNodes);
    dialog.classList.remove('po-split-view'); splitItem = '';
  }
  function openSplit(dialog: HTMLElement, item: WorkItem) {
    splitItem = item.id;
    if (!dialog.querySelector('.po-detail-primary')) {
      const primary = document.createElement('div'); primary.className = 'po-detail-primary';
      primary.append(...dialog.childNodes); const columns = document.createElement('div'); columns.className = 'po-detail-columns';
      columns.append(primary); const side = document.createElement('aside'); side.className = 'po-reference'; side.setAttribute('aria-label', 'Yan yana referans'); columns.append(side); dialog.append(columns);
    }
    dialog.classList.add('po-split-view'); renderReference(dialog, item);
  }
  function referenceRecords(item: WorkItem) {
    const projectId = state().projects.find(project => project.name === item.project)?.id;
    return referenceKind === 'note' ? state().notes.filter(note => !note.linked || note.linked === item.id || state().items.some(other => other.id === note.linked && other.project === item.project)).map(note => ({ id: note.id, title: note.title })) : (state().productRules || []).filter(rule => rule.projectId === projectId).map(rule => ({ id: rule.id, title: rule.title }));
  }
  function renderReference(dialog: HTMLElement, item: WorkItem) {
    const side = dialog.querySelector('.po-reference'); if (!side) return;
    const records = referenceRecords(item);
    if (!records.some(record => record.id === referenceId)) referenceId = records[0]?.id || '';
    const record = referenceKind === 'note' ? state().notes.find(note => note.id === referenceId) : (state().productRules || []).find(rule => rule.id === referenceId);
    side.innerHTML = '<header><h3>Yan yana çalışma</h3>' + tool('toggle-split', 'Yan paneli kapat', 'close') + '</header><div class="po-reference-controls"><select data-po-reference-kind aria-label="Referans türü"><option value="note" ' + (referenceKind === 'note' ? 'selected' : '') + '>Notlar</option><option value="rule" ' + (referenceKind === 'rule' ? 'selected' : '') + '>Ürün kuralları</option></select>' + tool('new-reference', referenceKind === 'note' ? 'İşe bağlı not oluştur' : 'Ürün kuralı oluştur', 'add') + '</div><select data-po-reference-id aria-label="Referans kaydı"><option value="">Kayıt seç</option>' + records.map(record => '<option value="' + e(record.id) + '" ' + (record.id === referenceId ? 'selected' : '') + '>' + e(record.title || 'Başlıksız kayıt') + '</option>').join('') + '</select>' + (record ? '<label class="po-reference-label">Başlık<input data-po-reference-title maxlength="140" value="' + e(record.title) + '"></label><label class="po-reference-body">' + (referenceKind === 'note' ? 'Not' : 'İş kuralı') + '<textarea data-po-reference-body maxlength="20000">' + e('body' in record ? record.body : '') + '</textarea></label><small class="po-reference-save" role="status">Değişiklikler otomatik kaydedilir</small>' : empty('Yanında çalışmak istediğin kaydı seç veya + ile oluştur.'));
    dialog.querySelector('[data-po="toggle-split"]')?.setAttribute('aria-pressed', 'true');
  }
  function updateReference(input: HTMLInputElement | HTMLTextAreaElement) {
    const record = referenceKind === 'note' ? state().notes.find(note => note.id === referenceId) : (state().productRules || []).find(rule => rule.id === referenceId);
    if (!record) return;
    if (input.matches('[data-po-reference-title]')) record.title = input.value; else record.body = input.value;
    if ('updated' in record) record.updated = 'Az önce'; else record.updatedAt = now();
    if (input.matches('[data-po-reference-title]')) {
      const option = input.closest('.po-reference')?.querySelector<HTMLOptionElement>('[data-po-reference-id] option[value="' + CSS.escape(record.id) + '"]'); if (option) option.textContent = record.title || 'Başlıksız kayıt';
    }
    const dialog = input.closest<HTMLElement>('.detail-modal'); const item = state().items.find(item => item.id === dialog?.dataset.openItem); if (dialog && item) renderThread(dialog, item);
    const saved = persist();
    const status = input.closest('.po-reference')?.querySelector('.po-reference-save'); if (status) status.textContent = saved ? 'Kaydedildi' : 'Kaydedilemedi; tekrar düzenleyerek dene';
  }
  document.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-po]') : null; if (!button) return;
    const action = button.dataset.po; const id = button.dataset.id || '';
    if (action === 'meetings' || action === 'mine') { api.navigate(action === 'meetings' ? 'meetings' : 'my-actions'); return; }
    if (action === 'new-meeting') {
      const meeting: PoMeeting = { id: api.id('MEET'), title: 'Yeni toplantı', projectId: api.activeProject() || '', createdAt: now(), updatedAt: now(), entries: [] };
      state().meetings ||= []; state().meetings!.unshift(meeting); meetingId = meeting.id;
      if (persist()) { if (api.view() !== 'meetings') api.navigate('meetings'); else renderMeetings(); root.querySelector<HTMLInputElement>('[data-po-meeting-title]')?.select(); } return;
    }
    if (action === 'select-meeting') { meetingId = id; renderMeetings(); return; }
    if (action === 'delete-entry') { const meeting = currentMeeting(); if (meeting) { meeting.entries = meeting.entries.filter(entry => entry.id !== id || entry.recordId); if (persist()) renderMeetings(); } return; }
    if (action === 'distribute') { distributeMeeting(); return; }
    if (action === 'mine-open' || action === 'mine-resolved') { mineResolved = action === 'mine-resolved'; renderMine(); return; }
    if (action === 'open-item') { api.openItem(id); return; }
    if (action === 'reopen-request') { const request = state().poRequests?.find(entry => entry.id === id); if (request) { request.resolvedAt = undefined; if (persist()) renderMine(); } return; }
    const dialog = modalRoot.querySelector<HTMLElement>('.detail-modal'); const item = state().items.find(item => item.id === dialog?.dataset.openItem); if (!dialog || !item) return;
    if (action === 'toggle-split') {
      if (!api.commitItemEdit()) return;
      if (dialog.classList.contains('po-split-view')) { closeSplit(dialog); dialog.querySelector<HTMLElement>('[data-po="toggle-split"]')?.focus(); } else openSplit(dialog, item);
    }
    if (action === 'reference-note') { if (!api.commitItemEdit()) return; referenceKind = 'note'; referenceId = id; openSplit(dialog, item); }
    if (action === 'new-reference') {
      if (referenceKind === 'note') { const id = api.id('NOTE'); state().notes.unshift({ id, title: 'Yeni not', body: '', linked: item.id, updated: 'Az önce', createdAt: now(), attachments: [] }); referenceId = id; }
      else {
        const project = state().projects.find(project => project.name === item.project); if (!project) { api.toast('Ürün kuralı için işin projesini belirle.'); return; }
        const id = api.id('RULE'); state().productRules ||= []; state().productRules!.unshift({ id, title: 'Yeni iş kuralı', body: '', projectId: project.id, updatedAt: now() }); referenceId = id;
      }
      if (persist()) { renderReference(dialog, item); (dialog.querySelector('[data-po-reference-title]') as HTMLInputElement)?.select(); renderThread(dialog, item); }
    }
  });
  document.addEventListener('submit', event => {
    const form = event.target instanceof HTMLFormElement ? event.target : null; const kind = form?.dataset.poForm; if (!form || !kind) return;
    event.preventDefault(); const data = new FormData(form);
    if (kind === 'meeting-entry') {
      const meeting = currentMeeting(); const text = String(data.get('text') || '').trim(); if (!meeting || !text) return;
      const kind = String(data.get('kind')) as PoMeetingKind; if (!(kind in meetingLabels)) return;
      meeting.entries.push({ id: api.id('LINE'), text, kind, linkedItemId: String(data.get('linkedItemId') || ''), createdAt: now() }); meeting.updatedAt = now();
      if (persist()) { drafts.delete('meeting:' + meeting.id); renderMeetings(); root.querySelector<HTMLTextAreaElement>('[data-po-form="meeting-entry"] textarea')?.focus(); } return;
    }
    if (kind === 'answer') {
      const answer = String(data.get('answer') || '').trim(); if (!answer) return;
      const id = form.dataset.id!;
      if (form.dataset.kind === 'request') { const request = state().poRequests?.find(entry => entry.id === id); if (!request) return; request.replies ||= [];
        if (!request.replies.length && request.answer) request.replies.push({ text: request.answer, author: state().profile.userName || 'PO', createdAt: request.resolvedAt || request.createdAt });
        request.resolvedAt = now(); request.answer = answer; request.replies.push({ text: answer, author: state().profile.userName || 'PO', createdAt: request.resolvedAt }); }
      else { const question = state().openQuestions?.find(entry => entry.id === id); if (!question) return; question.answer = answer; question.answeredAt = now(); question.status = 'Yanıtlandı'; }
      if (persist()) { drafts.delete('answer:' + id); renderMine(); } return;
    }
    if (kind === 'conversation') {
      const itemId = form.dataset.item!; const item = state().items.find(item => item.id === itemId); const text = String(data.get('text') || '').trim(); if (!item || !text) return;
      if (data.get('mode') === 'request') {
        const requestKind = String(data.get('kind')) as PoRequestKind; if (!(requestKind in kindLabels)) return;
        state().poRequests ||= []; state().poRequests!.push({ id: api.id('POREQ'), itemId, text, kind: requestKind, requestedBy: String(data.get('requestedBy') || '').trim() || 'Takım', createdAt: now() });
      } else { state().workConversations ||= []; state().workConversations!.push({ id: api.id('CHAT'), itemId, text, author: state().profile.userName || 'PO', createdAt: now() }); }
      if (persist()) { drafts.delete('conversation:' + itemId); const textArea = form.querySelector<HTMLTextAreaElement>('textarea')!; textArea.value = ''; textArea.focus(); const dialog = form.closest<HTMLElement>('.detail-modal')!; renderThread(dialog, item); dialog.querySelector('.po-thread-list')?.lastElementChild?.scrollIntoView({ block: 'nearest' }); } return;
    }
  });
  document.addEventListener('input', event => {
    const input = event.target; if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) return;
    const form = input.closest<HTMLFormElement>('[data-po-form]');
    if (form && input instanceof HTMLTextAreaElement) {
      const key = form.dataset.poForm === 'meeting-entry' ? 'meeting:' + meetingId : form.dataset.poForm === 'answer' ? 'answer:' + form.dataset.id : 'conversation:' + form.dataset.item; drafts.set(key, input.value);
    }
    if (input.id === 'po-mine-search') { const start = input.selectionStart; mineQuery = input.value; renderMine(); const next = root.querySelector<HTMLInputElement>('#po-mine-search'); next?.focus(); next?.setSelectionRange(start, start); }
    if (input.matches('[data-po-meeting-title]')) { const meeting = currentMeeting(); if (meeting) { meeting.title = input.value; meeting.updatedAt = now(); persist(); const label = root.querySelector('[data-po="select-meeting"][data-id="' + CSS.escape(meeting.id) + '"] strong'); if (label) label.textContent = input.value || 'Adsız toplantı'; } }
    if (input.matches('[data-po-entry-text]')) { const entry = currentMeeting()?.entries.find(entry => entry.id === input.closest<HTMLElement>('[data-po-entry]')?.dataset.poEntry); if (entry && !entry.recordId) { entry.text = input.value; persist(); } }
    if (input.matches('[data-po-reference-title], [data-po-reference-body]')) updateReference(input);
    if (input.matches('[data-po-thread-search]')) { const dialog = input.closest<HTMLElement>('.detail-modal'); const item = state().items.find(item => item.id === dialog?.dataset.openItem); if (dialog && item) renderThread(dialog, item, input.value); }
  });
  document.addEventListener('change', event => {
    const input = event.target; if (!(input instanceof HTMLSelectElement)) return;
    if (input.id === 'po-mine-kind') { mineFilter = input.value; renderMine(); }
    if (input.matches('[data-po-meeting-project]')) { const meeting = currentMeeting(); if (meeting && !meeting.entries.length) { meeting.projectId = input.value; if (persist()) renderMeetings(); } }
    if (input.matches('[data-po-entry-kind], [data-po-entry-link]')) {
      const entry = currentMeeting()?.entries.find(entry => entry.id === input.closest<HTMLElement>('[data-po-entry]')?.dataset.poEntry);
      if (entry && !entry.recordId) { if (input.matches('[data-po-entry-kind]')) entry.kind = input.value as PoMeetingKind; else entry.linkedItemId = input.value; persist(); }
    }
    if (input.matches('[data-po-form="conversation"] [name="mode"]')) {
      const form = input.closest('form')!; form.querySelectorAll<HTMLElement>('[name="kind"], [name="requestedBy"]').forEach(node => { node.hidden = input.value !== 'request'; });
    }
    if (input.matches('[data-po-reference-kind], [data-po-reference-id]')) {
      if (input.matches('[data-po-reference-kind]')) { referenceKind = input.value as 'note' | 'rule'; referenceId = ''; } else referenceId = input.value;
      const dialog = input.closest<HTMLElement>('.detail-modal'); const item = state().items.find(item => item.id === dialog?.dataset.openItem); if (dialog && item) renderReference(dialog, item);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.isComposing || event.key !== 'Enter' || event.shiftKey || !(event.target instanceof HTMLTextAreaElement) || !event.target.matches('[data-po-form="meeting-entry"] textarea, [data-po-form="conversation"] textarea')) return;
    event.preventDefault(); event.target.closest('form')?.requestSubmit();
  });
  syncBadge();
  return { renderMeetings, renderMine, enhanceDetail, syncBadge, saveStageRecord };
}
