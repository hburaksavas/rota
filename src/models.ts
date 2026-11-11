type WorkType = "Story" | "Bug" | "Task";
type WorkStatus = "Yeni" | "Analiz ediliyor" | "Hazır" | "Devam ediyor" | "Bloke" | "Tamamlandı";
type Priority = "Kritik" | "Yüksek" | "Orta" | "Düşük";
type ProductAssetType = "Ekran" | "Batch" | "Rapor" | "Servis/API" | "Entegrasyon" | "Diğer";

interface AttachmentInfo {
  name: string;
  size: number;
  storedName?: string;
  demoOnly?: boolean;
  addedAt?: string;
}

interface EmailSourceInfo {
  name: string;
  from: string;
  date: string;
  fingerprint: string;
  originalStoredName?: string;
  attachmentStoredNames?: string[];
}

interface WorkItem {
  id: string;
  type: WorkType;
  title: string;
  status: WorkStatus;
  statusEnteredAt?: string;
  statusHistory?: { status: WorkStatus; enteredAt: string; leftAt: string }[];
  priority: Priority;
  project: string;
  projectId?: string;
  area: string;
  updated: string;
  description: string;
  acceptance: string[];
  attachments: AttachmentInfo[];
  labels: string[];
  teamId?: string;
  assignee?: string;
  assignments?: WorkAssignment[];
  assetIds?: string[];
  activity?: WorkActivity[];
  blocker?: WorkBlocker;
  startDate?: string;
  targetDate?: string;
  estimate?: number;
  dependsOnIds?: string[];
  targetPeriod?: string;
  roadmapNodeId?: string;
  productStage?: ProductStage;
  actualStartDate?: string;
  completedAt?: string;
  releaseId?: string;
  sprintId?: string;
  sprintOrder?: number;
  jiraIssueKey?: string;
  sourceEmail?: EmailSourceInfo;
  sourceEmails?: EmailSourceInfo[];
  archived?: boolean;
  relatedRecords?: WorkRecordLink[];
  // Kaldırılan özelliklerin eski kayıtları yedek uyumluluğu için korunur.
  estimateHistory?: EstimateHistoryEntry[];
  checklistExceptions?: { gate: "Hazır" | "Tamamlandı"; missing: string[]; reason: string; at: string; actor: string }[];
  mergedIntoId?: string;
  importSource?: { fingerprint: string; filename: string; row: number; importedAt: string };
}

interface EstimateHistoryEntry {
  from?: number;
  to?: number;
  reason: string;
  confidence: "Düşük" | "Orta" | "Yüksek";
  at: string;
  actor: string;
}

interface WorkRecordLink {
  id: string;
  type: "item" | "asset" | "release" | "note" | "question" | "risk";
  targetId: string;
  label?: string;
}

interface ProductRisk {
  id: string;
  title: string;
  description: string;
  project: string;
  owner: string;
  status: "Açık" | "Azaltılıyor" | "Kapandı";
  updatedAt: string;
  impact?: 1 | 2 | 3 | 4 | 5;
  probability?: 1 | 2 | 3 | 4 | 5;
  mitigation?: string;
  reviewAt?: string;
  workItemIds?: string[];
  releaseIds?: string[];
  manualLevel?: "Düşük" | "Orta" | "Yüksek" | "Kritik";
  manualLevelReason?: string;
}

interface DailyPlan {
  date: string;
  entries: { type: "item" | "task"; id: string; estimatedMinutes?: number; carriedFrom?: string }[];
  note: string;
  /** Eski kayıtlardan korunur; günlük odak bütçesi kullanılmaz. */
  focusBudgetMinutes?: number;
}

interface Sprint {
  id: string;
  name: string;
  teamId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  closingLearnings?: string;
  closedAt?: string;
  closingSnapshot?: {
    done: { id: string; title: string; status: string }[];
    carryover: { id: string; title: string; status: string }[];
    blocked: { id: string; title: string; status: string }[];
  };
  initialScopeIds?: string[];
  initialScope?: { id: string; estimate?: number }[];
  lastScope?: { id: string; estimate?: number }[];
  frozenScopeReport?: string;
  scopeChanges?: { itemId: string; direction: "added" | "removed"; reason: string; at: string; actor: string; estimate?: number }[];
}

interface WorkTemplate {
  id: string;
  name: string;
  type: WorkType;
  description: string;
  acceptance: string[];
  labels: string[];
  priority: Priority;
}

interface FormDraft {
  id: string;
  kind: "Backlog işi" | "Kişisel görev" | "Not";
  values: Record<string, string>;
  attachments: AttachmentInfo[];
  updatedAt: string;
  assignments?: WorkAssignment[];
  assetIds?: string[];
  sourceEmail?: EmailSourceInfo;
  sourceEmails?: EmailSourceInfo[];
}

