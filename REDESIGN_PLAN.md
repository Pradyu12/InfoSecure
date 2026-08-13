# InfoSecure Website Redesign — Plan & Progress

**Goal:** Redesign the React/Vite website in this folder (`InfoSecure`) to match the reference site **https://www.tritantra.com/infosecure**.

**Status:** In progress — design system, content, and three new sections are done; hero, about, testimonials, contact, footer, and app assembly remain.

---

## 1. Reference Design Profile (extracted from tritantra.com/infosecure)

The reference is a WordPress site (Astra theme + Spectra blocks). Its full design system was extracted from the live HTML/CSS.

### Colors
| Token | Value | Usage |
|---|---|---|
| Primary blue | `#2235DD` | Buttons, accents, links (hover `#1A2BC6`) |
| Dark navy | `#131739` | Hero, CTA band, footer backgrounds |
| Deep navy | `#0B0E24` | Hero gradient overlay |
| Light lavender | `#F0F1FD` / `#E4E7FD` | Alternating section backgrounds |
| Near-black | `#05060F` | Primary text |
| Text muted | `#5A5F8A` | Secondary text |

### Typography
- **Headings:** DM Sans (weight 500–700, uppercase eyebrows with letter-spacing)
- **Body:** Mulish (weight 400–600, line-height 1.7)
- Loaded from Google Fonts in `index.html` (CSP already allows `fonts.googleapis.com` / `fonts.gstatic.com`).

### Section flow (reference order)
1. **Hero** — "Welcome" eyebrow → "Ideal Security Solutions for Your Business" → Get Started button. Dark navy background with photo + overlay.
2. **About** — "About us" eyebrow → "About Infosecure Solutions" → description → Read More button, photo on the right.
3. **Core Values** — "Our values" → "Our Core Values" → 3 cards: `01 Innovation`, `02 Reliability`, `03 Customer Commitment`.
4. **CTA band** — "Take the next step" → "Transform Your IT Infrastructure Today" → Get Started.
5. **Why Choose Us** — "Why Choose Us" → "Discover Our Unique Value Propositions" → 3 cards: Cost Efficiency (75% bandwidth), Expert Team (15+ yrs), Comprehensive Support (24/7).
6. **Testimonials** — "What Our Clients Say" → 3 quotes (John Doe, Jane Smith, Emily Johnson).
7. **Final CTA** — "Ready to innovate?" → "Contact Us for a Consultation" → Get Started.
8. **Footer** — copyright bar.

### Imagery (downloaded from the reference into `src/assets/`)
- `hero-bg.jpg` — dark office/IT photo for hero background
- `about-team.jpg` — team photo for About section
- `cta-bg.jpg` — photo for CTA band backgrounds

---

## 2. Todo List & Progress

| # | Task | Status |
|---|---|---|
| 1 | Update `index.html` fonts (DM Sans + Mulish) | ✅ Done |
| 2 | Rewrite `src/index.css` with the reference design system (blue/navy palette, typography, buttons, cards, hero, CTA bands, dark-mode variants) | ✅ Done |
| 3 | Download reference images into `src/assets/` | ✅ Done |
| 4 | Update `src/data/content.js` with reference copy (core values, value props, CTA bands, testimonials) | ✅ Done |
| 5 | Create new components: `CoreValues.jsx`, `WhyChooseUs.jsx`, `CTABand.jsx` | ✅ Done |
| 6 | Rebuild `Hero.jsx` — dark navy image hero, "Welcome" eyebrow, "Ideal Security Solutions for Your Business", Get Started CTA | ⏳ Next |
| 7 | Rebuild `About.jsx` — text + team image, Read More CTA | ⬜ Pending |
| 8 | Restyle `Testimonials.jsx` to reference quotes grid | ⬜ Pending |
| 9 | Update `Contact.jsx` header to "Ready to innovate?" + polish `Footer.jsx` | ⬜ Pending |
| 10 | Update `App.jsx` section order to mirror the reference flow | ⬜ Pending |
| 11 | Build (`npm run build`), code review, verify in preview | ⬜ Pending |

