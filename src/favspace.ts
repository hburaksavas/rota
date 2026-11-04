import { appConfirm } from "./dialogs";

const escape = (value: string): string => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
export function safeResourceUrl(value: string): string | null {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
const palette = ["#8271ed", "#309eb0", "#de8b50", "#c466a0", "#4a9a7c"];
const bookmark = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 4h10a1 1 0 0 1 1 1v16l-6-4-6 4V5a1 1 0 0 1 1-1Z"/></svg>';
let search = "", collection = "", project = "", selected = "", pinnedOnly = false;

interface IndexedResource extends FavspaceResource { source?: { kind: string; id: string; title: string }; file?: AttachmentInfo; }

/** Read through the current workspace: no copies of source records are persisted. */
export function collectWorkspaceResources(state: WorkspaceState): IndexedResource[] {
  const result: IndexedResource[] = [];
  const groups: Record<string, string> = { notes: "Notlar", items: "Backlog", tasks: "Görevler", assets: "Ürün envanteri", decisions: "Kararlar", releases: "Yayınlar", roadmap: "Yol haritası", meetings: "Toplantılar", poRequests: "PO talepleri", workConversations: "Konuşmalar", productRules: "İş kuralları", openQuestions: "Sorular", risks: "Riskler", diagrams: "Diyagramlar", sprints: "Sprintler", dailyPlans: "Günlük planlar", formDrafts: "Taslaklar", workTemplates: "İş şablonları", acceptanceTemplates: "Kabul şablonları" };
  for (const [kind, label] of Object.entries(groups)) {
    const records = (state as unknown as Record<string, unknown>)[kind];
    if (!Array.isArray(records)) continue;
    records.forEach((raw: Record<string, unknown>, index) => {
      const id = String(raw.id || raw.date || index), title = String(raw.title || raw.name || raw.text || label);
      const itemId = kind === "items" ? id : String(raw.linked || raw.itemId || raw.linkedItemId || "");
      const item = state.items.find((entry) => entry.id === itemId);
      const projectId = String(raw.projectId || state.projects.find((p) => p.name === (raw.project || item?.project))?.id || "");
      const seen = new Set<string>();
      const add = (url: string, file?: AttachmentInfo): void => {
        const key = file ? "file:" + (file.storedName || file.name) : url;
        if (seen.has(key)) return; seen.add(key);
        const resourceId = "source:" + kind + ":" + id + ":" + key;
        result.push({ id: resourceId, title: file?.name || url, url, collection: label, tags: file ? "Dosya" : "Bağlantı", note: title, projectId, itemId, pinned: Boolean(state.favspace?.sourcePins?.[resourceId]), source: { kind, id, title }, file });
      };
      const visit = (value: unknown): void => {
        if (typeof value === "string") {
          const text = value.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
          for (const match of text.matchAll(/https?:\/\/[^\s<>"'\u0060]+/gi)) {
            let candidate = match[0].replace(/[.,;!?]+$/, "");
            while (candidate.endsWith(")") && candidate.split(")").length > candidate.split("(").length) candidate = candidate.slice(0,-1);
            const url = safeResourceUrl(candidate); if (url) add(url);
          }
        } else if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") {
          const object = value as Record<string, unknown>;
          if (typeof object.name === "string" && typeof object.size === "number") { add("", object as unknown as AttachmentInfo); return; }
          for (const [key, entry] of Object.entries(object)) if (!["history", "statusHistory", "sourceEmail", "sourceEmails"].includes(key)) visit(entry);
        }
      };
      visit(raw);
    });
  }
  return result;
}

/** Bundled plugin: all persisted data belongs to the workspace and its backups. */
export function renderFavspace(root: HTMLElement, state: WorkspaceState, save: () => void, openSource?: (kind: string, id: string) => void): void {
  const plugin = state.favspace ??= { enabled: true, resources: [] };
  const resources: IndexedResource[] = [...plugin.resources, ...collectWorkspaceResources(state)];
  const draw = (): void => renderFavspace(root, state, save, openSource);
  const action = (name: string, label: string, symbol: string): string => `<button type="button" class="icon-button" data-fav="${name}" title="${label}" aria-label="${label}">${symbol}</button>`;
  const collections = [...new Set(resources.map((r) => r.collection).filter(Boolean))].sort((a,b) => a.localeCompare(b, "tr"));
  const tint = (name: string): string => palette[Math.max(0, collections.indexOf(name)) % palette.length];
  const filtered = resources.filter((r) => (!collection || r.collection === collection) && (!project || r.projectId === project) && (!pinnedOnly || r.pinned) && `${r.title} ${r.url} ${r.note} ${r.tags}`.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr")));
  const current = resources.find((r) => r.id === selected);
  const entering = !root.querySelector(".favspace");
  root.innerHTML = `<section class="favspace"><header class="fav-header"><div class="fav-hero-orbit" aria-hidden="true"><span>✦</span><span>↗</span><span>☆</span></div><div class="fav-hero-copy"><span class="fav-eyebrow"><i></i> SENİN KAYNAK EVRENİN</span><h1>İyi fikirler, <span>tek bir yerde.</span></h1><p>Keşfet, biriktir ve kaldığın yerden devam et.</p><div class="fav-stats"><span><strong>${resources.length}</strong> kaynak</span><span><strong>${collections.length}</strong> koleksiyon</span><span><strong>${resources.filter((r) => r.pinned).length}</strong> sabitlenen</span></div></div><div class="fav-actions"><button class="fav-add" type="button" data-fav="new" data-tooltip="Kaynak ekle" aria-label="Kaynak ekle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div><div class="fav-toolbar"><span class="fav-toolbar-label">${pinnedOnly ? "Sabitlenenler" : escape(collection) || "Kütüphanen"}</span><input id="fav-search" aria-label="Kaynaklarda ara" placeholder="Başlık, adres, etiket veya not ara…" value="${escape(search)}"><select id="fav-project" aria-label="Proje filtresi"><option value="">Tüm projeler</option>${state.projects.filter((p) => !p.archived).map((p) => `<option value="${escape(p.id)}" ${project === p.id ? "selected" : ""}>${escape(p.name)}</option>`).join("")}</select><span>${filtered.length} kaynak</span></div></header><div class="fav-layout ${current ? "has-detail" : ""}"><aside class="fav-collections"><button data-collection="" class="${!collection && !pinnedOnly ? "selected" : ""}"><span class="fav-collection-icon">◈</span><span>Tüm kaynaklar</span><small>${resources.length}</small></button><button data-fav="pins" class="${pinnedOnly ? "selected" : ""}"><span class="fav-collection-icon">☆</span><span>Sabitlenenler</span></button><h3>KOLEKSİYONLAR</h3>${collections.map((c) => `<button style="--fav-color:${tint(c)}" data-collection="${escape(c)}" class="${collection === c ? "selected" : ""}"><span class="fav-collection-icon">${bookmark}</span><span>${escape(c)}</span><small>${resources.filter((r) => r.collection === c).length}</small></button>`).join("") || '<p>Kaynak eklerken koleksiyon oluşturabilirsin.</p>'}</aside><div class="fav-list">${filtered.map((r, index) => `<button class="fav-resource ${selected === r.id ? "selected" : ""}" style="--fav-color:${tint(r.collection || r.title)};--fav-delay:${Math.min(index, 8) * 35}ms" data-resource="${escape(r.id)}" ${r.shortcutPath || r.file ? 'title="Çift tıkla veya Enter ile dosyayı aç"' : ""}><span class="fav-card-cover"><span class="fav-card-monogram">${escape(r.title.slice(0, 1).toLocaleUpperCase("tr"))}</span><span class="fav-card-pin">${r.pinned ? "★" : "↗"}</span><span class="fav-cover-caption">${escape(r.collection || "Kişisel koleksiyon")}</span></span><span class="fav-card-body"><strong>${escape(r.title)}</strong><small>${escape(r.shortcutPath ? r.shortcutPath : r.file ? "Dosya · " + r.source?.title : safeResourceUrl(r.url) ? new URL(r.url).hostname : r.url)}</small><span class="fav-card-note">${escape(r.note || "Bir sonraki fikrin burada başlayabilir.")}</span><span class="fav-tags">${r.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0,3).map((t) => `<span>${escape(t)}</span>`).join("") || `<span>${escape(r.collection || "Kaynak")}</span>`}</span></span></button>`).join("") || `<div class="fav-empty"><div class="fav-empty-art" aria-hidden="true">${bookmark}<span>✦</span><i>+</i></div><h2>${resources.length ? "Kaynak bulunamadı" : "İlk kaynağını ekle"}</h2><p>${resources.length ? "Aramayı veya filtreleri değiştir." : "Doküman, test ortamı veya sık kullandığın bir araçla başla."}</p>${action("new", "Kaynak ekle", "+")}</div>`}</div><aside class="fav-detail">${current ? `<div class="fav-detail-banner" style="--fav-color:${tint(current.collection || current.title)}">${bookmark}<span>${escape(current.collection || "Kişisel koleksiyon")}</span></div><div class="fav-actions">${action("pin", current.pinned ? "Sabitlemeyi kaldır" : "Sabitle", current.pinned ? "★" : "☆")}${current.source || current.shortcutPath ? "" : action("edit", "Kaynağı düzenle", "✎")}${current.source ? "" : action("delete", "Kaynağı sil", "×")}</div><h2>${escape(current.title)}</h2><p>${escape(current.note) || "Not eklenmemiş."}</p>${current.source ? `<div class="fav-origin"><small>Kaynak kayıt</small><strong>${escape(current.source.title)}</strong>${openSource && ["notes", "tasks", "items", "assets", "decisions", "releases", "roadmap", "meetings"].includes(current.source.kind) ? `<button type="button" class="text-button" data-fav="source">Kaydı aç ↗</button>` : ""}</div>` : ""}<dl><dt>Koleksiyon</dt><dd>${escape(current.collection) || "—"}</dd><dt>Etiketler</dt><dd>${escape(current.tags) || "—"}</dd><dt>Proje</dt><dd>${escape(state.projects.find((p) => p.id === current.projectId)?.name || "—")}</dd><dt>Bağlı iş</dt><dd>${escape(state.items.find((i) => i.id === current.itemId)?.title || "—")}</dd></dl>${current.shortcutPath ? `<p class="fav-shortcut-path">${escape(current.shortcutPath)}</p><button type="button" class="button button-primary" data-fav="open-shortcut">Dosyayı aç ↗</button>` : current.file ? (current.file.storedName && !current.file.demoOnly ? `<button type="button" class="button button-primary" data-open-file="${escape(current.file.storedName)}">Dosyayı aç ↗</button>` : "<p>Dosya içeriği bu cihazda bulunmuyor.</p>") : safeResourceUrl(current.url) ? `<a class="button button-primary" href="${escape(safeResourceUrl(current.url)!)}" target="_blank" rel="noopener noreferrer">Kaynağı aç ↗</a>` : '<p>Kaynak adresini düzenleyin.</p>'}` : '<div class="fav-empty"><h2>Kaynak detayları</h2><p>Notları ve bağlantıları görmek için bir kaynak seç.</p></div>'}</aside></div></section>`;
  const host = root.querySelector<HTMLElement>(".favspace")!;
  host.classList.toggle("fav-enter", entering);
  let selectionTimer = 0;
  const openFile = async (resource: IndexedResource): Promise<void> => {
    try {
      if (resource.shortcutPath) {
        if (!window.rotaDesktop?.openFileShortcut) throw new Error("Masaüstü uygulamasında açın.");
        await window.rotaDesktop.openFileShortcut(resource.shortcutPath);
      } else if (resource.file?.storedName && !resource.file.demoOnly) {
        if (!window.rotaDesktop?.openAttachment) throw new Error("Masaüstü uygulamasında açın.");
        const error = await window.rotaDesktop.openAttachment(resource.file.storedName);
        if (error) throw new Error(error);
      } else throw new Error("Dosya içeriği bulunmuyor.");
    } catch {
      const error = document.createElement("p"); error.setAttribute("role", "alert");
      error.textContent = "Dosya açılamadı. Taşınmış, silinmiş veya bu cihazda bulunmuyor olabilir.";
      (root.querySelector(".fav-detail") || root).append(error);
    }
  };
  host.addEventListener("dblclick", (event) => {
    const card = (event.target as Element).closest<HTMLElement>("[data-resource]");
    const resource = resources.find((r) => r.id === card?.dataset.resource);
    if (!resource || !(resource.shortcutPath || resource.file)) return;
    event.preventDefault(); window.clearTimeout(selectionTimer); selected = resource.id; draw(); void openFile(resource);
  });
  host.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.repeat) return;
    const card = (event.target as Element).closest<HTMLElement>("[data-resource]");
    const resource = resources.find((r) => r.id === card?.dataset.resource);
    if (!resource || !(resource.shortcutPath || resource.file)) return;
    event.preventDefault(); window.clearTimeout(selectionTimer); selected = resource.id; draw(); void openFile(resource);
  });
  host.addEventListener("click", async (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (link && window.rotaDesktop?.openResourceUrl) { event.preventDefault(); try { await window.rotaDesktop.openResourceUrl(link.href); } catch { const message = document.createElement("p"); message.setAttribute("role", "alert"); message.textContent = "Bağlantı açılamadı. Tekrar deneyin."; link.after(message); } return; }
    const button = (event.target as Element).closest<HTMLElement>("button");
    if (!button) return;
    if (button.dataset.resource) {
      window.clearTimeout(selectionTimer);
      selected = button.dataset.resource;
      const resource = resources.find((r) => r.id === selected);
      // Keep the card under the pointer until the second click; opening details reflows the grid.
      if ((resource?.shortcutPath || resource?.file) && event.detail > 0) {
        host.querySelectorAll<HTMLElement>("[data-resource]").forEach((card) => card.classList.toggle("selected", card.dataset.resource === selected));
        selectionTimer = window.setTimeout(() => { if (host.isConnected) draw(); }, 450);
      } else draw();
    }
    else if (button.hasAttribute("data-collection")) { collection = button.dataset.collection!; pinnedOnly = false; draw(); }
    else switch (button.dataset.fav) {
      case "open-shortcut": if (current) await openFile(current); break;
      case "source": if (current?.source) openSource?.(current.source.kind, current.source.id); break;
      case "pins": pinnedOnly = !pinnedOnly; collection = ""; draw(); break;
      case "new": edit(); break;
      case "edit": if (current && !current.source && !current.shortcutPath) edit(current); break;
      case "pin": if (current) { if (current.source) { (plugin.sourcePins ??= {})[current.id] = !current.pinned; } else current.pinned = !current.pinned; save(); draw(); } break;
      case "delete": if (current && !current.source && await appConfirm(`“${current.title}” kaynağı silinsin mi?`)) { plugin.resources = plugin.resources.filter((r) => r.id !== current.id); selected = ""; save(); draw(); } break;
    }
  });
  host.querySelector<HTMLInputElement>("#fav-search")?.addEventListener("input", (event) => {
    const input = event.target as HTMLInputElement, position = input.selectionStart;
    search = input.value; draw(); const next = root.querySelector<HTMLInputElement>("#fav-search")!; next.focus(); next.setSelectionRange(position, position);
  });
  host.querySelector<HTMLSelectElement>("#fav-project")?.addEventListener("change", (event) => { project = (event.target as HTMLSelectElement).value; draw(); });

  function edit(resource?: FavspaceResource): void {
    const dialog = document.createElement("dialog"); dialog.className = "modal fav-editor";
    dialog.setAttribute("aria-labelledby", "fav-editor-title");
    const field = (name: string, label: string, value = "", required = false): string => `<label>${label}<input name="${name}" value="${escape(value)}" ${required ? "required" : ""} maxlength="${name === "url" ? 4000 : 200}"></label>`;
    dialog.innerHTML = `<form><header class="modal-header"><h2 id="fav-editor-title">${resource ? "Kaynağı düzenle" : "Kaynak ekle"}</h2><button type="button" class="modal-close" aria-label="İptal">×</button></header><div class="fav-fields">${field("title", "Başlık", resource?.title, true)}${field("url", "Bağlantı (https://…)", resource?.url, true)}${field("collection", "Koleksiyon", resource?.collection || collection)}${field("tags", "Etiketler (virgülle ayır)", resource?.tags)}<label>Not<textarea name="note" rows="3" maxlength="4000">${escape(resource?.note || "")}</textarea></label><label>Proje<select name="projectId"><option value="">Proje seçilmedi</option>${state.projects.map((p) => `<option value="${escape(p.id)}" ${(resource?.projectId || project) === p.id ? "selected" : ""}>${escape(p.name)}</option>`).join("")}</select></label><label>Bağlı iş<select name="itemId"></select></label><p class="fav-error" role="alert"></p></div><footer class="modal-footer"><button type="button" class="button button-quiet" data-cancel>İptal</button><button class="button button-primary" type="submit">Kaydet</button></footer></form>`;
    const projectSelect = dialog.querySelector<HTMLSelectElement>('[name="projectId"]')!;
    const itemSelect = dialog.querySelector<HTMLSelectElement>('[name="itemId"]')!;
    const updateItems = (): void => { const old = itemSelect.value || resource?.itemId; itemSelect.innerHTML = '<option value="">İş seçilmedi</option>' + state.items.filter((i) => !projectSelect.value || i.project === state.projects.find((p) => p.id === projectSelect.value)?.name).map((i) => `<option value="${escape(i.id)}" ${old === i.id ? "selected" : ""}>${escape(i.id + " · " + i.title)}</option>`).join(""); };
    updateItems(); projectSelect.onchange = updateItems;
    const close = (): void => { dialog.close(); dialog.remove(); };
    dialog.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    dialog.addEventListener("click", (e) => { e.stopPropagation(); if ((e.target as Element).closest(".modal-close, [data-cancel]")) close(); });
    dialog.addEventListener("keydown", (e) => e.stopPropagation());
    dialog.querySelector("form")!.onsubmit = (event) => {
      event.preventDefault(); event.stopPropagation();
      const data = new FormData(event.currentTarget as HTMLFormElement);
      const value = (key: string): string => String(data.get(key) || "").trim();
      const url = safeResourceUrl(value("url"));
      if (!url || !value("title")) { dialog.querySelector(".fav-error")!.textContent = "Başlık ve geçerli bir HTTP/HTTPS adresi girin. Adres kullanıcı adı veya parola içeremez."; return; }
      const entry: FavspaceResource = { id: resource?.id || crypto.randomUUID(), title: value("title"), url, collection: value("collection"), tags: value("tags"), note: value("note"), projectId: value("projectId"), itemId: value("itemId"), pinned: resource?.pinned || false };
      if (resource) Object.assign(resource, entry); else plugin.resources.push(entry);
      selected = entry.id; collection = ""; search = ""; project = ""; pinnedOnly = false; save(); close(); draw();
    };
    document.body.append(dialog); dialog.showModal(); dialog.querySelector<HTMLInputElement>("input")!.focus();
  }
}

