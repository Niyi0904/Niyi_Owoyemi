"use client";

import {
  AdminCollectionPage,
  type AdminColumnConfig,
  type AdminRecord,
} from "@/components/admin/AdminCollectionPage";
import type { AdminFieldConfig } from "@/components/admin/AdminRecordForm";

const fields: AdminFieldConfig[] = [
  { name: "company", label: "Company", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "type", label: "Type", type: "select", required: true, defaultValue: "fulltime", options: [
    { label: "Full-time", value: "fulltime" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" },
    { label: "Education", value: "education" },
  ] },
  { name: "startDate", label: "Start date", type: "month", required: true },
  { name: "endDate", label: "End date", type: "month", helper: "Leave empty for present." },
  { name: "location", label: "Location", type: "text", required: true },
  { name: "order", label: "Order", type: "number", defaultValue: 0 },
  { name: "logoUrl", label: "Logo", type: "image" },
  { name: "description", label: "Description", type: "textarea", rows: 4 },
  { name: "bullets", label: "Highlights", type: "list", helper: "One bullet per line." },
];

const columns: AdminColumnConfig<AdminRecord>[] = [
  { key: "role", label: "Role" },
  { key: "company", label: "Company" },
  { key: "type", label: "Type" },
  { key: "startDate", label: "Start" },
];

export default function AdminExperiencePage() {
  return (
    <AdminCollectionPage
      title="Experience"
      description="Manage roles, education, freelance work, and timeline entries."
      collectionName="experience"
      fields={fields}
      columns={columns}
      newItemLabel="New experience"
      emptyMessage="No experience entries yet."
      sortBy="order"
    />
  );
}
