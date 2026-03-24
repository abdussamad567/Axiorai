import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ResumeBuilder from "./ResumeBuilder";
import PortfolioBuilder from "./PortfolioBuilder"; // ✅ add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        {/* ✅ NEW ROUTE */}
        <Route path="/portfolio-builder" element={<PortfolioBuilder />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;