"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function VisitorPresence() {
  const [count, setCount] = useState(0);
  const idRef = useRef<string>("");

  const heartbeat = useCallback(async () => {
    try {
      if (!idRef.current) {
        idRef.current = sessionStorage.getItem("_vp_id") || generateId();
        sessionStorage.setItem("_vp_id", idRef.current);
      }
      const res = await fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: idRef.current }),
      });
      const data = await res.json();
      setCount(data.count || 0);
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    heartbeat();
    const interval = setInterval(heartbeat, 30_000);
    return () => clearInterval(interval);
  }, [heartbeat]);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span>
            <span className="text-zinc-200 font-bold">{count}</span>{" "}
            {count === 1 ? "visitor" : "visitors"} online
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
