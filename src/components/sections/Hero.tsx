"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FileText, Github, Code2, Award, ChevronDown } from "lucide-react";
import { ThreeInteractiveOrb } from "@/components/ui/ThreeInteractiveOrb";
import { ShinyText } from "@/components/ui/ShinyText";
import { Magnetic } from "@/components/ui/Magnetic";
import { LiveActivityTicker } from "@/components/ui/LiveActivityTicker";

const titles = ["Full Stack Developer", "Designer", "Problem Solver", "Innovator"];

const quickActions = [
  {
    label: "View Resume",
    icon: FileText,
    href: "/Aryan_Jaiswal_Resume.pdf",
    target: "_blank",
    primary: true,
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/aryancodes12-bit",
    target: "_blank",
    primary: false,
  },
  {
    label: "LeetCode",
    icon: Code2,
    href: "https://leetcode.com/u/aryancodes_/",
    target: "_blank",
    primary: false,
  },
  {
    label: "Certificates",
    icon: Award,
    href: "https://drive.google.com/drive/folders/11YZ_E-IrZ-2xR0dp9Y5NaoM8yTAkoBYT",
    target: "_blank",
    primary: false,
    subtitle: "20+ Certifications",
  },
];

// Simple typewriter hook
function useTypewriter(words: string[], speed = 90, pause = 1800) {
  const [displayed, setDisplayed] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
        if (charIndex === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      }, speed);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }, speed / 2);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

// Subtle code stream background — CSS-animated monospace chars
const CODE_CHARS = ["01", "{}", "=>", "[]", "fn", "TS", "//", "<>", "&&", "++"];

function CodeStreamBg() {
  const columns = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      chars: Array.from({ length: 6 }, (_, j) => ({
        id: j,
        text: CODE_CHARS[(i * 3 + j) % CODE_CHARS.length],
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 4,
        left: `${5 + i * 8}%`,
        top: `${10 + j * 14}%`,
      })),
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {columns.flatMap((col) =>
        col.chars.map((char) => (
          <span
            key={`${col.id}-${char.id}`}
            className="absolute text-[10px] font-mono text-primary/8 code-rain-char"
            style={{
              left: char.left,
              top: char.top,
              ["--duration" as string]: `${char.duration}s`,
              ["--delay" as string]: `${char.delay}s`,
            }}
          >
            {char.text}
          </span>
        ))
      )}
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(titles);
  const nameChars = Array.from("ARYAN JAISWAL");

  return (
    <section
      id="hero"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 md:px-12 lg:px-20"
      aria-label="Hero section"
    >
      {/* Code stream background */}
      <CodeStreamBg />

      {/* 3D Interactive Orb */}
      <ThreeInteractiveOrb />

      <Particles className="absolute inset-0 z-0 opacity-25" quantity={60} color="#00f0ff" />
      <RetroGrid className="z-0 opacity-15" />

      <div className="relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl lg:mr-auto lg:w-[60%]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-primary mb-4 text-xs md:text-sm tracking-widest uppercase animate-pulse self-center lg:self-start"
        >
          Hello, I&apos;m
        </motion.p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-4 select-none">
          {nameChars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "-0.02em" }}
              transition={{ duration: 1.2, delay: index * 0.04, ease: "easeOut" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-300 mb-4 h-10 font-mono"
          aria-live="polite"
          aria-label={`Role: ${typed}`}
        >
          <span className="text-primary">&gt; </span>
          <span>{typed}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.div>

        {/* Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8 self-center lg:self-start"
        >
          <LiveActivityTicker />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl lg:max-w-xl mb-10 font-sans"
        >
          Crafting digital experiences with{" "}
          <ShinyText text="clean code" className="text-zinc-200 font-bold" /> and{" "}
          <ShinyText text="creative solutions" className="text-zinc-200 font-bold" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.label} className="flex flex-col items-center lg:items-start gap-1">
                <Magnetic range={50} strength={0.3}>
                  <a
                    href={action.href}
                    target={action.target}
                    rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
                    aria-label={action.label}
                    className={`relative flex items-center gap-2 rounded-xl font-bold px-5 py-3 text-xs md:text-sm transition-all duration-300 overflow-hidden group ${
                      action.primary
                        ? "bg-primary text-background shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105"
                        : "border border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-primary/60 hover:text-primary hover:bg-zinc-900"
                    }`}
                  >
                    {!action.primary && (
                      <BorderBeam size={80} duration={10} colorFrom="#00f0ff" colorTo="#ff007f" />
                    )}
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {action.label}
                  </a>
                </Magnetic>
                {action.subtitle && (
                  <span className="text-[10px] text-zinc-500 font-mono self-center lg:self-start lg:pl-2">
                    {action.subtitle}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Refined scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-zinc-600 hover:text-primary transition-colors group"
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <div className="w-6 h-9 rounded-full border border-zinc-700 group-hover:border-primary transition-colors flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-zinc-500 group-hover:bg-primary transition-colors"
          />
        </div>
      </motion.a>
    </section>
  );
}
