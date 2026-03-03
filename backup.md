# Removed Content Archive

Content removed during doc rewrites. Preserved verbatim for reference.

---

## README.md — Removed Sections

### Deploying to Netlify (removed — already configured, not needed for this repo)

#### Option 1: Connect Git Repository (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect Hugo and use settings from `netlify.toml`
6. Click "Deploy site"

#### Option 2: Manual Deploy

1. Build the site locally: `hugo --gc --minify`
2. Log in to [Netlify](https://app.netlify.com/)
3. Drag and drop the `public/` folder to Netlify

#### Custom Domain

To use your custom domain `vikalpgupta.com`:

1. In Netlify, go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter `vikalpgupta.com`
4. Follow instructions to update DNS records at your domain registrar
5. Netlify will automatically provision SSL certificate

### Creating Content — Add Photos (removed — photography is a draft future feature)

#### Add Photos

1. Place your images in `static/images/`
2. Edit `content/photography/_index.md`
3. Add image references:

```html
<img src="/images/your-photo.jpg" alt="Description">
```

### Creating Content — Update Gear Page (removed — gear is a draft future feature)

#### Update Gear Page

Edit `content/gear.md` and add your tools and equipment.

### Customization (removed — generic boilerplate, covered by CLAUDE.md)

#### Site Title and Info

Edit `hugo.toml`:

```toml
title = 'Your Name'
[params]
  description = 'Your description'
  author = 'Your Name'
```

#### Styling

Edit `static/css/style.css` to customize colors, fonts, and layout.

#### Navigation

Add or modify menu items in `hugo.toml`:

```toml
[[menu.main]]
  name = 'New Page'
  url = '/new-page/'
  weight = 4
```

### Performance (removed — covered by CLAUDE.md)

This site is optimized for speed:

- No JavaScript required
- Minimal CSS
- Static HTML generation
- Asset caching headers configured in `netlify.toml`
- Minified HTML, CSS in production build

### Support (removed — generic boilerplate)

For Hugo documentation, visit [gohugo.io/documentation](https://gohugo.io/documentation/)

For Netlify documentation, visit [docs.netlify.com](https://docs.netlify.com/)

### License (removed — generic/wrong for a personal website)

This project is open source and available under the MIT License.

---

## CLAUDE.md — Removed Sections

---

## Components (removed — moved to .docs/components.md)

Reusable Hugo partials and JS modules. When adding UI that appears in multiple templates, create a partial instead of duplicating markup.

### `partials/post-card.html`
Post preview card used on home page and blog listing.

**Parameters (via `dict`):**
- `.Page` — page context (required)
- `.showSummary` — `true` to show summary text, `false` for compact view

**Usage:** `{{ partial "post-card.html" (dict "Page" . "showSummary" false) }}`

**CSS:** `.post-preview`, `.post-preview h3`, `.post-preview time`

### `partials/link-buttons.html`
Styled row of links. Base component for social links, nav menus, or any horizontal link group.

**Parameters (via `dict`):**
- `.links` — array of objects with `name` and `url` fields (from `hugo.toml` params or menus)
- `.class` — CSS modifier class (e.g., `"social-links"` for underline animation variant)

**Usage:** `{{ partial "link-buttons.html" (dict "links" .Site.Params.socialLinks "class" "social-links") }}`

**CSS:** `.link-buttons` (base), `.social-links` (modifier with underline animation)

**Config:** Social links are defined in `hugo.toml` under `[[params.socialLinks]]` with `name` and `url` fields.

### `partials/meta.html`
Open Graph and Twitter meta tags. Receives the full page context and computes title/description.

**Usage:** `{{ partial "meta.html" . }}`

### `partials/post-meta.html`
Post date/time display element.

**Parameters (via `dict`):**
- `.Date` — the page date

**Usage:** `{{ partial "post-meta.html" (dict "Date" .Date) }}`

---

## JavaScript — Table of Contents (removed — moved to .docs/toc.md)

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

### Table of Contents (`static/js/toc.js`)
JS-generated navigation for blog posts. Not a Hugo partial — all HTML is created dynamically from h2 headings.

- Loaded conditionally on blog section pages via `baseof.html`
- CSS: `.toc-container`, `.toc`, `.toc-lines`, `.toc-items`, `.toc-item`
- Hidden on mobile (<768px)

---

## Configuration Details (removed — covered in .docs/infrastructure.md)

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

## Heading Visual Style Table (removed — duplicates CSS variable list)

| Level | Variable | Size | Weight | Color | Line-height |
|---|---|---|---|---|---|
| Page title (`h1`) | `--text-h1` | 40px / 32px mobile | 400 | `text-primary` | 1.2 |
| Section heading (`h2`) | `--text-h2` | 32px | 400 | `text-primary` | 1.2 |
| Sub-heading (`h3`) | `--text-h3` | 24px / 20px mobile | 400 | `text-primary` | 1.5 |
| Body / intro | `--text-body` | 18px | 300–400 | `text-secondary` | 1.6 |
| Nav / buttons | `--text-md` | 16px | 300–400 | `text-tertiary` | — |
| Timestamps / footer | `--text-sm` | 14px | 300 | `text-tertiary` | 1.4 |

---

## Future Sections Note (removed — visible via project tree)

### Future Sections (planned)
- Photography (`content/_future_pages/photography/`)
- Gear page (`content/_future_pages/gear.md`)

These exist as drafts in `_future_pages/` and are excluded from builds.
