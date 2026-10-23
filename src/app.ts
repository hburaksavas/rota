import { Graph, type Edge, type Node } from "@antv/x6";

const seed: WorkspaceState = {
  items: [
    { id: "PAY-241", type: "Story", title: "Karttan karta transfer ücretinin hesaplanması", status: "Hazır", priority: "Yüksek", project: "Ödeme Platformu", area: "Kartlı Ödemeler", updated: "12 dk önce", description: "Karttan karta transfer işleminde ücretin, işlem onayından önce doğru hesaplanıp kullanıcıya gösterilmesi.", acceptance: ["Ücret, transfer tutarı ve kart tipine göre hesaplanır.", "Onay ekranında ücret ve toplam tutar ayrı gösterilir.", "İşlem reddedilirse ücret tahsil edilmez."], attachments: [], labels: ["Ücretleme", "Mobil"], assetIds: ["AST-TRANSFER-CHECKOUT"] },
    { id: "PAY-238", type: "Bug", title: "Bekleyen EFT işlemi hareketlerde iki kez görünüyor", status: "Analiz ediliyor", priority: "Kritik", project: "Ödeme Platformu", area: "Para Transferleri", updated: "1 sa önce", description: "EFT talimatı beklemede durumundayken hesap hareketlerinde mükerrer kayıt oluşuyor.", acceptance: ["Bekleyen talimat tek satır olarak görüntülenir.", "Kesinleşen işlem mevcut satırı günceller.", "Mükerrer kayıt için geriye dönük kontrol yapılır."], attachments: [], labels: ["Hesap Hareketleri", "İşlem"], assetIds: ["AST-EFT-BATCH", "AST-RECON-REPORT"] },
    { id: "PAY-235", type: "Story", title: "İleri tarihli EFT için iptal süresinin belirlenmesi", status: "Yeni", priority: "Orta", project: "Ödeme Platformu", area: "Para Transferleri", updated: "Dün", description: "Müşteri ileri tarihli EFT talimatını belirlenen kesim saatine kadar iptal edebilmeli.", acceptance: ["İptal edilebilir son tarih açıkça gösterilir.", "Son tarih geçince iptal eylemi kapatılır."], attachments: [], labels: ["EFT"] },
    { id: "PAY-229", type: "Task", title: "FAST limit matrisi için iş biriminden teyit al", status: "Devam ediyor", priority: "Orta", project: "Ödeme Platformu", area: "FAST", updated: "Dün", description: "Bireysel ve ticari müşteri limitlerini iş birimiyle netleştir.", acceptance: [], attachments: [], labels: ["Limitler"], assetIds: ["AST-FAST-LIMIT-API"] },
    { id: "PAY-225", type: "Story", title: "Transfer alıcısını kayıtlı kişilerden seçme", status: "Hazır", priority: "Düşük", project: "Ödeme Platformu", area: "Dijital Kanallar", updated: "2 gün önce", description: "Sık kullanılan bir alıcıya hızlıca transfer başlatma.", acceptance: ["Alıcı adı ve maskeli hesap numarası gösterilir.", "Kullanıcı kayıtlı kişileri düzenleyebilir."], attachments: [], labels: ["UX"] },
    { id: "PAY-221", type: "Bug", title: "İade edilen işlemde kullanılabilir bakiye yenilenmiyor", status: "Bloke", priority: "Yüksek", project: "Ödeme Platformu", area: "Mutabakat", updated: "3 gün önce", description: "İade kaydı oluştuktan sonra kullanılabilir bakiye güncellenmesi gecikiyor.", acceptance: ["İade durumuyla bakiye aynı işlemde güncellenir.", "Mutabakat farkı oluşursa uyarı kaydı açılır."], attachments: [], labels: ["Mutabakat"] },
    { id: "PAY-218", type: "Story", title: "Havale işlem makbuzunun PDF olarak indirilmesi", status: "Tamamlandı", priority: "Orta", project: "Ödeme Platformu", area: "Havale", updated: "5 gün önce", description: "Tamamlanan havale için işlem makbuzunu indirme.", acceptance: ["Makbuzda işlem bilgileri ve dekont numarası yer alır."], attachments: [], labels: ["Makbuz"] },
    { id: "PAY-214", type: "Story", title: "İşlem listesinde tarih aralığı filtresi", status: "Hazır", priority: "Orta", project: "Ödeme Platformu", area: "Hesap Hareketleri", updated: "1 hafta önce", description: "Müşterinin seçtiği tarih aralığında işlemleri listeleme.", acceptance: ["Başlangıç tarihi bitiş tarihinden ileri olamaz.", "Son 12 ay içinde tarih aralığı seçilebilir."], attachments: [], labels: ["Filtre"] }
  ],
  tasks: [
    { id: "T-01", title: "EFT iptal penceresini operasyonla netleştir", due: "Bugün", done: false, linked: "PAY-235" },
    { id: "T-02", title: "Ödeme akışı kararlarını refinement notuna ekle", due: "Bugün", done: false, linked: "PAY-241" },
    { id: "T-03", title: "FAST limitleri için dönüşü takip et", due: "Yarın", done: true, linked: "PAY-229" },
    { id: "T-04", title: "Mutabakat ekibiyle kısa görüşme ayarla", due: "20 Eki", done: false, linked: "" }
  ],
  notes: [
    { id: "N-01", title: "Ödeme akışı refinement", body: "Kullanıcı onayından önce ücret bilgisi görünmeli. Hata senaryolarında tekrar deneme davranışını ayrıca netleştir.", linked: "PAY-241", updated: "Bugün" },
    { id: "N-02", title: "Operasyon soruları", body: "İade sürecinde mutabakat dosyasının hangi saatte üretildiğini teyit et.", linked: "", updated: "Dün" }
  ],
  projects: [
    { id: "payments", name: "Ödeme Platformu", color: "blue" },
    { id: "digital", name: "Dijital Kanallar", color: "violet" },
    { id: "credit", name: "Kredi Yaşam Döngüsü", color: "amber" }
  ],
  profile: { organization: "Kuzey Finans", workspace: "PO çalışma alanı", userName: "Deniz Arslan", userRole: "Product Owner" },
  teams: [],
  roadmap: [],
  releases: [],
  decisions: [],
  diagrams: [],
  sprints: [],
  assets: [
    { id: "AST-TRANSFER-CHECKOUT", code: "PAY-SCR-012", name: "Karttan Karta Transfer Onay Ekranı", type: "Ekran", project: "Ödeme Platformu", area: "Kartlı Ödemeler", purpose: "Transfer ücreti ve toplam tutarın kullanıcı onayından önce gösterilmesi.", description: "Karttan karta transfer akışının son onay adımı.", ownerTeamId: "", ownerName: "", relatedAssetIds: ["AST-FAST-LIMIT-API"], active: true, updated: "Bugün" },
    { id: "AST-EFT-BATCH", code: "PAY-BAT-004", name: "Gün Sonu EFT Mutabakat Batch'i", type: "Batch", project: "Ödeme Platformu", area: "Para Transferleri", purpose: "Bekleyen ve kesinleşen EFT kayıtlarını mutabakat için işlemek.", description: "Gün sonu mutabakat çıktısını üretir.", ownerTeamId: "", ownerName: "", relatedAssetIds: ["AST-RECON-REPORT"], active: true, updated: "Bugün" },
    { id: "AST-RECON-REPORT", code: "PAY-RPT-006", name: "EFT Mutabakat Raporu", type: "Rapor", project: "Ödeme Platformu", area: "Mutabakat", purpose: "EFT hareketlerindeki bekleyen, kesinleşen ve iade edilen kayıtları karşılaştırmak.", description: "Operasyon ve mutabakat ekiplerinin günlük kontrol raporu.", ownerTeamId: "", ownerName: "", relatedAssetIds: [], active: true, updated: "Bugün" },
    { id: "AST-FAST-LIMIT-API", code: "PAY-API-021", name: "FAST Limit Servisi", type: "Servis/API", project: "Ödeme Platformu", area: "FAST", purpose: "Müşteri tipi ve işlem kanalı için geçerli FAST limitini döndürmek.", description: "Bireysel ve ticari müşteri limit matrisi sorgusu.", ownerTeamId: "", ownerName: "", relatedAssetIds: [], active: true, updated: "Bugün" }
  ]
};

const STORAGE_KEY = "rota-po-workspace-v1";
const BACKLOG_PREVIEW_PREFERENCE_KEY = "rota-backlog-preview-enabled";
const BACKLOG_COLUMNS_PREFERENCE_KEY = "rota-backlog-columns";
const BACKLOG_DENSITY_PREFERENCE_KEY = "rota-backlog-density";
const BACKLOG_TITLE_WRAP_PREFERENCE_KEY = "rota-backlog-title-wrap";
const BACKLOG_COLUMN_WIDTHS_KEY = "rota-backlog-column-widths";
const QUICK_ASSIGNMENT_PREFERENCE_KEY = "rota-quick-create-assignment";
const BACKLOG_SPRINT_COLUMN_MIGRATION_KEY = "rota-backlog-sprint-column-v1";
const BACKLOG_VIEWS_PREFERENCE_KEY = "rota-backlog-saved-views";
const BACKLOG_SEARCH_SCOPE_KEY = "rota-backlog-search-scope";
const BACKLOG_SECONDARY_INFO_KEY = "rota-backlog-secondary-info";
const BACKLOG_RECENT_FILTERS_KEY = "rota-backlog-recent-filters";
const SIDEBAR_COLLAPSED_KEY = "rota-sidebar-collapsed";
const SIDEBAR_NAV_GROUPS_KEY = "rota-sidebar-nav-groups";
const FONT_SCALE_KEY = "rota-font-scale";
const HIGH_CONTRAST_KEY = "rota-high-contrast";
const REDUCED_MOTION_KEY = "rota-reduced-motion";
const THEME_KEY = "rota-theme";
const PINNED_PROJECTS_KEY = "rota-pinned-projects";
let pinnedProjectIds: string[] = (() => { try { const ids = JSON.parse(localStorage.getItem(PINNED_PROJECTS_KEY) || "[]"); return Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : []; } catch { return []; } })();
const RECENT_ITEMS_KEY = "rota-recently-opened-items";
let recentItemIds: string[] = (() => { try { const ids = JSON.parse(localStorage.getItem(RECENT_ITEMS_KEY) || "[]"); return Array.isArray(ids) ? ids.filter((id) => typeof id === "string").slice(0, 8) : []; } catch { return []; } })();
let pendingDeletionUndo: { snapshot: WorkspaceState; attachments: AttachmentInfo[] } | null = null;
let pendingDeletionTimer = 0;
interface BacklogSavedView {
  id: string;
  name: string;
  projectId: string | null;
  mode: "list" | "board";
  query: string;
  status: string;
  type: string;
  label: string;
  teamId: string;
  assignee: string;
  sprintId?: string;
  includeCompleted?: boolean;
  columns: BacklogColumnId[];
  sort: BacklogSort;
  secondarySort?: BacklogSort;
  pinned?: boolean;
  searchScope?: "all" | "title" | "description" | "id" | "labels" | "components";
}
interface RecentBacklogFilter { query: string; searchScope: BacklogSearchScope; status: string; type: string; label: string; teamId: string; assignee: string; sprintId?: string; includeCompleted?: boolean; }
type BacklogColumnId = "type" | "area" | "priority" | "status" | "updated" | "assignment" | "project" | "description" | "labels" | "startDate" | "targetDate" | "targetPeriod" | "estimate" | "productStage" | "release" | "sprint" | "assets" | "attachments" | "acceptance" | "dependencies" | "blocker" | "activity";
type BacklogSort = "manual" | "aging-desc" | "title-asc" | "title-desc" | "priority-desc" | "status-asc" | "target-asc" | "target-desc" | "updated-asc" | "updated-desc" | `column:${"title" | BacklogColumnId}:${"asc" | "desc"}`;
const BACKLOG_COLUMN_CATALOG: { id: BacklogColumnId; label: string }[] = [
  { id: "area", label: "Ürün alanı" }, { id: "priority", label: "Öncelik" },
  { id: "status", label: "Durum" }, { id: "updated", label: "Güncellendi" }, { id: "assignment", label: "Sorumlu" },
  { id: "project", label: "Proje" }, { id: "description", label: "Açıklama" }, { id: "labels", label: "Etiketler" },
  { id: "startDate", label: "Başlangıç tarihi" }, { id: "targetDate", label: "Hedef bitiş" }, { id: "targetPeriod", label: "Planlanan dönem" },
  { id: "estimate", label: "Tahmini efor" }, { id: "productStage", label: "Ürün aşaması" }, { id: "release", label: "Release" },
  { id: "sprint", label: "Sprint" }, { id: "assets", label: "Ürün bileşenleri" }, { id: "attachments", label: "Dosya ekleri" }, { id: "acceptance", label: "Kabul kriterleri" },
  { id: "dependencies", label: "Bağımlılıklar" }, { id: "blocker", label: "Blokaj" }, { id: "activity", label: "Son aktivite" }
];
const DEFAULT_BACKLOG_COLUMNS: BacklogColumnId[] = ["area", "priority", "status", "updated", "assignment", "sprint"];
function normalizeBacklogSort(value: unknown): BacklogSort {
  const legacy: Record<string, BacklogSort> = {
    "title-asc": "column:title:asc", "title-desc": "column:title:desc",
    "priority-desc": "column:priority:desc", "status-asc": "column:status:asc",
    "target-asc": "column:targetDate:asc", "target-desc": "column:targetDate:desc",
    "updated-asc": "column:updated:asc", "updated-desc": "column:updated:desc"
  };
  if (typeof value !== "string") return "manual";
  if (["manual", "aging-desc"].includes(value)) return value as BacklogSort;
  if (legacy[value]) return legacy[value];
  const match = /^column:(title|type|area|priority|status|updated|assignment|project|description|labels|startDate|targetDate|targetPeriod|estimate|productStage|release|sprint|assets|attachments|acceptance|dependencies|blocker|activity):(asc|desc)$/.exec(value);
  return match ? value as BacklogSort : "manual";
}

function sortState(value: BacklogSort = backlogSort): { column: "title" | BacklogColumnId; direction: "asc" | "desc" } | null {
  const normalized = normalizeBacklogSort(value);
  const match = /^column:(.+):(asc|desc)$/.exec(normalized);
  if (match) return { column: match[1] as "title" | BacklogColumnId, direction: match[2] as "asc" | "desc" };
  if (normalized === "aging-desc") return { column: "updated", direction: "asc" };
  return null;
}

function loadSavedBacklogViews(): BacklogSavedView[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(BACKLOG_VIEWS_PREFERENCE_KEY) || "[]") as BacklogSavedView[];
    if (!Array.isArray(parsed)) return [];
    const knownColumns = new Set(BACKLOG_COLUMN_CATALOG.map((column) => column.id));
    return parsed.filter((view) => view && typeof view.id === "string" && typeof view.name === "string").map((view) => ({
      ...view,
      pinned: Boolean(view.pinned),
      searchScope: ["all", "title", "description", "id", "labels", "components"].includes(view.searchScope || "") ? view.searchScope : "all",
      projectId: view.projectId || null,
      mode: view.mode === "board" ? "board" : "list",
      query: view.query || "", status: view.status || "", type: view.type || "", label: view.label || "",
      teamId: view.teamId || "", assignee: view.assignee || "", sprintId: view.sprintId || "",
      columns: Array.isArray(view.columns) ? [...new Set(view.columns.filter((id) => knownColumns.has(id)))] : [...DEFAULT_BACKLOG_COLUMNS],
      sort: normalizeBacklogSort(view.sort === "manual" && view.secondarySort && view.secondarySort !== "manual" ? view.secondarySort : view.sort),
      secondarySort: "manual"
    }));
  } catch { return []; }
}
const hasStoredWorkspace = localStorage.getItem(STORAGE_KEY) !== null;
function workspaceRecords<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is T => entry !== null && typeof entry === "object")
    : structuredClone(fallback);
}
let state: WorkspaceState;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<WorkspaceState> | null;
  const savedItems = workspaceRecords<WorkItem>(saved?.items, seed.items);
  const savedProjects = workspaceRecords<Project>(saved?.projects, seed.projects);
  const legacySampleWorkspace = Boolean(saved && !saved.assets && saved.profile?.organization === seed.profile.organization && saved.profile?.workspace === seed.profile.workspace && savedItems.some((item) => item.id === "PAY-241") && savedProjects.some((project) => project.name === "Ödeme Platformu"));
  state = saved ? {
    ...structuredClone(seed), ...saved,
    items: savedItems,
    tasks: workspaceRecords<PersonalTask>(saved.tasks, seed.tasks),
    notes: workspaceRecords<PersonalNote>(saved.notes, seed.notes),
    projects: savedProjects,
    profile: { ...seed.profile, ...saved.profile },
    teams: workspaceRecords<Team>(saved.teams, []),
    roadmap: workspaceRecords<RoadmapNode>(saved.roadmap, []),
    releases: workspaceRecords<ProductRelease>(saved.releases, []),
    decisions: workspaceRecords<ProductDecision>(saved.decisions, []),
    diagrams: workspaceRecords<WorkDiagram>(saved.diagrams, []),
    sprints: workspaceRecords<Sprint>(saved.sprints, []),
    assets: workspaceRecords<ProductAsset>(saved.assets, legacySampleWorkspace ? seed.assets : []),
    openQuestions: workspaceRecords<OpenQuestion>(saved.openQuestions, []),
    acceptanceTemplates: workspaceRecords<AcceptanceTemplate>(saved.acceptanceTemplates, []),
    risks: workspaceRecords<ProductRisk>(saved.risks, []),
    dailyPlans: workspaceRecords<DailyPlan>(saved.dailyPlans, []),
    weeklySummaryNotes: saved.weeklySummaryNotes || {},
    handoverNotes: saved.handoverNotes || {}
  } : structuredClone(seed);
  if (legacySampleWorkspace) state.items.forEach((item) => {
    const sampleItem = seed.items.find((entry) => entry.id === item.id);
    if (sampleItem?.assetIds?.length) item.assetIds = [...sampleItem.assetIds];
  });
} catch {
  state = structuredClone(seed);
}
let activeView = "overview";
let pendingBacklogImport: { filename: string; rows: { title: string; description: string }[] } | null = null;
let backlogMode = "list";
let activeProjectId: string | null = null;
let activeItemId: string | null = null;
let statusUpdateReturnToBoard = false;
let suppressBoardClickUntil = 0;
let draftAttachments: AttachmentInfo[] = [];
let progressAttachments: AttachmentInfo[] = [];
let draftAssetIds: string[] = [];
let pendingDroppedEmailSource: EmailSourceInfo | null = null;
let pendingEmailAttachmentToken = "";
let pendingEmailAttachmentChoices: { id: string; name: string; size: number }[] = [];
let attachmentTarget: { kind: "draft" | "item" | "task" | "note"; id?: string } | null = null;
let dropImportRetry: { files: File[]; destination: { kind: "draft" | "item" | "task" | "note"; id?: string }; activity: boolean } | null = null;
let query = "";
type BacklogSearchScope = "all" | "title" | "description" | "id" | "labels" | "components";
let backlogSearchScope: BacklogSearchScope = (localStorage.getItem(BACKLOG_SEARCH_SCOPE_KEY) as BacklogSearchScope) || "all";
type BacklogSecondaryInfo = "id" | "updated" | "assignment" | "none";
let backlogSecondaryInfo: BacklogSecondaryInfo = (localStorage.getItem(BACKLOG_SECONDARY_INFO_KEY) as BacklogSecondaryInfo) || "id";
let assetQuery = "";
let assetTypeFilter = "";
let assetProjectFilter = "";
let includeInactiveAssets = false;
let assetPresentation: "cards" | "diagram" = "cards";
let assetDiagramGraph: Graph | null = null;
let assetDiagramResizeObserver: ResizeObserver | null = null;
let workDiagramGraph: Graph | null = null;
let workDiagramResizeObserver: ResizeObserver | null = null;
let activeWorkDiagramId: string | null = null;
let workDiagramUndoHistory: string[] = [];
let workDiagramRedoHistory: string[] = [];
let teamFilterId = "";
let assigneeFilter = "";
let labelFilter = "";
const teamPlanFilters = { startFrom: "", targetTo: "", period: "", minEstimate: "", maxEstimate: "" };
let teamEditorReturnToSettings = false;
let toastTimer = 0;
let lastUndoWorkItems: WorkItem[] | null = null;
let lastUndoTimer = 0;
let backlogPreviewTimer = 0;
let backlogPreviewItemId: string | null = null;
let backlogPreviewEnabled = localStorage.getItem(BACKLOG_PREVIEW_PREFERENCE_KEY) !== "false";
let backlogColumns: BacklogColumnId[] = loadBacklogColumns();
let backlogColumnWidths: Record<string, number> = (() => { try { return JSON.parse(localStorage.getItem(BACKLOG_COLUMN_WIDTHS_KEY) || "{}"); } catch { return {}; } })();
let backlogDensity: "compact" | "standard" | "comfortable" = (localStorage.getItem(BACKLOG_DENSITY_PREFERENCE_KEY) as "compact" | "standard" | "comfortable") || "standard";
let backlogTitleWrap = localStorage.getItem(BACKLOG_TITLE_WRAP_PREFERENCE_KEY) === "true";
let resizingBacklogColumn: { header: HTMLTableCellElement; key: string; startX: number; startWidth: number } | null = null;
if (!localStorage.getItem(BACKLOG_SPRINT_COLUMN_MIGRATION_KEY)) {
  if (!backlogColumns.includes("sprint")) backlogColumns.push("sprint");
  localStorage.setItem(BACKLOG_COLUMNS_PREFERENCE_KEY, JSON.stringify(backlogColumns));
  localStorage.setItem(BACKLOG_SPRINT_COLUMN_MIGRATION_KEY, "done");
}
let backlogColumnDraft: BacklogColumnId[] = [];
let inlineBacklogEdit: { itemId: string; field: "title" | "status" | "assignment" | "type" } | null = null;
let savedBacklogViews: BacklogSavedView[] = loadSavedBacklogViews();
let activeBacklogViewId = "";
let backlogSort: BacklogSort = "manual";
let recentBacklogFilters: RecentBacklogFilter[] = (() => { try { const value = JSON.parse(localStorage.getItem(BACKLOG_RECENT_FILTERS_KEY) || "[]"); return Array.isArray(value) ? value.slice(0, 5) : []; } catch { return []; } })();
let backlogStatus = "";
let backlogIncludeCompleted = false;
let backlogType = "";
let backlogSprintId = "";
const selectedBacklogItemIds = new Set<string>();
let readyWorkPool = false;
let backlogDraggingItemId = "";
let questionFilter: "open" | "all" | "answered" = "open";
let archiveQuery = "";
let selectedDailyDate = (() => { const today = new Date(); return [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-"); })();
let selectedWeeklyStart = "";
let jiraBoards: JiraBoard[] = [];
let jiraProjects: JiraProject[] = [];
let jiraSprints: JiraSprint[] = [];
let jiraIssueTypes: JiraIssueType[] = [];
let jiraIssues: JiraIssue[] = [];
let jiraSelectedBoardId = "";
let jiraSelectedProjectKey = "";
let jiraSelectedSprintId = "";
let jiraSelectedIssueTypeId = "";
let jiraIssueScope: "backlog" | "board" | "sprint" = "backlog";
let jiraSelectedRotaItemId = "";
let jiraHasSavedToken = false;
let jiraLoading = false;
let jiraError = "";
let jiraCatalogLoadedFor = "";

const defaultAcceptanceTemplates: AcceptanceTemplate[] = [
  { id: "tpl-story-bank", name: "Story · Bankacılık akışı", category: "Story", criteria: ["Başarılı ve alternatif akışlar tanımlı.", "Yetki, limit ve uygunluk kontrolleri belirtilmiş.", "İşlem sonucu ve müşteri bilgilendirmesi tanımlı.", "İşlem kaydı ve denetim izi doğrulanabilir."] },
  { id: "tpl-bug-bank", name: "Bug · Hata doğrulama", category: "Bug", criteria: ["Mevcut ve beklenen davranış net.", "Tekrar üretim koşulları tanımlı.", "Düzeltme sonrası regresyon senaryosu doğrulanmış.", "Hata ve işlem kayıtları izlenebilir."] },
  { id: "tpl-banking-change", name: "Bankacılık değişikliği", category: "Bankacılık değişikliği", criteria: ["Ücret, limit ve tutar hesaplamaları doğrulanmış.", "Muhasebe, mutabakat ve ters işlem etkisi tanımlı.", "Yetki, onay ve denetim izi gereksinimleri karşılanmış.", "Kanallar ve operasyon raporları tutarlı."] }
];
state.acceptanceTemplates = [...defaultAcceptanceTemplates, ...(state.acceptanceTemplates || []).filter((entry) => !defaultAcceptanceTemplates.some((preset) => preset.id === entry.id))];

const root = document.getElementById("view-root") as HTMLElement;
const modalRoot = document.getElementById("modal-root") as HTMLElement;
const pageLayoutObserver = new MutationObserver(() => {
  const page = root.firstElementChild;
  if (!(page instanceof HTMLElement) || !page.classList.contains("page-content") || page.dataset.scrollLayout === "ready") return;
  page.dataset.scrollLayout = "ready";
  if (page.classList.contains("backlog-page")) return;
  const heading = page.querySelector<HTMLElement>(":scope > .page-title-row, :scope > .welcome-row");
  if (!heading) return;
  const content = document.createElement("div");
  content.className = "page-scroll-region";
  let sibling = heading.nextElementSibling;
  while (sibling) {
    const next = sibling.nextElementSibling;
    content.append(sibling);
    sibling = next;
  }
  page.append(content);
});
pageLayoutObserver.observe(root, { childList: true });
function sidebarNavGroups(): HTMLDetailsElement[] { return [...document.querySelectorAll<HTMLDetailsElement>(".nav-group[data-nav-group]")]; }
function readSidebarNavGroupPreferences(): Record<string, boolean> { try { const value = JSON.parse(localStorage.getItem(SIDEBAR_NAV_GROUPS_KEY) || "{}"); return value && typeof value === "object" ? value : {}; } catch { return {}; } }
function applySidebarNavGroupPreferences(): void {
  const preferences = readSidebarNavGroupPreferences();
  sidebarNavGroups().forEach((group) => { const key = group.dataset.navGroup || ""; group.open = typeof preferences[key] === "boolean" ? preferences[key] : group.dataset.defaultOpen === "true"; });
}
function saveSidebarNavGroupPreferences(): void { localStorage.setItem(SIDEBAR_NAV_GROUPS_KEY, JSON.stringify(Object.fromEntries(sidebarNavGroups().map((group) => [group.dataset.navGroup || "", group.open])))); }
sidebarNavGroups().forEach((group) => { group.dataset.defaultOpen = String(group.open); });
applySidebarNavGroupPreferences();
const sidebarStartsCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
if (sidebarStartsCollapsed) {
  document.querySelector(".sidebar")?.classList.add("collapsed");
  sidebarNavGroups().forEach((group) => { group.open = true; });
  const toggle = document.querySelector<HTMLButtonElement>(".sidebar-toggle");
  if (toggle) { toggle.title = "Yan menüyü genişlet"; toggle.setAttribute("aria-label", "Yan menüyü genişlet"); }
}
document.addEventListener("toggle", (event) => {
  if (!(event.target instanceof HTMLDetailsElement) || !event.target.matches(".nav-group[data-nav-group]")) return;
  if (!document.querySelector(".sidebar")?.classList.contains("collapsed")) saveSidebarNavGroupPreferences();
}, true);
document.body.style.zoom = localStorage.getItem(FONT_SCALE_KEY) || "1";
if (localStorage.getItem(HIGH_CONTRAST_KEY) === "true") document.body.classList.add("high-contrast");
if (localStorage.getItem(REDUCED_MOTION_KEY) === "true") document.body.classList.add("reduced-motion");
if ((localStorage.getItem(THEME_KEY) || "system") === "dark" || (localStorage.getItem(THEME_KEY) !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches)) document.body.classList.add("dark-theme");
const toastRoot = document.getElementById("toast-root") as HTMLElement;
const desktop: DesktopBridge = window.rotaDesktop;

const esc = (value: unknown): string => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] ?? char));
function getBacklogScopeItems(): WorkItem[] {
  const project = state.projects.find((entry) => entry.id === activeProjectId);
  return state.items.filter((item) => !item.archived && (project ? item.project === project.name : isItemInActiveProject(item)));
}

function getSelectedBacklogItems(): WorkItem[] {
  return getBacklogScopeItems().filter((item) => selectedBacklogItemIds.has(item.id));
}

function loadBacklogColumns(): BacklogColumnId[] {
  try {
    const saved = JSON.parse(localStorage.getItem(BACKLOG_COLUMNS_PREFERENCE_KEY) || "null") as string[] | null;
    if (!Array.isArray(saved)) return [...DEFAULT_BACKLOG_COLUMNS];
    const known = new Set(BACKLOG_COLUMN_CATALOG.map((column) => column.id));
    const valid = saved.filter((id): id is BacklogColumnId => known.has(id as BacklogColumnId));
    return [...new Set(valid)];
  } catch { return [...DEFAULT_BACKLOG_COLUMNS]; }
}
const save = () => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); recordWorkDiagramSnapshot(); };
const itemById = (id: string): WorkItem | undefined => state.items.find((item) => item.id === id);
const PRODUCT_STAGES: ProductStage[] = ["Fikirler", "Keşif", "Sırada", "Planlandı", "Teslimatta", "Tamamlandı"];
function roadmapNodeOptions(selected = ""): string {
  return '<option value="">Hedefe bağlanmadı</option>' + state.roadmap.map((node) => '<option value="' + esc(node.id) + '" ' + (node.id === selected ? "selected" : "") + '>' + esc(node.type + " · " + node.title) + '</option>').join("");
}

function productStageOptions(selected: ProductStage = "Sırada"): string {
  return PRODUCT_STAGES.map((stage) => '<option ' + (stage === selected ? "selected" : "") + '>' + esc(stage) + '</option>').join("");
}

function roadmapTimelineBar(node: RoadmapNode): string {
  const rangeStart = new Date(); rangeStart.setDate(1); rangeStart.setHours(0, 0, 0, 0);
  const rangeEnd = new Date(rangeStart); rangeEnd.setMonth(rangeEnd.getMonth() + 6);
  const total = rangeEnd.getTime() - rangeStart.getTime();
  const start = new Date((node.startDate || node.targetDate || rangeStart.toISOString().slice(0, 10)) + "T00:00:00").getTime();
  const end = new Date((node.targetDate || node.startDate || new Date(start + 30 * 86400000).toISOString().slice(0, 10)) + "T00:00:00").getTime();
  const left = Math.max(0, Math.min(96, ((start - rangeStart.getTime()) / total) * 100));
  const right = Math.max(left + 3, Math.min(100, ((end - rangeStart.getTime()) / total) * 100));
  return '<div class="roadmap-timeline-track"><i style="left:' + left.toFixed(1) + '%;width:' + Math.max(3, right - left).toFixed(1) + '%"></i></div>';
}
function hasDependencyPath(fromId: string, targetId: string, visited = new Set<string>()): boolean {
  if (fromId === targetId) return true;
  if (visited.has(fromId)) return false;
  visited.add(fromId);
  const current = itemById(fromId);
  return (current?.dependsOnIds || []).some((dependencyId) => hasDependencyPath(dependencyId, targetId, visited));
}

function dependencyWouldCycle(itemId: string, dependencies: string[]): boolean {
  return dependencies.some((dependencyId) => dependencyId === itemId || hasDependencyPath(dependencyId, itemId));
}

function pendingDependencies(item: WorkItem): WorkItem[] {
  return (item.dependsOnIds || []).map((id) => itemById(id)).filter((dependency): dependency is WorkItem => Boolean(dependency && dependency.status !== "Tamamlandı"));
}
function elapsedLabel(value: string): string {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return "Bilinmiyor";
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (minutes < 60) return minutes <= 1 ? "az önce" : minutes + " dk önce";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + " sa önce";
  const days = Math.floor(hours / 24);
  return days + (days === 1 ? " gün önce" : " gün önce");
}

function itemLastActivityLabel(item: WorkItem): string {
  const latest = item.activity?.[0];
  return latest ? elapsedLabel(latest.occurredAt) : item.updated || "Bilinmiyor";
}

function overdueDays(item: WorkItem): number {
  if (!item.targetDate || item.status === "Tamamlandı") return 0;
  const due = new Date(item.targetDate + "T00:00:00");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return due < today ? Math.floor((today.getTime() - due.getTime()) / 86400000) : 0;
}
const isItemInActiveProject = (item: WorkItem): boolean => !state.projects.some((project) => project.name === item.project && project.archived);
const nextId = (prefix: string): string => prefix + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
function addWorkActivity(item: WorkItem, kind: WorkActivity["kind"], message: string): void {
  item.activity ||= [];
  item.activity.unshift({ id: nextId("ACT"), kind, message, actor: state.profile.userName || "PO", occurredAt: new Date().toISOString() });
}

function workItemLastTouched(item: WorkItem): number {
  const latest = item.activity?.map((entry) => new Date(entry.occurredAt).getTime()).filter(Number.isFinite).sort((a, b) => b - a)[0];
  return latest || Number.MAX_SAFE_INTEGER;
}

function workItemWaitingDays(item: WorkItem): number | null {
  const timestamp = workItemLastTouched(item);
  if (timestamp === Number.MAX_SAFE_INTEGER) return null;
  return Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
}

function workItemLastDecision(item: WorkItem): string {
  const decision = item.activity?.filter((entry) => entry.kind === "change" || entry.kind === "created").map((entry) => entry.occurredAt).sort((a, b) => b.localeCompare(a))[0];
  return decision ? new Date(decision).toLocaleDateString("tr-TR") : "kayıt yok";
}

function activityMarkup(item: WorkItem): string {
  const activity = item.activity || [];
  return '<section class="detail-section work-activity"><div class="section-title-row"><h3>İş geçmişi <span class="count-chip">' + activity.length + '</span></h3><select id="activity-kind-filter" class="field-input activity-filter" aria-label="Geçmiş türüne göre filtrele"><option value="all">Tüm hareketler</option><option value="comment">İlerleme notları</option><option value="change">Alan değişiklikleri</option><option value="attachment">Dosya ekleri</option><option value="release">Release hareketleri</option></select></div>' + (activity.length ? '<ol class="activity-list">' + activity.map((entry, index) => '<li class="activity-entry activity-' + esc(entry.kind) + (index === 0 ? ' recent-activity' : '') + '"><span class="activity-marker">' + (entry.kind === "created" ? "＋" : entry.kind === "release" ? "◷" : entry.kind === "attachment" ? "▤" : "•") + '</span><div><p>' + esc(entry.message) + '</p>' + (entry.visibility ? '<span class="activity-visibility">' + (entry.visibility === "private" ? "Yalnızca PO" : "Takım notu") + '</span>' : '') + (entry.attachments?.length ? '<div class="activity-attachments">' + attachmentListMarkup(entry.attachments, "") + '</div>' : '') + '<small>' + esc(entry.actor) + ' · ' + esc(new Date(entry.occurredAt).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" })) + '</small></div></li>').join("") + '</ol>' : '<p class="activity-empty">Bu işte henüz bir değişiklik kaydedilmedi.</p>') + '</section>';
}

function dependencyMarkup(item: WorkItem): string {
  const dependencies = (item.dependsOnIds || []).map((id) => itemById(id)).filter((dependency): dependency is WorkItem => Boolean(dependency));
  const waiting = dependencies.filter((dependency) => dependency.status !== "Tamamlandı");
  const timelineItems = [...dependencies, item].sort((a, b) => (a.startDate || a.targetDate || "9999").localeCompare(b.startDate || b.targetDate || "9999"));
  const timeline = timelineItems.map((entry, index) => '<div class="dependency-timeline-row ' + (entry.id === item.id ? "current" : entry.status === "Tamamlandı" ? "resolved" : "waiting") + '"><span class="dependency-timeline-marker">' + (entry.status === "Tamamlandı" ? "✓" : String(index + 1)) + '</span><div><button type="button" data-open-item="' + esc(entry.id) + '"><strong>' + esc(entry.id) + '</strong> · ' + esc(entry.title) + '</button><small>' + esc(entry.startDate ? "Başlangıç " + entry.startDate : "Başlangıç tarihi yok") + ' → ' + esc(entry.targetDate ? "Hedef " + entry.targetDate : "Hedef tarihi yok") + '</small></div><span class="status-pill ' + statusClass(entry.status) + '"><i></i>' + esc(entry.status) + '</span></div>').join("");
  return '<section class="detail-section dependency-section"><div class="section-title-row"><h3>Bağımlılık zaman çizgisi <span class="count-chip">' + dependencies.length + '</span></h3><button class="text-button" data-action="edit-item" data-id="' + esc(item.id) + '">Düzenle</button></div>' + (waiting.length ? '<p class="dependency-warning">Bu iş ' + waiting.length + ' iş tamamlanana kadar bekliyor.</p>' : '') + (dependencies.length ? '<div class="dependency-timeline">' + timeline + '</div>' : '<p class="asset-muted">Bu iş başka bir backlog işini beklemiyor.</p>') + '</section>';
}

function acceptanceTemplateControls(textareaId: string, category: AcceptanceTemplate["category"]): string {
  const options = [...(state.acceptanceTemplates || [])].sort((left, right) => Number(right.category === category) - Number(left.category === category) || left.name.localeCompare(right.name, "tr-TR")).map((template) => '<option value="' + esc(template.id) + '">' + esc(template.category + " · " + template.name) + '</option>').join("");
  return '<div class="acceptance-template-tools"><select class="field-input" data-acceptance-template-target="' + esc(textareaId) + '" aria-label="Kabul kriteri şablonu"><option value="">Şablon seç</option>' + options + '</select><button type="button" class="button button-quiet button-small" data-action="apply-acceptance-template" data-target="' + esc(textareaId) + '">Uygula</button><button type="button" class="button button-quiet button-small" data-action="save-acceptance-template" data-target="' + esc(textareaId) + '">Şablon olarak kaydet</button></div>';
}

function renderOpenQuestions(): void {
  const navCount = document.getElementById("nav-question-count");
  if (navCount) navCount.textContent = String((state.openQuestions || []).filter((question) => question.status === "Açık").length);
  const questions = (state.openQuestions || []).filter((question) => questionFilter === "all" || question.status === (questionFilter === "open" ? "Açık" : "Yanıtlandı")).sort((a, b) => (a.status === "Açık" ? 0 : 1) - (b.status === "Açık" ? 0 : 1) || (a.expectedAt || "9999").localeCompare(b.expectedAt || "9999"));
  root.innerHTML = '<div class="page-content questions-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN KARARLARI</div><h1>Açık sorular</h1><p>Yanıt bekleyen konuları sahibi, hedef tarihi ve ilişkili işle birlikte takip et.</p></div><button class="button button-primary" data-action="new-open-question">＋ Soru ekle</button></section><div class="questions-toolbar"><span>' + (state.openQuestions || []).filter((question) => question.status === "Açık").length + ' açık soru</span><select id="question-filter" class="field-input" aria-label="Soruları filtrele"><option value="open" ' + (questionFilter === "open" ? "selected" : "") + '>Açık</option><option value="all" ' + (questionFilter === "all" ? "selected" : "") + '>Tümü</option><option value="answered" ' + (questionFilter === "answered" ? "selected" : "") + '>Yanıtlandı</option></select></div><div class="question-list">' + (questions.length ? questions.map((question) => { const overdue = question.status === "Açık" && question.expectedAt && question.expectedAt < new Date().toISOString().slice(0, 10); const linked = question.linkedItemId ? itemById(question.linkedItemId) : undefined; return '<article class="question-card ' + (overdue ? "overdue" : "") + '"><div class="question-card-main"><span class="question-status ' + (question.status === "Açık" ? "open" : "answered") + '">' + esc(question.status) + (overdue ? ' · Gecikti' : '') + '</span><h2>' + esc(question.text) + '</h2>' + (question.answer ? '<p class="question-answer">' + esc(question.answer) + '</p>' : '') + '<div class="question-meta"><span>Yanıt sahibi <strong>' + esc(question.owner) + '</strong></span><span>Beklenen yanıt <strong>' + esc(question.expectedAt || "Tarih yok") + '</strong></span>' + (linked ? '<button type="button" class="linked-badge" data-open-item="' + esc(linked.id) + '">' + esc(linked.id + " · " + linked.title) + '</button>' : '') + '</div></div><div class="question-actions"><button class="button button-quiet button-small" data-action="edit-open-question" data-id="' + esc(question.id) + '">Düzenle</button>' + (question.status === "Açık" ? '<button class="button button-secondary button-small" data-action="answer-open-question" data-id="' + esc(question.id) + '">Yanıtla</button>' : '<button class="button button-quiet button-small" data-action="reopen-question" data-id="' + esc(question.id) + '">Yeniden aç</button>') + '<button class="button button-quiet button-small" data-action="delete-open-question" data-id="' + esc(question.id) + '" aria-label="Soruyu sil">Sil</button></div></article>'; }).join("") : '<div class="empty-state">Bu filtrede soru yok. Bekleyen kararları sahibi ve tarihiyle ekleyebilirsin.</div>') + '</div></div>';
}

function getDailyPlan(date = selectedDailyDate): DailyPlan {
  state.dailyPlans ||= [];
  let plan = state.dailyPlans.find((entry) => entry.date === date);
  if (!plan) { plan = { date, entries: [], note: "" }; state.dailyPlans.push(plan); }
  return plan;
}

function checkFollowUpReminders(): void {
  const now = Date.now();
  const dueTasks = state.tasks.filter((task) => !task.done && task.remindAt && !task.remindedAt && new Date(task.remindAt).getTime() <= now);
  const dueBlockers = state.items.filter((item) => item.status === "Bloke" && item.blocker?.followUpAt && !item.blocker.remindedAt && new Date(item.blocker.followUpAt).getTime() <= now);
  if (!dueTasks.length && !dueBlockers.length) return;
  dueTasks.forEach((task) => { task.remindedAt = new Date().toISOString(); });
  dueBlockers.forEach((item) => { if (item.blocker) item.blocker.remindedAt = new Date().toISOString(); });
  save();
  toast("Takip zamanı geldi: " + [...dueTasks.map((task) => task.title), ...dueBlockers.map((item) => item.id + " · " + item.title)].slice(0, 3).join("; ") + (dueTasks.length + dueBlockers.length > 3 ? " ve " + (dueTasks.length + dueBlockers.length - 3) + " kayıt daha" : ""));
}

function renderDailyPlan(): void {
  const plan = getDailyPlan();
  const entries = plan.entries.map((entry) => ({ entry, item: entry.type === "item" ? itemById(entry.id) : undefined, task: entry.type === "task" ? state.tasks.find((task) => task.id === entry.id) : undefined })).filter((row) => row.item || row.task);
  const completedCount = entries.filter(({ item, task }) => task?.done || item?.status === "Tamamlandı").length;
  const dateLabel = new Date(plan.date + "T00:00:00").toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const shortDateLabel = new Date(plan.date + "T00:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
  const backlogOptions = state.items.filter((item) => !item.archived && item.status !== "Tamamlandı" && !plan.entries.some((entry) => entry.type === "item" && entry.id === item.id)).map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("");
  const taskOptions = state.tasks.filter((task) => !task.done && !plan.entries.some((entry) => entry.type === "task" && entry.id === task.id)).map((task) => '<option value="' + esc(task.id) + '">' + esc(task.title) + '</option>').join("");
  root.innerHTML = '<div class="page-content planning-page daily-planning-page"><section class="page-title-row daily-plan-heading"><div><div class="eyebrow"><span class="eyebrow-dot"></span>GÜNLÜK ODAK</div><h1>Günlük plan</h1><p>Bugün ilerletmen gereken işleri ve kişisel takiplerini sırala.</p></div><div class="daily-date-controls"><button type="button" class="button button-quiet button-small" data-action="daily-plan-today">Bugün</button><label class="field-label daily-date-picker">Plan tarihi<input id="daily-plan-date" class="field-input" type="date" value="' + esc(plan.date) + '"></label></div></section>' +
    '<section class="daily-plan-summary"><div class="daily-date-label"><span class="daily-calendar-icon">▦</span><div><strong>' + esc(dateLabel) + '</strong><small>Günlük odak listesi</small></div></div><div class="daily-plan-stats"><span><strong>' + entries.length + '</strong> planlanan</span><i></i><span><strong>' + completedCount + '</strong> tamamlanan</span><i></i><span><strong>' + (entries.length - completedCount) + '</strong> açık</span></div></section>' +
    '<div class="daily-plan-layout"><section class="daily-plan-main panel"><header class="daily-section-heading"><div><span class="panel-kicker">SIRADAKİ İŞLER</span><h2>Odak listesi</h2></div><span class="count-chip">' + entries.length + '</span></header>' +
    '<div class="daily-plan-add"><label class="daily-add-control"><span>Backlog işi</span><select class="field-input" id="daily-add-item"><option value="">Bir iş seç…</option>' + backlogOptions + '</select></label><button type="button" class="daily-add-button" data-action="add-daily-entry" data-type="item" aria-label="Backlog işini plana ekle" title="Backlog işini ekle">＋</button><label class="daily-add-control"><span>Kişisel görev</span><select class="field-input" id="daily-add-task"><option value="">Bir görev seç…</option>' + taskOptions + '</select></label><button type="button" class="daily-add-button" data-action="add-daily-entry" data-type="task" aria-label="Kişisel görevi plana ekle" title="Kişisel görevi ekle">＋</button></div>' +
    '<div class="daily-plan-list">' + (entries.length ? entries.map((row, index) => dailyPlanEntryMarkup(row, index, entries.length)).join("") : '<div class="daily-plan-empty"><span>✳</span><strong>Planın henüz boş</strong><p>Backlog işlerini ve kişisel görevlerini ekleyerek günün sırasını oluştur.</p></div>') + '</div></section>' +
    '<aside class="daily-plan-notes panel"><header class="daily-section-heading"><div><span class="panel-kicker">GÜNÜN BAĞLAMI</span><h2>Notlar</h2></div><span class="daily-note-icon">✎</span></header><p>Kararları, beklenen yanıtları veya gün içinde hatırlaman gerekenleri burada tut.</p><textarea id="daily-plan-note" class="field-input field-textarea" rows="10" maxlength="3000" placeholder="Örn. Limit kararı için risk ekibinden yanıt bekleniyor…">' + esc(plan.note) + '</textarea><footer><span>Bu not yalnızca ' + esc(shortDateLabel) + ' planına kaydedilir.</span><button type="button" class="daily-note-save" data-action="save-daily-plan" aria-label="Günlük notu kaydet" title="Notu kaydet">✓</button></footer></aside></div></div>';
}

function dailyPlanEntryMarkup(row: { entry: DailyPlan["entries"][number]; item?: WorkItem; task?: PersonalTask }, index: number, total: number): string {
  const { entry, item, task } = row;
  const done = Boolean(task?.done || item?.status === "Tamamlandı");
  const title = item ? item.title : task!.title;
  const metadata = item ? [item.id, item.project, item.status, item.targetDate ? "Hedef " + item.targetDate : ""].filter(Boolean).join(" · ") : "Kişisel görev · " + task!.due;
  const marker = task ? '<button type="button" class="daily-task-check ' + (task.done ? "checked" : "") + '" data-toggle-task="' + esc(task.id) + '" aria-label="' + esc(task.done ? "Görevi tamamlanmadı olarak işaretle" : "Görevi tamamlandı olarak işaretle") + '" title="' + (task.done ? "Tamamlandı" : "Tamamlandı olarak işaretle") + '">' + (task.done ? "✓" : "") + '</button>' : '<span class="daily-item-marker ' + (done ? "checked" : "") + '" title="' + esc(item!.status) + '">' + (done ? "✓" : "") + '</span>';
  const moveAttributes = 'data-id="' + esc(entry.id) + '" data-type="' + entry.type + '"';
  return '<article class="daily-plan-entry ' + (done ? "complete" : "") + '"><span class="daily-plan-index">' + String(index + 1).padStart(2, "0") + '</span>' + marker + '<button type="button" class="daily-entry-copy" ' + (item ? 'data-open-item="' + esc(item.id) + '"' : 'data-open-task="' + esc(task!.id) + '"') + '><strong>' + esc(title) + '</strong><small>' + esc(metadata) + '</small></button><div class="daily-entry-actions"><button type="button" class="daily-icon-action daily-move-up" data-action="move-daily-entry" ' + moveAttributes + ' data-direction="up" aria-label="Yukarı taşı" title="Yukarı taşı" ' + (index === 0 ? "disabled" : "") + '><span aria-hidden="true">⌃</span></button><button type="button" class="daily-icon-action daily-move-down" data-action="move-daily-entry" ' + moveAttributes + ' data-direction="down" aria-label="Aşağı taşı" title="Aşağı taşı" ' + (index === total - 1 ? "disabled" : "") + '><span aria-hidden="true">⌄</span></button><button type="button" class="daily-icon-action daily-remove-entry" data-action="remove-daily-entry" data-type="' + entry.type + '" data-id="' + esc(entry.id) + '" aria-label="Plan listesinden çıkar" title="Plan listesinden çıkar">×</button></div></article>';
}

function weekStartDate(value = new Date()): string {
  const date = new Date(value); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); return date.toISOString().slice(0, 10);
}

function weeklySummaryText(): string {
  const start = selectedWeeklyStart || weekStartDate();
  const endDate = new Date(start + "T00:00:00"); endDate.setDate(endDate.getDate() + 7);
  const end = endDate.toISOString().slice(0, 10);
  const portfolio = state.items.filter((item) => !item.archived && isItemInActiveProject(item));
  const completed = portfolio.filter((item) => item.completedAt && item.completedAt.slice(0, 10) >= start && item.completedAt.slice(0, 10) < end);
  const blockers = portfolio.filter((item) => item.blocker?.openedAt && item.blocker.openedAt.slice(0, 10) >= start && item.blocker.openedAt.slice(0, 10) < end);
  const due = portfolio.filter((item) => item.status !== "Tamamlandı" && item.targetDate && item.targetDate >= start && item.targetDate < end);
  const releases = state.releases.filter((release) => !release.archived && release.plannedDate && release.plannedDate >= start && release.plannedDate < end);
  const note = state.weeklySummaryNotes?.[start] || "";
  return ["HAFTALIK ÜRÜN ÖZETİ · " + start + " – " + endDate.toISOString().slice(0, 10), "", "TAMAMLANANLAR", ...(completed.length ? completed.map((item) => "• " + item.id + " · " + item.title) : ["• Bu hafta tamamlanma kaydı yok."]), "", "YENİ BLOKAJLAR", ...(blockers.length ? blockers.map((item) => "• " + item.id + " · " + item.title + " — " + (item.blocker?.reason || "Neden girilmedi")) : ["• Yeni blokaj kaydı yok."]), "", "HEDEF TARİHİ BU HAFTA OLAN İŞLER", ...(due.length ? due.map((item) => "• " + item.id + " · " + item.title + " — " + item.targetDate) : ["• İş yok."]), "", "YAKLAŞAN RELEASE'LER", ...(releases.length ? releases.map((release) => "• " + release.name + " — " + release.plannedDate + " · " + release.status) : ["• Release yok."]), "", "PO NOTLARI", note || "(Not eklenmedi)"].join("\n");
}

function renderWeeklySummary(): void {
  selectedWeeklyStart ||= weekStartDate();
  state.weeklySummaryNotes ||= {};
  const generated = weeklySummaryText();
  const blocks = generated.split("\n\n").slice(1, -1).map((section) => { const [heading, ...lines] = section.split("\n"); return '<section class="weekly-summary-section"><h3>' + esc(heading) + '</h3>' + lines.map((line) => '<p>' + esc(line) + '</p>').join("") + '</section>'; }).join("");
  root.innerHTML = '<div class="page-content planning-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN PORTFÖYÜ</div><h1>Haftalık ürün özeti</h1><p>Tamamlanan işler, yeni blokajlar ve yaklaşan tarihlerden düzenlenebilir özet.</p></div><label class="field-label">Hafta başlangıcı<input id="weekly-summary-start" class="field-input" type="date" value="' + esc(selectedWeeklyStart) + '"></label></section><section class="weekly-summary-card"><div class="weekly-summary-grid">' + blocks + '</div><label class="field-label">PO değerlendirmesi<textarea id="weekly-summary-note" class="field-input field-textarea" rows="5" maxlength="5000" placeholder="Ürün etkisi, karar ihtiyacı veya sonraki haftaya taşınan konu…">' + esc(state.weeklySummaryNotes[selectedWeeklyStart] || "") + '</textarea></label><footer><span>Özet, çalışma alanındaki tarih ve aktivite kayıtlarından üretilir.</span><div><button class="button button-secondary" data-action="copy-weekly-summary">Özeti kopyala</button><button class="button button-primary" data-action="save-weekly-summary">Notu kaydet</button></div></footer></section></div>';
}

function archiveMatches(value: string): boolean { const terms = archiveQuery.trim().toLocaleLowerCase("tr-TR").split(/\s+/).filter(Boolean); const normalized = value.toLocaleLowerCase("tr-TR"); return !terms.length || terms.every((term) => normalized.includes(term)); }

function renderArchiveSearch(): void {
  const items = state.items.filter((item) => item.archived && archiveMatches([item.id, item.title, item.description, item.project, item.area, (item.labels || []).join(" ")].join(" ")));
  const projects = state.projects.filter((project) => project.archived && archiveMatches(project.name));
  const releases = state.releases.filter((release) => release.archived && archiveMatches([release.id, release.name, release.project, release.description, release.releaseNotes].join(" ")));
  root.innerHTML = '<div class="page-content archive-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>GEÇMİŞ KAYITLAR</div><h1>Arşivde ara</h1><p>Arşivlenmiş işleri, projeleri ve release’leri tek aramada bul; gerektiğinde geri al.</p></div></section><label class="filter-search archive-search"><span>⌕</span><input id="archive-search" type="search" placeholder="Başlık, ID, proje veya açıklamada ara…" value="' + esc(archiveQuery) + '"></label><div class="archive-result-count">' + (items.length + projects.length + releases.length) + ' sonuç</div><div class="archive-results">' + (items.length ? '<section><h2>Backlog işleri</h2>' + items.map((item) => '<article><button type="button" data-open-item="' + esc(item.id) + '"><strong>' + esc(item.id + " · " + item.title) + '</strong><small>' + esc(item.project + " · " + item.status) + '</small></button><button type="button" class="button button-secondary button-small" data-action="restore-item" data-id="' + esc(item.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (projects.length ? '<section><h2>Projeler</h2>' + projects.map((project) => '<article><div><strong>' + esc(project.name) + '</strong><small>Arşivlenmiş proje · ' + state.items.filter((item) => item.project === project.name).length + ' iş</small></div><button type="button" class="button button-secondary button-small" data-action="restore-project" data-id="' + esc(project.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (releases.length ? '<section><h2>Release’ler</h2>' + releases.map((release) => '<article><button type="button" data-action="edit-release" data-id="' + esc(release.id) + '"><strong>' + esc(release.name) + '</strong><small>' + esc(release.project + " · " + release.status) + '</small></button><button type="button" class="button button-secondary button-small" data-action="restore-release" data-id="' + esc(release.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (items.length + projects.length + releases.length ? '' : '<div class="empty-state">' + (archiveQuery ? "Arşivde eşleşen kayıt bulunamadı." : "Henüz arşivlenmiş iş, proje veya release yok.") + '</div>') + '</div></div>';
}

function openQuestionForm(questionId?: string): void {
  const question = state.openQuestions?.find((entry) => entry.id === questionId);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">ÜRÜN KARARI</div><h2>' + (question ? "Açık soruyu düzenle" : "Açık soru ekle") + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="open-question-form" class="settings-form"><label class="field-label">Soru / karar konusu<textarea class="field-input field-textarea" name="text" rows="3" maxlength="1500" required placeholder="Örn. FAST ticari müşteri günlük limiti hangi tutar olacak?">' + esc(question?.text || "") + '</textarea></label><div class="form-two-col"><label class="field-label">Yanıt sahibi<input class="field-input" name="owner" maxlength="100" required placeholder="Kişi veya ekip" value="' + esc(question?.owner || "") + '"></label><label class="field-label">Beklenen yanıt tarihi<input class="field-input" name="expectedAt" type="date" value="' + esc(question?.expectedAt || "") + '"></label></div><label class="field-label">İlişkili backlog işi<select class="field-input" name="linkedItemId"><option value="">Bağımsız soru</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === question?.linkedItemId ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label><input type="hidden" name="id" value="' + esc(question?.id || "") + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">' + (question ? "Değişiklikleri kaydet" : "Soruyu kaydet") + '</button></footer></form></section></div>';
}

function openQuestionAnswerForm(questionId: string): void {
  const question = state.openQuestions?.find((entry) => entry.id === questionId);
  if (!question) return;
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal question-answer-modal" role="dialog" aria-modal="true" aria-labelledby="question-answer-title"><header class="modal-header"><div><div class="panel-kicker">YANIT BEKLEYEN KONU</div><h2 id="question-answer-title">Yanıtı kaydet</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><div class="question-answer-context"><span class="question-status open">' + esc(question.owner) + ' · ' + esc(question.expectedAt || "Tarih belirlenmedi") + '</span><p>' + esc(question.text) + '</p></div><form id="open-question-answer-form" class="settings-form"><label class="field-label">Yanıt / alınan karar<textarea class="field-input field-textarea" name="answer" rows="5" maxlength="3000" required autofocus placeholder="Kararı, yanıtı ve varsa önemli koşulları yaz…">' + esc(question.answer || "") + '</textarea><small>Kaydedince bu kayıt Yanıtlandı durumuna geçer.</small></label><input type="hidden" name="id" value="' + esc(question.id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Yanıtı kaydet</button></footer></form></section></div>';
}

function itemRelationshipsMarkup(item: WorkItem): string {
  const chips: string[] = [];
  (item.assetIds || []).forEach((id) => { const asset = state.assets.find((entry) => entry.id === id); if (asset) chips.push('<button class="linked-badge" data-open-asset="' + esc(id) + '">Bileşen · ' + esc(asset.code + " " + asset.name) + '</button>'); });
  (item.dependsOnIds || []).forEach((id) => { const dependency = itemById(id); if (dependency) chips.push('<button class="linked-badge" data-open-item="' + esc(id) + '">Bağımlılık · ' + esc(id + " " + dependency.title) + '</button>'); });
  const roadmap = state.roadmap.find((entry) => entry.id === item.roadmapNodeId);
  const release = state.releases.find((entry) => entry.id === item.releaseId);
  const sprint = state.sprints.find((entry) => entry.id === item.sprintId);
  if (roadmap) chips.push('<span class="linked-badge">Ürün hedefi · ' + esc(roadmap.title) + '</span>');
  if (release) chips.push('<span class="linked-badge">Release · ' + esc(release.name) + '</span>');
  if (sprint) chips.push('<span class="linked-badge">Sprint · ' + esc(sprint.name) + '</span>');
  state.tasks.filter((entry) => entry.linked === item.id).forEach((task) => chips.push('<button class="linked-badge" data-open-task="' + esc(task.id) + '">Kişisel görev · ' + esc(task.title) + '</button>'));
  (item.relatedRecords || []).forEach((link) => {
    const label = link.label || relatedRecordLabel(link.type, link.targetId);
    chips.push('<button class="linked-badge" data-action="open-related-record" data-type="' + esc(link.type) + '" data-target-id="' + esc(link.targetId) + '">' + esc(label) + '</button><button class="relationship-remove" data-action="remove-related-record" data-id="' + esc(item.id) + '" data-link-id="' + esc(link.id) + '" aria-label="İlişkiyi kaldır">×</button>');
  });
  return '<section class="detail-section item-relationships"><div class="section-title-row"><h3>İlişkili kayıtlar <span class="count-chip">' + chips.length + '</span></h3><button class="text-button" data-action="add-related-record" data-id="' + esc(item.id) + '">+ İlişki ekle</button></div><div class="relationship-chip-list">' + (chips.join("") || '<p class="asset-muted">Bu işle ilişkili kayıt bulunmuyor.</p>') + '</div></section>';
}

function relatedRecordLabel(type: WorkRecordLink["type"], id: string): string {
  if (type === "item") { const value = itemById(id); return "İş · " + (value ? value.id + " " + value.title : id); }
  if (type === "asset") { const value = state.assets.find((entry) => entry.id === id); return "Bileşen · " + (value ? value.code + " " + value.name : id); }
  if (type === "release") { const value = state.releases.find((entry) => entry.id === id); return "Release · " + (value ? value.name : id); }
  if (type === "note") { const value = state.notes.find((entry) => entry.id === id); return "Not · " + (value ? value.title : id); }
  if (type === "question") { const value = state.openQuestions?.find((entry) => entry.id === id); return "Karar · " + (value ? value.text : id); }
  const value = state.risks?.find((entry) => entry.id === id); return "Risk · " + (value ? value.title : id);
}

function openRelatedRecordPicker(itemId: string): void {
  const item = itemById(itemId); if (!item) return;
  const options = [
    ...state.items.filter((entry) => entry.id !== itemId && !entry.archived).map((entry) => ({ type: "item", id: entry.id, label: relatedRecordLabel("item", entry.id) })),
    ...state.assets.filter((entry) => entry.active).map((entry) => ({ type: "asset", id: entry.id, label: relatedRecordLabel("asset", entry.id) })),
    ...state.releases.filter((entry) => !entry.archived).map((entry) => ({ type: "release", id: entry.id, label: relatedRecordLabel("release", entry.id) })),
    ...state.notes.map((entry) => ({ type: "note", id: entry.id, label: relatedRecordLabel("note", entry.id) })),
    ...(state.openQuestions || []).map((entry) => ({ type: "question", id: entry.id, label: relatedRecordLabel("question", entry.id) })),
    ...(state.risks || []).filter((entry) => entry.status !== "Kapandı").map((entry) => ({ type: "risk", id: entry.id, label: relatedRecordLabel("risk", entry.id) }))
  ].filter((entry) => !(item.relatedRecords || []).some((link) => link.type === entry.type && link.targetId === entry.id));
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">İŞ BAĞLANTILARI</div><h2>Kayıt ilişkisi ekle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="record-link-form" class="settings-form"><label class="field-label">İlişkili kayıt<select class="field-input" name="target" required><option value="">Kayıt seç…</option>' + options.map((entry) => '<option value="' + esc(entry.type + "::" + entry.id) + '">' + esc(entry.label) + '</option>').join("") + '</select></label><input type="hidden" name="itemId" value="' + esc(itemId) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-secondary" data-action="create-risk-for-item" data-id="' + esc(itemId) + '">+ Risk oluştur</button><button type="submit" class="button button-primary">İlişki ekle</button></footer></form></section></div>';
}

function progressComposerMarkup(): string {
  return '<section class="detail-section activity-note-composer"><h3>İlerleme notu ekle</h3><textarea id="progress-note-text" class="field-input field-textarea" rows="3" maxlength="3000" placeholder="İlerleme, karar veya beklenen sonraki adımı yaz…"></textarea><div class="progress-note-actions"><select id="progress-note-visibility" class="field-input" aria-label="Not görünürlüğü"><option value="team">Takımla paylaş</option><option value="private">Yalnızca PO</option></select><button type="button" class="button button-secondary button-small" data-add-progress-attachment>＋ Dosya ekle</button><button type="button" class="button button-primary button-small" data-save-progress-note>Notu ekle</button><input id="progress-note-file-fallback" type="file" multiple hidden></div><div id="progress-note-files" class="progress-note-files">' + (progressAttachments.length ? progressAttachments.map((file, index) => '<span class="progress-note-file">' + esc(file.name) + '<button type="button" data-remove-progress-file="' + index + '" aria-label="Eki kaldır">×</button></span>').join("") : '') + '</div></section>';
}

function logWorkChange(item: WorkItem, label: string, before: unknown, after: unknown): void {
  if (JSON.stringify(before) === JSON.stringify(after)) return;
  if ((typeof before === "object" && before !== null) || (typeof after === "object" && after !== null)) { addWorkActivity(item, "change", label + " güncellendi"); return; }
  const from = String(before ?? "").trim() || "boş";
  const to = String(after ?? "").trim() || "boş";
  addWorkActivity(item, "change", label === "Açıklama" || label === "Kabul kriterleri" ? label + " güncellendi" : label + ': "' + from + '" → "' + to + '"');
}

function blockerOwnerOptions(selected = ""): string {
  const owners = [state.profile.userName ? state.profile.userName + " (PO)" : "PO", ...state.teams.flatMap((team) => team.members.map((member) => member + " · " + team.name))];
  const uniqueOwners = [...new Set(owners)];
  return '<option value="">Takip sahibi seç</option>' + uniqueOwners.map((owner) => '<option value="' + esc(owner) + '" ' + (owner === selected ? "selected" : "") + '>' + esc(owner) + '</option>').join("");
}

function applyWorkStatus(item: WorkItem, status: WorkItem["status"], blocker?: Pick<WorkBlocker, "reason" | "nextStep" | "expectedAction" | "owner" | "followUpAt">, updateNote = ""): void {
  const previous = item.status;
  if (previous === status) {
    if (status === "Bloke" && blocker && (item.blocker?.reason !== blocker.reason || item.blocker?.nextStep !== blocker.nextStep || item.blocker?.expectedAction !== blocker.expectedAction || item.blocker?.owner !== blocker.owner || item.blocker?.followUpAt !== blocker.followUpAt)) {
      item.blocker = { ...blocker, openedAt: item.blocker?.openedAt || new Date().toISOString() };
      addWorkActivity(item, "change", "Blokaj bilgisi güncellendi: " + blocker.reason + " · Beklenen: " + (blocker.expectedAction || "belirtilmedi") + " · Sonraki adım: " + blocker.nextStep + " · Takip sahibi: " + blocker.owner);
    }
    return;
  }
  item.status = status;
  logWorkChange(item, "Durum", previous, status);
  const now = new Date().toISOString();
  if (status === "Devam ediyor" && !item.actualStartDate) { item.actualStartDate = now; addWorkActivity(item, "change", "Gerçek başlangıç zamanı kaydedildi."); }
  if (status === "Tamamlandı") { item.completedAt = now; addWorkActivity(item, "change", "Geliştirme tamamlandı. Release/yayın durumu ayrıca takip edilir."); }
  if (status === "Bloke" && blocker) {
    const opening = previous !== "Bloke";
    item.blocker = { ...blocker, openedAt: opening || !item.blocker ? new Date().toISOString() : item.blocker.openedAt };
    addWorkActivity(item, "change", "Blokaj nedeni: " + blocker.reason + " · Beklenen: " + (blocker.expectedAction || "belirtilmedi") + " · Sonraki adım: " + blocker.nextStep + " · Takip sahibi: " + blocker.owner);
  } else if (previous === "Bloke" && item.blocker) {
    item.blocker.resolvedAt = new Date().toISOString();
    addWorkActivity(item, "change", "Blokaj çözüldü.");
  }
  if (updateNote) item.activity?.unshift({ id: nextId("ACT"), kind: "comment", message: updateNote, actor: state.profile.userName || "PO", occurredAt: new Date().toISOString(), visibility: "team" });
}

function openStatusUpdateModal(itemId: string, nextStatus: WorkItem["status"], returnToBoard = false): void {
  const item = itemById(itemId);
  if (!item) return;
  statusUpdateReturnToBoard = returnToBoard;
  const blocker = item.blocker;
  const blocked = nextStatus === "Bloke";
  modalRoot.innerHTML = '<div class="modal-backdrop"><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="status-update-title"><header class="modal-header"><div><div class="panel-kicker">DURUM GÜNCELLEMESİ · ' + esc(item.id) + '</div><h2 id="status-update-title">' + (blocked ? "İş neden bloke?" : esc(nextStatus) + " durumuna geçir") + '</h2></div><button class="modal-close" data-cancel-status-update>×</button></header><div class="settings-form"><p class="settings-intro">' + (blocked ? "Blokajı takip edebilmek için nedenini ve sıradaki adımı kaydet." : "İstersen bu durum değişikliği için kısa bir güncelleme notu ekle.") + '</p>' + (blocked ? '<label class="field-label">Blokaj nedeni<textarea id="blocker-reason" class="field-input field-textarea" rows="3" maxlength="1000" required>' + esc(blocker?.reason || "") + '</textarea></label><label class="field-label">Sonraki adım<textarea id="blocker-next-step" class="field-input field-textarea" rows="2" maxlength="1000" required>' + esc(blocker?.nextStep || "") + '</textarea></label>' : '') + '<label class="field-label">Güncelleme notu <small>(isteğe bağlı)</small><textarea id="status-update-note" class="field-input field-textarea" rows="2" maxlength="2000" placeholder="İlerleme, karar veya sonraki adım…"></textarea></label><footer class="modal-footer"><button type="button" class="button button-quiet" data-cancel-status-update>Vazgeç</button><button type="button" class="button button-primary" data-save-item-status="' + esc(itemId) + '" data-next-status="' + esc(nextStatus) + '">Kaydet</button></footer></div></section></div>';
  if (blocked) modalRoot.querySelector("#blocker-next-step")?.parentElement?.insertAdjacentHTML("afterend", '<label class="field-label">Beklenen karar veya iş<textarea id="blocker-expected" class="field-input field-textarea" rows="2" maxlength="1000" required>' + esc(blocker?.expectedAction || "") + '</textarea></label><label class="field-label">Takip sahibi<select id="blocker-owner" class="field-input" required>' + blockerOwnerOptions(blocker?.owner || (state.profile.userName ? state.profile.userName + " (PO)" : "PO")) + '</select></label><label class="field-label">Takip hatırlatması<input id="blocker-follow-up" type="datetime-local" class="field-input" value="' + esc(blocker?.followUpAt || "") + '"></label>');
}

const icon = (name: string): string => {
  const paths: Record<string, string> = {
    story: '<path d="M5 3.5h9l5 5v12H5z"/><path d="M14 3.5v5h5M8 13h8M8 16.5h6"/>',
    bug: '<path d="M8 8h8a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6a2 2 0 0 1 2-2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M4 12h4m8 0h4M4 17h4m8 0h4M8 3 6.5 1.5M16 3l1.5-1.5"/>',
    task: '<path d="m5 12 4 4L19 6"/><path d="M4 4h4M4 20h4"/>',
    note: '<path d="M5 3.5h14v17H5z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/>',
    edit: '<path d="m14 5 5 5M4 20l4.3-.9L19 8.4 15.6 5 4.9 15.7 4 20Z"/>',
    duplicate: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    delete: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'
  };
  return '<svg viewBox="0 0 24 24" aria-hidden="true" class="svg-icon">' + (paths[name] || paths.story) + "</svg>";
};
function backlogActionColumns(itemId?: string): string {
  const actions = [
    { action: "edit-item", label: "Düzenle", description: "Başlık, durum, atama ve iş ayrıntılarını düzenle.", icon: "edit" },
    { action: "duplicate-item", label: "Çoğalt", description: "Bu işi yeni bir taslak olarak çoğalt.", icon: "duplicate" },
    { action: "delete-item", label: "Sil", description: "Bu işi sil. Silme işlemini 6 saniye içinde geri alabilirsin.", icon: "delete" }
  ] as const;
  return actions.map(({ action, label, description, icon: iconName }) => itemId
    ? '<td class="backlog-action-cell backlog-action-cell-' + action.replace("-item", "") + '"><button type="button" class="backlog-action-button backlog-action-' + action.replace("-item", "") + '" data-action="' + action + '" data-id="' + esc(itemId) + '" aria-label="' + esc(itemId + " işini " + label.toLocaleLowerCase("tr-TR")) + '" data-tooltip="' + esc(description) + '">' + icon(iconName) + '</button></td>'
    : '<th class="backlog-action-heading" aria-label="' + esc(label) + '"><span class="backlog-action-heading-icon" aria-label="' + esc(label) + '" data-tooltip="' + esc(label) + '">' + icon(iconName) + '</span></th>'
  ).join("");
}
const statusClass = (status: string): string => ({ "Yeni": "status-new", "Analiz ediliyor": "status-analysis", "Hazır": "status-ready", "Devam ediyor": "status-progress", "Bloke": "status-blocked", "Tamamlandı": "status-done" }[status] || "status-new");
const priorityClass = (priority: string): string => ({ "Kritik": "priority-critical", "Yüksek": "priority-high", "Orta": "priority-medium", "Düşük": "priority-low" }[priority] || "priority-medium");
const priorityMark = (priority: string): string => priority === "Kritik" ? "•••" : priority === "Yüksek" ? "••" : priority === "Orta" ? "•" : "◦";
const field = (id: string): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement => document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function toast(message: string): void {
  toastRoot.textContent = message;
  toastRoot.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastRoot.classList.remove("show"), 2500);
}

function toastUndo(message: string, before: WorkItem[]): void {
  lastUndoWorkItems = structuredClone(before);
  toastRoot.replaceChildren(document.createTextNode(message + " "));
  const undo = document.createElement("button");
  undo.type = "button"; undo.className = "toast-undo-button"; undo.dataset.action = "undo-backlog-change"; undo.textContent = "Geri al";
  toastRoot.append(undo); toastRoot.classList.add("show");
  window.clearTimeout(toastTimer); window.clearTimeout(lastUndoTimer);
  toastTimer = window.setTimeout(() => toastRoot.classList.remove("show"), 6000);
  lastUndoTimer = window.setTimeout(() => { lastUndoWorkItems = null; }, 6000);
}

function toastUndoDeletion(message: string, snapshot: WorkspaceState, attachments: AttachmentInfo[] = []): void {
  if (pendingDeletionUndo) void Promise.all(pendingDeletionUndo.attachments.flatMap((file) => file.storedName && desktop ? [desktop.removeAttachment(file.storedName).catch(() => false)] : []));
  window.clearTimeout(pendingDeletionTimer);
  pendingDeletionUndo = { snapshot, attachments };
  toastRoot.replaceChildren(document.createTextNode(message + " "));
  const undo = document.createElement("button"); undo.type = "button"; undo.className = "toast-undo-button"; undo.dataset.action = "undo-deletion"; undo.textContent = "Geri al";
  toastRoot.append(undo); toastRoot.classList.add("show"); window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastRoot.classList.remove("show"), 6000);
  pendingDeletionTimer = window.setTimeout(() => {
    const attachmentsToRemove = pendingDeletionUndo?.attachments || [];
    void Promise.all(attachmentsToRemove.flatMap((file) => file.storedName && desktop ? [desktop.removeAttachment(file.storedName).catch(() => false)] : []));
    pendingDeletionUndo = null;
  }, 6000);
}

function undoLastDeletion(): void {
  if (!pendingDeletionUndo) return;
  window.clearTimeout(pendingDeletionTimer);
  state = structuredClone(pendingDeletionUndo.snapshot);
  pendingDeletionUndo = null;
  save(); closeModal(); render(); toast("Silme veya arşivleme geri alındı.");
}

function setView(view: string): void {
  if (view === "jira" && !state.profile.jiraBaseUrl?.trim()) { toast("Jira devre dışı. Kurulum veya çalışma alanı ayarlarına Base URL ekle."); return; }
  if (activeView === "assets" && view !== "assets") disposeAssetDiagram();
  activeView = view;
  const navItem = document.querySelector<HTMLElement>('.nav-item[data-view="' + view + '"]');
  const navGroup = navItem?.closest<HTMLDetailsElement>(".nav-group");
  if (navGroup && !navGroup.open) { navGroup.open = true; saveSidebarNavGroupPreferences(); }
  activeProjectId = null;
  activeBacklogViewId = "";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
  document.querySelector<HTMLElement>(".workspace-switcher")?.classList.toggle("active", view === "overview");
  const names: Record<string, string> = { overview: "Genel bakış", backlog: "Backlog", jira: "Jira", assets: "Ürün envanteri", roadmap: "Yol haritası", decisions: "Ürün kararları", releases: "Release planı", focus: "Kişisel alan", questions: "Açık sorular", "daily-plan": "Günlük plan", "weekly-summary": "Haftalık özet", "archive-search": "Arşivde ara" };
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = names[view] ?? "Genel bakış";
  render();
}

function validJiraBaseUrl(value: string): boolean {
  if (!value.trim()) return true;
  try {
    const url = new URL(value.trim());
    return (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))) && !url.username && !url.password && !url.search && !url.hash;
  } catch { return false; }
}

function setProject(id: string): void {
  const project = state.projects.find((entry) => entry.id === id);
  if (!project || project.archived) return;
  const keepQuery = Boolean(query) && window.confirm("Proje değiştirirken mevcut arama metnini koruyayım mı?");
  activeProjectId = id;
  activeBacklogViewId = "";
  activeView = "backlog";
  if (!keepQuery) query = "";
  const globalSearch = document.getElementById("global-search") as HTMLInputElement | null;
  if (globalSearch) globalSearch.value = keepQuery ? query : "";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.remove("active"));
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = project.name;
  render();
}

function renderProjectNav(): void {
  const list = document.querySelector<HTMLElement>(".project-list");
  if (!list) return;
  if (!document.querySelector(".project-nav-search")) list.insertAdjacentHTML("beforebegin", '<label class="project-nav-search"><span>⌕</span><input id="project-nav-search-input" type="search" placeholder="Proje ara…" aria-label="Projeleri ara"></label>');
  const activeProjects = state.projects.filter((project) => !project.archived);
  const archivedCount = state.projects.filter((project) => project.archived).length;
  const sortedProjects = [...activeProjects].sort((left, right) => Number(pinnedProjectIds.includes(right.id)) - Number(pinnedProjectIds.includes(left.id)));
  list.innerHTML = (sortedProjects.map((project) => '<div class="project-nav-row" data-project-search="' + esc(project.name.toLocaleLowerCase("tr-TR")) + '"><button class="project-item ' + (activeProjectId === project.id ? "selected" : "") + '" data-project="' + esc(project.id) + '"><span class="project-dot dot-' + esc(project.color) + '"></span>' + esc(project.name) + '<span class="project-count">' + state.items.filter((item) => item.project === project.name && item.status !== "Tamamlandı").length + '</span></button><button class="project-pin ' + (pinnedProjectIds.includes(project.id) ? "pinned" : "") + '" data-action="toggle-project-pin" data-project-id="' + esc(project.id) + '" aria-label="' + (pinnedProjectIds.includes(project.id) ? "Projeyi sabitlemeden çıkar" : "Projeyi sabitle") + '" title="Projeyi sabitle">' + (pinnedProjectIds.includes(project.id) ? "★" : "☆") + '</button></div>').join("") || '<div class="project-empty">Henüz aktif proje yok</div>') + (archivedCount ? '<button class="project-archive-link" data-action="archived-projects">Arşivlenenler <span>' + archivedCount + '</span></button>' : "");
}

function renderWorkspaceProfile(): void {
  const profile = state.profile;
  const switcher = document.querySelector<HTMLElement>(".workspace-switcher");
  if (switcher) switcher.innerHTML = '<span class="workspace-avatar">' + esc(profile.organization.slice(0, 1).toLocaleUpperCase("tr-TR")) + '</span><span class="workspace-label"><strong>' + esc(profile.organization) + '</strong><small>' + esc(profile.workspace) + '</small></span><svg class="workspace-overview-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/></svg>';
  const breadcrumb = document.querySelector<HTMLElement>(".breadcrumb > span:first-child");
  if (breadcrumb) breadcrumb.textContent = profile.organization;
  const profileButton = document.querySelector<HTMLElement>(".profile");
  if (profileButton) profileButton.innerHTML = '<span class="profile-avatar">' + esc(profile.userName.split(/\\s+/).map((part) => part[0] || "").slice(0, 2).join("").toLocaleUpperCase("tr-TR")) + '</span><span><strong>' + esc(profile.userName) + '</strong><small>' + esc(profile.userRole) + '</small></span><span class="more">⚙</span>';
}

function itemIcon(type: string): string {
  return type === "Bug" ? icon("bug") : type === "Task" ? icon("task") : icon("story");
}

function itemTypeDescription(type: string): string {
  if (type === "Bug") return "Bug: Mevcut davranıştaki bir hatayı düzeltir.";
  if (type === "Task") return "Task: Story veya Bug dışında kalan teknik/operasyonel işi takip eder.";
  return "Story: Kullanıcıya ya da iş birimine ürün değeri kazandıran ihtiyacı anlatır.";
}

function itemTypeIcon(type: string): string {
  const className = type === "Bug" ? "bug-type" : type === "Task" ? "task-type" : "story-type";
  const description = itemTypeDescription(type);
  return '<span class="table-type ' + className + ' type-tooltip-anchor" tabindex="0" data-item-type="' + esc(type) + '" data-type-tooltip="' + esc(description) + '" aria-label="' + esc(description) + '">' + itemIcon(type) + '</span>';
}

let activeTypeTooltip: HTMLElement | null = null;
let activeTypeTooltipAnchor: HTMLElement | null = null;

function openTypeTooltip(anchor: HTMLElement): void {
  const description = anchor.dataset.typeTooltip;
  const type = anchor.dataset.itemType;
  if (!description || !type) return;
  closeTypeTooltip();
  const tooltip = document.createElement("div");
  tooltip.className = "type-tooltip-overlay";
  tooltip.id = "type-tooltip-active";
  tooltip.setAttribute("role", "tooltip");
  tooltip.innerHTML = "<strong>" + esc(type) + "</strong><span>" + esc(description.slice(type.length + 2)) + "</span>";
  document.body.append(tooltip);
  const rect = anchor.getBoundingClientRect();
  const bounds = tooltip.getBoundingClientRect();
  const left = Math.max(8, Math.min(window.innerWidth - bounds.width - 8, rect.left + rect.width / 2 - bounds.width / 2));
  const top = rect.bottom + bounds.height + 12 < window.innerHeight ? rect.bottom + 8 : Math.max(8, rect.top - bounds.height - 8);
  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
  anchor.setAttribute("aria-describedby", tooltip.id);
  activeTypeTooltip = tooltip;
  activeTypeTooltipAnchor = anchor;
}

function closeTypeTooltip(): void {
  activeTypeTooltip?.remove();
  activeTypeTooltipAnchor?.removeAttribute("aria-describedby");
  activeTypeTooltip = null;
  activeTypeTooltipAnchor = null;
}

document.addEventListener("pointerover", (event) => {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor !== activeTypeTooltipAnchor) openTypeTooltip(anchor);
});
document.addEventListener("pointerout", (event) => {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor === activeTypeTooltipAnchor && !(event.relatedTarget instanceof Element && anchor.contains(event.relatedTarget))) closeTypeTooltip();
});
document.addEventListener("focusin", (event) => {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor) openTypeTooltip(anchor);
});
document.addEventListener("focusout", (event) => {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor === activeTypeTooltipAnchor && !(event.relatedTarget instanceof Element && anchor.contains(event.relatedTarget))) closeTypeTooltip();
});
document.addEventListener("scroll", closeTypeTooltip, true);
window.addEventListener("resize", closeTypeTooltip);

function render(): void {
  renderProjectNav();
  renderWorkspaceProfile();
  (document.getElementById("nav-backlog-count") as HTMLElement).textContent = String(state.items.filter((item) => isItemInActiveProject(item) && item.status !== "Tamamlandı").length);
  const assetCount = document.getElementById("nav-assets-count");
  if (assetCount) assetCount.textContent = String(state.assets.filter((asset) => asset.active).length);
  const questionCount = document.getElementById("nav-question-count");
  if (questionCount) questionCount.textContent = String((state.openQuestions || []).filter((question) => question.status === "Açık").length);
  const jiraNav = document.querySelector<HTMLButtonElement>('.nav-item[data-view="jira"]');
  const jiraState = document.getElementById("jira-nav-state");
  const jiraEnabled = Boolean(state.profile.jiraBaseUrl?.trim());
  if (jiraNav) { jiraNav.disabled = !jiraEnabled; jiraNav.title = jiraEnabled ? "Jira Server paneli" : "Jira kapalı · Kurulum veya çalışma alanı ayarlarına Base URL ekleyin"; jiraNav.classList.toggle("nav-disabled", !jiraEnabled); }
  if (jiraState) jiraState.textContent = jiraEnabled ? "Hazır" : "Kapalı";
  if (activeView === "overview") renderOverview();
  else if (activeView === "backlog") renderBacklog();
  else if (activeView === "jira") renderJira();
  else if (activeView === "assets") renderAssets();
  else if (activeView === "roadmap") renderRoadmap();
  else if (activeView === "decisions") renderDecisions();
  else if (activeView === "releases") renderReleases();
  else if (activeView === "questions") renderOpenQuestions();
  else if (activeView === "daily-plan") renderDailyPlan();
  else if (activeView === "weekly-summary") renderWeeklySummary();
  else if (activeView === "archive-search") renderArchiveSearch();
  else renderFocus();
}

function renderJira(): void {
  const baseUrl = state.profile.jiraBaseUrl?.trim() || "";
  if (!baseUrl) {
    root.innerHTML = '<div class="page-content jira-page"><div class="page-title-row"><div><div class="eyebrow">ENTEGRASYON</div><h1>Jira</h1><p>Jira Base URL tanımlanmadan entegrasyon devre dışıdır.</p></div></div><section class="panel jira-empty"><div class="jira-empty-icon">◈</div><h2>Jira bağlantısı kapalı</h2><p>Jira adresini ilk kurulumda veya çalışma alanı ayarlarında ekleyebilirsin.</p><button class="button button-primary" data-action="open-workspace-settings">Çalışma alanı ayarlarını aç</button></section></div>';
    return;
  }
  if (jiraCatalogLoadedFor !== baseUrl && !jiraLoading) void loadJiraCatalog();
  const boardOptions = '<option value="">Agile board seç</option>' + jiraBoards.map((board) => '<option value="' + esc(board.id) + '" ' + (board.id === jiraSelectedBoardId ? "selected" : "") + '>' + esc(board.name + (board.type ? " · " + board.type : "")) + '</option>').join("");
  const projectOptions = '<option value="">Board projesi seç</option>' + jiraProjects.map((project) => '<option value="' + esc(project.key) + '" ' + (project.key === jiraSelectedProjectKey ? "selected" : "") + '>' + esc(project.key + " · " + project.name) + '</option>').join("");
  const sprintOptions = '<option value="">Sprint seç</option>' + jiraSprints.map((sprint) => '<option value="' + esc(sprint.id) + '" ' + (sprint.id === jiraSelectedSprintId ? "selected" : "") + '>' + esc(sprint.name + " · " + sprint.state) + '</option>').join("");
  const issueTypeOptions = '<option value="">Issue türü seç</option>' + jiraIssueTypes.filter((type) => !type.subtask).map((type) => '<option value="' + esc(type.id) + '" ' + (type.id === jiraSelectedIssueTypeId ? "selected" : "") + '>' + esc(type.name) + '</option>').join("");
  const rotaItems = state.items.filter((item) => !item.archived).sort((a, b) => a.title.localeCompare(b.title, "tr"));
  if (!rotaItems.some((item) => item.id === jiraSelectedRotaItemId)) jiraSelectedRotaItemId = rotaItems.find((item) => !item.jiraIssueKey)?.id || rotaItems[0]?.id || "";
  const selectedRotaItem = rotaItems.find((item) => item.id === jiraSelectedRotaItemId);
  const rotaItemOptions = '<option value="">Rota backlog işi seç</option>' + rotaItems.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === jiraSelectedRotaItemId ? "selected" : "") + '>' + esc(item.id + " · " + item.title + (item.jiraIssueKey ? " · " + item.jiraIssueKey : "")) + '</option>').join("");
  const rows = jiraIssues.map((issue) => '<tr><td><button class="jira-issue-key" data-action="jira-open-issue" data-issue-key="' + esc(issue.key) + '">' + esc(issue.key) + '</button></td><td class="jira-issue-summary">' + esc(issue.summary) + '</td><td>' + esc(issue.issueType || "—") + '</td><td><span class="jira-status">' + esc(issue.status || "—") + '</span></td><td>' + esc(issue.priority || "—") + '</td><td>' + esc(issue.assignee) + '</td><td>' + esc(issue.updated ? new Date(issue.updated).toLocaleString("tr-TR") : "—") + '</td></tr>').join("");
  root.innerHTML = '<div class="page-content jira-page"><div class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ENTEGRASYON · JIRA SERVER / DATA CENTER</div><h1>Jira Agile board</h1><p>Board backlog’unu ve sprintlerini görüntüle; Rota backlog işini seçili board’un Jira projesinde issue olarak oluştur.</p></div><button class="button button-secondary" data-action="jira-refresh" ' + (jiraLoading ? "disabled" : "") + '>' + (jiraLoading ? "Bağlanıyor…" : "Yenile") + '</button></div>' +
    '<section class="panel jira-connection-card"><div class="jira-connection-top"><div><div class="panel-kicker">BAĞLANTI</div><strong class="jira-url-label">' + esc(baseUrl) + '</strong><p>Kimlik doğrulama, Jira’da kendi hesabın için oluşturduğun PAT ile yapılır.</p></div><span class="jira-connection-pill ' + (jiraHasSavedToken ? "is-connected" : "") + '">' + (jiraHasSavedToken ? "PAT kayıtlı · şifreli" : "PAT gerekli") + '</span></div><div class="jira-token-actions">' + (jiraHasSavedToken
      ? '<button class="button button-secondary" data-action="jira-open-token-page">Jira’da tokenları yönet</button><button class="button button-quiet" data-action="jira-replace-token">PAT değiştir</button><button class="button button-quiet jira-remove-token" data-action="jira-remove-token">Bağlantıyı kaldır</button>'
      : '<button class="button button-secondary" data-action="jira-open-token-page">Jira’da PAT oluştur</button><label class="jira-pat-field"><span>Jira Personal Access Token</span><input id="jira-pat-input" class="field-input" type="password" autocomplete="off" placeholder="Jira’dan oluşturduğun PAT’i buraya yapıştır"></label><button class="button button-primary" data-action="jira-save-token">PAT’i güvenle kaydet</button>') + '</div><p class="jira-security-note">Token bu bilgisayarda işletim sistemi şifrelemesiyle saklanır; çalışma alanı yedeğine ve tarayıcı depolamasına yazılmaz.</p></section>' +
    (jiraHasSavedToken ? '<section class="panel jira-query-card"><div class="panel-heading"><div><div class="panel-kicker">JIRA VERİSİ</div><h2>Board kayıtları</h2><p>Agile board, backlog veya sprint kayıtlarını canlı sorgula.</p></div></div><div class="jira-query-controls"><label class="field-label">Agile board<select id="jira-board-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '>' + boardOptions + '</select></label><label class="field-label">Kapsam<select id="jira-scope-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '><option value="backlog" ' + (jiraIssueScope === "backlog" ? "selected" : "") + '>Backlog</option><option value="board" ' + (jiraIssueScope === "board" ? "selected" : "") + '>Board işleri</option><option value="sprint" ' + (jiraIssueScope === "sprint" ? "selected" : "") + '>Sprint</option></select></label>' + (jiraIssueScope === "sprint" ? '<label class="field-label">Sprint<select id="jira-sprint-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '>' + sprintOptions + '</select></label>' : '') + '<button class="button button-primary" data-action="jira-fetch-issues" ' + (jiraLoading || !jiraSelectedBoardId || (jiraIssueScope === "sprint" && !jiraSelectedSprintId) ? "disabled" : "") + '>Kayıtları getir</button></div><p class="jira-hint">İlk 100 kayıt gösterilir. Sprint listesinde aktif, gelecek ve tamamlanmış sprintler bulunur.</p>' +
      (jiraError ? '<div class="jira-error" role="alert">' + esc(jiraError) + '</div>' : "") +
      '<div class="jira-results-heading"><strong>' + (jiraIssues.length ? jiraIssues.length + " kayıt" : "Kayıt listesi") + '</strong><span>' + (jiraIssues.length ? "Son Jira yanıtı · canlı sorgu" : "Henüz Jira kaydı getirilmedi") + '</span></div><div class="jira-table-wrap"><table class="jira-table"><thead><tr><th>ANAHTAR</th><th>BAŞLIK</th><th>TÜR</th><th>DURUM</th><th>ÖNCELİK</th><th>ATANAN</th><th>GÜNCELLENDİ</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7" class="jira-table-empty">' + (jiraLoading ? "Jira’dan kayıtlar alınıyor…" : "Bir board ve kayıt kapsamı seçip getir.") + '</td></tr>') + '</tbody></table></div></section>' +
      '<section class="panel jira-query-card jira-create-card"><div class="panel-heading"><div><div class="panel-kicker">ROTA → JIRA</div><h2>Rota işinden Jira issue oluştur</h2><p>Yeni issue seçili Agile board ile ilişkili Jira projesinde açılır. Oluşturulan issue anahtarı Rota işine bağlanır.</p></div></div>' + (jiraError ? '<div class="jira-error" role="alert">' + esc(jiraError) + '</div>' : '') + '<div class="jira-create-grid"><label class="field-label">Rota backlog işi<select id="jira-rota-item-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '>' + rotaItemOptions + '</select></label><label class="field-label">Jira projesi<select id="jira-project-select" class="field-input" ' + (jiraLoading || !jiraSelectedBoardId ? "disabled" : "") + '>' + projectOptions + '</select></label><label class="field-label">Issue türü<select id="jira-issue-type-select" class="field-input" ' + (jiraLoading || !jiraSelectedProjectKey ? "disabled" : "") + '>' + issueTypeOptions + '</select></label><label class="field-label jira-create-summary">Issue başlığı<input id="jira-create-summary" class="field-input" maxlength="255" value="' + esc(selectedRotaItem?.title || "") + '" ' + (!selectedRotaItem || Boolean(selectedRotaItem.jiraIssueKey) ? "disabled" : "") + '></label><label class="field-label jira-create-description">Açıklama<textarea id="jira-create-description" class="field-input field-textarea" rows="5" ' + (!selectedRotaItem || Boolean(selectedRotaItem.jiraIssueKey) ? "disabled" : "") + '>' + esc(selectedRotaItem ? [selectedRotaItem.description, selectedRotaItem.acceptance.length ? "Kabul kriterleri:\n" + selectedRotaItem.acceptance.map((criterion) => "• " + criterion).join("\n") : "", "Rota backlog ID: " + selectedRotaItem.id].filter(Boolean).join("\n\n") : "") + '</textarea></label></div>' + (selectedRotaItem?.jiraIssueKey ? '<div class="jira-linked-item">Bu Rota işi zaten <button class="jira-issue-key" data-action="jira-open-issue" data-issue-key="' + esc(selectedRotaItem.jiraIssueKey) + '">' + esc(selectedRotaItem.jiraIssueKey) + '</button> ile ilişkilendirilmiş.</div>' : '') + '<div class="jira-create-footer"><span class="jira-hint">' + (jiraSelectedBoardId ? (jiraProjects.length ? "Yalnızca seçili board’un proje kapsamındaki projeler listelenir." : "Bu board için Jira proje kapsamı alınamadı; issue oluşturma kapalı.") : "Önce Agile board seç.") + '</span><button class="button button-primary" data-action="jira-create-issue" ' + (jiraLoading || !jiraSelectedBoardId || !jiraSelectedProjectKey || !jiraSelectedIssueTypeId || !selectedRotaItem || Boolean(selectedRotaItem.jiraIssueKey) ? "disabled" : "") + '>Jira’da issue oluştur</button></div></section>' : '<section class="panel jira-query-card"><h2>Önce Jira PAT’ini kaydet</h2><p>Jira hesabında token oluştur, Rota’da güvenle sakla; ardından Agile board seçerek issue oluşturabilirsin.</p>' + (jiraError ? '<div class="jira-error" role="alert">' + esc(jiraError) + '</div>' : "") + '</section>') + '</div>';
}

async function loadJiraCatalog(): Promise<void> {
  const baseUrl = state.profile.jiraBaseUrl?.trim() || "";
  if (!baseUrl || jiraLoading) return;
  jiraLoading = true; jiraError = ""; renderJira();
  try {
    jiraHasSavedToken = await desktop.jiraHasToken();
    if (jiraHasSavedToken) {
      jiraBoards = await desktop.jiraListBoards(baseUrl);
      if (!jiraBoards.some((entry) => entry.id === jiraSelectedBoardId)) jiraSelectedBoardId = jiraBoards[0]?.id || "";
      if (jiraSelectedBoardId) {
        const [projects, sprints] = await Promise.all([desktop.jiraListBoardProjects(baseUrl, jiraSelectedBoardId), desktop.jiraListSprints(baseUrl, jiraSelectedBoardId)]);
        jiraProjects = projects; jiraSprints = sprints;
        if (!jiraProjects.some((entry) => entry.key === jiraSelectedProjectKey)) jiraSelectedProjectKey = jiraProjects[0]?.key || "";
        if (!jiraSprints.some((entry) => entry.id === jiraSelectedSprintId)) jiraSelectedSprintId = jiraSprints.find((entry) => entry.state === "active")?.id || jiraSprints[0]?.id || "";
        jiraIssueTypes = jiraSelectedProjectKey ? await desktop.jiraListIssueTypes(baseUrl, jiraSelectedProjectKey) : [];
        if (!jiraIssueTypes.some((entry) => entry.id === jiraSelectedIssueTypeId)) jiraSelectedIssueTypeId = jiraIssueTypes.find((entry) => entry.name.toLowerCase() === "story")?.id || jiraIssueTypes[0]?.id || "";
      }
    }
    jiraCatalogLoadedFor = baseUrl;
  } catch (error) { jiraError = error instanceof Error ? error.message : "Jira bağlantısı kurulamadı."; jiraCatalogLoadedFor = baseUrl; }
  finally { jiraLoading = false; if (activeView === "jira") renderJira(); }
}

async function refreshJiraCatalog(): Promise<void> {
  jiraCatalogLoadedFor = ""; jiraIssues = []; jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; await loadJiraCatalog();
}

async function fetchJiraIssues(): Promise<void> {
  if (!state.profile.jiraBaseUrl || !jiraSelectedBoardId || (jiraIssueScope === "sprint" && !jiraSelectedSprintId)) return;
  jiraLoading = true; jiraError = ""; renderJira();
  try { jiraIssues = await desktop.jiraFetchBoardIssues(state.profile.jiraBaseUrl, jiraSelectedBoardId, jiraIssueScope, jiraSelectedSprintId || undefined); }
  catch (error) { jiraError = error instanceof Error ? error.message : "Jira kayıtları alınamadı."; }
  finally { jiraLoading = false; renderJira(); }
}

async function loadJiraBoardDetails(): Promise<void> {
  if (!state.profile.jiraBaseUrl || !jiraSelectedBoardId) return;
  jiraLoading = true; jiraError = ""; jiraIssues = []; renderJira();
  try {
    const [projects, sprints] = await Promise.all([desktop.jiraListBoardProjects(state.profile.jiraBaseUrl, jiraSelectedBoardId), desktop.jiraListSprints(state.profile.jiraBaseUrl, jiraSelectedBoardId)]);
    jiraProjects = projects; jiraSprints = sprints;
    jiraSelectedProjectKey = jiraProjects[0]?.key || "";
    jiraSelectedSprintId = jiraSprints.find((entry) => entry.state === "active")?.id || jiraSprints[0]?.id || "";
    jiraIssueTypes = jiraSelectedProjectKey ? await desktop.jiraListIssueTypes(state.profile.jiraBaseUrl, jiraSelectedProjectKey) : [];
    jiraSelectedIssueTypeId = jiraIssueTypes.find((entry) => entry.name.toLowerCase() === "story")?.id || jiraIssueTypes[0]?.id || "";
  } catch (error) { jiraError = error instanceof Error ? error.message : "Board bilgileri alınamadı."; jiraProjects = []; jiraIssueTypes = []; }
  finally { jiraLoading = false; renderJira(); }
}

async function loadJiraProjectIssueTypes(): Promise<void> {
  if (!state.profile.jiraBaseUrl || !jiraSelectedProjectKey) return;
  jiraLoading = true; jiraError = ""; jiraIssueTypes = []; renderJira();
  try { jiraIssueTypes = await desktop.jiraListIssueTypes(state.profile.jiraBaseUrl, jiraSelectedProjectKey); jiraSelectedIssueTypeId = jiraIssueTypes.find((entry) => entry.name.toLowerCase() === "story")?.id || jiraIssueTypes[0]?.id || ""; }
  catch (error) { jiraError = error instanceof Error ? error.message : "Jira issue türleri alınamadı."; }
  finally { jiraLoading = false; renderJira(); }
}

async function createJiraIssueFromRota(): Promise<void> {
  const item = state.items.find((entry) => entry.id === jiraSelectedRotaItemId);
  const summary = (document.getElementById("jira-create-summary") as HTMLInputElement | null)?.value.trim() || "";
  const description = (document.getElementById("jira-create-description") as HTMLTextAreaElement | null)?.value || "";
  const project = jiraProjects.find((entry) => entry.key === jiraSelectedProjectKey);
  const issueType = jiraIssueTypes.find((entry) => entry.id === jiraSelectedIssueTypeId);
  if (!item || item.jiraIssueKey || !project || !issueType || !summary || !jiraSelectedBoardId || !state.profile.jiraBaseUrl) return;
  const okay = window.confirm('Jira’da "' + summary + '" başlıklı ' + issueType.name + ' oluşturulsun mu?\n\nBoard: ' + (jiraBoards.find((entry) => entry.id === jiraSelectedBoardId)?.name || "") + '\nProje: ' + project.key + ' · ' + project.name + '\nRota işi: ' + item.id);
  if (!okay) return;
  jiraLoading = true; jiraError = ""; renderJira();
  try {
    const created = await desktop.jiraCreateIssue(state.profile.jiraBaseUrl, jiraSelectedBoardId, project.key, issueType.id, summary, description);
    item.jiraIssueKey = created.key; item.updated = "Az önce"; addWorkActivity(item, "change", "Jira issue oluşturuldu ve bağlandı: " + created.key + " · " + project.key);
    save(); toast("Jira issue oluşturuldu: " + created.key);
    jiraIssues = await desktop.jiraFetchBoardIssues(state.profile.jiraBaseUrl, jiraSelectedBoardId, jiraIssueScope, jiraSelectedSprintId || undefined).catch(() => jiraIssues);
  } catch (error) { jiraError = error instanceof Error ? error.message : "Jira issue oluşturulamadı."; }
  finally { jiraLoading = false; renderJira(); }
}

async function saveJiraPat(): Promise<void> {
  const input = document.getElementById("jira-pat-input") as HTMLInputElement | null;
  if (!input?.value.trim()) { toast("Önce Jira PAT’ini yapıştır."); input?.focus(); return; }
  try { await desktop.jiraSaveToken(input.value); input.value = ""; jiraHasSavedToken = true; jiraCatalogLoadedFor = ""; jiraError = ""; await refreshJiraCatalog(); toast("Jira PAT güvenle kaydedildi."); }
  catch (error) { jiraError = error instanceof Error ? error.message : "Jira PAT kaydedilemedi."; renderJira(); }
}

async function removeJiraPat(): Promise<void> {
  if (!window.confirm("Jira PAT’i bu bilgisayardan kaldırmak istiyor musun?")) return;
  await desktop.jiraRemoveToken(); jiraHasSavedToken = false; jiraBoards = []; jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; jiraIssues = []; renderJira(); toast("Jira bağlantı anahtarı kaldırıldı.");
}

function renderOverview(): void {
  const portfolio = state.items.filter((item) => isItemInActiveProject(item));
  const open = portfolio.filter((item) => item.status !== "Tamamlandı");
  const ready = open.filter((item) => item.status === "Hazır").slice(0, 4);
  const primaryProject = state.projects.find((project) => !project.archived);
  const tasks = state.tasks.filter((task) => !task.done).slice(0, 3);
  const recentNotes = state.notes.slice(0, 2);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const overdue = portfolio.filter((item) => overdueDays(item) > 0).sort((a, b) => overdueDays(b) - overdueDays(a)).slice(0, 5);
  const stale = open.filter((item) => !item.activity?.[0] || Date.now() - new Date(item.activity[0].occurredAt).getTime() > 7 * 86400000).sort((a, b) => new Date(a.activity?.[0]?.occurredAt || 0).getTime() - new Date(b.activity?.[0]?.occurredAt || 0).getTime()).slice(0, 5);
  const upcomingReleases = state.releases.filter((release) => release.status !== "Yayınlandı" && release.status !== "İptal edildi" && release.plannedDate && release.plannedDate >= today.toISOString().slice(0, 10) && isItemInActiveProject({ project: release.project } as WorkItem)).sort((a, b) => a.plannedDate.localeCompare(b.plannedDate)).slice(0, 4);
  const activeInitiatives = state.roadmap.filter((node) => node.type === "Initiative" && isItemInActiveProject({ project: node.project } as WorkItem)).slice(0, 4);
  const releaseDrift = state.releases.filter((release) => release.status === "Yayınlandı" && release.plannedDate && release.actualDate).map((release) => ({ release, days: Math.round((new Date(release.actualDate + "T00:00:00").getTime() - new Date(release.plannedDate + "T00:00:00").getTime()) / 86400000) }));
  const completedDurations = portfolio.filter((item) => item.actualStartDate && item.completedAt).map((item) => ({ item, days: Math.max(0, (new Date(item.completedAt!).getTime() - new Date(item.actualStartDate!).getTime()) / 86400000) }));
  const resolvedBlockers = portfolio.filter((item) => item.blocker?.openedAt && item.blocker.resolvedAt).map((item) => ({ item, days: Math.max(0, (new Date(item.blocker!.resolvedAt!).getTime() - new Date(item.blocker!.openedAt).getTime()) / 86400000) }));
  const avg = (values: number[]) => values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : "—";
  const metricList = (rows: { item: WorkItem; days: number }[], empty: string) => rows.length ? rows.slice(0, 4).map(({ item, days }) => '<button class="metric-evidence" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id + " · " + item.title) + '</span><strong>' + days.toFixed(1) + ' gün</strong></button>').join("") : '<p class="metric-empty">' + empty + '</p>';
  const dashboardTracking = '<section class="portfolio-tracking"><div class="portfolio-tracking-header"><div><div class="panel-kicker">PO TAKİP</div><h2>Hedefler, yayınlar ve dikkat isteyen işler</h2></div><span class="portfolio-hint">Özet tüm aktif projelerden üretilir</span></div><div class="portfolio-track-grid"><section><h3>Yaklaşan release\'ler</h3>' + (upcomingReleases.length ? upcomingReleases.map((release) => '<button class="portfolio-release" data-action="edit-release" data-id="' + esc(release.id) + '"><strong>' + esc(release.name) + '</strong><span>' + esc(release.project + " · " + release.plannedDate) + '</span><small>' + esc(release.status) + '</small></button>').join("") : '<p class="metric-empty">Planlanmış yaklaşan release yok.</p>') + '</section><section><h3>Geciken işler</h3>' + (overdue.length ? overdue.map((item) => '<button class="metric-evidence" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id + " · " + item.title) + '</span><strong>' + overdueDays(item) + ' gün</strong></button>').join("") : '<p class="metric-empty">Geciken iş yok.</p>') + '</section><section><h3>Açık blokajlar</h3>' + (portfolio.filter((item) => item.status === "Bloke").slice(0, 5).map((item) => '<button class="metric-evidence" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id + " · " + item.title) + '</span><strong>' + esc(item.blocker?.owner || "Sahip yok") + '</strong></button>').join("") || '<p class="metric-empty">Açık blokaj yok.</p>') + '</section><section><h3>7+ gündür güncellenmeyen</h3>' + (stale.length ? stale.map((item) => '<button class="metric-evidence" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id + " · " + item.title) + '</span><strong>' + esc(itemLastActivityLabel(item)) + '</strong></button>').join("") : '<p class="metric-empty">Uzun süredir bekleyen iş yok.</p>') + '</section><section><h3>Ürün hedefleri</h3>' + (activeInitiatives.length ? activeInitiatives.map((node) => '<button class="portfolio-release" data-view="roadmap"><strong>' + esc(node.title) + '</strong><span>' + esc(node.project + " · " + node.stage) + '</span><small>' + esc(node.targetDate ? "Hedef " + node.targetDate : node.owner) + '</small></button>').join("") : '<p class="metric-empty">Henüz ürün hamlesi tanımlanmamış.</p>') + '</section></div><section class="portfolio-metrics"><div class="panel-heading compact"><div><div class="panel-kicker">GEÇMİŞTEN TÜRETİLEN GÖSTERGELER</div><h3>Akış metrikleri</h3></div><span class="portfolio-hint">Çalışan performans puanı değildir</span></div><div class="metric-grid"><article><strong>' + avg(completedDurations.map((entry) => entry.days)) + ' gün</strong><span>İşe başlama → tamamlanma · n=' + completedDurations.length + '</span>' + metricList(completedDurations, "Gerçek başlangıç ve tamamlanma tarihi olan kayıt yok.") + '</article><article><strong>' + avg(resolvedBlockers.map((entry) => entry.days)) + ' gün</strong><span>Blokaj açılışı → çözülme · n=' + resolvedBlockers.length + '</span>' + metricList(resolvedBlockers, "Çözümlenmiş blokaj süresi kaydı yok.") + '</article><article><strong>' + avg(releaseDrift.map((entry) => entry.days)) + ' gün</strong><span>Planlanan → gerçek yayın · n=' + releaseDrift.length + '</span>' + (releaseDrift.length ? releaseDrift.slice(0, 4).map(({ release, days }) => '<button class="metric-evidence" data-action="edit-release" data-id="' + esc(release.id) + '"><span>' + esc(release.name) + '</span><strong>' + (days > 0 ? "+" : "") + days + ' gün</strong></button>').join("") : '<p class="metric-empty">Planlanan ve gerçek tarihi olan yayın yok.</p>') + '</article></div><p class="metric-definition">Süreler yalnızca uygulamada saklanan tarih ve aktivite kayıtlarıyla hesaplanır. Tarihleri bulunmayan geçmiş kayıtlar örnekleme dahil edilmez; kişi bazında sıralama yapılmaz.</p></section></section>';
  root.innerHTML =
    '<div class="page-content">' +
      '<section class="welcome-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÇALIŞMA ALANI</div><h1>Merhaba ' + esc(state.profile.userName.split(/\\s+/)[0] || "").replace(/[<>]/g, "") + ' <span class="wave">✳</span></h1><p>' + esc(state.profile.workspace) + ' · Bugünkü çalışmalarına buradan bak.</p></div><button class="button button-primary" data-action="new"><span class="button-plus">+</span> Yeni iş oluştur</button></section>' +
      '<section class="stat-grid">' +
        '<article class="stat-card"><div class="stat-top"><span>Aktif backlog</span><span class="stat-icon icon-indigo">☷</span></div><div class="stat-number">' + open.length + '<span class="stat-change">iş</span></div><div class="stat-foot"><span class="mini-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span> ' + portfolio.filter((item) => item.activity?.[0] && Date.now() - new Date(item.activity[0].occurredAt).getTime() < 7 * 86400000).length + ' iş son 7 günde güncellendi</div></article>' +
        '<article class="stat-card"><div class="stat-top"><span>Analize hazır</span><span class="stat-icon icon-green">✓</span></div><div class="stat-number">' + portfolio.filter((item) => item.status === "Hazır").length + '<span class="stat-change">iş</span></div><div class="stat-foot"><span class="progress-track"><i style="width:' + (portfolio.length ? Math.round(portfolio.filter((item) => item.status === "Hazır").length / portfolio.length * 100) : 0) + '%"></i></span> Aktif backlog içindeki oran</div></article>' +
        '<article class="stat-card"><div class="stat-top"><span>Takip edeceğim</span><span class="stat-icon icon-amber">◷</span></div><div class="stat-number">' + state.tasks.filter((task) => !task.done).length + '<span class="stat-change">kişisel görev</span></div><div class="stat-foot"><span class="stat-subtle">Bugün tamamlanması gereken</span><strong>' + state.tasks.filter((task) => !task.done && task.due === "Bugün").length + '</strong></div></article>' +
        '<article class="stat-card"><div class="stat-top"><span>Bloke işler</span><span class="stat-icon icon-rose">!</span></div><div class="stat-number">' + portfolio.filter((item) => item.status === "Bloke").length + '<span class="stat-change">iş</span></div><div class="stat-foot"><span class="risk-pulse"></span><span class="stat-subtle">Gözden geçirme gerekli</span></div></article>' +
      '</section>' +
      dashboardTracking +
      '<section class="content-grid">' +
        '<div class="panel backlog-panel"><div class="panel-heading"><div><div class="panel-kicker">' + esc(primaryProject?.name || "PROJELER") + ' <span class="project-dot dot-' + esc(primaryProject?.color || "blue") + '"></span></div><h2>Hazır işler</h2><p>Önceliklendirilmiş, refinement’a hazır</p></div><button class="text-button" data-view="backlog">Tüm backlog </button></div>' +
          '<div class="issue-list">' + (ready.length ? ready.map((item) => issueRow(item)).join("") : '<div class="empty-inline">Hazır iş bulunmuyor.</div>') + '</div>' +
          '<div class="panel-footer"><span class="avatar-stack"><i>DA</i><i>SK</i><i>+</i></span><span>PO alanı · son güncelleme bugün</span><button class="dots-button" aria-label="Diğer seçenekler">···</button></div></div>' +
        '<div class="panel today-panel"><div class="panel-heading compact"><div><div class="panel-kicker">KİŞİSEL ALAN</div><h2>Bugün</h2><p>Takip listenden kısa bir görünüm</p></div><button class="round-add" data-action="new" title="Yeni görev">+</button></div>' +
          '<div class="today-list">' + (tasks.length ? tasks.map((task) => taskRow(task)).join("") : '<div class="empty-inline">Bugünlük her şey tamamlandı. ✨</div>') + '</div>' +
          '<button class="panel-link" data-view="focus">Kişisel alanı aç </button></div>' +
      '</section>' +
      '<section class="bottom-grid"><div class="panel pulse-panel"><div class="panel-heading compact"><div><div class="panel-kicker">HAFTALIK RİTİM</div><h2>Backlog sağlığı</h2></div><span class="period-tag">Bu hafta <span>⌄</span></span></div><div class="health-graph"><div class="graph-labels"><span>12</span><span>8</span><span>4</span><span>0</span></div><div class="graph-area"><div class="grid-line line-one"></div><div class="grid-line line-two"></div><div class="grid-line line-three"></div><svg viewBox="0 0 560 116" preserveAspectRatio="none"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4665e8" stop-opacity=".18"/><stop offset="1" stop-color="#4665e8" stop-opacity="0"/></linearGradient></defs><path d="M0 82 C38 77 45 57 83 61 S135 74 165 54 S211 58 247 45 S294 55 329 39 S377 42 413 25 S468 43 495 19 S535 24 560 8 L560 116 L0 116 Z" fill="url(#areaFill)"/><path d="M0 82 C38 77 45 57 83 61 S135 74 165 54 S211 58 247 45 S294 55 329 39 S377 42 413 25 S468 43 495 19 S535 24 560 8" fill="none" stroke="#4c65de" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="graph-days"><span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span></div></div></div><div class="graph-caption"><span><i class="legend-dot blue"></i>Açık iş</span><span><i class="legend-dot gray"></i>Geçen hafta</span><strong>+%18 <small>bu haftaki hareket</small></strong></div></div>' +
        '<div class="panel notes-panel"><div class="panel-heading compact"><div><div class="panel-kicker">HIZLI NOTLAR</div><h2>Son notların</h2></div><button class="text-button" data-view="focus">Tüm notlar </button></div><div class="note-list">' + recentNotes.map((note) => '<button class="note-preview" data-note="' + esc(note.id) + '"><span class="note-pin">✳</span><span class="note-copy"><strong>' + esc(note.title) + '</strong><small>' + esc(note.body) + '</small></span><span class="note-date">' + esc(note.updated) + '</span></button>').join("") + '</div><button class="add-note-button" data-action="new" data-type="Not">+ Yeni not ekle</button></div></section>' +
    '</div>';
  document.querySelector(".pulse-panel")?.remove();
}

function issueRow(item: WorkItem): string {
  const waitingOn = pendingDependencies(item).length;
  const lateBy = overdueDays(item);
  return '<button class="issue-row" data-open-item="' + esc(item.id) + '"><span class="issue-type ' + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type") + '">' + itemIcon(item.type) + '</span><span class="issue-main"><span class="issue-title">' + esc(item.title) + '</span><span class="issue-meta"><span>' + esc(item.id) + '</span><i>·</i><span>' + esc(item.area) + '</span><i>·</i><span>' + esc(itemLastActivityLabel(item)) + '</span>' + (waitingOn ? '<i>·</i><span class="dependency-indicator">⚠ ' + waitingOn + ' iş bekliyor</span>' : '') + (lateBy ? '<i>·</i><span class="overdue-indicator">' + lateBy + ' gün gecikti</span>' : '') + '</span></span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>';
}

function taskRow(task: PersonalTask): string {
  const linked = task.linked && itemById(task.linked);
  return '<div class="today-task ' + (task.done ? "task-complete" : "") + '"><button class="task-check ' + (task.done ? "checked" : "") + '" data-toggle-task="' + esc(task.id) + '" aria-label="Görevi tamamla">' + (task.done ? "✓" : "") + '</button><button class="task-title" data-open-task="' + esc(task.id) + '">' + esc(task.title) + '</button><span class="task-due ' + (task.due === "Bugün" ? "due-today" : "") + '">' + esc(task.due) + '</span>' + (linked ? '<button class="task-link" data-open-item="' + esc(linked.id) + '">' + esc(linked.id) + '</button>' : "") + '</div>';
}

function assignmentSummary(item: WorkItem): string {
  const assignments = getWorkAssignments(item);
  if (!assignments.length) return "Atama yok";
  return assignments.map((assignment) => {
    const team = state.teams.find((entry) => entry.id === assignment.teamId);
    return (team?.name || "Takım silinmiş") + " · " + assignment.member + (assignment.scope ? " (" + assignment.scope + ")" : "");
  }).join("; ");
}

function getWorkAssignments(item: WorkItem): WorkAssignment[] {
  if (item.assignments) return item.assignments;
  return item.teamId && item.assignee ? [{ teamId: item.teamId, member: item.assignee }] : [];
}

function assigneeSummary(item: WorkItem): string {
  const assignments = getWorkAssignments(item);
  if (!assignments.length) return "Atama yok";
  return assignments.map((assignment) => assignment.member + (assignment.scope ? " (" + assignment.scope + ")" : "")).join(", ");
}

function syncLegacyAssignmentFields(item: WorkItem): void {
  const firstAssignment = getWorkAssignments(item)[0];
  item.teamId = firstAssignment?.teamId || "";
  item.assignee = firstAssignment?.member || "";
}

function validAssignments(assignments: WorkAssignment[]): WorkAssignment[] {
  return assignments.filter((assignment) => state.teams.find((team) => team.id === assignment.teamId)?.members.includes(assignment.member));
}

function assignmentTeamForMember(member: string, preferredTeamId = ""): string {
  if (!member) return "";
  const matchingTeams = state.teams.filter((team) => team.members.includes(member));
  return matchingTeams.find((team) => team.id === preferredTeamId)?.id || matchingTeams[0]?.id || "";
}

function assignmentMemberSearchOptions(): string {
  const members = [...new Set(state.teams.flatMap((team) => team.members))].sort((a, b) => a.localeCompare(b, "tr-TR"));
  return members.map((member) => '<option value="' + esc(member) + '"></option>').join("");
}

let assignmentMemberListSequence = 0;
function assignmentRowMarkup(assignment: WorkAssignment = { teamId: "", member: "" }): string {
  const memberListId = "assignment-member-options-" + (++assignmentMemberListSequence);
  const teamId = assignmentTeamForMember(assignment.member, assignment.teamId);
  return '<div class="assignment-edit-row"><input class="field-input assignment-member-search" data-assignment-member list="' + memberListId + '" value="' + esc(assignment.member) + '" placeholder="Üye ara ve seç…" aria-label="Üye ara ve ata" autocomplete="off" ' + (state.teams.some((team) => team.members.length) ? "" : "disabled") + '><datalist id="' + memberListId + '">' + assignmentMemberSearchOptions() + '</datalist><input type="hidden" data-assignment-team value="' + esc(teamId) + '"><input class="field-input assignment-scope-input" data-assignment-scope maxlength="100" value="' + esc(assignment.scope || "") + '" placeholder="Sorumluluk alanı (isteğe bağlı)" aria-label="Sorumluluk alanı"><button type="button" class="assignment-remove" data-remove-assignment aria-label="Atamayı kaldır" title="Atamayı kaldır">×</button></div>';
}

function assignmentEditorMarkup(listId: string, assignments: WorkAssignment[] = [], title = "İş atamaları", description = "Her satırda bir takım üyesi ve üstlendiği bölüm yer alır."): string {
  return '<section class="assignment-editor" id="' + esc(listId) + '-editor"><div class="assignment-editor-heading"><div><strong>' + esc(title) + '</strong><small>' + esc(description) + '</small></div><button type="button" class="button button-secondary button-small" data-add-assignment="' + esc(listId) + '">＋ Kişi ekle</button></div><div class="assignment-edit-list" id="' + esc(listId) + '">' + assignments.map((assignment) => assignmentRowMarkup(assignment)).join("") + '</div>' + (state.teams.length ? "" : '<div class="assignment-help">Atama yapmadan önce Takım panelinden takım ve üyelerini ekle.</div>') + '</section>';
}

function readAssignmentRows(listId: string): { assignments: WorkAssignment[]; invalid: boolean } {
  const rows = [...document.querySelectorAll<HTMLElement>("#" + listId + " .assignment-edit-row")];
  const assignments: WorkAssignment[] = [];
  for (const row of rows) {
    const teamId = row.querySelector<HTMLInputElement>("[data-assignment-team]")?.value || "";
    const member = row.querySelector<HTMLInputElement>("[data-assignment-member]")?.value.trim() || "";
    const scope = row.querySelector<HTMLInputElement>("[data-assignment-scope]")?.value.trim() || "";
    if (!teamId && !member && !scope) continue;
    if (!teamId || !member || !state.teams.find((team) => team.id === teamId)?.members.includes(member)) return { assignments, invalid: true };
    assignments.push({ teamId, member, ...(scope ? { scope } : {}) });
  }
  return { assignments, invalid: false };
}

function openSprintSummary(sprintId: string): void {
  const sprint = state.sprints.find((entry) => entry.id === sprintId);
  if (!sprint) return;
  const items = state.items.filter((item) => item.sprintId === sprintId);
  const snapshot = sprint.closingSnapshot;
  const done = snapshot?.done || items.filter((item) => item.status === "Tamamlandı").map(({ id, title, status }) => ({ id, title, status }));
  const carryover = snapshot?.carryover || items.filter((item) => item.status !== "Tamamlandı").map(({ id, title, status }) => ({ id, title, status }));
  const blocked = snapshot?.blocked || items.filter((item) => item.status === "Bloke").map(({ id, title, status }) => ({ id, title, status }));
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal sprint-summary-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">SPRINT KAPANIŞI · ' + esc(sprint.name) + '</div><h2>Kapanış özeti</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><div class="sprint-summary-stats"><article><strong>' + done.length + '</strong><span>Tamamlandı</span></article><article><strong>' + carryover.length + '</strong><span>Taşındı / açık</span></article><article><strong>' + blocked.length + '</strong><span>Bloke</span></article></div><div class="sprint-summary-columns"><section><h3>Tamamlanan işler</h3>' + (done.map((item) => '<p><strong>' + esc(item.id) + '</strong> · ' + esc(item.title) + '</p>').join("") || '<p class="metric-empty">Tamamlanan iş yok.</p>') + '</section><section><h3>Açık / taşınan işler</h3>' + (carryover.map((item) => '<p><strong>' + esc(item.id) + '</strong> · ' + esc(item.title) + ' <small>' + esc(item.status) + '</small></p>').join("") || '<p class="metric-empty">Açık iş yok.</p>') + '</section></div><label class="field-label">Öğrenimler ve takip notları<textarea id="sprint-learnings" class="field-input field-textarea" rows="4" maxlength="3000" placeholder="Neyi koruyalım, neyi değiştirelim, hangi takip gerekiyor?">' + esc(sprint.closingLearnings || "") + '</textarea></label><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Kapat</button><button type="button" class="button button-primary" data-action="save-sprint-summary" data-sprint-id="' + esc(sprint.id) + '">Özeti kaydet</button></footer></div></section></div>';
}

function openSprintCarryover(sprintId: string): void {
  const sprint = state.sprints.find((entry) => entry.id === sprintId);
  if (!sprint) return;
  const remaining = state.items.filter((item) => item.sprintId === sprintId && item.status !== "Tamamlandı");
  if (!remaining.length) { toast("Bu sprintte taşınacak açık iş yok."); return; }
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">SPRINT KAPANIŞI</div><h2>' + esc(sprint.name) + ' · Kalan işler</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><p class="settings-intro">Tamamlanmayan her iş için yeni sprint seç veya Backlog’a dön.</p><div class="sprint-carryover-list">' + remaining.map((item) => '<label class="sprint-carryover-row"><span><strong>' + esc(item.id) + '</strong> ' + esc(item.title) + '<small>' + esc(item.status) + '</small></span><select class="field-input" data-carryover-item="' + esc(item.id) + '"><option value="">Backlog’a çıkar</option>' + state.sprints.filter((candidate) => candidate.id !== sprintId).map((candidate) => '<option value="' + esc(candidate.id) + '">' + esc(candidate.name) + '</option>').join("") + '</select></label>').join("") + '</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-primary" data-action="save-sprint-carryover" data-sprint-id="' + esc(sprintId) + '">Kapanışı uygula</button></footer></div></section></div>';
}

function renderBacklog(): void {
  const project = state.projects.find((entry) => entry.id === activeProjectId);
  const scopedItems = getBacklogScopeItems();
  const scopedViews = savedBacklogViews.filter((view) => view.projectId === activeProjectId);
  const availableLabels = [...new Set(scopedItems.flatMap((item) => item.labels || []))].sort((left, right) => left.localeCompare(right, "tr-TR"));
  if (labelFilter && !availableLabels.includes(labelFilter)) labelFilter = "";
  const labelFilterOptions = '<select id="label-filter" aria-label="Etikete göre filtrele"><option value="">Tüm etiketler</option>' + availableLabels.map((label) => '<option value="' + esc(label) + '" ' + (labelFilter === label ? "selected" : "") + '>' + esc(label) + '</option>').join("") + '</select>';
  const savedViewOptions = '<option value="">Geçerli görünüm</option>' + [...scopedViews].sort((left, right) => Number(Boolean(right.pinned)) - Number(Boolean(left.pinned))).map((view) => '<option value="' + esc(view.id) + '" ' + (activeBacklogViewId === view.id ? "selected" : "") + '>' + (view.pinned ? "★ " : "") + esc(view.name) + '</option>').join("");
  const activeSavedView = scopedViews.find((view) => view.id === activeBacklogViewId);
  const currentViewState = JSON.stringify({ mode: backlogMode, query, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, searchScope: backlogSearchScope, columns: backlogColumns, sort: backlogSort });
  const savedViewState = activeSavedView ? JSON.stringify({ mode: activeSavedView.mode, query: activeSavedView.query, status: activeSavedView.status, type: activeSavedView.type, label: activeSavedView.label, teamId: activeSavedView.teamId, assignee: activeSavedView.assignee, sprintId: activeSavedView.sprintId || "", includeCompleted: activeSavedView.includeCompleted || false, searchScope: activeSavedView.searchScope || "all", columns: activeSavedView.columns, sort: normalizeBacklogSort(activeSavedView.sort === "manual" && activeSavedView.secondarySort && activeSavedView.secondarySort !== "manual" ? activeSavedView.secondarySort : activeSavedView.sort) }) : "";
  const viewDirty = Boolean(activeSavedView && currentViewState !== savedViewState);
  const activeFilterCount = [backlogStatus, backlogType, labelFilter, teamFilterId, assigneeFilter, backlogSprintId, backlogIncludeCompleted ? "completed" : ""].filter(Boolean).length;
  root.innerHTML = '<div class="page-content backlog-page backlog-density-' + backlogDensity + (backlogTitleWrap ? ' backlog-wrap-titles' : '') + '"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>' + esc(project?.name || "Genel") + '</div><div class="backlog-heading-line"><h1>' + esc(project ? project.name : "Backlog") + '</h1><p>' + (project ? "Bu projeye ait backlog işleri ve ürün kararları." : "İşlerini önceliklendir.") + '</p></div></div><div class="button-row">' + (project ? '<button class="button button-secondary" data-action="edit-project" data-project-id="' + esc(project.id) + '">Proje ayarları</button>' : "") + '<button class="button button-primary" data-action="new"><span class="button-plus">+</span> Yeni iş oluştur</button></div></section>' +
    '<div class="backlog-toolbar"><div class="backlog-toolbar-main"><div class="filter-group"><label class="filter-search"><span>⌕</span><input id="backlog-search" type="search" placeholder="Başlık, ID, açıklama veya bileşende ara…" value="' + esc(query) + '"></label><details class="backlog-filter-menu" name="backlog-menus"><summary aria-label="Filtreleri göster"><span class="filter-glyph">☷</span><span>Filtreler</span><b class="filter-count" ' + (activeFilterCount ? "" : "hidden") + '>' + activeFilterCount + '</b><span class="menu-chevron">⌄</span></summary><div class="backlog-filter-popover"><div class="filter-popover-heading"><strong>Hızlı filtreleme</strong><small>Sonuçları daralt</small></div><div class="backlog-filter-fields"><label class="backlog-filter-field"><span>Durum</span><select id="status-filter" aria-label="Duruma göre filtrele"><option value="">Tüm durumlar</option><option>Yeni</option><option>Analiz ediliyor</option><option>Hazır</option><option>Devam ediyor</option><option>Bloke</option><option>Tamamlandı</option></select></label><label class="backlog-filter-field"><span>Tür</span><select id="type-filter" aria-label="Türe göre filtrele"><option value="">Tüm türler</option><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="backlog-filter-field"><span>Etiket</span>' + labelFilterOptions + '</label><label class="backlog-filter-field"><span>Takım</span><select id="team-filter" aria-label="Takıma göre filtrele"><option value="">Tüm takımlar</option><option value="__unassigned">Takım atanmamış</option>' + state.teams.map((team) => '<option value="' + esc(team.id) + '" ' + (teamFilterId === team.id ? "selected" : "") + '>' + esc(team.name) + '</option>').join("") + '</select></label><label class="backlog-filter-field"><span>Sorumlu</span><select id="assignee-filter" aria-label="Sorumluya göre filtrele"></select></label><label class="backlog-filter-field"><span>Sprint</span><select id="sprint-filter" aria-label="Sprinte göre filtrele"><option value="">Tüm sprintler</option><option value="__unassigned" ' + (backlogSprintId === "__unassigned" ? "selected" : "") + '>Sprint atanmamış</option>' + (state.sprints || []).map((sprint) => '<option value="' + esc(sprint.id) + '" ' + (backlogSprintId === sprint.id ? "selected" : "") + '>' + esc(sprint.name) + '</option>').join("") + '</select></label><label class="completed-filter"><input id="include-completed" type="checkbox" ' + (backlogIncludeCompleted ? "checked" : "") + '> Tamamlananları göster</label></div></div></details></div></div></div>' +
    '<div class="backlog-filter-chips" hidden></div><div class="backlog-table-shell"><div class="backlog-table-topbar"><div class="backlog-table-topbar-left"><div class="view-tabs"><button class="view-tab selected" data-action="list">☷ Liste</button><button class="view-tab" data-action="kanban">▥ Board</button></div><div class="backlog-view-recents"></div></div><div class="backlog-table-topbar-right">' + (backlogMode === "list" ? '<button class="button ' + (readyWorkPool ? 'button-primary' : 'button-secondary') + ' button-small" data-action="toggle-ready-pool" aria-pressed="' + readyWorkPool + '">' + (readyWorkPool ? "✓ Hazır iş havuzu" : "Hazır iş havuzu") + '</button><details class="backlog-display-menu" name="backlog-menus"><summary class="button button-secondary button-small"><span aria-hidden="true">⚙</span> Görünüm <span aria-hidden="true">⌄</span></summary><div class="backlog-display-popover"><div class="backlog-view-saved"><select id="backlog-saved-view" aria-label="Kaydedilmiş backlog görünümü">' + savedViewOptions + '</select><button class="button button-secondary button-small" data-action="save-backlog-view">Kaydet</button>' + (activeBacklogViewId ? '<button class="button button-quiet button-small" data-action="update-backlog-view" data-view-id="' + esc(activeBacklogViewId) + '">' + (viewDirty ? 'Güncelle · Değişiklik var' : 'Güncelle') + '</button>' : '') + '<button class="button button-quiet button-small" data-action="manage-backlog-views">Yönet</button></div><div class="backlog-menu-divider"></div><label class="backlog-density-control"><span>Satır</span><select id="backlog-density" aria-label="Tablo satır yoğunluğu"><option value="compact">Kompakt</option><option value="standard">Standart</option><option value="comfortable">Rahat</option></select></label><label class="backlog-density-control"><span>Alt bilgi</span><select id="backlog-secondary-info" aria-label="Satır ikincil bilgisi"><option value="id">İş ID</option><option value="updated">Son güncelleme</option><option value="assignment">Atama</option><option value="none">Kapalı</option></select></label><button class="button button-quiet button-small" data-action="toggle-title-wrap" aria-pressed="' + backlogTitleWrap + '">' + (backlogTitleWrap ? "Başlıkları tek satır yap" : "Başlıkları kaydır") + '</button><button class="button button-quiet button-small" data-action="manage-backlog-columns">Kolonlar</button><button class="button button-quiet button-small" data-action="toggle-backlog-preview" aria-pressed="' + backlogPreviewEnabled + '" title="Başlık önizlemesini aç veya kapat">' + (backlogPreviewEnabled ? "Önizleme açık" : "Önizleme kapalı") + '</button><button class="button button-quiet button-small" data-action="autofit-columns">Kolonları sığdır</button></div></details><details class="backlog-actions-menu" name="backlog-menus"><summary class="button button-secondary button-small"><span aria-hidden="true">⋯</span> Tablo işlemleri <span aria-hidden="true">⌄</span></summary><div class="backlog-action-popover"><button class="button button-secondary button-small" data-action="backlog-export-excel">Excel’e aktar</button><button class="button button-secondary button-small" data-action="backlog-import-excel">Excel’den içe aktar</button><button class="button button-primary button-small" data-action="create-sprint" ' + (getSelectedBacklogItems().length ? "" : "disabled") + '>Sprint oluştur' + (getSelectedBacklogItems().length ? ' · ' + getSelectedBacklogItems().length : '') + '</button><button class="button button-danger button-small" data-action="delete-selected-backlog" ' + (getSelectedBacklogItems().length ? "" : "disabled") + '>Seçilileri sil' + (getSelectedBacklogItems().length ? ' · ' + getSelectedBacklogItems().length : '') + '</button></div></details>' : '') + '</div></div><div class="backlog-table-wrap"><table class="backlog-table"><thead><tr><th>İŞ</th><th>TÜR</th><th>ALAN</th><th>ÖNCELİK</th><th>DURUM</th><th>GÜNCELLENDİ</th><th></th></tr></thead><tbody id="backlog-rows"></tbody></table></div><div class="backlog-summary backlog-summary-footer"><span><strong id="visible-count">' + scopedItems.length + '</strong> / <strong id="total-count">' + state.items.filter((item) => !project || item.project === project.name).length + '</strong> iş</span><span class="summary-dot">·</span><span><i class="legend-dot indigo"></i>' + scopedItems.filter((item) => item.status === "Hazır").length + ' hazır</span><span><i class="legend-dot rose"></i>' + scopedItems.filter((item) => item.status === "Bloke").length + ' bloke</span><span class="summary-right">Son güncelleme: bugün 10:42</span></div></div><div class="backlog-bottom"><span>Gösterilen işler PO çalışma alanında saklanır.</span><div class="backlog-inline-add"><input id="backlog-quick-title" maxlength="120" placeholder="Başlık yaz ve hızlıca ekle…" aria-label="Yeni backlog işi başlığı"><button type="button" class="button button-secondary button-small" data-action="quick-add-backlog">＋ Ekle</button><button type="button" class="button button-quiet button-small" data-action="new">Form</button></div></div></div>';
  if (project) {
    const assignedMembers = (project.assignments || []).map((assignment) => {
      const teamName = state.teams.find((team) => team.id === assignment.teamId)?.name || "Takım";
      return '<span class="project-member-chip">' + esc(assignment.member) + '<small>' + esc(teamName + (assignment.scope ? " · " + assignment.scope : "")) + '</small></span>';
    }).join("");
    root.querySelector(".backlog-toolbar")?.insertAdjacentHTML("beforebegin", '<div class="project-team-strip"><div><strong>Proje ekibi</strong><small>' + (assignedMembers ? "Bu projeye atanmış kişiler" : "Henüz proje üyesi atanmadı") + '</small></div><div class="project-member-chips">' + (assignedMembers || '<span class="project-member-empty">Projeye kişi atamak için Proje ayarları’nı aç.</span>') + '</div></div>');
  }
  const selectedBacklogItems = getSelectedBacklogItems();
  if (recentBacklogFilters.length) root.querySelector(".backlog-view-recents")?.insertAdjacentHTML("beforeend", '<select id="backlog-recent-filter" aria-label="Son kullanılan filtreler"><option value="">Son filtreler</option>' + recentBacklogFilters.map((filter, index) => { const label = [filter.query ? '“' + filter.query + '”' : "", filter.status, filter.type, filter.label, filter.teamId ? state.teams.find((team) => team.id === filter.teamId)?.name || "Takım" : "", filter.assignee.split("::")[1] || "", filter.sprintId ? filter.sprintId === "__unassigned" ? "Sprint atanmamış" : state.sprints.find((sprint) => sprint.id === filter.sprintId)?.name || "Sprint" : "", filter.includeCompleted ? "Tamamlananlar dahil" : ""].filter(Boolean).join(" · ") || "Filtre"; return '<option value="' + index + '">' + esc(label) + '</option>'; }).join("") + '</select>');
  const recentItems = recentItemIds.map((id) => itemById(id)).filter((item): item is WorkItem => Boolean(item));
  if (recentItems.length) root.querySelector(".backlog-view-recents")?.insertAdjacentHTML("beforeend", '<select id="backlog-recent-item" aria-label="Son açılan işler"><option value="">Son açılan işler</option>' + recentItems.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select>');
  const bulkStatusOptions = '<option value="">Seçililere durum ata</option>' + ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Tamamlandı"].map((status) => '<option value="' + status + '">' + status + '</option>').join("");
  const bulkAssigneeOptions = '<option value="">Seçililere kişi ata</option>' + state.teams.flatMap((team) => team.members.map((member) => '<option value="' + esc(team.id + "::" + member) + '">' + esc(team.name + " · " + member) + '</option>')).join("");
  root.querySelector(".backlog-toolbar-actions")?.insertAdjacentHTML("afterbegin", selectedBacklogItems.length ? '<select class="bulk-action-select" id="bulk-status" aria-label="Seçili işlerin durumunu değiştir">' + bulkStatusOptions + '</select><select class="bulk-action-select" id="bulk-assignment" aria-label="Seçili işlere kişi ata">' + bulkAssigneeOptions + '</select><select class="bulk-action-select" id="bulk-project" aria-label="Seçili işleri projeye taşı"><option value="">Projeye taşı…</option>' + state.projects.filter((project) => !project.archived).map((project) => '<option value="' + esc(project.name) + '">' + esc(project.name) + '</option>').join("") + '</select><button class="button button-quiet button-small" data-action="bulk-labels">Etiketleri düzenle</button><button class="button button-quiet button-small" data-action="bulk-remove-sprint">Sprintten çıkar</button>' : "");
  if (selectedBacklogItems.length) root.querySelector("#bulk-project")?.insertAdjacentHTML("afterend", '<select class="bulk-action-select" id="bulk-release" aria-label="Seçili işleri release kapsamına al"><option value="">Release kapsamına al…</option><option value="__none">Release atamasını kaldır</option>' + state.releases.filter((release) => selectedBacklogItems.every((item) => item.project === release.project)).map((release) => '<option value="' + esc(release.id) + '">' + esc(release.name) + '</option>').join("") + '</select>');
  const densitySelect = root.querySelector<HTMLSelectElement>("#backlog-density");
  if (densitySelect) densitySelect.value = backlogDensity;
  const secondaryInfoSelect = root.querySelector<HTMLSelectElement>("#backlog-secondary-info");
  if (secondaryInfoSelect) secondaryInfoSelect.value = backlogSecondaryInfo;
  root.querySelector(".backlog-filter-popover")?.insertAdjacentHTML("beforeend", '<label class="backlog-filter-field"><span>Arama kapsamı</span><select id="backlog-search-scope" aria-label="Arama kapsamı"><option value="all">Tüm alanlarda ara</option><option value="title">Başlıkta ara</option><option value="description">Açıklamada ara</option><option value="id">İş ID’sinde ara</option><option value="labels">Etiketlerde ara</option><option value="components">Bileşenlerde ara</option></select></label>');
  (document.getElementById("backlog-search-scope") as HTMLSelectElement).value = backlogSearchScope;
  (document.getElementById("status-filter") as HTMLSelectElement).value = backlogStatus;
  (document.getElementById("type-filter") as HTMLSelectElement).value = backlogType;
  (document.getElementById("label-filter") as HTMLSelectElement).value = labelFilter;
  const headerRow = root.querySelector(".backlog-table thead tr");
  if (headerRow) headerRow.innerHTML = renderBacklogSelectionHeader() + renderBacklogSortHeader("title", "İŞ") + backlogColumns.map((id) => renderBacklogSortHeader(id, BACKLOG_COLUMN_CATALOG.find((column) => column.id === id)?.label.toLocaleUpperCase("tr-TR") || id)).join("") + backlogActionColumns();
  root.querySelectorAll<HTMLElement>(".view-tab").forEach((tab) => tab.classList.toggle("selected", (tab.dataset.action === "kanban" ? "board" : "list") === backlogMode));
  refreshBacklogAssigneeFilter();
  const tableWrap = root.querySelector<HTMLElement>(".backlog-table-wrap");
  if (backlogMode === "board" && tableWrap) tableWrap.outerHTML = '<div class="board-hint">Kartı durum sütunları arasında sürükleyerek statüsünü güncelle.</div><div class="board-wrap" id="board-wrap" aria-label="Backlog durum panosu"></div>';
  updateBacklogRows();
}

function renderBacklogSelectionHeader(): string {
  return '<th class="backlog-select-heading"><input type="checkbox" data-select-visible-backlog aria-label="Görünen tüm işleri seç" title="Görünen tümünü seç"></th>';
}

function renderBacklogSortHeader(column: "title" | BacklogColumnId, label: string): string {
  const current = sortState();
  const active = current?.column === column;
  const direction = active ? current.direction : "";
  const arrow = direction === "asc" ? "⌃" : direction === "desc" ? "⌄" : "≡";
  const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
  return '<th data-backlog-column="' + column + '" aria-sort="' + ariaSort + '"><div class="backlog-sort-heading"><button type="button" class="backlog-sort-button ' + (active ? "sorted" : "") + '" data-sort-column="' + column + '" aria-label="' + esc(label) + ' kolonuna göre sırala' + (active ? (direction === "asc" ? ", artan" : ", azalan") : "") + '" title="Tıklayarak ' + (active ? (direction === "asc" ? "azalan" : "artan") : "artan") + ' sırala">' + label + '<span aria-hidden="true">' + arrow + '</span></button></div></th>';
}

function updateBacklogSortHeaders(): void {
  const headerRow = root.querySelector(".backlog-table thead tr");
  if (!headerRow) return;
  headerRow.innerHTML = renderBacklogSelectionHeader() + renderBacklogSortHeader("title", "İŞ") + backlogColumns.map((id) => renderBacklogSortHeader(id, BACKLOG_COLUMN_CATALOG.find((column) => column.id === id)?.label.toLocaleUpperCase("tr-TR") || id)).join("") + backlogActionColumns();
}

function applyBacklogColumnWidths(): void {
  const table = root.querySelector<HTMLTableElement>(".backlog-table");
  if (!table) return;
  const keys = ["selection", "title", ...backlogColumns, "editAction", "duplicateAction", "deleteAction"];
  table.querySelectorAll<HTMLTableCellElement>("thead th").forEach((header, index) => {
    const width = backlogColumnWidths[keys[index]];
    if (!width) return;
    header.style.width = width + "px";
    table.querySelectorAll<HTMLTableRowElement>("tbody tr").forEach((row) => { const cell = row.cells[index]; if (cell) cell.style.width = width + "px"; });
  });
}

function updateBacklogRows(): void {
  for (const id of selectedBacklogItemIds) if (!state.items.some((item) => item.id === id)) selectedBacklogItemIds.delete(id);
  const status = backlogStatus;
  const filterCount = [backlogStatus, backlogType, labelFilter, teamFilterId, assigneeFilter, backlogSprintId, backlogIncludeCompleted ? "completed" : ""].filter(Boolean).length;
  const filterCountBadge = root.querySelector<HTMLElement>(".filter-count");
  if (filterCountBadge) { filterCountBadge.textContent = String(filterCount); filterCountBadge.hidden = filterCount === 0; }
  const type = backlogType;
  const label = labelFilter;
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const project = state.projects.find((entry) => entry.id === activeProjectId);
  const items = sortBacklogItems(state.items.filter((item) => {
    const assignments = getWorkAssignments(item);
    const matchesTeam = !teamFilterId || (teamFilterId === "__unassigned" ? !assignments.length : assignments.some((assignment) => assignment.teamId === teamFilterId));
    const [filteredTeamId, filteredMember] = assigneeFilter.split("::");
    const matchesAssignee = !assigneeFilter || (assigneeFilter === "__unassigned" ? !assignments.length : assignments.some((assignment) => assignment.teamId === filteredTeamId && assignment.member === filteredMember));
    const matchesSprint = !backlogSprintId || (backlogSprintId === "__unassigned" ? !item.sprintId : item.sprintId === backlogSprintId);
    const assetTerms = (item.assetIds || []).map((id) => state.assets.find((asset) => asset.id === id)).filter((asset): asset is ProductAsset => Boolean(asset)).map((asset) => asset.code + " " + asset.name);
    const queryFields: Record<BacklogSearchScope, string> = { all: [item.title, item.id, item.area, item.description, (item.labels || []).join(" "), assetTerms.join(" ")].join(" "), title: item.title, description: item.description, id: item.id, labels: (item.labels || []).join(" "), components: assetTerms.join(" ") };
    const matchesQuery = !normalizedQuery || queryFields[backlogSearchScope].toLocaleLowerCase("tr-TR").includes(normalizedQuery);
    const ready = item.status !== "Tamamlandı" && item.status !== "Bloke" && (item.acceptance || []).some((criterion) => criterion.trim()) && !(item.dependsOnIds || []).some((id) => { const dependency = itemById(id); return Boolean(dependency && dependency.status !== "Tamamlandı"); });
    const completedIsVisible = backlogIncludeCompleted || status === "Tamamlandı" || item.status !== "Tamamlandı";
    return (!project || item.project === project.name) && completedIsVisible && (!status || item.status === status) && (!type || item.type === type) && (!label || (item.labels || []).includes(label)) && matchesTeam && matchesAssignee && matchesSprint && matchesQuery && (!readyWorkPool || ready);
  }));
  const board = document.getElementById("board-wrap");
  if (board) {
    const columns = ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"];
    board.innerHTML = columns.map((column) => {
      const cards = items.filter((item) => item.status === column);
      return '<section class="board-column" data-board-status="' + esc(column) + '"><header><span><i class="board-status-dot ' + statusClass(column) + '"></i>' + esc(column) + '</span><b>' + cards.length + '</b></header><div class="board-cards">' + (cards.length ? cards.map((item) => '<button class="board-card" draggable="true" data-board-card="' + esc(item.id) + '" data-open-item="' + esc(item.id) + '" aria-label="' + esc(item.id + " · " + item.title + " · " + item.status + ". Durumu değiştirmek için başka bir sütuna sürükleyin.") + '"><span class="board-card-id"><span class="board-card-key">' + esc(item.id) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span></span><strong class="backlog-preview-trigger" data-preview-item="' + esc(item.id) + '" tabindex="0" aria-haspopup="dialog">' + esc(item.title) + '</strong><span class="board-card-footer"><span>' + esc(item.area) + '</span><span class="board-assignment">' + (getWorkAssignments(item).length ? esc(assignmentSummary(item)) : "") + '</span><span class="table-type ' + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type") + '">' + itemIcon(item.type) + '</span></span></button>').join("") : '<div class="board-empty">Henüz iş yok</div>') + '</div></section>';
    }).join("");
    (document.getElementById("visible-count") as HTMLElement).textContent = String(items.length);
    (document.getElementById("total-count") as HTMLElement).textContent = String(state.items.filter((item) => !project || item.project === project.name).length);
    renderActiveBacklogFilterChips();
    updateSavedBacklogViewDirtyIndicator();
    return;
  }
  const tbody = document.getElementById("backlog-rows");
  if (!tbody) return;
  (document.getElementById("visible-count") as HTMLElement).textContent = String(items.length);
  (document.getElementById("total-count") as HTMLElement).textContent = String(state.items.filter((item) => !project || item.project === project.name).length);
  renderActiveBacklogFilterChips();
  closeBacklogPreview();
  tbody.innerHTML = items.map((item) => '<tr data-open-item="' + esc(item.id) + '" ' + (backlogSort === "manual" ? 'draggable="true" class="backlog-reorder-row"' : '') + '>' + renderBacklogSelectionCell(item) + renderBacklogTitleCell(item) + backlogColumns.map((column) => renderBacklogCell(item, column)).join("") + backlogActionColumns(item.id) + '</tr>').join("") || '<tr><td colspan="' + (backlogColumns.length + 5) + '" class="empty-table">Bu filtrelerle eşleşen iş yok.</td></tr>';
  applyBacklogColumnWidths();
  if (!items.length) { const empty = tbody.querySelector(".empty-table"); if (empty) empty.innerHTML = 'Bu filtrelerle eşleşen iş yok.<br><button type="button" class="button button-quiet button-small" data-action="clear-backlog-filters">Filtreleri temizle</button>'; }
  const visibleSelector = root.querySelector<HTMLInputElement>("[data-select-visible-backlog]");
  const selectedVisible = items.filter((item) => selectedBacklogItemIds.has(item.id)).length;
  if (visibleSelector) { visibleSelector.checked = items.length > 0 && selectedVisible === items.length; visibleSelector.indeterminate = selectedVisible > 0 && selectedVisible < items.length; }
  root.querySelectorAll<HTMLInputElement>("[data-select-backlog-item]").forEach((checkbox) => { checkbox.checked = selectedBacklogItemIds.has(checkbox.dataset.selectBacklogItem || ""); });
  const selectedCount = getSelectedBacklogItems().length;
  const sprintButton = root.querySelector<HTMLButtonElement>('[data-action="create-sprint"]');
  if (sprintButton) { sprintButton.disabled = selectedCount === 0; sprintButton.textContent = "Sprint oluştur" + (selectedCount ? " · " + selectedCount : ""); }
  const deleteButton = root.querySelector<HTMLButtonElement>('[data-action="delete-selected-backlog"]');
  if (deleteButton) { deleteButton.disabled = selectedCount === 0; deleteButton.textContent = "Seçilileri sil" + (selectedCount ? " · " + selectedCount : ""); }
  updateSavedBacklogViewDirtyIndicator();
}

function renderActiveBacklogFilterChips(): void {
  const host = root.querySelector<HTMLElement>(".backlog-filter-chips");
  if (!host) return;
  const chips: [string, string][] = [];
  if (query.trim()) chips.push(["query", "Arama: " + query.trim()]);
  if (backlogStatus) chips.push(["status", "Durum: " + backlogStatus]);
  if (backlogType) chips.push(["type", "Tür: " + backlogType]);
  if (labelFilter) chips.push(["label", "Etiket: " + labelFilter]);
  if (teamFilterId) chips.push(["team", "Takım: " + (teamFilterId === "__unassigned" ? "Atanmamış" : state.teams.find((team) => team.id === teamFilterId)?.name || "Seçili")]);
  if (assigneeFilter) { const [, member] = assigneeFilter.split("::"); chips.push(["assignee", "Üye: " + (assigneeFilter === "__unassigned" ? "Atanmamış" : member || "Seçili")]); }
  if (backlogSprintId) chips.push(["sprint", "Sprint: " + (backlogSprintId === "__unassigned" ? "Atanmamış" : state.sprints.find((sprint) => sprint.id === backlogSprintId)?.name || "Silinmiş sprint")]);
  if (backlogIncludeCompleted) chips.push(["completed", "Tamamlananlar dahil"]);
  host.innerHTML = chips.length ? '<span class="backlog-filter-chips-label">Etkin filtreler</span>' + chips.map(([key, label]) => '<button type="button" class="backlog-filter-chip" data-remove-backlog-filter="' + key + '">' + esc(label) + ' <span aria-hidden="true">×</span></button>').join("") : "";
  host.hidden = chips.length === 0;
}

function updateSavedBacklogViewDirtyIndicator(): void {
  if (!activeBacklogViewId) return;
  const view = savedBacklogViews.find((entry) => entry.id === activeBacklogViewId && entry.projectId === activeProjectId);
  const button = root.querySelector<HTMLButtonElement>('[data-action="update-backlog-view"]');
  if (!view || !button) return;
  const current = JSON.stringify({ mode: backlogMode, query, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, searchScope: backlogSearchScope, columns: backlogColumns, sort: backlogSort });
  const saved = JSON.stringify({ mode: view.mode, query: view.query, status: view.status, type: view.type, label: view.label, teamId: view.teamId, assignee: view.assignee, sprintId: view.sprintId || "", includeCompleted: view.includeCompleted || false, searchScope: view.searchScope || "all", columns: view.columns, sort: normalizeBacklogSort(view.sort === "manual" && view.secondarySort && view.secondarySort !== "manual" ? view.secondarySort : view.sort) });
  button.textContent = "Görünümü güncelle" + (current === saved ? "" : " · Değişiklik var");
}

function renderBacklogTitleCell(item: WorkItem): string {
  const secondary = backlogSecondaryInfo === "id" ? item.id : backlogSecondaryInfo === "updated" ? item.updated || "Güncelleme yok" : backlogSecondaryInfo === "assignment" ? assigneeSummary(item) : "";
  const waitingDays = workItemWaitingDays(item);
  const agingSummary = backlogSort === "aging-desc" ? '<span class="backlog-aging-summary">' + (waitingDays === null ? "Bekleme süresi bilinmiyor" : waitingDays + ' gündür bekliyor') + ' · Son karar ' + esc(workItemLastDecision(item)) + '</span>' : '';
  const editing = inlineBacklogEdit?.itemId === item.id && inlineBacklogEdit.field === "title";
  const editingType = inlineBacklogEdit?.itemId === item.id && inlineBacklogEdit.field === "type";
  if (editing) return '<td><div class="inline-backlog-edit inline-title-editor" data-inline-zone><input class="field-input" data-inline-title="' + esc(item.id) + '" maxlength="120" value="' + esc(item.title) + '" aria-label="İş başlığı"><button type="button" class="inline-icon-action inline-icon-confirm" data-inline-action="save-title" data-item-id="' + esc(item.id) + '" aria-label="Başlığı kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-inline-action="cancel" aria-label="Düzenlemeyi iptal et" title="İptal">×</button></div><small class="inline-title-id">' + esc(item.id) + '</small></td>';
  const typeControl = editingType
    ? '<span class="inline-type-editor" data-inline-zone><select class="field-input" data-inline-type="' + esc(item.id) + '" aria-label="İş türü seç">' + (["Story", "Bug", "Task"] as WorkItem["type"][]).map((type) => '<option ' + (type === item.type ? "selected" : "") + '>' + type + '</option>').join("") + '</select><button type="button" class="inline-icon-action inline-icon-confirm" data-inline-action="save-type" data-item-id="' + esc(item.id) + '" aria-label="Türü kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-inline-action="cancel" aria-label="Tür düzenlemeyi iptal et" title="İptal">×</button></span>'
    : '<button type="button" class="backlog-type-edit" data-inline-action="edit-type" data-item-id="' + esc(item.id) + '" aria-label="İş türünü değiştir: ' + esc(item.type) + '" title="Türü değiştirmek için tıkla">' + itemTypeIcon(item.type) + '</button>';
  return '<td><div class="table-title">' + typeControl + '<span class="backlog-title-cell"><button type="button" class="backlog-title-open backlog-preview-trigger" data-open-item="' + esc(item.id) + '" data-preview-item="' + esc(item.id) + '" aria-haspopup="dialog" aria-label="' + esc("İşi aç: " + item.title) + '">' + highlightBacklogText(item.title) + '</button><button type="button" class="inline-edit-button" data-inline-action="edit-title" data-item-id="' + esc(item.id) + '" aria-label="Başlığı düzenle" title="Başlığı düzenle">✎</button><small>' + (secondary ? esc(secondary) : "") + (item.attachments?.length ? ' <span class="attachment-indicator">▤ ' + item.attachments.length + '</span>' : "") + '</small>' + agingSummary + '</span></div></td>';
}

function renderBacklogSelectionCell(item: WorkItem): string {
  return '<td class="backlog-select-cell"><input type="checkbox" class="backlog-row-select" data-select-backlog-item="' + esc(item.id) + '" aria-label="' + esc(item.id + " işini seç") + '" ' + (selectedBacklogItemIds.has(item.id) ? "checked" : "") + '></td>';
}

function highlightBacklogText(value: string): string {
  const term = query.trim();
  if (!term) return esc(value);
  const index = value.toLocaleLowerCase("tr-TR").indexOf(term.toLocaleLowerCase("tr-TR"));
  if (index < 0) return esc(value);
  return esc(value.slice(0, index)) + '<mark class="search-match">' + esc(value.slice(index, index + term.length)) + '</mark>' + esc(value.slice(index + term.length));
}

function renderInlineStatusCell(item: WorkItem): string {
  const editing = inlineBacklogEdit?.itemId === item.id && inlineBacklogEdit.field === "status";
  if (editing) return '<div class="inline-backlog-edit inline-status-editor" data-inline-zone><select class="field-input" data-inline-status="' + esc(item.id) + '" aria-label="Durum seç">' + (["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"] as WorkStatus[]).map((status) => '<option ' + (status === item.status ? "selected" : "") + '>' + esc(status) + '</option>').join("") + '</select><button type="button" class="inline-icon-action inline-icon-confirm" data-inline-action="save-status" data-item-id="' + esc(item.id) + '" aria-label="Durumu kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-inline-action="cancel" aria-label="Düzenlemeyi iptal et" title="İptal">×</button></div>';
  return '<button type="button" class="inline-cell-edit" data-inline-action="edit-status" data-item-id="' + esc(item.id) + '" aria-label="' + esc("Durumu düzenle: " + item.status) + '"><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span><span class="inline-pencil">✎</span></button>';
}

function renderInlineAssignmentCell(item: WorkItem): string {
  const editing = inlineBacklogEdit?.itemId === item.id && inlineBacklogEdit.field === "assignment";
  if (!editing) return '<button type="button" class="inline-cell-edit inline-assignment-display" data-inline-action="edit-assignment" data-item-id="' + esc(item.id) + '" aria-label="Sorumluları düzenle"><span>' + esc(assigneeSummary(item)) + '</span><span class="inline-pencil">✎</span></button>';
  const assignments = getWorkAssignments(item);
  const memberListId = "inline-assignment-member-options-" + esc(item.id);
  return '<div class="inline-assignment-editor" data-inline-zone><div class="inline-assignment-add"><input class="field-input" data-inline-member="' + esc(item.id) + '" list="' + memberListId + '" aria-label="Üye ara ve ata" placeholder="Üye ara…" autocomplete="off" ' + (state.teams.some((team) => team.members.length) ? "" : "disabled") + '><datalist id="' + memberListId + '">' + assignmentMemberSearchOptions() + '</datalist><input type="hidden" data-inline-team="' + esc(item.id) + '"><input class="field-input" data-inline-scope="' + esc(item.id) + '" maxlength="100" placeholder="Alan (isteğe bağlı)" aria-label="Sorumluluk alanı"><button type="button" class="inline-icon-action inline-icon-confirm" data-inline-action="add-assignment" data-item-id="' + esc(item.id) + '" aria-label="Atama ekle" title="Atama ekle">✓</button></div><div class="inline-assignment-list">' + (assignments.length ? assignments.map((assignment, index) => '<div><span>' + esc(assignment.member + (assignment.scope ? " · " + assignment.scope : "")) + '</span><button type="button" class="inline-icon-action inline-icon-remove" data-inline-action="remove-assignment" data-item-id="' + esc(item.id) + '" data-assignment-index="' + index + '" aria-label="' + esc(assignment.member + " atamasını kaldır") + '" title="Atamayı kaldır">×</button></div>').join("") : '<small>Henüz sorumlu atanmadı.</small>') + '</div><button type="button" class="inline-icon-action inline-icon-dismiss" data-inline-action="cancel" aria-label="Atama düzenlemeyi kapat" title="Kapat">×</button></div>';
}

function openInlineBacklogEdit(itemId: string, field: "title" | "status" | "assignment" | "type"): void {
  inlineBacklogEdit = { itemId, field };
  updateBacklogRows();
  if (field === "title") {
    const input = root.querySelector<HTMLInputElement>('[data-inline-title="' + CSS.escape(itemId) + '"]');
    input?.focus(); input?.select();
  } else if (field === "type") root.querySelector<HTMLSelectElement>('[data-inline-type="' + CSS.escape(itemId) + '"]')?.focus();
}

function commitInlineTitle(itemId: string): void {
  const item = itemById(itemId);
  const input = root.querySelector<HTMLInputElement>('[data-inline-title="' + CSS.escape(itemId) + '"]');
  const title = input?.value.trim() || "";
  if (!item || !title) { toast("Başlık boş olamaz."); input?.focus(); return; }
  if (title !== item.title) {
    const previous = item.title;
    item.title = title;
    item.updated = "Az önce";
    logWorkChange(item, "Başlık", previous, title);
    save();
  }
  inlineBacklogEdit = null;
  updateBacklogRows();
  toast("Başlık güncellendi.");
}

function commitInlineStatus(itemId: string): void {
  const item = itemById(itemId);
  const select = root.querySelector<HTMLSelectElement>('[data-inline-status="' + CSS.escape(itemId) + '"]');
  if (!item || !select) return;
  const nextStatus = select.value as WorkStatus;
  if (nextStatus === item.status) { inlineBacklogEdit = null; updateBacklogRows(); return; }
  inlineBacklogEdit = null;
  if (nextStatus === "Bloke") { updateBacklogRows(); openStatusUpdateModal(item.id, nextStatus, true); return; }
  applyWorkStatus(item, nextStatus, item.blocker);
  item.updated = "Az önce";
  save();
  updateBacklogRows();
  toast("İşin durumu güncellendi.");
}

function commitInlineType(itemId: string): void {
  const item = itemById(itemId);
  const select = root.querySelector<HTMLSelectElement>('[data-inline-type="' + CSS.escape(itemId) + '"]');
  if (!item || !select) return;
  const nextType = select.value as WorkItem["type"];
  if (nextType !== item.type) {
    const previous = item.type;
    item.type = nextType;
    item.updated = "Az önce";
    logWorkChange(item, "Tür", previous, nextType);
    save();
  }
  inlineBacklogEdit = null;
  updateBacklogRows();
  toast("İş türü güncellendi.");
}

function commitInlineAssignment(itemId: string, change: { removeIndex?: number; add?: WorkAssignment }): void {
  const item = itemById(itemId);
  if (!item) return;
  const before = getWorkAssignments(item).map((assignment) => ({ ...assignment }));
  let next = [...before];
  if (change.removeIndex != null) next.splice(change.removeIndex, 1);
  if (change.add) {
    if (next.some((entry) => entry.teamId === change.add?.teamId && entry.member === change.add.member)) { toast("Bu kişi işe zaten atanmış."); return; }
    next.push(change.add);
  }
  next = validAssignments(next);
  item.assignments = next;
  syncLegacyAssignmentFields(item);
  item.updated = "Az önce";
  const describe = (assignments: WorkAssignment[]) => assignments.map((assignment) => (state.teams.find((team) => team.id === assignment.teamId)?.name || "Takım") + " · " + assignment.member + (assignment.scope ? " (" + assignment.scope + ")" : "")).join("; ") || "Atama yok";
  addWorkActivity(item, "change", "Atama: " + describe(before) + " → " + describe(next));
  save();
  updateBacklogRows();
  toast(change.add ? "Atama eklendi." : "Atama kaldırıldı.");
}

function commitActiveInlineEditOnOutsideClick(): boolean {
  const edit = inlineBacklogEdit;
  if (!edit) return true;
  if (edit.field === "title") {
    const input = root.querySelector<HTMLInputElement>('[data-inline-title="' + CSS.escape(edit.itemId) + '"]');
    if (!input?.value.trim()) { commitInlineTitle(edit.itemId); return false; }
    commitInlineTitle(edit.itemId);
    return true;
  }
  if (edit.field === "status") {
    const select = root.querySelector<HTMLSelectElement>('[data-inline-status="' + CSS.escape(edit.itemId) + '"]');
    const opensBlockerDialog = select?.value === "Bloke" && itemById(edit.itemId)?.status !== "Bloke";
    commitInlineStatus(edit.itemId);
    return !opensBlockerDialog;
  }
  if (edit.field === "type") {
    commitInlineType(edit.itemId);
    return true;
  }

  const memberInput = root.querySelector<HTMLInputElement>('[data-inline-member="' + CSS.escape(edit.itemId) + '"]');
  const teamInput = root.querySelector<HTMLInputElement>('[data-inline-team="' + CSS.escape(edit.itemId) + '"]');
  const scopeInput = root.querySelector<HTMLInputElement>('[data-inline-scope="' + CSS.escape(edit.itemId) + '"]');
  const member = memberInput?.value.trim() || "";
  const scope = scopeInput?.value.trim() || "";
  if (!member && !scope) {
    inlineBacklogEdit = null;
    updateBacklogRows();
    return true;
  }
  const teamId = assignmentTeamForMember(member, teamInput?.value || "");
  if (!member || !teamId) {
    toast("Atamak için takım üyesini arayıp seç.");
    memberInput?.focus();
    return false;
  }
  commitInlineAssignment(edit.itemId, { add: { teamId, member, ...(scope ? { scope } : {}) } });
  inlineBacklogEdit = null;
  updateBacklogRows();
  return true;
}

function renderBacklogCell(item: WorkItem, column: BacklogColumnId): string {
  const release = state.releases.find((entry) => entry.id === item.releaseId);
  const sprint = state.sprints.find((entry) => entry.id === item.sprintId);
  const sprintTeam = sprint ? state.teams.find((entry) => entry.id === sprint.teamId)?.name || "Takım silinmiş" : "";
  const assets = (item.assetIds || []).map((id) => state.assets.find((asset) => asset.id === id)?.code || id).join(", ");
  const activity = item.activity?.[0];
  const values: Record<BacklogColumnId, string> = {
    type: '<button type="button" class="backlog-type-edit" data-inline-action="edit-type" data-item-id="' + esc(item.id) + '" aria-label="İş türünü değiştir: ' + esc(item.type) + '" title="Türü değiştirmek için tıkla">' + itemTypeIcon(item.type) + '</button>',
    area: '<span class="area-label">' + esc(item.area || "—") + '</span>',
    priority: '<span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span>',
    status: renderInlineStatusCell(item),
    updated: '<span class="updated-label">' + esc(item.updated || "—") + '</span>',
    assignment: renderInlineAssignmentCell(item),
    project: '<span>' + esc(item.project || "—") + '</span>',
    description: '<span class="backlog-cell-truncate" title="' + esc(item.description || "") + '">' + esc(item.description || "—") + '</span>',
    labels: '<span class="backlog-cell-truncate">' + esc((item.labels || []).join(", ") || "—") + '</span>',
    startDate: '<span>' + esc(item.startDate || item.actualStartDate || "—") + '</span>',
    targetDate: '<span>' + esc(item.targetDate || "—") + '</span>',
    targetPeriod: '<span>' + esc(item.targetPeriod || "—") + '</span>',
    estimate: '<span>' + esc(item.estimate == null ? "—" : item.estimate + " saat") + '</span>',
    productStage: '<span>' + esc(item.productStage || "—") + '</span>',
    release: '<span class="backlog-cell-truncate">' + esc(release?.name || "—") + '</span>',
    sprint: sprint ? '<span class="backlog-sprint-cell"><strong>' + esc(sprint.name) + '</strong><small>' + esc(sprintTeam + ' · ' + sprint.startDate + ' – ' + sprint.endDate) + '</small></span>' : '<span>—</span>',
    assets: '<span class="backlog-cell-truncate">' + esc(assets || "—") + '</span>',
    attachments: '<span>' + (item.attachments?.length || 0) + '</span>',
    acceptance: '<span>' + (item.acceptance?.length || 0) + '</span>',
    dependencies: '<span class="backlog-cell-truncate">' + esc((item.dependsOnIds || []).join(", ") || "—") + '</span>',
    blocker: '<span class="backlog-cell-truncate" title="' + esc(item.blocker?.reason || "") + '">' + esc(item.blocker?.reason || "—") + '</span>',
    activity: activity
      ? '<span class="activity-cell-content" title="' + esc(activity.message + " · " + activity.actor + " · " + elapsedLabel(activity.occurredAt)) + '"><span>' + esc(activity.message) + '</span><small>' + esc(activity.actor + " · " + elapsedLabel(activity.occurredAt)) + '</small></span>'
      : '<span class="activity-cell-empty">Henüz aktivite yok</span>'
  };
  return '<td class="backlog-cell backlog-cell-' + column + '">' + values[column] + '</td>';
}

function renderBacklogColumnManager(): void {
  const ordered = [...backlogColumnDraft, ...BACKLOG_COLUMN_CATALOG.map((column) => column.id).filter((id) => !backlogColumnDraft.includes(id))];
  const rows = ordered.map((id) => {
    const index = backlogColumnDraft.indexOf(id);
    const enabled = index >= 0;
    const label = BACKLOG_COLUMN_CATALOG.find((column) => column.id === id)?.label || id;
    return '<div class="backlog-column-option ' + (enabled ? "enabled" : "") + '" data-column-order="' + id + '" draggable="' + enabled + '"><label><span class="column-drag-handle" aria-hidden="true">⠿</span><input type="checkbox" data-backlog-column-toggle="' + id + '" ' + (enabled ? "checked" : "") + '><span>' + esc(label) + '</span></label><div><button type="button" class="button button-quiet button-small" data-action="move-backlog-column" data-direction="up" data-column-id="' + id + '" ' + (!enabled || index === 0 ? "disabled" : "") + ' aria-label="' + esc(label + " kolonunu yukarı taşı") + '">⌃</button><button type="button" class="button button-quiet button-small" data-action="move-backlog-column" data-direction="down" data-column-id="' + id + '" ' + (!enabled || index === backlogColumnDraft.length - 1 ? "disabled" : "") + ' aria-label="' + esc(label + " kolonunu aşağı taşı") + '">⌄</button></div></div>';
  }).join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal backlog-column-modal" role="dialog" aria-modal="true" aria-labelledby="backlog-columns-title"><header class="modal-header"><div><div class="panel-kicker">BACKLOG GÖRÜNÜMÜ</div><h2 id="backlog-columns-title">Kolonları düzenle</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-intro">Tabloda görmek istediğin alanları seç ve görünen kolonların sırasını ayarla. İş başlığı kolonu sabit kalır.</p><div class="backlog-column-options">' + rows + '</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-primary" data-action="save-backlog-columns">Uygula</button></footer></div></section></div>';
}

function openBacklogColumnManager(): void {
  backlogColumnDraft = [...backlogColumns];
  renderBacklogColumnManager();
}

function captureBacklogView(name: string, id = nextId("VIEW")): BacklogSavedView {
  return {
    id, name, projectId: activeProjectId, mode: backlogMode === "board" ? "board" : "list", query,
    status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, searchScope: backlogSearchScope,
    columns: [...backlogColumns], sort: backlogSort
  };
}

function persistBacklogViews(): void {
  localStorage.setItem(BACKLOG_VIEWS_PREFERENCE_KEY, JSON.stringify(savedBacklogViews));
}

function rememberRecentBacklogFilter(): void {
  const filter: RecentBacklogFilter = { query: query.trim(), searchScope: backlogSearchScope, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted };
  if (!filter.query && !filter.status && !filter.type && !filter.label && !filter.teamId && !filter.assignee && !filter.sprintId && !filter.includeCompleted) return;
  const key = JSON.stringify(filter);
  recentBacklogFilters = [filter, ...recentBacklogFilters.filter((entry) => JSON.stringify(entry) !== key)].slice(0, 5);
  localStorage.setItem(BACKLOG_RECENT_FILTERS_KEY, JSON.stringify(recentBacklogFilters));
  let host = root.querySelector<HTMLElement>(".backlog-view-recents");
  if (!host) {
    root.querySelector(".backlog-view-controls")?.insertAdjacentHTML("beforeend", '<div class="backlog-view-recents"></div>');
    host = root.querySelector<HTMLElement>(".backlog-view-recents");
  }
  if (host) {
    const options = recentBacklogFilters.map((entry, index) => { const label = [entry.query ? '“' + entry.query + '”' : "", entry.status, entry.type, entry.label, entry.teamId ? state.teams.find((team) => team.id === entry.teamId)?.name || "Takım" : "", entry.assignee.split("::")[1] || "", entry.sprintId ? entry.sprintId === "__unassigned" ? "Sprint atanmamış" : state.sprints.find((sprint) => sprint.id === entry.sprintId)?.name || "Sprint" : "", entry.includeCompleted ? "Tamamlananlar dahil" : ""].filter(Boolean).join(" · ") || "Filtre"; return '<option value="' + index + '">' + esc(label) + '</option>'; }).join("");
    const existing = host.querySelector("#backlog-recent-filter");
    if (existing) existing.innerHTML = '<option value="">Son filtreler</option>' + options;
    else host.insertAdjacentHTML("beforeend", '<select id="backlog-recent-filter" aria-label="Son kullanılan filtreler"><option value="">Son filtreler</option>' + options + '</select>');
  }
}

function applyBacklogView(view: BacklogSavedView): void {
  if (view.projectId && !state.projects.some((project) => project.id === view.projectId && !project.archived)) {
    toast("Bu görünümün bağlı olduğu proje artık kullanılamıyor.");
    return;
  }
  activeProjectId = view.projectId;
  backlogMode = view.mode;
  query = view.query;
  backlogStatus = view.status;
  backlogIncludeCompleted = view.includeCompleted || false;
  backlogType = view.type;
  labelFilter = view.label;
  teamFilterId = view.teamId;
  assigneeFilter = view.assignee;
  backlogSprintId = view.sprintId || "";
  backlogSearchScope = view.searchScope || "all";
  backlogColumns = [...view.columns];
  backlogSort = normalizeBacklogSort(view.sort === "manual" && view.secondarySort && view.secondarySort !== "manual" ? view.secondarySort : view.sort);
  activeBacklogViewId = view.id;
  activeView = "backlog";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.toggle("active", node.dataset.view === "backlog"));
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = state.projects.find((project) => project.id === activeProjectId)?.name || "Backlog";
  render();
}

function renderBacklogViewManager(): void {
  const scopedViews = savedBacklogViews.filter((view) => view.projectId === activeProjectId);
  const rows = scopedViews.map((view) => '<div class="saved-view-manage-row"><label><span>Görünüm adı</span><input class="field-input" data-backlog-view-name="' + esc(view.id) + '" maxlength="50" value="' + esc(view.name) + '"></label><div><button type="button" class="button button-quiet" data-action="toggle-backlog-view-pin" data-view-id="' + esc(view.id) + '" aria-pressed="' + Boolean(view.pinned) + '">' + (view.pinned ? "★ Sabit" : "☆ Sabitle") + '</button><button type="button" class="button button-quiet" data-action="duplicate-backlog-view" data-view-id="' + esc(view.id) + '">Çoğalt</button><button type="button" class="button button-quiet" data-action="delete-backlog-view" data-view-id="' + esc(view.id) + '">Sil</button></div></div>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal backlog-view-modal" role="dialog" aria-modal="true" aria-labelledby="backlog-view-manager-title"><header class="modal-header"><div><div class="panel-kicker">BACKLOG GÖRÜNÜMLERİ</div><h2 id="backlog-view-manager-title">Görünümleri yönet</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-intro">Bu ' + (activeProjectId ? "proje" : "genel backlog") + ' için kaydettiğin görünümleri yeniden adlandırabilir veya silebilirsin.</p><div class="saved-view-manage-list">' + (rows || '<div class="empty-state">Bu kapsamda kayıtlı görünüm yok.</div>') + '</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-primary" data-action="save-backlog-view-names" ' + (!scopedViews.length ? "disabled" : "") + '>Adları kaydet</button></footer></div></section></div>';
}

function openSaveBacklogViewModal(): void {
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="save-backlog-view-title"><header class="modal-header"><div><div class="panel-kicker">BACKLOG GÖRÜNÜMLERİ</div><h2 id="save-backlog-view-title">Görünümü kaydet</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-intro">Filtreleri, kolonları, sıralamayı ve liste/pano seçimini yeniden kullanmak için bu görünümü adlandır.</p><label class="field-label">Görünüm adı<input id="new-backlog-view-name" class="field-input" maxlength="50" placeholder="Örn. Bloke işler" required></label><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-primary" data-action="confirm-save-backlog-view">Kaydet</button></footer></div></section></div>';
  modalRoot.querySelector<HTMLInputElement>("#new-backlog-view-name")?.focus();
}

function saveCurrentBacklogView(name: string, viewId?: string): boolean {
  const normalizedName = name.trim();
  if (!normalizedName) { toast("Görünüme bir ad ver."); return false; }
  if (savedBacklogViews.some((view) => view.projectId === activeProjectId && view.id !== viewId && view.name.toLocaleLowerCase("tr-TR") === normalizedName.toLocaleLowerCase("tr-TR"))) {
    toast("Bu kapsamda aynı adla bir görünüm zaten var."); return false;
  }
  const existing = viewId ? savedBacklogViews.find((view) => view.id === viewId && view.projectId === activeProjectId) : undefined;
  const saved = captureBacklogView(normalizedName, existing?.id);
  if (existing) Object.assign(existing, saved);
  else savedBacklogViews.push(saved);
  activeBacklogViewId = saved.id;
  persistBacklogViews();
  closeModal();
  renderBacklog();
  toast(existing ? "Görünüm güncellendi." : "Görünüm kaydedildi.");
  return true;
}

function sortBacklogItems(items: WorkItem[]): WorkItem[] {
  const selection = sortState();
  if (!selection) return items;
  const priorityRank: Record<Priority, number> = { "Düşük": 1, "Orta": 2, "Yüksek": 3, "Kritik": 4 };
  const statusRank: Record<WorkStatus, number> = { "Yeni": 0, "Analiz ediliyor": 1, "Hazır": 2, "Devam ediyor": 3, "Bloke": 4, "Tamamlandı": 5 };
  const valueFor = (item: WorkItem): string | number | null => {
    const linkedRelease = state.releases.find((release) => release.id === item.releaseId)?.name || "";
    const linkedSprint = state.sprints.find((sprint) => sprint.id === item.sprintId)?.name || "";
    const linkedAssets = (item.assetIds || []).map((id) => state.assets.find((asset) => asset.id === id)).filter((asset): asset is ProductAsset => Boolean(asset)).map((asset) => asset.code + " " + asset.name).join(" ");
    const assignments = assignmentSummary(item);
    switch (selection.column) {
      case "title": return item.title;
      case "type": return item.type;
      case "area": return item.area;
      case "priority": return priorityRank[item.priority];
      case "status": return statusRank[item.status];
      case "updated": return workItemLastTouched(item) || null;
      case "assignment": return assignments || null;
      case "project": return item.project;
      case "description": return item.description;
      case "labels": return (item.labels || []).join(", ") || null;
      case "startDate": return item.startDate || null;
      case "targetDate": return item.targetDate || null;
      case "targetPeriod": return item.targetPeriod || null;
      case "estimate": return item.estimate ?? null;
      case "productStage": return item.productStage || null;
      case "release": return linkedRelease || null;
      case "sprint": return linkedSprint || null;
      case "assets": return linkedAssets || null;
      case "attachments": return item.attachments?.length ?? 0;
      case "acceptance": return item.acceptance?.length ?? 0;
      case "dependencies": return item.dependsOnIds?.length ?? 0;
      case "blocker": return item.blocker?.reason || null;
      case "activity": return item.activity?.[0]?.occurredAt || null;
    }
  };
  return [...items].sort((left, right) => {
    const leftValue = valueFor(left);
    const rightValue = valueFor(right);
    if (leftValue === null && rightValue !== null) return 1;
    if (rightValue === null && leftValue !== null) return -1;
    if (leftValue === null && rightValue === null) return left.id.localeCompare(right.id, "tr-TR");
    const comparison = typeof leftValue === "number" && typeof rightValue === "number"
      ? leftValue - rightValue
      : String(leftValue).localeCompare(String(rightValue), "tr-TR", { numeric: true, sensitivity: "base" });
    return (selection.direction === "desc" ? -comparison : comparison) || left.id.localeCompare(right.id, "tr-TR");
  });
}

function toggleBacklogColumnSort(column: "title" | BacklogColumnId): void {
  const current = sortState();
  const direction: "asc" | "desc" = current?.column === column ? current.direction === "asc" ? "desc" : "asc" : column === "priority" || column === "updated" || column === "activity" ? "desc" : "asc";
  backlogSort = `column:${column}:${direction}`;
  updateBacklogRows();
  updateBacklogSortHeaders();
  updateSavedBacklogViewDirtyIndicator();
}

function renderBacklogPreview(item: WorkItem): string {
  const assignments = getWorkAssignments(item);
  const assignmentText = assignments.length ? assignmentSummary(item) : "Atama yapılmadı";
  const assets = (item.assetIds || []).map((id) => state.assets.find((asset) => asset.id === id)?.code || id);
  const labels = (item.labels || []).slice(0, 4);
  const activity = item.activity?.[0];
  const description = item.description.trim() || "Bu iş için henüz açıklama eklenmemiş.";
  const dates = [item.startDate ? "Başlangıç " + item.startDate : "", item.targetDate ? "Hedef " + item.targetDate : ""].filter(Boolean).join(" · ");
  return '<section class="backlog-preview-card" data-preview-card="' + esc(item.id) + '" role="dialog" aria-label="' + esc(item.id + " iş önizlemesi") + '"><header class="backlog-preview-header"><div><span class="backlog-preview-id">' + esc(item.id) + ' · ' + esc(item.type) + '</span><h2>' + esc(item.title) + '</h2></div><button type="button" class="backlog-preview-close" data-close-backlog-preview aria-label="Önizlemeyi kapat">×</button></header><div class="backlog-preview-badges"><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span><span class="backlog-preview-area">' + esc(item.area || "Ürün alanı yok") + '</span></div><p class="backlog-preview-description">' + esc(description) + '</p><div class="backlog-preview-details"><div><span>PROJE</span><strong>' + esc(item.project) + '</strong></div><div><span>TAKIM / ÜYE</span><strong>' + esc(assignmentText) + '</strong></div>' + (dates ? '<div><span>PLAN</span><strong>' + esc(dates) + '</strong></div>' : '') + (item.estimate != null ? '<div><span>TAHMİN</span><strong>' + esc(item.estimate) + ' saat</strong></div>' : '') + (assets.length ? '<div><span>BİLEŞENLER</span><strong>' + esc(assets.join(", ")) + '</strong></div>' : '') + '<div><span>SON GÜNCELLEME</span><strong>' + esc(activity ? activity.message : item.updated) + '</strong></div></div>' + (labels.length ? '<div class="backlog-preview-labels">' + labels.map((label) => '<span>' + esc(label) + '</span>').join("") + ((item.labels || []).length > labels.length ? '<small>+' + ((item.labels || []).length - labels.length) + '</small>' : '') + '</div>' : '') + '<footer><span>' + (item.acceptance?.length || 0) + ' kabul kriteri · ' + (item.attachments?.length || 0) + ' ek</span><button type="button" class="button button-primary button-small" data-open-item="' + esc(item.id) + '">İş ayrıntılarını aç </button></footer></section>';
}

function positionBacklogPreview(anchor: HTMLElement, card: HTMLElement): void {
  const rect = anchor.getBoundingClientRect();
  const margin = 12;
  const width = Math.min(460, window.innerWidth - margin * 2);
  const height = card.offsetHeight;
  let left = rect.left;
  if (left + width > window.innerWidth - margin) left = window.innerWidth - width - margin;
  left = Math.max(margin, left);
  let top = rect.bottom + 8;
  if (top + height > window.innerHeight - margin && rect.top - height - 8 >= margin) top = rect.top - height - 8;
  top = Math.max(margin, Math.min(top, window.innerHeight - height - margin));
  card.style.left = left + "px";
  card.style.top = top + "px";
}

function openBacklogPreview(itemId: string, anchor: HTMLElement): void {
  const item = itemById(itemId);
  if (!item || !backlogPreviewEnabled) return;
  window.clearTimeout(backlogPreviewTimer);
  if (backlogPreviewItemId === itemId && document.querySelector("[data-preview-card]")) return;
  closeBacklogPreview();
  backlogPreviewItemId = itemId;
  root.insertAdjacentHTML("beforeend", renderBacklogPreview(item));
  const card = root.querySelector<HTMLElement>("[data-preview-card]");
  if (card) requestAnimationFrame(() => positionBacklogPreview(anchor, card));
}

function closeBacklogPreview(): void {
  window.clearTimeout(backlogPreviewTimer);
  root.querySelector("[data-preview-card]")?.remove();
  backlogPreviewItemId = null;
}

function scheduleBacklogPreviewClose(): void {
  window.clearTimeout(backlogPreviewTimer);
  backlogPreviewTimer = window.setTimeout(() => {
    const active = document.activeElement;
    const card = root.querySelector("[data-preview-card]");
    if (!card?.matches(":hover") && !card?.contains(active) && !root.querySelector("[data-preview-item]:hover")) closeBacklogPreview();
  }, 180);
}

function refreshBacklogAssigneeFilter(): void {
  const select = document.getElementById("assignee-filter") as HTMLSelectElement | null;
  if (!select) return;
  const assignments = state.teams.flatMap((team) => team.members.map((member) => ({ teamId: team.id, member }))).filter((assignment) => !teamFilterId || (teamFilterId !== "__unassigned" && assignment.teamId === teamFilterId));
  const uniqueAssignments = [...new Map(assignments.map((assignment) => [assignment.teamId + "::" + assignment.member, assignment])).values()].sort((a, b) => a.member.localeCompare(b.member, "tr"));
  const options = '<option value="">Tüm sorumlular</option><option value="__unassigned">Sorumlu atanmamış</option>' + uniqueAssignments.map((assignment) => {
    const teamName = state.teams.find((team) => team.id === assignment.teamId)?.name || "Takım";
    const value = assignment.teamId + "::" + assignment.member;
    return '<option value="' + esc(value) + '">' + esc(assignment.member + " · " + teamName) + '</option>';
  }).join("");
  select.innerHTML = options;
  if ([...select.options].some((option) => option.value === assigneeFilter)) select.value = assigneeFilter;
  else assigneeFilter = select.value;
}

function openCreateSprintModal(): void {
  const selectedItems = getSelectedBacklogItems();
  if (!selectedItems.length) { toast("Önce sprint kapsamına alacağın işleri seç."); return; }
  if (!state.teams.length) { toast("Sprint oluşturmadan önce Takım panelinden bir takım ekle."); return; }
  const start = new Date();
  const priorSprint = state.sprints?.[0];
  const priorDuration = priorSprint ? Math.max(1, Math.round((new Date(priorSprint.endDate + "T00:00:00").getTime() - new Date(priorSprint.startDate + "T00:00:00").getTime()) / 86400000) + 1) : 14;
  const end = new Date(start); end.setDate(end.getDate() + 13);
  const defaultName = "Sprint " + (state.sprints.length + 1);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="create-sprint-title"><header class="modal-header"><div><div class="panel-kicker">BACKLOG PLANLAMA</div><h2 id="create-sprint-title">Sprint oluştur</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><form id="create-sprint-form" class="settings-form"><p class="settings-intro">' + selectedItems.length + ' seçili iş sprint kapsamına alınacak. Sprint tek bir takımla ilişkilendirilir.</p><label class="field-label">Sprint adı<input class="field-input" name="name" maxlength="80" required value="' + esc(defaultName) + '"></label><label class="field-label">Takım<select class="field-input" name="teamId" required><option value="">Sprint takımını seç</option>' + state.teams.map((team) => '<option value="' + esc(team.id) + '">' + esc(team.name) + '</option>').join("") + '</select></label><div class="form-two-col"><label class="field-label">Başlangıç tarihi<input class="field-input" name="startDate" type="date" required value="' + start.toISOString().slice(0, 10) + '"></label><label class="field-label">Bitiş tarihi<input class="field-input" name="endDate" type="date" required value="' + end.toISOString().slice(0, 10) + '"></label></div><div class="sprint-scope-list">' + selectedItems.map((item) => '<span><strong>' + esc(item.id) + '</strong> ' + esc(item.title) + '</span>').join("") + '</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Sprinti oluştur</button></footer></form></section></div>';
  const blockers = selectedItems.filter((item) => item.status === "Bloke").length;
  const waiting = selectedItems.filter((item) => pendingDependencies(item).length).length;
  if (blockers || waiting) modalRoot.querySelector(".jira-settings-block")?.insertAdjacentHTML("afterend", '<div class="sprint-scope-warning">Kapsam uyarısı: ' + (blockers ? blockers + ' bloke iş' : '') + (blockers && waiting ? ' · ' : '') + (waiting ? waiting + ' tamamlanmamış bağımlılığı olan iş' : '') + '. Sprint planına almadan önce gözden geçir.</div>');
  modalRoot.querySelector(".jira-settings-block")?.insertAdjacentHTML("afterend", '<label class="field-label sprint-duration">Süre kısayolu<select class="field-input" id="sprint-duration"><option value="7">1 hafta</option><option value="14" selected>2 hafta</option><option value="21">3 hafta</option><option value="28">4 hafta</option></select></label>');
  const duration = [7, 14, 21, 28].includes(priorDuration) ? priorDuration : 14;
  const durationSelect = modalRoot.querySelector<HTMLSelectElement>("#sprint-duration");
  if (durationSelect) durationSelect.value = String(duration);
  const teamSelect = modalRoot.querySelector<HTMLSelectElement>('[name="teamId"]');
  if (teamSelect && priorSprint && state.teams.some((team) => team.id === priorSprint.teamId)) teamSelect.value = priorSprint.teamId;
  const startInput = modalRoot.querySelector<HTMLInputElement>('[name="startDate"]');
  const endInput = modalRoot.querySelector<HTMLInputElement>('[name="endDate"]');
  if (startInput?.value && endInput) { const suggestedEnd = new Date(startInput.value + "T00:00:00"); suggestedEnd.setDate(suggestedEnd.getDate() + duration - 1); endInput.value = suggestedEnd.toISOString().slice(0, 10); }
  const scope = modalRoot.querySelector<HTMLElement>(".sprint-scope-list");
  scope?.insertAdjacentHTML("beforebegin", '<label class="sprint-scope-search"><span>⌕</span><input id="sprint-item-search" type="search" placeholder="Seçili işlerde ara…" aria-label="Sprint kapsamındaki işleri ara"></label>');
  scope?.querySelectorAll<HTMLElement>("span").forEach((row, index) => { const item = selectedItems[index]; if (item) { row.dataset.sprintItem = item.id; row.dataset.sprintSearch = (item.id + " " + item.title + " " + item.status + " " + assignmentSummary(item)).toLocaleLowerCase("tr-TR"); row.draggable = true; } });
}

function saveNewSprint(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const teamId = String(data.get("teamId") || "");
  const startDate = String(data.get("startDate") || "");
  const endDate = String(data.get("endDate") || "");
  const selectedItems = getSelectedBacklogItems();
  const orderedIds = [...modalRoot.querySelectorAll<HTMLElement>("[data-sprint-item]")].map((row) => row.dataset.sprintItem || "");
  selectedItems.sort((left, right) => orderedIds.indexOf(left.id) - orderedIds.indexOf(right.id));
  if (!name || !state.teams.some((team) => team.id === teamId) || !selectedItems.length) { toast("Sprint adı, takım ve en az bir backlog işi gerekli."); return; }
  if (!startDate || !endDate || endDate < startDate) { toast("Bitiş tarihi başlangıç tarihinden önce olamaz."); return; }
  const sprint: Sprint = { id: nextId("SPR"), name, teamId, startDate, endDate, createdAt: new Date().toISOString() };
  state.sprints ||= [];
  state.sprints.unshift(sprint);
  selectedItems.forEach((item, index) => {
    const oldSprint = state.sprints.find((entry) => entry.id === item.sprintId);
    item.sprintId = sprint.id;
    item.sprintOrder = index;
    item.updated = "Az önce";
    addWorkActivity(item, "change", oldSprint ? '"' + oldSprint.name + '" sprintinden "' + sprint.name + '" sprintine taşındı.' : '"' + sprint.name + '" sprintine eklendi.');
  });
  selectedItems.forEach((item) => selectedBacklogItemIds.delete(item.id));
  save();
  closeModal();
  renderBacklog();
  toast(sprint.name + " oluşturuldu · " + selectedItems.length + " iş · " + (state.teams.find((team) => team.id === teamId)?.name || "takım"));
}

function renderFocus(): void {
  const openTasks = state.tasks.filter((task) => !task.done);
  root.innerHTML = '<div class="page-content focus-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>KİŞİSEL ÇALIŞMA ALANI</div><h1>Kendi ritmin</h1><p>Backlog’la ilişkili veya bağımsız görev ve notların bir arada.</p></div><div class="button-row"><button class="button button-secondary" data-action="new" data-type="Not">＋ Not ekle</button><button class="button button-primary" data-action="new" data-type="Kişisel görev"><span class="button-plus">+</span> Görev ekle</button></div></section>' +
    '<div class="focus-grid"><section class="panel focus-tasks"><div class="panel-heading"><div><div class="panel-kicker">TAKİP LİSTESİ <span class="count-chip">' + openTasks.length + '</span></div><h2>Görevlerin</h2><p>Günlük işlerini ve bekleyen adımları takip et.</p></div><button class="round-add" data-action="new" data-type="Kişisel görev">+</button></div><div class="focus-task-list">' + (state.tasks.length ? state.tasks.map((task) => '<div class="focus-task-row ' + (task.done ? "task-complete" : "") + '" data-context-task-id="' + esc(task.id) + '"><button class="task-check ' + (task.done ? "checked" : "") + '" data-toggle-task="' + esc(task.id) + '">' + (task.done ? "✓" : "") + '</button><div class="focus-task-copy"><button data-open-task="' + esc(task.id) + '">' + esc(task.title) + '</button><small>' + (task.linked && itemById(task.linked) ? '<span class="linked-badge">' + esc(task.linked) + '</span>' : '<span class="independent-label">Bağımsız görev</span>') + (task.attachments?.length ? ' <span class="attachment-indicator">▤ ' + task.attachments.length + '</span>' : "") + '</small></div><span class="task-due ' + (task.due === "Bugün" ? "due-today" : "") + '">' + esc(task.due) + '</span><button class="dots-button task-more">···</button></div>').join("") : '<div class="empty-state">Henüz görev yok. İlk görevini ekleyebilirsin.</div>') + '</div></section>' +
    '<section class="panel focus-notes"><div class="panel-heading"><div><div class="panel-kicker">NOT DEFTERİ <span class="count-chip">' + state.notes.length + '</span></div><h2>Notların</h2><p>Kararları, soruları ve aklına takılanları kaydet.</p></div><button class="round-add" data-action="new" data-type="Not">+</button></div><div class="focus-note-list">' + (state.notes.length ? state.notes.map((note) => '<article class="focus-note" data-context-note-id="' + esc(note.id) + '"><div class="focus-note-top"><span class="note-pin">✳</span><span class="note-date">' + esc(note.updated) + '</span><button class="dots-button" data-action="note-to-task" data-id="' + esc(note.id) + '" title="Göreve dönüştür">☑</button></div><button class="focus-note-title" data-note="' + esc(note.id) + '">' + esc(note.title) + '</button><p>' + esc(note.body) + '</p>' + (note.linked && itemById(note.linked) ? '<button class="linked-badge" data-open-item="' + esc(note.linked) + '">' + esc(note.linked) + ' · ilişkili iş</button>' : '<span class="independent-label">Bağımsız not</span>') + '</article>').join("") : '<div class="empty-state">Henüz not yok. Bir not ekleyerek başlayabilirsin.</div>') + '</div></section></div></div>';
}

function renderAssets(): void {
  root.innerHTML = '<div class="page-content assets-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN BİLEŞENLERİ</div><h1>Ürün envanteri</h1><p>Ekran, batch, rapor ve servislerini backlog işleriyle birlikte takip et.</p></div><div class="button-row"><button class="button button-secondary" data-action="asset-presentation" data-mode="' + (assetPresentation === "diagram" ? "cards" : "diagram") + '">' + (assetPresentation === "diagram" ? "Kart görünümü" : "İlişki diyagramı") + '</button><button class="button button-primary" data-action="new-asset"><span class="button-plus">+</span> Bileşen ekle</button></div></section><div class="assets-toolbar"><label class="filter-search"><span>⌕</span><input id="asset-search" type="search" placeholder="Envanterde ara…" value="' + esc(assetQuery) + '"></label><select id="asset-type-filter" aria-label="Tür"><option value="">Tüm türler</option>' + ["Ekran", "Batch", "Rapor", "Servis/API", "Entegrasyon", "Diğer"].map((type) => '<option ' + (assetTypeFilter === type ? "selected" : "") + '>' + type + '</option>').join("") + '</select><select id="asset-project-filter" aria-label="Proje"><option value="">Tüm projeler</option>' + state.projects.filter((project) => !project.archived).map((project) => '<option ' + (assetProjectFilter === project.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select><label class="asset-inactive-toggle"><input id="asset-inactive-filter" type="checkbox" ' + (includeInactiveAssets ? "checked" : "") + '> Pasif bileşenleri göster</label></div><div class="assets-summary"><strong id="asset-visible-count">0</strong> bileşen <span>·</span> ' + state.assets.filter((asset) => asset.active).length + ' aktif</div><div id="asset-content"></div></div>';
  updateAssetGrid();
}

function updateAssetGrid(): void {
  const content = document.getElementById("asset-content");
  const visibleCount = document.getElementById("asset-visible-count");
  if (!content || !visibleCount) return;
  const normalizedQuery = assetQuery.trim().toLocaleLowerCase("tr-TR");
  const assets = state.assets.filter((asset) => !state.projects.some((project) => project.name === asset.project && project.archived) && (includeInactiveAssets || asset.active) && (!assetTypeFilter || asset.type === assetTypeFilter) && (!assetProjectFilter || asset.project === assetProjectFilter) && (!normalizedQuery || (asset.code + " " + asset.name + " " + asset.area + " " + asset.purpose).toLocaleLowerCase("tr-TR").includes(normalizedQuery)));
  visibleCount.textContent = String(assets.length);
  if (assetPresentation === "diagram") { renderAssetDiagram(content, assets); return; }
  disposeAssetDiagram();
  content.innerHTML = '<div class="asset-grid" id="asset-grid">' + (assets.length ? assets.map((asset) => {
    const linkedCount = state.items.filter((item) => (item.assetIds || []).includes(asset.id)).length;
    const owner = state.teams.find((team) => team.id === asset.ownerTeamId)?.name || asset.ownerName || "Sahip tanımlanmadı";
    const relatedAssets = (asset.relatedAssetIds || []).map((id) => state.assets.find((candidate) => candidate.id === id)).filter((entry): entry is ProductAsset => Boolean(entry));
    const relationSummary = relatedAssets.length ? relatedAssets.slice(0, 2).map((entry) => (asset.relatedAssetLabels?.[entry.id] ? asset.relatedAssetLabels[entry.id] + " · " : "") + entry.code).join(" · ") + (relatedAssets.length > 2 ? "  +" + (relatedAssets.length - 2) : "") : "Bileşen ilişkisi yok";
    return '<button class="asset-card" data-open-asset="' + esc(asset.id) + '"><span class="asset-card-top"><span class="asset-type-pill">' + esc(asset.type) + '</span>' + (asset.active ? '<span class="asset-active">Aktif</span>' : '<span class="asset-inactive">Pasif</span>') + '</span><strong class="asset-card-name">' + esc(asset.name) + '</strong><span class="asset-code">' + esc(asset.code) + '</span><span class="asset-card-meta">' + esc(asset.project) + ' · ' + esc(asset.area) + '</span><span class="asset-card-purpose">' + esc(asset.purpose || asset.description || "Açıklama eklenmedi.") + '</span><span class="asset-card-relations" title="' + esc(relationSummary) + '">◇ ' + esc(relationSummary) + '</span><span class="asset-card-footer">' + esc(owner) + '<span>' + linkedCount + ' bağlı iş</span></span></button>';
  }).join("") : '<div class="asset-empty"><strong>' + (state.assets.length ? "Filtreye uygun bileşen yok" : "Henüz ürün bileşeni yok") + '</strong><span>Envantere ekran, batch, rapor veya servis ekleyerek ürün kapsamını işlerinle ilişkilendir.</span>' + (!state.assets.length ? '<button class="button button-secondary" data-action="new-asset">İlk bileşeni ekle</button>' : '') + '</div>') + '</div>';
}

function assetPosition(asset: ProductAsset, index: number, count: number): { x: number; y: number } {
  if (asset.diagramPosition) return asset.diagramPosition;
  const columns = Math.min(Math.max(count, 1), 3);
  const rows = Math.ceil(count / columns);
  return { x: 170 + (columns === 1 ? 0 : (index % columns) * (660 / (columns - 1))), y: rows === 1 ? 290 : 140 + Math.floor(index / columns) * (320 / Math.max(rows - 1, 1)) };
}

function disposeAssetDiagram(): void {
  assetDiagramResizeObserver?.disconnect();
  assetDiagramResizeObserver = null;
  assetDiagramGraph?.dispose();
  assetDiagramGraph = null;
}

function renderAssetRelationList(host: HTMLElement, assets: ProductAsset[]): void {
  const visible = new Set(assets.map((asset) => asset.id));
  const edges = assets.flatMap((asset) => (asset.relatedAssetIds || []).filter((targetId) => visible.has(targetId)).map((targetId) => ({ source: asset, target: state.assets.find((entry) => entry.id === targetId)!, label: asset.relatedAssetLabels?.[targetId] || "İlişkili" })));
  host.innerHTML = '<div class="section-title-row"><h3>İlişkiler <span class="count-chip">' + edges.length + '</span></h3></div>' + (edges.length ? edges.map(({ source, target, label }) => '<div class="asset-relation-row"><span>' + esc(source.code) + '</span><b>→</b><span>' + esc(target.code) + '</span><small>' + esc(label) + '</small><button type="button" class="text-button" data-remove-asset-relation="' + esc(source.id) + '|' + esc(target.id) + '">Kaldır</button></div>').join("") : '<p class="asset-muted">Henüz ilişki yok. Bileşenlerin mavi bağlantı noktalarını sürükleyerek ok oluştur.</p>');
}

let assetDiagramAssets: ProductAsset[] = [];

function persistAssetRelation(sourceId: string, targetId: string, label: string): void {
  const source = state.assets.find((asset) => asset.id === sourceId);
  if (!source || !state.assets.some((asset) => asset.id === targetId)) return;
  if (!source.relatedAssetIds.includes(targetId)) source.relatedAssetIds.push(targetId);
  source.relatedAssetLabels = { ...(source.relatedAssetLabels || {}), [targetId]: label.trim() || "İlişkili" };
  source.updated = "Az önce";
  save();
  const relationList = document.getElementById("asset-relation-list");
  if (relationList) renderAssetRelationList(relationList, assetDiagramAssets);
}

function openAssetRelationLabelEditor(sourceId: string, targetId: string): void {
  const source = state.assets.find((asset) => asset.id === sourceId);
  const target = state.assets.find((asset) => asset.id === targetId);
  if (!source || !target) return;
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="asset-relation-title"><header class="modal-header"><div><div class="panel-kicker">BİLEŞEN İLİŞKİSİ</div><h2 id="asset-relation-title">İlişki etiketini düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="asset-relation-label-form" class="settings-form"><p class="settings-intro">' + esc(source.code + " → " + target.code) + '</p><label class="field-label">Ok üzerinde gösterilecek ilişki<input class="field-input" name="label" maxlength="80" required value="' + esc(source.relatedAssetLabels?.[targetId] || "İlişkili") + '"></label><input type="hidden" name="sourceId" value="' + esc(sourceId) + '"><input type="hidden" name="targetId" value="' + esc(targetId) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
}

function renderAssetDiagram(container: HTMLElement, assets: ProductAsset[]): void {
  disposeAssetDiagram();
  assetDiagramAssets = assets;
  if (!assets.length) {
    container.innerHTML = '<div class="asset-empty"><strong>Diagram için bileşen bulunamadı</strong><span>Filtreyi değiştir veya önce envantere bileşen ekle.</span></div>';
    return;
  }
  container.innerHTML = '<div class="asset-diagram-help">Bileşenleri sürükleyerek yerleştir; mavi bağlantı noktalarından ok çiz. Yakınlaştırmak için Ctrl + fare tekerleği kullan.</div><div class="diagram-editor-toolbar"><button class="button button-secondary button-small" data-action="diagram-fit">Tümünü sığdır</button><button class="button button-secondary button-small" data-action="diagram-layout">Otomatik hizala</button><span class="diagram-save-state">Değişiklikler otomatik kaydedilir</span></div><div class="asset-diagram-canvas" id="asset-diagram-canvas"></div><section class="asset-relation-list" id="asset-relation-list"></section>';
  const canvas = document.getElementById("asset-diagram-canvas") as HTMLElement;
  canvas.style.width = "100%";
  const width = Math.max(container.clientWidth, 640);
  const height = 600;
  const nodeWidth = 230;
  const nodeHeight = 116;
  const graph = new Graph({
    container: canvas,
    width,
    height,
    grid: { visible: true, size: 20, type: "dot", args: { color: "#dce1ed", thickness: 1 } },
    panning: { enabled: true },
    mousewheel: { enabled: true, modifiers: ["ctrl"] },
    connecting: {
      allowBlank: false,
      allowLoop: false,
      allowMulti: false,
      allowNode: true,
      snap: true,
      connector: "rounded",
      createEdge() {
        return this.createEdge({ attrs: { line: { stroke: "#6073df", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } } });
      },
      validateConnection({ sourceCell, targetCell }) {
        return !!sourceCell && !!targetCell && sourceCell.isNode() && targetCell.isNode() && sourceCell.id !== targetCell.id;
      },
    },
  });
  assetDiagramGraph = graph;
  assets.forEach((asset, index) => {
    const pos = assetPosition(asset, index, assets.length);
    const x = asset.diagramPosition ? asset.diagramPosition.x : pos.x;
    const y = asset.diagramPosition ? asset.diagramPosition.y : pos.y;
    graph.addNode({
      id: asset.id,
      shape: "rect",
      x: Math.max(8, Math.min(width - nodeWidth - 8, x / 1000 * width - nodeWidth / 2)),
      y: Math.max(8, Math.min(height - nodeHeight - 8, y - nodeHeight / 2)),
      width: nodeWidth,
      height: nodeHeight,
      attrs: {
        body: { fill: asset.active ? "#fff" : "#f2f3f5", stroke: "#dfe4ed", strokeWidth: 1, rx: 10, ry: 10 },
        label: { text: asset.type + "\n" + asset.name + "\n" + asset.code, fill: "#343c4e", fontSize: 12, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: nodeWidth - 28, height: nodeHeight - 24, ellipsis: true }, lineHeight: 21 },
      },
      ports: {
        groups: {
          left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } },
          right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } },
          top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } },
          bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } },
        },
        items: [{ group: "left" }, { group: "right" }, { group: "top" }, { group: "bottom" }],
      },
    });
  });
  assets.forEach((asset) => (asset.relatedAssetIds || []).filter((id) => assets.some((candidate) => candidate.id === id)).forEach((targetId) => {
    graph.addEdge({
      id: "relation-" + asset.id + "-" + targetId,
      source: { cell: asset.id },
      target: { cell: targetId },
      router: "manhattan",
      connector: "rounded",
      labels: [{ attrs: { text: { text: asset.relatedAssetLabels?.[targetId] || "İlişkili", fill: "#5d6784", fontSize: 11 } }, position: 0.5 }],
      attrs: { line: { stroke: "#7382d4", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } },
    });
  }));
  renderAssetRelationList(document.getElementById("asset-relation-list")!, assets);
  graph.on("node:change:position", ({ node }: { node: Node }) => {
    const asset = state.assets.find((entry) => entry.id === node.id);
    if (!asset) return;
    const pos = node.position();
    asset.diagramPosition = { x: Math.round((pos.x + nodeWidth / 2) / width * 1000), y: Math.round(pos.y + nodeHeight / 2) };
    save();
  });
  graph.on("node:dblclick", ({ node }: { node: Node }) => openAsset(node.id));
  graph.on("edge:dblclick", ({ edge }: { edge: Edge }) => {
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    if (!sourceId || !targetId) return;
    const source = state.assets.find((asset) => asset.id === sourceId);
    const currentLabel = source?.relatedAssetLabels?.[targetId] || "İlişkili";
    const label = window.prompt("Ok ilişki etiketini düzenle", currentLabel);
    if (label === null) return;
    persistAssetRelation(sourceId, targetId, label.trim().slice(0, 80) || "İlişkili");
    edge.setLabels([{ attrs: { text: { text: label.trim().slice(0, 80) || "İlişkili", fill: "#5d6784", fontSize: 11 } }, position: 0.5 }]);
    renderAssetRelationList(document.getElementById("asset-relation-list")!, assetDiagramAssets);
    toast("İlişki etiketi güncellendi.");
  });
  graph.on("edge:connected", ({ edge, isNew }: { edge: Edge; isNew: boolean }) => {
    if (!isNew) return;
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    if (!sourceId || !targetId) { edge.remove(); return; }
    edge.setLabels([{ attrs: { text: { text: "İlişkili", fill: "#5d6784", fontSize: 11 } }, position: 0.5 }]);
    persistAssetRelation(sourceId, targetId, "İlişkili");
    toast("İlişki eklendi. Etiketi düzenlemek için oka çift tıkla.");
  });
  graph.on("edge:removed", ({ edge }: { edge: Edge }) => {
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    if (!sourceId || !targetId) return;
    const source = state.assets.find((asset) => asset.id === sourceId);
    if (!source || !source.relatedAssetIds.includes(targetId)) return;
    source.relatedAssetIds = source.relatedAssetIds.filter((id) => id !== targetId);
    if (source.relatedAssetLabels) delete source.relatedAssetLabels[targetId];
    source.updated = "Az önce";
    save();
    const relationList = document.getElementById("asset-relation-list");
    if (relationList) renderAssetRelationList(relationList, assetDiagramAssets);
  });
  assetDiagramResizeObserver = new ResizeObserver(() => graph.resize(Math.max(container.clientWidth, 640), height));
  assetDiagramResizeObserver.observe(container);
}

function assetPickerMarkup(): string {
  return '<div class="field-label asset-select-field"><span>Ürün bileşenleri <small>(birden fazla seçebilirsin)</small></span><div class="asset-multiselect" id="new-assets-picker"><div id="new-assets-selected" class="asset-select-chips"></div><input id="new-assets-search" class="field-input asset-select-search" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="new-assets-options" placeholder="Kod, ad veya türe göre ara…"><div id="new-assets-options" class="asset-select-options" role="listbox" aria-multiselectable="true"></div></div><span class="field-hint">İşin etkileyeceği ekran, batch, rapor veya servisi seç.</span></div>';
}

function renderNewAssetSelection(): void {
  const selectedRoot = document.getElementById("new-assets-selected");
  if (!selectedRoot) return;
  const selectedAssets = draftAssetIds.map((id) => state.assets.find((asset) => asset.id === id)).filter((asset): asset is ProductAsset => Boolean(asset));
  selectedRoot.innerHTML = selectedAssets.map((asset) => '<span class="asset-select-chip"><span><strong>' + esc(asset.code) + '</strong> ' + esc(asset.name) + '</span><button type="button" data-remove-new-asset="' + esc(asset.id) + '" aria-label="' + esc(asset.name) + ' seçimini kaldır">×</button></span>').join("") || '<span class="asset-select-empty">Henüz bileşen seçilmedi</span>';
}

function renderNewAssetOptions(search = ""): void {
  const optionsRoot = document.getElementById("new-assets-options");
  if (!optionsRoot) return;
  const normalizedSearch = search.trim().toLocaleLowerCase("tr-TR");
  const selectableAssets = state.assets.filter((asset) => asset.active || draftAssetIds.includes(asset.id));
  const matches = selectableAssets.filter((asset) => !normalizedSearch || [asset.code, asset.name, asset.type, asset.project, asset.area].some((value) => value.toLocaleLowerCase("tr-TR").includes(normalizedSearch)));
  optionsRoot.innerHTML = matches.length ? matches.map((asset) => {
    const selected = draftAssetIds.includes(asset.id);
    return '<button type="button" class="asset-select-option ' + (selected ? "selected" : "") + '" role="option" aria-selected="' + selected + '" data-toggle-new-asset="' + esc(asset.id) + '"><span class="asset-select-check">' + (selected ? "✓" : "") + '</span><span class="asset-select-option-copy"><strong>' + esc(asset.code + " · " + asset.name) + '</strong><small>' + esc(asset.type + " · " + asset.project + (asset.active ? "" : " · Pasif")) + '</small></span></button>';
  }).join("") : '<div class="asset-select-no-results">Eşleşen ürün bileşeni bulunamadı.</div>';
}

function openQuickCreateModal(defaultType?: string, linkedItemId = ""): void {
  const defaultKind = defaultType === "Kişisel görev" ? "Kişisel görev" : defaultType === "Not" ? "Not" : "Backlog işi";
  const activeProject = state.projects.find((project) => project.id === activeProjectId && !project.archived) || state.projects.find((project) => !project.archived);
  const projects = state.projects.filter((project) => !project.archived);
  const lastAssignment = localStorage.getItem(QUICK_ASSIGNMENT_PREFERENCE_KEY) || "";
  const quickAssignments = state.teams.flatMap((team) => team.members.map((member) => ({ team, member, value: team.id + "::" + member })));
  quickAssignments.sort((left, right) => Number(right.value === lastAssignment) - Number(left.value === lastAssignment));
  const quickAssignmentOptions = '<option value="">Atama yok</option>' + quickAssignments.map(({ team, member, value }) => '<option value="' + esc(value) + '" ' + (lastAssignment === value ? "selected" : "") + '>' + esc((value === lastAssignment ? "Son kullanılan · " : "") + team.name + " · " + member) + '</option>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal quick-create-modal" role="dialog" aria-modal="true" aria-labelledby="quick-create-title"><header class="modal-header"><div><div class="panel-kicker">HIZLI KAYIT · Ctrl+Shift+N</div><h2 id="quick-create-title">Yeni kayıt oluştur</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><form id="quick-create-form" class="settings-form work-record-form"><label class="field-label">Kayıt türü<select class="field-input" name="kind"><option ' + (defaultKind === "Backlog işi" ? "selected" : "") + '>Backlog işi</option><option ' + (defaultKind === "Kişisel görev" ? "selected" : "") + '>Kişisel görev</option><option ' + (defaultKind === "Not" ? "selected" : "") + '>Not</option></select></label><label class="field-label record-primary-field">Başlık<input class="field-input" name="title" maxlength="120" required autocomplete="off" placeholder="Kısa ve eylem odaklı bir başlık yaz…"></label><label class="field-label">Açıklama <small>(isteğe bağlı)</small><textarea class="field-input field-textarea" name="description" rows="3" placeholder="Bağlamı veya sıradaki adımı ekle…"></textarea></label><details class="record-collapsible"><summary><span><strong>Detaylar</strong><small>Proje, atama, ilişki ve planlama</small></span><i aria-hidden="true"></i></summary><div class="record-collapsible-content"><div class="form-two-col"><label class="field-label">Proje<select class="field-input" name="project">' + projects.map((project) => '<option value="' + esc(project.name) + '" ' + (project.name === activeProject?.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label><label class="field-label">İş türü<select class="field-input" name="workType"><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="field-label">Varsayılan atama<select class="field-input" name="assignment">' + quickAssignmentOptions + '</select></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked"><option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === linkedItemId ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label><label class="field-label">Son tarih<input class="field-input" name="due" type="date"></label></div></div></details><div class="quick-create-hint">Enter ile kaydet · Kaydet ve yenisini aç ile seri kayıt oluştur</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-secondary" name="mode" value="continue">Kaydet ve yenisini aç</button><button type="submit" class="button button-primary" name="mode" value="close">Kaydet</button></footer></form></section></div>';
  modalRoot.querySelector('input[name="due"]')?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Hatırlat <input class="field-input" name="remindAt" type="datetime-local"></label>');
  modalRoot.querySelector<HTMLInputElement>('input[name="title"]')?.focus();
}

function trimQuotedEmailBody(body: string): string {
  const normalized = body.replace(/\r\n?/g, "\n").trim();
  const lines = normalized.split("\n");
  const markers = [/^\s*[-_ ]{2,}original message[-_ ]{2,}\s*$/i, /^\s*On .+wrote:\s*$/i, /^\s*(From|Gönderen|Kimden):\s*.+$/i, /^\s*>/];
  const cutoff = lines.findIndex((line, index) => index > 1 && markers.some((marker) => marker.test(line)));
  return (cutoff > 0 ? lines.slice(0, cutoff) : lines).join("\n").trim().slice(0, 12000);
}

async function droppedEmailFingerprint(subject: string, from: string, to: string, date: string, body: string): Promise<string> {
  const bytes = new TextEncoder().encode([subject, from, to, date, body].map((value) => value.trim().toLocaleLowerCase("tr-TR")).join("\n"));
  try {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
  } catch {
    let hash = 2166136261;
    bytes.forEach((value) => { hash ^= value; hash = Math.imul(hash, 16777619); });
    return (hash >>> 0).toString(16);
  }
}

function openKeyboardHelp(): void {
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal shortcut-help-modal" role="dialog" aria-modal="true" aria-labelledby="shortcut-help-title"><header class="modal-header"><div><div class="panel-kicker">KISAYOLLAR</div><h2 id="shortcut-help-title">Hızlı kullanım</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="shortcut-list"><div><span>Global arama</span><kbd>Ctrl K</kbd></div><div><span>Hızlı kayıt oluştur</span><kbd>Ctrl Shift N</kbd></div><div><span>Hızlı kayıtta kaydet</span><kbd>Enter</kbd></div><div><span>Hızlı kayıt formunu kapat</span><kbd>Esc</kbd></div><div><span>Satır içi düzenlemeyi kaydet</span><kbd>Enter</kbd></div></div><footer class="modal-footer"><button class="button button-primary" data-close-modal>Kapat</button></footer></section></div>';
}

function saveQuickCreate(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const values = new FormData(form);
  const kind = String(values.get("kind") || "Backlog işi");
  const title = String(values.get("title") || "").trim();
  const description = String(values.get("description") || "").trim();
  const linked = String(values.get("linked") || "");
  const project = String(values.get("project") || "");
  const assignmentValue = String(values.get("assignment") || "");
  const dueDate = String(values.get("due") || "");
  const remindAt = String(values.get("remindAt") || "");
  if (!title) { form.querySelector<HTMLInputElement>('input[name="title"]')?.focus(); return; }
  if (kind === "Backlog işi") {
    let id = nextId("PAY");
    while (state.items.some((item) => item.id === id)) id = nextId("PAY");
    const [teamId, member] = assignmentValue.split("::");
    const assignments = teamId && member && state.teams.find((team) => team.id === teamId)?.members.includes(member) ? [{ teamId, member }] : [];
    const item: WorkItem = { id, type: String(values.get("workType") || "Story") as WorkItem["type"], title, status: "Yeni", priority: "Orta", project: project || state.projects[0]?.name || "Genel", area: "Genel", updated: "Az önce", description, acceptance: [], attachments: [], labels: [], assignments, teamId: assignments[0]?.teamId || "", assignee: assignments[0]?.member || "", dependsOnIds: [], activity: [] };
    addWorkActivity(item, "created", "İş oluşturuldu.");
    state.items.unshift(item);
    activeProjectId = state.projects.find((entry) => entry.name === item.project)?.id || null;
    activeView = "backlog";
  } else if (kind === "Kişisel görev") {
    state.tasks.unshift({ id: nextId("TASK"), title, due: dueDate || "Tarih belirlenmedi", done: false, linked, description, attachments: [], remindAt: remindAt || undefined });
    activeView = "focus";
  } else {
    state.notes.unshift({ id: nextId("NOTE"), title, body: description, linked, updated: "Az önce", attachments: [] });
    activeView = "focus";
  }
  if (kind === "Backlog işi" && assignmentValue) localStorage.setItem(QUICK_ASSIGNMENT_PREFERENCE_KEY, assignmentValue);
  save();
  toast(kind === "Backlog işi" ? "Backlog işi oluşturuldu." : kind === "Kişisel görev" ? "Görev oluşturuldu." : "Not oluşturuldu.");
  if ((event.submitter as HTMLButtonElement | null)?.value === "continue") {
    form.querySelector<HTMLInputElement>('input[name="title"]')?.value && (form.querySelector<HTMLInputElement>('input[name="title"]')!.value = "");
    form.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!.value = "";
    form.querySelector<HTMLInputElement>('input[name="due"]')!.value = "";
    form.querySelector<HTMLInputElement>('input[name="remindAt"]')!.value = "";
    form.querySelector<HTMLInputElement>('input[name="title"]')?.focus();
    return;
  }
  const createdProjectId = kind === "Backlog işi" ? state.projects.find((entry) => entry.name === project)?.id : undefined;
  closeModal(true);
  setView(activeView);
  if (createdProjectId) setProject(createdProjectId);
}

function openNewModal(defaultType?: string, linkedAssetId?: string): void {
  pendingDroppedEmailSource = null;
  pendingEmailAttachmentToken = "";
  pendingEmailAttachmentChoices = [];
  draftAttachments = [];
  draftAssetIds = linkedAssetId ? [linkedAssetId] : [];
  attachmentTarget = { kind: "draft" };
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal new-modal" role="dialog" aria-modal="true" aria-labelledby="new-title"><header class="modal-header"><div><div class="panel-kicker">YENİ KAYIT</div><h2 id="new-title">Çalışma alanına ekle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="new-form" class="work-record-form"><label class="field-label">Kayıt türü<select id="new-kind" class="field-input"><option>Backlog işi</option><option>Kişisel görev</option><option>Not</option></select></label><label class="field-label">Başlık<input id="new-title-input" class="field-input" maxlength="120" placeholder="Örn. EFT iptal penceresini netleştir" required></label><label class="field-label">Açıklama<textarea id="new-description" class="field-input field-textarea" rows="3" placeholder="Bağlamı, yapılacak işi veya önemli noktaları yaz…"></textarea></label><div id="backlog-fields" class="form-two-col"><label class="field-label">Proje<select id="new-project" class="field-input"><option>Ödeme Platformu</option><option>Dijital Kanallar</option><option>Kredi Yaşam Döngüsü</option></select></label><label class="field-label">Öncelik<select id="new-priority" class="field-input"><option>Orta</option><option>Yüksek</option><option>Kritik</option><option>Düşük</option></select></label><label class="field-label">İş türü<select id="new-item-type" class="field-input"><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="field-label">Ürün alanı<input id="new-area" class="field-input" placeholder="Örn. Para Transferleri"></label><label class="field-label acceptance-field">Kabul kriterleri<textarea id="new-acceptance" class="field-input field-textarea" rows="2" placeholder="Her kriteri ayrı satıra yaz"></textarea></label></div><div id="task-fields" class="form-two-col hidden"><label class="field-label">Son tarih<select id="new-due" class="field-input"><option>Bugün</option><option>Yarın</option><option>Bu hafta</option><option>Tarih belirlenmedi</option></select></label><label class="field-label">İlişkili backlog işi<select id="new-linked-task" class="field-input"><option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label></div><div id="note-fields" class="form-two-col hidden"><label class="field-label">İlişkili backlog işi<select id="new-linked-note" class="field-input"><option value="">Bağımsız not</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label></div><div class="attachment-box"><div class="attachment-box-heading"><div><strong>Dosyalar</strong><small>İlgili belgeleri, görselleri veya akışları ekle.</small></div><button type="button" class="button button-secondary button-small" data-pick-files>＋ Dosya ekle</button><input id="file-fallback" type="file" multiple hidden></div><div id="draft-files" class="draft-files"></div></div><div class="privacy-note"><span>ⓘ</span> Müşteri, hesap veya kart bilgisi içeren dosyaları ekleme. Ekler bu cihazda saklanır.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet <span>✓</span></button></footer></form></section></div>';
  const projectSelect = document.getElementById("new-project") as HTMLSelectElement;
  projectSelect.innerHTML = state.projects.filter((project) => !project.archived).map((project) => '<option>' + esc(project.name) + '</option>').join("");
  const linkedAsset = linkedAssetId ? state.assets.find((asset) => asset.id === linkedAssetId) : undefined;
  projectSelect.value = linkedAsset?.project || state.projects.find((project) => project.id === activeProjectId && !project.archived)?.name || state.projects.find((project) => !project.archived)?.name || "";
  document.getElementById("new-area")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Başlangıç tarihi<input id="new-start-date" class="field-input" type="date"></label><label class="field-label">Hedef bitiş tarihi<input id="new-target-date" class="field-input" type="date"></label><label class="field-label">Planlanan dönem<input id="new-target-period" class="field-input" maxlength="40" placeholder="Örn. 2026 Q4"></label><label class="field-label">Tahmini efor (saat)<input id="new-estimate" class="field-input" type="number" min="0" step="0.5" placeholder="İsteğe bağlı"></label>');
  document.getElementById("new-due")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Hatırlat<input id="new-remind-at" class="field-input" type="datetime-local"></label>');
  document.querySelector('#new-form label.field-label:has(#new-title-input)')?.insertAdjacentHTML("beforeend", '<small class="field-help">Kısa ve eylem odaklı yaz. Örn. “Havale iptal nedeni raporunu ekle”.</small>');
  document.querySelector('#new-form label.field-label:has(#new-title-input)')?.insertAdjacentHTML("afterend", '<div id="duplicate-candidates" class="duplicate-candidates" hidden></div>');
  document.getElementById("new-estimate")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Ürün hedefi<select id="new-roadmap-node" class="field-input">' + roadmapNodeOptions() + '</select></label><label class="field-label">Ürün aşaması<select id="new-product-stage" class="field-input">' + productStageOptions() + '</select></label>');
  document.getElementById("new-product-stage")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Release<select id="new-release" class="field-input"><option value="">Release seçilmedi</option>' + state.releases.filter((release) => !release.archived && release.status !== "Yayınlandı" && release.status !== "İptal edildi").map((release) => '<option value="' + esc(release.id) + '">' + esc(release.name + " · " + release.project) + '</option>').join("") + '</select></label>');
  document.querySelector(".acceptance-field")?.insertAdjacentHTML("beforebegin", assetPickerMarkup());
  document.querySelector(".acceptance-field")?.insertAdjacentHTML("beforeend", acceptanceTemplateControls("new-acceptance", "Story"));
  renderNewAssetSelection();
  renderNewAssetOptions();
  if (linkedAsset) (document.getElementById("new-area") as HTMLInputElement).value = linkedAsset.area;
  document.getElementById("backlog-fields")?.insertAdjacentHTML("afterend", assignmentEditorMarkup("new-assignment-list"));
  const kind = field("new-kind");
  if (defaultType) kind.value = defaultType;
  updateNewForm();
  updateDuplicateCandidates();
  document.getElementById("new-title-input")?.focus();
}

function updateDuplicateCandidates(): void {
  const panel = document.getElementById("duplicate-candidates");
  if (!panel || field("new-kind").value !== "Backlog işi") return;
  const title = field("new-title-input").value.trim();
  const description = field("new-description").value.trim();
  const tokens = (value: string) => new Set(value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 2 && !["icin", "olan", "veya", "ile", "bir"].includes(word)));
  const overlap = (left: Set<string>, right: Set<string>) => { const union = new Set([...left, ...right]); return union.size ? [...left].filter((token) => right.has(token)).length / union.size : 0; };
  const titleTokens = tokens(title);
  if (titleTokens.size < 2) { panel.hidden = true; panel.innerHTML = ""; return; }
  const descriptionTokens = tokens(description);
  const candidates = state.items.filter((item) => !item.archived && item.status !== "Tamamlandı").map((item) => ({ item, score: overlap(titleTokens, tokens(item.title)) * 0.72 + (descriptionTokens.size ? overlap(descriptionTokens, tokens(item.description)) * 0.28 : 0) })).filter((candidate) => candidate.score >= 0.2).sort((a, b) => b.score - a.score).slice(0, 4);
  panel.hidden = !candidates.length;
  panel.innerHTML = candidates.length ? '<strong>Benzer açık işler</strong><p>Yeni kayıt oluşturmadan önce mükerrer işi kontrol et.</p>' + candidates.map(({ item, score }) => '<button type="button" data-open-item="' + esc(item.id) + '"><span><b>' + esc(item.id + " · " + item.title) + '</b><small>' + esc(item.project + " · " + item.status) + '</small></span><em>%' + Math.round(score * 100) + '</em></button>').join("") : "";
}

function updateNewForm(): void {
  const kind = (document.getElementById("new-kind") as HTMLSelectElement | null)?.value || "Backlog işi";
  document.getElementById("backlog-fields")?.classList.toggle("hidden", kind !== "Backlog işi");
  document.getElementById("new-assignment-list-editor")?.classList.toggle("hidden", kind !== "Backlog işi");
  document.getElementById("task-fields")?.classList.toggle("hidden", kind !== "Kişisel görev");
  document.getElementById("note-fields")?.classList.toggle("hidden", kind !== "Not");
}

function teamMemberRowMarkup(member = "", index = 0): string {
  return '<div class="team-member-row"><span class="team-member-index">' + String(index + 1).padStart(2, "0") + '</span><input class="field-input" name="members" maxlength="80" autocomplete="off" value="' + esc(member) + '" placeholder="Üye adı soyadı"><button type="button" class="team-member-remove" data-remove-team-member aria-label="Üyeyi kaldır" title="Üyeyi kaldır">×</button></div>';
}

function updateTeamMemberRows(): void {
  const list = document.getElementById("team-member-list");
  if (!list) return;
  const rows = [...list.querySelectorAll<HTMLElement>(".team-member-row")];
  rows.forEach((row, index) => {
    const number = row.querySelector<HTMLElement>(".team-member-index");
    if (number) number.textContent = String(index + 1).padStart(2, "0");
  });
  const count = document.getElementById("team-member-count");
  if (count) count.textContent = String(rows.filter((row) => Boolean(row.querySelector<HTMLInputElement>('input[name="members"]')?.value.trim())).length);
}

function openTeamEditor(teamId?: string): void {
  teamEditorReturnToSettings = Boolean(modalRoot.querySelector("#settings-title"));
  const team = teamId ? state.teams.find((entry) => entry.id === teamId) : undefined;
  const members = team?.members.length ? team.members : [""];
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal team-editor-modal" role="dialog" aria-modal="true" aria-labelledby="team-title"><header class="modal-header"><div><div class="panel-kicker">ÇALIŞMA EKİPLERİ</div><h2 id="team-title">' + (team ? "Takımı düzenle" : "Yeni takım oluştur") + '</h2><p class="team-editor-subtitle">Takım adını ve görevlere atanabilecek üyeleri belirle.</p></div><button class="modal-close" data-close-modal>×</button></header><form id="team-form" class="settings-form"><label class="field-label">Takım adı<input class="field-input" name="name" maxlength="60" required value="' + esc(team?.name || "") + '" placeholder="Örn. Ödeme Servisleri"></label><div class="team-members-section"><div class="team-members-heading"><div><strong>Takım üyeleri</strong><small>Görev atamalarında bu listeden seçim yapılır.</small></div><span class="team-member-count" id="team-member-count">' + (team?.members.length || 0) + '</span></div><div id="team-member-list" class="team-member-list">' + members.map((member, index) => teamMemberRowMarkup(member, index)).join("") + '</div><button type="button" class="button button-secondary team-add-member" data-add-team-member>＋ Üye ekle</button></div><input type="hidden" name="id" value="' + esc(team?.id || "") + '"><div class="settings-note">En az bir üye ekle. Üye adlarını daha sonra istediğin zaman düzenleyebilirsin.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-action="back-to-teams">Vazgeç</button><button type="submit" class="button button-primary">' + (team ? "Değişiklikleri kaydet" : "Takımı oluştur") + '</button></footer></form></section></div>';
}

function saveTeam(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const name = String(values.get("name") || "").trim();
  const members = [...new Set(values.getAll("members").map((member) => String(member).trim()).filter(Boolean))];
  if (!members.length) { toast("Takıma en az bir üye ekle."); return; }
  if (state.teams.some((team) => team.name.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR") && team.id !== id)) { toast("Bu takım adı zaten kullanılıyor."); return; }
  if (id) {
    const team = state.teams.find((entry) => entry.id === id);
    if (!team) return;
    team.name = name; team.members = members;
    state.items.forEach((item) => { item.assignments = validAssignments(getWorkAssignments(item)); syncLegacyAssignmentFields(item); });
    state.projects.forEach((project) => { project.assignments = validAssignments(project.assignments || []); });
  } else state.teams.push({ id: nextId("TEAM"), name, members });
  save();
  const returnToSettings = teamEditorReturnToSettings;
  teamEditorReturnToSettings = false;
  closeModal();
  if (returnToSettings) openWorkspaceSettings();
  else render();
  renderProjectNav();
  toast("Takım kaydedildi.");
}

function renderTeamDashboard(): void {
  const assignedItems = state.items.filter((item) => {
    if (!isItemInActiveProject(item) || getWorkAssignments(item).length === 0) return false;
    if (teamPlanFilters.startFrom && (!item.startDate || item.startDate < teamPlanFilters.startFrom)) return false;
    if (teamPlanFilters.targetTo && (!item.targetDate || item.targetDate > teamPlanFilters.targetTo)) return false;
    if (teamPlanFilters.period && !(item.targetPeriod || "").toLocaleLowerCase("tr-TR").includes(teamPlanFilters.period.toLocaleLowerCase("tr-TR"))) return false;
    if (teamPlanFilters.minEstimate && (item.estimate === undefined || item.estimate < Number(teamPlanFilters.minEstimate))) return false;
    if (teamPlanFilters.maxEstimate && (item.estimate === undefined || item.estimate > Number(teamPlanFilters.maxEstimate))) return false;
    return true;
  });
  const openItems = assignedItems.filter((item) => item.status !== "Tamamlandı");
  const blockedItems = assignedItems.filter((item) => item.status === "Bloke");
  const memberCount = state.teams.reduce((total, team) => total + team.members.length, 0);
  const teamsMarkup = state.teams.map((team) => {
    const teamItems = assignedItems.filter((item) => getWorkAssignments(item).some((assignment) => assignment.teamId === team.id));
    const memberCards = team.members.map((member) => {
      const memberItems = teamItems.filter((item) => getWorkAssignments(item).some((assignment) => assignment.teamId === team.id && assignment.member === member));
      const active = memberItems.filter((item) => item.status !== "Tamamlandı");
      const blocked = memberItems.filter((item) => item.status === "Bloke");
      const completed = memberItems.filter((item) => item.status === "Tamamlandı");
      const initials = member.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toLocaleUpperCase("tr-TR");
      const memberEstimate = memberItems.reduce((total, item) => total + (item.estimate || 0), 0);
      const recentItems = memberItems.slice(0, 3).map((item) => '<button class="team-member-task" data-open-item="' + esc(item.id) + '"><span><strong>' + esc(item.title) + '</strong><small>' + esc(item.id) + ' · ' + esc(itemLastActivityLabel(item)) + (item.targetPeriod ? ' · ' + esc(item.targetPeriod) : '') + '</small></span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>').join("");
      return '<article class="team-member-card" data-member-name="' + esc(member.toLocaleLowerCase("tr-TR")) + '"><header class="team-member-card-header"><span class="team-member-avatar">' + esc(initials) + '</span><div class="team-member-identity"><strong>' + esc(member) + '</strong><small>' + (memberItems.length ? memberItems.length + ' atanmış iş' : 'Henüz atanmış iş yok') + (memberEstimate ? ' · ' + memberEstimate + ' sa tahmin' : '') + '</small></div><button class="text-button team-member-open-backlog" data-action="member-backlog" data-team-id="' + esc(team.id) + '" data-member="' + esc(member) + '">İşlerini gör</button><button class="team-member-remove-dashboard" data-remove-dashboard-member="' + esc(team.id) + '" data-team-member="' + esc(member) + '" title="Üyeyi takımdan çıkar" aria-label="' + esc(member) + ' üyesini takımdan çıkar">×</button></header><div class="team-member-metrics"><span><strong>' + active.length + '</strong>Açık</span><span><strong>' + blocked.length + '</strong>Bloke</span><span><strong>' + completed.length + '</strong>Tamamlandı</span></div><div class="team-member-tasks">' + (recentItems || '<div class="team-member-empty">Bu üyeye henüz iş atanmamış.</div>') + '</div></article>';
    }).join("");
    const teamEstimate = teamItems.reduce((total, item) => total + (item.estimate || 0), 0);
    return '<section class="team-dashboard-section"><header class="team-dashboard-team-header"><div><div class="panel-kicker">TAKIM</div><h2>' + esc(team.name) + '</h2><p>' + team.members.length + ' üye · ' + teamItems.filter((item) => item.status !== "Tamamlandı").length + ' açık iş · ' + teamItems.filter((item) => item.status === "Bloke").length + ' bloke' + (teamEstimate ? ' · ' + teamEstimate + ' sa tahmin' : '') + '</p></div><button class="button button-secondary" data-action="edit-team" data-team-id="' + esc(team.id) + '">Takımı düzenle</button></header><div class="team-member-grid">' + (memberCards || '<div class="team-no-members">Bu takımda henüz üye yok. Aşağıdan ilk üyeyi ekle.</div>') + '</div><div class="team-inline-add" data-team-inline-add><input class="field-input" data-team-member-input="' + esc(team.id) + '" maxlength="80" placeholder="Yeni üyenin adı soyadı" aria-label="' + esc(team.name) + ' takımına üye ekle"><button class="button button-secondary" data-add-dashboard-member="' + esc(team.id) + '">＋ Üye ekle</button></div></section>';
  }).join("");
  const estimateTotal = assignedItems.reduce((total, item) => total + (item.estimate || 0), 0);
  root.innerHTML = '<div class="page-content teams-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÇALIŞMA ALANI · EKİPLER</div><h1>Takım paneli</h1><p>İş dağılımını ve ilerlemeyi takım ve üye bazında takip et.</p></div><button class="button button-primary" data-action="new-team"><span class="button-plus">+</span> Takım ekle</button></section><label class="team-member-search"><span>⌕</span><input id="team-member-search" type="search" placeholder="Üye ara…" aria-label="Takım panelinde üye ara"></label><section class="team-overview-stats"><article><span>Takım</span><strong>' + state.teams.length + '</strong></article><article><span>Üye</span><strong>' + memberCount + '</strong></article><article><span>Atanmış iş</span><strong>' + assignedItems.length + '</strong></article><article><span>Açık iş</span><strong>' + openItems.length + '</strong></article><article class="team-stat-blocked"><span>Bloke</span><strong>' + blockedItems.length + '</strong></article><article><span>Tahmini efor</span><strong>' + estimateTotal + ' sa</strong></article></section><section class="team-plan-filters"><button class="button button-quiet button-small" data-action="clear-team-filters">Filtreleri temizle</button><label>Başlangıç tarihi (en erken)<input class="field-input" id="team-filter-start" type="date" value="' + esc(teamPlanFilters.startFrom) + '"></label><label>Hedef bitiş (en geç)<input class="field-input" id="team-filter-target" type="date" value="' + esc(teamPlanFilters.targetTo) + '"></label><label>Dönem<input class="field-input" id="team-filter-period" value="' + esc(teamPlanFilters.period) + '" placeholder="Örn. 2026 Q4"></label><label>En az efor (sa)<input class="field-input" id="team-filter-min-estimate" type="number" min="0" value="' + esc(teamPlanFilters.minEstimate) + '"></label><label>En çok efor (sa)<input class="field-input" id="team-filter-max-estimate" type="number" min="0" value="' + esc(teamPlanFilters.maxEstimate) + '"></label></section>' + (teamsMarkup || '<section class="team-dashboard-empty"><span class="team-empty-icon">♧</span><h2>Henüz takım oluşturulmadı</h2><p>Üyeleri ekleyip backlog Task işlerini atayabileceğin ilk takımını oluştur.</p><button class="button button-primary" data-action="new-team">＋ İlk takımı oluştur</button></section>') + '</div>';
}

function renderRoadmap(): void {
  const activeProjectNames = new Set(state.projects.filter((project) => !project.archived).map((project) => project.name));
  const visibleRoadmap = state.roadmap.filter((node) => activeProjectNames.has(node.project));
  const initiatives = visibleRoadmap.filter((node) => node.type === "Initiative");
  const months = Array.from({ length: 6 }, (_, index) => { const date = new Date(); date.setDate(1); date.setMonth(date.getMonth() + index); return date.toLocaleDateString("tr-TR", { month: "short" }); });
  const initiativeMarkup = initiatives.map((initiative) => {
    const epics = visibleRoadmap.filter((node) => node.parentId === initiative.id);
    const linkedItems = state.items.filter((item) => item.roadmapNodeId === initiative.id || epics.some((epic) => epic.id === item.roadmapNodeId));
    const completed = linkedItems.filter((item) => item.status === "Tamamlandı").length;
    const progress = linkedItems.length ? Math.round(completed / linkedItems.length * 100) : 0;
    const epicMarkup = epics.map((epic) => {
      const epicItems = state.items.filter((item) => item.roadmapNodeId === epic.id);
      const epicCompleted = epicItems.filter((item) => item.status === "Tamamlandı").length;
      const epicProgress = epicItems.length ? Math.round(epicCompleted / epicItems.length * 100) : 0;
      const itemsMarkup = epicItems.map((item) => '<button class="roadmap-work-item" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id) + '</span><strong>' + esc(item.title) + '</strong><span class="roadmap-product-stage">' + esc(item.productStage || "Sırada") + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>').join("");
      return '<article class="roadmap-epic" data-context-roadmap-id="' + esc(epic.id) + '"><header><div><span class="roadmap-type-label">EPIC</span><strong>' + esc(epic.title) + '</strong><small>' + esc(epic.project) + ' · ' + epicItems.length + ' iş · ' + epicProgress + '% tamamlandı</small></div><button class="button button-quiet button-small" data-action="edit-roadmap" data-id="' + esc(epic.id) + '">Düzenle</button></header>' + roadmapTimelineBar(epic) + (itemsMarkup ? '<div class="roadmap-work-list">' + itemsMarkup + '</div>' : '<p class="roadmap-empty-inline">Bu epic altında henüz backlog işi yok.</p>') + '</article>';
    }).join("");
    const dateChange = initiative.dateHistory?.[0];
    return '<article class="roadmap-initiative" data-context-roadmap-id="' + esc(initiative.id) + '"><header class="roadmap-initiative-header"><div><span class="roadmap-type-label">ÜRÜN HAMLESİ</span><h2>' + esc(initiative.title) + '</h2><p>' + esc(initiative.project) + ' · ' + esc(initiative.owner || "Sahip atanmadı") + ' · ' + esc(initiative.stage) + '</p></div><div class="roadmap-actions"><button class="button button-secondary button-small" data-action="create-epic" data-parent-id="' + esc(initiative.id) + '">＋ Epic</button><button class="button button-quiet button-small" data-action="edit-roadmap" data-id="' + esc(initiative.id) + '">Düzenle</button><button class="button button-quiet button-small" data-action="delete-roadmap" data-id="' + esc(initiative.id) + '">Sil</button></div></header><p class="roadmap-goal">' + esc(initiative.goal || "Hedef tanımlanmadı.") + '</p><div class="roadmap-meta"><span>Başarı ölçütü: <strong>' + esc(initiative.successMetric || "Tanımlanmadı") + '</strong></span><span>' + esc(initiative.startDate || "Başlangıç yok") + ' → ' + esc(initiative.targetDate || "Hedef tarih yok") + '</span><span>' + linkedItems.length + ' iş · ' + completed + ' tamamlandı · ' + progress + '%</span></div><div class="roadmap-progress"><i style="width:' + progress + '%"></i></div>' + roadmapTimelineBar(initiative) + (dateChange ? '<small class="roadmap-date-change">Son tarih değişikliği: ' + esc(dateChange.from || "belirlenmedi") + ' → ' + esc(dateChange.to || "belirlenmedi") + ' · ' + esc(dateChange.actor) + '</small>' : '') + (epicMarkup || '<p class="roadmap-empty-inline">Bu ürün hamlesi altında epic yok.</p>') + '</article>';
  }).join("");
  const unplanned = state.items.filter((item) => !item.roadmapNodeId && isItemInActiveProject(item));
  const axis = '<div class="roadmap-month-axis">' + months.map((month) => '<span>' + esc(month) + '</span>').join("") + '</div>';
  root.innerHTML = '<div class="page-content roadmap-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN PLANLAMA</div><h1>Yol haritası</h1><p>Ürün hedeflerini, epic kapsamını ve backlog teslimatını birlikte gör.</p></div><button class="button button-primary" data-action="create-roadmap">＋ Ürün hamlesi oluştur</button></section><section class="roadmap-stage-strip">' + PRODUCT_STAGES.map((stage) => '<div><span>' + esc(stage) + '</span><strong>' + visibleRoadmap.filter((node) => node.stage === stage).length + '</strong></div>').join("") + '</section>' + axis + (initiativeMarkup || '<section class="roadmap-empty"><h2>Henüz ürün hedefi yok</h2><p>Bir ürün hamlesi oluşturarak ölçülebilir hedefini, sahibini ve zaman aralığını belirle.</p><button class="button button-primary" data-action="create-roadmap">İlk ürün hamlesini oluştur</button></section>') + (unplanned.length ? '<section class="roadmap-unplanned"><h2>Henüz hedefe bağlanmayan işler <span class="count-chip">' + unplanned.length + '</span></h2><div class="roadmap-work-list">' + unplanned.map((item) => '<button class="roadmap-work-item" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id) + '</span><strong>' + esc(item.title) + '</strong><span class="roadmap-product-stage">' + esc(item.productStage || "Sırada") + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>').join("") + '</div></section>' : '') + '</div>';
}

const RELEASE_STATUSES: ReleaseStatus[] = ["Planlanıyor", "Hazırlanıyor", "Yayına hazır", "Yayınlandı", "Ertelendi", "İptal edildi"];

let decisionQuery = "";
let decisionFilter: "all" | "active" | "review" | "draft" | "invalid" = "all";

function decisionSnapshot(decision: ProductDecision): ProductDecisionSnapshot {
  return {
    title: decision.title, context: decision.context, options: [...decision.options], rationale: decision.rationale,
    owner: decision.owner, decidedAt: decision.decidedAt, reviewAt: decision.reviewAt, status: decision.status,
    workItemIds: [...decision.workItemIds], assetIds: [...decision.assetIds], projectIds: [...decision.projectIds], releaseIds: [...decision.releaseIds]
  };
}

function decisionEffectiveStatus(decision: ProductDecision): ProductDecision["status"] {
  if (decision.supersededById) return "Geçersiz";
  if (decision.status === "Geçerli" && decision.reviewAt && decision.reviewAt < new Date().toISOString().slice(0, 10)) return "Gözden geçirilecek";
  return decision.status;
}

function decisionSearchIndex(decision: ProductDecision): string {
  const parts = [decision.title, decision.context, decision.options.join(" "), decision.rationale, decision.owner,
    ...decision.workItemIds.map((id) => { const item = itemById(id); return id + " " + (item?.title || ""); }),
    ...decision.assetIds.map((id) => { const asset = state.assets.find((entry) => entry.id === id); return id + " " + (asset?.name || ""); }),
    ...decision.projectIds.map((id) => state.projects.find((project) => project.id === id)?.name || id),
    ...decision.releaseIds.map((id) => { const release = state.releases.find((entry) => entry.id === id); return id + " " + (release?.name || ""); }),
    ...decision.history.flatMap((entry) => [entry.summary, entry.snapshot.title, entry.snapshot.context, entry.snapshot.options.join(" "), entry.snapshot.rationale, entry.changedBy])
  ];
  return parts.join(" ").toLocaleLowerCase("tr-TR");
}

function decisionMatchesSearch(decision: ProductDecision, queryText: string): boolean {
  const normalized = decisionSearchIndex(decision);
  return queryText.trim().toLocaleLowerCase("tr-TR").split(/\s+/).filter(Boolean).every((term) => normalized.includes(term));
}

function renderDecisions(): void {
  state.decisions ||= [];
  const decisions = state.decisions || [];
  const all = [...decisions].sort((left, right) => right.decidedAt.localeCompare(left.decidedAt) || right.updatedAt.localeCompare(left.updatedAt));
  const filtered = all.filter((decision) => {
    const status = decisionEffectiveStatus(decision);
    const matchesFilter = decisionFilter === "all" || (decisionFilter === "active" && status === "Geçerli") || (decisionFilter === "review" && status === "Gözden geçirilecek") || (decisionFilter === "draft" && status === "Taslak") || (decisionFilter === "invalid" && status === "Geçersiz");
    return matchesFilter && decisionMatchesSearch(decision, decisionQuery);
  });
  const activeCount = all.filter((decision) => decisionEffectiveStatus(decision) === "Geçerli").length;
  const reviewCount = all.filter((decision) => decisionEffectiveStatus(decision) === "Gözden geçirilecek").length;
  const cards = filtered.map((decision) => {
    const status = decisionEffectiveStatus(decision);
    const supersedes = decision.supersedesId ? decisions.find((entry) => entry.id === decision.supersedesId) : undefined;
    const linkedCount = decision.workItemIds.length + decision.assetIds.length + decision.projectIds.length + decision.releaseIds.length;
    return '<article class="decision-card" data-decision-id="' + esc(decision.id) + '" data-decision-status="' + esc(status) + '" data-decision-index="' + esc(decisionSearchIndex(decision)) + '"><button type="button" class="decision-card-main" data-action="open-decision" data-id="' + esc(decision.id) + '"><span class="decision-status decision-status-' + esc(status.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")) + '">' + esc(status) + '</span><h2>' + esc(decision.title) + '</h2><p>' + esc(decision.rationale || decision.context || "Gerekçe henüz eklenmedi.") + '</p><span class="decision-meta">' + esc(decision.owner || "Sahip belirtilmedi") + ' · Karar ' + esc(decision.decidedAt || "Tarih belirtilmedi") + (decision.reviewAt ? ' · Gözden geçirme ' + esc(decision.reviewAt) : '') + '</span><span class="decision-meta">' + linkedCount + ' bağlantı · ' + decision.history.length + ' geçmiş sürüm' + (supersedes ? ' · Önceki karar: ' + esc(supersedes.title) : '') + '</span></button><button type="button" class="icon-button decision-edit" data-action="edit-decision" data-id="' + esc(decision.id) + '" aria-label="Kararı düzenle" title="Kararı düzenle">✎</button></article>';
  }).join("");
  root.innerHTML = '<div class="page-content decisions-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN YÖNETİMİ · KARAR HAFIZASI</div><h1>Ürün kararları</h1><p>Gerekçeleri, gözden geçirme tarihlerini ve kararlardan etkilenen kayıtları tek yerde izleyin.</p></div><button class="button button-primary" data-action="new-decision">＋ Karar kaydet</button></section><section class="decision-summary"><div><span>Karar kaydı</span><strong>' + all.length + '</strong></div><div><span>Geçerli</span><strong>' + activeCount + '</strong></div><div><span>Gözden geçirme zamanı</span><strong>' + reviewCount + '</strong></div></section><div class="decision-toolbar"><label class="filter-search"><span>⌕</span><input id="decision-search" type="search" placeholder="Karar, gerekçe, kayıt veya eski sürümlerde ara…" value="' + esc(decisionQuery) + '"></label><select id="decision-filter" class="field-input" aria-label="Kararları duruma göre filtrele"><option value="all" ' + (decisionFilter === "all" ? "selected" : "") + '>Tüm kararlar</option><option value="active" ' + (decisionFilter === "active" ? "selected" : "") + '>Geçerli</option><option value="review" ' + (decisionFilter === "review" ? "selected" : "") + '>Gözden geçirilecek</option><option value="draft" ' + (decisionFilter === "draft" ? "selected" : "") + '>Taslak</option><option value="invalid" ' + (decisionFilter === "invalid" ? "selected" : "") + '>Geçersiz / yerine yenisi geldi</option></select><span class="decision-result-count" id="decision-result-count">' + filtered.length + ' kayıt</span></div><div class="decision-list" id="decision-list">' + cards + '<div class="empty-state" data-decision-empty ' + (filtered.length ? 'hidden' : '') + '>' + (all.length ? 'Bu filtre veya aramayla eşleşen karar yok.' : 'Henüz ürün kararı kaydedilmedi. Kapsamı, seçenekleri ve gerekçeyi yazarak ürünün karar geçmişini oluşturmaya başlayın.') + '</div></div></div>';
}

function openDecisionEditor(id?: string): void {
  state.decisions ||= [];
  const decision = id ? state.decisions.find((entry) => entry.id === id) : undefined;
  const multiOptions = (name: string, label: string, options: { id: string; label: string }[], selected: string[]) => '<label class="field-label">' + label + '<select class="field-input decision-multi-select" name="' + name + '" multiple size="' + Math.min(5, Math.max(3, options.length)) + '">' + options.map((option) => '<option value="' + esc(option.id) + '" ' + (selected.includes(option.id) ? 'selected' : '') + '>' + esc(option.label) + '</option>').join("") + '</select><small>Birden fazla kayıt seçmek için Ctrl (Mac’te ⌘) tuşunu kullan.</small></label>';
  const selectablePrevious = state.decisions.filter((entry) => entry.id !== id && !entry.supersededById);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal decision-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KARAR KAYDI · ÜRÜN HAFIZASI</div><h2>' + (decision ? 'Kararı düzenle' : 'Yeni ürün kararı') + '</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><form id="decision-form" class="settings-form"><label class="field-label">Karar başlığı<input class="field-input" name="title" maxlength="160" required value="' + esc(decision?.title || '') + '" placeholder="Örn. FAST işleminde günlük limit kontrolü sunucu tarafında yapılır"></label><label class="field-label">Bağlam / ihtiyaç<textarea class="field-input field-textarea" name="context" rows="3" maxlength="2500" required placeholder="Kararı gerekli kılan ürün, müşteri veya operasyon ihtiyacı…">' + esc(decision?.context || '') + '</textarea></label><label class="field-label">Değerlendirilen seçenekler <small>(her satırda bir seçenek)</small><textarea class="field-input field-textarea" name="options" rows="3" maxlength="2500" placeholder="Seçenekleri ve temel etkilerini yaz…">' + esc((decision?.options || []).join('\n')) + '</textarea></label><label class="field-label">Karar ve gerekçe<textarea class="field-input field-textarea" name="rationale" rows="3" maxlength="2500" required placeholder="Seçilen yaklaşım ve nedenleri…">' + esc(decision?.rationale || '') + '</textarea></label><div class="form-two-col"><label class="field-label">Karar sahibi<input class="field-input" name="owner" maxlength="100" required value="' + esc(decision?.owner || state.profile.userName || '') + '"></label><label class="field-label">Karar tarihi<input class="field-input" name="decidedAt" type="date" required value="' + esc(decision?.decidedAt || new Date().toISOString().slice(0, 10)) + '"></label><label class="field-label">Gözden geçirme tarihi<input class="field-input" name="reviewAt" type="date" value="' + esc(decision?.reviewAt || '') + '"></label><label class="field-label">Durum<select class="field-input" name="status">' + (["Taslak", "Geçerli", "Gözden geçirilecek", "Geçersiz"] as ProductDecision["status"][]).map((status) => '<option ' + (status === (decision?.status || "Geçerli") ? 'selected' : '') + '>' + status + '</option>').join('') + '</select></label></div>' + multiOptions("workItemIds", "İlişkili backlog işleri", state.items.filter((item) => !item.archived).map((item) => ({ id: item.id, label: item.id + ' · ' + item.title })), decision?.workItemIds || []) + multiOptions("assetIds", "Ürün bileşenleri", state.assets.map((asset) => ({ id: asset.id, label: asset.code + ' · ' + asset.name })), decision?.assetIds || []) + multiOptions("projectIds", "Projeler", state.projects.map((project) => ({ id: project.id, label: project.name })), decision?.projectIds || []) + multiOptions("releaseIds", "Release kayıtları", state.releases.map((release) => ({ id: release.id, label: release.name + ' · ' + release.project })), decision?.releaseIds || []) + (!decision && selectablePrevious.length ? '<label class="field-label">Yerine geçtiği karar<select class="field-input" name="supersedesId"><option value="">Önceki kararı değiştirmiyor</option>' + selectablePrevious.map((entry) => '<option value="' + esc(entry.id) + '">' + esc(entry.title + ' · ' + entry.status) + '</option>').join('') + '</select><small>Kaydedince önceki karar geçersiz olarak işaretlenir ve yenisine bağlanır.</small></label>' : '') + '<input type="hidden" name="id" value="' + esc(decision?.id || '') + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kararı kaydet</button></footer></form></section></div>';
}

function openDecisionDetail(id: string): void {
  const decisions = state.decisions || [];
  const decision = decisions.find((entry) => entry.id === id);
  if (!decision) return;
  const status = decisionEffectiveStatus(decision);
  const links: string[] = [];
  decision.workItemIds.forEach((itemId) => { const item = itemById(itemId); links.push(item ? '<button class="linked-badge" data-open-item="' + esc(item.id) + '">İş · ' + esc(item.id + ' · ' + item.title) + '</button>' : '<span class="linked-badge">Silinmiş iş · ' + esc(itemId) + '</span>'); });
  decision.assetIds.forEach((assetId) => { const asset = state.assets.find((entry) => entry.id === assetId); links.push(asset ? '<button class="linked-badge" data-open-asset="' + esc(asset.id) + '">Bileşen · ' + esc(asset.code + ' · ' + asset.name) + '</button>' : '<span class="linked-badge">Silinmiş bileşen · ' + esc(assetId) + '</span>'); });
  decision.projectIds.forEach((projectId) => { const project = state.projects.find((entry) => entry.id === projectId); links.push(project ? '<button class="linked-badge" data-decision-open-project="' + esc(project.id) + '">Proje · ' + esc(project.name) + '</button>' : '<span class="linked-badge">Silinmiş proje · ' + esc(projectId) + '</span>'); });
  decision.releaseIds.forEach((releaseId) => { const release = state.releases.find((entry) => entry.id === releaseId); links.push(release ? '<button class="linked-badge" data-action="edit-release" data-id="' + esc(release.id) + '">Release · ' + esc(release.name) + '</button>' : '<span class="linked-badge">Silinmiş release · ' + esc(releaseId) + '</span>'); });
  const prior = decision.supersedesId ? decisions.find((entry) => entry.id === decision.supersedesId) : undefined;
  const successor = decision.supersededById ? decisions.find((entry) => entry.id === decision.supersededById) : undefined;
  const history = decision.history.map((entry) => '<article class="decision-history-entry"><header><strong>v' + entry.version + ' · ' + esc(entry.snapshot.title) + '</strong><span>' + esc(new Date(entry.changedAt).toLocaleString('tr-TR')) + ' · ' + esc(entry.changedBy) + '</span></header><p>' + esc(entry.summary) + '</p><div><small>Bağlam</small><p>' + esc(entry.snapshot.context) + '</p></div><div><small>Karar ve gerekçe</small><p>' + esc(entry.snapshot.rationale) + '</p></div><details><summary>Bu sürümün seçenekleri ve bağlantıları</summary><p>' + esc(entry.snapshot.options.join(' · ') || 'Seçenek kaydı yok') + '</p><small>' + entry.snapshot.workItemIds.length + ' iş · ' + entry.snapshot.assetIds.length + ' bileşen · ' + entry.snapshot.projectIds.length + ' proje · ' + entry.snapshot.releaseIds.length + ' release</small></details></article>').join('');
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal decision-detail-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">ÜRÜN KARARI · ' + esc(decision.id) + '</div><h2>' + esc(decision.title) + '</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><div class="decision-detail-content"><div class="decision-detail-meta"><span class="decision-status decision-status-' + esc(status.toLocaleLowerCase('tr-TR').replaceAll(' ', '-')) + '">' + esc(status) + '</span><span>Sahip: <strong>' + esc(decision.owner) + '</strong></span><span>Karar tarihi: <strong>' + esc(decision.decidedAt) + '</strong></span><span>Gözden geçirme: <strong>' + esc(decision.reviewAt || 'Planlanmadı') + '</strong></span></div><section class="decision-detail-section"><h3>Bağlam / ihtiyaç</h3><p>' + esc(decision.context) + '</p></section><section class="decision-detail-section"><h3>Değerlendirilen seçenekler</h3>' + (decision.options.length ? '<ol>' + decision.options.map((option) => '<li>' + esc(option) + '</li>').join('') + '</ol>' : '<p>Seçenek kaydı yok.</p>') + '</section><section class="decision-detail-section"><h3>Karar ve gerekçe</h3><p>' + esc(decision.rationale) + '</p></section>' + (prior || successor ? '<section class="decision-detail-section"><h3>Karar zinciri</h3>' + (prior ? '<button class="linked-badge" data-action="open-decision" data-id="' + esc(prior.id) + '">Yerine geçtiği karar · ' + esc(prior.title) + '</button>' : '') + (successor ? '<button class="linked-badge" data-action="open-decision" data-id="' + esc(successor.id) + '">Bu kararın yerine gelen · ' + esc(successor.title) + '</button>' : '') + '</section>' : '') + '<section class="decision-detail-section"><h3>İlişkili kayıtlar <span class="count-chip">' + links.length + '</span></h3><div class="relationship-chip-list">' + (links.join('') || '<p class="asset-muted">Bu karara henüz kayıt bağlanmadı.</p>') + '</div></section><section class="decision-detail-section"><h3>Karar geçmişi <span class="count-chip">' + decision.history.length + '</span></h3>' + (history || '<p class="asset-muted">Düzenleme geçmişi henüz oluşmadı.</p>') + '</section><small class="decision-updated">Son güncelleme · ' + esc(new Date(decision.updatedAt).toLocaleString('tr-TR')) + '</small></div><footer class="modal-footer"><button class="button button-quiet" data-close-modal>Kapat</button><button class="button button-primary" data-action="edit-decision" data-id="' + esc(decision.id) + '">Kararı düzenle</button></footer></section></div>';
}

function saveDecision(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const values = new FormData(form);
  const title = String(values.get('title') || '').trim();
  const context = String(values.get('context') || '').trim();
  const rationale = String(values.get('rationale') || '').trim();
  const owner = String(values.get('owner') || '').trim();
  if (!title || !context || !rationale || !owner) { toast('Başlık, bağlam, gerekçe ve karar sahibi zorunludur.'); return; }
  const id = String(values.get('id') || '');
  const existing = state.decisions?.find((entry) => entry.id === id);
  const now = new Date().toISOString();
  const readMulti = (name: string): string[] => [...form.querySelectorAll<HTMLSelectElement>('select[name="' + name + '"]')].flatMap((select) => [...select.selectedOptions].map((option) => option.value));
  const next: ProductDecisionSnapshot = {
    title, context,
    options: String(values.get('options') || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
    rationale, owner, decidedAt: String(values.get('decidedAt') || ''), reviewAt: String(values.get('reviewAt') || '') || undefined,
    status: String(values.get('status') || 'Geçerli') as ProductDecision['status'],
    workItemIds: readMulti('workItemIds').filter((targetId) => state.items.some((item) => item.id === targetId)),
    assetIds: readMulti('assetIds').filter((targetId) => state.assets.some((asset) => asset.id === targetId)),
    projectIds: readMulti('projectIds').filter((targetId) => state.projects.some((project) => project.id === targetId)),
    releaseIds: readMulti('releaseIds').filter((targetId) => state.releases.some((release) => release.id === targetId))
  };
  state.decisions ||= [];
  if (existing) {
    existing.history ||= [];
    existing.history.unshift({ version: existing.history.length + 1, changedAt: now, changedBy: state.profile.userName || 'PO', summary: 'Karar kaydı güncellendi.', snapshot: decisionSnapshot(existing) });
    Object.assign(existing, next, { updatedAt: now });
  } else {
    const newId = nextId('DEC');
    const decision: ProductDecision = { ...next, id: newId, history: [], updatedAt: now };
    const supersedesId = String(values.get('supersedesId') || '');
    const previous = state.decisions.find((entry) => entry.id === supersedesId && !entry.supersededById);
    if (previous) {
      previous.history ||= [];
      previous.history.unshift({ version: previous.history.length + 1, changedAt: now, changedBy: state.profile.userName || 'PO', summary: 'Yeni karar bu kaydın yerine geçti.', snapshot: decisionSnapshot(previous) });
      previous.status = 'Geçersiz'; previous.supersededById = newId; previous.updatedAt = now;
      decision.supersedesId = previous.id;
    }
    state.decisions.unshift(decision);
  }
  save(); closeModal(); activeView = 'decisions'; document.querySelectorAll<HTMLElement>('.nav-item').forEach((node) => node.classList.toggle('active', node.dataset.view === 'decisions')); (document.getElementById('breadcrumb-current') as HTMLElement).textContent = 'Ürün kararları'; render(); toast(existing ? 'Karar ve sürüm geçmişi kaydedildi.' : 'Ürün kararı kaydedildi.');
}

function renderReleases(): void {
  const releases = state.releases.filter((release) => !release.archived && isItemInActiveProject({ project: release.project } as WorkItem)).sort((a, b) => (a.plannedDate || "9999").localeCompare(b.plannedDate || "9999"));
  const cards = releases.map((release) => {
    const scope = state.items.filter((item) => item.releaseId === release.id);
    const unfinished = scope.filter((item) => item.status !== "Tamamlandı");
    const blocked = unfinished.filter((item) => item.status === "Bloke");
    const completion = scope.length ? Math.round((scope.length - unfinished.length) / scope.length * 100) : 0;
    return '<article class="release-card" data-release-id="' + esc(release.id) + '"><header><div><div class="panel-kicker">' + esc(release.project) + ' · ' + esc(release.id) + '</div><h2>' + esc(release.name) + '</h2></div><span class="release-status release-status-' + esc(release.status.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")) + '">' + esc(release.status) + '</span></header><p class="release-description">' + esc(release.description || "Açıklama eklenmedi.") + '</p><div class="release-dates"><span>Planlanan <strong>' + esc(release.plannedDate || "Belirtilmedi") + '</strong></span><span>Yayın tarihi <strong>' + esc(release.actualDate || "Henüz yayınlanmadı") + '</strong></span></div><div class="release-progress"><div><span>Kapsam tamamlanma</span><strong>' + completion + '% · ' + (scope.length - unfinished.length) + '/' + scope.length + ' iş</strong></div><i><b style="width:' + completion + '%"></b></i></div>' + (unfinished.length ? '<div class="release-warning">' + blocked.length + ' bloke, ' + (unfinished.length - blocked.length) + ' tamamlanmamış iş' + (release.status === "Yayına hazır" || release.status === "Yayınlandı" ? ' · Yayın durumu kapsam uyarısına rağmen seçilmiş' : '') + '</div>' : '<div class="release-ready">' + (scope.length ? 'Kapsamdaki işler tamamlandı.' : 'Bu release için henüz iş seçilmedi.') + '</div>') + (release.status === "Yayınlandı" ? '<div class="release-notes"><strong>Yayın notu</strong><p>' + esc(release.releaseNotes || "Yayın notu girilmedi.") + '</p><strong>Hedef sonucu</strong><p>' + esc(release.outcome || "Sonuç henüz değerlendirilmedi.") + '</p></div>' : '') + '<footer><button class="button button-secondary button-small" data-action="edit-release" data-id="' + esc(release.id) + '">Düzenle</button><button class="button button-quiet button-small" data-action="delete-release" data-id="' + esc(release.id) + '">Sil</button><button class="button button-primary button-small" data-action="release-scope" data-id="' + esc(release.id) + '">Kapsamı düzenle</button></footer></article>';
  }).join("");
  root.innerHTML = '<div class="page-content releases-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>YAYIN YÖNETİMİ</div><h1>Release planı</h1><p>Planlanan yayınları, kapsamı, hazırlık risklerini ve gerçekleşen tarihleri takip et.</p></div><button class="button button-primary" data-action="create-release">＋ Release oluştur</button></section><section class="release-summary"><div><span>Planlanan</span><strong>' + releases.filter((release) => release.status !== "Yayınlandı" && release.status !== "İptal edildi").length + '</strong></div><div><span>Yayına hazır</span><strong>' + releases.filter((release) => release.status === "Yayına hazır").length + '</strong></div><div><span>Yayınlandı</span><strong>' + releases.filter((release) => release.status === "Yayınlandı").length + '</strong></div></section>' + (cards || '<section class="roadmap-empty"><h2>Henüz release yok</h2><p>İlk release kaydını oluşturup işleri kapsamına bağlayabilirsin.</p><button class="button button-primary" data-action="create-release">İlk release oluştur</button></section>') + '</div>';
}

function openReleaseEditor(id?: string): void {
  const release = id ? state.releases.find((entry) => entry.id === id) : undefined;
  const projects = state.projects.filter((project) => !project.archived || project.name === release?.project);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal release-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">YAYIN YÖNETİMİ</div><h2>' + (release ? 'Release düzenle' : 'Release oluştur') + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="release-form" class="settings-form"><div class="form-two-col"><label class="field-label">Ad / sürüm<input class="field-input" name="name" maxlength="120" required value="' + esc(release?.name || "") + '" placeholder="Örn. Ödeme 2026.11"></label><label class="field-label">Proje<select class="field-input" name="project">' + projects.map((project) => '<option ' + (project.name === release?.project ? 'selected' : '') + '>' + esc(project.name) + '</option>').join("") + '</select></label><label class="field-label">Planlanan yayın tarihi<input class="field-input" name="plannedDate" type="date" value="' + esc(release?.plannedDate || "") + '"></label><label class="field-label">Durum<select class="field-input" name="status">' + RELEASE_STATUSES.map((status) => '<option ' + (status === (release?.status || "Planlanıyor") ? 'selected' : '') + '>' + esc(status) + '</option>').join("") + '</select></label><label class="field-label">Gerçek yayın tarihi<input class="field-input" name="actualDate" type="date" value="' + esc(release?.actualDate || "") + '"></label>' + (release ? '<label class="field-label">Plan tarihi değişiklik nedeni<input class="field-input" name="dateReason" maxlength="300" placeholder="Neden değişti?"></label>' : '') + '</div><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" rows="3" maxlength="1500">' + esc(release?.description || "") + '</textarea></label><label class="field-label">Yayın notu<textarea class="field-input field-textarea" name="releaseNotes" rows="3" maxlength="2000" placeholder="Yayın kapsamı veya önemli değişiklikler">' + esc(release?.releaseNotes || "") + '</textarea></label><label class="field-label">Yayın sonrası hedef sonucu / gözlem<textarea class="field-input field-textarea" name="outcome" rows="2" maxlength="1200" placeholder="Hedef ölçüt gerçekleşti mi? Sonraki gözlem notu">' + esc(release?.outcome || "") + '</textarea></label><input type="hidden" name="id" value="' + esc(release?.id || "") + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  if (release) modalRoot.querySelector("#release-form .modal-footer")?.insertAdjacentHTML("afterbegin", '<button type="button" class="button button-quiet" data-action="archive-release" data-id="' + esc(release.id) + '">' + (release.archived ? "Arşivden çıkar" : "Arşivle") + '</button>');
  if (release?.dateHistory?.length) modalRoot.querySelector("#release-form .modal-footer")?.insertAdjacentHTML("beforebegin", '<details class="release-history" open><summary>Plan tarihi değişiklikleri · ' + release.dateHistory.length + '</summary>' + release.dateHistory.map((change) => '<p><strong>' + esc(change.from + " → " + change.to) + '</strong> · ' + esc(change.reason) + '<small>' + esc(change.actor + " · " + new Date(change.at).toLocaleString("tr-TR")) + '</small></p>').join("") + '</details>');
}

function saveRelease(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const existing = state.releases.find((release) => release.id === id);
  const status = String(values.get("status") || "Planlanıyor") as ReleaseStatus;
  const plannedDate = String(values.get("plannedDate") || "");
  const actualDate = String(values.get("actualDate") || "");
  const dateReason = String(values.get("dateReason") || "").trim();
  if (status === "Yayınlandı" && !actualDate) { toast("Yayınlandı durumunda gerçek yayın tarihi gerekli."); return; }
  if (existing && existing.plannedDate !== plannedDate && !dateReason) { toast("Planlanan yayın tarihi değişince değişiklik nedeni yaz."); return; }
  const release: ProductRelease = existing || { id: nextId("REL"), project: "", name: "", plannedDate: "", status: "Planlanıyor", description: "", updated: new Date().toISOString() };
  const oldStatus = release.status;
  const oldPlannedDate = release.plannedDate;
  release.name = String(values.get("name") || "").trim();
  release.project = String(values.get("project") || "");
  release.status = status;
  release.plannedDate = plannedDate;
  release.actualDate = actualDate || undefined;
  release.description = String(values.get("description") || "").trim();
  release.releaseNotes = String(values.get("releaseNotes") || "").trim();
  release.outcome = String(values.get("outcome") || "").trim();
  release.updated = new Date().toISOString();
  if (existing && oldPlannedDate !== plannedDate) {
    release.dateHistory ||= [];
    release.dateHistory.unshift({ from: oldPlannedDate || "Belirtilmedi", to: plannedDate || "Belirtilmedi", reason: dateReason, at: release.updated, actor: state.profile.userName || "PO" });
  }
  if (!existing) state.releases.push(release);
  if (status === "Yayınlandı" && oldStatus !== "Yayınlandı") {
    const scope = state.items.filter((item) => item.releaseId === release.id);
    scope.forEach((item) => addWorkActivity(item, "release", release.name + " yayınlandı · " + actualDate + (release.releaseNotes ? " · " + release.releaseNotes : "")));
  }
  save(); closeModal(); render(); toast("Release kaydedildi.");
}

function openReleaseScope(id: string): void {
  const release = state.releases.find((entry) => entry.id === id);
  if (!release) return;
  const scoped = new Set(state.items.filter((item) => item.releaseId === id).map((item) => item.id));
  const options = state.items.filter((item) => item.project === release.project).map((item) => '<label class="release-scope-row"><input type="checkbox" value="' + esc(item.id) + '" ' + (scoped.has(item.id) ? 'checked' : '') + '><span><strong>' + esc(item.id + " · " + item.title) + '</strong><small>' + esc(item.status + " · " + item.priority) + (item.status === "Bloke" ? " · Bloke" : "") + '</small></span></label>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal release-scope-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">' + esc(release.id) + '</div><h2>' + esc(release.name) + ' kapsamı</h2></div><button class="modal-close" data-close-modal>×</button></header><p>Bu release kapsamındaki işleri seç. Tamamlanmamış ve bloke işler yayın hazırlık uyarısında görünür.</p><div class="release-scope-list">' + (options || '<p>Bu projede backlog işi yok.</p>') + '</div><footer class="modal-footer"><button class="button button-quiet" data-close-modal>Kapat</button><button class="button button-primary" data-save-release-scope="' + esc(id) + '">Kapsamı kaydet</button></footer></section></div>';
}

function saveReleaseScope(id: string): void {
  const release = state.releases.find((entry) => entry.id === id);
  if (!release) return;
  const selected = new Set([...modalRoot.querySelectorAll<HTMLInputElement>('.release-scope-row input:checked')].map((input) => input.value));
  const wasScoped = new Set(state.items.filter((item) => item.releaseId === id).map((item) => item.id));
  state.items.forEach((item) => {
    if (item.releaseId === id && !selected.has(item.id)) { item.releaseId = undefined; addWorkActivity(item, "release", "Release kapsamından çıkarıldı: " + release.name); }
    else if (selected.has(item.id)) {
      if (item.releaseId && item.releaseId !== id) { const prior = state.releases.find((entry) => entry.id === item.releaseId); addWorkActivity(item, "release", "Release değişti: " + (prior?.name || item.releaseId) + " → " + release.name); }
      if (!wasScoped.has(item.id)) addWorkActivity(item, "release", "Release kapsamına eklendi: " + release.name);
      item.releaseId = id;
    }
  });
  save(); closeModal(); render(); toast("Release kapsamı güncellendi.");
}

function deleteRelease(id: string): void {
  const release = state.releases.find((entry) => entry.id === id);
  if (!release || !window.confirm('"' + release.name + '" release kaydını silmek istiyor musun? Backlog işleri korunur, release bağlantıları kaldırılır.')) return;
  state.items.forEach((item) => { if (item.releaseId === id) { item.releaseId = undefined; addWorkActivity(item, "release", "Silinen release bağlantısı kaldırıldı: " + release.name); } });
  state.releases = state.releases.filter((entry) => entry.id !== id);
  save(); render(); toast("Release silindi.");
}

function openRoadmapEditor(id?: string, parentId?: string): void {
  const node = id ? state.roadmap.find((entry) => entry.id === id) : undefined;
  const type = node?.type || (parentId ? "Epic" : "Initiative");
  const activeProjects = state.projects.filter((project) => !project.archived || project.name === node?.project);
  const parentOptions = state.roadmap.filter((entry) => entry.type === "Initiative" && entry.id !== id).map((entry) => '<option value="' + esc(entry.id) + '" ' + ((node?.parentId || parentId) === entry.id ? "selected" : "") + '>' + esc(entry.title) + '</option>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal roadmap-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">ÜRÜN PLANLAMA · ' + (type === "Initiative" ? "ÜRÜN HAMLESİ" : type.toLocaleUpperCase("tr-TR")) + '</div><h2>' + (node ? "Hedefi düzenle" : (type === "Initiative" ? "Ürün hamlesi" : type) + " oluştur") + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="roadmap-form" class="settings-form"><div class="form-two-col"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="140" required value="' + esc(node?.title || "") + '"></label><label class="field-label">Proje<select class="field-input" name="project" required>' + activeProjects.map((project) => '<option ' + (project.name === node?.project ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label>' + (type === "Epic" ? '<label class="field-label">Bağlı ürün hamlesi<select class="field-input" name="parentId" required><option value="">Ürün hamlesi seç</option>' + parentOptions + '</select></label>' : '') + '<label class="field-label">Ürün aşaması<select class="field-input" name="stage">' + productStageOptions(node?.stage || "Fikirler") + '</select></label><label class="field-label">Sahip<input class="field-input" name="owner" maxlength="100" value="' + esc(node?.owner || state.profile.userName) + '" placeholder="PO veya sorumlu"></label><label class="field-label">Başlangıç tarihi<input class="field-input" name="startDate" type="date" value="' + esc(node?.startDate || "") + '"></label><label class="field-label">Hedef bitiş tarihi<input class="field-input" name="targetDate" type="date" value="' + esc(node?.targetDate || "") + '"></label></div><label class="field-label">Ürün hedefi<textarea class="field-input field-textarea" name="goal" rows="3" maxlength="1500" placeholder="Hangi ürün sonucunu elde etmek istiyoruz?">' + esc(node?.goal || "") + '</textarea></label><label class="field-label">Ölçülebilir başarı ölçütü<textarea class="field-input field-textarea" name="successMetric" rows="2" maxlength="800" placeholder="Örn. işlem başarısızlığı %2 altına düşer">' + esc(node?.successMetric || "") + '</textarea></label><input type="hidden" name="id" value="' + esc(node?.id || "") + '"><input type="hidden" name="type" value="' + type + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  if (type === "Initiative") modalRoot.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[name="owner"], [name="goal"], [name="successMetric"]').forEach((field) => { field.required = true; });
}

function saveRoadmapNode(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const type = String(values.get("type")) as RoadmapNode["type"];
  const startDate = String(values.get("startDate") || "");
  const targetDate = String(values.get("targetDate") || "");
  if (startDate && targetDate && targetDate < startDate) { toast("Hedef bitiş tarihi başlangıç tarihinden önce olamaz."); return; }
  const parentId = String(values.get("parentId") || "");
  if (type === "Epic" && !state.roadmap.some((node) => node.id === parentId && node.type === "Initiative")) { toast("Epic için bağlı ürün hamlesi seç."); return; }
  const existing = state.roadmap.find((node) => node.id === id);
  const node: RoadmapNode = existing || { id: nextId(type === "Epic" ? "EPIC" : "INIT"), type, title: "", project: "", goal: "", successMetric: "", owner: "", stage: "Fikirler", startDate: "", targetDate: "", updated: "Az önce" };
  const previousStart = node.startDate;
  const previousTarget = node.targetDate;
  node.title = String(values.get("title") || "").trim();
  node.project = String(values.get("project") || "");
  node.parentId = type === "Epic" ? parentId : undefined;
  node.stage = String(values.get("stage") || "Fikirler") as ProductStage;
  node.owner = String(values.get("owner") || "").trim();
  node.goal = String(values.get("goal") || "").trim();
  node.successMetric = String(values.get("successMetric") || "").trim();
  node.startDate = startDate;
  node.targetDate = targetDate;
  node.updated = new Date().toISOString();
  if (existing && (previousStart !== startDate || previousTarget !== targetDate)) {
    node.dateHistory ||= [];
    node.dateHistory.unshift({ from: [previousStart, previousTarget].filter(Boolean).join(" → ") || "Belirlenmedi", to: [startDate, targetDate].filter(Boolean).join(" → ") || "Belirlenmedi", at: node.updated, actor: state.profile.userName || "PO" });
  }
  if (!existing) state.roadmap.push(node);
  save(); closeModal(); render(); toast(type + " kaydedildi.");
}

function deleteRoadmapNode(id: string): void {
  const node = state.roadmap.find((entry) => entry.id === id);
  if (!node || !window.confirm('"' + node.title + '" hedefini silmek istiyor musun? Bağlı backlog işleri korunur ve hedef bağlantıları kaldırılır.')) return;
  const removed = new Set([id, ...state.roadmap.filter((entry) => entry.parentId === id).map((entry) => entry.id)]);
  state.roadmap = state.roadmap.filter((entry) => !removed.has(entry.id));
  state.items.forEach((item) => { if (item.roadmapNodeId && removed.has(item.roadmapNodeId)) { item.roadmapNodeId = undefined; addWorkActivity(item, "change", "Silinen ürün hedefi bağlantısı kaldırıldı."); } });
  save(); renderRoadmap(); toast("Ürün hedefi silindi; backlog işleri korundu.");
}

function renderTeamSettingsSection(): string {
  const rows = state.teams.map((team) => '<div class="team-settings-row"><div class="team-settings-identity"><span class="team-settings-avatar">' + esc(team.name.slice(0, 1).toLocaleUpperCase("tr-TR")) + '</span><div><strong>' + esc(team.name) + '</strong><small>' + team.members.length + ' üye · ' + esc(team.members.join(", ") || "Üye eklenmedi") + '</small></div></div><div class="team-settings-actions"><button type="button" class="button button-quiet button-small" data-action="edit-team" data-team-id="' + esc(team.id) + '">Düzenle</button><button type="button" class="team-settings-delete" data-delete-team="' + esc(team.id) + '" aria-label="' + esc(team.name + " takımını sil") + '" title="Takımı sil">×</button></div></div>').join("");
  return '<section class="settings-team-section"><header><div><h3>Takımlar ve üyeler</h3><p>Görev atamalarında kullanılacak ekipleri ve üyeleri düzenle.</p></div><button type="button" class="button button-secondary button-small" data-action="new-team">＋ Takım ekle</button></header><div class="team-settings-list">' + (rows || '<p class="empty-inline">Henüz takım yok. Üye ve atama tanımlamak için ilk takımı ekle.</p>') + '</div></section>';
}

function openWorkspaceSettings(): void {
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title"><header class="modal-header"><div><div class="panel-kicker">ÇALIŞMA ORTAMI</div><h2 id="settings-title">Çalışma alanını ayarla</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="workspace-form" class="settings-form"><p class="settings-intro">Takip edeceğin projeleri ve çalışma alanında görünecek kullanıcı bilgilerini düzenle. Ayarlar bu cihazda saklanır.</p><div class="form-two-col"><label class="field-label">Kurum / ekip<input class="field-input" name="organization" maxlength="60" required value="' + esc(state.profile.organization) + '"></label><label class="field-label">Çalışma alanı adı<input class="field-input" name="workspace" maxlength="60" required value="' + esc(state.profile.workspace) + '"></label><label class="field-label">Adın<input class="field-input" name="userName" maxlength="60" required value="' + esc(state.profile.userName) + '"></label><label class="field-label">Rolün<input class="field-input" name="userRole" maxlength="60" required value="' + esc(state.profile.userRole) + '"></label></div><section class="jira-settings-block"><h3>Jira Server / Data Center</h3><p>Base URL girilmezse Jira menüsü devre dışı kalır. PAT’i Jira panelinde kendi hesabından oluşturup ekleyebilirsin.</p><label class="field-label">Jira Base URL<input class="field-input" name="jiraBaseUrl" type="url" placeholder="https://jira.kurum.local" value="' + esc(state.profile.jiraBaseUrl || "") + '"></label></section><div class="settings-note">Bu bilgiler yalnızca masaüstündeki yerel görünümü kişiselleştirir. Henüz kullanıcı hesabı veya kurum bağlantısı oluşturmaz.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Kapat</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  modalRoot.querySelector(".jira-settings-block")?.insertAdjacentHTML("afterend", '<div class="settings-actions"><button type="button" class="button button-secondary" data-action="open-setup">Projeleri ve kurulum bilgilerini düzenle</button></div>' + renderTeamSettingsSection() + '<section class="backup-settings"><h3>Veri yedekleme</h3><p>Yedekleme dosya türünü ve kaydedileceği konumu seç. Ekler de yedeğe eklenir; dosyayı güvenli bir yerde sakla.</p><div class="backup-actions"><label class="field-label">Dosya biçimi<select id="backup-format" class="field-input"><option value="rota">Rota sıkıştırılmış yedek (.rota)</option><option value="json">JSON (.json)</option></select></label><button type="button" class="button button-secondary" data-action="backup-export">Yedek oluştur</button><button type="button" class="button button-secondary" data-action="backup-restore">Yedekten geri yükle</button></div></section>');
  document.querySelector(".backup-settings")?.insertAdjacentHTML("beforebegin", '<section class="appearance-settings"><h3>Görünüm ve erişilebilirlik</h3><div class="form-two-col"><label class="field-label">Tema<select id="workspace-theme" class="field-input"><option value="system">Sistem</option><option value="light">Açık</option><option value="dark">Koyu</option></select></label><label class="field-label">Yazı boyutu<select id="workspace-font-scale" class="field-input"><option value="0.9">Küçük</option><option value="1">Standart</option><option value="1.1">Büyük</option><option value="1.2">Çok büyük</option></select></label><label class="field-label">Yüksek kontrast<select id="workspace-high-contrast" class="field-input"><option value="false">Kapalı</option><option value="true">Açık</option></select></label><label class="field-label">Animasyonları azalt<select id="workspace-reduced-motion" class="field-input"><option value="false">Kapalı</option><option value="true">Açık</option></select></label></div><button type="button" class="button button-secondary button-small" data-action="reset-backlog-preferences">Backlog görünüm ve kolon tercihlerini sıfırla</button></section>');
  (document.getElementById("workspace-theme") as HTMLSelectElement).value = localStorage.getItem(THEME_KEY) || "system";
  (document.getElementById("workspace-font-scale") as HTMLSelectElement).value = localStorage.getItem(FONT_SCALE_KEY) || "1";
  (document.getElementById("workspace-high-contrast") as HTMLSelectElement).value = localStorage.getItem(HIGH_CONTRAST_KEY) || "false";
  (document.getElementById("workspace-reduced-motion") as HTMLSelectElement).value = localStorage.getItem(REDUCED_MOTION_KEY) || "false";
}

async function exportWorkspaceBackup(): Promise<void> {
  try {
    const format = (document.getElementById("backup-format") as HTMLSelectElement | null)?.value === "json" ? "json" : "rota";
    const result = await desktop.exportWorkspaceBackup(state, format);
    if (result) toast("Yedek oluşturuldu · " + result.attachmentCount + " ek · " + result.path);
  } catch (error) { toast(error instanceof Error ? error.message : "Yedek oluşturulamadı."); }
}

async function openBacklogExcelImport(): Promise<void> {
  try {
    const imported = await desktop.pickBacklogExcelImport();
    if (!imported) return;
    pendingBacklogImport = imported;
    const projects = state.projects.filter((project) => !project.archived);
    const selectedProject = projects.find((project) => project.id === activeProjectId) || projects[0];
    const preview = imported.rows.slice(0, 6).map((row) => '<li><strong>' + esc(row.title) + '</strong>' + (row.description ? '<small>' + esc(row.description) + '</small>' : '') + '</li>').join("");
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal backlog-import-modal" role="dialog" aria-modal="true" aria-labelledby="backlog-import-title"><header class="modal-header"><div><div class="panel-kicker">BACKLOG · EXCEL</div><h2 id="backlog-import-title">İşleri içe aktar</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-intro"><strong>' + esc(imported.filename) + '</strong> dosyasından ' + imported.rows.length + ' iş bulundu.</p><div class="form-two-col"><label class="field-label">Proje<select id="backlog-import-project" class="field-input">' + projects.map((project) => '<option value="' + esc(project.id) + '" ' + (project.id === selectedProject?.id ? 'selected' : '') + '>' + esc(project.name) + '</option>').join("") + '</select></label><label class="field-label">Varsayılan tür<select id="backlog-import-type" class="field-input"><option>Task</option><option>Story</option><option>Bug</option></select></label></div><div class="backlog-import-defaults">Durum: <strong>Yeni</strong><span>·</span> Öncelik: <strong>Orta</strong><span>·</span> Alan: <strong>Genel</strong></div><section class="backlog-import-preview"><h3>Önizleme <small>' + Math.min(imported.rows.length, 6) + ' / ' + imported.rows.length + '</small></h3><ul>' + preview + '</ul>' + (imported.rows.length > 6 ? '<p class="metric-empty">ve ' + (imported.rows.length - 6) + ' iş daha</p>' : '') + '</section><p class="settings-note">Excel’de “Başlık” sütunu zorunludur; “Açıklama” sütunu isteğe bağlıdır. Başlık sütunu yoksa ilk sütun başlık, ikinci sütun açıklama olarak alınır.</p><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="button" class="button button-primary" data-action="confirm-backlog-import" ' + (projects.length ? '' : 'disabled') + '>' + imported.rows.length + ' işi oluştur</button></footer></div></section></div>';
  } catch (error) { toast(error instanceof Error ? error.message : "Excel dosyası içe aktarılamadı."); }
}

function confirmBacklogExcelImport(): void {
  const imported = pendingBacklogImport;
  const project = state.projects.find((entry) => entry.id === (modalRoot.querySelector<HTMLSelectElement>("#backlog-import-project")?.value || "") && !entry.archived);
  const type = modalRoot.querySelector<HTMLSelectElement>("#backlog-import-type")?.value as WorkType | undefined;
  if (!imported || !project || !["Task", "Story", "Bug"].includes(type || "")) { toast("İçe aktarma ayarlarını kontrol et."); return; }
  const knownIds = new Set(state.items.map((item) => item.id));
  const items = imported.rows.map((row) => {
    let id = nextId("PAY"); while (knownIds.has(id)) id = nextId("PAY"); knownIds.add(id);
    const item: WorkItem = { id, type: type!, title: row.title, status: "Yeni", priority: "Orta", project: project.name, area: "Genel", updated: "Az önce", description: row.description, acceptance: [], attachments: [], labels: [], dependsOnIds: [], activity: [] };
    addWorkActivity(item, "created", "Excel dosyasından eklendi: " + imported.filename);
    return item;
  });
  state.items.unshift(...items);
  activeProjectId = project.id;
  activeView = "backlog";
  pendingBacklogImport = null;
  save(); closeModal(); render();
  toast(items.length + " backlog işi oluşturuldu.");
}

async function exportBacklogExcel(): Promise<void> {
  const project = state.projects.find((entry) => entry.id === activeProjectId);
  const items = state.items.filter((item) => project ? item.project === project.name : isItemInActiveProject(item));
  const teams = new Map(state.teams.map((team) => [team.id, team.name]));
  const assets = new Map(state.assets.map((asset) => [asset.id, asset]));
  const releases = new Map(state.releases.map((release) => [release.id, release.name]));
  const sprintById = new Map((state.sprints || []).map((sprint) => [sprint.id, sprint]));
  const roadmap = new Map(state.roadmap.map((node) => [node.id, node.title]));
  const findItem = (id: string) => state.items.find((item) => item.id === id);
  const attachmentRows: (string | number | null)[][] = [];
  const activityRows: (string | number | null)[][] = [];
  const assignmentRows: (string | number | null)[][] = [];
  const acceptanceRows: (string | number | null)[][] = [];
  const dependencyRows: (string | number | null)[][] = [];
  const itemRows = items.map((item) => {
    for (const assignment of getWorkAssignments(item)) assignmentRows.push([item.id, item.title, teams.get(assignment.teamId) || "Silinmiş takım", assignment.member, assignment.scope || ""]);
    (item.acceptance || []).forEach((criterion, index) => acceptanceRows.push([item.id, item.title, index + 1, criterion]));
    (item.dependsOnIds || []).forEach((dependencyId) => {
      const dependency = findItem(dependencyId);
      dependencyRows.push([item.id, item.title, dependencyId, dependency?.title || "Silinmiş iş", dependency?.status || ""]);
    });
    (item.attachments || []).forEach((attachment) => attachmentRows.push([item.id, item.title, "İş eki", "", attachment.name, attachment.size, "Dosya içeriği Excel'e gömülmedi; Rota çalışma alanındaki ekte bulunur."]));
    (item.activity || []).forEach((activity) => {
      activityRows.push([item.id, item.title, activity.kind, activity.message, activity.actor, activity.occurredAt, activity.visibility === "private" ? "Yalnızca PO" : activity.visibility === "team" ? "Takımla paylaş" : ""]);
      (activity.attachments || []).forEach((attachment) => attachmentRows.push([item.id, item.title, "Aktivite eki", activity.id, attachment.name, attachment.size, "Dosya içeriği Excel'e gömülmedi; Rota çalışma alanındaki ekte bulunur."]));
    });
    const assetNames = (item.assetIds || []).map((id) => {
      const asset = assets.get(id);
      return asset ? asset.code + " · " + asset.name : id;
    });
    const blocker = item.blocker;
    return [
      item.id, item.title, item.type, item.status, item.productStage || "", item.priority, item.project, item.area, item.description,
      (item.labels || []).join(", "), assignmentSummary(item), item.startDate || "", item.targetDate || "", item.actualStartDate || "", item.completedAt || "",
      item.estimate ?? null, item.targetPeriod || "", roadmap.get(item.roadmapNodeId || "") || item.roadmapNodeId || "", releases.get(item.releaseId || "") || item.releaseId || "",
      sprintById.get(item.sprintId || "")?.name || "", assetNames.join("; "), item.updated, (item.dependsOnIds || []).join(", "), blocker?.reason || "", blocker?.nextStep || "", blocker?.expectedAction || "", blocker?.owner || "", blocker?.openedAt || "", blocker?.resolvedAt || "",
      (item.acceptance || []).join("\n"), (item.attachments || []).map((attachment) => attachment.name).join("; ")
    ];
  });
  const sheets: ExcelExportSheet[] = [
    { name: "Backlog işleri", columns: ["İş ID", "Başlık", "Tür", "Durum", "Ürün aşaması", "Öncelik", "Proje", "Alan", "Açıklama", "Etiketler", "Atamalar", "Başlangıç tarihi", "Hedef tarihi", "Gerçek başlangıç", "Tamamlanma tarihi", "Tahmin (saat)", "Hedef dönem", "Ürün hamlesi / Epic", "Release", "Sprint", "Ürün bileşenleri", "Son güncelleme", "Bağımlı iş ID'leri", "Blokaj nedeni", "Sonraki adım", "Beklenen aksiyon", "Blokaj takip sahibi", "Blokaj açılışı", "Blokaj çözülmesi", "Kabul kriterleri", "Ek dosya adları"], rows: itemRows },
    { name: "Sprintler", columns: ["Sprint", "Takım", "Başlangıç", "Bitiş", "İş sayısı", "İş ID'leri"], rows: (state.sprints || []).map((sprint) => [sprint.name, teams.get(sprint.teamId) || "Silinmiş takım", sprint.startDate, sprint.endDate, items.filter((item) => item.sprintId === sprint.id).length, items.filter((item) => item.sprintId === sprint.id).map((item) => item.id).join(", ")]) },
    { name: "Atamalar", columns: ["İş ID", "İş başlığı", "Takım", "Üye", "Sorumluluk alanı"], rows: assignmentRows },
    { name: "Kabul kriterleri", columns: ["İş ID", "İş başlığı", "Sıra", "Kabul kriteri"], rows: acceptanceRows },
    { name: "Bağımlılıklar", columns: ["İş ID", "İş başlığı", "Bağımlı iş ID", "Bağımlı iş başlığı", "Bağımlı iş durumu"], rows: dependencyRows },
    { name: "Aktivite geçmişi", columns: ["İş ID", "İş başlığı", "Kayıt türü", "Not / değişiklik", "Yapan", "Tarih", "Görünürlük"], rows: activityRows },
    { name: "Ek dosyalar", columns: ["İş ID", "İş başlığı", "Ek türü", "Aktivite ID", "Dosya adı", "Boyut (byte)", "Not"], rows: attachmentRows }
  ];
  try {
    const path = await desktop.exportBacklogExcel(sheets);
    if (path) toast(items.length + " backlog işi Excel'e aktarıldı · " + path);
  } catch (error) { toast(error instanceof Error ? error.message : "Backlog Excel'e aktarılamadı."); }
}

async function restoreWorkspaceBackup(): Promise<void> {
  let staged: { token: string; workspace: unknown; attachmentCount: number } | null = null;
  try {
    staged = await desktop.stageWorkspaceRestore();
    if (!staged) return;
    const restoreToken = staged.token;
    const attachmentCount = staged.attachmentCount;
    const candidate = staged.workspace as Partial<WorkspaceState>;
    if (!candidate || !Array.isArray(candidate.items) || !Array.isArray(candidate.tasks) || !Array.isArray(candidate.notes) || !Array.isArray(candidate.projects) || !Array.isArray(candidate.teams) || !Array.isArray(candidate.assets) || !Array.isArray(candidate.roadmap) || !Array.isArray(candidate.releases) || (candidate.decisions !== undefined && !Array.isArray(candidate.decisions)) || (candidate.diagrams !== undefined && !Array.isArray(candidate.diagrams)) || !candidate.profile) throw new Error("Yedek bu Rota sürümüyle uyumlu değil.");
    if (!window.confirm("Bu yedek çalışma alanındaki mevcut kayıtların yerini alacak. " + candidate.items.length + " backlog işi ve " + staged.attachmentCount + " dosya eki yüklenecek. Devam edilsin mi?")) {
      await desktop.cancelWorkspaceRestore(restoreToken);
      return;
    }
    const previousState = state;
    const previousStorage = localStorage.getItem(STORAGE_KEY);
    try {
      const restored = { ...candidate, decisions: candidate.decisions || [], diagrams: candidate.diagrams || [], sprints: candidate.sprints || [] } as WorkspaceState;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
      await desktop.commitWorkspaceRestore(restoreToken);
      staged = null;
      state = restored;
      if (activeView === "assets") disposeAssetDiagram();
      activeView = "overview"; activeProjectId = null; activeItemId = null;
      save(); render(); closeModal();
      toast("Yedek geri yüklendi · " + attachmentCount + " ek.");
    } catch (error) {
      state = previousState;
      if (previousStorage === null) localStorage.removeItem(STORAGE_KEY); else localStorage.setItem(STORAGE_KEY, previousStorage);
      if (staged) await desktop.cancelWorkspaceRestore(restoreToken).catch(() => undefined);
      throw error;
    }
  } catch (error) {
    if (staged) await desktop.cancelWorkspaceRestore(staged.token).catch(() => undefined);
    toast(error instanceof Error ? error.message : "Yedek geri yüklenemedi; mevcut çalışma alanı korundu.");
  }
}

function openArchivedProjects(): void {
  const archived = state.projects.filter((project) => project.archived);
  const rows = archived.map((project) => '<div class="project-archive-row"><div><strong>' + esc(project.name) + '</strong><small>' + state.items.filter((item) => item.project === project.name).length + ' backlog işi · ' + state.assets.filter((asset) => asset.project === project.name).length + ' bileşen</small></div><button class="button button-secondary button-small" data-action="edit-project" data-project-id="' + esc(project.id) + '">Yönet</button></div>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="archived-projects-title"><header class="modal-header"><div><div class="panel-kicker">PROJE YÖNETİMİ</div><h2 id="archived-projects-title">Arşivlenen projeler</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="project-archive-content">' + (rows || '<p class="empty-inline">Arşivlenmiş proje bulunmuyor.</p>') + '</div><footer class="modal-footer"><button class="button button-quiet" data-close-modal>Kapat</button></footer></section></div>';
}

function archiveProject(projectId: string, archived: boolean): void {
  const project = state.projects.find((entry) => entry.id === projectId);
  if (!project) return;
  const undoSnapshot = structuredClone(state);
  if (archived && state.projects.filter((entry) => !entry.archived).length <= 1) { toast("En az bir aktif proje kalmalı."); return; }
  project.archived = archived;
  if (archived && assetProjectFilter === project.name) assetProjectFilter = "";
  save();
  closeModal();
  if (activeProjectId === projectId && archived) {
    activeProjectId = null;
    setView("overview");
  } else {
    render();
  }
  if (archived) toastUndoDeletion("Proje arşivlendi.", undoSnapshot);
  else toast("Proje arşivden çıkarıldı.");
}

async function deleteProject(projectId: string): Promise<void> {
  const project = state.projects.find((entry) => entry.id === projectId);
  if (!project) return;
  const activeProjectCount = state.projects.filter((entry) => !entry.archived).length;
  if (state.projects.length <= 1 || (!project.archived && activeProjectCount <= 1)) { toast("Çalışma alanında en az bir aktif proje kalmalı."); return; }
  const projectItems = state.items.filter((item) => item.project === project.name);
  const projectAssets = state.assets.filter((asset) => asset.project === project.name);
  const projectReleases = state.releases.filter((release) => release.project === project.name);
  const prompt = '"' + project.name + '" projesini kalıcı olarak silmek istiyor musun? ' + projectItems.length + ' backlog işi, ' + projectAssets.length + ' ürün bileşeni ve ' + projectReleases.length + ' release silinecek. Bağlı kişisel görev ve notlar korunup bağımsız hale gelecek.';
  if (!window.confirm(prompt)) return;
  const removedItemIds = new Set(projectItems.map((item) => item.id));
  const removedAssetIds = new Set(projectAssets.map((asset) => asset.id));
  await Promise.all(projectItems.flatMap((item) => (item.attachments || []).flatMap((file) => file.storedName && desktop ? [desktop.removeAttachment(file.storedName).catch(() => false)] : [])));
  state.items = state.items.filter((item) => !removedItemIds.has(item.id));
  state.diagrams = state.diagrams.filter((diagram) => diagram.ownerType !== "item" || !removedItemIds.has(diagram.ownerId));
  state.items.forEach((item) => {
    const removedDependencies = (item.dependsOnIds || []).filter((id) => removedItemIds.has(id));
    if (!removedDependencies.length) return;
    item.dependsOnIds = (item.dependsOnIds || []).filter((id) => !removedItemIds.has(id));
    addWorkActivity(item, "change", "Silinen proje nedeniyle bağımlılık kaldırıldı: " + removedDependencies.join(", "));
  });
  state.tasks.forEach((task) => { if (removedItemIds.has(task.linked)) task.linked = ""; });
  state.notes.forEach((note) => { if (removedItemIds.has(note.linked)) note.linked = ""; });
  const removedRoadmapIds = new Set(state.roadmap.filter((node) => node.project === project.name).map((node) => node.id));
  state.roadmap = state.roadmap.filter((node) => !removedRoadmapIds.has(node.id));
  state.items.forEach((item) => { if (item.roadmapNodeId && removedRoadmapIds.has(item.roadmapNodeId)) { item.roadmapNodeId = undefined; addWorkActivity(item, "change", "Silinen proje nedeniyle ürün hedefi bağlantısı kaldırıldı."); } });
  state.assets = state.assets.filter((asset) => !removedAssetIds.has(asset.id));
  const removedReleaseIds = new Set(projectReleases.map((release) => release.id));
  state.items.forEach((item) => { if (item.releaseId && removedReleaseIds.has(item.releaseId)) { item.releaseId = undefined; addWorkActivity(item, "release", "Silinen proje nedeniyle release bağlantısı kaldırıldı."); } });
  state.releases = state.releases.filter((release) => !removedReleaseIds.has(release.id));
  state.assets.forEach((asset) => {
    asset.relatedAssetIds = asset.relatedAssetIds.filter((id) => !removedAssetIds.has(id));
    removedAssetIds.forEach((id) => { if (asset.relatedAssetLabels) delete asset.relatedAssetLabels[id]; });
  });
  state.items.forEach((item) => { item.assetIds = (item.assetIds || []).filter((id) => !removedAssetIds.has(id)); });
  state.projects = state.projects.filter((entry) => entry.id !== projectId);
  if (activeProjectId === projectId) { activeProjectId = null; activeView = "overview"; }
  save();
  closeModal();
  render();
  toast("Proje ve bağlı ürün kayıtları silindi.");
}

function openProjectSettings(projectId?: string): void {
  const project = projectId ? state.projects.find((entry) => entry.id === projectId) : undefined;
  const projectActions = project ? '<div class="project-management-actions"><button type="button" class="button button-secondary" data-action="archive-project" data-project-id="' + esc(project.id) + '" data-archived="' + (project.archived ? "false" : "true") + '">' + (project.archived ? "Arşivden çıkar" : "Projeyi arşivle") + '</button><button type="button" class="button button-danger" data-action="delete-project" data-project-id="' + esc(project.id) + '">Projeyi sil</button></div>' : "";
  const projectNote = project?.archived ? "Bu proje arşivde. Backlog ve bileşenleri korunur; arşivden çıkararak yeniden aktif projelere alabilirsin." : "Arşivleme proje işlerini ve bileşenlerini korur. Silme işlemi proje kayıtlarını ve eklerini kaldırır; bağlı kişisel görev/notlar korunup bağlantısız kalır.";
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><header class="modal-header"><div><div class="panel-kicker">PROJE AYARLARI</div><h2 id="project-title">' + (project ? "Projeyi düzenle" : "Yeni proje oluştur") + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="project-form" class="settings-form"><label class="field-label">Proje adı<input class="field-input" name="name" maxlength="60" required value="' + esc(project?.name || "") + '" placeholder="Örn. Açık Bankacılık"></label><label class="field-label">Renk<select class="field-input" name="color"><option value="blue" ' + (!project || project.color === "blue" ? "selected" : "") + '>Mavi</option><option value="violet" ' + (project?.color === "violet" ? "selected" : "") + '>Mor</option><option value="amber" ' + (project?.color === "amber" ? "selected" : "") + '>Kehribar</option><option value="green" ' + (project?.color === "green" ? "selected" : "") + '>Yeşil</option></select></label><input type="hidden" name="id" value="' + esc(project?.id || "") + '"><div class="settings-note">' + projectNote + '</div>' + projectActions + '<footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  modalRoot.querySelector(".settings-note")?.insertAdjacentHTML("beforebegin", assignmentEditorMarkup("project-assignment-list", project?.assignments || [], "Proje ekibi", "Projeye atanacak kişiler ve varsa katkı alanları."));
}

function saveWorkspaceSettings(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const values = new FormData(form);
  const jiraBaseUrl = String(values.get("jiraBaseUrl") || "").trim().replace(/\/+$/, "");
  if (!validJiraBaseUrl(jiraBaseUrl)) { toast("Jira Base URL HTTPS adresi olmalı; yalnızca localhost için HTTP kullanılabilir."); return; }
  state.profile = { organization: String(values.get("organization") || "").trim(), workspace: String(values.get("workspace") || "").trim(), userName: String(values.get("userName") || "").trim(), userRole: String(values.get("userRole") || "").trim(), ...(jiraBaseUrl ? { jiraBaseUrl } : {}) };
  if (!jiraBaseUrl) { jiraBoards = []; jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; jiraIssues = []; jiraCatalogLoadedFor = ""; }
  else if (jiraCatalogLoadedFor !== jiraBaseUrl) jiraCatalogLoadedFor = "";
  save(); closeModal(); render(); toast("Çalışma alanı ayarları kaydedildi.");
}

function saveProjectSettings(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const name = String(values.get("name") || "").trim();
  const color = String(values.get("color") || "blue") as Project["color"];
  const assignmentResult = readAssignmentRows("project-assignment-list");
  if (assignmentResult.invalid) { toast("Her atama satırında hem takım hem üye seç; kullanılmayan satırları kaldır."); return; }
  if (state.projects.some((project) => project.name.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR") && project.id !== id)) { toast("Bu proje adı zaten kullanılıyor."); return; }
  if (id) {
    const project = state.projects.find((entry) => entry.id === id);
    if (!project) return;
    const oldName = project.name;
    project.name = name; project.color = color; project.assignments = assignmentResult.assignments;
    state.items.forEach((item) => { if (item.project === oldName) item.project = name; });
    state.assets.forEach((asset) => { if (asset.project === oldName) asset.project = name; });
    state.roadmap.forEach((node) => { if (node.project === oldName) node.project = name; });
    state.releases.forEach((release) => { if (release.project === oldName) release.project = name; });
  } else {
    const project: Project = { id: nextId("PROJECT"), name, color, assignments: assignmentResult.assignments };
    state.projects.push(project);
    activeProjectId = project.id;
    activeView = "backlog";
  }
  save(); closeModal(); render(); toast("Proje ayarları kaydedildi.");
}

function attachmentListMarkup(files: AttachmentInfo[], owner: string): string {
  return files.map((file, index) => {
    let control = '<button class="file-open" data-open-file="' + esc(file.storedName || "") + '" ' + (file.storedName ? "" : "disabled") + ' title="Dosyayı aç">▤</button>';
    if (owner === "draft") control = '<button class="remove-file" data-remove-draft="' + index + '" title="Eki kaldır">×</button>';
    if (owner && /^(item|note|task):/.test(owner)) control = '<button class="remove-file" data-remove-saved="' + esc(owner) + '" data-file-index="' + index + '" title="Eki kaldır">×</button>';
    return '<div class="attached-file"><span class="file-icon">' + icon("file") + '</span><span class="file-info"><strong>' + esc(file.name) + '</strong><small>' + formatSize(file.size) + '</small></span>' + control + '</div>';
  }).join("");
}

function formatSize(bytes: number): string {
  if (!bytes) return "Dosya eki";
  return bytes < 1024 * 1024 ? Math.max(1, Math.round(bytes / 1024)) + " KB" : (bytes / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
}

async function pickFiles(): Promise<void> {
  if (desktop) {
    try {
      const files = await desktop.pickAttachments();
      draftAttachments.push(...files);
    } catch {
      toast("Dosyalar eklenemedi.");
    }
  } else {
    document.getElementById("file-fallback")?.click();
    return;
  }
  renderDraftFiles();
}

function renderDraftFiles(): void {
  const target = document.getElementById("draft-files");
  if (target) target.innerHTML = attachmentListMarkup(draftAttachments, "draft");
}

function renderDropImportProgress(files: File[], status: "copying" | "failed" | "complete", host: HTMLElement, error = ""): void {
  let panel = host.querySelector<HTMLElement>(".drop-import-progress");
  if (!panel) { panel = document.createElement("div"); panel.className = "drop-import-progress"; host.append(panel); }
  panel.classList.toggle("is-error", status === "failed");
  panel.innerHTML = '<div class="drop-import-progress-heading"><strong>' + (status === "copying" ? "Dosyalar içe aktarılıyor" : status === "failed" ? "Dosyalar eklenemedi" : "Dosyalar eklendi") + '</strong>' + (status === "copying" ? '<span class="drop-import-spinner" aria-hidden="true"></span>' : status === "complete" ? '<span aria-hidden="true">✓</span>' : '') + '</div>' + (status === "copying" ? '<progress aria-label="Dosyalar cihaza kopyalanıyor"></progress><small>Cihaza kopyalanıyor…</small>' : status === "failed" ? '<small>' + esc(error || "Dosyaları yeniden deneyebilirsin.") + '</small><button class="button button-quiet button-small" type="button" data-action="retry-file-import">Yeniden dene</button>' : '<small>Ekler kayda eklendi.</small>') + '<ul>' + files.map((file) => '<li title="' + esc(file.name) + '">' + esc(file.name) + '</li>').join("") + '</ul>';
}

type DropImportDestination = { kind: "draft" | "item" | "task" | "note"; id?: string };

function dropImportHost(destination: DropImportDestination, activity: boolean): HTMLElement | null {
  if (activity) return document.getElementById("progress-note-files");
  if (destination.kind === "draft") return document.querySelector<HTMLElement>(".attachment-box");
  if (destination.kind === "item") return modalRoot.querySelector<HTMLElement>(".detail-files");
  return modalRoot.querySelector<HTMLElement>(".attachment-box, .detail-files, .note-files, .task-files") || modalRoot.querySelector<HTMLElement>(".settings-form");
}

async function importDroppedAttachments(files: File[], destination: DropImportDestination, activity: boolean): Promise<void> {
  const host = dropImportHost(destination, activity);
  if (!host) { toast("Dosyaların ekleneceği kayıt artık açık değil."); return; }
  dropImportRetry = { files, destination: { ...destination }, activity };
  renderDropImportProgress(files, "copying", host);
  try {
    const imported = await desktop.importDroppedFiles(files);
    if (imported.length === 0) {
      host.querySelector(".drop-import-progress")?.remove();
      toast("Desteklenmeyen dosya türü veya 25 MB üzeri dosya.");
      dropImportRetry = null;
      return;
    }
    if (activity) {
      progressAttachments.push(...imported);
      const filesRoot = document.getElementById("progress-note-files");
      if (filesRoot) filesRoot.innerHTML = progressAttachments.map((file, index) => '<span class="progress-note-file">' + esc(file.name) + '<button type="button" data-remove-progress-file="' + index + '" aria-label="Eki kaldır">×</button></span>').join("");
    } else if (destination.kind === "draft") {
      draftAttachments.push(...imported); renderDraftFiles();
    } else if (destination.kind === "item" && destination.id) {
      const item = itemById(destination.id); if (!item) return;
      item.attachments.push(...imported);
      addWorkActivity(item, "attachment", imported.length + " dosya eki eklendi: " + imported.map((file) => file.name).join(", "));
      save(); render(); openItem(item.id);
    } else if (destination.kind === "task" && destination.id) {
      const task = state.tasks.find((entry) => entry.id === destination.id); if (!task) return;
      task.attachments = [...(task.attachments ?? []), ...imported]; save(); openTask(task.id);
    } else if (destination.kind === "note" && destination.id) {
      const note = state.notes.find((entry) => entry.id === destination.id); if (!note) return;
      note.attachments = [...(note.attachments ?? []), ...imported]; save(); showNote(note.id);
    }
    dropImportRetry = null;
    const completedHost = dropImportHost(destination, activity) || host;
    renderDropImportProgress(files, "complete", completedHost);
    window.setTimeout(() => completedHost.querySelector(".drop-import-progress")?.remove(), 2200);
    toast(`${imported.length} dosya eklendi.`);
  } catch {
    const currentHost = dropImportHost(destination, activity) || host;
    renderDropImportProgress(files, "failed", currentHost, "Kopyalama sırasında hata oluştu.");
    toast("Sürüklenen dosyalar eklenemedi. Yeniden deneyebilirsin.");
  }
}

function renderEmailAttachmentChoices(): void {
  const box = document.querySelector(".attachment-box");
  box?.querySelector(".email-attachment-choices")?.remove();
  if (!box || pendingEmailAttachmentChoices.length === 0) return;
  const section = document.createElement("div");
  section.className = "email-attachment-choices";
  section.innerHTML = '<div class="email-attachment-heading"><strong>E-postadaki ekler</strong><small>İçe aktarmak istediklerini seç. Özgün e-posta ayrıca saklanır.</small></div>' + pendingEmailAttachmentChoices.map((file) => '<label class="email-attachment-choice"><input type="checkbox" data-email-attachment="' + esc(file.id) + '" checked><span class="email-attachment-name" title="' + esc(file.name) + '">' + esc(file.name) + '</span><small>' + (file.size < 1024 * 1024 ? Math.max(1, Math.round(file.size / 1024)) + ' KB' : (file.size / (1024 * 1024)).toFixed(1) + ' MB') + '</small></label>').join("");
  box.insertBefore(section, box.querySelector(".attachment-box-heading"));
}

function closeModal(preserveDraftAttachments = false): void {
  disposeWorkDiagramGraph();
  modalRoot.innerHTML = "";
  activeItemId = null;
  statusUpdateReturnToBoard = false;
  attachmentTarget = null;
  if (!preserveDraftAttachments && desktop) {
    const storedNames = draftAttachments.flatMap((file) => file.storedName ? [file.storedName] : []);
    void Promise.all(storedNames.map((name) => desktop.removeAttachment(name).catch(() => false)));
  }
  draftAttachments = [];
  if (desktop) {
    const activityStoredNames = progressAttachments.flatMap((file) => file.storedName ? [file.storedName] : []);
    void Promise.all(activityStoredNames.map((name) => desktop.removeAttachment(name).catch(() => false)));
  }
  progressAttachments = [];
}

function disposeWorkDiagramGraph(): void {
  workDiagramResizeObserver?.disconnect();
  workDiagramResizeObserver = null;
  workDiagramGraph?.dispose();
  workDiagramGraph = null;
  activeWorkDiagramId = null;
}

function ownedDiagrams(ownerType: WorkDiagram["ownerType"], ownerId: string): WorkDiagram[] {
  return state.diagrams.filter((diagram) => diagram.ownerType === ownerType && diagram.ownerId === ownerId);
}

function diagramSectionMarkup(ownerType: WorkDiagram["ownerType"], ownerId: string): string {
  const diagrams = ownedDiagrams(ownerType, ownerId);
  const list = diagrams.length
    ? '<div class="work-diagram-list">' + diagrams.map((diagram) => '<button class="work-diagram-link" data-open-diagram="' + esc(diagram.id) + '"><span class="diagram-link-icon">◇</span><span><strong>' + esc(diagram.title) + '</strong><small>' + diagram.nodes.length + ' adım · ' + diagram.edges.length + ' bağlantı · ' + esc(diagram.updated) + '</small></span></button>').join("") + '</div>'
    : '<p class="asset-muted">Henüz diyagram yok. Akış veya sistem ilişkilerini görselleştir.</p>';
  return '<section class="detail-section work-diagrams-section"><div class="section-title-row"><h3>Devir diyagramları <span class="count-chip">' + diagrams.length + '</span></h3><button class="text-button" data-new-diagram="' + ownerType + '" data-owner-id="' + esc(ownerId) + '">＋ Diyagram ekle</button></div>' + list + '</section>';
}

function renderDiagramEdgeList(diagram: WorkDiagram): void {
  const list = document.getElementById("work-diagram-edges");
  if (!list) return;
  list.innerHTML = diagram.edges.length
    ? diagram.edges.map((edge) => {
      const source = diagram.nodes.find((node) => node.id === edge.source)?.label || "Adım silindi";
      const target = diagram.nodes.find((node) => node.id === edge.target)?.label || "Adım silindi";
      return '<div class="diagram-edge-row"><span>' + esc(source) + '</span><b>→</b><span>' + esc(target) + '</span><small>' + esc(edge.label) + '</small><button class="text-button" data-delete-diagram-edge="' + esc(edge.id) + '">Kaldır</button></div>';
    }).join("")
    : '<p class="asset-muted">Henüz ok yok. Bir adımın mavi bağlantı noktasından diğer adıma sürükle.</p>';
}

function addDiagramNode(diagram: WorkDiagram): void {
  const label = window.prompt("Diyagram adımının adı");
  if (!label?.trim()) return;
  const node: DiagramNode = { id: nextId("DGN"), label: label.trim().slice(0, 120), x: 32 + (diagram.nodes.length % 3) * 260, y: 40 + Math.floor(diagram.nodes.length / 3) * 150 };
  diagram.nodes.push(node);
  diagram.updated = "Az önce";
  workDiagramGraph?.addNode({
    id: node.id, shape: "rect", x: node.x, y: node.y, width: 220, height: 88,
    attrs: { body: { fill: "#fff", stroke: "#dfe4ed", strokeWidth: 1, rx: 10, ry: 10 }, label: { text: node.label, fill: "#343c4e", fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: 190, height: 64, ellipsis: true } } },
    ports: { groups: { left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } } }, items: [{ group: "left" }, { group: "right" }, { group: "top" }, { group: "bottom" }] }
  });
  save(); renderDiagramEdgeList(diagram); renderDiagramToolbar(diagram);
}

function renderDiagramToolbar(diagram: WorkDiagram): void {
  const nodes = document.getElementById("work-diagram-nodes");
  if (nodes) nodes.innerHTML = diagram.nodes.map((node) => '<div class="diagram-node-row"><span>' + esc(node.label) + '</span><button class="text-button" data-delete-diagram-node="' + esc(node.id) + '">Kaldır</button></div>').join("") || '<p class="asset-muted">Boş diyagram. “Adım ekle” ile başlayabilirsin.</p>';
  renderDiagramEdgeList(diagram);
}

function recordWorkDiagramSnapshot(): void {
  if (!activeWorkDiagramId) return;
  const diagram = state.diagrams.find((entry) => entry.id === activeWorkDiagramId);
  if (!diagram) return;
  const snapshot = JSON.stringify(diagram);
  if (workDiagramUndoHistory.at(-1) === snapshot) return;
  workDiagramUndoHistory.push(snapshot);
  if (workDiagramUndoHistory.length > 50) workDiagramUndoHistory.shift();
  workDiagramRedoHistory = [];
  updateWorkDiagramHistoryButtons();
}

function updateWorkDiagramHistoryButtons(): void {
  const undo = modalRoot.querySelector<HTMLButtonElement>('[data-action="diagram-undo"]');
  const redo = modalRoot.querySelector<HTMLButtonElement>('[data-action="diagram-redo"]');
  if (undo) undo.disabled = workDiagramUndoHistory.length < 2;
  if (redo) redo.disabled = workDiagramRedoHistory.length === 0;
}

function renderWorkDiagramEditor(diagram: WorkDiagram, preserveHistory = false): void {
  if (!preserveHistory || activeWorkDiagramId !== diagram.id) {
    workDiagramUndoHistory = [JSON.stringify(diagram)];
    workDiagramRedoHistory = [];
  }
  disposeWorkDiagramGraph();
  activeWorkDiagramId = diagram.id;
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-diagram-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">İŞ DEVİR DİYAGRAMI</div><h2>Diyagramı düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="work-diagram-editor"><label class="field-label">Diyagram adı<input id="work-diagram-title" class="field-input" maxlength="100" value="' + esc(diagram.title) + '"></label><p class="settings-intro">Kutuları sürükleyerek yerleştir; mavi noktalardan ok çiz. Oka çift tıklayarak ilişkisini düzenle.</p><div class="diagram-editor-toolbar"><button class="button button-secondary button-small" data-action="diagram-undo" aria-label="Diyagram değişikliğini geri al">↶ Geri al</button><button class="button button-secondary button-small" data-action="diagram-redo" aria-label="Diyagram değişikliğini yinele">↷ Yinele</button><button class="button button-secondary button-small" data-action="diagram-add-node">＋ Adım ekle</button><button class="button button-secondary button-small" data-action="diagram-fit">Tümünü sığdır</button><button class="button button-secondary button-small" data-action="diagram-layout">Otomatik hizala</button><span class="diagram-save-state">Değişiklikler otomatik kaydedilir</span><button class="button button-danger button-small" data-action="diagram-delete">Diyagramı sil</button></div><div class="work-diagram-canvas" id="work-diagram-canvas"></div><section class="diagram-structure"><h3>Adımlar</h3><div id="work-diagram-nodes"></div><h3>Akışlar</h3><div id="work-diagram-edges"></div></section></div><footer class="modal-footer"><button class="button button-primary" data-close-modal>Kapat</button></footer></section></div>';
  updateWorkDiagramHistoryButtons();
  const title = document.getElementById("work-diagram-title") as HTMLInputElement | null;
  title?.addEventListener("change", () => { diagram.title = title.value.trim().slice(0, 100) || "Adsız diyagram"; diagram.updated = "Az önce"; save(); });
  const container = document.getElementById("work-diagram-canvas") as HTMLElement;
  const width = Math.max(container.clientWidth, 680);
  const height = 470;
  const graph = new Graph({
    container, width, height,
    grid: { visible: true, size: 20, type: "dot", args: { color: "#dce1ed", thickness: 1 } },
    panning: { enabled: true }, mousewheel: { enabled: true, modifiers: ["ctrl"] },
    connecting: { allowBlank: false, allowLoop: false, allowMulti: true, allowNode: true, snap: true, connector: "rounded", createEdge() { return this.createEdge({ attrs: { line: { stroke: "#6073df", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } } }); }, validateConnection({ sourceCell, targetCell }) { return !!sourceCell && !!targetCell && sourceCell.isNode() && targetCell.isNode() && sourceCell.id !== targetCell.id; } }
  });
  workDiagramGraph = graph;
  diagram.nodes.forEach((node) => graph.addNode({
    id: node.id, shape: "rect", x: node.x, y: node.y, width: 220, height: 88,
    attrs: { body: { fill: "#fff", stroke: "#dfe4ed", strokeWidth: 1, rx: 10, ry: 10 }, label: { text: node.label, fill: "#343c4e", fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: 190, height: 64, ellipsis: true } } },
    ports: { groups: { left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } }, bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "#fff", strokeWidth: 2, fill: "#6073df" } } } }, items: [{ group: "left" }, { group: "right" }, { group: "top" }, { group: "bottom" }] }
  }));
  diagram.edges.forEach((edge) => graph.addEdge({ id: edge.id, source: { cell: edge.source }, target: { cell: edge.target }, router: "manhattan", connector: "rounded", labels: [{ attrs: { text: { text: edge.label, fill: "#5d6784", fontSize: 11 } }, position: 0.5 }], attrs: { line: { stroke: "#7382d4", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } } }));
  graph.on("node:change:position", ({ node }: { node: Node }) => {
    const entry = diagram.nodes.find((candidate) => candidate.id === node.id);
    if (!entry) return;
    const pos = node.position(); entry.x = Math.round(pos.x); entry.y = Math.round(pos.y); diagram.updated = "Az önce"; save();
  });
  graph.on("node:dblclick", ({ node }: { node: Node }) => {
    const entry = diagram.nodes.find((candidate) => candidate.id === node.id); if (!entry) return;
    const label = window.prompt("Diyagram adımını düzenle", entry.label); if (!label?.trim()) return;
    entry.label = label.trim().slice(0, 120); node.attr("label/text", entry.label); diagram.updated = "Az önce"; save(); renderDiagramToolbar(diagram);
  });
  graph.on("edge:dblclick", ({ edge }: { edge: Edge }) => {
    const entry = diagram.edges.find((candidate) => candidate.id === edge.id); if (!entry) return;
    const label = window.prompt("Ok üzerindeki ilişki", entry.label); if (label === null) return;
    entry.label = label.trim().slice(0, 80) || "Akış"; edge.setLabels([{ attrs: { text: { text: entry.label, fill: "#5d6784", fontSize: 11 } }, position: 0.5 }]); diagram.updated = "Az önce"; save(); renderDiagramEdgeList(diagram);
  });
  graph.on("edge:connected", ({ edge, isNew }: { edge: Edge; isNew: boolean }) => {
    if (!isNew) return;
    const source = edge.getSourceCellId(); const target = edge.getTargetCellId();
    if (!source || !target) { edge.remove(); return; }
    const entry: DiagramEdge = { id: String(edge.id || nextId("DGE")), source, target, label: "Akış" };
    diagram.edges.push(entry); edge.setLabels([{ attrs: { text: { text: entry.label, fill: "#5d6784", fontSize: 11 } }, position: 0.5 }]); diagram.updated = "Az önce"; save(); renderDiagramToolbar(diagram);
  });
  workDiagramResizeObserver = new ResizeObserver(() => graph.resize(Math.max(container.clientWidth, 680), height));
  workDiagramResizeObserver.observe(container);
  renderDiagramToolbar(diagram);
}

function openWorkDiagramEditor(ownerType: WorkDiagram["ownerType"], ownerId: string, diagramId?: string): void {
  const diagram = diagramId ? state.diagrams.find((entry) => entry.id === diagramId) : undefined;
  if (diagramId && !diagram) return;
  const target = diagram || { id: nextId("DIAGRAM"), ownerType, ownerId, title: "Yeni devir diyagramı", nodes: [], edges: [], updated: "Az önce" } satisfies WorkDiagram;
  if (!diagram) { state.diagrams.push(target); save(); }
  renderWorkDiagramEditor(target);
}

function deleteWorkDiagram(id: string): void {
  const diagram = state.diagrams.find((entry) => entry.id === id);
  if (!diagram || !window.confirm('"' + diagram.title + '" diyagramını silmek istiyor musun?')) return;
  state.diagrams = state.diagrams.filter((entry) => entry.id !== id);
  const { ownerType, ownerId } = diagram;
  save(); closeModal();
  if (ownerType === "item") openItem(ownerId); else showNote(ownerId);
  toast("Diyagram silindi.");
}

function openItem(id: string): void {
  disposeWorkDiagramGraph();
  const item = itemById(id);
  if (!item) return;
  recentItemIds = [id, ...recentItemIds.filter((entry) => entry !== id)].slice(0, 8);
  localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(recentItemIds));
  if (activeItemId !== id) progressAttachments = [];
  activeItemId = id;
  attachmentTarget = { kind: "item", id };
  const acceptance = item.acceptance?.length ? '<div class="detail-section"><h3>Kabul kriterleri</h3><ul class="criteria-list">' + item.acceptance.map((criterion) => '<li><span class="criterion-check">✓</span>' + esc(criterion) + '</li>').join("") + '</ul></div>' : "";
  const files = item.attachments || [];
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal detail-modal" data-open-item="' + esc(item.id) + '" role="dialog" aria-modal="true"><header class="detail-header"><div class="detail-identity"><span class="table-type ' + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type") + '">' + itemIcon(item.type) + '</span><span>' + esc(item.id) + '</span><span class="crumb-separator">/</span><span>' + esc(item.project) + '</span></div><button class="modal-close" data-close-modal>×</button></header><div class="detail-title-wrap"><div class="detail-badges"><span class="type-label">' + esc(item.type) + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span></div><h2>' + esc(item.title) + '</h2><div class="detail-byline"><span class="profile-avatar small-avatar">DA</span><span>Deniz Arslan</span><span>·</span><span>Güncellendi ' + esc(item.updated) + '</span></div></div><div class="detail-body"><div class="detail-main"><div class="detail-section"><h3>İşin bağlamı</h3><p>' + esc(item.description) + '</p></div>' + acceptance + '<div class="detail-section"><div class="section-title-row"><h3>Dosya ekleri <span class="count-chip">' + files.length + '</span></h3><button class="text-button" data-add-to-item="' + esc(item.id) + '">+ Dosya ekle</button></div><div class="detail-files">' + (files.length ? attachmentListMarkup(files, "item:" + item.id) : '<div class="attachment-empty"><span>▤</span><span>Bu iş için henüz dosya yok.<small>Gereksinim, ekran görüntüsü veya akış ekleyebilirsin.</small></span></div>') + '</div><input id="detail-file-fallback" type="file" multiple hidden></div></div><aside class="detail-aside"><label class="field-label">Durum<select id="detail-status" class="field-input">' + ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"].map((status) => '<option ' + (status === item.status ? "selected" : "") + '>' + status + '</option>').join("") + '</select></label><label class="field-label">Öncelik<select id="detail-priority" class="field-input">' + ["Kritik", "Yüksek", "Orta", "Düşük"].map((priority) => '<option ' + (priority === item.priority ? "selected" : "") + '>' + priority + '</option>').join("") + '</select></label><div class="detail-property"><span>Ürün alanı</span><strong>' + esc(item.area) + '</strong></div><div class="detail-property"><span>Etiketler</span><div class="tag-row">' + (item.labels || []).map((label) => '<span class="tag">' + esc(label) + '</span>').join("") + '</div></div><div class="detail-property"><span>Bağlı kişisel görev</span><strong>' + state.tasks.filter((task) => task.linked === item.id).length + ' görev</strong><button class="text-button" data-action="quick-related-task" data-id="' + esc(item.id) + '">+ Takip görevi oluştur</button></div></aside></div><footer class="detail-footer"><span class="privacy-note-inline">⌑ Dosyalar bu cihazda saklanır</span></footer></section></div>';
  if (activeView === "backlog") { modalRoot.querySelector(".modal-backdrop")?.classList.add("detail-backdrop-sidepanel"); modalRoot.querySelector(".detail-modal")?.classList.add("detail-modal-sidepanel"); }
  const byline = modalRoot.querySelector(".detail-byline");
  if (byline) byline.innerHTML = '<span class="profile-avatar small-avatar">PO</span><span>' + esc(state.profile.userName || "PO") + '</span><span>·</span><span>Son güncelleme ' + esc(itemLastActivityLabel(item)) + '</span>';
  if (item.sourceEmail) {
    const sourceFile = (item.attachments || []).find((file) => file.name === item.sourceEmail?.name);
    modalRoot.querySelector(".detail-main .detail-section")?.insertAdjacentHTML("afterend", '<div class="email-source-card"><span class="email-source-icon">✉</span><span><strong>E-postadan oluşturuldu</strong><small>' + esc(item.sourceEmail.name + (item.sourceEmail.from ? " · " + item.sourceEmail.from : "") + (item.sourceEmail.date ? " · " + item.sourceEmail.date : "")) + '</small></span>' + (sourceFile?.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(sourceFile.storedName) + '">Özgün e-postayı aç</button>' : '') + '</div>');
  }
  const linkedAssets = (item.assetIds || []).map((assetId) => state.assets.find((asset) => asset.id === assetId)).filter((asset): asset is ProductAsset => Boolean(asset));
  modalRoot.querySelector(".detail-main .detail-section")?.insertAdjacentHTML("afterend", '<section class="detail-section linked-assets-section"><div class="section-title-row"><h3>Ürün bileşenleri <span class="count-chip">' + linkedAssets.length + '</span></h3><button class="text-button" data-action="edit-item" data-id="' + esc(item.id) + '">Düzenle</button></div>' + (linkedAssets.length ? '<div class="asset-chip-list">' + linkedAssets.map((asset) => '<button class="linked-badge" data-open-asset="' + esc(asset.id) + '">' + esc(asset.code + " · " + asset.name) + (!asset.active ? " · Pasif" : "") + '</button>').join("") + '</div>' : '<p class="asset-muted">Bu iş henüz bir ürün bileşenine bağlanmadı.</p>') + '</section>');
  modalRoot.querySelector(".detail-main")?.insertAdjacentHTML("beforeend", activityMarkup(item));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", diagramSectionMarkup("item", item.id));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", dependencyMarkup(item));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", itemRelationshipsMarkup(item));
  modalRoot.querySelector(".detail-footer")?.insertAdjacentHTML("beforeend", '<button type="button" class="button button-quiet" data-action="archive-item" data-id="' + esc(item.id) + '">' + (item.archived ? "Arşivden çıkar" : "Arşivle") + '</button>');
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", progressComposerMarkup());
  modalRoot.querySelector(".detail-footer")?.insertAdjacentHTML("afterbegin", '<span class="detail-actions"><button class="button button-secondary" data-action="edit-item" data-id="' + esc(item.id) + '">Düzenle</button><button class="button button-danger" data-action="delete-item" data-id="' + esc(item.id) + '">Sil</button></span>');
  const assignments = getWorkAssignments(item);
  const assignmentSummaryMarkup = assignments.length ? assignments.map((assignment) => {
    const team = state.teams.find((entry) => entry.id === assignment.teamId);
    return '<div class="detail-assignment-person"><strong>' + esc(assignment.member) + '</strong><small>' + esc(team?.name || "Takım") + (assignment.scope ? ' · ' + esc(assignment.scope) : "") + '</small></div>';
  }).join("") : '<p class="asset-muted">Henüz takım üyesi atanmadı.</p>';
  const assignment = document.createElement("div");
  assignment.className = "detail-assignment detail-property";
  assignment.innerHTML = '<div class="detail-assignment-heading"><span>Takım ve sorumlular</span><button class="text-button" data-action="edit-item" data-id="' + esc(id) + '">Düzenle</button></div><div class="detail-assignment-people">' + assignmentSummaryMarkup + '</div>';
  document.querySelector(".detail-aside")?.prepend(assignment);
  const roadmapNode = state.roadmap.find((node) => node.id === item.roadmapNodeId);
  const itemRelease = state.releases.find((release) => release.id === item.releaseId);
  const planningDetails = [item.startDate ? "Başlangıç: " + item.startDate : "", item.targetDate ? "Hedef: " + item.targetDate : "", item.targetPeriod ? "Dönem: " + item.targetPeriod : "", item.estimate !== undefined ? "Tahmini efor: " + item.estimate + " saat" : "", item.actualStartDate ? "Gerçek başlangıç: " + new Date(item.actualStartDate).toLocaleDateString("tr-TR") : "", item.completedAt ? "Tamamlandı: " + new Date(item.completedAt).toLocaleDateString("tr-TR") : "", itemRelease ? "Release: " + itemRelease.name + " · " + itemRelease.status : ""].filter(Boolean);
  if (planningDetails.length) document.querySelector(".detail-aside")?.insertAdjacentHTML("beforeend", '<div class="detail-property"><span>Planlama</span>' + planningDetails.map((line) => '<strong>' + esc(line) + '</strong>').join("") + '</div>');
  if (roadmapNode) document.querySelector(".detail-aside")?.insertAdjacentHTML("beforeend", '<div class="detail-property"><span>Ürün hedefi</span><strong>' + esc(roadmapNode.title) + '</strong><strong class="roadmap-product-stage">Ürün aşaması: ' + esc(item.productStage || "Sırada") + '</strong></div>');
  const lateBy = overdueDays(item);
  if (lateBy) document.querySelector(".detail-aside")?.insertAdjacentHTML("beforeend", '<div class="detail-property overdue-property"><span>Gecikme</span><strong>' + lateBy + ' gün</strong></div>');
  if (item.status === "Bloke" && item.blocker?.openedAt) document.querySelector(".detail-aside")?.insertAdjacentHTML("beforeend", '<div class="detail-property"><span>Blokajda geçen süre</span><strong>' + esc(elapsedLabel(item.blocker.openedAt)) + '</strong></div>');
  if (item.status === "Bloke" && item.blocker) document.querySelector(".detail-aside")?.insertAdjacentHTML("beforeend", '<div class="detail-property blocker-summary"><span>Blokaj nedeni</span><strong>' + esc(item.blocker.reason) + '</strong><span class="blocker-next-label">Beklenen karar/iş</span><strong>' + esc(item.blocker.expectedAction || "Belirtilmedi") + '</strong><span class="blocker-next-label">Sonraki adım</span><strong>' + esc(item.blocker.nextStep) + '</strong><span class="blocker-next-label">Takip sahibi</span><strong>' + esc(item.blocker.owner || "Atanmadı") + '</strong></div>');
  modalRoot.querySelector(".detail-title-wrap")?.insertAdjacentHTML("afterend", '<nav class="detail-tabs" aria-label="İş ayrıntısı bölümleri"><button type="button" class="selected" data-detail-tab="overview">Özet</button><button type="button" data-detail-tab="activity">Aktivite</button><button type="button" data-detail-tab="attachments">Ekler</button><button type="button" data-detail-tab="relationships">İlişkiler</button></nav>');
  modalRoot.querySelectorAll<HTMLElement>(".detail-main .detail-section").forEach((section) => {
    const tab = section.classList.contains("work-activity") || section.classList.contains("activity-note-composer") ? "activity" : section.querySelector(".detail-files") ? "attachments" : section.classList.contains("linked-assets-section") || section.classList.contains("dependency-section") || section.classList.contains("item-relationships") || section.classList.contains("work-diagram-section") ? "relationships" : "overview";
    section.dataset.detailTabSection = tab;
    section.hidden = tab !== "overview";
  });
  document.getElementById("detail-status")?.addEventListener("change", (event) => { const next = (event.target as HTMLSelectElement).value as WorkItem["status"]; if (next === item.status) return; openStatusUpdateModal(id, next); });
  document.getElementById("detail-priority")?.addEventListener("change", (event) => { const previous = item.priority; item.priority = (event.target as HTMLSelectElement).value as WorkItem["priority"]; logWorkChange(item, "Öncelik", previous, item.priority); save(); render(); openItem(id); });
}

let detailTabWheelCooldownUntil = 0;
let detailTabWheelDelta = 0;
document.addEventListener("wheel", (event) => {
  const tabBar = event.target instanceof Element ? event.target.closest<HTMLElement>(".detail-tabs") : null;
  if (!tabBar || event.ctrlKey) return;
  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  if (!delta) return;
  event.preventDefault();
  const now = performance.now();
  if (now < detailTabWheelCooldownUntil) return;
  detailTabWheelDelta += delta;
  if (Math.abs(detailTabWheelDelta) < 45) return;
  const buttons = [...tabBar.querySelectorAll<HTMLButtonElement>("[data-detail-tab]")];
  const current = buttons.findIndex((button) => button.classList.contains("selected"));
  const next = Math.max(0, Math.min(buttons.length - 1, current + (detailTabWheelDelta > 0 ? 1 : -1)));
  detailTabWheelDelta = 0;
  if (current < 0 || next === current) return;
  detailTabWheelCooldownUntil = now + 240;
  buttons[next].click();
}, { passive: false });

async function addFilesToItem(id: string): Promise<void> {
  const item = itemById(id);
  if (!item) return;
  let files = [];
  if (desktop) {
    try { files = await desktop.pickAttachments(); } catch { toast("Dosyalar eklenemedi."); return; }
  } else {
    document.getElementById("detail-file-fallback")?.click();
    return;
  }
  item.attachments = [...(item.attachments || []), ...files];
  if (files.length) addWorkActivity(item, "attachment", files.length + " dosya eki eklendi: " + files.map((file) => file.name).join(", "));
  save();
  render();
  openItem(id);
  toast(files.length + " dosya eklendi.");
}

async function addProgressAttachments(): Promise<void> {
  if (desktop) {
    try { progressAttachments.push(...await desktop.pickAttachments()); }
    catch { toast("Dosyalar eklenemedi."); return; }
    const root = document.getElementById("progress-note-files");
    if (root) root.innerHTML = progressAttachments.map((file, index) => '<span class="progress-note-file">' + esc(file.name) + '<button type="button" data-remove-progress-file="' + index + '" aria-label="Eki kaldır">×</button></span>').join("");
  } else {
    document.getElementById("progress-note-file-fallback")?.click();
  }
}

function saveProgressNote(id: string): void {
  const item = itemById(id);
  const text = (document.getElementById("progress-note-text") as HTMLTextAreaElement | null)?.value.trim() || "";
  if (!item || !text) { toast("İlerleme notunu yaz."); return; }
  const visibility = (document.getElementById("progress-note-visibility") as HTMLSelectElement | null)?.value === "private" ? "private" : "team";
  item.activity ||= [];
  item.activity.unshift({ id: nextId("ACT"), kind: "comment", message: text, actor: state.profile.userName || "PO", occurredAt: new Date().toISOString(), visibility, attachments: [...progressAttachments] });
  progressAttachments = [];
  save();
  render();
  openItem(id);
  toast("İlerleme notu eklendi.");
}

async function addFilesToTask(id: string): Promise<void> {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  if (desktop) {
    const files = await desktop.pickAttachments();
    task.attachments = [...(task.attachments || []), ...files];
    save();
    openTask(id);
  } else {
    const input = document.getElementById("task-file-fallback") as HTMLInputElement | null;
    if (!input) return;
    input.dataset.taskId = id;
    input.click();
  }
}

async function addFilesToNote(id: string): Promise<void> {
  const note = state.notes.find((entry) => entry.id === id);
  if (!note) return;
  if (desktop) {
    const files = await desktop.pickAttachments();
    note.attachments = [...(note.attachments || []), ...files];
    save();
    showNote(id);
  } else {
    const input = document.getElementById("note-file-fallback") as HTMLInputElement | null;
    if (!input) return;
    input.dataset.noteId = id;
    input.click();
  }
}

async function removeDraftAttachment(index: number): Promise<void> {
  const [file] = draftAttachments.splice(index, 1);
  if (file?.storedName && desktop) await desktop.removeAttachment(file.storedName);
  renderDraftFiles();
}

async function openAttachment(storedName: string): Promise<void> {
  if (!storedName || !desktop) return;
  try {
    const preview = await desktop.previewAttachment(storedName);
    if (preview) {
      const content = preview.mimeType === "application/pdf" ? '<iframe title="Dosya önizlemesi" src="' + preview.dataUrl + '"></iframe>' : '<img alt="Dosya önizlemesi" src="' + preview.dataUrl + '">';
      modalRoot.insertAdjacentHTML("beforeend", '<div class="attachment-preview-backdrop" data-close-attachment-preview><section class="attachment-preview-modal" role="dialog" aria-modal="true"><header><strong>' + esc(pathLikeFileName(storedName)) + '</strong><button type="button" data-close-attachment-preview aria-label="Önizlemeyi kapat">×</button></header><div>' + content + '</div></section></div>');
      return;
    }
  } catch { /* Fall back to the operating system viewer. */ }
  const error = await desktop.openAttachment(storedName);
  if (error) toast(error);
}

function pathLikeFileName(value: string): string { return value.replace(/^.*[\\/]/, "").replace(/^[a-f0-9-]{20,}_/i, ""); }

async function saveNewRecord(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  const kind = field("new-kind").value;
  const title = field("new-title-input").value.trim();
  const description = field("new-description").value.trim();
  if (pendingEmailAttachmentToken && desktop) {
    const selectedIds = [...document.querySelectorAll<HTMLInputElement>("[data-email-attachment]:checked")].map((input) => input.dataset.emailAttachment || "").filter(Boolean);
    if (selectedIds.length) {
      const submit = (event.submitter as HTMLButtonElement | null) || document.querySelector<HTMLButtonElement>('#new-form button[type="submit"]');
      if (submit) { submit.disabled = true; submit.dataset.originalLabel = submit.textContent || "Kaydet"; submit.textContent = "E-posta ekleri alınıyor…"; }
      try {
        draftAttachments.push(...await desktop.importSelectedEmailAttachments(pendingEmailAttachmentToken, selectedIds));
        pendingEmailAttachmentToken = "";
        renderDraftFiles();
      } catch (error) {
        if (submit) { submit.disabled = false; submit.textContent = submit.dataset.originalLabel || "Kaydet"; }
        toast(error instanceof Error ? error.message : "E-posta ekleri içe aktarılamadı.");
        return;
      }
      if (submit) { submit.disabled = false; submit.textContent = submit.dataset.originalLabel || "Kaydet"; }
    } else {
      pendingEmailAttachmentToken = "";
    }
  }
  if (kind === "Backlog işi") {
    const assignmentResult = readAssignmentRows("new-assignment-list");
    if (assignmentResult.invalid) { toast("Her atama satırında hem takım hem üye seç; kullanılmayan satırları kaldır."); return; }
    const firstAssignment = assignmentResult.assignments[0];
    const item: WorkItem = {
      id: "PAY-" + Math.floor(240 + Math.random() * 600),
      type: field("new-item-type").value as WorkItem["type"],
      title,
      description,
      status: "Yeni",
      priority: field("new-priority").value as WorkItem["priority"],
      project: field("new-project").value,
      area: field("new-area").value.trim() || "Genel",
      startDate: field("new-start-date").value,
      targetDate: field("new-target-date").value,
      targetPeriod: field("new-target-period").value.trim(),
      estimate: field("new-estimate").value ? Number(field("new-estimate").value) : undefined,
      roadmapNodeId: field("new-roadmap-node").value || undefined,
      productStage: field("new-product-stage").value as ProductStage,
      releaseId: field("new-release").value || undefined,
      updated: "Az önce",
      acceptance: field("new-acceptance").value.split("\n").map((line) => line.trim()).filter(Boolean),
      attachments: [...draftAttachments],
      labels: [],
      teamId: firstAssignment?.teamId || "",
      assignee: firstAssignment?.member || "",
      assignments: assignmentResult.assignments,
      assetIds: [...draftAssetIds],
      dependsOnIds: [],
      activity: [],
      sourceEmail: pendingDroppedEmailSource || undefined
    };
    if (item.releaseId && state.releases.find((release) => release.id === item.releaseId)?.project !== item.project) { toast("İşe yalnızca aynı projedeki release atanabilir."); return; }
    if (item.startDate && item.targetDate && item.targetDate < item.startDate) { toast("Hedef bitiş tarihi başlangıç tarihinden önce olamaz."); return; }
    addWorkActivity(item, "created", "İş oluşturuldu.");
    state.items.unshift(item);
    toast("Yeni backlog işi oluşturuldu.");
    activeView = "backlog";
  } else if (kind === "Kişisel görev") {
    state.tasks.unshift({ id: nextId("TASK"), title, due: field("new-due").value, done: false, linked: field("new-linked-task").value, description, attachments: [...draftAttachments], sourceEmail: pendingDroppedEmailSource || undefined, remindAt: field("new-remind-at").value || undefined });
    toast("Görev kişisel alanına eklendi.");
    activeView = "focus";
  } else {
    state.notes.unshift({ id: nextId("NOTE"), title, body: description, linked: field("new-linked-note").value, updated: "Az önce", attachments: [...draftAttachments], sourceEmail: pendingDroppedEmailSource || undefined });
    toast("Not kişisel alanına eklendi.");
    activeView = "focus";
  }
  if (pendingDroppedEmailSource) {
    localStorage.setItem("rota-email-create-kind", kind);
    if (kind === "Backlog işi") localStorage.setItem("rota-email-create-project", field("new-project").value);
  }
  save();
  pendingDroppedEmailSource = null;
  pendingEmailAttachmentToken = "";
  pendingEmailAttachmentChoices = [];
  closeModal(true);
  setView(activeView);
}

function toggleTask(id: string): void {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  task.done = !task.done;
  save();
  render();
}

function openTask(id: string): void {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  attachmentTarget = { kind: "task", id };
  const related = task.linked && itemById(task.linked);
  const files = task.attachments || [];
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal task-detail-modal note-modal" data-context-task-id="' + esc(task.id) + '" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KİŞİSEL GÖREV · ' + esc(task.due) + '</div><h2>' + esc(task.title) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><p class="note-detail-body">' + esc(task.description || "Bu görev için ek bir açıklama yok.") + '</p>' + (related ? '<button class="linked-badge" data-open-item="' + esc(related.id) + '">' + esc(related.id) + ' · ilişkili iş</button>' : '<span class="independent-label">Bağımsız görev</span>') + '<div class="detail-section"><div class="section-title-row"><h3>Dosya ekleri <span class="count-chip">' + files.length + '</span></h3><button class="text-button" data-add-to-task="' + esc(task.id) + '">+ Dosya ekle</button></div>' + (files.length ? attachmentListMarkup(files, "task:" + task.id) : '<div class="attachment-empty"><span>▤</span><span>Bu görevde dosya eki yok.</span></div>') + '<input id="task-file-fallback" type="file" multiple hidden></div></section></div>';
  if (task.remindAt) modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="detail-property reminder-property"><span>Hatırlatma</span><strong>' + esc(new Date(task.remindAt).toLocaleString("tr-TR")) + '</strong></div>');
  if (task.sourceEmail) { const source = task.sourceEmail; const sourceFile = files.find((file) => file.name === source.name); modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="email-source-card"><span class="email-source-icon">✉</span><span><strong>E-postadan oluşturuldu</strong><small>' + esc(source.name + (source.from ? " · " + source.from : "") + (source.date ? " · " + source.date : "")) + '</small></span>' + (sourceFile?.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(sourceFile.storedName) + '">Özgün e-postayı aç</button>' : '') + '</div>'); }
  modalRoot.querySelector(".modal-header")?.insertAdjacentHTML("beforeend", '<span class="detail-actions"><button class="button button-secondary" data-action="edit-task" data-id="' + esc(task.id) + '">Düzenle</button><button class="button button-danger" data-action="delete-task" data-id="' + esc(task.id) + '">Sil</button></span>');
}

function showNote(id: string): void {
  const note = state.notes.find((entry) => entry.id === id);
  if (!note) return;
  attachmentTarget = { kind: "note", id };
  const related = note.linked && itemById(note.linked);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal note-modal" data-context-note-id="' + esc(note.id) + '" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KİŞİSEL NOT · ' + esc(note.updated) + '</div><h2>' + esc(note.title) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><p class="note-detail-body">' + esc(note.body) + '</p>' + (related ? '<button class="linked-badge" data-open-item="' + esc(related.id) + '">' + esc(related.id) + ' · ilişkili iş</button>' : '<span class="independent-label">Bağımsız not</span>') + '<div class="detail-section"><div class="section-title-row"><h3>Dosya ekleri <span class="count-chip">' + (note.attachments?.length || 0) + '</span></h3><button class="text-button" data-add-to-note="' + esc(note.id) + '">+ Dosya ekle</button></div>' + (note.attachments?.length ? attachmentListMarkup(note.attachments, "note:" + note.id) : '<div class="attachment-empty"><span>▤</span><span>Bu notta dosya eki yok.</span></div>') + '<input id="note-file-fallback" type="file" multiple hidden></div></section></div>';
  if (note.sourceEmail) { const source = note.sourceEmail; const sourceFile = (note.attachments || []).find((file) => file.name === source.name); modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="email-source-card"><span class="email-source-icon">✉</span><span><strong>E-postadan oluşturuldu</strong><small>' + esc(source.name + (source.from ? " · " + source.from : "") + (source.date ? " · " + source.date : "")) + '</small></span>' + (sourceFile?.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(sourceFile.storedName) + '">Özgün e-postayı aç</button>' : '') + '</div>'); }
  modalRoot.querySelector(".detail-section")?.insertAdjacentHTML("beforebegin", diagramSectionMarkup("note", note.id));
  modalRoot.querySelector(".modal-header")?.insertAdjacentHTML("beforeend", '<span class="detail-actions"><button class="button button-secondary" data-action="edit-note" data-id="' + esc(note.id) + '">Düzenle</button><button class="button button-danger" data-action="delete-note" data-id="' + esc(note.id) + '">Sil</button></span>');
}

function openRecordEditor(kind: "item" | "task" | "note", id: string): void {
  const linkedOptions = (selected: string) => '<option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === selected ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("");
  if (kind === "item") {
    const item = itemById(id); if (!item) return;
    draftAssetIds = [...(item.assetIds || [])];
    const editableProjects = state.projects.filter((project) => !project.archived || project.name === item.project);
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">BACKLOG İŞİ · ' + esc(item.id) + '</div><h2>İşi düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="edit-item-form" class="settings-form work-record-form"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="120" required value="' + esc(item.title) + '"></label><div class="form-two-col"><label class="field-label">Proje<select class="field-input" name="project">' + editableProjects.map((project) => '<option ' + (project.name === item.project ? "selected" : "") + '>' + esc(project.name) + (project.archived ? ' · Arşivde' : '') + '</option>').join("") + '</select></label><label class="field-label">İş türü<select class="field-input" name="type">' + (["Story", "Bug", "Task"] as const).map((type) => '<option ' + (type === item.type ? "selected" : "") + '>' + type + '</option>').join("") + '</select></label><label class="field-label">Durum<select class="field-input" name="status">' + (["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"] as const).map((status) => '<option ' + (status === item.status ? "selected" : "") + '>' + status + '</option>').join("") + '</select></label><label class="field-label">Öncelik<select class="field-input" name="priority">' + (["Kritik", "Yüksek", "Orta", "Düşük"] as const).map((priority) => '<option ' + (priority === item.priority ? "selected" : "") + '>' + priority + '</option>').join("") + '</select></label><label class="field-label">Ürün alanı<input class="field-input" name="area" maxlength="80" value="' + esc(item.area) + '"></label></div><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" rows="4">' + esc(item.description) + '</textarea></label><label class="field-label">Kabul kriterleri <small>(her kriter ayrı satırda)</small><textarea class="field-input field-textarea" name="acceptance" rows="4">' + esc((item.acceptance || []).join("\n")) + '</textarea></label><input type="hidden" name="id" value="' + esc(id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-item="' + esc(id) + '">Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
    const editStatusField = modalRoot.querySelector('label.field-label:has(select[name="status"])');
    const templateCategory: AcceptanceTemplate["category"] = item.type === "Story" || item.type === "Bug" ? item.type : "Genel";
    modalRoot.querySelector('textarea[name="acceptance"]')?.insertAdjacentHTML("afterend", acceptanceTemplateControls("edit-acceptance", templateCategory));
    modalRoot.querySelector("#edit-item-form .form-two-col")?.insertAdjacentHTML("afterend", '<div class="form-two-col planning-fields"><label class="field-label">Başlangıç tarihi<input class="field-input" type="date" name="startDate" value="' + esc(item.startDate || "") + '"></label><label class="field-label">Hedef bitiş tarihi<input class="field-input" type="date" name="targetDate" value="' + esc(item.targetDate || "") + '"></label><label class="field-label">Planlanan dönem<input class="field-input" name="targetPeriod" maxlength="40" value="' + esc(item.targetPeriod || "") + '" placeholder="Örn. 2026 Q4"></label><label class="field-label">Tahmini efor (saat)<input class="field-input" type="number" name="estimate" min="0" step="0.5" value="' + esc(item.estimate ?? "") + '"></label></div><label class="field-label release-link-field">Release<select class="field-input" name="releaseId"><option value="">Release seçilmedi</option>' + state.releases.filter((release) => release.project === item.project || release.id === item.releaseId).map((release) => '<option value="' + esc(release.id) + '" ' + (release.id === item.releaseId ? 'selected' : '') + '>' + esc(release.name + " · " + release.project + " · " + release.status) + '</option>').join("") + '</select></label>');
    const dependencyOptions = state.items.filter((candidate) => candidate.id !== item.id).map((candidate) => '<option value="' + esc(candidate.id) + '" ' + ((item.dependsOnIds || []).includes(candidate.id) ? "selected" : "") + '>' + esc(candidate.id + " · " + candidate.title + " (" + candidate.status + ")") + '</option>').join("");
    modalRoot.querySelector("#edit-item-form .planning-fields")?.insertAdjacentHTML("afterend", '<div class="form-two-col roadmap-link-fields"><label class="field-label">Ürün hedefi<select class="field-input" name="roadmapNodeId">' + roadmapNodeOptions(item.roadmapNodeId || "") + '</select></label><label class="field-label">Ürün aşaması<select class="field-input" name="productStage">' + productStageOptions(item.productStage || "Sırada") + '</select></label></div><label class="field-label dependency-picker-label">Beklenen işler <small>(bir iş bekliyorsa seç; döngüye izin verilmez)</small><select class="field-input dependency-picker" name="dependsOnIds" multiple size="5">' + dependencyOptions + '</select></label>');
    editStatusField?.insertAdjacentHTML("afterend", '<div id="edit-blocker-fields" class="edit-blocker-fields ' + (item.status === "Bloke" ? "" : "hidden") + '"><label class="field-label">Blokaj nedeni<textarea class="field-input field-textarea" name="blockerReason" rows="2" maxlength="1000" ' + (item.status === "Bloke" ? "required" : "") + '>' + esc(item.blocker?.reason || "") + '</textarea></label><label class="field-label">Sonraki adım<textarea class="field-input field-textarea" name="blockerNextStep" rows="2" maxlength="1000" ' + (item.status === "Bloke" ? "required" : "") + '>' + esc(item.blocker?.nextStep || "") + '</textarea></label></div>');
    modalRoot.querySelector('[name="blockerNextStep"]')?.parentElement?.insertAdjacentHTML("afterend", '<label class="field-label blocker-extra-field">Beklenen karar veya iş<textarea class="field-input field-textarea" name="blockerExpected" rows="2" maxlength="1000" ' + (item.status === "Bloke" ? "required" : "") + '>' + esc(item.blocker?.expectedAction || "") + '</textarea></label><label class="field-label blocker-extra-field">Takip sahibi<select class="field-input" name="blockerOwner" ' + (item.status === "Bloke" ? "required" : "") + '>' + blockerOwnerOptions(item.blocker?.owner || "") + '</select></label><label class="field-label blocker-extra-field">Takip hatırlatması<input class="field-input" name="blockerFollowUpAt" type="datetime-local" value="' + esc(item.blocker?.followUpAt || "") + '"></label>');
    editStatusField?.insertAdjacentHTML("afterend", '<label class="field-label edit-status-note">Güncelleme notu <small>(durum değişince isteğe bağlı)</small><textarea class="field-input field-textarea" name="statusUpdateNote" rows="2" maxlength="2000" placeholder="İlerleme veya karar notu…"></textarea></label>');
    editStatusField?.querySelector<HTMLSelectElement>('select[name="status"]')?.addEventListener("change", (event) => {
      const blocked = (event.target as HTMLSelectElement).value === "Bloke";
      const blockerFields = document.getElementById("edit-blocker-fields");
      blockerFields?.classList.toggle("hidden", !blocked);
      blockerFields?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('textarea[name="blockerReason"], textarea[name="blockerNextStep"], textarea[name="blockerExpected"], select[name="blockerOwner"]').forEach((field) => { field.required = blocked; });
    });
    modalRoot.querySelector('label.field-label:has(textarea[name="description"])')?.insertAdjacentHTML("beforebegin", assignmentEditorMarkup("edit-assignment-list", getWorkAssignments(item)));
    modalRoot.querySelector('label.field-label:has(textarea[name="acceptance"])')?.insertAdjacentHTML("beforebegin", assetPickerMarkup());
    renderNewAssetSelection();
    renderNewAssetOptions();
  } else if (kind === "task") {
    const task = state.tasks.find((entry) => entry.id === id); if (!task) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KİŞİSEL GÖREV</div><h2>Görevi düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="edit-task-form" class="settings-form"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="120" required value="' + esc(task.title) + '"></label><label class="field-label">Son tarih<input class="field-input" name="due" maxlength="40" value="' + esc(task.due) + '"></label><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" rows="4">' + esc(task.description || "") + '</textarea></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked">' + linkedOptions(task.linked) + '</select></label><input type="hidden" name="id" value="' + esc(id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-task="' + esc(id) + '">Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
    modalRoot.querySelector('input[name="due"]')?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Hatırlat<input class="field-input" type="datetime-local" name="remindAt" value="' + esc(task.remindAt || "") + '"></label>');
  } else {
    const note = state.notes.find((entry) => entry.id === id); if (!note) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KİŞİSEL NOT</div><h2>Notu düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="edit-note-form" class="settings-form"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="120" required value="' + esc(note.title) + '"></label><label class="field-label">Not<textarea class="field-input field-textarea" name="body" rows="7" required>' + esc(note.body) + '</textarea></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked">' + linkedOptions(note.linked) + '</select></label><input type="hidden" name="id" value="' + esc(id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-note="' + esc(id) + '">Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  }
}

async function deleteBacklogItems(ids: string[], confirmation: string): Promise<void> {
  const idsToDelete = new Set(ids);
  const itemsToDelete = state.items.filter((item) => idsToDelete.has(item.id));
  if (!itemsToDelete.length || !window.confirm(confirmation)) return;
  const undoSnapshot = structuredClone(state);
  const deletedAttachments = itemsToDelete.flatMap((item) => item.attachments || []);
  const removedIds = new Set(itemsToDelete.map((item) => item.id));
  state.items = state.items.filter((item) => !removedIds.has(item.id));
  state.diagrams = state.diagrams.filter((diagram) => diagram.ownerType !== "item" || !removedIds.has(diagram.ownerId));
  state.items.forEach((item) => {
    const removedDependencies = (item.dependsOnIds || []).filter((dependencyId) => removedIds.has(dependencyId));
    if (!removedDependencies.length) return;
    item.dependsOnIds = (item.dependsOnIds || []).filter((dependencyId) => !removedIds.has(dependencyId));
    addWorkActivity(item, "change", "Silinen iş nedeniyle bağımlılık kaldırıldı: " + removedDependencies.join(", "));
  });
  state.tasks.forEach((task) => { if (removedIds.has(task.linked)) task.linked = ""; });
  state.notes.forEach((note) => { if (removedIds.has(note.linked)) note.linked = ""; });
  removedIds.forEach((removedId) => selectedBacklogItemIds.delete(removedId));
  if (inlineBacklogEdit && removedIds.has(inlineBacklogEdit.itemId)) inlineBacklogEdit = null;
  save(); closeModal(); render();
  toastUndoDeletion(itemsToDelete.length === 1 ? "Backlog işi silindi." : itemsToDelete.length + " backlog işi silindi.", undoSnapshot, deletedAttachments);
}

async function deleteSelectedBacklogItems(): Promise<void> {
  const selectedItems = getSelectedBacklogItems();
  if (!selectedItems.length) { toast("Silmek için önce backlog işlerini seç."); return; }
  const titlePreview = selectedItems.slice(0, 5).map((item) => "• " + item.id + " · " + item.title).join("\n");
  const remainder = selectedItems.length > 5 ? "\n• ve " + (selectedItems.length - 5) + " iş daha" : "";
  const attachmentCount = selectedItems.reduce((count, item) => count + (item.attachments?.length || 0), 0);
  const prompt = selectedItems.length + " backlog işi silinsin mi?\n\n" + titlePreview + remainder + "\n\n" + attachmentCount + " dosya eki de silinecek. Silme işlemini 6 saniye içinde geri alabilirsin; bağlı kişisel görev ve notlar bağlantısız kalır.";
  await deleteBacklogItems(selectedItems.map((item) => item.id), prompt);
}

async function deleteRecord(kind: "item" | "task" | "note", id: string): Promise<void> {
  const record = kind === "item" ? itemById(id) : kind === "task" ? state.tasks.find((entry) => entry.id === id) : state.notes.find((entry) => entry.id === id);
  if (!record) return;
  if (kind === "item") {
    await deleteBacklogItems([id], '"' + record.title + '" backlog işi ve ekleri silinsin mi? Bağlı kişisel görev ve notlar korunup bağlantısız kalacak. Bu işlem geri alınamaz.');
    return;
  }
  const label = kind === "task" ? "kişisel görevi" : "notu";
  if (!window.confirm('"' + record.title + '" ' + label + ' silinsin mi? Silme işlemini 6 saniye içinde geri alabilirsin.')) return;
  const undoSnapshot = structuredClone(state);
  if (kind === "task") state.tasks = state.tasks.filter((entry) => entry.id !== id);
  else {
    state.notes = state.notes.filter((entry) => entry.id !== id);
    state.diagrams = state.diagrams.filter((diagram) => diagram.ownerType !== "note" || diagram.ownerId !== id);
  }
  save(); closeModal(); render(); toastUndoDeletion("Kayıt silindi.", undoSnapshot, record.attachments || []);
}

function duplicateBacklogItem(id: string): void {
  const original = itemById(id);
  if (!original) return;
  let newId = nextId("PAY");
  while (state.items.some((item) => item.id === newId)) newId = nextId("PAY");
  const duplicate: WorkItem = {
    id: newId, type: original.type, title: original.title + " (kopya)", status: "Yeni", priority: original.priority,
    project: original.project, area: original.area, updated: "Az önce", description: original.description,
    acceptance: [...original.acceptance], attachments: [], labels: [...(original.labels || [])],
    assignments: getWorkAssignments(original).map((assignment) => ({ ...assignment })),
    teamId: original.teamId, assignee: original.assignee, assetIds: [...(original.assetIds || [])], dependsOnIds: [], activity: []
  };
  addWorkActivity(duplicate, "created", "" + original.id + " işinden çoğaltıldı.");
  state.items.unshift(duplicate); save(); renderBacklog(); toast("Yeni taslak oluşturuldu: " + newId);
}

function openSetupWizard(firstRun = false): void {
  const projectsText = state.projects.map((project) => project.name).join("\n");
  modalRoot.innerHTML = '<div class="modal-backdrop" ' + (firstRun ? '' : 'data-close-modal') + '><section class="modal settings-modal setup-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">İLK KURULUM</div><h2>' + (firstRun ? "Çalışma alanını oluşturalım" : "Çalışma alanı kurulumunu düzenle") + '</h2></div>' + (firstRun ? '' : '<button class="modal-close" data-close-modal>×</button>') + '</header><form id="setup-form" class="settings-form"><p class="settings-intro">Kurum ve kullanıcı bilgilerini gir; projeleri tanımla. Takımlar ve üyeler daha sonra çalışma alanı ayarlarından yönetilir. Veriler bu cihazda saklanır.</p>' + (firstRun ? '<fieldset class="setup-choice"><legend>Başlangıç verisi</legend><label><input type="radio" name="starter" value="sample" checked> Örnek banka backlog’u ile başla</label><label><input type="radio" name="starter" value="empty"> Boş çalışma alanı oluştur</label></fieldset>' : '') + '<div class="form-two-col"><label class="field-label">Kurum / ekip<input class="field-input" name="organization" maxlength="60" required value="' + esc(state.profile.organization) + '"></label><label class="field-label">Çalışma alanı adı<input class="field-input" name="workspace" maxlength="60" required value="' + esc(state.profile.workspace) + '"></label><label class="field-label">Adın<input class="field-input" name="userName" maxlength="60" required value="' + esc(state.profile.userName) + '"></label><label class="field-label">Rolün<input class="field-input" name="userRole" maxlength="60" required value="' + esc(state.profile.userRole) + '"></label></div><section class="jira-settings-block"><h3>Jira (isteğe bağlı)</h3><p>Base URL eklediğinde Jira paneli açılır. Token’ı daha sonra Jira’dan oluşturup panelde kaydedebilirsin.</p><label class="field-label">Jira Base URL<input class="field-input" name="jiraBaseUrl" type="url" placeholder="https://jira.kurum.local" value="' + esc(state.profile.jiraBaseUrl || "") + '"></label></section><label class="field-label">Projeler <small>(her satıra bir proje)</small><textarea class="field-input field-textarea" name="projects" rows="3" required>' + esc(projectsText) + '</textarea></label><div class="settings-note">Örnek veri seçimi yalnızca ilk açılışta sunulur. Mevcut işler, görevler ve notlar kurulum tekrar açıldığında korunur.</div><footer class="modal-footer">' + (firstRun ? '' : '<button type="button" class="button button-quiet" data-close-modal>Kapat</button>') + '<button type="submit" class="button button-primary">Kurulumu tamamla</button></footer></form></section></div>';
}

function saveSetup(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const values = new FormData(form);
  const jiraBaseUrl = String(values.get("jiraBaseUrl") || "").trim().replace(/\/+$/, "");
  if (!validJiraBaseUrl(jiraBaseUrl)) { toast("Jira Base URL HTTPS adresi olmalı; yalnızca localhost için HTTP kullanılabilir."); return; }
  const newProjectNames = [...new Set(String(values.get("projects") || "").split(/\r?\n/).map((value) => value.trim()).filter(Boolean))];
  if (!newProjectNames.length) { toast("En az bir proje ekle."); return; }
  const oldProjects = [...state.projects];
  const oldTeams = [...state.teams];
  const newProjects: Project[] = newProjectNames.map((name, index) => {
    const old = oldProjects.find((entry) => entry.name === name) || oldProjects[index];
    return { id: old?.id || nextId("PROJECT"), name, color: old?.color || (["blue", "violet", "amber", "green"] as const)[index % 4], assignments: old?.assignments || [], archived: old?.archived || false };
  });
  const projectFallback = newProjects[0].name;
  state.items.forEach((item) => {
    const oldIndex = oldProjects.findIndex((project) => project.name === item.project);
    if (!newProjectNames.includes(item.project)) item.project = newProjectNames[Math.min(Math.max(oldIndex, 0), newProjectNames.length - 1)] || projectFallback;
  });
  state.assets.forEach((asset) => {
    const oldIndex = oldProjects.findIndex((project) => project.name === asset.project);
    if (!newProjectNames.includes(asset.project)) asset.project = newProjectNames[Math.min(Math.max(oldIndex, 0), newProjectNames.length - 1)] || projectFallback;
  });
  state.roadmap.forEach((node) => {
    const oldIndex = oldProjects.findIndex((project) => project.name === node.project);
    if (!newProjectNames.includes(node.project)) node.project = newProjectNames[Math.min(Math.max(oldIndex, 0), newProjectNames.length - 1)] || projectFallback;
  });
  const newTeams: Team[] = oldTeams;
  const teamIdMap = new Map(oldTeams.map((team) => [team.id, newTeams.find((entry) => entry.id === team.id)?.id || ""]));
  state.items.forEach((item) => {
    item.assignments = getWorkAssignments(item).flatMap((assignment) => {
      const mappedId = teamIdMap.get(assignment.teamId);
      const team = newTeams.find((entry) => entry.id === mappedId);
      return mappedId && team?.members.includes(assignment.member) ? [{ ...assignment, teamId: mappedId }] : [];
    });
    syncLegacyAssignmentFields(item);
  });
  newProjects.forEach((project) => {
    const old = oldProjects.find((entry) => entry.id === project.id);
    project.assignments = (old?.assignments || []).flatMap((assignment) => {
      const mappedId = teamIdMap.get(assignment.teamId);
      const team = newTeams.find((entry) => entry.id === mappedId);
      return mappedId && team?.members.includes(assignment.member) ? [{ ...assignment, teamId: mappedId }] : [];
    });
  });
  state.assets.forEach((asset) => {
    if (!asset.ownerTeamId) return;
    asset.ownerTeamId = teamIdMap.get(asset.ownerTeamId) || "";
  });
  state.projects = newProjects;
  state.teams = newTeams;
  state.profile = { organization: String(values.get("organization") || "").trim(), workspace: String(values.get("workspace") || "").trim(), userName: String(values.get("userName") || "").trim(), userRole: String(values.get("userRole") || "").trim(), ...(jiraBaseUrl ? { jiraBaseUrl } : {}) };
  if (!jiraBaseUrl) { jiraBoards = []; jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; jiraIssues = []; jiraCatalogLoadedFor = ""; } else if (jiraCatalogLoadedFor !== jiraBaseUrl) jiraCatalogLoadedFor = "";
  if (!hasStoredWorkspace && values.get("starter") === "empty") { state.items = []; state.tasks = []; state.notes = []; }
  activeProjectId = state.projects[0]?.id || null;
  activeView = "backlog";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.toggle("active", node.dataset.view === "backlog"));
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = state.projects.find((project) => project.id === activeProjectId)?.name || "Backlog";
  save(); closeModal(); render();
  toast("Çalışma alanı hazır.");
}

function saveEditedRecord(event: SubmitEvent, kind: "item" | "task" | "note"): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  if (kind === "item") {
    const item = itemById(id); if (!item) return;
    const previous = { title: item.title, type: item.type, project: item.project, status: item.status, priority: item.priority, area: item.area, description: item.description, acceptance: [...item.acceptance], assetIds: [...(item.assetIds || [])], assignments: getWorkAssignments(item).map((assignment) => ({ ...assignment })), dependencies: [...(item.dependsOnIds || [])], roadmapNodeId: item.roadmapNodeId || "", productStage: item.productStage || "Sırada", releaseId: item.releaseId || "" };
    const nextType = String(values.get("type")) as WorkItem["type"];
    const nextStatus = String(values.get("status")) as WorkItem["status"];
    const blockerReason = String(values.get("blockerReason") || "").trim();
    const blockerNextStep = String(values.get("blockerNextStep") || "").trim();
    const blockerExpected = String(values.get("blockerExpected") || "").trim();
    const blockerOwner = String(values.get("blockerOwner") || "");
    const blockerFollowUpAt = String(values.get("blockerFollowUpAt") || "");
    const statusUpdateNote = String(values.get("statusUpdateNote") || "").trim();
    const startDate = String(values.get("startDate") || "");
    const targetDate = String(values.get("targetDate") || "");
    const targetPeriod = String(values.get("targetPeriod") || "").trim();
    const estimateValue = String(values.get("estimate") || "");
    const dependencyIds = [...new Set(values.getAll("dependsOnIds").map(String))];
    const roadmapNodeId = String(values.get("roadmapNodeId") || "");
    const productStage = String(values.get("productStage") || "Sırada") as ProductStage;
    const releaseId = String(values.get("releaseId") || "");
    if (releaseId && state.releases.find((release) => release.id === releaseId)?.project !== String(values.get("project") || "")) { toast("İşe yalnızca aynı projedeki release atanabilir."); return; }
    if (dependencyWouldCycle(id, dependencyIds)) { toast("Bu bağlantı bağımlılık döngüsü oluşturuyor."); return; }
    if (startDate && targetDate && targetDate < startDate) { toast("Hedef bitiş tarihi başlangıç tarihinden önce olamaz."); return; }
    const previousStartDate = item.startDate || "";
    const previousTargetDate = item.targetDate || "";
    const previousEstimate = item.estimate;
    const previousTargetPeriod = item.targetPeriod || "";
    if (nextStatus === "Bloke" && (!blockerReason || !blockerNextStep || !blockerExpected || !blockerOwner)) { toast("Bloke iş için neden, beklenen karar/iş, sonraki adım ve takip sahibini doldur."); return; }
    item.title = String(values.get("title") || "").trim();
    item.project = String(values.get("project") || "");
    item.type = nextType;
    item.status = previous.status;
    item.priority = String(values.get("priority")) as WorkItem["priority"];
    item.area = String(values.get("area") || "").trim() || "Genel";
    item.startDate = startDate;
    item.targetDate = targetDate;
    item.targetPeriod = targetPeriod;
    item.estimate = estimateValue ? Number(estimateValue) : undefined;
    item.dependsOnIds = dependencyIds;
    item.roadmapNodeId = roadmapNodeId || undefined;
    item.productStage = productStage;
    item.releaseId = releaseId || undefined;
    item.description = String(values.get("description") || "").trim();
    item.acceptance = String(values.get("acceptance") || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    item.assetIds = [...new Set(draftAssetIds.filter((assetId) => state.assets.some((asset) => asset.id === assetId)))];
    const assignmentResult = readAssignmentRows("edit-assignment-list");
    if (assignmentResult.invalid) { toast("Her atama satırında hem takım hem üye seç; kullanılmayan satırları kaldır."); return; }
    item.assignments = assignmentResult.assignments;
    item.teamId = assignmentResult.assignments[0]?.teamId || "";
    item.assignee = assignmentResult.assignments[0]?.member || "";
    applyWorkStatus(item, nextStatus, nextStatus === "Bloke" ? { reason: blockerReason, nextStep: blockerNextStep, expectedAction: blockerExpected, owner: blockerOwner, followUpAt: blockerFollowUpAt } : item.blocker, previous.status !== nextStatus ? statusUpdateNote : "");
    logWorkChange(item, "Başlık", previous.title, item.title);
    logWorkChange(item, "Tür", previous.type, item.type);
    logWorkChange(item, "Proje", previous.project, item.project);
    logWorkChange(item, "Durum", previous.status, item.status);
    logWorkChange(item, "Öncelik", previous.priority, item.priority);
    logWorkChange(item, "Ürün alanı", previous.area, item.area);
    logWorkChange(item, "Başlangıç tarihi", previousStartDate, item.startDate);
    logWorkChange(item, "Hedef bitiş tarihi", previousTargetDate, item.targetDate);
    logWorkChange(item, "Tahmini efor", previousEstimate, item.estimate);
    logWorkChange(item, "Planlanan dönem", previousTargetPeriod, item.targetPeriod);
    logWorkChange(item, "Bağımlılıklar", previous.dependencies, item.dependsOnIds);
    logWorkChange(item, "Ürün hedefi", previous.roadmapNodeId, roadmapNodeId);
    logWorkChange(item, "Ürün aşaması", previous.productStage, productStage);
    if (previous.releaseId !== releaseId) addWorkActivity(item, "release", "Release ataması değişti: " + (state.releases.find((entry) => entry.id === releaseId)?.name || "Yok"));
    logWorkChange(item, "Açıklama", previous.description, item.description);
    logWorkChange(item, "Kabul kriterleri", previous.acceptance, item.acceptance);
    logWorkChange(item, "Ürün bileşenleri", previous.assetIds, item.assetIds);
    logWorkChange(item, "Takım ve sorumlular", previous.assignments, assignmentResult.assignments);
    item.updated = "Az önce";
    save(); render(); openItem(id); toast("Backlog işi güncellendi.");
  } else if (kind === "task") {
    const task = state.tasks.find((entry) => entry.id === id); if (!task) return;
    task.title = String(values.get("title") || "").trim();
    task.due = String(values.get("due") || "").trim() || "Tarih belirlenmedi";
    task.description = String(values.get("description") || "").trim();
    task.linked = String(values.get("linked") || "");
    task.remindAt = String(values.get("remindAt") || "") || undefined;
    if (task.remindAt && (!task.remindedAt || task.remindedAt < task.remindAt)) task.remindedAt = undefined;
    save(); openTask(id); render(); toast("Kişisel görev güncellendi.");
  } else {
    const note = state.notes.find((entry) => entry.id === id); if (!note) return;
    note.title = String(values.get("title") || "").trim();
    note.body = String(values.get("body") || "").trim();
    note.linked = String(values.get("linked") || "");
    note.updated = "Az önce";
    save(); showNote(id); render(); toast("Not güncellendi.");
  }
}

function openAsset(id: string): void {
  const asset = state.assets.find((entry) => entry.id === id);
  if (!asset) return;
  const relatedAssets = (asset.relatedAssetIds || []).map((relatedId) => state.assets.find((entry) => entry.id === relatedId)).filter((entry): entry is ProductAsset => Boolean(entry));
  const linkedItems = state.items.filter((item) => (item.assetIds || []).includes(id));
  const ownerTeam = state.teams.find((team) => team.id === asset.ownerTeamId);
  const owner = ownerTeam?.name || asset.ownerName || "Sahip tanımlanmadı";
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal asset-detail-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">' + esc(asset.type.toLocaleUpperCase("tr-TR")) + ' · ' + esc(asset.code) + '</div><h2>' + esc(asset.name) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="asset-detail-content"><div class="asset-detail-meta"><div><small>Proje</small><strong>' + esc(asset.project) + '</strong></div><div><small>Ürün alanı</small><strong>' + esc(asset.area || "Belirtilmedi") + '</strong></div><div><small>Sahip</small><strong>' + esc(owner) + '</strong></div><div><small>Durum</small><strong>' + (asset.active ? "Aktif" : "Pasif") + '</strong></div></div><section class="asset-detail-section"><h3>Amaç</h3><p>' + esc(asset.purpose || "Amaç eklenmedi.") + '</p></section><section class="asset-detail-section"><h3>Açıklama</h3><p>' + esc(asset.description || "Açıklama eklenmedi.") + '</p></section><section class="asset-detail-section"><div class="section-title-row"><h3>İlişkili bileşenler <span class="count-chip">' + relatedAssets.length + '</span></h3></div>' + (relatedAssets.length ? '<div class="asset-chip-list">' + relatedAssets.map((entry) => '<button class="linked-badge" data-open-asset="' + esc(entry.id) + '">' + esc(asset.relatedAssetLabels?.[entry.id] || "İlişkili") + ' · ' + esc(entry.code + " · " + entry.name) + '</button>').join("") + '</div>' : '<p class="asset-muted">Başka bileşenle ilişki kurulmamış.</p>') + '</section><section class="asset-detail-section"><div class="section-title-row"><h3>Bağlı backlog işleri <span class="count-chip">' + linkedItems.length + '</span></h3><button class="text-button" data-action="new-item-from-asset" data-id="' + esc(id) + '">+ Bu bileşen için iş oluştur</button></div>' + (linkedItems.length ? '<div class="asset-linked-items">' + linkedItems.map((item) => '<button class="asset-linked-item" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id) + '</span><strong>' + esc(item.title) + '</strong><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>').join("") + '</div>' : '<p class="asset-muted">Bu bileşene bağlı backlog işi yok.</p>') + '</section></div><footer class="modal-footer asset-detail-footer"><button class="button button-quiet" data-close-modal>Kapat</button><button class="button button-secondary" data-action="edit-asset" data-id="' + esc(id) + '">Düzenle</button><button class="button button-secondary" data-action="toggle-asset" data-id="' + esc(id) + '">' + (asset.active ? "Pasife al" : "Yeniden etkinleştir") + '</button></footer></section></div>';
}

function openAssetEditor(assetId?: string): void {
  const asset = assetId ? state.assets.find((entry) => entry.id === assetId) : undefined;
  const selectableProjects = state.projects.filter((project) => !project.archived || project.name === asset?.project);
  const relationOptions = state.assets.filter((entry) => entry.id !== assetId && (entry.active || (asset?.relatedAssetIds || []).includes(entry.id))).map((entry) => '<option value="' + esc(entry.id) + '" ' + ((asset?.relatedAssetIds || []).includes(entry.id) ? "selected" : "") + '>' + esc(entry.code + " · " + entry.name + (entry.active ? "" : " (Pasif)")) + '</option>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal asset-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">ÜRÜN ENVANTERİ</div><h2>' + (asset ? "Bileşeni düzenle" : "Yeni bileşen") + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="asset-form" class="settings-form"><div class="form-two-col"><label class="field-label">Bileşen adı<input class="field-input" name="name" maxlength="100" required value="' + esc(asset?.name || "") + '" placeholder="Örn. EFT Mutabakat Raporu"></label><label class="field-label">Benzersiz kod<input class="field-input" name="code" maxlength="40" required value="' + esc(asset?.code || "") + '" placeholder="Örn. PAY-RPT-006"></label><label class="field-label">Tür<select class="field-input" name="type">' + (["Ekran", "Batch", "Rapor", "Servis/API", "Entegrasyon", "Diğer"] as const).map((type) => '<option ' + (asset?.type === type ? "selected" : "") + '>' + type + '</option>').join("") + '</select></label><label class="field-label">Proje<select class="field-input" name="project" required>' + selectableProjects.map((project) => '<option ' + (asset?.project === project.name ? "selected" : "") + '>' + esc(project.name) + (project.archived ? ' · Arşivde' : '') + '</option>').join("") + '</select></label><label class="field-label">Ürün alanı<input class="field-input" name="area" maxlength="80" value="' + esc(asset?.area || "") + '" placeholder="Örn. Para Transferleri"></label><label class="field-label">Sahip takım<select class="field-input" name="ownerTeamId"><option value="">Takım seçilmedi</option>' + state.teams.map((team) => '<option value="' + esc(team.id) + '" ' + (asset?.ownerTeamId === team.id ? "selected" : "") + '>' + esc(team.name) + '</option>').join("") + '</select></label></div><label class="field-label">İş sahibi / teknik sorumlu<input class="field-input" name="ownerName" maxlength="80" value="' + esc(asset?.ownerName || "") + '" placeholder="İsteğe bağlı"></label><label class="field-label">İş amacı<textarea class="field-input field-textarea" name="purpose" maxlength="500" rows="2" placeholder="Bu bileşen ürün içinde ne işe yarıyor?">' + esc(asset?.purpose || "") + '</textarea></label><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" maxlength="2000" rows="3">' + esc(asset?.description || "") + '</textarea></label><label class="field-label">İlişkili bileşenler <small>(birden fazla seçebilirsin)</small><select class="field-input" name="relatedAssetIds" multiple size="4">' + relationOptions + '</select></label><div class="settings-note">Envanter açıklamasına parola, erişim anahtarı veya gerçek müşteri verisi ekleme.</div><input type="hidden" name="id" value="' + esc(asset?.id || "") + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-asset="' + esc(assetId || "") + '" ' + (asset ? "" : "hidden") + '>Vazgeç</button><button type="button" class="button button-quiet" data-close-modal ' + (asset ? "hidden" : "") + '>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
}

function saveAsset(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const code = String(values.get("code") || "").trim().toLocaleUpperCase("tr-TR");
  const name = String(values.get("name") || "").trim();
  if (state.assets.some((asset) => asset.code.toLocaleUpperCase("tr-TR") === code && asset.id !== id)) { toast("Bu bileşen kodu kullanımda."); return; }
  const existing = state.assets.find((asset) => asset.id === id);
  const asset: ProductAsset = existing || { id: nextId("AST"), code, name, type: "Diğer", project: "", area: "", purpose: "", description: "", ownerTeamId: "", ownerName: "", relatedAssetIds: [], active: true, updated: "Az önce" };
  asset.code = code;
  asset.name = name;
  asset.type = String(values.get("type")) as ProductAssetType;
  asset.project = String(values.get("project") || "");
  asset.area = String(values.get("area") || "").trim();
  asset.ownerTeamId = String(values.get("ownerTeamId") || "");
  asset.ownerName = String(values.get("ownerName") || "").trim();
  asset.purpose = String(values.get("purpose") || "").trim();
  asset.description = String(values.get("description") || "").trim();
  asset.relatedAssetIds = [...new Set(values.getAll("relatedAssetIds").map(String).filter((relatedId) => relatedId !== asset.id && state.assets.some((entry) => entry.id === relatedId)))];
  asset.relatedAssetLabels = Object.fromEntries(Object.entries(asset.relatedAssetLabels || {}).filter(([relatedId]) => asset.relatedAssetIds.includes(relatedId)));
  asset.updated = "Az önce";
  if (!existing) state.assets.unshift(asset);
  save(); render(); openAsset(asset.id); toast(existing ? "Bileşen güncellendi." : "Bileşen envantere eklendi.");
}

function toggleAssetActive(id: string): void {
  const asset = state.assets.find((entry) => entry.id === id);
  if (!asset) return;
  const nextActive = !asset.active;
  if (!nextActive && !window.confirm('"' + asset.name + '" bileşenini pasife almak istiyor musun? Bağlı backlog işleri korunur.')) return;
  asset.active = nextActive;
  asset.updated = "Az önce";
  save(); render(); openAsset(id); toast(nextActive ? "Bileşen yeniden etkinleştirildi." : "Bileşen pasife alındı.");
}

document.addEventListener("dragstart", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order][draggable=true]") : null;
  if (column?.dataset.columnOrder && event.dataTransfer) { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("application/x-rota-column", column.dataset.columnOrder); column.classList.add("is-dragging"); return; }
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-board-card]") : null;
  const itemId = target?.dataset.boardCard;
  if (!target || !itemId || !event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/x-rota-work-item", itemId);
  event.dataTransfer.setData("text/plain", itemId);
  target.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order]") : null;
  column?.classList.remove("is-dragging");
  document.querySelectorAll(".backlog-column-option.drop-target").forEach((row) => row.classList.remove("drop-target"));
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-board-card]") : null;
  target?.classList.remove("is-dragging");
  document.querySelectorAll(".board-column.drop-target").forEach((column) => column.classList.remove("drop-target"));
});

document.addEventListener("dragover", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order]") : null;
  if (column && event.dataTransfer?.types.includes("application/x-rota-column")) { event.preventDefault(); event.dataTransfer.dropEffect = "move"; document.querySelectorAll(".backlog-column-option.drop-target").forEach((row) => row.classList.remove("drop-target")); column.classList.add("drop-target"); return; }
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".board-column[data-board-status]") : null;
  if (!target || !event.dataTransfer?.types.includes("application/x-rota-work-item")) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  document.querySelectorAll(".board-column.drop-target").forEach((column) => { if (column !== target) column.classList.remove("drop-target"); });
  target.classList.add("drop-target");
});

document.addEventListener("drop", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order]") : null;
  const draggedColumn = event.dataTransfer?.getData("application/x-rota-column") as BacklogColumnId | "";
  if (column?.dataset.columnOrder && draggedColumn) {
    event.preventDefault(); event.stopPropagation();
    const from = backlogColumnDraft.indexOf(draggedColumn); const to = backlogColumnDraft.indexOf(column.dataset.columnOrder as BacklogColumnId);
    if (from >= 0 && to >= 0 && from !== to) { backlogColumnDraft.splice(to, 0, backlogColumnDraft.splice(from, 1)[0]); renderBacklogColumnManager(); }
    document.querySelectorAll(".backlog-column-option.drop-target").forEach((row) => row.classList.remove("drop-target")); return;
  }
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".board-column[data-board-status]") : null;
  const itemId = event.dataTransfer?.getData("application/x-rota-work-item") || "";
  if (!target || !itemId) return;
  event.preventDefault();
  event.stopPropagation();
  document.querySelectorAll(".board-column.drop-target").forEach((column) => column.classList.remove("drop-target"));
  suppressBoardClickUntil = Date.now() + 400;
  const item = itemById(itemId);
  const nextStatus = target.dataset.boardStatus as WorkItem["status"] | undefined;
  if (!item || !nextStatus || item.status === nextStatus) return;
  if (nextStatus === "Bloke") {
    openStatusUpdateModal(item.id, nextStatus, true);
    return;
  }
  applyWorkStatus(item, nextStatus, item.blocker);
  item.updated = "Az önce";
  save();
  render();
  toast("İş " + nextStatus + " durumuna taşındı.");
});

document.addEventListener("pointerdown", (event) => {
  if (activeView !== "backlog" || backlogMode !== "list") return;
  const target = event.target instanceof Element ? event.target : null;
  const header = target?.closest<HTMLTableCellElement>(".backlog-table thead th[data-backlog-column]");
  if (!header) return;
  const bounds = header.getBoundingClientRect();
  if (event.clientX < bounds.right - 7) return;
  resizingBacklogColumn = { header, key: header.dataset.backlogColumn || "", startX: event.clientX, startWidth: bounds.width };
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  if (!resizingBacklogColumn) return;
  const width = Math.min(520, Math.max(72, resizingBacklogColumn.startWidth + event.clientX - resizingBacklogColumn.startX));
  const table = resizingBacklogColumn.header.closest("table");
  resizingBacklogColumn.header.style.width = width + "px";
  table?.querySelectorAll<HTMLTableRowElement>("tbody tr").forEach((row) => { const cell = row.cells[resizingBacklogColumn!.header.cellIndex]; if (cell) cell.style.width = width + "px"; });
});

document.addEventListener("pointerup", () => {
  if (!resizingBacklogColumn) return;
  backlogColumnWidths[resizingBacklogColumn.key] = Math.round(resizingBacklogColumn.header.getBoundingClientRect().width);
  localStorage.setItem(BACKLOG_COLUMN_WIDTHS_KEY, JSON.stringify(backlogColumnWidths));
  resizingBacklogColumn = null;
});

document.addEventListener("dragstart", (event) => {
  const row = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-sprint-item]") : null;
  if (!row || !event.dataTransfer) return;
  event.dataTransfer.setData("text/plain", row.dataset.sprintItem || "");
  event.dataTransfer.effectAllowed = "move";
  row.classList.add("sprint-scope-dragging");
});
document.addEventListener("dragend", (event) => { if (event.target instanceof HTMLElement) event.target.classList.remove("sprint-scope-dragging"); });
document.addEventListener("dragover", (event) => { if (event.target instanceof Element && event.target.closest(".sprint-scope-list [data-sprint-item]")) event.preventDefault(); });
document.addEventListener("drop", (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".sprint-scope-list [data-sprint-item]") : null;
  if (!target) return;
  const id = event.dataTransfer?.getData("text/plain");
  const source = [...modalRoot.querySelectorAll<HTMLElement>("[data-sprint-item]")].find((row) => row.dataset.sprintItem === id);
  if (!source || source === target || source.hidden || target.hidden) return;
  event.preventDefault();
  const bounds = target.getBoundingClientRect();
  target.parentElement?.insertBefore(source, event.clientY < bounds.top + bounds.height / 2 ? target : target.nextSibling);
});

document.addEventListener("dragstart", (event) => {
  const row = event.target instanceof Element ? event.target.closest<HTMLTableRowElement>("tr.backlog-reorder-row[data-open-item]") : null;
  if (!row || backlogSort !== "manual" || backlogMode !== "list" || !event.dataTransfer) return;
  backlogDraggingItemId = row.dataset.openItem || "";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/x-rota-backlog-row", backlogDraggingItemId);
  row.classList.add("backlog-row-dragging");
});
document.addEventListener("dragend", () => {
  backlogDraggingItemId = "";
  root.querySelectorAll(".backlog-row-dragging, .backlog-row-drop-target").forEach((row) => row.classList.remove("backlog-row-dragging", "backlog-row-drop-target"));
});
document.addEventListener("dragover", (event) => {
  const row = event.target instanceof Element ? event.target.closest<HTMLTableRowElement>("tr.backlog-reorder-row[data-open-item]") : null;
  if (!row || !backlogDraggingItemId) return;
  event.preventDefault();
  root.querySelectorAll(".backlog-row-drop-target").forEach((entry) => entry.classList.remove("backlog-row-drop-target"));
  row.classList.add("backlog-row-drop-target");
});
document.addEventListener("drop", (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLTableRowElement>("tr.backlog-reorder-row[data-open-item]") : null;
  const sourceId = event.dataTransfer?.getData("application/x-rota-backlog-row") || backlogDraggingItemId;
  if (!target || !sourceId || sourceId === target.dataset.openItem || backlogSort !== "manual") return;
  event.preventDefault();
  const tbody = target.closest("tbody");
  const rows = [...(tbody?.querySelectorAll<HTMLTableRowElement>("tr.backlog-reorder-row[data-open-item]") || [])];
  const sourceIndex = rows.findIndex((row) => row.dataset.openItem === sourceId);
  const targetIndex = rows.indexOf(target);
  if (sourceIndex < 0 || targetIndex < 0) return;
  const visibleIds = rows.map((row) => row.dataset.openItem!).filter(Boolean);
  visibleIds.splice(sourceIndex, 1);
  const bounds = target.getBoundingClientRect();
  const insertIndex = event.clientY > bounds.top + bounds.height / 2 ? targetIndex + (sourceIndex < targetIndex ? 0 : 1) : targetIndex - (sourceIndex < targetIndex ? 1 : 0);
  visibleIds.splice(Math.max(0, Math.min(visibleIds.length, insertIndex)), 0, sourceId);
  const visible = new Set(visibleIds);
  const itemsById = new Map(state.items.map((item) => [item.id, item]));
  let index = 0;
  state.items = state.items.map((item) => visible.has(item.id) ? itemsById.get(visibleIds[index++])! : item);
  save(); renderBacklog(); toast("Backlog sırası güncellendi.");
});

type ContextCommand = { label: string; command: string; id?: string; projectId?: string; teamId?: string; member?: string; destructive?: boolean; separator?: boolean };
let activeContextMenu: HTMLElement | null = null;

function closeContextMenu(): void {
  activeContextMenu?.remove();
  activeContextMenu = null;
}

function contextCommandsFor(target: Element): ContextCommand[] {
  const itemTarget = target.closest<HTMLElement>("[data-open-item], [data-board-card], tr[data-open-item]");
  const item = itemTarget?.dataset.openItem || itemTarget?.dataset.boardCard;
  if (item && itemById(item)) return [
    { label: "İşi aç", command: "open-item", id: item },
    { label: "Düzenle", command: "edit-item", id: item },
    { label: "Çoğalt", command: "duplicate-item", id: item },
    { label: "Sil", command: "delete-item", id: item, destructive: true }
  ];

  const taskTarget = target.closest<HTMLElement>("[data-context-task-id], [data-open-task]");
  const taskId = taskTarget?.dataset.contextTaskId || taskTarget?.dataset.openTask;
  const task = taskId ? state.tasks.find((entry) => entry.id === taskId) : undefined;
  if (task) return [
    { label: "Görevi aç", command: "open-task", id: task.id },
    { label: task.done ? "Yeniden aç" : "Tamamlandı olarak işaretle", command: "toggle-task", id: task.id },
    { label: "Düzenle", command: "edit-task", id: task.id },
    { label: "Sil", command: "delete-task", id: task.id, destructive: true }
  ];

  const noteTarget = target.closest<HTMLElement>("[data-context-note-id], [data-note], [data-open-note]");
  const noteId = noteTarget?.dataset.contextNoteId || noteTarget?.dataset.note || noteTarget?.dataset.openNote;
  const note = noteId ? state.notes.find((entry) => entry.id === noteId) : undefined;
  if (note) return [
    { label: "Notu aç", command: "open-note", id: note.id },
    { label: "Düzenle", command: "edit-note", id: note.id },
    { label: "Göreve dönüştür", command: "note-to-task", id: note.id },
    { label: "Sil", command: "delete-note", id: note.id, destructive: true }
  ];

  const assetTarget = target.closest<HTMLElement>("[data-open-asset]");
  const assetId = assetTarget?.dataset.openAsset;
  const asset = assetId ? state.assets.find((entry) => entry.id === assetId) : undefined;
  if (asset) return [
    { label: "Bileşeni aç", command: "open-asset", id: asset.id },
    { label: "Düzenle", command: "edit-asset", id: asset.id },
    { label: asset.active ? "Pasife al" : "Yeniden etkinleştir", command: "toggle-asset", id: asset.id },
    { label: "Bu bileşen için iş oluştur", command: "new-item-from-asset", id: asset.id }
  ];

  const releaseTarget = target.closest<HTMLElement>("[data-release-id], .release-card");
  const releaseId = releaseTarget?.dataset.releaseId;
  const release = releaseId ? state.releases.find((entry) => entry.id === releaseId) : undefined;
  if (release) return [
    { label: "Release'i düzenle", command: "edit-release", id: release.id },
    { label: "Kapsamı düzenle", command: "release-scope", id: release.id },
    { label: "Release'i sil", command: "delete-release", id: release.id, destructive: true }
  ];

  const roadmapTarget = target.closest<HTMLElement>("[data-context-roadmap-id]");
  const roadmapId = roadmapTarget?.dataset.contextRoadmapId;
  const roadmapNode = roadmapId ? state.roadmap.find((entry) => entry.id === roadmapId) : undefined;
  if (roadmapNode) return [
    ...(roadmapNode.type === "Initiative" ? [{ label: "Bu ürün hamlesi için epic oluştur", command: "create-epic", id: roadmapNode.id }] : []),
    { label: "Hedefi düzenle", command: "edit-roadmap", id: roadmapNode.id },
    { label: "Hedefi sil", command: "delete-roadmap", id: roadmapNode.id, destructive: true }
  ];

  const projectTarget = target.closest<HTMLElement>("[data-project], .project-nav-row");
  const projectId = projectTarget?.dataset.project || projectTarget?.querySelector<HTMLElement>("[data-project]")?.dataset.project;
  const project = projectId ? state.projects.find((entry) => entry.id === projectId) : undefined;
  if (project) return [
    { label: "Projeyi aç", command: "open-project", projectId: project.id },
    { label: "Proje ayarları", command: "edit-project", projectId: project.id },
    { label: pinnedProjectIds.includes(project.id) ? "Sabitlemeyi kaldır" : "Projeyi sabitle", command: "toggle-project-pin", projectId: project.id },
    { label: project.archived ? "Arşivden çıkar" : "Projeyi arşivle", command: "archive-project", projectId: project.id },
    { label: "Projeyi sil", command: "delete-project", projectId: project.id, destructive: true }
  ];

  const memberCard = target.closest<HTMLElement>(".team-member-card[data-member-name]");
  if (memberCard) {
    const backlogAction = memberCard.querySelector<HTMLElement>('[data-action="member-backlog"]');
    const member = backlogAction?.dataset.member || "";
    const teamId = backlogAction?.dataset.teamId || "";
    if (member && teamId) return [{ label: "Üyenin işlerini gör", command: "member-backlog", teamId, member }];
  }
  return [];
}

function showContextMenu(event: MouseEvent): void {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (target.closest("input, textarea, select, [contenteditable='true'], .x6-graph, .x6-graph-svg, .asset-diagram-canvas, .work-diagram-canvas")) return;
  const commands = contextCommandsFor(target);
  if (!commands.length) return;
  event.preventDefault();
  closeContextMenu();
  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Kayıt eylemleri");
  menu.innerHTML = commands.map((entry) => '<button type="button" role="menuitem" class="context-menu-item' + (entry.destructive ? ' context-menu-danger' : '') + '" data-context-command="' + esc(entry.command) + '"' + (entry.id ? ' data-id="' + esc(entry.id) + '"' : '') + (entry.projectId ? ' data-project-id="' + esc(entry.projectId) + '"' : '') + (entry.teamId ? ' data-team-id="' + esc(entry.teamId) + '"' : '') + (entry.member ? ' data-member="' + esc(entry.member) + '"' : '') + '>' + esc(entry.label) + '</button>').join("");
  document.body.append(menu);
  activeContextMenu = menu;
  const bounds = menu.getBoundingClientRect();
  const left = Math.max(8, Math.min(event.clientX, window.innerWidth - bounds.width - 8));
  const top = Math.max(8, Math.min(event.clientY, window.innerHeight - bounds.height - 8));
  menu.style.left = left + "px";
  menu.style.top = top + "px";
  menu.querySelector<HTMLButtonElement>("button")?.focus();
}

document.addEventListener("contextmenu", showContextMenu);
document.addEventListener("pointerdown", (event) => { if (activeContextMenu && event.target instanceof Element && !activeContextMenu.contains(event.target)) closeContextMenu(); });
document.addEventListener("keydown", (event) => {
  if (!activeContextMenu) return;
  if (event.key === "Escape") { event.preventDefault(); closeContextMenu(); return; }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  const entries = [...activeContextMenu.querySelectorAll<HTMLButtonElement>("button")];
  const current = entries.indexOf(document.activeElement as HTMLButtonElement);
  const step = event.key === "ArrowDown" ? 1 : -1;
  entries[(current + step + entries.length) % entries.length]?.focus();
  event.preventDefault();
});
window.addEventListener("blur", closeContextMenu);
window.addEventListener("resize", closeContextMenu);
window.addEventListener("scroll", closeContextMenu, true);

document.addEventListener("click", async (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (inlineBacklogEdit && !target.closest("[data-inline-zone]") && !commitActiveInlineEditOnOutsideClick()) return;
  const clickedBacklogMenu = target.closest<HTMLDetailsElement>('details[name="backlog-menus"]');
  document.querySelectorAll<HTMLDetailsElement>('details[name="backlog-menus"][open]').forEach((menu) => { if (menu !== clickedBacklogMenu) menu.open = false; });
  const backlogSortButton = target.closest<HTMLButtonElement>("[data-sort-column]");
  if (backlogSortButton && activeView === "backlog" && backlogMode === "list") {
    event.preventDefault();
    const column = backlogSortButton.dataset.sortColumn as "title" | BacklogColumnId | undefined;
    if (column) toggleBacklogColumnSort(column);
    return;
  }
  const contextCommand = target.closest<HTMLElement>("[data-context-command]");
  if (contextCommand?.dataset.contextCommand) {
    const command = contextCommand.dataset.contextCommand;
    const id = contextCommand.dataset.id || "";
    const projectId = contextCommand.dataset.projectId || "";
    const teamId = contextCommand.dataset.teamId || "";
    const member = contextCommand.dataset.member || "";
    closeContextMenu();
    if (command === "open-item") openItem(id);
    else if (command === "edit-item") openRecordEditor("item", id);
    else if (command === "duplicate-item") duplicateBacklogItem(id);
    else if (command === "delete-item") await deleteRecord("item", id);
    else if (command === "open-task") openTask(id);
    else if (command === "toggle-task") toggleTask(id);
    else if (command === "edit-task") openRecordEditor("task", id);
    else if (command === "delete-task") await deleteRecord("task", id);
    else if (command === "open-note") showNote(id);
    else if (command === "edit-note") openRecordEditor("note", id);
    else if (command === "note-to-task") {
      const note = state.notes.find((entry) => entry.id === id);
      if (note) { state.tasks.unshift({ id: nextId("TASK"), title: note.title, due: "Tarih belirlenmedi", done: false, linked: note.linked, description: note.body, sourceNoteId: note.id }); save(); renderFocus(); toast("Not içeriği ve bağlantısı korunarak görev oluşturuldu."); }
    }
    else if (command === "delete-note") await deleteRecord("note", id);
    else if (command === "open-asset") openAsset(id);
    else if (command === "edit-asset") openAssetEditor(id);
    else if (command === "toggle-asset") toggleAssetActive(id);
    else if (command === "new-item-from-asset") openNewModal("Backlog işi", id);
    else if (command === "edit-release") openReleaseEditor(id);
    else if (command === "release-scope") openReleaseScope(id);
    else if (command === "delete-release") deleteRelease(id);
    else if (command === "edit-roadmap") openRoadmapEditor(id);
    else if (command === "delete-roadmap") deleteRoadmapNode(id);
    else if (command === "create-epic") openRoadmapEditor(undefined, id);
    else if (command === "open-project") setProject(projectId);
    else if (command === "edit-project") openProjectSettings(projectId);
    else if (command === "toggle-project-pin") {
      pinnedProjectIds = pinnedProjectIds.includes(projectId) ? pinnedProjectIds.filter((entry) => entry !== projectId) : [projectId, ...pinnedProjectIds];
      localStorage.setItem(PINNED_PROJECTS_KEY, JSON.stringify(pinnedProjectIds)); renderProjectNav();
    }
    else if (command === "archive-project") { const project = state.projects.find((entry) => entry.id === projectId); if (project) archiveProject(projectId, !project.archived); }
    else if (command === "delete-project") await deleteProject(projectId);
    else if (command === "member-backlog") {
      activeView = "backlog"; activeProjectId = null; backlogMode = "list"; query = ""; backlogSearchScope = "all"; backlogStatus = ""; backlogType = ""; labelFilter = "";
      teamFilterId = teamId; assigneeFilter = teamId + "::" + member; render();
    }
    return;
  }
  if (target.closest('[data-action="retry-file-import"]')) {
    if (dropImportRetry) await importDroppedAttachments(dropImportRetry.files, dropImportRetry.destination, dropImportRetry.activity);
    return;
  }
  if (target.closest("[data-close-attachment-preview]")) { modalRoot.querySelector(".attachment-preview-backdrop")?.remove(); return; }
  const sprintRow = target.closest<HTMLElement>("[data-sprint-item]");
  if (sprintRow) { /* Keep sprint-scope rows available to native drag and drop. */ }
  const detailTab = target.closest<HTMLButtonElement>("[data-detail-tab]");
  if (detailTab) {
    const tabName = detailTab.dataset.detailTab;
    modalRoot.querySelectorAll<HTMLButtonElement>("[data-detail-tab]").forEach((button) => button.classList.toggle("selected", button === detailTab));
    modalRoot.querySelectorAll<HTMLElement>("[data-detail-tab-section]").forEach((section) => { section.hidden = section.dataset.detailTabSection !== tabName; });
    return;
  }
  const removeFilter = target.closest<HTMLElement>("[data-remove-backlog-filter]");
  if (removeFilter?.dataset.removeBacklogFilter) {
    const key = removeFilter.dataset.removeBacklogFilter;
    if (key === "query") query = "";
    else if (key === "status") backlogStatus = "";
    else if (key === "type") backlogType = "";
    else if (key === "label") labelFilter = "";
    else if (key === "team") teamFilterId = "";
    else if (key === "assignee") assigneeFilter = "";
    else if (key === "sprint") backlogSprintId = "";
    else if (key === "completed") backlogIncludeCompleted = false;
    renderBacklog(); return;
  }
  if (target.closest(".help-button")) { openKeyboardHelp(); return; }
  const inlineAction = target.closest<HTMLElement>("[data-inline-action]");
  if (inlineAction?.dataset.inlineAction) {
    const itemId = inlineAction.dataset.itemId || inlineBacklogEdit?.itemId || "";
    if (inlineAction.dataset.inlineAction === "edit-title" || inlineAction.dataset.inlineAction === "edit-status" || inlineAction.dataset.inlineAction === "edit-assignment" || inlineAction.dataset.inlineAction === "edit-type") {
      const fieldName = inlineAction.dataset.inlineAction === "edit-title" ? "title" : inlineAction.dataset.inlineAction === "edit-status" ? "status" : inlineAction.dataset.inlineAction === "edit-assignment" ? "assignment" : "type";
      openInlineBacklogEdit(itemId, fieldName);
    } else if (inlineAction.dataset.inlineAction === "save-title") commitInlineTitle(itemId);
    else if (inlineAction.dataset.inlineAction === "save-status") commitInlineStatus(itemId);
    else if (inlineAction.dataset.inlineAction === "save-type") commitInlineType(itemId);
    else if (inlineAction.dataset.inlineAction === "cancel") { inlineBacklogEdit = null; updateBacklogRows(); }
    else if (inlineAction.dataset.inlineAction === "add-assignment") {
      const teamId = root.querySelector<HTMLInputElement>('[data-inline-team="' + CSS.escape(itemId) + '"]')?.value || "";
      const member = root.querySelector<HTMLInputElement>('[data-inline-member="' + CSS.escape(itemId) + '"]')?.value.trim() || "";
      const scope = root.querySelector<HTMLInputElement>('[data-inline-scope="' + CSS.escape(itemId) + '"]')?.value.trim() || "";
      if (!teamId || !member) { toast("Atamak için takım üyesini arayıp seç."); return; }
      commitInlineAssignment(itemId, { add: { teamId, member, ...(scope ? { scope } : {}) } });
    } else if (inlineAction.dataset.inlineAction === "remove-assignment") {
      const index = Number(inlineAction.dataset.assignmentIndex);
      if (Number.isInteger(index)) commitInlineAssignment(itemId, { removeIndex: index });
    }
    return;
  }
  if (target.closest("[data-inline-zone]")) return;
  if (target.closest("[data-close-backlog-preview]")) { closeBacklogPreview(); return; }
  const saveScope = target.closest<HTMLElement>("[data-save-release-scope]");
  if (saveScope?.dataset.saveReleaseScope) { saveReleaseScope(saveScope.dataset.saveReleaseScope); return; }
  const newDiagram = target.closest<HTMLElement>("[data-new-diagram]");
  if (newDiagram?.dataset.newDiagram && newDiagram.dataset.ownerId) { openWorkDiagramEditor(newDiagram.dataset.newDiagram as WorkDiagram["ownerType"], newDiagram.dataset.ownerId); return; }
  const openDiagram = target.closest<HTMLElement>("[data-open-diagram]");
  if (openDiagram?.dataset.openDiagram) { const diagram = state.diagrams.find((entry) => entry.id === openDiagram.dataset.openDiagram); if (diagram) openWorkDiagramEditor(diagram.ownerType, diagram.ownerId, diagram.id); return; }
  const removeDiagramNode = target.closest<HTMLElement>("[data-delete-diagram-node]");
  if (removeDiagramNode?.dataset.deleteDiagramNode && activeWorkDiagramId) {
    const diagram = state.diagrams.find((entry) => entry.id === activeWorkDiagramId);
    const nodeId = removeDiagramNode.dataset.deleteDiagramNode;
    if (diagram) {
      diagram.nodes = diagram.nodes.filter((node) => node.id !== nodeId);
      diagram.edges = diagram.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      workDiagramGraph?.getCellById(nodeId)?.remove();
      diagram.updated = "Az önce"; save(); renderDiagramToolbar(diagram);
    }
    return;
  }
  const removeDiagramEdge = target.closest<HTMLElement>("[data-delete-diagram-edge]");
  if (removeDiagramEdge?.dataset.deleteDiagramEdge && activeWorkDiagramId) {
    const diagram = state.diagrams.find((entry) => entry.id === activeWorkDiagramId);
    const edgeId = removeDiagramEdge.dataset.deleteDiagramEdge;
    if (diagram) {
      diagram.edges = diagram.edges.filter((edge) => edge.id !== edgeId);
      workDiagramGraph?.getCellById(edgeId)?.remove();
      diagram.updated = "Az önce"; save(); renderDiagramEdgeList(diagram);
    }
    return;
  }
  if (Date.now() < suppressBoardClickUntil && target.closest("[data-board-card]")) { event.preventDefault(); return; }
  const saveStatus = target.closest<HTMLElement>("[data-save-item-status]");
  if (saveStatus?.dataset.saveItemStatus && saveStatus.dataset.nextStatus) {
    const item = itemById(saveStatus.dataset.saveItemStatus);
    const status = saveStatus.dataset.nextStatus as WorkItem["status"];
    const reason = (document.getElementById("blocker-reason") as HTMLTextAreaElement | null)?.value.trim() || "";
    const nextStep = (document.getElementById("blocker-next-step") as HTMLTextAreaElement | null)?.value.trim() || "";
    const expectedAction = (document.getElementById("blocker-expected") as HTMLTextAreaElement | null)?.value.trim() || "";
    const owner = (document.getElementById("blocker-owner") as HTMLSelectElement | null)?.value || "";
    const followUpAt = (document.getElementById("blocker-follow-up") as HTMLInputElement | null)?.value || "";
    const updateNote = (document.getElementById("status-update-note") as HTMLTextAreaElement | null)?.value.trim() || "";
    if (!item || (status === "Bloke" && (!reason || !nextStep || !expectedAction || !owner))) { toast("Bloke iş için neden, beklenen karar/iş, sonraki adım ve takip sahibini doldur."); return; }
    applyWorkStatus(item, status, status === "Bloke" ? { reason, nextStep, expectedAction, owner, followUpAt } : item.blocker, updateNote);
    item.updated = "Az önce";
    const returnToBoard = statusUpdateReturnToBoard;
    statusUpdateReturnToBoard = false;
    save(); render();
    if (returnToBoard) closeModal(); else openItem(item.id);
    toast("İşin durumu güncellendi.");
    return;
  }
  if (target.closest("[data-cancel-status-update]")) { const returnToBoard = statusUpdateReturnToBoard; statusUpdateReturnToBoard = false; if (returnToBoard) closeModal(); else if (activeItemId) openItem(activeItemId); else closeModal(); return; }
  const picker = document.getElementById("new-assets-picker");
  if (picker && !picker.contains(target)) {
    picker.classList.remove("open");
    document.getElementById("new-assets-search")?.setAttribute("aria-expanded", "false");
  }
  const assetOption = target.closest<HTMLElement>("[data-toggle-new-asset]");
  if (assetOption?.dataset.toggleNewAsset) {
    const id = assetOption.dataset.toggleNewAsset;
    draftAssetIds = draftAssetIds.includes(id) ? draftAssetIds.filter((selectedId) => selectedId !== id) : [...draftAssetIds, id];
    renderNewAssetSelection();
    renderNewAssetOptions((document.getElementById("new-assets-search") as HTMLInputElement | null)?.value || "");
    picker?.classList.add("open");
    document.getElementById("new-assets-search")?.setAttribute("aria-expanded", "true");
    document.getElementById("new-assets-search")?.focus();
    return;
  }
  const removeAsset = target.closest<HTMLElement>("[data-remove-new-asset]");
  if (removeAsset?.dataset.removeNewAsset) {
    draftAssetIds = draftAssetIds.filter((id) => id !== removeAsset.dataset.removeNewAsset);
    renderNewAssetSelection();
    renderNewAssetOptions((document.getElementById("new-assets-search") as HTMLInputElement | null)?.value || "");
    return;
  }
  if (target.closest("[data-add-team-member]")) {
    const list = document.getElementById("team-member-list");
    if (!list) return;
    list.insertAdjacentHTML("beforeend", teamMemberRowMarkup("", list.querySelectorAll(".team-member-row").length));
    updateTeamMemberRows();
    list.querySelector<HTMLInputElement>(".team-member-row:last-child input")?.focus();
    return;
  }
  const removeTeamMember = target.closest("[data-remove-team-member]");
  if (removeTeamMember) {
    const row = removeTeamMember.closest(".team-member-row");
    const list = document.getElementById("team-member-list");
    row?.remove();
    if (list && !list.querySelector(".team-member-row")) list.insertAdjacentHTML("beforeend", teamMemberRowMarkup());
    updateTeamMemberRows();
    return;
  }
  const addAssignment = target.closest<HTMLElement>("[data-add-assignment]");
  if (addAssignment?.dataset.addAssignment) {
    const list = document.getElementById(addAssignment.dataset.addAssignment);
    if (!list) return;
    list.insertAdjacentHTML("beforeend", assignmentRowMarkup());
    list.querySelector<HTMLInputElement>(".assignment-edit-row:last-child [data-assignment-member]")?.focus();
    return;
  }
  const removeAssignment = target.closest("[data-remove-assignment]");
  if (removeAssignment) { removeAssignment.closest(".assignment-edit-row")?.remove(); return; }
  const removeAssetRelation = target.closest<HTMLElement>("[data-remove-asset-relation]");
  if (removeAssetRelation?.dataset.removeAssetRelation) {
    const [sourceId, targetId] = removeAssetRelation.dataset.removeAssetRelation.split("|");
    const source = state.assets.find((asset) => asset.id === sourceId);
    if (source) {
      source.relatedAssetIds = source.relatedAssetIds.filter((id) => id !== targetId);
      if (source.relatedAssetLabels) delete source.relatedAssetLabels[targetId];
      source.updated = "Az önce";
      save();
      const graphEdge = assetDiagramGraph?.getEdges().find((edge) => edge.getSourceCellId() === sourceId && edge.getTargetCellId() === targetId);
      graphEdge?.remove();
      const relationList = document.getElementById("asset-relation-list");
      if (relationList) renderAssetRelationList(relationList, assetDiagramAssets);
      toast("Bileşen ilişkisi kaldırıldı.");
    }
    return;
  }
  const projectNav = target.closest<HTMLElement>("[data-project]");
  if (projectNav?.dataset.project) { setProject(projectNav.dataset.project); return; }
  if (target.closest(".profile")) { openWorkspaceSettings(); return; }
  if (target.closest(".tiny-plus")) { openProjectSettings(); return; }
  if (target.closest("[data-add-progress-attachment]")) { await addProgressAttachments(); return; }
  const saveProgress = target.closest<HTMLElement>("[data-save-progress-note]");
  if (saveProgress && activeItemId) { saveProgressNote(activeItemId); return; }
  const removeProgressFile = target.closest<HTMLElement>("[data-remove-progress-file]");
  if (removeProgressFile) {
    const [file] = progressAttachments.splice(Number(removeProgressFile.dataset.removeProgressFile), 1);
    if (file?.storedName && desktop) await desktop.removeAttachment(file.storedName);
    document.getElementById("progress-note-files")?.replaceChildren();
    const filesRoot = document.getElementById("progress-note-files");
    if (filesRoot) filesRoot.innerHTML = progressAttachments.map((entry, index) => '<span class="progress-note-file">' + esc(entry.name) + '<button type="button" data-remove-progress-file="' + index + '" aria-label="Eki kaldır">×</button></span>').join("");
    return;
  }
  const view = target.closest<HTMLElement>("[data-view]");
  if (view?.dataset.view) { setView(view.dataset.view); return; }
  const action = target.closest<HTMLElement>("[data-action]");
  if (action) {
    if (action.dataset.action === "open-workspace-settings") openWorkspaceSettings();
    else if (action.dataset.action === "jira-refresh") await refreshJiraCatalog();
    else if (action.dataset.action === "jira-save-token") await saveJiraPat();
    else if (action.dataset.action === "jira-replace-token") { jiraHasSavedToken = false; jiraError = "Yeni tokenı kaydettiğinde mevcut PAT değiştirilir."; renderJira(); }
    else if (action.dataset.action === "jira-remove-token") await removeJiraPat();
    else if (action.dataset.action === "jira-open-token-page") {
      try { if (!state.profile.jiraBaseUrl) throw new Error("Önce Jira Base URL tanımla."); await desktop.jiraOpenTokenPage(state.profile.jiraBaseUrl); }
      catch (error) { toast(error instanceof Error ? error.message : "Jira token sayfası açılamadı."); }
    }
    else if (action.dataset.action === "jira-fetch-issues") await fetchJiraIssues();
    else if (action.dataset.action === "jira-create-issue") await createJiraIssueFromRota();
    else if (action.dataset.action === "jira-open-issue" && action.dataset.issueKey && state.profile.jiraBaseUrl) {
      try { await desktop.jiraOpenIssue(state.profile.jiraBaseUrl, action.dataset.issueKey); } catch (error) { toast(error instanceof Error ? error.message : "Jira işi açılamadı."); }
    }
    else if (action.dataset.action === "new") openQuickCreateModal(action.dataset.type);
    else if (action.dataset.action === "add-related-record" && action.dataset.id) openRelatedRecordPicker(action.dataset.id);
    else if (action.dataset.action === "remove-related-record" && action.dataset.id && action.dataset.linkId) { const item = itemById(action.dataset.id); if (item) { item.relatedRecords = (item.relatedRecords || []).filter((link) => link.id !== action.dataset.linkId); save(); openItem(item.id); } }
    else if (action.dataset.action === "open-related-record" && action.dataset.type && action.dataset.targetId) {
      const type = action.dataset.type as WorkRecordLink["type"]; const id = action.dataset.targetId;
      if (type === "item") openItem(id); else if (type === "asset") openAsset(id); else if (type === "release") openReleaseEditor(id); else if (type === "note") showNote(id); else if (type === "question") { setView("questions"); const question = state.openQuestions?.find((entry) => entry.id === id); if (question) openQuestionForm(id); } else { const risk = state.risks?.find((entry) => entry.id === id); if (risk) toast(risk.title + " · " + risk.status + " · " + risk.owner + (risk.description ? " — " + risk.description : "")); }
    }
    else if (action.dataset.action === "create-risk-for-item" && action.dataset.id) {
      const item = itemById(action.dataset.id); if (!item) return;
      const title = window.prompt("Risk başlığı"); if (!title?.trim()) return;
      const risk: ProductRisk = { id: nextId("RISK"), title: title.trim(), description: window.prompt("Risk açıklaması (isteğe bağlı)")?.trim() || "", project: item.project, owner: window.prompt("Risk sahibi")?.trim() || state.profile.userName, status: "Açık", updatedAt: new Date().toISOString() };
      state.risks ||= []; state.risks.push(risk); item.relatedRecords ||= []; item.relatedRecords.push({ id: nextId("LINK"), type: "risk", targetId: risk.id, label: relatedRecordLabel("risk", risk.id) });
      save(); closeModal(); openItem(item.id); toast("Risk oluşturuldu ve işe bağlandı.");
    }
else if (action.dataset.action === "add-daily-entry" && action.dataset.type) {
      const type = action.dataset.type as "item" | "task"; const select = document.getElementById(type === "item" ? "daily-add-item" : "daily-add-task") as HTMLSelectElement | null;
      if (select?.value) { const plan = getDailyPlan(); if (!plan.entries.some((entry) => entry.type === type && entry.id === select.value)) plan.entries.push({ type, id: select.value }); save(); renderDailyPlan(); }
    }
    else if (action.dataset.action === "remove-daily-entry" && action.dataset.type && action.dataset.id) {
      const plan = getDailyPlan(); plan.entries = plan.entries.filter((entry) => entry.type !== action.dataset.type || entry.id !== action.dataset.id); save(); renderDailyPlan();
    }
    else if (action.dataset.action === "move-daily-entry" && action.dataset.type && action.dataset.id && action.dataset.direction) {
      const plan = getDailyPlan(); const index = plan.entries.findIndex((entry) => entry.type === action.dataset.type && entry.id === action.dataset.id); const nextIndex = index + (action.dataset.direction === "up" ? -1 : 1);
      if (index >= 0 && nextIndex >= 0 && nextIndex < plan.entries.length) { [plan.entries[index], plan.entries[nextIndex]] = [plan.entries[nextIndex], plan.entries[index]]; save(); renderDailyPlan(); }
    }
    else if (action.dataset.action === "daily-plan-today") {
      const today = new Date(); selectedDailyDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-"); renderDailyPlan();
    }
    else if (action.dataset.action === "save-daily-plan") { getDailyPlan().note = root.querySelector<HTMLTextAreaElement>("#daily-plan-note")?.value.trim() || ""; save(); toast("Günlük PO planı kaydedildi."); }
    else if (action.dataset.action === "save-weekly-summary") { state.weeklySummaryNotes ||= {}; state.weeklySummaryNotes[selectedWeeklyStart] = root.querySelector<HTMLTextAreaElement>("#weekly-summary-note")?.value.trim() || ""; save(); renderWeeklySummary(); toast("Haftalık değerlendirme kaydedildi."); }
    else if (action.dataset.action === "copy-weekly-summary") { state.weeklySummaryNotes ||= {}; state.weeklySummaryNotes[selectedWeeklyStart] = root.querySelector<HTMLTextAreaElement>("#weekly-summary-note")?.value.trim() || ""; save(); void navigator.clipboard.writeText(weeklySummaryText()).then(() => toast("Haftalık özet panoya kopyalandı.")).catch(() => toast("Panoya kopyalanamadı; metni seçerek kopyalayabilirsin.")); }
    else if (action.dataset.action === "restore-item" && action.dataset.id) { const item = itemById(action.dataset.id); if (item) { item.archived = false; save(); renderArchiveSearch(); toast("İş arşivden çıkarıldı."); } }
    else if (action.dataset.action === "restore-project" && action.dataset.id) { archiveProject(action.dataset.id, false); renderArchiveSearch(); }
    else if (action.dataset.action === "restore-release" && action.dataset.id) { const release = state.releases.find((entry) => entry.id === action.dataset.id); if (release) { release.archived = false; save(); renderArchiveSearch(); toast("Release arşivden çıkarıldı."); } }
    else if (action.dataset.action === "archive-item" && action.dataset.id) { const item = itemById(action.dataset.id); if (item) { item.archived = !item.archived; save(); closeModal(); render(); toast(item.archived ? "İş arşivlendi." : "İş arşivden çıkarıldı."); } }
    else if (action.dataset.action === "archive-release" && action.dataset.id) { const release = state.releases.find((entry) => entry.id === action.dataset.id); if (release) { release.archived = !release.archived; save(); renderReleases(); toast(release.archived ? "Release arşivlendi." : "Release arşivden çıkarıldı."); } }
    else if (action.dataset.action === "undo-deletion") undoLastDeletion();
    else if (action.dataset.action === "diagram-undo" && activeWorkDiagramId) {
      if (workDiagramUndoHistory.length > 1) {
        const current = workDiagramUndoHistory.pop()!; workDiagramRedoHistory.push(current);
        const previous = JSON.parse(workDiagramUndoHistory[workDiagramUndoHistory.length - 1]) as WorkDiagram;
        const index = state.diagrams.findIndex((entry) => entry.id === activeWorkDiagramId); if (index >= 0) state.diagrams[index] = previous;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderWorkDiagramEditor(previous, true);
      }
    }
    else if (action.dataset.action === "diagram-redo" && activeWorkDiagramId) {
      const next = workDiagramRedoHistory.pop();
      if (next) { const diagram = JSON.parse(next) as WorkDiagram; workDiagramUndoHistory.push(next); const index = state.diagrams.findIndex((entry) => entry.id === activeWorkDiagramId); if (index >= 0) state.diagrams[index] = diagram; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderWorkDiagramEditor(diagram, true); }
    }
    else if (action.dataset.action === "sprint-carryover" && action.dataset.sprintId) openSprintCarryover(action.dataset.sprintId);
    else if (action.dataset.action === "sprint-summary" && action.dataset.sprintId) openSprintSummary(action.dataset.sprintId);
    else if (action.dataset.action === "save-sprint-summary" && action.dataset.sprintId) {
      const sprint = state.sprints.find((entry) => entry.id === action.dataset.sprintId);
      if (sprint) { const sprintItems = state.items.filter((item) => item.sprintId === sprint.id); sprint.closingSnapshot ||= { done: sprintItems.filter((item) => item.status === "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), carryover: sprintItems.filter((item) => item.status !== "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), blocked: sprintItems.filter((item) => item.status === "Bloke").map(({ id, title, status }) => ({ id, title, status })) }; sprint.closingLearnings = modalRoot.querySelector<HTMLTextAreaElement>("#sprint-learnings")?.value.trim() || ""; sprint.closedAt ||= new Date().toISOString(); save(); openSprintSummary(sprint.id); toast("Sprint kapanış özeti kaydedildi."); }
    }
    else if (action.dataset.action === "new-open-question") openQuestionForm();
    else if (action.dataset.action === "edit-open-question" && action.dataset.id) openQuestionForm(action.dataset.id);
    else if (action.dataset.action === "answer-open-question" && action.dataset.id) openQuestionAnswerForm(action.dataset.id);
    else if (action.dataset.action === "reopen-question" && action.dataset.id) { const question = state.openQuestions?.find((entry) => entry.id === action.dataset.id); if (question) { question.status = "Açık"; question.answeredAt = undefined; questionFilter = "open"; save(); renderOpenQuestions(); toast("Soru yeniden açıldı."); } }
    else if (action.dataset.action === "delete-open-question" && action.dataset.id) { if (window.confirm("Bu soruyu silmek istiyor musun?")) { state.openQuestions = (state.openQuestions || []).filter((entry) => entry.id !== action.dataset.id); save(); renderOpenQuestions(); } }
    else if (action.dataset.action === "toggle-ready-pool") { readyWorkPool = !readyWorkPool; renderBacklog(); }
    else if (action.dataset.action === "apply-acceptance-template" && action.dataset.target) {
      const select = modalRoot.querySelector<HTMLSelectElement>('[data-acceptance-template-target="' + action.dataset.target + '"]');
      const template = state.acceptanceTemplates?.find((entry) => entry.id === select?.value);
      const textarea = modalRoot.querySelector<HTMLTextAreaElement>(action.dataset.target === "new-acceptance" ? "#new-acceptance" : 'textarea[name="acceptance"]');
      if (!template || !textarea) { toast("Önce bir kabul kriteri şablonu seç."); return; }
      const existing = textarea.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      textarea.value = [...existing, ...template.criteria.filter((criterion) => !existing.includes(criterion))].join("\n");
    }
    else if (action.dataset.action === "save-acceptance-template" && action.dataset.target) {
      const textarea = modalRoot.querySelector<HTMLTextAreaElement>(action.dataset.target === "new-acceptance" ? "#new-acceptance" : 'textarea[name="acceptance"]');
      const criteria = textarea?.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) || [];
      if (!criteria.length) { toast("Şablon kaydetmek için önce kriterleri gir."); return; }
      const name = window.prompt("Bu kabul kriteri şablonuna bir ad ver");
      if (!name?.trim()) return;
      const selectedType = modalRoot.querySelector<HTMLSelectElement>('#edit-item-form select[name="type"]')?.value || (document.getElementById("new-item-type") as HTMLSelectElement | null)?.value || "Story";
      state.acceptanceTemplates ||= [];
      const category: AcceptanceTemplate["category"] = window.confirm("Bu şablonu bankacılık değişikliği kontrol listesi olarak mı işaretleyelim?") ? "Bankacılık değişikliği" : selectedType === "Bug" ? "Bug" : selectedType === "Story" ? "Story" : "Genel";
      const savedTemplate: AcceptanceTemplate = { id: nextId("TPL"), name: name.trim(), category, criteria };
      state.acceptanceTemplates.push(savedTemplate);
      save();
      const select = modalRoot.querySelector<HTMLSelectElement>('[data-acceptance-template-target="' + action.dataset.target + '"]');
      if (select) select.insertAdjacentHTML("beforeend", '<option value="' + esc(savedTemplate.id) + '">' + esc(name.trim()) + '</option>');
      toast("Kabul kriteri şablonu kaydedildi.");
    }
    else if (action.dataset.action === "save-sprint-carryover" && action.dataset.sprintId) {
      const before = structuredClone(state.items);
      const closingSprint = state.sprints.find((sprint) => sprint.id === action.dataset.sprintId);
      if (closingSprint) { const sprintItems = state.items.filter((item) => item.sprintId === closingSprint.id); closingSprint.closingSnapshot = { done: sprintItems.filter((item) => item.status === "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), carryover: sprintItems.filter((item) => item.status !== "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), blocked: sprintItems.filter((item) => item.status === "Bloke").map(({ id, title, status }) => ({ id, title, status })) }; closingSprint.closedAt ||= new Date().toISOString(); }
      modalRoot.querySelectorAll<HTMLSelectElement>("[data-carryover-item]").forEach((select) => {
        const item = itemById(select.dataset.carryoverItem || ""); if (!item) return;
        const oldSprint = state.sprints.find((sprint) => sprint.id === item.sprintId);
        item.sprintId = select.value || undefined; item.sprintOrder = undefined; item.updated = "Az önce";
        addWorkActivity(item, "change", select.value ? 'Sprint kapanışında "' + (oldSprint?.name || "") + '" sprintinden "' + (state.sprints.find((sprint) => sprint.id === select.value)?.name || "") + '" sprintine taşındı.' : 'Sprint kapanışında "' + (oldSprint?.name || "") + '" sprintinden backlog’a çıkarıldı.');
      });
      save(); closeModal(); render(); toast("Sprintte kalan işler düzenlendi.");
    }
    else if (action.dataset.action === "toggle-project-pin" && action.dataset.projectId) {
      const id = action.dataset.projectId;
      pinnedProjectIds = pinnedProjectIds.includes(id) ? pinnedProjectIds.filter((entry) => entry !== id) : [id, ...pinnedProjectIds];
      localStorage.setItem(PINNED_PROJECTS_KEY, JSON.stringify(pinnedProjectIds)); renderProjectNav();
    }
    else if (action.dataset.action === "toggle-sidebar") {
      const sidebar = document.querySelector(".sidebar");
      const collapsing = !sidebar?.classList.contains("collapsed");
      if (collapsing) {
        saveSidebarNavGroupPreferences();
        sidebarNavGroups().forEach((group) => { group.open = true; });
        sidebar?.classList.add("collapsed");
      } else {
        sidebar?.classList.remove("collapsed");
        applySidebarNavGroupPreferences();
      }
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(Boolean(sidebar?.classList.contains("collapsed"))));
      const button = sidebar?.querySelector<HTMLElement>(".sidebar-toggle");
      if (button) { button.title = sidebar?.classList.contains("collapsed") ? "Yan menüyü genişlet" : "Yan menüyü daralt"; button.setAttribute("aria-label", button.title); }
    }
    else if (action.dataset.action === "reset-backlog-preferences") {
      [BACKLOG_COLUMNS_PREFERENCE_KEY, BACKLOG_DENSITY_PREFERENCE_KEY, BACKLOG_TITLE_WRAP_PREFERENCE_KEY, BACKLOG_COLUMN_WIDTHS_KEY, BACKLOG_VIEWS_PREFERENCE_KEY, BACKLOG_SEARCH_SCOPE_KEY, BACKLOG_SECONDARY_INFO_KEY, BACKLOG_RECENT_FILTERS_KEY].forEach((key) => localStorage.removeItem(key));
      backlogColumns = [...DEFAULT_BACKLOG_COLUMNS]; backlogDensity = "standard"; backlogTitleWrap = false; backlogColumnWidths = {}; savedBacklogViews = []; activeBacklogViewId = ""; backlogSearchScope = "all"; backlogSecondaryInfo = "id"; recentBacklogFilters = [];
      toast("Backlog görünüm tercihleri varsayılana döndürüldü."); closeModal(); renderBacklog();
    }
    else if (action.dataset.action === "member-backlog" && action.dataset.teamId && action.dataset.member) {
      activeView = "backlog"; activeProjectId = null; backlogMode = "list"; query = ""; backlogSearchScope = "all"; backlogStatus = ""; backlogType = ""; labelFilter = "";
      teamFilterId = action.dataset.teamId; assigneeFilter = action.dataset.teamId + "::" + action.dataset.member; render();
    }
    else if (action.dataset.action === "clear-team-filters") { teamPlanFilters.startFrom = ""; teamPlanFilters.targetTo = ""; teamPlanFilters.period = ""; teamPlanFilters.minEstimate = ""; teamPlanFilters.maxEstimate = ""; renderTeamDashboard(); }
    else if (action.dataset.action === "undo-backlog-change") {
      if (!lastUndoWorkItems) return;
      lastUndoWorkItems.forEach((snapshot) => { const index = state.items.findIndex((item) => item.id === snapshot.id); if (index >= 0) state.items[index] = snapshot; });
      lastUndoWorkItems = null; window.clearTimeout(lastUndoTimer); save(); renderBacklog(); toast("Son backlog değişikliği geri alındı.");
    }
    else if (action.dataset.action === "quick-related-task" && action.dataset.id) { closeModal(); openQuickCreateModal("Kişisel görev", action.dataset.id); }
    else if (action.dataset.action === "quick-add-backlog") {
      const input = root.querySelector<HTMLInputElement>("#backlog-quick-title");
      const title = input?.value.trim() || "";
      if (!title) { input?.focus(); return; }
      const project = state.projects.find((entry) => entry.id === activeProjectId && !entry.archived) || state.projects.find((entry) => !entry.archived);
      let id = nextId("PAY"); while (state.items.some((item) => item.id === id)) id = nextId("PAY");
      const item: WorkItem = { id, type: "Story", title, status: "Yeni", priority: "Orta", project: project?.name || "Genel", area: "Genel", updated: "Az önce", description: "", acceptance: [], attachments: [], labels: [], dependsOnIds: [], activity: [] };
      addWorkActivity(item, "created", "İş oluşturuldu."); state.items.unshift(item); save(); renderBacklog(); toast("Backlog işi hızlıca eklendi.");
      root.querySelector<HTMLInputElement>("#backlog-quick-title")?.focus();
    }
    else if (action.dataset.action === "note-to-task" && action.dataset.id) {
      const note = state.notes.find((entry) => entry.id === action.dataset.id);
      if (!note) return;
      state.tasks.unshift({ id: nextId("TASK"), title: note.title, due: "Tarih belirlenmedi", done: false, linked: note.linked, description: note.body, sourceNoteId: note.id });
      save(); renderFocus(); toast("Not içeriği ve bağlantısı korunarak görev oluşturuldu.");
    }
    else if (action.dataset.action === "clear-backlog-filters") {
      query = ""; backlogStatus = ""; backlogType = ""; labelFilter = ""; teamFilterId = ""; assigneeFilter = ""; backlogSprintId = ""; backlogIncludeCompleted = false;
      renderBacklog();
    }
    else if (action.dataset.action === "toggle-title-wrap") {
      backlogTitleWrap = !backlogTitleWrap;
      localStorage.setItem(BACKLOG_TITLE_WRAP_PREFERENCE_KEY, String(backlogTitleWrap));
      renderBacklog();
    }
    else if (action.dataset.action === "autofit-columns") {
      const table = root.querySelector<HTMLTableElement>(".backlog-table");
      table?.querySelectorAll<HTMLTableCellElement>("thead th[data-backlog-column]").forEach((header) => {
        const key = header.dataset.backlogColumn || "";
        const index = header.cellIndex;
        const values = [header.textContent || "", ...[...table.querySelectorAll<HTMLTableRowElement>("tbody tr")].map((row) => row.cells[index]?.textContent || "")];
        const canvas = document.createElement("canvas"); const context = canvas.getContext("2d");
        if (context) context.font = getComputedStyle(header).font;
        const width = Math.min(420, Math.max(78, ...values.map((value) => (context?.measureText(value).width || value.length * 7) + 32)));
        backlogColumnWidths[key] = Math.round(width);
      });
      localStorage.setItem(BACKLOG_COLUMN_WIDTHS_KEY, JSON.stringify(backlogColumnWidths));
      applyBacklogColumnWidths();
    }
    else if (action.dataset.action === "quick-create-details") {
      const form = modalRoot.querySelector<HTMLFormElement>("#quick-create-form");
      const details = form?.querySelector<HTMLDetailsElement>(".record-collapsible");
      if (details) { details.open = true; details.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    }
    else if (action.dataset.action === "manage-backlog-columns") openBacklogColumnManager();
    else if (action.dataset.action === "save-backlog-view") openSaveBacklogViewModal();
    else if (action.dataset.action === "confirm-save-backlog-view") {
      const name = modalRoot.querySelector<HTMLInputElement>("#new-backlog-view-name")?.value || "";
      saveCurrentBacklogView(name);
    }
    else if (action.dataset.action === "update-backlog-view" && action.dataset.viewId) {
      const existing = savedBacklogViews.find((view) => view.id === action.dataset.viewId && view.projectId === activeProjectId);
      if (existing) saveCurrentBacklogView(existing.name, existing.id);
    }
    else if (action.dataset.action === "manage-backlog-views") renderBacklogViewManager();
    else if (action.dataset.action === "duplicate-backlog-view" && action.dataset.viewId) {
      const sourceView = savedBacklogViews.find((view) => view.id === action.dataset.viewId && view.projectId === activeProjectId);
      if (!sourceView) return;
      const baseName = sourceView.name + " kopya";
      let name = baseName; let suffix = 2;
      while (savedBacklogViews.some((view) => view.projectId === activeProjectId && view.name.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR"))) name = baseName + " " + suffix++;
      savedBacklogViews.push({ ...sourceView, id: nextId("VIEW"), name, columns: [...sourceView.columns], pinned: false });
      persistBacklogViews(); renderBacklog(); renderBacklogViewManager(); toast("Görünüm kopyalandı: " + name);
    }
    else if (action.dataset.action === "toggle-backlog-view-pin" && action.dataset.viewId) {
      const view = savedBacklogViews.find((entry) => entry.id === action.dataset.viewId && entry.projectId === activeProjectId);
      if (!view) return;
      view.pinned = !view.pinned; persistBacklogViews(); renderBacklog(); renderBacklogViewManager();
    }
    else if (action.dataset.action === "delete-backlog-view" && action.dataset.viewId) {
      const view = savedBacklogViews.find((entry) => entry.id === action.dataset.viewId);
      if (view && window.confirm('"' + view.name + '" görünümünü silmek istiyor musun?')) {
        savedBacklogViews = savedBacklogViews.filter((entry) => entry.id !== view.id);
        if (activeBacklogViewId === view.id) activeBacklogViewId = "";
        persistBacklogViews();
        renderBacklog();
        renderBacklogViewManager();
      }
    }
    else if (action.dataset.action === "save-backlog-view-names") {
      const scoped = savedBacklogViews.filter((view) => view.projectId === activeProjectId);
      const names = [...modalRoot.querySelectorAll<HTMLInputElement>("[data-backlog-view-name]")].map((input) => ({ id: input.dataset.backlogViewName || "", name: input.value.trim() }));
      if (names.some((entry) => !entry.name)) { toast("Görünüm adları boş olamaz."); return; }
      if (new Set(names.map((entry) => entry.name.toLocaleLowerCase("tr-TR"))).size !== names.length) { toast("Görünüm adları birbirinden farklı olmalı."); return; }
      for (const entry of names) { const view = scoped.find((candidate) => candidate.id === entry.id); if (view) view.name = entry.name; }
      persistBacklogViews();
      closeModal();
      renderBacklog();
      toast("Görünüm adları kaydedildi.");
    }
    else if (action.dataset.action === "move-backlog-column" && action.dataset.columnId && action.dataset.direction) {
      const index = backlogColumnDraft.indexOf(action.dataset.columnId as BacklogColumnId);
      const nextIndex = index + (action.dataset.direction === "up" ? -1 : 1);
      if (index >= 0 && nextIndex >= 0 && nextIndex < backlogColumnDraft.length) {
        [backlogColumnDraft[index], backlogColumnDraft[nextIndex]] = [backlogColumnDraft[nextIndex], backlogColumnDraft[index]];
        renderBacklogColumnManager();
      }
    }
    else if (action.dataset.action === "save-backlog-columns") {
      backlogColumns = [...backlogColumnDraft];
      localStorage.setItem(BACKLOG_COLUMNS_PREFERENCE_KEY, JSON.stringify(backlogColumns));
      closeModal();
      renderBacklog();
      toast("Backlog kolon düzeni kaydedildi.");
    }
    else if (action.dataset.action === "toggle-backlog-preview") {
      backlogPreviewEnabled = !backlogPreviewEnabled;
      localStorage.setItem(BACKLOG_PREVIEW_PREFERENCE_KEY, String(backlogPreviewEnabled));
      const toggle = root.querySelector<HTMLButtonElement>('[data-action="toggle-backlog-preview"]');
      if (toggle) {
        toggle.setAttribute("aria-pressed", String(backlogPreviewEnabled));
        toggle.textContent = backlogPreviewEnabled ? "◉ Önizleme açık" : "○ Önizleme kapalı";
      }
      if (backlogPreviewEnabled) {
        const trigger = root.querySelector<HTMLElement>("[data-preview-item]:hover") || (document.activeElement instanceof HTMLElement && document.activeElement.matches("[data-preview-item]") ? document.activeElement : null);
        if (trigger) openBacklogPreview(trigger.dataset.previewItem || "", trigger);
      } else closeBacklogPreview();
    }
    else if (action.dataset.action === "diagram-add-node" && activeWorkDiagramId) { const diagram = state.diagrams.find((entry) => entry.id === activeWorkDiagramId); if (diagram) addDiagramNode(diagram); }
    else if (action.dataset.action === "diagram-delete" && activeWorkDiagramId) deleteWorkDiagram(activeWorkDiagramId);
    else if (action.dataset.action === "diagram-fit") { (activeWorkDiagramId ? workDiagramGraph : assetDiagramGraph)?.zoomToFit({ padding: 24, maxScale: 1.2 }); }
    else if (action.dataset.action === "diagram-layout") {
      const nodes = activeWorkDiagramId ? workDiagramGraph?.getNodes() : assetDiagramGraph?.getNodes();
      if (nodes?.length) {
        nodes.forEach((node, index) => node.setPosition(50 + (index % 3) * 280, 45 + Math.floor(index / 3) * 180));
        if (activeWorkDiagramId) { const diagram = state.diagrams.find((entry) => entry.id === activeWorkDiagramId); if (diagram) { nodes.forEach((node) => { const entry = diagram.nodes.find((candidate) => candidate.id === node.id); if (entry) { const pos = node.position(); entry.x = pos.x; entry.y = pos.y; } }); diagram.updated = "Az önce"; save(); } }
        else { nodes.forEach((node) => { const asset = state.assets.find((entry) => entry.id === node.id); if (asset) asset.diagramPosition = { x: Math.round((node.position().x + 115) / Math.max(640, document.getElementById("asset-diagram-canvas")?.clientWidth || 640) * 1000), y: node.position().y + 58 }; }); save(); }
        (activeWorkDiagramId ? workDiagramGraph : assetDiagramGraph)?.zoomToFit({ padding: 24, maxScale: 1.2 });
      }
    }
    else if (action.dataset.action === "backlog-export-excel") await exportBacklogExcel();
    else if (action.dataset.action === "backlog-import-excel") await openBacklogExcelImport();
    else if (action.dataset.action === "confirm-backlog-import") confirmBacklogExcelImport();
    else if (action.dataset.action === "delete-selected-backlog") await deleteSelectedBacklogItems();
    else if (action.dataset.action === "create-sprint") openCreateSprintModal();
    else if (action.dataset.action === "bulk-labels") {
      const selected = getSelectedBacklogItems();
      if (!selected.length) return;
      const before = structuredClone(selected);
      const input = window.prompt("Etiket işlemlerini virgülle ayır. Yeni etiket için ad, kaldırmak için -etiket yaz. Örnek: EFT,-Eski", "");
      if (input === null) return;
      const operations = input.split(",").map((part) => part.trim()).filter(Boolean);
      if (!operations.length) return;
      selected.forEach((item) => {
        item.labels ||= [];
        operations.forEach((operation) => {
          if (operation.startsWith("-")) item.labels = item.labels.filter((label) => label.toLocaleLowerCase("tr-TR") !== operation.slice(1).trim().toLocaleLowerCase("tr-TR"));
          else if (!item.labels.some((label) => label.toLocaleLowerCase("tr-TR") === operation.toLocaleLowerCase("tr-TR"))) item.labels.push(operation);
        });
        item.updated = "Az önce"; addWorkActivity(item, "change", "Toplu etiket değişikliği: " + operations.join(", "));
      });
      save(); renderBacklog(); toastUndo(selected.length + " işin etiketleri güncellendi.", before);
    }
    else if (action.dataset.action === "bulk-remove-sprint") {
      const selected = getSelectedBacklogItems();
      const assigned = selected.filter((item) => item.sprintId);
      if (!assigned.length) { toast("Seçili işlerin sprint ataması yok."); return; }
      if (!window.confirm(assigned.length + " iş sprintten çıkarılsın mı?")) return;
      const before = structuredClone(assigned);
      assigned.forEach((item) => { const sprint = state.sprints.find((entry) => entry.id === item.sprintId); item.sprintId = undefined; item.updated = "Az önce"; addWorkActivity(item, "change", (sprint?.name || "Sprint") + " sprintinden çıkarıldı."); });
      save(); renderBacklog(); toastUndo(assigned.length + " iş sprintten çıkarıldı.", before);
    }
    else if (action.dataset.action === "backup-export") await exportWorkspaceBackup();
    else if (action.dataset.action === "backup-restore") await restoreWorkspaceBackup();
    else if (action.dataset.action === "create-roadmap") openRoadmapEditor();
    else if (action.dataset.action === "new-decision") openDecisionEditor();
    else if (action.dataset.action === "edit-decision" && action.dataset.id) openDecisionEditor(action.dataset.id);
    else if (action.dataset.action === "open-decision" && action.dataset.id) openDecisionDetail(action.dataset.id);
    else if (action.dataset.action === "create-release") openReleaseEditor();
    else if (action.dataset.action === "edit-release" && action.dataset.id) openReleaseEditor(action.dataset.id);
    else if (action.dataset.action === "delete-release" && action.dataset.id) deleteRelease(action.dataset.id);
    else if (action.dataset.action === "release-scope" && action.dataset.id) openReleaseScope(action.dataset.id);
    else if (action.dataset.action === "create-epic" && action.dataset.parentId) openRoadmapEditor(undefined, action.dataset.parentId);
    else if (action.dataset.action === "edit-roadmap" && action.dataset.id) openRoadmapEditor(action.dataset.id);
    else if (action.dataset.action === "delete-roadmap" && action.dataset.id) deleteRoadmapNode(action.dataset.id);
    else if (action.dataset.action === "new-asset") openAssetEditor();
    else if (action.dataset.action === "asset-presentation") { assetPresentation = action.dataset.mode === "diagram" ? "diagram" : "cards"; updateAssetGrid(); const toggle = root.querySelector<HTMLElement>('[data-action="asset-presentation"]'); if (toggle) { toggle.dataset.mode = assetPresentation === "diagram" ? "cards" : "diagram"; toggle.textContent = assetPresentation === "diagram" ? "Kart görünümü" : "İlişki diyagramı"; } }
    else if (action.dataset.action === "edit-asset" && action.dataset.id) openAssetEditor(action.dataset.id);
    else if (action.dataset.action === "toggle-asset" && action.dataset.id) toggleAssetActive(action.dataset.id);
    else if (action.dataset.action === "new-item-from-asset" && action.dataset.id) openNewModal("Backlog işi", action.dataset.id);
    else if (action.dataset.action === "edit-project") openProjectSettings(action.dataset.projectId);
    else if (action.dataset.action === "archived-projects") openArchivedProjects();
    else if (action.dataset.action === "archive-project" && action.dataset.projectId) archiveProject(action.dataset.projectId, action.dataset.archived === "true");
    else if (action.dataset.action === "delete-project" && action.dataset.projectId) await deleteProject(action.dataset.projectId);
    else if (action.dataset.action === "new-team") openTeamEditor();
    else if (action.dataset.action === "edit-team") openTeamEditor(action.dataset.teamId);
    else if (action.dataset.action === "back-to-teams") { const returnToSettings = teamEditorReturnToSettings; teamEditorReturnToSettings = false; closeModal(); if (returnToSettings) openWorkspaceSettings(); }
    else if (action.dataset.action === "open-setup") openSetupWizard(false);
    else if (action.dataset.action === "edit-item" && action.dataset.id) openRecordEditor("item", action.dataset.id);
    else if (action.dataset.action === "duplicate-item" && action.dataset.id) duplicateBacklogItem(action.dataset.id);
    else if (action.dataset.action === "edit-task" && action.dataset.id) openRecordEditor("task", action.dataset.id);
    else if (action.dataset.action === "edit-note" && action.dataset.id) openRecordEditor("note", action.dataset.id);
    else if (action.dataset.action === "delete-item" && action.dataset.id) await deleteRecord("item", action.dataset.id);
    else if (action.dataset.action === "delete-task" && action.dataset.id) await deleteRecord("task", action.dataset.id);
    else if (action.dataset.action === "delete-note" && action.dataset.id) await deleteRecord("note", action.dataset.id);
    else if (action.dataset.action === "kanban") { backlogMode = "board"; renderBacklog(); }
    else if (action.dataset.action === "list") { backlogMode = "list"; renderBacklog(); }
    return;
  }
  const deleteTeam = target.closest<HTMLElement>("[data-delete-team]");
  if (deleteTeam?.dataset.deleteTeam) {
    const team = state.teams.find((entry) => entry.id === deleteTeam.dataset.deleteTeam);
    if (!team || !window.confirm('"' + team.name + '" takımını silmek istiyor musun? Bu takıma atanmış backlog işleri atamasız kalır.')) return;
    state.teams = state.teams.filter((entry) => entry.id !== team.id);
    state.items.forEach((item) => { item.assignments = getWorkAssignments(item).filter((assignment) => assignment.teamId !== team.id); syncLegacyAssignmentFields(item); });
    state.projects.forEach((project) => { project.assignments = (project.assignments || []).filter((assignment) => assignment.teamId !== team.id); });
    state.assets.forEach((asset) => { if (asset.ownerTeamId === team.id) asset.ownerTeamId = ""; });
    if (teamFilterId === team.id) { teamFilterId = ""; assigneeFilter = ""; }
    save(); openWorkspaceSettings(); renderProjectNav(); toast("Takım silindi.");
    return;
  }
  const addDashboardMember = target.closest<HTMLElement>("[data-add-dashboard-member]");
  if (addDashboardMember?.dataset.addDashboardMember) {
    const team = state.teams.find((entry) => entry.id === addDashboardMember.dataset.addDashboardMember);
    const input = [...document.querySelectorAll<HTMLInputElement>("[data-team-member-input]")].find((candidate) => candidate.dataset.teamMemberInput === team?.id);
    const name = input?.value.trim() || "";
    if (!team || !name) { toast("Üye adını yaz."); input?.focus(); return; }
    if (team.members.some((member) => member.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR"))) { toast("Bu üye zaten takımda."); input?.focus(); return; }
    team.members.push(name);
    save(); render(); toast(name + " takıma eklendi.");
    return;
  }
  const removeDashboardMember = target.closest<HTMLElement>("[data-remove-dashboard-member]");
  if (removeDashboardMember?.dataset.removeDashboardMember && removeDashboardMember.dataset.teamMember) {
    const team = state.teams.find((entry) => entry.id === removeDashboardMember.dataset.removeDashboardMember);
    const member = removeDashboardMember.dataset.teamMember;
    if (!team || !window.confirm(member + " üyesini takımdan çıkarmak istiyor musun? Üzerindeki işler takımda sorumlusuz kalır.")) return;
    team.members = team.members.filter((name) => name !== member);
    state.items.forEach((item) => { item.assignments = validAssignments(getWorkAssignments(item)); syncLegacyAssignmentFields(item); });
    state.projects.forEach((project) => { project.assignments = validAssignments(project.assignments || []); });
    save(); render(); toast(member + " takımdan çıkarıldı.");
    return;
  }
  const open = target.closest<HTMLElement>("[data-open-item]");
  const openSourceEmail = target.closest<HTMLElement>("[data-open-source-email]");
  if (openSourceEmail?.dataset.openSourceEmail) { await openAttachment(openSourceEmail.dataset.openSourceEmail); return; }
  const decisionProject = target.closest<HTMLElement>("[data-decision-open-project]");
  if (decisionProject?.dataset.decisionOpenProject) { setProject(decisionProject.dataset.decisionOpenProject); closeModal(); return; }
  if (target.closest("[data-select-backlog-item], [data-select-visible-backlog]")) { event.stopPropagation(); return; }
  if (open?.dataset.openItem && !open.classList.contains("detail-modal")) {
    const backlogRow = target.closest<HTMLTableRowElement>("tr[data-open-item]");
    if (backlogRow && open === backlogRow && !target.closest(".backlog-title-open")) return;
    openItem(open.dataset.openItem); return;
  }
  const openAssetButton = target.closest<HTMLElement>("[data-open-asset]");
  if (openAssetButton?.dataset.openAsset) { openAsset(openAssetButton.dataset.openAsset); return; }
  const openTaskButton = target.closest<HTMLElement>("[data-open-task]");
  if (openTaskButton?.dataset.openTask) { openTask(openTaskButton.dataset.openTask); return; }
  const openNoteButton = target.closest<HTMLElement>("[data-open-note]");
  if (openNoteButton?.dataset.openNote) { showNote(openNoteButton.dataset.openNote); return; }
  const toggle = target.closest<HTMLElement>("[data-toggle-task]");
  if (toggle?.dataset.toggleTask) { toggleTask(toggle.dataset.toggleTask); return; }
  const close = target.closest<HTMLElement>("[data-close-modal]");
  if (close && (close === target || close.classList.contains("modal-close"))) { closeModal(); return; }
  const pick = target.closest<HTMLElement>("[data-pick-files]");
  if (pick) { await pickFiles(); return; }
  const remove = target.closest<HTMLElement>("[data-remove-draft]");
  if (remove) { await removeDraftAttachment(Number(remove.dataset.removeDraft)); return; }
  const removeSaved = target.closest<HTMLElement>("[data-remove-saved]");
  if (removeSaved) {
    const ownerValue = removeSaved.dataset.removeSaved;
    if (!ownerValue) return;
    const [ownerType, ownerId] = ownerValue.split(":");
    const owner = ownerType === "item" ? itemById(ownerId) : ownerType === "note" ? state.notes.find((entry) => entry.id === ownerId) : state.tasks.find((entry) => entry.id === ownerId);
    if (owner?.attachments) {
      const [file] = owner.attachments.splice(Number(removeSaved.dataset.fileIndex), 1);
      if (file?.storedName && desktop) await desktop.removeAttachment(file.storedName);
      if (ownerType === "item" && file) addWorkActivity(owner as WorkItem, "attachment", "Dosya eki kaldırıldı: " + file.name);
      save();
      if (ownerType === "item") { render(); openItem(ownerId); }
      else if (ownerType === "note") showNote(ownerId);
      else openTask(ownerId);
      toast("Dosya eki kaldırıldı.");
    }
    return;
  }
  const addToItem = target.closest<HTMLElement>("[data-add-to-item]");
  if (addToItem?.dataset.addToItem) { await addFilesToItem(addToItem.dataset.addToItem); return; }
  const addToTask = target.closest<HTMLElement>("[data-add-to-task]");
  if (addToTask?.dataset.addToTask) { await addFilesToTask(addToTask.dataset.addToTask); return; }
  const addToNote = target.closest<HTMLElement>("[data-add-to-note]");
  if (addToNote?.dataset.addToNote) { await addFilesToNote(addToNote.dataset.addToNote); return; }
  const fileButton = target.closest<HTMLElement>("[data-open-file]");
  if (fileButton?.dataset.openFile) { await openAttachment(fileButton.dataset.openFile); return; }
  const note = target.closest<HTMLElement>("[data-note]");
  if (note?.dataset.note) { showNote(note.dataset.note); return; }
});

document.addEventListener("pointerover", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const trigger = target?.closest<HTMLElement>("[data-preview-item]");
  if (trigger) {
    window.clearTimeout(backlogPreviewTimer);
    if (backlogPreviewItemId === trigger.dataset.previewItem) return;
    backlogPreviewTimer = window.setTimeout(() => openBacklogPreview(trigger.dataset.previewItem || "", trigger), 260);
    return;
  }
  if (target?.closest("[data-preview-card]")) window.clearTimeout(backlogPreviewTimer);
});

document.addEventListener("pointerout", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (target.closest("[data-preview-item]") || target.closest("[data-preview-card]")) {
    const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
    if (related?.closest("[data-preview-item], [data-preview-card]")) return;
    scheduleBacklogPreviewClose();
  }
});

document.addEventListener("focusin", (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  const trigger = target?.closest<HTMLElement>("[data-preview-item]");
  if (trigger) openBacklogPreview(trigger.dataset.previewItem || "", trigger);
  if (target?.closest("[data-preview-card]")) window.clearTimeout(backlogPreviewTimer);
});

document.addEventListener("focusout", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("[data-preview-item], [data-preview-card]") && !(event.relatedTarget instanceof Element && event.relatedTarget.closest("[data-preview-item], [data-preview-card]"))) scheduleBacklogPreviewClose();
});

document.addEventListener("keydown", (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target?.dataset.inlineTitle) {
    if (event.key === "Enter") { event.preventDefault(); commitInlineTitle(target.dataset.inlineTitle); return; }
    if (event.key === "Escape") { inlineBacklogEdit = null; updateBacklogRows(); return; }
  }
  if (event.key === "Escape" && backlogPreviewItemId) closeBacklogPreview();
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.id === "decision-search") {
    decisionQuery = target.value;
    const terms = decisionQuery.trim().toLocaleLowerCase("tr-TR").split(/\s+/).filter(Boolean);
    let visibleCount = 0;
    root.querySelectorAll<HTMLElement>(".decision-card").forEach((card) => {
      const index = card.dataset.decisionIndex || "";
      const matches = terms.every((term) => index.includes(term));
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    const count = root.querySelector<HTMLElement>("#decision-result-count");
    if (count) count.textContent = visibleCount + " kayıt";
    const empty = root.querySelector<HTMLElement>("[data-decision-empty]");
    if (empty) empty.hidden = visibleCount > 0;
    return;
  }
  if (target instanceof HTMLInputElement && target.id === "sprint-item-search") {
    const query = target.value.trim().toLocaleLowerCase("tr-TR");
    modalRoot.querySelectorAll<HTMLElement>("[data-sprint-item]").forEach((row) => { row.hidden = !row.dataset.sprintSearch?.includes(query); });
    return;
  }
  if (target instanceof HTMLInputElement && target.id === "project-nav-search-input") {
    const query = target.value.trim().toLocaleLowerCase("tr-TR");
    document.querySelectorAll<HTMLElement>(".project-nav-row[data-project-search]").forEach((row) => { row.hidden = !row.dataset.projectSearch?.includes(query); });
    return;
  }
  if (target instanceof HTMLInputElement && target.id === "team-member-search") {
    const query = target.value.trim().toLocaleLowerCase("tr-TR");
    root.querySelectorAll<HTMLElement>(".team-member-card[data-member-name]").forEach((card) => { card.hidden = !card.dataset.memberName?.includes(query); });
    return;
  }
  if (!(target instanceof HTMLTextAreaElement) || !target.matches('#new-form textarea, #edit-item-form textarea')) return;
  target.style.height = "auto";
  target.style.height = Math.min(target.scrollHeight, 520) + "px";
});

window.addEventListener("resize", () => {
  if (!backlogPreviewItemId) return;
  const trigger = root.querySelector<HTMLElement>('[data-preview-item="' + CSS.escape(backlogPreviewItemId) + '"]');
  const card = root.querySelector<HTMLElement>("[data-preview-card]");
  if (trigger && card) positionBacklogPreview(trigger, card);
  else closeBacklogPreview();
});

document.addEventListener("change", (event) => {
  if (event.target instanceof HTMLTextAreaElement && event.target.id === "daily-plan-note") { getDailyPlan().note = event.target.value.trim(); save(); return; }
  if (event.target instanceof HTMLSelectElement) {
    if (event.target.id === "decision-filter") { decisionFilter = event.target.value as typeof decisionFilter; renderDecisions(); return; }
    if (event.target.id === "jira-board-select") { jiraSelectedBoardId = event.target.value; void loadJiraBoardDetails(); return; }
    if (event.target.id === "jira-project-select") { jiraSelectedProjectKey = event.target.value; void loadJiraProjectIssueTypes(); return; }
    if (event.target.id === "jira-scope-select") { jiraIssueScope = event.target.value as typeof jiraIssueScope; jiraIssues = []; renderJira(); return; }
    if (event.target.id === "jira-sprint-select") { jiraSelectedSprintId = event.target.value; jiraIssues = []; renderJira(); return; }
    if (event.target.id === "jira-issue-type-select") { jiraSelectedIssueTypeId = event.target.value; return; }
    if (event.target.id === "jira-rota-item-select") { jiraSelectedRotaItemId = event.target.value; renderJira(); return; }
  }
  if (event.target instanceof HTMLInputElement && event.target.id === "daily-plan-date" && event.target.value) { selectedDailyDate = event.target.value; renderDailyPlan(); return; }
  if (event.target instanceof HTMLInputElement && event.target.id === "weekly-summary-start" && event.target.value) { selectedWeeklyStart = weekStartDate(new Date(event.target.value + "T00:00:00")); renderWeeklySummary(); return; }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-theme") { localStorage.setItem(THEME_KEY, event.target.value); document.body.classList.toggle("dark-theme", event.target.value === "dark" || (event.target.value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)); }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-font-scale") { localStorage.setItem(FONT_SCALE_KEY, event.target.value); document.body.style.zoom = event.target.value; }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-high-contrast") { localStorage.setItem(HIGH_CONTRAST_KEY, event.target.value); document.body.classList.toggle("high-contrast", event.target.value === "true"); }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-reduced-motion") { localStorage.setItem(REDUCED_MOTION_KEY, event.target.value); document.body.classList.toggle("reduced-motion", event.target.value === "true"); }
  if (event.target instanceof HTMLSelectElement && event.target.id === "sprint-duration") {
    const form = event.target.closest("form");
    const start = form?.querySelector<HTMLInputElement>('[name="startDate"]');
    const end = form?.querySelector<HTMLInputElement>('[name="endDate"]');
    if (start?.value && end) { const date = new Date(start.value + "T00:00:00"); date.setDate(date.getDate() + Number(event.target.value) - 1); end.value = date.toISOString().slice(0, 10); }
  }
  const activityFilter = event.target instanceof HTMLSelectElement && event.target.id === "activity-kind-filter" ? event.target : null;
  if (activityFilter) {
    const list = modalRoot.querySelector(".activity-list");
    list?.querySelectorAll<HTMLElement>(".activity-entry").forEach((entry) => { const kind = activityFilter.value; entry.hidden = kind !== "all" && !entry.classList.contains("activity-" + kind); });
  }
  const target = event.target as HTMLInputElement;
  if (target.matches("[data-select-backlog-item]")) {
    const id = target.dataset.selectBacklogItem || "";
    if (target.checked) selectedBacklogItemIds.add(id); else selectedBacklogItemIds.delete(id);
    updateBacklogRows();
    return;
  }
  if (target.matches("[data-select-visible-backlog]")) {
    root.querySelectorAll<HTMLInputElement>("[data-select-backlog-item]").forEach((checkbox) => {
      const id = checkbox.dataset.selectBacklogItem || "";
      if (target.checked) selectedBacklogItemIds.add(id); else selectedBacklogItemIds.delete(id);
    });
    updateBacklogRows();
    return;
  }
  if (target.dataset.backlogColumnToggle) {
    const id = target.dataset.backlogColumnToggle as BacklogColumnId;
    backlogColumnDraft = target.checked ? [...backlogColumnDraft, id] : backlogColumnDraft.filter((column) => column !== id);
    renderBacklogColumnManager();
    return;
  }
  if (target.id === "backlog-saved-view") {
    const view = savedBacklogViews.find((entry) => entry.id === target.value);
    if (view) applyBacklogView(view);
    else { activeBacklogViewId = ""; renderBacklog(); }
    return;
  }
  if (target.id === "backlog-recent-filter") {
  const filter = recentBacklogFilters[Number(target.value)];
    if (filter) { query = filter.query; backlogSearchScope = filter.searchScope; backlogStatus = filter.status; backlogType = filter.type; labelFilter = filter.label; teamFilterId = filter.teamId; assigneeFilter = filter.assignee; backlogSprintId = filter.sprintId || ""; backlogIncludeCompleted = filter.includeCompleted || false; activeBacklogViewId = ""; renderBacklog(); }
    target.value = ""; return;
  }
  if (target.id === "backlog-recent-item" && target.value) { openItem(target.value); target.value = ""; return; }
  if (target.id === "backlog-search-scope") { backlogSearchScope = target.value as BacklogSearchScope; localStorage.setItem(BACKLOG_SEARCH_SCOPE_KEY, backlogSearchScope); updateBacklogRows(); return; }
  if (target.id === "backlog-density") {
    backlogDensity = target.value as "compact" | "standard" | "comfortable";
    localStorage.setItem(BACKLOG_DENSITY_PREFERENCE_KEY, backlogDensity);
    root.querySelector(".backlog-page")?.classList.remove("backlog-density-compact", "backlog-density-standard", "backlog-density-comfortable");
    root.querySelector(".backlog-page")?.classList.add("backlog-density-" + backlogDensity);
    return;
  }
  if (target.id === "backlog-secondary-info") { backlogSecondaryInfo = target.value as BacklogSecondaryInfo; localStorage.setItem(BACKLOG_SECONDARY_INFO_KEY, backlogSecondaryInfo); updateBacklogRows(); return; }
  if (target.id === "bulk-status" && target.value) {
    const selectedItems = getSelectedBacklogItems();
    if (!selectedItems.length) { toast("Önce backlog işlerini seç."); renderBacklog(); return; }
    if (!window.confirm(selectedItems.length + " işin durumu '" + target.value + "' olarak değiştirilsin mi?")) { target.value = ""; return; }
    const before = structuredClone(selectedItems);
    selectedItems.forEach((item) => { applyWorkStatus(item, target.value as WorkItem["status"], item.blocker); item.updated = "Az önce"; });
    save(); renderBacklog(); toastUndo(selectedItems.length + " işin durumu güncellendi.", before); return;
  }
  if (target.id === "bulk-assignment" && target.value) {
    const selectedItems = getSelectedBacklogItems();
    const [teamId, member] = target.value.split("::");
    if (!selectedItems.length || !state.teams.find((team) => team.id === teamId)?.members.includes(member)) { renderBacklog(); return; }
    if (!window.confirm(member + " seçili " + selectedItems.length + " işe atansın mı?")) { target.value = ""; return; }
    const before = structuredClone(selectedItems);
    selectedItems.forEach((item) => {
      const assignments = getWorkAssignments(item);
      if (!assignments.some((assignment) => assignment.teamId === teamId && assignment.member === member)) assignments.push({ teamId, member });
      item.assignments = assignments; syncLegacyAssignmentFields(item); item.updated = "Az önce";
      addWorkActivity(item, "change", "Toplu atama: " + member + " · " + (state.teams.find((team) => team.id === teamId)?.name || "Takım"));
    });
    save(); renderBacklog(); toastUndo(member + " " + selectedItems.length + " işe atandı.", before); return;
  }
  if (target.id === "bulk-project" && target.value) {
    const selectedItems = getSelectedBacklogItems();
    if (!selectedItems.length) return;
    const projectName = target.value;
    if (!window.confirm(selectedItems.length + " işi '" + projectName + "' projesine taşı? Projeye özgü release ve sprint atamaları kaldırılır.")) { target.value = ""; return; }
    const before = structuredClone(selectedItems);
    selectedItems.forEach((item) => { const oldProject = item.project; item.project = projectName; item.releaseId = undefined; item.sprintId = undefined; item.updated = "Az önce"; addWorkActivity(item, "change", "Proje: " + oldProject + " → " + projectName + "; proje kapsamı dışındaki release/sprint bağlantıları temizlendi."); });
    save(); renderBacklog(); toastUndo(selectedItems.length + " iş taşındı.", before); return;
  }
  if (target.id === "bulk-release" && target.value) {
    const selectedItems = getSelectedBacklogItems();
    const releaseId = target.value === "__none" ? "" : target.value;
    const release = releaseId ? state.releases.find((entry) => entry.id === releaseId && selectedItems.every((item) => item.project === entry.project)) : undefined;
    if (!selectedItems.length || (releaseId && !release)) { toast("Seçili işler aynı release projesinde olmalı."); renderBacklog(); return; }
    const before = structuredClone(selectedItems);
    selectedItems.forEach((item) => { const previous = state.releases.find((entry) => entry.id === item.releaseId); item.releaseId = releaseId || undefined; item.updated = "Az önce"; addWorkActivity(item, "release", release ? '"' + release.name + '" kapsamına toplu eklendi.' : (previous?.name || "Release") + " kapsamından toplu çıkarıldı."); });
    save(); renderBacklog(); toastUndo(selectedItems.length + (release ? " iş release kapsamına alındı." : " iş release kapsamından çıkarıldı."), before); return;
  }
  if (target.id === "question-filter") { questionFilter = target.value as typeof questionFilter; renderOpenQuestions(); return; }
  if (target.id === "team-filter-start") { teamPlanFilters.startFrom = target.value; renderTeamDashboard(); }
  if (target.id === "team-filter-target") { teamPlanFilters.targetTo = target.value; renderTeamDashboard(); }
  if (target.id === "team-filter-period") { teamPlanFilters.period = target.value.trim(); renderTeamDashboard(); }
  if (target.id === "team-filter-min-estimate") { teamPlanFilters.minEstimate = target.value; renderTeamDashboard(); }
  if (target.id === "team-filter-max-estimate") { teamPlanFilters.maxEstimate = target.value; renderTeamDashboard(); }
  if (target.id === "new-kind" || target.id === "new-item-type") updateNewForm();
  if (target.id === "status-filter" || target.id === "type-filter" || target.id === "label-filter") {
    if (target.id === "status-filter") backlogStatus = target.value;
    if (target.id === "type-filter") backlogType = target.value;
    if (target.id === "label-filter") labelFilter = target.value;
    rememberRecentBacklogFilter(); updateBacklogRows();
  }
  if (target.id === "include-completed") { backlogIncludeCompleted = (target as HTMLInputElement).checked; rememberRecentBacklogFilter(); updateBacklogRows(); }
  if (target.id === "sprint-filter") { backlogSprintId = target.value; rememberRecentBacklogFilter(); updateBacklogRows(); }
  if (target.id === "asset-type-filter") { assetTypeFilter = target.value; updateAssetGrid(); }
  if (target.id === "asset-project-filter") { assetProjectFilter = target.value; updateAssetGrid(); }
  if (target.id === "asset-inactive-filter") { includeInactiveAssets = target.checked; updateAssetGrid(); }
  if (target.id === "team-filter") { teamFilterId = target.value; assigneeFilter = ""; refreshBacklogAssigneeFilter(); rememberRecentBacklogFilter(); updateBacklogRows(); }
  if (target.id === "assignee-filter") { assigneeFilter = target.value; rememberRecentBacklogFilter(); updateBacklogRows(); }
  if (target.id === "file-fallback" || target.id === "detail-file-fallback" || target.id === "task-file-fallback" || target.id === "note-file-fallback") {
    const files: AttachmentInfo[] = Array.from(target.files || []).map((file) => ({ name: file.name, size: file.size, demoOnly: true }));
    if (target.id === "file-fallback") {
      draftAttachments.push(...files);
      renderDraftFiles();
    } else if (target.id === "detail-file-fallback" && activeItemId) {
      const item = itemById(activeItemId);
      if (!item) return;
      item.attachments = [...(item.attachments || []), ...files];
      if (files.length) addWorkActivity(item, "attachment", files.length + " dosya eki eklendi: " + files.map((file) => file.name).join(", "));
      save();
      render();
      openItem(activeItemId);
    } else if (target.id === "task-file-fallback" && target.dataset.taskId) {
      const task = state.tasks.find((entry) => entry.id === target.dataset.taskId);
      if (!task) return;
      task.attachments = [...(task.attachments || []), ...files];
      save();
      openTask(task.id);
    } else if (target.id === "note-file-fallback" && target.dataset.noteId) {
      const note = state.notes.find((entry) => entry.id === target.dataset.noteId);
      if (!note) return;
      note.attachments = [...(note.attachments || []), ...files];
      save();
      showNote(note.id);
    }
    if (files.length) toast("Dosya adları prototip oturumu için eklendi.");
    target.value = "";
  }
  if (target.id === "progress-note-file-fallback") {
    progressAttachments.push(...Array.from(target.files || []).map((file) => ({ name: file.name, size: file.size, demoOnly: true })));
    const filesRoot = document.getElementById("progress-note-files");
    if (filesRoot) filesRoot.innerHTML = progressAttachments.map((file, index) => '<span class="progress-note-file">' + esc(file.name) + '<button type="button" data-remove-progress-file="' + index + '" aria-label="Eki kaldır">×</button></span>').join("");
    target.value = "";
  }
});

document.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  if (target.matches("[data-assignment-member]")) {
    const row = target.closest<HTMLElement>(".assignment-edit-row");
    const team = row?.querySelector<HTMLInputElement>("[data-assignment-team]");
    if (team) team.value = assignmentTeamForMember(target.value.trim(), team.value);
    return;
  }
  if (target.matches("[data-inline-member]")) {
    const team = root.querySelector<HTMLInputElement>('[data-inline-team="' + CSS.escape(target.dataset.inlineMember || "") + '"]');
    if (team) team.value = assignmentTeamForMember(target.value.trim(), team.value);
    return;
  }
  if (target.name === "members" && target.closest("#team-form")) updateTeamMemberRows();
  if (target.id === "new-title-input" || target.id === "new-description") updateDuplicateCandidates();
  if (target.id === "archive-search") { archiveQuery = target.value; const selectionStart = target.selectionStart; renderArchiveSearch(); const input = document.getElementById("archive-search") as HTMLInputElement | null; input?.focus(); if (selectionStart !== null) input?.setSelectionRange(selectionStart, selectionStart); }
  if (target.id === "new-assets-search") {
    renderNewAssetOptions(target.value);
    document.getElementById("new-assets-picker")?.classList.add("open");
    target.setAttribute("aria-expanded", "true");
    return;
  }
  if (target.id === "backlog-search") { query = target.value; rememberRecentBacklogFilter(); updateBacklogRows(); }
  if (target.id === "asset-search") { assetQuery = target.value; updateAssetGrid(); }
  if (target.id === "global-search") {
    query = target.value;
    if (query && activeView !== "backlog") setView("backlog");
    else if (activeView === "backlog") updateBacklogRows();
  }
});

document.addEventListener("focusin", (event) => {
  const target = event.target as HTMLElement;
  if (target.id !== "new-assets-search") return;
  document.getElementById("new-assets-picker")?.classList.add("open");
  target.setAttribute("aria-expanded", "true");
});

document.addEventListener("submit", (event) => {
  const formId = (event.target as HTMLFormElement).getAttribute("id") || "";
  if (formId === "record-link-form") {
    event.preventDefault(); const values = new FormData(event.target as HTMLFormElement); const item = itemById(String(values.get("itemId") || "")); const [type, targetId] = String(values.get("target") || "").split("::");
    if (!item || !targetId || !["item", "asset", "release", "note", "question", "risk"].includes(type)) return;
    item.relatedRecords ||= []; if (!item.relatedRecords.some((link) => link.type === type && link.targetId === targetId)) item.relatedRecords.push({ id: nextId("LINK"), type: type as WorkRecordLink["type"], targetId, label: relatedRecordLabel(type as WorkRecordLink["type"], targetId) });
    save(); closeModal(); openItem(item.id); toast("Kayıtlar ilişkilendirildi."); return;
  }
  if (formId === "open-question-form") {
    event.preventDefault();
    const values = new FormData(event.target as HTMLFormElement);
    const text = String(values.get("text") || "").trim();
    const owner = String(values.get("owner") || "").trim();
    if (!text || !owner) return;
    state.openQuestions ||= [];
    const id = String(values.get("id") || "");
    const existing = state.openQuestions.find((question) => question.id === id);
    if (existing) { existing.text = text; existing.owner = owner; existing.expectedAt = String(values.get("expectedAt") || ""); existing.linkedItemId = String(values.get("linkedItemId") || "") || undefined; }
    else state.openQuestions.unshift({ id: nextId("Q"), text, owner, expectedAt: String(values.get("expectedAt") || ""), status: "Açık", linkedItemId: String(values.get("linkedItemId") || "") || undefined, createdAt: new Date().toISOString() });
    save(); closeModal(); setView("questions"); toast("Açık soru kaydedildi."); return;
  }
  if (formId === "decision-form") { saveDecision(event as SubmitEvent); return; }
  if (formId === "open-question-answer-form") {
    event.preventDefault();
    const values = new FormData(event.target as HTMLFormElement);
    const id = String(values.get("id") || "");
    const answer = String(values.get("answer") || "").trim();
    const question = state.openQuestions?.find((entry) => entry.id === id);
    if (!question || !answer) { toast("Yanıt alanını doldur."); return; }
    question.answer = answer;
    question.status = "Yanıtlandı";
    question.answeredAt = new Date().toISOString();
    questionFilter = "answered";
    save(); closeModal(); renderOpenQuestions(); toast("Yanıt kaydedildi; soru Yanıtlandı olarak işaretlendi."); return;
  }
  if (formId === "quick-create-form") saveQuickCreate(event as SubmitEvent);
  if (formId === "create-sprint-form") saveNewSprint(event as SubmitEvent);
  if (formId === "asset-relation-label-form") {
    event.preventDefault();
    const values = new FormData(event.target as HTMLFormElement);
    const sourceId = String(values.get("sourceId") || "");
    const targetId = String(values.get("targetId") || "");
    const label = String(values.get("label") || "").trim() || "İlişkili";
    const edge = assetDiagramGraph?.getEdges().find((candidate) => candidate.getSourceCellId() === sourceId && candidate.getTargetCellId() === targetId);
    edge?.setLabels([{ attrs: { text: { text: label, fill: "#5d6784", fontSize: 11 } }, position: 0.5 }]);
    persistAssetRelation(sourceId, targetId, label);
    closeModal();
    toast("İlişki etiketi güncellendi.");
    return;
  }
  if (formId === "new-form") saveNewRecord(event as SubmitEvent);
  if (formId === "workspace-form") saveWorkspaceSettings(event as SubmitEvent);
  if (formId === "project-form") saveProjectSettings(event as SubmitEvent);
  if (formId === "team-form") saveTeam(event as SubmitEvent);
  if (formId === "asset-form") saveAsset(event as SubmitEvent);
  if (formId === "setup-form") saveSetup(event as SubmitEvent);
  if (formId === "roadmap-form") saveRoadmapNode(event as SubmitEvent);
  if (formId === "release-form") saveRelease(event as SubmitEvent);
  if (formId === "edit-item-form") saveEditedRecord(event as SubmitEvent, "item");
  if (formId === "edit-task-form") saveEditedRecord(event as SubmitEvent, "task");
  if (formId === "edit-note-form") saveEditedRecord(event as SubmitEvent, "note");
});

document.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement;
  if (target.id === "backlog-quick-title" && event.key === "Enter") { event.preventDefault(); root.querySelector<HTMLButtonElement>('[data-action="quick-add-backlog"]')?.click(); return; }
  if (event.key === "Escape" && modalRoot.querySelector(".modal-backdrop")) { closeModal(); return; }
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "n") {
    event.preventDefault(); openQuickCreateModal(); return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && modalRoot.querySelector("#quick-create-form")) {
    event.preventDefault(); modalRoot.querySelector<HTMLButtonElement>('#quick-create-form button[value="close"]')?.click(); return;
  }
  if (event.key === "Enter" && target.matches("[data-team-member-input]")) {
    event.preventDefault();
    target.closest(".team-inline-add")?.querySelector<HTMLButtonElement>("[data-add-dashboard-member]")?.click();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    const search = document.getElementById("global-search") as HTMLInputElement;
    search.focus();
  }
  if (event.key === "Escape" && document.getElementById("new-assets-picker")?.classList.contains("open")) {
    event.stopImmediatePropagation();
    const picker = document.getElementById("new-assets-picker");
    picker?.classList.remove("open");
    document.getElementById("new-assets-search")?.setAttribute("aria-expanded", "false");
    return;
  }
  if (event.key === "Escape") closeModal();
});

window.addEventListener("dragover", (event) => {
  if (event.dataTransfer?.types.length) event.preventDefault();
});

window.addEventListener("dragenter", (event) => {
  if (event.dataTransfer?.types.includes("Files")) { document.body.classList.add("dragging-files"); document.body.dataset.dropPurpose = attachmentTarget ? "attachment" : "email"; }
});

window.addEventListener("dragleave", (event) => {
  if (event.relatedTarget === null && event.dataTransfer?.types.includes("Files")) { document.body.classList.remove("dragging-files"); delete document.body.dataset.dropPurpose; }
});

window.addEventListener("drop", async (event) => {
  event.preventDefault();
  if (event.dataTransfer?.types.includes("application/x-rota-work-item")) return;
  document.body.classList.remove("dragging-files");
  delete document.body.dataset.dropPurpose;
  const files = Array.from(event.dataTransfer?.files ?? []);
  if (files.length === 0) {
    if (attachmentTarget) toast("Bu Outlook öğesi dosya eki olarak alınamadı. Outlook sürükle-bırak biçimi desteklenmiyor olabilir; e-postayı .msg olarak kaydedip bırakmayı dene.");
    else if (event.dataTransfer?.types.includes("Files")) toast("Outlook bu e-postayı Rota'ya dosya olarak vermedi. E-postayı .msg olarak kaydet, sonra Rota'ya sürükle.");
    return;
  }
  if (!attachmentTarget) {
    const emailFiles = files.filter((file) => /\.(msg|eml)$/i.test(file.name));
    if (files.length !== 1 || emailFiles.length !== 1) {
      toast("Yeni kayıt oluşturmak için tek bir Outlook e-postasını .msg veya .eml olarak bırak.");
      return;
    }
    try {
      const email = await desktop.parseDroppedEmail(emailFiles);
      const fingerprint = await droppedEmailFingerprint(email.subject, email.from, email.to, email.date, email.body);
      const existingEmailRecord = [...state.items, ...state.tasks, ...state.notes].find((record) => record.sourceEmail?.fingerprint === fingerprint);
      if (existingEmailRecord && !window.confirm('Bu e-postadan daha önce "' + existingEmailRecord.title + '" kaydı oluşturulmuş. Yine de yeni kayıt açmak istiyor musun?')) return;
      const rememberedKind = localStorage.getItem("rota-email-create-kind") || "Backlog işi";
      const rememberedProject = localStorage.getItem("rota-email-create-project") || "";
      openNewModal(rememberedKind);
      pendingEmailAttachmentToken = email.attachmentToken;
      pendingEmailAttachmentChoices = email.attachments;
      const titleInput = document.getElementById("new-title-input") as HTMLInputElement | null;
      const descriptionInput = document.getElementById("new-description") as HTMLTextAreaElement | null;
      const kindSelect = document.getElementById("new-kind") as HTMLSelectElement | null;
      const projectSelect = document.getElementById("new-project") as HTMLSelectElement | null;
      const cleanBody = trimQuotedEmailBody(email.body);
      if (titleInput) titleInput.value = email.subject || email.originalEmail.name;
      if (descriptionInput) {
        const header = [email.from ? "Kimden: " + email.from : "", email.to ? "Kime: " + email.to : "", email.date ? "Tarih: " + email.date : ""].filter(Boolean).join("\n");
        descriptionInput.value = [header, cleanBody || "E-posta gövdesi boş veya imzadan ibaret. Lütfen başlık ve gönderen bilgisini kontrol et."].filter(Boolean).join("\n\n").slice(0, 12000);
      }
      if (kindSelect) { kindSelect.value = rememberedKind; updateNewForm(); }
      if (projectSelect && [...projectSelect.options].some((option) => option.value === rememberedProject)) projectSelect.value = rememberedProject;
      draftAttachments.push(email.originalEmail);
      pendingDroppedEmailSource = { name: email.originalEmail.name, from: email.from, date: email.date, fingerprint };
      renderDraftFiles();
      renderEmailAttachmentChoices();
      toast(cleanBody ? "E-posta önizlemesi hazır. Başlığı, kayıt türünü ve proje seçimini kontrol edip kaydet." : "E-posta gövdesi boş görünüyor. Başlık ve gönderen bilgisini kontrol et.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "E-posta içe aktarılamadı.");
    }
    return;
  }

  const activityDrop = (event.target as HTMLElement).closest?.(".activity-note-composer") != null;
  const destination: { kind: "draft" | "item" | "task" | "note"; id?: string } = attachmentTarget || { kind: "draft" };
  await importDroppedAttachments(files, destination, activityDrop);
});

render();
checkFollowUpReminders();
window.setInterval(checkFollowUpReminders, 60_000);
if (!hasStoredWorkspace) openSetupWizard(true);


