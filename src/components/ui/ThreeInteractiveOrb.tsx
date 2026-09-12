"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeInteractiveOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    const isCoarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = isMobile ? 10 : 8;

    // Renderer - capped pixel ratio for buttery 60fps
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    // Particle Sphere Geometry
    const particleCount = isMobile ? 350 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const randomScales = new Float32Array(particleCount);

    const radius = 2.8;

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      randomScales[i] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(randomScales, 1));

    // Fast dynamic particle texture
    const createParticleTexture = () => {
      const size = 32;
      const canvasTex = document.createElement("canvas");
      canvasTex.width = size;
      canvasTex.height = size;
      const ctx = canvasTex.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2,
          size / 2,
          0,
          size / 2,
          size / 2,
          size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(0, 240, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(188, 19, 254, 0.3)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvasTex);
    };

    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    // Subtle internal wireframe globe
    const innerGeometry = new THREE.IcosahedronGeometry(2.2, isMobile ? 1 : 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouseWorld = new THREE.Vector3();

    // PRE-ALLOCATED SCRATCH OBJECTS (Eliminates GC thrashing: 0 allocs per frame)
    const scratchVec = new THREE.Vector3();
    const scratchDir = new THREE.Vector3();
    const rotationMatrix = new THREE.Matrix4();
    const invRotation = new THREE.Matrix4();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isCoarsePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Animation Loop using performance.now()
    const startTime = performance.now();

    const animate = () => {
      if (!isVisible.current) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Scene rotation
      pointsMesh.rotation.y = elapsedTime * 0.05 + mouse.x * 0.35;
      pointsMesh.rotation.x = mouse.y * 0.25;
      innerMesh.rotation.y = -elapsedTime * 0.08 - mouse.x * 0.18;
      innerMesh.rotation.x = -mouse.y * 0.12;

      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      // Compute mouse world coords and mesh transform once per frame
      mouseWorld.set(mouse.x * 3.5, mouse.y * 3.5, 0);
      rotationMatrix.makeRotationFromEuler(pointsMesh.rotation);
      invRotation.copy(rotationMatrix).invert();

      const forceLimit = 3.0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const oX = originalPositions[i3];
        const oY = originalPositions[i3 + 1];
        const oZ = originalPositions[i3 + 2];

        // Procedural morphing
        const wave = Math.sin(elapsedTime * 1.2 + oX * 2.0 + oY * 1.5) * 0.15;
        const cosWave = Math.cos(elapsedTime * 1.0 + oZ * 2.0) * 0.12;

        let currentX = oX * (1 + wave);
        let currentY = oY * (1 + wave);
        let currentZ = oZ * (1 + cosWave);

        if (!isCoarsePointer) {
          scratchVec.set(currentX, currentY, currentZ).applyEuler(pointsMesh.rotation);
          const dist = scratchVec.distanceTo(mouseWorld);

          if (dist < forceLimit) {
            scratchDir.copy(scratchVec).sub(mouseWorld).normalize();
            const force = (forceLimit - dist) * 0.16;
            scratchDir.applyMatrix4(invRotation);

            currentX += scratchDir.x * force;
            currentY += scratchDir.y * force;
            currentZ += scratchDir.z * force;
          }
        }

        posArray[i3] = currentX;
        posArray[i3 + 1] = currentY;
        posArray[i3 + 2] = currentZ;
      }

      positionsAttr.needsUpdate = true;
      renderer.render(scene, camera);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause rendering when scrolled offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible.current;
        isVisible.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      renderer.dispose();
      particleTexture.dispose();
      material.dispose();
      innerMaterial.dispose();
      geometry.dispose();
      innerGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-[50%] h-[100vh] pointer-events-none select-none z-0 md:z-10 flex items-center justify-center overflow-hidden opacity-30 md:opacity-100"
    >
      <canvas
        ref={canvasRef}
        className="w-[90%] h-[90%] md:w-[500px] md:h-[500px] opacity-75 lg:opacity-90 max-w-[800px] aspect-square"
      />
    </div>
  );
}

export default ThreeInteractiveOrb;
