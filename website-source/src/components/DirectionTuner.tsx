import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { avatarProfiles, directionVectorSliders } from "../data/mockData";
import { GlowCard, MetricBar, Pill, SectionTitle } from "./Primitives";

type SliderKey = (typeof directionVectorSliders)[number]["key"];
type Values = Record<SliderKey, number>;
type Level = 0 | 1 | 2 | 3;
type LevelLabel = "低" | "中低" | "中高" | "高";

type OutputVariant = {
  id: number;
  title: string;
  tags: string[];
};

const levelLabels: LevelLabel[] = ["低", "中低", "中高", "高"];

const axisLevelText: Record<SliderKey, [string, string, string, string]> = {
  abstraction: [
    "先别谈宏大路线，把问题压到最小：明天能不能找到一个真实用户，让他为一个具体结果付出时间、数据或预算。",
    "我会从一个可交付场景切入，再把它整理成需求是否尖锐、供给是否可做、交付是否可复用这三层。",
    "这个问题不该停在产品和融资的二选一，而要放到验证阶段、资源约束、增长闭环三层里判断。",
    "我会先看系统是否已经形成可扩张的生成机制；如果机制没闭合，产品和融资只是表层按钮，不是核心答案。"
  ],
  causal: [
    "所以结论可以很直接：先验证产品，融资只保持低频触达。",
    "关键要问清楚，融资到底是在解决现金流、信任背书，还是只是在缓解你对不确定性的焦虑。",
    "融资只有在需求已经被证明时才是放大器，否则它会把一个没验证的问题推成必须增长的任务。",
    "要追到因果底层：需求尖锐度、交付闭环和资本承诺成本三者没有闭合，就不该让融资成为主线。"
  ],
  association: [
    "不要借类比逃离现实，访谈、转化、付费意愿和交付成本四个数字会比想象更诚实。",
    "产品像样机，融资像燃料；样机还没跑通时，燃料越多，噪声也越多。",
    "它更像生物体先稳定代谢系统再扩张生态位，产品是代谢系统，融资是外部资源流。",
    "如果放到更远的尺度，它像文明扩张：内部制度没有稳定，外部资源越充沛，崩溃速度可能越快。"
  ],
  risk: [
    "如果窗口期很明显，可以一边验证一边见少量投资人，不必等所有证据都完美。",
    "风险要被记录，但不要被风险吓停；更好的做法是限制投入规模，用小成本换信号。",
    "我会谨慎很多，因为融资会放大承诺成本，产品验证不足时，资本会把不确定性变成硬目标。",
    "我会先踩刹车，最大的危险不是融不到钱，而是融资叙事替代真实需求，把团队锁进错误增长。"
  ],
  empathy: [
    "先不讨论感受，把注意力放回下一步能做什么。",
    "你可以承认自己需要外部认可，但不要让这种认可需求决定战略顺序。",
    "我感觉你可能在用融资想象换确定感，所以更应该让真实用户反馈替你稳定情绪。",
    "这背后不只是商业判断，还有创始人焦虑；你在选路径，也在寻找别人对愿景的确认，这两件事要分开处理。"
  ],
  evidence: [
    "证据可以轻一点，先用 7 天原型换第一轮信号。",
    "至少做 5 个深访，找到 1 个愿意试用的客户，再判断方向是否成立。",
    "我会要求更硬的证据：10 个深访、3 个强承诺案例，然后再把融资放进下一阶段。",
    "没有付费、复用或明确预算前，不要把故事包装成融资材料，因为那只是把假设讲得更漂亮。"
  ],
  planning: [
    "本周只做一个可演示场景，不要把 90 天路线压到第一周。",
    "用两周跑一个小闭环：访谈、原型、交付、复盘，一个都不要省。",
    "节奏可以更完整：30 天 MVP 验证，60 天案例沉淀，90 天带数据接触种子投资人。",
    "路线要系统化：先验证强痛点，再沉淀可复制交付，最后用数据组织资本叙事。"
  ],
  decisive: [
    "因此先保留两条分支，产品验证为主线，融资沟通为低频支线。",
    "我会暂时倾向先做产品，但保留现金流不足时的小额资源方案。",
    "结论比较明确：先产品验证，融资只做铺垫。",
    "我会直接收敛：除非现金流撑不过一个验证周期，否则不要正式融资。"
  ]
};

