export default function ModernTemplate({ data }) {
  return (
    <div className="p-8 space-y-8">

      {/* HERO */}
      <div>
        <h1 className="text-3xl font-bold">
          {data?.name || "Your Name"}
        </h1>

        <p className="text-purple-500 font-medium">
          {data?.role || "Your Role"}
        </p>

        <p className="mt-3 text-gray-600">
          {data?.bio || "Your bio will appear here"}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="border-t"></div>

      {/* SKILLS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Skills</h2>

        <div className="flex flex-wrap gap-2">
          {["React", "Tailwind", "JavaScript"].map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Projects</h2>

        <div className="space-y-2 text-sm text-gray-600">
          <p>• Portfolio Website</p>
          <p>• AI Resume Builder</p>
        </div>
      </div>

    </div>
  );
}