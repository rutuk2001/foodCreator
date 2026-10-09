import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition } from "../hooks/pageTransition";
import AnimatedButton from "../components/AnimatedButton";

const NotFound = () => (
  <motion.main {...pageTransition} className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
    <p className="mb-4 text-8xl">🍽️</p>
    <h1 className="mb-3 font-display text-4xl font-medium">This dish isn't on the menu.</h1>
    <p className="mb-8 text-espresso/60 dark:text-cream/60">The page you're looking for doesn't exist.</p>
    <Link to="/"><AnimatedButton>Back to the kitchen</AnimatedButton></Link>
  </motion.main>
);

export default NotFound;
