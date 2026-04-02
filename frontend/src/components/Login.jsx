import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Input = ({ label, type, value, onChange, rightIcon, onIconClick }) => (
  <div className="flex flex-col gap-1 relative">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
    />
    {rightIcon && (
      <span
        onClick={onIconClick}
        className="absolute right-3 top-9 cursor-pointer"
      >
        {rightIcon}
      </span>
    )}
  </div>
);

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-4">
          <Input label="Email" type="email" />
          <Input
            label="Password"
            type={show ? "text" : "password"}
            rightIcon={show ? "🙈" : "👁️"}
            onIconClick={() => setShow(!show)}
          />

          <button className="w-full py-2 bg-black text-white rounded-xl">
            Login
          </button>

          <button className="w-full py-2 border rounded-xl">
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}