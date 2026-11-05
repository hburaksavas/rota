import { renderFavspace, installFavspaceDrop } from "./favspace";
import { appConfirm, appPrompt } from "./dialogs";
import { Graph, type Edge, type Node } from "@antv/x6";
import { initPomodoro } from "./pomodoro";
import { createPoTools } from "./po-tools";

const seed: WorkspaceState = {
  schemaVersion: 6,
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
const AUTO_BACKUP_AT_KEY = "rota-auto-backup-at";
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
const APP_ZOOM_KEY = "rota-app-zoom";
const APP_ZOOM_MIN = 0.5;
const APP_ZOOM_MAX = 2;
const APP_ZOOM_STEP = 0.1;
const APP_ZOOM_WHEEL_THRESHOLD = 50;
const APP_ZOOM_WHEEL_NOTCH = 100;
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
  overdueOnly?: boolean;
  statusAgeMinDays?: number;
  statuses?: WorkStatus[];
  priorities?: Priority[];
  dateFrom?: string;
  dateTo?: string;
  noEstimate?: boolean;
  overdueCondition?: boolean;
  conditionMode?: "and" | "or";
  columns: BacklogColumnId[];
  sort: BacklogSort;
  secondarySort?: BacklogSort;
  pinned?: boolean;
  searchScope?: "all" | "title" | "description" | "id" | "labels" | "components";
}
interface RecentBacklogFilter { query: string; searchScope: BacklogSearchScope; status: string; type: string; label: string; teamId: string; assignee: string; sprintId?: string; includeCompleted?: boolean; overdueOnly?: boolean; statusAgeMinDays?: number; }
type BacklogColumnId = "type" | "area" | "priority" | "status" | "statusAge" | "updated" | "assignment" | "project" | "description" | "labels" | "startDate" | "targetDate" | "targetPeriod" | "estimate" | "productStage" | "release" | "sprint" | "assets" | "attachments" | "acceptance" | "dependencies" | "blocker" | "activity";
type BacklogSort = "manual" | "aging-desc" | "title-asc" | "title-desc" | "priority-desc" | "status-asc" | "target-asc" | "target-desc" | "updated-asc" | "updated-desc" | `column:${"title" | BacklogColumnId}:${"asc" | "desc"}`;
const BACKLOG_COLUMN_CATALOG: { id: BacklogColumnId; label: string }[] = [
  { id: "area", label: "Ürün alanı" }, { id: "priority", label: "Öncelik" },
  { id: "status", label: "Durum" }, { id: "statusAge", label: "Durumda süre" }, { id: "updated", label: "Güncellendi" }, { id: "assignment", label: "Sorumlu" },
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
  const match = /^column:(title|type|area|priority|status|statusAge|updated|assignment|project|description|labels|startDate|targetDate|targetPeriod|estimate|productStage|release|sprint|assets|attachments|acceptance|dependencies|blocker|activity):(asc|desc)$/.exec(value);
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
      overdueOnly: Boolean(view.overdueOnly),
      statusAgeMinDays: Number.isInteger(view.statusAgeMinDays) && (view.statusAgeMinDays || 0) >= 0 ? view.statusAgeMinDays : 0,
      statuses: Array.isArray(view.statuses) ? view.statuses.filter((value) => ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"].includes(value)) : [],
      priorities: Array.isArray(view.priorities) ? view.priorities.filter((value) => ["Kritik", "Yüksek", "Orta", "Düşük"].includes(value)) : [],
      dateFrom: view.dateFrom || "", dateTo: view.dateTo || "", noEstimate: Boolean(view.noEstimate), overdueCondition: Boolean(view.overdueCondition), conditionMode: view.conditionMode === "or" ? "or" : "and",
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
let unreadableWorkspace: string | null = null;
let pendingSaveFailureToast = false;
let automaticBackupBusy = false;
let automaticBackupError = "";
function migrateWorkspace(value: Partial<WorkspaceState>): Partial<WorkspaceState> {
  const migrated = structuredClone(value);
  let version = migrated.schemaVersion ?? 0;
  if (!Number.isInteger(version) || version < 0 || version > 6) throw new Error("Desteklenmeyen çalışma alanı sürümü");
  if (version === 0) { migrated.decisions ||= []; migrated.diagrams ||= []; version = 1; }
  if (version === 1) { migrated.sprints ||= []; migrated.openQuestions ||= []; migrated.risks ||= []; migrated.dailyPlans ||= []; version = 2; }
  if (version === 2) { syncProjectIds(migrated); version = 3; }
  if (version === 3) { syncMemberIds(migrated); version = 4; }
  if (version === 4) {
    migrated.workTemplates ||= [];
    migrated.formDrafts ||= [];
    migrated.importBatches ||= [];
    migrated.diagnosticEvents ||= [];
    migrated.estimateUnit ||= "saat";
    migrated.labelAliases ||= {};
    version = 5;
  }
  if (version === 5) { version = 6; }
  const projects = migrated.projects || [];
  for (const records of [migrated.items || [], migrated.assets || [], migrated.roadmap || [], migrated.releases || []]) {
    for (const record of records) {
      if (!projects.some((project) => project.name === record.project) && record.projectId) {
        const project = projects.find((entry) => entry.id === record.projectId);
        if (project) record.project = project.name;
      }
    }
  }
  migrated.schemaVersion = version;
  return migrated;
}
function syncProjectIds(workspace: Partial<WorkspaceState>): void {
  const projects = workspace.projects || [];
  for (const records of [workspace.items || [], workspace.assets || [], workspace.roadmap || [], workspace.releases || []]) {
    for (const record of records) {
      const project = projects.find((entry) => entry.name === record.project);
      if (project) record.projectId = project.id;
    }
  }
}
function syncMemberIds(workspace: Partial<WorkspaceState>): void {
  const teams = workspace.teams || [];
  for (const team of teams) {
    team.memberIds ||= {};
    for (const member of team.members) team.memberIds[member] ||= "MEMBER-" + Math.random().toString(36).slice(2, 12).toUpperCase();
  }
  const assignments = [...(workspace.items || []).flatMap((item) => item.assignments || []), ...(workspace.projects || []).flatMap((project) => project.assignments || [])];
  for (const assignment of assignments) {
    const team = teams.find((entry) => entry.id === assignment.teamId);
    if (team) assignment.memberId = team.memberIds?.[assignment.member] || assignment.memberId;
  }
}
try {
  const rawWorkspace = localStorage.getItem(STORAGE_KEY);
  const parsed = JSON.parse(rawWorkspace ?? "null") as Partial<WorkspaceState> | null;
  const saved = parsed && typeof parsed === "object" ? migrateWorkspace(parsed) : parsed;
  if (rawWorkspace !== null && (!saved || typeof saved !== "object" || !Array.isArray(saved.items) || !Array.isArray(saved.projects) || !saved.profile || typeof saved.profile !== "object")) throw new Error("Geçersiz çalışma alanı biçimi");
  const savedItems = workspaceRecords<WorkItem>(saved?.items, seed.items);
  const savedProjects = workspaceRecords<Project>(saved?.projects, seed.projects);
  const legacySampleWorkspace = Boolean(saved && !saved.assets && saved.profile?.organization === seed.profile.organization && saved.profile?.workspace === seed.profile.workspace && savedItems.some((item) => item.id === "PAY-241") && savedProjects.some((project) => project.name === "Ödeme Platformu"));
  state = saved ? {
    ...structuredClone(seed), ...saved,
    items: savedItems,
    favspace: saved.favspace,
    tasks: workspaceRecords<PersonalTask>(saved.tasks, seed.tasks),
    notes: workspaceRecords<PersonalNote>(saved.notes, seed.notes),
    projects: savedProjects,
    profile: { ...seed.profile, ...saved.profile },
    teams: workspaceRecords<Team>(saved.teams, []),
    roadmap: workspaceRecords<RoadmapNode>(saved.roadmap, []),
    releases: workspaceRecords<ProductRelease>(saved.releases, []),
    decisions: workspaceRecords<ProductDecision>(saved.decisions, []),
    meetings: workspaceRecords<PoMeeting>(saved.meetings, []).map((meeting) => ({ ...meeting, entries: Array.isArray(meeting.entries) ? meeting.entries : [] })),
    poRequests: workspaceRecords<PoRequest>(saved.poRequests, []),
    workConversations: workspaceRecords<WorkConversation>(saved.workConversations, []),
    productRules: workspaceRecords<ProductRule>(saved.productRules, []),
    diagrams: workspaceRecords<WorkDiagram>(saved.diagrams, []),
    sprints: workspaceRecords<Sprint>(saved.sprints, []),
    assets: workspaceRecords<ProductAsset>(saved.assets, legacySampleWorkspace ? seed.assets : []),
    openQuestions: workspaceRecords<OpenQuestion>(saved.openQuestions, []),
    acceptanceTemplates: workspaceRecords<AcceptanceTemplate>(saved.acceptanceTemplates, []),
    risks: workspaceRecords<ProductRisk>(saved.risks, []),
    dailyPlans: workspaceRecords<DailyPlan>(saved.dailyPlans, []),
    dailyFocus: normalizeWorkspaceFocus(saved.dailyFocus),
    dashboardLayout: normalizeDashboardLayout(saved.dashboardLayout),
    weeklySummaryNotes: saved.weeklySummaryNotes || {},
    handoverNotes: saved.handoverNotes || {}
    ,workTemplates: workspaceRecords<WorkTemplate>(saved.workTemplates, [])
    ,formDrafts: workspaceRecords<FormDraft>(saved.formDrafts, [])
    ,importBatches: workspaceRecords<ImportBatch>(saved.importBatches, [])
    ,diagnosticEvents: workspaceRecords<DiagnosticEvent>(saved.diagnosticEvents, [])
    ,estimateUnit: saved.estimateUnit === "puan" ? "puan" : "saat"
    ,workflowChecks: saved.workflowChecks || {}
    ,labelAliases: saved.labelAliases || {}
    ,notifications: workspaceRecords<FollowUpNotification>(saved.notifications, [])
  } : structuredClone(seed);
  if (legacySampleWorkspace) state.items.forEach((item) => {
    const sampleItem = seed.items.find((entry) => entry.id === item.id);
    if (sampleItem?.assetIds?.length) item.assetIds = [...sampleItem.assetIds];
  });
} catch {
  unreadableWorkspace = localStorage.getItem(STORAGE_KEY);
  state = structuredClone(seed);
}
let activeView = "overview";
let pendingBacklogImport: ExcelImportData | null = null;
let importSheetIndex = 0;
let importHasHeader = true;
let importMapping: Record<string, number> = {};
let backlogMode = "list";
let activeProjectId: string | null = null;
let activeItemId: string | null = null;
let statusUpdateReturnToBoard = false;
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
let inlineInsertAfterId: string | null = null;
let inlineFeedbackTimer = 0;
let savedBacklogViews: BacklogSavedView[] = loadSavedBacklogViews();
let activeBacklogViewId = "";
let backlogSort: BacklogSort = "manual";
let recentBacklogFilters: RecentBacklogFilter[] = (() => { try { const value = JSON.parse(localStorage.getItem(BACKLOG_RECENT_FILTERS_KEY) || "[]"); return Array.isArray(value) ? value.slice(0, 5) : []; } catch { return []; } })();
let backlogStatus = "";
let backlogStatuses: WorkStatus[] = [];
let backlogPriorities: Priority[] = [];
let backlogDateFrom = "";
let backlogDateTo = "";
let backlogNoEstimate = false;
let backlogOverdueCondition = false;
let backlogConditionMode: "and" | "or" = "and";
let backlogOverdueOnly = false;
let backlogStatusAgeMinDays = 0;
let backlogIncludeCompleted = false;
let backlogType = "";
let backlogSprintId = "";
const selectedBacklogItemIds = new Set<string>();
type MeetingStageRecordKind = PoMeetingKind | "note";
const meetingStageRecordLabels: Record<MeetingStageRecordKind, string> = { note: "Not", decision: "Karar", question: "Soru", task: "Görev" };
const meetingClosingLabels = { decision: "Kararlar", question: "Açık sorular", task: "Görevler" } satisfies Record<PoMeetingKind, string>;
type MeetingClosingTopic = { title: string; entries: Record<PoMeetingKind, string[]> };
let meetingStage: {
  ids: string[];
  currentId: string;
  projectId: string | null;
  viewId: string;
  drafts: Map<string, { kind: MeetingStageRecordKind; text: string }>;
  closingTopics: Map<string, MeetingClosingTopic>;
  showClosing: boolean;
} | null = null;
let readyWorkPool = false;
let questionFilter: "open" | "all" | "answered" = "open";
let archiveQuery = "";
let jiraBoards: JiraBoard[] = [];
let jiraProjects: JiraProject[] = [];
let jiraSprints: JiraSprint[] = [];
let jiraIssueTypes: JiraIssueType[] = [];
let jiraIssues: JiraIssue[] = [];
let jiraIssueTotal: number | undefined;
let jiraHasMoreIssues = false;
let jiraLastSuccessAt = "";
function clearJiraIssueResults(): void { jiraIssues = []; jiraIssueTotal = undefined; jiraHasMoreIssues = false; jiraLastSuccessAt = ""; }
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
const defaultWorkTemplates: WorkTemplate[] = [
  { id: "work-template-story", name: "Story · Ürün ihtiyacı", type: "Story", description: "## İhtiyaç\n\n## Kullanıcı değeri\n\n## Kapsam dışı", acceptance: ["Başarılı ve alternatif akışlar tanımlı.", "Yetki, limit ve hata durumları belirtilmiş."], labels: ["Refinement"], priority: "Orta" },
  { id: "work-template-bug", name: "Bug · Hata kaydı", type: "Bug", description: "## Tekrar üretim adımları\n1. \n\n## Beklenen sonuç\n\n## Gerçek sonuç\n\n## Ortam", acceptance: ["Hata tekrar üretilebiliyor.", "Regresyon senaryosu doğrulandı."], labels: ["Hata"], priority: "Yüksek" },
  { id: "work-template-task", name: "Task · Teknik/operasyon işi", type: "Task", description: "## Yapılacak iş\n\n## Beklenen çıktı\n\n## Bağımlılıklar", acceptance: ["Beklenen çıktı doğrulandı."], labels: [], priority: "Orta" }
];
state.workTemplates = [...defaultWorkTemplates, ...(state.workTemplates || []).filter((entry) => !defaultWorkTemplates.some((preset) => preset.id === entry.id))];
state.formDrafts ||= [];
state.importBatches ||= [];
state.diagnosticEvents ||= [];

function recordDiagnostic(category: DiagnosticEvent["category"], message: string): string {
  const correlationId = Math.random().toString(36).slice(2, 10).toUpperCase();
  state.diagnosticEvents ||= [];
  state.diagnosticEvents.unshift({ id: nextId("LOG"), category, message: ({ storage: "Yerel çalışma alanı kaydetme işlemi başarısız.", attachment: "Dosya eki işlemi başarısız.", jira: "Jira isteği başarısız.", import: "İçe aktarma işlemi başarısız.", application: "Uygulama işlemi başarısız." })[category], correlationId, occurredAt: new Date().toISOString() });
  state.diagnosticEvents = state.diagnosticEvents.slice(0, 100);
  if (category !== "storage" && unreadableWorkspace === null) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Keep the event in memory until saving is possible. */ } }
  return correlationId;
}

function openRiskCenter(overdueOnly = false): void {
  const today = new Date().toLocaleDateString("sv-SE");
  const risks = (state.risks || []).filter((risk) => !overdueOnly || risk.status !== "Kapandı" && risk.reviewAt && risk.reviewAt < today);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>Risk takibi</h2><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><label class="completed-filter"><input id="risk-overdue-only" type="checkbox" ' + (overdueOnly ? 'checked' : '') + '> Gözden geçirmesi gecikenler</label>' + risks.map((risk) => '<button class="button button-secondary" data-action="edit-risk" data-id="' + esc(risk.id) + '">' + esc(risk.title + " · " + risk.status + " · " + (risk.reviewAt || "Tarih yok")) + '</button>').join("") + (!risks.length ? '<p class="settings-note">Bu kapsamda risk yok. İşin ilişkiler bölümünden risk ekleyebilirsin.</p>' : '') + '</div></section></div>';
}
function openRiskEditor(riskId?: string, itemId?: string): void {
  const risk = state.risks?.find((entry) => entry.id === riskId); const item = itemId ? itemById(itemId) : undefined;
  const field = (name: string, label: string, value: string, type = "text") => '<label class="field-label">' + label + '<input class="field-input" name="' + name + '" type="' + type + '" value="' + esc(value) + '"></label>';
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>Risk kaydı</h2><button class="modal-close" data-close-modal>×</button></header><form id="risk-form" class="settings-form"><input type="hidden" name="id" value="' + esc(riskId || "") + '"><input type="hidden" name="itemId" value="' + esc(itemId || "") + '"><input type="hidden" name="project" value="' + esc(risk?.project || item?.project || "") + '">' + field("title", "Başlık", risk?.title || "") + field("description", "Açıklama", risk?.description || "") + field("owner", "Sahip", risk?.owner || state.profile.userName) + '<div class="form-two-col">' + ["impact", "probability"].map((key) => '<label class="field-label">' + (key === "impact" ? "Etki" : "Olasılık") + '<select class="field-input" name="' + key + '">' + [1, 2, 3, 4, 5].map((value) => '<option ' + (value === (risk?.[key as "impact" | "probability"] || 3) ? 'selected' : '') + '>' + value + '</option>').join("") + '</select></label>').join("") + '</div><p class="settings-note">Ölçek: 1 en düşük, 5 en yüksek. Etki × olasılık: 1–4 Düşük, 5–9 Orta, 10–15 Yüksek, 16–25 Kritik.</p>' + field("mitigation", "Azaltma aksiyonu", risk?.mitigation || "") + field("reviewAt", "Gözden geçirme tarihi", risk?.reviewAt || "", "date") + '<label class="field-label">Durum<select class="field-input" name="status">' + ["Açık", "Azaltılıyor", "Kapandı"].map((status) => '<option ' + (status === risk?.status ? 'selected' : '') + '>' + status + '</option>').join("") + '</select></label><label class="field-label">Elle seviye<select class="field-input" name="manualLevel"><option value="">Hesaplanan seviyeyi kullan</option>' + ["Düşük", "Orta", "Yüksek", "Kritik"].map((level) => '<option ' + (level === risk?.manualLevel ? 'selected' : '') + '>' + level + '</option>').join("") + '</select></label>' + field("manualLevelReason", "Elle seviye gerekçesi", risk?.manualLevelReason || "") + '<label class="field-label">İlgili release<select class="field-input" name="releaseId"><option value="">Bağlantı yok</option>' + state.releases.filter((release) => release.project === (risk?.project || item?.project)).map((release) => '<option value="' + esc(release.id) + '" ' + (risk?.releaseIds?.includes(release.id) ? 'selected' : '') + '>' + esc(release.name) + '</option>').join("") + '</select></label>' + (risk?.workItemIds || (item ? [item.id] : [])).map((id) => '<button type="button" class="text-button" data-open-item="' + esc(id) + '">' + esc(id) + '</button>').join("") + '<footer class="modal-footer"><button class="button button-primary" type="submit">Kaydet</button></footer></form></section></div>';
}
function openWorkTemplateEditor(): void {
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>İş şablonu ekle</h2><button class="modal-close" data-close-modal>×</button></header><form id="work-template-form" class="settings-form"><label class="field-label">Şablon adı<input class="field-input" name="name" required maxlength="80"></label><div class="form-two-col"><label class="field-label">Tür<select class="field-input" name="type"><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="field-label">Öncelik<select class="field-input" name="priority"><option>Orta</option><option>Kritik</option><option>Yüksek</option><option>Düşük</option></select></label></div><label class="field-label">Açıklama bölümleri<textarea class="field-input" name="description" rows="5"></textarea></label><label class="field-label">Kabul kriterleri (her satır bir kriter)<textarea class="field-input" name="acceptance" rows="3"></textarea></label><label class="field-label">Etiketler (virgülle ayır)<input class="field-input" name="labels"></label><footer class="modal-footer"><button type="submit" class="button button-primary">Şablonu kaydet</button></footer></form></section></div>';
}
async function openDiagnostics(): Promise<void> {
  let environment: Record<string, string> = { uygulama: "Rota 0.1.0", arayüz: navigator.userAgent };
  try { if (desktop.getDiagnostics) environment = await desktop.getDiagnostics(); } catch { /* Report remains available without the host. */ }
  const report = { ortam: environment, olaylar: (state.diagnosticEvents || []).map(({ category, correlationId, occurredAt }) => ({ kategori: category, ilişkiKimliği: correlationId, zaman: occurredAt })) };
  const content = JSON.stringify(report, null, 2);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">YEREL TANILAMA</div><h2>Rapor önizlemesi</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-note">Rapor yalnızca sürüm, işlem kategorisi, zaman ve ilişkilendirme kimliğini içerir.</p><textarea id="diagnostic-report" class="field-input diagnostic-report" readonly rows="16">' + esc(content) + '</textarea><footer class="modal-footer"><button class="button button-secondary" data-action="export-diagnostics">Raporu dışa aktar</button></footer></div></section></div>';
}
function structuredEditorToolbar(target: string): string {
  return '<div class="structured-editor-toolbar" role="toolbar" aria-label="Metin biçimlendirme"><button type="button" data-format="heading" data-target="' + target + '" aria-label="Başlık ekle">H</button><button type="button" data-format="bold" data-target="' + target + '" aria-label="Kalın metin ekle"><strong>B</strong></button><button type="button" data-format="list" data-target="' + target + '" aria-label="Liste ekle">• Liste</button><button type="button" data-format="check" data-target="' + target + '" aria-label="Kontrol maddesi ekle">☐</button><button type="button" data-format="link" data-target="' + target + '" aria-label="Bağlantı ekle">↗</button></div>';
}

function structuredTextMarkup(value: string): string {
  const lines = value.split(/\r?\n/);
  return '<div class="structured-content">' + lines.map((line) => {
    const safe = esc(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    if (safe.startsWith("## ")) return "<h4>" + safe.slice(3) + "</h4>";
    if (/^- \[[ xX]\] /.test(safe)) return '<p class="structured-check">' + (/^- \[[xX]\]/.test(safe) ? "☑" : "☐") + " " + safe.replace(/^- \[[ xX]\] /, "") + "</p>";
    if (/^(?:- |\d+\. )/.test(safe)) return '<p class="structured-list">• ' + safe.replace(/^(?:- |\d+\. )/, "") + "</p>";
    return safe ? "<p>" + safe + "</p>" : '<span class="structured-gap"></span>';
  }).join("") + "</div>";
}

type ShareRecordKind = "item" | "task" | "decision" | "question" | "note";

function copyRecordButton(kind: ShareRecordKind, id: string): string {
  return '<button type="button" class="icon-action record-copy-action" data-action="copy-record" data-kind="' + kind + '" data-id="' + esc(id) + '" aria-label="Biçimli kopyala" data-tooltip="Biçimli kopyala">' + icon("copy") + '</button>';
}

function addRecordCopyAction(kind: ShareRecordKind, id: string): void {
  modalRoot.querySelector("header .modal-close")?.insertAdjacentHTML("beforebegin", copyRecordButton(kind, id));
}

type ShareRecord = {
  title: string;
  metadata: [string, string | undefined][];
  sections: [string, string | string[] | undefined][];
};

function getShareRecord(kind: ShareRecordKind, id: string): ShareRecord | undefined {
  switch (kind) {
    case "item": {
      const item = itemById(id);
      if (!item) return;
      return {
        title: item.id + " · " + item.title,
        metadata: [["Tür", item.type], ["Durum", item.status], ["Proje", item.project], ["Öncelik", item.priority], ["Atananlar", getWorkAssignments(item).map(({ member }) => member).join(", ")], ["Jira", item.jiraIssueKey]],
        sections: [["Açıklama", item.description], ["Kabul kriterleri", item.acceptance]]
      };
    }
    case "task": {
      const task = state.tasks.find((entry) => entry.id === id);
      if (!task) return;
      return {
        title: task.title,
        metadata: [["Tür", "Görev"], ["Durum", task.done ? "Tamamlandı" : "Açık"], ["Termin", task.due], ["İlgili iş", task.linked]],
        sections: [["Açıklama", task.description]]
      };
    }
    case "decision": {
      const decision = state.decisions?.find((entry) => entry.id === id);
      if (!decision) return;
      return {
        title: decision.title,
        metadata: [["Tür", "Karar"], ["Durum", decision.status], ["Sahibi", decision.owner], ["Karar tarihi", decision.decidedAt]],
        sections: [["Karar ve gerekçe", decision.rationale], ["Bağlam / ihtiyaç", decision.context], ["Değerlendirilen seçenekler", decision.options]]
      };
    }
    case "question": {
      const question = state.openQuestions?.find((entry) => entry.id === id);
      if (!question) return;
      return {
        title: "Açık soru",
        metadata: [["Durum", question.status], ["Sahibi", question.owner], ["Beklenen tarih", question.expectedAt], ["İlgili iş", question.linkedItemId]],
        sections: [["Soru", question.text], ["Yanıt", question.answer]]
      };
    }
    case "note": {
      const note = state.notes.find((entry) => entry.id === id);
      if (!note) return;
      return { title: note.title, metadata: [["Tür", "Not"], ["İlgili iş", note.linked]], sections: [["Not", note.body]] };
    }
  }
}

async function copyRecord(kind: ShareRecordKind, id: string): Promise<void> {
  const record = getShareRecord(kind, id);
  if (!record) { toast("Kopyalanacak kayıt bulunamadı."); return; }
  const html = ["<h2>" + esc(record.title) + "</h2>"];
  const plain = [record.title];
  const metadata = record.metadata.filter(([, value]) => value?.trim());
  if (metadata.length) {
    html.push("<p>" + metadata.map(([label, value]) => "<strong>" + esc(label) + ":</strong> " + esc(value)).join("<br>") + "</p>");
    plain.push(metadata.map(([label, value]) => label + ": " + value).join("\n"));
  }
  for (const [label, value] of record.sections) {
    if (Array.isArray(value)) {
      const entries = value.filter((entry) => entry.trim());
      if (!entries.length) continue;
      html.push("<h3>" + esc(label) + "</h3><ul>" + entries.map((entry) => "<li>" + structuredTextMarkup(entry) + "</li>").join("") + "</ul>");
      plain.push(label + "\n" + entries.map((entry) => "• " + entry).join("\n"));
    } else if (value?.trim()) {
      html.push("<h3>" + esc(label) + "</h3>" + structuredTextMarkup(value));
      plain.push(label + "\n" + value);
    }
  }
  const plainText = plain.join("\n\n");
  try {
    await navigator.clipboard.write([new ClipboardItem({
      "text/html": new Blob([html.join("")], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" })
    })]);
    toast("Kayıt biçimli olarak panoya kopyalandı.");
  } catch {
    try {
      await navigator.clipboard.writeText(plainText);
      toast("Kayıt düz metin olarak panoya kopyalandı.");
    } catch {
      toast("Kayıt panoya kopyalanamadı.");
    }
  }
}

const root = document.getElementById("view-root") as HTMLElement;
const modalRoot = document.getElementById("modal-root") as HTMLElement;
const deskEdge = document.getElementById("desk-edge") as HTMLElement;
const deskPins = new Map<string, { tab: string; scroll: number; stackOpen: boolean }>();
type GlobalSearchResult = { kind: "item" | "asset" | "decision" | "view" | "command"; id: string; label: string; detail: string; search: string };
let globalSearchResults: GlobalSearchResult[] = [];
let globalSearchSelection = 0;
let globalLastRecord: { kind: "item" | "asset" | "decision"; id: string } | null = null;
function closeGlobalSearch(): void {
  const panel = document.getElementById("global-search-results");
  if (panel) panel.hidden = true;
  document.getElementById("global-search")?.setAttribute("aria-expanded", "false");
}
function renderGlobalSearch(): void {
  const input = document.getElementById("global-search") as HTMLInputElement | null;
  const panel = document.getElementById("global-search-results");
  if (!input || !panel) return;
  const term = input.value.trim().toLocaleLowerCase("tr-TR");
  const entries: GlobalSearchResult[] = [
    ...state.items.filter((item) => !item.archived).map((item) => ({ kind: "item" as const, id: item.id, label: item.id + " · " + item.title, detail: "Backlog işi · " + item.project, search: [item.id, item.title, item.description, item.area, ...(item.labels || [])].join(" ") })),
    ...state.assets.map((asset) => ({ kind: "asset" as const, id: asset.id, label: asset.code + " · " + asset.name, detail: "Ürün bileşeni · " + asset.project, search: [asset.code, asset.name, asset.description, asset.purpose, asset.area].join(" ") })),
    ...(state.decisions || []).map((decision) => ({ kind: "decision" as const, id: decision.id, label: decision.title, detail: "Ürün kararı", search: [decision.title, decision.context, decision.rationale, ...(decision.options || [])].join(" ") })),
    ...savedBacklogViews.map((view) => ({ kind: "view" as const, id: view.id, label: "Görünümü aç: " + view.name, detail: "Kayıtlı görünüm", search: "görünüm aç " + view.name })),
    { kind: "command", id: "new-item", label: "Yeni backlog işi", detail: "Komut", search: "yeni backlog işi oluştur ekle" },
    { kind: "command", id: "new-task", label: "Yeni kişisel görev", detail: "Komut", search: "yeni kişisel görev oluştur ekle" },
    { kind: "command", id: "new-decision", label: "Yeni ürün kararı", detail: "Komut", search: "yeni ürün kararı oluştur ekle" },
    { kind: "command", id: "screen-backlog", label: "Backlog ekranını aç", detail: "Ekran", search: "backlog ekran aç" },
    { kind: "command", id: "screen-assets", label: "Ürün envanterini aç", detail: "Ekran", search: "ürün envanteri bileşen ekran aç" },
    { kind: "command", id: "screen-decisions", label: "Ürün kararlarını aç", detail: "Ekran", search: "ürün kararları ekran aç" },
    ...(globalLastRecord ? [{ kind: "command" as const, id: "last-record", label: "Son kayda dön", detail: "Komut", search: "son kayda dön aç" }] : []),
  ];
  globalSearchResults = entries.filter((entry) => !term ? entry.kind === "command" || entry.kind === "view" : entry.search.toLocaleLowerCase("tr-TR").includes(term)).slice(0, 12);
  globalSearchSelection = 0;
  panel.innerHTML = globalSearchResults.length ? globalSearchResults.map((entry, index) => '<button type="button" role="option" id="global-result-' + index + '" class="global-search-result' + (index === 0 ? ' selected' : '') + '" data-global-result="' + index + '" aria-selected="' + (index === 0) + '"><strong>' + esc(entry.label) + '</strong><small>' + esc(entry.detail) + '</small></button>').join("") : '<div class="global-search-empty">Eşleşen kayıt veya komut yok.</div>';
  panel.hidden = false;
  input.setAttribute("aria-expanded", "true");
  input.setAttribute("aria-activedescendant", globalSearchResults.length ? "global-result-0" : "");
}
function chooseGlobalSearch(index: number): void {
  const entry = globalSearchResults[index];
  if (!entry) return;
  closeGlobalSearch();
  const input = document.getElementById("global-search") as HTMLInputElement;
  input.value = "";
  if (entry.kind === "item") { setView("backlog"); openItem(entry.id); }
  else if (entry.kind === "asset") { setView("assets"); openAsset(entry.id); }
  else if (entry.kind === "decision") { setView("decisions"); openDecisionDetail(entry.id); }
  else if (entry.kind === "view") { const view = savedBacklogViews.find((item) => item.id === entry.id); if (view) applyBacklogView(view); }
  else if (entry.id === "new-item") openNewModal("Backlog işi");
  else if (entry.id === "new-task") openNewModal("Kişisel görev");
  else if (entry.id === "new-decision") openDecisionEditor();
  else if (entry.id === "screen-backlog") setView("backlog");
  else if (entry.id === "screen-assets") setView("assets");
  else if (entry.id === "screen-decisions") setView("decisions");
  else if (entry.id === "last-record" && globalLastRecord) {
    const last = globalLastRecord;
    if (last.kind === "item") { setView("backlog"); openItem(last.id); }
    else if (last.kind === "asset") { setView("assets"); openAsset(last.id); }
    else { setView("decisions"); openDecisionDetail(last.id); }
  }
}
let modalReturnFocus: HTMLElement | null = null;
let backlogDetailScroll: number | null = null;
let activeModalDialog: HTMLElement | null = null;
document.addEventListener("click", (event) => {
  if (modalRoot.querySelector('[role="dialog"]')) return;
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>("button, [tabindex]") : null;
  if (target) modalReturnFocus = target;
}, true);
const modalFocusSelector = 'button:not([disabled]):not([hidden]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
new MutationObserver(() => {
  const dialog = modalRoot.querySelector<HTMLElement>('[role="dialog"]');
  if (!dialog || dialog === activeModalDialog) return;
  if (!modalReturnFocus) modalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  activeModalDialog = dialog;
  const preferred = [...dialog.querySelectorAll<HTMLElement>('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])')].find((element) => element.getClientRects().length > 0);
  (preferred || [...dialog.querySelectorAll<HTMLElement>(modalFocusSelector)].find((element) => element.getClientRects().length > 0))?.focus();
}).observe(modalRoot, { childList: true, subtree: true });
modalRoot.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const dialog = modalRoot.querySelector<HTMLElement>('[role="dialog"]');
  if (!dialog) return;
  const focusable = [...dialog.querySelectorAll<HTMLElement>(modalFocusSelector)].filter((element) => element.getClientRects().length > 0);
  if (!focusable.length) return;
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
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
let sidebarPreferredCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
let narrowSidebarOverride: boolean | null = null;

function syncSidebarWidth(): void {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  const narrow = window.innerWidth / appZoom <= 1150;
  document.body.classList.toggle("narrow-window", narrow);
  if (!narrow) narrowSidebarOverride = null;
  const collapsed = narrow ? narrowSidebarOverride ?? true : sidebarPreferredCollapsed;
  if (collapsed !== sidebar.classList.contains("collapsed")) {
    if (collapsed) saveSidebarNavGroupPreferences();
    sidebar.classList.toggle("collapsed", collapsed);
    if (collapsed) sidebarNavGroups().forEach((group) => { group.open = true; });
    else applySidebarNavGroupPreferences();
  }
  const button = sidebar.querySelector<HTMLButtonElement>(".sidebar-toggle");
  if (button) {
    button.title = collapsed ? "Yan menüyü genişlet" : "Yan menüyü daralt";
    button.setAttribute("aria-label", button.title);
    button.setAttribute("aria-expanded", String(!collapsed));
  }
  syncSidebarCollapsedTooltips();
}

document.addEventListener("toggle", (event) => {
  if (!(event.target instanceof HTMLDetailsElement) || !event.target.matches(".nav-group[data-nav-group]")) return;
  if (!document.querySelector(".sidebar")?.classList.contains("collapsed")) saveSidebarNavGroupPreferences();
}, true);
// Yakınlaştırma: Ctrl + fare tekerleği ile ölçeklenir, tercih çalışma alanında saklanır.
function clampAppZoom(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(APP_ZOOM_MAX, Math.max(APP_ZOOM_MIN, Math.round(value * 100) / 100));
}
function readStoredAppZoom(): number {
  const stored = localStorage.getItem(APP_ZOOM_KEY);
  if (stored !== null) { const parsed = Number(stored); if (Number.isFinite(parsed)) return clampAppZoom(parsed); }
  const legacy = Number(localStorage.getItem(FONT_SCALE_KEY)); // Önceden kaydedilen yazı boyutu tercihi korunur.
  return Number.isFinite(legacy) && legacy > 0 ? clampAppZoom(legacy) : 1;
}
let appZoom = readStoredAppZoom();
function applyAppZoom(): void {
  document.body.style.zoom = String(appZoom);
  document.body.style.setProperty("--app-zoom", String(appZoom));
  const percent = Math.round(appZoom * 100);
  const label = document.getElementById("zoom-level");
  if (label) label.textContent = percent + "%";
  const indicator = document.getElementById("zoom-indicator");
  if (indicator) {
    indicator.title = "Yakınlaştırma %" + percent + " · Ctrl + tekerlek ile değiştir · Sıfırlamak için tıkla";
    indicator.setAttribute("aria-label", "Yakınlaştırma %" + percent + ". Varsayılan boyuta döndürmek için tıkla.");
    indicator.classList.toggle("is-zoomed", appZoom !== 1);
  }
  const settingsSelect = document.getElementById("workspace-app-zoom") as HTMLSelectElement | null;
  if (settingsSelect) settingsSelect.value = String(appZoom);
  updateNavIndicator();
}
function setAppZoom(value: number): void {
  const next = clampAppZoom(value);
  if (next !== appZoom) { appZoom = next; localStorage.setItem(APP_ZOOM_KEY, String(appZoom)); }
  applyAppZoom();
  syncSidebarWidth();
  fitBacklogColumnsToWindow();
}
function appZoomOptionsHtml(): string {
  let html = "";
  const options: number[] = [];
  for (let value = APP_ZOOM_MIN; value <= APP_ZOOM_MAX + 0.001; value += APP_ZOOM_STEP) options.push(Math.round(value * 100) / 100);
  options.push(1.25);
  for (const rounded of options.sort((a, b) => a - b)) {
    html += '<option value="' + rounded + '">' + Math.round(rounded * 100) + '%</option>';
  }
  return html;
}
applyAppZoom();
let appZoomWheelDelta = 0;
document.addEventListener("wheel", (event) => {
  if (!event.ctrlKey) return;
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest(".x6-graph, .asset-diagram-canvas, .work-diagram-canvas")) return; // Diyagram tuvali kendi yakınlaştırmasını yönetir.
  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  if (!delta) return;
  event.preventDefault();
  appZoomWheelDelta += delta;
  if (Math.abs(appZoomWheelDelta) < APP_ZOOM_WHEEL_THRESHOLD) return;
  const direction = appZoomWheelDelta < 0 ? 1 : -1; // Tekerlek yukarı = yakınlaştır.
  const steps = Math.max(1, Math.round(Math.abs(appZoomWheelDelta) / APP_ZOOM_WHEEL_NOTCH));
  appZoomWheelDelta = 0;
  setAppZoom(appZoom + direction * steps * APP_ZOOM_STEP);
}, { passive: false });
document.addEventListener("keydown", (event) => {
  if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
  if (event.code === "Digit0" || event.code === "Numpad0") { event.preventDefault(); setAppZoom(1); return; }
  if (event.code === "Equal" || event.code === "NumpadAdd") { event.preventDefault(); setAppZoom(appZoom + APP_ZOOM_STEP); return; }
  if (event.code === "Minus" || event.code === "NumpadSubtract") { event.preventDefault(); setAppZoom(appZoom - APP_ZOOM_STEP); }
});
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
const save = () => {
  if (unreadableWorkspace !== null) { showWorkspaceRecovery(); return false; }
  try {
    syncProjectIds(state);
    syncMemberIds(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    recordWorkDiagramSnapshot();
    document.getElementById("workspace-save-error")?.remove();
    pendingSaveFailureToast = false;
    return true;
  } catch {
    recordDiagnostic("storage", "");
    pendingSaveFailureToast = true;
    showWorkspaceSaveError();
    return false;
  }
};

function showWorkspaceSaveError(): void {
  if (document.getElementById("workspace-save-error")) return;
  const banner = document.createElement("div");
  banner.id = "workspace-save-error";
  banner.setAttribute("role", "alert");
  banner.innerHTML = '<strong>Çalışma alanı kaydedilemedi.</strong><p>Yeni değişiklikler uygulama kapanırsa kaybolabilir. Depolama alanını kontrol edin.</p><div><button type="button" class="button button-secondary" data-save-retry>Yeniden dene</button><button type="button" class="button button-secondary" data-save-backup>Yedek oluştur</button></div>';
  banner.querySelector("[data-save-retry]")?.addEventListener("click", () => { if (save()) toast("Çalışma alanı kaydedildi."); });
  banner.querySelector("[data-save-backup]")?.addEventListener("click", () => { void exportWorkspaceBackup(); });
  document.body.append(banner);
}

function showWorkspaceRecovery(): void {
  if (unreadableWorkspace === null || document.getElementById("workspace-recovery")) return;
  const overlay = document.createElement("div");
  overlay.id = "workspace-recovery";
  overlay.setAttribute("role", "alertdialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "workspace-recovery-title");
  overlay.innerHTML = '<section><h2 id="workspace-recovery-title">Çalışma alanı okunamadı</h2><p>Kayıtlı veri korunuyor. Aşağıdaki ham içeriği kaydedebilir veya geçerli bir Rota yedeği yükleyebilirsiniz.</p><label>Korunan veri<textarea readonly aria-label="Korunan çalışma alanı verisi"></textarea></label><button type="button" class="button button-secondary" data-action="recovery-copy">Veriyi kopyala</button><button type="button" class="button button-secondary" data-action="recovery-export">Ham veriyi dosyaya kaydet</button><button type="button" class="button button-primary" data-action="recovery-restore">Yedekten geri yükle</button><p id="workspace-recovery-message" role="status"></p></section>';
  overlay.querySelector("textarea")!.value = unreadableWorkspace;
  overlay.addEventListener("click", async (event) => {
    const action = (event.target as Element).closest<HTMLElement>("[data-action]")?.dataset.action;
    const message = overlay.querySelector<HTMLElement>("#workspace-recovery-message")!;
    if (action === "recovery-copy") {
      try { await navigator.clipboard.writeText(unreadableWorkspace || ""); message.textContent = "Veri panoya kopyalandı."; }
      catch { overlay.querySelector("textarea")!.select(); message.textContent = "Metin seçildi; Ctrl+C ile kopyalayın."; }
    } else if (action === "recovery-export") {
      try { const path = await desktop.exportUnreadableWorkspace(unreadableWorkspace || ""); if (path) message.textContent = "Ham veri kaydedildi: " + path; }
      catch (error) { message.textContent = error instanceof Error ? error.message : "Ham veri kaydedilemedi."; }
    } else if (action === "recovery-restore") {
      await restoreWorkspaceBackup();
    }
  });
  document.body.append(overlay);
  overlay.querySelector<HTMLButtonElement>("button")?.focus();
}
const itemById = (id: string): WorkItem | undefined => state.items.find((item) => item.id === id);
const PRODUCT_STAGES: ProductStage[] = ["Fikirler", "Keşif", "Sırada", "Planlandı", "Teslimatta", "Tamamlandı"];
function roadmapNodeOptions(selected = ""): string {
  return '<option value="">Hedefe bağlanmadı</option>' + state.roadmap.map((node) => '<option value="' + esc(node.id) + '" ' + (node.id === selected ? "selected" : "") + '>' + esc(node.type + " · " + node.title) + '</option>').join("");
}

function productStageOptions(selected: ProductStage = "Sırada"): string {
  return PRODUCT_STAGES.map((stage) => '<option ' + (stage === selected ? "selected" : "") + '>' + esc(stage) + '</option>').join("");
}

function roadmapTimelineBar(node: RoadmapNode): string {
  if (!node.startDate && !node.targetDate) return '<div class="roadmap-timeline-note">' + icon("calendar") + 'Tarih planlanmadı</div>';
  const rangeStart = new Date(); rangeStart.setDate(1); rangeStart.setHours(0, 0, 0, 0);
  const rangeEnd = new Date(rangeStart); rangeEnd.setMonth(rangeEnd.getMonth() + 6);
  const total = rangeEnd.getTime() - rangeStart.getTime();
  const start = new Date((node.startDate || node.targetDate!) + "T00:00:00").getTime();
  const end = new Date((node.targetDate || node.startDate!) + "T00:00:00").getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return '<div class="roadmap-timeline-note">Tarih aralığını kontrol et</div>';
  if (end < rangeStart.getTime() || start >= rangeEnd.getTime()) return '<div class="roadmap-timeline-note">' + icon("calendar") + 'Görünür dönemin dışında</div>';
  const left = Math.max(0, Math.min(99, (start - rangeStart.getTime()) / total * 100));
  const right = Math.max(left, Math.min(100, (end - rangeStart.getTime()) / total * 100));
  const months = Array.from({ length: 6 }, (_, index) => { const date = new Date(rangeStart); date.setMonth(date.getMonth() + index); return '<span>' + esc(date.toLocaleDateString("tr-TR", { month: "short" })) + '</span>'; }).join("");
  return '<div class="roadmap-timeline" aria-label="Altı aylık zaman çizelgesi"><div class="roadmap-month-axis">' + months + '</div><div class="roadmap-timeline-track"><i style="left:' + left.toFixed(2) + '%;width:' + Math.max(.5, right - left).toFixed(2) + '%"></i></div></div>';
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
  const occurredAt = new Date().toISOString();
  if (kind === "created" && !item.statusEnteredAt) item.statusEnteredAt = occurredAt;
  item.activity.unshift({ id: nextId("ACT"), kind, message, actor: state.profile.userName || "PO", occurredAt });
}

function statusAgeDays(item: WorkItem): number | null {
  if (!item.statusEnteredAt) return null;
  const entered = Date.parse(item.statusEnteredAt);
  return Number.isFinite(entered) ? Math.max(0, Math.floor((Date.now() - entered) / 86400000)) : null;
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
  refreshItemBackground();
  openWorkspaceShelf("questions");
}

function checkFollowUpReminders(): void {
  const now = Date.now();
  const tasks = state.tasks.filter((task) => !task.done && task.remindAt && !task.remindedAt && Date.parse(task.remindAt) <= now);
  const blockers = state.items.filter((item) => item.status === "Bloke" && item.blocker?.followUpAt && !item.blocker.remindedAt && Date.parse(item.blocker.followUpAt) <= now);
  if (!tasks.length && !blockers.length) return;
  const remindedAt = new Date().toISOString();
  tasks.forEach((task) => { task.remindedAt = remindedAt; });
  blockers.forEach((item) => { item.blocker!.remindedAt = remindedAt; });
  save();
  toast("Takip zamanı geldi: " + [...tasks.map((task) => task.title), ...blockers.map((item) => item.id + " · " + item.title)].slice(0, 3).join("; "));
}

function archiveMatches(value: string): boolean { const terms = archiveQuery.trim().toLocaleLowerCase("tr-TR").split(/\s+/).filter(Boolean); const normalized = value.toLocaleLowerCase("tr-TR"); return !terms.length || terms.every((term) => normalized.includes(term)); }

function renderArchiveSearch(): void {
  const items = state.items.filter((item) => item.archived && archiveMatches([item.id, item.title, item.description, item.project, item.area, (item.labels || []).join(" ")].join(" ")));
  const projects = state.projects.filter((project) => project.archived && archiveMatches(project.name));
  const releases = state.releases.filter((release) => release.archived && archiveMatches([release.id, release.name, release.project, release.description, release.releaseNotes].join(" ")));
  root.innerHTML = '<div class="page-content archive-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>GEÇMİŞ KAYITLAR</div><h1>Arşivde ara</h1><p>Arşivlenmiş işleri, projeleri ve release’leri tek aramada bul; gerektiğinde geri al.</p></div></section><label class="filter-search archive-search"><span class="search-glyph">' + icon("search") + '</span><input id="archive-search" type="search" placeholder="Başlık, ID, proje veya açıklamada ara…" value="' + esc(archiveQuery) + '"></label><div class="archive-result-count">' + (items.length + projects.length + releases.length) + ' sonuç</div><div class="archive-results">' + (items.length ? '<section><h2>Backlog işleri</h2>' + items.map((item) => '<article><button type="button" data-open-item="' + esc(item.id) + '"><strong>' + esc(item.id + " · " + item.title) + '</strong><small>' + esc(item.project + " · " + item.status) + '</small></button><button type="button" class="button button-secondary button-small" data-action="restore-item" data-id="' + esc(item.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (projects.length ? '<section><h2>Projeler</h2>' + projects.map((project) => '<article><div><strong>' + esc(project.name) + '</strong><small>Arşivlenmiş proje · ' + state.items.filter((item) => item.project === project.name).length + ' iş</small></div><button type="button" class="button button-secondary button-small" data-action="restore-project" data-id="' + esc(project.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (releases.length ? '<section><h2>Release’ler</h2>' + releases.map((release) => '<article><button type="button" data-action="edit-release" data-id="' + esc(release.id) + '"><strong>' + esc(release.name) + '</strong><small>' + esc(release.project + " · " + release.status) + '</small></button><button type="button" class="button button-secondary button-small" data-action="restore-release" data-id="' + esc(release.id) + '">Arşivden çıkar</button></article>').join("") + '</section>' : '') + (items.length + projects.length + releases.length ? '' : '<div class="empty-state">' + (archiveQuery ? "Arşivde eşleşen kayıt bulunamadı." : "Henüz arşivlenmiş iş, proje veya release yok.") + '</div>') + '</div></div>';
}

function openQuestionForm(questionId?: string): void {
  const question = state.openQuestions?.find((entry) => entry.id === questionId);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">ÜRÜN KARARI</div><h2>' + (question ? "Açık soruyu düzenle" : "Açık soru ekle") + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="open-question-form" class="settings-form"><label class="field-label">Soru / karar konusu<textarea class="field-input field-textarea" name="text" rows="3" maxlength="1500" required placeholder="Örn. FAST ticari müşteri günlük limiti hangi tutar olacak?">' + esc(question?.text || "") + '</textarea></label><div class="form-two-col"><label class="field-label">Yanıt sahibi<input class="field-input" name="owner" maxlength="100" placeholder="Kişi veya ekip" value="' + esc(question?.owner || "") + '"></label><label class="field-label">Beklenen yanıt tarihi<input class="field-input" name="expectedAt" type="date" value="' + esc(question?.expectedAt || "") + '"></label></div><label class="field-label">İlişkili backlog işi<select class="field-input" name="linkedItemId"><option value="">Bağımsız soru</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === question?.linkedItemId ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label><input type="hidden" name="id" value="' + esc(question?.id || "") + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">' + (question ? "Değişiklikleri kaydet" : "Soruyu kaydet") + '</button></footer></form></section></div>';
  if (question) addRecordCopyAction("question", question.id);
}

function openQuestionAnswerForm(questionId: string): void {
  const question = state.openQuestions?.find((entry) => entry.id === questionId);
  if (!question) return;
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal question-answer-modal" role="dialog" aria-modal="true" aria-labelledby="question-answer-title"><header class="modal-header"><div><div class="panel-kicker">YANIT BEKLEYEN KONU</div><h2 id="question-answer-title">Yanıtı kaydet</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><div class="question-answer-context"><span class="question-status open">' + esc(question.owner) + ' · ' + esc(question.expectedAt || "Tarih belirlenmedi") + '</span><p>' + esc(question.text) + '</p></div><form id="open-question-answer-form" class="settings-form"><label class="field-label">Yanıt / alınan karar<textarea class="field-input field-textarea" name="answer" rows="5" maxlength="3000" required autofocus placeholder="Kararı, yanıtı ve varsa önemli koşulları yaz…">' + esc(question.answer || "") + '</textarea><small>Kaydedince bu kayıt Yanıtlandı durumuna geçer.</small></label><input type="hidden" name="id" value="' + esc(question.id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Yanıtı kaydet</button></footer></form></section></div>';
  addRecordCopyAction("question", question.id);
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

function applyWorkStatus(item: WorkItem, status: WorkItem["status"], blocker?: Pick<WorkBlocker, "reason" | "nextStep" | "expectedAction" | "owner" | "followUpAt">, updateNote = ""): boolean {
  const previous = item.status;
  if (previous === status) {
    if (status === "Bloke" && blocker && (item.blocker?.reason !== blocker.reason || item.blocker?.nextStep !== blocker.nextStep || item.blocker?.expectedAction !== blocker.expectedAction || item.blocker?.owner !== blocker.owner || item.blocker?.followUpAt !== blocker.followUpAt)) {
      item.blocker = { ...blocker, openedAt: item.blocker?.openedAt || new Date().toISOString() };
      addWorkActivity(item, "change", "Blokaj bilgisi güncellendi: " + blocker.reason + " · Beklenen: " + (blocker.expectedAction || "belirtilmedi") + " · Sonraki adım: " + blocker.nextStep + " · Takip sahibi: " + blocker.owner);
    }
    return true;
  }
  item.status = status;
  logWorkChange(item, "Durum", previous, status);
  const now = new Date().toISOString();
  if (item.statusEnteredAt) (item.statusHistory ||= []).push({ status: previous, enteredAt: item.statusEnteredAt, leftAt: now });
  item.statusEnteredAt = now;
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
  return true;
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
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6ZM9 3v15M15 6v15"/>',
    maximize: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    minimize: '<path d="M3 8h5V3m8 0v5h5M8 21v-5H3m13 5v-5h5"/>',
    inventory: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    diagram: '<rect x="8" y="3" width="8" height="5" rx="1"/><rect x="2" y="16" width="7" height="5" rx="1"/><rect x="15" y="16" width="7" height="5" rx="1"/><path d="M12 8v4M5.5 16v-4h13v4"/>',
    folder: '<path d="M3 7V5h6l2 2h10v13H3V7Z"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>',
    pin: '<path d="m15 3 6 6-4 1-3 5-2-2-5 5-1-1 5-5-2-2 5-3 1-4Z"/>',
    focus: '<path d="M8 3H4a1 1 0 0 0-1 1v4m13-5h4a1 1 0 0 1 1 1v4M3 16v4a1 1 0 0 0 1 1h4m8 0h4a1 1 0 0 0 1-1v-4"/><circle cx="12" cy="12" r="4"/>',
    story: '<path d="M5 3.5h9l5 5v12H5z"/><path d="M14 3.5v5h5M8 13h8M8 16.5h6"/>',
    bug: '<path d="M8 8h8a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6a2 2 0 0 1 2-2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M4 12h4m8 0h4M4 17h4m8 0h4M8 3 6.5 1.5M16 3l1.5-1.5"/>',
    task: '<path d="m5 12 4 4L19 6"/><path d="M4 4h4M4 20h4"/>',
    note: '<path d="M5 3.5h14v17H5z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/>',
    edit: '<path d="m14 5 5 5M4 20l4.3-.9L19 8.4 15.6 5 4.9 15.7 4 20Z"/>',
    duplicate: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    delete: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    add: '<path d="M12 5v14M5 12h14"/>',
    archive: '<path d="M4 8h16v12H4zM3 4h18v4H3zM9 12h6"/>',
    restore: '<path d="M5 8v5h5"/><path d="M6.5 18a8 8 0 1 0-.8-9.2L5 13"/>',
    undo: '<path d="M9 7 4 12l5 5"/><path d="M5 12h8a7 7 0 0 1 7 7"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2.9-1.2 1.8M12 17h.01"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    board: '<rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M9.5 4v16M15 4v16"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    chevronDown: '<path d="m7 10 5 5 5-5"/>',
    chevronLeft: '<path d="m14 6-6 6 6 6"/>',
    chevronRight: '<path d="m10 6 6 6-6 6"/>',
    merge: '<path d="M5 4v4a4 4 0 0 0 4 4h10M5 20v-4a4 4 0 0 1 4-4m6-4 4 4-4 4"/>',
    arrowUp: '<path d="M12 19V5m-6 6 6-6 6 6"/>',
    chevronUp: '<path d="m7 14 5-5 5 5"/>',
    sort: '<path d="m8.5 9.5 3.5-3.5 3.5 3.5M8.5 14.5l3.5 3.5 3.5-3.5"/>'
  };
  return '<svg viewBox="0 0 24 24" aria-hidden="true" class="svg-icon">' + (paths[name] || paths.story) + "</svg>";
};

const ICON_ONLY_ACTIONS = [
  { selector: ".modal-close", icon: "close", label: "Pencereyi kapat" },
  { selector: ".tiny-plus", icon: "add", label: "Yeni proje oluştur" },
  { selector: ".round-add", icon: "add", label: "Yeni kayıt oluştur" },
  { selector: ".inline-edit-button, .decision-edit", icon: "edit", label: "Düzenle" },
  { selector: ".inline-icon-confirm", icon: "check", label: "Kaydet" },
  { selector: ".inline-icon-dismiss", icon: "close", label: "İptal et" },
  { selector: ".inline-icon-remove, .relationship-remove, .remove-file, .team-member-remove, .team-settings-delete, .team-member-remove-dashboard, .quick-delete-button", icon: "delete", label: "Sil" },
  { selector: ".help-button", icon: "help", label: "Klavye kısayollarını göster" },
  { selector: ".dots-button", icon: "more", label: "Diğer seçenekler" }
] as const;

function enhanceActionControls(scope: ParentNode = document): void {
  ICON_ONLY_ACTIONS.forEach((definition) => {
    const buttons = [...scope.querySelectorAll<HTMLButtonElement>(definition.selector)];
    if (scope instanceof HTMLButtonElement && scope.matches(definition.selector)) buttons.unshift(scope);
    buttons.forEach((button) => {
      const label = button.getAttribute("aria-label") || button.title || definition.label;
      button.classList.add("icon-action");
      button.setAttribute("aria-label", label);
      button.dataset.tooltip = label;
      button.removeAttribute("title");
      if (!button.querySelector(".svg-icon")) button.innerHTML = icon(definition.icon);
    });
  });

  const leadingIcons = [
    { selector: 'button[data-action="new"], button[data-action="new-asset"], button[data-action="new-decision"], button[data-action="new-open-question"], button[data-action="new-team"], button[data-action="create-release"], button[data-action="create-roadmap"]', icon: "add" },
    { selector: 'button[data-action="archive-item"], button[data-action="archive-release"]', icon: "archive" },
    { selector: 'button[data-action^="restore-"]', icon: "restore" },
    { selector: ".toast-undo-button", icon: "undo" }
  ] as const;
  leadingIcons.forEach((definition) => {
    const buttons = [...scope.querySelectorAll<HTMLButtonElement>(definition.selector)];
    if (scope instanceof HTMLButtonElement && scope.matches(definition.selector)) buttons.unshift(scope);
    buttons.forEach((button) => {
      if (definition.icon === "add" && button.matches(".button-primary:not(.button-small)")) button.classList.add("create-button");
      if (button.querySelector(":scope > .action-leading-icon") || button.classList.contains("icon-action")) return;
      button.querySelector(":scope > .button-plus")?.remove();
      const firstText = [...button.childNodes].find((node) => node.nodeType === 3 && node.textContent?.trim());
      if (firstText?.textContent) firstText.textContent = firstText.textContent.replace(/^\s*[+＋]\s*/, " ");
      button.insertAdjacentHTML("afterbegin", '<span class="action-leading-icon" aria-hidden="true">' + icon(definition.icon) + "</span>");
    });
  });
}
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
  if (pendingSaveFailureToast) { message = "Çalışma alanı kaydedilemedi. Yeniden deneyin veya yedek oluşturun."; pendingSaveFailureToast = false; }
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

function startMeetingStage(): void {
  const ids = sortBacklogItems(getSelectedBacklogItems()).map((item) => item.id);
  if (!ids.length) return;
  meetingStage = {
    ids, currentId: ids[0], projectId: activeProjectId, viewId: activeBacklogViewId,
    drafts: new Map(), closingTopics: new Map(), showClosing: false
  };
  setView("meetings");
  root.querySelector<HTMLElement>("#meeting-stage-topic")?.focus();
}

function meetingStageItems(): WorkItem[] {
  return (meetingStage?.ids || []).flatMap((id) => {
    const item = itemById(id);
    return item && !item.archived ? [item] : [];
  });
}

function endMeetingStage(): void {
  const stage = meetingStage;
  if (!stage) return;
  meetingStage = null;
  setView("backlog");
  activeProjectId = state.projects.some((project) => project.id === stage.projectId && !project.archived) ? stage.projectId : null;
  activeBacklogViewId = stage.viewId;
  if (activeProjectId) {
    document.querySelector('.nav-item[data-view="backlog"]')?.classList.remove("active");
    document.getElementById("breadcrumb-current")!.textContent = state.projects.find((project) => project.id === activeProjectId)!.name;
  }
  render();
  root.querySelector<HTMLElement>('[data-action="start-meeting-stage"]:not([hidden])')?.focus();
}

function stepMeetingStage(offset: number): void {
  if (!meetingStage) return;
  const items = meetingStageItems();
  const index = items.findIndex((item) => item.id === meetingStage?.currentId);
  const next = items[index + offset];
  if (!next) return;
  meetingStage.currentId = next.id;
  renderMeetingStage(true);
}

function meetingClosingGroups(stage: NonNullable<typeof meetingStage>) {
  return stage.ids.flatMap((id) => {
    const topic = stage.closingTopics.get(id);
    if (!topic) return [];
    const sections = Object.entries(meetingClosingLabels).flatMap(([kind, label]) => {
      const entries = topic.entries[kind as PoMeetingKind];
      return entries.length ? [{ label, entries }] : [];
    });
    return [{ title: id + " · " + topic.title, sections }];
  });
}

function renderMeetingClosing(stage: NonNullable<typeof meetingStage>): void {
  const groups = meetingClosingGroups(stage);
  root.innerHTML = `<div class="page-content po-page meeting-stage" data-scroll-layout="ready">
    <header class="meeting-stage-heading"><div><p class="panel-kicker">TOPLANTI MODU</p><h1 id="meeting-closing-title" tabindex="-1">Toplantı kapanış kartı</h1></div>
      <div class="meeting-stage-actions">
        <button type="button" class="button button-secondary" data-action="meeting-stage-resume">Gündeme dön</button>
        <button type="button" class="button button-secondary" data-action="end-meeting-stage">Backlog’a dön</button>
      </div>
    </header>
    <article class="meeting-stage-card meeting-closing-card" aria-labelledby="meeting-closing-title">
      <div class="meeting-stage-body" tabindex="0" aria-label="Toplantı çıktıları">
        ${groups.map(({ title, sections }) => `<section class="meeting-closing-topic">
          <h2>${esc(title)}</h2>
          ${sections.map(({ label, entries }) => `<div><h3>${label}</h3><ul>${entries.map((entry) => `<li>${esc(entry)}</li>`).join("")}</ul></div>`).join("")}
        </section>`).join("") || "<p>Bu oturumda henüz karar, açık soru veya görev eklenmedi.</p>"}
      </div>
      <footer class="po-meeting-footer"><button type="button" class="button button-primary button-small" data-action="copy-meeting-closing" ${groups.length ? "" : "disabled"}>Özeti kopyala</button></footer>
    </article></div>`;
}

async function copyMeetingClosing(): Promise<void> {
  if (!meetingStage?.showClosing) return;
  const groups = meetingClosingGroups(meetingStage);
  if (!groups.length) return;
  const text = ["Toplantı özeti", ...groups.map(({ title, sections }) =>
    [title, ...sections.map(({ label, entries }) =>
      [label, ...entries.map((entry) => "• " + entry.replaceAll("\n", "\n  "))].join("\n")
    )].join("\n\n")
  )].join("\n\n");
  try {
    await navigator.clipboard.writeText(text);
    toast("Toplantı özeti panoya kopyalandı.");
  } catch {
    toast("Toplantı özeti panoya kopyalanamadı.");
  }
}

function renderMeetingStage(focusTopic = false): void {
  if (!meetingStage) return;
  if (meetingStage.showClosing) { renderMeetingClosing(meetingStage); return; }
  const items = meetingStageItems();
  const index = Math.max(0, items.findIndex((item) => item.id === meetingStage?.currentId));
  const item = items[index];
  const draft = meetingStage.drafts.get(item?.id || "");
  const agenda = items.map((entry, position) => `<li><button type="button" data-action="meeting-stage-item" data-id="${esc(entry.id)}" ${entry.id === item?.id ? 'aria-current="step"' : ''}><span class="meeting-stage-number">${position + 1}</span><span><small>${esc(entry.id)}</small><strong>${esc(entry.title)}</strong></span></button></li>`).join("");
  const decisions = item ? (state.decisions || []).filter((decision) => decision.workItemIds?.includes(item.id)) : [];
  const questions = item ? (state.openQuestions || []).filter((question) => question.linkedItemId === item.id) : [];
  const tasks = item ? state.tasks.filter((task) => task.linked === item.id) : [];
  const notes = item ? state.notes.filter((note) => note.linked === item.id) : [];
  const records = [
    ...decisions.map((decision) => ({ kind: "Karar", text: decision.rationale?.startsWith(decision.title) ? decision.rationale : [decision.title, decision.rationale].filter(Boolean).join("\n"), id: decision.id })),
    ...questions.map((question) => ({ kind: "Soru", text: question.text, id: question.id })),
    ...tasks.map((task) => ({ kind: "Görev", text: task.description || task.title, id: task.id })),
    ...notes.map((note) => ({ kind: "Not", text: note.body || note.title, id: note.id }))
  ];
  const topic = item ? `
    <div class="meeting-stage-topic-header"><p class="panel-kicker">${esc(item.id)} · ${esc(item.project)} · ${esc(item.type)}</p>
      <h2 id="meeting-stage-topic" tabindex="-1">${esc(item.title)}</h2>
      <p class="meeting-stage-meta">${esc(item.status)} · ${esc(assigneeSummary(item))}</p></div>
    <div class="meeting-stage-body" tabindex="0" aria-label="İş içeriği">
      <section><h3>Açıklama</h3>${item.description ? structuredTextMarkup(item.description) : '<p>Açıklama eklenmemiş.</p>'}</section>
      <section><h3>Kabul kriterleri</h3>${item.acceptance.length ? '<ul>' + item.acceptance.map((criterion) => '<li>' + esc(criterion) + '</li>').join("") + '</ul>' : '<p>Kabul kriteri eklenmemiş.</p>'}</section>
      ${records.length ? '<section class="meeting-stage-records"><h3>Bağlı kayıtlar</h3><ul>' + records.map(({ kind, text, id }) => '<li data-stage-record="' + esc(id) + '"><strong>' + kind + '</strong><span>' + esc(text) + '</span></li>').join("") + '</ul></section>' : ''}
    </div>` : '<div class="meeting-stage-body"><p>Gündemde görüntülenebilecek iş kalmadı.</p></div>';
  if (item) meetingStage.currentId = item.id;
  const agendaScroll = root.querySelector(".meeting-stage-agenda ol")?.scrollTop || 0;
  root.innerHTML = `<div class="page-content po-page meeting-stage" data-scroll-layout="ready">
    <header class="meeting-stage-heading"><div><p class="panel-kicker">TOPLANTI MODU</p><h1>Toplantı sahnesi</h1></div>
      <div class="meeting-stage-actions">
        <button type="button" class="button button-primary" data-action="meeting-stage-close">Kapanış kartı</button>
        <button type="button" class="button button-secondary" data-action="end-meeting-stage">Backlog’a dön</button>
      </div></header>
    <div class="meeting-stage-layout">
      <nav class="meeting-stage-agenda" aria-label="Toplantı gündemi"><h2>Gündem <span>${items.length}</span></h2><ol>${agenda}</ol></nav>
      <article class="meeting-stage-card">${topic}
        ${item ? `<form id="meeting-stage-record-form" class="meeting-stage-composer" data-item-id="${esc(item.id)}">
          <div class="meeting-stage-composer-bar">
            <div class="meeting-stage-kinds" role="group" aria-label="Kayıt türü">
              <span class="meeting-stage-kind-indicator" aria-hidden="true"></span>
              ${Object.entries(meetingStageRecordLabels).map(([kind, label]) =>
                '<label><input type="radio" name="kind" value="' + kind + '" ' + (kind === (draft?.kind || "note") ? 'checked' : '') + '><span>' + label + '</span></label>').join("")}
            </div>
            <div class="meeting-stage-nav" role="group" aria-label="Gündemde gezin">
              <button type="button" data-action="meeting-stage-prev" title="Önceki iş (←)" aria-label="Önceki iş" ${index === 0 ? 'disabled' : ''}>${icon("chevronLeft")}</button>
              <span title="Gündemde ${index + 1} / ${items.length}">${esc(item.id)}</span>
              <button type="button" data-action="meeting-stage-next" title="Sonraki iş (→)" aria-label="Sonraki iş" ${index + 1 === items.length ? 'disabled' : ''}>${icon("chevronRight")}</button>
            </div>
          </div>
          <div class="workspace-message-input">
            <textarea name="text" rows="1" aria-label="Hızlı toplantı kaydı" placeholder="${esc(item.id)} için bir mesaj yaz…" maxlength="1500">${esc(draft?.text || "")}</textarea>
            <button type="submit" aria-label="Gönder" title="Gönder (Enter)" ${draft?.text.trim() ? '' : 'disabled'}>${icon("arrowUp")}</button>
          </div>
        </form>` : ''}
      </article>
    </div></div>`;
  root.querySelector(".meeting-stage-agenda ol")!.scrollTop = agendaScroll;
  root.querySelector('[aria-current="step"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
  const message = root.querySelector<HTMLTextAreaElement>("#meeting-stage-record-form textarea");
  if (message) resizeWorkspaceMessage(message);
  if (focusTopic) root.querySelector<HTMLElement>("#meeting-stage-topic")?.focus({ preventScroll: true });
}

root.addEventListener("keydown", (event) => {
  if (!meetingStage || meetingStage.showClosing || activeView !== "meetings" || modalRoot.children.length || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (!(event.target instanceof Element) || !event.target.closest(".meeting-stage")) return;
  if (event.target instanceof HTMLTextAreaElement && event.target.form?.id === "meeting-stage-record-form" && event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    event.target.form.requestSubmit();
    return;
  }
  if (event.target.closest("input, select, textarea, [contenteditable]")) return;
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  stepMeetingStage(event.key === "ArrowRight" ? 1 : -1);
});

function meetingStageDraft(form: HTMLFormElement) {
  const data = new FormData(form);
  const kind = String(data.get("kind")) as MeetingStageRecordKind;
  if (!Object.hasOwn(meetingStageRecordLabels, kind)) return;
  return { kind, text: String(data.get("text") || "") };
}

root.addEventListener("input", (event) => {
  if (!(event.target instanceof Element)) return;
  const form = event.target.closest<HTMLFormElement>("#meeting-stage-record-form");
  if (!form || !meetingStage || !form.dataset.itemId) return;
  const draft = meetingStageDraft(form);
  if (!draft) return;
  meetingStage.drafts.set(form.dataset.itemId, draft);
  if (event.target instanceof HTMLTextAreaElement) {
    resizeWorkspaceMessage(event.target);
    form.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled = !draft.text.trim();
  }
});

function submitMeetingStageRecord(form: HTMLFormElement): void {
  if (!meetingStage || activeView !== "meetings" || meetingStage.currentId !== form.dataset.itemId) return;
  const item = itemById(meetingStage.currentId);
  const draft = meetingStageDraft(form);
  const text = draft?.text.trim();
  if (!item || item.archived || !draft || !text) return;
  const origin = form.querySelector("textarea")!.getBoundingClientRect();
  const bodyScroll = root.querySelector(".meeting-stage-body")?.scrollTop || 0;
  const id = poTools.saveStageRecord(draft.kind, text, item);
  if (!id) return;
  if (draft.kind !== "note") {
    const topic = meetingStage.closingTopics.get(item.id) || {
      title: item.title, entries: { decision: [], question: [], task: [] }
    };
    topic.entries[draft.kind].push(text);
    meetingStage.closingTopics.set(item.id, topic);
  }
  meetingStage.drafts.set(item.id, { kind: draft.kind, text: "" });
  render();
  const body = root.querySelector<HTMLElement>(".meeting-stage-body");
  if (body) body.scrollTop = bodyScroll;
  root.querySelector<HTMLTextAreaElement>("#meeting-stage-record-form textarea")?.focus({ preventScroll: true });
  const entry = body?.querySelector<HTMLElement>('[data-stage-record="' + CSS.escape(id) + '"]');
  if (body && entry) {
    const target = entry.getBoundingClientRect();
    const viewport = body.getBoundingClientRect();
    const x = target.left + target.width / 2;
    const y = target.top + Math.min(target.height / 2, 20);
    if (target.width && target.height && x >= viewport.left && x <= viewport.right &&
        y >= Math.max(0, viewport.top) && y <= Math.min(window.innerHeight, viewport.bottom)) {
      animateRecordArrival(origin, x, y, text, entry, 180);
    }
  }
  toast(meetingStageRecordLabels[draft.kind] + " kaydedildi.");
}

function setView(view: string): void {
  if (view === "questions") { openWorkspaceShelf("questions"); return; }
  if (view === "focus") { setView("overview"); openWorkspaceShelf("tasks"); return; }
  closeWorkspaceShelf(false);
  if (view === "jira" && !state.profile.jiraBaseUrl?.trim()) { toast("Jira devre dışı. Ayarlar › Entegrasyonlar bölümünden Base URL ekle."); return; }
  if (activeView === "assets" && view !== "assets") disposeAssetDiagram();
  activeView = view;
  const navItem = document.querySelector<HTMLElement>('.nav-item[data-view="' + view + '"]');
  const navGroup = navItem?.closest<HTMLDetailsElement>(".nav-group");
  if (navGroup && !navGroup.open) { navGroup.open = true; saveSidebarNavGroupPreferences(); }
  activeProjectId = null;
  activeBacklogViewId = "";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
  document.querySelector<HTMLElement>(".workspace-switcher")?.classList.toggle("active", view === "overview");
  const names: Record<string, string> = { overview: "Genel bakış", favspace: "Favspace", meetings: "Toplantı modu", "my-actions": "Bana düşenler", backlog: "Backlog", jira: "Jira", assets: "Ürün envanteri", roadmap: "Yol haritası", decisions: "Ürün kararları", releases: "Release planı", questions: "Açık sorular", "archive-search": "Arşivde ara" };
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = names[view] ?? "Genel bakış";
  render();
  animateViewEnter();
}

let viewEnterTimer = 0;
function animateViewEnter(): void {
  window.clearTimeout(viewEnterTimer);
  root.classList.remove("view-enter");
  void root.offsetWidth;
  root.classList.add("view-enter");
  viewEnterTimer = window.setTimeout(() => root.classList.remove("view-enter"), 700);
}

function validJiraBaseUrl(value: string): boolean {
  if (!value.trim()) return true;
  try {
    const url = new URL(value.trim());
    return (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))) && !url.username && !url.password && !url.search && !url.hash;
  } catch { return false; }
}

async function setProject(id: string): Promise<void> {
  const project = state.projects.find((entry) => entry.id === id);
  if (!project || project.archived) return;
  const keepQuery = Boolean(query) && (await appConfirm("Proje değiştirirken mevcut arama metnini koruyayım mı?"));
  activeProjectId = id;
  activeBacklogViewId = "";
  activeView = "backlog";
  if (!keepQuery) query = "";
  const globalSearch = document.getElementById("global-search") as HTMLInputElement | null;
  if (globalSearch) globalSearch.value = keepQuery ? query : "";
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((node) => node.classList.remove("active"));
  (document.getElementById("breadcrumb-current") as HTMLElement).textContent = project.name;
  render();
  animateViewEnter();
}

function renderProjectNav(): void {
  const list = document.querySelector<HTMLElement>(".project-list");
  if (!list) return;
  if (!document.querySelector(".project-nav-search")) list.insertAdjacentHTML("beforebegin", '<label class="project-nav-search"><span class="search-glyph">' + icon("search") + '</span><input id="project-nav-search-input" type="search" placeholder="Proje ara…" aria-label="Projeleri ara"></label>');
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
  if (profileButton) profileButton.innerHTML = '<span class="profile-avatar">' + esc(profile.userName.split(/\\s+/).map((part) => part[0] || "").slice(0, 2).join("").toLocaleUpperCase("tr-TR")) + '<span class="accent-edit" data-tooltip="Vurgu rengini değiştir" aria-hidden="true"><svg viewBox="0 0 24 24" class="svg-icon"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg></span></span><span><strong>' + esc(profile.userName) + '</strong><small>' + esc(profile.userRole) + '</small></span><span class="more">⚙</span>';
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
let activeActionTooltip: HTMLElement | null = null;
let activeActionTooltipAnchor: HTMLElement | null = null;

function closeActionTooltip(): void {
  activeActionTooltip?.remove();
  activeActionTooltipAnchor?.removeAttribute("aria-describedby");
  activeActionTooltip = null;
  activeActionTooltipAnchor = null;
}

function openActionTooltip(anchor: HTMLElement): void {
  const description = anchor.dataset.tooltip || anchor.title;
  if (!description) return;
  closeActionTooltip();
  anchor.dataset.tooltip = description;
  anchor.removeAttribute("title");
  const tooltip = document.createElement("div");
  tooltip.className = "action-tooltip-overlay";
  tooltip.id = "action-tooltip-active";
  tooltip.setAttribute("role", "tooltip");
  tooltip.textContent = description;
  document.body.append(tooltip);
  const rect = anchor.getBoundingClientRect();
  const bounds = tooltip.getBoundingClientRect();
  const left = Math.max(8, Math.min(window.innerWidth - bounds.width - 8, rect.left + rect.width / 2 - bounds.width / 2));
  const sideRight = anchor.dataset.tooltipSide === "right";
  const top = sideRight ? Math.max(8, rect.top + rect.height / 2 - bounds.height / 2) : rect.bottom + bounds.height + 12 < window.innerHeight ? rect.bottom + 8 : Math.max(8, rect.top - bounds.height - 8);
  tooltip.style.left = (sideRight ? (anchor.closest(".sidebar")?.getBoundingClientRect().right ?? rect.right) + 8 : left) + "px";
  tooltip.style.top = top + "px";
  tooltip.classList.toggle("tooltip-right", sideRight);
  anchor.setAttribute("aria-describedby", tooltip.id);
  activeActionTooltip = tooltip;
  activeActionTooltipAnchor = anchor;
}

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
  const actionAnchor = event.target.closest<HTMLElement>("[data-tooltip]");
  if (actionAnchor && actionAnchor !== activeActionTooltipAnchor) openActionTooltip(actionAnchor);
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor !== activeTypeTooltipAnchor) openTypeTooltip(anchor);
});
document.addEventListener("pointerout", (event) => {
  if (!(event.target instanceof Element)) return;
  const actionAnchor = event.target.closest<HTMLElement>("[data-tooltip]");
  if (actionAnchor && actionAnchor === activeActionTooltipAnchor && !(event.relatedTarget instanceof Element && actionAnchor.contains(event.relatedTarget))) closeActionTooltip();
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor === activeTypeTooltipAnchor && !(event.relatedTarget instanceof Element && anchor.contains(event.relatedTarget))) closeTypeTooltip();
});
document.addEventListener("focusin", (event) => {
  if (!(event.target instanceof Element)) return;
  const actionAnchor = event.target.closest<HTMLElement>("[data-tooltip]");
  if (actionAnchor) openActionTooltip(actionAnchor);
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor) openTypeTooltip(anchor);
});
document.addEventListener("focusout", (event) => {
  if (!(event.target instanceof Element)) return;
  const actionAnchor = event.target.closest<HTMLElement>("[data-tooltip]");
  if (actionAnchor && actionAnchor === activeActionTooltipAnchor && !(event.relatedTarget instanceof Element && actionAnchor.contains(event.relatedTarget))) closeActionTooltip();
  const anchor = event.target.closest<HTMLElement>(".type-tooltip-anchor[data-type-tooltip]");
  if (anchor && anchor === activeTypeTooltipAnchor && !(event.relatedTarget instanceof Element && anchor.contains(event.relatedTarget))) closeTypeTooltip();
});
document.addEventListener("scroll", () => { closeTypeTooltip(); closeActionTooltip(); }, true);
window.addEventListener("resize", () => { closeTypeTooltip(); closeActionTooltip(); });

const actionControlObserver = new MutationObserver((records) => {
  records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node instanceof Element) enhanceActionControls(node);
  }));
});
actionControlObserver.observe(document.body, { childList: true, subtree: true });
enhanceActionControls();

function render(): void {
  renderDeskPins();
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
  if (jiraNav) { jiraNav.disabled = !jiraEnabled; jiraNav.title = jiraEnabled ? "Jira Server paneli" : "Jira kapalı · Ayarlar › Entegrasyonlar bölümünden Base URL ekleyin"; jiraNav.classList.toggle("nav-disabled", !jiraEnabled); }
  if (jiraState) jiraState.textContent = jiraEnabled ? "Hazır" : "Kapalı";
  if (activeView === "overview") renderOverview();
  else if (activeView === "meetings") { if (meetingStage) renderMeetingStage(); else poTools.renderMeetings(); }
  else if (activeView === "my-actions") poTools.renderMine();
  else if (activeView === "backlog") renderBacklog();
  else if (activeView === "favspace") renderFavspace(root, state, save, (kind, id) => { if (kind === "notes") showNote(id); else if (kind === "tasks") openTask(id); else if (kind === "items") openItem(id); else if (kind === "assets") openAsset(id); else if (kind === "decisions") openDecisionDetail(id); else if (kind === "releases") openReleaseEditor(id); else if (["roadmap", "meetings"].includes(kind)) setView(kind); else if (state.items.some((item) => item.id === id)) openItem(id); else toast("Kaynak kayıt: " + kind); });
  else if (activeView === "jira") renderJira();
  else if (activeView === "assets") renderAssets();
  else if (activeView === "roadmap") renderRoadmap();
  else if (activeView === "decisions") renderDecisions();
  else if (activeView === "releases") renderReleases();
  else if (activeView === "archive-search") renderArchiveSearch();
  else renderOverview();
  syncWorkspaceToolbar();
}

function renderJira(): void {
  const baseUrl = state.profile.jiraBaseUrl?.trim() || "";
  if (!baseUrl) {
    root.innerHTML = '<div class="page-content jira-page"><div class="page-title-row"><div><div class="eyebrow">ENTEGRASYON</div><h1>Jira</h1><p>Jira Base URL tanımlanmadan entegrasyon devre dışıdır.</p></div></div><section class="panel jira-empty"><div class="jira-empty-icon">◈</div><h2>Jira bağlantısı kapalı</h2><p>Jira adresini ilk kurulumda veya Ayarlar › Entegrasyonlar bölümünde ekleyebilirsin.</p><button class="button button-primary" data-action="open-workspace-settings" data-settings-panel="integrations">Entegrasyon ayarlarını aç</button></section></div>';
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
    (jiraHasSavedToken ? '<section class="panel jira-query-card"><div class="panel-heading"><div><div class="panel-kicker">JIRA VERİSİ</div><h2>Board kayıtları</h2><p>Agile board, backlog veya sprint kayıtlarını canlı sorgula.</p></div></div><div class="jira-query-controls"><label class="field-label">Agile board<select id="jira-board-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '>' + boardOptions + '</select></label><label class="field-label">Kapsam<select id="jira-scope-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '><option value="backlog" ' + (jiraIssueScope === "backlog" ? "selected" : "") + '>Backlog</option><option value="board" ' + (jiraIssueScope === "board" ? "selected" : "") + '>Board işleri</option><option value="sprint" ' + (jiraIssueScope === "sprint" ? "selected" : "") + '>Sprint</option></select></label>' + (jiraIssueScope === "sprint" ? '<label class="field-label">Sprint<select id="jira-sprint-select" class="field-input" ' + (jiraLoading ? "disabled" : "") + '>' + sprintOptions + '</select></label>' : '') + '<button class="button button-primary" data-action="jira-fetch-issues" ' + (jiraLoading || !jiraSelectedBoardId || (jiraIssueScope === "sprint" && !jiraSelectedSprintId) ? "disabled" : "") + '>Kayıtları getir</button></div><p class="jira-hint">Kayıtlar 100 kayıtlık sayfalar halinde yüklenir. Sprint listesinde aktif, gelecek ve tamamlanmış sprintler bulunur.</p>' +
      (jiraError ? '<div class="jira-error" role="alert">' + esc(jiraError) + '</div>' : "") +
      '<div class="jira-results-heading"><strong>' + (jiraIssues.length ? jiraIssues.length + (jiraIssueTotal !== undefined ? ' / ' + jiraIssueTotal : '') + " kayıt" : "Kayıt listesi") + '</strong><span>' + (jiraLastSuccessAt ? "Son başarılı sorgu: " + new Date(jiraLastSuccessAt).toLocaleString("tr-TR") : "Henüz Jira kaydı getirilmedi") + '</span></div><div class="jira-table-wrap"><table class="jira-table"><thead><tr><th>ANAHTAR</th><th>BAŞLIK</th><th>TÜR</th><th>DURUM</th><th>ÖNCELİK</th><th>ATANAN</th><th>GÜNCELLENDİ</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7" class="jira-table-empty">' + (jiraLoading ? "Jira’dan kayıtlar alınıyor…" : "Bir board ve kayıt kapsamı seçip getir.") + '</td></tr>') + '</tbody></table></div>' + (jiraHasMoreIssues ? '<button type="button" class="button button-secondary jira-load-more" data-action="jira-load-more" ' + (jiraLoading ? 'disabled' : '') + '>Sonraki 100 kaydı getir</button>' : '') + '</section>' +
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
  jiraCatalogLoadedFor = ""; clearJiraIssueResults(); jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; await loadJiraCatalog();
}

async function fetchJiraIssues(reset = true): Promise<void> {
  if (!state.profile.jiraBaseUrl || !jiraSelectedBoardId || (jiraIssueScope === "sprint" && !jiraSelectedSprintId)) return;
  const startAt = reset ? 0 : jiraIssues.length;
  jiraLoading = true; jiraError = ""; renderJira();
  try {
    const page = await desktop.jiraFetchBoardIssues(state.profile.jiraBaseUrl, jiraSelectedBoardId, jiraIssueScope, jiraSelectedSprintId || undefined, startAt);
    jiraIssues = startAt ? [...jiraIssues, ...page.issues.filter((issue) => !jiraIssues.some((old) => old.key === issue.key))] : page.issues;
    jiraIssueTotal = page.total;
    jiraHasMoreIssues = page.hasMore && page.issues.length > 0;
    jiraLastSuccessAt = new Date().toISOString();
  }
  catch (error) { jiraError = error instanceof Error ? error.message : "Jira kayıtları alınamadı."; }
  finally { jiraLoading = false; renderJira(); }
}

async function loadJiraBoardDetails(): Promise<void> {
  if (!state.profile.jiraBaseUrl || !jiraSelectedBoardId) return;
  jiraLoading = true; jiraError = ""; clearJiraIssueResults(); renderJira();
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
  const okay = (await appConfirm('Jira’da "' + summary + '" başlıklı ' + issueType.name + ' oluşturulsun mu?\n\nBoard: ' + (jiraBoards.find((entry) => entry.id === jiraSelectedBoardId)?.name || "") + '\nProje: ' + project.key + ' · ' + project.name + '\nRota işi: ' + item.id));
  if (!okay) return;
  jiraLoading = true; jiraError = ""; renderJira();
  try {
    const created = await desktop.jiraCreateIssue(state.profile.jiraBaseUrl, jiraSelectedBoardId, project.key, issueType.id, summary, description);
    item.jiraIssueKey = created.key; item.updated = "Az önce"; addWorkActivity(item, "change", "Jira issue oluşturuldu ve bağlandı: " + created.key + " · " + project.key);
    save(); toast("Jira issue oluşturuldu: " + created.key);
    const page = await desktop.jiraFetchBoardIssues(state.profile.jiraBaseUrl, jiraSelectedBoardId, jiraIssueScope, jiraSelectedSprintId || undefined).catch(() => null);
    if (page) { jiraIssues = page.issues; jiraIssueTotal = page.total; jiraHasMoreIssues = page.hasMore; jiraLastSuccessAt = new Date().toISOString(); }
  } catch (error) { jiraError = error instanceof Error ? error.message : "Jira issue oluşturulamadı."; }
  finally { jiraLoading = false; renderJira(); }
}

let linkedJiraPreview: { itemId: string; localTitle: string; localStatus: WorkStatus; issue: JiraIssue; transitions: { id: string; name: string; status: string }[] } | null = null;
async function openLinkedJira(itemId: string, key?: string): Promise<void> {
  const item = itemById(itemId); const base = state.profile.jiraBaseUrl;
  if (!item || !base) { toast("Önce ayarlardan Jira bağlantısını tanımla."); return; }
  if (!key && !item.jiraIssueKey) {
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>Mevcut Jira işini bağla</h2><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><label class="field-label">Jira anahtarı<input id="linked-jira-key" class="field-input" placeholder="PROJE-123"></label><button class="button button-primary" data-action="fetch-linked-jira" data-id="' + esc(itemId) + '">Kaydı getir</button></div></section></div>'; return;
  }
  try {
    const result = await desktop.jiraGetIssue(base, key || item.jiraIssueKey!);
    linkedJiraPreview = { itemId, localTitle: item.title, localStatus: item.status, ...result };
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">JIRA · ' + esc(result.issue.key) + '</div><h2>Alan farklarını incele</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><div class="bulk-preview-scroll"><table><thead><tr><th>Alan</th><th>Rota</th><th>Jira</th></tr></thead><tbody><tr><th>Başlık</th><td>' + esc(item.title) + '</td><td>' + esc(result.issue.summary) + '</td></tr><tr><th>Durum</th><td>' + esc(item.status) + '</td><td>' + esc(result.issue.status) + '</td></tr></tbody></table></div><label class="field-label">Aktarım yönü<select id="linked-jira-direction" class="field-input"><option value="link">Yalnızca bağlantı kur</option><option value="pull">Jira → Rota</option><option value="push">Rota → Jira</option></select></label><label class="completed-filter"><input id="linked-jira-title" type="checkbox"> Başlığı aktar</label><label class="field-label">Jira → Rota durum eşlemesi<select id="linked-jira-local-status" class="field-input"><option value="">Durumu değiştirme</option>' + ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"].map((status) => '<option>' + status + '</option>').join("") + '</select></label><label class="field-label">Rota → Jira hedef geçişi<select id="linked-jira-transition" class="field-input"><option value="">Durumu değiştirme</option>' + result.transitions.map((entry) => '<option value="' + esc(entry.id) + '">' + esc(entry.name + " → " + entry.status) + '</option>').join("") + '</select></label><p class="settings-note">Yalnızca seçilen alanlar aktarılır. Güncellemeden önce kaydın tazeliği kontrol edilir.</p><footer class="modal-footer"><button class="button button-primary" data-action="apply-linked-jira">Seçimi uygula</button></footer></div></section></div>';
  } catch { recordDiagnostic("jira", ""); toast("Jira kaydı alınamadı. Anahtarı, bağlantıyı ve yetkileri kontrol et."); }
}
async function applyLinkedJira(): Promise<void> {
  const preview = linkedJiraPreview; const item = preview && itemById(preview.itemId); const base = state.profile.jiraBaseUrl;
  if (!preview || !item || !base) return;
  const direction = modalRoot.querySelector<HTMLSelectElement>("#linked-jira-direction")?.value;
  const title = Boolean(modalRoot.querySelector<HTMLInputElement>("#linked-jira-title")?.checked);
  const status = modalRoot.querySelector<HTMLSelectElement>("#linked-jira-local-status")?.value as WorkStatus;
  const transition = modalRoot.querySelector<HTMLSelectElement>("#linked-jira-transition")?.value || undefined;
  const button = modalRoot.querySelector<HTMLButtonElement>('[data-action="apply-linked-jira"]'); if (button) button.disabled = true;
  try {
    if (item.title !== preview.localTitle || item.status !== preview.localStatus) throw new Error("Rota kaydı değişti. Farkları yeniden getir.");
    const current = await desktop.jiraGetIssue(base, preview.issue.key);
    if (current.issue.updated !== preview.issue.updated) throw new Error("Jira kaydı değişti. Farkları yeniden getir.");
    if (direction === "push") await desktop.jiraUpdateLinkedIssue(base, preview.issue.key, preview.issue.updated, title ? item.title : undefined, transition);
    if (direction === "pull") {
      if (status === "Bloke" && (!item.blocker?.reason || !item.blocker?.nextStep || !item.blocker?.owner || !item.blocker?.expectedAction)) throw new Error("Önce Rota işinde blokaj bilgilerini doldur.");
      if (status && !applyWorkStatus(item, status, item.blocker)) return;
      if (title) item.title = preview.issue.summary;
    }
    item.jiraIssueKey = preview.issue.key;
    addWorkActivity(item, "change", "Jira bağlantısı / aktarımı: " + preview.issue.key + " · " + direction + " · " + (title ? "başlık " : "") + (direction === "pull" ? status : transition || ""));
    save(); linkedJiraPreview = null; openItem(item.id); toast("Jira bağlantısı ve seçilen alanlar kaydedildi.");
  } catch (error) { recordDiagnostic("jira", ""); toast(error instanceof Error ? error.message : "Jira güncellemesi başarısız. Farkları yeniden getir."); }
  finally { if (button?.isConnected) button.disabled = false; }
}
async function saveJiraPat(): Promise<void> {
  const input = document.getElementById("jira-pat-input") as HTMLInputElement | null;
  if (!input?.value.trim()) { toast("Önce Jira PAT’ini yapıştır."); input?.focus(); return; }
  try { await desktop.jiraSaveToken(input.value); input.value = ""; jiraHasSavedToken = true; jiraCatalogLoadedFor = ""; jiraError = ""; await refreshJiraCatalog(); toast("Jira PAT güvenle kaydedildi."); }
  catch (error) { jiraError = error instanceof Error ? error.message : "Jira PAT kaydedilemedi."; renderJira(); }
}

async function removeJiraPat(): Promise<void> {
  if (!(await appConfirm("Jira PAT’i bu bilgisayardan kaldırmak istiyor musun?"))) return;
  await desktop.jiraRemoveToken(); jiraHasSavedToken = false; jiraBoards = []; jiraProjects = []; jiraSprints = []; jiraIssueTypes = []; jiraIssues = []; renderJira(); toast("Jira bağlantı anahtarı kaldırıldı.");
}

type WorkspaceShelf = "tasks" | "notes" | "questions";
let workspaceShelf: WorkspaceShelf | null = null;
let workspaceShelfQuery = "";
let workspaceShowCompleted = false;
function syncWorkspaceToolbar(): void {
  const counts = { tasks: state.tasks.filter((task) => !task.done).length, notes: state.notes.length, questions: (state.openQuestions || []).filter((question) => question.status === "Açık").length };
  document.querySelectorAll<HTMLElement>("[data-workspace-count]").forEach((node) => { node.textContent = String(counts[node.dataset.workspaceCount as WorkspaceShelf]); });
  document.querySelectorAll<HTMLButtonElement>(".workspace-tools [data-workspace-panel]").forEach((button) => {
    const selected = workspaceShelf === button.dataset.workspacePanel;
    button.setAttribute("aria-expanded", String(selected)); button.classList.toggle("is-active", selected);
  });
  const scope = document.getElementById("workspace-command-scope");
  if (scope) scope.textContent = state.projects.find((project) => project.id === activeProjectId)?.name || "Tüm projeler";
  if (workspaceShelf) renderWorkspaceShelf();
  poTools.syncBadge();
}
type WorkspaceMessageKind = WorkspaceShelf | "items";
let dashboardPriority = "";
const workspaceMessageDrafts: Record<WorkspaceMessageKind, string> = { tasks: "", notes: "", questions: "", items: "" };
function resizeWorkspaceMessage(textarea: HTMLTextAreaElement): void {
  textarea.style.height = "0px";
  const style = getComputedStyle(textarea);
  const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const line = parseFloat(style.lineHeight);
  textarea.style.height = Math.min(Math.max(textarea.scrollHeight, line + padding), line * 2 + padding) + "px";
  textarea.style.overflowY = textarea.scrollHeight > line * 2 + padding + 1 ? "auto" : "hidden";
}
window.addEventListener("resize", () => document.querySelectorAll<HTMLTextAreaElement>(".workspace-message-input textarea").forEach(resizeWorkspaceMessage));
function workspaceMessageComposer(kind: WorkspaceMessageKind): string {
  requestAnimationFrame(() => document.querySelectorAll<HTMLTextAreaElement>(".workspace-message-input textarea").forEach(resizeWorkspaceMessage));
  const label = kind === "tasks" ? "Görevini yaz…" : kind === "notes" ? "Notunu yaz…" : kind === "items" ? "Backlog işini yaz…" : "Sorunu yaz…";
  return '<form class="workspace-message-composer' + (workspaceMessageDrafts[kind].trim() ? ' has-message' : '') + '" data-message-kind="' + kind + '"><div class="workspace-message-input"><textarea name="message" rows="1" maxlength="12000" aria-label="' + label + '" placeholder="' + label + '">' + esc(workspaceMessageDrafts[kind]) + '</textarea><button type="submit" aria-label="Gönder" title="Gönder" ' + (workspaceMessageDrafts[kind].trim() ? '' : 'disabled') + '>' + icon("arrowUp") + '</button></div></form>';
}
function sendWorkspaceMessage(form: HTMLFormElement): void {
  const kind = form.dataset.messageKind as WorkspaceMessageKind;
  if (!["tasks", "notes", "questions", "items"].includes(kind)) return;
  const message = String(new FormData(form).get("message") || "").trim();
  if (!message) return;
  const title = message.split("\n")[0].slice(0, 120);
  if (kind === "tasks") state.tasks.unshift({ id: nextId("TASK"), title, description: message, due: "", done: false, linked: "", attachments: [] });
  else if (kind === "notes") state.notes.unshift({ id: nextId("NOTE"), createdAt: new Date().toISOString(), title, body: message, linked: "", updated: "Az önce", attachments: [] });
  else if (kind === "items") {
    const project = state.projects.find((entry) => entry.id === activeProjectId && !entry.archived) || state.projects.find((entry) => !entry.archived);
    let id = nextId("PAY"); while (state.items.some((entry) => entry.id === id)) id = nextId("PAY");
    const item: WorkItem = { id, type: "Task", title, description: message, status: "Yeni", priority: (dashboardPriority || "Orta") as WorkItem["priority"], project: project?.name || "Genel", area: "Genel", updated: "Az önce", acceptance: [], attachments: [], labels: [], assignments: [], activity: [] };
    addWorkActivity(item, "created", "İş oluşturuldu."); state.items.unshift(item); renderProjectNav();
  }
  else { state.openQuestions ||= []; state.openQuestions.unshift({ id: nextId("Q"), text: message, owner: "", expectedAt: "", status: "Açık", createdAt: new Date().toISOString() }); }
  workspaceMessageDrafts[kind] = "";
  workspaceShelfQuery = "";
  const search = document.getElementById("workspace-shelf-search") as HTMLInputElement | null; if (search) search.value = "";
  if (kind === "questions") questionFilter = "open";
  form.querySelector<HTMLTextAreaElement>("textarea")!.value = "";
  save(); render();
  const scope = form.closest("#workspace-shelf") ? document.getElementById("workspace-shelf") : root;
  const composer = scope?.querySelector<HTMLFormElement>('[data-message-kind="' + kind + '"]');
  if (composer) {
    composer.classList.remove("has-message"); composer.classList.add("message-sent");
    composer.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled = true;
    const textarea = composer.querySelector<HTMLTextAreaElement>("textarea");
    if (textarea) { resizeWorkspaceMessage(textarea); textarea.focus(); }
    window.setTimeout(() => composer.classList.remove("message-sent"), 600);
  }
  const list = scope?.id === "workspace-shelf" ? scope.querySelector(".workspace-shelf-list") : composer?.closest(".personal-panel")?.querySelector(".personal-record-list");
  if (list) {
    list.scrollTop = 0;
    const row = list.firstElementChild; row?.classList.add("message-record-enter");
    window.setTimeout(() => row?.classList.remove("message-record-enter"), 600);
  }
}

function renderWorkspaceShelf(): void {
  if (!workspaceShelf) return;
  const list = document.getElementById("workspace-shelf-list"); if (!list) return;
  const shelf = document.getElementById("workspace-shelf")!;
  const previousComposer = shelf.querySelector<HTMLFormElement>(".workspace-message-composer");
  if (previousComposer?.dataset.messageKind !== workspaceShelf) {
    previousComposer?.remove();
    shelf.querySelector(".workspace-shelf-footer")?.insertAdjacentHTML("beforebegin", workspaceMessageComposer(workspaceShelf));
  }
  const term = workspaceShelfQuery.trim().toLocaleLowerCase("tr-TR");
  const title = document.getElementById("workspace-shelf-title"); if (title) title.textContent = workspaceShelf === "tasks" ? "Görevler" : workspaceShelf === "questions" ? "Açık sorular" : "Notlar";
  const add = document.querySelector<HTMLButtonElement>(".workspace-shelf-add");
  if (add) { add.hidden = true; add.dataset.workspaceCreate = workspaceShelf === "tasks" ? "task" : workspaceShelf === "questions" ? "question" : "note"; add.setAttribute("aria-label", workspaceShelf === "tasks" ? "Yeni görev" : workspaceShelf === "questions" ? "Yeni soru" : "Yeni not"); }
  const completed = document.querySelector<HTMLElement>(".workspace-show-completed"); if (completed) completed.hidden = workspaceShelf !== "tasks";
  const questionControl = document.querySelector<HTMLElement>(".workspace-question-filter"); if (questionControl) questionControl.hidden = workspaceShelf !== "questions";
  const questionSelect = document.getElementById("workspace-question-filter") as HTMLSelectElement | null; if (questionSelect) questionSelect.value = questionFilter;
  const matches = (text: string) => text.toLocaleLowerCase("tr-TR").includes(term);
  const tasks = state.tasks.filter((task) => (workspaceShowCompleted || !task.done) && matches(task.title + " " + (task.description || "") + " " + task.linked));
  const notes = state.notes.filter((note) => matches(note.title + " " + note.body + " " + note.linked));
  const scrollTop = list.scrollTop;
  list.innerHTML = workspaceShelf === "tasks" ? tasks.map((task) => '<article class="workspace-record-row ' + (task.done ? "is-done" : "") + '" data-context-task-id="' + esc(task.id) + '"><button type="button" class="workspace-task-toggle" data-toggle-task="' + esc(task.id) + '" aria-label="' + esc(task.done ? 'Görevi yeniden aç: ' + task.title : 'Görevi tamamla: ' + task.title) + '" aria-pressed="' + task.done + '">' + (task.done ? icon("check") : '<span></span>') + '</button><button type="button" class="workspace-record-open" data-open-task="' + esc(task.id) + '"><strong>' + esc(task.title) + '</strong><small>' + esc([task.due || "", task.linked || ""].filter(Boolean).join(" · ")) + '</small></button></article>').join("") : notes.map((note) => '<article class="workspace-record-row" data-context-note-id="' + esc(note.id) + '"><span class="workspace-record-symbol">' + icon("note") + '</span><button type="button" class="workspace-record-open" data-note="' + esc(note.id) + '"><strong>' + esc(note.title) + '</strong><small>' + esc(note.body.slice(0, 160) || note.updated) + '</small></button><button type="button" class="workspace-record-convert" data-action="note-to-task" data-id="' + esc(note.id) + '" aria-label="Notu göreve dönüştür" data-tooltip="Notu göreve dönüştür">' + icon("task") + '</button></article>').join("");
  const questions = (state.openQuestions || []).filter((question) => (questionFilter === "all" || question.status === (questionFilter === "open" ? "Açık" : "Yanıtlandı")) && matches([question.text, question.owner, question.answer, question.linkedItemId].join(" "))).sort((a, b) => (a.status === "Açık" ? 0 : 1) - (b.status === "Açık" ? 0 : 1) || (a.expectedAt || "9999").localeCompare(b.expectedAt || "9999"));
  if (workspaceShelf === "questions") list.innerHTML = questions.map((question) => {
    const overdue = question.status === "Açık" && question.expectedAt && question.expectedAt < new Date().toISOString().slice(0, 10);
    const action = (name: string, label: string, glyph: string) => '<button type="button" class="workspace-question-action" data-action="' + name + '" data-id="' + esc(question.id) + '" aria-label="' + label + '" data-tooltip="' + label + '">' + icon(glyph) + '</button>';
    return '<article class="workspace-question-row' + (overdue ? ' is-overdue' : '') + '"><div class="workspace-question-heading"><span class="question-status ' + (question.status === "Açık" ? 'open' : 'answered') + '">' + esc(question.status) + (overdue ? ' · Gecikti' : '') + '</span><div class="workspace-question-actions">' + action('edit-open-question', 'Soruyu düzenle', 'edit') + (question.status === "Açık" ? action('answer-open-question', 'Soruyu yanıtla', 'check') : action('reopen-question', 'Soruyu yeniden aç', 'undo')) + action('delete-open-question', 'Soruyu sil', 'delete') + '</div></div><button type="button" class="workspace-record-open" data-action="edit-open-question" data-id="' + esc(question.id) + '"><strong>' + esc(question.text) + '</strong><small>' + esc(question.owner + ' · ' + (question.expectedAt || 'Tarih yok')) + '</small></button>' + (question.answer ? '<p class="workspace-question-answer">' + esc(question.answer) + '</p>' : '') + (question.linkedItemId && itemById(question.linkedItemId) ? '<button type="button" class="workspace-question-link" data-open-item="' + esc(question.linkedItemId) + '">' + esc(question.linkedItemId + ' · ' + itemById(question.linkedItemId)!.title) + '</button>' : '') + '</article>';
  }).join("");
  const count = workspaceShelf === "tasks" ? tasks.length : workspaceShelf === "questions" ? questions.length : notes.length;
  if (!count) list.innerHTML = '<div class="workspace-shelf-empty">' + icon(workspaceShelf === "tasks" ? "task" : workspaceShelf === "questions" ? "help" : "note") + '<strong>' + (term ? "Eşleşen kayıt yok" : workspaceShelf === "tasks" ? "Bekleyen görev yok" : workspaceShelf === "questions" ? "Bu filtrede soru yok" : "Henüz not yok") + '</strong></div>';
  list.scrollTop = scrollTop;
  const footer = document.getElementById("workspace-shelf-count"); if (footer) footer.textContent = count + " " + (workspaceShelf === "tasks" ? "görev" : workspaceShelf === "questions" ? "soru" : "not");
}
function closeWorkspaceShelf(restoreFocus = false): void {
  const previous = workspaceShelf; workspaceShelf = null;
  const shelf = document.getElementById("workspace-shelf"); if (shelf) shelf.hidden = true;
  syncWorkspaceToolbar();
  if (restoreFocus && previous) document.querySelector<HTMLButtonElement>('.workspace-tools [data-workspace-panel="' + previous + '"]')?.focus();
}
function openWorkspaceShelf(kind: WorkspaceShelf): void {
  closeActionTooltip(); workspaceShelf = kind; workspaceShelfQuery = "";
  const shelf = document.getElementById("workspace-shelf"); if (!shelf) return;
  shelf.hidden = false;
  const search = document.getElementById("workspace-shelf-search") as HTMLInputElement | null;
  if (search) search.value = "";
  syncWorkspaceToolbar(); search?.focus({ preventScroll: true });
}
function initWorkspaceToolbar(): void {
  document.querySelectorAll<HTMLElement>("[data-workspace-icon]").forEach((node) => { node.innerHTML = icon(node.dataset.workspaceIcon === "notes" ? "duplicate" : node.dataset.workspaceIcon!); });
  const tools = document.querySelector<HTMLElement>(".workspace-tools")!;
  const highlight = (button: HTMLElement | null) => {
    if (!button) { tools.classList.remove("is-tracking"); return; }
    tools.style.setProperty("--tool-x", button.offsetLeft + "px"); tools.style.setProperty("--tool-width", button.offsetWidth + "px"); tools.classList.add("is-tracking");
  };
  tools.addEventListener("pointerover", (event) => { const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("button") : null; if (button) highlight(button); });
  tools.addEventListener("pointerleave", () => highlight(tools.querySelector<HTMLElement>(".is-active")));
  tools.addEventListener("focusin", (event) => { if (event.target instanceof HTMLButtonElement) highlight(event.target); });
  tools.addEventListener("focusout", (event) => { if (!(event.relatedTarget instanceof window.Node) || !tools.contains(event.relatedTarget)) highlight(tools.querySelector<HTMLElement>(".is-active")); });
  tools.addEventListener("keydown", (event) => {
    const buttons = [...tools.querySelectorAll<HTMLButtonElement>("button")]; const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length; buttons[next].focus();
  });
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null; if (!target) return;
    const create = target.closest<HTMLButtonElement>("[data-workspace-create]");
    if (create) {
      const kind = create.dataset.workspaceCreate;
      if (kind === "task" || kind === "note" || kind === "question") {
        openWorkspaceShelf(kind === "task" ? "tasks" : kind === "note" ? "notes" : "questions");
        document.querySelector<HTMLTextAreaElement>("#workspace-shelf textarea[name=message]")?.focus(); return;
      }
      closeWorkspaceShelf(false); closeActionTooltip();
      create.classList.add("is-launching"); window.setTimeout(() => create.classList.remove("is-launching"), 360);
      const selected = getSelectedBacklogItems();
      if (state.formDrafts?.length) openNewModal(kind === "task" ? "Kişisel görev" : kind === "note" ? "Not" : "Backlog işi");
      else openQuickCreateModal(kind === "task" ? "Kişisel görev" : kind === "note" ? "Not" : "Backlog işi", selected.length === 1 ? selected[0].id : "");
      return;
    }
    const panel = target.closest<HTMLButtonElement>("[data-workspace-panel]");
    if (panel) { const kind = panel.dataset.workspacePanel as WorkspaceShelf; if (workspaceShelf === kind) closeWorkspaceShelf(true); else openWorkspaceShelf(kind); return; }
    if (target.closest("[data-workspace-close]")) { closeWorkspaceShelf(true); return; }
    if (target.closest("#workspace-shelf") && target.closest('[data-open-task], [data-note], [data-open-item], [data-action="edit-open-question"], [data-action="answer-open-question"]')) {
      const panel = workspaceShelf;
      closeWorkspaceShelf(false);
      if (panel) modalReturnFocus = document.querySelector<HTMLButtonElement>('.workspace-tools [data-workspace-panel="' + panel + '"]');
    }
  }, true);
  document.addEventListener("pointerdown", (event) => { if (workspaceShelf && event.target instanceof Element && !event.target.closest(".workspace-commandbar, [data-workspace-panel]")) closeWorkspaceShelf(false); });
  document.addEventListener("keydown", (event) => { if (workspaceShelf && event.key === "Escape" && !modalRoot.children.length) { event.preventDefault(); event.stopImmediatePropagation(); closeWorkspaceShelf(true); } }, true);
  document.getElementById("workspace-shelf-search")?.addEventListener("input", (event) => { workspaceShelfQuery = (event.target as HTMLInputElement).value; renderWorkspaceShelf(); });
  document.getElementById("workspace-show-completed")?.addEventListener("change", (event) => { workspaceShowCompleted = (event.target as HTMLInputElement).checked; renderWorkspaceShelf(); });
  syncWorkspaceToolbar();
}

function normalizeWorkspaceFocus(value: unknown): WorkspaceFocusEntry[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.filter((entry): entry is WorkspaceFocusEntry => {
    if (!entry || typeof entry !== "object" || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || !["task", "note", "question", "item"].includes(entry.kind) || typeof entry.id !== "string" || !entry.id) return false;
    const key = entry.date + ":" + entry.kind + ":" + entry.id;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}

function workspaceFocusDate(): string {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
}

function workspaceFocusRecord(kind: WorkspaceFocusKind, id: string): { title: string; meta: string; icon: string; label: string; open: string } | undefined {
  if (kind === "task") {
    const task = state.tasks.find((entry) => entry.id === id);
    if (task) return { title: task.title, meta: [task.done ? "Tamamlandı" : task.due, task.linked].filter(Boolean).join(" · "), icon: "task", label: "Görev", open: 'data-open-task="' + esc(id) + '"' };
  } else if (kind === "note") {
    const note = state.notes.find((entry) => entry.id === id);
    if (note) return { title: note.title, meta: [note.updated, note.linked].filter(Boolean).join(" · "), icon: "note", label: "Not", open: 'data-note="' + esc(id) + '"' };
  } else if (kind === "question") {
    const question = state.openQuestions?.find((entry) => entry.id === id);
    if (question) return { title: question.text, meta: [question.owner, question.status === "Açık" ? "Yanıt bekleniyor" : "Yanıtlandı"].filter(Boolean).join(" · "), icon: "help", label: "Soru", open: 'data-action="edit-open-question" data-id="' + esc(id) + '"' };
  } else {
    const item = state.items.find((entry) => entry.id === id && !entry.archived && isItemInActiveProject(entry));
    if (item) return { title: item.title, meta: item.id + " · " + item.status, icon: item.type === "Bug" ? "bug" : item.type === "Task" ? "task" : "story", label: "Backlog", open: 'data-open-item="' + esc(id) + '"' };
  }
  return undefined;
}

function workspaceFocusPin(kind: WorkspaceFocusKind, id: string): string {
  const pinned = (state.dailyFocus || []).some((entry) => entry.date === workspaceFocusDate() && entry.kind === kind && entry.id === id);
  const label = pinned ? "Bugünkü odağımdan çıkar" : "Bugünkü odağıma ekle";
  return '<button type="button" class="personal-icon personal-pin' + (pinned ? ' is-pinned' : '') + '" data-focus-kind="' + kind + '" data-focus-id="' + esc(id) + '" aria-pressed="' + pinned + '" aria-label="' + label + '" data-tooltip="' + label + '">' + icon("pin") + '</button>';
}

function animateWorkspaceFocusAddition(kind: WorkspaceFocusKind, id: string, origin: DOMRect, title: string): void {
  const list = root.querySelector<HTMLElement>(".personal-focus-list");
  const dashboard = list?.closest(".personal-dashboard-body");
  const entry = list?.querySelector<HTMLElement>('[data-focus-entry-kind="' + kind + '"][data-focus-entry-id="' + CSS.escape(id) + '"]');
  if (!list || !dashboard || !entry) return;

  const destination = entry.getBoundingClientRect();
  const bounds = [list.getBoundingClientRect(), dashboard.getBoundingClientRect()];
  const centerX = destination.left + destination.width / 2;
  const centerY = destination.top + destination.height / 2;
  if (!destination.width || !destination.height || centerX < 0 || centerX > window.innerWidth ||
      centerY < 0 || centerY > window.innerHeight ||
      bounds.some((rect) => centerX < rect.left || centerX > rect.right || centerY < rect.top || centerY > rect.bottom)) return;

  animateRecordArrival(origin, centerX, centerY, title, entry, 200);
}

function animateRecordArrival(origin: DOMRect, targetX: number, targetY: number, label: string, entry: HTMLElement, duration: number): void {
  const highlight = () => {
    if (!entry.isConnected) return;
    entry.classList.add("record-arrival-highlight");
    window.setTimeout(() => entry.classList.remove("record-arrival-highlight"), 850);
  };
  if (document.body.classList.contains("reduced-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !origin.width || !origin.height) {
    highlight();
    return;
  }

  const copy = document.createElement("span");
  copy.className = "record-flight";
  copy.setAttribute("aria-hidden", "true");
  copy.textContent = label.split("\n", 1)[0];
  const startX = (origin.left + origin.width / 2) / appZoom;
  const startY = (origin.top + origin.height / 2) / appZoom;
  copy.style.left = startX + "px";
  copy.style.top = startY + "px";
  document.body.append(copy);

  const x = targetX / appZoom - startX;
  const y = targetY / appZoom - startY;
  const animation = copy.animate([
    { transform: "translate(-50%, -50%) scale(.86)", opacity: .85 },
    { transform: "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px)) scale(1)", opacity: 1 }
  ], { duration, easing: "cubic-bezier(.2,.7,.3,1)" });
  void animation.finished.then(() => { copy.remove(); highlight(); }, () => copy.remove());
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-focus-kind][data-focus-id]") : null;
  if (!target) return;
  event.preventDefault(); event.stopPropagation();
  const kind = target.dataset.focusKind as WorkspaceFocusKind;
  const id = target.dataset.focusId || "";
  if (!["task", "note", "question", "item"].includes(kind)) return;
  const record = workspaceFocusRecord(kind, id);
  if (!record) return;
  const origin = target.getBoundingClientRect();
  const date = workspaceFocusDate();
  const entries = normalizeWorkspaceFocus(state.dailyFocus);
  const pinned = entries.some((entry) => entry.date === date && entry.kind === kind && entry.id === id);
  state.dailyFocus = pinned ? entries.filter((entry) => !(entry.date === date && entry.kind === kind && entry.id === id)) : [...entries, { date, kind, id }];
  const saved = save();
  const scrollPositions = [...root.querySelectorAll<HTMLElement>(".personal-record-list, .personal-dashboard-body, .personal-focus-list")].map((element) => element.scrollTop);
  renderOverview();
  root.querySelectorAll<HTMLElement>(".personal-record-list, .personal-dashboard-body, .personal-focus-list").forEach((element, index) => { element.scrollTop = scrollPositions[index] || 0; });
  root.querySelector<HTMLButtonElement>('.personal-grid [data-focus-kind="' + kind + '"][data-focus-id="' + CSS.escape(id) + '"]')?.focus({ preventScroll: true });
  if (saved && !pinned) animateWorkspaceFocusAddition(kind, id, origin, record.title);
  toast(pinned ? "Odaktan çıkarıldı. Asıl kayıt korunuyor." : "Bugünkü odağına eklendi.");
}, true);

function normalizeDashboardLayout(value: unknown): DashboardPanelLayout[] {
  const ids: DashboardPanelId[] = ["tasks", "notes", "questions", "items"];
  const result: DashboardPanelLayout[] = [];
  if (Array.isArray(value)) value.forEach((entry) => {
    if (!entry || !ids.includes(entry.id) || result.some((panel) => panel.id === entry.id)) return;
    result.push({ id: entry.id, width: Number.isFinite(entry.width) ? Math.max(.32, Math.min(1, entry.width)) : .5, height: Number.isFinite(entry.height) ? Math.max(220, Math.min(1000, entry.height)) : 300 });
  });
  ids.forEach((id) => { if (!result.some((panel) => panel.id === id)) result.push({ id, width: .5, height: 300 }); });
  return result;
}
let maximizedDashboardPanel: DashboardSearchKind | null = null;
function applyDashboardMaximize(): void {
  root.querySelectorAll<HTMLElement>(".personal-panel, .personal-focus").forEach((panel) => {
    const kind = (panel.dataset.dashboardPanel || "focus") as DashboardSearchKind;
    const maximized = maximizedDashboardPanel === kind;
    panel.classList.toggle("is-panel-maximized", maximized);
    let button = panel.querySelector<HTMLButtonElement>(".dashboard-panel-maximize");
    if (!button) {
      const header = panel.querySelector(".personal-panel-heading, .personal-focus-heading");
      header?.insertAdjacentHTML("beforeend", '<button type="button" class="personal-icon dashboard-panel-maximize" data-dashboard-maximize="' + kind + '"></button>');
      button = panel.querySelector<HTMLButtonElement>(".dashboard-panel-maximize");
    }
    if (button) {
      const label = maximized ? "Paneli küçült" : "Paneli büyüt";
      button.innerHTML = icon(maximized ? "minimize" : "maximize"); button.setAttribute("aria-label", label); button.title = label; button.setAttribute("aria-pressed", String(maximized));
    }
  });
  root.querySelector(".personal-dashboard")?.classList.toggle("has-maximized-panel", !!maximizedDashboardPanel);
  requestAnimationFrame(() => root.querySelectorAll<HTMLTextAreaElement>(".workspace-message-input textarea").forEach(resizeWorkspaceMessage));
}
document.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-dashboard-maximize]") : null; if (!button) return;
  const kind = button.dataset.dashboardMaximize as DashboardSearchKind;
  maximizedDashboardPanel = maximizedDashboardPanel === kind ? null : kind; applyDashboardMaximize(); button.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !maximizedDashboardPanel || activeView !== "overview" || modalRoot.children.length || root.querySelector(":popover-open")) return;
  const kind = maximizedDashboardPanel; maximizedDashboardPanel = null; applyDashboardMaximize();
  root.querySelector<HTMLButtonElement>('[data-dashboard-maximize="' + kind + '"]')?.focus();
});
function applyDashboardLayout(): void {
  const grid = root.querySelector<HTMLElement>(".personal-grid"); if (!grid) return;
  const layout = normalizeDashboardLayout(state.dashboardLayout);
  const defaults = normalizeDashboardLayout(null);
  const toolbar = root.querySelector<HTMLElement>(".dashboard-layout-toolbar");
  if (toolbar) toolbar.hidden = layout.every((entry, index) => entry.id === defaults[index].id && Math.abs(entry.width - defaults[index].width) < .001 && Math.abs(entry.height - defaults[index].height) < 1);
  layout.forEach((entry) => {
    const panel = grid.querySelector<HTMLElement>('[data-dashboard-panel="' + entry.id + '"]'); if (!panel) return;
    panel.style.setProperty("--panel-width", String(entry.width));
    panel.style.setProperty("--panel-height", entry.height + "px");
    grid.append(panel);
    if (!panel.querySelector(".dashboard-panel-grip")) {
      panel.querySelector(".personal-panel-heading")?.insertAdjacentHTML("afterbegin", '<button type="button" class="personal-icon dashboard-panel-grip" aria-label="Paneli taşı" title="Sürükleyerek taşı · Ok tuşlarıyla sırala"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01" stroke-width="4"/></svg></button>');
      panel.insertAdjacentHTML("beforeend", '<button type="button" class="dashboard-panel-resize" aria-label="Paneli boyutlandır" title="Sürükleyerek boyutlandır · Ok tuşlarıyla ayarla"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 13 8-8m-3 8 3-3"/></svg></button>');
    }
  });
}
function moveDashboardPanel(from: DashboardPanelId, to: DashboardPanelId): void {
  const layout = normalizeDashboardLayout(state.dashboardLayout);
  const source = layout.findIndex((entry) => entry.id === from); const target = layout.findIndex((entry) => entry.id === to);
  if (source < 0 || target < 0 || source === target) return;
  const [entry] = layout.splice(source, 1); layout.splice(target, 0, entry);
  state.dashboardLayout = layout; save(); applyDashboardLayout();
}
// Use pointer capture so the native WebView2 file-drop target does not own panel moves.
document.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary || event.button !== 0 || !(event.target instanceof Element)) return;
  const grip = event.target.closest<HTMLButtonElement>(".dashboard-panel-grip");
  const panel = grip?.closest<HTMLElement>("[data-dashboard-panel]");
  const grid = panel?.parentElement;
  if (!grip || !panel || !grid) return;

  const { pointerId, clientX, clientY } = event;
  let target: HTMLElement | null = null;
  let moving = false;
  grip.setPointerCapture(pointerId);

  const move = (pointer: PointerEvent) => {
    if (pointer.pointerId !== pointerId) return;
    if (!moving && Math.hypot(pointer.clientX - clientX, pointer.clientY - clientY) < 6) return;
    moving = true;
    panel.classList.add("is-panel-dragging");
    const hovered = document.elementFromPoint(pointer.clientX, pointer.clientY)?.closest<HTMLElement>("[data-dashboard-panel]");
    const next = hovered && hovered !== panel && hovered.parentElement === grid ? hovered : null;
    if (next === target) return;
    target?.classList.remove("is-panel-drop-target");
    target = next;
    target?.classList.add("is-panel-drop-target");
  };

  const finish = (pointer: PointerEvent) => {
    if (pointer.pointerId !== pointerId) return;
    grip.removeEventListener("pointermove", move);
    grip.removeEventListener("pointerup", finish);
    grip.removeEventListener("pointercancel", finish);
    grip.removeEventListener("lostpointercapture", finish);
    panel.classList.remove("is-panel-dragging");
    target?.classList.remove("is-panel-drop-target");
    if (pointer.type !== "pointerup" || !target) return;
    moveDashboardPanel(panel.dataset.dashboardPanel as DashboardPanelId, target.dataset.dashboardPanel as DashboardPanelId);
    grip.focus({ preventScroll: true });
  };

  grip.addEventListener("pointermove", move);
  grip.addEventListener("pointerup", finish);
  grip.addEventListener("pointercancel", finish);
  grip.addEventListener("lostpointercapture", finish);
});
document.addEventListener("pointerdown", (event) => {
  const handle = event.target instanceof Element ? event.target.closest<HTMLButtonElement>(".dashboard-panel-resize") : null;
  const panel = handle?.closest<HTMLElement>("[data-dashboard-panel]"); const grid = panel?.parentElement;
  if (!handle || !panel || !grid || event.button !== 0) return;
  event.preventDefault(); handle.setPointerCapture(event.pointerId);
  const layout = normalizeDashboardLayout(state.dashboardLayout); const entry = layout.find((entry) => entry.id === panel.dataset.dashboardPanel)!;
  const original = { ...entry }; const startX = event.clientX; const startY = event.clientY;
  const width = panel.getBoundingClientRect().width; const height = panel.getBoundingClientRect().height;
  const gap = parseFloat(getComputedStyle(grid).gap) || 18; const gridWidth = grid.getBoundingClientRect().width;
  panel.classList.add("is-panel-resizing");
  const move = (moveEvent: PointerEvent) => {
    entry.width = Math.max(.32, Math.min(1, (width + moveEvent.clientX - startX + gap) / (gridWidth + gap)));
    entry.height = Math.max(220, Math.min(1000, height + moveEvent.clientY - startY));
    panel.style.setProperty("--panel-width", String(entry.width)); panel.style.setProperty("--panel-height", entry.height + "px");
    panel.querySelectorAll<HTMLTextAreaElement>(".workspace-message-input textarea").forEach(resizeWorkspaceMessage);
  };
  const finish = (finishEvent: PointerEvent) => {
    if (finishEvent.type === "pointercancel") Object.assign(entry, original);
    state.dashboardLayout = layout; save(); panel.classList.remove("is-panel-resizing");
    handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", finish); handle.removeEventListener("pointercancel", finish);
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    applyDashboardLayout();
  };
  handle.addEventListener("pointermove", move); handle.addEventListener("pointerup", finish); handle.addEventListener("pointercancel", finish);
});
document.addEventListener("keydown", (event) => {
  if (!(event.target instanceof HTMLElement) || !event.key.startsWith("Arrow")) return;
  const handle = event.target.closest(".dashboard-panel-grip, .dashboard-panel-resize"); const panel = handle?.closest<HTMLElement>("[data-dashboard-panel]"); if (!panel) return;
  event.preventDefault(); const layout = normalizeDashboardLayout(state.dashboardLayout); const index = layout.findIndex((entry) => entry.id === panel.dataset.dashboardPanel);
  const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
  if (handle?.classList.contains("dashboard-panel-grip")) {
    const target = layout[index + direction]; if (target) moveDashboardPanel(layout[index].id, target.id);
  } else {
    const entry = layout[index];
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") entry.width = Math.max(.32, Math.min(1, entry.width + direction * .05));
    else entry.height = Math.max(220, Math.min(1000, entry.height + direction * 20));
    state.dashboardLayout = layout; save(); applyDashboardLayout();
  }
  (handle as HTMLElement)?.focus();
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("[data-dashboard-reset]")) {
    state.dashboardLayout = normalizeDashboardLayout(null); save(); applyDashboardLayout();
  }
});

type DashboardSearchKind = WorkspaceMessageKind | "focus";
const dashboardSearches: Record<DashboardSearchKind, string> = { tasks: "", notes: "", questions: "", items: "", focus: "" };
function dashboardSearchControl(kind: DashboardSearchKind): string {
  return '<button type="button" class="personal-icon dashboard-search-trigger' + (dashboardSearches[kind] ? ' is-filtered' : '') + '" popovertarget="dashboard-search-' + kind + '" data-panel-search-trigger="' + kind + '" aria-label="Panelde ara" title="Panelde ara">' + icon("search") + '</button><div id="dashboard-search-' + kind + '" class="dashboard-search-popover" popover><div class="dashboard-search-field">' + icon("search") + '<input type="search" data-panel-search="' + kind + '" value="' + esc(dashboardSearches[kind]) + '" aria-label="Panelde ara" autocomplete="off" autofocus></div></div>';
}
function applyDashboardSearch(kind: DashboardSearchKind): void {
  const trigger = root.querySelector<HTMLElement>('[data-panel-search-trigger="' + kind + '"]');
  const panel = trigger?.closest<HTMLElement>(".personal-panel, .personal-focus"); if (!panel) return;
  const term = dashboardSearches[kind].trim().toLocaleLowerCase("tr-TR");
  const rows = [...panel.querySelectorAll<HTMLElement>("[data-panel-search-text]")];
  rows.forEach((row) => { row.hidden = !row.dataset.panelSearchText!.toLocaleLowerCase("tr-TR").includes(term); });
  const count = rows.filter((row) => !row.hidden).length;
  const badge = panel.querySelector("h2 > span"); if (badge) badge.textContent = String(count) + (kind === "focus" ? " kayıt" : "");
  trigger?.classList.toggle("is-filtered", !!term);
  const list = panel.querySelector(".personal-record-list, .personal-focus-list");
  list?.querySelector(".dashboard-search-empty")?.remove();
  list?.querySelectorAll<HTMLElement>(".personal-empty").forEach((entry) => { entry.hidden = !!term; });
  if (term && !count) list?.insertAdjacentHTML("beforeend", '<p class="personal-empty dashboard-search-empty">Eşleşen kayıt yok.</p>');
}

function renderOverview(): void {
  const date = workspaceFocusDate();
  const focus = (state.dailyFocus || []).filter((entry) => entry.date === date).flatMap((entry) => {
    const record = workspaceFocusRecord(entry.kind, entry.id);
    return record ? [{ entry, record }] : [];
  });
  const tasks = state.tasks.filter((task) => !task.done).sort((a, b) => Number(b.due === "Bugün") - Number(a.due === "Bugün"));
  const questions = (state.openQuestions || []).filter((question) => question.status === "Açık").sort((a, b) => (a.expectedAt || "9999").localeCompare(b.expectedAt || "9999"));
  const critical = state.items.filter((item) => !item.archived && item.status !== "Tamamlandı" && isItemInActiveProject(item) && (!dashboardPriority || item.priority === dashboardPriority))
    .sort((a, b) => Number(b.status === "Bloke") - Number(a.status === "Bloke") || overdueDays(b) - overdueDays(a));
  const priorityFilter = '<button type="button" class="personal-priority-trigger" popovertarget="dashboard-priority-popover" aria-label="Öncelik filtresi" title="Öncelik filtresi">' + icon("filter") + '<span>' + esc(dashboardPriority || "Öncelik") + '</span>' + icon("chevronDown") + '</button><div id="dashboard-priority-popover" class="personal-priority-popover" popover><strong>Öncelik</strong>' + ["", "Kritik", "Yüksek", "Orta", "Düşük"].map((priority) => '<label><input type="radio" name="dashboard-priority" value="' + priority + '" ' + (dashboardPriority === priority ? 'checked' : '') + '><span>' + esc(priority || "Tüm öncelikler") + '</span></label>').join("") + '</div>';

  const empty = (text: string) => '<p class="personal-empty">' + text + '</p>';
  const heading = (title: string, count: number, glyph: string, action: string, label: string, kind: DashboardSearchKind) => '<header class="personal-panel-heading"><h2>' + icon(glyph) + title + '<span>' + count + '</span></h2><button type="button" class="personal-icon icon-action" ' + action + ' aria-label="' + label + '" data-tooltip="' + label + '">' + icon("add") + '</button>' + dashboardSearchControl(kind) + '</header>';
  root.innerHTML = '<div class="page-content personal-dashboard" data-scroll-layout="ready"><div class="personal-dashboard-body"><section class="personal-focus" aria-labelledby="personal-focus-title"><header class="personal-focus-heading"><div><h2 id="personal-focus-title">' + icon("focus") + 'Bugünkü odağım <span>' + focus.length + ' kayıt</span></h2><p>Bugün ilgilenmek istediğin görevler, notlar, sorular ve işler.</p></div><span class="personal-focus-hint">Senin seçtiklerin</span>' + dashboardSearchControl("focus") + '</header><div class="personal-focus-list">' + (focus.map(({ entry, record }) => '<article class="personal-focus-entry" data-focus-entry-kind="' + entry.kind + '" data-focus-entry-id="' + esc(entry.id) + '" data-panel-search-text="' + esc([record.title, record.label, record.meta].join(" ")) + '"><span class="personal-record-symbol">' + icon(record.icon) + '</span><button type="button" class="personal-record-open" ' + record.open + '><strong>' + esc(record.title) + '</strong><small>' + esc(record.label + " · " + record.meta) + '</small></button><button type="button" class="personal-icon" data-pomodoro-kind="' + entry.kind + '" data-pomodoro-record="' + esc(entry.id) + '" aria-label="Odaklan: ' + esc(record.title) + '" data-tooltip="Odaklan">' + icon("play") + '</button><button type="button" class="personal-icon" data-focus-kind="' + entry.kind + '" data-focus-id="' + esc(entry.id) + '" aria-label="Odaktan çıkar: ' + esc(record.title) + '" data-tooltip="Odaktan çıkar">' + icon("close") + '</button></article>').join("") || empty("Bugünkü odağını sen belirle. Aşağıdaki kayıtlarda iğne ikonuna basarak buraya ekleyebilirsin.")) + '</div></section><div class="dashboard-layout-toolbar"><button type="button" class="personal-icon" data-dashboard-reset aria-label="Düzeni sıfırla" title="Düzeni sıfırla">' + icon("undo") + '</button></div><div class="personal-grid"><section class="personal-panel personal-tasks" data-dashboard-panel="tasks" aria-label="Görevlerim">' + heading("Görevlerim", tasks.length, "task", 'data-message-focus="tasks"', "Kişisel görev yaz", "tasks") + '<div class="personal-record-list">' + (tasks.map((task) => '<article class="personal-row' + (task.due === "Bugün" ? " personal-row-due" : "") + '" data-panel-search-text="' + esc([task.title, task.description, task.due, task.linked].filter(Boolean).join(" ")) + '"><button type="button" class="personal-task-check" data-toggle-task="' + esc(task.id) + '" aria-label="Görevi tamamla: ' + esc(task.title) + '">' + icon("check") + '</button><button type="button" class="personal-record-open" data-open-task="' + esc(task.id) + '"><strong>' + esc(task.title) + '</strong><small>' + esc([task.due, task.linked].filter(Boolean).join(" · ")) + '</small></button>' + workspaceFocusPin("task", task.id) + '</article>').join("") || empty("İlk görevini aşağıya mesaj olarak yaz.")) + '</div>' + workspaceMessageComposer("tasks") + '</section><section class="personal-panel personal-notes" data-dashboard-panel="notes" aria-label="Notlarım">' + heading("Notlarım", state.notes.length, "note", 'data-message-focus="notes"', "Not yaz", "notes") + '<div class="personal-record-list">' + (state.notes.map((note) => '<article class="personal-row" data-panel-search-text="' + esc([note.title, note.body, note.linked].filter(Boolean).join(" ")) + '"><button type="button" class="personal-record-open" data-note="' + esc(note.id) + '"><strong>' + esc(note.title) + '</strong><p>' + esc(note.body.slice(0, 180)) + '</p><small>' + esc([note.linked, note.updated].filter(Boolean).join(" · ")) + '</small></button>' + workspaceFocusPin("note", note.id) + '</article>').join("") || empty("Düşüncelerini aşağıya mesaj olarak yaz.")) + '</div>' + workspaceMessageComposer("notes") + '</section><section class="personal-panel personal-questions" data-dashboard-panel="questions" aria-label="Sorularım">' + heading("Sorularım", questions.length, "help", 'data-message-focus="questions"', "Soru yaz", "questions") + '<div class="personal-record-list">' + (questions.map((question) => '<article class="personal-row" data-panel-search-text="' + esc([question.text, question.owner, question.linkedItemId].filter(Boolean).join(" ")) + '"><button type="button" class="personal-record-open" data-action="edit-open-question" data-id="' + esc(question.id) + '"><strong>' + esc(question.text) + '</strong><small>' + esc([question.owner, question.expectedAt ? "Beklenen: " + question.expectedAt : "Yanıt bekleniyor", question.linkedItemId].filter(Boolean).join(" · ")) + '</small></button><button type="button" class="personal-icon" data-action="answer-open-question" data-id="' + esc(question.id) + '" aria-label="Soruyu yanıtla" data-tooltip="Yanıtı kaydet">' + icon("check") + '</button>' + workspaceFocusPin("question", question.id) + '</article>').join("") || empty("Takip edeceğin soruyu aşağıya yaz.")) + '</div>' + workspaceMessageComposer("questions") + '</section><section class="personal-panel personal-critical" data-dashboard-panel="items" aria-label="Backlog işleri"><header class="personal-panel-heading"><h2>' + icon("bug") + 'Backlog işleri<span>' + critical.length + '</span></h2>' + priorityFilter + dashboardSearchControl("items") + '</header><div class="personal-record-list">' + (critical.map((item) => '<article class="personal-row' + (item.status === "Bloke" || overdueDays(item) > 0 ? " personal-row-attention" : "") + '" data-panel-search-text="' + esc([item.id, item.title, item.description, item.project, item.priority, item.status].filter(Boolean).join(" ")) + '"><button type="button" class="personal-record-open" data-open-item="' + esc(item.id) + '"><strong>' + esc(item.title) + '</strong><small>' + esc(item.id + " · " + item.project) + '</small><span class="personal-critical-reason">' + esc([item.status === "Bloke" ? "Bloke" : "", overdueDays(item) ? overdueDays(item) + " gün gecikti" : "", item.priority + " öncelik"].filter(Boolean).join(" · ")) + '</span></button>' + workspaceFocusPin("item", item.id) + '</article>').join("") || empty("Bu öncelikte açık backlog işi yok.")) + '</div>' + workspaceMessageComposer("items") + '</section></div></div></div>';
  applyDashboardLayout();
  applyDashboardMaximize();
  (Object.keys(dashboardSearches) as DashboardSearchKind[]).forEach(applyDashboardSearch);
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

function lastBacklogActivityLabel(items: WorkItem[]): string {
  const latest = items.flatMap((item) => item.activity || [])
    .map((entry) => Date.parse(entry.occurredAt))
    .filter(Number.isFinite)
    .reduce((max, timestamp) => Math.max(max, timestamp), 0);
  if (!latest) return "Son iş işlemi: bilinmiyor";
  const date = new Date(latest);
  return "Son iş işlemi: " + new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function renderBacklog(): void {
  const listScroll = root.querySelector(".backlog-table-wrap")?.scrollTop ?? 0;
  const previousSignature = backlogWindowSignature;
  const project = state.projects.find((entry) => entry.id === activeProjectId);
  const scopedItems = getBacklogScopeItems();
  const scopedViews = savedBacklogViews.filter((view) => view.projectId === activeProjectId);
  const availableLabels = [...new Set(scopedItems.flatMap((item) => item.labels || []))].sort((left, right) => left.localeCompare(right, "tr-TR"));
  if (labelFilter && !availableLabels.includes(labelFilter)) labelFilter = "";
  const labelFilterOptions = '<select id="label-filter" aria-label="Etikete göre filtrele"><option value="">Tüm etiketler</option>' + availableLabels.map((label) => '<option value="' + esc(label) + '" ' + (labelFilter === label ? "selected" : "") + '>' + esc(label) + '</option>').join("") + '</select>';
  const savedViewOptions = '<option value="">Geçerli görünüm</option>' + [...scopedViews].sort((left, right) => Number(Boolean(right.pinned)) - Number(Boolean(left.pinned))).map((view) => '<option value="' + esc(view.id) + '" ' + (activeBacklogViewId === view.id ? "selected" : "") + '>' + (view.pinned ? "★ " : "") + esc(view.name) + '</option>').join("");
  const activeSavedView = scopedViews.find((view) => view.id === activeBacklogViewId);
  const currentViewState = JSON.stringify({ mode: backlogMode, query, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, overdueOnly: backlogOverdueOnly, statusAgeMinDays: backlogStatusAgeMinDays, searchScope: backlogSearchScope, columns: backlogColumns, sort: backlogSort, statuses: backlogStatuses, priorities: backlogPriorities, dateFrom: backlogDateFrom, dateTo: backlogDateTo, noEstimate: backlogNoEstimate, overdueCondition: backlogOverdueCondition, conditionMode: backlogConditionMode });
  const savedViewState = activeSavedView ? JSON.stringify({ mode: activeSavedView.mode, query: activeSavedView.query, status: activeSavedView.status, type: activeSavedView.type, label: activeSavedView.label, teamId: activeSavedView.teamId, assignee: activeSavedView.assignee, sprintId: activeSavedView.sprintId || "", includeCompleted: activeSavedView.includeCompleted || false, overdueOnly: activeSavedView.overdueOnly || false, statusAgeMinDays: activeSavedView.statusAgeMinDays || 0, searchScope: activeSavedView.searchScope || "all", columns: activeSavedView.columns, sort: normalizeBacklogSort(activeSavedView.sort === "manual" && activeSavedView.secondarySort && activeSavedView.secondarySort !== "manual" ? activeSavedView.secondarySort : activeSavedView.sort), statuses: activeSavedView.statuses || [], priorities: activeSavedView.priorities || [], dateFrom: activeSavedView.dateFrom || "", dateTo: activeSavedView.dateTo || "", noEstimate: Boolean(activeSavedView.noEstimate), conditionMode: activeSavedView.conditionMode || "and" }) : "";
  const viewDirty = Boolean(activeSavedView && currentViewState !== savedViewState);
  const activeFilterCount = [backlogStatus, backlogType, labelFilter, teamFilterId, assigneeFilter, backlogSprintId, backlogIncludeCompleted ? "completed" : ""].filter(Boolean).length;
  root.innerHTML = '<div class="page-content backlog-page backlog-density-' + backlogDensity + (backlogTitleWrap ? ' backlog-wrap-titles' : '') + '"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>' + esc(project?.name || "Genel") + '</div><div class="backlog-heading-line"><h1>' + esc(project ? project.name : "Backlog") + '</h1><p>' + (project ? "Bu projeye ait backlog işleri ve ürün kararları." : "İşlerini önceliklendir.") + '</p></div></div><div class="button-row">' + (project ? '<button class="button button-secondary" data-action="edit-project" data-project-id="' + esc(project.id) + '">Proje ayarları</button>' : "") + '</div></section>' +
    '<div class="backlog-toolbar"><div class="backlog-toolbar-main"><div class="filter-group"><label class="filter-search"><span class="search-glyph">' + icon("search") + '</span><input id="backlog-search" type="search" placeholder="Başlık, ID, açıklama veya bileşende ara…" value="' + esc(query) + '"></label><details class="backlog-filter-menu" name="backlog-menus"><summary aria-label="Filtreleri göster"><span class="filter-glyph">' + icon("filter") + '</span><span>Filtreler</span><b class="filter-count" ' + (activeFilterCount ? "" : "hidden") + '>' + activeFilterCount + '</b><span class="menu-chevron">' + icon("chevronDown") + '</span></summary><div class="backlog-filter-popover"><div class="filter-popover-heading"><strong>Hızlı filtreleme</strong><small>Sonuçları daralt</small></div><div class="backlog-filter-fields"><label class="backlog-filter-field"><span>Durum</span><select id="status-filter" aria-label="Duruma göre filtrele"><option value="">Tüm durumlar</option><option>Yeni</option><option>Analiz ediliyor</option><option>Hazır</option><option>Devam ediyor</option><option>Bloke</option><option>Tamamlandı</option></select></label><label class="backlog-filter-field"><span>Tür</span><select id="type-filter" aria-label="Türe göre filtrele"><option value="">Tüm türler</option><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="backlog-filter-field"><span>Etiket</span>' + labelFilterOptions + '</label><label class="backlog-filter-field"><span>Takım</span><select id="team-filter" aria-label="Takıma göre filtrele"><option value="">Tüm takımlar</option><option value="__unassigned">Takım atanmamış</option>' + state.teams.map((team) => '<option value="' + esc(team.id) + '" ' + (teamFilterId === team.id ? "selected" : "") + '>' + esc(team.name) + '</option>').join("") + '</select></label><label class="backlog-filter-field"><span>Sorumlu</span><select id="assignee-filter" aria-label="Sorumluya göre filtrele"></select></label><label class="backlog-filter-field"><span>Sprint</span><select id="sprint-filter" aria-label="Sprinte göre filtrele"><option value="">Tüm sprintler</option><option value="__unassigned" ' + (backlogSprintId === "__unassigned" ? "selected" : "") + '>Sprint atanmamış</option>' + (state.sprints || []).map((sprint) => '<option value="' + esc(sprint.id) + '" ' + (backlogSprintId === sprint.id ? "selected" : "") + '>' + esc(sprint.name) + '</option>').join("") + '</select></label><label class="completed-filter"><input id="include-completed" type="checkbox" ' + (backlogIncludeCompleted ? "checked" : "") + '> Tamamlananları göster</label></div></div></details></div></div></div>' +
    '<div class="backlog-filter-summary"><span id="backlog-result-count" role="status"></span><div class="backlog-filter-chips" hidden></div></div><div class="backlog-bulk-bar" role="group" aria-label="Seçili işlerin işlemleri" hidden></div><div class="backlog-table-shell"><div class="backlog-table-topbar"><div class="backlog-table-topbar-left"><div class="view-tabs"><button class="view-tab selected" data-action="list">' + icon("list") + 'Liste</button><button class="view-tab" data-action="kanban">' + icon("board") + 'Board</button></div><div class="backlog-view-recents"></div>' + (backlogMode === "list" ? '<button type="button" class="button button-quiet button-small" data-action="manual-backlog-order" aria-pressed="' + (backlogSort === "manual") + '" title="Satırları sürükleyerek sırala">Elle sırala</button>' : '') + '</div><div class="backlog-table-topbar-right">' + (backlogMode === "list" ? '<button class="button ' + (readyWorkPool ? 'button-primary' : 'button-secondary') + ' button-small" data-action="toggle-ready-pool" aria-pressed="' + readyWorkPool + '">' + (readyWorkPool ? "✓ Hazır iş havuzu" : "Hazır iş havuzu") + '</button><details class="backlog-display-menu" name="backlog-menus"><summary class="button button-secondary button-small"><span aria-hidden="true">⚙</span> Görünüm <span class="summary-chevron" aria-hidden="true">' + icon("chevronDown") + '</span></summary><div class="backlog-display-popover"><div class="backlog-view-saved"><select id="backlog-saved-view" aria-label="Kaydedilmiş backlog görünümü">' + savedViewOptions + '</select><button class="button button-secondary button-small" data-action="save-backlog-view">Kaydet</button>' + (activeBacklogViewId ? '<button class="button button-quiet button-small" data-action="update-backlog-view" data-view-id="' + esc(activeBacklogViewId) + '">' + (viewDirty ? 'Güncelle · Değişiklik var' : 'Güncelle') + '</button>' : '') + '<button class="button button-quiet button-small" data-action="manage-backlog-views">Yönet</button></div><div class="backlog-menu-divider"></div><label class="backlog-density-control"><span>Satır</span><select id="backlog-density" aria-label="Tablo satır yoğunluğu"><option value="compact">Kompakt</option><option value="standard">Standart</option><option value="comfortable">Rahat</option></select></label><label class="backlog-density-control"><span>Alt bilgi</span><select id="backlog-secondary-info" aria-label="Satır ikincil bilgisi"><option value="id">İş ID</option><option value="updated">Son güncelleme</option><option value="assignment">Atama</option><option value="none">Kapalı</option></select></label><button class="button button-quiet button-small" data-action="toggle-title-wrap" aria-pressed="' + backlogTitleWrap + '">' + (backlogTitleWrap ? "Başlıkları tek satır yap" : "Başlıkları kaydır") + '</button><button class="button button-quiet button-small" data-action="manage-backlog-columns">Kolonlar</button><button class="button button-quiet button-small" data-action="toggle-backlog-preview" aria-pressed="' + backlogPreviewEnabled + '" title="Başlık önizlemesini aç veya kapat">' + (backlogPreviewEnabled ? "Önizleme açık" : "Önizleme kapalı") + '</button><button class="button button-quiet button-small" data-action="autofit-columns">Kolonları sığdır</button></div></details><details class="backlog-actions-menu" name="backlog-menus"><summary class="button button-secondary button-small"><span aria-hidden="true">⋯</span> Tablo işlemleri <span class="summary-chevron" aria-hidden="true">' + icon("chevronDown") + '</span></summary><div class="backlog-action-popover"><button class="button button-secondary button-small" data-action="backlog-export-excel">Excel’e aktar</button><button class="button button-secondary button-small" data-action="backlog-import-excel">Excel’den içe aktar</button><button class="button button-primary button-small" data-action="create-sprint" ' + (getSelectedBacklogItems().length ? "" : "disabled") + '>Sprint oluştur' + (getSelectedBacklogItems().length ? ' · ' + getSelectedBacklogItems().length : '') + '</button><button class="button button-danger button-small" data-action="delete-selected-backlog" ' + (getSelectedBacklogItems().length ? "" : "disabled") + '>Seçilileri sil' + (getSelectedBacklogItems().length ? ' · ' + getSelectedBacklogItems().length : '') + '</button></div></details>' : '') + '</div></div><div class="backlog-table-wrap"><table class="backlog-table"><thead><tr><th>İŞ</th><th>TÜR</th><th>ALAN</th><th>ÖNCELİK</th><th>DURUM</th><th>GÜNCELLENDİ</th><th></th></tr></thead><tbody id="backlog-rows"></tbody></table></div><div class="backlog-summary backlog-summary-footer"><span><strong id="visible-count">' + scopedItems.length + '</strong> / <strong id="total-count">' + state.items.filter((item) => !project || item.project === project.name).length + '</strong> iş</span><span class="summary-dot">·</span><span><i class="legend-dot indigo"></i>' + scopedItems.filter((item) => item.status === "Hazır").length + ' hazır</span><span><i class="legend-dot rose"></i>' + scopedItems.filter((item) => item.status === "Bloke").length + ' bloke</span><span class="summary-right">' + esc(lastBacklogActivityLabel(scopedItems)) + '</span></div></div></div>';
  root.querySelector(".backlog-bottom")?.remove();
  if (project) {
    const assignedMembers = (project.assignments || []).map((assignment) => {
      const teamName = state.teams.find((team) => team.id === assignment.teamId)?.name || "Takım";
      return '<span class="project-member-chip">' + esc(assignment.member) + '<small>' + esc(teamName + (assignment.scope ? " · " + assignment.scope : "")) + '</small></span>';
    }).join("");
    root.querySelector(".backlog-toolbar")?.insertAdjacentHTML("beforebegin", '<div class="project-team-strip"><div><strong>Proje ekibi</strong><small>' + (assignedMembers ? "Bu projeye atanmış kişiler" : "Henüz proje üyesi atanmadı") + '</small></div><div class="project-member-chips">' + (assignedMembers || '<span class="project-member-empty">Projeye kişi atamak için Proje ayarları’nı aç.</span>') + '</div></div>');
  }
  if (recentBacklogFilters.length) root.querySelector(".backlog-view-recents")?.insertAdjacentHTML("beforeend", '<select id="backlog-recent-filter" aria-label="Son kullanılan filtreler"><option value="">Son filtreler</option>' + recentBacklogFilters.map((filter, index) => { const label = [filter.query ? '“' + filter.query + '”' : "", filter.status, filter.type, filter.label, filter.teamId ? state.teams.find((team) => team.id === filter.teamId)?.name || "Takım" : "", filter.assignee.split("::")[1] || "", filter.sprintId ? filter.sprintId === "__unassigned" ? "Sprint atanmamış" : state.sprints.find((sprint) => sprint.id === filter.sprintId)?.name || "Sprint" : "", filter.includeCompleted ? "Tamamlananlar dahil" : "", filter.overdueOnly ? "Geciken işler" : ""].filter(Boolean).join(" · ") || "Filtre"; return '<option value="' + index + '">' + esc(label) + '</option>'; }).join("") + '</select>');
  const recentItems = recentItemIds.map((id) => itemById(id)).filter((item): item is WorkItem => Boolean(item));
  if (recentItems.length) root.querySelector(".backlog-view-recents")?.insertAdjacentHTML("beforeend", '<select id="backlog-recent-item" aria-label="Son açılan işler"><option value="">Son açılan işler</option>' + recentItems.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select>');
  if (backlogMode === "list") root.querySelector(".backlog-table-topbar-right")?.insertAdjacentHTML("afterbegin",
    '<button type="button" class="button button-primary button-small meeting-stage-start" data-action="start-meeting-stage" hidden>' + icon("note") + '<span>Toplantıyı başlat</span></button>');
  const densitySelect = root.querySelector<HTMLSelectElement>("#backlog-density");
  if (densitySelect) densitySelect.value = backlogDensity;
  const secondaryInfoSelect = root.querySelector<HTMLSelectElement>("#backlog-secondary-info");
  if (secondaryInfoSelect) secondaryInfoSelect.value = backlogSecondaryInfo;
  root.querySelector(".backlog-filter-popover")?.insertAdjacentHTML("beforeend", '<label class="backlog-filter-field"><span>Arama kapsamı</span><select id="backlog-search-scope" aria-label="Arama kapsamı"><option value="all">Tüm alanlarda ara</option><option value="title">Başlıkta ara</option><option value="description">Açıklamada ara</option><option value="id">İş ID’sinde ara</option><option value="labels">Etiketlerde ara</option><option value="components">Bileşenlerde ara</option></select></label><label class="backlog-filter-field"><span>Durumda en az (gün)</span><input id="backlog-status-age-min" type="number" min="0" max="3650" value="' + (backlogStatusAgeMinDays || "") + '" placeholder="Tümü" aria-label="Durumda en az gün"></label>');
  root.querySelector(".backlog-filter-popover")?.insertAdjacentHTML("beforeend", '<fieldset class="advanced-filter-group"><legend>Birleşik koşullar</legend><label>Koşul ilişkisi<select id="advanced-condition-mode"><option value="and">VE · tümü sağlansın</option><option value="or">VEYA · biri sağlansın</option></select></label><label>Çoklu durum<select id="advanced-statuses" multiple size="4">' + (["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"] as WorkStatus[]).map((value) => '<option ' + (backlogStatuses.includes(value) ? "selected" : "") + '>' + value + '</option>').join("") + '</select></label><label>Çoklu öncelik<select id="advanced-priorities" multiple size="4">' + (["Kritik", "Yüksek", "Orta", "Düşük"] as Priority[]).map((value) => '<option ' + (backlogPriorities.includes(value) ? "selected" : "") + '>' + value + '</option>').join("") + '</select></label><label>Hedef başlangıcı<input id="advanced-date-from" type="date" value="' + esc(backlogDateFrom) + '"></label><label>Hedef bitişi<input id="advanced-date-to" type="date" value="' + esc(backlogDateTo) + '"></label><label class="completed-filter"><input id="advanced-no-estimate" type="checkbox" ' + (backlogNoEstimate ? "checked" : "") + '> Tahminsiz işler</label></fieldset>');
  root.querySelector(".advanced-filter-group")?.insertAdjacentHTML("beforeend", '<label class="completed-filter"><input id="advanced-overdue" type="checkbox" ' + (backlogOverdueCondition ? "checked" : "") + '> Geciken işler</label>');
  (document.getElementById("advanced-condition-mode") as HTMLSelectElement).value = backlogConditionMode;
  (document.getElementById("backlog-search-scope") as HTMLSelectElement).value = backlogSearchScope;
  (document.getElementById("status-filter") as HTMLSelectElement).value = backlogStatus;
  (document.getElementById("type-filter") as HTMLSelectElement).value = backlogType;
  (document.getElementById("label-filter") as HTMLSelectElement).value = labelFilter;
  const headerRow = root.querySelector(".backlog-table thead tr");
  if (headerRow) headerRow.innerHTML = renderBacklogSelectionHeader() + renderBacklogSortHeader("title", "İŞ") + backlogColumns.map((id) => renderBacklogSortHeader(id, BACKLOG_COLUMN_CATALOG.find((column) => column.id === id)?.label.toLocaleUpperCase("tr-TR") || id)).join("") + backlogActionColumns();
  root.querySelectorAll<HTMLElement>(".view-tab").forEach((tab) => tab.classList.toggle("selected", (tab.dataset.action === "kanban" ? "board" : "list") === backlogMode));
  refreshBacklogAssigneeFilter();
  const tableWrap = root.querySelector<HTMLElement>(".backlog-table-wrap");
  if (backlogMode === "board" && tableWrap) tableWrap.outerHTML = '<div class="board-hint"><span>Kartı durum sütunları arasında sürükleyerek statüsünü güncelle.</span></div><div class="board-wrap" id="board-wrap" aria-label="Backlog durum panosu"></div>';
  updateBacklogRows();
  const wrap = root.querySelector(".backlog-table-wrap");
  if (wrap && previousSignature === backlogWindowSignature) wrap.scrollTop = listScroll;
}

function renderBacklogBulkBar(): void {
  const host = root.querySelector<HTMLElement>(".backlog-bulk-bar");
  if (!host) return;
  const selectedBacklogItems = backlogMode === "list" ? getSelectedBacklogItems() : [];
  host.hidden = selectedBacklogItems.length === 0;
  host.replaceChildren();
  if (host.hidden) return;
  const bulkStatusOptions = '<option value="">Seçililere durum ata</option>' + ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Tamamlandı"].map((status) => '<option value="' + status + '">' + status + '</option>').join("");
  const bulkAssigneeOptions = '<option value="">Seçililere kişi ata</option>' + state.teams.flatMap((team) => team.members.map((member) => '<option value="' + esc(team.id + "::" + member) + '">' + esc(team.name + " · " + member) + '</option>')).join("");
  host.insertAdjacentHTML("beforeend", '<strong role="status">' + selectedBacklogItems.length + ' iş seçili</strong><button type="button" class="button button-quiet button-small" data-action="clear-backlog-selection">Seçimi temizle</button>' + '<select class="bulk-action-select" id="bulk-status" aria-label="Seçili işlerin durumunu değiştir">' + bulkStatusOptions + '</select><select class="bulk-action-select" id="bulk-assignment" aria-label="Seçili işlere kişi ata">' + bulkAssigneeOptions + '</select><select class="bulk-action-select" id="bulk-project" aria-label="Seçili işleri projeye taşı"><option value="">Projeye taşı…</option>' + state.projects.filter((project) => !project.archived).map((project) => '<option value="' + esc(project.name) + '">' + esc(project.name) + '</option>').join("") + '</select><button class="button button-quiet button-small" data-action="bulk-labels">Etiketleri düzenle</button><button class="button button-quiet button-small" data-action="bulk-remove-sprint">Sprintten çıkar</button>');
  if (selectedBacklogItems.length) root.querySelector("#bulk-project")?.insertAdjacentHTML("afterend", '<select class="bulk-action-select" id="bulk-release" aria-label="Seçili işleri release kapsamına al"><option value="">Release kapsamına al…</option><option value="__none">Release atamasını kaldır</option>' + state.releases.filter((release) => selectedBacklogItems.every((item) => item.project === release.project)).map((release) => '<option value="' + esc(release.id) + '">' + esc(release.name) + '</option>').join("") + '</select>');
}

function renderBacklogSelectionHeader(): string {
  return '<th class="backlog-select-heading"><input type="checkbox" data-select-visible-backlog aria-label="Görünen tüm işleri seç" title="Görünen tümünü seç"></th>';
}

function renderBacklogSortHeader(column: "title" | BacklogColumnId, label: string): string {
  const current = sortState();
  const active = current?.column === column;
  const direction = active ? current.direction : "";
  const arrow = icon(direction === "asc" ? "chevronUp" : direction === "desc" ? "chevronDown" : "sort");
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
    table.querySelectorAll<HTMLTableRowElement>("tbody tr:not(.backlog-insert-row)").forEach((row) => { const cell = row.cells[index]; if (cell) cell.style.width = width + "px"; });
  });
}

function fitBacklogColumnsToWindow(): void {
  const table = root.querySelector<HTMLTableElement>(".backlog-table");
  const wrap = root.querySelector<HTMLElement>(".backlog-table-wrap");
  if (!table || !wrap || backlogMode !== "list") return;
  table.querySelectorAll<HTMLElement>(".backlog-auto-hidden").forEach((cell) => cell.classList.remove("backlog-auto-hidden"));
  const hidden: BacklogColumnId[] = [];
  const secondary: BacklogColumnId[] = backlogColumns.filter((id) => id !== "assignment").reverse();
  if (backlogColumns.includes("assignment")) secondary.push("assignment");
  const candidates = secondary.filter((id) => !["status", "priority"].includes(id) && !(inlineBacklogEdit?.field === "assignment" && id === "assignment"));
  for (const id of candidates) {
    if (table.scrollWidth <= wrap.clientWidth + 2) break;
    const index = backlogColumns.indexOf(id) + 2;
    table.querySelectorAll<HTMLTableRowElement>("tr").forEach((row) => row.cells[index]?.classList.add("backlog-auto-hidden"));
    hidden.push(id);
  }
  let indicator = root.querySelector<HTMLElement>(".backlog-hidden-columns");
  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "backlog-hidden-columns";
    root.querySelector(".backlog-table-topbar-left")?.append(indicator);
  }
  indicator.textContent = hidden.length ? hidden.length + " kolon sığdırmak için gizlendi: " + hidden.map((id) => BACKLOG_COLUMN_CATALOG.find((column) => column.id === id)?.label || id).join(", ") : "";
  indicator.hidden = hidden.length === 0;
}

function inlineInsertRow(afterId: string, isLast = false): string {
  const colspan = backlogColumns.length + 5;
  const rowClass = "backlog-insert-row" + (isLast ? " is-last" : "");
  if (inlineInsertAfterId === afterId) return '<tr class="' + rowClass + ' is-editing"><td colspan="' + colspan + '"><div class="backlog-insert-form"><span class="backlog-insert-form-icon" aria-hidden="true">＋</span><input class="field-input" data-inline-insert-title="' + esc(afterId) + '" maxlength="120" placeholder="Yeni task başlığı…" aria-label="Yeni task başlığı"><span class="backlog-insert-form-actions"><button type="button" class="inline-icon-action inline-icon-confirm" data-action="save-inline-insert" data-after-id="' + esc(afterId) + '" aria-label="Yeni taskı kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-action="cancel-inline-insert" aria-label="Yeni taskı iptal et" title="İptal">×</button></span></div></td></tr>';
  return '<tr class="' + rowClass + '"><td colspan="' + colspan + '"><button type="button" class="backlog-insert-button" data-action="start-inline-insert" data-after-id="' + esc(afterId) + '" aria-label="' + (afterId ? esc(afterId + ' işinden sonra yeni task ekle') : 'İlk taskı ekle') + '" title="Bu satırdan sonra yeni task ekle"><span aria-hidden="true">＋</span><span>Buraya task ekle</span></button></td></tr>';
}

let backlogWindowStart = 0;
let backlogWindowRowHeight = 54;
let backlogWindowSignature = "";
let backlogWindowFrame = 0;
let backlogSearchTimer = 0;
let filteredBacklogItems: WorkItem[] = [];
const boardDrawLimits: Record<string, number> = {};
document.addEventListener("scroll", (event) => {
  const wrap = event.target instanceof HTMLElement && event.target.matches(".backlog-table-wrap") ? event.target : null;
  if (!wrap || !wrap.dataset.virtual || inlineBacklogEdit || inlineInsertAfterId !== null) return;
  const start = Math.max(0, Math.floor(wrap.scrollTop / backlogWindowRowHeight) - 8);
  if (Math.abs(start - backlogWindowStart) < 8) return;
  cancelAnimationFrame(backlogWindowFrame);
  backlogWindowFrame = requestAnimationFrame(() => { backlogWindowStart = start; updateBacklogRows(); });
}, true);
function updateBacklogRows(): void {
  for (const id of selectedBacklogItemIds) if (!state.items.some((item) => item.id === id)) selectedBacklogItemIds.delete(id);
  const status = backlogStatus;
  const filterCount = [backlogStatus, backlogType, labelFilter, teamFilterId, assigneeFilter, backlogSprintId, backlogIncludeCompleted ? "completed" : "", backlogOverdueOnly ? "overdue" : "", backlogStatusAgeMinDays ? "statusAge" : ""].filter(Boolean).length;
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
    const advancedConditions = [
      ...(backlogStatuses.length ? [backlogStatuses.includes(item.status)] : []),
      ...(backlogPriorities.length ? [backlogPriorities.includes(item.priority)] : []),
      ...(backlogDateFrom ? [Boolean(item.targetDate && item.targetDate >= backlogDateFrom)] : []),
      ...(backlogDateTo ? [Boolean(item.targetDate && item.targetDate <= backlogDateTo)] : []),
      ...(backlogNoEstimate ? [item.estimate === undefined] : []),
      ...(backlogOverdueCondition ? [overdueDays(item) > 0] : [])
    ];
    const matchesAdvanced = !advancedConditions.length || (backlogConditionMode === "or" ? advancedConditions.some(Boolean) : advancedConditions.every(Boolean));
    return !item.archived && !item.mergedIntoId && isItemInActiveProject(item) && (!project || item.project === project.name) && completedIsVisible && (!status || item.status === status) && (!type || item.type === type) && (!label || (item.labels || []).includes(label)) && matchesTeam && matchesAssignee && matchesSprint && matchesQuery && matchesAdvanced && (!readyWorkPool || ready) && (!backlogOverdueOnly || overdueDays(item) > 0) && (!backlogStatusAgeMinDays || (statusAgeDays(item) ?? -1) >= backlogStatusAgeMinDays);
  }));
  filteredBacklogItems = items;
  const estimateSummary = "Tahmin: " + items.reduce((sum, item) => sum + (item.estimate || 0), 0) + " " + (state.estimateUnit || "saat") + " · " + items.filter((item) => item.estimate === undefined).length + " tahminsiz";
  let summary = document.getElementById("backlog-estimate-summary");
  if (!summary) { summary = document.createElement("span"); summary.id = "backlog-estimate-summary"; root.querySelector(".backlog-bottom")?.append(summary); }
  summary.textContent = estimateSummary;
  const board = document.getElementById("board-wrap");
  if (board) {
    root.querySelector(".board-empty-results")?.remove();
    if (!items.length) board.insertAdjacentHTML("beforebegin", '<div class="board-empty-results">Gösterilecek iş yok.</div>');
    const columns = ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"];
    board.innerHTML = columns.map((column) => {
      const cards = items.filter((item) => item.status === column);
      return '<section class="board-column" data-board-status="' + esc(column) + '"><header><span><i class="board-status-dot ' + statusClass(column) + '"></i>' + esc(column) + '</span><b>' + cards.length + '</b></header><div class="board-cards">' + (cards.length ? cards.slice(0, boardDrawLimits[column] || 40).map((item) => '<button class="board-card" data-board-card="' + esc(item.id) + '" data-open-item="' + esc(item.id) + '" aria-label="' + esc(item.id + " · " + item.title + " · " + item.status + ". Durumu değiştirmek için başka bir sütuna sürükle veya Shift+Sol/Sağ kullan.") + '"><span class="board-card-id"><span class="board-card-key">' + esc(item.id) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span></span><strong class="backlog-preview-trigger" data-preview-item="' + esc(item.id) + '" tabindex="0" aria-haspopup="dialog">' + esc(item.title) + '</strong><span class="board-card-footer"><span>' + esc(item.area) + '</span><span class="board-assignment" title="' + esc(assignmentSummary(item)) + '">' + (getWorkAssignments(item).length ? esc(assignmentSummary(item)) : "Atanmamış") + '</span><span class="table-type ' + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type") + '">' + itemIcon(item.type) + '</span></span></button>').join("") : '<div class="board-empty">Henüz iş yok</div>') + '</div></section>';
    }).join("");
    for (const [index, status] of columns.entries()) {
      const count = items.filter((item) => item.status === status).length;
      const limit = boardDrawLimits[status] || 40;
      if (count > limit) board.querySelectorAll<HTMLElement>(".board-column")[index]?.insertAdjacentHTML("beforeend", '<button class="button button-quiet button-small" data-action="board-load-more" data-status="' + esc(status) + '">' + Math.min(40, count - limit) + ' kart daha · ' + limit + ' / ' + count + '</button>');
    }
    (document.getElementById("visible-count") as HTMLElement).textContent = String(items.length);
    (document.getElementById("total-count") as HTMLElement).textContent = String(state.items.filter((item) => !project || item.project === project.name).length);
    renderActiveBacklogFilterChips();
    updateSavedBacklogViewDirtyIndicator();
    return;
  }
  root.querySelector('[data-action="manual-backlog-order"]')?.setAttribute("aria-pressed", String(backlogSort === "manual"));
  const tbody = document.getElementById("backlog-rows");
  if (!tbody) return;
  (document.getElementById("visible-count") as HTMLElement).textContent = String(items.length);
  (document.getElementById("total-count") as HTMLElement).textContent = String(state.items.filter((item) => !project || item.project === project.name).length);
  renderActiveBacklogFilterChips();
  closeBacklogPreview();
  const wrap = root.querySelector<HTMLElement>(".backlog-table-wrap");
  const virtual = items.length > 200;
  const signature = items.map((item) => item.id).join("|");
  if (signature !== backlogWindowSignature) { backlogWindowStart = 0; if (wrap) wrap.scrollTop = 0; backlogWindowSignature = signature; }
  if (wrap) { if (virtual) wrap.dataset.virtual = "true"; else delete wrap.dataset.virtual; }
  const start = virtual ? Math.min(backlogWindowStart, Math.max(0, items.length - 60)) : 0;
  const drawn = virtual ? items.slice(start, start + 60) : items;
  const spacer = (count: number) => count > 0 ? '<tr class="virtual-spacer" aria-hidden="true"><td colspan="' + (backlogColumns.length + 5) + '" style="height:' + count * backlogWindowRowHeight + 'px"></td></tr>' : '';
  tbody.innerHTML = drawn.map((item, index) => '<tr data-open-item="' + esc(item.id) + '" class="backlog-work-row' + (backlogSort === "manual" ? ' backlog-reorder-row' : '') + '" ' + '>' + renderBacklogSelectionCell(item) + renderBacklogTitleCell(item) + backlogColumns.map((column) => renderBacklogCell(item, column)).join("") + backlogActionColumns(item.id) + '</tr>' + inlineInsertRow(item.id, start + index === items.length - 1)).join("") || '<tr><td colspan="' + (backlogColumns.length + 5) + '" class="empty-table">Bu filtrelerle eşleşen iş yok.</td></tr>' + inlineInsertRow("", true);
  if (virtual) {
    tbody.insertAdjacentHTML("afterbegin", spacer(start)); tbody.insertAdjacentHTML("beforeend", spacer(items.length - start - drawn.length));
    const first = tbody.querySelector<HTMLElement>(".backlog-work-row");
    const measured = (first?.getBoundingClientRect().height || 0) / appZoom;
    if (measured > 10 && !inlineBacklogEdit && inlineInsertAfterId === null) backlogWindowRowHeight = measured;
  }
  applyBacklogColumnWidths();
  fitBacklogColumnsToWindow();
  if (!items.length) { const empty = tbody.querySelector(".empty-table"); if (empty) empty.innerHTML = 'Bu filtrelerle eşleşen iş yok.<br><button type="button" class="button button-quiet button-small" data-action="clear-backlog-filters">Filtreleri temizle</button>'; }
  const visibleSelector = root.querySelector<HTMLInputElement>("[data-select-visible-backlog]");
  const selectedVisible = items.filter((item) => selectedBacklogItemIds.has(item.id)).length;
  if (visibleSelector) { visibleSelector.checked = items.length > 0 && selectedVisible === items.length; visibleSelector.indeterminate = selectedVisible > 0 && selectedVisible < items.length; }
  root.querySelectorAll<HTMLInputElement>("[data-select-backlog-item]").forEach((checkbox) => { checkbox.checked = selectedBacklogItemIds.has(checkbox.dataset.selectBacklogItem || ""); });
  renderBacklogBulkBar();
  const selectedCount = getSelectedBacklogItems().length;
  const meetingButton = root.querySelector<HTMLButtonElement>('[data-action="start-meeting-stage"]');
  if (meetingButton) {
    meetingButton.hidden = selectedCount === 0;
    meetingButton.querySelector("span")!.textContent = "Toplantıyı başlat · " + selectedCount;
  }
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
  if (backlogOverdueOnly) chips.push(["overdue", "Geciken işler"]);
  if (backlogStatuses.length) chips.push(["statuses", "Durumlar: " + backlogStatuses.join(", ")]);
  if (backlogPriorities.length) chips.push(["priorities", "Öncelikler: " + backlogPriorities.join(", ")]);
  if (backlogDateFrom) chips.push(["dateFrom", "Hedef başlangıcı: " + backlogDateFrom]);
  if (backlogDateTo) chips.push(["dateTo", "Hedef bitişi: " + backlogDateTo]);
  if (backlogNoEstimate) chips.push(["noEstimate", "Tahminsiz işler"]);
  if (backlogOverdueCondition) chips.push(["overdueCondition", "Geciken işler (koşul)"]);
  if (readyWorkPool) chips.push(["ready", "Hazır iş havuzu"]);
  if (backlogStatusAgeMinDays) chips.push(["statusAge", "Durumda en az " + backlogStatusAgeMinDays + " gün"]);
  host.innerHTML = chips.length ? '<span class="backlog-filter-chips-label">Etkin filtreler</span>' + chips.map(([key, label]) => '<button type="button" class="backlog-filter-chip" data-remove-backlog-filter="' + key + '">' + esc(label) + ' <span aria-hidden="true">×</span></button>').join("") : "";
  host.hidden = chips.length === 0;
  const count = root.querySelector("#backlog-result-count");
  const visible = document.getElementById("visible-count")?.textContent || "0";
  if (count && count.textContent !== visible + " iş") count.textContent = visible + " iş";
  if (chips.length) host.insertAdjacentHTML("beforeend", '<button type="button" class="backlog-filter-chip" data-action="clear-backlog-filters">Filtreleri temizle</button>');
}

function updateSavedBacklogViewDirtyIndicator(): void {
  if (!activeBacklogViewId) return;
  const view = savedBacklogViews.find((entry) => entry.id === activeBacklogViewId && entry.projectId === activeProjectId);
  const button = root.querySelector<HTMLButtonElement>('[data-action="update-backlog-view"]');
  if (!view || !button) return;
  const current = JSON.stringify({ mode: backlogMode, query, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, overdueOnly: backlogOverdueOnly, statusAgeMinDays: backlogStatusAgeMinDays, searchScope: backlogSearchScope, columns: backlogColumns, sort: backlogSort, statuses: backlogStatuses, priorities: backlogPriorities, dateFrom: backlogDateFrom, dateTo: backlogDateTo, noEstimate: backlogNoEstimate, overdueCondition: backlogOverdueCondition, conditionMode: backlogConditionMode });
  const saved = JSON.stringify({ mode: view.mode, query: view.query, status: view.status, type: view.type, label: view.label, teamId: view.teamId, assignee: view.assignee, sprintId: view.sprintId || "", includeCompleted: view.includeCompleted || false, overdueOnly: view.overdueOnly || false, statusAgeMinDays: view.statusAgeMinDays || 0, searchScope: view.searchScope || "all", columns: view.columns, sort: normalizeBacklogSort(view.sort === "manual" && view.secondarySort && view.secondarySort !== "manual" ? view.secondarySort : view.sort), statuses: view.statuses || [], priorities: view.priorities || [], dateFrom: view.dateFrom || "", dateTo: view.dateTo || "", noEstimate: Boolean(view.noEstimate), overdueCondition: Boolean(view.overdueCondition), conditionMode: view.conditionMode || "and" });
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
  return '<td><div class="table-title">' + typeControl + '<span class="backlog-title-cell"><span class="backlog-title-main"><button type="button" class="backlog-title-open" title="' + esc(item.title) + '" data-open-item="' + esc(item.id) + '" aria-label="' + esc("İşi aç: " + item.title) + '">' + highlightBacklogText(item.title) + '</button>' + '<button type="button" class="inline-edit-button" data-inline-action="edit-title" data-item-id="' + esc(item.id) + '" aria-label="Başlığı düzenle" title="Başlığı düzenle">✎</button><button type="button" class="backlog-preview-button" data-open-item="' + esc(item.id) + '"' + (backlogPreviewEnabled ? ' data-preview-item="' + esc(item.id) + '"' : '') + ' aria-haspopup="dialog" aria-label="' + esc((backlogPreviewEnabled ? "Önizle veya işi aç: " : "İşi aç: ") + item.title) + '">' + icon("eye") + '</button></span><small>' + (secondary ? esc(secondary) : "") + (item.attachments?.length ? ' <span class="attachment-indicator">▤ ' + item.attachments.length + '</span>' : "") + '</small>' + agingSummary + '</span></div></td>';
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

function showInlineFeedback(itemId: string, field: "title" | "status" | "assignment" | "type", message: string, error = false): void {
  window.clearTimeout(inlineFeedbackTimer);
  root.querySelectorAll(".inline-save-feedback").forEach((element) => element.remove());
  const row = [...root.querySelectorAll<HTMLTableRowElement>(".backlog-table tbody tr")].find((entry) => entry.dataset.openItem === itemId);
  const selector = field === "title" ? '[data-inline-title], [data-inline-action="edit-title"]' : field === "status" ? '[data-inline-status], [data-inline-action="edit-status"]' : field === "type" ? '[data-inline-type], [data-inline-action="edit-type"]' : '[data-inline-member], [data-inline-action="edit-assignment"]';
  const control = row?.querySelector<HTMLElement>(selector);
  const host = control?.closest("[data-inline-zone]") || control?.parentElement;
  if (!host) return;
  const feedback = document.createElement("span");
  feedback.className = "inline-save-feedback " + (error ? "inline-save-error" : "inline-save-success");
  feedback.setAttribute("role", error ? "alert" : "status");
  feedback.textContent = (error ? "⚠ " : "✓ ") + message;
  host.append(feedback);
  if (error) control?.setAttribute("aria-invalid", "true");
  else inlineFeedbackTimer = window.setTimeout(() => feedback.remove(), 3000);
}

function commitInlineTitle(itemId: string): void {
  const item = itemById(itemId);
  const input = root.querySelector<HTMLInputElement>('[data-inline-title="' + CSS.escape(itemId) + '"]');
  const title = input?.value.trim() || "";
  if (!item || !title) { showInlineFeedback(itemId, "title", "Başlık boş olamaz.", true); input?.focus(); return; }
  if (title !== item.title) {
    const previous = item.title;
    item.title = title;
    item.updated = "Az önce";
    logWorkChange(item, "Başlık", previous, title);
    if (!save()) { showInlineFeedback(itemId, "title", "Kaydedilemedi. Üstteki uyarıdan yeniden deneyin.", true); input?.focus(); return; }
  }
  inlineBacklogEdit = null;
  updateBacklogRows();
  showInlineFeedback(itemId, "title", "Kaydedildi");
  root.querySelector<HTMLElement>('[data-inline-action="edit-title"][data-item-id="' + CSS.escape(itemId) + '"]')?.focus();
}

function commitInlineStatus(itemId: string): void {
  const item = itemById(itemId);
  const select = root.querySelector<HTMLSelectElement>('[data-inline-status="' + CSS.escape(itemId) + '"]');
  if (!item || !select) return;
  const nextStatus = select.value as WorkStatus;
  if (nextStatus === item.status) { inlineBacklogEdit = null; updateBacklogRows(); return; }
  inlineBacklogEdit = null;
  if (nextStatus === "Bloke") { updateBacklogRows(); openStatusUpdateModal(item.id, nextStatus, true); return; }
  if (!applyWorkStatus(item, nextStatus, item.blocker)) return;
  item.updated = "Az önce";
  if (!save()) { showInlineFeedback(itemId, "status", "Kaydedilemedi. Üstteki uyarıdan yeniden deneyin.", true); return; }
  updateBacklogRows();
  showInlineFeedback(itemId, "status", "Kaydedildi");
  root.querySelector<HTMLElement>('[data-inline-action="edit-status"][data-item-id="' + CSS.escape(itemId) + '"]')?.focus();
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
    if (!save()) { showInlineFeedback(itemId, "type", "Kaydedilemedi. Üstteki uyarıdan yeniden deneyin.", true); select.focus(); return; }
  }
  inlineBacklogEdit = null;
  updateBacklogRows();
  showInlineFeedback(itemId, "type", "Kaydedildi");
  root.querySelector<HTMLElement>('[data-inline-action="edit-type"][data-item-id="' + CSS.escape(itemId) + '"]')?.focus();
}

function commitInlineAssignment(itemId: string, change: { removeIndex?: number; add?: WorkAssignment }, closeEditor = false): boolean {
  const item = itemById(itemId);
  if (!item) return false;
  const before = getWorkAssignments(item).map((assignment) => ({ ...assignment }));
  let next = [...before];
  if (change.removeIndex != null) next.splice(change.removeIndex, 1);
  if (change.add) {
    if (next.some((entry) => entry.teamId === change.add?.teamId && entry.member === change.add.member)) { showInlineFeedback(itemId, "assignment", "Bu kişi işe zaten atanmış.", true); return false; }
    next.push(change.add);
  }
  next = validAssignments(next);
  item.assignments = next;
  syncLegacyAssignmentFields(item);
  item.updated = "Az önce";
  const describe = (assignments: WorkAssignment[]) => assignments.map((assignment) => (state.teams.find((team) => team.id === assignment.teamId)?.name || "Takım") + " · " + assignment.member + (assignment.scope ? " (" + assignment.scope + ")" : "")).join("; ") || "Atama yok";
  addWorkActivity(item, "change", "Atama: " + describe(before) + " → " + describe(next));
  if (!save()) { showInlineFeedback(itemId, "assignment", "Kaydedilemedi. Üstteki uyarıdan yeniden deneyin.", true); return false; }
  if (closeEditor) inlineBacklogEdit = null;
  updateBacklogRows();
  showInlineFeedback(itemId, "assignment", change.add ? "Atama kaydedildi" : "Atama kaldırıldı");
  root.querySelector<HTMLInputElement>('[data-inline-member="' + CSS.escape(itemId) + '"]')?.focus();
  return true;
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
    showInlineFeedback(edit.itemId, "assignment", "Atamak için geçerli bir takım üyesi seçin.", true);
    memberInput?.focus();
    return false;
  }
  return commitInlineAssignment(edit.itemId, { add: { teamId, member, ...(scope ? { scope } : {}) } }, true);
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
    statusAge: '<span title="' + esc(item.statusEnteredAt ? new Date(item.statusEnteredAt).toLocaleString("tr-TR") : "Bu durumun başlangıcı kayıtlı değil") + '">' + (statusAgeDays(item) === null ? "Bilinmiyor" : statusAgeDays(item) + " gün") + '</span>',
    updated: '<span class="updated-label">' + esc(item.updated || "—") + '</span>',
    assignment: renderInlineAssignmentCell(item),
    project: '<span>' + esc(item.project || "—") + '</span>',
    description: '<span class="backlog-cell-truncate" title="' + esc(item.description || "") + '">' + esc(item.description || "—") + '</span>',
    labels: '<span class="backlog-cell-truncate">' + esc((item.labels || []).join(", ") || "—") + '</span>',
    startDate: '<span>' + esc(item.startDate || item.actualStartDate || "—") + '</span>',
    targetDate: '<span>' + esc(item.targetDate || "—") + '</span>',
    targetPeriod: '<span>' + esc(item.targetPeriod || "—") + '</span>',
    estimate: '<span>' + esc(item.estimate == null ? "—" : item.estimate + " " + (state.estimateUnit || "saat")) + '</span>',
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
    return '<div class="backlog-column-option ' + (enabled ? "enabled" : "") + '" data-column-order="' + id + '" draggable="' + enabled + '"><label><span class="column-drag-handle" aria-hidden="true">⠿</span><input type="checkbox" data-backlog-column-toggle="' + id + '" ' + (enabled ? "checked" : "") + '><span>' + esc(label) + '</span></label><div><button type="button" class="button button-quiet button-small" data-action="move-backlog-column" data-direction="up" data-column-id="' + id + '" ' + (!enabled || index === 0 ? "disabled" : "") + ' aria-label="' + esc(label + " kolonunu yukarı taşı") + '">' + icon("chevronUp") + '</button><button type="button" class="button button-quiet button-small" data-action="move-backlog-column" data-direction="down" data-column-id="' + id + '" ' + (!enabled || index === backlogColumnDraft.length - 1 ? "disabled" : "") + ' aria-label="' + esc(label + " kolonunu aşağı taşı") + '">' + icon("chevronDown") + '</button></div></div>';
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
    status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, overdueOnly: backlogOverdueOnly, statusAgeMinDays: backlogStatusAgeMinDays, searchScope: backlogSearchScope,
    statuses: [...backlogStatuses], priorities: [...backlogPriorities], dateFrom: backlogDateFrom, dateTo: backlogDateTo, noEstimate: backlogNoEstimate, overdueCondition: backlogOverdueCondition, conditionMode: backlogConditionMode,
    columns: [...backlogColumns], sort: backlogSort
  };
}

let pendingBulkPreview: { kind: "status" | "assignment" | "project" | "release"; value: string; itemIds: string[]; assignmentMode?: "add" | "replace" | "remove" } | null = null;
function openBulkImpactPreview(kind: "status" | "assignment" | "project" | "release", value: string): void {
  const items = getSelectedBacklogItems();
  if (!items.length) { toast("Önce backlog işlerini seç."); return; }
  pendingBulkPreview = { kind: kind as "status" | "assignment" | "project" | "release", value, itemIds: items.map((item) => item.id) };
  if (kind === "assignment") pendingBulkPreview.assignmentMode = "add";
  const label = kind === "status" ? "Durum" : kind === "assignment" ? "Atama ekle" : kind === "project" ? "Proje" : "Release";
  const targetLabel = kind === "assignment" ? value.split("::")[1] || value : kind === "release" ? (value === "__none" ? "Atamayı kaldır" : state.releases.find((entry) => entry.id === value)?.name || value) : value;
  const incompatible = items.filter((item) => kind === "release" && value !== "__none" ? item.project !== state.releases.find((entry) => entry.id === value)?.project : kind === "status" ? item.status === value || value === "Bloke" && (!item.blocker?.reason || !item.blocker?.nextStep || !item.blocker?.owner || !item.blocker?.expectedAction) : kind === "project" ? item.project === value : false);
  const rows = items.map((item) => '<tr><td>' + esc(item.id) + '</td><td>' + esc(item.title) + '</td><td>' + esc(kind === "status" ? item.status : kind === "project" ? item.project : kind === "release" ? state.releases.find((entry) => entry.id === item.releaseId)?.name || "Atama yok" : assignmentSummary(item)) + '</td><td>' + esc(incompatible.includes(item) ? "Atlanacak · aynı değer veya eksik/uyumsuz bilgi" : targetLabel) + '</td></tr>').join("");
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal bulk-preview-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">TOPLU İŞLEM ÖNİZLEMESİ</div><h2>' + esc(label) + ' değişikliği</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><div class="bulk-impact-summary"><strong>' + items.length + ' seçili kayıt</strong><span>' + (items.length - incompatible.length) + ' değişecek</span><span class="' + (incompatible.length ? "has-warning" : "") + '">' + incompatible.length + ' atlanacak</span></div><div class="bulk-preview-scroll"><table><thead><tr><th>İş</th><th>Başlık</th><th>Önce</th><th>Sonra</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="settings-note">Proje değişirse release ve sprint bağlantıları kaldırılır. İşlem tamamlandığında değişen kayıtlar için geri alma sunulur.</p><footer class="modal-footer"><button class="button button-quiet" data-close-modal>Vazgeç</button><button class="button button-primary" data-action="apply-bulk-preview">' + (items.length - incompatible.length) + ' kaydı güncelle</button></footer></div></section></div>';
  if (kind === "assignment") modalRoot.querySelector(".bulk-impact-summary")?.insertAdjacentHTML("beforebegin", '<label class="field-label">Çoklu atama işlemi<select id="bulk-assignment-mode" class="field-input"><option value="add">Üyeyi mevcut atamalara ekle</option><option value="replace">Tüm atamaları bu üyeyle değiştir</option><option value="remove">Üyeyi atamalardan kaldır</option></select></label>');
  refreshBulkAssignmentPreview();
}

function refreshBulkAssignmentPreview(): void {
  const preview = pendingBulkPreview; if (!preview || preview.kind !== "assignment") return;
  const mode = modalRoot.querySelector<HTMLSelectElement>("#bulk-assignment-mode")?.value || "add";
  const [teamId, member] = preview.value.split("::");
  let changed = 0;
  preview.itemIds.forEach((id, index) => {
    const item = itemById(id); if (!item) return;
    const current = getWorkAssignments(item);
    const remaining = current.filter((entry) => entry.teamId !== teamId || entry.member !== member);
    const next = mode === "remove" ? remaining : mode === "replace" ? [{ teamId, member }] : [...remaining, { teamId, member }];
    const identical = JSON.stringify(current) === JSON.stringify(next);
    if (!identical) changed++;
    const cell = modalRoot.querySelectorAll("tbody tr")[index]?.lastElementChild;
    if (cell) cell.textContent = identical ? "Atlanacak · atama aynı" : next.map((entry) => entry.member).join(", ") || "Atama yok";
  });
  const spans = modalRoot.querySelectorAll(".bulk-impact-summary span"); if (spans[0]) spans[0].textContent = changed + " değişecek"; if (spans[1]) spans[1].textContent = preview.itemIds.length - changed + " atlanacak";
}
function applyBulkImpactPreview(): void {
  if (!pendingBulkPreview) return;
  const preview = pendingBulkPreview; preview.assignmentMode = (modalRoot.querySelector<HTMLSelectElement>("#bulk-assignment-mode")?.value || "add") as "add" | "replace" | "remove"; const items = preview.itemIds.map((id) => itemById(id)).filter((item): item is WorkItem => Boolean(item)); const before = structuredClone(items); let changed = 0; let skipped = 0;
  for (const item of items) {
    if (preview.kind === "status") { if (preview.value === item.status) { skipped++; continue; } if (preview.value === "Bloke" && (!item.blocker?.reason || !item.blocker?.nextStep || !item.blocker?.owner || !item.blocker?.expectedAction)) { skipped++; continue; } if (!applyWorkStatus(item, preview.value as WorkStatus, item.blocker)) { skipped++; continue; } changed++; }
    else if (preview.kind === "assignment") { const [teamId, member] = preview.value.split("::"); if (!state.teams.find((team) => team.id === teamId)?.members.includes(member)) { skipped++; continue; } const current = getWorkAssignments(item); const remaining = current.filter((entry) => entry.teamId !== teamId || entry.member !== member); const next = preview.assignmentMode === "remove" ? remaining : preview.assignmentMode === "replace" ? [{ teamId, member }] : [...remaining, { teamId, member }]; if (JSON.stringify(current) === JSON.stringify(next)) { skipped++; continue; } item.assignments = next; syncLegacyAssignmentFields(item); changed++; }
    else if (preview.kind === "project") { if (item.project === preview.value) { skipped++; continue; } item.project = preview.value; item.projectId = state.projects.find((entry) => entry.name === preview.value)?.id; item.releaseId = undefined; item.sprintId = undefined; changed++; }
    else { const release = preview.value === "__none" ? undefined : state.releases.find((entry) => entry.id === preview.value); if (preview.value !== "__none" && !release) { skipped++; continue; } if (item.releaseId === release?.id) { skipped++; continue; } if (release && release.project !== item.project) { skipped++; continue; } item.releaseId = release?.id; changed++; }
    item.updated = "Az önce"; addWorkActivity(item, "change", "Toplu işlem uygulandı: " + preview.kind + " → " + preview.value);
  }
  pendingBulkPreview = null; save(); closeModal(); renderBacklog(); toastUndo(changed + " kayıt güncellendi" + (skipped ? ", " + skipped + " kayıt atlandı." : "."), before);
}

function persistBacklogViews(): void {
  localStorage.setItem(BACKLOG_VIEWS_PREFERENCE_KEY, JSON.stringify(savedBacklogViews));
}

function rememberRecentBacklogFilter(): void {
  const filter: RecentBacklogFilter = { query: query.trim(), searchScope: backlogSearchScope, status: backlogStatus, type: backlogType, label: labelFilter, teamId: teamFilterId, assignee: assigneeFilter, sprintId: backlogSprintId, includeCompleted: backlogIncludeCompleted, overdueOnly: backlogOverdueOnly, statusAgeMinDays: backlogStatusAgeMinDays };
  if (!filter.query && !filter.status && !filter.type && !filter.label && !filter.teamId && !filter.assignee && !filter.sprintId && !filter.includeCompleted && !filter.overdueOnly) return;
  const key = JSON.stringify(filter);
  recentBacklogFilters = [filter, ...recentBacklogFilters.filter((entry) => JSON.stringify(entry) !== key)].slice(0, 5);
  localStorage.setItem(BACKLOG_RECENT_FILTERS_KEY, JSON.stringify(recentBacklogFilters));
  let host = root.querySelector<HTMLElement>(".backlog-view-recents");
  if (!host) {
    root.querySelector(".backlog-view-controls")?.insertAdjacentHTML("beforeend", '<div class="backlog-view-recents"></div>');
    host = root.querySelector<HTMLElement>(".backlog-view-recents");
  }
  if (host) {
    const options = recentBacklogFilters.map((entry, index) => { const label = [entry.query ? '“' + entry.query + '”' : "", entry.status, entry.type, entry.label, entry.teamId ? state.teams.find((team) => team.id === entry.teamId)?.name || "Takım" : "", entry.assignee.split("::")[1] || "", entry.sprintId ? entry.sprintId === "__unassigned" ? "Sprint atanmamış" : state.sprints.find((sprint) => sprint.id === entry.sprintId)?.name || "Sprint" : "", entry.includeCompleted ? "Tamamlananlar dahil" : "", entry.overdueOnly ? "Geciken işler" : ""].filter(Boolean).join(" · ") || "Filtre"; return '<option value="' + index + '">' + esc(label) + '</option>'; }).join("");
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
  backlogOverdueOnly = view.overdueOnly || false; backlogStatusAgeMinDays = view.statusAgeMinDays || 0;
  backlogOverdueCondition = Boolean(view.overdueCondition);
  backlogStatuses = [...(view.statuses || [])]; backlogPriorities = [...(view.priorities || [])]; backlogDateFrom = view.dateFrom || ""; backlogDateTo = view.dateTo || ""; backlogNoEstimate = Boolean(view.noEstimate); backlogConditionMode = view.conditionMode === "or" ? "or" : "and";
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
      case "statusAge": return statusAgeDays(item);
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
  return '<section class="backlog-preview-card" data-preview-card="' + esc(item.id) + '" role="dialog" aria-label="' + esc(item.id + " iş önizlemesi") + '"><header class="backlog-preview-header"><div><span class="backlog-preview-id">' + esc(item.id) + ' · ' + esc(item.type) + '</span><h2>' + esc(item.title) + '</h2></div><button type="button" class="backlog-preview-close" data-close-backlog-preview aria-label="Önizlemeyi kapat">×</button></header><div class="backlog-preview-badges"><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span><span class="backlog-preview-area">' + esc(item.area || "Ürün alanı yok") + '</span></div><p class="backlog-preview-description">' + esc(description) + '</p><div class="backlog-preview-details"><div><span>PROJE</span><strong>' + esc(item.project) + '</strong></div><div><span>TAKIM / ÜYE</span><strong>' + esc(assignmentText) + '</strong></div>' + (dates ? '<div><span>PLAN</span><strong>' + esc(dates) + '</strong></div>' : '') + (item.estimate != null ? '<div><span>TAHMİN</span><strong>' + esc(item.estimate) + ' ' + esc(state.estimateUnit || "saat") + '</strong></div>' : '') + (assets.length ? '<div><span>BİLEŞENLER</span><strong>' + esc(assets.join(", ")) + '</strong></div>' : '') + '<div><span>SON GÜNCELLEME</span><strong>' + esc(activity ? activity.message : item.updated) + '</strong></div></div>' + (labels.length ? '<div class="backlog-preview-labels">' + labels.map((label) => '<span>' + esc(label) + '</span>').join("") + ((item.labels || []).length > labels.length ? '<small>+' + ((item.labels || []).length - labels.length) + '</small>' : '') + '</div>' : '') + '<footer><span>' + (item.acceptance?.length || 0) + ' kabul kriteri · ' + (item.attachments?.length || 0) + ' ek</span><button type="button" class="button button-primary button-small" data-open-item="' + esc(item.id) + '">İş ayrıntılarını aç </button></footer></section>';
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
  if (!item || !backlogPreviewEnabled || !anchor.isConnected || modalRoot.querySelector('[role="dialog"]')) return;
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
  scope?.insertAdjacentHTML("beforebegin", '<label class="sprint-scope-search"><span class="search-glyph">' + icon("search") + '</span><input id="sprint-item-search" type="search" placeholder="Seçili işlerde ara…" aria-label="Sprint kapsamındaki işleri ara"></label>');
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

function renderAssets(): void {
  root.innerHTML = '<div class="page-content assets-page"><section class="page-title-row inventory-heading"><div class="inventory-identity"><span class="inventory-mark">' + icon("inventory") + '</span><div><div class="inventory-title"><h1>Ürün envanteri</h1><span class="inventory-count"><strong id="asset-visible-count">0</strong> bileşen</span></div><p>Ürün bileşenleri ve backlog bağlantıları</p></div></div><div class="inventory-actions"><div class="inventory-view-switch" role="group" aria-label="Envanter görünümü">' + (["cards", "diagram"] as const).map((mode) => '<button type="button" data-action="asset-presentation" data-mode="' + mode + '" aria-pressed="' + (assetPresentation === mode) + '" aria-label="' + (mode === "cards" ? 'Kart görünümü' : 'İlişki diyagramı') + '" data-tooltip="' + (mode === "cards" ? 'Kart görünümü' : 'İlişki diyagramı') + '">' + icon(mode === "cards" ? "grid" : "diagram") + '</button>').join("") + '</div><button type="button" class="inventory-add icon-action" data-action="new-asset" aria-label="Bileşen ekle" data-tooltip="Bileşen ekle">' + icon("add") + '</button></div></section>' +
    '<div class="inventory-controls"><div class="inventory-filter-row"><label class="inventory-search">' + icon("search") + '<input id="asset-search" type="search" aria-label="Envanterde ara" placeholder="Envanterde ara…" value="' + esc(assetQuery) + '"></label><div class="inventory-filter-fields"><label class="inventory-select">' + icon("inventory") + '<select id="asset-type-filter" aria-label="Bileşen türü"><option value="">Tüm türler</option>' + ["Ekran", "Batch", "Rapor", "Servis/API", "Entegrasyon", "Diğer"].map((type) => '<option ' + (assetTypeFilter === type ? "selected" : "") + '>' + type + '</option>').join("") + '</select></label><label class="inventory-select inventory-project">' + icon("folder") + '<select id="asset-project-filter" aria-label="Proje"><option value="">Tüm projeler</option>' + state.projects.filter((project) => !project.archived).map((project) => '<option ' + (assetProjectFilter === project.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label></div><label class="inventory-inactive"><input id="asset-inactive-filter" type="checkbox" role="switch" ' + (includeInactiveAssets ? "checked" : "") + '><span class="inventory-switch" aria-hidden="true"></span><span>Pasifler</span></label></div><div class="inventory-status"><span><i></i><span id="asset-active-count">0</span> aktif bileşen</span><button type="button" data-action="clear-asset-filters" hidden>' + icon("close") + 'Filtreleri temizle</button></div></div><div id="asset-content"></div></div>';
  updateAssetGrid();
}

function updateAssetGrid(): void {
  const content = document.getElementById("asset-content");
  const visibleCount = document.getElementById("asset-visible-count");
  if (!content || !visibleCount) return;
  const normalizedQuery = assetQuery.trim().toLocaleLowerCase("tr-TR");
  const assets = state.assets.filter((asset) => !state.projects.some((project) => project.name === asset.project && project.archived) && (includeInactiveAssets || asset.active) && (!assetTypeFilter || asset.type === assetTypeFilter) && (!assetProjectFilter || asset.project === assetProjectFilter) && (!normalizedQuery || (asset.code + " " + asset.name + " " + asset.area + " " + asset.purpose).toLocaleLowerCase("tr-TR").includes(normalizedQuery)));
  visibleCount.textContent = String(assets.length);
  const activeCount = document.getElementById("asset-active-count"); if (activeCount) activeCount.textContent = String(assets.filter((asset) => asset.active).length);
  const clearFilters = root.querySelector<HTMLButtonElement>('[data-action="clear-asset-filters"]'); if (clearFilters) clearFilters.hidden = !assetQuery && !assetTypeFilter && !assetProjectFilter && !includeInactiveAssets;

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
    grid: { visible: true, size: 20, type: "dot", args: { color: document.body.classList.contains("dark-theme") ? "#343c4a" : "#dce1ed", thickness: 1 } },
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
        body: { fill: asset.active ? "var(--diagram-node-fill, #fff)" : "var(--diagram-node-inactive-fill, #f2f3f5)", stroke: "var(--diagram-node-border, #dfe4ed)", strokeWidth: 1, rx: 10, ry: 10 },
        label: { text: asset.type + "\n" + asset.name + "\n" + asset.code, fill: "var(--diagram-node-text, #343c4e)", fontSize: 12, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: nodeWidth - 28, height: nodeHeight - 24, ellipsis: true }, lineHeight: 21 },
      },
      ports: {
        groups: {
          left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } },
          right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } },
          top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } },
          bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } },
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
      labels: [{ attrs: { text: { text: asset.relatedAssetLabels?.[targetId] || "İlişkili", fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }],
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
  graph.on("edge:dblclick", async ({ edge }: { edge: Edge }) => {
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    if (!sourceId || !targetId) return;
    const source = state.assets.find((asset) => asset.id === sourceId);
    const currentLabel = source?.relatedAssetLabels?.[targetId] || "İlişkili";
    const label = (await appPrompt("Ok ilişki etiketini düzenle", currentLabel));
    if (label === null) return;
    persistAssetRelation(sourceId, targetId, label.trim().slice(0, 80) || "İlişkili");
    edge.setLabels([{ attrs: { text: { text: label.trim().slice(0, 80) || "İlişkili", fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }]);
    renderAssetRelationList(document.getElementById("asset-relation-list")!, assetDiagramAssets);
    toast("İlişki etiketi güncellendi.");
  });
  graph.on("edge:connected", ({ edge, isNew }: { edge: Edge; isNew: boolean }) => {
    if (!isNew) return;
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    if (!sourceId || !targetId) { edge.remove(); return; }
    edge.setLabels([{ attrs: { text: { text: "İlişkili", fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }]);
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
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal quick-create-modal" role="dialog" aria-modal="true" aria-labelledby="quick-create-title"><header class="modal-header"><div><div class="panel-kicker">HIZLI KAYIT · Ctrl+Shift+N</div><h2 id="quick-create-title">Yeni kayıt oluştur</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><form id="quick-create-form" class="settings-form work-record-form"><label class="field-label">Kayıt türü<select class="field-input" name="kind"><option ' + (defaultKind === "Backlog işi" ? "selected" : "") + '>Backlog işi</option><option ' + (defaultKind === "Kişisel görev" ? "selected" : "") + ' value="Kişisel görev">Görev</option><option ' + (defaultKind === "Not" ? "selected" : "") + '>Not</option></select></label><label class="field-label record-primary-field">Başlık<input class="field-input" name="title" maxlength="120" required autocomplete="off" placeholder="Kısa ve eylem odaklı bir başlık yaz…"></label><label class="field-label">Açıklama <small>(isteğe bağlı)</small><textarea class="field-input field-textarea" name="description" rows="3" placeholder="Bağlamı veya sıradaki adımı ekle…"></textarea></label><details class="record-collapsible"><summary><span><strong>Detaylar</strong><small>Proje, atama, ilişki ve planlama</small></span><i aria-hidden="true"></i></summary><div class="record-collapsible-content"><div class="form-two-col"><label class="field-label">Proje<select class="field-input" name="project">' + projects.map((project) => '<option value="' + esc(project.name) + '" ' + (project.name === activeProject?.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label><label class="field-label">İş türü<select class="field-input" name="workType"><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="field-label">Varsayılan atama<select class="field-input" name="assignment">' + quickAssignmentOptions + '</select></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked"><option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === linkedItemId ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label><label class="field-label">Son tarih<input class="field-input" name="due" type="date"></label></div></div></details><div class="quick-create-hint">Enter ile kaydet · Kaydet ve yenisini aç ile seri kayıt oluştur</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-secondary" name="mode" value="continue">Kaydet ve yenisini aç</button><button type="submit" class="button button-primary" name="mode" value="close">Kaydet</button></footer></form></section></div>';
  modalRoot.querySelector("#quick-create-form .modal-footer")?.insertAdjacentHTML("afterbegin", '<button type="button" class="button button-quiet" data-action="expand-create-form">Ayrıntılı form' + ((state.formDrafts || []).length ? ' · Taslak var' : '') + '</button>');
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

  } else {
    state.notes.unshift({ id: nextId("NOTE"), createdAt: new Date().toISOString(), title, body: description, linked, updated: "Az önce", attachments: [] });

  }
  if (kind === "Backlog işi" && assignmentValue) localStorage.setItem(QUICK_ASSIGNMENT_PREFERENCE_KEY, assignmentValue);
  state.formDrafts = []; window.clearTimeout(formDraftTimer);
  save();
  syncWorkspaceToolbar();
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
  if (kind === "Backlog işi") setView("backlog"); else render();
  if (createdProjectId) setProject(createdProjectId);
}

function openNewModal(defaultType?: string, linkedAssetId?: string): void {
  pendingDroppedEmailSource = null;
  pendingEmailAttachmentToken = "";
  pendingEmailAttachmentChoices = [];
  draftAttachments = [];
  draftAssetIds = linkedAssetId ? [linkedAssetId] : [];
  attachmentTarget = { kind: "draft" };
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal new-modal" role="dialog" aria-modal="true" aria-labelledby="new-title"><header class="modal-header"><div><div class="panel-kicker">YENİ KAYIT</div><h2 id="new-title">Çalışma alanına ekle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="new-form" class="work-record-form"><label class="field-label">Kayıt türü<select id="new-kind" class="field-input"><option>Backlog işi</option><option value="Kişisel görev">Görev</option><option>Not</option></select></label><label class="field-label">Başlık<input id="new-title-input" class="field-input" maxlength="120" placeholder="Örn. EFT iptal penceresini netleştir" required></label><label class="field-label">Açıklama<textarea id="new-description" class="field-input field-textarea" rows="3" placeholder="Bağlamı, yapılacak işi veya önemli noktaları yaz…"></textarea></label><div id="backlog-fields" class="form-two-col"><label class="field-label">Proje<select id="new-project" class="field-input"><option>Ödeme Platformu</option><option>Dijital Kanallar</option><option>Kredi Yaşam Döngüsü</option></select></label><label class="field-label">Öncelik<select id="new-priority" class="field-input"><option>Orta</option><option>Yüksek</option><option>Kritik</option><option>Düşük</option></select></label><label class="field-label">İş türü<select id="new-item-type" class="field-input"><option>Story</option><option>Bug</option><option>Task</option></select></label><label class="field-label">Ürün alanı<input id="new-area" class="field-input" placeholder="Örn. Para Transferleri"></label><label class="field-label acceptance-field">Kabul kriterleri<textarea id="new-acceptance" class="field-input field-textarea" rows="2" placeholder="Her kriteri ayrı satıra yaz"></textarea></label></div><div id="task-fields" class="form-two-col hidden"><label class="field-label">Son tarih<select id="new-due" class="field-input"><option>Bugün</option><option>Yarın</option><option>Bu hafta</option><option>Tarih belirlenmedi</option></select></label><label class="field-label">İlişkili backlog işi<select id="new-linked-task" class="field-input"><option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label></div><div id="note-fields" class="form-two-col hidden"><label class="field-label">İlişkili backlog işi<select id="new-linked-note" class="field-input"><option value="">Bağımsız not</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label></div><div class="attachment-box"><div class="attachment-box-heading"><div><strong>Dosyalar</strong><small>İlgili belgeleri, görselleri veya akışları ekle.</small></div><button type="button" class="button button-secondary button-small" data-pick-files>＋ Dosya ekle</button><input id="file-fallback" type="file" multiple hidden></div><div id="draft-files" class="draft-files"></div></div><div class="privacy-note"><span>ⓘ</span> Müşteri, hesap veya kart bilgisi içeren dosyaları ekleme. Ekler bu cihazda saklanır.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet <span>✓</span></button></footer></form></section></div>';
  const descriptionLabel = document.getElementById("new-description")?.closest(".field-label");
  descriptionLabel?.insertAdjacentHTML("beforeend", structuredEditorToolbar("new-description"));
  descriptionLabel?.insertAdjacentHTML("beforebegin", '<label class="field-label work-template-picker">İş şablonu<select id="new-work-template" class="field-input"><option value="">Boş kayıt</option>' + (state.workTemplates || []).map((template) => '<option value="' + esc(template.id) + '">' + esc(template.name) + '</option>').join("") + '</select></label>');
  const recoverableDraft = (state.formDrafts || []).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))[0];
  if (recoverableDraft) modalRoot.querySelector("#new-form")?.insertAdjacentHTML("afterbegin", '<section class="draft-recovery"><div><strong>Kaydedilmemiş taslak bulundu</strong><small>' + esc(new Date(recoverableDraft.updatedAt).toLocaleString("tr-TR")) + ' · ' + esc(recoverableDraft.kind) + '</small></div><button type="button" class="button button-secondary button-small" data-action="restore-form-draft" data-id="' + esc(recoverableDraft.id) + '">Taslağı getir</button><button type="button" class="button button-quiet button-small" data-action="discard-form-draft" data-id="' + esc(recoverableDraft.id) + '">Sil</button></section>');
  const projectSelect = document.getElementById("new-project") as HTMLSelectElement;
  projectSelect.innerHTML = state.projects.filter((project) => !project.archived).map((project) => '<option>' + esc(project.name) + '</option>').join("");
  const linkedAsset = linkedAssetId ? state.assets.find((asset) => asset.id === linkedAssetId) : undefined;
  projectSelect.value = linkedAsset?.project || state.projects.find((project) => project.id === activeProjectId && !project.archived)?.name || state.projects.find((project) => !project.archived)?.name || "";
  document.getElementById("new-area")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Başlangıç tarihi<input id="new-start-date" class="field-input" type="date"></label><label class="field-label">Hedef bitiş tarihi<input id="new-target-date" class="field-input" type="date"></label><label class="field-label">Planlanan dönem<input id="new-target-period" class="field-input" maxlength="40" placeholder="Örn. 2026 Q4"></label><label class="field-label">Tahmini efor (' + esc(state.estimateUnit || "saat") + ')<input id="new-estimate" class="field-input" type="number" min="0" step="0.5" placeholder="İsteğe bağlı"></label>');
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
  document.getElementById("new-area")?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Etiketler<input id="new-labels" class="field-input" placeholder="Virgülle ayır"></label>');
  const kind = field("new-kind");
  if (defaultType) kind.value = defaultType;
  updateNewForm();
  updateDuplicateCandidates();
  document.getElementById("new-title-input")?.focus();
}

let formDraftTimer = 0;
function persistCurrentFormDraft(): void {
  const form = (document.getElementById("new-form") || document.getElementById("quick-create-form")) as HTMLFormElement | null;
  if (!form) return;
  if (form.id === "quick-create-form") {
    const data = new FormData(form); const title = String(data.get("title") || ""); const description = String(data.get("description") || ""); if (!title.trim() && !description.trim()) return;
    const [teamId, member] = String(data.get("assignment") || "").split("::");
    state.formDrafts = [{ id: state.formDrafts?.[0]?.id || nextId("DRAFT"), kind: String(data.get("kind")) as FormDraft["kind"], values: { "new-kind": String(data.get("kind")), "new-title-input": title, "new-description": description, "new-project": String(data.get("project") || ""), "new-item-type": String(data.get("workType") || "Story"), "new-remind-at": String(data.get("remindAt") || ""), "new-linked-task": String(data.get("linked") || ""), "new-linked-note": String(data.get("linked") || "") }, assignments: teamId && member ? [{ teamId, member }] : [], attachments: [], updatedAt: new Date().toISOString() }]; save(); return;
  }
  const values: Record<string, string> = {};
  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input[id], textarea[id], select[id]").forEach((control) => { if (control.type !== "file") values[control.id] = control.value; });
  if (!values["new-title-input"]?.trim() && !values["new-description"]?.trim() && !draftAttachments.length) return;
  const existing = state.formDrafts?.[0];
  state.formDrafts = [{ id: existing?.id || nextId("DRAFT"), kind: (values["new-kind"] || "Backlog işi") as FormDraft["kind"], values, attachments: structuredClone(draftAttachments), assignments: readAssignmentRows("new-assignment-list").assignments, assetIds: [...draftAssetIds], sourceEmail: pendingDroppedEmailSource || undefined, updatedAt: new Date().toISOString() }];
  save();
}

function scheduleFormDraftSave(): void {
  window.clearTimeout(formDraftTimer);
  formDraftTimer = window.setTimeout(persistCurrentFormDraft, 450);
}

function restoreFormDraft(id: string): void {
  const draft = state.formDrafts?.find((entry) => entry.id === id);
  if (!draft) return;
  for (const [controlId, value] of Object.entries(draft.values)) {
    const control = document.getElementById(controlId) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (control) control.value = value;
  }
  draftAttachments = structuredClone(draft.attachments || []);
  draftAssetIds = [...(draft.assetIds || [])];
  pendingDroppedEmailSource = draft.sourceEmail || null;
  const assignmentList = document.getElementById("new-assignment-list");
  if (assignmentList) assignmentList.innerHTML = (draft.assignments?.length ? draft.assignments : [{ teamId: "", member: "" }]).map((entry) => assignmentRowMarkup(entry)).join("");
  renderNewAssetSelection(); renderNewAssetOptions();
  updateNewForm(); renderDraftFiles();
  modalRoot.querySelector(".draft-recovery")?.remove();
  toast("Taslak geri getirildi.");
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

function teamMemberRowMarkup(member = "", index = 0, memberId = ""): string {
  return '<div class="team-member-row" data-member-id="' + esc(memberId) + '"><span class="team-member-index">' + String(index + 1).padStart(2, "0") + '</span><input class="field-input" name="members" maxlength="80" autocomplete="off" value="' + esc(member) + '" placeholder="Üye adı soyadı"><button type="button" class="team-member-remove" data-remove-team-member aria-label="Üyeyi kaldır" title="Üyeyi kaldır">×</button></div>';
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
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal team-editor-modal" role="dialog" aria-modal="true" aria-labelledby="team-title"><header class="modal-header"><div><div class="panel-kicker">ÇALIŞMA EKİPLERİ</div><h2 id="team-title">' + (team ? "Takımı düzenle" : "Yeni takım oluştur") + '</h2><p class="team-editor-subtitle">Takım adını ve görevlere atanabilecek üyeleri belirle.</p></div><button class="modal-close" data-close-modal>×</button></header><form id="team-form" class="settings-form"><label class="field-label">Takım adı<input class="field-input" name="name" maxlength="60" required value="' + esc(team?.name || "") + '" placeholder="Örn. Ödeme Servisleri"></label><div class="team-members-section"><div class="team-members-heading"><div><strong>Takım üyeleri</strong><small>Görev atamalarında bu listeden seçim yapılır.</small></div><span class="team-member-count" id="team-member-count">' + (team?.members.length || 0) + '</span></div><div id="team-member-list" class="team-member-list">' + members.map((member, index) => teamMemberRowMarkup(member, index, team?.memberIds?.[member] || "")).join("") + '</div><button type="button" class="button button-secondary team-add-member" data-add-team-member>＋ Üye ekle</button></div><input type="hidden" name="id" value="' + esc(team?.id || "") + '"><div class="settings-note">En az bir üye ekle. Üye adlarını daha sonra istediğin zaman düzenleyebilirsin.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-action="back-to-teams">Vazgeç</button><button type="submit" class="button button-primary">' + (team ? "Değişiklikleri kaydet" : "Takımı oluştur") + '</button></footer></form></section></div>';
}

function saveTeam(event: SubmitEvent): void {
  event.preventDefault();
  const values = new FormData(event.target as HTMLFormElement);
  const id = String(values.get("id") || "");
  const name = String(values.get("name") || "").trim();
  const members = [...new Set(values.getAll("members").map((member) => String(member).trim()).filter(Boolean))];
  const memberRows = [...(event.target as HTMLFormElement).querySelectorAll<HTMLElement>(".team-member-row")].map((row) => ({ name: row.querySelector<HTMLInputElement>('input[name="members"]')?.value.trim() || "", id: row.dataset.memberId || "" })).filter((row) => row.name);
  const memberIds = Object.fromEntries(memberRows.map((row) => [row.name, row.id || "MEMBER-" + Math.random().toString(36).slice(2, 12).toUpperCase()]));
  if (!members.length) { toast("Takıma en az bir üye ekle."); return; }
  if (state.teams.some((team) => team.name.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR") && team.id !== id)) { toast("Bu takım adı zaten kullanılıyor."); return; }
  if (id) {
    const team = state.teams.find((entry) => entry.id === id);
    if (!team) return;
    const previousNames = new Map(Object.entries(team.memberIds || {}).map(([member, memberId]) => [memberId, member]));
    team.name = name; team.members = members; team.memberIds = memberIds;
    const updateAssignments = (assignments: WorkAssignment[]) => assignments.forEach((assignment) => {
      if (assignment.teamId !== team.id) return;
      const renamed = memberRows.find((row) => row.id && (row.id === assignment.memberId || previousNames.get(row.id) === assignment.member));
      if (renamed) { assignment.member = renamed.name; assignment.memberId = memberIds[renamed.name]; }
    });
    state.items.forEach((item) => updateAssignments(item.assignments || []));
    state.projects.forEach((project) => updateAssignments(project.assignments || []));
    state.items.forEach((item) => { item.assignments = validAssignments(getWorkAssignments(item)); syncLegacyAssignmentFields(item); });
    state.projects.forEach((project) => { project.assignments = validAssignments(project.assignments || []); });
  } else state.teams.push({ id: nextId("TEAM"), name, members, memberIds });
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
  root.innerHTML = '<div class="page-content teams-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÇALIŞMA ALANI · EKİPLER</div><h1>Takım paneli</h1><p>İş dağılımını ve ilerlemeyi takım ve üye bazında takip et.</p></div><button class="button button-primary" data-action="new-team"><span class="button-plus">+</span> Takım ekle</button></section><label class="team-member-search"><span class="search-glyph">' + icon("search") + '</span><input id="team-member-search" type="search" placeholder="Üye ara…" aria-label="Takım panelinde üye ara"></label><section class="team-overview-stats"><article><span>Takım</span><strong>' + state.teams.length + '</strong></article><article><span>Üye</span><strong>' + memberCount + '</strong></article><article><span>Atanmış iş</span><strong>' + assignedItems.length + '</strong></article><article><span>Açık iş</span><strong>' + openItems.length + '</strong></article><article class="team-stat-blocked"><span>Bloke</span><strong>' + blockedItems.length + '</strong></article><article><span>Tahmini efor</span><strong>' + estimateTotal + ' sa</strong></article></section><section class="team-plan-filters"><button class="button button-quiet button-small" data-action="clear-team-filters">Filtreleri temizle</button><label>Başlangıç tarihi (en erken)<input class="field-input" id="team-filter-start" type="date" value="' + esc(teamPlanFilters.startFrom) + '"></label><label>Hedef bitiş (en geç)<input class="field-input" id="team-filter-target" type="date" value="' + esc(teamPlanFilters.targetTo) + '"></label><label>Dönem<input class="field-input" id="team-filter-period" value="' + esc(teamPlanFilters.period) + '" placeholder="Örn. 2026 Q4"></label><label>En az efor (sa)<input class="field-input" id="team-filter-min-estimate" type="number" min="0" value="' + esc(teamPlanFilters.minEstimate) + '"></label><label>En çok efor (sa)<input class="field-input" id="team-filter-max-estimate" type="number" min="0" value="' + esc(teamPlanFilters.maxEstimate) + '"></label></section>' + (teamsMarkup || '<section class="team-dashboard-empty"><span class="team-empty-icon">♧</span><h2>Henüz takım oluşturulmadı</h2><p>Üyeleri ekleyip backlog Task işlerini atayabileceğin ilk takımını oluştur.</p><button class="button button-primary" data-action="new-team">＋ İlk takımı oluştur</button></section>') + '</div>';
}

let roadmapProjectFilter = "";
let roadmapStageFilter = "";
function roadmapAction(action: string, label: string, glyph: string, attributes = ""): string {
  return '<button type="button" class="personal-icon icon-action" data-action="' + action + '" ' + attributes + ' aria-label="' + label + '" data-tooltip="' + label + '">' + icon(glyph) + '</button>';
}
function roadmapWorkMarkup(items: WorkItem[]): string {
  return items.map((item) => '<button type="button" class="roadmap-work-item" data-open-item="' + esc(item.id) + '"><span class="roadmap-work-identity">' + itemIcon(item.type) + '<span>' + esc(item.id) + '</span></span><strong>' + esc(item.title) + '</strong><span class="roadmap-product-stage">' + esc(item.productStage || "Sırada") + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></button>').join("");
}
let pinnedRoadmapWeek = "";

function mountRoadmapWeeks(items: WorkItem[]): void {
  const start = new Date();
  start.setDate(1);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 6);
  start.setDate(start.getDate() - (start.getDay() + 6) % 7);
  const labels = new Map<string, string>();
  const captions = new Map<string, string>();
  const matches = new Map<string, { item: WorkItem; reason: string }[]>();
  const dateLabel = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });
  for (const day = new Date(start); day < end; day.setDate(day.getDate() + 7)) {
    const sunday = new Date(day);
    sunday.setDate(day.getDate() + 6);
    const from = releaseLocalDate(day);
    const through = releaseLocalDate(sunday);
    const inWeek = (date?: string) => !!date && date >= from && date <= through;
    labels.set(from, dateLabel.format(day) + " – " + dateLabel.format(sunday));
    captions.set(from, !captions.size || day.getDate() <= 7 ? dateLabel.format(day) : String(day.getDate()));
    matches.set(from, items.flatMap((item) => {
      const starts = inWeek(item.startDate);
      const ends = inWeek(item.targetDate);
      return starts || ends ? [{ item, reason: starts && ends ? "Başlangıç ve hedef" : starts ? "Başlangıç" : "Hedef" }] : [];
    }));
  }
  if (!labels.has(pinnedRoadmapWeek)) pinnedRoadmapWeek = "";
  const panel = document.createElement("section");
  panel.className = "roadmap-weeks";
  panel.setAttribute("aria-label", "Hafta perdesi");
  panel.innerHTML = '<div class="roadmap-week-results" hidden></div><div class="roadmap-week-strip"><strong>Haftalar</strong><div class="roadmap-week-buttons">' +
    [...labels].map(([date, label]) => '<button type="button" data-roadmap-week="' + date + '" title="' + esc(label) + '" aria-label="' + esc(label) + '" aria-pressed="false">' + esc(captions.get(date)!) + '</button>').join("") +
    '</div></div>';
  root.querySelector(".roadmap-page")?.append(panel);
  const buttons = [...panel.querySelectorAll<HTMLButtonElement>("[data-roadmap-week]")];
  const results = panel.querySelector<HTMLElement>(".roadmap-week-results")!;
  const cards = [...root.querySelectorAll<HTMLElement>(".roadmap-work-item")];
  const highlight = (date: string) => {
    const ids = new Set(matches.get(date)?.map(({ item }) => item.id));
    for (const card of cards) card.classList.toggle("roadmap-week-match", ids.has(card.dataset.openItem!));
    for (const button of buttons) button.classList.toggle("roadmap-week-preview", button.dataset.roadmapWeek === date);
  };
  const update = () => {
    for (const button of buttons) button.setAttribute("aria-pressed", String(button.dataset.roadmapWeek === pinnedRoadmapWeek));
    highlight(pinnedRoadmapWeek);
    results.hidden = !pinnedRoadmapWeek;
    if (!pinnedRoadmapWeek) { results.replaceChildren(); return; }
    const rows = matches.get(pinnedRoadmapWeek)!;
    results.innerHTML = '<h2>' + esc(labels.get(pinnedRoadmapWeek)!) + ' · ' + rows.length + ' iş</h2>' +
      (rows.length ? '<ul>' + rows.map(({ item, reason }) => '<li><button type="button" data-open-item="' + esc(item.id) + '"><strong>' + esc(item.id + " · " + item.title) + '</strong><small>' + reason + '</small></button></li>').join("") + '</ul>' : '<p>Bu hafta planlanan başlangıç veya bitiş yok.</p>');
  };
  for (const button of buttons) {
    const date = button.dataset.roadmapWeek!;
    const preview = () => { if (!pinnedRoadmapWeek) highlight(date); };
    const reset = () => highlight(pinnedRoadmapWeek);
    button.addEventListener("pointerenter", preview);
    button.addEventListener("pointerleave", reset);
    button.addEventListener("focus", preview);
    button.addEventListener("blur", reset);
    button.addEventListener("click", () => {
      pinnedRoadmapWeek = pinnedRoadmapWeek === date ? "" : date;
      update();
    });
  }
  update();
}
function renderRoadmap(): void {
  const projects = state.projects.filter((project) => !project.archived);
  const activeNames = new Set(projects.map((project) => project.name));
  const nodes = state.roadmap.filter((node) => activeNames.has(node.project) && (!roadmapProjectFilter || node.project === roadmapProjectFilter));
  const allInitiatives = nodes.filter((node) => node.type === "Initiative");
  const initiatives = allInitiatives.filter((node) => !roadmapStageFilter || node.stage === roadmapStageFilter);
  const items = state.items.filter((item) => !item.archived && activeNames.has(item.project) && (!roadmapProjectFilter || item.project === roadmapProjectFilter));
  const dates = (node: RoadmapNode) => [node.startDate ? new Date(node.startDate + "T00:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) : "Başlangıç yok", node.targetDate ? new Date(node.targetDate + "T00:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) : "Hedef tarih yok"].join(" → ");
  const cards = initiatives.map((initiative) => {
    const epics = nodes.filter((node) => node.type === "Epic" && node.parentId === initiative.id);
    const linked = items.filter((item) => item.roadmapNodeId === initiative.id || epics.some((epic) => epic.id === item.roadmapNodeId));
    const completed = linked.filter((item) => item.status === "Tamamlandı").length;
    const progress = linked.length ? Math.round(completed / linked.length * 100) : 0;
    const epicMarkup = epics.map((epic) => {
      const epicItems = linked.filter((item) => item.roadmapNodeId === epic.id);
      const done = epicItems.filter((item) => item.status === "Tamamlandı").length;
      return '<details class="roadmap-epic" data-context-roadmap-id="' + esc(epic.id) + '" open><summary><span class="roadmap-epic-chevron">' + icon("chevronRight") + '</span><span class="roadmap-epic-copy"><span class="roadmap-type-label">EPIC</span><strong>' + esc(epic.title) + '</strong><small>' + epicItems.length + ' iş · ' + done + ' tamamlandı</small></span><span class="roadmap-stage-badge">' + esc(epic.stage) + '</span></summary><div class="roadmap-epic-content"><div class="roadmap-epic-meta"><span>' + esc(dates(epic)) + '</span>' + roadmapAction("edit-roadmap", "Epic düzenle", "edit", 'data-id="' + esc(epic.id) + '"') + '</div>' + (epicItems.length ? '<div class="roadmap-work-list">' + roadmapWorkMarkup(epicItems) + '</div>' : '<p class="roadmap-empty-inline">Bu epic altında henüz iş yok.</p>') + '</div></details>';
    }).join("");
    const direct = linked.filter((item) => item.roadmapNodeId === initiative.id);
    const dateChange = initiative.dateHistory?.[0];
    return '<article class="roadmap-initiative" data-context-roadmap-id="' + esc(initiative.id) + '"><header class="roadmap-initiative-header"><div class="roadmap-initiative-copy"><div class="roadmap-card-kicker"><span class="roadmap-type-label">ÜRÜN HAMLESİ</span><span class="roadmap-stage-badge">' + esc(initiative.stage) + '</span></div><h2>' + esc(initiative.title) + '</h2><p>' + esc(initiative.project + " · " + (initiative.owner || "Sahip atanmadı")) + '</p></div><div class="roadmap-actions">' + roadmapAction("create-epic", "Epic ekle", "add", 'data-parent-id="' + esc(initiative.id) + '"') + roadmapAction("edit-roadmap", "Ürün hamlesini düzenle", "edit", 'data-id="' + esc(initiative.id) + '"') + roadmapAction("delete-roadmap", "Ürün hamlesini sil", "delete", 'data-id="' + esc(initiative.id) + '"') + '</div></header><p class="roadmap-goal">' + esc(initiative.goal || "Ürün hedefi henüz tanımlanmadı.") + '</p><div class="roadmap-outcome"><span>Başarı ölçütü</span><strong>' + esc(initiative.successMetric || "Henüz tanımlanmadı") + '</strong></div><div class="roadmap-delivery"><span>' + completed + ' / ' + linked.length + ' iş tamamlandı</span><strong>%' + progress + '</strong></div><div class="roadmap-progress" role="progressbar" aria-label="Tamamlanma" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + progress + '%"></i></div><div class="roadmap-date-range">' + icon("calendar") + esc(dates(initiative)) + '</div>' + roadmapTimelineBar(initiative) + (dateChange ? '<small class="roadmap-date-change">Son tarih değişikliği: ' + esc((dateChange.from || "Belirlenmedi") + " → " + (dateChange.to || "Belirlenmedi") + " · " + dateChange.actor) + '</small>' : '') + epicMarkup + (direct.length ? '<div class="roadmap-direct-items"><h3>Doğrudan bağlı işler</h3><div class="roadmap-work-list">' + roadmapWorkMarkup(direct) + '</div></div>' : '') + (!epics.length && !direct.length ? '<p class="roadmap-empty-inline">Kapsamı oluşturmak için sağ üstten epic ekle.</p>' : '') + '</article>';
  }).join("");
  const unplanned = items.filter((item) => !item.roadmapNodeId);
  const initiativeIds = new Set(initiatives.map((node) => node.id));
  const visibleNodeIds = new Set([...initiativeIds, ...nodes.filter((node) => node.type === "Epic" && initiativeIds.has(node.parentId || "")).map((node) => node.id)]);
  const filtered = !!roadmapProjectFilter || !!roadmapStageFilter;
  root.innerHTML = '<div class="page-content roadmap-page" data-scroll-layout="ready"><section class="page-title-row inventory-heading"><div class="inventory-identity"><span class="inventory-mark">' + icon("map") + '</span><div><div class="inventory-title"><h1>Yol haritası</h1><span class="inventory-count">' + initiatives.length + ' ürün hamlesi</span></div><p>Hedeften teslimata, ürünün yönü</p></div></div><button type="button" class="inventory-add icon-action" data-action="create-roadmap" aria-label="Ürün hamlesi oluştur" data-tooltip="Ürün hamlesi oluştur">' + icon("add") + '</button></section><div class="roadmap-controls"><label class="inventory-select">' + icon("folder") + '<select id="roadmap-project-filter" aria-label="Yol haritası projesi"><option value="">Tüm projeler</option>' + projects.map((project) => '<option value="' + esc(project.name) + '" ' + (roadmapProjectFilter === project.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label><span class="roadmap-scope-note">' + icon("calendar") + 'Önümüzdeki 6 ay</span>' + (filtered ? '<button type="button" class="roadmap-clear" data-roadmap-clear>Filtreleri temizle</button>' : '') + '</div><div class="roadmap-stage-strip" role="group" aria-label="Ürün hamlesi aşaması">' + PRODUCT_STAGES.map((stage) => '<button type="button" data-roadmap-stage="' + esc(stage) + '" aria-pressed="' + (roadmapStageFilter === stage) + '"><span>' + esc(stage) + '</span><strong>' + allInitiatives.filter((node) => node.stage === stage).length + '</strong></button>').join("") + '</div><div class="roadmap-scroll-region"><div class="roadmap-initiative-list">' + (cards || '<section class="roadmap-empty"><span class="roadmap-empty-icon">' + icon("map") + '</span><h2>' + (filtered ? "Bu filtrede ürün hamlesi yok" : "Ürünün yolunu birlikte çiz") + '</h2><p>' + (filtered ? "Diğer aşamaları veya projeleri seçerek devam et." : "Bir ürün hamlesi oluştur; hedefini, epic kapsamını ve ilerleyişini burada takip et.") + '</p>' + (filtered ? '<button type="button" class="button button-secondary" data-roadmap-clear>Filtreleri temizle</button>' : '<button type="button" class="button button-secondary" data-action="create-roadmap">Ürün hamlesi oluştur</button>') + '</section>') + '</div>' + (unplanned.length ? '<details class="roadmap-unplanned" open><summary><span>' + icon("list") + 'Hedefe bağlanmayan işler<span class="inventory-count">' + unplanned.length + '</span></span>' + icon("chevronDown") + '</summary><div class="roadmap-work-list">' + roadmapWorkMarkup(unplanned) + '</div></details>' : '') + '</div></div>';
  mountRoadmapWeeks(items.filter((item) => !item.roadmapNodeId || visibleNodeIds.has(item.roadmapNodeId)));
}
document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const stage = target?.closest<HTMLElement>("[data-roadmap-stage]");
  if (stage) {
    const selected = stage.dataset.roadmapStage!; roadmapStageFilter = roadmapStageFilter === selected ? "" : selected; renderRoadmap();
    root.querySelector<HTMLButtonElement>('[data-roadmap-stage="' + CSS.escape(selected) + '"]')?.focus();
  }
  if (target?.closest("[data-roadmap-clear]")) { roadmapProjectFilter = ""; roadmapStageFilter = ""; renderRoadmap(); document.getElementById("roadmap-project-filter")?.focus(); }
});
document.addEventListener("change", (event) => {
  if (event.target instanceof HTMLSelectElement && event.target.id === "roadmap-project-filter") { roadmapProjectFilter = event.target.value; renderRoadmap(); document.getElementById("roadmap-project-filter")?.focus(); }
});

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
  root.innerHTML = '<div class="page-content decisions-page"><section class="page-title-row"><div><div class="eyebrow"><span class="eyebrow-dot"></span>ÜRÜN YÖNETİMİ · KARAR HAFIZASI</div><h1>Ürün kararları</h1><p>Gerekçeleri, gözden geçirme tarihlerini ve kararlardan etkilenen kayıtları tek yerde izleyin.</p></div><button class="button button-primary" data-action="new-decision">＋ Karar kaydet</button></section><section class="decision-summary"><div><span>Karar kaydı</span><strong>' + all.length + '</strong></div><div><span>Geçerli</span><strong>' + activeCount + '</strong></div><div><span>Gözden geçirme zamanı</span><strong>' + reviewCount + '</strong></div></section><div class="decision-toolbar"><label class="filter-search"><span class="search-glyph">' + icon("search") + '</span><input id="decision-search" type="search" placeholder="Karar, gerekçe, kayıt veya eski sürümlerde ara…" value="' + esc(decisionQuery) + '"></label><select id="decision-filter" class="field-input" aria-label="Kararları duruma göre filtrele"><option value="all" ' + (decisionFilter === "all" ? "selected" : "") + '>Tüm kararlar</option><option value="active" ' + (decisionFilter === "active" ? "selected" : "") + '>Geçerli</option><option value="review" ' + (decisionFilter === "review" ? "selected" : "") + '>Gözden geçirilecek</option><option value="draft" ' + (decisionFilter === "draft" ? "selected" : "") + '>Taslak</option><option value="invalid" ' + (decisionFilter === "invalid" ? "selected" : "") + '>Geçersiz / yerine yenisi geldi</option></select><span class="decision-result-count" id="decision-result-count">' + filtered.length + ' kayıt</span></div><div class="decision-list" id="decision-list">' + cards + '<div class="empty-state" data-decision-empty ' + (filtered.length ? 'hidden' : '') + '>' + (all.length ? 'Bu filtre veya aramayla eşleşen karar yok.' : 'Henüz ürün kararı kaydedilmedi. Kapsamı, seçenekleri ve gerekçeyi yazarak ürünün karar geçmişini oluşturmaya başlayın.') + '</div></div></div>';
}

function openDecisionEditor(id?: string): void {
  state.decisions ||= [];
  const decision = id ? state.decisions.find((entry) => entry.id === id) : undefined;
  const multiOptions = (name: string, label: string, options: { id: string; label: string }[], selected: string[]) => '<label class="field-label">' + label + '<select class="field-input decision-multi-select" name="' + name + '" multiple size="' + Math.min(5, Math.max(3, options.length)) + '">' + options.map((option) => '<option value="' + esc(option.id) + '" ' + (selected.includes(option.id) ? 'selected' : '') + '>' + esc(option.label) + '</option>').join("") + '</select><small>Birden fazla kayıt seçmek için Ctrl (Mac’te ⌘) tuşunu kullan.</small></label>';
  const selectablePrevious = state.decisions.filter((entry) => entry.id !== id && !entry.supersededById);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal decision-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">KARAR KAYDI · ÜRÜN HAFIZASI</div><h2>' + (decision ? 'Kararı düzenle' : 'Yeni ürün kararı') + '</h2></div><button class="modal-close" data-close-modal aria-label="Pencereyi kapat">×</button></header><form id="decision-form" class="settings-form"><label class="field-label">Karar başlığı<input class="field-input" name="title" maxlength="160" required value="' + esc(decision?.title || '') + '" placeholder="Örn. FAST işleminde günlük limit kontrolü sunucu tarafında yapılır"></label><label class="field-label">Bağlam / ihtiyaç<textarea class="field-input field-textarea" name="context" rows="3" maxlength="2500" required placeholder="Kararı gerekli kılan ürün, müşteri veya operasyon ihtiyacı…">' + esc(decision?.context || '') + '</textarea></label><label class="field-label">Değerlendirilen seçenekler <small>(her satırda bir seçenek)</small><textarea class="field-input field-textarea" name="options" rows="3" maxlength="2500" placeholder="Seçenekleri ve temel etkilerini yaz…">' + esc((decision?.options || []).join('\n')) + '</textarea></label><label class="field-label">Karar ve gerekçe<textarea class="field-input field-textarea" name="rationale" rows="3" maxlength="2500" required placeholder="Seçilen yaklaşım ve nedenleri…">' + esc(decision?.rationale || '') + '</textarea></label><div class="form-two-col"><label class="field-label">Karar sahibi<input class="field-input" name="owner" maxlength="100" value="' + esc(decision?.owner || state.profile.userName || '') + '"></label><label class="field-label">Karar tarihi<input class="field-input" name="decidedAt" type="date" required value="' + esc(decision?.decidedAt || new Date().toISOString().slice(0, 10)) + '"></label><label class="field-label">Gözden geçirme tarihi<input class="field-input" name="reviewAt" type="date" value="' + esc(decision?.reviewAt || '') + '"></label><label class="field-label">Durum<select class="field-input" name="status">' + (["Taslak", "Geçerli", "Gözden geçirilecek", "Geçersiz"] as ProductDecision["status"][]).map((status) => '<option ' + (status === (decision?.status || "Geçerli") ? 'selected' : '') + '>' + status + '</option>').join('') + '</select></label></div>' + multiOptions("workItemIds", "İlişkili backlog işleri", state.items.filter((item) => !item.archived).map((item) => ({ id: item.id, label: item.id + ' · ' + item.title })), decision?.workItemIds || []) + multiOptions("assetIds", "Ürün bileşenleri", state.assets.map((asset) => ({ id: asset.id, label: asset.code + ' · ' + asset.name })), decision?.assetIds || []) + multiOptions("projectIds", "Projeler", state.projects.map((project) => ({ id: project.id, label: project.name })), decision?.projectIds || []) + multiOptions("releaseIds", "Release kayıtları", state.releases.map((release) => ({ id: release.id, label: release.name + ' · ' + release.project })), decision?.releaseIds || []) + (!decision && selectablePrevious.length ? '<label class="field-label">Yerine geçtiği karar<select class="field-input" name="supersedesId"><option value="">Önceki kararı değiştirmiyor</option>' + selectablePrevious.map((entry) => '<option value="' + esc(entry.id) + '">' + esc(entry.title + ' · ' + entry.status) + '</option>').join('') + '</select><small>Kaydedince önceki karar geçersiz olarak işaretlenir ve yenisine bağlanır.</small></label>' : '') + '<input type="hidden" name="id" value="' + esc(decision?.id || '') + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kararı kaydet</button></footer></form></section></div>';
}

function openDecisionDetail(id: string): void {
  const decisions = state.decisions || [];
  const decision = decisions.find((entry) => entry.id === id);
  if (!decision) return;
  globalLastRecord = { kind: "decision", id };
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
  addRecordCopyAction("decision", decision.id);
  if (decision.history.length) renderDecisionVersionComparison(decision);
}

function renderDecisionVersionComparison(decision: ProductDecision): void {
  const versions = [...decision.history].sort((a, b) => a.version - b.version).map((entry) => ({ label: "v" + entry.version, snapshot: entry.snapshot }));
  versions.push({ label: "Güncel", snapshot: decisionSnapshot(decision) });
  const section = document.createElement("section");
  section.className = "decision-detail-section decision-version-comparison";
  section.innerHTML = '<h3>Sürümleri karşılaştır</h3><div class="decision-compare-controls"><label>Önceki sürüm<select data-decision-compare="before"></select></label><label>Sonraki sürüm<select data-decision-compare="after"></select></label></div><div class="decision-compare-result" aria-live="polite"></div>';
  const selects = section.querySelectorAll<HTMLSelectElement>("select");
  selects.forEach((select, index) => {
    select.innerHTML = versions.map((version, versionIndex) => '<option value="' + versionIndex + '">' + esc(version.label) + '</option>').join("");
    select.value = String(index === 0 ? Math.max(0, versions.length - 2) : versions.length - 1);
  });
  const update = () => {
    const before = versions[Number(selects[0].value)].snapshot;
    const after = versions[Number(selects[1].value)].snapshot;
    const fields: [keyof ProductDecisionSnapshot, string][] = [["title", "Başlık"], ["context", "Bağlam"], ["options", "Seçenekler"], ["rationale", "Gerekçe"], ["owner", "Sahip"], ["decidedAt", "Karar tarihi"], ["reviewAt", "Gözden geçirme"], ["status", "Durum"], ["workItemIds", "İşler"], ["assetIds", "Bileşenler"], ["projectIds", "Projeler"], ["releaseIds", "Release kayıtları"]];
    const rows = fields.flatMap(([key, label]) => {
      const oldValue = before[key]; const newValue = after[key];
      const oldText = Array.isArray(oldValue) ? oldValue.join(" · ") : String(oldValue || "");
      const newText = Array.isArray(newValue) ? newValue.join(" · ") : String(newValue || "");
      if (oldText === newText) return [];
      const formattingOnly = oldText.replace(/\s+/g, " ").trim() === newText.replace(/\s+/g, " ").trim();
      return ['<article class="decision-compare-row"><h4>' + esc(label) + (formattingOnly ? ' · yalnızca boşluk düzeni' : '') + '</h4><div><p><small>Önce</small>' + esc(oldText || "—") + '</p><p><small>Sonra</small>' + esc(newText || "—") + '</p></div></article>'];
    });
    section.querySelector<HTMLElement>(".decision-compare-result")!.innerHTML = rows.join("") || '<p>Seçilen sürümlerde değişiklik yok.</p>';
  };
  selects.forEach((select) => select.addEventListener("change", update));
  update();
  modalRoot.querySelector(".decision-updated")?.before(section);
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

let releaseSelectedDate = workspaceFocusDate();
let releaseProjectFilter = "";
let releaseShowAll = false;
const releaseSelectedItems = new Set<string>();
function releaseLocalDate(date: Date): string { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); }
function releaseEligibleItems(): WorkItem[] {
  const projects = new Set(state.projects.filter((project) => !project.archived).map((project) => project.name));
  return state.items.filter((item) => !item.archived && projects.has(item.project) && (!releaseProjectFilter || item.project === releaseProjectFilter) && isItemInActiveProject(item));
}
function renderReleases(): void {
  const activeProjects = state.projects.filter((project) => !project.archived);
  const projects = new Set(activeProjects.map((project) => project.name));
  const allReleases = state.releases.filter((release) => !release.archived && projects.has(release.project) && (!releaseProjectFilter || release.project === releaseProjectFilter) && isItemInActiveProject({ project: release.project } as WorkItem)).sort((a, b) => (a.plannedDate || "9999").localeCompare(b.plannedDate || "9999"));
  const releases = allReleases.filter((release) => releaseShowAll || release.plannedDate === releaseSelectedDate);
  const items = releaseEligibleItems();
  const dueItems = items.filter((item) => item.targetDate === releaseSelectedDate);
  const date = new Date(releaseSelectedDate + "T12:00:00");
  const first = new Date(date.getFullYear(), date.getMonth(), 1, 12); const offset = (first.getDay() + 6) % 7;
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const cellCount = Math.ceil((offset + days) / 7) * 7;
  const today = workspaceFocusDate();
  const cells = Array.from({ length: cellCount }, (_, index) => {
    const cellDate = new Date(first); cellDate.setDate(index - offset + 1); const value = releaseLocalDate(cellDate);
    const taskCount = items.filter((item) => item.targetDate === value).length;
    const releaseCount = allReleases.filter((release) => release.plannedDate === value).length;
    return '<button type="button" class="release-calendar-day' + (cellDate.getMonth() !== date.getMonth() ? ' is-other-month' : '') + (value === today ? ' is-today' : '') + '" data-release-day="' + value + '" aria-pressed="' + (value === releaseSelectedDate) + '" aria-label="' + esc(cellDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) + " · " + taskCount + " iş · " + releaseCount + " release") + '"><span>' + cellDate.getDate() + '</span><span class="release-day-markers">' + (taskCount ? '<i class="release-task-dot"></i>' : '') + (releaseCount ? '<i class="release-publish-dot"></i>' : '') + '</span></button>';
  }).join("");
  const cards = releases.map((release) => {
    const scope = state.items.filter((item) => !item.archived && item.releaseId === release.id);
    const unfinished = scope.filter((item) => item.status !== "Tamamlandı");
    const blocked = unfinished.filter((item) => item.status === "Bloke");
    const completion = scope.length ? Math.round((scope.length - unfinished.length) / scope.length * 100) : 0;
    return '<article class="release-card" data-release-id="' + esc(release.id) + '"><header><div><div class="panel-kicker">' + esc(release.project) + ' · ' + esc(release.id) + '</div><h2>' + esc(release.name) + '</h2></div><span class="release-status release-status-' + esc(release.status.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")) + '">' + esc(release.status) + '</span></header><p class="release-description">' + esc(release.description || "Açıklama eklenmedi.") + '</p><div class="release-dates"><span>Planlanan <strong>' + esc(release.plannedDate || "Belirtilmedi") + '</strong></span><span>Yayın tarihi <strong>' + esc(release.actualDate || "Henüz yayınlanmadı") + '</strong></span></div><div class="release-progress"><div><span>Kapsam tamamlanma</span><strong>' + completion + '% · ' + (scope.length - unfinished.length) + '/' + scope.length + ' iş</strong></div><i><b style="width:' + completion + '%"></b></i></div>' + (unfinished.length ? '<div class="release-warning">' + blocked.length + ' bloke, ' + (unfinished.length - blocked.length) + ' tamamlanmamış iş' + (release.status === "Yayına hazır" || release.status === "Yayınlandı" ? ' · Yayın durumu kapsam uyarısına rağmen seçilmiş' : '') + '</div>' : '<div class="release-ready">' + (scope.length ? 'Kapsamdaki işler tamamlandı.' : 'Bu release için henüz iş seçilmedi.') + '</div>') + (release.status === "Yayınlandı" ? '<div class="release-notes"><strong>Yayın notu</strong><p>' + esc(release.releaseNotes || "Yayın notu girilmedi.") + '</p><strong>Hedef sonucu</strong><p>' + esc(release.outcome || "Sonuç henüz değerlendirilmedi.") + '</p></div>' : '') + '<footer><button class="button button-secondary button-small" data-action="edit-release" data-id="' + esc(release.id) + '">Düzenle</button><button class="button button-quiet button-small" data-action="delete-release" data-id="' + esc(release.id) + '">Sil</button><button class="button button-primary button-small" data-action="release-scope" data-id="' + esc(release.id) + '">Kapsamı düzenle</button></footer></article>';
  }).join("");
  const chosenProject = state.items.find((item) => releaseSelectedItems.has(item.id))?.project;
  const taskRows = dueItems.map((item) => {
    const assigned = state.releases.find((release) => release.id === item.releaseId);
    return '<article class="release-due-row"><input type="checkbox" data-release-select-item="' + esc(item.id) + '" aria-label="Release için seç: ' + esc(item.title) + '" ' + (releaseSelectedItems.has(item.id) ? 'checked ' : '') + (item.releaseId || chosenProject && chosenProject !== item.project ? 'disabled' : '') + '><button type="button" data-open-item="' + esc(item.id) + '"><span>' + esc(item.id + " · " + item.project) + '</span><strong>' + esc(item.title) + '</strong>' + (item.releaseId ? '<small>' + esc(assigned?.name || "Başka bir release’e bağlı") + '</small>' : '') + '</button><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span></article>';
  }).join("");
  root.innerHTML = '<div class="page-content releases-page release-planner" data-scroll-layout="ready"><section class="page-title-row inventory-heading"><div class="inventory-identity"><span class="inventory-mark">' + icon("calendar") + '</span><div><div class="inventory-title"><h1>Release planı</h1><span class="inventory-count">' + allReleases.length + ' release</span></div><p>Hedef bitişlerden yayın takvimine</p></div></div><button type="button" class="inventory-add icon-action" data-action="create-release" aria-label="Seçili tarihe release oluştur" data-tooltip="Seçili tarihe release oluştur">' + icon("add") + '</button></section><div class="release-planner-toolbar"><label class="inventory-select">' + icon("folder") + '<select id="release-project-filter" aria-label="Release projesi"><option value="">Tüm projeler</option>' + activeProjects.map((project) => '<option ' + (releaseProjectFilter === project.name ? "selected" : "") + '>' + esc(project.name) + '</option>').join("") + '</select></label><button type="button" class="release-today" data-release-today>Bugün</button><input id="release-jump-date" type="date" aria-label="Tarihe git" value="' + releaseSelectedDate + '"></div><div class="release-planner-layout"><aside class="release-calendar"><header><button type="button" class="personal-icon" data-release-month="-1" aria-label="Önceki ay">' + icon("chevronLeft") + '</button><h2>' + esc(date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" })) + '</h2><button type="button" class="personal-icon" data-release-month="1" aria-label="Sonraki ay">' + icon("chevronRight") + '</button></header><div class="release-calendar-weekdays">' + ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => '<span>' + day + '</span>').join("") + '</div><div class="release-calendar-grid">' + cells + '</div><div class="release-calendar-legend"><span><i class="release-task-dot"></i>Hedef bitiş</span><span><i class="release-publish-dot"></i>Release</span></div></aside><div class="release-day-agenda"><header class="release-day-heading"><div><span>SEÇİLİ TARİH</span><h2>' + esc(date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long", year: "numeric" })) + '</h2></div><div><button type="button" class="personal-icon" data-release-step="-1" aria-label="Önceki gün">' + icon("chevronLeft") + '</button><button type="button" class="personal-icon" data-release-step="1" aria-label="Sonraki gün">' + icon("chevronRight") + '</button></div></header><section class="release-due-panel"><header><h3>Hedef bitişi gelen işler <span class="inventory-count">' + dueItems.length + '</span></h3><button type="button" class="release-create-date icon-action" data-action="create-release">' + icon("add") + (releaseSelectedItems.size ? releaseSelectedItems.size + ' işle release oluştur' : 'Bu tarihe release oluştur') + '</button></header><div class="release-due-list">' + (taskRows || '<p class="release-planner-empty">Bu tarihte hedef bitişi olan iş yok. Yine de release planlayabilirsin.</p>') + '</div></section><section class="release-day-releases"><header><h3>' + (releaseShowAll ? 'Tüm release kayıtları' : 'Bu tarihin release kayıtları') + '</h3><button type="button" class="release-list-toggle" data-release-show-all aria-pressed="' + releaseShowAll + '">' + (releaseShowAll ? 'Seçili tarih' : 'Tümünü gör') + '</button></header>' + (cards || '<div class="release-planner-empty">' + (releaseShowAll ? 'Henüz release kaydı yok.' : 'Bu tarih için release planlanmadı.') + '</div>') + '</section></div></div></div>';
}
function selectReleaseDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value + "T12:00:00"))) return;
  releaseSelectedDate = value; releaseSelectedItems.clear(); releaseShowAll = false; renderReleases();
}
document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const day = target?.closest<HTMLElement>("[data-release-day]"); if (day) { selectReleaseDate(day.dataset.releaseDay!); return; }
  if (target?.closest("[data-release-today]")) { selectReleaseDate(workspaceFocusDate()); return; }
  const month = target?.closest<HTMLElement>("[data-release-month]"); const step = target?.closest<HTMLElement>("[data-release-step]");
  if (month || step) {
    const date = new Date(releaseSelectedDate + "T12:00:00");
    if (month) { const day = date.getDate(); date.setDate(1); date.setMonth(date.getMonth() + Number(month.dataset.releaseMonth)); date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())); }
    else date.setDate(date.getDate() + Number(step!.dataset.releaseStep));
    selectReleaseDate(releaseLocalDate(date)); return;
  }
  if (target?.closest("[data-release-show-all]")) { releaseShowAll = !releaseShowAll; renderReleases(); }
});
document.addEventListener("change", (event) => {
  const input = event.target; if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;
  if (input.id === "release-jump-date") { selectReleaseDate(input.value); return; }
  if (input.id === "release-project-filter") { releaseProjectFilter = input.value; releaseSelectedItems.clear(); renderReleases(); return; }
  if (input instanceof HTMLInputElement && input.dataset.releaseSelectItem) {
    if (input.checked) releaseSelectedItems.add(input.dataset.releaseSelectItem); else releaseSelectedItems.delete(input.dataset.releaseSelectItem);
    renderReleases(); root.querySelector<HTMLInputElement>('[data-release-select-item="' + CSS.escape(input.dataset.releaseSelectItem) + '"]')?.focus();
  }
});

function openReleaseEditor(id?: string): void {
  const release = id ? state.releases.find((entry) => entry.id === id) : undefined;
  const projects = state.projects.filter((project) => !project.archived || project.name === release?.project);
  const defaultDate = !release && activeView === "releases" ? releaseSelectedDate : "";
  const defaultProject = release?.project || state.items.find((item) => releaseSelectedItems.has(item.id))?.project || releaseProjectFilter || state.projects.find((project) => project.id === activeProjectId)?.name || projects[0]?.name || "";
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal release-editor-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">YAYIN YÖNETİMİ</div><h2>' + (release ? 'Release düzenle' : 'Release oluştur') + '</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="release-form" class="settings-form"><div class="form-two-col"><label class="field-label">Ad / sürüm<input class="field-input" name="name" maxlength="120" required value="' + esc(release?.name || "") + '" placeholder="Örn. Ödeme 2026.11"></label><label class="field-label">Proje<select class="field-input" name="project">' + projects.map((project) => '<option ' + (project.name === defaultProject ? 'selected' : '') + '>' + esc(project.name) + '</option>').join("") + '</select></label><label class="field-label">Planlanan yayın tarihi<input class="field-input" name="plannedDate" type="date" value="' + esc(release?.plannedDate || defaultDate) + '"></label><label class="field-label">Durum<select class="field-input" name="status">' + RELEASE_STATUSES.map((status) => '<option ' + (status === (release?.status || "Planlanıyor") ? 'selected' : '') + '>' + esc(status) + '</option>').join("") + '</select></label><label class="field-label">Gerçek yayın tarihi<input class="field-input" name="actualDate" type="date" value="' + esc(release?.actualDate || "") + '"></label>' + (release ? '<label class="field-label">Plan tarihi değişiklik nedeni<input class="field-input" name="dateReason" maxlength="300" placeholder="Neden değişti?"></label>' : '') + '</div><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" rows="3" maxlength="1500">' + esc(release?.description || "") + '</textarea></label><label class="field-label">Yayın notu<textarea class="field-input field-textarea" name="releaseNotes" rows="3" maxlength="2000" placeholder="Yayın kapsamı veya önemli değişiklikler">' + esc(release?.releaseNotes || "") + '</textarea></label><label class="field-label">Yayın sonrası hedef sonucu / gözlem<textarea class="field-input field-textarea" name="outcome" rows="2" maxlength="1200" placeholder="Hedef ölçüt gerçekleşti mi? Sonraki gözlem notu">' + esc(release?.outcome || "") + '</textarea></label><input type="hidden" name="id" value="' + esc(release?.id || "") + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  if (!release) {
    modalRoot.querySelector("#release-form .modal-footer")?.insertAdjacentHTML("beforebegin", '<section class="release-initial-scope"></section>');
    updateReleaseInitialScope();
  }
  if (release) modalRoot.querySelector("#release-form .modal-footer")?.insertAdjacentHTML("afterbegin", '<button type="button" class="button button-quiet" data-action="archive-release" data-id="' + esc(release.id) + '">' + (release.archived ? "Arşivden çıkar" : "Arşivle") + '</button>');
  if (release?.dateHistory?.length) modalRoot.querySelector("#release-form .modal-footer")?.insertAdjacentHTML("beforebegin", '<details class="release-history" open><summary>Plan tarihi değişiklikleri · ' + release.dateHistory.length + '</summary>' + release.dateHistory.map((change) => '<p><strong>' + esc(change.from + " → " + change.to) + '</strong> · ' + esc(change.reason) + '<small>' + esc(change.actor + " · " + new Date(change.at).toLocaleString("tr-TR")) + '</small></p>').join("") + '</details>');
}

function updateReleaseInitialScope(): void {
  const form = modalRoot.querySelector<HTMLFormElement>("#release-form"); const host = form?.querySelector(".release-initial-scope"); if (!form || !host) return;
  const prior = new Set([...host.querySelectorAll<HTMLInputElement>("input:checked")].map((input) => input.value));
  const values = new FormData(form); const project = String(values.get("project") || ""); const date = String(values.get("plannedDate") || "");
  const items = state.items.filter((item) => !item.archived && !item.releaseId && item.project === project && !!date && item.targetDate === date);
  host.innerHTML = '<h3>Bu tarihte biten işler</h3><p>Release kapsamına eklemek istediklerini seç.</p>' + (items.length ? items.map((item) => '<label class="release-scope-row"><input type="checkbox" name="initialScope" value="' + esc(item.id) + '" ' + (prior.has(item.id) || releaseSelectedItems.has(item.id) ? 'checked' : '') + '><span><strong>' + esc(item.id + " · " + item.title) + '</strong><small>' + esc(item.status) + '</small></span></label>').join("") : '<p>Seçili proje ve tarihte uygun iş yok. Kapsamı daha sonra düzenleyebilirsin.</p>');
}
document.addEventListener("change", (event) => {
  if (event.target instanceof Element && event.target.matches('#release-form [name="project"], #release-form [name="plannedDate"]')) updateReleaseInitialScope();
});

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
  if (!existing) {
    state.releases.push(release);
    const selected = new Set(values.getAll("initialScope").map(String));
    state.items.filter((item) => selected.has(item.id) && !item.archived && !item.releaseId && item.project === release.project && item.targetDate === plannedDate).forEach((item) => { item.releaseId = release.id; addWorkActivity(item, "release", "Release kapsamına eklendi: " + release.name); });
    if (activeView === "releases" && plannedDate) { releaseSelectedDate = plannedDate; releaseShowAll = false; }
    releaseSelectedItems.clear();
  }
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

async function deleteRelease(id: string): Promise<void> {
  const release = state.releases.find((entry) => entry.id === id);
  if (!release || !(await appConfirm('"' + release.name + '" release kaydını silmek istiyor musun? Backlog işleri korunur, release bağlantıları kaldırılır.'))) return;
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

async function deleteRoadmapNode(id: string): Promise<void> {
  const node = state.roadmap.find((entry) => entry.id === id);
  if (!node || !(await appConfirm('"' + node.title + '" hedefini silmek istiyor musun? Bağlı backlog işleri korunur ve hedef bağlantıları kaldırılır.'))) return;
  const removed = new Set([id, ...state.roadmap.filter((entry) => entry.parentId === id).map((entry) => entry.id)]);
  state.roadmap = state.roadmap.filter((entry) => !removed.has(entry.id));
  state.items.forEach((item) => { if (item.roadmapNodeId && removed.has(item.roadmapNodeId)) { item.roadmapNodeId = undefined; addWorkActivity(item, "change", "Silinen ürün hedefi bağlantısı kaldırıldı."); } });
  save(); renderRoadmap(); toast("Ürün hedefi silindi; backlog işleri korundu.");
}

function renderTeamSettingsSection(): string {
  const rows = state.teams.map((team) => '<div class="team-settings-row"><div class="team-settings-identity"><span class="team-settings-avatar">' + esc(team.name.slice(0, 1).toLocaleUpperCase("tr-TR")) + '</span><div><strong>' + esc(team.name) + '</strong><small>' + team.members.length + ' üye · ' + esc(team.members.join(", ") || "Üye eklenmedi") + '</small></div></div><div class="team-settings-actions"><button type="button" class="button button-quiet button-small" data-action="edit-team" data-team-id="' + esc(team.id) + '">Düzenle</button><button type="button" class="team-settings-delete" data-delete-team="' + esc(team.id) + '" aria-label="' + esc(team.name + " takımını sil") + '" title="Takımı sil">×</button></div></div>').join("");
  return '<section class="settings-team-section"><header><div><h3>Takımlar ve üyeler</h3><p>Görev atamalarında kullanılacak ekipleri ve üyeleri düzenle.</p></div><button type="button" class="button button-secondary button-small" data-action="new-team">＋ Takım ekle</button></header><div class="team-settings-list">' + (rows || '<p class="empty-inline">Henüz takım yok. Üye ve atama tanımlamak için ilk takımı ekle.</p>') + '</div></section>';
}

type DictionaryKind = "label" | "area";
let dictionaryTab: DictionaryKind = "label";
let dictionaryQuery = "";
let dictionaryEdit: { kind: DictionaryKind; value: string; mode: "rename" | "merge" } | null = null;

function dictionaryValues(kind: DictionaryKind): { value: string; count: number }[] {
  const counts = new Map<string, number>();
  state.items.forEach((item) => {
    const values = kind === "label" ? item.labels || [] : item.area ? [item.area] : [];
    values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  });
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value, "tr-TR"));
}

// Büyük/küçük harf, Türkçe karakter ve boşluk farkıyla yazılmış değerleri aynı anahtarda toplar.
function dictionaryKey(value: string): string {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "");
}

function renderFieldDictionarySettings(): string {
  const kind = dictionaryTab;
  const all = dictionaryValues(kind);
  const max = Math.max(1, ...all.map((entry) => entry.count));
  const groups = new Map<string, string[]>();
  all.forEach((entry) => { const key = dictionaryKey(entry.value); groups.set(key, [...(groups.get(key) || []), entry.value]); });
  const term = dictionaryQuery.trim().toLocaleLowerCase("tr-TR");
  const visible = term ? all.filter((entry) => entry.value.toLocaleLowerCase("tr-TR").includes(term)) : all;
  const duplicateCount = [...groups.values()].filter((values) => values.length > 1).length;
  const noun = kind === "label" ? "etiket" : "alan";
  const rows = visible.map((entry) => {
    const similar = (groups.get(dictionaryKey(entry.value)) || []).filter((value) => value !== entry.value);
    const editing = dictionaryEdit?.kind === kind && dictionaryEdit.value === entry.value ? dictionaryEdit.mode : null;
    const usage = '<span class="dictionary-usage" title="' + entry.count + ' işte kullanılıyor"><i style="width:' + Math.max(6, Math.round(entry.count / max * 100)) + '%"></i></span><b class="dictionary-count">' + entry.count + '</b>';
    if (editing === "rename") {
      return '<div class="dictionary-row is-editing" data-dict-row="' + esc(entry.value) + '"><span class="dictionary-chip-icon" aria-hidden="true">' + (kind === "label" ? "#" : "◆") + '</span><input class="field-input dictionary-input" data-dict-rename-input value="' + esc(entry.value) + '" maxlength="60" aria-label="' + esc(entry.value + " için yeni ad") + '"><span class="dictionary-edit-note">' + entry.count + ' iş güncellenecek</span><span class="dictionary-actions"><button type="button" class="inline-icon-action inline-icon-confirm" data-dict-apply="rename" aria-label="Yeni adı kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-dict-cancel aria-label="Vazgeç" title="Vazgeç">×</button></span></div>';
    }
    if (editing === "merge") {
      const targets = all.filter((other) => other.value !== entry.value).sort((a, b) => Number(similar.includes(b.value)) - Number(similar.includes(a.value)) || b.count - a.count);
      return '<div class="dictionary-row is-editing" data-dict-row="' + esc(entry.value) + '"><span class="dictionary-merge-from">' + esc(entry.value) + '</span><span class="dictionary-merge-arrow" aria-hidden="true">→</span><select class="field-input dictionary-input" data-dict-merge-target aria-label="' + esc(entry.value + " hangi değere birleştirilsin") + '">' + targets.map((other) => '<option value="' + esc(other.value) + '">' + esc(other.value) + ' · ' + other.count + (similar.includes(other.value) ? ' · benzer' : '') + '</option>').join("") + '</select><span class="dictionary-edit-note">' + entry.count + ' iş taşınacak</span><span class="dictionary-actions"><button type="button" class="button button-primary button-small" data-dict-apply="merge"' + (targets.length ? "" : " disabled") + '>Birleştir</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-dict-cancel aria-label="Vazgeç" title="Vazgeç">×</button></span></div>';
    }
    return '<div class="dictionary-row" data-dict-row="' + esc(entry.value) + '"><span class="dictionary-chip"><span class="dictionary-chip-icon" aria-hidden="true">' + (kind === "label" ? "#" : "◆") + '</span><span class="dictionary-name">' + esc(entry.value) + '</span></span>' + (similar.length ? '<button type="button" class="dictionary-duplicate" data-dict-merge-into="' + esc(similar[0]) + '" title="' + esc(similar[0]) + ' ile aynı görünüyor; birleştirmek için tıkla">Olası yineleme · ' + esc(similar[0]) + '</button>' : '<span></span>') + usage + '<span class="dictionary-actions"><button type="button" class="dictionary-icon-button" data-dict-start="rename" data-tooltip="Yeniden adlandır" aria-label="' + esc(entry.value + " değerini yeniden adlandır") + '">' + icon("edit") + '</button><button type="button" class="dictionary-icon-button" data-dict-start="merge" data-tooltip="Başka bir ' + noun + ' ile birleştir" aria-label="' + esc(entry.value + " değerini birleştir") + '"' + (all.length < 2 ? " disabled" : "") + '><svg viewBox="0 0 24 24" aria-hidden="true" class="svg-icon"><path d="M6 4v5a5 5 0 0 0 5 5h7"/><path d="M6 20v-5"/><path d="m15 11 3 3-3 3"/></svg></button></span></div>';
  }).join("");
  const empty = '<div class="dictionary-empty">' + (all.length ? '“' + esc(dictionaryQuery) + '” ile eşleşen ' + noun + ' yok.' : 'Henüz ' + noun + ' kullanılmamış. İşlere ' + noun + ' eklendikçe burada listelenir.') + '</div>';
  return '<section class="dictionary-settings"><header class="dictionary-header"><div><h3>Etiket ve alan sözlüğü</h3><p>Kullanım sıklığını gör, farklı yazımları yeniden adlandır veya tek bir değerde birleştir. Kayıtlı görünümler de birlikte güncellenir.</p></div></header><div class="dictionary-toolbar"><div class="dictionary-tabs" role="tablist"><button type="button" role="tab" data-dict-tab="label" aria-selected="' + (kind === "label") + '">Etiketler <b>' + dictionaryValues("label").length + '</b></button><button type="button" role="tab" data-dict-tab="area" aria-selected="' + (kind === "area") + '">Ürün alanları <b>' + dictionaryValues("area").length + '</b></button></div><label class="dictionary-search"><span class="search-glyph">' + icon("search") + '</span><input type="search" data-dict-search value="' + esc(dictionaryQuery) + '" placeholder="' + (kind === "label" ? "Etiket" : "Alan") + ' ara…" aria-label="Sözlükte ara"></label></div>' + (duplicateCount ? '<div class="dictionary-hint"><span aria-hidden="true">!</span>' + duplicateCount + ' olası yineleme bulundu. Etiketin yanındaki uyarıya tıklayarak birleştirebilirsin.</div>' : '') + '<div class="dictionary-list" role="tabpanel">' + (rows || empty) + '</div></section>';
}

function refreshDictionarySettings(focusSelector?: string): void {
  const section = modalRoot.querySelector(".dictionary-settings");
  if (!section) return;
  section.outerHTML = renderFieldDictionarySettings();
  if (focusSelector) {
    const target = modalRoot.querySelector<HTMLInputElement>(focusSelector);
    target?.focus();
    if (target instanceof HTMLInputElement && target.type !== "search") target.select();
    else if (target instanceof HTMLInputElement) target.setSelectionRange(target.value.length, target.value.length);
  }
}

function applyDictionaryChange(kind: DictionaryKind, value: string, replacement: string): void {
  const next = replacement.trim();
  if (!next || next === value) { dictionaryEdit = null; refreshDictionarySettings(); return; }
  const affected = kind === "label" ? state.items.filter((item) => item.labels.includes(value)).length : state.items.filter((item) => item.area === value).length;
  const merged = dictionaryValues(kind).some((entry) => entry.value === next);
  if (kind === "label") {
    state.items.forEach((item) => { if (item.labels.includes(value)) item.labels = [...new Set(item.labels.map((label) => label === value ? next : label))]; });
    savedBacklogViews.forEach((view) => { if (view.label === value) view.label = next; });
    state.labelAliases ||= {}; delete state.labelAliases[next]; state.labelAliases[value] = next;
    persistBacklogViews();
  } else state.items.forEach((item) => { if (item.area === value) item.area = next; });
  if (!save()) return;
  dictionaryEdit = null;
  refreshDictionarySettings();
  render();
  toast(merged ? "“" + value + "” → “" + next + "” birleştirildi · " + affected + " iş güncellendi." : "“" + value + "” → “" + next + "” olarak adlandırıldı · " + affected + " iş güncellendi.");
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const section = target.closest?.(".dictionary-settings");
  if (!section) return;
  const row = target.closest<HTMLElement>("[data-dict-row]")?.dataset.dictRow || "";
  const tab = target.closest<HTMLElement>("[data-dict-tab]");
  if (tab) { dictionaryTab = tab.dataset.dictTab === "area" ? "area" : "label"; dictionaryQuery = ""; dictionaryEdit = null; refreshDictionarySettings(); return; }
  const start = target.closest<HTMLElement>("[data-dict-start]");
  if (start && row) { closeActionTooltip(); dictionaryEdit = { kind: dictionaryTab, value: row, mode: start.dataset.dictStart === "merge" ? "merge" : "rename" }; refreshDictionarySettings(dictionaryEdit.mode === "rename" ? "[data-dict-rename-input]" : "[data-dict-merge-target]"); return; }
  const mergeInto = target.closest<HTMLElement>("[data-dict-merge-into]");
  if (mergeInto && row) { dictionaryEdit = { kind: dictionaryTab, value: row, mode: "merge" }; refreshDictionarySettings("[data-dict-merge-target]"); const select = modalRoot.querySelector<HTMLSelectElement>("[data-dict-merge-target]"); if (select) select.value = mergeInto.dataset.dictMergeInto || select.value; return; }
  if (target.closest("[data-dict-cancel]")) { dictionaryEdit = null; refreshDictionarySettings(); return; }
  const apply = target.closest<HTMLElement>("[data-dict-apply]");
  if (apply && dictionaryEdit) {
    const value = apply.dataset.dictApply === "merge" ? section.querySelector<HTMLSelectElement>("[data-dict-merge-target]")?.value || "" : section.querySelector<HTMLInputElement>("[data-dict-rename-input]")?.value || "";
    applyDictionaryChange(dictionaryEdit.kind, dictionaryEdit.value, value);
  }
});
document.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  if (input.dataset?.dictSearch === undefined) return;
  dictionaryQuery = input.value;
  refreshDictionarySettings("[data-dict-search]");
});
window.addEventListener("keydown", (event) => {
  const input = event.target as HTMLElement;
  if (!input.closest?.(".dictionary-row.is-editing")) return;
  if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); dictionaryEdit = null; refreshDictionarySettings(); }
  else if (event.key === "Enter" && dictionaryEdit) {
    event.preventDefault();
    const value = (input as HTMLInputElement | HTMLSelectElement).value;
    applyDictionaryChange(dictionaryEdit.kind, dictionaryEdit.value, value);
  }
}, true);

function workspaceLinkIssues(): string[] {
  const issues: string[] = [];
  const projectNames = new Set(state.projects.map((project) => project.name));
  const itemIds = new Set(state.items.map((item) => item.id));
  const assetIds = new Set(state.assets.map((asset) => asset.id));
  const releaseIds = new Set(state.releases.map((release) => release.id));
  const sprintIds = new Set(state.sprints.map((sprint) => sprint.id));
  for (const item of state.items) {
    if (!projectNames.has(item.project)) issues.push(item.id + ": proje bulunamadı (" + item.project + ")");
    for (const id of item.dependsOnIds || []) if (!itemIds.has(id)) issues.push(item.id + ": bağımlı iş bulunamadı (" + id + ")");
    for (const id of item.assetIds || []) if (!assetIds.has(id)) issues.push(item.id + ": bileşen bulunamadı (" + id + ")");
    if (item.releaseId && !releaseIds.has(item.releaseId)) issues.push(item.id + ": release bulunamadı (" + item.releaseId + ")");
    if (item.sprintId && !sprintIds.has(item.sprintId)) issues.push(item.id + ": sprint bulunamadı (" + item.sprintId + ")");
  }
  return issues;
}

function openWorkspaceSettings(panel?: string): void {
  if (SETTINGS_PANELS.some((entry) => entry.id === panel)) settingsActivePanel = panel as SettingsPanelId;
  const reopening = Boolean(modalRoot.querySelector(".settings-center-modal"));
  const previousScroll = modalRoot.querySelector<HTMLElement>(".settings-panels")?.scrollTop || 0;
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title"><header class="modal-header"><div><div class="panel-kicker">' + esc(state.profile.workspace || "ÇALIŞMA ALANI") + '</div><h2 id="settings-title">Ayarlar</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="workspace-form" class="settings-form"><p class="settings-intro">Takip edeceğin projeleri ve çalışma alanında görünecek kullanıcı bilgilerini düzenle. Ayarlar bu cihazda saklanır.</p><div class="form-two-col"><label class="field-label">Kurum / ekip<input class="field-input" name="organization" maxlength="60" required value="' + esc(state.profile.organization) + '"></label><label class="field-label">Çalışma alanı adı<input class="field-input" name="workspace" maxlength="60" required value="' + esc(state.profile.workspace) + '"></label><label class="field-label">Adın<input class="field-input" name="userName" maxlength="60" required value="' + esc(state.profile.userName) + '"></label><label class="field-label">Rolün<input class="field-input" name="userRole" maxlength="60" required value="' + esc(state.profile.userRole) + '"></label></div><section class="jira-settings-block"><h3>Jira Server / Data Center</h3><p>Base URL girilmezse Jira menüsü devre dışı kalır. PAT’i Jira panelinde kendi hesabından oluşturup ekleyebilirsin.</p><label class="field-label">Jira Base URL<input class="field-input" name="jiraBaseUrl" type="url" placeholder="https://jira.kurum.local" value="' + esc(state.profile.jiraBaseUrl || "") + '"></label></section><div class="settings-note">Bu bilgiler yalnızca masaüstündeki yerel görünümü kişiselleştirir. Henüz kullanıcı hesabı veya kurum bağlantısı oluşturmaz.</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-close-modal>Kapat</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  modalRoot.querySelector(".jira-settings-block")?.insertAdjacentHTML("afterend", '<div class="settings-actions"><button type="button" class="button button-secondary" data-action="open-setup">Projeleri ve kurulum bilgilerini düzenle</button></div>' + renderTeamSettingsSection() + renderFieldDictionarySettings() + '<section class="backup-settings"><h3>Veri yedekleme</h3><p>Yedekleme dosya türünü ve kaydedileceği konumu seç. Ekler de yedeğe eklenir; dosyayı güvenli bir yerde sakla.</p><div class="backup-actions"><label class="field-label">Dosya biçimi<select id="backup-format" class="field-input"><option value="rota">Rota sıkıştırılmış yedek (.rota)</option><option value="json">JSON (.json)</option></select></label><button type="button" class="button button-secondary" data-action="backup-export">Yedek oluştur</button><button type="button" class="button button-secondary" data-action="backup-restore">Yedekten geri yükle</button></div></section>');
  const linkIssues = workspaceLinkIssues();
  document.querySelector(".backup-settings")?.insertAdjacentHTML("beforebegin", '<section class="workspace-link-report"><h3>Veri bağlantıları · ' + linkIssues.length + ' sorun</h3>' + (linkIssues.length ? '<ul>' + linkIssues.slice(0, 100).map((issue) => '<li>' + esc(issue) + '</li>').join('') + '</ul>' + (linkIssues.length > 100 ? '<p>İlk 100 sorun gösteriliyor.</p>' : '') : '<p>Eksik proje, iş, bileşen, release veya sprint bağlantısı bulunmadı.</p>') + '</section>');
  document.querySelector(".backup-settings")?.insertAdjacentHTML("beforebegin", '<section class="appearance-settings"><h3>Görünüm ve erişilebilirlik</h3><div class="form-two-col"><label class="field-label">Tema<select id="workspace-theme" class="field-input"><option value="system">Sistem</option><option value="light">Açık</option><option value="dark">Koyu</option></select></label><label class="field-label">Yakınlaştırma<select id="workspace-app-zoom" class="field-input">' + appZoomOptionsHtml() + '</select></label><label class="field-label">Yüksek kontrast<select id="workspace-high-contrast" class="field-input"><option value="false">Kapalı</option><option value="true">Açık</option></select></label><label class="field-label">Animasyonları azalt<select id="workspace-reduced-motion" class="field-input"><option value="false">Kapalı</option><option value="true">Açık</option></select></label></div><div class="accent-settings-field"><div><strong>Vurgu rengi</strong><small>Butonlar, avatarlar ve seçili öğelerde kullanılır. Seçim anında uygulanır ve bu cihazda saklanır.</small></div>' + accentPickerFields() + '<button type="button" class="button button-quiet button-small" data-accent-reset>Varsayılana dön</button></div><button type="button" class="button button-secondary button-small" data-action="reset-backlog-preferences">Backlog görünüm ve kolon tercihlerini sıfırla</button></section>');
  const lastAutomaticBackup = localStorage.getItem(AUTO_BACKUP_AT_KEY);
  document.querySelector(".backup-settings")?.insertAdjacentHTML("afterend", '<section class="backup-settings"><h3>Otomatik yedekler</h3><p>Uygulama açıkken 24 saatte bir ekleriyle birlikte seçilen klasöre yedek alınır. Son 7 kopya saklanır.</p><p>Son başarılı yedek: ' + esc(lastAutomaticBackup ? new Date(lastAutomaticBackup).toLocaleString("tr-TR") : "Henüz yok") + '</p>' + (automaticBackupError ? '<p class="jira-error">' + esc(automaticBackupError) + '</p>' : '') + '<label class="field-label">Yedek klasörü<input id="automatic-backup-directory" class="field-input" placeholder="C:\\Yedekler"></label><button type="button" class="button button-secondary" data-action="backup-auto-folder-save">Klasörü kaydet</button><button type="button" class="button button-secondary" data-action="backup-auto-now">Şimdi otomatik yedek oluştur</button></section>');
  document.querySelector(".backup-settings")?.insertAdjacentHTML("beforeend", '<button type="button" class="button button-secondary button-small" data-action="open-diagnostics">Tanılama raporu</button>');
  document.querySelector(".dictionary-settings")?.insertAdjacentHTML("beforebegin", '<section class="backup-settings estimate-settings"><h3>Tahmin standardı</h3><p>Çalışma alanındaki tüm efor toplamları aynı birimi kullanır.</p><label class="field-label">Tahmin birimi<select id="workspace-estimate-unit" ' + (state.items.some((item) => item.estimate !== undefined) ? 'disabled title="Mevcut tahminler varken birim değiştirilemez"' : '') + ' class="field-input"><option value="saat" ' + (state.estimateUnit !== "puan" ? "selected" : "") + '>Saat</option><option value="puan" ' + (state.estimateUnit === "puan" ? "selected" : "") + '>Puan</option></select></label></section>');
  document.querySelector(".estimate-settings")?.insertAdjacentHTML("beforeend", '<div class="button-row"><button type="button" class="button button-secondary button-small" data-action="work-template-editor">İş şablonu ekle</button><button type="button" class="button button-secondary button-small" data-action="risk-center">Risk takibi</button></div>');
  if (desktop?.getAutomaticBackupDirectory) void desktop.getAutomaticBackupDirectory().then((directory) => { const input = document.getElementById("automatic-backup-directory") as HTMLInputElement | null; if (input) input.value = directory; }).catch(() => undefined);
  (document.getElementById("workspace-theme") as HTMLSelectElement).value = localStorage.getItem(THEME_KEY) || "system";
  (document.getElementById("workspace-app-zoom") as HTMLSelectElement).value = String(appZoom);
  (document.getElementById("workspace-high-contrast") as HTMLSelectElement).value = localStorage.getItem(HIGH_CONTRAST_KEY) || "false";
  (document.getElementById("workspace-reduced-motion") as HTMLSelectElement).value = localStorage.getItem(REDUCED_MOTION_KEY) || "false";
  buildSettingsCenter(reopening ? previousScroll : 0);
  if (reopening) modalRoot.querySelector(".modal-backdrop")?.classList.add("is-reopening");
}

// Ayarlar merkezi: mevcut bölümleri sol menülü gruplara taşır; alanlar ve işleyiciler aynı kalır.
type SettingsPanelId = "general" | "appearance" | "teams" | "work" | "integrations" | "data";
let settingsActivePanel: SettingsPanelId = "general";
const SETTINGS_PANELS: { id: SettingsPanelId; label: string; description: string; icon: string; selectors: string[] }[] = [
  { id: "general", label: "Genel", description: "Kurum, çalışma alanı ve profil bilgilerin.", icon: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>', selectors: [".settings-intro", "#workspace-form > .form-two-col", ".settings-note", ".settings-actions"] },
  { id: "appearance", label: "Görünüm", description: "Tema, vurgu rengi, yakınlaştırma ve erişilebilirlik.", icon: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="8" r="1"/>', selectors: [".appearance-settings"] },
  { id: "teams", label: "Takımlar", description: "Atamalarda kullanılan ekipler ve üyeler.", icon: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 5.2a3 3 0 0 1 0 5.8M18.5 19a5.5 5.5 0 0 0-3-4.9"/>', selectors: [".settings-team-section"] },
  { id: "work", label: "Tahmin ve sözlük", description: "Efor birimi, etiketler ve ürün alanları.", icon: '<path d="M3 12V4h8l9.5 9.5a2 2 0 0 1 0 2.8l-5.2 5.2a2 2 0 0 1-2.8 0z"/><circle cx="7.5" cy="8.5" r="1.3"/>', selectors: [".estimate-settings", ".dictionary-settings"] },
  { id: "integrations", label: "Entegrasyonlar", description: "Jira Server / Data Center bağlantısı.", icon: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>', selectors: [".jira-settings-block"] },
  { id: "data", label: "Veri ve yedekleme", description: "Bağlantı kontrolü, elle ve otomatik yedekler.", icon: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13"/><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>', selectors: [".workspace-link-report", ".backup-settings:not(.estimate-settings)"] }
];

function activateSettingsPanel(id: SettingsPanelId, focusTab = false): void {
  const form = modalRoot.querySelector<HTMLElement>(".settings-center");
  if (!form) return;
  settingsActivePanel = id;
  form.querySelectorAll<HTMLElement>("[data-settings-tab]").forEach((tab) => {
    const active = tab.dataset.settingsTab === id;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focusTab) tab.focus();
  });
  form.querySelectorAll<HTMLElement>("[data-settings-panel]").forEach((panel) => { panel.hidden = panel.dataset.settingsPanel !== id; });
  const scroller = form.querySelector<HTMLElement>(".settings-panels");
  if (scroller) scroller.scrollTop = 0;
}

function buildSettingsCenter(scrollTop = 0): void {
  const form = modalRoot.querySelector<HTMLFormElement>("#workspace-form");
  const modal = form?.closest<HTMLElement>(".modal");
  const footer = form?.querySelector<HTMLElement>(":scope > .modal-footer");
  if (!form || !modal || !footer) return;
  modal.classList.add("settings-center-modal");
  form.classList.add("settings-center");
  const issueCount = workspaceLinkIssues().length;
  const nav = document.createElement("nav");
  nav.className = "settings-nav";
  nav.setAttribute("role", "tablist");
  nav.setAttribute("aria-orientation", "vertical");
  nav.setAttribute("aria-label", "Ayar grupları");
  nav.innerHTML = SETTINGS_PANELS.map((panel) => '<button type="button" role="tab" id="settings-tab-' + panel.id + '" aria-controls="settings-panel-' + panel.id + '" data-settings-tab="' + panel.id + '"><span class="settings-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + panel.icon + '</svg></span><span class="settings-nav-label">' + esc(panel.label) + '</span>' + (panel.id === "data" && issueCount ? '<b class="settings-nav-badge" title="' + issueCount + ' veri bağlantısı sorunu">' + issueCount + '</b>' : '') + '</button>').join("");
  const panels = document.createElement("div");
  panels.className = "settings-panels";
  const claimed = new Set<Element>();
  SETTINGS_PANELS.forEach((definition) => {
    const panel = document.createElement("section");
    panel.className = "settings-panel";
    panel.id = "settings-panel-" + definition.id;
    panel.dataset.settingsPanel = definition.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "settings-tab-" + definition.id);
    panel.innerHTML = '<header class="settings-panel-header"><span class="settings-panel-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + definition.icon + '</svg></span><div><h3>' + esc(definition.label) + '</h3><p>' + esc(definition.description) + '</p></div></header>';
    definition.selectors.forEach((selector) => form.querySelectorAll(selector).forEach((node) => { if (!claimed.has(node) && node.parentElement === form) { claimed.add(node); panel.append(node); } }));
    panels.append(panel);
  });
  // Tanımlanmamış yeni bir bölüm eklenirse kaybolmasın: Genel grubunun sonuna alınır.
  [...form.children].forEach((node) => { if (node !== footer && !claimed.has(node)) panels.querySelector('[data-settings-panel="general"]')?.append(node); });
  form.prepend(nav);
  form.insertBefore(panels, footer);
  activateSettingsPanel(settingsActivePanel);
  panels.scrollTop = scrollTop;
  nav.addEventListener("click", (event) => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>("[data-settings-tab]");
    if (tab) activateSettingsPanel(tab.dataset.settingsTab as SettingsPanelId);
  });
  nav.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = SETTINGS_PANELS.findIndex((panel) => panel.id === settingsActivePanel);
    const next = event.key === "Home" ? 0 : event.key === "End" ? SETTINGS_PANELS.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + SETTINGS_PANELS.length) % SETTINGS_PANELS.length;
    activateSettingsPanel(SETTINGS_PANELS[next].id, true);
  });
  // Gizli gruptaki zorunlu alan boşsa kaydetmede o gruba geçilir.
  form.addEventListener("invalid", (event) => {
    const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-settings-panel]");
    if (panel && panel.hidden) activateSettingsPanel(panel.dataset.settingsPanel as SettingsPanelId);
  }, true);
}

async function exportWorkspaceBackup(): Promise<void> {
  try {
    const format = (document.getElementById("backup-format") as HTMLSelectElement | null)?.value === "json" ? "json" : "rota";
    const result = await desktop.exportWorkspaceBackup(state, format);
    if (result) toast("Yedek oluşturuldu · " + result.attachmentCount + " ek · " + result.path);
  } catch (error) { toast(error instanceof Error ? error.message : "Yedek oluşturulamadı."); }
}

async function createAutomaticBackup(force = false): Promise<void> {
  if (!desktop?.createAutomaticBackup || unreadableWorkspace !== null || automaticBackupBusy || !hasStoredWorkspace) return;
  const previous = Date.parse(localStorage.getItem(AUTO_BACKUP_AT_KEY) || "");
  if (!force && Number.isFinite(previous) && Date.now() - previous < 24 * 3600000) return;
  automaticBackupBusy = true;
  try {
    await desktop.createAutomaticBackup(state);
    localStorage.setItem(AUTO_BACKUP_AT_KEY, new Date().toISOString());
    automaticBackupError = "";
    if (force) { openWorkspaceSettings(); toast("Otomatik yedek oluşturuldu."); }
  } catch (error) {
    automaticBackupError = error instanceof Error ? error.message : "Otomatik yedek oluşturulamadı.";
    if (force) { openWorkspaceSettings(); toast(automaticBackupError); }
  } finally { automaticBackupBusy = false; }
}

const importFields = { id: "Rota iş ID", title: "Başlık", description: "Açıklama", type: "Tür", priority: "Öncelik", targetDate: "Hedef tarih", labels: "Etiketler" };
function initializeImportMapping(): void {
  const header = pendingBacklogImport?.sheets?.[importSheetIndex]?.rows[0] || [];
  const aliases: Record<string, string[]> = { id: ["id", "iş id", "rota iş id"], title: ["başlık", "title", "summary"], description: ["açıklama", "description"], type: ["tür", "type", "iş türü"], priority: ["öncelik", "priority"], targetDate: ["hedef tarih", "hedef bitiş", "target date"], labels: ["etiketler", "labels"] };
  importMapping = Object.fromEntries(Object.entries(aliases).map(([key, names]) => [key, header.findIndex((name) => names.includes(name.trim().toLocaleLowerCase("tr-TR")))]));
  importHasHeader = importMapping.title >= 0;
  if (!importHasHeader) { importMapping.title = 0; importMapping.description = 1; }
}
function importCandidates(): { row: number; values: Record<string, string>; error: string; existing?: WorkItem; duplicate: boolean }[] {
  const imported = pendingBacklogImport; if (!imported) return [];
  const rows = imported.sheets?.[importSheetIndex]?.rows || imported.rows.map((row) => [row.title, row.description]);
  return rows.map((cells, index) => {
    const values = Object.fromEntries(Object.keys(importFields).map((key) => [key, cells[importMapping[key]]?.trim() || ""]));
    const existing = values.id ? itemById(values.id) : undefined;
    const validDate = !values.targetDate || /^\d{4}-\d{2}-\d{2}$/.test(values.targetDate) && Number.isFinite(Date.parse(values.targetDate)) && new Date(values.targetDate).toISOString().slice(0, 10) === values.targetDate;
    const error = !values.title ? "Başlık boş" : values.title.length > 120 ? "Başlık 120 karakteri aşıyor" : values.id && !existing ? "Rota iş ID bulunamadı" : values.type && !["Story", "Bug", "Task"].includes(values.type) ? "Geçersiz tür" : values.priority && !["Kritik", "Yüksek", "Orta", "Düşük"].includes(values.priority) ? "Geçersiz öncelik" : !validDate ? "Tarih YYYY-AA-GG olmalı" : "";
    return { row: index + 1, values, error, existing, duplicate: Boolean(imported.fingerprint && state.items.some((item) => item.importSource?.fingerprint === imported.fingerprint && item.importSource?.row === index + 1 && item.importSource?.filename === imported.filename + " · " + (imported.sheets?.[importSheetIndex]?.name || ""))) };
  }).filter((entry, index) => !(importHasHeader && index === 0) && Object.values(entry.values).some(Boolean));
}
function renderExcelImport(): void {
  const imported = pendingBacklogImport; if (!imported) return;
  const projects = state.projects.filter((project) => !project.archived);
  const projectId = modalRoot.querySelector<HTMLSelectElement>("#backlog-import-project")?.value || activeProjectId;
  const rows = imported.sheets?.[importSheetIndex]?.rows || [];
  const candidates = importCandidates();
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal backlog-import-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">EXCEL · EŞLEME VE ÖNİZLEME</div><h2>İşleri içe aktar</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><p class="settings-intro">' + esc(imported.filename) + ' · ' + candidates.length + ' satır</p><div class="form-two-col"><label class="field-label">Sayfa<select id="import-sheet" class="field-input">' + (imported.sheets || [{ name: "İlk sayfa", rows: [] }]).map((sheet, index) => '<option value="' + index + '" ' + (index === importSheetIndex ? 'selected' : '') + '>' + esc(sheet.name) + '</option>').join("") + '</select></label><label class="field-label">Yeni işlerin projesi<select id="backlog-import-project" class="field-input">' + projects.map((project) => '<option value="' + esc(project.id) + '" ' + (project.id === projectId ? 'selected' : '') + '>' + esc(project.name) + '</option>').join("") + '</select></label></div><label class="completed-filter"><input id="import-header" type="checkbox" ' + (importHasHeader ? 'checked' : '') + '> İlk satır sütun başlığı</label><div class="form-two-col">' + Object.entries(importFields).map(([key, label]) => '<label class="field-label">' + label + '<select class="field-input" data-import-map="' + key + '"><option value="-1">Aktarma</option>' + Array.from({ length: Math.max(...rows.map((row) => row.length), 2) }, (_, column) => '<option value="' + column + '" ' + (importMapping[key] === column ? 'selected' : '') + '>' + (column + 1) + ' · ' + esc(rows[0]?.[column] || "Sütun") + '</option>').join("") + '</select></label>').join("") + '</div><p class="settings-note">ID eşleşen kayıtlar yalnızca seçilirse güncellenir. Tekrar alınan satırlar seçili gelmez. Eşlenmeyen alanlar korunur.</p><div class="bulk-preview-scroll"><table><thead><tr><th>Seç</th><th>Satır</th><th>Başlık</th><th>İşlem / hata</th></tr></thead><tbody>' + candidates.map((entry) => '<tr><td><input type="checkbox" data-import-row="' + entry.row + '" aria-label="Satır ' + entry.row + '" ' + (entry.error ? 'disabled' : entry.duplicate || entry.existing ? '' : 'checked') + '></td><td>' + entry.row + '</td><td>' + esc(entry.values.title) + '</td><td>' + esc(entry.error || (entry.duplicate ? "Tekrar alınan satır · " : "") + (entry.existing ? "Güncelle · " + entry.existing.id : "Yeni kayıt")) + '</td></tr>').join("") + '</tbody></table></div><footer class="modal-footer"><button class="button button-quiet" data-close-modal>Vazgeç</button><button class="button button-primary" data-action="confirm-backlog-import">Seçili satırları aktar</button></footer></div></section></div>';
}
async function openBacklogExcelImport(): Promise<void> {
  try { const imported = await desktop.pickBacklogExcelImport(); if (!imported) return; pendingBacklogImport = imported; importSheetIndex = 0; initializeImportMapping(); renderExcelImport(); }
  catch { recordDiagnostic("import", "Excel dosyası okunamadı."); toast("Excel dosyası okunamadı. Dosya biçimini ve boyutunu kontrol et."); }
}
function confirmBacklogExcelImport(): void {
  const imported = pendingBacklogImport;
  const project = state.projects.find((entry) => entry.id === modalRoot.querySelector<HTMLSelectElement>("#backlog-import-project")?.value && !entry.archived);
  if (!imported || !project) { toast("Geçerli bir proje seç."); return; }
  const selected = new Set([...modalRoot.querySelectorAll<HTMLInputElement>("[data-import-row]:checked")].map((input) => Number(input.dataset.importRow)));
  const candidates = importCandidates().filter((entry) => !entry.error && selected.has(entry.row));
  if (!candidates.length) { toast("Aktarılacak geçerli satır seç."); return; }
  const repeatedIds = candidates.map((entry) => entry.existing?.id).filter(Boolean);
  if (new Set(repeatedIds).size !== repeatedIds.length) { toast("Aynı iş ID'si birden fazla satırda seçilemez."); return; }
  const before = structuredClone(state);
  const now = new Date().toISOString();
  for (const entry of candidates) {
    const item: WorkItem = entry.existing || { id: nextId("PAY"), title: "", description: "", type: "Task", status: "Yeni", statusEnteredAt: now, priority: "Orta", project: project.name, projectId: project.id, area: "Genel", updated: "Az önce", acceptance: [], attachments: [], labels: [], activity: [] };
    item.title = entry.values.title;
    if (importMapping.description >= 0) item.description = entry.values.description;
    if (entry.values.type) item.type = entry.values.type as WorkType;
    if (entry.values.priority) item.priority = entry.values.priority as Priority;
    if (importMapping.targetDate >= 0) item.targetDate = entry.values.targetDate || undefined;
    if (importMapping.labels >= 0) item.labels = [...new Set(entry.values.labels.split(/[;,]/).map((label) => label.trim()).filter(Boolean))];
    item.importSource = { fingerprint: imported.fingerprint || "", filename: imported.filename + " · " + (imported.sheets?.[importSheetIndex]?.name || ""), row: entry.row, importedAt: now };
    item.updated = "Az önce"; addWorkActivity(item, entry.existing ? "change" : "created", "Excel aktarımı: " + imported.filename + " · satır " + entry.row);
    if (!entry.existing) state.items.unshift(item);
  }
  pendingBacklogImport = null; save(); closeModal(); render(); toastUndoDeletion(candidates.length + " satır aktarıldı.", before);
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
    if (!(await appConfirm("Bu yedek çalışma alanındaki mevcut kayıtların yerini alacak. " + candidate.items.length + " backlog işi ve " + staged.attachmentCount + " dosya eki yüklenecek. Devam edilsin mi?"))) {
      await desktop.cancelWorkspaceRestore(restoreToken);
      return;
    }
    if (unreadableWorkspace === null && hasStoredWorkspace) await desktop.createAutomaticBackup(state);
    const previousState = state;
    const previousStorage = localStorage.getItem(STORAGE_KEY);
    const previousUnreadable = unreadableWorkspace;
    try {
      const restored = { ...migrateWorkspace(candidate), decisions: candidate.decisions || [], diagrams: candidate.diagrams || [], sprints: candidate.sprints || [] } as WorkspaceState;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
      await desktop.commitWorkspaceRestore(restoreToken);
      staged = null;
      state = restored;
      unreadableWorkspace = null;
      document.getElementById("workspace-recovery")?.remove();
      if (activeView === "assets") disposeAssetDiagram();
      activeView = "overview"; activeProjectId = null; activeItemId = null;
      save(); render(); closeModal();
      toast("Yedek geri yüklendi · " + attachmentCount + " ek.");
    } catch (error) {
      state = previousState;
      unreadableWorkspace = previousUnreadable;
      if (previousStorage === null) localStorage.removeItem(STORAGE_KEY); else localStorage.setItem(STORAGE_KEY, previousStorage);
      showWorkspaceRecovery();
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
  if (!(await appConfirm(prompt))) return;
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
  const unit = document.getElementById("workspace-estimate-unit") as HTMLSelectElement | null;
  if (unit && !state.items.some((item) => item.estimate !== undefined)) state.estimateUnit = unit.value === "puan" ? "puan" : "saat";
  save(); closeModal(); render(); toast("Ayarlar kaydedildi.");
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

function itemRecordStackMarkup(item: WorkItem, open = false): string {
  type Row = { date?: string; markup: string };
  type FileRow = { file: AttachmentInfo; remove?: string; date?: string };
  const rows: Row[] = [];
  const fileMarkup = ({ file, remove, date }: FileRow) => {
    const email = /\.(msg|eml)$/i.test(file.name);
    return '<div class="record-stack-row">' + icon(email ? "mail" : "file") + '<span><strong>' + esc(file.name) + '</strong><small>' + dateMarkup(date) + '</small></span>' +
      (file.storedName ? '<button type="button" class="text-button" ' + (email ? 'data-open-source-email' : 'data-open-file') + '="' + esc(file.storedName) + '">Aç</button>' : '') + (remove || '') + '</div>';
  };
  const dateMarkup = (date?: string) => {
    const parsed = date ? new Date(date) : null;
    return esc(parsed && Number.isFinite(parsed.getTime()) ? parsed.toLocaleDateString("tr-TR") : date || "Tarih bilgisi yok");
  };
  function collect(files: FileRow[], emails: EmailSourceInfo[], activity: WorkActivity[] = []): void {
    const used = new Set<FileRow>();
    for (const email of emails) {
      const original = files.find(({ file }) => email.originalStoredName ? file.storedName === email.originalStoredName : file.name === email.name);
      if (original) used.add(original);
      const legacy = !email.attachmentStoredNames && original?.file.storedName
        ? activity.find((entry) => entry.kind === "comment" && entry.message.startsWith("E-posta: ") && entry.attachments?.some((file) => file.storedName === original.file.storedName))
        : undefined;
      const childNames = new Set(email.attachmentStoredNames || legacy?.attachments?.map((file) => file.storedName).filter(Boolean) || []);
      const children = files.filter((row) => !used.has(row) && row.file.storedName && childNames.has(row.file.storedName));
      children.forEach((row) => used.add(row));
      const date = email.date || original?.date || legacy?.occurredAt;
      rows.push({ date, markup: '<div class="record-stack-row">' + icon("mail") + '<span><strong>' + esc(email.name) + '</strong><small>' + [dateMarkup(date), esc(email.from)].filter(Boolean).join(" · ") + '</small></span>' +
        (original?.file.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(original.file.storedName) + '">Aç</button>' : '') + (original?.remove || '') + '</div>' +
        (children.length ? '<ul class="record-stack-children">' + children.map((row) => '<li>' + fileMarkup(row) + '</li>').join("") + '</ul>' : '') });
    }
    for (const row of files) {
      if (!used.has(row)) rows.push({ date: row.date, markup: fileMarkup(row) });
    }
  }
  const fileRows: FileRow[] = (item.attachments || []).map((file, index) => ({
    file, date: file.addedAt,
    remove: '<button type="button" class="remove-file" data-remove-saved="' + esc("item:" + item.id) + '" data-file-index="' + index + '" title="Eki kaldır" aria-label="Eki kaldır">×</button>'
  }));
  const knownFiles = new Map(fileRows.filter(({ file }) => file.storedName).map((row) => [row.file.storedName, row]));
  for (const entry of item.activity || []) {
    for (const file of entry.attachments || []) {
      const known = file.storedName && knownFiles.get(file.storedName);
      if (known) { known.date ||= entry.occurredAt; continue; }
      // E-posta yorumundaki dosyalar işin dosya listesinden kaldırılmış olabilir.
      if (entry.message.startsWith("E-posta: ")) continue;
      const row = { file, date: file.addedAt || entry.occurredAt };
      fileRows.push(row);
      if (file.storedName) knownFiles.set(file.storedName, row);
    }
  }
  collect(fileRows, [...(item.sourceEmail ? [item.sourceEmail] : []), ...(item.sourceEmails || [])], item.activity);
  const noteIds = new Set(item.relatedRecords?.filter((record) => record.type === "note").map((record) => record.targetId));
  for (const note of state.notes.filter((note) => note.linked === item.id || noteIds.has(note.id))) {
    rows.push({ date: note.createdAt, markup: '<div class="record-stack-row">' + icon("note") + '<span><strong>' + esc(note.title) + '</strong><small>' + dateMarkup(note.createdAt) + '</small></span><button type="button" class="text-button" data-open-note="' + esc(note.id) + '">Aç</button></div>' });
    collect((note.attachments || []).map((file) => ({ file, date: file.addedAt })), [...(note.sourceEmail ? [note.sourceEmail] : []), ...(note.sourceEmails || [])]);
  }
  const timestamp = (date?: string) => Date.parse(date || "") || 0;
  rows.sort((a, b) => timestamp(b.date) - timestamp(a.date));
  return '<details class="record-stack" ' + (open ? "open" : "") + '><summary><span class="record-stack-icon">' + icon("file") + icon("file") + '</span><strong>Kayıt yığını</strong><span class="count-chip">' + rows.length + '</span>' + icon("chevronDown") + '</summary>' +
    (rows.length ? '<ul class="record-stack-list">' + rows.map(({ markup }) => '<li>' + markup + '</li>').join("") + '</ul>' : '<p>Bu işe bağlı e-posta, dosya veya not yok.</p>') + '</details>';
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
  if (document.getElementById("new-form")) scheduleFormDraftSave();
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
      save(); render(); refreshItemDetail(item);
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

function renderEmailDestination(): void {
  if (!pendingDroppedEmailSource) return;
  const source = pendingDroppedEmailSource;
  const subject = field("new-title-input").value.toLocaleLowerCase("tr-TR").replace(/^(re|fw|fwd|ynt|ilt):\s*/g, "");
  const candidates = state.items.filter((item) => !item.archived).map((item) => ({ item, score: item.sourceEmail?.fingerprint === source.fingerprint || item.sourceEmails?.some((entry) => entry.fingerprint === source.fingerprint) ? 3 : subject.includes(item.id.toLocaleLowerCase("tr-TR")) ? 2 : item.title.toLocaleLowerCase("tr-TR").includes(subject) || subject.includes(item.title.toLocaleLowerCase("tr-TR")) ? 1 : 0 })).sort((a, b) => b.score - a.score);
  document.getElementById("email-destination")?.remove();
  modalRoot.querySelector("#new-form")?.insertAdjacentHTML("afterbegin", '<section id="email-destination" class="draft-recovery"><div><strong>E-postayı mevcut işe ekle</strong><small>Yeni kayıt oluşturmak için aşağıdaki formu kullanabilirsin.</small></div><label class="field-label">Hedef iş<select id="email-existing-item" class="field-input"><option value="">İş seç</option>' + candidates.map(({ item, score }) => '<option value="' + esc(item.id) + '">' + esc((score ? "Öneri · " : "") + item.id + " · " + item.title) + '</option>').join("") + '</select></label><button type="button" class="button button-secondary button-small" data-action="attach-email-existing">Önizlenen içeriği işe ekle</button></section>');
}
async function attachEmailToExisting(): Promise<void> {
  const item = itemById(modalRoot.querySelector<HTMLSelectElement>("#email-existing-item")?.value || "");
  const source = pendingDroppedEmailSource;
  if (!item || !source) { toast("E-postanın ekleneceği işi seç."); return; }
  if (item.sourceEmail?.fingerprint === source.fingerprint || item.sourceEmails?.some((entry) => entry.fingerprint === source.fingerprint)) { toast("Bu e-posta seçilen işte zaten var. Aynı içerik yeniden eklenmedi."); return; }
  const button = modalRoot.querySelector<HTMLButtonElement>('[data-action="attach-email-existing"]'); if (button) button.disabled = true;
  try {
    const selected = [...modalRoot.querySelectorAll<HTMLInputElement>("[data-email-attachment]:checked")].map((input) => input.dataset.emailAttachment!);
    const imported = pendingEmailAttachmentToken && selected.length ? await desktop.importSelectedEmailAttachments(pendingEmailAttachmentToken, selected) : [];
    const files = [...draftAttachments, ...imported];
    item.attachments.push(...files);
    (item.sourceEmails ||= []).push({ ...source, attachmentStoredNames: [
      ...(source.attachmentStoredNames || []), ...imported.flatMap((file) => file.storedName ? [file.storedName] : [])
    ] });
    (item.activity ||= []).unshift({ id: nextId("ACT"), kind: "comment", message: "E-posta: " + field("new-title-input").value + "\n" + field("new-description").value, actor: source.from, occurredAt: new Date().toISOString(), attachments: files });
    state.formDrafts = []; save(); closeModal(true); render(); openItem(item.id); toast("E-posta ve seçilen ekler işe eklendi.");
  } catch { recordDiagnostic("attachment", ""); toast("E-posta ekleri alınamadı. Önizlemeyi koruyarak yeniden deneyebilirsin."); }
  finally { if (button?.isConnected) button.disabled = false; }
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
  if (detailEdit && !commitDetailEdit()) return;
  rememberDeskPin(modalRoot.querySelector(".detail-modal"));
  detailEdit = null;
  window.clearTimeout(formDraftTimer);
  disposeWorkDiagramGraph();
  modalRoot.innerHTML = "";
  activeModalDialog = null;
  const list = root.querySelector<HTMLElement>(".backlog-table-wrap");
  if (list && backlogDetailScroll !== null) {
    if (list.dataset.virtual) {
      const start = Math.max(0, Math.floor(backlogDetailScroll / backlogWindowRowHeight) - 8);
      if (start !== backlogWindowStart) {
        backlogWindowStart = start;
        updateBacklogRows();
      }
    }
    list.scrollTop = backlogDetailScroll;
  }
  backlogDetailScroll = null;
  if (modalReturnFocus?.isConnected) modalReturnFocus.focus({ preventScroll: true });
  else if (modalReturnFocus?.matches(".backlog-title-open, .backlog-preview-button, .board-card")) {
    const id = CSS.escape(modalReturnFocus.dataset.openItem || "");
    const eye = modalReturnFocus.matches(".backlog-preview-button") && root.querySelector<HTMLElement>('.backlog-preview-button[data-open-item="' + id + '"]');
    const origin = eye || root.querySelector<HTMLElement>('.backlog-title-open[data-open-item="' + id + '"], .board-card[data-open-item="' + id + '"]');
    (origin || root.querySelector<HTMLElement>(".view-tab.selected"))?.focus({ preventScroll: true });
  }
  modalReturnFocus = null;
  activeItemId = null;
  statusUpdateReturnToBoard = false;
  attachmentTarget = null;
  if (!preserveDraftAttachments && desktop) {
    const retained = new Set((state.formDrafts || []).flatMap((draft) => draft.attachments.map((file) => file.storedName)));
    const storedNames = draftAttachments.flatMap((file) => file.storedName && !retained.has(file.storedName) ? [file.storedName] : []);
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

async function addDiagramNode(diagram: WorkDiagram): Promise<void> {
  const label = (await appPrompt("Diyagram adımının adı"));
  if (!label?.trim()) return;
  const node: DiagramNode = { id: nextId("DGN"), label: label.trim().slice(0, 120), x: 32 + (diagram.nodes.length % 3) * 260, y: 40 + Math.floor(diagram.nodes.length / 3) * 150 };
  diagram.nodes.push(node);
  diagram.updated = "Az önce";
  workDiagramGraph?.addNode({
    id: node.id, shape: "rect", x: node.x, y: node.y, width: 220, height: 88,
    attrs: { body: { fill: "var(--diagram-node-fill, #fff)", stroke: "var(--diagram-node-border, #dfe4ed)", strokeWidth: 1, rx: 10, ry: 10 }, label: { text: node.label, fill: "var(--diagram-node-text, #343c4e)", fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: 190, height: 64, ellipsis: true } } },
    ports: { groups: { left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } } }, items: [{ group: "left" }, { group: "right" }, { group: "top" }, { group: "bottom" }] }
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
    grid: { visible: true, size: 20, type: "dot", args: { color: document.body.classList.contains("dark-theme") ? "#343c4a" : "#dce1ed", thickness: 1 } },
    panning: { enabled: true }, mousewheel: { enabled: true, modifiers: ["ctrl"] },
    connecting: { allowBlank: false, allowLoop: false, allowMulti: true, allowNode: true, snap: true, connector: "rounded", createEdge() { return this.createEdge({ attrs: { line: { stroke: "#6073df", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } } }); }, validateConnection({ sourceCell, targetCell }) { return !!sourceCell && !!targetCell && sourceCell.isNode() && targetCell.isNode() && sourceCell.id !== targetCell.id; } }
  });
  workDiagramGraph = graph;
  diagram.nodes.forEach((node) => graph.addNode({
    id: node.id, shape: "rect", x: node.x, y: node.y, width: 220, height: 88,
    attrs: { body: { fill: "var(--diagram-node-fill, #fff)", stroke: "var(--diagram-node-border, #dfe4ed)", strokeWidth: 1, rx: 10, ry: 10 }, label: { text: node.label, fill: "var(--diagram-node-text, #343c4e)", fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 600, textWrap: { width: 190, height: 64, ellipsis: true } } },
    ports: { groups: { left: { position: "left", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, right: { position: "right", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, top: { position: "top", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } }, bottom: { position: "bottom", attrs: { circle: { r: 6, magnet: true, stroke: "var(--diagram-node-fill, #fff)", strokeWidth: 2, fill: "var(--diagram-port-fill, #6073df)" } } } }, items: [{ group: "left" }, { group: "right" }, { group: "top" }, { group: "bottom" }] }
  }));
  diagram.edges.forEach((edge) => graph.addEdge({ id: edge.id, source: { cell: edge.source }, target: { cell: edge.target }, router: "manhattan", connector: "rounded", labels: [{ attrs: { text: { text: edge.label, fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }], attrs: { line: { stroke: "#7382d4", strokeWidth: 2, targetMarker: { name: "block", width: 10, height: 8 } } } }));
  graph.on("node:change:position", ({ node }: { node: Node }) => {
    const entry = diagram.nodes.find((candidate) => candidate.id === node.id);
    if (!entry) return;
    const pos = node.position(); entry.x = Math.round(pos.x); entry.y = Math.round(pos.y); diagram.updated = "Az önce"; save();
  });
  graph.on("node:dblclick", async ({ node }: { node: Node }) => {
    const entry = diagram.nodes.find((candidate) => candidate.id === node.id); if (!entry) return;
    const label = (await appPrompt("Diyagram adımını düzenle", entry.label)); if (!label?.trim()) return;
    entry.label = label.trim().slice(0, 120); node.attr("label/text", entry.label); diagram.updated = "Az önce"; save(); renderDiagramToolbar(diagram);
  });
  graph.on("edge:dblclick", async ({ edge }: { edge: Edge }) => {
    const entry = diagram.edges.find((candidate) => candidate.id === edge.id); if (!entry) return;
    const label = (await appPrompt("Ok üzerindeki ilişki", entry.label)); if (label === null) return;
    entry.label = label.trim().slice(0, 80) || "Akış"; edge.setLabels([{ attrs: { text: { text: entry.label, fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }]); diagram.updated = "Az önce"; save(); renderDiagramEdgeList(diagram);
  });
  graph.on("edge:connected", ({ edge, isNew }: { edge: Edge; isNew: boolean }) => {
    if (!isNew) return;
    const source = edge.getSourceCellId(); const target = edge.getTargetCellId();
    if (!source || !target) { edge.remove(); return; }
    const entry: DiagramEdge = { id: String(edge.id || nextId("DGE")), source, target, label: "Akış" };
    diagram.edges.push(entry); edge.setLabels([{ attrs: { text: { text: entry.label, fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }]); diagram.updated = "Az önce"; save(); renderDiagramToolbar(diagram);
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

async function deleteWorkDiagram(id: string): Promise<void> {
  const diagram = state.diagrams.find((entry) => entry.id === id);
  if (!diagram || !(await appConfirm('"' + diagram.title + '" diyagramını silmek istiyor musun?'))) return;
  state.diagrams = state.diagrams.filter((entry) => entry.id !== id);
  const { ownerType, ownerId } = diagram;
  save(); closeModal();
  if (ownerType === "item") openItem(ownerId); else showNote(ownerId);
  toast("Diyagram silindi.");
}

type DetailEditState = { itemId: string; field: string; host: HTMLElement; pendingStatus?: WorkStatus };
let detailEdit: DetailEditState | null = null;
const detailLabels: Record<string, string> = {
  title: "Başlık", description: "İşin bağlamı", acceptance: "Kabul kriterleri", type: "Tür", project: "Proje", status: "Durum", priority: "Öncelik", area: "Ürün alanı", labels: "Etiketler", assignments: "Takım ve sorumlular", startDate: "Başlangıç", targetDate: "Hedef tarih", targetPeriod: "Planlanan dönem", estimate: "Tahmini efor", releaseId: "Release", sprintId: "Sprint", roadmapNodeId: "Ürün hedefi", productStage: "Ürün aşaması", assetIds: "Ürün bileşenleri", dependsOnIds: "Beklenen işler", blocker: "Blokaj bilgileri", actualStartDate: "Gerçek başlangıç", completedAt: "Tamamlanma tarihi", relatedRecords: "İlişkili kayıtlar"
};
function detailChoices(item: WorkItem, field: string): { value: string; label: string }[] | null {
  const values = (entries: string[]) => entries.map((value) => ({ value, label: value }));
  if (field === "type") return values(["Story", "Bug", "Task"]);
  if (field === "status") return values(["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"]);
  if (field === "priority") return values(["Kritik", "Yüksek", "Orta", "Düşük"]);
  if (field === "project") return state.projects.filter((project) => !project.archived || project.name === item.project).map((project) => ({ value: project.name, label: project.name }));
  if (field === "productStage") return values(["Fikirler", "Keşif", "Sırada", "Planlandı", "Teslimatta", "Tamamlandı"]);
  if (field === "releaseId") return [{ value: "", label: "Release seçilmedi" }, ...state.releases.filter((release) => release.project === item.project).map((release) => ({ value: release.id, label: release.name }))];
  if (field === "sprintId") return [{ value: "", label: "Sprint seçilmedi" }, ...state.sprints.filter((sprint) => !sprint.closedAt || sprint.id === item.sprintId).map((sprint) => ({ value: sprint.id, label: sprint.name }))];
  if (field === "roadmapNodeId") return [{ value: "", label: "Ürün hedefi seçilmedi" }, ...state.roadmap.filter((node) => node.project === item.project).map((node) => ({ value: node.id, label: node.title }))];
  if (field === "assetIds") return state.assets.filter((asset) => asset.active || item.assetIds?.includes(asset.id)).map((asset) => ({ value: asset.id, label: asset.code + " · " + asset.name }));
  if (field === "relatedRecords") {
    const entries = [
      ...state.items.filter((entry) => entry.id !== item.id && !entry.archived).map((entry) => ({ value: "item::" + entry.id, label: "İş · " + entry.id + " · " + entry.title })),
      ...state.assets.map((entry) => ({ value: "asset::" + entry.id, label: "Bileşen · " + entry.code + " · " + entry.name })),
      ...state.releases.map((entry) => ({ value: "release::" + entry.id, label: "Release · " + entry.name })),
      ...state.notes.map((entry) => ({ value: "note::" + entry.id, label: "Not · " + entry.title })),
      ...(state.openQuestions || []).map((entry) => ({ value: "question::" + entry.id, label: "Soru · " + entry.text })),
      ...(state.risks || []).map((entry) => ({ value: "risk::" + entry.id, label: "Risk · " + entry.title }))
    ];
    for (const link of item.relatedRecords || []) { const value = link.type + "::" + link.targetId; if (!entries.some((entry) => entry.value === value)) entries.push({ value, label: link.label || relatedRecordLabel(link.type, link.targetId) }); }
    return entries;
  }
  if (field === "dependsOnIds") return state.items.filter((entry) => entry.id !== item.id && !entry.mergedIntoId).map((entry) => ({ value: entry.id, label: entry.id + " · " + entry.title }));
  return null;
}
function detailFieldValue(item: WorkItem, field: string): string {
  if (field.startsWith("comment:")) return item.activity?.find((entry) => entry.id === field.slice(8))?.message || "";
  const value = item[field as keyof WorkItem];
  return Array.isArray(value) ? value.join(field === "acceptance" ? "\n" : ", ") : String(value ?? "");
}
function detailFieldMarkup(item: WorkItem, field: string): string {
  const raw = detailFieldValue(item, field);
  if (field === "description") return structuredTextMarkup(raw || "Açıklama ekle…");
  if (field === "acceptance") return item.acceptance.length ? '<ul class="criteria-list">' + item.acceptance.map((criterion) => '<li><span class="criterion-check">✓</span>' + esc(criterion) + '</li>').join("") + '</ul>' : '<span class="asset-muted">Kabul kriteri ekle…</span>';
  if (field === "labels") return item.labels.length ? '<span class="tag-row">' + item.labels.map((label) => '<span class="tag">' + esc(label) + '</span>').join("") + '</span>' : '<span class="asset-muted">Etiket ekle…</span>';
  if (field === "relatedRecords") return '<span class="asset-muted">İlişkileri seç…</span>';
  if (field === "assignments") return getWorkAssignments(item).map((entry) => '<span class="detail-assignment-person"><strong>' + esc(entry.member) + '</strong><small>' + esc(state.teams.find((team) => team.id === entry.teamId)?.name || "Takım") + (entry.scope ? ' · ' + esc(entry.scope) : '') + '</small></span>').join("") || '<span class="asset-muted">Henüz takım üyesi atanmadı.</span>';
  if (field === "assetIds" || field === "dependsOnIds") {
    const selected = (item[field] || []);
    return selected.map((id) => esc(detailChoices(item, field)?.find((entry) => entry.value === id)?.label || id)).join('<br>') || '<span class="asset-muted">Seçim ekle…</span>';
  }
  if (field === "blocker") return '<span>' + esc(item.blocker?.reason || "Blokaj bilgisi ekle…") + '</span>' + (item.blocker?.nextStep ? '<small>Sonraki adım: ' + esc(item.blocker.nextStep) + '</small>' : '') + (item.blocker?.expectedAction ? '<small>Beklenen: ' + esc(item.blocker.expectedAction) + '</small>' : '') + (item.blocker?.owner ? '<small>Sahip: ' + esc(item.blocker.owner) + '</small>' : '') + (item.blocker?.followUpAt ? '<small>Takip: ' + esc(item.blocker.followUpAt.replace("T", " ")) + '</small>' : '');
  const choice = detailChoices(item, field)?.find((entry) => entry.value === raw);
  return esc(choice?.label || (field === "estimate" && raw ? raw + " " + (state.estimateUnit || "saat") : raw.replace("T", " ")) || "Ekle…");
}
function detailField(item: WorkItem, field: string): string {
  return '<div class="detail-inline-slot" data-detail-slot="' + esc(field) + '"><button type="button" class="detail-inline-value" data-detail-edit="' + esc(field) + '" aria-label="' + esc((detailLabels[field] || "Not") + ' alanını değiştir') + '">' + detailFieldMarkup(item, field) + '</button></div>';
}
function detailProperty(item: WorkItem, field: string): string {
  return '<div class="detail-property"><span>' + esc(detailLabels[field]) + '</span>' + detailField(item, field) + '</div>';
}
function refreshItemBackground(): void {
  if (activeView === "backlog") {
    const counter = document.getElementById("nav-backlog-count");
    if (counter) counter.textContent = String(state.items.filter((item) => isItemInActiveProject(item) && item.status !== "Tamamlandı").length);
    updateBacklogRows();
  } else render();
}
function detailFeedback(message: string, error = false): void {
  const status = modalRoot.querySelector<HTMLElement>(".detail-save-status");
  if (status) { status.textContent = message; status.classList.toggle("is-error", error); }
}
function refreshItemDetail(item: WorkItem): void {
  const dialog = modalRoot.querySelector<HTMLElement>('.detail-modal[data-open-item="' + CSS.escape(item.id) + '"]');
  if (!dialog) return;
  dialog.querySelectorAll<HTMLElement>("[data-detail-slot]").forEach((host) => {
    if (detailEdit?.host === host) return;
    const field = host.dataset.detailSlot!;
    const markup = '<button type="button" class="detail-inline-value" data-detail-edit="' + esc(field) + '" aria-label="' + esc((detailLabels[field] || "Not") + ' alanını değiştir') + '">' + detailFieldMarkup(item, field) + '</button>';
    const template = document.createElement("template"); template.innerHTML = markup;
    const desired = template.content.firstElementChild!;
    const button = host.querySelector<HTMLElement>(":scope > .detail-inline-value");
    if (button) { if (button.innerHTML !== desired.innerHTML) button.innerHTML = desired.innerHTML; }
    else host.replaceChildren(desired);
  });
  for (const [id, value] of [["detail-status", item.status], ["detail-priority", item.priority]]) {
    const select = dialog.querySelector<HTMLSelectElement>("#" + id);
    if (select && !(id === "detail-status" && detailEdit?.pendingStatus)) select.value = value;
  }
  const badges = dialog.querySelectorAll<HTMLElement>("[data-detail-badge]");
  badges.forEach((badge) => {
    if (badge.dataset.detailBadge === "status") { badge.className = "status-pill " + statusClass(item.status); badge.innerHTML = '<i></i>' + esc(item.status); }
    else { badge.className = "priority " + priorityClass(item.priority); badge.innerHTML = '<b>' + priorityMark(item.priority) + '</b>' + esc(item.priority); }
  });
  const typeIcon = dialog.querySelector(".detail-identity .table-type");
  if (typeIcon) { typeIcon.className = "table-type " + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type"); typeIcon.innerHTML = itemIcon(item.type); }
  const byline = dialog.querySelector(".detail-byline");
  if (byline) byline.innerHTML = '<span class="profile-avatar small-avatar">PO</span><span>' + esc(state.profile.userName || "PO") + '</span><span>·</span><span>Son güncelleme ' + esc(itemLastActivityLabel(item)) + '</span>';
  const activity = dialog.querySelector<HTMLElement>(".work-activity");
  if (activity && !detailEdit?.field.startsWith("comment:")) {
    const filter = activity.querySelector<HTMLSelectElement>("#activity-kind-filter")?.value || "all";
    const template = document.createElement("div"); template.innerHTML = activityMarkup(item);
    activity.innerHTML = template.firstElementChild!.innerHTML;
    item.activity?.forEach((entry, index) => { if (entry.kind === "comment") { const body = activity.querySelectorAll(".activity-entry > div > p")[index]; if (body) body.outerHTML = detailField(item, "comment:" + entry.id); } });
    const select = activity.querySelector<HTMLSelectElement>("#activity-kind-filter"); if (select) { select.value = filter; select.dispatchEvent(new Event("change", { bubbles: true })); }
  }
  const relationships = dialog.querySelector<HTMLElement>(".item-relationships");
  if (relationships && detailEdit?.field !== "relatedRecords") {
    const content = document.createElement("div"); content.innerHTML = itemRelationshipsMarkup(item);
    relationships.innerHTML = content.firstElementChild!.innerHTML;
    relationships.querySelector('[data-action="add-related-record"]')?.remove();
    relationships.insertAdjacentHTML("beforeend", detailField(item, "relatedRecords"));
  }
  const files = dialog.querySelector(".detail-files");
  if (files) files.innerHTML = itemRecordStackMarkup(item, !!files.querySelector(".record-stack[open]"));
  const archive = dialog.querySelector<HTMLButtonElement>('[data-action="archive-item"]');
  if (archive?.classList.contains("detail-tool")) detailTool(archive, item.archived ? "Arşivden çıkar" : "Arşivle", item.archived ? "restore" : "archive");
  const summaries: Record<string, string> = { properties: item.status + " · " + item.priority, team: getWorkAssignments(item).length ? getWorkAssignments(item).length + " kişi" : "Atama yok", planning: [item.targetDate, item.estimate !== undefined ? item.estimate + " " + (state.estimateUnit || "saat") : ""].filter(Boolean).join(" · ") || "Tarih, efor ve bağlantılar" };
  dialog.querySelectorAll<HTMLElement>("[data-detail-group-summary]").forEach((node) => { node.textContent = summaries[node.dataset.detailGroupSummary!] || ""; });
  dialog.querySelector<HTMLElement>('[data-detail-slot="blocker"]')?.closest<HTMLElement>(".detail-property")?.classList.toggle("hidden", item.status !== "Bloke" && detailEdit?.field !== "blocker");
}
function beginDetailEdit(field: string, pendingStatus?: WorkStatus): void {
  const item = activeItemId ? itemById(activeItemId) : undefined;
  if (detailEdit?.field === field && detailEdit.itemId === item?.id) return;
  if (!item || (detailEdit && !commitDetailEdit())) return;
  const host = modalRoot.querySelector<HTMLElement>('[data-detail-slot="' + CSS.escape(field) + '"]'); if (!host) return;
  revealDetailControl(host);
  detailEdit = { itemId: item.id, field, host, pendingStatus };
  host.classList.add("is-editing"); host.closest<HTMLElement>(".detail-property")?.classList.remove("hidden");
  const raw = detailFieldValue(item, field);
  const choices = detailChoices(item, field);
  const multiple = field === "assetIds" || field === "dependsOnIds" || field === "relatedRecords";
  let markup: string;
  if (field === "assignments") markup = assignmentEditorMarkup("detail-assignment-list", getWorkAssignments(item));
  else if (field === "blocker") markup = '<div class="detail-blocker-fields">' + ([['reason', 'Blokaj nedeni'], ['expectedAction', 'Beklenen karar veya iş'], ['nextStep', 'Sonraki adım'], ['owner', 'Takip sahibi'], ['followUpAt', 'Takip tarihi']] as const).map(([key, label]) => '<label class="field-label">' + label + '<input class="field-input" data-detail-blocker="' + key + '" type="' + (key === 'followUpAt' ? 'datetime-local' : 'text') + '" value="' + esc(item.blocker?.[key] || '') + '" ' + (key !== 'followUpAt' ? 'required maxlength="1000"' : '') + '></label>').join("") + '</div>';
  else if (choices) markup = '<select class="field-input" data-detail-input aria-label="' + esc(detailLabels[field]) + '" ' + (multiple ? 'multiple size="6"' : '') + '>' + choices.map((entry) => '<option value="' + esc(entry.value) + '" ' + ((multiple ? (field === "relatedRecords" ? (item.relatedRecords || []).map((link) => link.type + "::" + link.targetId) : item[field as "assetIds" | "dependsOnIds"] || []).includes(entry.value) : raw === entry.value) ? 'selected' : '') + '>' + esc(entry.label) + '</option>').join("") + '</select>';
  else if (field === "description" || field === "acceptance" || field.startsWith("comment:")) markup = '<textarea class="field-input field-textarea" data-detail-input rows="' + (field === 'description' ? 5 : 3) + '" aria-label="' + esc(detailLabels[field] || 'Not') + '">' + esc(raw) + '</textarea>';
  else markup = '<input class="field-input" data-detail-input type="' + (field === "estimate" ? "number" : field === "startDate" || field === "targetDate" ? "date" : field === "actualStartDate" || field === "completedAt" ? "datetime-local" : "text") + '" value="' + esc(raw && (field === "actualStartDate" || field === "completedAt") ? new Date(Date.parse(raw) - new Date(raw).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : raw) + '" ' + (field === "title" ? 'required maxlength="120"' : field === "estimate" ? 'min="0" step="0.5"' : 'maxlength="500"') + ' aria-label="' + esc(detailLabels[field]) + '">';
  if (field === "description" || field.startsWith("comment:")) markup = structuredEditorToolbar("detail-inline-text") + markup.replace('data-detail-input', 'id="detail-inline-text" data-detail-input');
  host.innerHTML = '<div class="detail-inline-editor">' + markup + '<div class="detail-inline-actions"><button type="button" class="inline-icon-action inline-icon-confirm" data-detail-commit aria-label="Kaydet" title="Kaydet">✓</button><button type="button" class="inline-icon-action inline-icon-dismiss" data-detail-cancel aria-label="İptal" title="İptal">×</button></div><small class="detail-inline-error" role="alert"></small></div>';
  host.querySelector<HTMLElement>("input:not([type=hidden]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])")?.focus();
}
function cancelDetailEdit(): void {
  if (!detailEdit) return;
  closeActionTooltip();
  const { itemId, field, host } = detailEdit; detailEdit = null; host.classList.remove("is-editing");
  const item = itemById(itemId); if (item) refreshItemDetail(item);
  modalRoot.querySelector<HTMLElement>('[data-detail-slot="' + CSS.escape(field) + '"] [data-detail-edit]')?.focus({ preventScroll: true });
  detailFeedback("");
}
function restoreDetailSnapshot(item: WorkItem, snapshot: WorkItem): void {
  for (const key of Object.keys(item)) delete (item as unknown as Record<string, unknown>)[key];
  Object.assign(item, snapshot);
}
function commitDetailEdit(): boolean {
  const edit = detailEdit; if (!edit) return true;
  const item = itemById(edit.itemId); if (!item) return false;
  const input = edit.host.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-detail-input]");
  const before = structuredClone(item);
  const restoreFocus = edit.host.contains(document.activeElement);
  const fail = (message: string) => { const error = edit.host.querySelector(".detail-inline-error"); if (error) error.textContent = message; detailFeedback(message, true); return false; };
  if (input && !input.checkValidity()) return fail(input.validationMessage || "Alanı kontrol et.");
  const raw = input?.value.trim() || "";
  if (edit.field === "assignments") {
    const result = readAssignmentRows("detail-assignment-list"); if (result.invalid) return fail("Üyeyi listeden seç; eksik atamayı düzelt veya kaldır.");
    item.assignments = result.assignments; syncLegacyAssignmentFields(item);
  } else if (edit.field === "blocker") {
    const get = (key: string) => edit.host.querySelector<HTMLInputElement>('[data-detail-blocker="' + key + '"]')?.value.trim() || "";
    if (!get("reason") || !get("nextStep") || !get("expectedAction") || !get("owner")) return fail("Blokaj nedeni, beklenen karar/iş, sonraki adım ve sahip gerekli.");
    const blocker = { reason: get("reason"), nextStep: get("nextStep"), expectedAction: get("expectedAction"), owner: get("owner"), followUpAt: get("followUpAt"), remindedAt: item.blocker?.followUpAt === get("followUpAt") ? item.blocker?.remindedAt : undefined };
    applyWorkStatus(item, edit.pendingStatus || item.status, blocker);
  } else if (edit.field === "status") {
    if (raw === "Bloke" && (!item.blocker?.reason || !item.blocker?.nextStep || !item.blocker?.owner || !item.blocker?.expectedAction)) { detailEdit = null; edit.host.classList.remove("is-editing"); refreshItemDetail(item); beginDetailEdit("blocker", "Bloke"); return true; }
    applyWorkStatus(item, raw as WorkStatus, item.blocker);
  } else if (edit.field.startsWith("comment:")) {
    if (!raw) return fail("Not boş olamaz.");
    const entry = item.activity?.find((entry) => entry.id === edit.field.slice(8)); if (entry) entry.message = raw;
  } else {
    let value: unknown = raw;
    if (edit.field === "title" && !raw) return fail("Başlık boş olamaz.");
    if (edit.field === "acceptance") value = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (edit.field === "labels") value = [...new Set(raw.split(/[,;]/).map((line) => line.trim()).filter(Boolean))];
    if (edit.field === "assetIds" || edit.field === "dependsOnIds") value = [...(input as HTMLSelectElement).selectedOptions].map((option) => option.value);
    if (edit.field === "dependsOnIds" && dependencyWouldCycle(item.id, value as string[])) return fail("Bu seçim bağımlılık döngüsü oluşturuyor.");
    if (edit.field === "relatedRecords") value = [...(input as HTMLSelectElement).selectedOptions].map((option) => {
      const [type, targetId] = option.value.split("::") as [WorkRecordLink["type"], string];
      return item.relatedRecords?.find((link) => link.type === type && link.targetId === targetId) || { id: nextId("LINK"), type, targetId };
    });
    if (edit.field === "estimate") { value = raw ? Number(raw) : undefined; if (value !== undefined && (!Number.isFinite(value) || Number(value) < 0)) return fail("Tahmin sıfır veya pozitif olmalı."); }
    if (edit.field === "actualStartDate" || edit.field === "completedAt") value = raw ? new Date(raw).toISOString() : undefined;
    (item as unknown as Record<string, unknown>)[edit.field] = value;
    if (item.startDate && item.targetDate && item.targetDate < item.startDate) { restoreDetailSnapshot(item, before); return fail("Hedef tarih başlangıç tarihinden önce olamaz."); }
    if (edit.field === "project") {
      item.projectId = state.projects.find((project) => project.name === raw)?.id;
      if (item.releaseId && state.releases.find((release) => release.id === item.releaseId)?.project !== raw) item.releaseId = undefined;
      if (item.roadmapNodeId && state.roadmap.find((node) => node.id === item.roadmapNodeId)?.project !== raw) item.roadmapNodeId = undefined;
    }
  }
  if (JSON.stringify(before) !== JSON.stringify(item)) {
    if (edit.field !== "status" && edit.field !== "blocker") logWorkChange(item, detailLabels[edit.field] || "İlerleme notu", before[edit.field as keyof WorkItem], item[edit.field as keyof WorkItem]);
    item.updated = "Az önce";
    if (!save()) { restoreDetailSnapshot(item, before); return fail("Kaydedilemedi. Alanı açık bıraktık; yeniden deneyebilirsin."); }
    refreshItemBackground();
  }
  closeActionTooltip();
  detailEdit = null; edit.host.classList.remove("is-editing"); refreshItemDetail(item); detailFeedback("Kaydedildi");
  if (restoreFocus) modalRoot.querySelector<HTMLElement>('[data-detail-slot="' + CSS.escape(edit.field) + '"] [data-detail-edit]')?.focus({ preventScroll: true });
  return true;
}
function revealDetailControl(element: HTMLElement): void {
  const section = element.closest<HTMLElement>("[data-detail-tab-section]");
  if (section?.hidden) modalRoot.querySelector<HTMLButtonElement>('[data-detail-tab="' + section.dataset.detailTabSection + '"]')?.click();
  for (let parent = element.parentElement; parent; parent = parent.parentElement) if (parent instanceof HTMLDetailsElement) parent.open = true;
}
function groupDetailProperties(dialog: HTMLElement): void {
  const aside = dialog.querySelector<HTMLElement>(".detail-aside"); if (!aside) return;
  const property = (field: string) => aside.querySelector<HTMLElement>('[data-detail-slot="' + field + '"]')?.closest<HTMLElement>(".detail-property");
  const tasks = [...aside.querySelectorAll<HTMLElement>(":scope > .detail-property")].find((node) => node.querySelector(":scope > span")?.textContent === "Bağlı kişisel görev");
  const groups: { key: string; label: string; nodes: (HTMLElement | null | undefined)[] }[] = [
    { key: "properties", label: "Özellikler", nodes: [aside.querySelector<HTMLSelectElement>("#detail-status")?.closest("label"), aside.querySelector<HTMLSelectElement>("#detail-priority")?.closest("label"), property("area"), property("labels"), property("blocker")] },
    { key: "team", label: "Takım ve sorumlular", nodes: [property("assignments"), tasks] },
    { key: "planning", label: "Planlama ve ürün", nodes: ["startDate", "targetDate", "targetPeriod", "estimate", "releaseId", "sprintId", "roadmapNodeId", "productStage", "actualStartDate", "completedAt"].map(property) }
  ];
  const sections = groups.map((group) => {
    const details = document.createElement("details"); details.className = "detail-property-group"; details.dataset.detailGroup = group.key;
    details.innerHTML = '<summary><span>' + group.label + '</span><small data-detail-group-summary="' + group.key + '"></small>' + icon("chevronDown") + '</summary><div class="detail-group-content"></div>';
    const content = details.querySelector(".detail-group-content")!;
    group.nodes.forEach((node) => { if (node) content.append(node); });
    return details;
  });
  aside.replaceChildren(...sections); aside.dataset.detailTabSection = "overview";
  dialog.querySelector(".detail-main")?.append(aside);
}
function detailTool(button: HTMLButtonElement, label: string, name: string, danger = false): void {
  button.className = "detail-tool icon-action" + (danger ? " is-destructive" : "");
  button.setAttribute("aria-label", label); button.dataset.tooltip = label; button.removeAttribute("title");
  button.innerHTML = icon(name);
}
function compactDetailFooter(dialog: HTMLElement, item: WorkItem): void {
  const footer = dialog.querySelector<HTMLElement>(".detail-footer"); if (!footer) return;
  const actions = document.createElement("div"); actions.className = "detail-footer-actions";
  for (const [action, label, name] of [["archive-item", item.archived ? "Arşivden çıkar" : "Arşivle", item.archived ? "restore" : "archive"], ["merge-item", "Benzer işle birleştir", "merge"], ["delete-item", "İşi sil", "delete"]]) {
    const button = footer.querySelector<HTMLButtonElement>('[data-action="' + action + '"]');
    if (button) { detailTool(button, label, name, action === "delete-item"); actions.append(button); }
  }
  const nav = document.createElement("div"); nav.className = "detail-footer-nav";
  footer.querySelectorAll<HTMLButtonElement>(".button-row button").forEach((button, index) => { detailTool(button, index === 0 ? "Önceki iş" : "Sonraki iş", index === 0 ? "chevronLeft" : "chevronRight"); nav.append(button); });
  const status = footer.querySelector<HTMLElement>(".detail-save-status")!;
  footer.replaceChildren(status, actions); if (nav.children.length) footer.append(nav);
}

function installDetailInline(item: WorkItem): void {
  const dialog = modalRoot.querySelector<HTMLElement>(".detail-modal"); if (!dialog) return;
  dialog.querySelectorAll('[data-action="edit-item"]').forEach((button) => button.remove());
  const title = dialog.querySelector(".detail-title-wrap h2"); if (title) title.innerHTML = detailField(item, "title");
  const project = dialog.querySelector(".detail-identity > span:last-child"); if (project) project.innerHTML = detailField(item, "project");
  const type = dialog.querySelector(".type-label"); if (type) type.innerHTML = detailField(item, "type");
  for (const field of ["status", "priority"] as const) {
    const badge = dialog.querySelector<HTMLElement>(field === "status" ? ".detail-badges .status-pill" : ".detail-badges .priority");
    if (!badge) continue;
    badge.dataset.detailBadge = field; badge.tabIndex = 0; badge.setAttribute("role", "button"); badge.setAttribute("aria-label", detailLabels[field] + " alanını değiştir");
    badge.addEventListener("click", () => { const control = document.getElementById("detail-" + field); if (control) { revealDetailControl(control); control.focus(); } });
    badge.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); const control = document.getElementById("detail-" + field); if (control) { revealDetailControl(control); control.focus(); } } });
  }
  const context = dialog.querySelector(".detail-main > .detail-section"); if (context) context.innerHTML = '<h3>İşin bağlamı</h3>' + detailField(item, "description");
  let acceptance = dialog.querySelector(".criteria-list")?.closest(".detail-section");
  if (!acceptance) { context?.insertAdjacentHTML("afterend", '<section class="detail-section" data-detail-tab-section="overview"><h3>Kabul kriterleri</h3>' + detailField(item, "acceptance") + '</section>'); }
  else acceptance.innerHTML = '<h3>Kabul kriterleri</h3>' + detailField(item, "acceptance");
  const assignments = dialog.querySelector(".detail-assignment-people"); if (assignments) assignments.innerHTML = detailField(item, "assignments");
  const aside = dialog.querySelector(".detail-aside");
  aside?.querySelectorAll<HTMLElement>(":scope > .detail-property:not(.detail-assignment)").forEach((node) => { const label = node.querySelector(":scope > span")?.textContent; if (label === "Ürün alanı") node.innerHTML = '<span>Ürün alanı</span>' + detailField(item, "area"); else if (label === "Etiketler") node.innerHTML = '<span>Etiketler</span>' + detailField(item, "labels"); else if (["Planlama", "Ürün hedefi", "Blokaj nedeni", "Blokajda geçen süre", "Gecikme"].includes(label || "")) node.remove(); });
  aside?.insertAdjacentHTML("beforeend", '<section class="detail-inline-planning">' + ["startDate", "targetDate", "targetPeriod", "estimate", "releaseId", "sprintId", "roadmapNodeId", "productStage", "actualStartDate", "completedAt", "blocker"].map((field) => detailProperty(item, field)).join("") + '</section>');
  const assets = dialog.querySelector(".linked-assets-section"); if (assets) assets.innerHTML = '<h3>Ürün bileşenleri</h3>' + detailField(item, "assetIds");
  const dependencies = dialog.querySelector(".dependency-section"); if (dependencies) dependencies.innerHTML = '<h3>Beklenen işler</h3>' + detailField(item, "dependsOnIds");
  dialog.querySelector(".detail-footer")?.insertAdjacentHTML("beforeend", '<span class="detail-save-status" role="status" aria-live="polite"></span>');
  const diagramEmpty = dialog.querySelector(".work-diagrams-section > .asset-muted"); if (diagramEmpty) diagramEmpty.textContent = "Henüz diyagram yok.";
  groupDetailProperties(dialog);
  refreshItemDetail(item);
}
modalRoot.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null; if (!target) return;
  if (target.closest("[data-detail-cancel]")) { event.preventDefault(); event.stopImmediatePropagation(); cancelDetailEdit(); return; }
  if (target.closest("[data-detail-commit]")) { event.preventDefault(); event.stopImmediatePropagation(); commitDetailEdit(); return; }
  if (detailEdit && !detailEdit.host.contains(target) && !commitDetailEdit()) { event.preventDefault(); event.stopImmediatePropagation(); return; }
  const edit = target.closest<HTMLElement>("[data-detail-edit]"); if (edit) { event.preventDefault(); event.stopImmediatePropagation(); beginDetailEdit(edit.dataset.detailEdit!); }
}, true);
document.addEventListener("pointerdown", (event) => {
  if (!detailEdit || !(event.target instanceof Element)) return;
  if (event.target.closest("[data-detail-cancel], [data-detail-commit]")) { event.preventDefault(); return; }
  if (!detailEdit.host.contains(event.target)) {
    const next = event.target.closest<HTMLElement>("[data-detail-edit]")?.dataset.detailEdit;
    const saved = commitDetailEdit();
    if (!saved || next) { event.preventDefault(); event.stopImmediatePropagation(); }
    if (saved && next) beginDetailEdit(next);
  }
}, true);
modalRoot.addEventListener("focusout", (event) => {
  const edit = detailEdit; if (!edit || !(event.target instanceof Element) || !edit.host.contains(event.target)) return;
  if (event.relatedTarget instanceof window.Node && edit.host.contains(event.relatedTarget)) return;
  queueMicrotask(() => { if (detailEdit === edit && !edit.host.contains(document.activeElement)) commitDetailEdit(); });
});
modalRoot.addEventListener("keydown", (event) => {
  if (!detailEdit) return;
  if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); cancelDetailEdit(); }
  else if (event.key === "Enter" && (!(event.target instanceof HTMLTextAreaElement) || event.ctrlKey || event.metaKey) && !(event.target instanceof HTMLSelectElement && event.target.multiple)) { event.preventDefault(); event.stopImmediatePropagation(); commitDetailEdit(); }
}, true);
modalRoot.addEventListener("change", (event) => {
  const target = event.target; if (!(target instanceof HTMLSelectElement)) return;
  if (target.matches("[data-detail-input]") && !target.multiple) { commitDetailEdit(); return; }
  if (target.id !== "detail-status" && target.id !== "detail-priority") return;
  const item = activeItemId ? itemById(activeItemId) : undefined; if (!item) return;
  const key = target.id === "detail-status" ? "status" : "priority";
  if (key === "status" && target.value === "Bloke" && (!item.blocker?.reason || !item.blocker?.nextStep || !item.blocker?.expectedAction || !item.blocker?.owner)) { beginDetailEdit("blocker", "Bloke"); return; }
  const before = structuredClone(item);
  if (key === "status") applyWorkStatus(item, target.value as WorkStatus, item.blocker);
  else { const previous = item.priority; item.priority = target.value as Priority; logWorkChange(item, "Öncelik", previous, item.priority); }
  item.updated = "Az önce";
  if (!save()) { restoreDetailSnapshot(item, before); refreshItemDetail(item); detailFeedback("Kaydedilemedi; yeniden deneyebilirsin.", true); return; }
  refreshItemBackground();
  refreshItemDetail(item); detailFeedback("Kaydedildi");
});

function mountItemDetail(markup: string, current: HTMLElement | null, item: WorkItem): void {
  const template = document.createElement("template"); template.innerHTML = markup;
  const next = template.content.querySelector<HTMLElement>(".detail-modal")!;
  if (current?.isConnected) {
    current.classList.add("detail-record-view");
    current.closest(".modal-backdrop")?.classList.add("detail-record-backdrop");
    current.classList.remove("detail-record-next", "detail-record-previous");
    current.dataset.openItem = item.id;
    current.replaceChildren(...next.childNodes);
    current.setAttribute("aria-label", item.id + " · " + item.title);
  } else {
    next.setAttribute("aria-label", item.id + " · " + item.title);
    modalRoot.replaceChildren(template.content);
  }
}

function rememberDeskPin(dialog: HTMLElement | null): void {
  const pin = deskPins.get(dialog?.dataset.openItem || "");
  if (!pin || !dialog) return;
  pin.tab = dialog.querySelector<HTMLElement>("[data-detail-tab].selected")?.dataset.detailTab || "overview";
  pin.scroll = dialog.querySelector(".detail-body")?.scrollTop || 0;
  pin.stackOpen = !!dialog.querySelector(".record-stack[open]");
}

function renderDeskPins(): void {
  const dialog = modalRoot.querySelector<HTMLElement>(".detail-modal");
  const currentId = dialog?.dataset.openItem || "";
  const items = [...deskPins.keys()].flatMap((id) => {
    const item = itemById(id);
    if (!item || item.archived) { deskPins.delete(id); return []; }
    return [item];
  });
  const tabs = (selected: string) => items.map((item) =>
    '<button type="button" data-desk-open="' + esc(item.id) + '" title="' + esc(item.title) + '" aria-label="' + esc(item.id + " · " + item.title) + '"' +
    (item.id === selected ? ' aria-current="true"' : '') + '>' + esc(item.id) + '</button>').join("");
  const markup = tabs("");
  if (deskEdge.innerHTML !== markup) deskEdge.innerHTML = markup;
  deskEdge.hidden = !items.length;
  const inline = dialog?.querySelector<HTMLElement>(".desk-detail-tabs");
  if (inline) {
    const markup = tabs(currentId);
    if (inline.innerHTML !== markup) inline.innerHTML = markup;
    inline.hidden = !items.length;
  }
  const pin = dialog?.querySelector<HTMLButtonElement>("[data-desk-pin]");
  if (pin) {
    const pressed = deskPins.has(currentId);
    detailTool(pin, pressed ? "İğneyi kaldır" : "Masanın kenarına iğnele", "pin");
    pin.setAttribute("aria-pressed", String(pressed));
  }
}

function openItem(id: string, direction?: "previous" | "next"): void {
  const current = modalRoot.querySelector<HTMLElement>(".detail-modal");
  if (current?.dataset.openItem === id) { const item = itemById(id); if (item) refreshItemDetail(item); return; }
  const item = itemById(id); if (!item) return;
  if (detailEdit && !commitDetailEdit()) return;
  rememberDeskPin(current);
  const pin = deskPins.get(id);
  const selectedTab = pin?.tab || current?.querySelector<HTMLElement>("[data-detail-tab].selected")?.dataset.detailTab || "overview";
  const openGroups = [...(current?.querySelectorAll<HTMLDetailsElement>("[data-detail-group][open]") || [])].map((group) => group.dataset.detailGroup!);
  closeActionTooltip();
  detailEdit = null;
  queueMicrotask(() => {
    const dialog = modalRoot.querySelector<HTMLElement>(".detail-modal"); if (!dialog || dialog.dataset.openItem !== id) return;
    dialog.querySelector('[data-detail-group="planning"] .detail-group-content')?.insertAdjacentHTML("beforeend", '<button class="detail-integration-button" data-action="linked-jira" data-id="' + esc(id) + '">Jira bağlantısı</button>');
    const ids = [...root.querySelectorAll<HTMLElement>(".backlog-work-row[data-open-item], .board-card[data-open-item]")].map((row) => row.dataset.openItem!);
    const index = ids.indexOf(id);
    if (index >= 0) dialog.querySelector(".detail-footer")?.insertAdjacentHTML("beforeend", '<div class="button-row"><button class="button button-quiet button-small" ' + (index === 0 ? 'disabled' : 'data-open-item="' + esc(ids[index - 1]) + '"') + ' data-detail-nav="previous">Önceki</button><button class="button button-quiet button-small" ' + (index >= ids.length - 1 ? 'disabled' : 'data-open-item="' + esc(ids[index + 1]) + '"') + ' data-detail-nav="next">Sonraki</button></div>');
    const item = itemById(id); if (item) compactDetailFooter(dialog, item);
    if (current) (dialog.querySelector<HTMLButtonElement>('[data-detail-nav="' + direction + '"]:not(:disabled)') || dialog.querySelector<HTMLButtonElement>("[data-detail-nav]:not(:disabled)") || dialog.querySelector<HTMLButtonElement>(".modal-close"))?.focus({ preventScroll: true });
  });
  disposeWorkDiagramGraph();
  globalLastRecord = { kind: "item", id };
  recentItemIds = [id, ...recentItemIds.filter((entry) => entry !== id)].slice(0, 8);
  localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(recentItemIds));
  if (activeItemId !== id) progressAttachments = [];
  activeItemId = id;
  attachmentTarget = { kind: "item", id };
  const acceptance = item.acceptance?.length ? '<div class="detail-section"><h3>Kabul kriterleri</h3><ul class="criteria-list">' + item.acceptance.map((criterion) => '<li><span class="criterion-check">✓</span>' + esc(criterion) + '</li>').join("") + '</ul></div>' : "";
  mountItemDetail('<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal detail-modal" data-open-item="' + esc(item.id) + '" role="dialog" aria-modal="true"><header class="detail-header"><div class="detail-identity"><span class="table-type ' + (item.type === "Bug" ? "bug-type" : item.type === "Task" ? "task-type" : "story-type") + '">' + itemIcon(item.type) + '</span><span>' + esc(item.id) + '</span><span class="crumb-separator">/</span><span>' + esc(item.project) + '</span></div><button class="modal-close" data-close-modal>×</button></header><div class="detail-title-wrap"><div class="detail-badges"><span class="type-label">' + esc(item.type) + '</span><span class="status-pill ' + statusClass(item.status) + '"><i></i>' + esc(item.status) + '</span><span class="priority ' + priorityClass(item.priority) + '"><b>' + priorityMark(item.priority) + '</b>' + esc(item.priority) + '</span></div><h2>' + esc(item.title) + '</h2><div class="detail-byline"><span class="profile-avatar small-avatar">DA</span><span>Deniz Arslan</span><span>·</span><span>Güncellendi ' + esc(item.updated) + '</span></div></div><div class="detail-body"><div class="detail-main"><div class="detail-section"><h3>İşin bağlamı</h3>' + structuredTextMarkup(item.description || "Açıklama eklenmedi.") + '</div>' + acceptance + '<div class="detail-section"><div class="section-title-row"><h3>Bağlı kayıtlar</h3><button class="text-button" data-add-to-item="' + esc(item.id) + '">+ Dosya ekle</button></div><div class="detail-files">' + itemRecordStackMarkup(item) + '</div><input id="detail-file-fallback" type="file" multiple hidden></div></div><aside class="detail-aside"><label class="field-label">Durum<select id="detail-status" class="field-input">' + ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"].map((status) => '<option ' + (status === item.status ? "selected" : "") + '>' + status + '</option>').join("") + '</select></label><label class="field-label">Öncelik<select id="detail-priority" class="field-input">' + ["Kritik", "Yüksek", "Orta", "Düşük"].map((priority) => '<option ' + (priority === item.priority ? "selected" : "") + '>' + priority + '</option>').join("") + '</select></label><div class="detail-property"><span>Ürün alanı</span><strong>' + esc(item.area) + '</strong></div><div class="detail-property"><span>Etiketler</span><div class="tag-row">' + (item.labels || []).map((label) => '<span class="tag">' + esc(label) + '</span>').join("") + '</div></div><div class="detail-property"><span>Bağlı kişisel görev</span><strong>' + state.tasks.filter((task) => task.linked === item.id).length + ' görev</strong><button class="text-button" data-action="quick-related-task" data-id="' + esc(item.id) + '">+ Takip görevi oluştur</button></div></aside></div><footer class="detail-footer"><span class="privacy-note-inline">⌑ Dosyalar bu cihazda saklanır</span></footer></section></div>', current, item);
  modalRoot.querySelector(".modal-backdrop")?.classList.add("detail-backdrop-sidepanel");
  modalRoot.querySelector(".detail-modal")?.classList.add("detail-modal-sidepanel");
  const byline = modalRoot.querySelector(".detail-byline");
  if (byline) byline.innerHTML = '<span class="profile-avatar small-avatar">PO</span><span>' + esc(state.profile.userName || "PO") + '</span><span>·</span><span>Son güncelleme ' + esc(itemLastActivityLabel(item)) + '</span>';
  const linkedAssets = (item.assetIds || []).map((assetId) => state.assets.find((asset) => asset.id === assetId)).filter((asset): asset is ProductAsset => Boolean(asset));
  modalRoot.querySelector(".detail-main .detail-section")?.insertAdjacentHTML("afterend", '<section class="detail-section linked-assets-section"><div class="section-title-row"><h3>Ürün bileşenleri <span class="count-chip">' + linkedAssets.length + '</span></h3><button class="text-button" data-action="edit-item" data-id="' + esc(item.id) + '">Düzenle</button></div>' + (linkedAssets.length ? '<div class="asset-chip-list">' + linkedAssets.map((asset) => '<button class="linked-badge" data-open-asset="' + esc(asset.id) + '">' + esc(asset.code + " · " + asset.name) + (!asset.active ? " · Pasif" : "") + '</button>').join("") + '</div>' : '<p class="asset-muted">Bu iş henüz bir ürün bileşenine bağlanmadı.</p>') + '</section>');
  modalRoot.querySelector(".detail-main")?.insertAdjacentHTML("beforeend", activityMarkup(item));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", diagramSectionMarkup("item", item.id));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", dependencyMarkup(item));
  modalRoot.querySelector(".work-activity")?.insertAdjacentHTML("beforebegin", itemRelationshipsMarkup(item));
  modalRoot.querySelector(".detail-footer")?.insertAdjacentHTML("beforeend", '<button type="button" class="button button-quiet" data-action="archive-item" data-id="' + esc(item.id) + '">' + (item.archived ? "Arşivden çıkar" : "Arşivle") + '</button>');
  if (!item.archived && !item.mergedIntoId) modalRoot.querySelector(".detail-footer")?.insertAdjacentHTML("beforeend", '<button type="button" class="button button-secondary" data-action="merge-item" data-id="' + esc(item.id) + '">Benzer işle birleştir</button>');
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
  const planningDetails = [item.startDate ? "Başlangıç: " + item.startDate : "", item.targetDate ? "Hedef: " + item.targetDate : "", item.targetPeriod ? "Dönem: " + item.targetPeriod : "", item.estimate !== undefined ? "Tahmini efor: " + item.estimate + " " + (state.estimateUnit || "saat") : "", item.actualStartDate ? "Gerçek başlangıç: " + new Date(item.actualStartDate).toLocaleDateString("tr-TR") : "", item.completedAt ? "Tamamlandı: " + new Date(item.completedAt).toLocaleDateString("tr-TR") : "", itemRelease ? "Release: " + itemRelease.name + " · " + itemRelease.status : ""].filter(Boolean);
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
  installDetailInline(item);
  poTools.enhanceDetail(item);
  addRecordCopyAction("item", item.id);
  if (!item.archived) modalRoot.querySelector(".detail-header .modal-close")?.insertAdjacentHTML("beforebegin", '<button type="button" data-desk-pin></button>');
  modalRoot.querySelector(".detail-tabs")?.insertAdjacentHTML("afterend", '<nav class="desk-detail-tabs" aria-label="İğnelenen işler" hidden></nav>');
  renderDeskPins();
  if (current) {
    for (const group of modalRoot.querySelectorAll<HTMLDetailsElement>("[data-detail-group]")) group.open = openGroups.includes(group.dataset.detailGroup!);
    current.classList.add(direction === "previous" ? "detail-record-previous" : "detail-record-next");
  }
  if (current || pin) modalRoot.querySelector<HTMLButtonElement>('[data-detail-tab="' + CSS.escape(selectedTab) + '"]')?.click();
  if (pin) {
    const stack = modalRoot.querySelector<HTMLDetailsElement>(".record-stack");
    if (stack) stack.open = pin.stackOpen;
    const body = modalRoot.querySelector<HTMLElement>(".detail-body");
    if (body) body.scrollTop = pin.scroll;
  }
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
  refreshItemBackground();
  refreshItemDetail(item);
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
  const previousActivity = structuredClone(item.activity || []);
  item.activity ||= [];
  item.activity.unshift({ id: nextId("ACT"), kind: "comment", message: text, actor: state.profile.userName || "PO", occurredAt: new Date().toISOString(), visibility, attachments: [...progressAttachments] });
  if (!save()) { item.activity = previousActivity; detailFeedback("Not kaydedilemedi; metin ve ekler korundu.", true); return; }
  progressAttachments = [];
  const composer = document.getElementById("progress-note-text") as HTMLTextAreaElement | null; if (composer) composer.value = "";
  const files = document.getElementById("progress-note-files"); if (files) files.innerHTML = "";
  refreshItemBackground();
  refreshItemDetail(item);
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
        const imported = await desktop.importSelectedEmailAttachments(pendingEmailAttachmentToken, selectedIds);
        draftAttachments.push(...imported);
        if (pendingDroppedEmailSource) pendingDroppedEmailSource.attachmentStoredNames = imported.flatMap((file) => file.storedName ? [file.storedName] : []);
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
      labels: [...new Set(field("new-labels").value.split(",").map((label) => label.trim()).filter(Boolean))],
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
    toast("Görev çalışma alanına eklendi.");

  } else {
    state.notes.unshift({ id: nextId("NOTE"), createdAt: new Date().toISOString(), title, body: description, linked: field("new-linked-note").value, updated: "Az önce", attachments: [...draftAttachments], sourceEmail: pendingDroppedEmailSource || undefined });
    toast("Not çalışma alanına eklendi.");

  }
  if (pendingDroppedEmailSource) {
    localStorage.setItem("rota-email-create-kind", kind);
    if (kind === "Backlog işi") localStorage.setItem("rota-email-create-project", field("new-project").value);
  }
  state.formDrafts = [];
  save();
  pendingDroppedEmailSource = null;
  pendingEmailAttachmentToken = "";
  pendingEmailAttachmentChoices = [];
  closeModal(true);
  if (kind === "Backlog işi") setView("backlog"); else render();
}

function toggleTask(id: string): void {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  task.done = !task.done;
  save();
  if (workspaceShelf) { refreshItemBackground(); syncWorkspaceToolbar(); } else render();
}

function openTask(id: string): void {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  attachmentTarget = { kind: "task", id };
  const related = task.linked && itemById(task.linked);
  const files = task.attachments || [];
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal work-record-modal task-detail-modal note-modal" data-context-task-id="' + esc(task.id) + '" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">GÖREV · ' + esc(task.due) + '</div><h2>' + esc(task.title) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><p class="note-detail-body">' + esc(task.description || "Bu görev için ek bir açıklama yok.") + '</p>' + (related ? '<button class="linked-badge" data-open-item="' + esc(related.id) + '">' + esc(related.id) + ' · ilişkili iş</button>' : '<span class="independent-label">Bağımsız görev</span>') + '<div class="detail-section"><div class="section-title-row"><h3>Dosya ekleri <span class="count-chip">' + files.length + '</span></h3><button class="text-button" data-add-to-task="' + esc(task.id) + '">+ Dosya ekle</button></div>' + (files.length ? attachmentListMarkup(files, "task:" + task.id) : '<div class="attachment-empty"><span>▤</span><span>Bu görevde dosya eki yok.</span></div>') + '<input id="task-file-fallback" type="file" multiple hidden></div></section></div>';
  if (task.remindAt) modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="detail-property reminder-property"><span>Hatırlatma</span><strong>' + esc(new Date(task.remindAt).toLocaleString("tr-TR")) + '</strong></div>');
  if (task.sourceEmail) { const source = task.sourceEmail; const sourceFile = files.find((file) => file.name === source.name); modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="email-source-card"><span class="email-source-icon">✉</span><span><strong>E-postadan oluşturuldu</strong><small>' + esc(source.name + (source.from ? " · " + source.from : "") + (source.date ? " · " + source.date : "")) + '</small></span>' + (sourceFile?.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(sourceFile.storedName) + '">Özgün e-postayı aç</button>' : '') + '</div>'); }
  modalRoot.querySelector(".modal-header")?.insertAdjacentHTML("beforeend", '<span class="detail-actions"><button class="button button-secondary" data-action="edit-task" data-id="' + esc(task.id) + '">Düzenle</button><button class="button button-danger" data-action="delete-task" data-id="' + esc(task.id) + '">Sil</button></span>');
  addRecordCopyAction("task", task.id);
}

function showNote(id: string): void {
  const note = state.notes.find((entry) => entry.id === id);
  if (!note) return;
  rememberDeskPin(modalRoot.querySelector(".detail-modal"));
  attachmentTarget = { kind: "note", id };
  const related = note.linked && itemById(note.linked);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal note-modal" data-context-note-id="' + esc(note.id) + '" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">NOT · ' + esc(note.updated) + '</div><h2>' + esc(note.title) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="note-detail-body structured-content">' + structuredTextMarkup(note.body) + '</div>' + (related ? '<button class="linked-badge" data-open-item="' + esc(related.id) + '">' + esc(related.id) + ' · ilişkili iş</button>' : '<span class="independent-label">Bağımsız not</span>') + '<div class="detail-section"><div class="section-title-row"><h3>Dosya ekleri <span class="count-chip">' + (note.attachments?.length || 0) + '</span></h3><button class="text-button" data-add-to-note="' + esc(note.id) + '">+ Dosya ekle</button></div>' + (note.attachments?.length ? attachmentListMarkup(note.attachments, "note:" + note.id) : '<div class="attachment-empty"><span>▤</span><span>Bu notta dosya eki yok.</span></div>') + '<input id="note-file-fallback" type="file" multiple hidden></div></section></div>';
  if (note.sourceEmail) { const source = note.sourceEmail; const sourceFile = (note.attachments || []).find((file) => file.name === source.name); modalRoot.querySelector(".note-detail-body")?.insertAdjacentHTML("afterend", '<div class="email-source-card"><span class="email-source-icon">✉</span><span><strong>E-postadan oluşturuldu</strong><small>' + esc(source.name + (source.from ? " · " + source.from : "") + (source.date ? " · " + source.date : "")) + '</small></span>' + (sourceFile?.storedName ? '<button type="button" class="text-button" data-open-source-email="' + esc(sourceFile.storedName) + '">Özgün e-postayı aç</button>' : '') + '</div>'); }
  modalRoot.querySelector(".detail-section")?.insertAdjacentHTML("beforebegin", diagramSectionMarkup("note", note.id));
  modalRoot.querySelector(".modal-header")?.insertAdjacentHTML("beforeend", '<span class="detail-actions"><button class="button button-secondary" data-action="edit-note" data-id="' + esc(note.id) + '">Düzenle</button><button class="button button-danger" data-action="delete-note" data-id="' + esc(note.id) + '">Sil</button></span>');
  addRecordCopyAction("note", note.id);
}

function openRecordEditor(kind: "item" | "task" | "note", id: string): void {
  queueMicrotask(() => { const textarea = modalRoot.querySelector<HTMLTextAreaElement>('textarea[name="description"], textarea[name="body"]'); if (textarea) { textarea.id ||= "record-body-editor"; textarea.insertAdjacentHTML("afterend", structuredEditorToolbar(textarea.id)); } });
  const linkedOptions = (selected: string) => '<option value="">Bağımsız</option>' + state.items.map((item) => '<option value="' + esc(item.id) + '" ' + (item.id === selected ? "selected" : "") + '>' + esc(item.id + " · " + item.title) + '</option>').join("");
  if (kind === "item") { openItem(id); return; }
  if (kind === "task") {
    const task = state.tasks.find((entry) => entry.id === id); if (!task) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">GÖREV</div><h2>Görevi düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="edit-task-form" class="settings-form"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="120" required value="' + esc(task.title) + '"></label><label class="field-label">Son tarih<input class="field-input" name="due" maxlength="40" value="' + esc(task.due) + '"></label><label class="field-label">Açıklama<textarea class="field-input field-textarea" name="description" rows="4">' + esc(task.description || "") + '</textarea></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked">' + linkedOptions(task.linked) + '</select></label><input type="hidden" name="id" value="' + esc(id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-task="' + esc(id) + '">Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
    modalRoot.querySelector('input[name="due"]')?.closest(".field-label")?.insertAdjacentHTML("afterend", '<label class="field-label">Hatırlat<input class="field-input" type="datetime-local" name="remindAt" value="' + esc(task.remindAt || "") + '"></label>');
  } else {
    const note = state.notes.find((entry) => entry.id === id); if (!note) return;
    modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">NOT</div><h2>Notu düzenle</h2></div><button class="modal-close" data-close-modal>×</button></header><form id="edit-note-form" class="settings-form"><label class="field-label">Başlık<input class="field-input" name="title" maxlength="120" required value="' + esc(note.title) + '"></label><label class="field-label">Not' + structuredEditorToolbar("edit-note-body") + '<textarea id="edit-note-body" class="field-input field-textarea" name="body" rows="7" required>' + esc(note.body) + '</textarea></label><label class="field-label">İlişkili backlog işi<select class="field-input" name="linked">' + linkedOptions(note.linked) + '</select></label><input type="hidden" name="id" value="' + esc(id) + '"><footer class="modal-footer"><button type="button" class="button button-quiet" data-open-note="' + esc(id) + '">Vazgeç</button><button type="submit" class="button button-primary">Kaydet</button></footer></form></section></div>';
  }
}

async function deleteBacklogItems(ids: string[], confirmation?: string): Promise<void> {
  const idsToDelete = new Set(ids);
  const itemsToDelete = state.items.filter((item) => idsToDelete.has(item.id));
  if (!itemsToDelete.length || (confirmation && !(await appConfirm(confirmation)))) return;
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
  if (!save()) {
    state = undoSnapshot;
    return;
  }
  removedIds.forEach((removedId) => selectedBacklogItemIds.delete(removedId));
  if (inlineBacklogEdit && removedIds.has(inlineBacklogEdit.itemId)) inlineBacklogEdit = null;
  closeModal(); render();
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
  if (!(await appConfirm('"' + record.title + '" ' + label + ' silinsin mi? Silme işlemini 6 saniye içinde geri alabilirsin.'))) return;
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

function openMergeWorkItem(sourceId: string): void {
  const source = itemById(sourceId); if (!source) return;
  const candidates = state.items.filter((item) => item.id !== sourceId && !item.archived && !item.mergedIntoId);
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><div class="panel-kicker">YİNELENEN KAYITLAR</div><h2>İşi güvenle birleştir</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><p class="settings-intro"><strong>' + esc(source.id + " · " + source.title) + '</strong> kaydındaki not, ek ve ilişkiler ana kayda taşınır; bu kayıt yönlendirme bilgisiyle arşivlenir.</p><label class="field-label">Ana kayıt<select id="merge-target" class="field-input"><option value="">Kayıt seç</option>' + candidates.map((item) => '<option value="' + esc(item.id) + '">' + esc(item.id + " · " + item.title) + '</option>').join("") + '</select></label><div id="merge-diff" class="merge-diff"><p>Ana kaydı seçtiğinde alan farkları burada görünür.</p></div><footer class="modal-footer"><button class="button button-quiet" data-open-item="' + esc(source.id) + '">Vazgeç</button><button class="button button-primary" data-action="confirm-merge-item" data-source-id="' + esc(source.id) + '">Birleştir</button></footer></div></section></div>';
}

function confirmMergeWorkItem(sourceId: string): void {
  const source = itemById(sourceId); const target = itemById(modalRoot.querySelector<HTMLSelectElement>("#merge-target")?.value || "");
  if (!source || !target || source === target) { toast("Ana kaydı seç."); return; }
  const proposed = new Map(state.items.filter((item) => item !== source).map((item) => [item.id, [...new Set([...(item.dependsOnIds || []), ...(item === target ? source.dependsOnIds || [] : [])].map((id) => id === source.id ? target.id : id).filter((id) => id !== item.id))]]));
  const cyclic = (id: string, path = new Set<string>()): boolean => { if (path.has(id)) return true; return (proposed.get(id) || []).some((next) => cyclic(next, new Set([...path, id]))); };
  if ([...proposed.keys()].some((id) => cyclic(id))) { toast("Birleştirme bağımlılık döngüsü oluşturuyor. Önce bağımlılıkları düzenle."); return; }
  const workspaceBefore = structuredClone(state);
  target.activity = [...(target.activity || []), ...(source.activity || []).map((entry) => ({ ...entry, id: nextId("ACT"), message: "[" + source.id + "] " + entry.message }))];
  for (const decision of state.decisions || []) decision.workItemIds = [...new Set(decision.workItemIds.map((id) => id === source.id ? target.id : id))];
  for (const risk of state.risks || []) risk.workItemIds = [...new Set((risk.workItemIds || []).map((id) => id === source.id ? target.id : id))];
  for (const question of state.openQuestions || []) if (question.linkedItemId === source.id) question.linkedItemId = target.id;
  for (const item of state.items) item.relatedRecords = (item.relatedRecords || []).map((link) => link.type === "item" && link.targetId === source.id ? { ...link, targetId: target.id } : link).filter((link) => link.type !== "item" || link.targetId !== item.id);
  target.attachments = [...(target.attachments || []), ...(source.attachments || []).filter((file) => !(target.attachments || []).some((existing) => existing.storedName && existing.storedName === file.storedName))];
  target.sourceEmails = [...(target.sourceEmails || []), ...(source.sourceEmails || []), ...(source.sourceEmail ? [source.sourceEmail] : [])];
  target.labels = [...new Set([...(target.labels || []), ...(source.labels || [])])];
  target.assetIds = [...new Set([...(target.assetIds || []), ...(source.assetIds || [])])];
  target.dependsOnIds = [...new Set([...(target.dependsOnIds || []), ...(source.dependsOnIds || []).filter((id) => id !== target.id)])].filter((id) => id !== target.id);
  target.relatedRecords = [...(target.relatedRecords || []), ...(source.relatedRecords || []).filter((link) => link.targetId !== target.id && !(target.relatedRecords || []).some((existing) => existing.type === link.type && existing.targetId === link.targetId))];
  for (const item of state.items) item.dependsOnIds = (item.dependsOnIds || []).map((id) => id === source.id ? target.id : id).filter((id, index, list) => id !== item.id && list.indexOf(id) === index);
  state.tasks.forEach((task) => { if (task.linked === source.id) task.linked = target.id; }); state.notes.forEach((note) => { if (note.linked === source.id) note.linked = target.id; });
  addWorkActivity(target, "change", source.id + " kaydı bu ana kayda birleştirildi."); source.mergedIntoId = target.id; source.archived = true; addWorkActivity(source, "change", target.id + " kaydına birleştirildi.");
  save(); closeModal(); render(); toastUndoDeletion(source.id + " kaydı " + target.id + " kaydına birleştirildi.", workspaceBefore); openItem(target.id);
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
  if (kind === "item") { openItem(id); return; }
  if (kind === "task") {
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
  globalLastRecord = { kind: "asset", id };
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

async function toggleAssetActive(id: string): Promise<void> {
  const asset = state.assets.find((entry) => entry.id === id);
  if (!asset) return;
  const nextActive = !asset.active;
  if (!nextActive && !(await appConfirm('"' + asset.name + '" bileşenini pasife almak istiyor musun? Bağlı backlog işleri korunur.'))) return;
  asset.active = nextActive;
  asset.updated = "Az önce";
  save(); render(); openAsset(id); toast(nextActive ? "Bileşen yeniden etkinleştirildi." : "Bileşen pasife alındı.");
}

function highlightBacklogMove(target: HTMLElement): void {
  target.classList.add("backlog-move-highlight");
  window.setTimeout(() => target.classList.remove("backlog-move-highlight"), 850);
}

function renderBoardMove(item: WorkItem): void {
  const board = root.querySelector<HTMLElement>("#board-wrap");
  const scrollLeft = board?.scrollLeft || 0;
  const columnOffsets = new Map([...root.querySelectorAll<HTMLElement>("[data-board-status]")].map((column) =>
    [column.dataset.boardStatus, column.querySelector(".board-cards")?.scrollTop || 0]
  ));
  render();
  const nextBoard = root.querySelector<HTMLElement>("#board-wrap");
  if (!nextBoard) return;
  nextBoard.scrollLeft = scrollLeft;
  nextBoard.querySelectorAll<HTMLElement>("[data-board-status]").forEach((column) => {
    const cards = column.querySelector(".board-cards");
    if (cards) cards.scrollTop = columnOffsets.get(column.dataset.boardStatus) || 0;
  });
  const card = nextBoard.querySelector<HTMLElement>('[data-board-card="' + CSS.escape(item.id) + '"]');
  const cards = card?.closest(".board-cards");
  if (!card || !cards) return;
  const bounds = card.getBoundingClientRect();
  const viewport = cards.getBoundingClientRect();
  const boardBounds = nextBoard.getBoundingClientRect();
  if (bounds.bottom <= viewport.top || bounds.top >= viewport.bottom ||
      bounds.right <= boardBounds.left || bounds.left >= boardBounds.right) return;
  card.focus({ preventScroll: true });
  highlightBacklogMove(card);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.animate([{ translate: "0 10px" }, { translate: "0 0" }], { duration: 180, easing: "ease-out" });
  }
}

function moveBoardItem(itemId: string, nextStatus: WorkStatus): void {
  const item = itemById(itemId);
  if (!item || item.status === nextStatus) return;
  if (nextStatus === "Bloke") { openStatusUpdateModal(item.id, nextStatus, true); return; }
  if (!applyWorkStatus(item, nextStatus, item.blocker)) return;
  item.updated = "Az önce";
  if (!save()) return;
  renderBoardMove(item);
  toast("İş " + nextStatus + " durumuna taşındı.");
}

document.addEventListener("dragstart", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order][draggable=true]") : null;
  if (column?.dataset.columnOrder && event.dataTransfer) { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("application/x-rota-column", column.dataset.columnOrder); column.classList.add("is-dragging"); return; }

});

document.addEventListener("dragend", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order]") : null;
  column?.classList.remove("is-dragging");
  document.querySelectorAll(".backlog-column-option.drop-target").forEach((row) => row.classList.remove("drop-target"));

});

document.addEventListener("dragover", (event) => {
  const column = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-column-order]") : null;
  if (column && event.dataTransfer?.types.includes("application/x-rota-column")) { event.preventDefault(); event.dataTransfer.dropEffect = "move"; document.querySelectorAll(".backlog-column-option.drop-target").forEach((row) => row.classList.remove("drop-target")); column.classList.add("drop-target"); return; }

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

// The native WebView2 file target owns OS drops. Backlog moves stay inside the renderer.
type BacklogPointerDrag = {
  pointerId: number;
  x: number;
  y: number;
  source: HTMLElement;
  itemId: string;
  board: boolean;
  started: boolean;
  target: HTMLElement | null;
  trash: HTMLElement | null;
};
let backlogPointerDrag: BacklogPointerDrag | null = null;
let suppressBacklogDragClick = false;

document.addEventListener("pointerdown", (event) => {
  suppressBacklogDragClick = false;
  if (!event.isPrimary || event.button !== 0 || !(event.target instanceof Element)) return;
  const boardCard = event.target.closest<HTMLElement>(".board-card[data-board-card]");
  const source = boardCard || event.target.closest<HTMLElement>(".backlog-work-row[data-open-item]");
  if (!source || !root.contains(source)) return;
  if (!boardCard && (inlineBacklogEdit || inlineInsertAfterId !== null || event.target.closest("input, select, textarea, button:not(.backlog-title-open)"))) return;
  const itemId = source.dataset.openItem;
  if (!itemId) return;
  backlogPointerDrag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, source, itemId, board: !!boardCard, started: false, target: null, trash: null };
});

function backlogDropTarget(drag: BacklogPointerDrag, event: PointerEvent): HTMLElement | null {
  const selector = drag.board ? ".board-column[data-board-status]" : ".backlog-reorder-row[data-open-item]";
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>(selector);
  return target && root.contains(target) && target !== drag.source ? target : null;
}

document.addEventListener("pointermove", (event) => {
  const drag = backlogPointerDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;
  if (!drag.started) {
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
    drag.started = true;
    root.setPointerCapture(event.pointerId);
    closeBacklogPreview();
    drag.source.classList.add(drag.board ? "is-dragging" : "backlog-row-dragging");
    root.classList.add("backlog-pointer-dragging");
    const trash = document.createElement("div");
    trash.className = "backlog-drag-trash";
    trash.innerHTML = icon("delete") + "<span>Silmek için bırak</span>";
    drag.source.closest(".backlog-page")?.append(trash);
    drag.trash = trash;
  }
  event.preventDefault();
  const overTrash = drag.trash?.contains(document.elementFromPoint(event.clientX, event.clientY));
  drag.trash?.classList.toggle("is-drop-target", !!overTrash);
  const target = overTrash ? null : backlogDropTarget(drag, event);
  const highlight = drag.board ? "drop-target" : "backlog-row-drop-target";
  drag.target?.classList.remove(highlight, "backlog-row-drop-after");
  drag.target = target;
  target?.classList.add(highlight);
  if (target && !drag.board) {
    const bounds = target.getBoundingClientRect();
    target.classList.toggle("backlog-row-drop-after", event.clientY > bounds.top + bounds.height / 2);
  }
});

function finishBacklogPointerDrag(event: PointerEvent): void {
  const drag = backlogPointerDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;
  backlogPointerDrag = null;
  if (!drag.started) return;
  suppressBacklogDragClick = true;
  root.classList.remove("backlog-pointer-dragging");
  drag.source.classList.remove("is-dragging", "backlog-row-dragging");
  drag.target?.classList.remove("drop-target", "backlog-row-drop-target", "backlog-row-drop-after");
  const droppedInTrash = event.type === "pointerup" && drag.trash?.contains(document.elementFromPoint(event.clientX, event.clientY));
  drag.trash?.remove();
  if (event.type !== "pointerup") return;
  if (droppedInTrash) {
    void deleteBacklogItems([drag.itemId]);
    return;
  }
  const target = backlogDropTarget(drag, event);
  if (!target) return;
  if (drag.board) {
    const status = target.dataset.boardStatus as WorkStatus;
    moveBoardItem(drag.itemId, status);
  } else {
    reorderBacklogRow(drag.itemId, target, event.clientY);
  }
}
document.addEventListener("pointerup", finishBacklogPointerDrag);
document.addEventListener("pointercancel", finishBacklogPointerDrag);
root.addEventListener("lostpointercapture", finishBacklogPointerDrag);
document.addEventListener("click", (event) => {
  if (!suppressBacklogDragClick || event.detail === 0) return;
  suppressBacklogDragClick = false;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

function reorderBacklogRow(sourceId: string, target: HTMLElement, clientY: number): void {
  if (backlogSort !== "manual" || backlogMode !== "list") return;
  const visibleIds = filteredBacklogItems.map((item) => item.id);
  const sourceIndex = visibleIds.indexOf(sourceId);
  const targetIndex = visibleIds.indexOf(target.dataset.openItem || "");
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;
  const bounds = target.getBoundingClientRect();
  const afterTarget = clientY > bounds.top + bounds.height / 2;
  const insertIndex = targetIndex + Number(afterTarget) - Number(sourceIndex < targetIndex);
  if (sourceIndex === insertIndex) return;
  visibleIds.splice(sourceIndex, 1);
  visibleIds.splice(insertIndex, 0, sourceId);
  const visible = new Set(visibleIds);
  const itemsById = new Map(state.items.map((item) => [item.id, item]));
  let index = 0;
  state.items = state.items.map((item) => visible.has(item.id) ? itemsById.get(visibleIds[index++])! : item);
  if (!save()) return;
  const selector = ".backlog-work-row[data-open-item]";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const previousTops = new Map<string | undefined, number>();
  if (!reducedMotion) {
    root.querySelectorAll<HTMLElement>(selector).forEach((row) => {
      previousTops.set(row.dataset.openItem, row.getBoundingClientRect().top);
    });
  }
  backlogWindowSignature = visibleIds.join("|");
  updateBacklogRows();
  root.querySelectorAll<HTMLElement>(selector).forEach((row) => {
    if (row.dataset.openItem === sourceId) highlightBacklogMove(row);
    const previousTop = previousTops.get(row.dataset.openItem);
    if (previousTop === undefined) return;
    const offset = (previousTop - row.getBoundingClientRect().top) / appZoom;
    if (Math.abs(offset) < 1) return;
    row.animate([{ translate: "0 " + offset + "px" }, { translate: "0 0" }], { duration: 180, easing: "ease-out" });
  });
  toast("Backlog sırası güncellendi.");
}

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
window.addEventListener("resize", () => {
  syncSidebarWidth();
  fitBacklogColumnsToWindow();
});
window.addEventListener("scroll", closeContextMenu, true);

document.addEventListener("click", async (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const formatButton = target.closest<HTMLButtonElement>("[data-format][data-target]");
  if (formatButton) {
    const textarea = document.getElementById(formatButton.dataset.target || "") as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart; const end = textarea.selectionEnd; const selected = textarea.value.slice(start, end);
    const formats: Record<string, [string, string]> = { heading: ["## ", ""], bold: ["**", "**"], list: ["- ", ""], check: ["- [ ] ", ""], link: ["[", "](https://)"] };
    const [before, after] = formats[formatButton.dataset.format || ""] || ["", ""];
    textarea.setRangeText(before + (selected || (formatButton.dataset.format === "link" ? "bağlantı" : "metin")) + after, start, end, "select");
    textarea.focus(); scheduleFormDraftSave(); return;
  }
  const globalResult = target.closest<HTMLElement>("[data-global-result]");
  if (globalResult) { chooseGlobalSearch(Number(globalResult.dataset.globalResult)); return; }
  if (!target.closest(".global-search, #global-search-results")) closeGlobalSearch();
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
      if (note) { state.tasks.unshift({ id: nextId("TASK"), title: note.title, due: "Tarih belirlenmedi", done: false, linked: note.linked, description: note.body, sourceNoteId: note.id }); save(); refreshItemBackground(); syncWorkspaceToolbar(); toast("Not içeriği ve bağlantısı korunarak görev oluşturuldu."); }
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
  const deskTab = target.closest<HTMLElement>("[data-desk-open]");
  if (deskTab?.dataset.deskOpen) { openItem(deskTab.dataset.deskOpen); return; }
  if (target.closest("[data-desk-pin]")) {
    const dialog = modalRoot.querySelector<HTMLElement>(".detail-modal");
    const id = dialog?.dataset.openItem;
    const item = id && itemById(id);
    if (!id || !item || item.archived) return;
    if (deskPins.has(id)) deskPins.delete(id);
    else {
      deskPins.set(id, { tab: "overview", scroll: 0, stackOpen: false });
      rememberDeskPin(dialog);
    }
    renderDeskPins();
    return;
  }
  const sprintRow = target.closest<HTMLElement>("[data-sprint-item]");
  if (sprintRow) { /* Keep sprint-scope rows available to native drag and drop. */ }
  const detailTab = target.closest<HTMLButtonElement>("[data-detail-tab]");
  if (detailTab) {
    closeActionTooltip();
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
    else if (key === "overdue") backlogOverdueOnly = false;
    else if (key === "statusAge") backlogStatusAgeMinDays = 0;
    else if (key === "statuses") backlogStatuses = [];
    else if (key === "priorities") backlogPriorities = [];
    else if (key === "dateFrom") backlogDateFrom = "";
    else if (key === "dateTo") backlogDateTo = "";
    else if (key === "noEstimate") backlogNoEstimate = false;
    else if (key === "overdueCondition") backlogOverdueCondition = false;
    else if (key === "ready") readyWorkPool = false;
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
      if (!member || !assignmentTeamForMember(member, teamId)) { showInlineFeedback(itemId, "assignment", "Atamak için geçerli bir takım üyesi seçin.", true); root.querySelector<HTMLInputElement>('[data-inline-member="' + CSS.escape(itemId) + '"]')?.focus(); return; }
      commitInlineAssignment(itemId, { add: { teamId, member, ...(scope ? { scope } : {}) } });
    } else if (inlineAction.dataset.inlineAction === "remove-assignment") {
      const index = Number(inlineAction.dataset.assignmentIndex);
      if (Number.isInteger(index)) commitInlineAssignment(itemId, { removeIndex: index });
    }
    return;
  }
  if (target.closest("[data-inline-zone]")) return;
  if (target.closest("[data-close-backlog-preview]")) {
    const id = CSS.escape(backlogPreviewItemId || "");
    closeBacklogPreview();
    root.querySelector<HTMLElement>('.backlog-preview-button[data-preview-item="' + id + '"]')?.focus({ preventScroll: true });
    return;
  }
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
    if (!applyWorkStatus(item, status, status === "Bloke" ? { reason, nextStep, expectedAction, owner, followUpAt } : item.blocker, updateNote)) return;
    item.updated = "Az önce";
    const returnToBoard = statusUpdateReturnToBoard;
    statusUpdateReturnToBoard = false;
    if (!save()) return;
    if (returnToBoard) {
      closeModal();
      if (backlogMode === "board") renderBoardMove(item);
      else render();
    } else {
      render();
      openItem(item.id);
    }
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
  const overviewFilter = target.closest<HTMLElement>("[data-overview-filter]");
  if (overviewFilter?.dataset.overviewFilter) {
    if (overviewFilter.dataset.overviewFilter === "tasks") { openWorkspaceShelf("tasks"); return; }
    activeProjectId = null;
    backlogMode = "list";
    query = "";
    backlogStatus = overviewFilter.dataset.overviewFilter === "ready" ? "Hazır" : overviewFilter.dataset.overviewFilter === "blocked" ? "Bloke" : "";
    backlogType = ""; labelFilter = ""; teamFilterId = overviewFilter.dataset.overviewFilter === "unassigned" ? "__unassigned" : ""; assigneeFilter = ""; backlogSprintId = "";
    backlogOverdueOnly = overviewFilter.dataset.overviewFilter === "overdue"; backlogStatusAgeMinDays = 0;
    backlogIncludeCompleted = false; readyWorkPool = false; activeBacklogViewId = "";
    setView("backlog");
    return;
  }
  const view = target.closest<HTMLElement>("[data-view]");
  if (view?.dataset.view) { setView(view.dataset.view); return; }
  const action = target.closest<HTMLElement>("[data-action]");
  if (action) {
    if (action.dataset.action === "copy-record" && action.dataset.kind && action.dataset.id) {
      await copyRecord(action.dataset.kind as ShareRecordKind, action.dataset.id);
    }
    else if (action.dataset.action === "start-inline-insert") {
      inlineInsertAfterId = action.dataset.afterId || "";
      updateBacklogRows();
      root.querySelector<HTMLInputElement>('[data-inline-insert-title="' + CSS.escape(inlineInsertAfterId) + '"]')?.focus();
    }
    else if (action.dataset.action === "cancel-inline-insert") { inlineInsertAfterId = null; updateBacklogRows(); }
    else if (action.dataset.action === "save-inline-insert") {
      const afterId = action.dataset.afterId || "";
      const input = root.querySelector<HTMLInputElement>('[data-inline-insert-title="' + CSS.escape(afterId) + '"]');
      const title = input?.value.trim() || "";
      if (!title) { input?.setCustomValidity("Task başlığı boş olamaz."); input?.reportValidity(); input?.focus(); return; }
      const project = state.projects.find((entry) => entry.id === activeProjectId && !entry.archived) || state.projects.find((entry) => !entry.archived);
      let id = nextId("PAY"); while (state.items.some((item) => item.id === id)) id = nextId("PAY");
      const item: WorkItem = { id, type: "Task", title, status: "Yeni", priority: "Orta", project: project?.name || "Genel", area: "Genel", updated: "Az önce", description: "", acceptance: [], attachments: [], labels: [], dependsOnIds: [], activity: [] };
      addWorkActivity(item, "created", "Task listede oluşturuldu.");
      const previousIndex = state.items.findIndex((entry) => entry.id === afterId);
      state.items.splice(previousIndex < 0 ? state.items.length : previousIndex + 1, 0, item);
      if (!save()) { state.items = state.items.filter((entry) => entry !== item); input?.focus(); return; }
      const scrollTop = root.querySelector<HTMLElement>(".backlog-table-wrap")?.scrollTop || 0;
      inlineInsertAfterId = null; backlogSort = "manual"; renderBacklog();
      const wrap = root.querySelector<HTMLElement>(".backlog-table-wrap"); if (wrap) wrap.scrollTop = scrollTop;
      const created = root.querySelector<HTMLElement>('[data-open-item="' + CSS.escape(id) + '"] .backlog-title-open');
      created?.focus();
      toast(created ? "Task araya eklendi." : "Task eklendi; mevcut filtreler nedeniyle listede görünmüyor.");
    }
    else if (action.dataset.action === "merge-item" && action.dataset.id) openMergeWorkItem(action.dataset.id);
    else if (action.dataset.action === "confirm-merge-item" && action.dataset.sourceId) confirmMergeWorkItem(action.dataset.sourceId);
    else if (action.dataset.action === "linked-jira" && action.dataset.id) await openLinkedJira(action.dataset.id);
    else if (action.dataset.action === "fetch-linked-jira" && action.dataset.id) await openLinkedJira(action.dataset.id, modalRoot.querySelector<HTMLInputElement>("#linked-jira-key")?.value.trim().toUpperCase());
    else if (action.dataset.action === "apply-linked-jira") await applyLinkedJira();
    else if (action.dataset.action === "work-template-editor") openWorkTemplateEditor();
    else if (action.dataset.action === "board-load-more" && action.dataset.status) { boardDrawLimits[action.dataset.status] = (boardDrawLimits[action.dataset.status] || 40) + 40; updateBacklogRows(); }
    else if (action.dataset.action === "attach-email-existing") await attachEmailToExisting();
    else if (action.dataset.action === "open-diagnostics") await openDiagnostics();
    else if (action.dataset.action === "export-diagnostics") { const report = modalRoot.querySelector<HTMLTextAreaElement>("#diagnostic-report")?.value; if (report) await desktop.exportUnreadableWorkspace(report); }
    else if (action.dataset.action === "apply-bulk-preview") applyBulkImpactPreview();
    else if (action.dataset.action === "restore-form-draft" && action.dataset.id) restoreFormDraft(action.dataset.id);
    else if (action.dataset.action === "discard-form-draft" && action.dataset.id) { state.formDrafts = (state.formDrafts || []).filter((entry) => entry.id !== action.dataset.id); save(); action.closest(".draft-recovery")?.remove(); toast("Taslak silindi."); }
    else if (action.dataset.action === "open-workspace-settings") openWorkspaceSettings(action.dataset.settingsPanel);
    else if (action.dataset.action === "jira-refresh") await refreshJiraCatalog();
    else if (action.dataset.action === "jira-save-token") await saveJiraPat();
    else if (action.dataset.action === "jira-replace-token") { jiraHasSavedToken = false; jiraError = "Yeni tokenı kaydettiğinde mevcut PAT değiştirilir."; renderJira(); }
    else if (action.dataset.action === "jira-remove-token") await removeJiraPat();
    else if (action.dataset.action === "jira-open-token-page") {
      try { if (!state.profile.jiraBaseUrl) throw new Error("Önce Jira Base URL tanımla."); await desktop.jiraOpenTokenPage(state.profile.jiraBaseUrl); }
      catch (error) { toast(error instanceof Error ? error.message : "Jira token sayfası açılamadı."); }
    }
    else if (action.dataset.action === "jira-fetch-issues") await fetchJiraIssues();
    else if (action.dataset.action === "jira-load-more") await fetchJiraIssues(false);
    else if (action.dataset.action === "jira-create-issue") await createJiraIssueFromRota();
    else if (action.dataset.action === "jira-open-issue" && action.dataset.issueKey && state.profile.jiraBaseUrl) {
      try { await desktop.jiraOpenIssue(state.profile.jiraBaseUrl, action.dataset.issueKey); } catch (error) { toast(error instanceof Error ? error.message : "Jira işi açılamadı."); }
    }
    else if (action.dataset.action === "new") { if (state.formDrafts?.length) openNewModal(action.dataset.type); else openQuickCreateModal(action.dataset.type); }
    else if (action.dataset.action === "expand-create-form") { persistCurrentFormDraft(); openNewModal(); if (state.formDrafts?.[0]) restoreFormDraft(state.formDrafts[0].id); }
    else if (action.dataset.action === "add-related-record" && action.dataset.id) openRelatedRecordPicker(action.dataset.id);
    else if (action.dataset.action === "remove-related-record" && action.dataset.id && action.dataset.linkId) { const item = itemById(action.dataset.id); if (item) { item.relatedRecords = (item.relatedRecords || []).filter((link) => link.id !== action.dataset.linkId); save(); refreshItemDetail(item); } }
    else if (action.dataset.action === "open-related-record" && action.dataset.type && action.dataset.targetId) {
      const type = action.dataset.type as WorkRecordLink["type"]; const id = action.dataset.targetId;
      if (type === "item") openItem(id); else if (type === "asset") openAsset(id); else if (type === "release") openReleaseEditor(id); else if (type === "note") showNote(id); else if (type === "question") { setView("questions"); const question = state.openQuestions?.find((entry) => entry.id === id); if (question) openQuestionForm(id); } else { const risk = state.risks?.find((entry) => entry.id === id); if (risk) { const score = (risk.impact || 0) * (risk.probability || 0); const level = risk.manualLevel || (score >= 16 ? "Kritik" : score >= 10 ? "Yüksek" : score >= 5 ? "Orta" : "Düşük"); modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal"><header class="modal-header"><div><div class="panel-kicker">RİSK · ' + esc(level) + '</div><h2>' + esc(risk.title) + '</h2></div><button class="modal-close" data-close-modal>×</button></header><div class="settings-form"><div class="risk-score"><strong>' + score + '</strong><span>Etki ' + (risk.impact || "—") + ' × Olasılık ' + (risk.probability || "—") + '</span></div><p>' + esc(risk.description || "Açıklama yok") + '</p><h3>Azaltma aksiyonu</h3><p>' + esc(risk.mitigation || "Aksiyon tanımlanmadı") + '</p><div class="detail-property"><span>Gözden geçirme</span><strong>' + esc(risk.reviewAt || "Tarih yok") + '</strong></div>' + (risk.manualLevelReason ? '<p class="settings-note">Elle verilen seviye gerekçesi: ' + esc(risk.manualLevelReason) + '</p>' : '') + '</div></section></div>'; } }
    }
    else if (action.dataset.action === "create-risk-for-item" && action.dataset.id) openRiskEditor(undefined, action.dataset.id);
    else if (action.dataset.action === "edit-risk" && action.dataset.id) openRiskEditor(action.dataset.id);
    else if (action.dataset.action === "risk-center") openRiskCenter();
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
    else if (action.dataset.action === "delete-open-question" && action.dataset.id) { if ((await appConfirm("Bu soruyu silmek istiyor musun?"))) { state.openQuestions = (state.openQuestions || []).filter((entry) => entry.id !== action.dataset.id); save(); renderOpenQuestions(); } }
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
      const name = (await appPrompt("Bu kabul kriteri şablonuna bir ad ver"));
      if (!name?.trim()) return;
      const selectedType = modalRoot.querySelector<HTMLSelectElement>('#edit-item-form select[name="type"]')?.value || (document.getElementById("new-item-type") as HTMLSelectElement | null)?.value || "Story";
      state.acceptanceTemplates ||= [];
      const category: AcceptanceTemplate["category"] = (await appConfirm("Bu şablonu bankacılık değişikliği kontrol listesi olarak mı işaretleyelim?")) ? "Bankacılık değişikliği" : selectedType === "Bug" ? "Bug" : selectedType === "Story" ? "Story" : "Genel";
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
      if (closingSprint) { const sprintItems = state.items.filter((item) => item.sprintId === closingSprint.id); closingSprint.closingSnapshot ||= { done: sprintItems.filter((item) => item.status === "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), carryover: sprintItems.filter((item) => item.status !== "Tamamlandı").map(({ id, title, status }) => ({ id, title, status })), blocked: sprintItems.filter((item) => item.status === "Bloke").map(({ id, title, status }) => ({ id, title, status })) }; closingSprint.closedAt ||= new Date().toISOString(); }
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
    else if (action.dataset.action === "reset-zoom") {
      if (appZoom !== 1) { setAppZoom(1); toast("Yakınlaştırma %100'e döndü."); }
    }
    else if (action.dataset.action === "customize-sidebar") renderSidebarCustomizer();
    else if (action.dataset.action === "toggle-theme") toggleTheme();
    else if (action.dataset.action === "toggle-sidebar") {
      const collapsed = !document.querySelector(".sidebar")?.classList.contains("collapsed");
      if (document.body.classList.contains("narrow-window")) narrowSidebarOverride = collapsed;
      else {
        sidebarPreferredCollapsed = collapsed;
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
      }
      syncSidebarWidth();
      fitBacklogColumnsToWindow();
      trackNavIndicator(360);
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
    else if (action.dataset.action === "note-to-task" && action.dataset.id) {
      const note = state.notes.find((entry) => entry.id === action.dataset.id);
      if (!note) return;
      state.tasks.unshift({ id: nextId("TASK"), title: note.title, due: "Tarih belirlenmedi", done: false, linked: note.linked, description: note.body, sourceNoteId: note.id });
      save(); refreshItemBackground(); syncWorkspaceToolbar(); toast("Not içeriği ve bağlantısı korunarak görev oluşturuldu.");
    }
    else if (action.dataset.action === "manual-backlog-order") {
      backlogSort = "manual";
      renderBacklog();
      root.querySelector<HTMLButtonElement>('[data-action="manual-backlog-order"]')?.focus();
    }
    else if (action.dataset.action === "clear-backlog-selection") {
      selectedBacklogItemIds.clear();
      updateBacklogRows();
      root.querySelector<HTMLInputElement>("[data-select-visible-backlog]")?.focus({ preventScroll: true });
    }
    else if (action.dataset.action === "clear-backlog-filters") {
      readyWorkPool = false;
      query = ""; backlogStatus = ""; backlogType = ""; labelFilter = ""; teamFilterId = ""; assigneeFilter = ""; backlogSprintId = ""; backlogIncludeCompleted = false; backlogOverdueOnly = false; backlogStatusAgeMinDays = 0; backlogStatuses = []; backlogPriorities = []; backlogDateFrom = ""; backlogDateTo = ""; backlogNoEstimate = false; backlogOverdueCondition = false; backlogConditionMode = "and";
      renderBacklog();
      root.querySelector<HTMLInputElement>("#backlog-search")?.focus();
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
      if (view && (await appConfirm('"' + view.name + '" görünümünü silmek istiyor musun?'))) {
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
      updateBacklogRows();
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
    else if (action.dataset.action === "start-meeting-stage") startMeetingStage();
    else if (action.dataset.action === "end-meeting-stage") endMeetingStage();
    else if (action.dataset.action === "meeting-stage-close" && meetingStage) {
      meetingStage.showClosing = true;
      renderMeetingStage();
      root.querySelector<HTMLElement>("#meeting-closing-title")?.focus();
    }
    else if (action.dataset.action === "meeting-stage-resume" && meetingStage) {
      meetingStage.showClosing = false;
      renderMeetingStage(true);
    }
    else if (action.dataset.action === "copy-meeting-closing") await copyMeetingClosing();
    else if (action.dataset.action === "meeting-stage-prev") stepMeetingStage(-1);
    else if (action.dataset.action === "meeting-stage-next") stepMeetingStage(1);
    else if (action.dataset.action === "meeting-stage-item" && meetingStage && action.dataset.id) {
      meetingStage.currentId = action.dataset.id;
      renderMeetingStage(true);
    }
    else if (action.dataset.action === "create-sprint") openCreateSprintModal();
    else if (action.dataset.action === "bulk-labels") {
      const selected = getSelectedBacklogItems();
      if (!selected.length) return;
      const before = structuredClone(selected);
      const input = (await appPrompt("Etiket işlemlerini virgülle ayır. Yeni etiket için ad, kaldırmak için -etiket yaz. Örnek: EFT,-Eski", ""));
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
      const items = getSelectedBacklogItems().filter((item) => item.sprintId);
      if (!items.length) { toast("Seçili işlerin sprint ataması yok."); return; }
      const before = structuredClone(items);
      items.forEach((item) => { item.sprintId = undefined; item.sprintOrder = undefined; addWorkActivity(item, "change", "Sprint kapsamından çıkarıldı."); });
      save(); renderBacklog(); toastUndo(items.length + " iş sprintten çıkarıldı.", before);
    }
    else if (action.dataset.action === "backup-export") await exportWorkspaceBackup();
    else if (action.dataset.action === "backup-auto-now") await createAutomaticBackup(true);
    else if (action.dataset.action === "backup-auto-folder-save") {
      try { const input = document.getElementById("automatic-backup-directory") as HTMLInputElement | null; const directory = await desktop.setAutomaticBackupDirectory(input?.value.trim() || ""); if (input) input.value = directory; toast("Yedek klasörü kaydedildi."); }
      catch (error) { toast(error instanceof Error ? error.message : "Yedek klasörü kaydedilemedi."); }
    }
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
    else if (action.dataset.action === "asset-presentation") {
      assetPresentation = action.dataset.mode === "diagram" ? "diagram" : "cards"; updateAssetGrid();
      root.querySelectorAll<HTMLElement>('[data-action="asset-presentation"]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === assetPresentation)));
    }
    else if (action.dataset.action === "clear-asset-filters") {
      assetQuery = ""; assetTypeFilter = ""; assetProjectFilter = ""; includeInactiveAssets = false;
      for (const id of ["asset-search", "asset-type-filter", "asset-project-filter"]) { const input = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null; if (input) input.value = ""; }
      const inactive = document.getElementById("asset-inactive-filter") as HTMLInputElement | null; if (inactive) inactive.checked = false;
      updateAssetGrid(); document.getElementById("asset-search")?.focus();
    }
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
    if (!team || !(await appConfirm('"' + team.name + '" takımını silmek istiyor musun? Bu takıma atanmış backlog işleri atamasız kalır.'))) return;
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
    if (!team || !(await appConfirm(member + " üyesini takımdan çıkarmak istiyor musun? Üzerindeki işler takımda sorumlusuz kalır."))) return;
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
  if (decisionProject?.dataset.decisionOpenProject) { await setProject(decisionProject.dataset.decisionOpenProject); closeModal(); return; }
  if (target.closest("[data-select-backlog-item], [data-select-visible-backlog]")) { event.stopPropagation(); return; }
  if (open?.dataset.openItem && !open.classList.contains("detail-modal")) {
    const backlogRow = target.closest<HTMLTableRowElement>("tr[data-open-item]");
    if (backlogRow && open === backlogRow && !target.closest(".backlog-title-open")) return;
    closeBacklogPreview();
    if (open.matches(".backlog-title-open, .backlog-preview-button, .board-card") && !modalRoot.querySelector(".detail-modal")) {
      modalReturnFocus = open;
      backlogDetailScroll = open.closest(".backlog-table-wrap")?.scrollTop ?? null;
    }
    openItem(open.dataset.openItem, open.dataset.detailNav === "previous" ? "previous" : open.dataset.detailNav === "next" ? "next" : undefined); return;
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
  if (close && (close === target || close.classList.contains("modal-close"))) { if (modalRoot.querySelector("#new-form, #quick-create-form")) { state.formDrafts = []; save(); } closeModal(); return; }
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
      if (ownerType === "item" && file) {
        const item = owner as WorkItem;
        if (file.storedName) {
          for (const entry of item.activity || []) {
            if (entry.attachments) entry.attachments = entry.attachments.filter((attachment) => attachment.storedName !== file.storedName);
          }
        }
        addWorkActivity(item, "attachment", "Dosya eki kaldırıldı: " + file.name);
      }
      save();
      if (ownerType === "item") { render(); const item = itemById(ownerId); if (item) refreshItemDetail(item); }
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
  if (trigger && !trigger.matches(".backlog-preview-button")) openBacklogPreview(trigger.dataset.previewItem || "", trigger);
  if (target?.closest("[data-preview-card]")) window.clearTimeout(backlogPreviewTimer);
});

document.addEventListener("focusout", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("[data-preview-item], [data-preview-card]") && !(event.relatedTarget instanceof Element && event.relatedTarget.closest("[data-preview-item], [data-preview-card]"))) scheduleBacklogPreviewClose();
});

document.addEventListener("keydown", (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target?.matches(".board-card[data-board-card]") && event.shiftKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    const statuses: WorkStatus[] = ["Yeni", "Analiz ediliyor", "Hazır", "Devam ediyor", "Bloke", "Tamamlandı"];
    const item = itemById(target.dataset.boardCard || "");
    const index = item ? statuses.indexOf(item.status) : -1;
    const next = statuses[index + (event.key === "ArrowRight" ? 1 : -1)];
    if (next) { event.preventDefault(); moveBoardItem(item!.id, next); }
    return;
  }
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
  if (!(target instanceof HTMLTextAreaElement) || !target.matches('#new-form textarea, .detail-inline-editor textarea')) return;
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
  const advancedFilter = event.target instanceof HTMLElement ? event.target.closest(".advanced-filter-group") : null;
  if (advancedFilter) {
    backlogConditionMode = (root.querySelector<HTMLSelectElement>("#advanced-condition-mode")?.value === "or" ? "or" : "and");
    backlogStatuses = [...(root.querySelector<HTMLSelectElement>("#advanced-statuses")?.selectedOptions || [])].map((option) => option.value as WorkStatus);
    backlogPriorities = [...(root.querySelector<HTMLSelectElement>("#advanced-priorities")?.selectedOptions || [])].map((option) => option.value as Priority);
    backlogDateFrom = root.querySelector<HTMLInputElement>("#advanced-date-from")?.value || "";
    backlogDateTo = root.querySelector<HTMLInputElement>("#advanced-date-to")?.value || "";
    backlogNoEstimate = Boolean(root.querySelector<HTMLInputElement>("#advanced-no-estimate")?.checked);
    backlogOverdueCondition = Boolean(root.querySelector<HTMLInputElement>("#advanced-overdue")?.checked);
    updateBacklogRows(); return;
  }
  if (event.target instanceof HTMLInputElement && event.target.id === "backlog-status-age-min") { backlogStatusAgeMinDays = Math.min(3650, Math.max(0, Number(event.target.value) || 0)); updateBacklogRows(); return; }
  if (event.target instanceof HTMLInputElement && event.target.id === "risk-overdue-only") { openRiskCenter(event.target.checked); return; }
  if (event.target instanceof HTMLInputElement && event.target.id === "import-header") { importHasHeader = event.target.checked; renderExcelImport(); return; }
  if (event.target instanceof HTMLSelectElement) {
    const select = event.target;
    if (event.target.id === "merge-target") {
      const sourceId = modalRoot.querySelector<HTMLElement>("[data-source-id]")?.dataset.sourceId || ""; const source = itemById(sourceId); const target = itemById(event.target.value); const host = modalRoot.querySelector<HTMLElement>("#merge-diff");
      if (source && target && host) { const rows = [["Başlık", source.title, target.title], ["Durum", source.status, target.status], ["Öncelik", source.priority, target.priority], ["Proje", source.project, target.project], ["Ek", String(source.attachments?.length || 0), String(target.attachments?.length || 0)]]; host.innerHTML = '<table><thead><tr><th>Alan</th><th>Birleşecek kayıt</th><th>Ana kayıt</th></tr></thead><tbody>' + rows.map(([label, left, right]) => '<tr class="' + (left === right ? "same" : "changed") + '"><th>' + esc(label) + '</th><td>' + esc(left) + '</td><td>' + esc(right) + '</td></tr>').join("") + '</tbody></table>'; }
      return;
    }
    if (select.id === "new-work-template") {
      const template = state.workTemplates?.find((entry) => entry.id === select.value);
      if (template) {
        (document.getElementById("new-item-type") as HTMLSelectElement).value = template.type;
        (document.getElementById("new-priority") as HTMLSelectElement).value = template.priority;
        (document.getElementById("new-description") as HTMLTextAreaElement).value = template.description;
        (document.getElementById("new-labels") as HTMLInputElement).value = template.labels.join(", ");
        (document.getElementById("new-acceptance") as HTMLTextAreaElement).value = template.acceptance.join("\n");
        updateNewForm(); scheduleFormDraftSave(); toast("İş şablonu uygulandı; tüm alanları değiştirebilirsin.");
      }
      return;
    }
    if (event.target.id === "decision-filter") { decisionFilter = event.target.value as typeof decisionFilter; renderDecisions(); return; }
    if (event.target.id === "jira-board-select") { jiraSelectedBoardId = event.target.value; void loadJiraBoardDetails(); return; }
    if (event.target.id === "jira-project-select") { jiraSelectedProjectKey = event.target.value; void loadJiraProjectIssueTypes(); return; }
    if (event.target.id === "jira-scope-select") { jiraIssueScope = event.target.value as typeof jiraIssueScope; clearJiraIssueResults(); renderJira(); return; }
    if (event.target.id === "jira-sprint-select") { jiraSelectedSprintId = event.target.value; clearJiraIssueResults(); renderJira(); return; }
    if (event.target.id === "jira-issue-type-select") { jiraSelectedIssueTypeId = event.target.value; return; }
    if (event.target.id === "jira-rota-item-select") { jiraSelectedRotaItemId = event.target.value; renderJira(); return; }
  }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-theme") { localStorage.setItem(THEME_KEY, event.target.value); document.body.classList.toggle("dark-theme", event.target.value === "dark" || (event.target.value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)); syncThemeToggle(); }
  if (event.target instanceof HTMLSelectElement && event.target.id === "workspace-app-zoom") { setAppZoom(Number(event.target.value)); }
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
    root.querySelector<HTMLInputElement>('[data-select-backlog-item="' + CSS.escape(id) + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (target.matches("[data-select-visible-backlog]")) {
    for (const item of filteredBacklogItems) {
      if (target.checked) selectedBacklogItemIds.add(item.id);
      else selectedBacklogItemIds.delete(item.id);
    }
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
    if (filter) { query = filter.query; backlogSearchScope = filter.searchScope; backlogStatus = filter.status; backlogType = filter.type; labelFilter = filter.label; teamFilterId = filter.teamId; assigneeFilter = filter.assignee; backlogSprintId = filter.sprintId || ""; backlogIncludeCompleted = filter.includeCompleted || false; backlogOverdueOnly = filter.overdueOnly || false; backlogStatusAgeMinDays = filter.statusAgeMinDays || 0; activeBacklogViewId = ""; renderBacklog(); }
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
  if (target.id === "merge-target") {
    const sourceId = modalRoot.querySelector<HTMLElement>('[data-action="confirm-merge-item"]')?.dataset.sourceId;
    const source = itemById(sourceId || ""); const destination = itemById(target.value); const host = document.getElementById("merge-diff");
    if (source && destination && host) host.innerHTML = '<div class="bulk-preview-scroll"><table><thead><tr><th>Alan</th><th>Arşivlenecek iş</th><th>Korunacak ana iş</th></tr></thead><tbody>' + (["title", "description", "status", "priority", "project"] as const).map((key) => '<tr><th>' + ({ title: "Başlık", description: "Açıklama", status: "Durum", priority: "Öncelik", project: "Proje" })[key] + '</th><td>' + esc(source[key]) + '</td><td>' + esc(destination[key]) + '</td></tr>').join("") + '</tbody></table></div><p class="settings-note">' + source.attachments.length + ' ek ve ' + (source.activity || []).length + ' aktivite ana işe taşınır. Ana işin başlık ve durum alanları korunur.</p>';
    return;
  }
  if (target.id === "bulk-assignment-mode") { refreshBulkAssignmentPreview(); return; }
  if (target.id === "import-sheet") { importSheetIndex = Number(target.value); initializeImportMapping(); renderExcelImport(); return; }
  if (target.dataset.importMap) { importMapping[target.dataset.importMap] = Number(target.value); renderExcelImport(); return; }
  if (target.id === "bulk-status" && target.value) { openBulkImpactPreview("status", target.value); target.value = ""; return; }
  if (target.id === "bulk-assignment" && target.value) { openBulkImpactPreview("assignment", target.value); target.value = ""; return; }
  if (target.id === "bulk-project" && target.value) { openBulkImpactPreview("project", target.value); target.value = ""; return; }
  if (target.id === "bulk-release" && target.value) { openBulkImpactPreview("release", target.value); target.value = ""; return; }
  if (target.id === "workspace-question-filter") { questionFilter = target.value as typeof questionFilter; renderWorkspaceShelf(); return; }
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
    const files: AttachmentInfo[] = Array.from(target.files || []).map((file) => ({ name: file.name, size: file.size, demoOnly: true, addedAt: new Date().toISOString() }));
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
      refreshItemDetail(item);
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
  if (target.closest?.("#new-form, #quick-create-form")) scheduleFormDraftSave();
  if (target.dataset?.inlineInsertTitle !== undefined) { target.setCustomValidity(""); return; }
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
  if (target.id === "backlog-search") { query = target.value; window.clearTimeout(backlogSearchTimer); backlogSearchTimer = window.setTimeout(() => { rememberRecentBacklogFilter(); updateBacklogRows(); }, 120); }
  if (target.id === "asset-search") { assetQuery = target.value; updateAssetGrid(); }
  if (target.id === "global-search") {
    renderGlobalSearch();
  }
});

document.addEventListener("focusin", (event) => {
  const target = event.target as HTMLElement;
  if (target.id === "global-search") { renderGlobalSearch(); return; }
  if (target.id !== "new-assets-search") return;
  document.getElementById("new-assets-picker")?.classList.add("open");
  target.setAttribute("aria-expanded", "true");
});

document.addEventListener("click", (event) => {
  const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>('[popovertarget="dashboard-priority-popover"]') : null;
  const popover = document.getElementById("dashboard-priority-popover");
  if (trigger && popover) {
    const rect = trigger.getBoundingClientRect();
    popover.style.left = Math.max(8, Math.min(rect.right - 190, window.innerWidth - 198)) + "px";
    popover.style.top = Math.max(8, Math.min(rect.bottom + 6, window.innerHeight - 250)) + "px";
  }
});
document.addEventListener("click", (event) => {
  const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-panel-search-trigger]") : null;
  if (!trigger) return;
  const popover = document.getElementById(trigger.getAttribute("popovertarget")!); if (!popover) return;
  const rect = trigger.getBoundingClientRect();
  popover.style.left = Math.max(8, Math.min(rect.right - 250, innerWidth - 258)) + "px";
  popover.style.top = Math.max(8, Math.min(rect.bottom + 6, innerHeight - 110)) + "px";
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !(event.target instanceof HTMLInputElement) || !event.target.dataset.panelSearch) return;
  event.preventDefault(); event.stopImmediatePropagation();
  event.target.closest<HTMLElement>("[popover]")?.hidePopover();
  root.querySelector<HTMLButtonElement>('[data-panel-search-trigger="' + event.target.dataset.panelSearch + '"]')?.focus();
}, true);
document.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.dataset.panelSearch) return;
  const kind = event.target.dataset.panelSearch as DashboardSearchKind;
  dashboardSearches[kind] = event.target.value; applyDashboardSearch(kind);
});

document.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement && event.target.name === "dashboard-priority") {
    dashboardPriority = event.target.value; renderOverview();
    root.querySelector<HTMLButtonElement>(".personal-priority-trigger")?.focus();
  }
});

document.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLTextAreaElement)) return;
  const form = event.target.closest<HTMLFormElement>("[data-message-kind]");
  if (form) {
    workspaceMessageDrafts[form.dataset.messageKind as WorkspaceMessageKind] = event.target.value;
    resizeWorkspaceMessage(event.target);
    const ready = !!event.target.value.trim();
    form.classList.toggle("has-message", ready);
    form.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled = !ready;
  }
});
document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLTextAreaElement && event.target.closest("[data-message-kind]") && event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault(); event.target.closest<HTMLFormElement>("form")?.requestSubmit();
  }
});
document.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-message-focus]") : null;
  if (button) button.closest(".personal-panel")?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
});

document.addEventListener("submit", (event) => {
  const form = event.target as HTMLFormElement;
  if (form.matches("[data-message-kind]")) { event.preventDefault(); sendWorkspaceMessage(form); return; }
  const formId = form.getAttribute("id") || "";
  if (formId === "meeting-stage-record-form") { event.preventDefault(); submitMeetingStageRecord(form); return; }
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
    if (!text) return;
    state.openQuestions ||= [];
    const id = String(values.get("id") || "");
    const existing = state.openQuestions.find((question) => question.id === id);
    if (existing) { existing.text = text; existing.owner = owner; existing.expectedAt = String(values.get("expectedAt") || ""); existing.linkedItemId = String(values.get("linkedItemId") || "") || undefined; }
    else state.openQuestions.unshift({ id: nextId("Q"), text, owner, expectedAt: String(values.get("expectedAt") || ""), status: "Açık", linkedItemId: String(values.get("linkedItemId") || "") || undefined, createdAt: new Date().toISOString() });
    save(); closeModal(); renderOpenQuestions(); toast("Açık soru kaydedildi."); return;
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
    edge?.setLabels([{ attrs: { text: { text: label, fill: "var(--diagram-edge-text, #5d6784)", fontSize: 11 } }, position: 0.5 }]);
    persistAssetRelation(sourceId, targetId, label);
    closeModal();
    toast("İlişki etiketi güncellendi.");
    return;
  }
  if (formId === "risk-form") { event.preventDefault(); const values = new FormData(event.target as HTMLFormElement); const value = (name: string) => String(values.get(name) || "").trim(); if (!value("title") || !value("owner") || value("manualLevel") && !value("manualLevelReason")) { toast("Başlık, sahip ve elle seviye için gerekçe gerekli."); return; } state.risks ||= []; const existing = state.risks.find((risk) => risk.id === value("id")); const risk: ProductRisk = { ...existing, id: existing?.id || nextId("RISK"), title: value("title"), description: value("description"), project: value("project"), owner: value("owner"), status: value("status") as ProductRisk["status"], impact: Number(value("impact")) as ProductRisk["impact"], probability: Number(value("probability")) as ProductRisk["probability"], mitigation: value("mitigation"), reviewAt: value("reviewAt"), manualLevel: value("manualLevel") as ProductRisk["manualLevel"] || undefined, manualLevelReason: value("manualLevelReason"), releaseIds: value("releaseId") ? [value("releaseId")] : [], workItemIds: existing?.workItemIds || (value("itemId") ? [value("itemId")] : []), updatedAt: new Date().toISOString() }; if (existing) Object.assign(existing, risk); else state.risks.push(risk); const item = itemById(value("itemId")); if (item) { item.relatedRecords ||= []; item.relatedRecords.push({ id: nextId("LINK"), type: "risk", targetId: risk.id }); } save(); openRiskCenter(); }
  if (formId === "work-template-form") { event.preventDefault(); const values = new FormData(event.target as HTMLFormElement); state.workTemplates ||= []; state.workTemplates.push({ id: nextId("WTPL"), name: String(values.get("name")).trim(), type: String(values.get("type")) as WorkType, priority: String(values.get("priority")) as Priority, description: String(values.get("description") || ""), acceptance: String(values.get("acceptance") || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean), labels: String(values.get("labels") || "").split(",").map((line) => line.trim()).filter(Boolean) }); save(); openWorkspaceSettings("work"); toast("İş şablonu kaydedildi."); }
  if (formId === "new-form") saveNewRecord(event as SubmitEvent);
  if (formId === "workspace-form") saveWorkspaceSettings(event as SubmitEvent);
  if (formId === "project-form") saveProjectSettings(event as SubmitEvent);
  if (formId === "team-form") saveTeam(event as SubmitEvent);
  if (formId === "asset-form") saveAsset(event as SubmitEvent);
  if (formId === "setup-form") saveSetup(event as SubmitEvent);
  if (formId === "roadmap-form") saveRoadmapNode(event as SubmitEvent);
  if (formId === "release-form") saveRelease(event as SubmitEvent);
  if (formId === "edit-task-form") saveEditedRecord(event as SubmitEvent, "task");
  if (formId === "edit-note-form") saveEditedRecord(event as SubmitEvent, "note");
});

document.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement;
  if (target instanceof HTMLInputElement && target.dataset.inlineInsertTitle !== undefined) {
    if (event.key === "Enter") { event.preventDefault(); root.querySelector<HTMLButtonElement>('[data-action="save-inline-insert"][data-after-id="' + CSS.escape(target.dataset.inlineInsertTitle) + '"]')?.click(); return; }
    if (event.key === "Escape") { event.preventDefault(); inlineInsertAfterId = null; updateBacklogRows(); return; }
  }
  if (event.key === "Escape" && modalRoot.querySelector(".modal-backdrop")) { closeModal(); return; }
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "n") {
    event.preventDefault(); modalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null; openQuickCreateModal(); return;
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
  if (document.activeElement?.id === "global-search" && !document.getElementById("global-search-results")?.hidden) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const count = globalSearchResults.length;
      if (count) globalSearchSelection = (globalSearchSelection + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
      document.querySelectorAll<HTMLElement>(".global-search-result").forEach((row, index) => { row.classList.toggle("selected", index === globalSearchSelection); row.setAttribute("aria-selected", String(index === globalSearchSelection)); });
      document.getElementById("global-search")?.setAttribute("aria-activedescendant", count ? "global-result-" + globalSearchSelection : "");
      return;
    }
    if (event.key === "Enter") { event.preventDefault(); chooseGlobalSearch(globalSearchSelection); return; }
    if (event.key === "Escape") { event.preventDefault(); closeGlobalSearch(); return; }
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
      if (existingEmailRecord) toast("Bu e-posta daha önce alındı: " + existingEmailRecord.title + ". Hedef kaydı kontrol et.");
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
      pendingDroppedEmailSource = { name: email.originalEmail.name, from: email.from, date: email.date, fingerprint, originalStoredName: email.originalEmail.storedName, attachmentStoredNames: [] };
      renderDraftFiles();
      renderEmailAttachmentChoices();
      renderEmailDestination();
      persistCurrentFormDraft();
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

// Sol menü kişiselleştirmesi: öğe sırası/görünürlüğü, yoğunluk, genişlik ve kayan aktif vurgu.
type SidebarLayout = { order: Record<string, string[]>; hidden: string[]; compact: boolean; showCounts: boolean; showProjects: boolean; width: number | null };
const SIDEBAR_LAYOUT_KEY = "rota-sidebar-layout";
const SIDEBAR_WIDTH_MIN = 208;
const SIDEBAR_WIDTH_MAX = 340;
const defaultSidebarOrder: Record<string, string[]> = Object.fromEntries(sidebarNavGroups().map((group) => [group.dataset.navGroup || "", [...group.querySelectorAll<HTMLElement>(":scope > .nav-group-items > .nav-item[data-view]")].map((item) => item.dataset.view || "")]));
let sidebarLayout: SidebarLayout = readSidebarLayout();

function defaultSidebarLayout(): SidebarLayout {
  return { order: JSON.parse(JSON.stringify(defaultSidebarOrder)), hidden: [], compact: false, showCounts: true, showProjects: true, width: null };
}

function readSidebarLayout(): SidebarLayout {
  const fallback = defaultSidebarLayout();
  try {
    const stored = JSON.parse(localStorage.getItem(SIDEBAR_LAYOUT_KEY) || "null") as Partial<SidebarLayout> | null;
    if (!stored || typeof stored !== "object") return fallback;
    const order = Object.fromEntries(Object.entries(defaultSidebarOrder).map(([group, views]) => {
      const saved = Array.isArray(stored.order?.[group]) ? stored.order![group].filter((view) => views.includes(view)) : [];
      return [group, [...saved, ...views.filter((view) => !saved.includes(view))]];
    }));
    const width = typeof stored.width === "number" && Number.isFinite(stored.width) ? Math.min(SIDEBAR_WIDTH_MAX, Math.max(SIDEBAR_WIDTH_MIN, stored.width)) : null;
    return { order, hidden: Array.isArray(stored.hidden) ? stored.hidden.filter((view) => typeof view === "string") : [], compact: Boolean(stored.compact), showCounts: stored.showCounts !== false, showProjects: stored.showProjects !== false, width };
  } catch { return fallback; }
}

function saveSidebarLayout(): void {
  try { localStorage.setItem(SIDEBAR_LAYOUT_KEY, JSON.stringify(sidebarLayout)); } catch { /* tercih kaydedilemezse menü yine çalışır */ }
}

function sidebarItemLabel(view: string): string {
  const item = document.querySelector<HTMLElement>('.nav-item[data-view="' + view + '"]');
  return [...(item?.childNodes || [])].filter((node) => node.nodeType === 3).map((node) => node.textContent || "").join("").trim() || view;
}

function applySidebarLayout(): void {
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  if (!sidebar) return;
  sidebarNavGroups().forEach((group) => {
    const container = group.querySelector<HTMLElement>(":scope > .nav-group-items");
    if (!container) return;
    const anchor = container.querySelector(":scope > :not(.nav-item)");
    (sidebarLayout.order[group.dataset.navGroup || ""] || []).forEach((view) => {
      const item = container.querySelector<HTMLElement>(':scope > .nav-item[data-view="' + view + '"]');
      if (item) container.insertBefore(item, anchor);
    });
  });
  document.querySelectorAll<HTMLElement>(".nav-item[data-view]").forEach((item) => { item.hidden = sidebarLayout.hidden.includes(item.dataset.view || ""); });
  sidebar.classList.toggle("sidebar-compact", sidebarLayout.compact);
  sidebar.classList.toggle("sidebar-hide-counts", !sidebarLayout.showCounts);
  sidebar.classList.toggle("sidebar-hide-projects", !sidebarLayout.showProjects);
  if (sidebarLayout.width) document.body.style.setProperty("--sidebar-width", sidebarLayout.width + "px");
  else document.body.style.removeProperty("--sidebar-width");
  syncSidebarCollapsedTooltips();
  trackNavIndicator(320);
}

function syncSidebarCollapsedTooltips(): void {
  const collapsed = Boolean(document.querySelector(".sidebar")?.classList.contains("collapsed"));
  document.querySelectorAll<HTMLElement>(".nav-item[data-view]").forEach((item) => {
    if (collapsed) { item.dataset.tooltip = sidebarItemLabel(item.dataset.view || ""); item.dataset.tooltipSide = "right"; }
    else { delete item.dataset.tooltip; delete item.dataset.tooltipSide; }
  });
}

function updateNavIndicator(): void {
  const nav = document.querySelector<HTMLElement>(".primary-nav");
  if (!nav) return;
  let pill = nav.querySelector<HTMLElement>(":scope > .nav-active-pill");
  if (!pill) { pill = document.createElement("span"); pill.className = "nav-active-pill"; pill.setAttribute("aria-hidden", "true"); nav.prepend(pill); }
  const active = nav.querySelector<HTMLElement>(".nav-item.active:not([hidden])");
  if (!active || active.closest("details:not([open])") || !active.getClientRects().length) { if (pill.classList.contains("visible")) pill.classList.remove("visible"); return; }
  const navRect = nav.getBoundingClientRect();
  const rect = active.getBoundingClientRect();
  const first = !pill.classList.contains("visible");
  if (first) pill.style.transition = "none";
  // DOM rectangles include CSS zoom; the pill's CSS coordinates do not.
  pill.style.transform = "translate(" + ((rect.left - navRect.left) / appZoom) + "px, " + ((rect.top - navRect.top) / appZoom) + "px)";
  pill.style.width = rect.width / appZoom + "px";
  pill.style.height = rect.height / appZoom + "px";
  if (first) pill.classList.add("visible");
  if (first) { void pill.offsetWidth; pill.style.transition = ""; }
}

let navIndicatorFrame = 0;
function trackNavIndicator(duration = 0): void {
  cancelAnimationFrame(navIndicatorFrame);
  const until = performance.now() + duration;
  const step = (): void => { updateNavIndicator(); if (performance.now() < until) navIndicatorFrame = requestAnimationFrame(step); };
  navIndicatorFrame = requestAnimationFrame(step);
}

function sidebarCustomizerBody(): string {
  const groupTitles: Record<string, string> = { product: "Proje takip" };
  const groups = Object.entries(sidebarLayout.order).filter(([group]) => group in defaultSidebarOrder).map(([group, views]) => '<section class="sidebar-custom-group"><h3>' + esc(groupTitles[group] || group) + '</h3><div class="sidebar-custom-list" data-sidebar-group="' + esc(group) + '">' + views.map((view, index) => {
    const visible = !sidebarLayout.hidden.includes(view);
    const iconMarkup = document.querySelector('.nav-item[data-view="' + view + '"] .nav-icon')?.innerHTML || "";
    return '<div class="sidebar-custom-row' + (visible ? "" : " is-hidden") + '" draggable="true" data-sidebar-view="' + esc(view) + '"><span class="sidebar-custom-handle" aria-hidden="true">⠿</span><span class="sidebar-custom-icon" aria-hidden="true">' + iconMarkup + '</span><span class="sidebar-custom-label">' + esc(sidebarItemLabel(view)) + '</span><span class="sidebar-custom-move"><button type="button" class="button button-quiet button-small" data-sidebar-move="up" data-sidebar-view="' + esc(view) + '" aria-label="' + esc(sidebarItemLabel(view) + " öğesini yukarı taşı") + '" ' + (index === 0 ? "disabled" : "") + '>' + icon("chevronUp") + '</button><button type="button" class="button button-quiet button-small" data-sidebar-move="down" data-sidebar-view="' + esc(view) + '" aria-label="' + esc(sidebarItemLabel(view) + " öğesini aşağı taşı") + '" ' + (index === views.length - 1 ? "disabled" : "") + '>' + icon("chevronDown") + '</button></span><label class="sidebar-switch" title="' + (visible ? "Menüde gizle" : "Menüde göster") + '"><input type="checkbox" data-sidebar-visible="' + esc(view) + '" ' + (visible ? "checked" : "") + ' aria-label="' + esc(sidebarItemLabel(view) + " menüde görünsün") + '"><span aria-hidden="true"></span></label></div>';
  }).join("") + '</div></section>').join("");
  const toggle = (key: "showCounts" | "showProjects", title: string, help: string): string => '<label class="sidebar-custom-option"><span><strong>' + title + '</strong><small>' + help + '</small></span><span class="sidebar-switch"><input type="checkbox" data-sidebar-option="' + key + '" ' + (sidebarLayout[key] ? "checked" : "") + '><span aria-hidden="true"></span></span></label>';
  return '<div class="sidebar-custom-grid"><div class="sidebar-custom-items"><p class="settings-intro">Sürükleyerek sırala, anahtarla gizle veya göster. Değişiklikler anında uygulanır.</p>' + groups + '</div><aside class="sidebar-custom-settings"><h3>Görünüm</h3><div class="sidebar-density" role="radiogroup" aria-label="Menü yoğunluğu"><button type="button" role="radio" aria-checked="' + !sidebarLayout.compact + '" data-sidebar-density="comfortable" class="' + (sidebarLayout.compact ? "" : "selected") + '">Rahat</button><button type="button" role="radio" aria-checked="' + sidebarLayout.compact + '" data-sidebar-density="compact" class="' + (sidebarLayout.compact ? "selected" : "") + '">Kompakt</button></div>' + toggle("showCounts", "Sayaçlar", "Backlog ve soru sayılarını göster") + toggle("showProjects", "Projeler bölümü", "Proje listesi ve arama") + '<div class="sidebar-custom-width"><strong>Genişlik</strong><small>' + (sidebarLayout.width ? sidebarLayout.width + " px" : "Otomatik") + ' · Menünün sağ kenarını sürükleyerek değiştir, çift tıklayarak sıfırla.</small></div></aside></div>';
}

function renderSidebarCustomizer(): void {
  modalRoot.innerHTML = '<div class="modal-backdrop" data-close-modal><section class="modal settings-modal sidebar-customizer-modal" role="dialog" aria-modal="true" aria-labelledby="sidebar-customizer-title"><header class="modal-header"><div><div class="panel-kicker">KİŞİSEL GÖRÜNÜM</div><h2 id="sidebar-customizer-title">Menüyü özelleştir</h2></div><button class="modal-close" data-close-modal aria-label="Kapat">×</button></header><div class="settings-form"><div class="sidebar-customizer-body">' + sidebarCustomizerBody() + '</div><footer class="modal-footer"><button type="button" class="button button-quiet" data-sidebar-reset>Varsayılana dön</button><button type="button" class="button button-primary" data-close-modal>Tamam</button></footer></div></section></div>';
  const modal = modalRoot.querySelector<HTMLElement>(".sidebar-customizer-modal");
  if (!modal) return;
  const refresh = (): void => { saveSidebarLayout(); applySidebarLayout(); const body = modal.querySelector<HTMLElement>(".sidebar-customizer-body"); if (body) body.innerHTML = sidebarCustomizerBody(); };
  const moveView = (group: string, view: string, target: number): void => {
    const list = sidebarLayout.order[group];
    const from = list?.indexOf(view) ?? -1;
    if (!list || from < 0 || target < 0 || target >= list.length || target === from) return;
    list.splice(from, 1); list.splice(target, 0, view); refresh();
  };
  modal.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    if (input.dataset.sidebarVisible) {
      const view = input.dataset.sidebarVisible;
      sidebarLayout.hidden = input.checked ? sidebarLayout.hidden.filter((entry) => entry !== view) : [...new Set([...sidebarLayout.hidden, view])];
      refresh();
    } else if (input.dataset.sidebarOption === "showCounts" || input.dataset.sidebarOption === "showProjects") {
      sidebarLayout[input.dataset.sidebarOption] = input.checked; refresh();
    }
  });
  modal.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const move = target.closest<HTMLButtonElement>("[data-sidebar-move]");
    if (move?.dataset.sidebarView) {
      const group = move.closest<HTMLElement>("[data-sidebar-group]")?.dataset.sidebarGroup || "";
      const index = sidebarLayout.order[group]?.indexOf(move.dataset.sidebarView) ?? -1;
      moveView(group, move.dataset.sidebarView, index + (move.dataset.sidebarMove === "up" ? -1 : 1));
      modal.querySelector<HTMLElement>('[data-sidebar-move="' + move.dataset.sidebarMove + '"][data-sidebar-view="' + move.dataset.sidebarView + '"]:not(:disabled)')?.focus();
      return;
    }
    const density = target.closest<HTMLElement>("[data-sidebar-density]");
    if (density) { sidebarLayout.compact = density.dataset.sidebarDensity === "compact"; refresh(); return; }
    if (target.closest("[data-sidebar-reset]")) { sidebarLayout = defaultSidebarLayout(); refresh(); toast("Menü varsayılan görünüme döndü."); }
  });
  let dragged: HTMLElement | null = null;
  modal.addEventListener("dragstart", (event) => {
    dragged = (event.target as HTMLElement).closest<HTMLElement>(".sidebar-custom-row");
    if (!dragged) return;
    dragged.classList.add("is-dragging");
    event.dataTransfer?.setData("text/plain", dragged.dataset.sidebarView || "");
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  });
  modal.addEventListener("dragover", (event) => {
    const row = (event.target as HTMLElement).closest<HTMLElement>(".sidebar-custom-row");
    if (!dragged || !row || row === dragged || row.parentElement !== dragged.parentElement) return;
    event.preventDefault();
    const after = event.clientY > row.getBoundingClientRect().top + row.offsetHeight / 2;
    row.parentElement?.insertBefore(dragged, after ? row.nextSibling : row);
  });
  modal.addEventListener("dragend", () => {
    if (!dragged) return;
    const list = dragged.closest<HTMLElement>("[data-sidebar-group]");
    const group = list?.dataset.sidebarGroup || "";
    if (list && sidebarLayout.order[group]) sidebarLayout.order[group] = [...list.querySelectorAll<HTMLElement>(".sidebar-custom-row")].map((row) => row.dataset.sidebarView || "");
    dragged = null;
    refresh();
  });
}

function initSidebarCustomization(): void {
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  const tools = sidebar?.querySelector<HTMLElement>(".sidebar-tools");
  if (!sidebar || !tools) return;
  tools.insertAdjacentHTML("afterbegin", '<button type="button" class="sidebar-customize" data-action="customize-sidebar" data-tooltip="Menüyü özelleştir" aria-label="Menüyü özelleştir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg></button>');
  sidebar.insertAdjacentHTML("beforeend", '<div class="sidebar-resizer" role="separator" aria-orientation="vertical" tabindex="0" aria-label="Menü genişliği · ok tuşlarıyla değiştir, çift tıklayarak sıfırla"></div>');
  const resizer = sidebar.querySelector<HTMLElement>(".sidebar-resizer")!;
  const setWidth = (value: number | null): void => {
    sidebarLayout.width = value === null ? null : Math.round(Math.min(SIDEBAR_WIDTH_MAX, Math.max(SIDEBAR_WIDTH_MIN, value)));
    if (sidebarLayout.width) document.body.style.setProperty("--sidebar-width", sidebarLayout.width + "px");
    else document.body.style.removeProperty("--sidebar-width");
    updateNavIndicator();
  };
  resizer.addEventListener("pointerdown", (event) => {
    if (sidebar.classList.contains("collapsed")) return;
    event.preventDefault();
    resizer.setPointerCapture(event.pointerId);
    document.body.classList.add("sidebar-resizing");
    const zoom = appZoom || 1;
    const move = (moveEvent: PointerEvent): void => setWidth(moveEvent.clientX / zoom);
    const stop = (): void => {
      resizer.removeEventListener("pointermove", move);
      document.body.classList.remove("sidebar-resizing");
      saveSidebarLayout();
    };
    resizer.addEventListener("pointermove", move);
    resizer.addEventListener("pointerup", stop, { once: true });
    resizer.addEventListener("pointercancel", stop, { once: true });
  });
  resizer.addEventListener("dblclick", () => { setWidth(null); saveSidebarLayout(); trackNavIndicator(320); });
  resizer.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setWidth((sidebarLayout.width || sidebar.getBoundingClientRect().width / (appZoom || 1)) + (event.key === "ArrowRight" ? 12 : -12));
    saveSidebarLayout();
  });
  new MutationObserver((records) => { if (records.some((record) => !(record.target instanceof Element && record.target.classList.contains("nav-active-pill")))) updateNavIndicator(); }).observe(sidebar, { subtree: true, attributes: true, attributeFilter: ["class", "hidden", "open"] });
  syncSidebarWidth();
  sidebar.addEventListener("transitionend", (event) => {
    if (event.target !== sidebar) return;
    fitBacklogColumnsToWindow();
    updateNavIndicator();
  });
  sidebar.querySelector(".sidebar-scroll")?.addEventListener("toggle", () => trackNavIndicator(320), true);
  window.addEventListener("resize", () => updateNavIndicator());
  applySidebarLayout();
}

// Vurgu rengi: kullanıcı seçimi yalnızca vurgu tokenlarını (--accent ailesi) değiştirir.
const ACCENT_COLOR_KEY = "rota-accent-color";
const DEFAULT_ACCENT_COLOR = "#5b63e6";
const ACCENT_PRESETS: { color: string; name: string }[] = [
  { color: "#5b63e6", name: "İndigo" }, { color: "#8b5cf6", name: "Mor" }, { color: "#2f80ed", name: "Mavi" }, { color: "#0e9fb5", name: "Camgöbeği" },
  { color: "#16a36a", name: "Yeşil" }, { color: "#e07a1f", name: "Turuncu" }, { color: "#e0457b", name: "Pembe" }, { color: "#475569", name: "Grafit" }
];
let accentPopover: HTMLElement | null = null;
let accentBeforeEdit = "";

function normalizeAccentColor(value: string | null | undefined): string | null {
  const match = (value || "").trim().match(/^#?([0-9a-f]{6})$/i);
  return match ? "#" + match[1].toLowerCase() : null;
}

function storedAccentColor(): string {
  try { return normalizeAccentColor(localStorage.getItem(ACCENT_COLOR_KEY)) || DEFAULT_ACCENT_COLOR; } catch { return DEFAULT_ACCENT_COLOR; }
}

// Açık renklerde beyaz yazı okunmaz; vurgu üzerindeki metin rengi parlaklığa göre seçilir.
function accentContrastColor(hex: string): string {
  const channel = (index: number): number => { const value = parseInt(hex.slice(index, index + 2), 16) / 255; return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4); };
  const luminance = 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
  return luminance > 0.42 ? "#161a22" : "#ffffff";
}

function applyAccentColor(color: string): void {
  const value = normalizeAccentColor(color) || DEFAULT_ACCENT_COLOR;
  const custom = value !== DEFAULT_ACCENT_COLOR;
  document.body.classList.toggle("custom-accent", custom);
  if (custom) document.body.style.setProperty("--user-accent", value);
  else document.body.style.removeProperty("--user-accent");
  document.body.style.setProperty("--accent-contrast", accentContrastColor(value));
  document.querySelectorAll<HTMLInputElement>("[data-accent-input]").forEach((input) => { if (input.value !== value) input.value = value; });
  document.querySelectorAll<HTMLInputElement>("[data-accent-hex]").forEach((input) => { if (document.activeElement !== input) input.value = value.toUpperCase(); });
  document.querySelectorAll<HTMLElement>("[data-accent-preset]").forEach((swatch) => swatch.setAttribute("aria-pressed", String(swatch.dataset.accentPreset === value)));
}

function saveAccentColor(color: string): void {
  const value = normalizeAccentColor(color) || DEFAULT_ACCENT_COLOR;
  try { if (value === DEFAULT_ACCENT_COLOR) localStorage.removeItem(ACCENT_COLOR_KEY); else localStorage.setItem(ACCENT_COLOR_KEY, value); } catch { /* tercih kaydedilemezse renk bu oturumda kalır */ }
  applyAccentColor(value);
}

function accentPickerFields(): string {
  const current = storedAccentColor();
  return '<div class="accent-swatches" role="group" aria-label="Hazır renkler">' + ACCENT_PRESETS.map((preset) => '<button type="button" class="accent-swatch" data-accent-preset="' + preset.color + '" aria-pressed="' + (preset.color === current) + '" aria-label="' + esc(preset.name) + '" data-tooltip="' + esc(preset.name) + '" style="--swatch:' + preset.color + '"></button>').join("") + '</div><div class="accent-custom-row"><label class="accent-color-well" data-tooltip="Renk seçiciyi aç"><input type="color" data-accent-input value="' + current + '" aria-label="Özel vurgu rengi"></label><input class="field-input accent-hex" data-accent-hex value="' + current.toUpperCase() + '" maxlength="7" spellcheck="false" aria-label="Renk kodu (HEX)"></div>';
}

function closeAccentPopover(revert: boolean): void {
  if (!accentPopover) return;
  if (revert) applyAccentColor(accentBeforeEdit);
  const popover = accentPopover;
  accentPopover = null;
  popover.classList.add("closing");
  window.setTimeout(() => popover.remove(), 160);
  document.removeEventListener("pointerdown", accentOutsidePointer, true);
  document.removeEventListener("keydown", accentEscape, true);
}

function accentOutsidePointer(event: PointerEvent): void {
  const target = event.target instanceof Element ? event.target : null;
  if (accentPopover && !(target && accentPopover.contains(target)) && !target?.closest(".accent-edit")) closeAccentPopover(true);
}

function accentEscape(event: KeyboardEvent): void {
  if (event.key === "Escape" && accentPopover) { event.stopPropagation(); closeAccentPopover(true); }
}

function openAccentPopover(anchor: HTMLElement): void {
  if (accentPopover) { closeAccentPopover(true); return; }
  closeActionTooltip();
  accentBeforeEdit = storedAccentColor();
  const popover = document.createElement("div");
  popover.className = "accent-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-label", "Vurgu rengini değiştir");
  popover.innerHTML = '<header><span class="accent-popover-dot" aria-hidden="true"></span><div><strong>Vurgu rengi</strong><small>Butonlar, avatarlar ve seçili öğeler bu rengi kullanır.</small></div></header>' + accentPickerFields() + '<div class="accent-preview" aria-hidden="true"><span class="accent-preview-button">＋ Örnek buton</span><span class="accent-preview-chip">Seçili</span><span class="accent-preview-switch"><i></i></span></div><footer><button type="button" class="button button-quiet button-small" data-accent-reset>Varsayılan</button><span></span><button type="button" class="button button-secondary button-small" data-accent-cancel>Vazgeç</button><button type="button" class="button button-primary button-small" data-accent-save>Kaydet</button></footer>';
  document.body.append(popover);
  const rect = anchor.getBoundingClientRect();
  const bounds = popover.getBoundingClientRect();
  popover.style.left = Math.max(8, Math.min(window.innerWidth - bounds.width - 8, rect.left)) + "px";
  popover.style.top = Math.max(8, rect.top - bounds.height - 10) + "px";
  accentPopover = popover;
  popover.addEventListener("input", (event) => {
    const input = event.target as HTMLInputElement;
    if (input.dataset.accentInput !== undefined) applyAccentColor(input.value);
    else if (input.dataset.accentHex !== undefined) { const value = normalizeAccentColor(input.value); input.classList.toggle("invalid", !value); if (value) applyAccentColor(value); }
  });
  popover.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const preset = target.closest<HTMLElement>("[data-accent-preset]");
    if (preset?.dataset.accentPreset) { applyAccentColor(preset.dataset.accentPreset); return; }
    if (target.closest("[data-accent-reset]")) { applyAccentColor(DEFAULT_ACCENT_COLOR); return; }
    if (target.closest("[data-accent-cancel]")) { closeAccentPopover(true); return; }
    if (target.closest("[data-accent-save]")) {
      const value = normalizeAccentColor(popover.querySelector<HTMLInputElement>("[data-accent-input]")?.value) || DEFAULT_ACCENT_COLOR;
      saveAccentColor(value); closeAccentPopover(false); toast("Vurgu rengi kaydedildi.");
    }
  });
  document.addEventListener("pointerdown", accentOutsidePointer, true);
  document.addEventListener("keydown", accentEscape, true);
  popover.querySelector<HTMLElement>('[aria-pressed="true"], [data-accent-input]')?.focus();
}

// Avatar üzerindeki düzenle rozeti profil butonunun içinde durur; tıklama ayarlar yerine renk seçiciyi açar.
document.addEventListener("click", (event) => {
  const edit = (event.target as Element).closest?.<HTMLElement>(".accent-edit");
  if (!edit) return;
  event.preventDefault();
  event.stopPropagation();
  openAccentPopover(edit.closest<HTMLElement>(".profile-avatar") || edit);
}, true);

// Çalışma alanı ayarlarındaki alan: sürüklerken önizler, bırakınca kaydeder.
document.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  if (!input.closest?.(".appearance-settings")) return;
  if (input.dataset.accentInput !== undefined) applyAccentColor(input.value);
  else if (input.dataset.accentHex !== undefined) { const value = normalizeAccentColor(input.value); input.classList.toggle("invalid", !value); if (value) saveAccentColor(value); }
});
document.addEventListener("change", (event) => {
  const input = event.target as HTMLInputElement;
  if (input.closest?.(".appearance-settings") && input.dataset.accentInput !== undefined) saveAccentColor(input.value);
});
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (!target.closest?.(".appearance-settings")) return;
  const preset = target.closest<HTMLElement>("[data-accent-preset]");
  if (preset?.dataset.accentPreset) saveAccentColor(preset.dataset.accentPreset);
  else if (target.closest("[data-accent-reset]")) saveAccentColor(DEFAULT_ACCENT_COLOR);
});

applyAccentColor(storedAccentColor());

// Üst bardaki tema düğmesi: açık ↔ koyu geçişi yapar ve tercihi ayarlarla aynı anahtarda saklar.
let themeSwitchTimer = 0;
function syncThemeToggle(): void {
  const dark = document.body.classList.contains("dark-theme");
  const label = dark ? "Açık temaya geç" : "Koyu temaya geç";
  document.querySelectorAll<HTMLElement>(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-label", label);
    button.dataset.tooltip = label;
    button.setAttribute("aria-pressed", String(dark));
  });
  if (activeActionTooltipAnchor?.classList.contains("theme-toggle")) { const anchor = activeActionTooltipAnchor; closeActionTooltip(); openActionTooltip(anchor); }
}

function toggleTheme(): void {
  const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
  window.clearTimeout(themeSwitchTimer);
  document.body.classList.add("theme-switching");
  document.body.classList.toggle("dark-theme", next === "dark");
  try { localStorage.setItem(THEME_KEY, next); } catch { /* tercih kaydedilemezse tema bu oturumda kalır */ }
  const select = document.getElementById("workspace-theme") as HTMLSelectElement | null;
  if (select) select.value = next;
  syncThemeToggle();
  themeSwitchTimer = window.setTimeout(() => document.body.classList.remove("theme-switching"), 420);
}

syncThemeToggle();

const poTools = createPoTools({ state: () => state, save, id: nextId, icon, esc, navigate: setView, view: () => activeView, activeProject: () => activeProjectId, openItem, toast, commitItemEdit: () => !detailEdit || commitDetailEdit() });
initSidebarCustomization();
initWorkspaceToolbar();
initPomodoro({ desktop, modalRoot, record: workspaceFocusRecord, toast });

render();
showWorkspaceRecovery();
checkFollowUpReminders();
window.setInterval(checkFollowUpReminders, 60_000);
window.setTimeout(() => { void createAutomaticBackup(); }, 10_000);
window.setInterval(() => { void createAutomaticBackup(); }, 60 * 60_000);
if (!hasStoredWorkspace) openSetupWizard(true);



window.addEventListener("beforeunload", () => { window.clearTimeout(formDraftTimer); persistCurrentFormDraft(); });

installFavspaceDrop(() => state, () => activeView === "favspace", save, render);
