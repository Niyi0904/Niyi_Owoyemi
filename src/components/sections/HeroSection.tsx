"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { staggerContainer, staggerItem, slideRight } from "@/animations/variants";
import { RiDownloadLine, RiArrowRightLine, RiGithubLine, RiLinkedinBoxLine, RiTwitterXLine } from "react-icons/ri";
import { SOCIAL_LINKS } from "@/constants";

const SOCIAL = [
  { href: SOCIAL_LINKS.github,   icon: RiGithubLine,      label: "GitHub"   },
  { href: SOCIAL_LINKS.linkedin, icon: RiLinkedinBoxLine, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter,  icon: RiTwitterXLine,    label: "Twitter"  },
];

const TECH_BADGES = [
  "Next.js", "TypeScript", "React", "Firebase", "Tailwind CSS", "Framer Motion",
];

export function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-light text-primary dark:bg-primary/20 dark:text-violet-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name + title */}
            <motion.h1
              variants={staggerItem}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-heading mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text block">Owoyemi</span>
              <span className="gradient-text">Niyi</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl sm:text-2xl font-medium text-muted mb-6"
            >
              Frontend Engineer &mdash; Building{" "}
              <span className="text-primary font-semibold">fast</span>,{" "}
              <span className="text-accent font-semibold">beautiful</span>{" "}
              web experiences
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="text-body text-lg leading-relaxed mb-10 max-w-lg"
            >
              I specialise in crafting scalable React and Next.js applications with clean architecture, polished UI, and seamless user experiences. Based in Lagos, Nigeria.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                View My Work
                <RiArrowRightLine className="w-5 h-5" />
              </Link>
              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
              >
                <RiDownloadLine className="w-5 h-5" />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={staggerItem} className="flex items-center gap-4">
              <span className="text-sm text-muted font-medium">Find me on</span>
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-border text-muted hover:text-primary hover:border-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex flex-col items-center"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary-dark blur-2xl opacity-20 scale-110" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden ring-4 ring-primary/20">
                <Image
                  src="/Myimage.jpg"
                  alt="Owoyemi Niyi — Frontend Engineer" 
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -bottom-4 -left-4 bg-surface rounded-2xl shadow-xl border border-border px-4 py-3"
              >
                <p className="font-display font-bold text-2xl text-heading leading-none">4+</p>
                <p className="text-xs text-muted mt-0.5">Years Experience</p>
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -top-4 -right-4 bg-surface rounded-2xl shadow-xl border border-border px-4 py-3"
              >
                <p className="font-display font-bold text-2xl text-heading leading-none">11+</p>
                <p className="text-xs text-muted mt-0.5">Projects Shipped</p>
              </motion.div>
            </div>

            {/* Tech badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap justify-center gap-2"
            >
              {TECH_BADGES.map((tech, i) => (
                <motion.span
                  key={tech}
                  variants={staggerItem}
                  custom={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border text-body shadow-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-muted flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
