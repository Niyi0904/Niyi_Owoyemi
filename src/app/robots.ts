import type { MetadataRoute } from "next";
import { SEO } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  };
}
