import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Clock, Users, ChefHat, Heart, Share2, Printer, Star } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { getRecipe, addReview, toggleFavorite } from "../api/recipes";
import { useAuth } from "../context/AuthContext";
import CookingLoader from "../components/CookingLoader";
import IngredientList from "../components/IngredientList";
import CookingSteps from "../components/CookingSteps";
import RecipeCard from "../components/RecipeCard";
import RevealSection from "../components/RevealSection";

const StatPill = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center gap-1 rounded-2xl bg-cream-soft px-5 py-4 text-center dark:bg-espresso-deep">
    <Icon size={18} className="text-ember" />
    <span className="font-display text-lg font-semibold">{value}</span>
    <span className="font-mono text-[10px] uppercase tracking-wider text-espresso/50 dark:text-cream/50">
      {label}
    </span>
  </div>
);

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [related, setRelated] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecipe(id)
      .then((res) => {
        setRecipe(res.data.data);
        setRelated(res.data.related || []);
      })
      .catch(() => setRecipe(false));
  }, [id]);

  const handleFavorite = async () => {
    if (!user) return toast.error("Sign in to save favorites");
    const { data } = await toggleFavorite(recipe._id);
    setFavorited(data.favorited);
    toast.success(data.favorited ? "Saved to favorites" : "Removed from favorites");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: recipe.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Sign in to leave a review");
    try {
      const { data } = await addReview(recipe._id, reviewForm);
      setRecipe(data.data);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Review posted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not post review");
    }
  };

  if (recipe === null) return <CookingLoader label="Plating this recipe..." />;
  if (recipe === false)
    return (
      <div className="container-wide py-40 text-center">
        <p className="text-lg">Recipe not found.</p>
      </div>
    );

  return (
    <motion.main {...pageTransition} className="pt-24">
      <Helmet>
        <title>{recipe.title} — Maya's Kitchen</title>
        <meta name="description" content={recipe.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Recipe",
            name: recipe.title,
            image: [recipe.image],
            description: recipe.description,
            recipeCuisine: recipe.cuisine,
            prepTime: `PT${recipe.prepTime}M`,
            cookTime: `PT${recipe.cookingTime}M`,
            recipeYield: `${recipe.servings} servings`,
            recipeIngredient: recipe.ingredients.map((i) => `${i.quantity} ${i.name}`.trim()),
            aggregateRating: recipe.avgRating
              ? { "@type": "AggregateRating", ratingValue: recipe.avgRating, reviewCount: recipe.reviews.length }
              : undefined,
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-char/80 via-char/10 to-transparent" />
        </div>
        <div className="container-wide absolute inset-x-0 bottom-8 text-cream">
          <p className="eyebrow mb-2 !text-ember-light">{recipe.category} · {recipe.cuisine}</p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-medium md:text-6xl">{recipe.title}</h1>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-14 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-8 max-w-2xl text-lg text-espresso/70 dark:text-cream/70">{recipe.description}</p>

          <div className="mb-4 flex flex-wrap gap-3">
            <button onClick={handleFavorite} className="btn-secondary !py-2.5 !px-5 text-sm">
              <Heart size={16} className={favorited ? "fill-ember text-ember" : ""} /> Favorite
            </button>
            <button onClick={handleShare} className="btn-secondary !py-2.5 !px-5 text-sm">
              <Share2 size={16} /> Share
            </button>
            <button onClick={() => window.print()} className="btn-secondary !py-2.5 !px-5 text-sm">
              <Printer size={16} /> Print
            </button>
          </div>

          <RevealSection className="mb-10">
            <h2 className="mb-5 font-display text-2xl font-semibold">Cooking steps</h2>
            <CookingSteps steps={recipe.steps} />
          </RevealSection>

          <RevealSection className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
            <h2 className="mb-4 font-display text-2xl font-semibold">Reviews ({recipe.reviews.length})</h2>
            <div className="mb-6 space-y-4">
              {recipe.reviews.length === 0 && (
                <p className="text-sm text-espresso/50 dark:text-cream/50">No reviews yet — be the first to cook it.</p>
              )}
              {recipe.reviews.map((r, i) => (
                <div key={i} className="border-b border-espresso/10 pb-4 last:border-none dark:border-cream/10">
                  <div className="mb-1 flex items-center gap-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} className={s < r.rating ? "fill-ember text-ember" : "text-espresso/20"} />
                    ))}
                    <span className="font-semibold">{r.user?.name || "Anonymous"}</span>
                  </div>
                  {r.comment && <p className="text-sm text-espresso/70 dark:text-cream/70">{r.comment}</p>}
                </div>
              ))}
            </div>

            <form onSubmit={handleReview} className="space-y-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}
                  >
                    <Star size={22} className={n <= reviewForm.rating ? "fill-ember text-ember" : "text-espresso/20"} />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                placeholder="How did it turn out?"
                rows={3}
                className="w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
              />
              <button type="submit" className="btn-primary !py-2.5 !px-6 text-sm">
                Post review
              </button>
            </form>
          </RevealSection>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <StatPill icon={Clock} label="Prep" value={`${recipe.prepTime}m`} />
            <StatPill icon={ChefHat} label="Cook" value={`${recipe.cookingTime}m`} />
            <StatPill icon={Users} label="Servings" value={recipe.servings} />
            <StatPill icon={Star} label="Rating" value={recipe.avgRating || "New"} />
          </div>

          <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
            <h3 className="mb-4 font-display text-xl font-semibold">Ingredients</h3>
            <IngredientList ingredients={recipe.ingredients} />
          </div>

          {recipe.nutrition && (
            <div className="rounded-3xl bg-cream-soft p-6 dark:bg-espresso-deep">
              <h3 className="mb-4 font-display text-xl font-semibold">Nutrition</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(recipe.nutrition).map(([k, v]) => (
                  <li key={k} className="flex justify-between border-b border-espresso/10 pb-2 capitalize dark:border-cream/10">
                    <span className="text-espresso/60 dark:text-cream/60">{k}</span>
                    <span className="font-mono font-semibold">{v}{k === "calories" ? " kcal" : "g"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-wide pb-24">
          <h2 className="mb-8 font-display text-3xl font-medium">You might also cook</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </motion.main>
  );
};

export default RecipeDetail;
