"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Send, CheckCircle2, ShieldAlert, Mail, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "aryanjaiswal3080@gmail.com",
    href: "mailto:aryanjaiswal3080@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/aryancodes12-bit",
    username: "@aryancodes12-bit",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aryanjaiswal30",
    username: "Aryan Jaiswal",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
    username: "@aryan_dev",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 bg-zinc-950/60 overflow-hidden border-t border-zinc-900 px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-2">
            05 // LINK ESTABLISHED
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          <p className="text-zinc-500 text-sm font-mono mt-3">
            Have a project in mind? Let&apos;s work together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info + Form */}
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 md:p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold font-mono text-zinc-100 uppercase tracking-wider mb-2">
              Let&apos;s Connect
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              I&apos;m currently open to new opportunities and interesting projects. Whether you have a
              question or just want to say hi, I&apos;ll do my best to get back to you!
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-zinc-200 hover:text-primary transition-colors text-sm font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-zinc-200 text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Email button */}
            <ShimmerButton
              shimmerColor="#00f0ff"
              className="w-full"
              onClick={() => { window.location.href = "mailto:aryanjaiswal3080@gmail.com"; }}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Me an Email</span>
            </ShimmerButton>
          </div>

          {/* Social links + Form */}
          <div className="flex flex-col gap-6">
            {/* Social links */}
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold font-mono text-zinc-100 uppercase tracking-wider mb-4">
                Find Me Online
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-zinc-950/50">
                          <Icon className="h-4 w-4 text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-zinc-200 font-bold">{social.label}</p>
                          <p className="text-[10px] text-zinc-500">{social.username}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick message form */}
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 backdrop-blur-sm flex-1">
              <h3 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider mb-4">
                Send a Quick Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  disabled={status === "sending" || status === "success"}
                  className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 px-3 py-2.5 text-sm font-mono text-zinc-200 placeholder-zinc-600 focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                  disabled={status === "sending" || status === "success"}
                  className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 px-3 py-2.5 text-sm font-mono text-zinc-200 placeholder-zinc-600 focus:border-primary focus:outline-none transition-colors"
                />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  disabled={status === "sending" || status === "success"}
                  className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 px-3 py-2.5 text-sm font-mono text-zinc-200 placeholder-zinc-600 focus:border-primary focus:outline-none transition-colors resize-none"
                />

                <AnimatePresence mode="wait">
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-950/20 p-2.5 text-xs font-mono text-red-400">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      All fields are required.
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-950/20 p-2.5 text-xs font-mono text-green-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Message sent! I&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <ShimmerButton type="submit" shimmerColor="#00f0ff" className="w-full" disabled={status === "sending" || status === "success"}>
                  {status === "idle" && <><Send className="h-3 w-3" /><span>Send Message</span></>}
                  {status === "sending" && <span>Sending...</span>}
                  {status === "success" && <span>Sent ✔</span>}
                </ShimmerButton>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center border-t border-zinc-900 pt-8">
          <p className="text-zinc-500 text-sm">
            Designed &amp; Built by{" "}
            <span className="text-primary font-medium font-mono">Aryan Jaiswal</span>
          </p>
          <p className="text-zinc-700 text-xs mt-2 font-mono">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
