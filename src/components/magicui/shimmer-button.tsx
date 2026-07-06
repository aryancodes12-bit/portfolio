"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#00f0ff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "12px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--speed": shimmerDuration,
            "--size": shimmerSize,
            "--radius": borderRadius,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.15)]",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "-z-30 absolute inset-0 [mask-image:radial-gradient(100%_100%_at_50%_50%,transparent_0%,white_100%)]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 animate-shimmer-slide [background:conic-gradient(from_0deg_at_50%_50%,var(--shimmer-color)_0deg,transparent_60deg,var(--shimmer-color)_360deg)]",
            )}
            style={{
              width: "200%",
              height: "200%",
              left: "-50%",
              top: "-50%",
            }}
          />
        </div>

        <div className="absolute inset-[1px] -z-20 rounded-[calc(var(--radius)-1px)] bg-zinc-950" />

        <span className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
