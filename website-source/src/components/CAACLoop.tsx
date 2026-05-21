import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Handshake, Network, RotateCcw, UserRound } from "lucide-react";
import { demoScript, visualAssets } from "../data/mockData";
import { GlowCard, MetricBar, Pill, SectionTitle } from "./Primitives";

type LoopType = "C" | "A" | "Network" | "Action" | "Feedback";

type PropagationNode = {
  id: string;
  title: string;
  subtitle: string;
  type: LoopType;
  x: number;
  y: number;
  stage: "C → A" | "A → A" | "A → C" | "Feedback";
  explanation: string;
  business: string;
};

const nodes: PropagationNode[] = [
  {
    id: "c1",
    title: "真实本人 C1",
    subtitle: "许宇轩 / Cells 创始人",
    type: "C",
    x: 115,
    y: 320,
    stage: "C → A",
    explanation: "真实人提供深度对话、行为样本、人格维度、脑表征信号和可连接身份。",
    business: "把人的认知资产变成可授权、可分发、可持续更新的 Avatar 节点。"
  },
  {
    id: "cells",
    title: "Cells 建模引擎",
    subtitle: "侧写 + 脑表征 + 方向向量",
    type: "Network",
    x: 285,
    y: 205,
    stage: "C → A",
    explanation: "Cells 不是 prompt 包装，而是把人格、思维方式和认知表征映射到可控方向向量。",
    business: "形成万思达平台的底层技术壁垒：稳定、可控、可调的人格模拟。"
  },
  {
    id: "a1",
    title: "A1 结构生成型 Avatar",
    subtitle: "携带人格向量与专业标签",
    type: "A",
    x: 460,
    y: 320,
    stage: "C → A",
    explanation: "A1 是 C1 的数字化身，能独立参与问题讨论，并保持稳定的思维偏向。",
    business: "让真实人的判断力在本人不在线时也能进入协作和匹配。"
  },
  {
    id: "network",
    title: "Wanstar 认知网络",
    subtitle: "Avatar 关系图谱与权限路由",
    type: "Network",
    x: 620,
    y: 205,
    stage: "A → A",
    explanation: "平台根据问题需求、人格互补度、专业能力和连接权限组织 Avatar 网络。",
    business: "从单个智能体升级为可规模化的认知连接市场。"
  },
  {
    id: "c2",
    title: "真实用户 C2",
    subtitle: "创业者提出现实问题",
    type: "C",
    x: 620,
    y: 470,
    stage: "A → A",
    explanation: "C2 输入真实问题：AI 创业应该先做产品还是先融资。",
    business: "需求入口来自现实人，平台用 Avatar 网络降低高质量建议的获取成本。"
  },
  {
    id: "a2",
    title: "A2 产品经理型",
    subtitle: "MVP / 用户访谈 / 需求验证",
    type: "A",
    x: 805,
    y: 140,
    stage: "A → A",
    explanation: "A2 补足落地节奏，把宏大愿景压缩为可验证产品。",
    business: "让不同人的经验先通过 Avatar 低成本参与协作。"
  },
  {
    id: "a3",
    title: "A3 风险投资型",
    subtitle: "融资节奏 / 下行保护",
    type: "A",
    x: 850,
    y: 320,
    stage: "A → A",
    explanation: "A3 评估融资承诺成本和商业模式风险，防止过早资本化。",
    business: "把专家判断包装为可匹配、可复用的认知节点。"
  },
  {
    id: "a4",
    title: "A4 心理洞察型",
    subtitle: "创始人状态 / 决策动机",
    type: "A",
    x: 805,
    y: 500,
    stage: "A → A",
    explanation: "A4 识别创始人的外部认可焦虑和决策背后的情绪压力。",
    business: "提高建议质量，不只解决信息缺口，也解决状态和关系问题。"
  },
  {
    id: "synthesis",
    title: "综合建议生成",
    subtitle: "30 天 MVP → 3 个客户案例 → 种子投资人",
    type: "Action",
    x: 1040,
    y: 320,
    stage: "A → C",
    explanation: "多 Avatar 先完成 A → A 圆桌协作，输出可执行建议和证据链。",
    business: "平台在真人连接前先完成认知预处理，提高后续连接效率。"
  },
  {
    id: "owner",
    title: "连接 A1 背后真人",
    subtitle: "咨询 / 合作 / 交易 / 共创",
    type: "C",
    x: 1240,
    y: 205,
    stage: "A → C",
    explanation: "当 C2 认可 A1 的建议价值，就可以请求连接 A1 背后的真实本人 C1。",
    business: "这是商业闭环的关键：Avatar 不是终点，而是人与人高价值连接的前置筛选器。"
  },
  {
    id: "feedback",
    title: "真实反馈回流",
    subtitle: "结果、评价、合作数据继续训练 Avatar",
    type: "Feedback",
    x: 1240,
    y: 470,
    stage: "Feedback",
    explanation: "真实咨询、合作、交易和共创的反馈会反哺 Avatar 的人格包、能力标签和方向向量。",
    business: "闭环越跑越准：真实交互让 Avatar 网络持续增值。"
  }
];

