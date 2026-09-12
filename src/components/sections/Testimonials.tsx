"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const relationshipColors: Record<string, string> = {
    Manager: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    Colleague: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    Client: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  };

  return (
    <section id="testimonials" className="relative w-full py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-12 text-center items-center"
        >
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2">
            // WHAT PEOPLE SAY
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Testimonials
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-8 md:p-12 backdrop-blur-sm min-h-[280px] flex items-center overflow-hidden">
            {/* Background quote icon */}
            <Quote className="absolute top-6 right-6 h-20 w-20 text-zinc-900/50" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 font-sans italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-zinc-800 overflow-hidden flex-shrink-0">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-zinc-100 font-bold text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs font-mono">
                      {t.title} · {t.company}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-[10px] font-mono font-bold px-2 py-1 rounded-full border ${
                      relationshipColors[t.relationship] || "text-zinc-400 border-zinc-700 bg-zinc-800/50"
                    }`}
                  >
                    {t.relationship}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
