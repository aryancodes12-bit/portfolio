"use client";

import React from "react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TiltedCard } from "@/components/ui/TiltedCard";
import { ExternalLink, Github, Sparkles, Folder } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
  colorFrom: string;
  colorTo: string;
}

const projects: Project[] = [
  {
    title: "Air Pollution Detection Dashboard",
    description:
      "React-based dashboard developed during Bhartiya Antariksh Hackathon 2025 to visualize real-time air quality data from 50+ monitoring stations using satellite and ground sensors.",
    technologies: ["React", "TypeScript", "Netlify"],
    github: "https://github.com/aryancodes12-bit",
    live: "https://air-pollution-detection.netlify.app/",
    featured: true,
    colorFrom: "#00f0ff",
    colorTo: "#bc13fe",
  },
  {
    title: "Habit Flow",
    description:
      "Full-stack habit tracking web application supporting 100+ concurrent users with secure authentication, session management, and optimized CRUD operations.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Apache"],
    github: "https://github.com/aryancodes12-bit",
    live: "https://habitflow-pro.rf.gd/",
    featured: true,
    colorFrom: "#bc13fe",
    colorTo: "#ff007f",
  },
  {
    title: "DSA Progress Tracker",
    description:
      "Serverless web application to track 500+ DSA problems across 10+ categories with real-time updates, Firebase authentication, and interactive analytics dashboards.",
    technologies: ["Firebase", "Firestore", "Chart.js", "JavaScript"],
    github: "https://github.com/aryancodes12-bit",
    live: "https://dsa-progress-tracker-app.vercel.app/",
    featured: true,
    colorFrom: "#ff007f",
    colorTo: "#00f0ff",
  },
  {
    title: "SONIX – Simple Music Streaming",
    description:
      "A clean and responsive music streaming web application with modern UI, hover effects, and smooth interactions inspired by real-world design systems.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/aryancodes12-bit/SONIX",
    live: "https://sonixmusic.vercel.app/",
    featured: true,
    colorFrom: "#00f0ff",
    colorTo: "#ff007f",
  },
  {
    title: "SeatSync – Event Seat Booking System",
    description:
      "Production-minded MERN booking platform with 10-minute seat reservations, MongoDB transactions, and atomic double-booking prevention validated by automated concurrency tests.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/aryancodes12-bit/sortmyscene-booking-system",
    live: "https://seat-sync-rho.vercel.app/",
    featured: true,
    colorFrom: "#bc13fe",
    colorTo: "#00f0ff",
  },
  {
    title: "SaarthiAI – AI Insurance Companion",
    description:
      "Bias-aware, DPDP 2023 aligned AI insurance advisory platform with life-event detection, policy comparison, bilingual chat advisor, and a privacy-first PII masking layer.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "Gemini AI"],
    github: "https://github.com/aryancodes12-bit/SAARTHI-AI",
    live: "https://saarthi-ai-mu.vercel.app/",
    featured: true,
    colorFrom: "#ff007f",
    colorTo: "#bc13fe",
  },
  {
    title: "MoodMate – AI Mental Wellness App",
    description:
      "AI-powered wellness companion offering mood journaling, an AI chat companion, mood prediction, weekly therapy plans, and community support built on React and Supabase.",
    technologies: ["React", "Supabase", "Groq API", "Tailwind CSS"],
    github: "https://github.com/aryancodes12-bit/moodmate",
    live: "https://moodmate-web.vercel.app/",
    featured: true,
    colorFrom: "#00f0ff",
    colorTo: "#bc13fe",
  },
  {
    title: "PlacementOS",
    description:
      "AI-assisted placement preparation system unifying DSA tracking, resume intelligence, interview replay, and a cross-domain readiness engine into one dashboard.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Groq"],
    github: "https://github.com/aryancodes12-bit/PlacementOS",
    live: "https://placement-os-kappa.vercel.app/",
    featured: true,
    colorFrom: "#bc13fe",
    colorTo: "#ff007f",
  },
];

const featuredProjects = projects.filter((p) => p.featured);

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-24 bg-zinc-950/60 overflow-hidden border-t border-zinc-900 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-16 text-left">
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2">
            03 // PROJECT ARCHIVE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-3">
            Some of the projects I&apos;ve built and worked on
          </p>
        </div>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <TiltedCard key={project.title} className="h-full">
              <NeonGradientCard
                colorFrom={project.colorFrom}
                colorTo={project.colorTo}
                borderRadius={16}
                borderSize={1.5}
                duration={12 + index * 2}
                className="flex flex-col justify-between h-full bg-zinc-950/90 p-6"
              >
                <BorderBeam
                  size={100}
                  duration={8}
                  colorFrom={project.colorFrom}
                  colorTo={project.colorTo}
                  delay={index * 2}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Folder className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                        <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                        PROJECT {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-zinc-100 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </NeonGradientCard>
            </TiltedCard>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/aryancodes12-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary rounded-xl px-6 py-3 text-sm font-mono transition-all duration-300"
          >
            <Github className="h-4 w-4" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}