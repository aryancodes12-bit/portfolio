"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Code2, ExternalLink } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
  fallback?: boolean;
}

// Static fallback when Spotify isn't configured
const CURRENT_ACTIVITY = {
  label: "Currently Building",
  value: "Portfolio v2.0",
  icon: Code2,
};

export function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify");
      const json: SpotifyData = await res.json();
      setData(json);
      if (json.fallback) setUseFallback(true);
    } catch {
      setUseFallback(true);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  // Fallback: static "Currently Working On" widget
  if (useFallback || (data && !data.isPlaying && data.fallback)) {
    const FallbackIcon = CURRENT_ACTIVITY.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-400"
      >
        <FallbackIcon className="h-3.5 w-3.5 text-primary" />
        <span className="text-zinc-500">{CURRENT_ACTIVITY.label}:</span>
        <span className="text-zinc-200 font-bold">{CURRENT_ACTIVITY.value}</span>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {data?.isPlaying ? (
        <motion.a
          key="playing"
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="group inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md pl-1.5 pr-3 py-1 text-xs font-mono text-zinc-400 hover:border-green-500/30 transition-colors"
        >
          {/* Album art with spinning vinyl */}
          <div className="relative h-7 w-7 rounded-full overflow-hidden flex-shrink-0">
            {data.albumArt && (
              <img
                src={data.albumArt}
                alt=""
                className="h-full w-full object-cover animate-[spin_4s_linear_infinite]"
              />
            )}
            <div className="absolute inset-0 rounded-full border border-white/10" />
          </div>

          {/* Equalizer bars */}
          <div className="flex items-end gap-[2px] h-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-green-500 rounded-full"
                animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-zinc-200 font-bold truncate max-w-[120px]">{data.title}</span>
            <span className="text-zinc-500 truncate max-w-[120px] text-[10px]">{data.artist}</span>
          </div>

          {/* Progress bar */}
          {data.progressMs && data.durationMs && (
            <div className="h-[2px] w-12 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(data.progressMs / data.durationMs) * 100}%` }}
              />
            </div>
          )}

          <ExternalLink className="h-3 w-3 text-zinc-600 group-hover:text-green-400 transition-colors flex-shrink-0" />
        </motion.a>
      ) : (
        <motion.div
          key="not-playing"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-500"
        >
          <Music className="h-3.5 w-3.5" />
          <span>Not playing</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
