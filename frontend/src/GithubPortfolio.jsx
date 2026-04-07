import React, { useState } from "react";
import { motion } from "framer-motion";
import { logActivity } from "./utils/activity";
import { checkUsageLimit } from "./utils/usage";

export default function GithubPortfolio() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

const fetchRepos = async () => {
  const canUse = await checkUsageLimit();
  if (!canUse) {
    alert("Free limit reached 🚀");
    return;
  }

  setLoading(true);
  const BASE_URL = "https://axiorai-backend.onrender.com";

  try {
    const res = await fetch(`${BASE_URL}/github-repos/${username}`);

    if (!res.ok) {
      throw new Error("Failed to fetch repos");
    }

    const data = await res.json();
    setRepos(data);

    await logActivity("Synced GitHub Repos");

  } catch (err) {
    console.error(err);
    alert("Error fetching repos ❌");
  } finally {
    setLoading(false);
  }
};

const generateReadme = async (repo) => {
    const canUse = await checkUsageLimit();
    if (!canUse) {
      alert("Free limit reached 🚀");
      return;
    }

    setSelectedRepo(repo);
    setLoading(true);

    try {
      const BASE_URL = "https://axiorai-backend.onrender.com";

      const res = await fetch(`${BASE_URL}/generate-readme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repo.name,
          description: repo.description,
        }),
      });

      const data = await res.json();
      setReadme(data.readme);
      await logActivity("Generated README");
    } catch {
      alert("Error generating README");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 py-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-6"
      >
        <h1 className="text-2xl md:text-4xl font-bold">
          GitHub Portfolio
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Auto-sync your GitHub projects & generate README
        </p>
      </motion.div>

      {/* INPUT */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="Enter GitHub username"
          className="flex-1 p-3 bg-[#111] rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={fetchRepos}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold"
        >
          Sync
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400 text-center">Loading...</p>
      )}

      {/* REPOS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            whileHover={{ scale: 1.03 }}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-purple-500 transition cursor-pointer"
            onClick={() => generateReadme(repo)}
          >
            <h3 className="font-semibold text-lg truncate">
              {repo.name}
            </h3>

            <p className="text-sm text-gray-400 mt-2 line-clamp-3">
              {repo.description || "No description"}
            </p>

            <div className="mt-3 text-xs text-purple-400">
              Click to generate README →
            </div>
          </motion.div>
        ))}
      </div>

      {/* README */}
      {selectedRepo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-10 bg-[#1a1a1a] p-5 md:p-6 rounded-2xl border border-gray-800"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            README for {selectedRepo.name}
          </h2>

          <div className="bg-[#111] p-4 rounded-lg text-sm md:text-base text-gray-300 whitespace-pre-wrap border border-gray-700 max-h-[500px] overflow-y-auto">
            {readme}
          </div>
        </motion.div>
      )}
    </div>
  );
}