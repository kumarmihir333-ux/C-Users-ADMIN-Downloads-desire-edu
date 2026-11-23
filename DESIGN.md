# desired.edu design notes

## Reference

- Page: https://himalayan-campus-intelligence.lovable.app/
- Captured 2026-11-23 with Firecrawl (`statusCode: 200`).
- Main-page structure and DOM were inspected. Firecrawl returned a screenshot URL, but the image itself was not available to inspect in this environment; spacing and imagery treatment below are implementation estimates from the rendered DOM and page content.

## Observed visual system

- Dark cinematic canvas with a full-viewport Himalayan video, poster fallback, radial amber glow, black vignette, and subtle grain.
- Branding in page metadata: `desired.edu`; small mountain line icon.
- Main colors reported by the reference: background `#040711`, foreground `#ECF3F8`, amber accent/link `#F69E0B`, muted secondary `#97A7B7`.
- Geist is reported on the reference. This version uses DM Sans for more natural body and interface text, with an italic Cormorant Garamond accent for editorial contrast.
- Fixed, centered pill navigation; translucent glass surfaces, fine light borders, rounded controls.
- Content order confirmed by route and page: hero, statement, finder, college directory, how-it-works, inquiry, closing CTA, counselling modal.
- Reference advertises 28 campuses and splits the list into 18 private/deemed universities and 10 government/autonomous colleges. The supplied local dataset's remaining 10 records include several mixed categories, so the replica labels that bucket “other institutions” rather than repeating the unsupported government-only label.

## Implementation notes

- Plain HTML/CSS/JavaScript to make the site deployable as static files without Node or a build step. Browser behavior is split into small ES modules under `assets/js/`.
- Responsive layout adapts to small screens; the mobile menu and modal are interactive.
- College data is loaded from `colleges.json`, based on the local 28-college dataset supplied in the workspace.
- The reference's Himalayan video and poster are remote assets hosted by the original site, so this replica currently uses those URLs. Download locally or replace them if you control the assets and need the replica to remain independent of the reference host.
- The inquiry form is only a front-end preview and intentionally does not transmit student details. Connect a secure form endpoint before publishing it for real enquiries.
- Colors are source-reported; mountain visibility, responsive breakpoints, gaps, and card sizing are implementation choices rather than extracted CSS values.
