import { motion } from "framer-motion";

export default function Header({ onRunAnalysis, isAnalyzing, hasResults }) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.05]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/30 via-dark-900 to-accent-purple/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              role="img"
              aria-label="TechScroll AI logo"
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-2xl shadow-glow-brand"
            >
              <span aria-hidden="true">🎯</span>
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-3xl font-black tracking-tight"
              >
                <span className="text-gradient">TechScroll</span>
                <span className="text-white"> AI</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-slate-400 font-medium"
              >
                Turn your scrolling into smarter learning.
              </motion.p>
            </div>
          </div>

          {/* Status & Action */}
          <div className="flex items-center gap-3">
            {hasResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Analysis Complete</span>
              </motion.div>
            )}

            <motion.button
              id="run-analysis-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              aria-label={isAnalyzing ? "Running AI analysis, please wait" : "Run AI analysis on selected reels"}
              aria-busy={isAnalyzing}
              className="btn-brand flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <span aria-hidden="true">⚡</span>
                  Run AI Analysis
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Tagline chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {[
            { icon: "🧠", text: "Semantic AI" },
            { icon: "🚫", text: "No Keyword Matching" },
            { icon: "🛡️", text: "Anti-Hype Filter" },
            { icon: "📚", text: "Education First" },
          ].map(chip => (
            <span
              key={chip.text}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400"
            >
              <span aria-hidden="true">{chip.icon}</span>
              {chip.text}
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
