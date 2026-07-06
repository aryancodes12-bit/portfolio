"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";

interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

const jobs: Job[] = [
  {
    role: "Backend Developer",
    company: "SortMyScene",
    period: "Jun 2026",
    location: "Remote",
    description: [
      "Architected SeatSync, a production-grade MERN event-booking platform handling real-time seat reservations for high-traffic nightlife events",
      "Engineered atomic double-booking prevention using MongoDB transactions and conditional seat updates, guaranteeing zero conflicting reservations under concurrent load",
      "Designed a dual-layer reservation expiry system combining MongoDB TTL indexing with lazy seat cleanup for airtight consistency",
      "Built and shipped a full REST API with JWT authentication, rate limiting, and centralized error handling, backed by automated concurrency and integration tests",
      "Delivered the complete assignment end-to-end — from system architecture and database design to deployment and documentation — as the sole backend engineer",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "React"],
  },
  {
    role: "Web Development Intern",
    company: "SkillCraft Technology",
    period: "Apr 2025",
    location: "Remote",
    description: [
      "Developing and maintaining 5+ web applications using React.js, JavaScript, and modern UI practices",
      "Worked on both front-end and back-end integration following responsive design principles",
      "Collaborated with a 3-member development team using Agile methodology",
      "Improved application performance and UI consistency through component reusability",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
  },
  {
    role: "Open Source Contributor",
    company: "Social Winter of Code (SWOC)",
    period: "Jan 2025",
    location: "Remote",
    description: [
      "Contributed to 3+ open-source projects through bug fixes and feature enhancements",
      "Performed 10+ code reviews and submitted 15+ pull requests successfully merged",
      "Used Git and GitHub for version control and collaborative development",
      "Gained hands-on experience working with large codebases and community standards",
    ],
    technologies: ["Git", "GitHub", "JavaScript", "Open Source"],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 bg-background overflow-hidden px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col mb-20 text-center items-center">
          <span className="font-mono text-[10px] tracking-widest text-accent uppercase mb-2">
            04 // EXPERIENCE LOG
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Work Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-3">
            My professional journey and contributions
          </p>
        </div>

        <div className="relative">
          {/* Static line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-900 -translate-x-1/2" />

          {/* Animated progress line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.5)] z-10"
          />

          <div className="space-y-16">
            {jobs.map((job, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={job.role}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full border-2 border-zinc-800 bg-zinc-950 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring" as const, stiffness: 70, damping: 15 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 backdrop-blur-sm hover:border-zinc-800 transition-colors">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-secondary" />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          {job.location}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-100 tracking-wide mb-1">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm font-mono font-bold">{job.company}</span>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {job.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs leading-relaxed">
                            <span className="text-primary mt-0.5">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}