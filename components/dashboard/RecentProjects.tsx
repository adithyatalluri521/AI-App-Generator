"use client";

export default function RecentProjects() {

  const projects = [
    {
      title: "Netflix Clone",
      framework: "Next.js",
    },
    {
      title: "Food Delivery App",
      framework: "React",
    },
    {
      title: "AI Chatbot",
      framework: "Next.js",
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Projects
      </h2>

      <div className="space-y-4">

        {projects.map((project) => (

          <div
            key={project.title}
            className="flex justify-between items-center rounded-xl bg-slate-800 p-4"
          >

            <div>

              <h3 className="text-white font-semibold">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {project.framework}
              </p>

            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
              Open
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}