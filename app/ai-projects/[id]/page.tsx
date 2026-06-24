"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Copy,
  Download,
  ArrowLeft,
  Trash2,
  Check,
} from "lucide-react";

type AIProject = {
  id: string;
  title: string;
  prompt: string;
  response: string;
  createdAt: string;
};

export default function AIProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<AIProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  async function loadProject() {
    try {
      const res = await fetch(`/api/ai-projects/${id}`);
      const data = await res.json();

      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  async function deleteProject() {
    if (!project) return;

    const ok = confirm(
      "Delete this AI Project permanently?"
    );

    if (!ok) return;

    const res = await fetch(
      `/api/ai-projects/${project.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      router.push("/ai-projects");
    }
  }

  function copyResponse() {
    if (!project) return;

    navigator.clipboard.writeText(project.response);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function downloadMarkdown() {
    if (!project) return;

    const blob = new Blob(
      [project.response],
      {
        type: "text/markdown",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${project.title}.md`;

    a.click();

    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-xl">
        Loading AI Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto py-12 px-8">

        <button
          onClick={() => router.back()}
          className="mb-8 bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-10">

          <h1 className="text-5xl font-bold">
            {project.title}
          </h1>

          <p className="text-slate-400 mt-3">
            {new Date(project.createdAt).toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-4 mt-8 mb-10">

            <button
              onClick={copyResponse}
              className="bg-slate-800 hover:bg-slate-700 rounded-xl px-5 py-3 flex items-center gap-2"
            >
              {copied ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}

              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={downloadMarkdown}
              className="bg-green-600 hover:bg-green-700 rounded-xl px-5 py-3 flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </button>

            <button
              onClick={deleteProject}
              className="bg-red-600 hover:bg-red-700 rounded-xl px-5 py-3 flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>

          </div>

          <div className="prose prose-invert prose-lg max-w-none">

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.response}
            </ReactMarkdown>

          </div>

        </div>

      </div>

    </div>
  );
}