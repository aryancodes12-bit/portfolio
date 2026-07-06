"use client";

import React from "react";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FileText, Github, Code2, Award, ChevronDown } from "lucide-react";
import { ThreeInteractiveOrb } from "@/components/ui/ThreeInteractiveOrb";
import { ShinyText } from "@/components/ui/ShinyText";
import { Magnetic } from "@/components/ui/Magnetic";

const titles = ["Full Stack Developer", "Designer", "Problem Solver", "Innovator"];

const quickActions = [
  {
    label: "View Resume",
    icon: FileText,
    href: "https://drive.google.com/file/d/1j8lGotieS-eDW4cbFLdlTV_BXzXiI55o/view?usp=drive_link",
    primary: true,
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/aryancodes12-bit",
    primary: false,
  },
  {
    label: "LeetCode",
    icon: Code2,
    href: "#",
    primary: false,
  },
  {
    label: "Certificates",
    icon: Award,
    href: "https://drive.google.com/drive/folders/11YZ_E-IrZ-2xR0dp9Y5NaoM8yTAkoBYT",
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

export function Hero() {
  const typed = useTypewriter(titles);
  const nameChars = Array.from("ARYAN JAISWAL");

  return (
    <section
      id="hero"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 md:px-12 lg:px-20"
    >
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
          className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-300 mb-6 h-10 font-mono"
        >
          <span className="text-primary">&gt; </span>
          <span>{typed}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl lg:max-w-xl mb-10 font-sans"
        >
          Crafting digital experiences with <ShinyText text="clean code" className="text-zinc-200 font-bold" /> and <ShinyText text="creative solutions" className="text-zinc-200 font-bold" />
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
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`relative flex items-center gap-2 rounded-xl font-bold px-5 py-3 text-xs md:text-sm transition-all duration-300 overflow-hidden group ${action.primary
                        ? "bg-primary text-background shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105"
                        : "border border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-primary/60 hover:text-primary hover:bg-zinc-900"
                      }`}
                  >
                    {!action.primary && (
                      <BorderBeam size={80} duration={10} colorFrom="#00f0ff" colorTo="#ff007f" />
                    )}
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </a>
                </Magnetic>
                {action.subtitle && (
                  <span className="text-[10px] text-zinc-500 font-mono self-center lg:self-start lg:pl-2">{action.subtitle}</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-primary transition-colors animate-bounce z-20"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}
