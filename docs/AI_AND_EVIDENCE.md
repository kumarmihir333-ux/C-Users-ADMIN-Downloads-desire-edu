# Tullu and evidence policy

## What Tullu can do

Tullu is a page guide for the local college directory. It has two modes:

- On a static host without `/api/tullu`, a local keyword search can find record names, locations and listed program text and explain the dataset's limitations.
- On Netlify, `netlify/functions/tullu.mjs` sends the visitor's current question and the server-loaded local dataset to Gemini with Google Search grounding enabled. It does not send conversation history. Web citations come from Gemini's grounding metadata; matched directory links remain labelled unverified.

The Gemini integration uses Google's `generateContent` REST endpoint. Its key must be set as the Netlify environment variable `GEMINI_API_KEY`, never embedded in client code or committed. The optional `GEMINI_MODEL` variable overrides the default `gemini-2.5-flash`.

## Evidence boundaries

All 28 current records are unverified seed data. Their linked websites are candidate links, not confirmed official or current sources. Tullu must label those links unverified and must not present listed program text as confirmed course availability.

The page has no verified fees, scholarships, eligibility rules, admission dates, recognition, rankings or placement outcomes. Tullu should say the page does not verify those facts instead of filling them from model knowledge. A model answer is not evidence and never changes a record's verification status.

The endpoint uses Google Search grounding for live answers and accepts only HTTPS citation URLs from Gemini's grounding metadata. This cannot guarantee every generated sentence is correct. See Google's [Grounding with Google Search API](https://ai.google.dev/gemini-api/docs/google-search). Treat Tullu as a navigation aid, not admissions advice.

## Privacy and deployment

Without the live endpoint, questions remain in the browser. With Netlify configured, each submitted question is sent to Google Gemini, which may run Google Search; this app does not persist prompts or send previous turns. The interface tells visitors not to enter personal or sensitive details. Do not collect student rosters, grades or private education records. Review Google's current API terms and privacy settings before public launch.

The function limits a question to 1,200 characters and applies a best-effort per-IP limit of 20 requests per minute per warm function instance. This in-memory throttle is not a global abuse or cost-control system. Before broad public promotion, add robust platform-level rate limits, budget alerts and monitoring appropriate to the deployment.

## Future improvements

- Verify facts against institution-published evidence before describing them as verified.
- Add structured source metadata per field and render citations near each claim.
- Evaluate unsupported questions, conflicting sources, prompt injection, stale facts and answer citations before production use.
- Add human review for time-sensitive admissions, recognition, fees and eligibility facts.
