"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 mb-8">
            <Sparkles size={18} />
            <span>AI Powered Development Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            Build Full Stack Apps
            <span className="block text-blue-400">
              with Artificial Intelligence
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-400 max-w-3xl mx-auto">
            Generate production-ready applications, authentication,
            databases, APIs, dashboards and deployment guides using AI.
          </p>

          <div className="mt-12 flex justify-center gap-5">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-8 py-4 hover:bg-slate-900 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}