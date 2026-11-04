/** Route WebView2 content and title-bar drops through their own native targets. */
export function installNativeFileDrop(appWindow, webview) {
  let hoveredFilePaths = [];
  const enter = (files) => { hoveredFilePaths = Array.isArray(files) ? files : []; webview.evaluateScript('window.dispatchEvent(new CustomEvent("rota-file-hover"))'); };
  const leave = () => { hoveredFilePaths = []; webview.evaluateScript('window.dispatchEvent(new CustomEvent("rota-file-hover-cancelled"))'); };
  const drop = (files) => {
    hoveredFilePaths = [];
    const quoted = JSON.stringify(files);
    webview.evaluateScript(`if(document.querySelector(".favspace") && !document.querySelector("dialog[open], #modal-root .modal")){window.rotaDesktop.createFileShortcuts(${quoted}).then(files=>window.dispatchEvent(new CustomEvent("rota-favspace-files",{detail:files}))).catch(error=>window.dispatchEvent(new CustomEvent("rota-favspace-error",{detail:String(error)})));}else window.rotaDesktop.nativeDrop(${quoted}).then(items=>{const dt=new DataTransfer();for(const item of items){const bytes=Uint8Array.from(atob(item.data),c=>c.charCodeAt(0));dt.items.add(new File([bytes],item.name));}window.dispatchEvent(new DragEvent('drop',{bubbles:true,cancelable:true,dataTransfer:dt}));}).catch(error=>window.dispatchEvent(new CustomEvent('rota-native-error',{detail:String(error)})));`);
  };
  webview.on("drag-enter", ({ paths }) => enter(paths));
  webview.on("drag-leave", leave);
  webview.on("drag-drop", ({ paths }) => drop(paths));
  // Title-bar drops still belong to the parent window.
  appWindow.on("file-hover", ({ files }) => enter(files));
  appWindow.on("file-hover-cancelled", leave);
  appWindow.on("file-drop", ({ files }) => drop(files));

  return { consumePaths() { const paths = hoveredFilePaths; hoveredFilePaths = []; return paths; } };
}
