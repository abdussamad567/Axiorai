import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

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

  // 🔥 MAIN FUNCTION
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
      setCaptions(data.captions);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <p className="text-gray-400 mb-2">AI Writing Tools /</p>
        <h1 className="text-5xl font-bold leading-tight">
          Free AI Caption Generator
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl">
          Generate engaging captions for Instagram, LinkedIn, Twitter, and more.
        </p>
      </motion.div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Caption this image...</h2>

          {/* DROP AREA */}
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all
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
              <p className="text-green-400">{file.name}</p>
            ) : (
              <>
                <div className="text-3xl mb-2">+</div>
                <p className="text-gray-400">
                  Drop your image here, or{" "}
                  <span className="text-orange-400 underline">select one</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG, GIF files less than 10MB
                </p>
              </>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="text-gray-400 text-sm">
              Description (optional)
            </label>
            <textarea
              className="w-full mt-2 bg-[#111] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
              placeholder="Type or paste your text here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <motion.button
            onClick={handleGenerate}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 transition-all py-3 rounded-xl font-semibold text-lg shadow-lg"
          >
            {loading ? "Generating..." : "✨ Generate Captions"}
          </motion.button>

          {/* OUTPUT */}
          {captions && (
            <div className="mt-6 bg-[#111] p-4 rounded-lg border border-gray-700 whitespace-pre-wrap">
              {captions}
            </div>
          )}
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Generate</h3>

          {/* VARIANTS */}
          <div className="mb-4">
            <label className="text-sm text-gray-400">Variants</label>
            <select
              value={variants}
              onChange={(e) => setVariants(e.target.value)}
              className="w-full mt-2 bg-[#111] border border-gray-700 rounded-lg p-2"
            >
              <option value={1}>1 variant</option>
              <option value={3}>3 variants</option>
              <option value={5}>5 variants</option>
            </select>
          </div>

          {/* TOGGLES */}
          <Toggle label="Add hashtags" value={hashtags} setValue={setHashtags} />
          <Toggle label="Add emojis" value={emojis} setValue={setEmojis} />
        </motion.div>
      </div>
    </div>
  );
}

/* TOGGLE COMPONENT */
function Toggle({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-300">{label}</span>
      <div
        onClick={() => setValue(!value)}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
          ${value ? "bg-orange-500" : "bg-gray-600"}
        `}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
            ${value ? "translate-x-6" : ""}
          `}
        />
      </div>
    </div>
  );
}