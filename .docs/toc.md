# Table of Contents Component

`static/js/toc.js` — ~110 lines, vanilla JS, IIFE-scoped.

---

## Purpose

Auto-generates a fixed-position navigation panel from `h2` headings in a writing post. Highlights the active section as the reader scrolls.

---

## Loading Condition

Loaded only on writing single pages. `baseof.html` checks the current section before injecting the `<script>` tag. The script itself also guards with a `.single` class check:

```js
if (!document.querySelector('.single')) return;
```

Not loaded on: home page, writing listing, postcards, resume, or any non-writing single page.

---

## Behaviour

| State | What the reader sees |
|---|---|
| Default | 3 short horizontal lines (icon-like, fixed position) |
| Hover | Lines animate out; section title list slides in |
| Active heading | Corresponding line / title item highlighted |

---

## DOM Structure

Generated entirely by JS — no server-side HTML:

```
div.toc-container
  nav.toc[aria-label="Table of contents"]
    div.toc-lines
      div.toc-line      ← one per h2 (active class toggled)
    div.toc-items
      a.toc-item        ← one per h2, href="#heading-N" (active class toggled)
```

**Heading IDs:** If a heading has no `id`, the script assigns `heading-0`, `heading-1`, etc.

---

## Positioning

Fixed to the page, top aligned with the `h1` of the post. Computed on load:

```js
tocContainer.style.top = `${h1.getBoundingClientRect().top + window.scrollY}px`
```

Position is set once on `window load`. Does not recompute on resize.

---

## Active Heading Tracking

Scroll listener throttled with `requestAnimationFrame`. Passive event listener (no scroll jank):

```js
window.addEventListener('scroll', handler, { passive: true });
```

A heading is considered active when `scrollY + 150px ≥ heading.offsetTop`. The last heading above that threshold wins.

---

## Smooth Scroll

Clicking a TOC item scrolls to `heading.offsetTop - 120px`. Respects `prefers-reduced-motion` — uses `behavior: 'instant'` if enabled. URL hash is pushed after a 100ms delay to avoid conflicting with the scroll.

---

## Responsive / Accessibility

- **Hidden on mobile** — `.toc-container` is `display: none` below 768px (CSS).
- **`prefers-reduced-motion`** — respected for scroll animation (JS check, not CSS only).
- **ARIA** — `nav` has `aria-label="Table of contents"`.

---

## CSS Classes

| Class | Element | Notes |
|---|---|---|
| `.toc-container` | Outer wrapper | Fixed position, right-aligned |
| `.toc` | `<nav>` | Contains lines + items |
| `.toc-lines` | Lines wrapper | Shown by default; hidden on hover |
| `.toc-line` | Individual line | Gets `.active` class |
| `.toc-items` | Items wrapper | Hidden by default; shown on hover |
| `.toc-item` | `<a>` link | Gets `.active` class |

---

## To Disable or Extend

**Disable entirely:** Remove the `<script>` tag that loads `toc.js` from `layouts/_default/baseof.html`.

**Add h3 support:** Change `querySelectorAll('h2')` to `querySelectorAll('h2, h3')` in `toc.js`.

**Reposition:** Adjust the `top` calculation or switch to CSS `top: var(--some-var)`.
