"use client";

/**
 * ChatWindow.tsx
 * ---------------------------------------------------------------------------
 * The main chat panel. Glassmorphism aesthetic adapted to the portfolio's
 * zinc-950 dark neon theme with neon cyan (primary) accents.
 *
 * Uses:
 *  - backdrop-blur-xl (matching About/Contact cards)
 *  - border border-zinc-800 (matching all section cards)
 *  - bg-zinc-950/90 (matching card backgrounds)
 *  - Framer Motion for panel open/close animation
 *  - BorderBeam decoration (same as About card)
 * ---------------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Minimize2 } from "lucide-react";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { quickSuggestions } from "@/data/chatbotKnowledge";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onSuggestion: (text: string) => void;
  showSuggestions: boolean;
}

// Typing placeholder message for the animation
const TYPING_MSG: Message = {
  id: "typing-indicator",
  role: "assistant",
  content: "",
  timestamp: new Date(),
};

export function ChatWindow({
  isOpen,
  onClose,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSend,
  onSuggestion,
  showSuggestions,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-window"
          initial={{ opacity: 0, scale: 0.92, y: 20, transformOrigin: "bottom right" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Aryan's AI chatbot"
          className={[
            // Position — above the chat button, right-aligned
            "fixed z-50",
            "bottom-[88px] right-4 sm:right-6",
            // Size
            "w-[calc(100vw-2rem)] sm:w-[380px]",
            "h-[min(520px,80vh)]",
            // Glassmorphism matching portfolio cards
            "rounded-2xl border border-zinc-800/80",
            "bg-zinc-950/90 backdrop-blur-xl",
            // Shadow with neon cyan glow
            "shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(0,240,255,0.08)]",
            "flex flex-col overflow-hidden",
          ].join(" ")}
        >
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-zinc-800/80 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8 flex-shrink-0">
            {/* Thin gradient top border accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="flex items-center gap-3">
              {/* Bot avatar */}
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 border border-primary/30">
                <Bot className="w-4 h-4 text-primary" />
                {/* Online pulse */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-zinc-950" />
              </div>

              <div>
                <p className="text-xs font-bold font-mono text-zinc-100 leading-none">
                  Aryan&apos;s AI Twin
                </p>
                <p className="text-[10px] font-mono text-green-400 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online · Ask me about my portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                aria-label="Minimize chat"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Messages Area ───────────────────────────────────────────────── */}
          <div
            className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 scroll-smooth"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <ChatMessage key="typing" message={TYPING_MSG} isTyping />
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Suggestions ───────────────────────────────────────────── */}
          <AnimatePresence>
            {showSuggestions && messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3.5 pb-2 flex-shrink-0"
              >
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickSuggestions.slice(0, 5).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => onSuggestion(suggestion)}
                      className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:border-primary/50 hover:text-primary hover:bg-zinc-900 transition-all duration-200 text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Input Area ──────────────────────────────────────────────────── */}
          <div className="px-3.5 pb-3.5 pt-2 flex-shrink-0 border-t border-zinc-900">
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSend={onSend}
              disabled={isTyping}
              placeholder="Ask me about my projects, skills..."
            />
            <p className="text-center text-[9px] font-mono text-zinc-700 mt-2">
              Powered by Groq · Knows only Aryan&apos;s portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
