"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { getProjectBySlug, allProjects } from "@/data/projects";
import { use } from "react";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${project.colorFrom}12 0%, transparent 70%)` }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">// PROJECT DEEP DIVE</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-3">{project.title}</h1>
            <p className="text-zinc-400 font-mono text-sm mb-4">{project.tagline}</p>
            <div className="h-1 w-20 rounded-full" style={{ background: `linear-gradient(to right, ${project.colorFrom}, ${project.colorTo})` }} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-12">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary/40 text-sm font-mono transition-all">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 text-sm font-mono transition-all">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          </div>

          {/* Long description */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold text-white mb-4 font-mono uppercase tracking-wide">Overview</h2>
            {project.longDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-zinc-400 text-sm leading-relaxed mb-4 last:mb-0">{para}</p>
            ))}
          </div>

          {/* Highlights */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold text-white mb-5 font-mono uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Key Highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold text-white mb-5 font-mono uppercase tracking-wide">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture diagram */}
          {project.diagramNodes && project.diagramEdges && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 mb-8">
              <h2 className="text-lg font-bold text-white mb-5 font-mono uppercase tracking-wide">Architecture</h2>
              <div className="relative w-full aspect-[2/1] min-h-[320px]">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
                  {project.diagramEdges.map((edge, i) => {
                    const from = project.diagramNodes!.find(n => n.id === edge.from);
                    const to = project.diagramNodes!.find(n => n.id === edge.to);
                    if (!from || !to) return null;
                    const mx = (from.x + to.x) / 2;
                    const my = (from.y + to.y) / 2;
                    return (
                      <g key={i}>
                        <line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                          stroke="rgba(0,240,255,0.25)" strokeWidth="0.5" strokeDasharray="2 2" />
                        {edge.label && (
                          <text x={`${mx}%`} y={`${my}%`} fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle" dominantBaseline="middle">{edge.label}</text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                {project.diagramNodes.map((node) => {
                  const colorMap: Record<string, string> = { cyan: "#00f0ff", purple: "#bc13fe", pink: "#ff007f", green: "#00ff88", orange: "#ff9500" };
                  const color = colorMap[node.color] ?? "#00f0ff";
                  return (
                    <div key={node.id} className="absolute flex flex-col items-center group"
                      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}>
                      <div className="px-2 py-1 rounded-lg border text-[9px] font-mono font-bold text-center whitespace-nowrap shadow-lg"
                        style={{ borderColor: `${color}60`, background: `${color}15`, color }}>
                        {node.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other projects */}
          <div>
            <h2 className="text-lg font-bold text-white mb-5 font-mono uppercase tracking-wide">More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allProjects.filter(p => p.slug !== project.slug).slice(0, 2).map(p => (
                <Link key={p.slug} href={`/projects/${p.slug}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-primary/30 transition-all group">
                  <p className="text-sm font-bold text-zinc-200 group-hover:text-primary transition-colors mb-1">{p.title}</p>
                  <p className="text-xs font-mono text-zinc-600">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
