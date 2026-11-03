import assert from "node:assert/strict";
import { createPomodoroController } from "../../scripts/pomodoro.mjs";

let clock = 1000;
let pending = new Map();
let nextTimer = 0;
const notifications = [];
const controller = createPomodoroController({
  now: () => clock,
  setTimer: (callback, delay) => { const id = ++nextTimer; pending.set(id, { callback, at: clock + delay }); return id; },
  clearTimer: id => pending.delete(id),
  notify: session => notifications.push(session)
});
const input = { kind: "note", recordId: "N-1", title: "Refinement hazırlığı", minutes: 1, breakMinutes: 1 };
const advance = async ms => {
  clock += ms;
  for (const [id, timer] of [...pending]) if (timer.at <= clock) { pending.delete(id); timer.callback(); }
  await Promise.resolve(); await Promise.resolve();
};

assert.throws(() => controller.start({ ...input, minutes: 0 }));
assert.throws(() => controller.start({ ...input, minutes: 1.5 }));
assert.throws(() => controller.start({ ...input, breakMinutes: 61 }));
assert.throws(() => controller.start({ ...input, kind: "bad" }));
let session = controller.start(input);
assert.throws(() => controller.start(input), /devam eden/);
await advance(10_000);
assert.equal(controller.get().remainingMs, 50_000);
controller.pause(session.id);
await advance(100_000);
assert.equal(controller.get().remainingMs, 50_000);
assert.equal(notifications.length, 0);
assert.equal(pending.size, 0);
controller.resume(session.id);
await advance(50_000);
assert.equal(controller.get().status, "completed");
assert.equal(controller.get().notification, "sent");
assert.equal(notifications.length, 1);
controller.get(); controller.pause(session.id); controller.get();
assert.equal(notifications.length, 1);
session = controller.startBreak(session.id);
assert.equal(session.phase, "break");
assert.throws(() => controller.cancel("stale-id"));
await advance(60_000);
assert.equal(notifications.length, 2);
assert.equal(notifications[1].phase, "break");
session = controller.start(input);
controller.cancel(session.id);
await advance(600_000);
assert.equal(controller.get(), null);
assert.equal(notifications.length, 2);

// Even if a timer callback is delayed (e.g. device sleep), reading the deadline completes once.
session = controller.start(input);
clock += 120_000;
assert.equal(controller.get().status, "completed");
await advance(0);
assert.equal(notifications.length, 3);
controller.dispose();
assert.equal(pending.size, 0);
const failure = createPomodoroController({ notify: () => Promise.reject(new Error("Windows kapalı")), now: () => clock, setTimer: () => 1, clearTimer: () => {} });
failure.start(input); clock += 60_001; failure.get();
await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
assert.equal(failure.get().notification, "failed");
failure.dispose();
console.log("PASS: Pomodoro süre doğrulama, duraklat/devam, tek tamamlanma bildirimi, mola, iptal, geciken sayaç ve bildirim hatası.");
