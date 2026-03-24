import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  CheckCircle2,
  Layout,
  Code2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#f3f4f6] text-black overflow-hidden px-4">

      {/* 🌈 BIG ROUNDED BACKGROUND */}
      <div className="absolute inset-10 bg-white rounded-[40px] shadow-xl"></div>

      {/* 🌈 FLOATING CARDS */}
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

          <h1 className="text-5xl font-semibold leading-tight">
            Build Your{" "}
            <span className="text-purple-500">
              Personal Brand
            </span>
          </h1>

          <p className="mt-4 text-gray-600">
            Create portfolios, websites, and land your dream job faster with AI.
          </p>

          <div className="mt-6 flex gap-4">

            {/* PRIMARY */}
            <button className="px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition">
              Start Free
            </button>

            {/* SECONDARY */}
            <button className="px-6 py-3 rounded-full border border-gray-300 hover:border-purple-400 transition flex items-center gap-2">
              <Play size={16} /> Demo
            </button>

          </div>

          <div className="mt-6 flex gap-4 text-sm text-gray-500">
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
          <div className="bg-white p-6 rounded-2xl shadow-lg border">

            <div className="mb-4 text-sm text-gray-500">
              AxiorAI Dashboard
            </div>

            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-sm">Portfolio Score</p>
              <p className="text-2xl font-bold">95%</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-100 p-3 rounded">
                <Layout size={18} />
                <p className="text-sm mt-1">Website Live</p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <Code2 size={18} />
                <p className="text-sm mt-1">Projects Synced</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}