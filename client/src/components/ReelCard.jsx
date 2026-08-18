import { motion } from "framer-motion";
import { CATEGORY_CONFIG } from "../data/config";

export default function ReelCard({ reel, isSelected, onToggle, index }) {
  const config = CATEGORY_CONFIG[reel.category] || CATEGORY_CONFIG["Programming"];
  const thumbnail = config.emoji || "📱";

  const watchColor = reel.watchPercentage >= 80 ? "from-emerald-500 to-teal-500"
    : reel.watchPercentage >= 50 ? "from-amber-500 to-yellow-500"
    : "from-rose-500 to-red-500";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(reel.id);
    }
  };

  const likeLabel = reel.liked ? "liked" : "not liked";
  const savedLabel = reel.saved ? ", saved" : "";
  const cardLabel = `${reel.title}. ${reel.category} reel. ${reel.watchPercentage}% watched, ${likeLabel}${savedLabel}. ${isSelected ? "Selected for analysis" : "Click to select"}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      role="checkbox"
      aria-checked={isSelected}
      aria-label={cardLabel}
      tabIndex={0}
      onClick={() => onToggle(reel.id)}
      onKeyDown={handleKeyDown}
      className={`
        relative flex-shrink-0 w-44 cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
        ${isSelected
          ? "border-brand-500/60 bg-brand-500/10 shadow-glow-brand scale-[1.02]"
          : "border-white/[0.06] bg-dark-800/60 hover:border-brand-500/30 hover:bg-dark-700/60"}
      `}
      style={{ backdropFilter: "blur(16px)" }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          aria-hidden="true"
          className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"
        >
          <span className="text-[10px]">✓</span>
        </motion.div>
      )}

      {/* Thumbnail */}
      <div
        role="img"
        aria-label={`${reel.category} category icon`}
        className={`
          relative h-28 flex items-center justify-center text-5xl
          bg-gradient-to-br
          ${reel.category === 'AI' ? 'from-amber-900/30 to-yellow-900/20' :
            reel.category === 'Programming' ? 'from-brand-900/30 to-blue-900/20' :
            reel.category === 'Career' ? 'from-purple-900/30 to-violet-900/20' :
            reel.category === 'Gaming' ? 'from-rose-900/30 to-pink-900/20' :
            reel.category === 'Hardware' ? 'from-cyan-900/30 to-teal-900/20' :
            reel.category === 'Cybersecurity' ? 'from-rose-900/30 to-red-900/20' :
            'from-dark-700/50 to-dark-800/50'}
        `}
      >
        <span aria-hidden="true" className="filter drop-shadow-lg">{thumbnail}</span>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-800/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2 mb-2">
          {reel.title}
        </p>

        {/* Category badge */}
        <span aria-hidden="true" className={`badge badge-${config.color} mb-2`}>
          {config.emoji} {reel.category}
        </span>

        {/* Watch progress */}
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-slate-500">Watched</span>
            <span className={`text-[10px] font-semibold ${
              reel.watchPercentage >= 80 ? 'text-emerald-400' :
              reel.watchPercentage >= 50 ? 'text-amber-400' : 'text-rose-400'
            }`}>{reel.watchPercentage}%</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={reel.watchPercentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${reel.watchPercentage}% watched`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${reel.watchPercentage}%` }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${watchColor}`}
            />
          </div>
        </div>

        {/* Like / Save row */}
        <div aria-hidden="true" className="flex items-center gap-2 mt-2">
          <span className={`text-xs ${reel.liked ? 'text-rose-400' : 'text-slate-600'}`}>
            {reel.liked ? '❤️' : '🤍'}
          </span>
          {reel.saved && <span className="text-xs text-amber-400">🔖</span>}
          {reel.shares > 0 && (
            <span className="text-[10px] text-slate-500 ml-auto">↗ {reel.shares}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

