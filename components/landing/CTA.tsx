"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-28">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-5xl font-bold text-white">
          Ready to Build with AI?
        </h2>

        <p className="text-slate-400 mt-8 text-xl">
          Create professional applications in minutes using artificial intelligence.
        </p>

        <Link
          href="/register"
          className="inline-block mt-10 rounded-xl bg-blue-600 px-10 py-4 text-white font-semibold hover:bg-blue-700 transition"
        >
          Start Building Free
        </Link>

      </div>

    </section>
  );
}