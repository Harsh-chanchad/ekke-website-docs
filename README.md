# Ekke Docs

Documentation for **Ekke** — a white-label, fully customizable e-commerce frontend built on the Fynd Commerce Platform (FDK React Theme "Zion").

## Quick Start

```bash
cd website
npm install
npm start
```

Opens at http://localhost:3000 → redirects to `/docs/overview/overview`

## Scripts

From repo root:

| Command | Description |
|---------|-------------|
| `npm run docs:dev` | Start local dev server (hot reload) |
| `npm run docs:build` | Build production docs |
| `npm run docs:serve` | Serve the production build locally |

From `website/`:

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run serve` | Serve built output |

## Structure

```
akke-docs/
├── docs/                          # Source-of-truth documentation (Markdown)
│   ├── 00-overview/               # Project overview & tech stack
│   ├── 01-getting-started/        # Setup guide & prerequisites
│   ├── 02-architecture/           # System design & data flow
│   ├── 03-reference/              # Sections, pages, components, hooks, queries
│   ├── 04-how-to/                 # Task-based runbooks
│   ├── 05-operations/             # CI/CD, deployment, rollback
│   ├── 06-decisions/              # Architecture Decision Records (ADRs)
│   ├── 07-quality/                # Code quality & QA standards
│   ├── 08-contributing/           # Branching, commits, code style
│   ├── 09-theme/                  # Design system & styling guide
│   └── 10-business-requirement/   # Product scope & user stories
├── website/                       # Docusaurus site
│   ├── docusaurus.config.ts       # Site config (title, nav, footer)
│   ├── sidebars.ts                # Sidebar structure
│   ├── src/css/custom.css         # Brand styling overrides
│   └── src/pages/index.tsx        # Root → redirects to /docs
├── vercel.json                    # Vercel deployment config (Mode A)
└── package.json                   # Root scripts (docs:dev, docs:build, docs:serve)
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the `akke-docs` repository
4. **Framework:** leave as "Other" (not Docusaurus — `vercel.json` handles it)
5. Leave Root Directory blank (build runs from repo root via `vercel.json`)
6. Click **Deploy**

The `vercel.json` at the root handles everything:
```json
{
  "installCommand": "npm ci --prefix website",
  "buildCommand": "npm --prefix website run build",
  "outputDirectory": "website/build"
}
```

## Before deploying

Update `url` in `website/docusaurus.config.ts`:
```ts
url: "https://your-actual-vercel-url.vercel.app",
```

## Adding docs

1. Edit or add `.md` files in the relevant `docs/XX-section/` folder
2. If adding a new file, register it in `website/sidebars.ts`
3. Run `npm run docs:dev` to preview
