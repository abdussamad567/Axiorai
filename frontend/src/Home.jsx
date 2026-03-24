import { useNavigate } from "react-router-dom"; // ✅ add this

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DemoPreview from "./components/DemoPreview";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  const navigate = useNavigate(); // ✅ add this

  return (
    <>
      <main style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
        
        <Navbar />

        {/* ✅ ADD THIS BUTTON (for now) */}
        

        <Hero />
        <Features />
        <HowItWorks />
        <DemoPreview />
        <Pricing />
        <Footer />

      </main>
    </>
  );
}