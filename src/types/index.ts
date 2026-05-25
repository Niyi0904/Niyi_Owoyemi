// ─── Project ──────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
  images?: string[];
  liveUrl: string;
  githubUrl: string;
  status: "live" | "archived" | "wip";
  order?: number;
  createdAt?: string;
}

// ─── Skill ────────────────────────────────────────────────────────────────────
export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "design";

export interface Skill {
  id: string;
  name: string;
  iconKey: string;        // maps to icon registry in components
  category: SkillCategory;
  proficiency: number;    // 0–100
  isLearning: boolean;
  order: number;
  projectCount: number;
}

// ─── Experience ───────────────────────────────────────────────────────────────
export type ExperienceType = "fulltime" | "freelance" | "internship" | "education";

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: ExperienceType;
  startDate: string;      // ISO string YYYY-MM
  endDate?: string;       // undefined = Present
  location: string;
  description: string;
  bullets: string[];
  logoUrl?: string;
  order: number;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  approved?: boolean;
  featured: boolean;
  order: number;
  createdAt?: string;
}

// ─── Blog Post ────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;           // Markdown or HTML
  coverImage?: string;
  tags: string[];
  publishedAt: string;    // ISO string
  draft: boolean;
  readingTime?: number;   // minutes
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Static content (Firestore /content/* singleton docs) ────────────────────
export interface HeroContent {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  profileImage: string;
  profileImageDark?: string;
}

export interface AboutContent {
  headline: string;
  bio: string[];          // array of paragraphs
  yearsExp: number;
  location: string;
  availability: "available" | "open" | "unavailable";
  availabilityNote: string;
  profileImage: string;
  resumeUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
