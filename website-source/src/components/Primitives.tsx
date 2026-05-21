import { motion } from "framer-motion";
import { ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className={`glass rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="text-cyan-200">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800/80">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 shadow-glow"
        />
      </div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{desc}</p>
    </div>
  );
}

export function Pill({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
        active
          ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
          : "border-slate-600/60 bg-slate-900/45 text-slate-300"
      }`}
    >
      {children}
    </span>
  );
}
