import { motion } from "framer-motion";
import {
  Layout,
  Cpu,
  Rocket,
  Users,
} from "lucide-react";

const steps = [
  {
    icon: Layout,
    title: "Build Your Portfolio",
    description: "Create your portfolio and website.",
    color: "bg-purple-200 text-purple-600",
  },
  {
    icon: Cpu,
    title: "AI Enhancement",
    description: "Optimize everything with AI.",
    color: "bg-blue-200 text-blue-600",
  },
  {
    icon: Users,
    title: "Practice",
    description: "Prepare with AI interviews.",
    color: "bg-green-200 text-green-600",
  },
  {
    icon: Rocket,
    title: "Get Hired",
    description: "Land your dream job.",
    color: "bg-pink-200 text-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#f3f4f6] text-black relative">

      {/* 🔥 BIG WHITE CONTAINER */}
      <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold">
            How It Works
          </h2>
          <p className="text-gray-500 mt-4">
            Simple steps to success
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* ICON */}
              <div className="flex justify-center mb-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${step.color}`}>
                  <step.icon size={26} />
                </div>
              </div>

              {/* TITLE */}
              <h3 className="font-semibold mb-2">
                {step.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-500">
                {step.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}