import { motion } from "framer-motion";

// Themed loading indicator: a whisk-like arc orbiting a "pan" dot. Used for
// async fetch states across the recipe database and dashboard.
const CookingLoader = ({ label = "Simmering..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <div className="relative h-14 w-14">
      <motion.span
        className="absolute inset-0 rounded-full border-[3px] border-ember/20 border-t-ember"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xl">🍳</span>
    </div>
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-espresso/60 dark:text-cream/60">{label}</p>
  </div>
);

export default CookingLoader;
