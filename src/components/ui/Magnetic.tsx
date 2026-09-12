"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 18, mass: 0.1 };
  const x = useSpring(xVal, springConfig);
  const y = useSpring(yVal, springConfig);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    let rect = rectRef.current;
    if (!rect && ref.current) {
      rect = ref.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      xVal.set(distanceX * strength);
      yVal.set(distanceY * strength);
    } else {
      xVal.set(0);
      yVal.set(0);
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    xVal.set(0);
    yVal.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
