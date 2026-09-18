# Hero Section Carousel Plan

## Overview
Replace the static hero subtitle/description with a rotating carousel of two messages, with dot indicators for navigation.

## Current State
- Static `hero-sub` paragraph with single description
- No interactivity or rotation

## Required Changes

### 1. Hero Component (`src/components/Hero.jsx`)
- Replace static `<p className="hero-sub">` with a carousel component
- Two messages to rotate:
  1. "Complete Control Over Your Digital Ecosystem."
  2. "InfoSecure Solutions unifies enterprise security, deep observability, and IT management into one seamless defense system."
- Add dot indicators (2 dots) below the text
- Auto-rotate every 4-5 seconds
- Manual click on dots to switch

### 2. CSS (`src/index.css`)
- Add styles for carousel container
- Add styles for dot indicators (active/inactive states)
- Add transition animations for text fade
- Ensure responsive behavior

## Technical Approach
- Use `useState` for current index
- Use `useEffect` for auto-rotation interval
- Simple fade transition between messages
- Dots as clickable buttons with keyboard accessibility

## Validation
- Auto-rotation works
- Dot clicks switch messages
- Responsive on mobile/desktop
- Accessible (keyboard, screen readers)
- Build passes