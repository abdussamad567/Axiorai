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
        headers: {"Content-Type": "application/json"},
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
    <div>
      <textarea value={jobDesc} onChange={(e)=>setJobDesc(e.target.value)} />
      <button onClick={analyze}>Analyze</button>
      {result && <p>{result.score}</p>}
    </div>
  );
}