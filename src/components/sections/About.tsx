"use client";

import React from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const highlights = [
  { icon: Briefcase, label: "Experience", value: "2+ Years" },
  { icon: GraduationCap, label: "Education", value: "B.Tech in IT" },
  { icon: MapPin, label: "Location", value: "Open to Remote" },
  { icon: Calendar, label: "Availability", value: "Immediate" },
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

export function About() {
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
            className="relative rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 backdrop-blur-md overflow-hidden"
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-zinc-100 font-bold text-base">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}