"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TiltedCard } from "@/components/ui/TiltedCard";
import {
  ExternalLink,
  Github,
  Sparkles,
  Folder,
  ArrowRight,
  ArrowLeft,
  Filter,
  Search,
} from "lucide-react";
import { allProjects } from "@/data/projects";

const FILTER_CATEGORIES = [
  "All",
  "TypeScript",
  "React",
  "Node.js",
  "Full-Stack",
  "AI",
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allProjects
    .filter((p) =>
      activeFilter === "All" ? true : p.categories.includes(activeFilter)
    )
    .filter(
      (p) =>
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">
            // ALL PROJECTS
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            Project Archive
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-4 max-w-xl">
            {allProjects.length} projects built and shipped — from full-stack
            platforms to developer tools.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
            />
          </div>

          {/* Filter pills */}
          <div
            className="flex flex-wrap gap-2 items-center"
            role="group"
            aria-label="Filter projects"
          >
            <Filter className="h-4 w-4 text-zinc-600 mr-1" />
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
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 text-xs font-mono mb-6"
        >
          Showing {filtered.length} of {allProjects.length} projects
        </motion.p>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Folder className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                            {project.year}
                          </span>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub`}
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

                      <h2 className="text-lg font-bold tracking-tight text-zinc-100 mb-1">
                        {project.title}
                      </h2>
                      <p className="text-zinc-500 text-[11px] font-mono mb-3 leading-snug">
                        {project.tagline}
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
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
                className="col-span-3 text-center text-zinc-600 font-mono text-sm py-20"
              >
                No projects match your search.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
