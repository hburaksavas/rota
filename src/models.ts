type WorkType = "Story" | "Bug" | "Task";
type WorkStatus = "Yeni" | "Analiz ediliyor" | "Hazır" | "Devam ediyor" | "Bloke" | "Tamamlandı";
type Priority = "Kritik" | "Yüksek" | "Orta" | "Düşük";
type ProductAssetType = "Ekran" | "Batch" | "Rapor" | "Servis/API" | "Entegrasyon" | "Diğer";

interface AttachmentInfo {
  name: string;
  size: number;
  storedName?: string;
  demoOnly?: boolean;
}

interface EmailSourceInfo {
  name: string;
  from: string;
  date: string;
  fingerprint: string;
}

interface WorkItem {
  id: string;
  type: WorkType;
  title: string;
  status: WorkStatus;
  priority: Priority;
  project: string;
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
  sourceEmail?: EmailSourceInfo;
  archived?: boolean;
  relatedRecords?: WorkRecordLink[];
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
}

interface DailyPlan {
  date: string;
  entries: { type: "item" | "task"; id: string }[];
  note: string;
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
}

interface OpenQuestion {
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
  scope?: string;
}

interface ProductAsset {
  id: string;
  code: string;
  name: string;
  type: ProductAssetType;
  project: string;
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
  id: string;
  title: string;
  due: string;
  done: boolean;
  linked: string;
  description?: string;
  attachments?: AttachmentInfo[];
  sourceNoteId?: string;
  sourceEmail?: EmailSourceInfo;
  remindAt?: string;
  remindedAt?: string;
}

interface PersonalNote {
  id: string;
  title: string;
  body: string;
  linked: string;
  updated: string;
  attachments?: AttachmentInfo[];
  sourceEmail?: EmailSourceInfo;
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
}

interface WorkspaceProfile {
  organization: string;
  workspace: string;
  userName: string;
  userRole: string;
}

interface WorkspaceState {
  items: WorkItem[];
  tasks: PersonalTask[];
  notes: PersonalNote[];
  projects: Project[];
  profile: WorkspaceProfile;
  teams: Team[];
  assets: ProductAsset[];
  roadmap: RoadmapNode[];
  releases: ProductRelease[];
  diagrams: WorkDiagram[];
  sprints: Sprint[];
  openQuestions?: OpenQuestion[];
  acceptanceTemplates?: AcceptanceTemplate[];
  risks?: ProductRisk[];
  dailyPlans?: DailyPlan[];
  weeklySummaryNotes?: Record<string, string>;
  handoverNotes?: Record<string, string>;
}

interface ImportedAttachment extends AttachmentInfo {
  storedName: string;
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

interface DesktopBridge {
  pickAttachments(): Promise<ImportedAttachment[]>;
  importDroppedFiles(files: File[]): Promise<ImportedAttachment[]>;
  parseDroppedEmail(files: File[]): Promise<ParsedDroppedEmail>;
  importSelectedEmailAttachments(token: string, selectedIds: string[]): Promise<ImportedAttachment[]>;
  openAttachment(storedName: string): Promise<string>;
  previewAttachment(storedName: string): Promise<{ mimeType: string; dataUrl: string } | null>;
  removeAttachment(storedName: string): Promise<boolean>;
  exportWorkspaceBackup(workspace: unknown, format: "rota" | "json"): Promise<{ path: string; attachmentCount: number } | null>;
  exportBacklogExcel(sheets: ExcelExportSheet[]): Promise<string | null>;
  stageWorkspaceRestore(): Promise<{ token: string; workspace: unknown; attachmentCount: number } | null>;
  commitWorkspaceRestore(token: string): Promise<void>;
  cancelWorkspaceRestore(token: string): Promise<void>;
}
