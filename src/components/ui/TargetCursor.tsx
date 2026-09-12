"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function TargetCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const isEnabled = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfig = { stiffness: 260, damping: 26, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const dotConfig = { stiffness: 900, damping: 35 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches);

    if (isTouchDevice) {
      return;
    }

    isEnabled.current = true;
    document.body.style.cursor = "none";

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Efficient event delegation instead of scanning DOM tree with MutationObserver
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, [role='button'], input, select, textarea, .interactive-target"
        )
      ) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, [role='button'], input, select, textarea, .interactive-target"
        )
      ) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block select-none" aria-hidden="true">
      {/* Outer Ring — uses GPU scale transform instead of width/height layout reflow */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.35 : clicked ? 0.75 : 1,
          borderColor: hovered ? "var(--color-primary)" : "rgba(255, 255, 255, 0.7)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute w-11 h-11 rounded-full border flex items-center justify-center mix-blend-difference will-change-transform"
      >
        {/* Crosshair ticks */}
        <span className="absolute w-[1.5px] h-[5px] bg-white top-0" />
        <span className="absolute w-[1.5px] h-[5px] bg-white bottom-0" />
        <span className="absolute h-[1.5px] w-[5px] bg-white left-0" />
        <span className="absolute h-[1.5px] w-[5px] bg-white right-0" />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 1.8 : hovered ? 0.6 : 1,
          backgroundColor: hovered ? "var(--color-primary)" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.8)] will-change-transform"
      />
    </div>
  );
}

export default TargetCursor;
