import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Code-split below-the-fold / interactive client components
const TargetCursor = dynamic(
  () => import("@/components/ui/TargetCursor").then((m) => m.TargetCursor)
);

const GitHubHeatmap = dynamic(
  () => import("@/components/sections/GitHubHeatmap").then((m) => m.GitHubHeatmap),
  {
    loading: () => (
      <div className="w-full py-24 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="h-64 rounded-2xl border border-zinc-900 bg-zinc-950/40 animate-pulse" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent w-full">
      <AuroraBackground />
      <TargetCursor />

      <main className="relative z-10 flex flex-col w-full">
        {/* Above-the-fold: rendered instantly without artificial scroll delay */}
        <Hero />

        {/* Below-the-fold sections with optimized viewport entrance */}
        <ScrollReveal direction="up" delay={0.1}>
          <About />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Projects />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Experience />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <GitHubHeatmap />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Testimonials />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Contact />
        </ScrollReveal>
      </main>
    </div>
  );
}
