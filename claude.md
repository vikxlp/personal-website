# Claude Code Context — vikalpgupta.com

Personal website of Vikalp Gupta, a digital product designer. Hugo + Netlify + Cloudflare.

Live: <https://vikalpgupta.com/>

---

## Design Principles

- **Lightweight & fast** — Total build output ~100K. High Lighthouse scores (85+) are a hard requirement.
- **Progressive enhancement** — Core content works without JS. JS enhances only (e.g., ToC).
- **Semantic HTML5** — Proper heading hierarchy, landmarks, meta tags for SEO and social sharing.
- **Mobile-first** — Base styles work everywhere; 768px breakpoint for desktop.
- **Minimal by design** — Every byte must earn its place. SVG preferred for graphics.

---

## Working Rules

- **CSS stays in CSS** — Styling changes: `static/css/style.css` only.
- **Act, don't suggest** — Use CLI tools directly. Standard dev tooling assumed.
- **Verify visuals** — After CSS/layout changes, screenshot via Chrome DevTools MCP.
- **Verify builds** — After any site file changes, run `hugo --gc --minify`.
- **Check before starting servers** — `lsof -i :1313` (Hugo); `mcp__chrome-devtools__list_pages` (Chrome). Reuse existing instances.
- **Commit message after plan** — Suggest imperative-mood commit after successful plan execution.

---

## Tech Stack

| Layer | Tool |
| --- | --- |
| Generator | Hugo 0.139.3 |
| Hosting | Netlify |
| CDN/DNS | Cloudflare |
| CSS | Vanilla CSS (variables, no preprocessor) |
| JavaScript | Vanilla JS |
| Fonts | Sora, Newsreader (Google Fonts) |

---

## Key Files

| File | Description |
| --- | --- |
| `CLAUDE.md` | Agent + human context — you are here |
| `README.md` | Human-readable project overview |
| `.docs/infrastructure.md` | Hosting, DNS, CDN, Netlify/Cloudflare setup, request flow |
| `.docs/postcards.md` | Postcards feature: content model, RSS, Buttondown, workflow |
| `.docs/components.md` | Hugo partials: post-card, link-buttons, meta, post-meta — usage and params |
| `.docs/toc.md` | Table of Contents JS component: behaviour, loading, CSS classes |
| `hugo.toml` | Hugo config: baseURL, menu, socialLinks params |
| `netlify.toml` | Build command, headers, redirects, deploy previews |
| `static/css/style.css` | All styles (~8K). Variables, components, responsive breakpoints |
| `static/js/toc.js` | Table of Contents component (~3.5K). Blog singles only |
| `layouts/_default/baseof.html` | Base HTML: head, meta, font loading, footer toggle, TOC conditional |
| `layouts/postcards/` | Postcards-specific layouts and custom RSS feed template |
| `layouts/resume/single.html` | Resume page; footer suppressed via `type: resume` in front matter |
| `archetypes/postcards.md` | Postcard front matter template |
| `new-postcard.sh` | Auto-numbers and creates new postcards |
| `content/_future_pages/` | Draft future sections (Photography, Gear) — excluded from build |

---

## Project Structure

```text
├── archetypes/           # Hugo content templates (blog.md, postcards.md)
├── content/
│   ├── _index.md         # Home page content
│   ├── resume.md         # CV page (type: resume → footer hidden)
│   ├── blog/*.md         # Blog posts
│   ├── postcards/*.md    # Postcards (N-YYYY-MM-DD.md)
│   └── _future_pages/    # Draft future sections (excluded from build)
├── layouts/
│   ├── index.html        # Home page template
│   ├── _default/         # baseof.html, single.html, list.html
│   ├── postcards/        # list.html, single.html, rss.xml
│   ├── resume/           # single.html
│   └── partials/         # header, footer, post-card, link-buttons, meta, post-meta
├── static/
│   ├── css/style.css     # All styles
│   ├── js/toc.js         # Table of Contents component
│   └── images/           # mark.svg, og-image.png, profile.png, postcards/
├── hugo.toml             # Hugo config
├── netlify.toml          # Build, deploy, headers, redirects
└── new-postcard.sh       # Postcard creation script
```

---

## CSS Quick Reference

**Colors**

- `--color-text-primary: #293A41` — headings, links
- `--color-text-secondary: #4D646D` — body text
- `--color-text-tertiary: #889FA9` — nav, timestamps, muted
- `--color-bg: #fcfeff` — page background
- `--color-bg-card: rgba(136,159,169,0.08)` — hover/card tint

**Typography** (base 16px): `--text-h1` 40px · `--text-h2` 32px · `--text-h3` 24px · `--text-body` 18px · `--text-md` 16px · `--text-sm` 14px · `--text-toc` 12px. Mobile overrides: h1→32px, h3→20px.

**Layout:** `--max-width: 640px` · `--spacing: 3rem` · fonts: `--font-sans` (Sora), `--font-serif` (Newsreader)

**Naming:** Component-scoped BEM-adjacent — `site-header`, `post-preview`, `toc-container`, `social-links`.

---

## Common Tasks

```bash
hugo server -D                # local dev (includes drafts)
hugo new blog/slug.md         # new blog post
bash new-postcard.sh          # new postcard (auto-numbers)
hugo --gc --minify            # production build
```

**Lighthouse check** (run before pushing):

```bash
hugo --gc --minify && npx lighthouse http://localhost:1313 \
  --chrome-flags="--headless --no-sandbox" --output=json --quiet | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const cats = data.categories;
Object.keys(cats).forEach(k => {
  const score = Math.round(cats[k].score * 100);
  console.log((score >= 85 ? 'PASS' : 'FAIL') + '  ' + cats[k].title + ': ' + score);
});
process.exit(Object.values(cats).every(c => c.score * 100 >= 85) ? 0 : 1);
"
```

---

## Performance Constraints

1. No new external fonts — use Sora + Newsreader only
2. Lazy-load all images — `loading="lazy"` attribute
3. CSS under 15K uncompressed
4. JS is optional — site must work fully without it
5. No render-blocking resources — defer/async JS, preconnect fonts
6. Prefer SVG for icons and graphics
7. Run Lighthouse (85+ all categories) before pushing

---

## Git & Deploy

- Commit messages: imperative mood, concise (e.g., "Add postcard 2")
- Push `main` → Netlify auto-builds and deploys
- Deploy previews: Netlify builds on PRs with `--buildFuture` flag

---

## Workspace

Git worktrees — sibling folders under `Personal Website/`:

```text
Personal Website/
├── WORKSPACE.md              # full workspace guide
├── main/                     # production (you are here)
└── feature-*/                # feature branches
```

Do NOT create worktrees/branches proactively. See `../WORKSPACE.md`.
