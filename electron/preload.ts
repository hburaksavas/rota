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
  cancelWorkspaceRestore: (token: string) => ipcRenderer.invoke("backup:cancel-restore", token)
});
