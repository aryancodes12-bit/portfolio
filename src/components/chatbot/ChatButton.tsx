"use client";

/**
 * ChatButton.tsx
 * ---------------------------------------------------------------------------
 * Floating action button (FAB) fixed to bottom-right corner.
 * Opens/closes the chat window. Glows neon cyan matching the portfolio accent.
 * Has a subtle pulse notification dot when the chat hasn't been opened yet.
 * ---------------------------------------------------------------------------
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageSquareMore } from "lucide-react";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

export function ChatButton({ isOpen, onClick, hasUnread = false }: ChatButtonProps) {
  return (
    <div className={`fixed z-50 bottom-6 right-6 ${!isOpen ? "animate-[float_3s_ease-in-out_infinite]" : ""}`}>
      <motion.button
        onClick={onClick}
        aria-label={isOpen ? "Close AI chatbot" : "Open AI chatbot"}
        aria-expanded={isOpen}
        id="ai-chatbot-toggle"
        // Entrance animation
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        // Hover / tap micro-interactions
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className={[
          "w-14 h-14 rounded-full",
          "flex items-center justify-center",
          "border transition-all duration-300",
          isOpen
            ? "bg-zinc-900 border-zinc-700 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            : "bg-zinc-950 border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.35),0_4px_24px_rgba(0,0,0,0.6)]",
        ].join(" ")}
        style={
        isOpen
          ? {}
          : {
              animation: "chatbot-glow 3s ease-in-out infinite",
            }
      }
    >
      {/* Notification pulse dot */}
      <AnimatePresence>
        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-zinc-950"
          />
        )}
      </AnimatePresence>

      {/* Icon toggle with animation */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <X className="w-5 h-5 text-zinc-400" />
          </motion.div>
        ) : (
          <motion.div
            key="bot"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            <Bot className="w-5 h-5 text-primary" />
            {/* Small chat bubble badge */}
            <MessageSquareMore className="absolute -bottom-1.5 -right-1.5 w-3 h-3 text-primary/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip label — shows on hover */}
      {!isOpen && (
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/95 px-2.5 py-1.5 text-[11px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Ask me anything ✨
        </span>
      )}
    </motion.button>
    </div>
  );
}
