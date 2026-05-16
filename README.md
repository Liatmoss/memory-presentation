# memory-presentation

Static React presentation deck for a 10–15 minute internal talk on GHCP Chat + GHCP CLI best practices.

Core message used throughout the slides:

- Fresh context, better results
- One session = one task
- If the task changes, start a new session
- Use the AI like a focused workspace, not a long-lived memory dump

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages deployment (project site)

This repository is configured as a **GitHub Pages project site** and deploys with GitHub Actions via `.github/workflows/deploy-pages.yml`.

### One-time repository setup

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` or `master` (or run the workflow manually) to deploy.

The Vite base path is automatically set to `/memory-presentation/` on GitHub Actions, so the site is served correctly as a project page.

Expected URL:

- `https://liatmoss.github.io/memory-presentation/`

You can then link this project site from `Liatmoss/liatmoss.github.io`.
