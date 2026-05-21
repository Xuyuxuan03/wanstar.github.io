import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, GitMerge, Network, SlidersHorizontal, X } from "lucide-react";
import {
  avatarMatches,
  interconnectionColumns,
  relationTools,
  roundtableMessages,
  scenarioTemplates,
  visualAssets
} from "../data/mockData";
import { GlowCard, MetricBar, Pill, SectionTitle } from "./Primitives";

export function CognitiveNetwork() {
  const [scenarioId, setScenarioId] = useState("startup");
  const [expanded, setExpanded] = useState<string | null>("Lin-MVP");
  const [connect, setConnect] = useState<string | null>(null);
  const scenario = scenarioTemplates.find((s) => s.id === scenarioId) ?? scenarioTemplates[0];

  return (
    <div>
      <SectionTitle
        eyebrow="Wanstar Cognitive Network"
        title="让合适的数字化身先碰撞"
        desc="用户提出问题后，系统先匹配互补的数字化身完成讨论，再决定是否连接背后的真实人。"
      />
      <GlowCard className="mb-5 overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1fr_360px]">
          <div className="p-5">
            <input
              value={scenario.prompt}
              readOnly
              className="mb-4 w-full rounded-2xl border border-slate-700/60 bg-slate-950/55 px-4 py-4 text-sm text-slate-100 outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {scenarioTemplates.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setScenarioId(item.id)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    scenario.id === item.id
                      ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                      : "border-slate-700 bg-slate-950/40 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-h-52 overflow-hidden border-t border-slate-700/40 lg:border-l lg:border-t-0">
            <img src={visualAssets.collaboration} alt="多 Avatar 认知协作" className="h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-sm font-semibold text-white">先协作，再连接</div>
              <p className="mt-1 text-xs leading-5 text-slate-300">数字化身先帮用户筛选思路，真正有价值时再连接真人。</p>
            </div>
          </div>
        </div>
      </GlowCard>

      <InterconnectionBattleground />

      <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
        <GlowCard className="p-5">
          <h3 className="mb-4 font-semibold text-white">问题分析</h3>
          <div className="mb-5">
            <div className="mb-2 text-sm text-slate-300">当前问题所需能力</div>
            <div className="flex flex-wrap gap-2">
              {scenario.abilities.map((item) => <Pill key={item} active>{item}</Pill>)}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm text-slate-300">当前用户可能缺口</div>
            <div className="space-y-3">
              {scenario.gaps.map((gap) => (
                <div key={gap} className="rounded-xl border border-violet-300/20 bg-violet-300/10 p-3 text-sm leading-6 text-slate-200">
                  {gap}
                </div>
              ))}
            </div>
          </div>
        </GlowCard>

        <div className="grid gap-4 md:grid-cols-2">
          {avatarMatches.map((avatar, idx) => (
            <GlowCard key={avatar.name} className="p-5">
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{avatar.name} · {avatar.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{avatar.owner}</p>
                </div>
                <div className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-semibold text-cyan-100">{avatar.match}%</div>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {avatar.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {avatar.thinking.map((tag) => <Pill key={tag} active>{tag}</Pill>)}
              </div>
              <p className="mb-4 text-sm leading-6 text-slate-300">互补点：{avatar.complement}</p>
              {expanded === avatar.name && (
                <div className="mb-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm leading-6 text-cyan-50">
                  {avatar.advice}
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => setExpanded(expanded === avatar.name ? null : avatar.name)} className="flex-1 rounded-xl bg-white/8 px-3 py-2 text-xs text-white hover:bg-white/12">
                  查看建议
                </button>
                <button onClick={() => setConnect(avatar.name)} className="flex-1 rounded-xl bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950">
                  连接本人
                </button>
              </div>
              </motion.div>
            </GlowCard>
          ))}
        </div>
      </div>

      <GlowCard className="mt-5 p-5">
        <h3 className="mb-4 font-semibold text-white">多 Avatar 协作圆桌</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roundtableMessages.map(([name, text]) => (
            <div key={name} className="rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4">
              <div className="mb-2 text-sm font-semibold text-cyan-100">{name}</div>
              <p className="text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-5">
          <div className="mb-2 text-sm font-semibold text-violet-100">系统综合建议</div>
          <p className="text-base leading-7 text-white">建议路径：先做 30 天 MVP 验证 → 形成 3 个真实客户案例 → 再用数据和案例接触种子投资人。</p>
        </div>
      </GlowCard>

      {connect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <GlowCard className="w-full max-w-lg p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">连接 {connect} 背后的真实本人</h3>
              <button onClick={() => setConnect(null)} className="rounded-lg p-2 hover:bg-white/8"><X size={18} /></button>
            </div>
            <div className="grid gap-3">
              {["可发起深度咨询", "可邀请合作", "可进入共创空间", "可预约真人沟通"].map((item) => (
                <div key={item} className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">{item}</div>
              ))}
            </div>
            <button onClick={() => setConnect(null)} className="mt-5 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950">
              发送连接请求
            </button>
          </GlowCard>
        </div>
      )}
    </div>
  );
}

function InterconnectionBattleground() {
  const [selected, setSelected] = useState(interconnectionColumns.center[2]);
  const toolIcons = [Network, BrainCircuit, GitMerge, SlidersHorizontal];

  return (
    <GlowCard className="mb-5 overflow-hidden p-0">
      <div className="border-b border-slate-700/50 px-5 py-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-semibold text-white">Wanstar 认知互联战场</h3>
            <p className="mt-2 text-sm text-slate-400">展示 C2 问题如何穿过互补收敛区，连接到多个 Avatar，再反向路由到真实本人。</p>
          </div>
          <div className="flex gap-2">
            <Pill active>C → A</Pill>
            <Pill active>A → A</Pill>
            <Pill active>A → C</Pill>
          </div>
        </div>
      </div>

      <div className="grid min-h-[560px] xl:grid-cols-[230px_1fr_270px]">
        <aside className="border-b border-slate-700/40 bg-slate-950/30 p-4 xl:border-b-0 xl:border-r">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Relation Tools</div>
          <div className="space-y-3">
            {relationTools.map((tool, idx) => {
              const Icon = toolIcons[idx];
              return (
                <div key={tool.title} className="rounded-2xl border border-slate-700/50 bg-slate-950/55 p-4">
                  <Icon className="mb-3 text-cyan-200" size={22} />
                  <div className="text-sm font-semibold text-white">{tool.title}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{tool.desc}</p>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="relative overflow-x-auto p-5 thin-scrollbar">
          <div className="absolute left-[22%] right-[22%] top-1/2 h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/60 to-violet-300/10" />
          <div className="grid min-w-[880px] grid-cols-[190px_1fr_190px] gap-8">
            <div className="flex flex-col justify-center gap-20">
              {interconnectionColumns.left.map((node) => (
                <RelationBox key={node.title} title={node.title} lines={node.lines} tone="blue" />
              ))}
            </div>

            <div className="rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/5 p-4">
              <div className="mb-4 text-center text-sm font-semibold text-cyan-100">互补收敛区 Nucleus Convergence Zones</div>
              <div className="space-y-4">
                {interconnectionColumns.center.map((zone) => (
                  <motion.button
                    key={zone.title}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(zone)}
                    className={`relative w-full rounded-2xl border p-4 text-left transition ${
                      selected.title === zone.title
                        ? "border-cyan-300/70 bg-cyan-300/15 shadow-glow"
                        : "border-slate-700/60 bg-slate-950/55 hover:border-violet-300/50"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-white">{zone.title}</span>
                      <span className="rounded-full bg-slate-950/70 px-2 py-1 text-xs text-cyan-100">{zone.overlap}% overlap</span>
                    </div>
                    <ul className="space-y-1 text-xs leading-5 text-slate-300">
                      {zone.lines.map((line) => <li key={line}>• {line}</li>)}
                    </ul>
                    <div className="mt-3 text-xs text-amber-200">{zone.friction}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {interconnectionColumns.right.map((node) => (
                <RelationBox key={node.title} title={node.title} lines={node.lines} tone="violet" />
              ))}
            </div>
          </div>
        </div>

        <aside className="border-t border-slate-700/40 bg-slate-950/30 p-4 xl:border-l xl:border-t-0">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Clone Configuration</div>
          <div className="mb-5 flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-300/20 to-violet-400/20 p-2 shadow-glow">
              <div className="h-full w-full rounded-full bg-slate-950/80 ring-2 ring-cyan-200/40" />
            </div>
            <div>
              <div className="font-semibold text-white">Yuxuan-X</div>
              <div className="mt-1 text-xs text-slate-400">结构生成型 Avatar</div>
            </div>
          </div>
          <div className="mb-5 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
            <div className="mb-2 text-sm font-semibold text-violet-100">当前选中收敛区</div>
            <p className="text-sm leading-6 text-slate-300">{selected.title}：{selected.lines.join(" / ")}</p>
          </div>
          <div className="space-y-4">
            <MetricBar label="人格互补度" value={selected.overlap} />
            <MetricBar label="认知摩擦价值" value={selected.friction === "高价值" ? 92 : selected.friction === "低摩擦" ? 68 : 78} />
            <MetricBar label="真人连接概率" value={selected.title.includes("3") ? 86 : 73} />
            <MetricBar label="反馈反哺强度" value={81} />
          </div>
          <button className="mt-5 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950">
            生成连接路径
          </button>
        </aside>
      </div>
    </GlowCard>
  );
}

function RelationBox({ title, lines, tone }: { title: string; lines: string[]; tone: "blue" | "violet" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`flow-sheen rounded-2xl border p-4 ${
        tone === "blue"
          ? "border-cyan-300/25 bg-cyan-300/10"
          : "border-violet-300/25 bg-violet-300/10"
      }`}
    >
      <div className="mb-2 text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-1 text-xs leading-5 text-slate-300">
        {lines.map((line) => <li key={line}>• {line}</li>)}
      </ul>
    </motion.div>
  );
}
