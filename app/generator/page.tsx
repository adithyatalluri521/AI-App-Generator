"use client";

import { useState } from "react";
import {
  Sparkles,
  Copy,
  Download,
  Check,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateAI() {
    if (!prompt) {
      alert("Enter a prompt");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("AI Generation Failed");
    }

    setLoading(false);
  }

  function copyResponse() {
    navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function downloadMarkdown() {
    const blob = new Blob([result], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "AI_Project.md";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto py-14 px-8">

        <div className="mb-10">

          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🤖 AI App Generator
          </h1>

          <p className="text-slate-400 text-lg">
            Describe your application and AI will generate a complete software architecture.
          </p>

        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Build an E-Commerce Website using Next.js, Prisma, PostgreSQL and JWT..."
            className="w-full rounded-2xl bg-slate-950 border border-slate-700 p-6 outline-none text-lg resize-none"
          />

          <div className="flex gap-4 mt-6">

            <button
              onClick={generateAI}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition rounded-xl px-8 py-4 flex items-center gap-3 font-semibold"
            >
              <Sparkles size={20} />

              {loading ? "🤖 AI Thinking..." : "Generate App"}
            </button>

            {result && (
              <>
                <button
                  onClick={copyResponse}
                  className="bg-slate-800 hover:bg-slate-700 rounded-xl px-6 flex items-center gap-2"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}

                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={downloadMarkdown}
                  className="bg-green-700 hover:bg-green-600 rounded-xl px-6 flex items-center gap-2"
                >
                  <Download size={18} />

                  Download
                </button>
              </>
            )}

          </div>

        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-10">

          <h2 className="text-4xl font-bold mb-8">
            AI Response
          </h2>

          {loading ? (

            <div className="space-y-4 animate-pulse">

              <div className="h-5 bg-slate-700 rounded w-2/3"></div>

              <div className="h-5 bg-slate-700 rounded w-full"></div>

              <div className="h-5 bg-slate-700 rounded w-5/6"></div>

              <div className="h-5 bg-slate-700 rounded w-1/2"></div>

              <div className="text-cyan-400 pt-4">
                🤖 Designing Database...
              </div>

            </div>

          ) : result ? (

            <article className="prose prose-invert prose-lg max-w-none">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="bg-slate-800 px-2 py-1 rounded"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>

            </article>

          ) : (

            <div className="text-center py-24 text-slate-500">

              <Sparkles
                size={60}
                className="mx-auto mb-6 text-slate-700"
              />

              <p className="text-xl">
                AI response will appear here...
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}