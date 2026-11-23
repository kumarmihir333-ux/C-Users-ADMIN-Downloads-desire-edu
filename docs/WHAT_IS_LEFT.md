# What remains to build

Status: **prototype**. The UI and data plumbing are present; this is not yet an operational counselling service or a verified college guide.

## Done

- Responsive static landing page and mobile navigation.
- Search/filter UI for 28 supplied records.
- Clear data provenance and unverified status in the dataset.
- No AI calls, backend, or data submission.
- Frontend-only enquiry form preview.

## Build next (priority order)

### P0 — Verify the directory

- Review every institution name, category, location, listed website and program against current institution sources.
- Add evidence URLs and per-record verification dates; flag unavailable or conflicting details.
- Confirm that all 28 entries belong in the stated Dehradun-area scope and correct the group labels.
- Add a source change/review log so future updates are auditable.

### P1 — Make college comparisons useful

- Normalize programs into individual course records (level, duration, campus, eligibility and accepted exams).
- Add sourced, session-specific tuition, hostel, transport and scholarship values; distinguish annual, semester and one-time costs.
- Build filters for budget, program, public/private category, entrance exam, location and hostel.
- State clearly when a result is a keyword match versus a rule-based eligibility match.

### P1 — Connect real enquiries safely

- Choose a real submission destination (email/CRM/database) and implement a server endpoint.
- Define consent copy, purpose limitation, retention/deletion schedule, access controls, encryption and spam protection.
- Validate form inputs on the server and show real success/failure only after confirmed delivery.
- Add a privacy notice and a team process for responding to enquiries.

### P2 — Add grounded AI only if needed

- Choose a model/provider and decide whether student data may leave the user's device.
- Implement retrieval from verified records, source citations, strict schema validation and a “no evidence, no claim” fallback.
- Build a test/evaluation set for unsupported questions, stale facts, conflicting sources, fees and eligibility.
- Add human review and audit logs before showing advice to students.

### P2 — Data maintenance

- Build a source registry and admin review queue.
- Automate polite checks of approved public pages/documents, with rate limits and change diffs.
- Use OCR only for scanned public documents, store the document/page citation, and review low-confidence values.
- Never auto-publish scraped or model-extracted changes without a verification step.

### P3 — Production readiness

- Replace reference-hosted media with licensed local assets and configure final brand/contact details.
- Add accessibility and browser/device review, automated lint/build checks, and deployment preview checks.
- Configure a custom domain, HTTPS, content security policy, uptime monitoring and backups if a backend is introduced.

## Not yet included

There are no verified fees, scholarship details, admission deadlines, eligibility calculations, live scraping, AI counsellor, real counsellor, user accounts, persistent database, or delivered enquiry form.
