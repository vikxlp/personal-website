<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (initial ratification)
Modified principles: N/A (initial version)
Added sections:
  - Core Principles (6 principles)
  - Technical Constraints
  - Development Workflow
  - Governance
Removed sections: N/A (initial version)
Templates requiring updates:
  ✅ .specify/templates/plan-template.md (no changes needed - already generic)
  ✅ .specify/templates/spec-template.md (no changes needed - already generic)
  ✅ .specify/templates/tasks-template.md (no changes needed - already generic)
Follow-up TODOs: None
==================
-->

# vikalpgupta.com Constitution

Personal website of Vikalp Gupta, a digital product designer. This constitution defines the non-negotiable principles, technical constraints, and governance rules that guide all development decisions.

**Live site**: https://vikalpgupta.com/

## Core Principles

### I. Performance First

Every change MUST maintain or improve site performance. This is measured objectively:

- **Lighthouse scores MUST remain 85+ across all categories** (Performance, Accessibility, Best Practices, SEO)
- Total build output MUST stay under 150KB
- CSS MUST stay under 15KB uncompressed
- No render-blocking resources — all JS deferred/async, fonts preloaded with swap
- Images MUST use `loading="lazy"` attribute
- Run Lighthouse check before every push to main

**Rationale**: A personal portfolio site has no excuse for poor performance. Speed directly impacts user experience, SEO, and professional credibility.

### II. Progressive Enhancement

Core content MUST work without JavaScript. JS enhances, never gates:

- All navigation, content reading, and links MUST function with JS disabled
- Interactive features (e.g., Table of Contents) enhance but never replace native functionality
- No client-side routing — Hugo generates static HTML for all pages
- Forms (if any) MUST have server-side fallbacks

**Rationale**: Content is the product. Users on slow connections, with accessibility needs, or with JS disabled deserve full access.

### III. Minimal Dependencies

Every dependency MUST justify its weight. Prefer vanilla implementations:

- **CSS**: Vanilla CSS with custom properties only — no preprocessors, no frameworks
- **JS**: Vanilla JS preferred; light frameworks allowed only when they demonstrably reduce complexity
- **Fonts**: Existing set only (Sora, Newsreader) — no new external font requests
- **Images**: SVG preferred for icons/graphics; raster images MUST be optimized

**Rationale**: Dependencies add maintenance burden, security surface, and bytes. A simple site deserves simple tools.

### IV. Semantic & Accessible

Markup MUST be meaningful and accessible:

- Proper heading hierarchy (h1 → h2 → h3, no skips)
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`)
- ARIA attributes where native semantics are insufficient
- `prefers-reduced-motion` respected for all animations
- Color contrast meeting WCAG AA minimum
- Alt text for all meaningful images

**Rationale**: Accessibility is not optional. Semantic markup also benefits SEO and maintainability.

### V. Mobile-First Responsive

Design MUST start with mobile constraints:

- Base styles target mobile viewports
- Single breakpoint at 768px for desktop enhancements
- Touch targets meet minimum size requirements (44x44px)
- No horizontal scroll at any viewport width
- Footer and navigation adapt gracefully to all screen sizes

**Rationale**: Mobile traffic dominates. Starting mobile ensures core experience is always solid.

### VI. Simplicity Over Features

When in doubt, leave it out:

- No feature creep — every addition MUST serve a clear user need
- Prefer fewer, well-crafted pages over many thin pages
- No analytics/tracking scripts unless explicitly justified
- No comments system, share buttons, or social widgets unless user requests
- Configuration over complexity — use Hugo's built-in features before custom solutions

**Rationale**: A personal site should be a calm, focused space. Clutter undermines the design craft it represents.

## Technical Constraints

**Stack** (changes require constitution amendment):

| Layer       | Tool                  |
|-------------|-----------------------|
| Generator   | Hugo (current: 0.139.3) |
| Hosting     | Netlify               |
| CDN/DNS     | Cloudflare            |
| CSS         | Vanilla CSS with custom properties |
| JavaScript  | Vanilla JS            |
| Fonts       | Google Fonts (Sora, Newsreader) |

**File size budgets**:

- Total CSS: ≤15KB uncompressed
- Individual JS files: ≤5KB each
- Total build output: ≤150KB (excluding images)
- Individual images: ≤200KB after optimization

**Security headers** (enforced via netlify.toml):

- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

**Caching policy**:

- CSS, JS, images: 1-year immutable cache

## Development Workflow

### Before Making Changes

1. Read relevant files to understand existing patterns
2. Check CLAUDE.md for component documentation and conventions
3. Identify if change affects multiple templates — prefer partials over duplication

### Before Committing

1. Build locally: `hugo --gc --minify`
2. Test in browser with JS disabled
3. Test at mobile viewport (375px)
4. Run Lighthouse check (all categories MUST score 85+)

### Commit Standards

- Imperative mood, concise summary
- Examples: "Add table of contents component", "Fix footer positioning on short pages"
- No WIP commits to main

### Creating New Components

When UI appears in multiple templates:

1. Create a Hugo partial in `layouts/partials/`
2. Document parameters and usage in CLAUDE.md under Components section
3. Use component-scoped CSS classes (BEM-adjacent naming)

## Governance

### Constitution Authority

This constitution supersedes all other practices. When in conflict:

1. Constitution principles win
2. CLAUDE.md provides implementation guidance within constitutional bounds
3. Ad-hoc decisions MUST NOT violate principles

### Amendment Process

1. Propose change with rationale
2. Assess impact on existing codebase
3. Update constitution with new version number
4. Update CLAUDE.md if implementation guidance changes
5. Document in commit message: `docs: amend constitution to vX.Y.Z (reason)`

### Version Numbering

- **MAJOR**: Principle removed, redefined, or made more restrictive
- **MINOR**: New principle added or existing principle expanded
- **PATCH**: Clarifications, typo fixes, non-semantic refinements

### Compliance Verification

Every PR/change MUST verify:

- [ ] Lighthouse scores remain 85+ across all categories
- [ ] Site functions without JavaScript
- [ ] No new external dependencies without justification
- [ ] Semantic HTML maintained
- [ ] Mobile experience not degraded

**Version**: 1.0.0 | **Ratified**: 2026-02-03 | **Last Amended**: 2026-02-03
