"use client";

/**
 * AIChatbot.tsx
 * ---------------------------------------------------------------------------
 * Root orchestrator for the AI chatbot feature.
 * Optimized with Next.js dynamic import: ChatWindow is only loaded on first interaction.
 * ---------------------------------------------------------------------------
 */

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChatButton } from "./ChatButton";
import { type Message } from "./ChatMessage";
import { sendChatMessage } from "@/services/chatbotService";
import { openingMessage } from "@/data/chatbotKnowledge";

// Dynamically import the heavy ChatWindow (includes markdown, icons, animations)
const ChatWindow = dynamic(
  () => import("./ChatWindow").then((mod) => mod.ChatWindow),
  { ssr: false }
);

export type { Message };

let messageIdCounter = 0;
function generateId(): string {
  return `msg-${Date.now()}-${++messageIdCounter}`;
}

function createMessage(role: "user" | "assistant", content: string): Message {
  return {
    id: generateId(),
    role,
    content,
    timestamp: new Date(),
  };
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    createMessage("assistant", openingMessage),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const showUnread = !hasBeenOpened;

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasBeenOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setShowSuggestions(false);

      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsTyping(true);

      try {
        const historyForAPI = messages
          .filter((m) => m.id !== "typing-indicator")
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await sendChatMessage(trimmed, historyForAPI);

        setMessages((prev) => [
          ...prev,
          createMessage("assistant", response.message),
        ]);
      } catch (err) {
        console.error("[AIChatbot] Error:", err);
        setMessages((prev) => [
          ...prev,
          createMessage(
            "assistant",
            "Something went sideways 😅 Give it another shot!"
          ),
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages]
  );

  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  return (
    <>
      {(isOpen || hasBeenOpened) && (
        <ChatWindow
          isOpen={isOpen}
          onClose={handleClose}
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          onSuggestion={handleSuggestion}
          showSuggestions={showSuggestions}
        />
      )}
      <ChatButton
        isOpen={isOpen}
        onClick={handleToggle}
        hasUnread={showUnread}
      />
    </>
  );
}

export default AIChatbot;
