import { NavigationDock } from "@/components/sections/NavigationDock";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { TargetCursor } from "@/components/ui/TargetCursor";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent w-full">
      <AuroraBackground />
      <TargetCursor />
      <NavigationDock />
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
