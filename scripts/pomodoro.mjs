import { randomUUID } from "node:crypto";

// The desktop host owns the deadline; renderer throttling never delays completion.
export function createPomodoroController({ notify, now = Date.now, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let session = null;
  let timer = null;
  const clear = () => { if (timer !== null) clearTimer(timer); timer = null; };
  const complete = () => {
    if (!session || session.status !== "running") return;
    clear();
    const completed = session;
    completed.status = "completed";
    completed.remainingMs = 0;
    completed.endsAt = null;
    completed.notification = "pending";
    Promise.resolve().then(() => notify({ ...completed })).then(() => {
      completed.notification = "sent";
    }, () => {
      completed.notification = "failed";
    });
  };
  const schedule = () => {
    clear();
    timer = setTimer(() => {
      if (session?.status !== "running") return;
      if (session.endsAt <= now()) complete(); else schedule();
    }, Math.max(0, session.endsAt - now()));
  };
  const get = () => {
    if (session?.status === "running" && session.endsAt <= now()) complete();
    return session ? { ...session, remainingMs: session.status === "running" ? Math.max(0, session.endsAt - now()) : session.remainingMs } : null;
  };
  const checked = id => {
    get();
    if (!session || session.id !== id) throw new Error("Odak oturumu değişti. Güncel oturumu açın.");
    return session;
  };
  return {
    get,
    start(input) {
      get();
      if (session && session.status !== "completed") throw new Error("Önce devam eden odak oturumunu bitirin.");
      if (!input || !["task", "note", "question", "item"].includes(input.kind) || typeof input.recordId !== "string" || !input.recordId || input.recordId.length > 200 || typeof input.title !== "string" || !input.title.trim() || input.title.length > 2000 || !Number.isInteger(input.minutes) || input.minutes < 1 || input.minutes > 180 || !Number.isInteger(input.breakMinutes) || input.breakMinutes < 1 || input.breakMinutes > 60) throw new Error("Çalışma süresi 1–180, mola süresi 1–60 dakika olmalı.");
      session = { id: randomUUID(), kind: input.kind, recordId: input.recordId, title: input.title.trim(), minutes: input.minutes, breakMinutes: input.breakMinutes, phase: "focus", status: "running", durationMs: input.minutes * 60_000, remainingMs: input.minutes * 60_000, endsAt: now() + input.minutes * 60_000, notification: null };
      schedule(); return get();
    },
    pause(id) {
      const current = checked(id);
      if (current.status !== "running") return get();
      current.remainingMs = Math.max(0, current.endsAt - now());
      current.endsAt = null; current.status = "paused"; clear(); return get();
    },
    resume(id) {
      const current = checked(id);
      if (current.status !== "paused") return get();
      current.endsAt = now() + current.remainingMs; current.status = "running"; schedule(); return get();
    },
    startBreak(id) {
      const current = checked(id);
      if (current.status !== "completed" || current.phase !== "focus") throw new Error("Mola için önce odak süresini tamamlayın.");
      session = { ...current, id: randomUUID(), phase: "break", status: "running", durationMs: current.breakMinutes * 60_000, remainingMs: current.breakMinutes * 60_000, endsAt: now() + current.breakMinutes * 60_000, notification: null };
      schedule(); return get();
    },
    cancel(id) { checked(id); clear(); session = null; return null; },
    dispose() { clear(); session = null; }
  };
}
