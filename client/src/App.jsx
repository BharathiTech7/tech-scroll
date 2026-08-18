import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triggerAnalysis, setTriggerAnalysis] = useState(0);
  const [hasResults, setHasResults] = useState(false);

  const handleRunAnalysis = () => {
    setTriggerAnalysis(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Skip link for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
        hasResults={hasResults}
      />

      <main id="main-content" aria-label="TechScroll AI dashboard">
        <Dashboard
          triggerAnalysis={triggerAnalysis}
          onAnalyzingChange={setIsAnalyzing}
          onResultsChange={setHasResults}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] mt-16 py-8 text-center" role="contentinfo">
        <p className="text-xs text-slate-400">
          TechScroll AI · Hackathon Demo ·{" "}
          <span className="text-brand-400">Semantic Interest Inference</span>{" "}
          · Anti-Hype Filter ·{" "}
          <span className="text-purple-400">4 AI Agents</span>
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          Built with React + Vite + Tailwind + Express + Google Gemini
        </p>
      </footer>
    </div>
  );
}
