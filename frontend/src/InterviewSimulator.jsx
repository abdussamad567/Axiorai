import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function InterviewSimulator() {
  const [jobDesc, setJobDesc] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  // 🔥 START INTERVIEW
  const startInterview = async () => {
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached 🚀");
      return;
    }

    setLoading(true);

    const BASE_URL = "https://axiorai-backend.onrender.com";

try {
  await logActivity("Started Interview Simulator");

  const res = await fetch(`${BASE_URL}/interview`, {
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

  if (!res.ok) {
    throw new Error("Failed to generate interview questions");
  }

  const data = await res.json();

  setQuestions(data.questions);
  setCurrent(0);

} catch (err) {
  console.error(err);
  alert("Something went wrong ❌");
} finally {
  setLoading(false);
}
  };

  // NEXT QUESTION
  const nextQuestion = () => {
    const updated = [...answers];
    updated[current] = answer;
    setAnswers(updated);

    setAnswer("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("Interview Completed 🎉");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto mb-6"
      >
        <h1 className="text-2xl md:text-4xl font-bold">
          Interview Simulator
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Practice interviews with AI
        </p>
      </motion.div>

      {/* SETUP */}
      {questions.length === 0 && (
        <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-4 md:p-6 rounded-2xl space-y-4">

          <textarea
            placeholder="Paste Job Description..."
            className="w-full p-3 bg-[#111] rounded-lg border border-gray-700 text-sm md:text-base"
            rows="4"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <input
            placeholder="Portfolio Link"
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
                Click to upload resume
              </span>
            )}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => setResume(e.target.files?.[0])}
          />

          <button
            onClick={startInterview}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      )}

      {/* QUESTIONS UI */}
      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mt-8 bg-[#1a1a1a] p-5 md:p-6 rounded-2xl"
        >

          {/* PROGRESS */}
          <div className="mb-4 text-sm text-gray-400">
            Question {current + 1} of {questions.length}
          </div>

          {/* QUESTION */}
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            {questions[current]}
          </h2>

          {/* ANSWER */}
          <textarea
            placeholder="Type your answer..."
            className="w-full p-3 bg-[#111] rounded-lg border border-gray-700 text-sm md:text-base"
            rows="5"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={nextQuestion}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
          >
            Next →
          </button>
        </motion.div>
      )}
    </div>
  );
}