import { useEffect, useState } from "react";
import { getAnalytics } from "../../api/recipes";
import CookingLoader from "../../components/CookingLoader";

const DashboardAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAnalytics()
      .then((res) => setStats(res.data.data))
      .catch(() => setStats(false));
  }, []);

  if (stats === null) return <CookingLoader />;
  if (stats === false)
    return <p className="text-espresso/60 dark:text-cream/60">Could not load analytics.</p>;

  const maxViews = Math.max(...stats.popularRecipes.map((r) => r.views), 1);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-medium">Analytics</h1>
      <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
        <h2 className="mb-6 font-display text-xl font-semibold">Views by recipe</h2>
        <div className="space-y-4">
          {stats.popularRecipes.map((r) => (
            <div key={r._id}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{r.title}</span>
                <span className="font-mono text-espresso/50 dark:text-cream/50">{r.views}</span>
              </div>
              <div className="h-2.5 rounded-full bg-espresso/10 dark:bg-cream/10">
                <div
                  className="h-2.5 rounded-full bg-ember transition-all"
                  style={{ width: `${(r.views / maxViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
