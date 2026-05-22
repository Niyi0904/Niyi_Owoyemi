"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewport } from "@/animations/variants";

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className={cn(
        "mb-16",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {label && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase bg-primary-light text-primary dark:bg-primary/20 dark:text-violet-300">
          {label}
        </span>
      )}

      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mb-4">
        {title}{" "}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className={cn(
          "text-muted text-lg leading-relaxed max-w-2xl",
          isCenter && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
