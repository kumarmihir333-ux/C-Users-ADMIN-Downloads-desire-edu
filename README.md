# desired.edu — Dehradun College Finder

A responsive, GitHub Pages–ready recreation of the public landing page at https://himalayan-campus-intelligence.lovable.app/.

## Run locally

The college directory loads from `colleges.json`, so serve the folder over HTTP instead of opening `index.html` directly. With Python installed:

```powershell
python -m http.server 8000
```

Open http://localhost:8000.

## Publish to GitHub Pages

Push this repository to GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and save. The included `.nojekyll` file supports direct static hosting.

The site uses a Google-hosted Geist font and the reference site's hosted Himalayan video/poster. Replace those references with local assets if you want the deployment to be self-contained.

The counselling forms are front-end only. They do not send or store submitted details. Connect a secure form service before using them to collect enquiries.

See [DESIGN.md](DESIGN.md) for reference details and implementation notes.
