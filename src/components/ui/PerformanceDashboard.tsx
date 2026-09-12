"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Gauge, Clock, BarChart3, Globe } from "lucide-react";

interface PerfMetrics {
  loadTime: number;
  fcp: number;
  domContentLoaded: number;
  resourceCount: number;
}

function usePerformanceMetrics(): PerfMetrics | null {
  const [metrics, setMetrics] = useState<PerfMetrics | null>(null);

  useEffect(() => {
    // Wait for page to fully load
    const measure = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const paint = performance.getEntriesByType("paint");
      const fcp = paint.find((e) => e.name === "first-contentful-paint");

      if (nav) {
        setMetrics({
          loadTime: Math.round(nav.loadEventEnd - nav.startTime),
          fcp: fcp ? Math.round(fcp.startTime) : 0,
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          resourceCount: performance.getEntriesByType("resource").length,
        });
      }
    };

    // Measure after everything loads
    if (document.readyState === "complete") {
      setTimeout(measure, 100);
    } else {
      window.addEventListener("load", () => setTimeout(measure, 100));
    }
  }, []);

  return metrics;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function PerformanceDashboard() {
  const metrics = usePerformanceMetrics();

  const items = metrics
    ? [
        {
          icon: Zap,
          label: "Page Load",
          value: metrics.loadTime,
          suffix: "ms",
          color: metrics.loadTime < 1500 ? "text-emerald-400" : metrics.loadTime < 3000 ? "text-amber-400" : "text-red-400",
        },
        {
          icon: Gauge,
          label: "FCP",
          value: metrics.fcp,
          suffix: "ms",
          color: metrics.fcp < 1000 ? "text-emerald-400" : metrics.fcp < 2500 ? "text-amber-400" : "text-red-400",
        },
        {
          icon: Clock,
          label: "DOM Ready",
          value: metrics.domContentLoaded,
          suffix: "ms",
          color: "text-primary",
        },
        {
          icon: BarChart3,
          label: "Resources",
          value: metrics.resourceCount,
          suffix: "",
          color: "text-secondary",
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 pt-8 border-t border-zinc-900"
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <Globe className="h-3.5 w-3.5 text-zinc-600" />
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          Live Performance Metrics
        </span>
      </div>

      {metrics ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 rounded-xl border border-zinc-900 bg-zinc-950/30 px-3 py-3"
              >
                <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                <p className={`text-lg font-black font-mono ${item.color}`}>
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 text-zinc-700 text-xs font-mono">
          <div className="h-3 w-3 rounded-full border-2 border-zinc-700 border-t-primary animate-spin" />
          Measuring...
        </div>
      )}

      {/* Main footer */}
      <div className="mt-8 text-center">
        <p className="text-zinc-500 text-sm">
          Designed & Built by{" "}
          <span className="text-primary font-medium font-mono">Aryan Jaiswal</span>
        </p>
        <p className="text-zinc-700 text-xs mt-2 font-mono">
          Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </motion.div>
  );
}
