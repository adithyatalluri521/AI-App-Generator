"use client";

import { useState } from "react";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [framework, setFramework] = useState("Next.js");
  const [loading, setLoading] = useState(false);

  async function createProject() {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          framework,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Project Created Successfully!");

        setTitle("");
        setDescription("");
        setFramework("Next.js");

        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        Create New Project
      </h2>

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-700 text-white mb-4 outline-none"
      />

      <textarea
        rows={5}
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-700 text-white mb-4 outline-none"
      />

      <select
        value={framework}
        onChange={(e) => setFramework(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-700 text-white mb-6 outline-none"
      >
        <option>Next.js</option>
        <option>React</option>
        <option>Node.js</option>
        <option>Python</option>
      </select>

      <button
        onClick={createProject}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl p-4 text-white font-bold"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

    </div>
  );
}