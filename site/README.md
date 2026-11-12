# L.O.R.E. site

This VitePress site renders the repository's Markdown archive into a small
reading experience. The archive files remain the source of truth; `npm run
dev` and `npm run build` copy them into the ignored `docs/archive/` directory
before VitePress runs.

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

## Build and preview

```powershell
npm.cmd run build
npm.cmd run preview
```

## Private inbox handling

The page submits in place with `fetch`; it never opens a mail app. The form
stays disabled until `VITE_STONE_SUBMISSION_ENDPOINT` points to a real managed
form endpoint. Formspree is one suitable first option for this static site: it
accepts browser submissions and can send email notifications to a verified
recipient.

1. Create a form with the provider, set and verify the private review inbox,
   enable email notifications, and copy the form's endpoint URL.
2. Set `VITE_STONE_SUBMISSION_ENDPOINT` to that URL in the site's build
   environment. For local testing, use an ignored `site/.env.local` file.
3. Send a test stone and confirm the notification reaches the inbox. Check the
   provider dashboard and spam folder too.

The endpoint URL/form ID is public configuration, not a secret. Keep the inbox
address, passwords, and API credentials out of the repository and all `VITE_`
variables. The managed provider receives the stone and may retain a copy in
its dashboard under its own privacy policy. Pending stones are not publicly
visible, and the site only reports success after the provider accepts a
submission; that response does not guarantee instant email delivery.

See [Formspree's AJAX guide](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/)
and review its [privacy policy](https://formspree.io/legal/privacy-policy)
before enabling the form. Formspree's policy says not to use the service to
collect sensitive personal data and describes processing in the United States
and other countries. Choose another handler if that does not suit the stones
visitors may leave.

## Publish with GitHub Pages

The site is configured for this repository's project-page path,
`/lore-cairns/`, and uses `.html` page URLs for static hosting. The workflow at
`.github/workflows/deploy-site.yml` builds the site on pushes to `main` and
deploys the generated files. In the repository settings, set **Pages → Build
and deployment → Source** to **GitHub Actions**.

GitHub Pages serves the static site; there is no server for you to run.
Formspree remains the separate managed form handler. The Pages workflow sets
`VITE_STONE_SUBMISSION_ENDPOINT` to the public form URL; no Actions variable is
needed. That endpoint is visible in the built site by design, but the inbox
address, passwords, and API credentials must stay out of the repository. The
form remains disabled in local builds unless `site/.env.local` sets the
endpoint. The expected site URL is
`https://hybertius.github.io/lore-cairns/` once Pages is enabled and the
workflow has completed.
