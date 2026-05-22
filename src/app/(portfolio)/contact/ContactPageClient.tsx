"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { contactSchema, type ContactSchema } from "@/lib/validations";
import { contactService } from "@/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input, Textarea } from "@/components/ui/FormFields";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SOCIAL_LINKS } from "@/constants";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiMapPinLine,
  RiSendPlaneLine,
  RiTwitterXLine,
} from "react-icons/ri";

const INFO_CARDS = [
  { icon: RiMailLine, label: "Email", value: SOCIAL_LINKS.email, href: `mailto:${SOCIAL_LINKS.email}` },
  { icon: RiMapPinLine, label: "Location", value: "Lagos, Nigeria", href: undefined },
  { icon: RiGithubLine, label: "GitHub", value: "github.com/Niyi0904", href: SOCIAL_LINKS.github },
];

const SOCIAL = [
  { href: SOCIAL_LINKS.linkedin, icon: RiLinkedinBoxLine, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, icon: RiTwitterXLine, label: "Twitter" },
  { href: SOCIAL_LINKS.github, icon: RiGithubLine, label: "GitHub" },
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactPageClient() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    setStatus("loading");
    try {
      await contactService.send({ ...data });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Send failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <section className="section gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Contact"
            title="Let's Build Something"
            highlight="Together"
            description="Have a project in mind, an opportunity to discuss, or just want to say hello? I'd love to hear from you."
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <AnimatedSection className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-heading mb-4">
                  Get In Touch
                </h2>
                <p className="text-body leading-relaxed">
                  I&apos;m currently open to new opportunities - freelance projects,
                  full-time roles, and interesting collaborations. My inbox is
                  always open.
                </p>
              </div>

              <div className="space-y-4">
                {INFO_CARDS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-heading hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-heading">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                  Find me on
                </p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-3 rounded-xl border border-border text-muted hover:text-primary hover:border-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <div className="card p-8">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <RiCheckboxCircleLine className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-2xl text-heading mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted mb-6">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        id="name"
                        label="Your Name"
                        placeholder="Owoyemi Niyi"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="hello@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>
                    <Input
                      id="subject"
                      label="Subject"
                      placeholder="Let's work together!"
                      error={errors.subject?.message}
                      {...register("subject")}
                    />
                    <Textarea
                      id="message"
                      label="Message"
                      placeholder="Tell me about your project or opportunity..."
                      error={errors.message?.message}
                      rows={6}
                      {...register("message")}
                    />

                    {status === "error" && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-error text-sm">
                        <RiErrorWarningLine className="w-5 h-5 shrink-0" />
                        Something went wrong. Please try again or email me directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <RiSendPlaneLine className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
