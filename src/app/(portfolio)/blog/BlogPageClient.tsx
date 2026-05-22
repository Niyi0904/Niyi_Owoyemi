"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useBlogPosts } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { formatDate } from "@/lib/utils";
import { RiTimeLine } from "react-icons/ri";

export function BlogPageClient() {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div>
      {/* Header */}
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Writing"
            title="Thoughts &"
            highlight="Articles"
            description="Musings on frontend engineering, architecture patterns, and the ever-evolving web ecosystem."
          />
        </div>
      </section>

      {/* Posts */}
      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : !posts?.length ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">✍️</p>
              <h3 className="font-display font-bold text-xl text-heading mb-3">Coming Soon</h3>
              <p className="text-muted max-w-md mx-auto">
                I&apos;m working on articles about frontend engineering, Next.js patterns, and more. Check back soon.
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post) => (
                <motion.article key={post.id} variants={staggerItem}>
                  <Link href={`/blog/${post.slug}`} className="card group block h-full overflow-hidden">
                    {/* Cover */}
                    <div className="relative h-48 bg-surface-3 overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 gradient-bg flex items-center justify-center">
                          <span className="text-5xl">📝</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="neutral" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      <h3 className="font-display font-bold text-lg text-heading mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>{formatDate(post.publishedAt, { month: "short", day: "numeric", year: "numeric" })}</span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <RiTimeLine className="w-3.5 h-3.5" />
                            {post.readingTime} min read
                          </span>
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
