import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);

  const generateLetter = async () => {
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached 🚀");
      return;
    }

    try {
      setLoading(true);

     const BASE_URL = "https://axiorai-backend.onrender.com";

const res = await fetch(`${BASE_URL}/generate-cover-letter`, {
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

      await logActivity("Generated Cover Letter");
    } catch (err) {
      alert("Error generating cover letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8 md:py-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 md:mb-10"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          AI Cover Letter Generator
        </h1>

        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Generate personalized cover letters using AI
        </p>
      </motion.div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl"
        >

          <Input label="Job Title" value={jobTitle} setValue={setJobTitle} />
          <Input label="Company" value={company} setValue={setCompany} />

          {/* JOB DESCRIPTION */}
          <textarea
            placeholder="Paste Job Description..."
            className="w-full mt-4 p-3 bg-[#111] rounded-lg text-sm md:text-base border border-gray-700 focus:ring-2 focus:ring-purple-500"
            rows="4"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          {/* RESUME UPLOAD */}
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-4 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500 transition"
          >
            {resumeFile ? (
              <p className="text-green-400 text-sm">{resumeFile.name}</p>
            ) : (
              <p className="text-gray-400 text-sm">
                Click to upload resume (PDF, DOCX)
              </p>
            )}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => setResumeFile(e.target.files?.[0])}
          />

          {/* BUTTON */}
          <motion.button
            onClick={generateLetter}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold text-sm md:text-base"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </motion.button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl"
        >
          <h3 className="mb-4 font-semibold">Tips</h3>

          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Paste full job description</li>
            <li>• Upload resume for better results</li>
            <li>• Keep inputs detailed</li>
          </ul>
        </motion.div>
      </div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-10 bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-lg md:text-xl mb-4 font-semibold">
            Generated Letter
          </h2>

          <div className="bg-[#111] p-4 rounded-lg text-sm md:text-base whitespace-pre-wrap border border-gray-700">
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* INPUT */
function Input({ label, value, setValue }) {
  return (
    <input
      placeholder={label}
      className="w-full mt-4 p-3 bg-[#111] rounded-lg text-sm md:text-base border border-gray-700 focus:ring-2 focus:ring-purple-500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}