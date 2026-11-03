// Defer disposal until the native event pump has returned from its callback.
export function installDesktopShutdown(app, assetServer, mainWindow) {
  let closing = false;
  const shutdown = () => {
    if (closing) return;
    closing = true;
    setImmediate(() => {
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
