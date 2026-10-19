import { contextBridge, ipcRenderer, webUtils } from "electron";

contextBridge.exposeInMainWorld("rotaDesktop", {
  pickAttachments: () => ipcRenderer.invoke("attachments:pick"),
  importDroppedFiles: (files: File[]) => {
    const paths = files
      .map((file) => webUtils.getPathForFile(file))
      .filter((filePath) => filePath.length > 0);
    return ipcRenderer.invoke("attachments:import-dropped", paths);
  },
  parseDroppedEmail: (files: File[]) => {
    const paths = files
      .map((file) => webUtils.getPathForFile(file))
      .filter((filePath) => filePath.length > 0);
    return ipcRenderer.invoke("email:parse-dropped", paths);
  },
  importSelectedEmailAttachments: (token: string, selectedIds: string[]) => ipcRenderer.invoke("email:import-selected-attachments", token, selectedIds),
  openAttachment: (storedName: string) => ipcRenderer.invoke("attachments:open", storedName),
  previewAttachment: (storedName: string) => ipcRenderer.invoke("attachments:preview", storedName),
  removeAttachment: (storedName: string) => ipcRenderer.invoke("attachments:remove", storedName),
  exportWorkspaceBackup: (workspace: unknown, format: "rota" | "json") => ipcRenderer.invoke("backup:export", workspace, format),
  exportBacklogExcel: (sheets: unknown[]) => ipcRenderer.invoke("backlog:export-excel", sheets),
  stageWorkspaceRestore: () => ipcRenderer.invoke("backup:stage-restore"),
  commitWorkspaceRestore: (token: string) => ipcRenderer.invoke("backup:commit-restore", token),
  cancelWorkspaceRestore: (token: string) => ipcRenderer.invoke("backup:cancel-restore", token),
  jiraHasToken: () => ipcRenderer.invoke("jira:has-token"),
  jiraSaveToken: (token: string) => ipcRenderer.invoke("jira:save-token", token),
  jiraRemoveToken: () => ipcRenderer.invoke("jira:remove-token"),
  jiraOpenTokenPage: (baseUrl: string) => ipcRenderer.invoke("jira:open-token-page", baseUrl),
  jiraOpenIssue: (baseUrl: string, issueKey: string) => ipcRenderer.invoke("jira:open-issue", baseUrl, issueKey),
  jiraListDashboards: (baseUrl: string) => ipcRenderer.invoke("jira:list-dashboards", baseUrl),
  jiraListFilters: (baseUrl: string) => ipcRenderer.invoke("jira:list-filters", baseUrl),
  jiraFetchFilterIssues: (baseUrl: string, filterId: string) => ipcRenderer.invoke("jira:fetch-filter-issues", baseUrl, filterId),
  jiraListBoards: (baseUrl: string) => ipcRenderer.invoke("jira:list-boards", baseUrl),
  jiraListBoardProjects: (baseUrl: string, boardId: string) => ipcRenderer.invoke("jira:list-board-projects", baseUrl, boardId),
  jiraListSprints: (baseUrl: string, boardId: string) => ipcRenderer.invoke("jira:list-sprints", baseUrl, boardId),
  jiraFetchBoardIssues: (baseUrl: string, boardId: string, scope: "backlog" | "board" | "sprint", sprintId?: string) => ipcRenderer.invoke("jira:fetch-board-issues", baseUrl, boardId, scope, sprintId),
  jiraListIssueTypes: (baseUrl: string, projectKey: string) => ipcRenderer.invoke("jira:list-issue-types", baseUrl, projectKey),
  jiraCreateIssue: (baseUrl: string, boardId: string, projectKey: string, issueTypeId: string, summary: string, description: string) => ipcRenderer.invoke("jira:create-issue", baseUrl, boardId, projectKey, issueTypeId, summary, description)
});
