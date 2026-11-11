function searchKey(value: string): string {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/\p{M}/gu, "").replaceAll("ı", "i");
}

export function installSearchableSelects(): void {
  let active: { select: HTMLSelectElement; popup: HTMLElement; close: (restoreFocus: boolean) => void; keydown: (event: KeyboardEvent) => void } | undefined;

  function open(select: HTMLSelectElement, query = ""): void {
    if (select.matches(":disabled") || !select.options.length || active?.select === select) return;
    active?.close(false);
    const popup = document.createElement("div");
    popup.className = "select-search-popup";
    popup.setAttribute("popover", "manual");
    popup.innerHTML = '<input type="search" class="select-search-input" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="rota-select-results" aria-label="Seçeneklerde ara" placeholder="Seçeneklerde ara…" autocomplete="off">' +
      '<div id="rota-select-results" class="select-search-results" role="listbox" aria-label="Seçenekler"></div>' +
      '<p class="select-search-empty" role="status" hidden>Eşleşen seçenek yok.</p>' +
      (select.multiple ? '<button type="button" class="select-search-done">Bitti</button>' : "");
    const input = popup.querySelector<HTMLInputElement>("input")!;
    const results = popup.querySelector<HTMLElement>(".select-search-results")!;
    const empty = popup.querySelector<HTMLElement>(".select-search-empty")!;
    if (select.multiple) results.setAttribute("aria-multiselectable", "true");

    let visible: { option: HTMLOptionElement; row: HTMLElement }[] = [];
    let cursor = -1;

    function highlight(index: number, scroll = true): void {
      visible[cursor]?.row.classList.remove("is-highlighted");
      cursor = index;
      const row = visible[cursor]?.row;
      if (!row) { input.removeAttribute("aria-activedescendant"); return; }
      row.classList.add("is-highlighted");
      input.setAttribute("aria-activedescendant", row.id);
      if (scroll) row.scrollIntoView({ block: "nearest" });
    }

    function render(): void {
      const query = searchKey(input.value.trim());
      const fragment = document.createDocumentFragment();
      visible = [];
      cursor = -1;
      let lastGroup: HTMLOptGroupElement | undefined;
      for (const option of select.options) {
        const parent = option.parentElement;
        const group = parent instanceof HTMLOptGroupElement ? parent : undefined;
        if (option.hidden || group?.hidden || !searchKey([option.label, option.value, group?.label].join(" ")).includes(query)) continue;
        if (group && group !== lastGroup) {
          const label = document.createElement("div");
          label.className = "select-search-group";
          label.textContent = group.label;
          label.setAttribute("aria-hidden", "true");
          fragment.append(label);
        }
        lastGroup = group;
        const row = document.createElement("div");
        row.className = "select-search-option";
        row.id = "rota-select-option-" + option.index;
        row.dataset.index = String(visible.length);
        row.setAttribute("role", "option");
        row.setAttribute("aria-selected", String(option.selected));
        row.setAttribute("aria-disabled", String(option.matches(":disabled")));
        row.textContent = option.label;
        visible.push({ option, row });
        fragment.append(row);
      }
      results.replaceChildren(fragment);
      empty.hidden = visible.length > 0;
      const selected = query ? -1 : visible.findIndex(({ option }) => option.selected && !option.matches(":disabled"));
      highlight(selected < 0 ? visible.findIndex(({ option }) => !option.matches(":disabled")) : selected);
    }

    function position(): void {
      const anchor = select.getBoundingClientRect();
      const margin = 8;
      const width = Math.min(Math.max(anchor.width, 220), window.innerWidth - margin * 2);
      const below = window.innerHeight - anchor.bottom - margin;
      const above = anchor.top - margin;
      const openAbove = below < 220 && above > below;
      popup.style.width = width + "px";
      popup.style.left = Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin)) + "px";
      popup.style.maxHeight = Math.max(0, Math.min(330, openAbove ? above : below)) + "px";
      popup.style.top = (openAbove ? Math.max(margin, anchor.top - popup.offsetHeight - 4) : anchor.bottom + 4) + "px";
    }

    const observer = new MutationObserver(() => {
      if (!select.isConnected || !popup.isConnected || select.matches(":disabled") || !select.getClientRects().length) close(false);
      else position();
    });
    const optionObserver = new MutationObserver(() => { render(); position(); });

    function close(restoreFocus: boolean): void {
      if (active?.popup !== popup) return;
      active = undefined;
      observer.disconnect();
      optionObserver.disconnect();
      window.removeEventListener("resize", position);
      document.removeEventListener("scroll", repositionOnScroll, true);
      if (restoreFocus && select.isConnected) select.focus({ preventScroll: true });
      popup.remove();
    }

    function repositionOnScroll(event: Event): void {
      if (!(event.target instanceof Node) || !popup.contains(event.target)) position();
    }

    function choose(index: number): void {
      const option = visible[index]?.option;
      if (!option || option.matches(":disabled") || select.matches(":disabled")) return;
      const changed = select.multiple || select.selectedIndex !== option.index;
      if (select.multiple) option.selected = !option.selected;
      else {
        select.selectedIndex = option.index;
        close(true);
      }
      if (!changed) return;
      select.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
      if (active?.popup === popup && select.isConnected) {
        const row = visible[index].row;
        row.setAttribute("aria-selected", String(option.selected));
        highlight(index, false);
      }
    }

    function keydown(event: KeyboardEvent): void {
      if (event.isComposing) { event.stopPropagation(); return; }
      event.stopPropagation();
      if (event.key === "Tab") { close(true); return; }
      if (event.key === "Escape") { event.preventDefault(); close(true); return; }
      if (event.key === "Enter") {
        event.preventDefault();
        if (event.target === input) choose(cursor);
        else close(true);
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      for (let index = cursor + direction; index >= 0 && index < visible.length; index += direction) {
        if (!visible[index].option.matches(":disabled")) { highlight(index); break; }
      }
    }

    active = { select, popup, close, keydown };
    const host = select.closest("[data-inline-zone], .detail-inline-editor, dialog, [popover]") || document.body;
    host.append(popup);
    popup.showPopover();
    input.value = query;
    render();
    position();
    input.focus({ preventScroll: true });
    input.addEventListener("input", (event) => { event.stopPropagation(); render(); position(); });
    popup.addEventListener("pointerdown", (event) => {
      if (event.target instanceof Element && event.target.closest("[data-index]")) event.preventDefault();
    });
    popup.addEventListener("click", (event) => {
      event.stopPropagation();
      const target = event.target;
      if (!(target instanceof Element)) return;
      const row = target.closest<HTMLElement>("[data-index]");
      if (row) choose(Number(row.dataset.index));
      else if (target.closest(".select-search-done")) close(true);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    optionObserver.observe(select, { childList: true, subtree: true, attributes: true, characterData: true });
    window.addEventListener("resize", position);
    document.addEventListener("scroll", repositionOnScroll, true);
  }

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof Element) || event.button !== 0) return;
    const select = target.closest("select");
    if (active && !active.popup.contains(target) && select !== active.select) active.close(false);
    if (select && !select.matches(":disabled") && select.options.length) {
      event.preventDefault();
    }
  }, true);
  document.addEventListener("click", (event) => {
    const select = event.target instanceof Element ? event.target.closest("select") : null;
    if (select && !select.matches(":disabled") && select.options.length) {
      event.preventDefault();
      event.stopPropagation();
      if (active?.select === select) active.close(true);
      else open(select);
    }
  }, true);
  document.addEventListener("focusin", (event) => {
    if (active && event.target instanceof Node && event.target !== active.select && !active.popup.contains(event.target)) active.close(false);
  });
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (active?.popup.contains(target)) { active.keydown(event); return; }
    if (target instanceof HTMLInputElement && target.matches("[data-option-filter]")) {
      if (event.key === "Enter") event.preventDefault();
      return;
    }
    if (!(target instanceof HTMLSelectElement) || target.matches(":disabled") || !target.options.length ||
        event.isComposing || event.ctrlKey || event.metaKey) return;
    const printable = event.key.length === 1 && event.key !== " " && !event.altKey;
    if (!printable && !["Enter", " ", "ArrowDown", "ArrowUp", "F4"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    open(target, printable ? event.key : "");
  }, true);
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.matches("[data-option-filter]")) return;
    const query = searchKey(target.value.trim());
    target.parentElement?.querySelectorAll<HTMLElement>("[data-filter-option]").forEach((option) => {
      option.hidden = !searchKey(option.textContent || "").includes(query);
    });
  });
}
