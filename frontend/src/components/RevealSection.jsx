import { motion } from "framer-motion";

// Reusable scroll-reveal wrapper. Wrap any section content in this to get a
// consistent fade + rise entrance the first time it scrolls into view.
const RevealSection = ({ children, className = "", delay = 0, y = 28, as = "div" }) => {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
};

export default RevealSection;
