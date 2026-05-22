import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsPreview />
      <TestimonialsSection />
    </>
  );
}
