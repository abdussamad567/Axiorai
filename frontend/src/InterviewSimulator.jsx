import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity"; // ✅ ADD THIS

await logActivity("Started Interview Simulator");

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

  // 🔥 GENERATE QUESTIONS
  const startInterview = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/interview", {
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

      const data = await res.json();

      setQuestions(data.questions);
      setCurrent(0);
    } catch (err) {
      alert("Error starting interview");
    }

    setLoading(false);
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
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold">Interview Simulator</h1>
        <p className="text-gray-400">Practice interviews with AI</p>
      </motion.div>

      {/* INPUTS */}
      {questions.length === 0 && (
        <div className="mt-6 space-y-4">

          <textarea
            placeholder="Job Description..."
            className="w-full p-3 bg-[#111] rounded-lg"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <input
            placeholder="Portfolio Link"
            className="w-full p-3 bg-[#111] rounded-lg"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />

          {/* RESUME */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed p-4 text-center cursor-pointer"
          >
            {resume ? resume.name : "Upload Resume"}
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => setResume(e.target.files?.[0])}
          />

          <button
            onClick={startInterview}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      )}

      {/* QUESTIONS */}
      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 bg-[#1a1a1a] p-6 rounded-xl"
        >
          <h2 className="text-xl mb-4">
            Question {current + 1} / {questions.length}
          </h2>

          <p className="mb-4 text-lg">{questions[current]}</p>

          <textarea
            placeholder="Your answer..."
            className="w-full p-3 bg-[#111] rounded-lg"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            onClick={nextQuestion}
            className="mt-4 bg-green-600 px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );
}