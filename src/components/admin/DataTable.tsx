"use client";

import { useState, useMemo } from "react";
import {
  RiDeleteBin6Line,
  RiEdit2Line,
  RiSearchLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiInboxLine,
} from "react-icons/ri";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface Column<T> {
  /** Property key on T – used for default rendering & sorting */
  key: keyof T;
  /** Header label */
  label: string;
  /** Custom cell renderer */
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  /** Allow sorting on this column (default: true) */
  sortable?: boolean;
  /** Make the column searchable (matched against the raw string value) */
  searchable?: boolean;
}

export interface DataTableProps<T extends { id: string }> {
  /** Row data */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Called when the edit button is clicked */
  onEdit: (item: T) => void;
  /** Called when the delete button is clicked */
  onDelete: (id: string) => void;
  /** Show loading skeleton */
  isLoading?: boolean;
  /** Enable the search bar (default: true) */
  searchable?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Message to show when the table is empty */
  emptyMessage?: string;
  /** Sub-message below the empty message */
  emptySubMessage?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

type SortDir = "asc" | "desc" | null;

function compare<T>(a: T, b: T, key: keyof T, dir: SortDir): number {
  if (!dir) return 0;
  const aVal = a[key];
  const bVal = b[key];

  // Handle nulls / undefined
  if (aVal == null && bVal == null) return 0;
  if (aVal == null) return dir === "asc" ? -1 : 1;
  if (bVal == null) return dir === "asc" ? 1 : -1;

  if (typeof aVal === "number" && typeof bVal === "number") {
    return dir === "asc" ? aVal - bVal : bVal - aVal;
  }

  const aStr = String(aVal).toLowerCase();
  const bStr = String(bVal).toLowerCase();
  return dir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
}

/* ─── Skeleton row ───────────────────────────────────────────────────────────── */

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
        </td>
      ))}
      {/* Actions column skeleton */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse" />
          <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading = false,
  searchable = true,
  searchPlaceholder = "Search…",
  emptyMessage = "No items found",
  emptySubMessage,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  /* ── Determine searchable columns (default: all) ── */
  const searchableKeys = useMemo(
    () =>
      columns
        .filter((c) => c.searchable !== false)
        .map((c) => c.key),
    [columns],
  );

  /* ── Filter ── */
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      searchableKeys.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, search, searchableKeys]);

  /* ── Sort ── */
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => compare(a, b, sortKey, sortDir));
  }, [filtered, sortKey, sortDir]);

  /* ── Handle header click ── */
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      // Cycle: asc → desc → none
      setSortDir((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      {/* ── Toolbar ── */}
      {searchable && (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700">
          <div className="relative flex-1 max-w-sm">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Row count badge */}
          {!isLoading && (
            <span className="text-xs font-medium text-slate-400 bg-slate-700 px-3 py-1.5 rounded-full whitespace-nowrap">
              {sorted.length} {sorted.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      )}

      {/* ── Table ── */}
      {isLoading ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-6 py-3 text-left text-sm font-semibold text-slate-300"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))}
            </tbody>
          </table>
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center mb-4">
            <RiInboxLine className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-300 font-medium text-lg">{emptyMessage}</p>
          {emptySubMessage && (
            <p className="text-slate-500 text-sm mt-1">{emptySubMessage}</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                {columns.map((col) => {
                  const isSortable = col.sortable !== false;
                  const isActive = sortKey === col.key;

                  return (
                    <th
                      key={String(col.key)}
                      className={`px-6 py-3 text-left text-sm font-semibold text-slate-300 select-none ${
                        isSortable ? "cursor-pointer hover:text-white transition-colors" : ""
                      }`}
                      onClick={() => isSortable && handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {isSortable && isActive && sortDir === "asc" && (
                          <RiArrowUpSLine className="w-4 h-4 text-violet-400" />
                        )}
                        {isSortable && isActive && sortDir === "desc" && (
                          <RiArrowDownSLine className="w-4 h-4 text-violet-400" />
                        )}
                      </span>
                    </th>
                  );
                })}
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sorted.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-700/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-6 py-4 text-sm text-white"
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(item)}
                        title="Edit"
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors text-slate-400 hover:text-white"
                      >
                        <RiEdit2Line className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        title="Delete"
                        className="p-2 hover:bg-red-900/30 rounded-lg transition-colors text-slate-400 hover:text-red-400"
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
  );
}
