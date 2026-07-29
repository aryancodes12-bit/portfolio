export interface DiagramNode {
  id: string;
  label: string;
  description: string;
  x: number; // percentage 0-100 for SVG positioning
  y: number; // percentage 0-100
  color: "cyan" | "purple" | "pink" | "green" | "orange";
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
  colorFrom: string;
  colorTo: string;
  categories: string[];
  highlights: string[];
  year: string;
  diagramNodes?: DiagramNode[];
  diagramEdges?: DiagramEdge[];
}

export const allProjects: Project[] = [
  {
    slug: "leetweave-scribe",
    title: "LeetWeave Scribe",
    tagline: "Dual-runtime automated LeetCode → GitHub code organizer",
    description:
      "A dual-runtime automated code organizer (CLI and browser extension) that intercepts accepted LeetCode submissions and pushes them to GitHub into structured, per-problem folders by topic or difficulty.",
    longDescription:
      `LeetWeave Scribe solves a real grind problem: your accepted LeetCode solutions disappear into the void. Scribe automatically intercepts every accepted submission and pushes it to a structured GitHub repository — organized by topic or difficulty — with optional AI-generated approach summaries powered by Groq's Llama-3.3-70B-Versatile.\n\nTwo independent runtimes share a single pipeline: a CLI tool (commander, @inquirer/prompts) for setup and management, and a Manifest V3 browser extension that hooks directly into LeetCode's XHR submission responses. Both share an offline metadata cache of ~2,900 problems — requiring zero network calls for problem lookup. Git operations use simple-git with optimistic locking for resilient concurrent sync.\n\nThe build system uses a custom esbuild pipeline that produces both an IIFE bundle (for the browser extension) and an ESM bundle (for the CLI), with Vitest integration tests and a GitHub Actions CI pipeline.`,
    technologies: ["TypeScript", "Node.js", "Manifest V3", "Vitest", "esbuild", "Groq API", "GitHub REST API", "commander", "simple-git", "zod", "@inquirer/prompts", "chokidar"],
    github: "https://github.com/aryancodes12-bit/LeetWeave-Scribe",
    live: "https://github.com/aryancodes12-bit/LeetWeave-Scribe",
    featured: true,
    colorFrom: "#00f0ff",
    colorTo: "#bc13fe",
    categories: ["TypeScript", "Node.js"],
    year: "2025",
    highlights: [
      "Offline metadata lookup for ~2,900 LeetCode problems — zero API calls needed",
      "Dual-runtime: CLI (Node.js) + Browser Extension (Manifest V3)",
      "AI approach summaries via Groq Llama-3.3-70B-Versatile",
      "Resilient concurrent sync with simple-git + optimistic locking",
      "Custom esbuild pipeline: IIFE (extension) + ESM (CLI) bundles",
      "Vitest test suite + GitHub Actions CI",
    ],
    diagramNodes: [
      {
        id: "lc",
        label: "LeetCode",
        description: "Source platform — user submits solution, accepted response triggers XHR interception",
        x: 5,
        y: 45,
        color: "orange",
      },
      {
        id: "cs",
        label: "Content Script (MV3)",
        description: "Intercepts XHR responses matching LeetCode's submission API endpoint using fetch/XHR wrappers",
        x: 28,
        y: 20,
        color: "cyan",
      },
      {
        id: "bg",
        label: "Background Worker",
        description: "Service worker receives payload from content script via chrome.runtime.sendMessage, orchestrates sync pipeline",
        x: 55,
        y: 20,
        color: "cyan",
      },
      {
        id: "cli",
        label: "CLI Runtime",
        description: "Node.js CLI (commander + @inquirer/prompts) for initial setup, GitHub auth, and manual sync triggers",
        x: 28,
        y: 75,
        color: "purple",
      },
      {
        id: "meta",
        label: "Metadata Cache",
        description: "Offline JSON store of ~2,900 problems with slug, topic tags, and difficulty. Zero network calls.",
        x: 55,
        y: 52,
        color: "green",
      },
      {
        id: "ai",
        label: "Groq API",
        description: "Llama-3.3-70B-Versatile generates concise natural-language approach summary for the accepted solution",
        x: 80,
        y: 22,
        color: "pink",
      },
      {
        id: "git",
        label: "simple-git",
        description: "Resilient git operations with concurrent sync handling, optimistic locking, and exponential backoff retry",
        x: 80,
        y: 58,
        color: "purple",
      },
      {
        id: "gh",
        label: "GitHub Repository",
        description: "Structured per-problem folders: /arrays/two-sum/solution.ts + approach.md, organized by topic or difficulty",
        x: 90,
        y: 85,
        color: "pink",
      },
    ],
    diagramEdges: [
      { from: "lc", to: "cs", label: "XHR response" },
      { from: "cs", to: "bg", label: "submission payload" },
      { from: "bg", to: "meta", label: "lookup problem" },
      { from: "meta", to: "ai", label: "problem + code" },
      { from: "ai", to: "git", label: "summary + code" },
      { from: "cli", to: "meta", label: "resolve metadata" },
      { from: "cli", to: "git", label: "manual sync" },
      { from: "git", to: "gh", label: "push folder" },
    ],
  },
  {
    slug: "seatsync",
    title: "SeatSync – Event Seat Booking",
    tagline: "Production-grade MERN booking platform with atomic concurrency",
    description:
      "Production-minded MERN booking platform with 10-minute seat reservations, MongoDB transactions, and atomic double-booking prevention validated by automated concurrency tests.",
    longDescription:
      `SeatSync is a production-grade event seat booking system engineered to handle the hard concurrency problems real booking platforms face — race conditions, double-bookings, and expiring reservations under high load.\n\nBuilt as a complete MERN stack application with JWT auth, it uses MongoDB multi-document transactions for atomic seat updates, TTL indexes for automatic reservation expiry, and a dual-layer cleanup system (server-side TTL + lazy cleanup on booking requests). The REST API includes rate limiting, centralized error handling, and a comprehensive concurrency integration test suite to validate the guarantees under parallel load.\n\nDelivered end-to-end as the sole backend engineer — from database schema design through API architecture to deployment and documentation.`,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    github: "https://github.com/aryancodes12-bit/sortmyscene-booking-system",
    live: "https://seat-sync-rho.vercel.app/",
    featured: true,
    colorFrom: "#ff007f",
    colorTo: "#00f0ff",
    categories: ["React", "Node.js", "Full-Stack"],
    year: "2026",
    highlights: [
      "Atomic double-booking prevention via MongoDB multi-document transactions",
      "10-minute TTL seat reservation with dual-layer lazy cleanup fallback",
      "JWT authentication with refresh token rotation",
      "Rate limiting + centralized error handling middleware",
      "Automated concurrency & integration test suite",
      "Sole backend engineer — architecture to deployment",
    ],
  },
  {
    slug: "saarthi-ai",
    title: "SaarthiAI – AI Insurance Companion",
    tagline: "Bias-aware, DPDP 2023 compliant AI insurance advisor",
    description:
      "Bias-aware, DPDP 2023 aligned AI insurance advisory platform with life-event detection, policy comparison, bilingual chat advisor, and a privacy-first PII masking layer.",
    longDescription:
      `SaarthiAI addresses a real gap in financial advisory — most insurance recommendation tools are opaque and data-hungry. Saarthi is privacy-first by design, fully compliant with India's Digital Personal Data Protection Act 2023.\n\nThe platform automatically detects life events (marriage, new child, retirement) from conversational user input and proactively surfaces relevant policy recommendations. A bilingual chat advisor (English + Hindi) powered by Gemini AI provides contextual guidance. A dedicated PII masking layer strips sensitive personal data before it ever reaches the AI model.\n\nPolicy comparison mode shows side-by-side comparisons with a bias scoring overlay that flags products with demographic-correlated pricing disparities.`,
    technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "Gemini AI"],
    github: "https://github.com/aryancodes12-bit/SAARTHI-AI",
    live: "https://saarthi-ai-mu.vercel.app/",
    featured: true,
    colorFrom: "#00f0ff",
    colorTo: "#bc13fe",
    categories: ["React", "AI", "Full-Stack"],
    year: "2025",
    highlights: [
      "DPDP Act 2023 compliant privacy architecture",
      "Life-event detection from conversational input (marriage, child, retirement)",
      "Bilingual (English + Hindi) AI chat powered by Gemini",
      "PII masking layer before data reaches AI model",
      "Side-by-side policy comparison with bias scoring overlay",
      "Firebase auth + real-time Firestore sync",
    ],
  },
  {
    slug: "placementos",
    title: "PlacementOS",
    tagline: "AI-assisted unified placement preparation system",
    description:
      "AI-assisted placement preparation system unifying DSA tracking, resume intelligence, interview replay, and a cross-domain readiness engine into one dashboard.",
    longDescription:
      `PlacementOS is a comprehensive placement preparation platform that replaces scattered tools — LeetCode, Notion, YouTube, Google Docs — with a unified, AI-assisted dashboard.\n\nCore features: adaptive DSA problem recommendations (powered by your personal solve history), AI-driven resume scoring with gap analysis against real JDs, interview session replay with AI feedback on clarity and correctness, and a cross-domain readiness engine that maps your current skill graph to the requirements of target job descriptions.\n\nBuilt with React + TypeScript on the frontend and Node.js + PostgreSQL (via Prisma) on the backend, with Groq-powered AI features using structured, validated output via Zod schemas.`,
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Groq"],
    github: "https://github.com/aryancodes12-bit/PlacementOS",
    live: "https://placement-os-kappa.vercel.app/",
    featured: true,
    colorFrom: "#bc13fe",
    colorTo: "#ff007f",
    categories: ["React", "TypeScript", "Node.js", "AI", "Full-Stack"],
    year: "2025",
    highlights: [
      "Adaptive DSA recommendations based on personal solve history & weak areas",
      "AI resume scoring with targeted gap analysis against job descriptions",
      "Interview session replay with AI-generated improvement feedback",
      "Cross-domain readiness engine mapping skills to target roles",
      "PostgreSQL + Prisma for type-safe relational schema",
      "Groq-powered AI with Zod-validated structured output",
    ],
  },
  {
    slug: "air-pollution-dashboard",
    title: "Air Pollution Detection Dashboard",
    tagline: "Real-time AQI visualization for 50+ monitoring stations",
    description:
      "React-based dashboard developed during Bhartiya Antariksh Hackathon 2025 to visualize real-time air quality data from 50+ monitoring stations using satellite and ground sensors.",
    longDescription:
      `Built under hackathon constraints for the Bhartiya Antariksh Hackathon 2025, this dashboard fuses satellite imagery analysis and ground-level IoT sensor data from 50+ monitoring stations into a unified real-time air quality visualization platform.\n\nFeatures an interactive map with color-coded AQI severity overlays, time-series trend charts for major pollutants (PM2.5, PM10, CO2, NO2, SO2), station comparison mode, and automated alert thresholds for hazardous conditions.\n\nDeployed on Netlify with continuous deployment from the main branch, achieving zero cold-start time with full static pre-rendering.`,
    technologies: ["React", "TypeScript", "Netlify"],
    github: "https://github.com/aryancodes12-bit",
    live: "https://air-pollution-detection.netlify.app/",
    featured: true,
    colorFrom: "#bc13fe",
    colorTo: "#ff007f",
    categories: ["React", "TypeScript"],
    year: "2025",
    highlights: [
      "Interactive AQI heatmap with color-coded severity overlays",
      "Real-time data from 50+ satellite & ground-level IoT sensors",
      "Time-series trend charts for PM2.5, PM10, CO2, NO2, SO2",
      "Station comparison mode with side-by-side analytics",
      "Automated hazardous condition alert thresholds",
      "Built and deployed under hackathon time constraints",
    ],
  },
];

export const featuredProjects = allProjects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
