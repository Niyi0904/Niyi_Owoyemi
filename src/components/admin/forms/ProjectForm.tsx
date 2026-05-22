"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Project } from "@/types";
import { addDocument, updateDocument } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/image-upload";
import { Button } from "@/components/ui/Button";
import { RiUploadCloud2Line, RiCloseLine, RiImageAddLine } from "react-icons/ri";
import Image from "next/image";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  problem: z.string().optional(),
  solution: z.string().optional(),
  tags: z.string(),
  coverImage: z.string().min(1, "Cover image is required"),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["live", "wip", "archived"]),
  featured: z.boolean(),
  order: z.coerce.number(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      title: project.title,
      slug: project.slug,
      tagline: project.tagline,
      description: project.description,
      problem: project.problem,
      solution: project.solution,
      tags: project.tags.join(", "),
      coverImage: project.coverImage,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      status: project.status,
      featured: project.featured,
      order: project.order || 0,
    } : {
      status: "wip",
      featured: false,
      order: 0,
    },
  });

  const coverImage = watch("coverImage");

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const result = await uploadImage(file);
      if (result.success) {
        setValue("coverImage", result.data.display_url);
      } else {
        setError("Failed to upload image");
      }
    } catch (err) {
      setError("Error uploading image");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setSaving(true);
    setError("");
    try {
      const projectData = {
        ...data,
        tags: data.tags.split(",").map(t => t.trim()),
      };

      if (project) {
        await updateDocument("projects", project.id, projectData);
      } else {
        await addDocument("projects", projectData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {project ? "Edit Project" : "New Project"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
        >
          <RiCloseLine className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title *
            </label>
            <input
              {...register("title")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="Project title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Slug *
            </label>
            <input
              {...register("slug")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="project-slug"
            />
            {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tagline *
            </label>
            <input
              {...register("tagline")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="Short description"
            />
            {errors.tagline && <p className="mt-1 text-sm text-red-500">{errors.tagline.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status *
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500"
            >
              <option value="live">Live</option>
              <option value="wip">In Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Order
            </label>
            <input
              type="number"
              {...register("order")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="0"
            />
          </div>

          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                className="w-4 h-4 rounded bg-slate-700 border-slate-600 accent-violet-600"
              />
              <span className="text-sm font-medium text-slate-300">Featured</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 h-24 resize-none"
            placeholder="Full project description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Problem
            </label>
            <textarea
              {...register("problem")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 h-20 resize-none"
              placeholder="What problem did this solve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Solution
            </label>
            <textarea
              {...register("solution")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 h-20 resize-none"
              placeholder="How did you solve it?"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tags (comma-separated) *
            </label>
            <input
              {...register("tags")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="React, Next.js, Firebase"
            />
            {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Live URL
            </label>
            <input
              {...register("liveUrl")}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            GitHub URL
          </label>
          <input
            {...register("githubUrl")}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cover Image *
          </label>
          {coverImage && (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          )}
          <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-600 rounded-lg hover:border-violet-500 transition-colors cursor-pointer bg-slate-700/50">
            <div className="text-center">
              <RiImageAddLine className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400">
                {uploading ? "Uploading..." : "Click to upload image"}
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {errors.coverImage && <p className="mt-1 text-sm text-red-500">{errors.coverImage.message}</p>}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            {saving ? "Saving..." : project ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
