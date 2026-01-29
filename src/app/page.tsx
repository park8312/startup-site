import Hero from "@/components/sections/home/Hero";
import CoreTech from "@/components/sections/home/CoreTech";
import TherapyLoopSection from "@/components/sections/home/TherapyLoopSection";
import Evidence from "@/components/sections/home/Evidence";
import CTA from "@/components/sections/home/CTA";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreTech />
      <TherapyLoopSection />
      <Evidence />
      <CTA />
    </>
  );
}
