export const planningPhases: { kind: PlanningPhase; label: string }[] = [
  { kind: "analysis", label: "Analiz" },
  { kind: "development", label: "Yazılım" },
  { kind: "test", label: "Test" }
];

const dayMinutes = 24 * 60;
const dayMs = dayMinutes * 60000;
const defaultCapacity = 8 * 60;
const priorities: Priority[] = ["Kritik", "Yüksek", "Orta", "Düşük"];

export function todayInPlan(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function planDay(date?: string): number {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NaN;
  const day = Date.parse(date + "T00:00:00Z") / dayMs;
  return Number.isFinite(day) && planDate(day) === date ? day : NaN;
}

export function planDate(day: number): string {
  return new Date(day * dayMs).toISOString().slice(0, 10);
}

function actualDay(date?: string): number {
  return planDay(date?.length === 10 ? date : date && Number.isFinite(Date.parse(date)) ? todayInPlan(new Date(date)) : undefined);
}

export function planningMembers(state: WorkspaceState): { id: string; name: string; team: string }[] {
  const members = new Map<string, { id: string; name: string; team: string }>();
  for (const team of state.teams) {
    for (const name of team.members) {
      const id = team.memberIds?.[name];
      if (id && !members.has(id)) members.set(id, { id, name, team: team.name });
    }
  }
  return [...members.values()].sort((left, right) => left.name.localeCompare(right.name, "tr"));
}

export function validItemPlan(state: WorkspaceState, item: WorkItem): ProjectPlan | undefined {
  const id = item.planning?.planId;
  if (!id) return undefined;
  const plan = state.projectPlans?.find((entry) => entry.id === id);
  return plan && state.projects.some((product) => product.id === plan.productId && product.name === item.project) ? plan : undefined;
}

export function planningCapacity(calendar: PlanningCalendar, memberId: string, day: number): number {
  const weekday = new Date(day * dayMs).getUTCDay();
  if (weekday === 0 || weekday === 6) return 0;
  const date = planDate(day);
  if (calendar.exceptions?.some((entry) => (!entry.memberId || entry.memberId === memberId) && entry.startDate <= date && date <= entry.endDate)) return 0;
  return calendar.dailyMinutes?.[memberId] ?? defaultCapacity;
}

export interface PlanningBlock {
  itemId: string;
  memberId: string;
  kind: PlanningPhase | "work";
  day: number;
  from: number;
  to: number;
}

interface PhaseSchedule {
  kind: PlanningBlock["kind"];
  memberId: string;
  minutes: number;
  start: string;
  finish: string;
  completed?: boolean;
}

export interface ItemSchedule {
  start?: string;
  finish?: string;
  endMinute?: number;
  issue?: string;
  conflicts: string[];
  phases: PhaseSchedule[];
  blocks: PlanningBlock[];
}

function inputPhases(state: WorkspaceState, item: WorkItem): (Omit<WorkPlanningPhase, "kind"> & { kind: PlanningBlock["kind"] })[] {
  const phases = item.planning?.phases;
  if (phases?.length) return planningPhases.flatMap(({ kind }) => {
    const phase = phases.find((entry) => entry.kind === kind);
    return phase ? [phase] : [];
  });
  if (state.estimateUnit === "puan" || !item.estimate || (!item.startDate && !item.targetDate)) return [];
  const assignments = item.assignments || (item.teamId && item.assignee ? [{ teamId: item.teamId, member: item.assignee }] : []);
  if (assignments.length !== 1) return [];
  const assignment = assignments[0];
  const memberId = assignment.memberId || state.teams.find((team) => team.id === assignment.teamId)?.memberIds?.[assignment.member];
  return memberId ? [{ kind: "work", memberId, minutes: Math.round(item.estimate * 60) }] : [];
}

export function calculatePlanningSchedule(state: WorkspaceState, today = todayInPlan()) {
  const currentDay = planDay(today);
  const calendar = state.planningCalendar || {};
  const memberIds = new Set(planningMembers(state).map((member) => member.id));
  const items = new Map(state.items.map((item) => [item.id, item]));
  const activeProducts = new Set(state.projects.filter((product) => !product.archived).map((product) => product.name));
  const plans = new Map(state.items.map((item) => [item.id, validItemPlan(state, item)]));
  const bookings = new Map<string, PlanningBlock[]>();
  const results = new Map<string, ItemSchedule>();
  const visiting = new Set<string>();

  function allocate(itemId: string, phase: ReturnType<typeof inputPhases>[number], startMinute: number, proposed: PlanningBlock[], conflicts: Set<string>): PlanningBlock[] {
    const allocation = [] as PlanningBlock[];
    let remaining = phase.minutes;
    const firstDay = Math.floor(startMinute / dayMinutes);
    if (!(calendar.dailyMinutes?.[phase.memberId] ?? defaultCapacity)) return [];
    for (let day = firstDay; remaining > 0 && day < firstDay + 366 * 5; day++) {
      const capacity = planningCapacity(calendar, phase.memberId, day);
      let cursor = day === firstDay ? startMinute % dayMinutes : 0;
      if (capacity <= cursor) continue;
      const booked = [...(bookings.get(`${phase.memberId}:${day}`) || []), ...proposed.filter((block) => block.memberId === phase.memberId && block.day === day)].sort((left, right) => left.from - right.from);
      for (const block of [...booked, { from: capacity, to: capacity, itemId }]) {
        const available = Math.min(remaining, Math.max(0, Math.min(capacity, block.from) - cursor));
        if (available) {
          allocation.push({ itemId, memberId: phase.memberId, kind: phase.kind, day, from: cursor, to: cursor + available });
          remaining -= available;
          cursor += available;
        }
        if (!remaining || cursor >= capacity) break;
        if (block.to > cursor && block.itemId !== itemId) conflicts.add(block.itemId);
        cursor = Math.max(cursor, block.to);
      }
    }
    return remaining > 0 ? [] : allocation;
  }

  function resolve(item: WorkItem): ItemSchedule {
    const known = results.get(item.id);
    if (known) return known;
    const result: ItemSchedule = { phases: [], blocks: [], conflicts: [] };
    if (visiting.has(item.id)) return { ...result, issue: "İş bağımlılıkları bir döngü oluşturuyor." };
    visiting.add(item.id);
    try {
      if (item.status === "Tamamlandı") {
        const finish = actualDay(item.completedAt);
        const start = actualDay(item.actualStartDate);
        result.start = Number.isFinite(start) ? planDate(start) : undefined;
        result.finish = Number.isFinite(finish) ? planDate(finish) : undefined;
        result.endMinute = (Number.isFinite(finish) ? finish + 1 : currentDay) * dayMinutes;
        return result;
      }
      const phases = inputPhases(state, item);
      if (item.archived || !activeProducts.has(item.project) || !phases.length) {
        result.issue = "İşin takvimlenebilir aşaması yok.";
        return result;
      }
      const missing = phases.find((phase) => !phase.completedOn && (!memberIds.has(phase.memberId) || !Number.isFinite(phase.minutes) || phase.minutes <= 0));
      if (missing) {
        result.issue = "Aşamanın sorumlusu veya eforu eksik.";
        return result;
      }
      let earliest = planningStart(item) * dayMinutes;
      for (const dependencyId of item.dependsOnIds || []) {
        const dependency = items.get(dependencyId);
        const schedule = dependency && resolve(dependency);
        if (schedule?.endMinute === undefined) {
          result.issue = `${dependencyId} bağımlılığının bitişi hesaplanamadı.`;
          return result;
        }
        earliest = Math.max(earliest, schedule.endMinute);
      }
      const conflicts = new Set<string>();
      const tentative: PlanningBlock[] = [];
      for (const phase of phases) {
        const completed = planDay(phase.completedOn);
        if (Number.isFinite(completed)) {
          const date = planDate(completed);
          result.phases.push({ ...phase, start: date, finish: date, completed: true });
          earliest = Math.max(earliest, (completed + 1) * dayMinutes);
          continue;
        }
        const blocks = allocate(item.id, phase, earliest, tentative, conflicts);
        if (!blocks.length) {
          result.phases = result.phases.filter((entry) => entry.completed);
          result.issue = "Sorumlu için planlama aralığında çalışma kapasitesi bulunamadı.";
          return result;
        }
        tentative.push(...blocks);
        const last = blocks[blocks.length - 1];
        result.phases.push({ ...phase, start: planDate(blocks[0].day), finish: planDate(last.day) });
        earliest = last.day * dayMinutes + last.to;
      }
      for (const block of tentative) {
        const key = `${block.memberId}:${block.day}`;
        const existing = bookings.get(key);
        if (existing) existing.push(block);
        else bookings.set(key, [block]);
      }
      result.blocks = tentative;
      result.conflicts = [...conflicts];
      result.start = result.phases[0].start;
      result.finish = result.phases[result.phases.length - 1].finish;
      result.endMinute = earliest;
      return result;
    } finally {
      visiting.delete(item.id);
      results.set(item.id, result);
    }
  }

  function planningStart(item: WorkItem) {
    return Math.max(currentDay, planDay(item.startDate) || currentDay, planDay(plans.get(item.id)?.startDate) || currentDay);
  }
  const active = state.items.filter((item) => !item.archived && activeProducts.has(item.project));
  active.sort((left, right) => planningStart(left) - planningStart(right) || priorities.indexOf(left.priority) - priorities.indexOf(right.priority) || left.id.localeCompare(right.id));
  active.forEach(resolve);
  return { items: results, bookings };
}
