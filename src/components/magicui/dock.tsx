"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_WIDTH = 40;
const DEFAULT_DISTANCE = 140;

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      magnification = 60,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      children,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          ((child.type as any).displayName === "DockIcon" || (child.type as any) === DockIcon)
        ) {
          return React.cloneElement(child, {
            ...(child.props as any),
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(
          "mx-auto w-max h-16 flex gap-4 rounded-2xl border border-border bg-background/20 backdrop-blur-md px-4 pb-3 shadow-2xl items-end",
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          },
          className,
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export const DockIcon = ({
  size,
  magnification = 60,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX ?? new MotionValue(0), (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [DEFAULT_WIDTH, magnification, DEFAULT_WIDTH],
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-muted/40 backdrop-blur-sm border border-border/20 text-foreground transition-colors hover:bg-primary/20 hover:text-primary hover:border-primary/50",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";
