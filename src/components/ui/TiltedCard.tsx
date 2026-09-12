"use client";

import React, { useRef, useState } from "react";
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
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for rotation
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Motion values for glare position
  const glareXVal = useMotionValue(0);
  const glareYVal = useMotionValue(0);
  const glareOpacityVal = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { stiffness: 220, damping: 22, mass: 0.5 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);
  const glareX = useSpring(glareXVal, springConfig);
  const glareY = useSpring(glareYVal, springConfig);
  const glareOpacity = useSpring(glareOpacityVal, springConfig);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect && cardRef.current) {
      rect = cardRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    if (!rect) return;

    const width = rect.width || 1;
    const height = rect.height || 1;

    // Relative coordinates (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    rotateXVal.set(-relativeY * maxTilt);
    rotateYVal.set(relativeX * maxTilt);

    glareXVal.set(((e.clientX - rect.left) / width) * 100);
    glareYVal.set(((e.clientY - rect.top) / height) * 100);
    glareOpacityVal.set(0.18);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
    glareOpacityVal.set(0);
  };

  const glareStyle = useTransform(
    [glareX, glareY, glareOpacity],
    ([x, y, opacity]) => {
      return `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, 0) 80%)`;
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
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
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`relative overflow-hidden rounded-2xl will-change-transform ${className}`}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: glareStyle,
          opacity: hovered ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}

export default TiltedCard;
