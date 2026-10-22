(() => {
  if (!window.chrome?.webview) return;
  const pending = new Map();
  let sequence = 0;
  const encode = async (file) => {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + 0x8000, bytes.length)));
    }
    return { name: file.name, data: btoa(binary) };
  };
  const call = (command, payload) => new Promise((resolve, reject) => {
    const id = String(++sequence);
    pending.set(id, { resolve, reject });
    window.chrome.webview.postMessage(JSON.stringify({ id, command, payload }));
  });
  window.chrome.webview.addEventListener("message", (event) => {
    const message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
    const request = pending.get(String(message.id));
    if (!request) return;
    pending.delete(String(message.id));
    if (message.error) request.reject(new Error(message.error));
    else request.resolve(message.result);
  });
  const files = async (input) => Promise.all(input.map(encode));
  window.rotaDesktop = {
    pickAttachments: () => call("attachments.pick"),
    importDroppedFiles: async (input) => call("attachments.import", await files(input)),
    parseDroppedEmail: async (input) => call("email.parse", await files(input)),
    importSelectedEmailAttachments: (token, selectedIds) => call("email.importSelected", { token, selectedIds }),
    openAttachment: (storedName) => call("attachments.open", { storedName }),
    previewAttachment: (storedName) => call("attachments.preview", { storedName }),
    removeAttachment: (storedName) => call("attachments.remove", { storedName }),
    exportWorkspaceBackup: (workspace, format) => call("backup.export", { workspace, format }),
    exportBacklogExcel: (sheets) => call("backlog.exportExcel", { sheets }),
    stageWorkspaceRestore: () => call("backup.stageRestore"),
    commitWorkspaceRestore: (token) => call("backup.commitRestore", { token }),
    cancelWorkspaceRestore: (token) => call("backup.cancelRestore", { token }),
    jiraHasToken: () => call("jira.hasToken"),
    jiraSaveToken: (token) => call("jira.saveToken", { token }),
    jiraRemoveToken: () => call("jira.removeToken"),
    jiraOpenTokenPage: (baseUrl) => call("jira.openTokenPage", { baseUrl }),
    jiraOpenIssue: (baseUrl, issueKey) => call("jira.openIssue", { baseUrl, issueKey }),
    jiraListDashboards: (baseUrl) => call("jira.listDashboards", { baseUrl }),
    jiraListFilters: (baseUrl) => call("jira.listFilters", { baseUrl }),
    jiraFetchFilterIssues: (baseUrl, filterId) => call("jira.fetchFilterIssues", { baseUrl, filterId }),
    jiraListBoards: (baseUrl) => call("jira.listBoards", { baseUrl }),
    jiraListBoardProjects: (baseUrl, boardId) => call("jira.listBoardProjects", { baseUrl, boardId }),
    jiraListSprints: (baseUrl, boardId) => call("jira.listSprints", { baseUrl, boardId }),
    jiraFetchBoardIssues: (baseUrl, boardId, scope, sprintId) => call("jira.fetchBoardIssues", { baseUrl, boardId, scope, sprintId }),
    jiraListIssueTypes: (baseUrl, projectKey) => call("jira.listIssueTypes", { baseUrl, projectKey }),
    jiraCreateIssue: (baseUrl, boardId, projectKey, issueTypeId, summary, description) => call("jira.createIssue", { baseUrl, boardId, projectKey, issueTypeId, summary, description })
  };
})();
