"use client";

type Project = {
  id: string;
  title: string;
  description: string;
  framework: string;
  createdAt: string;
};

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition duration-300">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-white">
            {project.title}
          </h2>

          <p className="text-slate-400 mt-3">
            {project.description}
          </p>

        </div>

        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">
          {project.framework}
        </span>

      </div>

      <div className="mt-6 text-sm text-slate-500">

        Created:
        {" "}
        {new Date(project.createdAt).toLocaleDateString()}

      </div>

      <div className="mt-6 flex gap-3">

        <button
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition rounded-lg py-2 text-white font-semibold"
        >
          ✏ Edit
        </button>

        <button
          className="flex-1 bg-red-500 hover:bg-red-600 transition rounded-lg py-2 text-white font-semibold"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}