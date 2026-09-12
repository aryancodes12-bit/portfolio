"use client";

/**
 * ChatMessage.tsx
 * ---------------------------------------------------------------------------
 * Renders a single message bubble — either AI or User.
 * Matches the portfolio's zinc-950 dark neon theme exactly.
 * Also renders the three-dot typing indicator when isTyping is true.
 * ---------------------------------------------------------------------------
 */

import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean; // shows typing dots instead of content
}

/** Parse message content to make GitHub/live links clickable */
function parseLinks(text: string): React.ReactNode[] {
  // Match patterns like: GitHub → URL  or  Live Demo → URL  or bare URLs
  const urlPattern =
    /((?:GitHub|Live Demo|Demo|View)\s*[→>]\s*)(https?:\/\/[^\s\n]+)|(https?:\/\/[^\s\n]+)/gi;

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlPattern.exec(text)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Label → URL pattern
      segments.push(
        <span key={match.index} className="inline-flex items-center gap-1 mt-1">
          <a
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-mono text-primary hover:bg-primary/20 hover:border-primary/60 transition-all duration-200 group"
          >
            <span className="font-bold">{match[1].trim()}</span>
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </span>
      );
    } else if (match[3]) {
      // Bare URL
      segments.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {match[3]}
        </a>
      );
    }

    lastIndex = urlPattern.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  // Expand newlines in plain text segments into <br /> elements
  const result: React.ReactNode[] = [];
  segments.forEach((seg, i) => {
    if (typeof seg !== "string") {
      result.push(seg);
      return;
    }
    const lines = seg.split("\n");
    lines.forEach((line, j) => {
      result.push(line);
      if (j < lines.length - 1) {
        result.push(<br key={`br-${i}-${j}`} />);
      }
    });
  });

  return result;
}

/** Three-dot typing animation */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary/70"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const isAI = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex gap-2.5 ${isAI ? "flex-row" : "flex-row-reverse"} items-end`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
          isAI
            ? "bg-primary/15 border border-primary/30"
            : "bg-zinc-800 border border-zinc-700"
        }`}
        aria-hidden="true"
      >
        {isAI ? (
          <Bot className="w-3.5 h-3.5 text-primary" />
        ) : (
          <User className="w-3.5 h-3.5 text-zinc-400" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`relative max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed font-sans ${
          isAI
            ? "rounded-bl-sm bg-zinc-900/80 border border-zinc-800 text-zinc-200"
            : "rounded-br-sm bg-primary/10 border border-primary/25 text-zinc-100"
        }`}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <p className="whitespace-pre-wrap break-words">
            {parseLinks(message.content)}
          </p>
        )}
      </div>
    </motion.div>
  );
}
