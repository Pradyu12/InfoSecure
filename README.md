# InfoSecure Solutions

A React.js web application serving as the public-facing site for InfoSecure Solutions — delivering implementation and managed services for observability, network visibility, ITSM, infrastructure, compliance, and modern IT operations.

## Project Structure

- `src/App.jsx` — Main application component with error boundaries and lazy-loaded sections
- `src/main.jsx` — React entry point
- `src/index.css` — Global styles and theming
- `src/components/` — Page and UI components (Header, Hero, About, Contact, Footer, etc.)
- `src/hooks/` — Custom React hooks (scroll reveal, theme, lazy render, header scroll)
- `src/data/content.js` — Centralized content data
- `src/icons/` — SVG icon components
- `Caddyfile` — Open-source web server configuration with security headers
- `docker-compose.yml` — Docker deployment configuration
- `setup-vps.sh` — VPS provisioning script

## Open-Source Hosting

This site is hosted on a self-managed VPS using **Caddy** (Apache 2.0 license) in a Docker container. No proprietary hosting platforms are used.

### Why Caddy?

- **Full HTTP header control** — All security headers are enforced at the server level
- **Automatic HTTPS** — Let's Encrypt certificates obtained and renewed automatically
- **Open-source** — Apache 2.0 license, no vendor lock-in
- **Performance** — Built-in gzip/brotli compression, HTTP/2, and connection pooling

### Deployment

```bash
# 1. Build the React app
npm run build

# 2. Deploy to VPS (via GitHub Actions or manually)
# Copy dist/ contents to /srv/www/ on the VPS

# 3. Start Caddy
docker compose up -d
```

See `SECURITY.md` for the full security header configuration and recon findings remediation status.

## Key Features

- **Modular Architecture** — Components are separated and focused
- **Reusable Hooks** — Custom hooks for animations and state management
- **Data Abstraction** — Content centralized in `src/data/content.js`
- **Dark Mode** — System-aware theme toggle
- **Lazy Loading** — Sections are lazy-rendered for performance
- **Error Boundaries** — Graceful error handling per section
- **Security Headers** — Full CSP, X-Frame-Options, Referrer-Policy, and more enforced by Caddy
- **Contact Form** — Server-side proxy (Express) forwards submissions to GitHub Issues API; PAT never exposed to the browser

## Running the Application

```bash
npm run dev
```

This project is optimized for development with Vite and React 18.

## Security

See [SECURITY.md](./SECURITY.md) for the full security posture, header configuration, and recon findings remediation status.
