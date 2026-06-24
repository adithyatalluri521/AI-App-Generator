"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800">

      <div className="p-8">

        <h1 className="text-2xl font-bold text-white">
          🚀 AI Generator
        </h1>

      </div>

      <nav className="px-4 space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl p-4 text-slate-300 hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3 rounded-xl p-4 text-slate-300 hover:bg-slate-800"
        >
          <FolderOpen size={20} />
          Projects
        </Link>

        <Link
          href="/generator"
          className="flex items-center gap-3 rounded-xl p-4 text-slate-300 hover:bg-slate-800"
        >
          <Sparkles size={20} />
          AI Generator
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl p-4 text-slate-300 hover:bg-slate-800"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

      <div className="absolute bottom-8 left-4 right-4">

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 py-3 text-white">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}