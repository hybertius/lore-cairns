# L.O.R.E. Cairns repository guide

## Architecture and source of truth

- The root-level Markdown files and their subdirectories are the canonical curated archive. `INDEX.md` is its navigation map; update it when adding a cairn that needs to be discoverable.
- `site/scripts/sync-archive.mjs` recursively copies root Markdown into `site/docs/archive/` before development and production builds. It regenerates that directory from scratch, maps `INDEX.md` to `archive/index.md`, and normalizes `#` in generated paths and `%23` in copied links. Never make lasting edits in `site/docs/archive/`.
- `site/docs/` contains the handwritten VitePress pages: `index.md` is the home page and `leave-a-stone.md` imports the form. VitePress configuration and the custom theme live in `site/.vitepress/`; `config.ts` defines the `/lore-cairns/` base path and `.html` URLs (`cleanUrls: false`).
- Preserve the configured base path and use route links consistent with the existing site navigation, such as `/archive/Start%20Here.html`. Archive links should remain source-relative Markdown links so the archive works both in the repository and after synchronization.
- `site/.vitepress/theme/StoneForm.vue` posts JSON directly to `VITE_STONE_SUBMISSION_ENDPOINT`; it is intentionally disabled when that public endpoint is absent. The site has no server: Formspree is an external managed review handler, while GitHub Pages serves the static build.

## Commands

Run these from `site/`. In Windows PowerShell, use `npm.cmd` if `npm` is unavailable.

```powershell
npm.cmd ci                # install the lockfile dependencies
npm.cmd run dev           # synchronize the archive and start VitePress
npm.cmd run typecheck     # type-check VitePress/Vue sources
npm.cmd run build         # synchronize, type-check, and produce .vitepress/dist
npm.cmd run preview       # serve a completed production build
```

There is no test framework, single-test command, lint script, or standalone formatter configured. `npm run build` is the full available validation. GitHub Actions uses Node.js 22, runs `npm ci` and `npm run build`, then deploys `site/.vitepress/dist` on pushes to `main`.

## Content, privacy, and publication conventions

- Preserve the archive's voice, existing aliases, relative-link style, and deliberately non-linear reading paths. Visitor cairns already in the archive are curated content, not an automated submission workflow.
- Treat every form submission and review-inbox detail as private. A submission is not publication permission; add it to the public archive only when explicit permission is clear. Never send test submissions without approval.
- `VITE_STONE_SUBMISSION_ENDPOINT` is public browser configuration; `.env.local` is for local use and ignored. Never place inbox addresses, passwords, API keys, or other credentials in `VITE_` variables, repository files, or public documentation.
- `site/CARING-FOR-THE-CAIRNS.md` is the maintainer reference for content changes, private review, local preview, and deployment checks. Generated archives, build output, and `node_modules` are ignored and must not be committed.
- `.github/workflows/deploy-site.yml` is the deployment source of truth. A successful local build, a provider-accepted submission, and inbox delivery are distinct outcomes; check the GitHub Actions deployment before reporting a live publish as successful.
