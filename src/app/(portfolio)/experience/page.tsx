import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: "My professional journey — roles, freelance projects, and the work that shaped me as an engineer.",
  path: "/experience",
});

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
