import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Thoughts on frontend engineering, web performance, and the craft of building for the web.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogPageClient />;
}
