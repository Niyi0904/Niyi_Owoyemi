"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { RiLogoutBoxLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Skills", href: "/admin/skills" },
    { label: "Experience", href: "/admin/experience" },
    { label: "Testimonials", href: "/admin/testimonials" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Content", href: "/admin/content" },
    { label: "Messages", href: "/admin/messages" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin/dashboard" className="font-bold text-white text-lg">
            Admin Panel
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-violet-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <RiLogoutBoxLine className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <RiCloseLine className="w-6 h-6 text-white" />
              ) : (
                <RiMenu3Line className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
