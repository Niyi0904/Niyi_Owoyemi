"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useProject } from "@/hooks/useFirestore";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiExternalLinkLine, RiGithubLine, RiArrowLeftLine } from "react-icons/ri";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading } = useProject(slug);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-8">
        <Skeleton className="h-72 rounded-3xl" />
        <Skeleton className="h-10 w-1/2" />
        <SkeletonText lines={4} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-32">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="font-display text-2xl font-bold text-heading mb-3">Project Not Found</h2>
        <p className="text-muted mb-8">This project does not exist or has been removed.</p>
        <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold">
          <RiArrowLeftLine /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 lg:h-[28rem] bg-surface-3 overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 gradient-bg flex items-center justify-center">
            <span className="font-display font-bold text-8xl gradient-text opacity-20">{project.title[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
              ))}
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2">
              {project.title}
            </h1>
            <p className="text-white/80 text-lg">{project.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Action links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mb-12"
        >
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
            <RiArrowLeftLine className="w-4 h-4" /> All Projects
          </Link>
          <div className="flex gap-4 ml-auto">
            {project.liveUrl && (
              <motion.a variants={staggerItem}
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
                <RiExternalLinkLine className="w-4 h-4" /> Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a variants={staggerItem}
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-body font-semibold text-sm hover:border-primary hover:text-primary transition-all">
                <RiGithubLine className="w-4 h-4" /> Source Code
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mb-12">
          <h2 className="font-display font-bold text-2xl text-heading mb-4">Overview</h2>
          <p className="text-body text-lg leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Problem / Solution */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {project.problem && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
                className="card p-6 border-l-4 border-accent">
                <h3 className="font-display font-bold text-lg text-heading mb-3">🎯 The Problem</h3>
                <p className="text-body leading-relaxed">{project.problem}</p>
              </motion.div>
            )}
            {project.solution && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
                className="card p-6 border-l-4 border-primary">
                <h3 className="font-display font-bold text-lg text-heading mb-3">💡 The Solution</h3>
                <p className="text-body leading-relaxed">{project.solution}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Screenshot gallery */}
        {project.images && project.images.length > 1 && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mb-12">
            <h2 className="font-display font-bold text-2xl text-heading mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden bg-surface-3">
                  <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech stack */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <h2 className="font-display font-bold text-2xl text-heading mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="primary">{tag}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
