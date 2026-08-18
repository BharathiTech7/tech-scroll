import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DIFFICULTY_CONFIG } from "../data/config";

export default function RecommendationCard({ recommendation, validation, explanation }) {
  const [showRejected, setShowRejected] = useState(false);

  if (!recommendation?.recommendation) return null;

  const rec = recommendation.recommendation;
  const diffConfig = DIFFICULTY_CONFIG[rec.difficulty] || DIFFICULTY_CONFIG["Intermediate"];
  const qualityPct = Math.round((validation?.qualityScore || 0.9) * 100);

  return (
    <div className="space-y-4">
      {/* Main Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative glass-card overflow-hidden"
      >
        {/* Glow top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 via-accent-purple to-accent-cyan" />
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-brand">⚡ AI RECOMMENDATION</span>
                {validation?.passed && (
                  <span className="badge badge-emerald">🛡️ Quality Verified</span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {rec.title}
              </h2>
            </div>
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-2xl shadow-glow-brand">
              ✨
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-5 leading-relaxed">{rec.description}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <MetaBox label="Category" value={rec.category} icon="📂" />
            <MetaBox label="Subcategory" value={rec.subcategory} icon="🏷️" />
            <MetaBox
              label="Difficulty"
              value={rec.difficulty}
              icon="📊"
              valueClass={diffConfig.color}
            />
            <MetaBox
              label="Confidence"
              value={recommendation.confidence}
              icon="🎯"
              valueClass={
                recommendation.confidence === "High" ? "text-emerald-400" :
                recommendation.confidence === "Medium" ? "text-amber-400" : "text-rose-400"
              }
            />
          </div>

          {/* Quality Score */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 border border-white/[0.05] mb-5">
            <span className="text-lg">🛡️</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-400">Quality Score</span>
                <span className="text-xs font-semibold text-emerald-400">{qualityPct}%</span>
              </div>
              <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${qualityPct}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          {rec.tags && (
            <div className="flex flex-wrap gap-2 mb-5">
              {rec.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-dark-700/60 border border-white/[0.05] text-[11px] text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Why section */}
          <div className="rounded-xl bg-dark-700/40 border border-brand-500/20 p-4">
            <h3 className="text-sm font-semibold text-brand-300 mb-3 flex items-center gap-2">
              <span>💡</span> Why This Recommendation?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{rec.reason}</p>

            {/* Reasoning checklist */}
            {explanation?.reasoningSteps && (
              <div className="space-y-2">
                {explanation.reasoningSteps.slice(0, 5).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-xs text-slate-400"
                  >
                    <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                    <span>{step.replace(/^✓\s*/, "")}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Shallow alternative avoided */}
          {recommendation.shallowAlternativeAvoided && (
            <div className="mt-4 p-3 rounded-xl bg-dark-700/30 border border-white/[0.05]">
              <p className="text-[11px] text-slate-500 flex items-start gap-2">
                <span className="text-amber-400 shrink-0">⚠️</span>
                <span><span className="text-amber-400 font-medium">Shallow match avoided: </span>{recommendation.shallowAlternativeAvoided}</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Rejected Recommendation Card */}
      {recommendation.rejectedRecommendation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card border border-rose-500/20 overflow-hidden"
        >
          <button
            id="show-rejected-btn"
            aria-expanded={showRejected}
            aria-controls="rejected-rec-content"
            onClick={() => setShowRejected(!showRejected)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-rose-500/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-lg">❌</span>
              <div>
                <p className="text-sm font-semibold text-rose-400">Rejected Recommendation</p>
                <p className="text-xs text-slate-500">Click to see what the AI filtered out</p>
              </div>
            </div>
            <span aria-hidden="true" className="text-slate-400 text-sm">{showRejected ? "▲" : "▼"}</span>
          </button>

          <AnimatePresence>
            {showRejected && (
              <motion.div
                id="rejected-rec-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-rose-500/20 px-4 pb-4 overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                    <p className="text-sm text-rose-300 line-through opacity-70">
                      "{recommendation.rejectedRecommendation.title}"
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-rose-400 shrink-0">🚫</span>
                    <span><span className="text-rose-400 font-medium">Rejection reason: </span>
                    {recommendation.rejectedRecommendation.rejectionReason}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function MetaBox({ label, value, icon, valueClass }) {
  return (
    <div className="p-3 rounded-xl bg-dark-700/50 border border-white/[0.05]">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{icon} {label}</p>
      <p className={`text-sm font-semibold ${valueClass || "text-slate-200"}`}>{value}</p>
    </div>
  );
}
