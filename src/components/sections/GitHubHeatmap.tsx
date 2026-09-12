"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Flame, Calendar, TrendingUp, Sparkles } from "lucide-react";

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface HeatmapData {
  totalContributions: number;
  weeks: ContributionWeek[];
  isMock: boolean;
}

const LEVEL_COLORS = [
  "bg-zinc-800/80 border border-zinc-700/30",
  "bg-emerald-950 border border-emerald-800/50",
  "bg-emerald-700/80 border border-emerald-600/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
  "bg-emerald-500 border border-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  "bg-emerald-300 border border-white/60 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

// Generate realistic default fallback data synchronously so the component is NEVER blank
function generateInitialData(): HeatmapData {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  
  // Seeded pattern for realistic activity
  for (let w = 52; w >= 0; w--) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      
      const isWeekday = d >= 1 && d <= 5;
      const seed = Math.sin(w * 7 + d) * 10000;
      const pseudoRand = seed - Math.floor(seed);
      const hasContrib = pseudoRand > (isWeekday ? 0.35 : 0.65);
      const count = hasContrib ? Math.floor(pseudoRand * 11) + 1 : 0;
      
      days.push({
        contributionCount: count,
        date: date.toISOString().split("T")[0],
        weekday: d,
      });
    }
    weeks.push({ contributionDays: days });
  }

  const total = weeks.reduce(
    (sum, w) => sum + w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
    0
  );

  return { totalContributions: total, weeks, isMock: true };
}

function computeStreak(weeks: ContributionWeek[]): {
  current: number;
  longest: number;
} {
  const allDays = weeks.flatMap((w) => w.contributionDays).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let current = 0;
  let longest = 0;
  let streak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
  }

  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      current++;
    } else {
      break;
    }
  }

  return { current, longest };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubHeatmap() {
  const [data, setData] = useState<HeatmapData>(generateInitialData);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const json = await res.json();
        if (json && json.weeks && json.weeks.length > 0) {
          setData(json);
        }
      }
    } catch {
      /* fallback stays active */
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { current, longest } = useMemo(() => computeStreak(data.weeks), [data.weeks]);

  // Compute month labels aligned with week columns
  const monthLabels = useMemo(() => {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;
    data.weeks.forEach((week, i) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], index: i });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [data.weeks]);

  const stats = [
    { icon: TrendingUp, label: "Total Contributions", value: data.totalContributions.toLocaleString() },
    { icon: Flame, label: "Current Streak", value: `${current} days` },
    { icon: Calendar, label: "Longest Streak", value: `${longest} days` },
  ];

  return (
    <section id="github" className="relative w-full py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
              // ACTIVITY MATRIX
            </span>
            {!isLoading && !data.isMock && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-2.5 w-2.5" /> LIVE SYNC
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <Github className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
              GitHub Activity
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-primary mt-2 rounded-full" />
        </motion.div>

        {/* Heatmap Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5 md:p-6 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
            <div className="min-w-[760px]">
              {/* Month labels */}
              <div className="relative h-5 mb-1 text-[10px] font-mono text-zinc-400 select-none">
                {monthLabels.map((m, i) => (
                  <span
                    key={`${m.label}-${i}`}
                    className="absolute font-medium"
                    style={{ left: `${32 + m.index * 13.5}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Grid with Weekdays and Cells */}
              <div className="flex gap-[3px]">
                {/* Day labels column */}
                <div className="flex flex-col gap-[3px] mr-2 justify-between py-[1px] select-none">
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono text-zinc-500 h-[11px] leading-[11px] w-6 text-right"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Week Columns */}
                {data.weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, di) => {
                      const level = getLevel(day.contributionCount);
                      return (
                        <div
                          key={`${wi}-${di}`}
                          className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_COLORS[level]} cursor-pointer transition-all duration-150 hover:scale-135 hover:z-10 hover:ring-2 hover:ring-white/80`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setTooltip({
                              text: `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${day.date}`,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend Row */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-900/80 text-[11px] font-mono text-zinc-500">
                <span className="text-zinc-500">
                  {isLoading ? "Syncing real GitHub commits..." : "Past 12 Months of Contributions"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  {LEVEL_COLORS.map((color, i) => (
                    <div key={i} className={`h-[11px] w-[11px] rounded-[2px] ${color}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 rounded-lg bg-zinc-900/95 border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-100 shadow-2xl pointer-events-none whitespace-nowrap backdrop-blur-sm"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              {tooltip.text}
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 text-center backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-xl md:text-2xl font-black text-white font-mono">{stat.value}</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {data.isMock && !isLoading && (
          <p className="text-[10px] font-mono text-zinc-600 text-center mt-4">
            Showing demonstration activity • Configure GITHUB_TOKEN in .env.local for personal live sync
          </p>
        )}
      </div>
    </section>
  );
}
