import { calculatePlanningSchedule, planDate, planDay, planningCapacity, planningMembers, planningPhases, todayInPlan, validItemPlan } from "./planning-schedule";
import type { ItemSchedule } from "./planning-schedule";

interface PlannerOptions {
  root: HTMLElement;
  modal: HTMLElement;
  workspace: () => WorkspaceState;
  save: () => boolean;
  render: () => void;
  close: () => void;
  openItem: (id: string) => void;
  notify: (message: string) => void;
  id: (prefix: string) => string;
  escape: (value: string) => string;
}

type WorkspaceChange = (state: WorkspaceState) => void;
const daysShown = 14;
const clock = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const dayFormat = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", timeZone: "UTC" });
const dayLabel = (date?: string) => Number.isFinite(planDay(date)) ? dayFormat.format(new Date(date + "T00:00:00Z")) : "—";
const rangeLabel = (first?: string, last?: string) => first && first === last ? dayLabel(first) : `${dayLabel(first)} – ${dayLabel(last)}`;
const hours = (minutes: number) => `${clock.format(minutes / 60)} sa`;

export function createProjectPlanner(options: PlannerOptions) {
  const { root, modal, workspace, escape: esc } = options;
  let productId = "";
  let planId = "";
  let calendarDate = todayInPlan();
  let currentTab: "inventory" | "timeline" | "capacity" = "inventory";
  let pending: { change: WorkspaceChange; after?: () => void } | undefined;

  const action = (name: string, label: string, id = "", style = "secondary") => `<button type="button" class="button button-${style} button-small" data-planner-action="${name}" data-planner-id="${esc(id)}">${esc(label)}</button>`;
  const productItems = (state: WorkspaceState, id: string) => {
    const product = state.projects.find((entry) => entry.id === id);
    return product ? state.items.filter((item) => !item.archived && item.project === product.name) : [];
  };
  const planItems = (state: WorkspaceState, plan: ProjectPlan) => productItems(state, plan.productId).filter((item) => item.planning?.planId === plan.id);
  const planOptions = (state: WorkspaceState, item: WorkItem) => (state.projectPlans || []).filter((plan) => state.projects.some((product) => !product.archived && product.id === plan.productId && product.name === item.project));
  const value = (data: FormData, name: string) => String(data.get(name) || "").trim();

  function setPlan(id: string) {
    planId = id;
    currentTab = "inventory";
    const start = workspace().projectPlans?.find((plan) => plan.id === id)?.startDate;
    const today = todayInPlan();
    calendarDate = start && Number.isFinite(planDay(start)) && start > today ? start : today;
  }

  function scheduleDates(items: WorkItem[], schedule: Map<string, ItemSchedule>) {
    const starts = items.flatMap((item) => schedule.get(item.id)?.start || []).sort();
    const finishes = items.flatMap((item) => schedule.get(item.id)?.finish || []).sort();
    return { start: starts[0], finish: finishes.at(-1), pending: items.filter((item) => item.status !== "Tamamlandı" && !schedule.get(item.id)?.finish).length };
  }

  function render(product: Project, tabs: string) {
    if (product.id !== productId) { productId = product.id; setPlan(""); }
    const state = workspace();
    const plans = (state.projectPlans || []).filter((plan) => plan.productId === product.id);
    const plan = plans.find((entry) => entry.id === planId);
    const schedule = calculatePlanningSchedule(state);
    const title = plan ? plan.name : product.name;
    const content = plan ? renderPlan(state, plan, schedule) : renderPlans(state, plans, schedule.items);
    root.innerHTML = `<div class="page-content planner-page" data-scroll-layout="ready">
      <header class="planner-header"><div>${plan ? `<button type="button" class="planner-back text-button" data-planner-action="list">‹ ${esc(product.name)} / Projeler</button>` : ""}<h1>${esc(title)}</h1></div>
      <div class="planner-actions">${action("calendar", "Ekip takvimi")}${plan ? action("edit-plan", "Proje ayarları", plan.id) + action("scope", "İşleri plana al", plan.id, "primary") : action("edit-plan", "Yeni proje", "", "primary")}</div></header>
      ${tabs}<div class="planner-scroll">${content}</div></div>`;
  }

  function renderPlans(state: WorkspaceState, plans: ProjectPlan[], schedule: Map<string, ItemSchedule>) {
    if (!plans.length) return '<section class="planner-empty"><h2>Henüz proje yok</h2><p>Bir proje oluşturup bu ürünün backlog’undan planlanacak işleri seçebilirsin.</p></section>';
    return `<div class="planner-projects">${plans.map((plan) => {
      const items = planItems(state, plan);
      const dates = scheduleDates(items, schedule);
      const done = items.filter((item) => item.status === "Tamamlandı").length;
      return `<button type="button" class="planner-project-card" data-planner-action="open-plan" data-planner-id="${esc(plan.id)}"><strong>${esc(plan.name)}</strong><span>${done} / ${items.length} iş tamamlandı</span><span>Hedef ${dayLabel(plan.targetDate)} · Tahmin ${dayLabel(dates.finish)}${dates.pending ? ` · ${dates.pending} iş tarihsiz` : ""}</span></button>`;
    }).join("")}</div>`;
  }

  function renderPlan(state: WorkspaceState, plan: ProjectPlan, schedule: ReturnType<typeof calculatePlanningSchedule>) {
    const items = planItems(state, plan);
    const dates = scheduleDates(items, schedule.items);
    const forecast = dates.finish && plan.targetDate && dates.finish > plan.targetDate;
    const memberNames = new Map(planningMembers(state).map((member) => [member.id, member.name]));
    const stats = `<div class="planner-stats"><div><small>Plan başlangıcı</small><strong>${dayLabel(plan.startDate)}</strong></div><div><small>Hedef bitiş</small><strong>${dayLabel(plan.targetDate)}</strong></div><div><small>${dates.pending ? "Kısmi bitiş tahmini" : "Bitiş tahmini"}</small><strong class="${forecast ? "planner-warning" : ""}">${dayLabel(dates.finish)}${forecast ? " · Hedef aşılıyor" : ""}</strong></div><div><small>İlerleme</small><strong>${items.filter((item) => item.status === "Tamamlandı").length} / ${items.length} iş</strong></div></div>`;
    const viewTabs = `<div class="planner-tabs" aria-label="Plan görünümleri">${([["inventory", "İş envanteri"], ["timeline", "Takvim"], ["capacity", "Kapasite"]] as const).map(([key, label]) => `<button type="button" data-planner-action="tab" data-planner-id="${key}" aria-pressed="${key === currentTab}">${label}</button>`).join("")}</div>`;
    const view = currentTab === "capacity" ? renderCapacity(state, plan, schedule) : currentTab === "timeline" ? renderTimeline(state, items, schedule.items, memberNames) : renderInventory(items, schedule.items, memberNames);
    return stats + viewTabs + view;
  }

  function renderInventory(items: WorkItem[], schedule: Map<string, ItemSchedule>, members: Map<string, string>) {
    if (!items.length) return '<section class="planner-empty"><h2>Plan kapsamı boş</h2><p>Başlamak için ürün backlog’undaki işleri plana al.</p></section>';
    const groups = new Map<string, WorkItem[]>();
    for (const item of items) {
      const group = item.planning?.group || "Grupsuz işler";
      const list = groups.get(group);
      if (list) list.push(item);
      else groups.set(group, [item]);
    }
    return [...groups].sort(([left], [right]) => left.localeCompare(right, "tr")).map(([group, entries]) => {
      const dates = scheduleDates(entries, schedule);
      const minutes = entries.reduce((total, item) => {
        const phases = item.planning?.phases.length ? item.planning.phases : schedule.get(item.id)?.phases || [];
        return total + phases.reduce((minutes, phase) => minutes + phase.minutes, 0);
      }, 0);
      return `<section class="planner-group"><header><h2>${esc(group)}</h2><span>${entries.length} iş · ${hours(minutes)} · ${rangeLabel(dates.start, dates.finish)}</span></header>${entries.map((item) => renderInventoryItem(item, schedule.get(item.id), members)).join("")}</section>`;
    }).join("");
  }

  function renderInventoryItem(item: WorkItem, timing: ItemSchedule | undefined, members: Map<string, string>) {
    const phases = item.planning?.phases || [];
    const notices = [timing?.issue, timing?.finish && item.targetDate && timing.finish > item.targetDate ? `İşin hedef tarihi aşılıyor (${dayLabel(item.targetDate)}).` : "", timing?.conflicts.length ? `Kapasiteye göre kaydırıldı · Önce planlanan ${timing.conflicts.join(", ")}` : "", item.status === "Bloke" ? item.blocker?.reason || "Bu iş bloke." : ""].filter(Boolean);
    const legacyPhase = timing?.phases.find((phase) => phase.kind === "work");
    return `<article class="planner-item" data-planner-item="${esc(item.id)}"><div class="planner-item-title">
      <button type="button" class="planner-item-open" data-open-item="${esc(item.id)}"><strong>${esc(item.title)}</strong><small>${esc(item.id)} · ${esc(item.status)} · ${esc(item.priority)}</small></button>
      <span class="planner-item-dates">${rangeLabel(timing?.start, timing?.finish)}</span>${action("edit-work", "Planlama", item.id)}</div>
      ${phases.length ? `<div class="planner-phases">${planningPhases.flatMap(({ kind, label }) => {
        const phase = phases.find((entry) => entry.kind === kind);
        if (!phase) return [];
        const dates = timing?.phases.find((entry) => entry.kind === kind);
        return `<div class="planner-phase phase-${kind}"><strong>${label}</strong><span>${esc(members.get(phase.memberId) || "Üye bulunamadı")} · ${hours(phase.minutes)}</span><small>${phase.completedOn ? `${dayLabel(phase.completedOn)} · Tamamlandı` : dates ? rangeLabel(dates.start, dates.finish) : "—"}</small></div>`;
      }).join("")}</div>` : legacyPhase ? `<div class="planner-phases"><span class="planner-phase">Backlog eforu · ${esc(members.get(legacyPhase.memberId) || "—")} · ${hours(legacyPhase.minutes)}</span></div>` : ""}
      ${notices.length ? `<p class="planner-warning">${esc(notices.join(" · "))}</p>` : ""}</article>`;
  }

  function calendarDays() {
    const start = planDay(calendarDate);
    return Array.from({ length: daysShown }, (_, index) => start + index);
  }

  function calendarControls() {
    return `<div class="planner-period">${action("earlier", "‹ Önceki")}${action("today", "Bugün")}${action("later", "Sonraki ›")}<label>İlk gün <input type="date" class="field-input" data-planner-date value="${esc(calendarDate)}"></label></div>`;
  }

  function calendarTable(state: WorkspaceState, days: number[], label: string, rows: string) {
    const calendar = state.planningCalendar || {};
    return `<div class="planner-table-scroll" tabindex="0" aria-label="${label}"><table class="planner-table"><thead><tr><th scope="col">${label}</th>${days.map((day) => {
      const date = planDate(day);
      const holiday = calendar.exceptions?.find((entry) => !entry.memberId && entry.startDate <= date && date <= entry.endDate);
      const unavailable = !planningCapacity(calendar, "", day);
      return `<th scope="col" class="${unavailable ? "planner-day-off" : ""}" title="${esc(holiday?.name || (unavailable ? "Hafta sonu" : date))}">${dayLabel(date)}</th>`;
    }).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderTimeline(state: WorkspaceState, items: WorkItem[], schedule: Map<string, ItemSchedule>, members: Map<string, string>) {
    const days = calendarDays();
    const rows = items.flatMap((item) => {
      const timing = schedule.get(item.id);
      const itemLink = `<button type="button" class="planner-item-open" data-open-item="${esc(item.id)}">${esc(item.id)} · ${esc(item.title)}</button>`;
      const phases = timing?.phases || [];
      if (!phases.length) {
        return `<tr><th scope="row">${itemLink}<small>${timing?.finish ? `Tamamlandı · ${dayLabel(timing.finish)}` : esc(timing?.issue || item.status)}</small></th>${days.map(() => "<td></td>").join("")}</tr>`;
      }
      return phases.map((phase, index) => {
        const label = planningPhases.find((entry) => entry.kind === phase.kind)?.label || "İş";
        const blocks = timing?.blocks.filter((block) => block.kind === phase.kind) || [];
        return `<tr><th scope="row">${index === 0 ? itemLink : ""}<small>${label} · ${esc(members.get(phase.memberId) || "—")} · ${rangeLabel(phase.start, phase.finish)}</small></th>${days.map((day) => {
          const booked = blocks.filter((block) => block.day === day).reduce((total, block) => total + block.to - block.from, 0);
          const caption = booked ? hours(booked) : phase.completed && phase.finish === planDate(day) ? "✓" : "";
          return `<td class="${planningCapacity(state.planningCalendar || {}, phase.memberId, day) ? "" : "planner-day-off"}">${caption ? `<span class="planner-allocation phase-${phase.kind}">${caption}</span>` : ""}</td>`;
        }).join("")}</tr>`;
      });
    }).join("");
    return calendarControls() + (rows ? calendarTable(state, days, "İş ve aşama", rows) : '<p class="planner-empty">Takvimlenecek iş yok.</p>');
  }

  function renderCapacity(state: WorkspaceState, plan: ProjectPlan, schedule: ReturnType<typeof calculatePlanningSchedule>) {
    const days = calendarDays();
    const assigned = new Set([...plan.memberIds, ...planItems(state, plan).flatMap((item) => schedule.items.get(item.id)?.phases.map((phase) => phase.memberId) || [])]);
    const members = planningMembers(state).filter((member) => assigned.has(member.id));
    const rows = members.map((member) => `<tr><th scope="row">${esc(member.name)}<small>${esc(member.team)}</small></th>${days.map((day) => {
      const dayBlocks = schedule.bookings.get(`${member.id}:${day}`) || [];
      const used = dayBlocks.reduce((minutes, block) => minutes + block.to - block.from, 0);
      const available = planningCapacity(state.planningCalendar || {}, member.id, day);
      const blocked = state.planningCalendar?.exceptions?.find((entry) => (!entry.memberId || entry.memberId === member.id) && entry.startDate <= planDate(day) && planDate(day) <= entry.endDate)?.name;
      const description = available ? [...new Set(dayBlocks.map((block) => block.itemId))].join(", ") || "Atama yok" : blocked || "Çalışma dışı";
      return `<td class="${!available ? "planner-day-off" : used === available ? "planner-capacity-full" : ""}" title="${esc(description)}">${available ? `<strong>${clock.format(used / 60)} / ${clock.format(available / 60)}</strong>` : "—"}</td>`;
    }).join("")}</tr>`).join("");
    return calendarControls() + (rows ? '<p class="planner-caption">Kullanılan / günlük kapasite (saat). Diğer projeler ve bağımsız işler dahildir.</p>' + calendarTable(state, days, "Kişi", rows) : '<p class="planner-empty">Kapasiteyi görmek için proje ayarlarından ekip üyelerini seç.</p>');
  }

  function dialog(title: string, kind: string, body: string, button: string) {
    pending = undefined;
    modal.innerHTML = `<div class="modal-backdrop" data-close-modal><section class="modal settings-modal planner-dialog" role="dialog" aria-modal="true" aria-labelledby="planner-dialog-title"><header class="modal-header"><h2 id="planner-dialog-title">${esc(title)}</h2><button type="button" class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><form class="settings-form" data-planner-form="${kind}">${body}<footer class="modal-footer"><button type="button" class="button button-quiet" data-planner-action="cancel">Vazgeç</button><button type="submit" class="button button-primary">${esc(button)}</button></footer></form></section></div>`;
    modal.querySelector<HTMLElement>('form :is(input:not([type="hidden"]), select, button)')?.focus();
  }

  function editPlan(id: string) {
    const state = workspace();
    const plan = state.projectPlans?.find((entry) => entry.id === id && entry.productId === productId);
    const members = planningMembers(state);
    dialog(plan ? "Proje ayarları" : "Yeni proje", "plan", `
      <input type="hidden" name="id" value="${esc(id)}">
      <label class="field-label">Proje adı<input class="field-input" name="name" maxlength="100" required value="${esc(plan?.name || "")}"></label>
      <div class="form-two-col"><label class="field-label">En erken başlangıç<input class="field-input" type="date" name="start" required value="${esc(plan?.startDate || todayInPlan())}"></label>
      <label class="field-label">Hedef bitiş<input class="field-input" type="date" name="target" value="${esc(plan?.targetDate || "")}"></label></div>
      <fieldset class="planner-checklist"><legend>Proje ekibi</legend>${members.map((member) => `<label><input type="checkbox" name="member" value="${esc(member.id)}" ${plan?.memberIds.includes(member.id) ? "checked" : ""}><span>${esc(member.name)} <small>${esc(member.team)}</small></span></label>`).join("") || '<p>Çalışma alanı ayarlarından takım üyesi ekleyebilirsin.</p>'}</fieldset>`, plan ? "Etkisini göster" : "Projeyi oluştur");
  }

  function editScope(id: string) {
    const state = workspace();
    const plan = state.projectPlans?.find((entry) => entry.id === id);
    if (!plan) return;
    const items = productItems(state, plan.productId).filter((item) => !validItemPlan(state, item));
    if (!items.length) { options.notify("Bu ürünün plana eklenebilecek boşta işi yok."); return; }
    dialog("Backlog işlerini plana al", "scope", `<input type="hidden" name="id" value="${esc(id)}"><label class="field-label">İş paketi (isteğe bağlı)<input name="group" class="field-input" maxlength="80" placeholder="Örn. Başvuru ekranı"></label><label class="field-label">İş ara<input type="search" class="field-input" data-planner-item-search></label><fieldset class="planner-checklist"><legend>${esc(plan.name)} kapsamı</legend>${items.map((item) => `<label data-planner-search-row><input type="checkbox" name="item" value="${esc(item.id)}"><span>${esc(item.id)} · ${esc(item.title)} <small>${esc(item.status)}</small></span></label>`).join("")}</fieldset>`, "Etkisini göster");
  }

  function editWork(id: string) {
    const state = workspace();
    const item = state.items.find((entry) => entry.id === id && !entry.archived);
    if (!item) return;
    const selected = validItemPlan(state, item);
    const plans = planOptions(state, item);
    const members = planningMembers(state);
    const memberOptions = (memberId: string) => '<option value="">Sorumlu seç</option>' + members.map((member) => `<option value="${esc(member.id)}" ${member.id === memberId ? "selected" : ""}>${esc(member.name)} · ${esc(member.team)}</option>`).join("");
    dialog("İş planlama", "work", `<input type="hidden" name="id" value="${esc(id)}"><p class="planner-caption">${esc(item.id)} · ${esc(item.title)}</p>
      <div class="form-two-col"><label class="field-label">Proje<select class="field-input" name="plan"><option value="">Bağımsız ürün işi</option>${plans.map((plan) => `<option value="${esc(plan.id)}" ${plan.id === selected?.id ? "selected" : ""}>${esc(plan.name)}</option>`).join("")}</select></label><label class="field-label">İş paketi<input class="field-input" name="group" maxlength="80" value="${esc(item.planning?.group || "")}"></label></div>
      <p class="planner-caption">Sırayla yürütülecek aşamaların eforunu gir. Boş bıraktığın aşamalar atlanır.</p>
      ${planningPhases.map(({ kind, label }) => {
        const phase = item.planning?.phases.find((entry) => entry.kind === kind);
        return `<fieldset class="planner-phase-editor"><legend>${label}</legend><label class="field-label">Efor (saat)<input class="field-input" type="number" min="0.25" max="10000" step="any" name="${kind}-hours" value="${phase ? Math.round(phase.minutes / 60 * 10000) / 10000 : ""}"></label><label class="field-label">Sorumlu<select class="field-input" name="${kind}-member">${memberOptions(phase?.memberId || "")}</select></label><label class="field-label">Tamamlandıysa tarih<input class="field-input" type="date" max="${todayInPlan()}" name="${kind}-done" value="${esc(phase?.completedOn || "")}"></label></fieldset>`;
      }).join("")}`, "Etkisini göster");
  }

  function editCalendar() {
    const state = workspace();
    const calendar = state.planningCalendar || {};
    const members = planningMembers(state);
    const labels = new Map(members.map((member) => [member.id, member.name]));
    dialog("Ekip takvimi", "calendar", `<p class="planner-caption">Pazartesi–cuma çalışma günüdür. Girdiğin tatil ve izinler günün tamamını kapatır. Bu ayarlar bütün ürün ve projelerde geçerlidir.</p>
      <fieldset class="planner-checklist planner-capacity-editor"><legend>Kişi başına günlük kapasite</legend>${members.map((member) => `<label><span>${esc(member.name)} <small>${esc(member.team)}</small></span><input class="field-input" aria-label="${esc(member.name)} günlük kapasite (saat)" name="capacity-${esc(member.id)}" type="number" min="0" max="24" step="0.25" value="${(calendar.dailyMinutes?.[member.id] ?? 480) / 60}"><small>saat</small></label>`).join("") || "<p>Çalışma alanı ayarlarından takım üyesi ekleyebilirsin.</p>"}</fieldset>
      <fieldset class="planner-checklist"><legend>Kayıtlı tatiller ve izinler</legend>${(calendar.exceptions || []).map((entry) => `<label><input type="checkbox" name="exception" value="${esc(entry.id)}" checked><span>${esc(entry.name)} · ${rangeLabel(entry.startDate, entry.endDate)} <small>${entry.memberId ? esc(labels.get(entry.memberId) || "Üye bulunamadı") : "Herkes"}</small></span></label>`).join("") || "<p>Kayıtlı tatil veya izin yok.</p>"}</fieldset>
      <fieldset class="planner-phase-editor planner-exception"><legend>Tatil veya izin ekle</legend><label class="field-label">Ad<input class="field-input" name="exception-name" maxlength="80"></label><label class="field-label">Kim için<select class="field-input" name="exception-member"><option value="">Herkes</option>${members.map((member) => `<option value="${esc(member.id)}">${esc(member.name)}</option>`).join("")}</select></label><label class="field-label">Başlangıç<input class="field-input" type="date" name="exception-start"></label><label class="field-label">Bitiş<input class="field-input" type="date" name="exception-end"></label></fieldset>`, "Etkisini göster");
  }

  function showPreview(form: HTMLFormElement, change: WorkspaceChange, after?: () => void) {
    const state = workspace();
    const draft = structuredClone(state);
    const before = calculatePlanningSchedule(state).items;
    change(draft);
    const next = calculatePlanningSchedule(draft).items;
    const signature = (result?: ItemSchedule) => JSON.stringify([result?.start, result?.finish, result?.issue, result?.phases.map(({ kind, start, finish }) => [kind, start, finish])]);
    const impacted = state.items.filter((item) => !item.archived && signature(before.get(item.id)) !== signature(next.get(item.id)));
    const planChanges = (draft.projectPlans || []).flatMap((plan) => {
      const dates = scheduleDates(planItems(draft, plan), next);
      const oldPlan = state.projectPlans?.find((entry) => entry.id === plan.id);
      const oldDates = oldPlan ? scheduleDates(planItems(state, oldPlan), before) : undefined;
      if (oldDates?.finish === dates.finish && oldDates?.pending === dates.pending) return [];
      return [`<li><strong>${esc(plan.name)}</strong><span>${dayLabel(oldDates?.finish)} → ${dayLabel(dates.finish)}${dates.pending ? ` · ${dates.pending} iş tarihsiz` : ""}</span></li>`];
    });
    pending = { change, after };
    form.hidden = true;
    form.insertAdjacentHTML("afterend", `<section class="settings-form planner-preview" aria-label="Takvim etkisi">
      <p role="status">${impacted.length ? `${impacted.length} işin takvimi veya planlama durumu değişiyor.` : "İşlerin takvim tarihleri aynı kalıyor."}</p>
      ${planChanges.length ? `<ul>${planChanges.join("")}</ul>` : ""}
      ${impacted.length ? `<ul>${impacted.map((item) => `<li><strong>${esc(item.id)} · ${esc(item.title)}</strong><span>${rangeLabel(before.get(item.id)?.start, before.get(item.id)?.finish)} → ${rangeLabel(next.get(item.id)?.start, next.get(item.id)?.finish)}</span>${next.get(item.id)?.issue ? `<small>${esc(next.get(item.id)!.issue!)}</small>` : ""}</li>`).join("")}</ul>` : ""}
      <footer class="modal-footer">${action("back-preview", "Geri dön", "", "quiet")}${action("apply", "Uygula", "", "primary")}</footer></section>`);
    modal.querySelector<HTMLElement>('[data-planner-action="back-preview"]')?.focus();
  }

  function commit(change: WorkspaceChange, after?: () => void) {
    const state = workspace();
    const { projectPlans, planningCalendar } = state;
    const priorItems = state.items.map((item) => item.planning);
    change(state);
    if (!options.save()) {
      Object.assign(state, { projectPlans, planningCalendar });
      state.items.forEach((item, index) => { item.planning = priorItems[index]; });
      return;
    }
    pending = undefined;
    options.close();
    after?.();
    options.render();
    options.notify("Planlama değişiklikleri kaydedildi.");
  }

  modal.addEventListener("submit", (event) => {
    const form = event.target as HTMLFormElement;
    const kind = form.dataset.plannerForm;
    if (!kind) return;
    event.preventDefault();
    const data = new FormData(form);
    const state = workspace();
    const id = value(data, "id");
    if (kind === "plan") {
      const existing = state.projectPlans?.find((plan) => plan.id === id);
      const name = value(data, "name");
      const startDate = value(data, "start");
      const targetDate = value(data, "target");
      const memberIds = data.getAll("member").map(String);
      if (!name || !Number.isFinite(planDay(startDate)) || targetDate && (!Number.isFinite(planDay(targetDate)) || targetDate < startDate)) { options.notify("Proje adı ve geçerli bir tarih aralığı gir."); return; }
      if (state.projectPlans?.some((plan) => plan.productId === productId && plan.id !== id && plan.name.toLocaleLowerCase("tr") === name.toLocaleLowerCase("tr"))) { options.notify("Bu ürün altında aynı adla bir proje var."); return; }
      const newPlan: ProjectPlan = { id: existing?.id || options.id("PLAN"), productId, name, startDate, targetDate: targetDate || undefined, memberIds };
      if (existing && planItems(state, existing).some((item) => item.status !== "Tamamlandı" && item.planning?.phases.some((phase) => !phase.completedOn && !memberIds.includes(phase.memberId) && planningMembers(state).some((member) => member.id === phase.memberId)))) {
        options.notify("Açık işi olan bir üyeyi çıkarmadan önce aşamayı başka bir üyeye ata."); return;
      }
      const change: WorkspaceChange = (draft) => { draft.projectPlans = [...(draft.projectPlans || []).filter((plan) => plan.id !== newPlan.id), newPlan]; };
      if (existing) showPreview(form, change);
      else commit(change, () => setPlan(newPlan.id));
    } else if (kind === "scope") {
      const plan = state.projectPlans?.find((entry) => entry.id === id);
      if (!plan) return;
      const ids = new Set(data.getAll("item").map(String));
      if (!ids.size) { options.notify("Plana almak için en az bir iş seç."); return; }
      const group = value(data, "group");
      const allowed = new Set(plan.memberIds);
      const selected = productItems(state, plan.productId).filter((item) => ids.has(item.id) && !validItemPlan(state, item));
      if (selected.some((item) => item.status !== "Tamamlandı" && item.planning?.phases.some((phase) => !phase.completedOn && !allowed.has(phase.memberId)))) { options.notify("Seçilen işlerin sorumlularını önce proje ekibine ekle veya atamalarını değiştir."); return; }
      showPreview(form, (draft) => {
        for (const item of productItems(draft, plan.productId)) if (ids.has(item.id) && !validItemPlan(draft, item)) item.planning = { phases: item.planning?.phases || [], planId: id, group };
      });
    } else if (kind === "work") {
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;
      const selected = planOptions(state, item).find((plan) => plan.id === value(data, "plan"));
      const group = selected ? value(data, "group") : "";
      const members = new Set(planningMembers(state).map((member) => member.id));
      const phases: WorkPlanningPhase[] = [];
      let latestCompletion = "";
      let hasOpenPhase = false;
      for (const { kind: phase, label } of planningPhases) {
        const memberId = value(data, `${phase}-member`);
        const effort = value(data, `${phase}-hours`);
        const completedOn = value(data, `${phase}-done`);
        if (!memberId && !effort && !completedOn) continue;
        if (!members.has(memberId) || !(Number(effort) >= 0.25 && Number(effort) <= 10000)) { options.notify(`${label} için geçerli bir efor ve sorumlu seç.`); return; }
        if (completedOn && (hasOpenPhase || !Number.isFinite(planDay(completedOn)) || completedOn < latestCompletion || completedOn > todayInPlan())) { options.notify(`${label} bitişi, önceki aşamaların tamamlanma sırasına uymalı.`); return; }
        if (!completedOn && selected && !selected.memberIds.includes(memberId)) { options.notify(`${label} sorumlusunu önce proje ekibine ekle.`); return; }
        hasOpenPhase ||= !completedOn;
        if (completedOn) latestCompletion = completedOn;
        phases.push({ kind: phase, memberId, minutes: Math.round(Number(effort) * 60), completedOn: completedOn || undefined });
      }
      showPreview(form, (draft) => {
        const work = draft.items.find((entry) => entry.id === id);
        if (work) work.planning = selected || phases.length ? { planId: selected?.id, group, phases } : undefined;
      }, modal.querySelector(".planner-dialog")?.hasAttribute("data-from-item") ? () => options.openItem(id) : undefined);
    } else if (kind === "calendar") {
      const calendar = state.planningCalendar || {};
      const dailyMinutes = { ...calendar.dailyMinutes };
      for (const member of planningMembers(state)) {
        const input = value(data, `capacity-${member.id}`);
        const capacity = Number(input);
        if (!input || !(capacity >= 0 && capacity <= 24)) { options.notify("Günlük kapasite için 0 ile 24 arasında bir saat gir."); return; }
        dailyMinutes[member.id] = Math.round(capacity * 60);
      }
      const exceptions = (calendar.exceptions || []).filter((entry) => data.getAll("exception").includes(entry.id));
      const name = value(data, "exception-name");
      const startDate = value(data, "exception-start");
      const endDate = value(data, "exception-end") || startDate;
      const memberId = value(data, "exception-member") || undefined;
      if (name || startDate || endDate || memberId) {
        if (!name || !Number.isFinite(planDay(startDate)) || !Number.isFinite(planDay(endDate)) || endDate < startDate) { options.notify("Tatil veya izin için ad ve geçerli bir tarih aralığı gir."); return; }
        exceptions.push({ id: options.id("LEAVE"), name, startDate, endDate, memberId });
      }
      showPreview(form, (draft) => { draft.planningCalendar = { dailyMinutes, exceptions }; });
    }
  });

  root.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.hasAttribute("data-planner-date") || !Number.isFinite(planDay(target.value))) return;
    calendarDate = target.value;
    options.render();
  });
  modal.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.hasAttribute("data-planner-item-search")) return;
    const query = target.value.trim().toLocaleLowerCase("tr");
    modal.querySelectorAll<HTMLElement>("[data-planner-search-row]").forEach((row) => { row.hidden = !row.textContent?.toLocaleLowerCase("tr").includes(query); });
  });

  function handleClick(target: Element) {
    const control = target.closest<HTMLElement>("[data-planner-action]");
    if (!control) return false;
    const { plannerAction, plannerId = "" } = control.dataset;
    if (plannerAction === "open-plan" || plannerAction === "list") { setPlan(plannerId); options.render(); }
    else if (plannerAction === "edit-plan") editPlan(plannerId);
    else if (plannerAction === "scope") editScope(plannerId);
    else if (plannerAction === "edit-work") {
      const fromItem = Boolean(control.closest(".detail-modal"));
      editWork(plannerId);
      if (fromItem) modal.querySelector(".planner-dialog")?.setAttribute("data-from-item", plannerId);
    }
    else if (plannerAction === "calendar") editCalendar();
    else if (plannerAction === "tab") { currentTab = plannerId as typeof currentTab; options.render(); }
    else if (plannerAction === "today" || plannerAction === "earlier" || plannerAction === "later") {
      calendarDate = plannerAction === "today" ? todayInPlan() : planDate(planDay(calendarDate) + (plannerAction === "earlier" ? -daysShown : daysShown));
      options.render();
    } else if (plannerAction === "cancel") {
      const itemId = modal.querySelector(".planner-dialog")?.getAttribute("data-from-item");
      options.close();
      if (itemId) options.openItem(itemId);
    } else if (plannerAction === "back-preview") {
      const form = modal.querySelector<HTMLFormElement>("[data-planner-form]");
      if (form) form.hidden = false;
      modal.querySelector(".planner-preview")?.remove();
      form?.querySelector<HTMLElement>('[type="submit"]')?.focus();
      pending = undefined;
    } else if (plannerAction === "apply" && pending && modal.querySelector(".planner-preview")) commit(pending.change, pending.after);
    return true;
  }

  function itemMarkup(item: WorkItem) {
    if (item.archived) return "";
    const state = workspace();
    const plan = validItemPlan(state, item);
    const timing = item.planning ? calculatePlanningSchedule(state).items.get(item.id) : undefined;
    return `<section class="detail-property planner-work-property" data-planner-work-summary><span>Proje planlama</span><div>${action("edit-work", plan?.name || (item.planning ? "Bağımsız ürün işi" : "Planla"), item.id)}${timing?.finish ? `<small>${item.status === "Tamamlandı" ? "Gerçekleşen" : "Tahmin"} · ${rangeLabel(timing.start, timing.finish)}</small>` : ""}</div></section>`;
  }

  return { render, handleClick, itemMarkup, reset: () => setPlan("") };
}
