import { motion } from "framer-motion";

const variantClasses = {
  primary: "bg-ember text-cream hover:bg-ember-deep hover:shadow-lg hover:shadow-ember/30",
  secondary:
    "border border-espresso/20 text-espresso hover:border-espresso dark:border-cream/30 dark:text-cream dark:hover:border-cream",
  ghost: "text-espresso hover:text-ember dark:text-cream dark:hover:text-ember-light",
};

const AnimatedButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  icon: Icon,
  ...rest
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
    className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold transition-colors duration-300 ${variantClasses[variant]} ${className}`}
    {...rest}
  >
    {children}
    {Icon && <Icon size={18} />}
  </motion.button>
);

export default AnimatedButton;
