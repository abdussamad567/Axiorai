import { useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function PortfolioBuilder() {
  const step3Ref = useRef(null);

  const goToStep3 = () => {
    step3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
  });

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 GENERATE PORTFOLIO
  const handleGenerate = async () => {

    // ✅ CHECK USAGE LIMIT
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached. Upgrade your plan 🚀");
      return;
    }

    setLoading(true);
    setHtml("");

    try {
      const res = await fetch("http://localhost:3000/generate-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setHtml(data.html);

      // ✅ TRACK ACTIVITY
      await logActivity("Built Portfolio");

    } catch (err) {
      console.error(err);
      alert("Error generating portfolio");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DOWNLOAD ZIP
  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file("index.html", html);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "portfolio.zip");
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative bg-[#f3f4f6]">

      {/* FLOATING CARDS */}
      <div className="absolute left-10 top-20 rotate-[-15deg] z-0">
        <div className="w-32 h-44 bg-purple-200 rounded-2xl shadow"></div>
      </div>

      <div className="absolute right-20 top-32 rotate-[15deg] z-0">
        <div className="w-36 h-48 bg-blue-200 rounded-2xl shadow"></div>
      </div>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center z-10 relative">
          <h1 className="text-5xl font-semibold mb-6">
            AI Portfolio Builder 🚀
          </h1>

          <button
            onClick={goToStep3}
            className="px-8 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
          >
            Start Building →
          </button>
        </div>
      </section>

      {/* BUILDER */}
      <section
        ref={step3Ref}
        className="h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[90%] h-[90%] bg-white/70 backdrop-blur-xl rounded-[40px] shadow-xl flex p-10 gap-10 relative z-10"
        >

          {/* LEFT FORM */}
          <div className="w-1/2 space-y-4">

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="role"
              placeholder="Your Role"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />

            <textarea
              name="bio"
              placeholder="Your Bio"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />

            <button
              onClick={handleGenerate}
              className="w-full bg-black text-white py-3 rounded-xl hover:scale-105 transition"
            >
              {loading ? "Generating..." : "Generate Portfolio"}
            </button>

            {html && (
              <button
                onClick={downloadZip}
                className="w-full border py-3 rounded-xl hover:scale-105 transition"
              >
                Download Website
              </button>
            )}
          </div>

          {/* RIGHT PREVIEW */}
          <motion.div
            className="w-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border bg-white">

              {/* Browser UI */}
              <div className="bg-gray-100 p-2 flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>

              {/* CONTENT */}
              {loading ? (
                <div className="p-6 text-gray-500">
                  <p>Building your portfolio...</p>
                </div>
              ) : html ? (
                <iframe
                  srcDoc={html}
                  className="w-full h-[600px]"
                  sandbox="allow-same-origin"
                />
              ) : (
                <div className="p-6 text-gray-400">
                  Your AI portfolio will appear here...
                </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
}