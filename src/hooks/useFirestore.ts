import { useQuery } from "@tanstack/react-query";
import {
  projectsService,
  skillsService,
  experienceService,
  testimonialsService,
  blogService,
  contentService,
} from "@/services";

// ─── Projects ─────────────────────────────────────────────────────────────────
export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: projectsService.getAll });

export const useFeaturedProjects = () =>
  useQuery({ queryKey: ["projects", "featured"], queryFn: projectsService.getFeatured });

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ["projects", slug],
    queryFn: () => projectsService.getBySlug(slug),
    enabled: !!slug,
  });

// ─── Skills ───────────────────────────────────────────────────────────────────
export const useSkills = () =>
  useQuery({ queryKey: ["skills"], queryFn: skillsService.getAll });

// ─── Experience ───────────────────────────────────────────────────────────────
export const useExperience = () =>
  useQuery({ queryKey: ["experience"], queryFn: experienceService.getAll });

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: testimonialsService.getAll });

export const useFeaturedTestimonials = () =>
  useQuery({ queryKey: ["testimonials", "featured"], queryFn: testimonialsService.getFeatured });

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const useBlogPosts = () =>
  useQuery({ queryKey: ["blog"], queryFn: blogService.getAll });

export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBySlug(slug),
    enabled: !!slug,
  });

// ─── Static content ───────────────────────────────────────────────────────────
export const useHeroContent = () =>
  useQuery({ queryKey: ["content", "hero"], queryFn: contentService.getHero });

export const useAboutContent = () =>
  useQuery({ queryKey: ["content", "about"], queryFn: contentService.getAbout });

export const useSocialLinks = () =>
  useQuery({ queryKey: ["content", "social"], queryFn: contentService.getSocial });
