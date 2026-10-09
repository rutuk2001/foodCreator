import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { getRecipes, suggestFromIngredients } from "../api/recipes";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeCard from "../components/RecipeCard";
import CookingLoader from "../components/CookingLoader";
import Modal from "../components/Modal";
import AnimatedButton from "../components/AnimatedButton";
import { staggerContainer } from "../components/AnimatedCard";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // AI ingredient assistant
  const [aiOpen, setAiOpen] = useState(false);
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [aiResults, setAiResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const params = useMemo(() => {
    const p = { ...filters };
    if (query) p.q = query;
    return p;
  }, [filters, query]);

  useEffect(() => {
    setRecipes(null);
    const timeout = setTimeout(() => {
      getRecipes(params)
        .then((res) => setRecipes(res.data.data))
        .catch(() => setRecipes([]));
    }, 300);
    return () => clearTimeout(timeout);
  }, [params]);

  const runAiSuggest = async () => {
    const ingredients = ingredientsInput
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    if (ingredients.length === 0) return;
    setAiLoading(true);
    try {
      const { data } = await suggestFromIngredients(ingredients);
      setAiResults(data.data);
    } catch {
      setAiResults([]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <motion.main {...pageTransition} className="pt-32">
      <Helmet>
        <title>Recipe Database — Maya's Kitchen</title>
      </Helmet>

      <section className="container-wide pb-10">
        <p className="eyebrow mb-3">Every recipe, searchable</p>
        <h1 className="mb-8 font-display text-4xl font-medium md:text-5xl">Recipe Database</h1>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="btn-secondary justify-center md:!px-6"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
          <button onClick={() => setAiOpen(true)} className="btn-primary justify-center md:!px-6">
            <Sparkles size={18} /> What can I cook?
          </button>
        </div>
      </section>

      <section className="container-wide grid gap-10 pb-24 md:grid-cols-[280px_1fr]">
        {showFilters && (
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:sticky md:top-28 md:h-fit"
          >
            <FilterPanel filters={filters} setFilters={setFilters} />
          </motion.aside>
        )}

        <div className={showFilters ? "" : "md:col-span-2"}>
          {recipes === null ? (
            <CookingLoader label="Searching the database..." />
          ) : recipes.length === 0 ? (
            <div className="rounded-3xl bg-cream-soft p-12 text-center dark:bg-espresso-deep">
              <p className="text-lg text-espresso/60 dark:text-cream/60">
                No recipes matched. Try a different search or clear your filters.
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {recipes.map((r) => (
                <RecipeCard key={r._id} recipe={r} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* AI Ingredient Assistant */}
      <Modal open={aiOpen} onClose={() => setAiOpen(false)} title="What can I cook?">
        <p className="mb-5 text-sm text-espresso/60 dark:text-cream/60">
          Tell me what's in your fridge and I'll match it against the recipe database.
        </p>
        <div className="flex gap-2">
          <input
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="eggs, tomato, rice"
            className="flex-1 rounded-full border border-espresso/15 bg-cream px-5 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char dark:text-cream"
          />
          <AnimatedButton onClick={runAiSuggest} className="!px-5">
            Suggest
          </AnimatedButton>
        </div>

        <div className="mt-6 space-y-3">
          {aiLoading && <CookingLoader label="Matching your ingredients..." />}
          {aiResults?.length === 0 && !aiLoading && (
            <p className="text-sm text-espresso/50 dark:text-cream/50">
              No close matches yet — try fewer or more common ingredients.
            </p>
          )}
          {aiResults?.map((r) => (
            <a
              key={r._id}
              href={`/recipes/${r.slug}`}
              className="flex items-center gap-4 rounded-2xl bg-cream p-3 transition-colors hover:bg-ember/10 dark:bg-char"
            >
              <img src={r.image} alt={r.title} className="h-16 w-16 flex-none rounded-xl object-cover" />
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="font-mono text-xs text-espresso/50 dark:text-cream/50">
                  {r.matchedIngredients}/{r.totalIngredients} ingredients matched · {r.cookingTime}m
                </p>
              </div>
            </a>
          ))}
        </div>
      </Modal>
    </motion.main>
  );
};

export default Recipes;
