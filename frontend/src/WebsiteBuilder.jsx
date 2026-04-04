import { useState } from "react";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function WebsiteBuilder() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) {
      alert("Please enter a prompt first!");
      return;
    }

    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached. Upgrade 🚀");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/generate-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setHtml(data.result);

      await logActivity("Generated Website");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-6">

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-4 md:p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Website Builder
          </h2>
          <p className="text-gray-500 text-sm">
            Describe your website and generate instantly 🚀
          </p>
        </div>

        {/* GRID */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT - INPUT */}
          <div className="w-full md:w-1/2 flex flex-col">

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website... e.g. Portfolio for a developer"
              className="w-full min-h-[180px] md:h-60 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              {loading ? "Generating..." : "Generate Website"}
            </button>

          </div>

          {/* RIGHT - PREVIEW */}
          <div className="w-full md:w-1/2">

            <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

              {/* BROWSER BAR */}
              <div className="bg-gray-100 p-2 flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>

              {/* CONTENT */}
              {html ? (
                <iframe
                  srcDoc={html}
                  className="w-full h-[300px] md:h-[500px]"
                  sandbox="allow-same-origin"
                />
              ) : (
                <div className="flex items-center justify-center h-[300px] md:h-[500px] text-gray-400">
                  Preview will appear here...
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}