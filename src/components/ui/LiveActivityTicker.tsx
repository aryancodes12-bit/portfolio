"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Code2, Hammer, Zap } from "lucide-react";

type ActivityType = "commit" | "leetcode" | "building" | "open";

interface Activity {
  type: ActivityType;
  text: string;
  icon: React.ElementType;
}

const activities: Activity[] = [
  { type: "commit", icon: GitCommit, text: "Pushed LeetWeave Scribe v1.2.0 — concurrent sync resilience fix" },
  { type: "leetcode", icon: Code2, text: "Solved: Course Schedule II — Graph BFS / Topological Sort" },
  { type: "building", icon: Hammer, text: "Building: PlacementOS Interview Replay Engine" },
  { type: "open", icon: Zap, text: "Open to full-time & internship opportunities" },
  { type: "commit", icon: GitCommit, text: "Merged: offline metadata cache for ~2,900 LeetCode problems" },
  { type: "leetcode", icon: Code2, text: "Solved: Word Ladder — BFS / Bidirectional Search" },
  { type: "building", icon: Hammer, text: "Improving: Groq Llama-3.3 approach summary quality" },
];

const typeColors: Record<ActivityType, string> = {
  commit: "text-green-400",
  leetcode: "text-yellow-400",
  building: "text-primary",
  open: "text-accent",
};

export function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const activity = activities[currentIndex];
  const Icon = activity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-2 text-xs font-mono w-fit"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Live pulsing badge */}
      <span className="flex items-center gap-1.5 text-primary shrink-0" aria-label="Live status">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="font-bold tracking-widest text-[10px] uppercase">Live</span>
      </span>

      <div className="w-px h-3 bg-white/20 shrink-0" aria-hidden="true" />

      {/* Activity type icon */}
      <Icon
        className={`h-3 w-3 shrink-0 ${typeColors[activity.type]}`}
        aria-hidden="true"
      />

      {/* Rotating ticker text */}
      <div className="overflow-hidden h-4 flex items-center min-w-[180px] max-w-[360px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-zinc-400 whitespace-nowrap"
          >
            {activity.text}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
