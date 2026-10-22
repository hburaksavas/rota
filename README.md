# Rota

Rota is a Windows desktop workspace for product owners working on banking software. The UI is local HTML/CSS/TypeScript, hosted in a .NET 10 WPF window with Microsoft Edge WebView2. Electron is no longer a project dependency, so `npm install` does not download `electron.exe`.

## Run on Windows

Install Node.js, the .NET 10 SDK, and the Microsoft Edge WebView2 Runtime, then run:

```powershell
npm install
npm start
```

`npm start` builds the existing renderer and opens the WPF desktop host. The WebView2 profile and attachment files live under `%APPDATA%/rota-po`.

## Publish for Windows

```powershell
npm install
npm run build:desktop
```

The self-contained x64 publish is written to `Rota.Desktop/bin/Release/net10.0-windows/win-x64/publish`. It includes the .NET runtime, but still requires the Microsoft Edge WebView2 Runtime on the target PC. IT can deploy the Evergreen Runtime or approve a Fixed Version package with the app. The application package still needs institutional approval and code signing before broad distribution.

## WebView2 transition status

The .NET host implements the native file picker, attachment import/open/preview/remove, Outlook `.msg` / `.eml` parsing, backup/restore, Excel export, encrypted Jira PAT storage, Jira REST calls, and external link opening. The existing Electron local-storage workspace has not been migrated; the former profile remains untouched. Classic Outlook drag-and-drop and first-use profile migration still need verification with institutional data and policy.

## Prototype scope

- Overview, searchable backlog list and board with status, type, team and assignee filters; personal tasks and notes
- Configure the local workspace profile and manage projects; selecting a project opens its filtered backlog
- Create and manage teams and members, then assign backlog tasks to a team and one of its members
- Maintain a searchable product component inventory for screens, batches, reports, services/APIs, and integrations; link components to backlog work
- Create, edit and confirm deletion of backlog items, personal tasks and notes
- First-run workspace setup with sample or empty data, repeatable from settings
- Attach files with the native picker or by dropping supported files onto an open record
- Jira board, sprint, filter and issue workflows
- Local workspace data in the WebView2 profile and local attachment copies in the app's user-data folder
- Seeded sample data only; do not use real customer, account or card information
- Outlook message drag-and-drop needs validation against the institution's Outlook version and policy
- Jira requires a configured base URL and a user-created PAT

See [`docs/feature-takibi.md`](docs/feature-takibi.md) for the current feature plan.
