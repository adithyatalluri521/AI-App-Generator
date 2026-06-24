"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  framework: string;
  createdAt: string;
};

export default function ProjectList() {
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

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-10">
        Loading Projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-10 text-center">
        <h2 className="text-2xl text-white font-bold">
          No Projects Yet 🚀
        </h2>

        <p className="text-slate-400 mt-3">
          Create your first AI project above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}