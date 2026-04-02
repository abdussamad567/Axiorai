import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);

  // 🔥 API CALL
  const generateLetter = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/generate-cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          company,
          jobDescription: jobDesc,
          resumeText: resumeFile ? resumeFile.name : "",
        }),
      });

      const data = await res.json();
      setResult(data.coverLetter);
    } catch (err) {
      console.error(err);
      alert("Error generating cover letter");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <h1 className="text-5xl font-bold">AI Cover Letter Generator</h1>
        <p className="text-gray-400 mt-3">
          Generate personalized cover letters using AI
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl">

          <Input label="Job Title" value={jobTitle} setValue={setJobTitle} />
          <Input label="Company" value={company} setValue={setCompany} />

          {/* JOB DESCRIPTION */}
          <textarea
            placeholder="Paste Job Description..."
            className="w-full mt-4 p-3 bg-[#111] rounded-lg"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          {/* RESUME UPLOAD */}
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-4 border-2 border-dashed border-gray-600 p-6 text-center cursor-pointer"
          >
            {resumeFile ? resumeFile.name : "Upload Resume"}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => setResumeFile(e.target.files?.[0])}
          />

          {/* BUTTON */}
          <button
            onClick={generateLetter}
            className="mt-6 w-full bg-purple-600 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl">
          <h3 className="mb-4">Tips</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Paste full job description</li>
            <li>• Upload resume for better results</li>
            <li>• Keep inputs detailed</li>
          </ul>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div className="max-w-6xl mx-auto mt-10 bg-[#1a1a1a] p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Generated Letter</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <input
      placeholder={label}
      className="w-full mt-4 p-3 bg-[#111] rounded-lg"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}