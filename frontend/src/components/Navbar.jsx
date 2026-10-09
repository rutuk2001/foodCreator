import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ChefHat } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/recipes", label: "Recipes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Collaborate" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-cream-soft/90 shadow-sm backdrop-blur-md dark:bg-char/90"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
          <ChefHat className="text-ember" size={24} />
          Maya's Kitchen
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative font-medium transition-colors hover:text-ember ${
                  isActive ? "text-ember" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 hover:bg-espresso/10 dark:hover:bg-cream/10"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              {(user.role === "creator" || user.role === "admin") && (
                <Link to="/dashboard" className="text-sm font-semibold hover:text-ember">
                  Dashboard
                </Link>
              )}
              <button onClick={logout} className="btn-secondary !py-2 !px-5 text-sm">
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !py-2.5 !px-6 text-sm">
              Sign in
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-50 flex flex-col bg-cream p-8 dark:bg-char dark:text-cream md:hidden"
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="font-display text-xl font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-display">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
              <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>
                {user ? "Dashboard" : "Sign in"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
