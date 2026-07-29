"use client";

import React from "react";
import { Marquee } from "@/components/magicui/marquee";

interface SkillCategory {
  title: string;
  color: string;
  borderColor: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    color: "text-green-400",
    borderColor: "border-green-500/30",
    skills: [
      "React 19",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Socket.IO",
      "GraphQL",
    ],
  },
  {
    title: "Databases",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    skills: ["MongoDB Atlas", "PostgreSQL", "Prisma ORM", "Mongoose", "Firebase", "Firestore"],
  },
  {
    title: "Developer Tools & Testing",
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Vitest",
      "Supertest",
      "React Testing Library",
      "Docker",
    ],
  },
  {
    title: "Core Competencies",
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    skills: [
      "Full-Stack Development",
      "REST APIs",
      "JWT/OAuth",
      "Database Design",
      "DSA",
      "System Design",
      "Concurrent Systems",
    ],
  },
];

// Flatten all skills with category metadata for the marquee rows
const row1 = skillCategories.flatMap((cat) =>
  cat.skills.slice(0, Math.ceil(cat.skills.length / 2)).map((skill) => ({
    skill,
    color: cat.color,
    borderColor: cat.borderColor,
    category: cat.title,
  }))
);

const row2 = skillCategories.flatMap((cat) =>
  cat.skills.slice(Math.ceil(cat.skills.length / 2)).map((skill) => ({
    skill,
    color: cat.color,
    borderColor: cat.borderColor,
    category: cat.title,
  }))
);

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 bg-background overflow-hidden px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-16 text-right items-end">
          <span className="font-mono text-[10px] tracking-widest text-secondary uppercase mb-2">
            02 // TECH CAPABILITY
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Technical Skills
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-3">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category pills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`rounded-xl border ${cat.borderColor} bg-zinc-950/50 px-3 py-2 text-center`}
            >
              <p className={`text-xs font-mono font-bold uppercase tracking-widest ${cat.color}`}>
                {cat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Marquee rows */}
        <div className="relative flex flex-col gap-4 w-full py-6 overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm">
          <Marquee className="[--duration:30s]" pauseOnHover>
            {row1.map((item, i) => (
              <button
                key={`${item.skill}-${i}`}
                onClick={() => {
                  navigator.clipboard.writeText(item.skill);
                }}
                title={`Click to copy "${item.skill}"`}
                className={`flex items-center gap-2 rounded-2xl border ${item.borderColor} bg-zinc-950 px-5 py-3 text-sm font-mono text-zinc-300 hover:text-white hover:border-primary/50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer group`}
              >
                <span className={`text-xs ${item.color} font-bold uppercase group-hover:scale-110 transition-transform`}>{item.category[0]}</span>
                <span className="font-bold">{item.skill}</span>
              </button>
            ))}
          </Marquee>

          <Marquee className="[--duration:30s]" reverse pauseOnHover>
            {row2.map((item, i) => (
              <button
                key={`${item.skill}-${i}`}
                onClick={() => {
                  navigator.clipboard.writeText(item.skill);
                }}
                title={`Click to copy "${item.skill}"`}
                className={`flex items-center gap-2 rounded-2xl border ${item.borderColor} bg-zinc-950 px-5 py-3 text-sm font-mono text-zinc-300 hover:text-white hover:border-primary/50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer group`}
              >
                <span className={`text-xs ${item.color} font-bold uppercase group-hover:scale-110 transition-transform`}>{item.category[0]}</span>
                <span className="font-bold">{item.skill}</span>
              </button>
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}