/** Native paths stay references: file contents are never read or copied. */
export function installFavspaceDrop(getState: () => WorkspaceState, active: () => boolean, save: () => void, redraw: () => void): void {
  let drawer: HTMLElement | null = null, dismissTimer = 0, pendingTimer = 0, operation = 0;
  const available = (): boolean => active() && !document.querySelector('dialog[open], #modal-root .modal');
  const close = (): void => { operation++; window.clearTimeout(pendingTimer); window.clearTimeout(dismissTimer); drawer?.remove(); drawer = null; };
  const show = (): void => {
    if (!available()) return;
    window.clearTimeout(dismissTimer);
    if (drawer) return;
    drawer = document.createElement("div"); drawer.className = "fav-drop-overlay";
    drawer.innerHTML = `<div class="fav-drop-drawer"><div class="fav-drawer-back"></div><div class="fav-drawer-paper" aria-hidden="true">${bookmark}</div><div class="fav-drawer-front"><span class="fav-drawer-handle"></span><span class="fav-drop-plus" aria-hidden="true">+</span><h2>Kaynak çekmecene bırak</h2><p>Dosyan yerinde kalsın, kısayolu burada olsun.</p><span class="fav-drop-status" role="status" aria-live="polite">Dosyaları buraya bırak</span><div class="fav-drop-controls"><button type="button" class="text-button" data-shortcut-pick>Dosya seç</button><button type="button" class="text-button" data-shortcut-cancel>İptal</button></div></div></div>`;
    drawer.querySelector("[data-shortcut-cancel]")!.addEventListener("click", close);
    drawer.querySelector("[data-shortcut-pick]")!.addEventListener("click", async () => {
      try { if (!window.rotaDesktop?.pickFileShortcuts) throw new Error("Dosya kısayolları için Rota masaüstü uygulamasını kullanın."); add(await window.rotaDesktop.pickFileShortcuts()); } catch (error) { fail(String(error)); }
    });
    document.body.append(drawer);
  };
  const fail = (message: string): void => { window.clearTimeout(pendingTimer); show(); drawer?.classList.add("has-error"); const status = drawer?.querySelector(".fav-drop-status"); if (status) status.textContent = message; };
  const add = (files: { name: string; path: string }[]): void => {
    window.clearTimeout(pendingTimer);
    if (!available()) { close(); return; }
    if (!files.length) { close(); return; }
    show();
    const plugin = getState().favspace ??= { enabled: true, resources: [] };
    let added = 0;
    for (const file of files) {
      if (typeof file.path !== "string" || !file.path || typeof file.name !== "string") continue;
      if (plugin.resources.some((r) => r.shortcutPath?.toLocaleLowerCase("en") === file.path.toLocaleLowerCase("en"))) continue;
      plugin.resources.push({ id: crypto.randomUUID(), title: file.name, url: "", shortcutPath: file.path, collection: collection || "Dosyalarım", tags: "Dosya, Kısayol", note: "Orijinal dosyaya kısayol", projectId: project, itemId: "", pinned: false }); added++;
    }
    if (added) { selected = ""; search = ""; pinnedOnly = false; save(); redraw(); }
    drawer?.classList.remove("has-error");
    drawer?.classList.add("is-complete");
    const status = drawer?.querySelector(".fav-drop-status"); if (status) status.textContent = added ? `${added} dosya çekmecene eklendi` : "Bu dosyalar zaten çekmecende";
    dismissTimer = window.setTimeout(close, 1100);
  };
  window.addEventListener("rota-file-hover", show);
  window.addEventListener("rota-file-hover-cancelled", close);
  window.addEventListener("rota-favspace-files", (event) => add((event as CustomEvent<{ name: string; path: string }[]>).detail));
  window.addEventListener("rota-favspace-error", (event) => fail((event as CustomEvent<string>).detail));
  for (const type of ["dragenter", "dragover"] as const) window.addEventListener(type, (event) => {
    if (!available() || !event.dataTransfer?.types.includes("Files")) return;
    event.preventDefault(); event.stopImmediatePropagation(); event.dataTransfer.dropEffect = "link"; show();
  }, true);
  window.addEventListener("dragleave", (event) => {
    if (drawer && !event.relatedTarget && (event.clientX <= 0 || event.clientY <= 0 || event.clientX >= innerWidth || event.clientY >= innerHeight)) close();
  }, true);
  window.addEventListener("drop", async (event) => {
    if (!available() || !event.dataTransfer?.types.includes("Files")) return;
    event.preventDefault(); event.stopImmediatePropagation(); show();
    const status = drawer?.querySelector(".fav-drop-status");
    if (drawer?.classList.contains("is-complete")) return;
    if (status) status.textContent = "Dosya kısayolları hazırlanıyor…";
    const currentOperation = ++operation;
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(() => {
      if (currentOperation === operation && drawer && !drawer.classList.contains("is-complete")) fail("Dosya konumu alınamadı. Dosya seç ile ZIP veya diğer dosyalarını ekleyebilirsin.");
    }, 4000);
    try {
      const files = await window.rotaDesktop?.resolveDroppedFileShortcuts?.();
      if (currentOperation === operation && files?.length) add(files);
    } catch (error) { if (currentOperation === operation) fail("Dosya eklenemedi: " + String(error)); }
  }, true);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && drawer) { event.preventDefault(); event.stopImmediatePropagation(); close(); } }, true);
  window.addEventListener("blur", close);
  new MutationObserver(() => { if (drawer && !available()) close(); }).observe(document.getElementById("view-root")!, { childList: true });
}
