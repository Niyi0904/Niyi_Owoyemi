"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCollection, deleteDocument } from "@/lib/firebase/firestore";
import type { Project } from "@/types";
import { RiAddLine } from "react-icons/ri";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";

/* ─── Column definitions ─────────────────────────────────────────────────────── */

const columns: Column<Project>[] = [
  {
    key: "title",
    label: "Title",
    render: (val) => <span className="font-medium">{String(val)}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (val) => {
      const status = String(val);
      const style =
        status === "live"
          ? "bg-green-500/20 text-green-400"
          : status === "wip"
            ? "bg-amber-500/20 text-amber-400"
            : "bg-slate-500/20 text-slate-400";
      return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${style}`}>
          {status}
        </span>
      );
    },
  },
  {
    key: "featured",
    label: "Featured",
    render: (val) => (
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${
          val ? "bg-violet-500/20 text-violet-400" : "bg-slate-500/20 text-slate-400"
        }`}
      >
        {val ? "Yes" : "No"}
      </span>
    ),
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────────── */

export default function AdminProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: projects = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => fetchCollection<Project>("projects", []),
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDocument("projects", id);
      refetch();
    } catch (error) {
      alert("Failed to delete project");
      console.error(error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProject(null);
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={() => {
            setSelectedProject(null);
            setShowForm(true);
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2"
        >
          <RiAddLine className="w-4 h-4" /> New Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm project={selectedProject} onClose={handleCloseForm} />
      )}

      {!showForm && (
        <DataTable<Project>
          data={projects}
          columns={columns}
          onEdit={(project) => {
            setSelectedProject(project);
            setShowForm(true);
          }}
          onDelete={handleDelete}
          isLoading={isLoading}
          searchPlaceholder="Search projects…"
          emptyMessage="No projects yet"
          emptySubMessage="Create your first one!"
        />
      )}
    </div>
  );
}

