"use client";

import React from "react";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
      {/* Soft Aurora glow layers */}
      <div className="absolute -inset-[20px] opacity-35 filter blur-[120px] md:blur-[160px]">
        {/* Cyan/Teal glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[60vh] rounded-full bg-primary/30 mix-blend-screen animate-aurora-1" />
        
        {/* Purple/Magenta glow */}
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[70vh] rounded-full bg-secondary/35 mix-blend-screen animate-aurora-2" />
        
        {/* Pink/Rose glow */}
        <div className="absolute bottom-[-20%] left-[10%] w-[65vw] h-[60vh] rounded-full bg-accent/25 mix-blend-screen animate-aurora-3" />
        
        {/* Dark Blue supporting glow */}
        <div className="absolute top-[30%] left-[25%] w-[50vw] h-[50vh] rounded-full bg-blue-600/20 mix-blend-screen animate-aurora-4" />
      </div>
      
      {/* Premium grain overlay (subtle micro-texture) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Dark vignette to focus content in center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(10,10,15,0.7)_80%)]" />
    </div>
  );
}

export default AuroraBackground;
