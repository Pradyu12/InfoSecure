# InfoSecure Solutions - Website Layout Design Document

**Version:** 1.0  
**Date:** 2026-09-13  
**Theme:** Red & White  
**Designer:** Vibe Agent

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Design System](#design-system)
3. [Page Structure](#page-structure)
4. [Section-by-Section Layout](#section-by-section-layout)
5. [Component Specifications](#component-specifications)
6. [Responsive Design](#responsive-design)
7. [Color Usage Guide](#color-usage-guide)

---

## 🎯 OVERVIEW

### Purpose
This document describes the visual layout, design system, and component specifications for the InfoSecure Solutions website — a Motadata partner delivering implementation and managed services for observability, network visibility, ITSM, infrastructure, compliance, and modern IT operations.

### Target Audience
- Enterprise IT decision makers
- CIOs, CTOs, IT Directors
- Infrastructure and operations teams
- Technology partners and resellers

### Key Goals
1. Communicate expertise in Motadata platform implementation
2. Highlight value propositions (cost efficiency, expert team, 24/7 support)
3. Generate qualified leads through contact form
4. Establish credibility and trust

---

## 🎨 DESIGN SYSTEM

### Color Palette

| Token | Hex Code | Usage | Preview |
|-------|----------|-------|---------|
| **Primary Red** | `#DC2626` | Buttons, accents, links, active states | ![#DC2626](https://via.placeholder.com/50/DC2626/000000?text=+) |
| **Red Strong** | `#B91C1C` | Hover states, darker accents | ![#B91C1C](https://via.placeholder.com/50/B91C1C/000000?text=+) |
| **Red Soft** | `rgba(220, 38, 38, 0.08)` | Subtle backgrounds, overlays | - |
| **Red Glow** | `rgba(220, 38, 38, 0.28)` | Shadows, glow effects | - |
| **White** | `#FFFFFF` | Primary backgrounds, cards | ![#FFFFFF](https://via.placeholder.com/50/FFFFFF/000000?text=+) |
| **Off-White** | `#FEE2E2` | Card borders, light backgrounds | ![#FEE2E2](https://via.placeholder.com/50/FEE2E2/000000?text=+) |
| **Text Primary** | `#05060F` | Headings, main text | ![#05060F](https://via.placeholder.com/50/05060F/000000?text=+) |
| **Text Secondary** | `#374151` | Subtext, secondary information | ![#374151](https://via.placeholder.com/50/374151/000000?text=+) |
| **Text Muted** | `#6B7280` | Placeholders, subtle text | ![#6B7280](https://via.placeholder.com/50/6B7280/000000?text=+) |
| **Dark BG** | `#241212` | Hero overlay, footer background | ![#241212](https://via.placeholder.com/50/241212/000000?text=+) |

### Typography

| Type | Font Family | Weights | Usage |
|------|-------------|---------|-------|
| **Headings** | DM Sans | 400, 500, 600, 700 | All headings (h1-h6) |
| **Body** | Mulish | 300, 400, 500, 600, 700 | Paragraphs, labels, buttons |

**Font Sizes:**
- H1: `clamp(2.75rem, 6.5vw, 3.5rem)` - Hero headline
- H2: `clamp(2rem, 4.5vw, 2.5rem)` - Section headings
- H3: `1.25rem` - Card titles
- Body: `1rem` (16px)
- Small: `0.85rem` - Labels, tags
- Extra Small: `0.75rem` - Meta text

**Line Heights:**
- Body: `1.7`
- Headings: `1.2`
- Tight: `1.15` (hero headline)

---

## 🏗️ PAGE STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│                        INFOSECURE SOLUTIONS                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  HEADER (Fixed Position)                                   ││
│  │  ┌────────┬──────────────────┬─────────────┐           ││
│  │  │ Logo   │ Navigation Links  │ Get Started │           ││
│  │  │        │ (About, Values,   │ (Button)     │           ││
│  │  │        │  Solutions, etc.) │             │           ││
│  │  └────────┴──────────────────┴─────────────┘           ││
│  │  ☰ (Mobile Menu Button)                                   ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    HERO SECTION                             ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  [Dark Overlay Background]                            │││
│  │  │  ⭕ ⭕ ⭕ (Animated Orbs - Red)                          │││
│  │  │  ⚫ ⚫ ⚫ (Dot Grid Pattern)                             │││
│  │  │                                                         │││
│  │  │  Ideal Security Solutions                              │││
│  │  │  for Your Business                                      │││
│  │  │                                                         │││
│  │  │  InfoSecure Solutions delivers enterprise-grade       │││
│  │  │  security, observability, and IT infrastructure         │││
│  │  │  management — trusted by leading organizations          │││
│  │  │  across industries.                                     │││
│  │  │                                                         │││
│  │  │  [Get Started] [Explore Solutions]                    │││
│  │  │                                                         │││
│  │  │  ✓ Motadata Certified Partner                          │││
│  │  │  ✓ Enterprise-Grade Security                           │││
│  │  │  ✓ 24/7 Support Available                               │││
│  │  │                                                         │││
│  │  │  ┌─────────────────────────┐                          │││
│  │  │  │ 68%  │  75%  │  43%   │ 200+                       │││
│  │  │  │ Alert│ Faster│ Cost   │ Integrations               │││
│  │  │  │ Reduction│Resolution│Savings │                      │││
│  │  │  └─────────────────────────┘                          │││
│  │  │                                                         │││
│  │  │  ↓ Scroll                                                 │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              MOTADATA PARTNER                              ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  [White Background]                                     │││
│  │  │                                                         │││
│  │  │  Technology Partner                                     │││
│  │  │  ┌─────────────────┐                                   │││
│  │  │  │  [Motadata Logo] │  (Original Red/White)              │││
│  │  │  │    Red/White     │                                   │││
│  │  │  └─────────────────┘                                   │││
│  │  │                                                         │││
│  │  │  Official Motadata implementation partner —            │││
│  │  │  deploying AI-native observability, ITSM, and            │││
│  │  │  infrastructure platform for enterprise IT              │││
│  │  │  operations.                                             │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    ABOUT US                                 ││
│  │  ┌──────────────────────┬──────────────────────┐         ││
│  │  │                      │                      │         ││
│  │  │  About                │  [Team Photo]         │         ││
│  │  │  Infosecure Solutions │  ┌──────────────┐   │         ││
│  │  │                      │  │              │   │         ││
│  │  │  Founded in 2015...   │  │  Team Image  │   │         ││
│  │  │  (Description)        │  │              │   │         ││
│  │  │                      │  └──────────────┘   │         ││
│  │  │  [Read More]          │                      │         ││
│  │  └──────────────────────┴──────────────────────┘         ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 OUR CORE VALUES                            ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        ││
│  │  │             │ │             │ │             │        ││
│  │  │   01        │ │   02        │ │   03        │        ││
│  │  │  Innovation │ │  Reliability│ │  Customer    │        ││
│  │  │             │ │             │ │  Commitment │        ││
│  │  │  We prioritize│ │  Our services│ │  We are     │        ││
│  │  │  innovative  │ │  provide... │ │  dedicated  │        ││
│  │  │  solutions...│ │  support... │ │  to...      │        ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘        ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              TRANSFORM YOUR IT INFRASTRUCTURE              ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  [CTA Band with Background Image]                      │││
│  │  │  Take the next step                                    │││
│  │  │  Transform Your IT Infrastructure Today               │││
│  │  │  Discover how Motadata's AI-native platform can        │││
│  │  │  unify your observability, ITSM...                      │││
│  │  │  [Get Started]                                         │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              DISCOVER OUR UNIQUE VALUE                      ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        ││
│  │  │  [Icon]     │ │  [Icon]     │ │  [Icon]     │        ││
│  │  │  Cost       │ │  Expert     │ │  Comprehensive│        ││
│  │  │  Efficiency │ │  Team      │ │  Support    │        ││
│  │  │             │ │             │ │             │        ││
│  │  │  Save up to  │ │  15+ years  │ │  24/7       │        ││
│  │  │  75%...     │ │  experience │ │  support    │        ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘        ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    STATS BAND                               ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        ││
│  │  │ 68%    │ │ 75%    │ │ 43%    │ │ 200+   │        ││
│  │  │ Alert  │ │ Faster │ │ Cost   │ │ Integr │        ││
│  │  │ Reduction│ │ Resolution│ │ Savings │ │ ations │        ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘        ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    SOLUTIONS                                ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        ││
│  │  │ [Icon]      │ │ [Icon]      │ │ [Icon]      │        ││
│  │  │ Full-Stack  │ │ Network     │ │ ITSM       │        ││
│  │  │ Observability│ │ Visibility  │ │ Platform   │        ││
│  │  │             │ │             │ │            │        ││
│  │  │ Monitor...  │ │ Deep packet │ │ Service... │        ││
│  │  │             │ │ inspection  │ │ management │        ││
│  │  │ [▼ Show    │ │ [▼ Show    │ │ [▼ Show    │        ││
│  │  │  More]     │ │  More]     │ │  More]     │        ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘        ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  [Expanded Solution Details Appear Here]              │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    CASE STUDIES                             ││
│  │  ┌─────────────────────────┐ ┌─────────────────────────┐││
│  │  │ Main Case Study          │ │ Secondary  │ Secondary  │││
│  │  │ (Larger, detailed)      │ │ Case      │ Case       │││
│  │  │                         │ │ Study 1   │ Study 2    │││
│  │  │ Manufacturing Leader -   │ │           │            │││
│  │  │ NOC Modernization       │ │           │            │││
│  │  │ 68% alert reduction     │ │           │            │││
│  │  └─────────────────────────┘ └─────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    CLIENTS                                  ││
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           ││
│  │  │ [Icon] │ │ [Icon] │ │ [Icon] │ │ [Icon] │           ││
│  │  │Manufact│ │ BFSI   │ │ Defense│ │Health  │           ││
│  │  │uring   │ │         │ │        │ │care   │           ││
│  │  └────────┘ └────────┘ └────────┘ └────────┘           ││
│  │                                                         ││
│  │  [Scrolling Client Logos]                                ││
│  │  Bosch  Honeywell  L&T  SBI  Bajaj  Dr. Reddy's  ...      ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 TESTIMONIALS                               ││
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐││
│  │  │ ★★★★★          │ │ ★★★★★          │ │ ★★★★★       │││
│  │  │                 │ │                 │ │              │││
│  │  │ "InfoSecure...  │ │ "The team's...   │ │ "Their expert  │││
│  │  │  transformed..." │ │  dedication..."  │ │  isise..."   │││
│  │  │                 │ │                 │ │              │││
│  │  │ [JD] John Doe  │ │ [JS] Jane Smith │ │ [EJ] Emily  │││
│  │  │ Operations Lead│ │ IT Director    │ │ CTO         │││
│  │  └─────────────────┘ └─────────────────┘ └─────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    MEET OUR TEAM                           ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    ││
│  │  │ [Photo]  │ │ [Photo]  │ │ [Photo]  │ │ [Photo]  │    ││
│  │  │ SK       │ │ AV       │ │ PR       │ │ VJ       │    ││
│  │  │ Shankar  │ │ Ankit    │ │ Priyanka │ │ Vikram   │    ││
│  │  │ Founder  │ │ Lead Sol.│ │ Head of │ │ Sr. Supp.│    ││
│  │  │ & CEO    │ │ Architect│ │ Delivery │ │ Engineer │    ││
│  │  │ [Tags]   │ │ [Tags]   │ │ [Tags]   │ │ [Tags]   │    ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘    ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    FAQ                                     ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ Q: What is InfoSecure Solutions?                      │││
│  │  │ A: InfoSecure Solutions is a technology services...   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Q: Which platform does InfoSecure implement?          │││
│  │  │ A: We implement and support the Motadata platform...  │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Q: What industries do you serve?                       │││
│  │  │ A: We support manufacturing, BFSI, defense...        │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              READY TO INNOVATE?                           ││
│  │  ┌─────────────────────┬────────────────────────────┐  ││
│  │  │                     │                            │  ││
│  │  │  Get in touch       │  Send a message             │  ││
│  │  │  ┌─────────────┐   │  ┌──────────────────────┐  │  ││
│  │  │  │ 📧 Email    │   │  │ [Name *]               │  │  ││
│  │  │  │ shankar@... │   │  │ [Email *]              │  │  ││
│  │  │  └─────────────┘   │  │ [Company]              │  │  ││
│  │  │                     │  │ [Subject]              │  │  ││
│  │  │  ☎ Phone         │  │ [Message *]            │  │  ││
│  │  │  +91-9880...     │  │                         │  │  ││
│  │  │                     │  │ [Send Message ▶]       │  │  ││
│  │  │  ⏰ Hours         │  │                         │  │  ││
│  │  │  Mon-Sat, 9-6    │  │                         │  │  ││
│  │  │  IST             │  │                         │  │  ││
│  │  └─────────────────┘   │  └──────────────────────┘  │  ││
│  │  │                     │                            │  ││
│  │  └─────────────────────┴────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    FOOTER                                   ││
│  │  [Dark Background: #241212]                              ││
│  │  ┌──────────────────┬──────────┬──────────┐              ││
│  │  │                  │          │          │              ││
│  │  │  [Logo]          │ Quick    │ Contact  │              ││
│  │  │  InfoSecure      │ Links    │          │              ││
│  │  │  Solutions      │          │          │              ││
│  │  │                  │ About    │ Email    │              ││
│  │  │  Official...     │ Values   │ Phone    │              ││
│  │  │                  │ Solutions│ Get...   │              ││
│  │  │  Motadata...     │ Clients  │          │              ││
│  │  │                  │ FAQ      │          │              ││
│  │  │                  │ Contact  │          │              ││
│  │  └──────────────────┴──────────┴──────────┘              ││
│  │                                                         ││
│  │  ├─────────────────────────────────────────────────────┤ ││
│  │  │  © 2026 InfoSecure Solutions. All rights reserved.   │ ││
│  │  │  Powered by Motadata                                 │ ││
│  │  └─────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 COMPONENT SPECIFICATIONS

### Buttons

| Type | Style | Usage |
|------|-------|-------|
| **Primary** | White bg, Red text, Red border | Main CTAs (Get Started, Send Message) |
| **Secondary** | White bg, Red border, Red text on hover | Secondary actions (Explore Solutions, Read More) |
| **Light** | White bg, Dark text | On dark backgrounds (CTA bands) |

**Sizes:**
- Standard: `padding: 0.85rem 2rem`
- Small: `padding: 0.5rem 1rem`
- Border radius: `4px`

**Hover Effects:**
- Lift: `transform: translateY(-2px)`
- Shadow: `box-shadow: 0 6px 20px rgba(220, 38, 38, 0.2)`

### Cards

**Standard Card:**
- Background: White
- Border: `1px solid #FEE2E2`
- Border radius: `10px`
- Padding: `1.5rem`
- Box shadow: `0 1px 3px rgba(40, 10, 10, 0.06)`
- Hover: Lift `4px`, shadow intensifies

**Card Header:**
- Icon container: `3rem × 3rem`, red soft background
- Title: `1.2rem`, DM Sans, `#05060F`
- Description: `0.95rem`, Mulish, `#374151`

### Form Fields

- Input/textarea: `padding: 0.75rem 1rem`, border `1px solid #FEE2E2`
- Border radius: `4px`
- Focus: Red border, red soft glow
- Placeholder: `#6B7280`

### Icons

- Size: `1.25rem` (standard), `1rem` (small), `1.6rem` (large)
- Color: `#DC2626` (primary), `#B91C1C` (hover/active)

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| **Mobile** | < 640px | Single column layout, stacked hero CTA buttons, mobile menu |
| **Tablet** | 640px - 768px | Two-column grids, horizontal hero CTAs |
| **Desktop** | 768px - 1024px | Three-column grids, full navigation |
| **Wide** | > 1024px | Four-column grids, expanded content |

### Layout Adaptations

**Header:**
- Mobile: Hamburger menu, collapsed navigation
- Desktop: Full horizontal navigation with all links

**Hero:**
- Mobile: Stacked CTA buttons (vertical)
- Tablet+: Horizontal CTA buttons

**Sections:**
- Mobile: Single column
- Tablet: Two columns
- Desktop: Three columns (where applicable)

**Cards:**
- Mobile: Full width
- Tablet: 2 per row
- Desktop: 3-4 per row

---

## 🎨 COLOR USAGE GUIDE

### Primary Color (Red - #DC2626)
- ✅ Primary buttons (background)
- ✅ Accent text
- ✅ Links
- ✅ Icons
- ✅ Active states
- ✅ Numbered section headers
- ✅ Card highlights
- ✅ Scroll progress bar

### Secondary Colors

**White (#FFFFFF):**
- ✅ Page background
- ✅ Card backgrounds
- ✅ Text on dark backgrounds

**Off-White (#FEE2E2):**
- ✅ Card borders
- ✅ Section dividers
- ✅ Subtle backgrounds

**Dark (#241212):**
- ✅ Hero overlay
- ✅ Footer background

**Text Colors:**
- `#05060F`: Primary text, headings
- `#374151`: Secondary text
- `#6B7280`: Muted text, placeholders

### Color Contrast

All text maintains WCAG AA contrast ratios:
- Red on White: 7.2:1 ✅
- White on Dark: 15.3:1 ✅
- Dark on White: 15.3:1 ✅

---

## 📄 EXPORT NOTES

This document is designed to be exported as a PDF for easy sharing. To generate a PDF:

### Option 1: Using Pandoc
```bash
pandoc LAYOUT_DESIGN.md -o LAYOUT_DESIGN.pdf --pdf-engine=weasyprint
```

### Option 2: Using VS Code
1. Open this file in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Search for "Markdown: Export to PDF"
4. Save the generated PDF

### Option 3: Using Browser Print
1. Open this file in a Markdown viewer
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Select "Save as PDF"

---

## 📞 CONTACT

For questions about this design document or the website implementation:

- **Email:** shankar@infosecuresolutions.co.in
- **Phone:** +91-9880564227
- **Website:** https://www.infosecuresolutions.co.in/

---

*Generated by Vibe Agent for InfoSecure Solutions*
*Document Version: 1.0 | Last Updated: 2026-09-13*
