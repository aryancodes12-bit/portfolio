"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPostBySlug } from "@/data/posts";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Simple markdown-to-JSX renderer for blog content
function MarkdownRenderer({ content }: { content: string }) {
  const elements = useMemo(() => {
    const lines = content.trim().split("\n");
    const result: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLang = "";
    let inTable = false;
    let tableRows: string[][] = [];
    let tableAligns: string[] = [];
    let keyIdx = 0;

    const renderInline = (text: string): React.ReactNode => {
      // Bold, italic, inline code, links
      const parts: React.ReactNode[] = [];
      const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }

        const m = match[0];
        if (m.startsWith("`")) {
          parts.push(
            <code key={`ic-${match.index}`} className="bg-zinc-900 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
              {m.slice(1, -1)}
            </code>
          );
        } else if (m.startsWith("**")) {
          parts.push(
            <strong key={`b-${match.index}`} className="text-zinc-100 font-bold">
              {m.slice(2, -2)}
            </strong>
          );
        } else if (m.startsWith("*")) {
          parts.push(
            <em key={`i-${match.index}`} className="text-zinc-300 italic">
              {m.slice(1, -1)}
            </em>
          );
        } else if (m.startsWith("[")) {
          const linkMatch = m.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            parts.push(
              <a key={`a-${match.index}`} href={linkMatch[2]} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {linkMatch[1]}
              </a>
            );
          }
        }
        lastIndex = match.index + m.length;
      }

      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      return parts.length > 0 ? parts : text;
    };

    const flushTable = () => {
      if (tableRows.length < 1) return;
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1);
      result.push(
        <div key={`tbl-${keyIdx++}`} className="overflow-x-auto my-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="bg-zinc-900/80">
                {headerRow.map((cell, ci) => (
                  <th key={ci} className={`px-4 py-2.5 text-zinc-300 font-bold text-left border-b border-zinc-800 ${tableAligns[ci] === "center" ? "text-center" : ""}`}>
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="border-b border-zinc-900 last:border-0 hover:bg-zinc-900/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-2 text-zinc-400 ${tableAligns[ci] === "center" ? "text-center" : ""}`}>
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableAligns = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          result.push(
            <div key={`code-${keyIdx++}`} className="my-6 rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{codeLang || "code"}</span>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed">
                <code>{codeLines.join("\n")}</code>
              </pre>
            </div>
          );
          codeLines = [];
          codeLang = "";
          inCodeBlock = false;
        } else {
          if (inTable) flushTable();
          inCodeBlock = true;
          codeLang = line.trim().replace("```", "");
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Table rows
      if (line.trim().startsWith("|")) {
        if (!inTable) inTable = true;
        const cells = line.split("|").slice(1, -1);
        // Check if separator row
        if (cells.every((c) => /^[\s:-]+$/.test(c))) {
          tableAligns = cells.map((c) => {
            if (c.trim().startsWith(":") && c.trim().endsWith(":")) return "center";
            return "left";
          });
          continue;
        }
        tableRows.push(cells);
        continue;
      }

      if (inTable) flushTable();

      // Empty line
      if (line.trim() === "") continue;

      // Headings
      if (line.startsWith("# ")) {
        result.push(
          <h1 key={`h1-${keyIdx++}`} className="text-3xl md:text-4xl font-black text-white mt-8 mb-4 tracking-tight">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        result.push(
          <h2 key={`h2-${keyIdx++}`} className="text-2xl font-bold text-zinc-100 mt-8 mb-3 tracking-tight border-b border-zinc-900 pb-2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        result.push(
          <h3 key={`h3-${keyIdx++}`} className="text-xl font-bold text-zinc-200 mt-6 mb-2">
            {line.slice(4)}
          </h3>
        );
      }
      // Numbered list
      else if (/^\d+\.\s/.test(line.trim())) {
        const text = line.replace(/^\d+\.\s/, "");
        result.push(
          <div key={`ol-${keyIdx++}`} className="flex gap-3 my-1 ml-2">
            <span className="text-primary font-mono text-sm font-bold mt-0.5">{line.match(/^\d+/)?.[0]}.</span>
            <p className="text-zinc-400 text-sm leading-relaxed">{renderInline(text)}</p>
          </div>
        );
      }
      // Bullet list
      else if (line.trim().startsWith("- ")) {
        const text = line.trim().slice(2);
        result.push(
          <div key={`ul-${keyIdx++}`} className="flex gap-3 my-1 ml-2">
            <span className="text-primary mt-1.5 text-[6px]">●</span>
            <p className="text-zinc-400 text-sm leading-relaxed">{renderInline(text)}</p>
          </div>
        );
      }
      // Paragraph
      else {
        result.push(
          <p key={`p-${keyIdx++}`} className="text-zinc-400 text-base leading-relaxed my-3">
            {renderInline(line)}
          </p>
        );
      }
    }

    if (inTable) flushTable();
    return result;
  }, [content]);

  return <div className="prose-custom">{elements}</div>;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary font-mono text-sm hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-24 pb-32 px-4 md:px-6">
      <ScrollProgress />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <article className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-mono text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              {post.excerpt}
            </p>

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

            <div className="h-px w-full bg-zinc-900 mt-8" />
          </header>
        </motion.div>

        {/* Post content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MarkdownRenderer content={post.content} />
        </motion.div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary text-sm font-mono hover:bg-primary/10 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}
