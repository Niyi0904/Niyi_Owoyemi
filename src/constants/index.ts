import type { NavItem, SocialLinks } from "@/types";

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Projects",   href: "/projects" },
  { label: "Skills",     href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact",    href: "/contact" },
  { label: "Resume",     href: "/resume" },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLinks = {
  github:   "https://github.com/Niyi0904",
  linkedin: "https://linkedin.com/in/owoyeminiyi",
  twitter:  "https://x.com/nidav_dhev",
  email:    "owoyeminiyi2@gmail.com",
};

// ─── SEO defaults ─────────────────────────────────────────────────────────────
export const SEO = {
  siteName:    "Owoyemi Niyi | Frontend Engineer",
  siteUrl:     "https://niyi-owoyemi.vercel.app",
  title:       "Owoyemi Niyi | Frontend Engineer",
  description: "Frontend Engineer specialising in Next.js, TypeScript, and Firebase. Building fast, accessible, and beautiful web experiences. Based in Lagos, Nigeria.",
  twitterHandle: "@nidav_dhev",
  ogImage:     "/og-image.png",
};

// ─── Availability ─────────────────────────────────────────────────────────────
export const AVAILABILITY = {
  available:   { label: "Available for work",        color: "text-green-500",  dot: "bg-green-500"  },
  open:        { label: "Open to opportunities",     color: "text-yellow-500", dot: "bg-yellow-500" },
  unavailable: { label: "Currently unavailable",     color: "text-red-500",    dot: "bg-red-500"    },
};

// ─── Skill categories ─────────────────────────────────────────────────────────
export const SKILL_CATEGORIES = [
  { key: "all",      label: "All"       },
  { key: "frontend", label: "Frontend"  },
  { key: "backend",  label: "Backend"   },
  { key: "database", label: "Database"  },
  { key: "tools",    label: "Tools"     },
  { key: "design",   label: "Design"    },
] as const;
