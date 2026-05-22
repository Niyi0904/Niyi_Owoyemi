"use client";

import {
  AdminCollectionPage,
  type AdminColumnConfig,
  type AdminRecord,
} from "@/components/admin/AdminCollectionPage";
import type { AdminFieldConfig } from "@/components/admin/AdminRecordForm";

const fields: AdminFieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "my-project" },
  { name: "tagline", label: "Tagline", type: "text", required: true },
  { name: "status", label: "Status", type: "select", required: true, defaultValue: "wip", options: [
    { label: "Live", value: "live" },
    { label: "In progress", value: "wip" },
    { label: "Archived", value: "archived" },
  ] },
  { name: "featured", label: "Featured", type: "checkbox", defaultValue: false },
  { name: "order", label: "Order", type: "number", defaultValue: 0 },
  { name: "description", label: "Description", type: "textarea", required: true, rows: 5 },
  { name: "problem", label: "Problem", type: "textarea", rows: 4 },
  { name: "solution", label: "Solution", type: "textarea", rows: 4 },
  { name: "tags", label: "Tags", type: "tags", required: true, placeholder: "React, Next.js, Firebase" },
  { name: "liveUrl", label: "Live URL", type: "url" },
  { name: "githubUrl", label: "GitHub URL", type: "url" },
  { name: "coverImage", label: "Cover image", type: "image", required: true },
  { name: "images", label: "Gallery images", type: "images", helper: "Optional screenshots. One URL per line." },
];

const columns: AdminColumnConfig<AdminRecord>[] = [
  { key: "title", label: "Title" },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <span className="capitalize text-xs font-semibold px-2 py-1 rounded-full bg-slate-700 text-slate-200">
        {String(item.status ?? "wip")}
      </span>
    ),
  },
  {
    key: "featured",
    label: "Featured",
    render: (item) => (
      <span className={item.featured ? "text-violet-300" : "text-slate-500"}>
        {item.featured ? "Yes" : "No"}
      </span>
    ),
  },
  { key: "order", label: "Order" },
];

export default function AdminProjectsPage() {
  return (
    <AdminCollectionPage
      title="Projects"
      description="Create, update, and remove portfolio projects."
      collectionName="projects"
      fields={fields}
      columns={columns}
      newItemLabel="New project"
      emptyMessage="No projects yet."
      sortBy="order"
    />
  );
}
