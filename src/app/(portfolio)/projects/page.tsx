import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "A full catalogue of my work — web applications, experiments, and open source contributions.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
