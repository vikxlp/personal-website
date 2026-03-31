# Style System Reference — vikalpgupta.com

Source of truth for typography, color, and layout tokens in `static/css/style.css`.

---

## CSS Variables (`:root`)

### Colors
| Variable | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#293A41` | Headings, active states |
| `--color-text-secondary` | `#4D646D` | Body text, default |
| `--color-text-tertiary` | `#889FA9` | Nav, timestamps, footer, muted |
| `--color-bg` | `#fcfeff` | Page background |
| `--color-bg-button` | `#F0F3F5` | Button hover fill |
| `--color-bg-card` | `#F5F8FA` | Card/post hover fill |
| `--color-highlight` | `#4DCAFF` | Link underline hover |

### Typography Scale (base: 16px)
| Variable | Value | Usage |
|---|---|---|
| `--text-h1` | `2.5rem` (40px) | Page titles · mobile: `2rem` |
| `--text-h2` | `2rem` (32px) | Section headings |
| `--text-h3` | `1.5rem` (24px) | Sub-headings · mobile: `1.25rem` |
| `--text-body` | `1.125rem` (18px) | Body paragraphs |
| `--text-md` | `1rem` (16px) | Nav, buttons |
| `--text-sm` | `0.875rem` (14px) | Timestamps, captions, footer, TOC |

### Fonts & Layout
| Variable | Value |
|---|---|
| `--font-sans` | Sora, system fallbacks |
| `--font-serif` | Newsreader, Georgia fallbacks |
| `--font-mono` | SF Mono, Menlo fallbacks |
| `--max-width` | `640px` |
| `--spacing` | `3rem` (section gap) |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## Text Style Tokens (`.ts-*`)

Each `.ts-*` class is the single source of truth for a text role. Real element selectors are grouped alongside the token class in `style.css`.

To apply a style to a new element: either add it to the selector group in `style.css`, or add the class directly to HTML (e.g. `class="ts-body"`).

| Token | Real selectors | Font | Size | Weight | Line-height | Color |
|---|---|---|---|---|---|---|
| `.ts-h1` | `.single h1` | sans | `--text-h1` | 400 | 1.2 | primary |
| `.ts-h2` | `.content h2` | sans | `--text-h2` | 400 | 1.2 | primary |
| `.ts-h3` | `.content h3` | sans | `--text-h3` | 400 | 1.5 | primary |
| `.ts-body` | `.content p`, `.intro` | sans | `--text-body` | 300 | 1.5 | secondary |
| `.ts-nav` | `.nav-menu a` | sans | `--text-md` | 300 | 1 | tertiary |
| `.ts-sm` | `.post-preview time`, `.single time`, `.toc-item` | sans | `--text-sm` | 400 | 1.5 | tertiary |
| `.ts-caption` | `.content figcaption`, `.postcard-cover figcaption`, `.site-footer` | serif italic | `--text-sm` | 300 | 1.5 | tertiary |
| `.ts-btn` | `.buttons a` | sans | `--text-md` | 400 | 1 | secondary |
| `.ts-link` | `a` | inherit | inherit | inherit | inherit | inherit (underline) |

### Token details

**`ts-h1`** — letter-spacing: -0.02em
**`ts-h2`** — letter-spacing: -0.01em
**`ts-h3`** — letter-spacing: 0
**`ts-caption`** — font-style: italic, font-family: serif
**`ts-link`** — text-decoration-thickness: 2px, text-underline-offset: 3px, decoration color uses `color-mix()` semi-transparency; hover changes decoration to `--color-highlight`

---

## Selectors NOT Tokenised

These have contextual styling that diverges from the general token system. Left as standalone rules — review when designing page-specific token layers.

| Selector | Reason | Notes |
|---|---|---|
| `.hero h1` | Renders at `var(--text-body)` (18px) by design | Home page greeting — intentionally not a large heading |
| `.subtitle` | `var(--text-body)` size + `color-text-tertiary` | Home page subtitle line |
| `.recent-posts h2`, `.list h1` | `var(--text-body)` size, primary color, weight 400 | Section label styled as body text |
| `.resume .content h2` | Uppercase, `var(--text-md)`, `letter-spacing: 0.06em`, tertiary | Resume section label overrides `ts-h2` |
| `.resume .content h3` | `margin-bottom: 0` tight spacing | Resume role heading overrides `ts-h3` spacing |
