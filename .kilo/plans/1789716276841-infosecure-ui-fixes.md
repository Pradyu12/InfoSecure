# InfoSecure Solutions UI Fixes Plan

## Overview
Apply UI/content fixes across About, Solutions, Contact, and Footer components based on stakeholder feedback. All changes must be fully responsive across all screen resolutions (mobile: <640px, tablet: 640-1024px, desktop: >1024px).

---

## Changes Required

### 1. About Component (`src/components/About.jsx`)
**Issue**: "12+ Global technology partners" needs proper spacing
**Location**: Line 8 in `HIGHLIGHTS` array
**Fix**: Add trailing space to value: `'12+ '` so it renders with space before label
**Responsive**: Verify highlights grid stacks properly on mobile (2x2 → 1x4) and spacing remains consistent

### 2. Solutions Component (`src/components/Solutions.jsx`)
**Issue A**: Make "End-to-end technology solutions, from design to deployment" text bigger
**Location**: Line 14, `h2` element
**Fix**: Increase font size using `clamp()` for fluid typography across breakpoints

**Issue B**: Remove descriptive paragraph
**Location**: Line 15, `<p>Security, backup, storage...engagement.</p>`
**Fix**: Delete this paragraph entirely
**Responsive**: Ensure heading scales properly and section-header spacing adjusts at all breakpoints

### 3. Contact Component (`src/components/Contact.jsx`)
**Issue**: Replace "Headquarters" with two locations: "Registered Office" and "Working Office" (with map)
**Location**: Lines 40-46, contact-detail for location
**Fix**: 
- Change label from "Headquarters" to "Registered Office"
- Add second contact-detail for "Working Office" with map
- The existing map iframe should be associated with Working Office
**Responsive**: 
- Contact grid stacks on mobile (<768px)
- Map maintains aspect ratio on all screens
- Two location cards stack vertically on mobile, side-by-side on desktop

### 4. Footer Component (`src/components/Footer.jsx`) & Icons (`src/icons/index.jsx`)
**Issue A**: YouTube icon needs fix
**Location**: `src/icons/index.jsx` lines 67-73 (`YoutubeIcon`)
**Fix**: Ensure consistent stroke-based rendering (remove fill usage), size: 1.1rem

**Issue B**: WhatsApp icon needs fix
**Location**: `src/icons/index.jsx` lines 83-89 (`WhatsappIcon`)
**Fix**: Convert from fill-based to stroke-based for consistency with other icons, size: 1rem inline
**Responsive**: 
- Social icons wrap on mobile
- WhatsApp link remains touch-friendly (min 44px tap target)
- Footer grid stacks appropriately at each breakpoint

---

## Implementation Order
1. Fix About component spacing
2. Fix Solutions component (text size + remove paragraph)
3. Fix Contact component (two locations with map)
4. Fix Footer icons (YouTube, WhatsApp)

---

## Validation
- Visual review of each modified section at 320px, 640px, 768px, 1024px, 1440px
- Verify icons render correctly in footer and contact sections at all sizes
- Confirm map displays for Working Office and is interactive on touch devices
- Check responsive behavior: no horizontal overflow, proper stacking, readable text
- Test touch targets meet 44px minimum on mobile
- Verify fluid typography scales smoothly between breakpoints