const DELETION_CONFIRMATION_KEY = "rota-confirm-deletion";
export function isDeletionConfirmationEnabled(): boolean {
  try { return localStorage.getItem(DELETION_CONFIRMATION_KEY) !== "false"; }
  catch { return true; }
}
export function setDeletionConfirmationEnabled(enabled: boolean): boolean {
  try { localStorage.setItem(DELETION_CONFIRMATION_KEY, String(enabled)); return true; }
  catch { return false; }
}

/** Application dialogs live separately from modal-root so open forms keep their drafts. */
let pending: Promise<unknown> = Promise.resolve();

function showDialog(message: string, initialValue?: string, deletion = false): Promise<string | null> {
  const open = (): Promise<string | null> => new Promise((resolve) => {
    const returnFocus = document.activeElement;
    const dialog = document.createElement("dialog");
    dialog.className = "modal app-dialog";
    dialog.setAttribute("aria-labelledby", "app-dialog-title");
    dialog.setAttribute("aria-describedby", "app-dialog-message");
    const isPrompt = initialValue !== undefined;
    dialog.innerHTML = '<form method="dialog"><header class="modal-header"><div><div class="panel-kicker">ROTA</div><h2 id="app-dialog-title"></h2></div><button type="button" class="modal-close" aria-label="İptal">×</button></header><div class="app-dialog-body"><p id="app-dialog-message"></p></div><footer class="modal-footer"><button type="button" class="button button-quiet" data-dialog-cancel>İptal</button><button type="submit" class="button button-primary">' + (isPrompt ? 'Kaydet' : deletion ? 'Sil' : 'Onayla') + '</button></footer></form>';
    dialog.querySelector("h2")!.textContent = isPrompt ? "Bilgi gir" : deletion ? "Silmeyi onayla" : "İşlemi onayla";
    dialog.querySelector("p")!.textContent = message;
    let input: HTMLInputElement | undefined;
    if (isPrompt) {
      input = document.createElement("input");
      input.className = "field-input";
      input.value = initialValue;
      input.setAttribute("aria-labelledby", "app-dialog-message");
      dialog.querySelector(".app-dialog-body")!.append(input);
    }
    let remember: HTMLInputElement | undefined;
    if (deletion) {
      const label = document.createElement("label");
      label.className = "deletion-confirmation-choice";
      remember = document.createElement("input");
      remember.type = "checkbox";
      remember.name = "dontAskDeletionAgain";
      label.append(remember, document.createTextNode("Silme işlemlerinde bir daha sorma"));
      dialog.querySelector(".app-dialog-body")!.append(label);
    }
    let settled = false;
    const finish = (value: string | null): void => {
      if (settled) return;
      settled = true;
      window.removeEventListener("keydown", onKey, true);
      dialog.close();
      dialog.remove();
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected) returnFocus.focus();
      resolve(value);
    };
    const onKey = (event: KeyboardEvent): void => {
      // Keep application shortcuts and underlying modal Escape handlers suspended.
      event.stopImmediatePropagation();
      if (event.key === "Escape") { event.preventDefault(); finish(null); }
    };
    dialog.addEventListener("click", (event) => {
      event.stopPropagation();
      if ((event.target as Element).closest(".modal-close, [data-dialog-cancel]")) finish(null);
    });
    dialog.addEventListener("cancel", (event) => { event.preventDefault(); finish(null); });
    dialog.addEventListener("submit", (event) => {
      event.preventDefault(); event.stopPropagation();
      if (remember?.checked && !setDeletionConfirmationEnabled(false)) {
        let error = dialog.querySelector<HTMLElement>("[data-preference-error]");
        if (!error) { error = document.createElement("p"); error.dataset.preferenceError = ""; error.setAttribute("role", "alert"); dialog.querySelector(".app-dialog-body")!.append(error); }
        error.textContent = "Tercih kaydedilemedi. Seçimi kaldırarak yalnızca bu silme işlemini onaylayabilirsin.";
        return;
      }
      finish(input?.value ?? "confirmed");
    });
    window.addEventListener("keydown", onKey, true);
    document.body.append(dialog);
    dialog.showModal();
    if (input) { input.focus(); input.select(); }
    else dialog.querySelector<HTMLButtonElement>("[data-dialog-cancel]")!.focus();
  });
  const result = pending.then(open);
  pending = result.catch(() => undefined);
  return result;
}

export async function appConfirm(message: string): Promise<boolean> {
  return (await showDialog(message)) !== null;
}

export function appPrompt(message: string, initialValue = ""): Promise<string | null> {
  return showDialog(message, initialValue);
}

/** Yalnızca silme işlemlerinde kullanılır; diğer onay akışlarını değiştirmez. */
export async function appConfirmDeletion(message: string): Promise<boolean> {
  if (!isDeletionConfirmationEnabled()) return true;
  return (await showDialog(message, undefined, true)) !== null;
}
