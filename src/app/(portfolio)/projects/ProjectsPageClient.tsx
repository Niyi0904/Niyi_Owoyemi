"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiExternalLinkLine, RiGithubLine } from "react-icons/ri";
import type { Project } from "@/types";

type Filter = "all" | "live" | "wip" | "archived";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all",      label: "All"         },
  { value: "live",     label: "Live"        },
  { value: "wip",      label: "In Progress" },
  { value: "archived", label: "Archived"    },
];

export function ProjectsPageClient() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered: Project[] = (projects ?? []).filter(
    (p) => filter === "all" || p.status === filter
  );

  return (
    <div>
      {/* Hero */}
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Portfolio"
            title="My"
            highlight="Projects"
            description="Every project is a problem solved. Here's what I've been building."
          />

          {/* Filter chips */}
          <div className="flex justify-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === f.value
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-surface border border-border text-body hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : !filtered.length ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-muted text-lg">No projects found for this filter.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <motion.article key={project.id} variants={staggerItem}>
                  <Link href={`/projects/${project.slug}`} className="card group block h-full overflow-hidden">
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
                          <span className="font-display font-bold text-5xl gradient-text opacity-30">
                            {project.title[0]}
                          </span>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        project.status === "live"     ? "bg-green-500/90 text-white" :
                        project.status === "wip"      ? "bg-amber-500/90 text-white" :
                                                        "bg-surface/80 text-body"
                      }`}>
                        {project.status === "live" ? "Live" : project.status === "wip" ? "In Progress" : "Archived"}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-heading mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm mb-4 line-clamp-2">{project.tagline}</p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            <RiExternalLinkLine className="w-4 h-4" /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors">
                            <RiGithubLine className="w-4 h-4" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
