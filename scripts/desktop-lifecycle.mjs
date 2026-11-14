// Defer disposal until the native event pump has returned from its callback.
export function installDesktopShutdown(app, assetServer, mainWindow, beforeExit = () => {}) {
  let closing = false;
  const shutdown = () => {
    if (closing) return;
    closing = true;
    setImmediate(() => {
      try { beforeExit(); } catch (error) { console.error("Kapanışta çalışma alanı yazılamadı:", error); }
      app.stop();
      try {
        app.exit();
      } finally {
        assetServer.close();
        assetServer.closeAllConnections();
      }
    });
  };
  app.on("application-close-requested", shutdown);
  mainWindow.on("close", shutdown);
}
