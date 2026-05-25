"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeaturedTestimonials } from "@/hooks/useFirestore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getInitials } from "@/lib/utils";
import {
  RiDoubleQuotesL,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiImageAddLine,
  RiChatQuoteLine,
  RiLoader5Line,
} from "react-icons/ri";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/FormFields";
import { testimonialSchema, type TestimonialSchema } from "@/lib/validations";
import { testimonialsService } from "@/services";
import { uploadImage } from "@/lib/image-upload";

type FormStatus = "idle" | "uploading" | "loading" | "success" | "error";

export function TestimonialsSection() {
  const { data: testimonials, isLoading, refetch } = useFeaturedTestimonials();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestimonialSchema>({
    resolver: zodResolver(testimonialSchema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormStatus("uploading");
    setUploadError("");
    try {
      const data = await uploadImage(file);
      // Imgbb response parser: get display_url or url
      const url = data?.data?.display_url ?? data?.data?.url;
      if (!url) throw new Error("No URL returned from upload");
      setAvatarUrl(url);
      setValue("avatarUrl", url, { shouldValidate: true });
      setFormStatus("idle");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Image upload failed");
      setFormStatus("idle");
    }
  };

  const removeAvatar = () => {
    setAvatarUrl("");
    setValue("avatarUrl", "");
  };

  const handleOpenModal = () => {
    reset();
    setAvatarUrl("");
    setUploadError("");
    setFormStatus("idle");
    setIsModalOpen(true);
  };

  const onSubmit = async (data: TestimonialSchema) => {
    setFormStatus("loading");
    try {
      await testimonialsService.add({
        name: data.name,
        role: data.role,
        company: data.company,
        quote: data.quote,
        avatarUrl: data.avatarUrl || undefined,
      });
      setFormStatus("success");
      refetch();
    } catch {
      setFormStatus("error");
    }
  };

  const navigate = (dir: 1 | -1) => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const hasTestimonials = testimonials && testimonials.length > 0;
  const current = hasTestimonials ? testimonials[index] : null;

  return (
    <section className="section section-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Kind Words" title="What Clients" highlight="Say" />

        {isLoading ? (
          <Skeleton className="h-48 rounded-2xl" />
        ) : !hasTestimonials ? (
          <div className="card p-10 text-center flex flex-col items-center justify-center border border-dashed border-border bg-surface-2/30 backdrop-blur-sm">
            <RiChatQuoteLine className="w-12 h-12 text-muted/40 mb-4" />
            <p className="text-body text-lg font-medium mb-2">No testimonials approved yet.</p>
            <p className="text-muted text-sm max-w-sm mb-6">
              Have we worked together on a project? I&apos;d love to hear your feedback on our collaboration!
            </p>
            <Button onClick={handleOpenModal} variant="primary">
              Share Your Feedback
            </Button>
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              {current && (
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
                      <Image
                        src={current.avatarUrl}
                        alt={current.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary-light text-primary font-bold text-xl flex items-center justify-center">
                        {getInitials(current.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-heading">{current.name}</p>
                      <p className="text-sm text-muted">
                        {current.role}, {current.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation & Submission Action */}
            <div className="flex flex-col items-center gap-6 mt-6">
              {testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-4">
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
                        onClick={() => {
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === index ? "bg-primary w-6" : "bg-border"
                        }`}
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

              <Button onClick={handleOpenModal} variant="outline" size="sm">
                <RiChatQuoteLine className="w-4 h-4" />
                Submit a Testimonial
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit a Testimonial">
        {formStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <RiCheckboxCircleLine className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="font-display font-bold text-2xl text-heading mb-2">Testimonial Submitted!</h4>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Thank you for sharing your feedback. Your testimonial has been successfully submitted and is currently
              pending moderation by the administrator.
            </p>
            <Button onClick={() => setIsModalOpen(false)} className="w-full">
              Done
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="name"
                label="Your Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="role"
                label="Role / Title"
                placeholder="Product Manager"
                error={errors.role?.message}
                {...register("role")}
              />
            </div>
            <Input
              id="company"
              label="Company"
              placeholder="Google"
              error={errors.company?.message}
              {...register("company")}
            />
            <Textarea
              id="quote"
              label="Testimonial / Feedback"
              placeholder="What was it like working with me?"
              error={errors.quote?.message}
              rows={4}
              {...register("quote")}
            />

            {/* Avatar Upload field */}
            <div className="space-y-2">
              <span className="block text-sm font-medium text-body">Profile Avatar (Optional)</span>
              {avatarUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-2/40">
                  <Image
                    src={avatarUrl}
                    alt="Avatar preview"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted truncate">{avatarUrl}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="text-xs font-semibold text-red-500 hover:text-red-400 p-1.5"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 py-6 border border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors bg-surface-2/10 hover:bg-surface-2/20">
                  {formStatus === "uploading" ? (
                    <>
                      <RiLoader5Line className="w-6 h-6 text-primary animate-spin" />
                      <span className="text-xs text-muted">Uploading image...</span>
                    </>
                  ) : (
                    <>
                      <RiImageAddLine className="w-6 h-6 text-muted" />
                      <span className="text-xs text-muted">Upload profile photo (JPG, PNG)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={formStatus === "uploading"}
                    className="hidden"
                  />
                </label>
              )}
              {uploadError && <p className="text-sm text-error">{uploadError}</p>}
            </div>

            {formStatus === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-error text-sm">
                <RiErrorWarningLine className="w-5 h-5 shrink-0" />
                Unable to submit testimonial. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "loading" || formStatus === "uploading"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formStatus === "loading" ? (
                <>
                  <RiLoader5Line className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}
