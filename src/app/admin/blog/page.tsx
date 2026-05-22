"use client";

import {
  AdminCollectionPage,
  type AdminColumnConfig,
  type AdminRecord,
} from "@/components/admin/AdminCollectionPage";
import type { AdminFieldConfig } from "@/components/admin/AdminRecordForm";

const fields: AdminFieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "post-title" },
  { name: "publishedAt", label: "Published date", type: "date", required: true },
  { name: "readingTime", label: "Reading time", type: "number", defaultValue: 3, min: 1 },
  { name: "draft", label: "Draft", type: "checkbox", defaultValue: true },
  { name: "tags", label: "Tags", type: "tags", placeholder: "Next.js, React" },
  { name: "coverImage", label: "Cover image", type: "image" },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
  { name: "body", label: "Body", type: "textarea", required: true, rows: 12, helper: "Markdown or HTML, matching how your public blog renderer will consume it." },
];

const columns: AdminColumnConfig<AdminRecord>[] = [
  { key: "title", label: "Title" },
  { key: "publishedAt", label: "Published" },
  {
    key: "draft",
    label: "Draft",
    render: (item) => (item.draft ? "Yes" : "No"),
  },
  { key: "readingTime", label: "Min read" },
];

export default function AdminBlogPage() {
  return (
    <AdminCollectionPage
      title="Blog"
      description="Create and edit blog posts."
      collectionName="blog"
      fields={fields}
      columns={columns}
      newItemLabel="New post"
      emptyMessage="No blog posts yet."
      sortBy="publishedAt"
      sortDirection="desc"
    />
  );
}
