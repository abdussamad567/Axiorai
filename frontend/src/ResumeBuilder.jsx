import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [form, setForm] = useState({});
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const resumeRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    setResume("");

    try {
      const res = await fetch("http://localhost:3000/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResume(data.resume);
    } catch {
      setResume("❌ Error generating resume");
    }

    setLoading(false);
  };

  // Copy Resume
  const copyResume = () => {
    if (!resume) return;
    const temp = document.createElement("div");
    temp.innerHTML = resume;
    navigator.clipboard.writeText(temp.innerText);
    alert("Copied to clipboard ✅");
  };

  // Download PDF
  const downloadPDF = () => {
  if (!resumeRef.current) return;

  html2pdf()
    .set({
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // better quality
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(resumeRef.current)
    .save();
};

  return (
  <div className="min-h-screen bg-[#f3f4f6] text-black p-6 relative">

    {/* BIG WHITE CONTAINER */}
    <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

    <div className="relative">
      <h1 className="text-4xl font-semibold text-center mb-10">
        AI Resume Builder 🚀
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* LEFT FORM */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">

          {[
            { id: "name", placeholder: "Full Name" },
            { id: "email", placeholder: "Email" },
            { id: "phone", placeholder: "Phone" },
            { id: "location", placeholder: "Location" },
            { id: "role", placeholder: "Role" },
            { id: "experience", placeholder: "Experience (years)" },
          ].map((field) => (
            <input
              key={field.id}
              id={field.id}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          ))}

          <textarea
            id="skills"
            placeholder="Skills"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <textarea
            id="education"
            placeholder="Education"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <textarea
            id="projects"
            placeholder="Projects"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <button
            onClick={generateResume}
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-105 transition"
          >
            {loading ? "Generating..." : "Generate Resume"}
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-auto">

          <h2 className="text-xl font-semibold mb-4">Preview</h2>

          {/* ACTION BUTTONS */}
          {resume && (
            <div className="flex gap-3 mb-4">
              <button
                onClick={copyResume}
                className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
              >
                Copy
              </button>

              <button
                onClick={downloadPDF}
                className="px-4 py-2 rounded-full bg-black text-white text-sm"
              >
                Download PDF
              </button>
            </div>
          )}

          {!resume && !loading && (
            <p className="text-gray-500">
              Your resume will appear here...
            </p>
          )}

          {loading && (
            <p className="text-purple-500">
              Generating resume... ⏳
            </p>
          )}

          {/* PREVIEW */}
          {resume && (
            <div
              ref={resumeRef}
              className="bg-white text-black p-10 rounded shadow max-w-2xl mx-auto"
            >
              <div
                dangerouslySetInnerHTML={{ __html: resume }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);
}