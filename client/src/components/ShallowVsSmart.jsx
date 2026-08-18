import { motion } from "framer-motion";

export default function ShallowVsSmart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-brand">⚖️ Comparison</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">Shallow vs Smart Recommendation</h3>
      <p className="text-xs text-slate-500 mb-6">
        Why TechScroll AI is different from keyword-based systems
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Shallow System */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">❌</span>
            <p className="font-semibold text-rose-400 text-sm">Keyword-Based System</p>
          </div>

          <div className="space-y-2">
            {[
              { node: "Java Meme", type: "input" },
              { node: "↓", type: "arrow" },
              { node: "Extracts: 'Java' keyword", type: "process" },
              { node: "↓", type: "arrow" },
              { node: "Match: 'Java' content", type: "process" },
              { node: "↓", type: "arrow" },
              { node: '"Another Java Reel"', type: "output-bad" },
            ].map((item, i) => renderNode(item, i, false))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <p className="text-[11px] text-rose-300">
              🚫 Surface-level. Ignores context. Repetitive. Not educational.
            </p>
          </div>
        </motion.div>

        {/* Smart System */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✅</span>
            <p className="font-semibold text-emerald-400 text-sm">TechScroll AI Agent</p>
          </div>

          <div className="space-y-2">
            {[
              { node: "Java + Interview + SE Lifestyle + Laptop", type: "input-multi" },
              { node: "↓", type: "arrow" },
              { node: "Agent 1: Semantic reel analysis", type: "process-good" },
              { node: "↓", type: "arrow" },
              { node: "Agent 2: Cross-reel pattern detection", type: "process-good" },
              { node: "↓", type: "arrow" },
              { node: "Interest: Software Engineering (0.91)", type: "inference" },
              { node: "↓", type: "arrow" },
              { node: "Agent 3: Generate semantic reel", type: "process-good" },
              { node: "↓", type: "arrow" },
              { node: "Agent 4: Quality filter", type: "process-good" },
              { node: "↓", type: "arrow" },
              { node: '"From Code to Production: What SWEs Actually Do"', type: "output-good" },
            ].map((item, i) => renderNode(item, i, true))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-[11px] text-emerald-300">
              ✅ Semantic. Educational. Relevant. Quality-filtered.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function renderNode({ node, type }, i, isSmart) {
  if (type === "arrow") {
    return (
      <div key={i} className="text-center">
        <span className={`text-xs ${isSmart ? "text-emerald-500/60" : "text-rose-500/60"}`}>▼</span>
      </div>
    );
  }

  const styles = {
    "input": "bg-dark-700/60 border-white/10 text-slate-300 text-xs",
    "input-multi": "bg-dark-700/60 border-white/10 text-slate-300 text-[10px]",
    "process": "bg-rose-500/10 border-rose-500/20 text-rose-300 text-[10px]",
    "process-good": "bg-brand-500/10 border-brand-500/20 text-brand-300 text-[10px]",
    "inference": "bg-purple-500/10 border-purple-500/30 text-purple-300 text-xs font-semibold",
    "output-bad": "bg-rose-500/20 border-rose-500/30 text-rose-300 text-xs font-medium",
    "output-good": "bg-emerald-500/20 border-emerald-500/30 text-emerald-300 text-xs font-medium",
  };

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.06 }}
      className={`px-3 py-2 rounded-lg border text-center ${styles[type] || "text-slate-400 text-xs"}`}
    >
      {node}
    </motion.div>
  );
}
