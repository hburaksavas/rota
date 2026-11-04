/** Application dialogs live separately from modal-root so open forms keep their drafts. */
let pending: Promise<unknown> = Promise.resolve();

function showDialog(message: string, initialValue?: string): Promise<string | null> {
  const open = (): Promise<string | null> => new Promise((resolve) => {
    const returnFocus = document.activeElement;
    const dialog = document.createElement("dialog");
    dialog.className = "modal app-dialog";
    dialog.setAttribute("aria-labelledby", "app-dialog-title");
    dialog.setAttribute("aria-describedby", "app-dialog-message");
    const isPrompt = initialValue !== undefined;
    dialog.innerHTML = '<form method="dialog"><header class="modal-header"><div><div class="panel-kicker">ROTA</div><h2 id="app-dialog-title"></h2></div><button type="button" class="modal-close" aria-label="İptal">×</button></header><div class="app-dialog-body"><p id="app-dialog-message"></p></div><footer class="modal-footer"><button type="button" class="button button-quiet" data-dialog-cancel>İptal</button><button type="submit" class="button button-primary">' + (isPrompt ? 'Kaydet' : 'Onayla') + '</button></footer></form>';
    dialog.querySelector("h2")!.textContent = isPrompt ? "Bilgi gir" : "İşlemi onayla";
    dialog.querySelector("p")!.textContent = message;
    let input: HTMLInputElement | undefined;
    if (isPrompt) {
      input = document.createElement("input");
      input.className = "field-input";
      input.value = initialValue;
      input.setAttribute("aria-labelledby", "app-dialog-message");
      dialog.querySelector(".app-dialog-body")!.append(input);
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
    dialog.addEventListener("submit", (event) => { event.preventDefault(); event.stopPropagation(); finish(input?.value ?? "confirmed"); });
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
