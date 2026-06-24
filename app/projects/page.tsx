"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  framework: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    try {
      const response = await fetch("/api/projects/all");
      const data = await response.json();

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
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Project Deleted Successfully!");

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

  return (
    <div className="min-h-screen bg-slate-950 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold text-white">
            📁 My Projects
          </h1>

          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold"
          >
            ← Dashboard
          </Link>

        </div>

        {loading ? (

          <div className="text-center text-gray-400">
            Loading Projects...
          </div>

        ) : projects.length === 0 ? (

          <div className="bg-slate-900 rounded-xl p-10 text-center">

            <h2 className="text-2xl text-white font-bold">
              No Projects Found
            </h2>

            <p className="text-gray-400 mt-3">
              Create your first project from Dashboard.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (

              <div
                key={project.id}
                className="bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-blue-500/20 transition"
              >

                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>

                <p className="text-gray-400 mt-4">
                  {project.description}
                </p>

                <div className="mt-5">

                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {project.framework}
                  </span>

                </div>

                <p className="text-gray-500 text-sm mt-6">
                  Created:
                  {" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg py-2 text-white font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg py-2 text-white font-semibold"
                  >
                    Delete
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