import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function JobFitScore() {
  const [jobDesc, setJobDesc] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  const analyze = async () => {
    if (!jobDesc) return alert("Add job description");

    const canUse = await checkUsageLimit();
    if (!canUse) return alert("Limit reached 🚀");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/job-fit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDesc,
          portfolio,
          resumeText: resume?.name || "",
        }),
      });

      const data = await res.json();
      setResult(data);

      await logActivity("Checked Job Fit");

    } catch {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          Job Fit Analyzer
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Check how well your profile matches a job
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-4 md:p-6 rounded-2xl space-y-4">

        {/* JOB DESC */}
        <textarea
          placeholder="Paste Job Description..."
          className="w-full p-3 bg-[#111] rounded-lg border border-gray-700 text-sm md:text-base"
          rows="5"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        {/* PORTFOLIO */}
        <input
          placeholder="Portfolio Link (optional)"
          className="w-full p-3 bg-[#111] rounded-lg border border-gray-700"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />

        {/* RESUME */}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-purple-500 transition"
        >
          {resume ? (
            <span className="text-green-400 text-sm">{resume.name}</span>
          ) : (
            <span className="text-gray-400 text-sm">
              Upload Resume (optional)
            </span>
          )}
        </div>

        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={(e) => setResume(e.target.files?.[0])}
        />

        {/* BUTTON */}
        <button
          onClick={analyze}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Fit"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mt-8 bg-[#1a1a1a] p-5 md:p-6 rounded-2xl"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Your Match Score
          </h2>

          {/* SCORE */}
          <div className="text-4xl font-bold text-purple-400 mb-4">
            {result.score}%
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-gray-700 h-3 rounded-full mb-4">
            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: `${result.score}%` }}
            />
          </div>

          {/* FEEDBACK */}
          {result.feedback && (
            <p className="text-gray-300 text-sm md:text-base">
              {result.feedback}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}