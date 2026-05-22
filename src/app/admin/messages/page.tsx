"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  deleteDocument,
  fetchCollection,
  updateDocument,
} from "@/lib/firebase/firestore";
import type { ContactMessage } from "@/types";
import {
  RiDeleteBin6Line,
  RiInboxLine,
  RiMailOpenLine,
  RiMailUnreadLine,
  RiSearchLine,
} from "react-icons/ri";

type MessageRecord = ContactMessage & {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "object" && "toDate" in value) {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function formatDate(value: unknown) {
  const date = toDate(value);
  if (!date) return "Unknown date";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function timestamp(value: unknown) {
  return toDate(value)?.getTime() ?? 0;
}

export default function AdminMessagesPage() {
  const [query, setQuery] = useState("");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => fetchCollection<MessageRecord>("messages"),
  });

  const messages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? data.filter((message) =>
          [message.name, message.email, message.subject, message.message]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(normalizedQuery))
        )
      : data;

    return [...filtered].sort(
      (a, b) => timestamp(b.createdAt) - timestamp(a.createdAt)
    );
  }, [data, query]);

  const unreadCount = data.filter((message) => !message.read).length;

  const toggleRead = async (message: MessageRecord) => {
    await updateDocument("messages", message.id, { read: !message.read });
    await refetch();
  };

  const removeMessage = async (message: MessageRecord) => {
    if (!window.confirm(`Delete message from ${message.name}?`)) return;
    await deleteDocument("messages", message.id);
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-slate-400 mt-1">
            Review contact form submissions stored in Firestore.
          </p>
        </div>
        <div className="rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-slate-300">
          {unreadCount} unread
        </div>
      </div>

      <div className="relative max-w-md">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500"
        />
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-slate-400">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800 py-16 px-4">
          <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center mb-4">
            <RiInboxLine className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-300 font-medium">No messages found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-lg border p-5 ${
                message.read
                  ? "bg-slate-800 border-slate-700"
                  : "bg-violet-950/30 border-violet-700/60"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-white">
                      {message.subject || "No subject"}
                    </h2>
                    {!message.read && (
                      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-200">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {message.name} &lt;{message.email}&gt; - {formatDate(message.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleRead(message)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600 transition-colors"
                  >
                    {message.read ? (
                      <RiMailUnreadLine className="w-4 h-4" />
                    ) : (
                      <RiMailOpenLine className="w-4 h-4" />
                    )}
                    {message.read ? "Unread" : "Read"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMessage(message)}
                    className="rounded-lg bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 transition-colors"
                    aria-label="Delete message"
                  >
                    <RiDeleteBin6Line className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-200">
                {message.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
