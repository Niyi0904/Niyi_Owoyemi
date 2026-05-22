"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useFeaturedProjects } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiExternalLinkLine, RiGithubLine, RiArrowRightLine } from "react-icons/ri";

export function FeaturedProjects() {
  const { data: projects, isLoading } = useFeaturedProjects();

  return (
    <section className="section section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Selected Work"
          title="Featured"
          highlight="Projects"
          description="A selection of the projects I'm most proud of — each one a story of problems solved and craft applied."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : !projects?.length ? (
          <p className="text-center text-muted py-12">Projects coming soon.</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.article key={project.id} variants={staggerItem}>
                <Link href={`/projects/${project.slug}`} className="card group block h-full overflow-hidden">
                  {/* Cover image */}
                  <div className="relative h-52 overflow-hidden bg-surface-3">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 gradient-bg flex items-center justify-center">
                        <span className="font-display font-bold text-4xl gradient-text opacity-40">
                          {project.title[0]}
                        </span>
                      </div>
                    )}
                    {/* Status badge */}
                    {project.status === "wip" && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
                        In Progress
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-heading mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm mb-4 line-clamp-2">{project.tagline}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <RiExternalLinkLine className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors"
                        >
                          <RiGithubLine className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
          >
            View All Projects
            <RiArrowRightLine className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
