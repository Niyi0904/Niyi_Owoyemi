"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBlogPost } from "@/hooks/useFirestore";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiArrowLeftLine, RiTimeLine, RiCalendarLine } from "react-icons/ri";
import { formatDate } from "@/lib/utils";

export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 space-y-8">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-12 w-3/4" />
        <SkeletonText lines={6} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-32 max-w-xl mx-auto px-4">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="font-display text-2xl font-bold text-heading mb-3">Article Not Found</h2>
        <p className="text-muted mb-8">This blog post does not exist or has been removed.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold transition-all hover:bg-primary-dark shadow-md"
        >
          <RiArrowLeftLine /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Back to Blog link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
      >
        <RiArrowLeftLine className="w-4 h-4" /> Back to Articles
      </Link>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={viewport}
        className="space-y-6"
      >
        {/* Date, Reading Time, and Tags */}
        <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <RiCalendarLine className="w-4 h-4" />
            {formatDate(post.publishedAt, { month: "long", day: "numeric", year: "numeric" })}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <RiTimeLine className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          )}
          <div className="flex flex-wrap gap-1.5 ml-auto sm:ml-0">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={staggerItem}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-heading leading-tight"
        >
          {post.title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          variants={staggerItem}
          className="text-muted text-lg md:text-xl border-l-4 border-primary/40 pl-4 py-1 leading-relaxed"
        >
          {post.excerpt}
        </motion.p>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div variants={staggerItem} className="relative aspect-video rounded-3xl overflow-hidden bg-surface-3 shadow-md my-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </motion.div>
        )}

        {/* Content Body */}
        <motion.div
          variants={fadeUp}
          className="blog-content text-body text-base sm:text-lg leading-relaxed pt-4"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </motion.div>
    </article>
  );
}
