"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Code2, Cpu, Layers, Zap, ExternalLink } from "lucide-react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

const experiments = [
  {
    id: "three-orb",
    title: "Three.js Interactive Orb",
    description: "A WebGL-powered 3D orb with mouse-reactive distortion using Three.js and custom GLSL shaders. Demonstrates real-time vertex displacement and post-processing effects.",
    tags: ["Three.js", "WebGL", "GLSL", "React"],
    status: "Live",
    colorFrom: "#00f0ff",
    colorTo: "#bc13fe",
    icon: Layers,
    year: "2026",
  },
  {
    id: "fluid-cursor",
    title: "Fluid Cursor Simulation",
    description: "Real-time fluid dynamics simulation rendered on a WebGL canvas. Mouse movement injects velocity into a Navier-Stokes solver running on the GPU.",
    tags: ["WebGL", "Fluid Dynamics", "Canvas"],
    status: "Live",
    colorFrom: "#bc13fe",
    colorTo: "#ff007f",
    icon: Zap,
    year: "2026",
  },
  {
    id: "groq-inference",
    title: "Edge AI Inference Benchmarks",
    description: "Latency benchmarks comparing Groq, OpenAI, and Anthropic APIs across various model sizes and prompt lengths. Exposes token throughput and cold-start characteristics.",
    tags: ["Groq", "LLM", "Benchmarking", "TypeScript"],
    status: "In Progress",
    colorFrom: "#ff9500",
    colorTo: "#ff007f",
    icon: Cpu,
    year: "2026",
  },
  {
    id: "ast-analyzer",
    title: "TypeScript AST Analyzer",
    description: "A CLI tool that walks a TypeScript project's AST to extract dependency graphs, detect circular imports, and surface complexity metrics per module.",
    tags: ["TypeScript", "AST", "Node.js", "CLI"],
    status: "In Progress",
    colorFrom: "#00ff88",
    colorTo: "#00f0ff",
    icon: Code2,
    year: "2025",
  },
];

const statusColor: Record<string, string> = {
  Live: "text-green-400 border-green-500/30 bg-green-500/10",
  "In Progress": "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
};

export default function LabPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">// EXPERIMENTS & PROTOTYPES</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-3">The Lab</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-4 max-w-xl">
            A sandbox for experiments, prototypes, and engineering curiosities that don&apos;t fit neatly into a product.
          </p>
        </motion.div>

        {/* Experiments grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {experiments.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 80, damping: 15 }}
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <NeonGradientCard
                  colorFrom={exp.colorFrom}
                  colorTo={exp.colorTo}
                  borderRadius={16}
                  borderSize={1.5}
                  duration={14 + index * 2}
                  className="flex flex-col h-full bg-zinc-950/90 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full border ${statusColor[exp.status]}`}>
                        {exp.status}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600">{exp.year}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-zinc-100 mb-2">{exp.title}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    animate={{ height: hovered === exp.id ? "auto" : 0, opacity: hovered === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-primary">
                      <FlaskConical className="h-3 w-3" /> Experiment active
                    </div>
                  </motion.div>
                </NeonGradientCard>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center"
        >
          <FlaskConical className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Interested in collaborating?</h2>
          <p className="text-zinc-500 text-sm font-mono mb-5">Open to interesting engineering problems and research collaborations.</p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary text-sm font-mono hover:bg-primary/10 transition-all">
            Get in touch <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
