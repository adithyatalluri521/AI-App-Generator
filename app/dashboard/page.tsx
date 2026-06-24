"use client";

import { useEffect, useState } from "react";

import AIWelcome from "@/components/dashboard/AIWelcome";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjects from "@/components/dashboard/RecentProjects";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

type DashboardStats = {
  totalUsers: number;
  totalProjects: number;
  aiProjects: number;
  todayProjects: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    aiProjects: 0,
    todayProjects: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <main className="pt-24 px-10 pb-10 space-y-8">

          <AIWelcome />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <p className="text-slate-400">Total Users</p>
              <h2 className="text-4xl font-bold text-white mt-3">
                {stats.totalUsers}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <p className="text-slate-400">Manual Projects</p>
              <h2 className="text-4xl font-bold text-blue-400 mt-3">
                {stats.totalProjects}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <p className="text-slate-400">AI Projects</p>
              <h2 className="text-4xl font-bold text-green-400 mt-3">
                {stats.aiProjects}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <p className="text-slate-400">Today's Projects</p>
              <h2 className="text-4xl font-bold text-yellow-400 mt-3">
                {stats.todayProjects}
              </h2>
            </div>

          </div>

          <QuickActions />

          <RecentProjects />

        </main>

      </div>

    </div>
  );
}