import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";

// Interactive step-through cooking guide: one step visible at a time with a
// progress rail, matching the brief's "Step 1 / Step 2 / Step 3" flow.
const CookingSteps = ({ steps = [] }) => {
  const [active, setActive] = useState(0);
  const sorted = [...steps].sort((a, b) => (a.order || 0) - (b.order || 0));
  const step = sorted[active];

  if (!sorted.length) return null;

  return (
    <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep md:p-8">
      <div className="mb-6 flex items-center gap-2">
        {sorted.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= active ? "bg-ember" : "bg-espresso/10 dark:bg-cream/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ember/15 font-mono text-sm font-semibold text-ember-deep">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
          </div>

          {step.image ? (
            <img
              src={step.image}
              alt={step.title}
              className="mb-4 aspect-video w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-2xl bg-espresso/5 dark:bg-cream/5">
              <UtensilsCrossed className="text-ember/50" size={40} />
            </div>
          )}

          <p className="text-lg leading-relaxed text-espresso/80 dark:text-cream/80">{step.content}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="btn-secondary !py-2.5 !px-5 text-sm disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <span className="font-mono text-xs text-espresso/50 dark:text-cream/50">
          Step {active + 1} of {sorted.length}
        </span>
        <button
          onClick={() => setActive((a) => Math.min(sorted.length - 1, a + 1))}
          disabled={active === sorted.length - 1}
          className="btn-primary !py-2.5 !px-5 text-sm disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CookingSteps;
