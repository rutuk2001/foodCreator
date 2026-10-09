import { Link } from "react-router-dom";
import { Clock, Star, Eye, Leaf } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

const difficultyColor = {
  easy: "bg-sage/15 text-sage-deep",
  medium: "bg-ember/15 text-ember-deep",
  hard: "bg-espresso/15 text-espresso",
};

const RecipeCard = ({ recipe }) => (
  <AnimatedCard className="group">
    <Link
      to={`/recipes/${recipe.slug || recipe._id}`}
      className="block overflow-hidden rounded-3xl bg-cream-soft shadow-sm ring-1 ring-espresso/5 transition-shadow duration-300 hover:shadow-xl dark:bg-espresso-deep dark:ring-cream/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char/50 via-transparent to-transparent" />
        {recipe.dietType === "veg" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-cream/90 px-2.5 py-1 text-xs font-semibold text-sage-deep">
            <Leaf size={12} /> Veg
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${difficultyColor[recipe.difficulty] || difficultyColor.easy}`}
        >
          {recipe.difficulty}
        </span>
      </div>

      <div className="p-5">
        <p className="eyebrow mb-1">{recipe.category}</p>
        <h3 className="mb-2 font-display text-lg font-semibold leading-snug">{recipe.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-espresso/60 dark:text-cream/60">{recipe.description}</p>

        <div className="flex items-center gap-4 text-xs font-mono text-espresso/50 dark:text-cream/50">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {recipe.cookingTime}m
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-ember" /> {recipe.avgRating?.toFixed(1) ?? "New"}
          </span>
          {typeof recipe.views === "number" && (
            <span className="flex items-center gap-1">
              <Eye size={14} /> {recipe.views}
            </span>
          )}
        </div>
      </div>
    </Link>
  </AnimatedCard>
);

export default RecipeCard;
