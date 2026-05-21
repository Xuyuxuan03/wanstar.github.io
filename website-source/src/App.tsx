import { useState } from "react";
import { SectionId } from "./data/mockData";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { ProfilingWorkbench } from "./components/ProfilingWorkbench";
import { BrainModel } from "./components/BrainModel";
import { DirectionTuner } from "./components/DirectionTuner";
import { CognitiveNetwork } from "./components/CognitiveNetwork";
import { CAACLoop } from "./components/CAACLoop";

export default function App() {
  const initialSection = (() => {
    const section = new URLSearchParams(window.location.search).get("section");
    return ["home", "profiling", "brain", "tuner", "network", "loop"].includes(section ?? "")
      ? (section as SectionId)
      : "home";
  })();
  const [active, setActive] = useState<SectionId>(initialSection);

  return (
    <Layout active={active} onChange={setActive}>
      {active === "home" && <Home onNavigate={setActive} />}
      {active === "profiling" && <ProfilingWorkbench />}
      {active === "brain" && <BrainModel />}
      {active === "tuner" && <DirectionTuner />}
      {active === "network" && <CognitiveNetwork />}
      {active === "loop" && <CAACLoop />}
    </Layout>
  );
}
