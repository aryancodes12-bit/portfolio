"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
  children?: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export function TiltedCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.03,
  perspective = 1000,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for rotation
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Motion values for glare position
  const glareXVal = useMotionValue(0);
  const glareYVal = useMotionValue(0);
  const glareOpacityVal = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { stiffness: 180, damping: 20, mass: 0.6 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);
  const glareX = useSpring(glareXVal, springConfig);
  const glareY = useSpring(glareYVal, springConfig);
  const glareOpacity = useSpring(glareOpacityVal, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate coordinates relative to card center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Map relative coordinates to degrees
    rotateXVal.set(-relativeY * maxTilt);
    rotateYVal.set(relativeX * maxTilt);

    // Glare position in percentage (0 to 100)
    glareXVal.set(((e.clientX - rect.left) / width) * 100);
    glareYVal.set(((e.clientY - rect.top) / height) * 100);
    glareOpacityVal.set(0.2); // Show glare on hover
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
    glareOpacityVal.set(0);
  };

  // Radial gradient style for glare reflection
  const glareStyle = useTransform(
    [glareX, glareY, glareOpacity],
    ([x, y, opacity]) => {
      return `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, 0) 80%)`;
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: perspective,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      animate={{
        scale: hovered ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Glare overlay */}
      <motion.div
        style={{
          background: glareStyle,
          mixBlendMode: "overlay",
        }}
        className="absolute inset-0 z-30 pointer-events-none"
      />
      <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
