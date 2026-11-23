# desired.edu — Dehradun College Finder

A small static-site prototype for exploring a starter list of Dehradun institutions. It has no AI model, backend, or API integration. Program matching is deterministic text search against the local data file; it is not an eligibility recommendation.

## Run locally

From this folder, start a local web server:

```powershell
python -m http.server 8000
```

Open http://localhost:8000. The page uses JavaScript modules and fetches `data/colleges.json`, so it must be served over HTTP rather than opened as a `file://` URL.

## Project map

```text
index.html                 Page structure and copy
assets/css/styles.css      Design tokens, layout, and responsive styles
assets/js/main.js          Startup and module wiring
assets/js/data.js          Dataset loading and fail-closed validation
assets/js/finder.js        Deterministic stream matching
assets/js/directory.js     Directory filters and card rendering
assets/js/navigation.js    Header and mobile menu behavior
assets/js/forms.js         Front-end-only enquiry preview
data/colleges.json         App dataset with provenance and verification state
data/colleges_seed.json    Preserved input records for audit
docs/                      Architecture, data policy, and build roadmap
AGENTS.md                  Rules for AI coding assistants and contributors
```

## Data truth rules

- The current 28 records are an unverified starter dataset. Check `verification_status` before presenting facts.
- `website` is copied from the supplied seed file; it has not been confirmed as the institution's current official website.
- Missing facts stay unknown. Do not infer fees, eligibility, admissions, scholarships, recognition, or program availability.
- The app labels links unverified and tells visitors to confirm information with the institution.
- The forms do not save or send entered values. Use sample details only.

Read [the data model](docs/DATA_MODEL.md), [architecture](docs/ARCHITECTURE.md), [AI and evidence rules](docs/AI_AND_EVIDENCE.md), and [build roadmap](docs/WHAT_IS_LEFT.md) before expanding the project.

## GitHub Pages

This repo can be hosted as static files. In GitHub, choose **Settings → Pages → Deploy from a branch**, then select `main` and `/ (root)`. The `.nojekyll` file is included. The Google fonts and background video/poster currently load from external hosts.
