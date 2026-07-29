<div align="center">

# Aryan Jaiswal — Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-r170-black?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

**A performance-first, motion-rich developer portfolio built with the Next.js App Router, React 19, and Three.js.**

[**Live Site →**](https://portfolio-one-gules-fxxz8g237e.vercel.app/)

</div>

---

## Overview

This portfolio is engineered as a multi-page Next.js application — not a static template. Every section is a purpose-built React component backed by a centralized data layer, route-aware navigation, and cinematic micro-interactions.

**Key design principles:**
- Typography-first hierarchy with Space Grotesk (display), Inter (body), and JetBrains Mono (code)
- Neon-dark aesthetic with Cyan / Magenta / Pink accent system
- Scroll-triggered animations via Framer Motion with `whileInView` and spring physics
- Real-time interactive 3D particle orb (Three.js) with mouse-reactive displacement
- Mobile-first responsive layout with adaptive particle count and dock sizing

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, TopNav, NavigationDock
│   ├── page.tsx                # Home — Hero, About, Skills, Projects, Experience, Contact
│   ├── globals.css             # Design tokens, keyframes, glow utilities, scrollbar
│   ├── projects/
│   │   ├── page.tsx            # Filterable project listing
│   │   └── [slug]/page.tsx     # Project deep-dive with system diagram
│   ├── lab/page.tsx            # Simulated CLI playground
│   └── analytics/page.tsx      # Data visualization dashboard
├── components/
│   ├── sections/               # Page-level sections (Hero, About, Skills, Projects, etc.)
│   ├── magicui/                # Shimmer buttons, neon cards, retro grid, particles, dock
│   └── ui/                     # Shared primitives (TopNav, Toast, LiveActivityTicker, etc.)
└── data/
    └── projects.ts             # Single source of truth for all project metadata
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | Framer Motion 12, CSS keyframes |
| 3D | Three.js (custom particle orb with mouse-reactive displacement) |
| Components | Custom MagicUI library (NeonGradientCard, BorderBeam, Dock, Marquee, Particles) |
| Fonts | Space Grotesk, Inter, JetBrains Mono (via `next/font/google`) |
| Deployment | Vercel (Edge, automatic preview deploys) |

---

## Features

### Navigation & Layout
- **Bottom Dock** — macOS-style magnification dock with route-aware active states, magnetic hover, and tooltip labels
- **Top Nav** — glassmorphism sticky bar that appears only on sub-pages (`/projects`, `/lab`, `/analytics`)
- **Scroll Reveal** — directional entrance animations on every section

### Hero
- Typewriter role rotation with blinking cursor
- Live Activity Ticker — simulated real-time commit/solve feed with green pulse indicator
- Subtle code-stream background (monospace characters at ~8% opacity)
- Mouse-wheel scroll indicator with hover label

### Interactive 3D Orb
- 1,800-particle sphere with radial gradient texture (Cyan → Purple → transparent)
- Mouse-proximity repulsion field with inverse-rotation compensation
- Internal wireframe icosahedron at 4% opacity for volumetric depth
- **Mobile-optimized:** 400 particles, reduced pixel ratio, disabled antialiasing

### Projects
- Category filter tabs (All / TypeScript / React / Node.js / Full-Stack / AI)
- Animated project count that ticks up on scroll-in
- NeonGradientCard + TiltedCard with per-project color schemes
- Deep-dive link to `/projects/[slug]`

### About
- Animated stat counters (count up from zero on intersection)
- Triple-click easter egg that reveals a JSON fun-fact snippet

### Skills
- Dual-row marquee with pause-on-hover and click-to-copy skill name
- Category pill grid (Languages, Frameworks, Databases, Tools, Competencies)

### Experience
- Scroll-linked animated timeline with gradient progress line
- Alternating card layout with spring entrance animations
- Company metadata badges (calendar, location, building icons)

### Contact
- Mailto integration with shimmer button CTA
- Social link cards (GitHub, LinkedIn, Twitter)
- Inline quick-message form with animated validation states

### Performance & Accessibility
- `suppressHydrationWarning` on body to handle extension attribute injection
- Skip-to-content link as first focusable element
- `aria-label` on all icon-only interactive elements
- `role="navigation"` on dock and top nav
- Custom focus-visible ring (2px cyan outline)
- Responsive scrollbar styling

---

## Getting Started

```bash
# Clone
git clone https://github.com/aryancodes12-bit/portfolio.git
cd portfolio/nextjs-portfolio

# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

---

## Lighthouse Targets

| Category | Target |
|----------|:------:|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Roadmap

- [ ] `/projects/[slug]` — interactive SVG system diagram for LeetWeave Scribe
- [ ] `/analytics` — Chart.js dashboard (LeetCode velocity, topic radar, GitHub heatmap)
- [ ] `/lab` — simulated CLI terminal playback for LeetWeave Scribe demo
- [ ] Live GitHub API integration for contribution graph
- [ ] `prefers-reduced-motion` respect across all Framer Motion variants
- [ ] Static OG image generation per page

---

## License

MIT — feel free to fork, modify, and use as a starting point for your own portfolio.

---

<div align="center">

**Built by [Aryan Jaiswal](https://github.com/aryancodes12-bit)**

</div>