const edges = [
  ["c1", "cells"],
  ["cells", "a1"],
  ["a1", "network"],
  ["c2", "network"],
  ["network", "a2"],
  ["network", "a3"],
  ["network", "a4"],
  ["a1", "synthesis"],
  ["a2", "synthesis"],
  ["a3", "synthesis"],
  ["a4", "synthesis"],
  ["synthesis", "owner"],
  ["owner", "feedback"],
  ["feedback", "a1"],
  ["feedback", "network"]
] as const;

const stageCards = [
  {
    step: "01",
    title: "C → A",
    text: "真实人通过 Cells 生成稳定、可控、可调的数字化身。"
  },
  {
    step: "02",
    title: "A → A",
    text: "多个 Avatar 根据问题需求和互补度先完成认知协作。"
  },
  {
    step: "03",
    title: "A → C",
    text: "高价值建议触发真人连接，进入咨询、合作、交易或共创。"
  },
  {
    step: "04",
    title: "Feedback",
    text: "真实交互结果反哺 Avatar，形成持续增值的认知网络。"
  }
];

const typeStyle: Record<LoopType, string> = {
  C: "border-emerald-300/45 bg-emerald-300/12 text-emerald-50",
  A: "border-cyan-300/45 bg-cyan-300/12 text-cyan-50",
  Network: "border-violet-300/45 bg-violet-300/12 text-violet-50",
  Action: "border-amber-300/45 bg-amber-300/12 text-amber-50",
  Feedback: "border-blue-300/45 bg-blue-300/12 text-blue-50"
};

const iconByType = {
  C: UserRound,
  A: BrainCircuit,
  Network,
  Action: Handshake,
  Feedback: RotateCcw
};

