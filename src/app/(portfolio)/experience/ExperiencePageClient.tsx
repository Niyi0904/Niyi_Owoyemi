"use client";

import { motion } from "framer-motion";
import { useExperience } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiCheckLine, RiBriefcaseLine, RiCodeLine, RiBook2Line, RiTimeLine } from "react-icons/ri";
import type { ExperienceType } from "@/types";

const TYPE_CONFIG: Record<ExperienceType, { label: string; icon: typeof RiBriefcaseLine; color: string }> = {
  fulltime:    { label: "Full-time",   icon: RiBriefcaseLine, color: "text-primary bg-primary-light dark:bg-primary/20" },
  freelance:   { label: "Freelance",   icon: RiCodeLine,      color: "text-accent bg-accent-light dark:bg-pink-900/30"   },
  internship:  { label: "Internship",  icon: RiTimeLine,      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30"  },
  education:   { label: "Education",   icon: RiBook2Line,     color: "text-green-600 bg-green-100 dark:bg-green-900/30"  },
};

export function ExperiencePageClient() {
  const { data: experience, isLoading } = useExperience();

  return (
    <div>
      {/* Header */}
      <section className="section gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Experience"
            title="My Professional"
            highlight="Journey"
            description="The roles, projects, and experiences that have shaped how I think and build."
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-6">
                  <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : !experience?.length ? (
            <p className="text-center text-muted py-16">
              Experience data is managed through Firebase. Add documents to the{" "}
              <code className="px-2 py-0.5 rounded bg-surface-3 text-primary font-mono text-sm">/experience</code>{" "}
              Firestore collection.
            </p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="relative"
            >
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-10">
                {experience.map((exp, i) => {
                  const cfg = TYPE_CONFIG[exp.type];
                  const Icon = cfg.icon;

                  return (
                    <motion.div
                      key={exp.id}
                      variants={staggerItem}
                      custom={i}
                      className="relative flex gap-6"
                    >
                      {/* Timeline node */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${cfg.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Card */}
                      <div className="card flex-1 p-6 mb-2">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-display font-bold text-lg text-heading">{exp.role}</h3>
                            <p className="text-primary font-semibold">{exp.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted">
                              {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Present"}
                            </p>
                            <p className="text-xs text-muted mt-1">{exp.location}</p>
                          </div>
                        </div>

                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${cfg.color}`}>
                          {cfg.label}
                        </span>

                        {exp.description && (
                          <p className="text-body text-sm leading-relaxed mb-4">{exp.description}</p>
                        )}

                        {exp.bullets?.length > 0 && (
                          <ul className="space-y-2">
                            {exp.bullets.map((bullet, bi) => (
                              <li key={bi} className="flex items-start gap-2 text-sm text-body">
                                <RiCheckLine className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
