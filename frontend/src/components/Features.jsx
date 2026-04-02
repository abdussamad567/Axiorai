import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Layout,
  Globe,
  MessageSquare,
  PenTool,
  Target,
  Github,
  Search,
  Users,
  ArrowRight,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Portfolio Builder",
    description: "Create stunning, professional portfolios.",
    link: "/portfolio-builder",
  },
  {
    icon: Globe,
    title: "Website Builder",
    description: "Build your personal website in minutes.",
    link: "/website-builder", // ✅ FIXED
  },
  {
    icon: MessageSquare,
    title: "Caption Generator",
    description: "Generate engaging social media captions.",
    link: "/caption-generator",
  },
  {
    icon: PenTool,
    title: "Cover Letter AI",
    description: "Create personalized cover letters instantly.",
    link: "/cover-letter-generator",
  },
  {
    icon: Target,
    title: "Job Fit Score",
    description: "Analyze how well you match a job.",
    link: "JobFitScore", // ✅ FIXED
  },
  {
    icon: Github,
    title: "GitHub Portfolio",
    description: "Auto-sync your projects beautifully.",
    link: "/Github-Portfolio", // ✅ FIXED
  },
  {
    icon: Search,
    title: "Portfolio Critic",
    description: "AI feedback on your portfolio.",
    link: "/portfolio-critic", // ✅ FIXED
  },
  {
    icon: Users,
    title: "Interview Simulator",
    description: "Practice interviews with AI.",
    link: "#",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create ATS-friendly resumes with AI.",
    link: "/resume-builder",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#f3f4f6] text-black relative">

      {/* 🔥 BIG WHITE CONTAINER */}
      <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold">
            AI Tools to Build Your Career
          </h2>
          <p className="text-gray-500 mt-4">
            Everything you need in one platform.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <Link key={feature.title} to={feature.link}>

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <feature.icon className="mb-4 text-purple-500" />

                <h3 className="font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {feature.description}
                </p>

                <div className="mt-4 text-purple-500 flex items-center gap-1 text-sm">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}