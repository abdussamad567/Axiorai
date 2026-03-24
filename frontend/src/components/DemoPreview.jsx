import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Sparkles,
  Globe,
  CheckCircle2,
  ExternalLink,
  Eye,
} from "lucide-react";

export default function DemoPreview() {
  const navigate = useNavigate(); // ✅ navigation added

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#f3f4f6] text-black">

      {/* 🔥 BIG WHITE CONTAINER */}
      <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="mb-6 flex items-center gap-2 text-sm text-purple-500">
              <Sparkles className="w-4 h-4" />
              Portfolio & Website Builder
            </div>

            <h2 className="text-4xl font-semibold mb-6">
              Build your{" "}
              <span className="text-purple-500">
                digital presence
              </span>
            </h2>

            <p className="text-gray-600 mb-8">
              Create stunning portfolios and personal websites in minutes using AI.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Drag-and-drop editor",
                "Beautiful templates",
                "Custom domain",
                "GitHub sync",
                "Mobile responsive",
                "SEO optimized",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex gap-4">

              {/* 🔥 MAIN BUTTON (FIXED) */}
              <button
                onClick={() => navigate("/portfolio-builder")}
                className="px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition"
              >
                Create Portfolio
              </button>

              {/* SECONDARY */}
              <button className="px-6 py-3 rounded-full border border-gray-300 flex items-center gap-2 hover:border-purple-400 transition">
                <Eye className="w-4 h-4" />
                View Examples
              </button>

            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center">
                  <Layout className="text-purple-500" />
                  <span className="text-gray-700 text-sm">
                    Portfolio Builder
                  </span>
                </div>
                <span className="text-green-500 text-xs">Live</span>
              </div>

              {/* PREVIEW BLOCKS */}
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 h-16 rounded-lg" />
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Domain Ready
                </div>

                <div className="flex items-center gap-1 text-purple-500">
                  Open <ExternalLink className="w-3 h-3" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}