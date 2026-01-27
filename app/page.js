import HeroSection from "../components/HeroSection";
import WorkflowGuide from "../components/WorkflowGuide";
import HowToStep from "../components/HowToStep";
import ToolSection from "../components/ToolSection";
import TemplateSection from "../components/TemplateSection";
import FaqSection from "../components/FaqSection";
import SEOBottom from "../components/SEOBottom";
import AdSense from "../components/AdSense";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkflowGuide />
      <AdSense slot="1932554721" />
      <HowToStep />
      <ToolSection />
      <TemplateSection />
      <FaqSection />
      <SEOBottom />
    </main>
  );
}
