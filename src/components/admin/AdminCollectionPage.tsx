"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  addDocument,
  deleteDocument,
  fetchCollection,
  updateDocument,
} from "@/lib/firebase/firestore";
import {
  AdminRecordForm,
  type AdminFieldConfig,
} from "@/components/admin/AdminRecordForm";
import { Button } from "@/components/ui/Button";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiInboxLine,
  RiSearchLine,
} from "react-icons/ri";

export type AdminRecord = Record<string, unknown> & { id: string };

export interface AdminColumnConfig<T extends AdminRecord> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  searchable?: boolean;
}

interface AdminCollectionPageProps<T extends AdminRecord> {
  title: string;
  description: string;
  collectionName: string;
  fields: AdminFieldConfig[];
  columns: AdminColumnConfig<T>[];
  newItemLabel?: string;
  canCreate?: boolean;
  emptyMessage?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

function readValue(item: AdminRecord, key: string): unknown {
  return key.split(".").reduce<unknown>((value, part) => {
    if (!value || typeof value !== "object") return undefined;
    return (value as Record<string, unknown>)[part];
  }, item);
}

function formatCellValue(value: unknown): string {
  if (value == null || value === "") return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function compareValues(a: unknown, b: unknown, direction: "asc" | "desc") {
  const modifier = direction === "asc" ? 1 : -1;

  if (typeof a === "number" && typeof b === "number") {
    return (a - b) * modifier;
  }

  return String(a ?? "").localeCompare(String(b ?? "")) * modifier;
}

export function AdminCollectionPage<T extends AdminRecord>({
  title,
  description,
  collectionName,
  fields,
  columns,
  newItemLabel = "New item",
  canCreate = true,
  emptyMessage = "No records found.",
  sortBy = "order",
  sortDirection = "asc",
}: AdminCollectionPageProps<T>) {
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", collectionName],
    queryFn: () => fetchCollection<T>(collectionName),
  });

  const searchableColumns = useMemo(
    () => columns.filter((column) => column.searchable !== false),
    [columns]
  );

  const rows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? data.filter((item) =>
          searchableColumns.some((column) =>
            formatCellValue(readValue(item, column.key))
              .toLowerCase()
              .includes(normalizedQuery)
          )
        )
      : data;

    return [...filtered].sort((a, b) =>
      compareValues(readValue(a, sortBy), readValue(b, sortBy), sortDirection)
    );
  }, [data, query, searchableColumns, sortBy, sortDirection]);

  const openNewForm = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEditForm = (item: T) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const closeForm = () => {
    setEditingItem(null);
    setFormOpen(false);
  };

  const handleSave = async (payload: Record<string, unknown>) => {
    if (editingItem) {
      await updateDocument(collectionName, editingItem.id, payload);
    } else {
      await addDocument(collectionName, payload);
    }

    await refetch();
    closeForm();
  };

  const handleDelete = async (item: T) => {
    if (!window.confirm(`Delete "${formatCellValue(readValue(item, columns[0]?.key ?? "id"))}"?`)) {
      return;
    }

    await deleteDocument(collectionName, item.id);
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 mt-1">{description}</p>
        </div>

        {!formOpen && canCreate && (
          <Button
            type="button"
            onClick={openNewForm}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            <RiAddLine className="w-4 h-4" />
            {newItemLabel}
          </Button>
        )}
      </div>

      {formOpen ? (
        <AdminRecordForm
          key={editingItem?.id ?? "new"}
          title={editingItem ? `Edit ${title}` : newItemLabel}
          fields={fields}
          initialData={editingItem}
          onSubmit={handleSave}
          onCancel={closeForm}
          submitLabel={editingItem ? "Update" : "Create"}
        />
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-5 py-4 border-b border-slate-700">
            <div className="relative w-full md:max-w-sm">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500"
              />
            </div>
            {!isLoading && (
              <span className="text-xs font-medium text-slate-400 bg-slate-700 px-3 py-1.5 rounded-full">
                {rows.length} {rows.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="p-8 text-slate-400">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                <RiInboxLine className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-slate-300 font-medium">{emptyMessage}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-700">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-5 py-3 text-left text-sm font-semibold text-slate-300"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-5 py-3 text-right text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {rows.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-700/40 transition-colors"
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-5 py-4 text-sm text-slate-100"
                        >
                          {column.render
                            ? column.render(item)
                            : formatCellValue(readValue(item, column.key))}
                        </td>
                      ))}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEditForm(item)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
                            aria-label="Edit"
                          >
                            <RiEdit2Line className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            aria-label="Delete"
                          >
                            <RiDeleteBin6Line className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
