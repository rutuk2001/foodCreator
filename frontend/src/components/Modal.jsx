import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ open, onClose, title, children, className = "" }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-char/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream-soft p-8 shadow-2xl dark:bg-espresso-deep dark:text-cream ${className}`}
        >
          <div className="mb-6 flex items-center justify-between">
            {title && <h3 className="font-display text-2xl">{title}</h3>}
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-auto rounded-full p-2 text-espresso/60 hover:bg-espresso/10 dark:text-cream/60 dark:hover:bg-cream/10"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
