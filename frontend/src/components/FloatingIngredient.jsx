import { motion } from "framer-motion";

// Decorative emoji/icon that gently floats & rotates — used to scatter
// ingredient accents around hero art and section backgrounds.
const FloatingIngredient = ({ emoji, className = "", delay = 0, duration = 6 }) => (
  <motion.span
    aria-hidden="true"
    className={`select-none pointer-events-none absolute text-4xl md:text-5xl drop-shadow-lg ${className}`}
    animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {emoji}
  </motion.span>
);

export default FloatingIngredient;
