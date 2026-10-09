import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, UtensilsCrossed, Clapperboard, BarChart3 } from "lucide-react";
import { pageTransition } from "../../hooks/pageTransition";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/recipes", label: "Recipes", icon: UtensilsCrossed },
  { to: "/dashboard/videos", label: "Videos", icon: Clapperboard },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

const DashboardLayout = () => (
  <motion.main {...pageTransition} className="container-wide grid gap-8 pb-24 pt-32 md:grid-cols-[220px_1fr]">
    <aside className="space-y-1 md:sticky md:top-28 md:h-fit">
      <p className="eyebrow mb-3">Creator dashboard</p>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-ember text-cream"
                : "text-espresso/70 hover:bg-espresso/5 dark:text-cream/70 dark:hover:bg-cream/5"
            }`
          }
        >
          <l.icon size={18} /> {l.label}
        </NavLink>
      ))}
    </aside>
    <div>
      <Outlet />
    </div>
  </motion.main>
);

export default DashboardLayout;
