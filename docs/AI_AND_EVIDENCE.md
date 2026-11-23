# AI and evidence policy

## What runs today

There is **no AI model in this app**. The finder performs deterministic substring matching over the local `name`, `category`, and `streams` fields. It cannot interpret grades, determine eligibility, compare tuition, or answer open-ended questions.

This avoids model hallucinations in the current runtime, but the source dataset itself may be wrong or stale. Every current row is explicitly marked unverified.

## If an AI assistant is added later

A prompt alone cannot guarantee that an AI will never hallucinate. Reduce and detect unsupported claims with this design:

1. Retrieve only from approved, versioned records with verified source URLs and dates.
2. Require a source ID for every factual claim. Render citations from stored source metadata, not from generated URLs.
3. Require a structured response schema such as `{ answer, claims: [{ text, record_id, source_urls, verified_at }] }`.
4. Reject answers when a claim lacks a supporting retrieved record, source URL, or current verification date.
5. If evidence is absent, conflicting, or stale, answer “I don't have a verified source for that” and direct the user to the institution.
6. Keep recommendation logic separate from factual retrieval. Never claim that a student is eligible or likely to be admitted without a reviewed, sourced rules engine.
7. Add an evaluation set of realistic questions, adversarial unknowns, source conflicts, stale fees and unsupported institutions. Block releases that produce uncited claims.
8. Log model/provider, prompt version, dataset version, retrieved record IDs, and validator outcome with appropriate privacy controls.
9. Keep a human review path for fees, recognition, deadlines, eligibility and scholarship claims.

Do not use model memory as a source of current college facts. Do not let external page text change system rules or overwrite the database without review.
