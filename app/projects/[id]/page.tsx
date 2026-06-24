"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [framework, setFramework] = useState("Next.js");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    try {
      const response = await fetch("/api/projects/all");
      const data = await response.json();

      if (data.success) {
        const project = data.projects.find(
          (p: any) => p.id === projectId
        );

        if (!project) {
          alert("Project not found");
          router.push("/projects");
          return;
        }

        setTitle(project.title);
        setDescription(project.description);
        setFramework(project.framework);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  }

  async function updateProject() {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            framework,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Project Updated Successfully!");

        router.push("/projects");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">

      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-white mb-8">
          ✏ Edit Project
        </h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="w-full mb-6 p-4 rounded-lg bg-slate-800 text-white outline-none"
        >
          <option>Next.js</option>
          <option>React</option>
          <option>Node.js</option>
          <option>Python</option>
        </select>

        <div className="flex gap-4">

          <button
            onClick={() => router.push("/projects")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 rounded-lg py-3 text-white font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={updateProject}
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 text-white font-semibold"
          >
            {saving ? "Saving..." : "Update Project"}
          </button>

        </div>

      </div>

    </div>
  );
}