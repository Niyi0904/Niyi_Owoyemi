import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SkillsPageClient } from "./SkillsPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Skills",
  description: "Technologies, tools, and frameworks I work with every day as a Frontend Engineer.",
  path: "/skills",
});

export default function SkillsPage() {
  return <SkillsPageClient />;
}
