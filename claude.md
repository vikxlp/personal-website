# Claude Code Context — vikalpgupta.com

Personal website of Vikalp Gupta, a digital product designer. Built with Hugo, deployed on Netlify, served through Cloudflare.

Live: https://vikalpgupta.com/

---

## Design Principles

- **Lightweight & fast** — Total build output ~100K. Minimal, necessary, and light frameworks only when justified. High Lighthouse scores are a hard requirement.
- **Progressive enhancement** — Core content works without JavaScript. JS only enhances (e.g., Table of Contents).
- **Semantic HTML5** — Proper heading hierarchy, landmarks, meta tags for SEO and social sharing.
- **Mobile-first responsive** — Base styles work everywhere; 768px breakpoint for desktop enhancements.
- **Minimal by design** — Every byte must earn its place. No unnecessary dependencies, fonts kept minimal, SVG preferred for graphics.

---

## Tech Stack

| Layer       | Tool                  |
|-------------|-----------------------|
| Generator   | Hugo 0.139.3          |
| Hosting     | Netlify               |
| CDN/DNS     | Cloudflare            |
| CSS         | Vanilla CSS (variables, no preprocessor) |
| JavaScript  | Vanilla JS (light frameworks when justified) |
| Fonts       | Google Fonts (Sora, Newsreader)          |

---

## Project Structure

```
├── archetypes/blog.md        # Template for new blog posts
├── content/
│   ├── _index.md             # Home page content
│   └── blog/
│       ├── _index.md         # Blog listing page
│       └── *.md              # Individual blog posts
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       # Base template (head, meta, scripts)
│   │   ├── single.html       # Single post/page template
│   │   └── list.html         # Section listing template
│   ├── index.html            # Home page template
│   └── partials/
│       ├── header.html       # Site header & navigation
│       └── footer.html       # Site footer
├── static/
│   ├── css/style.css         # All styles (~8K)
│   ├── js/toc.js             # Table of Contents component (~3.5K)
│   └── images/
│       ├── mark.svg          # Logo/favicon
│       └── og-image.png      # Social sharing image
├── hugo.toml                 # Hugo configuration
├── netlify.toml              # Netlify build & deploy config
└── README.md                 # Human-readable project docs
```

---

## Configuration

### hugo.toml
- `baseURL`: https://vikalpgupta.com/
- `title`: "Vikalp, Designer"
- `markup.goldmark.renderer.unsafe`: true (allows raw HTML in Markdown)
- Menu: "Writing" → /blog/
- Outputs: HTML + RSS for home, HTML for sections

### netlify.toml
- **Build command**: `hugo --gc --minify` (garbage collect + minify)
- **Security headers**: X-Frame-Options DENY, XSS protection, nosniff, strict referrer
- **Cache policy**: 1-year immutable for CSS, JS, and images
- **Deploy previews**: Include future-dated content with branch URL

---

## Styling (static/css/style.css)

### CSS Variables
```css
--color-text-primary    /* Main text */
--color-text-secondary  /* Muted text */
--color-text-light      /* Light text */
--color-accent          /* Accent/link color */
--font-sans             /* Sora */
--font-serif            /* Newsreader */
--font-mono             /* SF Mono fallback */
--max-width: 640px      /* Content width */
--spacing: 3rem         /* Section spacing */
```

### Naming Convention
Component-scoped classes, BEM-adjacent: `site-header`, `post-preview`, `toc-container`, `social-links`.

### Key Patterns
- `html { scroll-padding-top }` for anchor offset
- Footer positioning: fixed when page is short, static when tall (JS scroll detection in baseof.html)
- Smooth scroll enabled globally

---

## JavaScript (static/js/toc.js)

Table of Contents component for blog posts only:
- Auto-generates from h2 headings
- Default state: 3 horizontal lines; hover reveals section titles
- Highlights active section on scroll
- Fixed position aligned with h1
- Hidden on mobile (<768px)

**Performance patterns used:**
- IIFE for scope encapsulation
- `requestAnimationFrame` throttled scroll handler
- Passive event listeners
- Conditionally loaded only on blog single pages (check in baseof.html)

---

## Content Model

### Blog Posts
Front matter:
```yaml
title: "Post Title"
date: YYYY-MM-DD
draft: true/false
```

Posts live in `content/blog/`. The archetype at `archetypes/blog.md` auto-generates front matter.

### Future Sections (planned)
- Photography (`content/_future_pages/photography/`)
- Gear page (`content/_future_pages/gear.md`)

These exist as drafts in `_future_pages/` and are excluded from builds.

---

## Performance Rules

When making changes, these constraints are non-negotiable:

1. **Minimal frameworks only** — prefer vanilla; light frameworks allowed when they clearly justify their weight
2. **No new external font requests** — use existing Sora + Newsreader
3. **Lazy load all images** — `loading="lazy"` attribute
4. **Keep total CSS under 15K uncompressed**
5. **JS is optional** — site must function fully without it
6. **Minify in production** — Hugo `--minify` flag handles this
7. **Semantic HTML** — proper headings, landmarks, ARIA where needed
8. **New features must not regress Lighthouse scores** (target: 85+ across all categories — run Lighthouse check before pushing)
9. **Prefer SVG** for icons and graphics
10. **No render-blocking resources** — defer/async JS, preconnect fonts

---

## Common Tasks

### Run locally
```bash
hugo server -D    # -D includes draft content
```

### Create a new blog post
```bash
hugo new blog/my-post-title.md
```
Then edit `content/blog/my-post-title.md`, set `draft: false` when ready.

### Build for production
```bash
hugo --gc --minify
```
Output goes to `public/`.

### Run Lighthouse check before pushing
```bash
# Build the site, then run Lighthouse and print category scores
hugo --gc --minify && npx lighthouse http://localhost:1313 --chrome-flags="--headless --no-sandbox" --output=json --quiet | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const cats = data.categories;
console.log('--- Lighthouse Scores ---');
Object.keys(cats).forEach(k => {
  const score = Math.round(cats[k].score * 100);
  const status = score >= 85 ? 'PASS' : 'FAIL';
  console.log(status + '  ' + cats[k].title + ': ' + score);
});
const allPass = Object.values(cats).every(c => c.score * 100 >= 85);
process.exit(allPass ? 0 : 1);
"
```
All four Lighthouse categories (Performance, Accessibility, Best Practices, SEO) must score **85+** before pushing. Run this after any visual, structural, or asset change. A non-zero exit code means a category failed the threshold.

### Deploy
Push to `main` branch — Netlify auto-builds and deploys.

---

## Git Conventions

- Commit messages: imperative mood, concise summary of change
- Recent examples: "Clean up codebase and update site content", "Add table of contents component for blog posts"
- Branch: `main` is the production branch
