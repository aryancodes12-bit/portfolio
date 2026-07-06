import { NavigationDock } from "@/components/sections/NavigationDock";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { TargetCursor } from "@/components/ui/TargetCursor";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent w-full">
      <AuroraBackground />
      <TargetCursor />
      <NavigationDock />
      <main className="relative z-10 flex flex-col w-full">
        <ScrollReveal direction="up" delay={0.2}>
          <Hero />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <About />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <Projects />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <Experience />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <Contact />
        </ScrollReveal>
      </main>
    </div>
  );
}
