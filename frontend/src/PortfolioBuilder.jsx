import { useRef, useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";

export default function PortfolioBuilder() {

  const step3Ref = useRef(null);

  const goToStep3 = () => {
    step3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ STATE (MUST BE HERE)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
  });

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      {/* ================= STEP 1 ================= */}
      <section className="h-screen snap-start flex items-center justify-center bg-[#f3f4f6] text-black">

        <div className="w-[90%] h-[90%] bg-white rounded-[40px] shadow-xl relative overflow-hidden flex items-center justify-center">

          <div className="absolute left-10 top-1/2 -translate-y-1/2 rotate-[-20deg] animate-floatSlow">
            <div className="w-40 h-52 bg-blue-200 rounded-2xl shadow-lg"></div>
          </div>

          <div className="absolute right-20 top-32 rotate-[20deg] animate-floatSlow">
            <div className="w-40 h-52 bg-pink-200 rounded-2xl shadow-lg"></div>
          </div>

          <div className="text-center z-10">
            <h1 className="text-5xl font-semibold mb-6">
              Build Your Personal Website
            </h1>

            <p className="text-gray-600 mb-10 text-lg">
              Create a stunning portfolio in minutes with AI
            </p>

            <button
              onClick={goToStep3}
              className="px-8 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
            >
              Start Building →
            </button>
          </div>
        </div>
      </section>

      {/* ================= STEP 3 ================= */}
      <section
        ref={step3Ref}
        className="h-screen snap-start flex items-center justify-center bg-[#f3f4f6] text-black"
      >

        <div className="w-[90%] h-[90%] bg-white rounded-[40px] shadow-xl relative overflow-hidden">

          <div className="absolute left-10 bottom-10 rotate-[10deg] animate-float">
            <div className="w-32 h-44 bg-green-200 rounded-2xl shadow"></div>
          </div>

          <div className="absolute right-10 top-10 rotate-[-10deg] animate-floatSlow">
            <div className="w-36 h-48 bg-pink-200 rounded-2xl shadow"></div>
          </div>

          <div className="relative z-10 w-full h-full flex p-10 gap-10">

            {/* LEFT FORM */}
            <div className="w-1/2 overflow-y-auto pr-6 pb-10">

              <h2 className="text-2xl font-semibold mb-6">
                Enter Details
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input col-span-1"
                />

                <input
                  name="role"
                  onChange={handleChange}
                  placeholder="Your Role"
                  className="input col-span-1"
                />

                <textarea
                  name="bio"
                  onChange={handleChange}
                  placeholder="Short Bio"
                  className="input col-span-2"
                />

                <button className="col-span-2 w-full py-3 rounded-lg bg-black text-white hover:scale-105 transition">
                  Generate Portfolio
                </button>

              </div>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="w-1/2">

              <div className="w-full h-full bg-gray-100 rounded-2xl border overflow-y-auto">

                {/* ✅ LIVE PREVIEW */}
                <ModernTemplate data={formData} />

              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}