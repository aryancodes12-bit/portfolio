"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const highlights = [
  { icon: Briefcase, label: "Experience", value: "2+", suffix: " Years" },
  { icon: GraduationCap, label: "Education", value: "B.Tech", suffix: " IT" },
  { icon: MapPin, label: "Location", value: "Open", suffix: " to Remote" },
  { icon: Calendar, label: "Availability", value: "Immediate", suffix: "" },
];

const bioParas = [
  "I'm an Information Technology engineering student and full-stack developer who builds production-style systems end to end — from database schema and API design to responsive, motion-rich interfaces. I care about writing code that holds up under real usage, not just code that works in a demo.",
  "My work spans the stack: React and TypeScript on the frontend, Node.js and Express (and occasionally PHP) on the backend, with PostgreSQL, MongoDB, and Firebase for data. I've shipped systems with real engineering constraints — atomic transactions to prevent race conditions, JWT-based auth, real-time updates with Socket.IO, and AI-assisted features backed by structured, validated output rather than raw model responses.",
  "Beyond building, I actively practice Data Structures and Algorithms, think in terms of system design and trade-offs, and contribute to open-source projects. I'm most energized by problems that sit at the intersection of clean UI and solid backend architecture — and I'm always looking for the next one.",
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15, delay: i * 0.15 },
  }),
};

// Animated number that counts up when scrolled into view
function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(numericValue);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.max(1, Math.ceil(numericValue / 30));
          const interval = setInterval(() => {
            current = Math.min(current + step, numericValue);
            setDisplay(String(current));
            if (current >= numericValue) clearInterval(interval);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNumeric, numericValue]);

  return (
    <span ref={ref} className="font-black tabular-nums">
      {display}
      {isNumeric && suffix}
    </span>
  );
}

export function About() {
  const [easterEgg, setEasterEgg] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTripleClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 500);
    if (clickCount.current >= 3) {
      setEasterEgg(true);
      clickCount.current = 0;
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 bg-zinc-950/60 overflow-hidden border-t border-zinc-900 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-16 text-left">
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2">
            01 // IDENTITY REGISTER
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="relative rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 backdrop-blur-md overflow-hidden cursor-default"
            onClick={handleTripleClick}
            title="Triple-click for a surprise..."
          >
            <BorderBeam size={140} duration={8} colorFrom="#00f0ff" colorTo="#bc13fe" delay={0} />
            <p className="font-mono text-[10px] tracking-widest text-secondary uppercase mb-4">
              Passionate about building innovative solutions
            </p>
            {bioParas.map((para, i) => (
              <p key={i} className="text-zinc-400 text-sm leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}

            {/* Easter egg */}
            {easterEgg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                <p className="font-mono text-[10px] text-primary tracking-widest mb-2">// fun fact</p>
                <pre className="text-xs text-zinc-300 font-mono leading-relaxed overflow-x-auto">{`const aryan = {
  hobbies: ["competitive coding", "system design", "chess"],
  currentlyLearning: "Rust",
  favoriteAlgo: "Dijkstra's",
  coffeeCupsPerDay: 3,
  motto: "Ship it, then make it elegant."
};`}</pre>
                <button
                  className="mt-3 text-[10px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setEasterEgg(false); }}
                >
                  [close]
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Highlight cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={i + 1}
                  className="relative flex flex-col items-center text-center rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-md overflow-hidden group"
                >
                  <BorderBeam
                    size={100}
                    duration={8}
                    colorFrom={i % 2 === 0 ? "#00f0ff" : "#ff007f"}
                    colorTo={i % 2 === 0 ? "#bc13fe" : "#00f0ff"}
                    delay={i * 1.5}
                  />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-zinc-100 text-base">
                    <CountUp value={item.value} suffix={item.suffix} />
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}