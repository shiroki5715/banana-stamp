"use client";

import HeroSection from "../components/HeroSection";
import WorkflowGuide from "../components/WorkflowGuide";
import HowToStep from "../components/HowToStep";
import ToolSection from "../components/ToolSection";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkflowGuide />
      <HowToStep />
      <ToolSection />
      <FaqSection />
    </main>
  );
}
