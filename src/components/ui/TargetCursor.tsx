"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function TargetCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring
  const springConfig = { stiffness: 220, damping: 24, mass: 0.8 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Fast springs for the inner dot
  const dotConfig = { stiffness: 800, damping: 35 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnterInteractive = () => setHovered(true);
    const handleMouseLeaveInteractive = () => setHovered(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, .interactive-target"
      );
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnterInteractive);
        target.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        target.addEventListener("mouseenter", handleMouseEnterInteractive);
        target.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    addHoverListeners();

    // Observe changes to the DOM to attach hover listeners to dynamically added elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Ring with Crosshair Target look */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 56 : clicked ? 32 : 42,
          height: hovered ? 56 : clicked ? 32 : 42,
          borderColor: hovered ? "var(--color-primary)" : "#ffffff",
          scale: clicked ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="absolute rounded-full border border-white/60 flex items-center justify-center mix-blend-difference"
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
          scale: hovered ? 1.5 : clicked ? 0.6 : 1,
          backgroundColor: hovered ? "#00f0ff" : "#ff007f",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute w-2 h-2 rounded-full mix-blend-difference"
      />
    </div>
  );
}