interface ImportBatch {
  id: string;
  fingerprint: string;
  filename: string;
  importedAt: string;
  createdIds: string[];
  beforeItems?: WorkItem[];
}

interface DiagnosticEvent {
  id: string;
  category: "storage" | "attachment" | "jira" | "import" | "application";
  message: string;
  correlationId: string;
  occurredAt: string;
}

interface FollowUpNotification {
  id: string;
  type: "task" | "blocker" | "question" | "decision";
  recordId: string;
  title: string;
  dueAt: string;
  state: "unread" | "read" | "done";
  snoozedUntil?: string;
  notifiedAt?: string;
}

interface OpenQuestion {
  updatedAt?: string;
  id: string;
  text: string;
  owner: string;
  expectedAt: string;
  status: "Açık" | "Yanıtlandı";
  linkedItemId?: string;
  answer?: string;
  createdAt: string;
  answeredAt?: string;
}

interface AcceptanceTemplate {
  id: string;
  name: string;
  category: "Story" | "Bug" | "Bankacılık değişikliği" | "Genel";
  criteria: string[];
}

type ProductStage = "Fikirler" | "Keşif" | "Sırada" | "Planlandı" | "Teslimatta" | "Tamamlandı";

interface RoadmapNode {
  id: string;
  type: "Initiative" | "Epic";
  title: string;
  project: string;
  projectId?: string;
  parentId?: string;
  goal: string;
  successMetric: string;
  owner: string;
  stage: ProductStage;
  startDate: string;
  targetDate: string;
  updated: string;
  dateHistory?: { from: string; to: string; at: string; actor: string }[];
}

type ReleaseStatus = "Planlanıyor" | "Hazırlanıyor" | "Yayına hazır" | "Yayınlandı" | "Ertelendi" | "İptal edildi";

interface ProductRelease {
  id: string;
  project: string;
  projectId?: string;
  name: string;
  plannedDate: string;
  status: ReleaseStatus;
  description: string;
  actualDate?: string;
  archived?: boolean;
  dateHistory?: { from: string; to: string; reason: string; at: string; actor: string }[];
  releaseNotes?: string;
  outcome?: string;
  updated: string;
}

interface ProductDecisionSnapshot {
  title: string;
  context: string;
  options: string[];
  rationale: string;
  owner: string;
  decidedAt: string;
  reviewAt?: string;
  status: ProductDecision["status"];
  workItemIds: string[];
  assetIds: string[];
  projectIds: string[];
  releaseIds: string[];
}

interface ProductDecisionHistoryEntry {
  version: number;
  changedAt: string;
  changedBy: string;
  summary: string;
  snapshot: ProductDecisionSnapshot;
}

interface ProductDecision extends ProductDecisionSnapshot {
  id: string;
  status: "Taslak" | "Geçerli" | "Gözden geçirilecek" | "Geçersiz";
  supersedesId?: string;
  supersededById?: string;
  history: ProductDecisionHistoryEntry[];
  updatedAt: string;
}

interface WorkBlocker {
  reason: string;
  nextStep: string;
  expectedAction?: string;
  owner?: string;
  openedAt: string;
  resolvedAt?: string;
  followUpAt?: string;
  remindedAt?: string;
}

interface WorkActivity {
  id: string;
  kind: "created" | "change" | "comment" | "attachment" | "release";
  message: string;
  actor: string;
  occurredAt: string;
  visibility?: "team" | "private";
  attachments?: AttachmentInfo[];
}

interface WorkAssignment {
  teamId: string;
  member: string;
  memberId?: string;
  scope?: string;
}

interface ProductAsset {
  id: string;
  code: string;
  name: string;
  type: ProductAssetType;
  project: string;
  projectId?: string;
  area: string;
  purpose: string;
  description: string;
  ownerTeamId: string;
  ownerName: string;
  relatedAssetIds: string[];
  relatedAssetLabels?: Record<string, string>;
  diagramPosition?: { x: number; y: number };
  active: boolean;
  updated: string;
}

interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

interface WorkDiagram {
  id: string;
  ownerType: "item" | "note";
  ownerId: string;
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  updated: string;
}

interface PersonalTask {
  owner?: string;
  updatedAt?: string;
  id: string;
  title: string;
  due: string;
  done: boolean;
  linked: string;
  description?: string;
  attachments?: AttachmentInfo[];
  sourceNoteId?: string;
  sourceEmail?: EmailSourceInfo;
  sourceEmails?: EmailSourceInfo[];
  remindAt?: string;
  remindedAt?: string;
}

