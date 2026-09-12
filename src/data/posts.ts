export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string; // MDX content as string
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: "building-real-time-ai-chatbot",
    title: "Building a Real-Time AI Chatbot with Groq & Next.js",
    excerpt:
      "How I integrated Groq's blazing-fast inference API into a Next.js portfolio with streaming responses, context-aware conversations, and a beautiful floating UI.",
    date: "2026-09-10",
    readingTime: "6 min read",
    tags: ["AI", "Next.js", "Groq", "TypeScript"],
    featured: true,
    content: `
# Building a Real-Time AI Chatbot with Groq & Next.js

When I decided to add an AI chatbot to my portfolio, I wanted something that felt **instant** — not the typical 2-3 second delay you get with most LLM APIs.

## Why Groq?

Groq's inference engine is built on custom hardware (LPUs) that can process tokens at **500+ tokens/second**. That's ~10x faster than OpenAI's GPT-4.

\`\`\`typescript
// Streaming response from Groq
const stream = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: conversationHistory,
  stream: true,
  temperature: 0.7,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) yield content;
}
\`\`\`

## Architecture

The chatbot uses a **knowledge-base-first** approach:

1. **Static knowledge base** — All portfolio data (projects, skills, experience) is pre-loaded into the system prompt
2. **Streaming API route** — Server-sent events for real-time token delivery
3. **Context window** — Last 10 messages maintained for conversation continuity

## Key Decisions

- **No RAG needed** — The knowledge base is small enough to fit entirely in the context window
- **Streaming over WebSockets** — SSE is simpler and sufficient for one-way data flow
- **Client-side markdown rendering** — Parse and render markdown as tokens arrive

## Results

Average response time: **~200ms** to first token. The chatbot feels like talking to a real person, not waiting for an API.
    `,
  },
  {
    slug: "three-js-interactive-orb",
    title: "Creating a GPU-Powered Interactive Orb with Three.js",
    excerpt:
      "A deep dive into custom GLSL shaders, vertex displacement, and mouse-reactive 3D animations that run at 60fps in the browser.",
    date: "2026-08-25",
    readingTime: "8 min read",
    tags: ["Three.js", "WebGL", "GLSL", "Performance"],
    featured: true,
    content: `
# Creating a GPU-Powered Interactive Orb with Three.js

The hero section of my portfolio features a 3D orb that reacts to mouse movement. Here's how I built it.

## The Shader

The magic is in the vertex shader — it uses **Perlin noise** to displace vertices based on mouse position:

\`\`\`glsl
varying vec3 vNormal;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vec3 pos = position;
  float noise = snoise(pos * 2.0 + uTime * 0.5);
  float mouseInfluence = 1.0 - distance(uv, uMouse);
  pos += normal * noise * 0.3 * mouseInfluence;
  
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
\`\`\`

## Performance Considerations

Running a WebGL animation alongside a React app requires careful optimization:

1. **RequestAnimationFrame** — Never use \`setInterval\` for animations
2. **Dispose on unmount** — Clean up geometries, materials, and renderers
3. **Pixel ratio capping** — Limit to \`Math.min(window.devicePixelRatio, 2)\` to avoid GPU overload on Retina displays
4. **Frustum culling** — Let Three.js skip rendering objects outside the viewport

## The Result

A buttery-smooth 60fps orb that responds to cursor position with organic, fluid distortion. It adds depth to the hero without feeling gimmicky.
    `,
  },
  {
    slug: "portfolio-performance-optimization",
    title: "How I Got a 98 Lighthouse Score on a Next.js Portfolio",
    excerpt:
      "Practical techniques for optimizing a heavily-animated Next.js site: code splitting, font loading, lazy Three.js, and strategic caching.",
    date: "2026-08-15",
    readingTime: "5 min read",
    tags: ["Performance", "Next.js", "Web Vitals", "Optimization"],
    content: `
# How I Got a 98 Lighthouse Score on a Next.js Portfolio

Heavy animations, Three.js, particles, and a chatbot — and still scoring 98 on Lighthouse. Here's how.

## 1. Lazy Load Heavy Dependencies

Three.js is ~600KB. Loading it eagerly would tank your LCP:

\`\`\`typescript
// Dynamic import — only loads when component is visible
const ThreeOrb = dynamic(
  () => import("@/components/ui/ThreeInteractiveOrb"),
  { ssr: false, loading: () => <div className="h-full bg-zinc-950" /> }
);
\`\`\`

## 2. Font Loading Strategy

Using \`next/font\` with \`display: swap\` and \`preload: false\` for non-critical fonts:

\`\`\`typescript
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: "400",
  display: "swap",
  preload: false, // Only load when first used
});
\`\`\`

## 3. Animation Budget

Not every animation needs Framer Motion. CSS animations are cheaper:

- **CSS**: Scrollbar styling, glow effects, aurora background
- **Framer Motion**: Scroll reveals, page transitions, interactive elements
- **Three.js**: Only the hero orb

## 4. Image Optimization

Next.js Image component with proper sizing and \`priority\` for above-the-fold images.

## Results

| Metric | Before | After |
|--------|--------|-------|
| Performance | 72 | 98 |
| FCP | 2.1s | 0.8s |
| LCP | 3.4s | 1.2s |
| CLS | 0.15 | 0.01 |
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
