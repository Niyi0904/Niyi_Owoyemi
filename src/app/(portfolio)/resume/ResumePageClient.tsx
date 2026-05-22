"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RiDownloadLine, RiExternalLinkLine } from "react-icons/ri";

// Replace this with the Firebase Storage URL of your resume PDF
const RESUME_PDF_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? "/resume.pdf";

export function ResumePageClient() {
  return (
    <div>
      {/* Header */}
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Resume"
            title="My"
            highlight="Curriculum Vitae"
            description="A full overview of my experience, education, and skill set."
          />

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={RESUME_PDF_URL}
              download="Owoyemi-Niyi-Resume.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/25"
            >
              <RiDownloadLine className="w-5 h-5" />
              Download PDF
            </a>
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-all"
            >
              <RiExternalLinkLine className="w-5 h-5" />
              Open in New Tab
            </a>
          </div>
        </div>
      </section>

      {/* PDF viewer */}
      <section className="section section-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card overflow-hidden">
              <iframe
                src={RESUME_PDF_URL}
                title="Owoyemi Niyi Resume"
                className="w-full"
                style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}
              />
            </div>

            <p className="text-center text-sm text-muted mt-6">
              Can&apos;t see the PDF?{" "}
              <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer"
                className="text-primary font-medium hover:underline">
                Open it directly
              </a>
              {" "}or{" "}
              <a href={RESUME_PDF_URL} download className="text-primary font-medium hover:underline">
                download it
              </a>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
