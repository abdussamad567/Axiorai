import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); // ✅ navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* 🔥 GLASS NAVBAR */}
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8 text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-black transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:text-black hover:bg-gray-100 transition"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm hover:scale-105 transition"
          >
            Get Started
          </button>
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
            {/* NAV LINKS */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* MOBILE BUTTONS */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-xl border text-gray-600"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}