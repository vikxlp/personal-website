[![Netlify Status](https://api.netlify.com/api/v1/badges/634801fd-a1bc-4406-92e2-5ea67dd49c36/deploy-status)](https://app.netlify.com/projects/vikalpme/deploys)

# Vikalp Gupta — Personal Website

Personal website of Vikalp Gupta, digital product designer.

Live: <https://vikalpgupta.com/>

Built with Hugo, deployed on Netlify. Maintained with [Claude Code](https://claude.ai/code).

---

## Quick Start

```bash
brew install hugo          # install Hugo (macOS)
hugo server -D             # local dev — includes drafts at localhost:1313
```

**Create content:**

```bash
hugo new writing/my-post-title.md # new writing post
bash new-postcard.sh              # new postcard (auto-numbers)
```

**Build for production:**

```bash
hugo --gc --minify
```

---

## Deploy

Push to `main` → Netlify auto-builds and deploys.

---

## Docs

Full documentation in [`.docs/`](.docs/):

- [`.docs/infrastructure.md`](.docs/infrastructure.md) — hosting, DNS, CDN setup
- [`.docs/postcards.md`](.docs/postcards.md) — postcards feature
- [`.docs/components.md`](.docs/components.md) — Hugo partials reference
- [`.docs/toc.md`](.docs/toc.md) — Table of Contents JS component
