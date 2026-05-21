import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { navItems, SectionId } from "../data/mockData";

function WanstarLogo() {
  return (
    <div className="relative mb-3 h-14 w-14">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-300/25 via-blue-500/20 to-violet-500/25 shadow-glow" />
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-label="Wanstar logo">
        <defs>
          <linearGradient id="wanstar-logo" x1="10" y1="8" x2="54" y2="56">
            <stop stopColor="#67e8f9" />
            <stop offset="0.55" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="50" height="50" rx="16" fill="rgba(2,6,23,.72)" stroke="url(#wanstar-logo)" strokeWidth="1.5" />
        <path d="M15 23 L23 43 L32 25 L41 43 L49 23" fill="none" stroke="url(#wanstar-logo)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="15" r="3" fill="#67e8f9" />
        <circle cx="51" cy="33" r="2.6" fill="#a78bfa" />
        <circle cx="13" cy="34" r="2.6" fill="#60a5fa" />
        <path d="M16 34 C24 13, 42 13, 50 32" fill="none" stroke="rgba(103,232,249,.38)" strokeWidth="1.5" />
        <path d="M14 36 C25 52, 42 52, 51 34" fill="none" stroke="rgba(167,139,250,.38)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Layout({
  active,
  onChange,
  children
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-slate-700/35 bg-slate-950/55 p-5 backdrop-blur-xl lg:block">
        <div className="mb-8">
          <WanstarLogo />
          <h1 className="text-xl font-semibold text-white">万思达 Wanstar</h1>
          <p className="mt-2 text-xs leading-5 text-slate-400">人格模拟技术 + 认知互联平台 Demo</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  selected
                    ? "bg-cyan-400/15 text-cyan-100 shadow-glow"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-violet-300/20 bg-violet-400/10 p-4 text-xs leading-6 text-slate-300">
          核心叙事：Cells 负责构建稳定可控的 Avatar，Wanstar 负责让 Avatar 进入 C-A-A-C 认知互联闭环。
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-700/30 bg-slate-950/70 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-white">万思达 Wanstar</span>
          <span className="text-xs text-cyan-200">C-A-A-C Loop</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 thin-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${
                active === item.id ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-slate-700 text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 lg:ml-72 lg:px-8 lg:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
