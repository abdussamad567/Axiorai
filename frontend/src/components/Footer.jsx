import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = {
  tools: [
    { label: "Portfolio Builder", href: "/portfolio-builder" }, // ✅ fixed
    { label: "Website Builder", href: "#" },
    { label: "Cover Letter Generator", href: "#" },
    { label: "Interview Simulator", href: "#" },
    { label: "Job Fit Analyzer", href: "#" },
  ],
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Templates", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Career Guides", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  {
    icon: Twitter, // still use icon
    href: "https://x.com/AiAxior60779",
    label: "X",
  },
  {
    icon: Linkedin,
    href: "#",
  },
  {
    icon: Github,
    href: "#",
  },
  {
    icon: Mail,
    href: "mailto:axioraiapp@gmail.com", // ✅ EMAIL FIX
  },
];
export default function Footer() {
  return (
    <footer className="bg-[#f3f4f6] text-black relative">

      {/* 🔥 BIG WHITE CONTAINER */}
      <div className="absolute inset-6 bg-white rounded-[40px] shadow-lg"></div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* MAIN */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">

          {/* BRAND */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 font-semibold">
              <Sparkles className="text-purple-500" />
              AxiorAI
            </div>

            <p className="text-gray-500 text-sm mb-4">
              AI-powered career platform to build portfolios and land jobs faster.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold mb-3 capitalize">
                {key}
              </h4>

              <ul className="space-y-2 text-sm text-gray-500">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-black transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 py-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between">
          <p>© {new Date().getFullYear()} AxiorAI</p>
          <p>Built for ambitious professionals</p>
        </div>

      </div>
    </footer>
  );
}