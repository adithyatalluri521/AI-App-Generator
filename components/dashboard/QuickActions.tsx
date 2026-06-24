"use client";

import Link from "next/link";
import { Plus, Sparkles, FolderOpen } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <Link
          href="/generator"
          className="rounded-xl bg-blue-600 hover:bg-blue-700 transition p-5 text-white flex flex-col items-center"
        >
          <Sparkles size={34} />
          <span className="mt-3 font-semibold">
            Generate App
          </span>
        </Link>

        <Link
          href="/projects"
          className="rounded-xl bg-slate-800 hover:bg-slate-700 transition p-5 text-white flex flex-col items-center"
        >
          <FolderOpen size={34} />
          <span className="mt-3 font-semibold">
            My Projects
          </span>
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl bg-green-600 hover:bg-green-700 transition p-5 text-white flex flex-col items-center"
        >
          <Plus size={34} />
          <span className="mt-3 font-semibold">
            New Project
          </span>
        </Link>

      </div>

    </div>
  );
}