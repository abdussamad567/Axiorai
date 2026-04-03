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

    // ✅ CHECK LIMIT
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached 🚀");
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

      // ✅ TRACK
      await logActivity("Analyzed Portfolio");

    } catch (err) {
      alert("Error analyzing portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-5xl font-bold">Portfolio Critic</h1>
      </motion.div>

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

      {result && (
        <div className="mt-10">
          <p>Score: {result.score}</p>
        </div>
      )}
    </div>
  );
}