interface PersonalNote {
  updatedAt?: string;
  createdAt?: string;
  id: string;
  title: string;
  body: string;
  linked: string;
  updated: string;
  attachments?: AttachmentInfo[];
  sourceEmail?: EmailSourceInfo;
  sourceEmails?: EmailSourceInfo[];
}

interface Project {
  id: string;
  name: string;
  color: "blue" | "violet" | "amber" | "green";
  assignments?: WorkAssignment[];
  archived?: boolean;
}

interface Team {
  id: string;
  name: string;
  members: string[];
  memberIds?: Record<string, string>;
}

interface WorkspaceProfile {
  organization: string;
  workspace: string;
  userName: string;
  userRole: string;
  jiraBaseUrl?: string;
}

interface JiraDashboard { id: string; name: string; viewUrl?: string; }
interface JiraBoard { id: string; name: string; type: string; }
interface JiraProject { id: string; key: string; name: string; }
interface JiraSprint { id: string; name: string; state: string; startDate?: string; endDate?: string; goal?: string; }
interface JiraIssueType { id: string; name: string; subtask?: boolean; }
interface JiraSavedFilter { id: string; name: string; jql?: string; }
interface JiraIssue { id: string; key: string; summary: string; issueType: string; status: string; priority: string; assignee: string; updated: string; browseUrl: string; }

type WorkspaceFocusKind = "task" | "note" | "question" | "item";
interface WorkspaceFocusEntry {
  date: string;
  kind: WorkspaceFocusKind;
  id: string;
}

type DashboardPanelId = "tasks" | "notes" | "questions" | "items";
interface DashboardPanelLayout { id: DashboardPanelId; width: number; height: number; }

type PoMeetingKind = "task" | "question" | "decision";
interface PoMeetingEntry { id: string; text: string; kind: PoMeetingKind | "note"; linkedItemId: string; createdAt: string; recordId?: string; }
type MeetingAgendaStatus = "discussed" | "deferred";
interface PoMeeting { agendaStatus?: Record<string, MeetingAgendaStatus>; agendaIds?: string[]; endedAt?: string; durationSeconds?: number; id: string; title: string; projectId: string; createdAt: string; updatedAt: string; entries: PoMeetingEntry[]; }
type PoRequestKind = "clarification" | "example" | "confirmation" | "decision";
interface PoRequest { id: string; itemId: string; kind: PoRequestKind; text: string; requestedBy: string; createdAt: string; answer?: string; resolvedAt?: string; replies?: { text: string; author: string; createdAt: string }[]; }
interface WorkConversation { id: string; itemId: string; text: string; author: string; createdAt: string; }
interface ProductRule { id: string; projectId: string; title: string; body: string; updatedAt: string; }

interface FavspaceResource {
  id: string; title: string; url: string; shortcutPath?: string; collection: string; tags: string; note: string; projectId: string; itemId: string; pinned: boolean;
}
interface WorkspaceState {
  favspace?: { enabled: boolean; sourcePins?: Record<string, boolean>; resources: FavspaceResource[] };
  meetings?: PoMeeting[];
  poRequests?: PoRequest[];
  workConversations?: WorkConversation[];
  productRules?: ProductRule[];
  dashboardLayout?: DashboardPanelLayout[];
  hiddenDashboardPanels?: string[];
  schemaVersion?: number;
  items: WorkItem[];
  tasks: PersonalTask[];
  notes: PersonalNote[];
  projects: Project[];
  profile: WorkspaceProfile;
  teams: Team[];
  assets: ProductAsset[];
  roadmap: RoadmapNode[];
  releases: ProductRelease[];
  decisions?: ProductDecision[];
  diagrams: WorkDiagram[];
  sprints: Sprint[];
  openQuestions?: OpenQuestion[];
  acceptanceTemplates?: AcceptanceTemplate[];
  risks?: ProductRisk[];
  dailyPlans?: DailyPlan[];
  dailyFocus?: WorkspaceFocusEntry[];
  weeklySummaryNotes?: Record<string, string>;
  /** Kaldırılan akışların verileri yalnızca eski kayıt/yedek uyumluluğu içindir. */
  wipLimits?: Record<string, number>;
  handoverNotes?: Record<string, string>;
  workTemplates?: WorkTemplate[];
  formDrafts?: FormDraft[];
  importBatches?: ImportBatch[];
  diagnosticEvents?: DiagnosticEvent[];
  notifications?: FollowUpNotification[];
  estimateUnit?: "saat" | "puan";
  labelAliases?: Record<string, string>;
  workflowChecks?: Partial<Record<WorkType, { ready: string[]; done: string[] }>>;
}

interface ImportedAttachment extends AttachmentInfo {
  storedName: string;
}

interface ExcelImportData {
  filename: string;
  fingerprint?: string;
  rows: { title: string; description: string }[];
  sheets?: { name: string; rows: string[][] }[];
}

