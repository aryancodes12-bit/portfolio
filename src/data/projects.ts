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

export interface WhatsNewItem {
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  desc?: string;
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
  badge?: string;
  whatsNew?: WhatsNewItem[];
  metrics?: MetricItem[];
}

export const allProjects: Project[] = [
  {
    slug: "learnhub",
    title: "LearnHub",
    tagline: "Centralized academic resource system with text-grounded Groq AI (Hackathon 1st Runner-Up)",
    description:
      "Hackathon 1st Runner-Up: Centralized university learning platform with text-grounded Groq Llama 3.3 AI study assistant, unsigned Cloudinary uploads, and Firebase real-time sync.",
    longDescription:
      `LearnHub was built under a high-pressure 2-hour hackathon constraint and clinched 1st Runner-Up 🥈. Rather than building a generic chatbot wrapper, LearnHub pairs a centralized university resource archive (notes, ISE/ESE PYQs, and lab manuals organized strictly by semester and subject) with a Groq-powered AI study assistant grounded in the actual extracted text of uploaded documents.\n\nThe system features server-side document parsing via pdf-parse and mammoth, extracting clean context chunks (up to 12,000 characters) to feed Groq's Llama 3.3 without client-side API key exposure. Students can trigger one-click pedagogical revision summaries, formula sheets, high-yield university exam questions, and engage in context-locked Q&A with full grounding transparency badges.\n\nArchitected as backend lead alongside teammate Jidnyesh, delivering direct unsigned Cloudinary client-to-cloud uploads with live per-file progress tracking, Firebase Auth (Google OAuth & email/password), and Cloud Firestore for bookmarks, view counts, and cached AI analysis.`,
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Groq API",
      "Firebase",
      "Firestore",
      "Cloudinary",
      "pdf-parse",
      "Tailwind CSS",
    ],
    github: "https://github.com/aryancodes12-bit/Learn-HUB",
    live: "https://github.com/aryancodes12-bit/Learn-HUB",
    featured: true,
    colorFrom: "#00ff88",
    colorTo: "#00f0ff",
    categories: ["TypeScript", "React", "Full-Stack", "AI", "Node.js"],
    year: "2026",
    badge: "🥈 1ST RUNNER-UP — University Hackathon Winner",
    highlights: [
      "1st Runner-Up Hackathon Winner built and shipped under a strict 2-hour constraint",
      "Server-side document parsing (pdf-parse & mammoth) extracting text for Groq Llama 3.3 AI",
      "Context-locked Q&A tutor with keyword-overlap chunk retrieval & anti-hallucination badges",
      "Unsigned browser-to-cloud Cloudinary uploads with per-file progress tracking",
      "Firebase Auth & Cloud Firestore for real-time bookmarks, download counters & cached AI summaries",
      "Architected end-to-end backend, API pipeline, and AI inference system",
    ],
    diagramNodes: [
      {
        id: "client",
        label: "Next.js 14 Client",
        description: "Dashboard, semester matrix (Sem 3-5), search & filters",
        x: 10,
        y: 35,
        color: "cyan",
      },
      {
        id: "cld",
        label: "Cloudinary",
        description: "Direct unsigned browser-to-cloud document storage",
        x: 38,
        y: 15,
        color: "orange",
      },
      {
        id: "api",
        label: "Next.js API Routes",
        description: "Server-side text extraction & secure Groq inference pipeline",
        x: 38,
        y: 65,
        color: "purple",
      },
      {
        id: "parser",
        label: "pdf-parse / mammoth",
        description: "Extracts up to 12,000 chars of clean context per document",
        x: 65,
        y: 75,
        color: "green",
      },
      {
        id: "groq",
        label: "Groq Llama 3.3",
        description: "Ultra-fast text-grounded pedagogical summaries & contextual Q&A",
        x: 90,
        y: 65,
        color: "pink",
      },
      {
        id: "db",
        label: "Cloud Firestore",
        description: "Bookmarks, analytics, cached AI study notes & metadata",
        x: 65,
        y: 25,
        color: "cyan",
      },
    ],
    diagramEdges: [
      { from: "client", to: "cld", label: "unsigned upload" },
      { from: "client", to: "api", label: "extract & analyze" },
      { from: "api", to: "parser", label: "parse buffer" },
      { from: "parser", to: "groq", label: "grounded context" },
      { from: "groq", to: "client", label: "stream response" },
      { from: "client", to: "db", label: "sync bookmarks" },
      { from: "api", to: "db", label: "cache summaries" },
    ],
  },
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
    title: "SaarthiAI V2 – AI Insurance Advisory Platform",
    tagline: "India's AI-native insurance advisory platform · Top 10 / 300+ teams at National Hackathon 2026",
    description:
      "Top 10 / 300+ teams (National Hackathon 2026): Full-stack AI insurance platform built for Bharat with Groq Llama 3.3 70B, DPDP 2023 compliance, 99-product IRDAI catalog, and multi-channel marketing automation.",
    longDescription:
      `SaarthiAI V2 is a full-stack, AI-native insurance advisory platform engineered for Bharat — built, shipped, and ranked Top 10 out of 300+ teams in 48 hours at a National Level Hackathon in 2026.\n\nUnlike superficial chatbot wrappers, SaarthiAI V2 addresses the 400M+ underinsured population in India through a multi-tier production architecture. The system ingests natural language queries in Hindi, English, and Hinglish, detects 8 core life events (marriage, newborn baby, home purchase, new job, retirement, health diagnosis, vehicle purchase, business startup), and maps users into 5 coverage gap segments.\n\nRecommendations are retrieved from a verified catalog of 99 Indian insurance products across 45+ insurers and 5 categories (Health, Term Life, Motor, Property, Retirement), enriched with official IRDAI Claim Settlement Ratios (CSR). Real-time premium estimation factors in 8 actuarial parameters with dynamic Recharts area charts, while a 4-stage Claims Tracker manages claim lifecycles with complete audit logging.\n\nPrivacy and ethics are baked into the core: a DPDP 2023 compliant PII masking layer strips 6 sensitive data types (Aadhaar, PAN, email, phone, name, DOB) before sending context to Groq's Llama 3.3 70B model. Every AI generation is passed through 3 fairness rules to eliminate gender, caste, and demographic bias.\n\nA serverless automation engine powered by 6 Firebase Cloud Functions triggers personalized, cooldown-protected multi-channel outreach across WhatsApp (Twilio/TextMeBot), SMS (Fast2SMS/TextBee), Email (Nodemailer/EmailJS), Push notifications (OneSignal), and voice calls (Vapi AI). The frontend is built on React 19 and Vite with an Indian cultural design system tokens (raat, diya, dhoop, megh, sindoor, safed) and an interactive SVG life journey path.`,
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Groq API",
      "Llama 3.3 70B",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloud Functions",
      "Twilio",
      "Fast2SMS",
      "Vapi AI",
      "Recharts",
      "Framer Motion",
    ],
    github: "https://github.com/aryancodes12-bit/SAARTHI-AI-V2",
    live: "https://saarthi-ai-v2.vercel.app/",
    featured: true,
    colorFrom: "#f2a93b",
    colorTo: "#ff007f",
    categories: ["React", "AI", "Full-Stack", "Node.js"],
    year: "2026",
    badge: "🏆 TOP 10 / 300+ TEAMS — National Level Hackathon 2026",
    metrics: [
      { label: "Hackathon Rank", value: "Top 10" },
      { label: "Teams Competed", value: "300+" },
      { label: "Insurance Products", value: "99" },
      { label: "Partner Insurers", value: "45+" },
      { label: "Cloud Functions", value: "6" },
      { label: "Delivery Channels", value: "8" },
    ],
    whatsNew: [
      {
        title: "Groq Llama 3.3 70B Engine",
        description: "Migrated to high-throughput Groq Llama 3.3 70B for natural language bilingual chat, life-event detection, and marketing copy generation.",
      },
      {
        title: "99-Product IRDAI Catalog",
        description: "Curated 99 real Indian insurance policies across 45+ insurers with official CSR ratios, network hospital counts, and official insurer links.",
      },
      {
        title: "8 Life Event Detectors",
        description: "Detects marriage, new baby, home purchase, new job, retirement, health crisis, vehicle, and business startup from conversational Hinglish.",
      },
      {
        title: "Multi-Channel Marketing Automation",
        description: "6 Firebase Cloud Functions trigger contextual outreach via WhatsApp (Twilio), SMS (Fast2SMS), Email (Nodemailer), Push, and Vapi AI Voice.",
      },
      {
        title: "DPDP 2023 Architectural Privacy Layer",
        description: "Pre-AI PII masking for 6 data types (Aadhaar, PAN, phone, email, DOB, name) plus 5 granular consent toggles and an immutable audit log.",
      },
      {
        title: "Responsible AI Bias Auditing",
        description: "3 non-negotiable fairness rules injected into system prompts and evaluated on responses to prevent gender, caste, or demographic bias.",
      },
      {
        title: "Indian Cultural Design Tokens",
        description: "Handcrafted design palette (raat, diya, dhoop, megh, sindoor, safed), bilingual IBM Plex typography, and SVG life journey path.",
      },
      {
        title: "Claims Tracker & Actuarial Calculator",
        description: "End-to-end 4-stage claims lifecycle management with timeline audits and real-time premium projections with IRDAI regulatory disclaimers.",
      },
    ],
    highlights: [
      "Ranked Top 10 out of 300+ teams at a national-level hackathon (built & shipped in 48 hours)",
      "Bilingual AI chat (Hindi + English) powered by Groq Llama 3.3 70B with 8 life-event detectors",
      "99 real Indian insurance products from 45+ insurers with IRDAI claim settlement data",
      "Multi-channel marketing automation engine dispatching WhatsApp, SMS, Email, Push & AI Voice",
      "Architectural DPDP 2023 compliance with 6-type PII masking & granular consent audit logs",
      "6 serverless Firebase Cloud Functions with anti-spam cooldown rules and claims workflow tracking",
    ],
    diagramNodes: [
      {
        id: "client",
        label: "React 19 + Vite",
        description: "Bilingual UI, 21 routes, life journey path & Recharts calculator",
        x: 10,
        y: 35,
        color: "cyan",
      },
      {
        id: "pii",
        label: "DPDP PII Masker",
        description: "Redacts Aadhaar, PAN, phone, email, name, DOB before model inference",
        x: 35,
        y: 35,
        color: "green",
      },
      {
        id: "groq",
        label: "Groq Llama 3.3 70B",
        description: "Detects 8 life events, classifies 5 user segments & generates advice",
        x: 60,
        y: 20,
        color: "pink",
      },
      {
        id: "db",
        label: "Cloud Firestore",
        description: "12+ collections: 99 products, claims, behavior logs & consent audits",
        x: 60,
        y: 60,
        color: "purple",
      },
      {
        id: "functions",
        label: "Cloud Functions",
        description: "6 Node 24 serverless triggers with anti-spam cooldown logic",
        x: 85,
        y: 60,
        color: "orange",
      },
      {
        id: "channels",
        label: "Omnichannel APIs",
        description: "WhatsApp (Twilio), SMS (Fast2SMS), Email, Push & Vapi AI Voice",
        x: 90,
        y: 20,
        color: "cyan",
      },
    ],
    diagramEdges: [
      { from: "client", to: "pii", label: "sanitize prompt" },
      { from: "pii", to: "groq", label: "masked context" },
      { from: "groq", to: "client", label: "bias-checked stream" },
      { from: "client", to: "db", label: "sync claims & quotes" },
      { from: "db", to: "functions", label: "onWrite triggers" },
      { from: "functions", to: "channels", label: "automated dispatch" },
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
  return allProjects.find(
    (p) =>
      p.slug === slug ||
      (slug === "saarthi-ai-v2" && p.slug === "saarthi-ai")
  );
}
