"use client";

import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, User, Cpu, FolderGit2, Briefcase, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ y: 100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      className="fixed bottom-6 left-1/2 z-50"
    >
      {/* Glassmorphism container */}
      <div className="bg-zinc-950/50 backdrop-blur-xl rounded-full border border-white/10 p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <Dock magnification={60} distance={120} className="flex items-center gap-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Magnetic range={40} strength={0.25} key={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + index * 0.05,
                  }}
                >
                  <DockIcon className="group/icon relative rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                    <a href={item.href} className="flex h-full w-full items-center justify-center p-3">
                      <Icon className="h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 text-zinc-400 group-hover/icon:text-white" />
                      
                      {/* Tooltip */}
                      <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-50 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-300 group-hover/icon:scale-100 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 pointer-events-none shadow-xl origin-bottom">
                        {item.label}
                      </span>
                    </a>
                  </DockIcon>
                </motion.div>
              </Magnetic>
            );
          })}
        </Dock>
      </div>
    </motion.div>
  );
}
