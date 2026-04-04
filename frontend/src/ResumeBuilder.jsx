import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { logActivity } from "./utils/activity";

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

      await logActivity("Created Resume"); // ✅ FIXED

    } catch {
      setResume("❌ Error generating resume");
    }

    setLoading(false);
  };

  const copyResume = () => {
    if (!resume) return;
    const temp = document.createElement("div");
    temp.innerHTML = resume;
    navigator.clipboard.writeText(temp.innerText);
    alert("Copied ✅");
  };

  const downloadPDF = () => {
    if (!resumeRef.current) return;

    html2pdf()
      .set({
        margin: 10,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .from(resumeRef.current)
      .save();
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 md:px-6 py-6">

      {/* HEADER */}
      <h1 className="text-2xl md:text-4xl font-semibold text-center mb-8">
        AI Resume Builder 🚀
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-6">

        {/* LEFT FORM */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow space-y-4">

          {[
            "name","email","phone","location","role","experience"
          ].map((id) => (
            <input
              key={id}
              id={id}
              placeholder={id}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border"
            />
          ))}

          <textarea id="skills" placeholder="Skills" onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-lg border" />
          <textarea id="education" placeholder="Education" onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-lg border" />
          <textarea id="projects" placeholder="Projects" onChange={handleChange} className="w-full p-3 bg-gray-100 rounded-lg border" />

          <button
            onClick={generateResume}
            className="w-full py-3 rounded-xl bg-purple-600 text-white"
          >
            {loading ? "Generating..." : "Generate Resume"}
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">

          <h2 className="text-lg font-semibold mb-3">Preview</h2>

          {resume && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={copyResume} className="px-3 py-2 border rounded-lg text-sm">
                Copy
              </button>

              <button onClick={downloadPDF} className="px-3 py-2 bg-black text-white rounded-lg text-sm">
                Download
              </button>
            </div>
          )}

          {!resume && !loading && (
            <p className="text-gray-400">Preview will appear here</p>
          )}

          {loading && <p className="text-purple-500">Generating...</p>}

          {resume && (
            <div
              ref={resumeRef}
              className="bg-white text-black p-6 rounded shadow text-sm max-h-[500px] overflow-auto"
            >
              <div dangerouslySetInnerHTML={{ __html: resume }} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}