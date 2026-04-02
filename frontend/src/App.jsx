import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ResumeBuilder from "./ResumeBuilder";
import PortfolioBuilder from "./PortfolioBuilder";
import WebsiteBuilder from "./WebsiteBuilder";

import Login from "./components/Login";
import Signup from "./components/Signup";

import CaptionGenerator from "./CaptionGenerator";
import CoverLetterGenerator from "./CoverLetterGenerator";
import JobFitScore from "./JobFitScore";
import GithubPortfolio from "./GithubPortfolio";
import PortfolioCritic from "./PortfolioCritic";
import InterviewSimulator from "./InterviewSimulator";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
        <Route path="/website-builder" element={<WebsiteBuilder />} />

        <Route path="/caption-generator" element={<CaptionGenerator />} />
        <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />

        {/* 🔥 THIS FIXES YOUR ERROR */}
        <Route path="/JobFitScore" element={<JobFitScore />} />
        <Route path="/github-portfolio" element={<GithubPortfolio />} />
        <Route path="/portfolio-critic" element={<PortfolioCritic />} />
        <Route path="/interview-simulator" element={<InterviewSimulator />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;