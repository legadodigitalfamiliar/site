import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DemoSection from "@/components/DemoSection";
import PlansSection from "@/components/PlansSection";
import FaqSection from "@/components/FaqSection";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <PlansSection />
        <FaqSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
