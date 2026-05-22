"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAboutContent } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { AVAILABILITY } from "@/constants";
import { slideLeft, slideRight, staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { RiDownloadLine, RiMapPinLine, RiMailLine, RiCheckboxCircleLine } from "react-icons/ri";

const STATS = [
  { value: "2+",  label: "Years Experience"   },
  { value: "8+",  label: "Projects Shipped"   },
  { value: "5+",  label: "Happy Clients"      },
  { value: "100%", label: "Commitment"         },
];

const WHAT_I_DO = [
  "Build performant Next.js & React applications",
  "Design scalable frontend architectures",
  "Integrate Firebase & backend services",
  "Craft smooth Framer Motion animations",
  "Implement pixel-perfect responsive designs",
  "Write clean, maintainable TypeScript",
];

export function AboutPageClient() {
  const { data: about, isLoading } = useAboutContent();
  const stats = STATS.map((stat) =>
    stat.label === "Years Experience" && about?.yearsExp != null
      ? { ...stat, value: `${about.yearsExp}+` }
      : stat
  );

  return (
    <div>
      {/* Hero banner */}
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="About Me"
            title="The Story"
            highlight="Behind the Code"
            description="A frontend engineer who loves the intersection of design and engineering."
          />
        </div>
      </section>

      {/* Main content */}
      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex justify-center"
            >
              {isLoading ? (
                <Skeleton className="w-80 h-96 rounded-3xl" />
              ) : (
                <div className="relative w-80">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent blur-xl opacity-20 scale-105" />
                  <div className="relative rounded-3xl overflow-hidden ring-4 ring-primary/20 aspect-[4/5]">
                    <Image
                      src={about?.profileImage ?? "/Myimage.jpg"}
                      alt="Owoyemi Niyi"
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>

                  {/* Availability badge */}
                  {about?.availability && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface rounded-2xl shadow-xl border border-border px-5 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${AVAILABILITY[about.availability].dot}`} />
                        <span className={`text-sm font-semibold ${AVAILABILITY[about.availability].color}`}>
                          {AVAILABILITY[about.availability].label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <SkeletonText lines={5} />
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-6">
                    {about?.headline ?? "I turn ideas into exceptional digital experiences"}
                  </h2>

                  <div className="space-y-4 text-body leading-relaxed mb-8">
                    {(about?.bio ?? FALLBACK_BIO).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <RiMapPinLine className="w-4 h-4 text-primary" />
                      {about?.location ?? "Lagos, Nigeria"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <RiMailLine className="w-4 h-4 text-primary" />
                      owoyeminiyi2@gmail.com
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/25"
                    >
                      Let&apos;s Work Together
                    </Link>
                    <a
                      href={about?.resumeUrl ?? "/resume"}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-all"
                    >
                      <RiDownloadLine className="w-5 h-5" />
                      Download Resume
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="card p-8 text-center"
              >
                <p className="font-display font-extrabold text-5xl gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-muted font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What I do */}
      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Services"
              title="What I"
              highlight="Do Best"
              description="My core competencies as a frontend engineer."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {WHAT_I_DO.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <RiCheckboxCircleLine className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-body">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

const FALLBACK_BIO = [
  "I'm Owoyemi Niyi, a frontend engineer based in Lagos, Nigeria with a passion for building products that are as elegant under the hood as they are on the surface.",
  "My journey into web development started with a curiosity about how things work — that curiosity grew into a discipline around clean architecture, accessible interfaces, and delightful user experiences.",
  "I specialise in the Next.js and React ecosystem, working with TypeScript, Firebase, and Tailwind CSS to build applications that are fast, scalable, and maintainable. I care deeply about the craft.",
];
