"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const animationFrameId = useRef<number>(0);
  const isVisible = useRef<boolean>(true);

  // Cached RGB array to prevent parsing in render loop
  const rgbColor = useRef<number[]>([0, 240, 255]);

  useEffect(() => {
    let cleanHex = color.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(cleanHex, 16);
    rgbColor.current = [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    context.current = canvas.getContext("2d");

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5);

    const resizeCanvas = () => {
      if (!container || !canvas || !context.current) return;
      circles.current = [];
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvasSize.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawParticles();
    };

    const circleParams = (): Circle => {
      const w = canvasSize.current.w || 100;
      const h = canvasSize.current.h || 100;
      return {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2 + size,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
        dx: (Math.random() - 0.5) * 0.1 + vx,
        dy: (Math.random() - 0.5) * 0.1 + vy,
        magnetism: 0.1 + Math.random() * 4,
      };
    };

    const drawCircle = (circle: Circle, update = false) => {
      if (!context.current) return;
      const { x, y, translateX, translateY, size: cSize, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, cSize, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgbColor.current[0]}, ${rgbColor.current[1]}, ${rgbColor.current[2]}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    };

    const drawParticles = () => {
      if (!context.current) return;
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      for (let i = 0; i < quantity; i++) {
        drawCircle(circleParams());
      }
    };

    const drawCircleUpdate = (circle: Circle) => {
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.01;
      circle.x += circle.dx;
      circle.y += circle.dy;

      const magnetismDistance = 100;
      const distanceX = mouse.current.x - circle.x;
      const distanceY = mouse.current.y - circle.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < magnetismDistance) {
        const force = ((magnetismDistance - distance) / magnetismDistance) * circle.magnetism;
        const angle = Math.atan2(distanceY, distanceX);
        circle.translateX += Math.cos(angle) * force * 0.2;
        circle.translateY += Math.sin(angle) * force * 0.2;
      } else {
        circle.translateX -= circle.translateX * 0.05;
        circle.translateY -= circle.translateY * 0.05;
      }

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        Object.assign(circle, circleParams());
        circle.alpha = 0;
      }

      drawCircle(circle, true);
    };

    const render = () => {
      if (!isVisible.current) {
        // Paused while offscreen
        return;
      }
      if (context.current && canvasSize.current.w > 0) {
        context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        const list = circles.current;
        for (let i = 0; i < list.length; i++) {
          drawCircleUpdate(list[i]);
        }
      }
      animationFrameId.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      if (
        mouseX >= 0 &&
        mouseX <= canvasSize.current.w &&
        mouseY >= 0 &&
        mouseY <= canvasSize.current.h
      ) {
        mouse.current.x = mouseX;
        mouse.current.y = mouseY;
      } else {
        mouse.current.x = -1000;
        mouse.current.y = -1000;
      }
    };

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const prev = isVisible.current;
        isVisible.current = entry.isIntersecting;
        if (!prev && entry.isIntersecting) {
          animationFrameId.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    resizeCanvas();
    animationFrameId.current = requestAnimationFrame(render);

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [quantity, size, vx, vy, refresh]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
