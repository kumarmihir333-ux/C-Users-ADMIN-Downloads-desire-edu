# Architecture

## Current runtime

The project is a static browser app. It requires no build step, server framework, model, or API. A small local HTTP server serves the files; the browser runs the UI.

```text
index.html
  ├── assets/css/styles.css
  └── assets/js/main.js
        ├── data.js ── fetch + validate ── data/colleges.json
        ├── finder.js ── deterministic text match
        ├── directory.js ── search, group filters, cards
        ├── navigation.js ── sticky nav + mobile menu
        ├── forms.js ── preview only; no network/storage
        └── tullu.js ── page-search fallback + POST /api/tullu
netlify/functions/tullu.mjs ── Gemini proxy; API key stays server-side
```

## Responsibilities

- `index.html`: semantic section order, controls, metadata, and truthful product copy.
- `assets/css/styles.css`: tokens, responsive layout, visual components, reduced-motion handling.
- `assets/js/data.js`: one data loading boundary. Validate schema, required fields, HTTPS URLs, record IDs, group labels, and provenance. If validation fails, render an error instead of guessing.
- `assets/js/finder.js`: match selected interests against `name`, `category`, and `streams`. This is keyword search, not AI or admission advice.
- `assets/js/directory.js`: render the dataset using DOM text nodes and enable search/group filters.
- `assets/js/forms.js`: show a local preview response only. It must not persist or transmit values.
- `assets/js/tullu.js`: answer page questions with local record search when no API route is available. Live questions go to same-origin `/api/tullu`; do not send student details or conversation history.
- `netlify/functions/tullu.mjs`: load the local dataset server-side, call Gemini with page-specific grounding instructions, validate model source IDs against real records, and return source links labelled unverified. It applies a best-effort per-instance request limit and a 1,200-character input cap.
- `netlify.toml`: publish static files and route `/api/tullu` to the Netlify function.
- `data/colleges_seed.json`: preserved input for audit; do not edit it to update the app.
- `data/colleges.json`: normalized data consumed by the app.
- `docs/`: shared source-of-truth for data, system boundaries, and remaining work.

## Failure behavior

Invalid JSON, duplicate IDs, missing required fields, a non-HTTPS URL, or missing provenance causes startup to stop with an explanatory message. Missing facts are never filled from model memory. Tullu uses the local fallback when its endpoint is unavailable. The app does not calculate eligibility, prices, scholarship awards, or rankings.

## External dependencies

The font is loaded from Google Fonts. The video and poster are hosted by the reference site. Live Tullu requires Netlify Functions and a server-side `GEMINI_API_KEY`; GitHub Pages provides the local fallback only. For a self-contained deployment, copy licensed assets into `assets/media/` and update their paths.
