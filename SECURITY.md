# Security Posture — InfoSecure Solutions

This document describes the security measures in place for the InfoSecure Solutions website and how the reconnaissance findings have been addressed.

---

## Hosting

This site is served by **Caddy** (open-source web server, Apache 2.0 license) running in a Docker container on a self-managed VPS. No proprietary hosting platforms (GitHub Pages, Cloudflare, Netlify, Vercel) are used.

All HTTP response headers are enforced at the server level via the Caddyfile, ensuring they cannot be bypassed or removed by client-side code.

---

## Security Headers

The following HTTP response headers are enforced by Caddy for every request:

| Header | Value | Purpose |
|---|---|---|
| `Server` | *(removed)* | No server version disclosure |
| `X-Frame-Options` | `DENY` | Prevents clickjacking via iframe embedding |
| `Content-Security-Policy` | See below | Restricts resource loading, prevents XSS and data injection |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-XSS-Protection` | `0` | Disables deprecated XSS filter (modern browsers use CSP instead) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer information leakage |
| `Access-Control-Allow-Origin` | `https://www.infosecuresolutions.co.in` | Restricts cross-origin resource sharing to the site's own domain |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Disables sensitive browser features |

### Content Security Policy

```
default-src 'self';
script-src 'self' plausible.io;
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' api.github.com plausible.io;
frame-ancestors 'none';
base-uri 'self';
object-src 'none';
form-action 'self';
```

This CSP:
- Only allows scripts from the same origin and Plausible analytics
- Allows inline styles (required by React's `style={{}}` attribute)
- Only allows fonts from Google Fonts domains
- Restricts network requests to the same origin, GitHub API (contact form), and Plausible
- Prevents the site from being embedded in any frame (clickjacking protection)
- Prevents base URI injection and object/embed embedding

---

## Recon Findings Remediation Status

| Finding | Severity | Status | How Addressed |
|---|---|---|---|
| Server header disclosure | MEDIUM | ✅ Fixed | Caddy removes the `Server` header |
| Missing X-Frame-Options | MEDIUM | ✅ Fixed | `X-Frame-Options: DENY` set by Caddy |
| Missing CSP | MEDIUM | ✅ Fixed | `Content-Security-Policy` header set by Caddy |
| Missing clickjacking protection | MEDIUM | ✅ Fixed | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` |
| Overly permissive CORS (`*`) | MEDIUM | ✅ Fixed | `Access-Control-Allow-Origin` restricted to site domain |
| Missing X-Content-Type-Options | LOW | ✅ Fixed | `X-Content-Type-Options: nosniff` set by Caddy |
| Missing X-XSS-Protection | LOW | ✅ Fixed | `X-XSS-Protection: 0` set by Caddy (deprecated header disabled) |
| Missing Referrer-Policy | LOW | ✅ Fixed | `Referrer-Policy: strict-origin-when-cross-origin` set by Caddy + `<meta>` tag |

---

## Additional Findings (Previously Identified, Now Fixed)

### HIGH — Exposed GitHub PAT in Client Bundle (FIXED)

**Previous issue:** The Contact form used `VITE_GITHUB_PAT` in client-side JavaScript via `import.meta.env.VITE_GITHUB_PAT`. Vite inlines `VITE_`-prefixed environment variables into the client bundle at build time, making the token visible to anyone viewing the page source.

**Fix:** Added a server-side Express API proxy (`server/`) that handles the GitHub Issues API call. The PAT is now stored as a server environment variable (`GITHUB_PAT`) and never reaches the browser. The React Contact form posts to `/api/contact`, which Caddy reverse-proxies to the Express server.

**Files changed:**
- `server/index.js` — New Express server with `/api/contact` endpoint
- `server/Dockerfile` — Docker image for the API server
- `server/package.json` — Server dependencies
- `Caddyfile` — Added `reverse_proxy /api/* api:3001`
- `docker-compose.yml` — Added `api` service with environment variables
- `src/components/Contact.jsx` — Changed fetch target from GitHub API to `/api/contact`
- `.env.example` — Documents server-side `GITHUB_PAT` and `GITHUB_REPO` env vars
- `.github/workflows/deploy.yml` — Sets server env vars on the VPS during deploy

---

## Open-Source Stack

| Component | License | Purpose |
|---|---|---|
| Caddy | Apache 2.0 | Web server with automatic HTTPS and header enforcement |
| Docker | Apache 2.0 | Container runtime for reproducible deployments |
| Docker Compose | Apache 2.0 | Multi-container orchestration |
| React | MIT | Frontend framework |
| Vite | MIT | Build tool |

---

## Deployment

The site is deployed via GitHub Actions to a self-managed VPS:

1. Push to `main` triggers the workflow
2. GitHub Actions builds the React app (`npm run build`)
3. Built output is copied to the VPS via SCP
4. Caddy container is restarted to serve the new build

See `setup-vps.sh` for the VPS provisioning script.
