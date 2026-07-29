"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider />");
  return ctx;
}

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-950/40 text-green-400",
  error: "border-red-500/30 bg-red-950/40 text-red-400",
  info: "border-primary/30 bg-primary/5 text-primary",
  warning: "border-yellow-500/30 bg-yellow-950/40 text-yellow-400",
};

function SingleToast({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: () => void;
}) {
  const Icon = icons[item.type];

  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-mono backdrop-blur-xl shadow-xl ${styles[item.type]}`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-zinc-200 text-xs">{item.message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-zinc-500 hover:text-zinc-200 transition-colors p-0.5 rounded"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container — above the navigation dock */}
      <div
        className="fixed bottom-28 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)] pointer-events-none"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <SingleToast item={t} onClose={() => removeToast(t.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
