# Caring for the Cairns

A few loose guideposts for keeping this place welcoming and navigable. Nothing
here needs to become a rigid process.

## For you

- **Add or edit a cairn:** Change the original Markdown file in the repository,
  outside `site/`. If it needs a place on the map, update
  [INDEX.md](../INDEX.md). The site copies the archive during its build; don't
  edit `site/docs/archive/` directly.
- **Change the site:** The welcome page is [docs/index.md](docs/index.md), and
  the invitation is [docs/leave-a-stone.md](docs/leave-a-stone.md). The form
  itself lives in [.vitepress/theme/StoneForm.vue](.vitepress/theme/StoneForm.vue).
- **See it locally:** In a terminal, move into `site`, then run `npm.cmd run dev`.
  If dependencies haven't been installed yet, run `npm.cmd ci` first. The
  terminal will show the local address. Press Ctrl+C to stop the server.
- **Publish changes:** Review and stage the intended source files, commit, and
  push to `main`. GitHub Actions builds and deploys automatically. Check the
  **Actions** tab for a green run, then visit the site. Generated archive
  copies, build output, and `node_modules` are ignored; don't commit them.
- **Review a stone:** Read it privately in Formspree or the notification inbox.
  Nothing is published automatically. Only add an accepted stone to the
  archive when publication permission is clear; if it isn't, do not publish
  until permission is confirmed. No email address is required by the form, so
  there may not be a way to contact its author. Avoid exposing private or
  sensitive details.
- **If something goes wrong:** Check the failed step and its log in **Actions**.
  Pages should use **GitHub Actions** as its source. For form delivery, check
  Formspree's submissions, notification settings, the inbox, and spam folder.
  Acceptance by Formspree doesn't by itself prove an email arrived.

## For a future assistant

- Start by listening to what the user wants and inspecting the current state;
  don't assume the site, provider settings, or deployment still match today.
- Preserve the archive's voice, existing aliases, privacy, and manual review.
  A submitted stone is not permission to publish it. Never send test
  submissions without the user's approval.
- The source of truth is the repository's Markdown. The sync script rebuilds
  `site/docs/archive/` and makes route-safe copies; generated files are not the
  place to make lasting edits.
- GitHub Pages hosts the static site at the `/lore-cairns/` base path.
  Formspree is a separate managed handler; the public endpoint is set in
  [.github/workflows/deploy-site.yml](../.github/workflows/deploy-site.yml).
  Never put credentials or private inbox details in public files or `VITE_`
  variables.
- Before changing things, check the working tree and preserve unrelated work.
  For site changes, run `npm.cmd run build` from `site`, then check relevant
  pages and the deployment. Distinguish a local build, a live deployment, a
  provider accepting a stone, and an email actually reaching the inbox.
- This guide is in the public repository if committed. Keep private submissions,
  credentials, and personal details out of it.
