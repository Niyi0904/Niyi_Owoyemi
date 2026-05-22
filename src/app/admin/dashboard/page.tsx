"use client";

import Link from "next/link";
import {
  RiAwardLine,
  RiDoubleQuotesL,
  RiFileTextLine,
  RiInboxLine,
  RiSettings5Line,
  RiStackOverflowLine,
  RiTeamLine,
} from "react-icons/ri";

const collections = [
  {
    title: "Projects",
    description: "Manage portfolio case studies and project media.",
    icon: RiStackOverflowLine,
    href: "/admin/projects",
  },
  {
    title: "Skills",
    description: "Update tools, categories, and proficiency values.",
    icon: RiAwardLine,
    href: "/admin/skills",
  },
  {
    title: "Experience",
    description: "Maintain the professional timeline.",
    icon: RiTeamLine,
    href: "/admin/experience",
  },
  {
    title: "Testimonials",
    description: "Edit featured client quotes.",
    icon: RiDoubleQuotesL,
    href: "/admin/testimonials",
  },
  {
    title: "Blog",
    description: "Draft and publish writing entries.",
    icon: RiFileTextLine,
    href: "/admin/blog",
  },
  {
    title: "Content",
    description: "Edit hero, about, and social singleton docs.",
    icon: RiSettings5Line,
    href: "/admin/content",
  },
  {
    title: "Messages",
    description: "Read and manage contact submissions.",
    icon: RiInboxLine,
    href: "/admin/messages",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Manage the Firebase data that powers your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {collections.map((collection) => {
          const Icon = collection.icon;

          return (
            <Link
              key={collection.href}
              href={collection.href}
              className="group rounded-lg border border-slate-700 bg-slate-800 p-5 hover:border-violet-500/70 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-600/20 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white group-hover:text-violet-200">
                    {collection.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {collection.description}
                  </p>
                  <p className="text-sm font-medium text-violet-300 mt-4">
                    Manage -&gt;
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