---

## 3. Remaining Work — Detailed Notes

### 6. Hero.jsx
- Dark navy background using `hero-bg.jpg` + navy gradient overlay (already in CSS `.hero`).
- Eyebrow pill: "Welcome" (class `.hero-eyebrow`).
- H1: "Ideal Security Solutions for Your Business" with `.line-1` / `.line-2` clip-reveal animation.
- Supporting copy in `.hero-sub`, then a primary "Get Started" button (`#contact`) and a secondary "Explore Solutions" (`#solutions`).
- Keep the trust badges row (Motadata Certified Partner / Enterprise-Grade Security / 24/7 Support) and the animated orbs + dot grid from the old hero.
- Keep the scroll indicator pointing at `#about`.

### 7. About.jsx
- Two-column `.about-grid`: left `.about-text` (eyebrow "About us", H2 "About Infosecure Solutions", the reference description: *Founded in 2015 and headquartered in Bengaluru… 15 years of experience*, and a "Read More" link to `#solutions`), right `.about-media` showing `about-team.jpg` in a framed card.
- Section id stays `#about`.

### 8. Testimonials.jsx
- Replace the carousel with a responsive 3-column `.testimonial-grid` using the reference quotes (John Doe / Jane Smith / Emily Johnson) from `TESTIMONIALS`.
- Each card: 5 stars, italic quote, avatar initials + name + role. Remove carousel state/dots.

### 9. Contact.jsx + Footer.jsx
- Contact section header: eyebrow "Ready to innovate?", H2 "Contact Us for a Consultation" (final CTA of the reference), keep the existing working form.
- Footer: already restyled to navy via CSS; verify links/columns render correctly on the navy background.

### 10. App.jsx
New order (reference flow + retained richer sections):
```
ScrollProgressBar → Header → Hero → MotadataPartner → About →
CoreValues → CTABand("Transform Your IT Infrastructure Today") →
WhyChooseUs → StatsBand → Solutions → CaseStudies → Clients →
Testimonials → Team → FAQ → Contact → Footer → CookieBanner → BackToTop
```
- `CoreValues`, `WhyChooseUs`, `CTABand` are lazy-wrapped with `LazySection` + `ErrorBoundary` like the other sections.

### 11. Validation
- `npm run build` — confirm zero errors and that the `src/assets` images are emitted into `dist/assets`.
- Run the Vite dev server and visually verify hero, about, values, CTA band, why-us, testimonials in the preview (both light and dark theme).
- Code review with the reviewer agent.

---

## 4. Files Touched / Created

- `index.html` — fonts swapped to DM Sans + Mulish
- `src/index.css` — full design system rewrite (reference palette, typography, buttons, cards, sections, dark mode)
- `src/data/content.js` — reference copy added: `CORE_VALUES`, `VALUE_PROPS`, `CTA_BANDS`; testimonials updated; nav extended with "Values"
- `src/components/CoreValues.jsx` — **new**
- `src/components/WhyChooseUs.jsx` — **new**
- `src/components/CTABand.jsx` — **new**
- `src/assets/hero-bg.jpg`, `about-team.jpg`, `cta-bg.jpg` — **new** (from reference site)
- Still to touch: `Hero.jsx`, `About.jsx`, `Testimonials.jsx`, `Contact.jsx`, `Footer.jsx`, `App.jsx`

---

## 5. Notes & Decisions

- Kept the existing React features that the reference lacks (dark mode toggle, scroll progress, cookie banner, back-to-top, lazy sections) — they're restyled to the new palette rather than removed.
- The Motadata partner strip is retained under the hero since partnership messaging is core brand content.
- Buttons are solid blue (`#2235DD` → `#1A2BC6` hover) with 4px radius; CTA bands use a white `.btn-light` for contrast on navy.
- All section eyebrow labels use lowercase "reference style" (e.g. "Our values") to match the original site.
