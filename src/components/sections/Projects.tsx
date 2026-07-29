"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TiltedCard } from "@/components/ui/TiltedCard";
import { ExternalLink, Github, Sparkles, Folder, ArrowRight, Filter } from "lucide-react";
import { featuredProjects } from "@/data/projects";

const FILTER_CATEGORIES = ["All", "TypeScript", "React", "Node.js", "Full-Stack", "AI"];

function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(start);
            if (start >= target) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? featuredProjects
      : featuredProjects.filter((p) =>
          p.categories.includes(activeFilter)
        );

  return (
    <section
      id="projects"
      className="relative w-full py-24 bg-zinc-950/60 overflow-hidden border-t border-zinc-900 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">
              03 // PROJECT ARCHIVE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
            <p className="text-zinc-500 text-sm font-mono mt-3">
              <AnimatedCount target={featuredProjects.length} /> projects built and shipped
            </p>
          </div>

          {/* View all link */}
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-primary transition-colors group border border-zinc-800 hover:border-primary/40 rounded-xl px-4 py-2.5 w-fit"
          >
            View All Projects
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter projects by technology"
        >
          <Filter className="h-4 w-4 text-zinc-600 self-center mr-1" aria-hidden="true" />
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all duration-200 border ${
                activeFilter === cat
                  ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  : "text-zinc-500 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700 bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.07,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
              >
                <TiltedCard className="h-full">
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
                      {/* Card header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Folder className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                            <Sparkles className="h-3 w-3 text-primary animate-pulse" aria-hidden="true" />
                            PROJECT {String(index + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-primary transition-colors"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight text-zinc-100 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-zinc-500 text-[11px] font-mono mb-3 leading-snug">
                        {project.tagline}
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-xs font-mono text-zinc-600 self-center">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                      {/* Deep-dive link */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-[11px] font-mono text-primary/60 hover:text-primary transition-colors group/link"
                      >
                        Deep-dive →
                        <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </NeonGradientCard>
                </TiltedCard>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center text-zinc-600 font-mono text-sm py-12"
              >
                No projects match this filter.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary rounded-xl px-6 py-3 text-sm font-mono transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}