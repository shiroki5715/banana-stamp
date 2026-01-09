"use client";

import HeroSection from "../components/HeroSection";
import HowToStep from "../components/HowToStep";
import ToolSection from "../components/ToolSection";
import TemplateSection from "../components/TemplateSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowToStep />
      <ToolSection />
      <TemplateSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
