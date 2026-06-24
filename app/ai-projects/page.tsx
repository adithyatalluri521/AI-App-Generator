"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, FolderOpen, Trash2 } from "lucide-react";

type AIProject = {
  id: string;
  title: string;
  prompt: string;
  response: string;
  createdAt: string;
};

export default function AIProjectsPage() {
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadProjects() {
    try {
      const res = await fetch("/api/ai-projects");
      const data = await res.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this AI Project?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/ai-projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setProjects((prev) =>
          prev.filter((project) => project.id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const value = search.toLowerCase();

      return (
        project.title.toLowerCase().includes(value) ||
        project.prompt.toLowerCase().includes(value)
      );
    });
  }, [projects, search]);

  return (
    <div className="min-h-screen bg-slate-950 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              🤖 AI Projects
            </h1>

            <p className="text-slate-400 mt-2">
              {projects.length} AI Projects Generated
            </p>

          </div>

          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold"
          >
            ← Dashboard
          </Link>

        </div>

        <div className="relative mb-8">

          <Search
            className="absolute left-4 top-4 text-slate-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search AI Projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-5 text-white outline-none"
          />

        </div>

        {loading ? (

          <div className="text-center text-slate-400">
            Loading AI Projects...
          </div>

        ) : filteredProjects.length === 0 ? (

          <div className="bg-slate-900 rounded-2xl p-16 text-center">

            <FolderOpen
              size={60}
              className="mx-auto text-slate-600 mb-5"
            />

            <h2 className="text-3xl text-white font-bold">
              No AI Projects Found
            </h2>

            <p className="text-slate-400 mt-3">
              Try another search or generate a new project.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

            {filteredProjects.map((project) => (

              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-xl transition"
              >

                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>

                <p className="text-slate-400 mt-4 line-clamp-4">
                  {project.prompt}
                </p>

                <p className="text-slate-500 text-sm mt-6">
                  {new Date(project.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    href={`/ai-projects/${project.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-center text-white font-semibold"
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 rounded-xl flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}