const outputSlots: OutputVariant[] = Array.from({ length: 64 }, (_, index) => {
  const families = [
    ["结构验证型", ["结构抽象", "机制追问", "长期规划"]],
    ["风险防御型", ["风险优先", "证据门槛", "承诺成本"]],
    ["增长机会型", ["机会窗口", "快速假设", "市场动作"]],
    ["用户落地型", ["具体经验", "MVP", "用户访谈"]],
    ["远距类比型", ["跨域同构", "生态位", "系统迁移"]],
    ["情绪校准型", ["共情叙事", "创始人状态", "焦虑剥离"]],
    ["证据收敛型", ["数据验证", "客户案例", "严格证据"]],
    ["双轨策略型", ["多分支", "融资铺垫", "产品主线"]]
  ] as const;
  const family = families[index % families.length];
  return {
    id: index + 1,
    title: `${family[0]} #${String(index + 1).padStart(2, "0")}`,
    tags: [...family[1]]
  };
});

const hashWeights: Record<SliderKey, number> = {
  abstraction: 1,
  causal: 3,
  association: 5,
  risk: 7,
  empathy: 11,
  evidence: 13,
  planning: 17,
  decisive: 19
};

function getLevel(value: number): Level {
  if (value < 25) return 0;
  if (value < 50) return 1;
  if (value < 75) return 2;
  return 3;
}

function getLevels(values: Values): Record<SliderKey, Level> {
  return Object.fromEntries(
    directionVectorSliders.map((slider) => [slider.key, getLevel(values[slider.key])])
  ) as Record<SliderKey, Level>;
}

function getVariantIndex(levels: Record<SliderKey, Level>) {
  const index = directionVectorSliders.reduce((sum, slider) => {
    return sum + levels[slider.key] * hashWeights[slider.key];
  }, 0);
  return index % outputSlots.length;
}

function buildAnswer(levels: Record<SliderKey, Level>) {
  const opening =
    levels.decisive === 3
      ? "我的判断很明确，"
      : levels.empathy === 3
        ? "我会先把你的焦虑和战略判断拆开看，"
        : levels.association === 3
          ? "如果把这个问题放到更大的系统里看，"
          : levels.risk === 3
            ? "我会先从风险侧切入，"
            : "";
  const body = [
    axisLevelText.abstraction[levels.abstraction],
    axisLevelText.causal[levels.causal],
    axisLevelText.association[levels.association],
    axisLevelText.risk[levels.risk],
    axisLevelText.empathy[levels.empathy],
    axisLevelText.evidence[levels.evidence],
    axisLevelText.planning[levels.planning],
    axisLevelText.decisive[levels.decisive]
  ].join("");
  return `${opening}${body}`;
}

