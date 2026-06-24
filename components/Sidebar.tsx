"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
    },
    {
      name: "My Projects",
      href: "/projects",
      icon: "📁",
    },
    {
      name: "AI Generator",
      href: "/generator",
      icon: "🤖",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between min-h-screen border-r border-slate-800">

      <div>

        <div className="p-6 text-2xl font-bold">
          🚀 AI Generator
        </div>

        <nav className="mt-8 space-y-2 px-4">

          {menu.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>

          ))}

        </nav>

      </div>

      <div className="p-4">

        <button
          className="w-full rounded-lg bg-red-500 py-3 font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}