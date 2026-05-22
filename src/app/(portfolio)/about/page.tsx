import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Learn more about Owoyemi Niyi — Frontend Engineer based in Lagos, Nigeria. My story, values, and what drives me to build.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
