import Header from "@/components/Header";
import ParallaxHome from "@/components/parallax/ParallaxHome";
import PlansSection from "@/components/PlansSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ParallaxHome />
        <PlansSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
