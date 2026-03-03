# Hugo Components — Partials Reference

Reusable Hugo partials in `layouts/partials/`. When adding UI that appears in multiple templates, create a partial rather than duplicating markup.

---

## `post-card.html`

Post preview card. Used on the home page and blog listing page.

**Parameters (via `dict`):**

| Param | Type | Required | Description |
|---|---|---|---|
| `.Page` | Page context | Yes | The Hugo page object |
| `.showSummary` | bool | No | Show summary paragraph below title |
| `.showTitle` | bool | No | Show post title (default true; pass `false` for postcards) |

**Usage:**
```html
{{ partial "post-card.html" (dict "Page" . "showSummary" false) }}
{{ partial "post-card.html" (dict "Page" . "showTitle" false) }}
```

**CSS classes:** `.post-preview`, `.post-preview h3`, `.post-preview time`

**Output:** An `<a>` tag wrapping a `<time>` element, optional `<h3>` title, optional `<p>` summary.

---

## `link-buttons.html`

Styled row of links. Base component for social links, nav menus, or any horizontal link group.

**Parameters (via `dict`):**

| Param | Type | Description |
|---|---|---|
| `.links` | array | Objects with `name` and `url` fields |
| `.class` | string | CSS modifier class added to the wrapper `<div>` |

**Usage:**
```html
{{ partial "link-buttons.html" (dict "links" .Site.Params.socialLinks "class" "social-links") }}
```

**CSS classes:** `.buttons` (base wrapper), `.social-links` (modifier — adds underline animation)

**External links:** Automatically adds `target="_blank" rel="noopener"` for `http://` and `//` URLs.

**Config source:** Social links are defined in `hugo.toml` under `[[params.socialLinks]]`:
```toml
[[params.socialLinks]]
  name = "Twitter"
  url = "https://twitter.com/vikxlp"
```

---

## `meta.html`

Open Graph and Twitter Card meta tags. Also sets `<title>`, `<meta name="description">`, and canonical URL.

**Usage:**
```html
{{ partial "meta.html" . }}
```

**Title logic:**

| Condition | Title |
|---|---|
| Home page | `site.Title` |
| Postcards listing | `"Postcards from Vikalp"` |
| Single postcard | `"N \| Postcards from Vikalp"` |
| Everything else | `"Page Title \| Site Title"` |

**Description:** Uses `.Description` front matter if set, otherwise falls back to `site.Params.description`.

**OG image:** Set globally via `params.ogImage` in `hugo.toml`. Points to `/images/og-image.png`.

---

## `post-meta.html`

Renders a single `<time>` element for a post's date.

**Parameters (via `dict`):**

| Param | Type | Description |
|---|---|---|
| `.Date` | time.Time | The page date |

**Usage:**
```html
{{ partial "post-meta.html" (dict "Date" .Date) }}
```

**Output format:** `January 2, 2006` (e.g. `February 25, 2026`).

---

## Special Patterns

### Footer suppression

To hide the footer on a specific page type, add `type: resume` to the page's front matter. `baseof.html` checks `.Type` before rendering the footer:

```html
{{ if ne .Type "resume" }}{{ partial "footer.html" . }}{{ end }}
```

### HR hiding

All `<hr>` elements inside `.content` are globally hidden:

```css
.content hr { display: none; }
```

Do not show `<hr>` unless explicitly planned and scoped to a specific page type.