export function CAACLoop() {
  const [activeId, setActiveId] = useState("synthesis");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), []);

  return (
    <div>
      <SectionTitle
        eyebrow="C → A → A → C Loop"
        title="用数字化身重组人与人的连接方式"
        desc="真实人生成数字化身，数字化身先协作，最后把高价值关系带回真实人。"
      />

      <div className="mb-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stageCards.map((card, index) => (
          <GlowCard key={card.title} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300">Step {card.step}</span>
              {index < stageCards.length - 1 && <ArrowRight className="text-slate-500" size={17} />}
            </div>
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
          </GlowCard>
        ))}
      </div>

      <GlowCard className="mb-5 overflow-hidden p-0">
        <div className="grid lg:grid-cols-[420px_1fr]">
          <div className="relative min-h-56">
            <img src={visualAssets.humanConnection} alt="真实人与真实人连接" className="h-full w-full object-cover opacity-78" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/30 to-slate-950" />
          </div>
          <div className="p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Human Layer</div>
            <h3 className="text-xl font-semibold text-white">数字化身的终点不是替代人，而是更好地连接人</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              数字化身先承担低成本试探和协作。当建议被证明有价值，平台再把背后的真实本人连接出来，进入咨询、合作、交易和共创。
            </p>
          </div>
        </div>
      </GlowCard>

      <div className="grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
        <GlowCard className="overflow-hidden p-0">
          <div className="flex flex-col gap-3 border-b border-slate-700/45 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-white">Wanstar 智能体传播链</h3>
              <p className="mt-1 text-sm text-slate-400">蓝色是 Avatar，绿色是真实人，紫色是网络路由，黄色是商业动作，回流线代表反馈反哺。</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill active>真实人 C</Pill>
              <Pill active>数字化身 A</Pill>
              <Pill active>网络协作</Pill>
              <Pill active>反馈回流</Pill>
            </div>
          </div>

          <div className="relative overflow-auto bg-slate-950/35 p-5 thin-scrollbar">
            <div className="relative h-[660px] min-w-[1380px] rounded-3xl border border-slate-700/40 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,.14),transparent_34%),linear-gradient(rgba(96,165,250,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.04)_1px,transparent_1px)] bg-[length:auto,44px_44px,44px_44px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1380 660" fill="none">
                <defs>
                  <marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <path d="M0 0L9 4.5L0 9Z" fill="rgba(103,232,249,.75)" />
                  </marker>
                  <marker id="arrowFeedback" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <path d="M0 0L9 4.5L0 9Z" fill="rgba(96,165,250,.75)" />
                  </marker>
                </defs>
                {edges.map(([fromId, toId]) => {
                  const from = nodeMap.get(fromId)!;
                  const to = nodeMap.get(toId)!;
                  const isFeedback = from.type === "Feedback" || to.type === "Feedback";
                  const highlighted = active.id === fromId || active.id === toId;
                  return (
                    <line
                      key={`${fromId}-${toId}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isFeedback ? "rgba(96,165,250,.65)" : highlighted ? "rgba(103,232,249,.95)" : "rgba(96,165,250,.34)"}
                      strokeWidth={highlighted ? 3 : 2}
                      className={isFeedback || highlighted ? "trace-dash" : undefined}
                      strokeDasharray={isFeedback ? "8 8" : highlighted ? "10 8" : undefined}
                      markerEnd={isFeedback ? "url(#arrowFeedback)" : "url(#arrow)"}
                    />
                  );
                })}
              </svg>

              <div className="absolute left-[560px] top-[270px] h-28 w-28 rounded-full border border-cyan-300/30 bg-cyan-300/10 blur-md" />

              {nodes.map((node) => {
                const selected = active.id === node.id;
                const Icon = iconByType[node.type];
                return (
                  <motion.button
                    key={node.id}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveId(node.id)}
                    className={`absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 text-left shadow-lg backdrop-blur-md transition ${
                      selected ? `${typeStyle[node.type]} shadow-glow scale-[1.04]` : "border-slate-700/65 bg-slate-950/78 text-slate-300 hover:border-cyan-300/50"
                    }`}
                    style={{ left: node.x, top: node.y }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${typeStyle[node.type]}`}>
                        <Icon size={16} />
                      </span>
                      <span className="text-[11px] text-cyan-200">{node.stage}</span>
                    </div>
                    <div className="text-sm font-semibold text-white">{node.title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-400">{node.subtitle}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </GlowCard>

        <div>
          <GlowCard className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Selected Link Node</div>
              <Pill active>{active.stage}</Pill>
            </div>
            <h3 className="text-xl font-semibold text-white">{active.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{active.subtitle}</p>
            <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <div className="mb-2 text-sm font-semibold text-cyan-100">它在闭环里做什么</div>
              <p className="text-sm leading-7 text-slate-200">{active.explanation}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
              <div className="mb-2 text-sm font-semibold text-violet-100">商业意义</div>
              <p className="text-sm leading-7 text-slate-200">{active.business}</p>
            </div>
            <div className="mt-5 space-y-4">
              <MetricBar label="连接价值密度" value={active.type === "Action" ? 93 : active.type === "C" ? 86 : 81} />
              <MetricBar label="协作可解释性" value={active.stage === "A → A" ? 91 : 84} />
              <MetricBar label="反馈反哺潜力" value={active.type === "Feedback" ? 96 : 78} />
            </div>
          </GlowCard>
        </div>
      </div>

      <GlowCard className="mt-5 p-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-semibold text-white">流程解释</h3>
            <p className="mt-1 text-sm text-slate-400">横向阅读完整闭环：从真实人，到数字化身协作，再回到真实连接。</p>
          </div>
          <Pill active>C → A → A → C</Pill>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {demoScript.map((step, idx) => (
            <button
              key={step}
              onClick={() => setActiveId(nodes[Math.min(idx + 1, nodes.length - 1)].id)}
              className="flow-sheen flex gap-3 rounded-xl border border-slate-700/50 bg-slate-950/45 p-3 text-left hover:border-cyan-300/45"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-300/15 text-xs text-violet-100">{idx + 1}</span>
              <p className="text-sm leading-6 text-slate-300">{step}</p>
            </button>
          ))}
        </div>
      </GlowCard>
    </div>
  );
}
