import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Layers3, RadioTower } from "lucide-react";
import { brainRegions, representationVectors } from "../data/mockData";
import { GlowCard, MetricBar, Pill, SectionTitle } from "./Primitives";

const activeRegionIds = new Set(["pfc", "semantic", "decision", "attention"]);

const activationSamples = [
  {
    title: "样本 01：复杂问题的生成机制",
    text: "“我会先判断这个问题背后是否存在一个更底层的结构。如果只是表面问题，我通常不急着解决，而是先找它的生成机制。”",
    regions: ["前额叶控制区", "决策评估区", "语义联想区"],
    reason: "触发长期目标控制、因果追问和结构抽象。"
  },
  {
    title: "样本 02：不同观点的合作策略",
    text: "“我不会急着说服对方。我会先看我们是不是在讨论同一个问题，如果不是，我会重新定义问题边界。”",
    regions: ["注意力网络", "前额叶控制区", "情绪调节区"],
    reason: "触发问题边界重构、冲突抑制和合作策略选择。"
  },
  {
    title: "样本 03：产品与融资的决策判断",
    text: "“先验证最小可交付场景，再决定是否让融资放大承诺成本。”",
    regions: ["决策评估区", "记忆整合区", "语义联想区"],
    reason: "触发风险收益评估、经验案例检索和商业语义映射。"
  }
];

export function BrainModel() {
  const [active, setActive] = useState(brainRegions[0]);

  return (
    <div>
      <SectionTitle
        eyebrow="Research-grade Brain Representation"
        title="脑区信号与大脑表征建模"
        desc="展示一段真实表达如何触发不同认知信号，并进一步影响数字化身的表达方式。"
      />
      <GlowCard className="mb-5 p-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-semibold text-white">当前样本触发的脑区激活</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              看见某类段落时，系统会记录对应的认知信号。这里是展示用模拟值，不用于医疗诊断。
            </p>
          </div>
          <Pill active>样本 → 脑区 → 表征向量</Pill>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {activationSamples.map((sample, idx) => (
            <motion.div
              key={sample.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="flow-sheen rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4"
            >
              <div className="mb-2 text-sm font-semibold text-cyan-100">{sample.title}</div>
              <p className="text-sm leading-7 text-slate-300">{sample.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sample.regions.map((regionName) => {
                  const region = brainRegions.find((item) => item.name === regionName);
                  return (
                    <button
                      key={regionName}
                      onClick={() => region && setActive(region)}
                      className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100 hover:border-cyan-200/70"
                    >
                      {regionName}{region ? ` ${region.strength}%` : ""}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{sample.reason}</p>
            </motion.div>
          ))}
        </div>
      </GlowCard>
      <div className="overflow-x-auto pb-2 thin-scrollbar">
        <div className="grid min-w-[1260px] grid-cols-[500px_350px_380px] gap-5">
        <GlowCard className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Brain size={18} /> 脑区信号采集模拟
          </h3>

          <div className="relative mx-auto mb-5 h-[420px] max-w-xl rounded-[46%] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-violet-400/10 to-slate-950/70 shadow-glow">
            <div className="absolute inset-7 rounded-[46%] border border-cyan-300/15" />
            <div className="absolute inset-16 rounded-[46%] border border-violet-300/15" />
            <div className="absolute left-[44%] top-[48%] h-28 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/12" />
            <div className="absolute left-[54%] top-[48%] h-28 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/12" />
            <div className="absolute left-1/2 top-[52%] h-px w-[78%] -translate-x-1/2 bg-cyan-300/10" />
            <div className="absolute left-1/2 top-[18%] h-[64%] w-px bg-violet-300/10" />

            {brainRegions.map((region) => {
              const selected = active.id === region.id;
              const isActivated = activeRegionIds.has(region.id);
              return (
                <button
                  key={region.id}
                  onClick={() => setActive(region)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  title={`${region.name}：${region.strength}%`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full border transition ${isActivated ? "pulse-node" : ""} ${
                      selected
                        ? "border-white bg-cyan-100 shadow-[0_0_30px_rgba(103,232,249,.95)]"
                        : isActivated
                          ? "border-cyan-200 bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,.7)]"
                          : "border-violet-200 bg-violet-300/70 shadow-violet"
                    }`}
                  />
                  <span
                    className={`mt-2 block min-w-28 rounded-xl border px-2 py-1 text-[11px] leading-4 backdrop-blur-md ${
                      selected
                        ? "border-cyan-200/70 bg-cyan-300/18 text-cyan-50"
                        : "border-slate-700/60 bg-slate-950/70 text-slate-300"
                    }`}
                  >
                    <span className="block font-semibold">{region.name}</span>
                    <span className="text-cyan-200">激活 {region.strength}%</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-cyan-100">{active.name}</div>
              <Pill active>当前选中</Pill>
            </div>
            <p className="text-sm leading-6 text-slate-300">{active.desc}</p>
            <div className="mt-4">
              <MetricBar label="当前模拟信号强度" value={active.strength} />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <RadioTower size={16} /> 当前激活脑区清单
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {brainRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActive(region)}
                  className={`rounded-xl border p-3 text-left transition ${
                    active.id === region.id
                      ? "border-cyan-300/70 bg-cyan-300/15"
                      : activeRegionIds.has(region.id)
                        ? "border-cyan-300/25 bg-slate-950/50"
                        : "border-slate-700/50 bg-slate-950/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-200">{region.name}</span>
                    <span className="text-xs text-cyan-200">{region.strength}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.strength}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${
                        activeRegionIds.has(region.id)
                          ? "bg-gradient-to-r from-cyan-300 to-violet-400"
                          : "bg-slate-600"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-5">
          <h3 className="mb-4 font-semibold text-white">脑表征映射</h3>
          <div className="space-y-3">
            {["脑区信号", "认知状态特征", "表征向量", "思维偏向维度", "数字化身控制参数"].map((step, idx) => (
              <div key={step}>
                <div className="rounded-xl border border-slate-700/50 bg-slate-950/45 p-3 text-sm text-slate-200">{step}</div>
                {idx < 4 && <div className="mx-auto h-5 w-px bg-gradient-to-b from-cyan-300 to-violet-400" />}
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {representationVectors.map((vector) => (
              <MetricBar key={vector.name} label={`${vector.name} ${vector.cn}`} value={vector.value} />
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
            <div className="mb-2 text-sm font-semibold text-violet-100">映射说明</div>
            <p className="text-sm leading-7 text-slate-300">
              高激活信号会影响对应向量。例如规划信号增强长期路径，语义信号增强类比能力，决策信号提高风险判断权重。
            </p>
          </div>
        </GlowCard>

        <GlowCard className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Layers3 size={18} /> 大模型隐空间对齐
          </h3>
          <div className="space-y-3">
            {["Human Cognitive Signal", "Brain Representation", "Persona Feature Space", "LLM Hidden Space", "Direction Vector", "Avatar Behavior"].map((step) => (
              <div key={step} className="rounded-xl border border-violet-300/20 bg-violet-300/10 px-4 py-3 text-sm text-violet-50">
                {step}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-slate-200">
            <p>当前样本正在对齐到第 18 层 Residual Stream</p>
            <p>有效控制层位：Layer 14 / 18 / 22</p>
            <p>方向向量相似度：0.84</p>
            <p>人格表达稳定性：91%</p>
            <p>常规能力保持率：96%</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill active>非诊断性认知建模</Pill>
            <Pill>研究级脑表征</Pill>
            <Pill>隐空间对齐</Pill>
          </div>
        </GlowCard>
        </div>
      </div>
    </div>
  );
}
