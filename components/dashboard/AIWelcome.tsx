"use client";

import Link from "next/link";

export default function AIWelcome() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">

      <h1 className="text-4xl font-bold">
        🚀 Welcome to AI App Generator
      </h1>

      <p className="mt-4 text-lg">
        Build complete full-stack applications using AI.
      </p>

      <Link
        href="/generator"
        className="inline-block mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100"
      >
        Start Generating
      </Link>

    </div>
  );
}