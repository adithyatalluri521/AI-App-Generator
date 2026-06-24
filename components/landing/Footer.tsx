"use client";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <h2 className="text-white font-bold">
          🚀 AI App Generator
        </h2>

        <p className="text-slate-500 mt-4 md:mt-0">
          © 2026 AI App Generator. Built with Next.js & Tailwind CSS.
        </p>

      </div>

    </footer>
  );
}