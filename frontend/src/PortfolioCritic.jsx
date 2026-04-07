import React, { useState } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function PortfolioCritic() {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!link) {
      alert("Enter portfolio link");
      return;
    }

    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached 🚀");
      return;
    }

setLoading(true);
setResult(null);

const BASE_URL = "https://axiorai-backend.onrender.com";

try {
  const res = await fetch(`${BASE_URL}/portfolio-critic`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze portfolio");
  }

  const data = await res.json();
  setResult(data);

  await logActivity("Analyzed Portfolio");

} catch (err) {
  console.error(err);
  alert("Something went wrong ❌");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-6 text-center"
      >
        <h1 className="text-2xl md:text-4xl font-bold">
          Portfolio Critic
        </h1>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Analyze your portfolio and get AI feedback
        </p>
      </motion.div>

      {/* INPUT CARD */}
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl">

        <input
          placeholder="Paste your portfolio link..."
          className="w-full p-4 bg-[#111] rounded-xl border border-gray-700 focus:ring-2 focus:ring-purple-500"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={analyze}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Portfolio"}
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
            Your Portfolio Score
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
            <div className="text-gray-300 text-sm md:text-base space-y-2">
              {Array.isArray(result.feedback)
                ? result.feedback.map((f, i) => <p key={i}>• {f}</p>)
                : <p>{result.feedback}</p>}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}