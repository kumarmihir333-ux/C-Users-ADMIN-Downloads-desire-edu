# desired.edu — Dehradun College Finder

A lightweight Dehradun college finder with a page-aware assistant named Tulu. The directory and Tulu’s local fallback use the supplied starter dataset. The 28 records are unverified; text matches do not assess eligibility. Live Gemini answers are available when deployed with the included Netlify function and a server-side API secret.

## Run locally

From this folder, start a local web server:

```powershell
python -m http.server 8000
```

Open http://localhost:8000. The page uses JavaScript modules and fetches `data/colleges.json`, so it must be served over HTTP rather than opened as a `file://` URL. Without a deployed `/api/tulu` function, Tulu answers with local page search; this mode needs no key.

## Enable live Gemini answers

GitHub Pages only serves static files and cannot protect an API key. Deploy this repository to Netlify to use the included server function. In the Netlify site settings, add the environment variable `GEMINI_API_KEY` with a key created in [Google AI Studio](https://aistudio.google.com/app/apikey), then redeploy. Store the key only in Netlify's environment variable settings; never paste it into this project, browser code, GitHub, or chat. Optionally set `GEMINI_MODEL` to a model available to your API project; the default is `gemini-2.5-flash`.

The Netlify function sends each question and the page's local college records to Google's Gemini API. It does not send conversation history, collect contact details, or write prompts to an application database. Tulu tells visitors not to include personal or sensitive details. With Gemini enabled, questions are sent to Google to generate an answer.

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
assets/js/tulu.js          Tulu chat and local page-search fallback
netlify/functions/tulu.mjs Server-side Gemini request and source-link validation
netlify.toml               Netlify publish settings and API route
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

The static site can be hosted with GitHub Pages (**Settings → Pages → Deploy from a branch**, `main`, `/ (root)`); Tulu then uses local page search. For live Gemini responses, deploy to Netlify so its server function can keep the API key private. The `.nojekyll` file is included. Google fonts and the background video/poster load from external hosts.
