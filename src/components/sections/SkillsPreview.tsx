"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSkills } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiArrowRightLine } from "react-icons/ri";

export function SkillsPreview() {
  const { data: skills, isLoading } = useSkills();
  const preview = skills?.slice(0, 12);

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Toolbox"
          title="Technologies I"
          highlight="Work With"
          description="A curated stack of modern tools I use to bring ideas to life — from concept to deployed product."
        />

        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10"
          >
            {(preview ?? FALLBACK_SKILLS).map((skill, i) => (
              <motion.div
                key={"id" in skill ? skill.id : skill.name}
                variants={staggerItem}
                custom={i}
                className="card flex flex-col items-center justify-center p-4 gap-2 text-center"
              >
                <span className="text-2xl">{("emoji" in skill) ? skill.emoji : "🛠️"}</span>
                <span className="text-xs font-semibold text-body leading-tight">
                  {"name" in skill ? skill.name : ""}
                </span>
                {("isLearning" in skill) && skill.isLearning && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-accent-dark font-medium">
                    Learning
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
          >
            View All Skills
            <RiArrowRightLine className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Shown while Firebase has no data yet
const FALLBACK_SKILLS = [
  { name: "Next.js",        emoji: "▲" },
  { name: "React",          emoji: "⚛️" },
  { name: "TypeScript",     emoji: "🔷" },
  { name: "Tailwind CSS",   emoji: "🎨" },
  { name: "Firebase",       emoji: "🔥" },
  { name: "Framer Motion",  emoji: "🎬" },
  { name: "Node.js",        emoji: "🟢" },
  { name: "Git",            emoji: "🌿" },
  { name: "Figma",          emoji: "🖌️" },
  { name: "Redux",          emoji: "💜" },
  { name: "PostgreSQL",     emoji: "🐘" },
  { name: "Vercel",         emoji: "▲" },
];
