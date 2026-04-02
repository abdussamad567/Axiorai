import { useState } from "react";

export default function WebsiteBuilder() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) {
      alert("Please enter a prompt first!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/generate-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // ✅ ONLY THIS
      });

      const data = await response.json();

      console.log("Response:", data); // ✅ debug

      setHtml(data.html); // ✅ backend already cleaned

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Website Builder
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website... (e.g. gym, portfolio, restaurant)"
              className="w-full h-60 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded-xl overflow-hidden bg-white">
            {html ? (
              <iframe
                title="preview"
                sandbox="allow-same-origin"
                srcDoc={html}
                className="w-full h-[500px]"
              />
            ) : (
              <div className="flex items-center justify-center h-[500px] text-gray-400">
                Live preview will appear here...
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}