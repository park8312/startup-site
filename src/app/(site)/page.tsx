import Hero from "@/components/sections/home/Hero";
import CoreTech from "@/components/sections/home/CoreTech";
import CTA from "@/components/sections/home/CTA";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreTech />
      <CTA />
    </>
  );
}
