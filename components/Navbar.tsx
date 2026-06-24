"use client";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-8 py-5">

      <div>
        <h1 className="text-3xl font-bold text-white">
          AI App Generator Dashboard 🚀
        </h1>

        <p className="text-slate-400 mt-1">
          Build AI-powered applications in seconds.
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-2xl hover:scale-110 transition">
          🔔
        </button>

        <button className="text-2xl hover:scale-110 transition">
          🌙
        </button>

        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="text-white font-semibold">
              Adithya
            </p>

            <p className="text-sm text-slate-400">
              Developer
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}