import { useState } from "react";
import { Check } from "lucide-react";

// Interactive ingredient checklist — tap an ingredient to mark it gathered.
const IngredientList = ({ ingredients = [] }) => {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ul className="space-y-1">
      {ingredients.map((ing, i) => {
        const id = ing._id || i;
        const isChecked = !!checked[id];
        return (
          <li key={id}>
            <button
              onClick={() => toggle(id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-espresso/5 dark:hover:bg-cream/5"
            >
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                  isChecked ? "border-ember bg-ember" : "border-espresso/30 dark:border-cream/30"
                }`}
              >
                {isChecked && <Check size={12} className="text-cream" />}
              </span>
              <span className={`flex-1 ${isChecked ? "text-espresso/40 line-through dark:text-cream/40" : ""}`}>
                {ing.name}
              </span>
              {ing.quantity && (
                <span className="font-mono text-xs text-espresso/50 dark:text-cream/50">{ing.quantity}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientList;
