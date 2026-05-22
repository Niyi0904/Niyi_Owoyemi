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

  getFeatured: async () => {
    const items = await fetchCollection<Project>("projects", [where("featured", "==", true)]);
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },

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

  getByCategory: async (category: string) => {
    const items = await fetchCollection<Skill>("skills", [where("category", "==", category)]);
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
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

  getFeatured: async () => {
    const items = await fetchCollection<Testimonial>("testimonials", [where("featured", "==", true)]);
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
};

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const blogService = {
  getAll: async () => {
    const items = await fetchCollection<BlogPost>("blog", [where("draft", "==", false)]);
    return items.sort((a, b) => {
      const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bDate - aDate;
    });
  },

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
