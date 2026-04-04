import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activities, setActivities] = useState([]);
  const [usage, setUsage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("AxiorAI")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setActivities(data || []);
      setUsage(data?.length || 0);
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
    <div className="min-h-screen bg-gray-100 flex">

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b px-4 py-3 flex justify-between items-center z-50">
        <h2 className="font-semibold">AxiorAI</h2>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:flex w-64 bg-white border-r p-6 flex-col">
        <h2 className="text-xl font-semibold mb-8">AxiorAI</h2>

        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-left px-4 py-2 rounded-lg mb-2 transition ${
              activeTab === item.id
                ? "bg-purple-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-6"
            >
              <div className="flex justify-between mb-6">
                <h2>AxiorAI</h2>
                <X onClick={() => setIsSidebarOpen(false)} />
              </div>

              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className="block w-full text-left py-2"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 mt-14 md:mt-0">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold capitalize">
            {activeTab}
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back {user?.email}
          </p>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid gap-6 md:grid-cols-2">

            {/* CREDIT CARD */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow">
              <h3 className="text-lg">Your Credits</h3>

              <p className="text-4xl font-bold mt-2">
                {usage} / 10
              </p>

              <div className="w-full bg-white/30 h-2 rounded-full mt-4">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${(usage / 10) * 100}%` }}
                />
              </div>

              {usage >= 8 && (
                <p className="mt-3 text-sm">
                  ⚠️ You are close to your limit
                </p>
              )}

              <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
                Upgrade Plan 🚀
              </button>
            </div>

            {/* STATS CARD */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Usage Stats</h3>
              <p className="text-gray-500 text-sm">
                Total actions performed
              </p>

              <p className="text-3xl font-bold mt-4">{usage}</p>
            </div>

          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === "usage" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            Total actions: {usage}
          </div>
        )}

        {activeTab === "billing" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Current Plan: Free</p>
            <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
              Upgrade Plan
            </button>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            {activities.length === 0 ? (
              <p className="text-gray-500">No activity yet</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {activities.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.action}</span>
                    <span className="text-gray-400 text-xs">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            Email: {user?.email}
          </div>
        )}

      </div>
    </div>
  );
}