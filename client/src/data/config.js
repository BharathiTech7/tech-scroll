/**
 * Category configuration — colors, icons, labels
 */
export const CATEGORY_CONFIG = {
  "Programming": { color: "brand", emoji: "💻", label: "Programming" },
  "Career": { color: "purple", emoji: "🚀", label: "Career" },
  "Hardware": { color: "cyan", emoji: "🖥️", label: "Hardware" },
  "Gaming": { color: "rose", emoji: "🎮", label: "Gaming" },
  "AI": { color: "amber", emoji: "🤖", label: "Artificial Intelligence" },
  "DSA": { color: "emerald", emoji: "🧠", label: "DSA" },
  "Cloud": { color: "cyan", emoji: "☁️", label: "Cloud" },
  "Cybersecurity": { color: "rose", emoji: "🔐", label: "Cybersecurity" },
  "Web Development": { color: "brand", emoji: "🌐", label: "Web Dev" },
  "Entertainment": { color: "brand", emoji: "🎬", label: "Entertainment" },
  "System Design": { color: "purple", emoji: "🏗️", label: "System Design" },
};

/**
 * Confidence badge config
 */
export const CONFIDENCE_CONFIG = {
  "High": { class: "badge-emerald", label: "High Confidence" },
  "Medium": { class: "badge-amber", label: "Medium Confidence" },
  "Low": { class: "badge-rose", label: "Low Confidence" },
};

/**
 * Interest type config
 */
export const INTEREST_TYPE_CONFIG = {
  "Primary": { class: "badge-brand", label: "Primary" },
  "Explicit": { class: "badge-brand", label: "Explicit" },
  "Implicit": { class: "badge-purple", label: "Implicit" },
  "Emerging": { class: "badge-cyan", label: "Emerging" },
  "Secondary": { class: "badge-amber", label: "Secondary" },
  "Weak": { class: "badge-rose", label: "Weak Signal" },
};

/**
 * Difficulty config
 */
export const DIFFICULTY_CONFIG = {
  "Beginner": { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  "Intermediate": { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  "Advanced": { color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
};

/**
 * Agent steps for pipeline visualization
 */
export const AGENT_STEPS = [
  {
    id: 1,
    name: "Reel Understanding Agent",
    description: "Semantic analysis of each reel's topic, context, and intent",
    icon: "🔍",
    color: "brand"
  },
  {
    id: 2,
    name: "Interest Inference Agent",
    description: "Cross-reel pattern detection & broader interest profiling",
    icon: "🧠",
    color: "purple"
  },
  {
    id: 3,
    name: "Recommendation Agent",
    description: "Generating semantic tech reel recommendation",
    icon: "✨",
    color: "cyan"
  },
  {
    id: 4,
    name: "Quality Validator",
    description: "Anti-hype filter — rejecting clickbait & exaggerated claims",
    icon: "🛡️",
    color: "emerald"
  }
];
