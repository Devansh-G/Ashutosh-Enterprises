import CtaSection from "@/components/CtaSection";
import Differentiators from "@/components/Differentiators";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import ProductRange from "@/components/ProductRange";
import SolutionsOverview from "@/components/SolutionsOverview";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsOverview />
      <Differentiators />
      <ProductRange />
      <Industries />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}
