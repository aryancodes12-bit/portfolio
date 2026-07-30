"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, TrendingUp, Code2, Coffee, GitCommit, Star, Zap, Globe } from "lucide-react";

const stats = [
  { label: "Projects Shipped", value: "5+", icon: Zap, color: "#00f0ff", desc: "Production apps built end-to-end" },
  { label: "GitHub Commits", value: "500+", icon: GitCommit, color: "#bc13fe", desc: "Across open-source & private repos" },
  { label: "Technologies", value: "20+", icon: Code2, color: "#ff007f", desc: "Languages, frameworks & tools mastered" },
  { label: "Stars Earned", value: "50+", icon: Star, color: "#ff9500", desc: "Community recognition on GitHub" },
  { label: "Countries Reached", value: "10+", icon: Globe, color: "#00ff88", desc: "Users across different countries" },
  { label: "Cups of Coffee", value: "∞", icon: Coffee, color: "#ff9500", desc: "Fuel for late-night sessions" },
];

const techUsage = [
  { name: "TypeScript", pct: 85, color: "#3178c6" },
  { name: "React / Next.js", pct: 80, color: "#00f0ff" },
  { name: "Node.js", pct: 75, color: "#68a063" },
  { name: "Python", pct: 60, color: "#f7c948" },
  { name: "PostgreSQL / MongoDB", pct: 65, color: "#bc13fe" },
  { name: "Three.js / WebGL", pct: 40, color: "#ff007f" },
];

const timeline = [
  { year: "2026", event: "SeatSync – Production-grade MERN booking platform with atomic concurrency", type: "project" },
  { year: "2026", event: "LeetWeave Scribe – Dual-runtime LeetCode → GitHub automation tool", type: "project" },
  { year: "2025", event: "PlacementOS – AI-assisted unified placement prep system", type: "project" },
  { year: "2025", event: "SaarthiAI – Bias-aware, DPDP 2023 compliant AI insurance advisor", type: "project" },
  { year: "2025", event: "Air Pollution Dashboard – Built at Bhartiya Antariksh Hackathon 2025", type: "project" },
  { year: "2024", event: "Started deep-dive into TypeScript, Node.js & full-stack architecture", type: "milestone" },
  { year: "2023", event: "First production React app — built & shipped solo", type: "milestone" },
];

export default function AnalyticsPage() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">// ENGINEERING METRICS</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-3">Analytics</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-4 max-w-xl">
            A snapshot of my engineering output, technology usage, and growth trajectory.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.07, type: "spring", stiffness: 100 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  <span className="text-2xl md:text-3xl font-black font-mono" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm font-bold text-zinc-300">{stat.label}</p>
                <p className="text-xs font-mono text-zinc-600 mt-1">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech usage bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">Technology Usage</h2>
          </div>
          <div className="space-y-5">
            {techUsage.map((tech) => (
              <div key={tech.name}
                onMouseEnter={() => setHoveredBar(tech.name)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-mono text-zinc-300">{tech.name}</span>
                  <span className="text-xs font-mono text-zinc-500">{tech.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: tech.color, opacity: hoveredBar === tech.name ? 1 : 0.7 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.pct}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">Growth Timeline</h2>
          </div>
          <div className="relative pl-6 border-l border-zinc-800 space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="relative"
              >
                <div className={`absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 ${
                  item.type === "project" ? "border-primary bg-primary/20" : "border-accent bg-accent/20"
                }`} />
                <span className="text-[10px] font-mono text-zinc-600 block mb-0.5">{item.year}</span>
                <p className="text-sm text-zinc-400">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
