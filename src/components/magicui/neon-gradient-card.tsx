"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  borderRadius?: number;
  borderSize?: number;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  containerClassName?: string;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderRadius = 16,
  borderSize = 1.5,
  colorFrom = "#00f0ff",
  colorTo = "#ff007f",
  duration = 10,
  containerClassName,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": colorFrom,
          "--neon-second-color": colorTo,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
      className={cn(
        "relative z-10 w-full rounded-[var(--border-radius)]",
        containerClassName
      )}
      {...props}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-[var(--border-radius)]",
          "after:absolute after:inset-0 after:rounded-[var(--border-radius)] after:content-['']",
          "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[size:100%_200%]",
          "after:animate-neon-gradient after:[animation-duration:var(--duration)]",
          "after:blur-[15px] after:opacity-30 hover:after:opacity-60 transition-opacity duration-500"
        )}
      />

      {/* Border Outline */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-[var(--border-radius)] p-[var(--border-size)]",
          "bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] bg-[size:100%_200%]",
          "animate-neon-gradient [animation-duration:var(--duration)]"
        )}
      />

      {/* Card Body */}
      <div
        className={cn(
          "relative h-full w-full rounded-[var(--card-content-radius)] bg-background text-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
