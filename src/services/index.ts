import type {
  Project, Skill, Experience, Testimonial, BlogPost,
  ContactMessage, HeroContent, AboutContent, SocialLinks,
} from "@/types";
import {
  fetchCollection, fetchDoc, fetchByField, addDocument, orderBy, where,
} from "@/lib/firebase/firestore";

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projectsService = {
  getAll: () =>
    fetchCollection<Project>("projects", [orderBy("order", "asc")]),

  getFeatured: () =>
    fetchCollection<Project>("projects", [
      where("featured", "==", true),
      orderBy("order", "asc"),
    ]),

  getBySlug: (slug: string) =>
    fetchByField<Project>("projects", "slug", slug),

  getById: (id: string) =>
    fetchDoc<Project>("projects", id),

  add: (data: Omit<Project, "id">) =>
    addDocument<Omit<Project, "id">>("projects", data),
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skillsService = {
  getAll: () =>
    fetchCollection<Skill>("skills", [orderBy("order", "asc")]),

  getByCategory: (category: string) =>
    fetchCollection<Skill>("skills", [
      where("category", "==", category),
      orderBy("order", "asc"),
    ]),
};

// ─── Experience ───────────────────────────────────────────────────────────────
export const experienceService = {
  getAll: () =>
    fetchCollection<Experience>("experience", [orderBy("order", "asc")]),
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonialsService = {
  getAll: () =>
    fetchCollection<Testimonial>("testimonials", [orderBy("order", "asc")]),

  getFeatured: () =>
    fetchCollection<Testimonial>("testimonials", [
      where("featured", "==", true),
      orderBy("order", "asc"),
    ]),
};

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const blogService = {
  getAll: () =>
    fetchCollection<BlogPost>("blog", [
      where("draft", "==", false),
      orderBy("publishedAt", "desc"),
    ]),

  getBySlug: (slug: string) =>
    fetchByField<BlogPost>("blog", "slug", slug),

  getById: (id: string) =>
    fetchDoc<BlogPost>("blog", id),
};

// ─── Contact messages ─────────────────────────────────────────────────────────
export const contactService = {
  send: (data: ContactMessage) =>
    addDocument<ContactMessage>("messages", data),
};

// ─── Static content (singleton Firestore docs under /content/*) ───────────────
export const contentService = {
  getHero: () =>
    fetchDoc<HeroContent>("content", "hero"),

  getAbout: () =>
    fetchDoc<AboutContent>("content", "about"),

  getSocial: () =>
    fetchDoc<SocialLinks>("content", "social"),
};
