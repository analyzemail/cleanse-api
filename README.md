<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-on-dark.png">
    <img src="assets/logo-on-light.png" alt="Analyzemail" width="360">
  </picture>
</p>

<h3 align="center">Analyzemail API</h3>

<p align="center">
  Real-time email verification, list cleansing and downloadable per-address results.
</p>

<p align="center">
  <a href="https://documentation.analyzemail.com/"><strong>API reference</strong></a> ·
  <a href="https://documentation.analyzemail.com/openapi.yaml">OpenAPI spec</a> ·
  <a href="https://analyzemail.com/account/settings/api">Get an API key</a> ·
  <a href="https://analyzemail.com/">analyzemail.com</a>
</p>

<p align="center">
  <a href="https://github.com/michaelwalkerfl/cleanse-api/actions/workflows/docs.yml"><img src="https://github.com/michaelwalkerfl/cleanse-api/actions/workflows/docs.yml/badge.svg" alt="Docs build"></a>
  <img src="https://img.shields.io/badge/OpenAPI-3.1-2fffa6?labelColor=2d2735" alt="OpenAPI 3.1">
  <img src="https://img.shields.io/badge/API-v2.0.0-cb02e0?labelColor=2d2735" alt="API v2.0.0">
</p>

---

This repository holds the public OpenAPI 3.1 specification for the Analyzemail API and the reference site served at [documentation.analyzemail.com](https://documentation.analyzemail.com/).

## Quick start

1. Create an API key in the dashboard under **[Settings > API](https://analyzemail.com/account/settings/api)**. The key is shown once, so store it somewhere safe.
2. Verify an address:

   ```bash
   curl -X POST https://analyzemail.com/api/v2/verify \
     -H "X-API-Key: am_live_..." \
     -H "Content-Type: application/json" \
     -d '{"email": "jane@example.com"}'
   ```

3. Cleanse a whole list: upload it with `POST /lists`, start a job with `POST /lists/{list_id}/jobs`, poll `GET /jobs/{job_id}` until `status` is `complete`, then download the results from `GET /results/{result_id}/download`.

The [API reference](https://documentation.analyzemail.com/) covers authentication, credits, real-time verification, rate limits, errors and pagination. It also has request examples in every major language.

## Endpoints

Base URL: `https://analyzemail.com/api/v2`

| Area | Method | Path | Purpose |
|---|---|---|---|
| Verification | `POST` | `/verify` | Verify one address in real time |
| | `GET` | `/verify/{verification_id}` | Fetch a pending or finished verification |
| Lists | `GET` | `/lists` | List uploaded lists |
| | `POST` | `/lists` | Upload a list (multipart `file`) |
| | `GET` | `/lists/{list_id}` | Get a list |
| | `DELETE` | `/lists/{list_id}` | Delete a list with its jobs, results and files |
| Jobs | `POST` | `/lists/{list_id}/jobs` | Start a cleansing job |
| | `GET` | `/jobs` | List jobs |
| | `GET` | `/jobs/{job_id}` | Get job status and progress |
| | `POST` | `/jobs/{job_id}/cancel` | Cancel a running job |
| Results | `GET` | `/results/{result_id}` | Result summary and category counts |
| | `GET` | `/results/{result_id}/download` | Download results as a zip, optionally filtered by `categories` |
| Account | `GET` | `/account` | Account profile |
| | `GET` | `/credits` | Credit balance |
| Specification | `GET` | `/openapi.json` | This specification (no key required) |

## Authentication

Send your key in the `X-API-Key` header. `Authorization: Bearer am_live_...` is also accepted. Keys are created and revoked in the dashboard.

## Working on the specification

The spec in `openapi/openapi.yaml` is copied unchanged from the API codebase (`docs/api/openapi.yaml` in the application repository), where it is contract-tested against the running code. Make changes there first, then copy the file here. Don't hand-edit it in this repo.

**Requirements:** Node.js 20 or newer.

```bash
npm install
npm test        # lint the spec with Redocly
npm run build   # lint, bundle openapi.yaml/openapi.json and assemble the site in dist/
npm start       # build and serve dist/ locally
```

| Path | Contents |
|---|---|
| `openapi/openapi.yaml` | The OpenAPI 3.1 specification |
| `redocly.yaml` | Lint rules |
| `site/index.html` | Branded reference page (Scalar) |
| `assets/` | Logos, icon and social card |
| `scripts/build.mjs` | Bundles the spec and assembles `dist/` |
| `.github/workflows/docs.yml` | Lints and builds on every push and PR; deploys `master` to GitHub Pages |

## Publishing

Every push to `master` runs the **Docs** workflow, which lints, builds and deploys `dist/` to GitHub Pages at [documentation.analyzemail.com](https://documentation.analyzemail.com/). Pull requests are linted and built, but not deployed.

The same specification is served live by the API at [`https://analyzemail.com/api/v2/openapi.json`](https://analyzemail.com/api/v2/openapi.json) and rendered at [analyzemail.com/docs/api](https://analyzemail.com/docs/api).

## License

[MIT](LICENSE)
