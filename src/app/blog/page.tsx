"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Sparkles } from "lucide-react";
import { posts, getAllTags } from "@/data/posts";

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = useMemo(() => getAllTags(), []);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2 block">
            // THOUGHTS & LEARNINGS
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-3">
            Blog
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-4 max-w-xl">
            Technical deep dives, architecture decisions, and things I&apos;ve learned building software.
          </p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-8 mb-10"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
              !activeTag
                ? "border-primary text-primary bg-primary/10"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                tag === activeTag
                  ? "border-primary text-primary bg-primary/10"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Post cards */}
        <div className="flex flex-col gap-6">
          {filtered.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 md:p-8 backdrop-blur-sm hover:border-zinc-800 transition-all">
                  {post.featured && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 border border-amber-500/30 bg-amber-500/10 rounded-full px-2 py-0.5">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-3 text-[11px] font-mono text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-md bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 group-hover:text-primary transition-colors">
                      Read
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600 font-mono text-sm">
            No posts found for this tag.
          </div>
        )}
      </div>
    </div>
  );
}
