import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { cognitiveTags, dataPipeline, dialogueSamples, personaDimensions, selfAvatarMessages, visualAssets } from "../data/mockData";
import { GlowCard, MetricBar, Pill, SectionTitle } from "./Primitives";

export function ProfilingWorkbench() {
  const [round, setRound] = useState(1);
  const visible = dialogueSamples.slice(0, round);
  const quality = Math.min(92 + round, 97);
  const data = useMemo(() => personaDimensions.map((item, idx) => ({ ...item, value: Math.min(item.value + round + (idx % 2), 98) })), [round]);

  return (
    <div>
      <SectionTitle
        eyebrow="Cells Profiling"
        title="从对话生成个人数字化身"
        desc="深度对话会被整理成人格、思维方式和表达风格，用来生成可交互的个人 Avatar。"
      />
      <div className="overflow-x-auto pb-2 thin-scrollbar">
        <div className="grid min-w-[1180px] grid-cols-[420px_340px_380px] gap-5">
        <GlowCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">侧写对话区</h3>
            <button
              onClick={() => setRound((r) => (r >= dialogueSamples.length ? 1 : r + 1))}
              className="rounded-xl bg-cyan-300/15 px-3 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-300/25"
            >
              生成下一轮侧写问题
            </button>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            {[
              ["已采集对话轮次", 128 + round],
              ["高价值片段", 36 + round],
              ["数据质量评分", `${quality}%`],
              ["方向向量种子", 18 + round]
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-700/50 bg-slate-950/45 p-3">
                <div className="text-xs text-slate-400">{k}</div>
                <div className="mt-1 text-lg font-semibold text-cyan-100">{v}</div>
              </div>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["结构化", "机制追问", "跨域类比", "长期主义"].map((tag) => <Pill key={tag} active>{tag}</Pill>)}
          </div>
          <div className="max-h-[440px] space-y-4 overflow-y-auto pr-1 thin-scrollbar">
            {visible.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="space-y-3"
              >
                <div className="rounded-2xl rounded-tl-sm border border-blue-300/20 bg-blue-400/10 p-4 text-sm leading-6 text-blue-50">
                  {item.q}
                </div>
                <div className="ml-8 rounded-2xl rounded-tr-sm border border-violet-300/20 bg-violet-400/10 p-4 text-sm leading-6 text-slate-100">
                  {item.a}
                </div>
              </motion.div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-5">
          <h3 className="mb-4 font-semibold text-white">数据结构化面板</h3>
          <div className="space-y-3">
            {dataPipeline.map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="pulse-node flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/15 text-sm text-cyan-100">{idx + 1}</div>
                <div className="flow-sheen flex-1 rounded-xl border border-slate-700/50 bg-slate-950/45 p-3">
                  <div className="text-sm font-medium text-white">{step}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {["原始语料", "人格/思维标签", "认知特征", "正负样本对", "数字化身包", "方向向量初始化"][idx]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            <MetricBar label="人格特征标注完整度" value={86 + round} />
            <MetricBar label="思维链偏向可分性" value={82 + round} />
            <MetricBar label="方向向量对比样本质量" value={79 + round} />
          </div>
        </GlowCard>

        <GlowCard className="p-5">
          <h3 className="mb-4 font-semibold text-white">人格/思维模型实时生成</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid stroke="rgba(148,163,184,.25)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                <Radar dataKey="value" stroke="#67e8f9" fill="#8b5cf6" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-5">
            <div className="mb-3 text-sm font-medium text-slate-200">思维方式标签云</div>
            <div className="flex flex-wrap gap-2">
              {cognitiveTags.map((tag, idx) => <Pill key={tag} active={idx < 5}>{tag}</Pill>)}
            </div>
          </div>
        </GlowCard>
        </div>
      </div>
      <GlowCard className="mt-5 p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-white">和自己的数字化身交互</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              用户可以直接和自己的 Avatar 对话，检查它是否像自己一样思考和表达。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill active>Yuxuan-X</Pill>
            <Pill>结构生成型</Pill>
            <Pill>方向向量在线</Pill>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {selfAvatarMessages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl p-4 text-sm leading-7 ${
                    message.role === "user"
                      ? "rounded-tr-sm border border-violet-300/20 bg-violet-400/12 text-violet-50"
                      : "rounded-tl-sm border border-cyan-300/20 bg-cyan-300/10 text-cyan-50"
                  }`}
                >
                  <div className="mb-1 text-xs font-semibold text-slate-400">
                    {message.role === "user" ? "真实本人 C" : "个人数字化身 A"}
                  </div>
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4">
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-cyan-300/20">
              <img src={visualAssets.profilingPortrait} alt="个人数字化身人格侧写" className="h-36 w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs leading-5 text-slate-200">
                侧写不是冷数据，而是把真实人的表达和判断方式转成可交互的 Avatar。
              </div>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="float-slow flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-300/20 to-violet-400/20 shadow-glow">
                <div className="h-12 w-12 rounded-full bg-slate-950/80 ring-2 ring-cyan-200/60" />
              </div>
            </div>
            <div className="space-y-3">
              <MetricBar label="表达一致性校验" value={89} />
              <MetricBar label="思维路径相似度" value={91} />
              <MetricBar label="建议可执行度" value={84} />
            </div>
            <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-xs leading-6 text-slate-300">
              这里用于验证 Avatar 是否保持稳定的判断方式，而不是临时扮演。
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
