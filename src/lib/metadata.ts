import type { Metadata } from "next";
import { SEO } from "@/constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export function buildMetadata({
  title,
  description = SEO.description,
  image = SEO.ogImage,
  path = "",
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | Owoyemi Niyi` : SEO.title;
  const url = `${SEO.siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SEO.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SEO.siteName,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: SEO.twitterHandle,
      images: [image],
    },
  };
}
