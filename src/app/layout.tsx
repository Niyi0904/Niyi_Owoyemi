import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryProvider } from "@/context/QueryProvider";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { SEO } from "@/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: "%s | Owoyemi Niyi",
  },
  description: SEO.description,
  metadataBase: new URL(SEO.siteUrl),
  authors: [{ name: "Owoyemi Niyi", url: SEO.siteUrl }],
  creator: "Owoyemi Niyi",
  keywords: [
    "Frontend Engineer", "Next.js", "React", "TypeScript", "Firebase",
    "Tailwind CSS", "Lagos", "Nigeria", "Web Developer", "Owoyemi Niyi",
  ],
  openGraph: {
    type: "website",
    url: SEO.siteUrl,
    title: SEO.title,
    description: SEO.description,
    siteName: SEO.siteName,
    images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: SEO.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    creator: SEO.twitterHandle,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdminAuthProvider>
          <ThemeProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </ThemeProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
