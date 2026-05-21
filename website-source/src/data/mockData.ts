import {
  Brain,
  CircuitBoard,
  GitBranch,
  Network,
  Radar,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

export const navItems = [
  { id: "home", label: "战略总览", icon: Sparkles },
  { id: "profiling", label: "人格工作台", icon: Radar },
  { id: "brain", label: "脑表征建模", icon: Brain },
  { id: "tuner", label: "方向向量调参", icon: SlidersHorizontal },
  { id: "network", label: "认知互联网络", icon: Network },
  { id: "loop", label: "C-A-A-C 闭环", icon: GitBranch }
] as const;

export type SectionId = (typeof navItems)[number]["id"];

export const visualAssets = {
  heroHuman:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  profilingPortrait:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  collaboration:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  warmWorkspace:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  humanConnection:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
};

export const heroLayers = [
  {
    title: "Cells 构建数字化身",
    items: ["对话侧写", "人格建模", "思维方式建模", "脑表征建模", "方向向量控制"]
  },
  {
    title: "Wanstar 连接数字化身",
    items: ["场景识别", "问题拆解", "互补人格匹配", "多 Avatar 协作"]
  },
  {
    title: "C → A → A → C 闭环",
    items: ["人生成 Avatar", "Avatar 连接 Avatar", "Avatar 反向连接真人", "认知协作网络"]
  }
];

export const homeFlow = [
  { label: "真实用户 C", text: "真实的人带着经验、价值观、知识结构和未显性化的判断方式进入系统。" },
  { label: "Cells 人格模拟引擎", text: "把对话、人格维度、脑表征和方向向量合成为可控的认知建模中间层。" },
  { label: "个人数字化身 A", text: "数字化身不是固定角色，而是具有稳定人格和可调认知风格的连续体。" },
  { label: "Avatar 认知互联网络", text: "不同数字化身按照问题、互补度和权限进入协作网络。" },
  { label: "互补数字化身协作", text: "在连接真人之前，先由数字化身完成低成本、高密度的认知协作。" },
  { label: "连接真实本人 C", text: "当建议被验证有价值，平台把 Avatar 背后的真实人连接出来。" }
];

export const profilingQuestions = [
  "当你面对一个复杂问题时，你通常会先寻找结构、先找经验案例，还是先判断风险？",
  "当你和观点不同的人合作时，你更倾向于说服、整合、观察，还是重新定义问题？",
  "你做决策时更依赖长期目标、当下反馈、系统稳定性，还是直觉判断？",
  "当一个方案短期有效但长期会改变组织边界时，你会如何判断它是否值得做？"
];

export const dialogueSamples = [
  {
    q: profilingQuestions[0],
    a: "我会先判断这个问题背后是否存在一个更底层的结构。如果只是表面问题，我通常不急着解决，而是先找它的生成机制。"
  },
  {
    q: profilingQuestions[1],
    a: "我不会急着说服对方。我会先看我们是不是在讨论同一个问题，如果不是，我会重新定义问题边界。"
  },
  {
    q: profilingQuestions[2],
    a: "我更依赖长期目标和系统稳定性。短期反馈很重要，但它只能校正路径，不能替代底层方向。"
  },
  {
    q: profilingQuestions[3],
    a: "我会把短期收益和长期结构损耗分开计算。如果方案会破坏核心技术内核，我宁愿慢一点。"
  }
];

export const dataPipeline = [
  "Raw Dialogue",
  "Profiling Tags",
  "Cognitive Features",
  "Contrastive Dataset",
  "Persona Pack",
  "Direction Vector Seed"
];

export const selfAvatarMessages = [
  {
    role: "user",
    text: "我现在感觉 Wanstar 的叙事很大，但担心投资人会觉得它离商业化太远。你会怎么拆？"
  },
  {
    role: "avatar",
    text: "先不要把问题拆成“宏大叙事 vs 商业化”二选一。真正要证明的是：人格模拟能否降低高价值人与人连接的发现成本。Demo 应该先展示一个具体场景，比如创业决策，再让 C-A-A-C 闭环自然出现。"
  },
  {
    role: "user",
    text: "那我应该优先讲 Cells 技术，还是先讲 Wanstar 网络？"
  },
  {
    role: "avatar",
    text: "先讲 Wanstar 的连接结果，再回到 Cells 的技术原因。投资人先理解网络价值，才会愿意听为什么方向向量、脑表征和人格建模是必要基础。"
  }
];

export const personaDimensions = [
  { dimension: "结构抽象倾向", value: 92 },
  { dimension: "风险敏感度", value: 74 },
  { dimension: "机制追问强度", value: 90 },
  { dimension: "远距联想能力", value: 78 },
  { dimension: "情绪共情强度", value: 66 },
  { dimension: "证据门槛", value: 82 },
  { dimension: "系统规划能力", value: 88 },
  { dimension: "决策果断度", value: 72 }
];

export const cognitiveTags = [
  "先找结构",
  "追问为什么",
  "跨学科类比",
  "不满足表层答案",
  "关注长期演化",
  "偏好构建系统",
  "以生成机制理解对象",
  "从目标倒推必要条件"
];

export const brainRegions = [
  { id: "pfc", name: "前额叶控制区", x: 24, y: 34, strength: 88, desc: "参与任务控制、策略切换和长期目标约束，用于估计 Avatar 的规划稳定性。" },
  { id: "dmn", name: "默认模式网络", x: 42, y: 22, strength: 76, desc: "映射自我叙事、价值判断和远距联想的背景活动。" },
  { id: "semantic", name: "语义联想区", x: 66, y: 38, strength: 82, desc: "用于刻画跨域类比、概念迁移和语义展开半径。" },
  { id: "emotion", name: "情绪调节区", x: 58, y: 64, strength: 70, desc: "非诊断性建模情绪调节方式，辅助共情叙事与风险表达控制。" },
  { id: "attention", name: "注意力网络", x: 36, y: 62, strength: 79, desc: "估计问题聚焦、干扰抑制和多线任务切换能力。" },
  { id: "memory", name: "记忆整合区", x: 75, y: 55, strength: 73, desc: "用于把经验案例、长期记忆和当前问题连接为可检索表征。" },
  { id: "decision", name: "决策评估区", x: 22, y: 58, strength: 84, desc: "映射收益、风险、约束和行动闭合阈值的综合评估过程。" }
];

export const representationVectors = [
  { name: "Association Vector", cn: "联想展开向量", value: 78 },
  { name: "Causal Vector", cn: "因果追问向量", value: 90 },
  { name: "Abstraction Vector", cn: "抽象迁移向量", value: 92 },
  { name: "Empathy Vector", cn: "共情叙事向量", value: 66 },
  { name: "Risk Vector", cn: "风险规避向量", value: 74 },
  { name: "Planning Vector", cn: "长期规划向量", value: 88 }
];

export const directionVectorSliders = [
  { key: "abstraction", label: "结构抽象度", left: "具体经验", right: "抽象结构", value: 86 },
  { key: "causal", label: "因果追问强度", left: "直接回答", right: "追问生成机制", value: 88 },
  { key: "association", label: "联想发散距离", left: "近邻联想", right: "远距同构迁移", value: 72 },
  { key: "risk", label: "风险敏感度", left: "机会优先", right: "风险优先", value: 64 },
  { key: "empathy", label: "共情叙事强度", left: "理性分析", right: "情绪理解", value: 48 },
  { key: "evidence", label: "证据门槛", left: "快速假设", right: "严格证据", value: 76 },
  { key: "planning", label: "系统规划强度", left: "局部解决", right: "长期系统设计", value: 84 },
  { key: "decisive", label: "决策果断度", left: "保留多分支", right: "快速收敛", value: 58 }
] as const;

export const avatarProfiles = [
  {
    name: "Yuxuan-X",
    type: "结构生成型 Avatar",
    desc: "偏向结构抽象、机制追问、跨域同构迁移的数字化身。",
    metrics: [
      ["人格稳定性", 91],
      ["思维相似度", 88],
      ["表达一致性", 86],
      ["可控性", 93],
      ["场景迁移度", 84]
    ] as [string, number][]
  }
];

export const outputStyles = {
  structure:
    "这个问题不能先拆成产品和融资的二选一，而要先判断你当前项目处于哪一种验证阶段。真正的问题是：你是否已经证明了一个足够尖锐的需求，以及你是否有能力用最小系统验证这个需求。",
  risk:
    "不要急着融资。融资会放大你的承诺成本。如果现在产品验证不足，融资反而会把你推入错误路径。你应该先验证最小可交付场景，再决定是否接受资本约束。",
  association:
    "这有点像生物体先形成稳定代谢系统，再扩张生态位。产品是代谢系统，融资是生态资源。如果内部代谢还不稳定，外部资源越多，系统崩得越快。",
  empathy:
    "你可能不是在产品和融资之间摇摆，而是在寻找外部确认。先把焦虑从战略判断里剥离出来：用 30 天做一个真实用户闭环，让事实替你稳定情绪。",
  balanced:
    "建议先做 30 天 MVP 验证：锁定 10 个强痛点用户、完成 3 个可复述案例、记录转化阻力。融资可以同步铺垫，但不要让融资节奏替代产品验证。"
};

export const scenarioTemplates = [
  {
    id: "startup",
    label: "创业决策",
    prompt: "我想做 AI 创业，但不知道该先找投资人还是先打磨产品。",
    abilities: ["战略判断", "风险控制", "产品验证", "资源整合", "长期规划", "反脆弱决策"],
    gaps: ["过度抽象，缺少落地节奏", "长期愿景强，但短期验证路径不足", "创造力强，但风险控制需要补足"]
  },
  {
    id: "career",
    label: "职业选择",
    prompt: "我该继续留在大厂，还是进入一个高风险早期项目？",
    abilities: ["机会成本评估", "能力资产盘点", "风险承受力", "行业趋势判断"],
    gaps: ["容易被长期叙事吸引", "需要把能力成长和现金流安全分开判断"]
  },
  {
    id: "learning",
    label: "学习规划",
    prompt: "我想系统学习 AI，但不知道该从模型、产品还是应用开始。",
    abilities: ["知识结构规划", "反馈路径设计", "项目制学习", "阶段性验证"],
    gaps: ["目标过大，缺少可验收节点", "容易沉迷理论而延迟输出"]
  },
  {
    id: "relationship",
    label: "情感关系",
    prompt: "我和亲密关系对象沟通总是错位，应该继续磨合还是拉开距离？",
    abilities: ["情绪识别", "边界表达", "长期互动证据", "冲突复盘"],
    gaps: ["容易从结构判断替代情绪表达", "需要降低对暗示型沟通的成本"]
  },
  {
    id: "care",
    label: "医养照护",
    prompt: "家里老人需要长期照护，我该怎么组织家庭、医疗和时间资源？",
    abilities: ["照护流程", "风险预案", "家庭协商", "资源配置"],
    gaps: ["需要把情绪压力转成可执行安排", "需要持续反馈机制"]
  },
  {
    id: "investment",
    label: "投资判断",
    prompt: "我看到一个 AI 项目机会，应该投资源还是保持观望？",
    abilities: ["商业模式识别", "技术壁垒判断", "下行风险", "退出路径"],
    gaps: ["需要避免被技术叙事过度吸引", "要用证据校准估值想象"]
  },
  {
    id: "team",
    label: "团队管理",
    prompt: "我的团队执行力不稳定，应该换人、调目标还是改机制？",
    abilities: ["组织诊断", "责任边界", "激励机制", "冲突处理"],
    gaps: ["需要把人品判断和机制缺陷分开", "需要建立低成本复盘节奏"]
  },
  {
    id: "creation",
    label: "创意共创",
    prompt: "我有一个新产品概念，想找到能互补的人一起把它打磨出来。",
    abilities: ["概念重构", "用户叙事", "原型验证", "伙伴匹配"],
    gaps: ["需要从概念美感进入用户价值", "需要外部视角打破自洽"]
  }
];

export const avatarMatches = [
  {
    name: "Lin-MVP",
    title: "冷启动产品经理型",
    owner: "连续创业者本人数字化身",
    tags: ["MVP", "需求验证", "用户访谈"],
    thinking: ["落地节奏", "小样本验证", "场景拆解"],
    complement: "帮助你从宏大愿景落到第一个可验证产品",
    match: 94,
    advice: "先不要做完整平台。定义一个强痛点人群，用 7 天做出可交付结果，验证他们是否愿意为结果付费。"
  },
  {
    name: "Qiao-Risk",
    title: "风险控制型投资人",
    owner: "早期基金合伙人数字化身",
    tags: ["商业模式", "融资节奏", "财务风险"],
    thinking: ["下行保护", "承诺成本", "资本路径"],
    complement: "防止过早融资或错误融资",
    match: 89,
    advice: "融资不是越早越好。你需要先证明一个窄场景的需求强度，否则资本会把你推向过早扩张。"
  },
  {
    name: "Ming-Growth",
    title: "增长型创业者",
    owner: "B2B 增长负责人数字化身",
    tags: ["市场冷启动", "渠道验证", "销售闭环"],
    thinking: ["转化路径", "渠道成本", "成交反馈"],
    complement: "帮助你把技术叙事转化成市场动作",
    match: 86,
    advice: "找 10 个强痛点用户，先用人工交付做闭环。不要把增长问题藏在产品复杂度里。"
  },
  {
    name: "An-Insight",
    title: "心理洞察型顾问",
    owner: "组织心理顾问数字化身",
    tags: ["团队沟通", "创始人状态", "关系决策"],
    thinking: ["动机识别", "压力复盘", "边界表达"],
    complement: "帮助你识别决策背后的情绪和动机",
    match: 82,
    advice: "你现在可能被宏大愿景牵引，也被外部认可焦虑推动。先压缩目标，让事实重新给你稳定感。"
  }
];

export const interconnectionColumns = {
  left: [
    { title: "用户问题 C2", lines: ["AI 创业路径判断", "产品验证不足", "融资窗口不确定"] },
    { title: "问题需求向量", lines: ["战略判断", "MVP 验证", "风险控制", "创始人状态"] }
  ],
  center: [
    { title: "互补收敛区 1", lines: ["产品验证 × 风险约束", "最小用户群优先", "融资承诺成本评估"], overlap: 86, friction: "中摩擦" },
    { title: "互补收敛区 2", lines: ["增长路径 × 技术叙事", "10 个强痛点用户", "渠道反馈闭环"], overlap: 81, friction: "低摩擦" },
    { title: "互补收敛区 3", lines: ["长期愿景 × 短期节奏", "30 天 MVP", "3 个真实客户案例"], overlap: 88, friction: "高价值" },
    { title: "互补收敛区 4", lines: ["情绪动机 × 行动闭合", "外部认可焦虑", "目标压缩为单闭环"], overlap: 74, friction: "需校准" }
  ],
  right: [
    { title: "A1 结构生成型", lines: ["抽象上提", "机制追问", "长期系统设计"] },
    { title: "A2 产品经理型", lines: ["MVP", "用户访谈", "需求验证"] },
    { title: "A3 风险投资型", lines: ["融资节奏", "下行保护", "商业模式"] },
    { title: "A4 心理洞察型", lines: ["压力识别", "边界表达", "状态复盘"] }
  ]
};

export const relationTools = [
  { title: "人格互补视图", desc: "查看不同 Avatar 的人格偏向如何互补" },
  { title: "认知冲突分析", desc: "识别高价值摩擦与需要校准的判断点" },
  { title: "能力缺口映射", desc: "把用户问题拆成能力需求和短板" },
  { title: "连接路径生成", desc: "从 Avatar 建议路由到真实本人连接" }
];

export const roundtableMessages = [
  ["Lin-MVP", "先判断你有没有明确的最小用户群。如果没有，融资只是把不确定性资本化。"],
  ["Qiao-Risk", "我同意，但还要看你当前现金流。如果你连 3 个月验证周期都没有，应该先拿小额资源，而不是正式融资。"],
  ["Ming-Growth", "从增长角度看，你现在最该做的是找到 10 个强痛点用户，而不是做完整平台。"],
  ["An-Insight", "我会补充一点，你现在可能被宏大愿景牵引，忽略了心理上的验证焦虑。先把目标压缩到一个可完成的闭环。"]
] as [string, string][];

export const caacLoopNodes = [
  { id: "c1", title: "真实用户 C1", text: "许宇轩：Cells 项目创始人。真实人提供价值观、经验、决策样本和可连接身份。" },
  { id: "a1", title: "生成数字化身 A1", text: "结构生成型 Avatar，携带人格向量、思维向量和表达稳定性。" },
  { id: "network", title: "进入 Wanstar 网络", text: "A1 带着专业标签、人格权限和可连接规则进入认知网络。" },
  { id: "c2", title: "用户 C2 遇到问题", text: "一个创业者正在寻找 AI 产品方向，需要战略、产品、风险和心理支持。" },
  { id: "match", title: "系统匹配 Avatars", text: "根据问题需求、能力缺口和认知互补度匹配 A1 与其他数字化身。" },
  { id: "collab", title: "A → A 协作", text: "数字化身之间先完成低成本认知协作，形成可解释的综合建议。" },
  { id: "request", title: "请求连接本人", text: "C2 认为 A1 建议有价值，申请连接 A1 背后的真实本人。" },
  { id: "connect", title: "平台完成 A → C", text: "进入咨询、合作、社交、交易或共创，数字化身成为人与人的认知桥梁。" },
  { id: "feedback", title: "真实反馈反哺", text: "真实交互结果继续优化 Avatar，让闭环越跑越准。" }
];

export const demoScript = [
  "用户进入 Cells 人格模拟工作台，通过深度对话生成侧写数据。",
  "系统将对话数据转化为人格维度、思维方式维度和正负样本对。",
  "系统融合脑区信号和大脑表征建模，得到更底层的认知表征。",
  "Cells 从这些数据中提取方向向量，构建可调参数字化身。",
  "用户在万思达中提出现实问题，平台自动匹配互补型数字化身。",
  "多个数字化身先进行 A → A 认知协作。",
  "用户认可某个数字化身的价值，进一步连接其背后的真实本人。",
  "真实连接产生反馈，再反哺数字化身，形成 C → A → A → C 闭环。"
];
