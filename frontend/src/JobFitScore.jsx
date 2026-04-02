import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function JobFitScore() {
  const [jobDesc, setJobDesc] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef(null);

  const analyze = async () => {
    if (!jobDesc) {
      alert("Please add job description");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/job-fit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: jobDesc,
          portfolio,
          resumeText: resume ? resume.name : "",
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // safety check
      if (!data.score) throw new Error("Invalid response");

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
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
        <h1 className="text-5xl font-bold">Job Fit Score</h1>
        <p className="text-gray-400 mt-3">
          Analyze how well you match a job using AI
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl"
        >
          <textarea
            placeholder="Paste Job Description..."
            className="w-full p-3 bg-[#111] rounded-lg"
            rows="4"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <input
            placeholder="Portfolio Link"
            className="w-full mt-4 p-3 bg-[#111] rounded-lg"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />

          {/* RESUME */}
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-4 border-2 border-dashed border-gray-600 p-6 text-center cursor-pointer hover:border-green-500 transition"
          >
            {resume ? (
              <span className="text-green-400">{resume.name}</span>
            ) : (
              "Upload Resume"
            )}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => setResume(e.target.files?.[0])}
          />

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={analyze}
            className="mt-6 w-full bg-green-600 py-3 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Job Fit"}
          </motion.button>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 mt-4">{error}</p>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1a1a1a] p-6 rounded-2xl"
        >
          <h3 className="mb-4 font-semibold">Tips</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Paste full job description</li>
            <li>• Upload resume</li>
            <li>• Add portfolio for better results</li>
          </ul>
        </motion.div>
      </div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6"
        >
          {/* SCORE */}
          <div className="bg-[#1a1a1a] p-6 rounded-2xl flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full">
                <circle cx="80" cy="80" r="70" stroke="#333" strokeWidth="10" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#22c55e"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * result.score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {result.score}%
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl">
            <h2 className="text-xl mb-4 font-semibold">Analysis</h2>

            <p className="mb-3">✅ Strengths: {result.strengths}</p>
            <p className="mb-3">⚠️ Missing Skills: {result.missing}</p>
            <p className="mb-3">💡 Suggestions: {result.suggestions}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}