# Data model and verification workflow

## Dataset envelope

`data/colleges.json` contains a versioned envelope:

- `schema_version`: data format version expected by the browser.
- `dataset_id`: stable dataset identifier.
- `updated_at`: date the local dataset file was prepared; this is **not** a claim that facts were checked that day.
- `verification_status`: overall state, currently `unverified_seed`.
- `source_file`: preserved input file.
- `notes`: limitation statement.
- `records`: array consumed by the app.

## Record fields

| Field | Meaning | Current limitation |
|---|---|---|
| `id` | Stable local record ID | Local ordering only; not an official identifier |
| `name` | Institution name from the supplied seed | Not checked against current official source |
| `category` | Category text from the supplied seed | May be outdated or inconsistently categorized |
| `location` | Location text from the supplied seed | Not verified |
| `streams` | Comma-separated program/subject text | Not a complete course catalogue or eligibility rule |
| `website` | URL listed in the supplied seed | Candidate link; not confirmed current or official |
| `provenance.source_record` | Pointer into the preserved seed file | Audit pointer, not an external citation |
| `provenance.listed_website_unverified` | Original website value | Must be checked before calling it official |
| `provenance.verification_status` | `unverified`, `verified`, `conflict`, or `needs_review` | All current rows are unverified |
| `provenance.verified_at` | ISO date of human review | `null` until actually verified |
| `provenance.evidence_urls` | URLs supporting the checked fields | Empty until sources are checked |
| `provenance.directory_group` | `private_deemed` or `other` UI bucket | Grouping comes from the seed category and should be reviewed |

## Updating a fact

1. Open the linked institution source and verify the specific field on an official page or document.
2. Add that page/document URL to `evidence_urls`; set `verification_status` and `verified_at` only after checking it.
3. If the institution's pages conflict, use `conflict` and describe both source URLs in a note. Do not silently choose one.
4. Leave unavailable values `null` or absent according to the schema. Do not estimate.
5. Update the relevant data dictionary or source register and have a second person review material admission or fee information.

For future fees, scholarships, admissions, and courses, add typed fields rather than adding facts to a general prose string. Store academic session, currency, source URL, verification date, and applicable course/campus with each time-sensitive value.
