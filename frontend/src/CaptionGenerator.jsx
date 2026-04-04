import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function CaptionGenerator() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState(true);
  const [emojis, setEmojis] = useState(true);
  const [variants, setVariants] = useState(3);
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          variants,
          hashtags,
          emojis,
        }),
      });

      const data = await res.json();

      const canUse = await checkUsageLimit();
      if (!canUse) {
        alert("Free limit reached 🚀");
        return;
      }

      setCaptions(data.captions);
      await logActivity("Generated Caption");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8 md:py-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 md:mb-10"
      >
        <p className="text-gray-400 text-sm mb-2">AI Writing Tools /</p>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          Free AI Caption Generator
        </h1>

        <p className="text-gray-400 mt-3 md:mt-4 max-w-xl text-sm md:text-base">
          Generate engaging captions for Instagram, LinkedIn, Twitter, and more.
        </p>
      </motion.div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4">
            Caption this image...
          </h2>

          {/* DROP */}
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl h-44 md:h-64 flex flex-col items-center justify-center cursor-pointer transition
              ${dragging ? "border-orange-500 bg-[#222]" : "border-gray-600"}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {file ? (
              <p className="text-green-400 text-sm">{file.name}</p>
            ) : (
              <>
                <div className="text-2xl md:text-3xl mb-2">+</div>
                <p className="text-gray-400 text-center text-sm">
                  Drop image or{" "}
                  <span className="text-orange-400 underline">select</span>
                </p>
              </>
            )}
          </div>

          {/* TEXTAREA */}
          <div className="mt-4 md:mt-6">
            <label className="text-gray-400 text-sm">
              Description (optional)
            </label>

            <textarea
              className="w-full mt-2 bg-[#111] border border-gray-700 rounded-lg p-3 text-sm md:text-base focus:ring-2 focus:ring-orange-500"
              rows="4"
              placeholder="Type here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <motion.button
            onClick={handleGenerate}
            whileTap={{ scale: 0.95 }}
            className="mt-5 md:mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold text-base md:text-lg"
          >
            {loading ? "Generating..." : "✨ Generate Captions"}
          </motion.button>

          {/* OUTPUT */}
          {captions && (
            <div className="mt-5 bg-[#111] p-4 rounded-lg border border-gray-700 text-sm whitespace-pre-wrap">
              {captions}
            </div>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1a1a1a] p-4 md:p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Generate Options
          </h3>

          {/* VARIANTS */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">Variants</label>
            <select
              value={variants}
              onChange={(e) => setVariants(e.target.value)}
              className="w-full mt-2 bg-[#111] border border-gray-700 rounded-lg p-2 text-sm"
            >
              <option value={1}>1 variant</option>
              <option value={3}>3 variants</option>
              <option value={5}>5 variants</option>
            </select>
          </div>

          <Toggle label="Add hashtags" value={hashtags} setValue={setHashtags} />
          <Toggle label="Add emojis" value={emojis} setValue={setEmojis} />
        </motion.div>
      </div>
    </div>
  );
}

/* TOGGLE */
function Toggle({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-300 text-sm">{label}</span>

      <div
        onClick={() => setValue(!value)}
        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition
          ${value ? "bg-orange-500" : "bg-gray-600"}
        `}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transition ${
            value ? "translate-x-5" : ""
          }`}
        />
      </div>
    </div>
  );
}