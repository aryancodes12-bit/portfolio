"use client";

import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, User, Cpu, FolderGit2, Briefcase, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export function NavigationDock() {
  const items = [
    { href: "#hero", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#skills", label: "Skills", icon: Cpu },
    { href: "#projects", label: "Projects", icon: FolderGit2 },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* Glassmorphism container */}
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-4 py-2 shadow-lg">
        <Dock magnification={60} distance={120} className="flex items-center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Magnetic range={40} strength={0.25} key={item.href}>
                <DockIcon className="group/icon relative">
                  <a href={item.href} className="flex h-full w-full items-center justify-center">
                    <Icon className="h-5 w-5 transition-transform group-hover/icon:scale-110 text-zinc-200" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-[10px] text-zinc-200 transition-all duration-200 group-hover/icon:scale-100 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 pointer-events-none shadow-lg">
                      {item.label}
                    </span>
                  </a>
                </DockIcon>
              </Magnetic>
            );
          })}
        </Dock>
      </div>
    </div>
  );
}
