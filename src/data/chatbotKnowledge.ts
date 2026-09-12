/**
 * chatbotKnowledge.ts
 * ---------------------------------------------------------------------------
 * Single source of truth for the AI chatbot's knowledge base.
 * ALL information here is sourced from the actual portfolio data, README files,
 * and explicitly provided resume/project information.
 *
 * To update:
 *  - Personal info  → edit the `personalProfile` object
 *  - Skills         → edit the `skills` object
 *  - Experience     → edit the `workExperience` array
 *  - Projects       → edit the `projects` array
 * ---------------------------------------------------------------------------
 */

export interface ChatbotProject {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
  year: string;
  keywords: string[]; // for fuzzy matching when user mentions the project
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface PersonalProfile {
  name: string;
  firstName: string;
  bio: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  certificates: string;
  resumeUrl: string;
  taglines: string[];
  interests: string[];
  funFacts: string;
  currentlyLearning: string;
}

// ─── Personal Profile ────────────────────────────────────────────────────────

export const personalProfile: PersonalProfile = {
  name: "Aryan Jaiswal",
  firstName: "Aryan",
  bio: [
    "I'm an Information Technology engineering student and full-stack developer who builds production-style systems end to end — from database schema and API design to responsive, motion-rich interfaces. I care about writing code that holds up under real usage, not just code that works in a demo.",
    "My work spans the stack: React and TypeScript on the frontend, Node.js and Express on the backend, with PostgreSQL, MongoDB, and Firebase for data. I've shipped systems with real engineering constraints — atomic transactions to prevent race conditions, JWT-based auth, real-time updates with Socket.IO, and AI-assisted features backed by structured, validated output rather than raw model responses.",
    "Beyond building, I actively practice Data Structures and Algorithms, think in terms of system design and trade-offs, and contribute to open-source projects. I'm most energized by problems that sit at the intersection of clean UI and solid backend architecture.",
  ],
  location: "Mumbai, India",
  email: "aryanjaiswal3080@gmail.com",
  github: "https://github.com/aryancodes12-bit",
  linkedin: "https://www.linkedin.com/in/aryanjaiswal30",
  leetcode: "https://leetcode.com/u/aryancodes_/",
  certificates:
    "https://drive.google.com/drive/folders/11YZ_E-IrZ-2xR0dp9Y5NaoM8yTAkoBYT",
  resumeUrl: "/Aryan_Jaiswal_Resume.pdf",
  taglines: [
    "Full Stack Developer",
    "Problem Solver",
    "Innovator",
    "Designer",
  ],
  interests: [
    "Competitive coding and DSA",
    "System design and architecture",
    "Chess",
    "AI-assisted development",
    "Open-source contribution",
    "Building production-grade systems",
  ],
  funFacts:
    "I drink about 3 cups of coffee a day, my favourite algorithm is Dijkstra's, and my motto is: 'Ship it, then make it elegant.'",
  currentlyLearning: "Rust",
};

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills = {
  languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  frameworksAndLibraries: [
    "React 19",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Zustand",
    "TanStack Query",
    "Socket.IO",
    "GraphQL",
    "Next.js",
    "Framer Motion",
    "Vite",
  ],
  databases: [
    "MongoDB Atlas",
    "PostgreSQL",
    "Prisma ORM",
    "Mongoose",
    "Firebase",
    "Firestore",
  ],
  developerTools: [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "Vercel",
    "Render",
    "Netlify",
    "Vitest",
    "Supertest",
    "React Testing Library",
    "Docker",
    "esbuild",
  ],
  coreCompetencies: [
    "Full-Stack Development",
    "REST APIs",
    "JWT/OAuth Authentication",
    "Database Design",
    "Data Structures & Algorithms (DSA)",
    "System Design",
    "Concurrent Systems",
    "Atomic Transactions",
    "AI-assisted Features (Groq, Firebase, Cloudinary)",
  ],
};

// ─── Work Experience ──────────────────────────────────────────────────────────

export const workExperience: WorkExperience[] = [
  {
    role: "Backend Developer",
    company: "SortMyScene",
    period: "Jun 2026",
    location: "Remote",
    description: [
      "Architected SeatSync, a production-grade MERN event-booking platform handling real-time seat reservations for high-traffic nightlife events.",
      "Engineered atomic double-booking prevention using MongoDB transactions and conditional seat updates, guaranteeing zero conflicting reservations under concurrent load.",
      "Designed a dual-layer reservation expiry system combining MongoDB TTL indexing with lazy seat cleanup for airtight consistency.",
      "Built and shipped a full REST API with JWT authentication, rate limiting, and centralized error handling, backed by automated concurrency and integration tests.",
      "Delivered the complete assignment end-to-end — from system architecture and database design to deployment and documentation — as the sole backend engineer.",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "React"],
  },
  {
    role: "Web Development Intern",
    company: "SkillCraft Technology",
    period: "Apr 2025",
    location: "Remote",
    description: [
      "Developed and maintained 5+ web applications using React.js, JavaScript, and modern UI practices.",
      "Worked on both front-end and back-end integration following responsive design principles.",
      "Collaborated with a 3-member development team using Agile methodology.",
      "Improved application performance and UI consistency through component reusability.",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
  },
  {
    role: "Open Source Contributor",
    company: "Social Winter of Code (SWOC)",
    period: "Jan 2025",
    location: "Remote",
    description: [
      "Contributed to 3+ open-source projects through bug fixes and feature enhancements.",
      "Performed 10+ code reviews and submitted 15+ pull requests successfully merged.",
      "Used Git and GitHub for version control and collaborative development.",
      "Gained hands-on experience working with large codebases and community standards.",
    ],
    technologies: ["Git", "GitHub", "JavaScript", "Open Source"],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const education = {
  degree: "B.Tech in Information Technology",
  type: "Engineering",
  duration: "Ongoing",
  notes:
    "IT engineering student with 2+ years of hands-on development experience, actively applying academic knowledge to real-world production systems.",
};

// ─── Achievements ─────────────────────────────────────────────────────────────

export const achievements = [
  {
    title: "1st Runner-Up — University Hackathon",
    project: "LearnHub",
    description:
      "Built and shipped LearnHub (an AI-powered academic resource platform) under a strict 2-hour hackathon constraint and clinched 1st Runner-Up.",
  },
  {
    title: "Top 10 / 300+ Teams — National Level Hackathon 2026",
    project: "SaarthiAI V2",
    description:
      "Ranked Top 10 out of 300+ teams at a national-level hackathon in 2026, building SaarthiAI V2 — a full-stack AI insurance advisory platform for India — in 48 hours.",
  },
  {
    title: "Bhartiya Antariksh Hackathon 2025",
    project: "Air Pollution Detection Dashboard",
    description:
      "Built an interactive real-time AQI visualization dashboard fusing satellite imagery and IoT sensor data from 50+ monitoring stations under hackathon constraints.",
  },
  {
    title: "20+ Certifications",
    description:
      "20+ professional certifications across web development, cloud, and computer science fundamentals.",
    link: "https://drive.google.com/drive/folders/11YZ_E-IrZ-2xR0dp9Y5NaoM8yTAkoBYT",
  },
  {
    title: "15+ Open Source Pull Requests",
    description:
      "15+ successfully merged pull requests during Social Winter of Code (SWOC).",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: ChatbotProject[] = [
  {
    name: "LearnHub",
    slug: "learnhub",
    tagline: "Centralized academic resource system with text-grounded Groq AI",
    badge: "🥈 1st Runner-Up — University Hackathon",
    year: "2026",
    description:
      "LearnHub is a centralized university learning platform I built under a 2-hour hackathon constraint that won 1st Runner-Up. It pairs a structured academic resource archive (notes, ISE/ESE PYQs, lab manuals organized by semester and subject) with a Groq-powered AI study assistant grounded in the actual text of uploaded documents.",
    problem:
      "Engineering students face fragmented academic resources scattered across endless chat groups, lost Google Drive links, and messy email threads — making exam revision chaotic.",
    solution:
      "A centralized platform where students access verified semester notes, previous year question papers, and an AI tutor that actually reads the uploaded documents rather than hallucinating answers.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "React",
      "Groq API",
      "Llama 3.3 70B",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloudinary",
      "pdf-parse",
      "mammoth",
      "Tailwind CSS",
    ],
    highlights: [
      "Built and shipped in a strict 2-hour hackathon — won 1st Runner-Up",
      "Server-side document parsing using pdf-parse and mammoth (up to 12,000 chars) so the AI reads real content",
      "Context-locked Q&A with keyword-overlap chunk retrieval and anti-hallucination grounding badges",
      "Direct unsigned browser-to-cloud Cloudinary uploads with live per-file progress tracking",
      "Firebase Auth (Google OAuth + email/password) and Cloud Firestore for bookmarks, view counts, and cached AI summaries",
      "I served as backend lead, delivering the API pipeline and AI inference system end-to-end",
    ],
    githubUrl: "https://github.com/aryancodes12-bit/Learn-HUB",
    liveUrl: "https://github.com/aryancodes12-bit/Learn-HUB",
    keywords: ["learnhub", "learn hub", "hackathon", "academic", "university", "study", "notes", "ai tutor", "runner up"],
  },
  {
    name: "LeetWeave Scribe",
    slug: "leetweave-scribe",
    tagline: "Dual-runtime automated LeetCode → GitHub code organizer",
    year: "2025",
    description:
      "LeetWeave Scribe automatically intercepts every accepted LeetCode submission and pushes it to a structured GitHub repository — organized by topic or difficulty — with optional AI-generated approach summaries. I built it because accepted solutions were disappearing into the void with no organization.",
    problem:
      "LeetCode solutions are solved and immediately lost — no structure, no organization, no review system. Most developers grind problems but can't easily revisit their own solutions.",
    solution:
      "A dual-runtime tool (CLI + browser extension) that hooks into LeetCode's submission pipeline, auto-organizes solutions into structured GitHub folders, and optionally generates AI approach summaries.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Manifest V3 (Browser Extension)",
      "Vitest",
      "esbuild",
      "Groq API",
      "GitHub REST API",
      "commander",
      "simple-git",
      "zod",
      "@inquirer/prompts",
      "chokidar",
    ],
    highlights: [
      "Offline metadata cache for ~2,900 LeetCode problems — zero network calls for problem lookup",
      "Dual-runtime: a Node.js CLI for setup and a Manifest V3 browser extension that hooks into LeetCode's XHR responses",
      "AI approach summaries via Groq Llama-3.3-70B-Versatile",
      "Resilient concurrent Git sync with simple-git and optimistic locking",
      "Custom esbuild pipeline producing both IIFE bundle (extension) and ESM bundle (CLI)",
      "Vitest test suite and GitHub Actions CI pipeline",
    ],
    githubUrl: "https://github.com/aryancodes12-bit/LeetWeave-Scribe",
    liveUrl: "https://github.com/aryancodes12-bit/LeetWeave-Scribe",
    keywords: ["leetweave", "leet weave", "scribe", "leetcode", "github", "automation", "browser extension", "cli", "dsa"],
  },
  {
    name: "SeatSync – Event Seat Booking",
    slug: "seatsync",
    tagline: "Production-grade MERN booking platform with atomic concurrency",
    year: "2026",
    description:
      "SeatSync is a production-grade event seat booking system I built to handle the hard concurrency problems real booking platforms face — race conditions, double-bookings, and expiring reservations under high load. I built this during my time as Backend Developer at SortMyScene.",
    problem:
      "Real booking platforms fail under concurrent load — multiple users book the same seat simultaneously causing double-bookings, reservation states go stale, cleanup is unreliable.",
    solution:
      "An atomic MongoDB transaction-based system with TTL index reservation expiry and a dual-layer cleanup mechanism, validated by an automated concurrency test suite.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    highlights: [
      "Atomic double-booking prevention via MongoDB multi-document transactions — zero conflicting reservations",
      "10-minute TTL seat reservation with dual-layer lazy cleanup fallback for airtight consistency",
      "JWT authentication with refresh token rotation",
      "Rate limiting and centralized error handling middleware",
      "Automated concurrency and integration test suite validating guarantees under parallel load",
      "Delivered as the sole backend engineer from architecture to deployment",
    ],
    githubUrl: "https://github.com/aryancodes12-bit/sortmyscene-booking-system",
    liveUrl: "https://seat-sync-rho.vercel.app/",
    keywords: ["seatsync", "seat sync", "booking", "event", "sortmyscene", "sort my scene", "mern", "concurrency", "mongodb"],
  },
  {
    name: "SaarthiAI V2",
    slug: "saarthi-ai",
    tagline: "India's AI-native insurance advisory platform",
    badge: "🏆 Top 10 / 300+ Teams — National Level Hackathon 2026",
    year: "2026",
    description:
      "SaarthiAI V2 is a full-stack AI-native insurance advisory platform built for Bharat — ranked Top 10 out of 300+ teams at a National Level Hackathon in 2026, built and shipped in 48 hours. It addresses the 400M+ underinsured population in India through a multi-tier production architecture.",
    problem:
      "400M+ people in India are underinsured, partly because insurance advisory is inaccessible, jargon-heavy, and not available in native languages like Hindi or Hinglish.",
    solution:
      "A bilingual AI advisory platform with Groq Llama 3.3 70B, a curated catalog of 99 real Indian insurance products, DPDP 2023 privacy compliance, and multi-channel marketing automation via WhatsApp, SMS, email, and AI voice calls.",
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Groq API",
      "Llama 3.3 70B",
      "Firebase Auth",
      "Cloud Firestore",
      "Firebase Cloud Functions",
      "Twilio",
      "Fast2SMS",
      "Vapi AI",
      "Recharts",
      "Framer Motion",
    ],
    highlights: [
      "Ranked Top 10 out of 300+ teams at a national hackathon — built and shipped in 48 hours",
      "Bilingual AI chat (Hindi + English + Hinglish) with 8 life-event detectors (marriage, newborn, home purchase, etc.)",
      "99 real Indian insurance products from 45+ insurers with official IRDAI claim settlement data",
      "Architectural DPDP 2023 compliance: 6-type PII masking (Aadhaar, PAN, phone, email, name, DOB) before AI inference",
      "Multi-channel automation: WhatsApp (Twilio), SMS (Fast2SMS), Email, Push (OneSignal), Vapi AI Voice",
      "6 serverless Firebase Cloud Functions with anti-spam cooldown rules and claims workflow tracking",
      "3 fairness rules in system prompts to prevent gender, caste, and demographic bias",
    ],
    githubUrl: "https://github.com/aryancodes12-bit/SAARTHI-AI-V2",
    liveUrl: "https://saarthi-ai-v2.vercel.app/",
    keywords: ["saarthi", "saarthi ai", "saarthiai", "insurance", "ai insurance", "national hackathon", "top 10", "bharat", "india"],
  },
  {
    name: "PlacementOS",
    slug: "placementos",
    tagline: "AI-assisted unified placement preparation system",
    year: "2025",
    description:
      "PlacementOS is a comprehensive placement preparation platform that replaces scattered tools (LeetCode, Notion, YouTube, Google Docs) with a unified AI-assisted dashboard. It gives you adaptive DSA problem recommendations, AI-driven resume scoring, interview session replay, and a cross-domain readiness engine.",
    problem:
      "Campus placement prep is fragmented across too many tools — students juggle LeetCode for DSA, Notion for notes, Google Docs for resume, and YouTube for interview prep. There's no single system that maps all of it to actual job requirements.",
    solution:
      "A unified dashboard with AI-powered features: adaptive DSA recommendations based on personal solve history, resume scoring against real JDs, interview replay with feedback, and a skill-gap readiness engine.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "Groq API",
      "Zod",
    ],
    highlights: [
      "Adaptive DSA problem recommendations powered by personal solve history and identified weak areas",
      "AI resume scoring with targeted gap analysis against real job descriptions",
      "Interview session replay with AI-generated improvement feedback on clarity and correctness",
      "Cross-domain readiness engine that maps current skill graph to target role requirements",
      "PostgreSQL + Prisma for type-safe relational schema design",
      "Groq-powered AI with Zod-validated structured output — no raw model hallucinations",
    ],
    githubUrl: "https://github.com/aryancodes12-bit/PlacementOS",
    liveUrl: "https://placement-os-kappa.vercel.app/",
    keywords: ["placementos", "placement os", "placement", "dsa", "interview", "resume", "job", "career"],
  },
  {
    name: "Air Pollution Detection Dashboard",
    slug: "air-pollution-dashboard",
    tagline: "Real-time AQI visualization for 50+ monitoring stations",
    year: "2025",
    description:
      "A React-based dashboard built during the Bhartiya Antariksh Hackathon 2025 to visualize real-time air quality data from 50+ monitoring stations by fusing satellite imagery analysis with ground-level IoT sensor data.",
    problem:
      "Real-time air quality data is scattered, hard to visualize, and hard to act on — especially when it needs to fuse satellite and ground-level sensor sources.",
    solution:
      "An interactive dashboard with an AQI heatmap, time-series charts for major pollutants, station comparison mode, and automated alert thresholds for hazardous conditions.",
    technologies: ["React", "TypeScript", "Netlify"],
    highlights: [
      "Interactive AQI heatmap with color-coded severity overlays",
      "Real-time data fusion from 50+ satellite and ground-level IoT sensors",
      "Time-series trend charts for PM2.5, PM10, CO2, NO2, SO2",
      "Station comparison mode with side-by-side analytics",
      "Automated hazardous condition alert thresholds",
      "Built and deployed under hackathon time constraints on Netlify with zero cold-start",
    ],
    githubUrl: "https://github.com/aryancodes12-bit",
    liveUrl: "https://air-pollution-detection.netlify.app/",
    keywords: ["air pollution", "aqi", "pollution", "dashboard", "satellite", "environment", "hackathon", "antariksh"],
  },
];

// ─── Quick Suggestions ────────────────────────────────────────────────────────
// Shown as chips when the chat window opens

export const quickSuggestions = [
  "What's your tech stack?",
  "Tell me about LearnHub",
  "Tell me about SaarthiAI V2",
  "What's your strongest project?",
  "Tell me about your experience",
  "What are your achievements?",
  "Show me your GitHub",
];

// ─── Opening Message ───────────────────────────────────────────────────────────

export const openingMessage =
  "Hey! 👋 I'm Aryan's AI twin. Ask me anything about his projects, tech stack, experience, or anything else you'd like to know about his work.";
