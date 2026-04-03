import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { motion } from "framer-motion";

export default function Account() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activities, setActivities] = useState([]);
  const [usage, setUsage] = useState(0);

  // ✅ Get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // ✅ Fetch USER-SPECIFIC data (IMPORTANT FIX 🔥)
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("AxiorAI")
        .select("*")
        .eq("user_id", user.id) // 🔥 IMPORTANT FIX
        .order("created_at", { ascending: false });

      if (!error) {
        setActivities(data);
        setUsage(data.length);
      }
    };

    fetchData();
  }, []);

  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "usage", label: "Usage" },
    { id: "billing", label: "Billing" },
    { id: "history", label: "History" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-semibold mb-6">AxiorAI</h2>

        <div className="space-y-3">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold capitalize">
            {activeTab}
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back {user?.email}
          </p>
        </div>

        {/* CONTENT SWITCH */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >

          {/* DASHBOARD (🔥 UPDATED) */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="font-semibold mb-4">Overview</h2>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow">
                <h3 className="text-lg mb-2">Your Credits</h3>

                <p className="text-3xl font-bold">
                  {usage} / 10
                </p>

                {/* PROGRESS BAR */}
                <div className="w-full bg-white/30 h-3 rounded-full mt-4">
                  <div
                    className="bg-white h-3 rounded-full transition-all"
                    style={{ width: `${(usage / 10) * 100}%` }}
                  />
                </div>

                {/* WARNING */}
                {usage >= 8 && (
                  <p className="mt-3 text-sm">
                    ⚠️ You are close to your limit
                  </p>
                )}

                <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
                  Upgrade Plan 🚀
                </button>
              </div>
            </div>
          )}

          {/* USAGE */}
          {activeTab === "usage" && (
            <div>
              <h2 className="font-semibold mb-4">Usage</h2>
              <p>Total actions: {usage}</p>
            </div>
          )}

          {/* BILLING */}
          {activeTab === "billing" && (
            <div>
              <h2 className="font-semibold mb-4">Billing</h2>
              <p>Current Plan: Free</p>

              <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
                Upgrade Plan
              </button>
            </div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <div>
              <h2 className="font-semibold mb-4">History</h2>

              {activities.length === 0 ? (
                <p className="text-gray-500">No activity yet</p>
              ) : (
                <ul className="space-y-2 text-sm text-gray-600">
                  {activities.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>✅ {item.action}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div>
              <h2 className="font-semibold mb-4">Settings</h2>
              <p>Email: {user?.email}</p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}