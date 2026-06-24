"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 h-20 bg-slate-950/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-10">

      <div className="flex items-center gap-4">

        <Search className="text-slate-500" />

        <input
          placeholder="Search..."
          className="bg-transparent outline-none text-white"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell className="text-slate-400" />

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

          A

        </div>

      </div>

    </header>
  );
}