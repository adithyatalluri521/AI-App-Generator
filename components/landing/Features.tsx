"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Database,
  ShieldCheck,
  Code2,
  Rocket,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    title: "AI Code Generation",
    description:
      "Generate complete full-stack applications using advanced AI models.",
    icon: Brain,
  },
  {
    title: "Database Ready",
    description:
      "Automatically create Prisma models and PostgreSQL database structure.",
    icon: Database,
  },
  {
    title: "Authentication",
    description:
      "Built-in JWT authentication, login, register and protected routes.",
    icon: ShieldCheck,
  },
  {
    title: "Clean Architecture",
    description:
      "Modern Next.js App Router structure with reusable components.",
    icon: Code2,
  },
  {
    title: "One Click Deploy",
    description:
      "Deploy your generated application easily on Vercel.",
    icon: Rocket,
  },
  {
    title: "Beautiful Dashboard",
    description:
      "Manage all generated AI projects from a modern dashboard.",
    icon: LayoutDashboard,
  },
];

export default function Features() {
  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Everything you need to build modern AI-powered applications.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}