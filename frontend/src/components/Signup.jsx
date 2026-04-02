import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
          <input placeholder="Full Name" className="input" />
          <input placeholder="Email" className="input" />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="input"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              {show ? "🙈" : "👁️"}
            </span>
          </div>

          <input placeholder="Confirm Password" className="input" />

          <button className="w-full py-2 bg-black text-white rounded-xl">
            Create Account
          </button>

          <button className="w-full py-2 border rounded-xl">
            Sign up with Google
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}