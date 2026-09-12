"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const slideVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0 },
  exit: { scaleY: 1 },
};

const contentVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, [pathname]);

  const shouldAnimate = !isFirstMount.current;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        {/* Slide overlay — triggers on subsequent route navigation, not initial load */}
        {shouldAnimate && (
          <>
            <motion.div
              className="fixed inset-0 z-[9999] bg-primary origin-bottom pointer-events-none will-change-transform"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="fixed inset-0 z-[9998] bg-zinc-950 origin-top pointer-events-none will-change-transform"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
          </>
        )}
        {/* Page content */}
        <motion.div
          variants={contentVariants}
          initial={shouldAnimate ? "initial" : false}
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, delay: shouldAnimate ? 0.2 : 0, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
