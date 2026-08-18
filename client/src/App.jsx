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
      <Header
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
        hasResults={hasResults}
      />
      <main>
        <Dashboard
          triggerAnalysis={triggerAnalysis}
          onAnalyzingChange={setIsAnalyzing}
          onResultsChange={setHasResults}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] mt-16 py-8 text-center">
        <p className="text-xs text-slate-600">
          TechScroll AI · Hackathon Demo ·{" "}
          <span className="text-brand-500">Semantic Interest Inference</span>{" "}
          · Anti-Hype Filter ·{" "}
          <span className="text-accent-purple">4 AI Agents</span>
        </p>
        <p className="text-[10px] text-slate-700 mt-1">
          Built with React + Vite + Tailwind + Express + Google Gemini
        </p>
      </footer>
    </div>
  );
}
