# Hero & Header Redesign Plan

## Goal
Redesign the landing page hero section and header based on user requirements:
1. Change hero background to cybersecurity-themed image (firewall/access points/endpoints)
2. Make logo bigger
3. Remove "Get Started" and "Explore Solutions" from hero
4. Add those buttons to the top bar (header)
5. Freeze/sticky top bar
6. Move hero text to the left (left-aligned)

---

## Current State Analysis

### Hero Section (`src/components/Hero.jsx`)
- Currently has centered text layout
- Has `hero-ctas` with "Get Started" and "Explore Solutions" buttons
- Has hero-trust badges and metrics
- Background uses `hero-bg.jpg` with CSS overlay gradients
- Text is centered (`.hero-content { text-align: center }`)

### Header (`src/components/Header.jsx`)
- Already has `position: fixed` (sticky)
- Logo at 36px height
- Has nav links and a "Get Started" CTA in nav
- Already has `position: fixed` with hide-on-scroll behavior

### CSS (src/index.css)
- Hero uses `hero-bg.jpg` with CSS gradient overlays
- Hero content is centered (`text-align: center`)
- Header is fixed with hide-on-scroll behavior
- Logo is 36px height

---

## Implementation Plan

### 1. Hero Background Image
**Decision**: Since we cannot use the specific premium image (model doesn't support image input), we'll create a CSS-based cybersecurity-themed background that evokes firewall/access points/endpoints theme.

**Approach**: 
- Keep the `hero-bg.jpg` as base layer (or replace with a cybersecurity-themed image if available)
- Enhance the CSS overlay with more explicit cybersecurity visual elements:
  - Network grid lines
  - Connection nodes/endpoints
  - Shield/firewall icons as CSS shapes
  - Subtle animation for "data flow" effect

**Files to modify**: `src/index.css` (hero section styles)

### 2. Make Logo Bigger
**Current**: Logo height is 36px
**Target**: Increase to ~50-60px for better visibility
**Files**: `src/index.css` (`.logo img` height)

### 3. Remove CTA Buttons from Hero
**Action**: Remove the `.hero-ctas` div from `src/components/Hero.jsx`
**Files**: `src/components/Hero.jsx`

### 4. Add CTA Buttons to Header
**Action**: Add "Get Started" and "Explore Solutions" buttons to header navigation
- Position: In the nav links area (right side)
- Style: Match existing button styles
- "Get Started" - primary style
- "Explore Solutions" - secondary style
**Files**: `src/components/Header.jsx`

### 6. Move Hero Text to Left
**Current**: `.hero-content { text-align: center }`
**Target**: Change to `text-align: left` and adjust container alignment
**Files**: `src/index.css` (`.hero-content`)

---

## Implementation Order

1. **Update Hero Background** - Modify CSS for cybersecurity-themed background
2. **Update Header** - Add CTA buttons, increase logo size, ensure sticky/frozen
3. **Update Hero Component** - Remove CTA buttons, adjust text alignment
4. **Update CSS** - Left-align hero text, adjust layout

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Hero background, hero text alignment, logo size, header sticky behavior |
| `src/components/Hero.jsx` | Remove CTA buttons, keep trust badges/metrics |
| `src/components/Header.jsx` | Add CTA buttons to nav, ensure logo size |

---

## Design Decisions Needed

### 1. Hero Background Image
**Question**: Do you have a specific cybersecurity-themed image you'd like to use, or should we continue with the CSS-generated cybersecurity theme (network grid, shield patterns, connection nodes)?
- **Recommendation**: Continue with enhanced CSS-generated background (no external image dependency, performs better, matches brand colors)

### 2. Logo Size
**Question**: What size would you like for the logo?
- **Current**: 36px
- **Recommendation**: 56px (50% larger, more prominent)

### 3. Header Button Styles
**Question**: Should the header CTA buttons match the existing nav CTA style or have distinct styling?
- **Recommendation**: Use existing nav-cta style for "Get Started", add "Explore Solutions" as secondary outline style

### 4. Hero Text Layout
**Question**: Should the hero content be fully left-aligned or left-aligned within a max-width container?
- **Recommendation**: Left-align within max-width container (e.g., 640px max-width) for readability

---

## Validation Steps

1. Build passes (`npm run build`)
2. Dev server runs without errors (`npm run dev`)
2. Visual verification:
   - Hero background shows cybersecurity theme
   - Logo is visibly larger
   - Hero text is left-aligned
   - Header has both CTA buttons
   - Header is sticky/frozen on scroll
   - Hero CTA buttons removed
   - Responsive on mobile

---

## Open Questions

1. **Hero Background**: Use CSS-generated theme or do you have an image file to add to `src/assets/`?
2. **Logo Size**: 56px or different size?
3. **Header Buttons**: Exact styling preference?
4. **Hero Text Container**: Max-width constraint for left-aligned text?