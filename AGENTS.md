# Contributor and AI assistant rules

Read `docs/ARCHITECTURE.md`, `docs/DATA_MODEL.md`, `docs/AI_AND_EVIDENCE.md`, and `docs/WHAT_IS_LEFT.md` before changing behavior or college facts.

## Evidence rules

- Never describe a record as verified unless `provenance.verification_status` is `verified`, `verified_at` is set, and `evidence_urls` contains a source that supports the claim.
- Treat every current college record as unverified seed data. `website` is a supplied link, not proof that the URL is official or current.
- Do not invent or infer fees, eligibility, admissions, scholarships, recognition, programs, rankings, employment outcomes, or counsellor availability. Store absent facts as `null` and show “Not verified” or “Unknown.”
- Distinguish a program-text match from eligibility, recommendation, or admission likelihood. The current finder performs substring matching only.
- Keep source URL and verification date attached to every future fact. Record conflicts instead of silently choosing one value.
- Use institution-published sources first. A search snippet, model answer, or another directory is a lead to verify, not evidence by itself.
- Do not collect student rosters, student contact information, grades, or other private education records.

## Product and code rules

- This prototype has no AI integration or backend. Do not add copy claiming AI, live counselling, submitted enquiries, or current/verified data unless those features are built and supported by evidence.
- The enquiry UI is a demo and must not transmit or store personal data. Implement a reviewed privacy, security, retention, and consent design before connecting a real lead system.
- Keep app modules small, browser-native, and dependency-light. Validate dataset shape and provenance before rendering. Fail closed on invalid or conflicting data.
- Render record text as text, not untrusted HTML. Use HTTPS for outbound institution links and `rel="noopener noreferrer"` for new tabs.
- Update the roadmap and documentation when behavior changes. Explain the source, date, and limitations of any new facts.
