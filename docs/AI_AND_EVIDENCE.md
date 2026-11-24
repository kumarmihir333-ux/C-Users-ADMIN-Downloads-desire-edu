# Tulu and evidence policy

## What Tulu can do

Tulu is a page guide for the local college directory. It has two modes:

- On a static host without `/api/tulu`, a local keyword search can find record names, locations and listed program text and explain the dataset's limitations.
- On Netlify, `netlify/functions/tulu.mjs` sends the visitor's current question and the server-loaded local dataset to Gemini. It does not send conversation history. Returned source IDs are checked against the dataset; the browser renders links using stored record names and website fields.

The Gemini integration uses Google's `generateContent` REST endpoint. Its key must be set as the Netlify environment variable `GEMINI_API_KEY`, never embedded in client code or committed. The optional `GEMINI_MODEL` variable overrides the default `gemini-2.5-flash`.

## Evidence boundaries

All 28 current records are unverified seed data. Their linked websites are candidate links, not confirmed official or current sources. Tulu must label those links unverified and must not present listed program text as confirmed course availability.

The page has no verified fees, scholarships, eligibility rules, admission dates, recognition, rankings or placement outcomes. Tulu should say the page does not verify those facts instead of filling them from model knowledge. A model answer is not evidence and never changes a record's verification status.

The endpoint asks Gemini for JSON containing an answer and source record IDs. It discards IDs that do not exist in the server-loaded dataset and constructs links from stored records rather than accepting generated URLs. This reduces unsupported citations; it cannot guarantee every generated sentence is correct. Treat Tulu as a navigation aid, not admissions advice.

## Privacy and deployment

Without the live endpoint, questions remain in the browser. With Netlify configured, each submitted question is sent to Google Gemini; this app does not persist prompts or send previous turns. The interface tells visitors not to enter personal or sensitive details. Do not collect student rosters, grades or private education records. Review Google's current API terms and privacy settings before public launch.

The function limits a question to 1,200 characters and applies a best-effort per-IP limit of 20 requests per minute per warm function instance. This in-memory throttle is not a global abuse or cost-control system. Before broad public promotion, add robust platform-level rate limits, budget alerts and monitoring appropriate to the deployment.

## Future improvements

- Verify facts against institution-published evidence before describing them as verified.
- Add structured source metadata per field and render citations near each claim.
- Evaluate unsupported questions, conflicting sources, prompt injection, stale facts and answer citations before production use.
- Add human review for time-sensitive admissions, recognition, fees and eligibility facts.
