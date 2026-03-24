import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    desc: "Perfect for beginners",
    features: ["1 portfolio", "Basic AI tools", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    desc: "Best for professionals",
    features: ["Unlimited portfolios", "Advanced AI", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For teams",
    features: ["Team tools", "API access", "Dedicated support"],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-[#f3f4f6] text-black relative">

      {/* 🔥 BIG WHITE CONTAINER */}
      <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold">
            Pricing Plans
          </h2>
          <p className="text-gray-500 mt-4">
            Choose what fits you best
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-2xl border transition shadow-sm
              ${
                plan.popular
                  ? "border-purple-400 bg-white shadow-md"
                  : "border-gray-200 bg-white"
              }`}
            >

              {/* 🔥 POPULAR BADGE */}
              {plan.popular && (
                <div className="mb-3 text-purple-600 text-sm flex items-center gap-1">
                  <Zap size={14} /> Popular
                </div>
              )}

              <h3 className="text-xl font-semibold">
                {plan.name}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                {plan.desc}
              </p>

              <p className="text-3xl font-bold mb-6">
                {plan.price}
              </p>

              {/* FEATURES */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <button
                className={`w-full py-3 rounded-full transition
                ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-105"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                Get Started
              </button>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}