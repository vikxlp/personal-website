# Infrastructure & Domain Setup

How vikalpgupta.com is built, hosted, and served.

---

## Architecture

```
GitHub (repo)
  → push to main
  → Netlify (build: hugo --gc --minify, serve static files)
  → origin IP: 75.2.60.5

Cloudflare (proxy in front of Netlify)
  vikalpgupta.com  → A record → Netlify (proxied)
  www              → Netlify 301 → apex
  vikalp.me        → Cloudflare redirect rule → 302 → vikalpgupta.com

Nameservers: lia.ns.cloudflare.com / cory.ns.cloudflare.com
```

---

## DNS Records

**vikalpgupta.com** — Cloudflare DNS, proxied (orange cloud)

| Record | Type | Value |
|---|---|---|
| `vikalpgupta.com` | A | `75.2.60.5` (Netlify load balancer) |

**vikalp.me** — No origin server. Cloudflare intercepts and redirects.

| Record | Type | Value |
|---|---|---|
| `vikalp.me` | A | Cloudflare proxy IPs |

The `vikalp.me → vikalpgupta.com` redirect is a Cloudflare redirect rule (Page Rules or Bulk Redirects), not Netlify.

---

## Where Each Concern Is Managed

| Concern | Where | How to change |
|---|---|---|
| Site builds + Hugo version | Netlify | `netlify.toml` |
| Security + cache headers | Netlify | `[[headers]]` in `netlify.toml` |
| DNS records | Cloudflare | Cloudflare dashboard → DNS |
| vikalp.me redirect | Cloudflare | Dashboard → Rules |
| www → apex redirect | Netlify | Dashboard → Domain settings |
| SSL (edge) | Cloudflare | Automatic (Universal SSL) |
| SSL (origin) | Netlify | Automatic |
| CDN / DDoS / WAF | Cloudflare | Dashboard → Security / Caching |

---

## SSL/TLS

Cloudflare in **Full (Strict)** mode — encrypts both visitor→Cloudflare and Cloudflare→Netlify. Both certs are auto-renewed; no manual action needed.

---

## Gotchas

1. **Cloudflare proxy must stay enabled** (orange cloud) on `vikalpgupta.com`. Grey cloud bypasses CDN and DDoS protection.
2. **The vikalp.me redirect is a 302** (Cloudflare redirect rule) — SEO value consolidates to `vikalpgupta.com`.
3. **No `_redirects` file in repo** — all domain-level redirects are handled at the infra layer.
4. **Hugo `baseURL`** is `https://vikalpgupta.com/` — canonical URLs, sitemap, and RSS all use the primary domain.
