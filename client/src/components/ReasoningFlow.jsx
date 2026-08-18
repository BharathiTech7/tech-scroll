import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flowNodes = [
  {
    reels: [
      { title: "Java Meme", signal: "Programming Signal 💻" },
      { title: "Coding Interview", signal: "Career Signal 🚀" },
      { title: "SE Lifestyle", signal: "Engineering Signal 🏗️" },
      { title: "Laptop Comparison", signal: "Technology Signal 🖥️" },
    ],
    pattern: "AI detects common pattern across all signals",
    inference: "SOFTWARE ENGINEERING",
    recommendation: "From Code to Production: What Software Engineers Actually Do"
  }
];

export default function ReasoningFlow({ recommendation, reelAnalyses }) {
  const [isOpen, setIsOpen] = useState(false);

  // Build dynamic nodes from actual reel analyses
  const signals = reelAnalyses?.slice(0, 5).map(a => ({
    title: a.topic?.split("—")[0]?.trim() || a.reelId,
    signal: a.semanticSignals?.[0] ? `${a.semanticSignals[0]} ${getSignalEmoji(a.semanticSignals[0])}` : "Signal detected"
  })) || flowNodes[0].reels;

  const recTitle = recommendation?.recommendation?.title || flowNodes[0].recommendation;
  const inference = recommendation?.interestDetected?.primary || flowNodes[0].inference;

  return (
    <div className="glass-card overflow-hidden">
      <button
        id="show-reasoning-btn"
        aria-expanded={isOpen}
        aria-controls="reasoning-flow-content"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-2xl">🔗</span>
          <div>
            <p className="font-semibold text-slate-100">{isOpen ? "Hide" : "Show"} AI Reasoning</p>
            <p className="text-xs text-slate-500 mt-0.5">Visual reasoning flow from interactions to recommendation</p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          aria-hidden="true"
          className="text-slate-400 text-lg flex-shrink-0"
        >▼</motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="reasoning-flow-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.05] p-5">
              <div className="flex flex-col items-center gap-0">
                {/* Reel signals */}
                <div className="grid grid-cols-2 gap-2 w-full mb-2">
                  {signals.map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-xl bg-dark-700/60 border border-white/[0.05] text-center"
                    >
                      <p className="text-xs font-medium text-slate-300 line-clamp-1">{node.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">↓</p>
                      <p className="text-[10px] text-brand-400 font-medium line-clamp-1">{node.signal}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Flow arrow */}
                <FlowArrow delay={0.5} />

                {/* Pattern detection */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-center mb-2"
                >
                  <p className="text-xs text-brand-300 font-medium">
                    🧠 AI detects cross-content pattern
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Multiple signals → Semantic relationship found
                  </p>
                </motion.div>

                <FlowArrow delay={0.7} />

                {/* Inferred domain */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-brand-500/20 to-accent-purple/20 border border-brand-500/40 text-center mb-2"
                >
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Primary Interest Inferred</p>
                  <p className="text-lg font-black text-gradient">{inference.toUpperCase()}</p>
                </motion.div>

                <FlowArrow delay={0.9} />

                {/* Anti-hype filter */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-2"
                >
                  <p className="text-xs text-emerald-400 font-medium">🛡️ Quality filter passed</p>
                </motion.div>

                <FlowArrow delay={1.1} />

                {/* Final recommendation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="w-full p-4 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 border border-white/10 text-center"
                >
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">✨ Recommended Tech Reel</p>
                  <p className="text-sm font-semibold text-slate-100">"{recTitle}"</p>
                </motion.div>

                {/* Anti-pattern note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-4 text-center text-[10px] text-slate-500 max-w-xs"
                >
                  ❌ NOT recommended: "Another Java Meme" (keyword match avoided)
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlowArrow({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-0.5 my-1"
    >
      <div className="w-0.5 h-3 bg-gradient-to-b from-brand-500/60 to-transparent rounded-full" />
      <span className="text-brand-500 text-xs">▼</span>
    </motion.div>
  );
}

function getSignalEmoji(signal) {
  const map = {
    "programming": "💻",
    "software": "🏗️",
    "career": "🚀",
    "hardware": "🖥️",
    "ai": "🤖",
    "cloud": "☁️",
    "security": "🔐",
    "gaming": "🎮",
    "web": "🌐",
  };
  for (const [key, emoji] of Object.entries(map)) {
    if (signal.toLowerCase().includes(key)) return emoji;
  }
  return "📡";
}
