import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReelCard from "../components/ReelCard";
import InterestCard from "../components/InterestCard";
import RecommendationCard from "../components/RecommendationCard";
import AgentPipeline from "../components/AgentPipeline";
import ReasoningFlow from "../components/ReasoningFlow";
import ShallowVsSmart from "../components/ShallowVsSmart";
import { fetchReels, analyzeReels } from "../services/api";


const DEMO_REEL_IDS = ["reel_01", "reel_02", "reel_03", "reel_04", "reel_06", "reel_11"];

export default function Dashboard({ triggerAnalysis = 0, onAnalyzingChange, onResultsChange }) {
  const [reels, setReels] = useState([]);
  const [selectedReelIds, setSelectedReelIds] = useState(new Set(DEMO_REEL_IDS));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState("mock");
  const resultsRef = useRef(null);

  // Trigger from header button
  useEffect(() => {
    if (triggerAnalysis > 0) handleRunAnalysis();
  }, [triggerAnalysis]);

  // Load reels on mount
  useEffect(() => {
    fetchReels()
      .then(data => setReels(data.reels || []))
      .catch(() => {
        // Fallback: will use mock reels from server when server starts
        setReels([]);
      });
  }, []);

  const toggleReel = (id) => {
    setSelectedReelIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    onAnalyzingChange?.(true);
    setPipelineStep(0);
    setError(null);
    setResults(null);

    try {
      // Animate pipeline steps
      for (let step = 1; step <= 4; step++) {
        setPipelineStep(step);
        await new Promise(r => setTimeout(r, step === 4 ? 600 : 900));
      }

      const reelIds = Array.from(selectedReelIds);
      const data = await analyzeReels(reelIds.length > 0 ? reelIds : []);
      setResults(data);
      setProvider(data.pipeline?.provider || "mock");
      onResultsChange?.(true);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      setError(err.message || "Analysis failed. Make sure the server is running.");
    } finally {
      setIsAnalyzing(false);
      onAnalyzingChange?.(false);
      setPipelineStep(5); // complete
    }
  };


  const selectedReels = reels.filter(r => selectedReelIds.has(r.id));
  const interests = results?.interestProfile?.interests || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">

      {/* ─── Section 1: Your Recent Reels ──────────────────────────── */}
      <section aria-labelledby="section-reels-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label" aria-hidden="true">📱 Your Recent Reels</p>
            <h2 id="section-reels-heading" className="text-xl font-bold text-white">Interaction History</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500" aria-live="polite" aria-atomic="true">
              {selectedReelIds.size} selected
            </span>
            <button
              onClick={() => setSelectedReelIds(new Set(DEMO_REEL_IDS))}
              aria-label="Reset reel selection to hackathon demo scenario"
              className="btn-secondary text-xs py-1.5 px-3"
            >
              Reset Demo
            </button>
          </div>
        </div>

        <div
          role="group"
          aria-label="Select reels to include in AI analysis"
          className="scroll-row no-scrollbar pb-3"
        >
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isSelected={selectedReelIds.has(reel.id)}
              onToggle={toggleReel}
              index={i}
            />
          ))}
          {reels.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-12 text-slate-500 text-sm">
              {isAnalyzing ? "Loading reels..." : "Start the server to load reels, or click Run AI Analysis for demo mode"}
            </div>
          )}
        </div>

        {reels.length > 0 && (
          <p className="text-xs text-slate-500 mt-2">
            Press Enter or Space on a reel to select or deselect it for analysis.
          </p>
        )}
      </section>

      {/* ─── Section 2: Run Analysis + Pipeline ─────────────────────── */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Left: CTA card */}
        <div className="md:col-span-2 glass-card p-6 flex flex-col justify-between">
          <div>
            <span className="badge badge-brand mb-3">🎯 Demo Mode</span>
            <h2 className="text-2xl font-bold text-white mb-2">
              Hackathon Demo Scenario
            </h2>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              The selected reels represent the{" "}
              <span className="text-amber-400 font-medium">"built-in trap"</span> scenario:
              Java meme + SE lifestyle + coding interview + laptop comparison.
              A shallow system would say "user likes Java." Watch what our AI infers instead.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {selectedReels.slice(0, 4).map(reel => (
                <div key={reel.id} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {reel.title}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
            >
              ⚠️ {error}
              <button
                onClick={handleRunAnalysis}
                className="ml-2 underline text-rose-300"
              >
                Retry
              </button>
            </motion.div>
          )}

          <motion.button
            id="dashboard-run-btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="btn-brand w-full text-base py-4 flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Running AI Pipeline...
              </>
            ) : (
              <>⚡ Run AI Analysis</>
            )}
          </motion.button>
        </div>

        {/* Right: Pipeline visualization */}
        <AgentPipeline
          currentStep={pipelineStep}
          isComplete={pipelineStep === 5}
        />
      </section>

      {/* ─── Results Section ─────────────────────────────────────────── */}
      <AnimatePresence>
        {results && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-live="polite"
            aria-label="AI analysis results"
            className="space-y-10"
          >
            {/* Provider badge */}
            <div className="flex items-center gap-2">
              <span className={`badge ${provider === "mock" ? "badge-amber" : "badge-emerald"}`}>
                {provider === "mock" ? "⚡ Mock Mode" : `🤖 ${provider.toUpperCase()} API`}
              </span>
              <span className="text-xs text-slate-500">
                Analyzed {results.pipeline?.reelsAnalyzed} reels
                {results.pipeline?.retries > 0 && ` • ${results.pipeline.retries} quality retry(ies)`}
              </span>
            </div>

            {/* ─── Section 3: AI Detected Interests ─────────────── */}
            <section>
              <p className="section-label">🧠 AI Analysis</p>
              <h2 className="text-xl font-bold text-white mb-1">Detected Interests</h2>
              <p className="text-sm text-slate-500 mb-5">
                {results.interestProfile?.interestPattern ||
                  "Inferred from semantic analysis of your reel history"}
              </p>

              {/* Primary interest hero */}
              {results.interestProfile?.primaryInterest && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-5 mb-5 border-brand-500/30 bg-brand-500/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Primary Interest</p>
                      <h3 className="text-2xl font-black text-gradient mb-1">
                        {results.interestProfile.primaryInterest.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Score: <span className="text-brand-300 font-semibold font-mono">
                          {results.interestProfile.primaryInterest.score?.toFixed(2)}
                        </span>
                        {" · "}
                        <span className="text-emerald-400">
                          {results.interestProfile.primaryInterest.confidence} Confidence
                        </span>
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-3xl shadow-glow-brand animate-float">
                      🏗️
                    </div>
                  </div>

                  {results.interestProfile.primaryInterest.evidence && (
                    <div className="mt-4 grid md:grid-cols-3 gap-2">
                      {results.interestProfile.primaryInterest.evidence.map((ev, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                          <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                          {ev}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* All interests grid */}
              {interests.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interests.map((interest, i) => (
                    <InterestCard key={interest.name} interest={interest} index={i} />
                  ))}
                </div>
              )}

              {/* Dominant domain */}
              {results.interestProfile?.dominantDomain && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 p-4 rounded-xl bg-dark-700/30 border border-white/[0.05] flex items-center gap-3"
                >
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-xs text-slate-500">Dominant Domain</p>
                    <p className="text-base font-bold text-white">{results.interestProfile.dominantDomain}</p>
                  </div>
                </motion.div>
              )}
            </section>

            {/* ─── Section 4: Recommendation ────────────────────── */}
            <section>
              <p className="section-label">✨ AI Output</p>
              <h2 className="text-xl font-bold text-white mb-5">Recommended Tech Reel</h2>
              <RecommendationCard
                recommendation={results.recommendation}
                validation={results.validation}
                explanation={results.explanation}
              />
            </section>

            {/* ─── Section 5: Reasoning Flow ────────────────────── */}
            <section>
              <p className="section-label">🔬 Explainability</p>
              <ReasoningFlow
                recommendation={results.recommendation}
                reelAnalyses={results.reelAnalyses || []}
              />
            </section>

            {/* ─── Section 6: Shallow vs Smart ──────────────────── */}
            <section>
              <p className="section-label">⚖️ Intelligence Gap</p>
              <ShallowVsSmart />
            </section>

            {/* ─── Reel Analyses Detail (Collapsible) ───────────── */}
            {results.reelAnalyses && results.reelAnalyses.length > 0 && (
              <ReelAnalysesDetail analyses={results.reelAnalyses} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Default: Shallow vs Smart (always visible) ──────────────── */}
      {!results && !isAnalyzing && (
        <section>
          <p className="section-label">⚖️ Why TechScroll AI is Different</p>
          <ShallowVsSmart />
        </section>
      )}
    </div>
  );
}

function ReelAnalysesDetail({ analyses }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        id="show-reel-analyses-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 glass-card flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div>
          <p className="section-label mb-0">🔍 Agent 1 Output</p>
          <p className="text-sm font-semibold text-slate-300">Reel Semantic Analyses (Raw)</p>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-slate-400">▼</motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {analyses.map((a, i) => (
                <motion.div
                  key={a.reelId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-4 text-xs"
                >
                  <p className="font-mono text-brand-400 mb-2">{a.reelId}</p>
                  <p className="font-semibold text-slate-200 mb-1 text-sm">{a.topic}</p>
                  <p className="text-slate-500 mb-2">{a.context}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <MetaChip label="Tech" value={a.technologyRelevance} />
                    <MetaChip label="Education" value={a.educationalValue} />
                    <MetaChip label="Career" value={a.careerRelevance} />
                    <MetaChip label="Entertainment" value={a.entertainmentLevel} />
                  </div>
                  {a.semanticSignals && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {a.semanticSignals.map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-dark-700/60 text-slate-500 text-[9px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MetaChip({ label, value }) {
  const colorMap = {
    "Very High": "text-emerald-400",
    "High": "text-brand-400",
    "Medium": "text-amber-400",
    "Low": "text-slate-500",
    "Very Low": "text-rose-400"
  };
  return (
    <div className="flex items-center justify-between gap-1">
      <span className="text-slate-600">{label}:</span>
      <span className={colorMap[value] || "text-slate-400"}>{value}</span>
    </div>
  );
}
