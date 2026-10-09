const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "drink"];
const difficulties = ["easy", "medium", "hard"];
const diets = ["veg", "non-veg", "vegan"];

const Pill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
      active
        ? "border-ember bg-ember text-cream"
        : "border-espresso/15 text-espresso/70 hover:border-ember hover:text-ember dark:border-cream/15 dark:text-cream/70"
    }`}
  >
    {children}
  </button>
);

// filters: { category, difficulty, dietType, cuisine, cookingTime_lte }
const FilterPanel = ({ filters, setFilters }) => {
  const toggle = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }));
  };

  return (
    <div className="space-y-5 rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
      <div>
        <p className="eyebrow mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Pill key={c} active={filters.category === c} onClick={() => toggle("category", c)}>
              {c}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <Pill key={d} active={filters.difficulty === d} onClick={() => toggle("difficulty", d)}>
              {d}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Diet</p>
        <div className="flex flex-wrap gap-2">
          {diets.map((d) => (
            <Pill key={d} active={filters.dietType === d} onClick={() => toggle("dietType", d)}>
              {d}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Max cooking time</p>
        <div className="flex flex-wrap gap-2">
          {[15, 30, 45, 60].map((t) => (
            <Pill
              key={t}
              active={filters.cookingTime_lte === String(t)}
              onClick={() => toggle("cookingTime_lte", String(t))}
            >
              {t}m
            </Pill>
          ))}
        </div>
      </div>

      {Object.values(filters).some(Boolean) && (
        <button
          onClick={() => setFilters({})}
          className="font-mono text-xs uppercase tracking-wider text-ember hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
