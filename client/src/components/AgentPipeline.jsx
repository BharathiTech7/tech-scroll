import { motion } from "framer-motion";
import { AGENT_STEPS } from "../data/config";

export default function AgentPipeline({ currentStep, isComplete }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300">🔬 AI Agent Pipeline</h3>
        {isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="badge badge-emerald text-xs"
          >
            ✓ Complete
          </motion.span>
        )}
      </div>

      <div className="space-y-2">
        {AGENT_STEPS.map((step, i) => {
          const status = currentStep > i + 1 ? "complete"
            : currentStep === i + 1 ? "active"
            : "pending";

          return (
            <div key={step.id}>
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: status === "pending" ? 0.4 : 1,
                  x: status === "active" ? 2 : 0
                }}
                className={`agent-step ${status}`}
              >
                {/* Status icon */}
                <div className={`
                  w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0
                  ${status === "complete" ? "bg-emerald-500/20 text-emerald-400" :
                    status === "active" ? "bg-brand-500/20 text-brand-300" :
                    "bg-dark-700/50 text-slate-500"}
                `}>
                  {status === "complete" ? "✓" :
                   status === "active" ? (
                     <span className="text-sm animate-spin">⟳</span>
                   ) : step.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold leading-tight ${
                    status === "pending" ? "text-slate-500" : "text-slate-200"
                  }`}>
                    Agent {step.id} — {step.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {step.description}
                  </p>
                </div>

                {/* Active pulse */}
                {status === "active" && (
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                )}
              </motion.div>

              {/* Connector arrow */}
              {i < AGENT_STEPS.length - 1 && (
                <div className="flex justify-start pl-4 my-1">
                  <div className={`w-0.5 h-3 rounded-full ${
                    currentStep > i + 1 ? "bg-emerald-500/40" :
                    currentStep === i + 1 ? "bg-brand-500/40 animate-pulse" :
                    "bg-dark-600/60"
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
