"use client";

export default function Stats() {
  const stats = [
    { value: "10+", label: "Technologies" },
    { value: "100%", label: "Responsive" },
    { value: "AI", label: "Powered" },
    { value: "24/7", label: "Available" },
  ];

  return (
    <section className="bg-slate-900 py-24">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

        {stats.map((item) => (

          <div
            key={item.label}
            className="text-center"
          >

            <h2 className="text-5xl font-bold text-blue-400">
              {item.value}
            </h2>

            <p className="text-slate-400 mt-4">
              {item.label}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}