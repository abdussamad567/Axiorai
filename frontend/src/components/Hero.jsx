import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Sparkles,
  CheckCircle2,
  Layout,
  Code2,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  // 🔥 Scroll to Features
  const handleDemoClick = () => {
    const el = document.getElementById("features");

    if (el) {
      const yOffset = -80; // adjust if navbar height
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#f3f4f6] text-black overflow-hidden px-4">

      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-10 bg-white/70 backdrop-blur-xl rounded-[40px] shadow-xl z-0"></div>

      {/* FLOATING CARDS */}
      <div className="absolute left-10 top-20 rotate-[-15deg] animate-float">
        <div className="w-32 h-44 bg-purple-200 rounded-2xl shadow"></div>
      </div>

      <div className="absolute right-20 top-32 rotate-[15deg] animate-floatSlow">
        <div className="w-36 h-48 bg-blue-200 rounded-2xl shadow"></div>
      </div>

      <div className="absolute left-40 bottom-20 rotate-[10deg] animate-float">
        <div className="w-28 h-40 bg-green-200 rounded-2xl shadow"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <div className="mb-4 text-purple-500 flex items-center gap-2">
            <Sparkles size={16} />
            AI Career Platform
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Build Your{" "}
            <span className="text-purple-500">
              Personal Brand
            </span>
          </h1>

          <p className="mt-4 text-gray-600">
            Create portfolios, websites, and land your dream job faster with AI.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">

            {/* START FREE */}
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition"
            >
              Start Free
            </button>

            {/* DEMO */}
            <button
              onClick={handleDemoClick}
              className="px-6 py-3 rounded-full border border-gray-300 hover:border-purple-400 transition flex items-center justify-center gap-2"
            >
              <Play size={16} /> Demo
            </button>

          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} /> Free
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} /> No card
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} /> AI tools
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
       <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="relative bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-xl overflow-hidden">

    {/* ✨ Glow */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

    <div className="relative z-10">

      {/* HEADER */}
      <p className="text-sm opacity-80 mb-1">
        AxiorAI 🚀
      </p>

      <h2 className="text-2xl font-bold mb-5">
        Your AI Career Platform
      </h2>

      {/* 🔥 FEATURES GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="bg-white/10 p-3 rounded-lg backdrop-blur flex items-center gap-2">
          ⚡ Portfolio Builder
        </div>

        <div className="bg-white/10 p-3 rounded-lg backdrop-blur flex items-center gap-2">
          🌐 Website Builder
        </div>

        <div className="bg-white/10 p-3 rounded-lg backdrop-blur flex items-center gap-2">
          ✍️ Cover Letter AI
        </div>

        <div className="bg-white/10 p-3 rounded-lg backdrop-blur flex items-center gap-2">
          📊 Job Fit Analyzer
        </div>

      </div>

      {/* CTA */}
      <button
        onClick={() => {
          const el = document.getElementById("features");
          if (el) {
            const yOffset = -80;
            const y =
              el.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
        className="mt-6 w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Explore Features →
      </button>

    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
}