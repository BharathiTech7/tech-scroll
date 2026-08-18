import { motion } from "framer-motion";

const scoreColorMap = [
  { min: 0.8, bar: "from-emerald-500 to-teal-500", text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { min: 0.6, bar: "from-brand-500 to-violet-500", text: "text-brand-400", bg: "bg-brand-500/10 border-brand-500/20" },
  { min: 0.4, bar: "from-amber-500 to-orange-500", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { min: 0.0, bar: "from-rose-500 to-red-500", text: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
];

function getScoreColor(score) {
  return scoreColorMap.find(c => score >= c.min) || scoreColorMap[scoreColorMap.length - 1];
}

const typeBadgeMap = {
  "Primary": "bg-brand-500/20 text-brand-300 border-brand-500/30",
  "Explicit": "bg-brand-500/20 text-brand-300 border-brand-500/30",
  "Implicit": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Emerging": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Secondary": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Weak": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const confidenceDot = {
  "High": "bg-emerald-400",
  "Medium": "bg-amber-400",
  "Low": "bg-rose-400",
};

export default function InterestCard({ interest, index }) {
  const colors = getScoreColor(interest.score);
  const typeBadge = typeBadgeMap[interest.type] || typeBadgeMap["Secondary"];
  const dotColor = confidenceDot[interest.confidence] || "bg-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`glass-card p-4 border ${colors.bg}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{interest.emoji}</span>
          <div>
            <p className="font-semibold text-sm text-white leading-tight">{interest.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              <span className="text-[10px] text-slate-400">{interest.confidence} Confidence</span>
            </div>
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeBadge} whitespace-nowrap`}>
          {interest.type}
        </span>
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Interest Score</span>
          <span className={`text-sm font-bold font-mono ${colors.text}`}>
            {interest.score?.toFixed(2)}
          </span>
        </div>
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(interest.score || 0) * 100}%` }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
          />
        </div>
      </div>

      {/* Evidence */}
      {interest.evidence && interest.evidence.length > 0 && (
        <div className="space-y-1">
          {interest.evidence.slice(0, 2).map((ev, i) => (
            <p key={i} className="text-[10px] text-slate-500 flex items-start gap-1.5">
              <span className="text-slate-600 mt-0.5 shrink-0">•</span>
              <span className="line-clamp-1">{ev}</span>
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}