interface ExcelExportSheet {
  name: string;
  columns: string[];
  rows: (string | number | null)[][];
}

interface ParsedDroppedEmail {
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
  originalEmail: ImportedAttachment;
  attachmentToken: string;
  attachments: { id: string; name: string; size: number }[];
}

interface PomodoroSession {
  id: string;
  kind: WorkspaceFocusKind;
  recordId: string;
  title: string;
  minutes: number;
  breakMinutes: number;
  phase: "focus" | "break";
  status: "running" | "paused" | "completed";
  durationMs: number;
  remainingMs: number;
  endsAt: number | null;
  notification: "pending" | "sent" | "failed" | null;
}

interface DesktopBridge {
  pomodoroGet(): Promise<PomodoroSession | null>;
  pomodoroStart(input: { kind: WorkspaceFocusKind; recordId: string; title: string; minutes: number; breakMinutes: number }): Promise<PomodoroSession>;
  pomodoroPause(id: string): Promise<PomodoroSession>;
  pomodoroResume(id: string): Promise<PomodoroSession>;
  pomodoroBreak(id: string): Promise<PomodoroSession>;
  pomodoroCancel(id: string): Promise<null>;
  jiraGetIssue(base: string, key: string): Promise<{ issue: JiraIssue; transitions: { id: string; name: string; status: string }[] }>;
  jiraUpdateLinkedIssue(base: string, key: string, expectedUpdated: string, summary?: string, transitionId?: string): Promise<void>;
  getDiagnostics?(): Promise<Record<string, string>>;
  pickAttachments(): Promise<ImportedAttachment[]>;
  importDroppedFiles(files: File[]): Promise<ImportedAttachment[]>;
  parseDroppedEmail(files: File[]): Promise<ParsedDroppedEmail>;
  importSelectedEmailAttachments(token: string, selectedIds: string[]): Promise<ImportedAttachment[]>;
  openAttachment(storedName: string): Promise<string>;
  previewAttachment(storedName: string): Promise<{ mimeType: string; dataUrl: string } | null>;
  removeAttachment(storedName: string): Promise<boolean>;
  exportWorkspaceBackup(workspace: unknown, format: "rota" | "json"): Promise<{ path: string; attachmentCount: number } | null>;
  createAutomaticBackup(workspace: unknown): Promise<{ path: string; attachmentCount: number }>;
  getAutomaticBackupDirectory(): Promise<string>;
  setAutomaticBackupDirectory(directory: string): Promise<string>;
  exportUnreadableWorkspace(raw: string): Promise<string | null>;
  exportBacklogExcel(sheets: ExcelExportSheet[]): Promise<string | null>;
  pickBacklogExcelImport(): Promise<ExcelImportData | null>;
  stageWorkspaceRestore(): Promise<{ token: string; workspace: unknown; attachmentCount: number } | null>;
  commitWorkspaceRestore(token: string): Promise<void>;
  cancelWorkspaceRestore(token: string): Promise<void>;
  jiraHasToken(): Promise<boolean>;
  jiraSaveToken(token: string): Promise<void>;
  jiraRemoveToken(): Promise<void>;
  jiraOpenTokenPage(baseUrl: string): Promise<void>;
  resolveDroppedFileShortcuts?(): Promise<{ name: string; path: string }[]>;
  openFileShortcut?(path: string): Promise<void>;
  pickFileShortcuts?(): Promise<{ name: string; path: string }[]>;
  openResourceUrl?(url: string): Promise<void>;
  jiraOpenIssue(baseUrl: string, issueKey: string): Promise<void>;
  jiraListDashboards(baseUrl: string): Promise<JiraDashboard[]>;
  jiraListFilters(baseUrl: string): Promise<JiraSavedFilter[]>;
  jiraFetchFilterIssues(baseUrl: string, filterId: string): Promise<JiraIssue[]>;
  jiraListBoards(baseUrl: string): Promise<JiraBoard[]>;
  jiraListBoardProjects(baseUrl: string, boardId: string): Promise<JiraProject[]>;
  jiraListSprints(baseUrl: string, boardId: string): Promise<JiraSprint[]>;
  jiraFetchBoardIssues(baseUrl: string, boardId: string, scope: "backlog" | "board" | "sprint", sprintId?: string, startAt?: number): Promise<{ issues: JiraIssue[]; total?: number; hasMore: boolean }>;
  jiraListIssueTypes(baseUrl: string, projectKey: string): Promise<JiraIssueType[]>;
  jiraCreateIssue(baseUrl: string, boardId: string, projectKey: string, issueTypeId: string, summary: string, description: string): Promise<{ id: string; key: string }>;
}
