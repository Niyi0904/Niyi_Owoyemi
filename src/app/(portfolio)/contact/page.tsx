import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Owoyemi Niyi. Let's discuss your next project, opportunity, or idea.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
