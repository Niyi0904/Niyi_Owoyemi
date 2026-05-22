"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDoc, setDocument } from "@/lib/firebase/firestore";
import {
  AdminRecordForm,
  type AdminFieldConfig,
} from "@/components/admin/AdminRecordForm";

type ContentDocId = "hero" | "about" | "social";

interface ContentConfig {
  id: ContentDocId;
  label: string;
  description: string;
  fields: AdminFieldConfig[];
}

const contentConfigs: ContentConfig[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Primary homepage hero copy, CTAs, and profile image.",
    fields: [
      { name: "greeting", label: "Greeting", type: "text", defaultValue: "Hi, I'm" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "textarea", required: true, rows: 4 },
      { name: "primaryCtaText", label: "Primary CTA text", type: "text", defaultValue: "View My Work" },
      { name: "primaryCtaUrl", label: "Primary CTA URL", type: "text", defaultValue: "/projects" },
      { name: "secondaryCtaText", label: "Secondary CTA text", type: "text", defaultValue: "Download Resume" },
      { name: "secondaryCtaUrl", label: "Secondary CTA URL", type: "text", defaultValue: "/resume" },
      { name: "profileImage", label: "Profile image", type: "image" },
      { name: "profileImageDark", label: "Dark profile image", type: "image" },
    ],
  },
  {
    id: "about",
    label: "About",
    description: "About page bio, availability, resume link, and profile image.",
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "bio", label: "Bio paragraphs", type: "list", required: true, helper: "One paragraph per line." },
      { name: "yearsExp", label: "Years experience", type: "number", defaultValue: 2, min: 0 },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "availability", label: "Availability", type: "select", defaultValue: "available", options: [
        { label: "Available", value: "available" },
        { label: "Open", value: "open" },
        { label: "Unavailable", value: "unavailable" },
      ] },
      { name: "availabilityNote", label: "Availability note", type: "text" },
      { name: "profileImage", label: "Profile image", type: "image" },
      { name: "resumeUrl", label: "Resume URL", type: "text", defaultValue: "/resume" },
    ],
  },
  {
    id: "social",
    label: "Social links",
    description: "Global social and contact links.",
    fields: [
      { name: "github", label: "GitHub", type: "url", required: true },
      { name: "linkedin", label: "LinkedIn", type: "url", required: true },
      { name: "twitter", label: "Twitter/X", type: "url", required: true },
      { name: "email", label: "Email", type: "email", required: true },
    ],
  },
];

export default function AdminContentPage() {
  const [activeId, setActiveId] = useState<ContentDocId>("hero");
  const activeConfig =
    contentConfigs.find((config) => config.id === activeId) ?? contentConfigs[0];

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-content", activeId],
    queryFn: () => fetchDoc<Record<string, unknown>>("content", activeId),
  });

  const handleSubmit = async (payload: Record<string, unknown>) => {
    await setDocument("content", activeId, payload, true);
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Content</h1>
        <p className="text-slate-400 mt-1">
          Manage singleton documents in the Firestore content collection.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {contentConfigs.map((config) => (
          <button
            key={config.id}
            type="button"
            onClick={() => setActiveId(config.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeId === config.id
                ? "bg-violet-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3">
        <h2 className="font-semibold text-white">{activeConfig.label}</h2>
        <p className="text-sm text-slate-400">{activeConfig.description}</p>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-slate-400">
          Loading content...
        </div>
      ) : (
        <AdminRecordForm
          key={activeId}
          title={`Edit ${activeConfig.label}`}
          fields={activeConfig.fields}
          initialData={data}
          onSubmit={handleSubmit}
          onCancel={() => undefined}
          submitLabel="Save content"
          hideCancel
        />
      )}
    </div>
  );
}
