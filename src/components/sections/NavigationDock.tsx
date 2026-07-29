"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Mail,
  FlaskConical,
  BarChart3,
} from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: (isHome: boolean) => string;
  isPage: boolean;
}

const navItems: NavItem[] = [
  { label: "Home",       icon: Home,        href: (h) => (h ? "#hero"       : "/#hero"),       isPage: false },
  { label: "About",      icon: User,        href: (h) => (h ? "#about"      : "/#about"),      isPage: false },
  { label: "Skills",     icon: Cpu,         href: (h) => (h ? "#skills"     : "/#skills"),     isPage: false },
  { label: "Projects",   icon: FolderGit2,  href: ()  => "/projects",                          isPage: true  },
  { label: "Experience", icon: Briefcase,   href: (h) => (h ? "#experience" : "/#experience"), isPage: false },
  { label: "Lab",        icon: FlaskConical, href: ()  => "/lab",                              isPage: true  },
  { label: "Analytics",  icon: BarChart3,   href: ()  => "/analytics",                         isPage: true  },
  { label: "Contact",    icon: Mail,        href: (h) => (h ? "#contact"    : "/#contact"),    isPage: false },
];

export function NavigationDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
      className="fixed bottom-4 md:bottom-6 left-1/2 z-50 max-w-[94vw] sm:max-w-none"
      role="navigation"
      aria-label="Main navigation"
    >
      <Dock
        magnification={50}
        distance={90}
        className="bg-zinc-950/85 backdrop-blur-xl rounded-full border border-white/10 px-2 sm:px-3 py-1.5 sm:py-2 h-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] items-center gap-0.5 sm:gap-1 max-w-full overflow-x-auto scrollbar-none"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const href = item.href(isHome);
          const isActive =
            item.isPage &&
            ((pathname.startsWith("/projects") && item.label === "Projects") ||
              (pathname === "/lab" && item.label === "Lab") ||
              (pathname === "/analytics" && item.label === "Analytics"));

          return (
            <Magnetic range={40} strength={0.25} key={item.label}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 + index * 0.04,
                }}
              >
                <DockIcon
                  className={`bg-transparent border group/icon relative rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-primary/40 bg-primary/10 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                      : "border-transparent hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  <Link
                    href={href}
                    className="flex h-full w-full items-center justify-center p-3"
                    aria-label={item.label}
                  >
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 ${
                        isActive
                          ? "text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                          : "text-zinc-400 group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      }`}
                    />
                    {/* Tooltip */}
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-50 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-300 group-hover/icon:scale-100 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 pointer-events-none shadow-xl origin-bottom">
                      {item.label}
                    </span>
                  </Link>
                </DockIcon>
              </motion.div>
            </Magnetic>
          );
        })}
      </Dock>
    </motion.div>
  );
}

export default NavigationDock;
