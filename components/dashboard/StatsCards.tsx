"use client";

import { FolderOpen, Brain, Database, Users } from "lucide-react";

const stats = [
  {
    title: "Projects",
    value: "12",
    icon: FolderOpen,
    color: "text-blue-400",
  },
  {
    title: "AI Generations",
    value: "48",
    icon: Brain,
    color: "text-green-400",
  },
  {
    title: "Database",
    value: "Neon",
    icon: Database,
    color: "text-purple-400",
  },
  {
    title: "Users",
    value: "1",
    icon: Users,
    color: "text-orange-400",
  },
];

export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl bg-slate-900 border border-slate-800 p-6"
        >
          <item.icon
            className={`${item.color} mb-4`}
            size={40}
          />

          <h3 className="text-gray-400">
            {item.title}
          </h3>

          <h2 className="text-3xl font-bold text-white mt-2">
            {item.value}
          </h2>

        </div>
      ))}

    </div>
  );
}