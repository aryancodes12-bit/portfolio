"use client";

/**
 * ChatInput.tsx
 * ---------------------------------------------------------------------------
 * Message input area with auto-growing textarea.
 * Enter → send, Shift+Enter → newline.
 * Neon cyan send button matching the portfolio accent.
 * ---------------------------------------------------------------------------
 */

import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Ask me about my projects, skills...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  };

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 focus-within:border-primary/50 transition-colors duration-200">
      <textarea
        ref={textareaRef}
        id="chatbot-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        aria-label="Chat message input"
        className="flex-1 resize-none bg-transparent text-sm font-sans text-zinc-200 placeholder-zinc-600 focus:outline-none disabled:opacity-50 min-h-[24px] max-h-[120px] leading-relaxed"
        style={{ scrollbarWidth: "none" }}
      />
      <button
        onClick={onSend}
        disabled={!canSend}
        aria-label="Send message"
        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
          canSend
            ? "bg-primary text-zinc-950 hover:bg-primary/90 hover:scale-110 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
        }`}
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
