"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSkills } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { SKILL_CATEGORIES } from "@/constants";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import type { SkillCategory } from "@/types";

type FilterKey = "all" | SkillCategory;

export function SkillsPageClient() {
  const { data: skills, isLoading } = useSkills();
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");

  const filtered = (skills ?? []).filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <div>
      {/* Header */}
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Skills"
            title="My"
            highlight="Toolbox"
            description="Technologies I've invested real time in — not a list of buzzwords, but tools I ship with."
          />

          {/* Category filters */}
          <div className="flex justify-center flex-wrap gap-2">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as FilterKey)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-surface border border-border text-body hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(15)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
            </div>
          ) : !filtered.length ? (
            <p className="text-center text-muted py-16">No skills in this category yet.</p>
          ) : (
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              viewport={viewport}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {filtered.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  variants={staggerItem}
                  custom={i}
                  className="card p-5 flex flex-col items-center text-center gap-3"
                >
                  <span className="text-3xl">{skill.iconKey}</span>
                  <span className="font-semibold text-sm text-heading">{skill.name}</span>

                  {/* Proficiency bar */}
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-muted mb-1.5">
                      <span className="capitalize">{skill.category}</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.03 }}
                      />
                    </div>
                  </div>

                  {skill.isLearning && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-accent-dark font-semibold">
                      Learning
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Fallback content shown when Firebase is empty */}
      {!isLoading && !skills?.length && (
        <section className="section">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-muted text-lg">
              Skills data is managed through Firebase. Add skill documents to the{" "}
              <code className="px-2 py-0.5 rounded bg-surface-3 text-primary font-mono text-sm">/skills</code>{" "}
              Firestore collection to populate this page.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