export function DirectionTuner() {
  const [values, setValues] = useState<Values>(
    Object.fromEntries(directionVectorSliders.map((slider) => [slider.key, slider.value])) as Values
  );

  const levels = useMemo(() => getLevels(values), [values]);
  const currentVariant = useMemo(() => outputSlots[getVariantIndex(levels)], [levels]);
  const currentAnswer = useMemo(() => buildAnswer(levels), [levels]);
  const signature = useMemo(
    () => directionVectorSliders.map((slider) => `${slider.label}:${levelLabels[levels[slider.key]]}`).join(" / "),
    [levels]
  );

  const statusTags = [
    values.abstraction > 75 ? "结构上提" : "经验落点",
    values.causal > 75 ? "机制追问" : "直接建议",
    values.risk > 72 ? "风险优先" : "机会窗口",
    values.association > 75 ? "远距类比" : "近邻推理"
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Direction Vector Tuner"
        title="方向向量无极调参数字化身"
        desc="拖动参数，右侧回答会实时变化。这里展示的是一个可调的认知风格，而不是固定角色。"
      />
      <div className="overflow-x-auto pb-2 thin-scrollbar">
        <div className="grid min-w-[1420px] grid-cols-[360px_320px_700px] gap-5">
          <GlowCard className="p-5">
            <h3 className="mb-4 font-semibold text-white">方向向量调参面板</h3>
            <div className="space-y-5">
              {directionVectorSliders.map((slider) => (
                <div key={slider.key}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{slider.label}</span>
                    <span className="text-cyan-200">
                      {values[slider.key]} · {levelLabels[levels[slider.key]]}
                    </span>
                  </div>
                <motion.input
                  whileTap={{ scale: 1.02 }}
                  className="range w-full"
                    type="range"
                    min={0}
                    max={100}
                    value={values[slider.key]}
                    onChange={(event) => setValues((prev) => ({ ...prev, [slider.key]: Number(event.target.value) }))}
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>{slider.left}</span>
                    <span>{slider.right}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-1 text-[10px] text-slate-500">
                    {["0-24", "25-49", "50-74", "75-100"].map((range, idx) => (
                      <span
                        key={range}
                        className={`rounded-full border px-2 py-1 text-center ${
                          levels[slider.key] === idx
                            ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                            : "border-slate-700/50 bg-slate-950/35"
                        }`}
                      >
                        {range}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="soft-glow p-5">
            <h3 className="mb-4 font-semibold text-white">数字化身预览</h3>
            <div className="float-slow mx-auto mb-5 flex h-36 w-36 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-300/20 to-violet-500/20 shadow-glow">
              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="h-20 w-20 rounded-full bg-slate-950/80 ring-2 ring-cyan-200/50"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">{avatarProfiles[0].name} / {avatarProfiles[0].type}</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300">{avatarProfiles[0].desc}</p>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {statusTags.map((tag) => <Pill key={tag} active>{tag}</Pill>)}
            </div>
            <div className="mt-6 space-y-3">
              {avatarProfiles[0].metrics.map(([label, base]) => (
                <MetricBar key={label} label={label} value={Math.min(98, Math.round(base + values.evidence / 20))} />
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white">输出变化对比</h3>
                <p className="mt-2 text-sm text-slate-400">同一个问题，在不同认知风格下会得到不同建议。</p>
              </div>
              <Pill active>Live Match</Pill>
            </div>

            <p className="mb-4 rounded-xl border border-slate-700/50 bg-slate-950/45 p-4 text-sm text-slate-300">
              问题：我现在要做一个 AI 创业项目，应该先做产品，还是先做融资？
            </p>

            <motion.div
              key={signature}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 rounded-2xl border border-cyan-300/35 bg-cyan-300/12 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-cyan-100">当前匹配：{currentVariant.title}</div>
                <span className="text-xs text-cyan-200">#{currentVariant.id}</span>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {currentVariant.tags.map((tag) => <Pill key={tag} active>{tag}</Pill>)}
              </div>
              <p className="text-base leading-8 text-white">{currentAnswer}</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["方向向量强度", Math.round((values.abstraction + values.causal + values.planning) / 3)],
                ["表达漂移抑制", Math.round((values.evidence + 90) / 2)],
                ["场景迁移度", Math.round((values.association + values.planning) / 2)],
                ["闭合阈值", Math.round((values.causal + values.decisive) / 2)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-950/45 p-3">
                  <div className="text-xs text-slate-400">{label}</div>
                  <div className="mt-1 text-lg font-semibold text-cyan-100">{value}%</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4">
              <div className="mb-3 text-sm font-semibold text-white">当前风格状态</div>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                {directionVectorSliders.map((slider) => (
                  <span key={slider.key} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2 py-1">
                    {slider.label}: {levelLabels[levels[slider.key]]}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
