import { useEffect, useState } from "react";
import { Eye, UtensilsCrossed, Users, TrendingUp } from "lucide-react";
import { getAnalytics } from "../../api/recipes";
import CookingLoader from "../../components/CookingLoader";
import { useAuth } from "../../context/AuthContext";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
    <Icon className="mb-4 text-ember" size={22} />
    <p className="font-display text-3xl font-semibold">{value}</p>
    <p className="font-mono text-xs uppercase tracking-wider text-espresso/50 dark:text-cream/50">{label}</p>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAnalytics()
      .then((res) => setStats(res.data.data))
      .catch(() => setStats(false));
  }, []);

  return (
    <div>
      <h1 className="mb-1 font-display text-3xl font-medium">Welcome back, {user?.name?.split(" ")[0]}</h1>
      <p className="mb-8 text-espresso/60 dark:text-cream/60">Here's how the kitchen is performing.</p>

      {stats === null ? (
        <CookingLoader label="Crunching the numbers..." />
      ) : stats === false ? (
        <p className="text-espresso/60 dark:text-cream/60">Could not load analytics. Is the backend running?</p>
      ) : (
        <>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <StatCard icon={UtensilsCrossed} label="Total recipes" value={stats.totalRecipes} />
            <StatCard icon={Eye} label="Total views" value={stats.totalViews} />
            <StatCard icon={Users} label="Registered users" value={stats.totalUsers} />
          </div>

          <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
              <TrendingUp size={20} className="text-ember" /> Most popular recipes
            </h2>
            <ul className="space-y-3">
              {stats.popularRecipes.map((r, i) => (
                <li key={r._id} className="flex items-center justify-between border-b border-espresso/10 pb-3 last:border-none dark:border-cream/10">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-espresso/40 dark:text-cream/40">{String(i + 1).padStart(2, "0")}</span>
                    {r.title}
                  </span>
                  <span className="font-mono text-sm text-ember">{r.views} views</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
