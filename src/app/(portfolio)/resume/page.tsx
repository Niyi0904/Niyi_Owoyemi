import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ResumePageClient } from "./ResumePageClient";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: "View and download the resume of Owoyemi Niyi, Frontend Engineer based in Lagos, Nigeria.",
  path: "/resume",
});

export default function ResumePage() {
  return <ResumePageClient />;
}
