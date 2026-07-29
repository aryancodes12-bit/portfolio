import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ArchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ArchDrawer: React.FC<ArchDrawerProps> = ({ isOpen, onClose, children }) => {
  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-t-2xl bg-zinc-900/90 backdrop-blur-xl p-6 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } }}
            exit={{ y: "100%", transition: { type: "spring", stiffness: 260, damping: 25 } }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close Architecture Drawer"
              className="absolute top-4 right-4 rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Content */}
            <div className="mt-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export default for convenience
export default ArchDrawer;
