import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, User } from "lucide-react";
import { supabase } from "../supabase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Auth state
  useEffect(() => {
    // get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div
        className={`w-[95%] mt-4 px-6 py-3 flex items-center justify-between
        rounded-full border transition-all duration-300
        ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md border-gray-200 shadow-md"
            : "bg-white/40 backdrop-blur-md border-gray-200"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-black">AxiorAI</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-gray-600">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* 🔥 AUTH SECTION */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              {/* USER EMAIL */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={16} />
                {user.email}
              </div>

              {/* ACCOUNT BUTTON */}
              <button
                onClick={() => navigate("/account")}
className="px-4 py-2 rounded-full bg-green-500 text-white text-sm hover:bg-green-700 transition"              >
                My Account
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-black text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-100"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 w-[90%] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:hidden"
          >
            {user ? (
              <>
                <p className="text-gray-700">{user.email}</p>

                <button
                  onClick={() => {
                    navigate("/account");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  My Account
                </button>

                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")}>Sign In</button>
                <button onClick={() => navigate("/signup")}>
                  Get Started
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}