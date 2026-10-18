# Rota

Rota is a TypeScript and Electron desktop prototype for a product owner's banking-software workspace. The renderer is local HTML/CSS/TypeScript, with native file operations isolated in Electron's main process and a narrow preload bridge.

## Run on Windows

Install Node.js, then run:

```powershell
npm install
npm start
```

`npm start` compiles the TypeScript renderer and Electron processes before opening the desktop app.

## Build the Windows installer

```powershell
npm install
npm run package:win
```

The x64 NSIS installer is written to `release/unsigned/Rota-Setup-<version>-x64.exe`. It bundles Electron, installs per-user, and does not require Node.js on the target PC. The workspace remains under the stable `%APPDATA%/rota-po` directory and is preserved when the app is uninstalled. The current package is unsigned and intended for internal evaluation; organization code signing and security review are still required before distribution.

To build a signed release with update checks, configure `ROTA_UPDATE_URL` to the organization's HTTPS generic feed and `ROTA_PUBLISHER_NAME` to the exact Windows certificate publisher subject. Provide a certificate using `WIN_CSC_LINK` or `CSC_LINK` (and `WIN_CSC_KEY_PASSWORD` if needed), or use the Windows certificate store with `ROTA_CERTIFICATE_SUBJECT_NAME` or `ROTA_CERTIFICATE_SHA1`. Keep certificate files and passwords out of the repository. Update checks are omitted from unsigned evaluation packages. Packaged releases ask before downloading or restarting, and Windows Authenticode publisher verification remains enabled.

## Prototype scope

- Overview, searchable backlog list and board with status, type, team and assignee filters; personal tasks and notes
- Configure the local workspace profile and manage projects; selecting a project opens its filtered backlog
- Create and manage teams and members, then assign backlog tasks to a team and one of its members
- Maintain a searchable product component inventory for screens, batches, reports, services/APIs, and integrations; link components to backlog work
- Create, edit and confirm deletion of backlog items, personal tasks and notes
- First-run workspace setup with sample or empty data, repeatable from settings
- Attach files with the native picker or by dropping supported files onto an open record
- Local workspace data in Electron storage and local attachment copies in the app's user-data folder
- Seeded sample data only; do not use real customer, account or card information
- Outlook message drag-and-drop needs validation against the institution's Outlook version and policy
- Jira integration is out of the first-release scope

See [`docs/tamamlanan-featurelar.md`](docs/tamamlanan-featurelar.md) for implemented features and current prototype limitations.
See [`docs/bekleyen-featurelar.md`](docs/bekleyen-featurelar.md) for the next phase, proposed product functionality, deferred candidates, and the maintenance rules for these two feature documents.
