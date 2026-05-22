"use client";

import Link from "next/link";
import { RiFileTextLine, RiTeamLine, RiAwardLine, RiDoubleQuotesL, RiStackOverflowLine, RiSettings5Line } from "react-icons/ri";

export default function AdminDashboard() {
  const collections = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: RiStackOverflowLine,
      href: "/admin/projects",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Skills",
      description: "Update your technical skills",
      icon: RiAwardLine,
      href: "/admin/skills",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Experience",
      description: "Manage work experience entries",
      icon: RiTeamLine,
      href: "/admin/experience",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Testimonials",
      description: "Manage client testimonials",
      icon: RiDoubleQuotesL,
      href: "/admin/testimonials",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Blog",
      description: "Create and edit blog posts",
      icon: RiFileTextLine,
      href: "/admin/blog",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Content",
      description: "Edit static content (Hero, About, Social)",
      icon: RiSettings5Line,
      href: "/admin/content",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Manage your portfolio content and data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {collections.map((collection) => {
          const Icon = collection.icon;
          return (
            <Link
              key={collection.href}
              href={collection.href}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 hover:border-slate-600 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${collection.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{collection.title}</h3>
              <p className="text-sm text-slate-400">{collection.description}</p>
              <div className="mt-4 flex items-center text-violet-400 text-sm font-medium group-hover:gap-2 gap-0 transition-all">
                Manage <span className="ml-1">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Messages section */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Contact Messages</h2>
        <p className="text-slate-400 mb-4">View and manage contact form submissions</p>
        <Link
          href="/admin/messages"
          className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          View Messages
        </Link>
      </div>
    </div>
  );
}
