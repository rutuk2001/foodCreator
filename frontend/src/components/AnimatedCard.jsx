import { motion } from "framer-motion";

export const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// Generic animated card shell used by RecipeCard / VideoCard for consistent
// entrance + hover lift across the site.
const AnimatedCard = ({ children, className = "", onClick }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    onClick={onClick}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;
