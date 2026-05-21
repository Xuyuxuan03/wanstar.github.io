import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Network, Sparkles } from "lucide-react";
import { heroLayers, homeFlow, SectionId, visualAssets } from "../data/mockData";
import { GlowCard, Pill, SectionTitle } from "./Primitives";

const layerIcons = [BrainCircuit, Network, Sparkles];

export function Home({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="space-y-8">
      <section className="flow-sheen relative overflow-hidden rounded-[28px] border border-slate-700/35 bg-radial-grid p-6 shadow-2xl md:p-10">
        <div className="absolute bottom-6 right-6 hidden w-80 overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/50 shadow-glow xl:block">
          <img src={visualAssets.heroHuman} alt="真实协作场景" className="h-52 w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-sm font-semibold text-white">真实人进入认知网络</div>
            <div className="mt-1 text-xs leading-5 text-slate-300">先由数字化身协作，再把高价值关系带回真实人。</div>
          </div>
        </div>
        <div className="orbit-ring absolute right-10 top-8 hidden h-52 w-52 rounded-full border border-cyan-300/20 md:block">
          <div className="absolute inset-10 rounded-full border border-violet-300/20" />
          <div className="pulse-node absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-glow" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {["人格模拟", "脑表征", "方向向量", "认知网络", "C-A-A-C"].map((tag) => (
              <Pill key={tag} active>{tag}</Pill>
            ))}
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">万思达 Wanstar</h1>
          <p className="mt-4 text-xl text-cyan-100 md:text-2xl">数字化身认知互联平台</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            万思达不是让 AI 简单扮演某个人，而是通过对话侧写、人格维度、思维方式、脑表征信号和方向向量控制，构建具有稳定认知风格的数字化身。每个数字化身都可以进入万思达网络，与其他数字化身在不同场景中进行互补协作；当高价值建议出现时，平台再把连接反向带回背后的真实本人。
          </p>
          <p className="mt-5 text-2xl font-medium text-white">不是让AI扮演你，而是让你的认知结构进入网络。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onNavigate("profiling")} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow">
              进入工作台
            </button>
            <button onClick={() => onNavigate("loop")} className="rounded-xl border border-violet-300/40 bg-violet-300/10 px-5 py-3 text-sm font-semibold text-violet-100">
              查看闭环
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {heroLayers.map((layer, index) => (
          <GlowCard key={layer.title} className="flow-sheen p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-cyan-200">
                {(() => {
                  const Icon = layerIcons[index];
                  return <Icon size={20} />;
                })()}
              </div>
              <h3 className="font-semibold text-white">{layer.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.items.slice(0, 4).map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
          </GlowCard>
        ))}
      </section>

      <section>
        <SectionTitle
          eyebrow="How It Works"
          title="从一个人，到一张认知网络"
          desc="页面展示完整路径：生成数字化身、进入网络协作、连接真实本人、持续反馈更新。"
        />
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <GlowCard className="p-5">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {homeFlow.map((node, index) => (
                <motion.div
                  key={node.label}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4"
                >
                  <div className="flow-sheen mb-4 h-2 w-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 opacity-70 group-hover:opacity-100" />
                  <div className="mb-2 text-sm font-semibold text-white">{node.label}</div>
                  <p className="text-xs leading-5 text-slate-400">{node.text}</p>
                  {index < homeFlow.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-8 hidden text-cyan-200 xl:block" size={20} />
                  )}
                </motion.div>
              ))}
            </div>
          </GlowCard>
          <GlowCard className="p-5">
            <h3 className="mb-4 font-semibold text-white">核心价值</h3>
            <p className="text-sm leading-7 text-slate-300">
              Cells 负责把人的判断方式建成 Avatar；Wanstar 负责让这些 Avatar 找到彼此，并把高价值关系带回真实世界。
            </p>
            <div className="mt-6 space-y-3">
              {["生成 Avatar", "匹配协作", "输出建议", "连接真人"].map((item, idx) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-100">{idx + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </section>
    </div>
  );
}
