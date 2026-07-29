"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, BarChart3, FolderGit2 } from "lucide-react";

const navItems = [
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/lab", label: "Lab", icon: FlaskConical },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function TopNav() {
  const pathname = usePathname();

  // Only render on sub-pages, not on the home page
  if (pathname === "/") return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
      aria-label="Site navigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/85 backdrop-blur-xl px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Logo / Back to home */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Back to home page"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-sm font-mono transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            AJ
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-200 transition-colors duration-200 text-[11px] font-mono">
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Home
          </div>
        </Link>

        {/* Page navigation links */}
        <nav className="flex items-center gap-1" aria-label="Page sections">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.nav>
  );
}

export default TopNav;
