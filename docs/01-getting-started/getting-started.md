---
sidebar_label: Getting Started
sidebar_position: 1
---

# Getting Started

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## Prerequisites

Before setting up Ekke locally, ensure the following tools are installed:

| Tool | Minimum Version | Check Command |
|------|----------------|---------------|
| Node.js | 16.19+ (18+ recommended) | `node --version` |
| npm | 8+ | `npm --version` |
| Git | Any recent | `git --version` |
| FDK CLI | Latest | `fdk --version` |

You also need a **Fynd Partner account** at [partners.fynd.com](https://partners.fynd.com).

### Install FDK CLI

```bash
npm install -g @gofynd/fdk-cli
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone <repo-url> akke-website
cd akke-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Authenticate with Fynd

```bash
fdk login
```

This opens a browser window. Authorize with your Fynd Partner account.

### 4. Initialize theme connection

If the `.fdk/` folder is missing (fresh clone or first-time setup):

```bash
fdk theme init
```

Follow the prompts to select your Partner Organization and Sales Channel.

### 5. Start the development server

```bash
npm run dev
```

This runs two concurrent processes:
- **Webpack watch mode** — rebuilds theme assets on file changes
- **Local dev server** (via nodemon) — serves the theme locally

---

## NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Watch build + local dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint code quality checks |
| `npm run publish:theme` | Deploy theme to Fynd Platform |

---

## Configuration

All runtime configuration is **injected by the Fynd Platform** — you do not manage env files for most settings.

| File | Purpose |
|------|---------|
| `config.json` | Theme metadata and feature flags |
| `pages.json` | Page route definitions |
| `assets.json` | Static asset declarations |
| `theme/sections/*.jsx` → `settings` export | CMS section schema (defines configurable fields) |

Theme settings are editable in the Fynd Platform theme editor UI. The schema is defined via `settings_schema.json` and default values live in `settings_data.json`.

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `devx_dev` | Active development; all feature PRs merge here first |
| `feature/...` | New features — branch from `devx_dev` |
| `fix/...` | Bug fixes — branch from `devx_dev` (or `main` for hotfixes) |
| `uat` | UAT / staging branch for pre-production validation |

**Workflow:**
1. Cut a `feature/` or `fix/` branch from `devx_dev`
2. Open a PR to `devx_dev`
3. After review and QA, promote `devx_dev` → `main` for release

---

## Common Issues

### `fdk` command not found
Reinstall the FDK CLI globally:
```bash
npm install -g @gofynd/fdk-cli
```

### Webpack build errors after `npm install`
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules && npm install
```

### `.fdk/` folder missing
Run `fdk theme init` and follow prompts to reconnect the theme to your sales channel.
