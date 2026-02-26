# Infrastructure & Domain Setup

How vikalpgupta.com is built, hosted, and served.

---

## Architecture Overview

```
┌─────────────┐     push to main     ┌─────────────┐
│   GitHub     │ ──────────────────▶  │   Netlify    │
│   (repo)     │                      │   (build +   │
└─────────────┘                       │    hosting)  │
                                      └──────┬───────┘
                                             │
                                             │ origin server
                                             │ 75.2.60.5
                                             ▼
┌──────────────────────────────────────────────────────┐
│                    Cloudflare                         │
│                                                      │
│  vikalpgupta.com ──▶ proxied A record ──▶ Netlify    │
│  www.vikalpgupta.com ──▶ Netlify 301 ──▶ apex        │
│  vikalp.me ──▶ 302 redirect ──▶ vikalpgupta.com     │
│                                                      │
│  Nameservers: lia.ns.cloudflare.com                  │
│               cory.ns.cloudflare.com                 │
└──────────────────────────────────────────────────────┘
```

---

## How Each Piece Works

### 1. Build & Hosting — Netlify

Netlify builds the Hugo site and serves the static files.

- **Build trigger:** Git push to `main` branch on GitHub
- **Build command:** `hugo --gc --minify` (defined in `netlify.toml`)
- **Hugo version:** 0.139.3 (pinned in `netlify.toml`)
- **Output directory:** `public/`
- **Netlify site URL:** something like `<site-name>.netlify.app` (the default Netlify subdomain)

Netlify also handles:
- **Security headers** (X-Frame-Options, XSS protection, nosniff, referrer policy) — configured in `netlify.toml`
- **Cache headers** for static assets (1-year immutable for CSS, JS, images) — configured in `netlify.toml`
- **Deploy previews** for branches/PRs (with `--buildFuture` flag to include draft content)
- **www → apex redirect:** `www.vikalpgupta.com` returns a 301 redirect to `vikalpgupta.com` (handled by Netlify's domain settings)

### 2. DNS & CDN — Cloudflare

Both domains use the same Cloudflare account with shared nameservers:
- `lia.ns.cloudflare.com`
- `cory.ns.cloudflare.com`

#### vikalpgupta.com (primary domain)

| Record | Type | Value | Proxy |
|--------|------|-------|-------|
| `vikalpgupta.com` | A | `75.2.60.5` (Netlify load balancer) | Proxied through Cloudflare |

The A record points to Netlify's load balancer IP. Cloudflare sits in front as a CDN/proxy, providing:
- SSL termination (Cloudflare → Netlify, both HTTPS)
- DDoS protection
- Edge caching
- Analytics

**Note:** The `75.2.60.5` IP is Netlify's anycast load balancer, not a single server. The domain must also be configured as a custom domain in Netlify's site settings for Netlify to route requests correctly.

#### vikalp.me (redirect domain)

| Record | Type | Value | Proxy |
|--------|------|-------|-------|
| `vikalp.me` | A | `172.67.200.147`, `104.21.44.135` (Cloudflare IPs) | Proxied |

The `vikalp.me` domain does **not** point to Netlify. Instead:
1. DNS resolves to Cloudflare's own proxy IPs
2. Cloudflare intercepts the request
3. A **Cloudflare redirect rule** (Page Rule or Bulk Redirect) returns a **302 redirect** to `https://vikalpgupta.com/`
4. This works for both HTTP and HTTPS requests to `vikalp.me`

This redirect is configured entirely within Cloudflare's dashboard (Page Rules, Redirect Rules, or Bulk Redirects) — there is no server or Netlify site behind `vikalp.me`.

### 3. SSL/TLS

- **Cloudflare** provides the edge SSL certificate for both domains (automatic via Cloudflare's Universal SSL)
- **Netlify** provides its own SSL certificate for the origin connection
- **Mode:** Likely "Full (Strict)" in Cloudflare — encrypts both visitor→Cloudflare and Cloudflare→Netlify

---

## Request Flow

### Visitor hits `vikalpgupta.com`

```
Browser
  → DNS lookup → Cloudflare nameservers → Cloudflare proxy IPs
  → HTTPS request → Cloudflare edge (CDN cache check)
  → Cache miss → Forward to Netlify origin (75.2.60.5)
  → Netlify serves static HTML from build output
  → Response flows back through Cloudflare → Browser
```

### Visitor hits `vikalp.me`

```
Browser
  → DNS lookup → Cloudflare nameservers → Cloudflare proxy IPs
  → HTTPS request → Cloudflare edge
  → Cloudflare redirect rule fires
  → 302 Found → Location: https://vikalpgupta.com/
  → Browser follows redirect → (same flow as above)
```

### Visitor hits `www.vikalpgupta.com`

```
Browser
  → DNS lookup → resolves to Netlify
  → HTTPS request → Netlify
  → 301 Moved Permanently → Location: https://vikalpgupta.com/
  → Browser follows redirect → (same flow as above)
```

---

## Domain Registrar Setup

Both domains must have their nameservers set to Cloudflare at the registrar level:
- `lia.ns.cloudflare.com`
- `cory.ns.cloudflare.com`

This delegates all DNS control to Cloudflare.

---

## Where Each Concern Is Managed

| Concern | Where | How to change |
|---------|-------|---------------|
| Site builds | Netlify | `netlify.toml` or Netlify dashboard |
| Hugo version | Netlify | `HUGO_VERSION` in `netlify.toml` |
| Security headers | Netlify | `[[headers]]` in `netlify.toml` |
| Cache headers | Netlify | `[[headers]]` in `netlify.toml` |
| DNS records | Cloudflare | Cloudflare dashboard → DNS |
| vikalp.me → vikalpgupta.com redirect | Cloudflare | Cloudflare dashboard → Rules (Page Rules or Redirect Rules) |
| www redirect | Netlify | Netlify dashboard → Domain settings |
| SSL certificates | Cloudflare (edge) + Netlify (origin) | Automatic |
| CDN / edge caching | Cloudflare | Cloudflare dashboard → Caching |
| DDoS protection | Cloudflare | Automatic |
| Bot management / WAF | Cloudflare | Cloudflare dashboard → Security |

---

## Gotchas & Notes

1. **Cloudflare proxy must stay enabled** (orange cloud) for `vikalpgupta.com`. If set to DNS-only (grey cloud), visitors would hit Netlify directly, bypassing Cloudflare's CDN and protection.

2. **The vikalp.me redirect is a 301 (permanent).** Search engines will consolidate SEO value to `vikalpgupta.com`. This is configured in Cloudflare's redirect rules.

3. **Netlify's SSL must remain valid.** Cloudflare in Full (Strict) mode will reject connections if Netlify's cert expires. Netlify auto-renews, but if custom domain config is removed, the cert will break.

4. **No `_redirects` file exists in the project.** All redirects are handled at the infrastructure level (Cloudflare for domain redirect, Netlify for www redirect).

5. **Hugo's `baseURL`** is set to `https://vikalpgupta.com/` in `hugo.toml`. This means all canonical URLs, sitemap entries, and RSS feed links point to the primary domain.