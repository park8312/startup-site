import ProductHero from "@/components/product/ProductHero";
import ProductProblem from "@/components/product/ProductProblem";
import ProductSolution from "@/components/product/ProductSolution";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductScreens from "@/components/product/ProductScreens";
import ProductHowItWorks from "@/components/product/ProductHowItWorks";
import ProductDemo from "@/components/product/ProductDemo";
import ProductCTA from "@/components/product/ProductCTA";

export const metadata = {
  title: "Product",
  description: "ACESO product overview",
};

export default function ProductPage() {
  return (
    <main className="min-h-dvh">
      <ProductHero />
      <ProductProblem />
      <ProductSolution />
      <ProductFeatures />
      <ProductScreens />
      <ProductHowItWorks />
      <ProductDemo />
      <ProductCTA />
    </main>
  );
}
