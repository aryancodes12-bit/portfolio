"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // in seconds
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-[length:200%_auto] animate-shiny-shimmer ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

export default ShinyText;
