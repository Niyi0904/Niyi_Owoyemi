"use client";

import {
  AdminCollectionPage,
  type AdminColumnConfig,
  type AdminRecord,
} from "@/components/admin/AdminCollectionPage";
import type { AdminFieldConfig } from "@/components/admin/AdminRecordForm";

const fields: AdminFieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "company", label: "Company", type: "text", required: true },
  { name: "approved", label: "Approved", type: "checkbox", defaultValue: false },
  { name: "featured", label: "Featured", type: "checkbox", defaultValue: false },
  { name: "order", label: "Order", type: "number", defaultValue: 0 },
  { name: "avatarUrl", label: "Avatar", type: "image" },
  { name: "quote", label: "Quote", type: "textarea", required: true, rows: 5 },
];

const columns: AdminColumnConfig<AdminRecord>[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "company", label: "Company" },
  {
    key: "approved",
    label: "Approved",
    render: (item) => (item.approved ? "Yes" : "No"),
  },
  {
    key: "featured",
    label: "Featured",
    render: (item) => (item.featured ? "Yes" : "No"),
  },
];

export default function AdminTestimonialsPage() {
  return (
    <AdminCollectionPage
      title="Testimonials"
      description="Manage quotes shown in the testimonials section."
      collectionName="testimonials"
      fields={fields}
      columns={columns}
      canCreate={false}
      emptyMessage="No testimonials yet."
      sortBy="order"
    />
  );
}
