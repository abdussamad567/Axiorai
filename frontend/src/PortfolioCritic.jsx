import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PortfolioCritic() {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!link) {
      alert("Enter portfolio link");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/portfolio-critic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error analyzing portfolio");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-5xl font-bold">Portfolio Critic</h1>
        <p className="text-gray-400 mt-3">
          Get AI feedback on your portfolio
        </p>
      </motion.div>

      {/* INPUT */}
      <div className="max-w-4xl mt-8">
        <input
          placeholder="Paste your portfolio link..."
          className="w-full p-4 bg-[#111] rounded-xl"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={analyze}
          className="mt-4 bg-purple-600 px-6 py-3 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze Portfolio"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 grid md:grid-cols-2 gap-6"
        >
          {/* SCORE */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <h2 className="text-xl mb-3">Overall Score</h2>
            <p className="text-4xl font-bold text-purple-400">
              {result.score}/10
            </p>
          </div>

          {/* FEEDBACK */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <p>✅ Strengths: {result.strengths}</p>
            <p className="mt-2">⚠️ Weaknesses: {result.weaknesses}</p>
            <p className="mt-2">💡 Improvements: {result.improvements}</p>
            <p className="mt-2">🎯 UX Tips: {result.ux}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}