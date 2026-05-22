"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeaturedTestimonials } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getInitials } from "@/lib/utils";
import { RiDoubleQuotesL, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { Skeleton } from "@/components/ui/Skeleton";

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useFeaturedTestimonials();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (isLoading) {
    return (
      <section className="section section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Kind Words" title="What Clients" highlight="Say" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </section>
    );
  }

  if (!testimonials?.length) return null;

  const current = testimonials[index];

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section section-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Kind Words" title="What Clients" highlight="Say" />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="card p-10 text-center"
            >
              <RiDoubleQuotesL className="w-10 h-10 text-primary/30 mx-auto mb-6" />
              <p className="text-body text-xl leading-relaxed italic mb-8">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-2">
                {current.avatarUrl ? (
                  <img
                    src={current.avatarUrl}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary-light text-primary font-bold text-xl flex items-center justify-center">
                    {getInitials(current.name)}
                  </div>
                )}
                <div>
                  <p className="font-display font-bold text-heading">{current.name}</p>
                  <p className="text-sm text-muted">{current.role}, {current.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => navigate(-1)}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl border border-border text-muted hover:text-primary hover:border-primary transition-all"
              >
                <RiArrowLeftLine className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-primary w-6" : "bg-border"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate(1)}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl border border-border text-muted hover:text-primary hover:border-primary transition-all"
              >
                <RiArrowRightLine className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
