import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GithubPortfolio() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH REPOS
  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/github-repos/${username}`);
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      alert("Error fetching repos");
    }
    setLoading(false);
  };

  // 🔥 GENERATE README
  const generateReadme = async (repo) => {
    setSelectedRepo(repo);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/generate-readme", {
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
    } catch (err) {
      alert("Error generating README");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold">GitHub Portfolio</h1>
        <p className="text-gray-400">Auto-sync your GitHub projects</p>
      </motion.div>

      {/* INPUT */}
      <div className="mt-6 flex gap-3">
        <input
          placeholder="Enter GitHub username"
          className="flex-1 p-3 bg-[#111] rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={fetchRepos}
          className="bg-purple-600 px-4 rounded-lg"
        >
          Sync
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="mt-4 text-gray-400">Loading...</p>}

      {/* REPOS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            whileHover={{ scale: 1.03 }}
            className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer"
            onClick={() => generateReadme(repo)}
          >
            <h3 className="font-semibold">{repo.name}</h3>
            <p className="text-sm text-gray-400">
              {repo.description || "No description"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* README */}
      {selectedRepo && (
        <div className="mt-10 bg-[#1a1a1a] p-6 rounded-xl">
          <h2 className="text-xl mb-3">
            README for {selectedRepo.name}
          </h2>

          <pre className="whitespace-pre-wrap text-gray-300">
            {readme}
          </pre>
        </div>
      )}
    </div>
  );
}