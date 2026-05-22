import type { MetadataRoute } from "next";
import { SEO } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl;

  const staticPages = [
    { url: base,              priority: 1.0,  changeFrequency: "monthly" as const },
    { url: `${base}/about`,      priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${base}/projects`,   priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: `${base}/skills`,     priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${base}/experience`, priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${base}/blog`,       priority: 0.7,  changeFrequency: "weekly"  as const },
    { url: `${base}/contact`,    priority: 0.7,  changeFrequency: "yearly"  as const },
    { url: `${base}/resume`,     priority: 0.7,  changeFrequency: "monthly" as const },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
