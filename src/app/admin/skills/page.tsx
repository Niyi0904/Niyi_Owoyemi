"use client";

import {
  AdminCollectionPage,
  type AdminColumnConfig,
  type AdminRecord,
} from "@/components/admin/AdminCollectionPage";
import type { AdminFieldConfig } from "@/components/admin/AdminRecordForm";

const fields: AdminFieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "iconKey", label: "Icon", type: "text", required: true, helper: "Use the icon text or key your public UI should display." },
  { name: "category", label: "Category", type: "select", required: true, defaultValue: "frontend", options: [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Database", value: "database" },
    { label: "Tools", value: "tools" },
    { label: "Design", value: "design" },
  ] },
  { name: "proficiency", label: "Proficiency", type: "number", defaultValue: 80, min: 0, max: 100 },
  { name: "projectCount", label: "Project count", type: "number", defaultValue: 0, min: 0 },
  { name: "order", label: "Order", type: "number", defaultValue: 0 },
  { name: "isLearning", label: "Currently learning", type: "checkbox", defaultValue: false },
];

const columns: AdminColumnConfig<AdminRecord>[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "proficiency", label: "Proficiency" },
  {
    key: "isLearning",
    label: "Learning",
    render: (item) => (item.isLearning ? "Yes" : "No"),
  },
];

export default function AdminSkillsPage() {
  return (
    <AdminCollectionPage
      title="Skills"
      description="Manage the technologies shown across the skills page."
      collectionName="skills"
      fields={fields}
      columns={columns}
      newItemLabel="New skill"
      emptyMessage="No skills yet."
      sortBy="order"
    />
  );
}
