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
    // Skip heartbeat if user has tab in background
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return;
    }

    try {
      if (!idRef.current && typeof window !== "undefined") {
        idRef.current = sessionStorage.getItem("_vp_id") || generateId();
        sessionStorage.setItem("_vp_id", idRef.current);
      }
      const res = await fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: idRef.current }),
      });
      if (res.ok) {
        const data = await res.json();
        const nextCount = data.count || 0;
        setCount((prev) => (prev !== nextCount ? nextCount : prev));
      }
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    heartbeat();
    const interval = setInterval(heartbeat, 45_000); // 45s interval
    
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heartbeat();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [heartbeat]);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
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

export default VisitorPresence;
