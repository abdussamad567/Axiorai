import { useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function PortfolioBuilder() {
  const stepRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
  });

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToBuilder = () => {
    stepRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerate = async () => {
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached. Upgrade 🚀");
      return;
    }

    setLoading(true);
    setHtml("");

    try {
      const res = await fetch("http://localhost:3000/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setHtml(data.html);

      await logActivity("Built Portfolio");
    } catch (err) {
      alert("Error generating portfolio");
    } finally {
      setLoading(false);
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file("index.html", html);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "portfolio.zip");
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-3xl md:text-5xl font-semibold mb-6">
          AI Portfolio Builder 🚀
        </h1>

        <button
          onClick={scrollToBuilder}
          className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
        >
          Start Building →
        </button>
      </section>

      {/* BUILDER */}
      <section ref={stepRef} className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-4 md:p-8"
        >

          {/* GRID */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* FORM */}
            <div className="w-full md:w-1/2 space-y-4">

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
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                {loading ? "Generating..." : "Generate Portfolio"}
              </button>

              {html && (
                <button
                  onClick={downloadZip}
                  className="w-full border py-3 rounded-xl"
                >
                  Download Website
                </button>
              )}
            </div>

            {/* PREVIEW */}
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow border bg-white">

                {/* Browser Bar */}
                <div className="bg-gray-100 p-2 flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>

                {/* CONTENT */}
                {loading ? (
                  <div className="p-6 text-gray-500">
                    Building your portfolio...
                  </div>
                ) : html ? (
                  <iframe
                    srcDoc={html}
                    className="w-full h-[400px] md:h-[600px]"
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <div className="p-6 text-gray-400">
                    Your AI portfolio will appear here...
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}