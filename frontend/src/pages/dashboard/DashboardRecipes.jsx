import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil } from "lucide-react";
import { getRecipes, createRecipe, deleteRecipe } from "../../api/recipes";
import CookingLoader from "../../components/CookingLoader";
import Modal from "../../components/Modal";
import AnimatedButton from "../../components/AnimatedButton";

const emptyForm = {
  title: "",
  description: "",
  category: "dinner",
  cuisine: "",
  dietType: "veg",
  prepTime: 10,
  cookingTime: 20,
  servings: 2,
  difficulty: "easy",
  image: "",
  ingredients: [{ name: "", quantity: "" }],
  steps: [{ order: 1, title: "Step 1", content: "" }],
};

const DashboardRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setRecipes(null);
    getRecipes({ limit: 50 })
      .then((res) => setRecipes(res.data.data))
      .catch(() => setRecipes([]));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe? This can't be undone.")) return;
    await deleteRecipe(id);
    toast.success("Recipe deleted");
    load();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createRecipe(form);
      toast.success("Recipe published");
      setModalOpen(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save recipe");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Manage recipes</h1>
        <AnimatedButton icon={Plus} onClick={() => setModalOpen(true)} className="!py-2.5 !px-5 text-sm">
          Add recipe
        </AnimatedButton>
      </div>

      {recipes === null ? (
        <CookingLoader />
      ) : (
        <div className="overflow-hidden rounded-3xl bg-cream-soft dark:bg-espresso-deep">
          {recipes.map((r) => (
            <div key={r._id} className="flex items-center gap-4 border-b border-espresso/10 p-4 last:border-none dark:border-cream/10">
              <img src={r.image} alt={r.title} className="h-14 w-14 flex-none rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{r.title}</p>
                <p className="font-mono text-xs text-espresso/50 dark:text-cream/50">
                  {r.category} · {r.views} views · {r.avgRating || "No"} rating
                </p>
              </div>
              <button className="rounded-full p-2 hover:bg-espresso/10 dark:hover:bg-cream/10" aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="rounded-full p-2 text-ember hover:bg-ember/10"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add a new recipe" className="max-w-2xl">
        <form onSubmit={handleCreate} className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <textarea
            required
            placeholder="Description"
            rows={2}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="Cuisine (e.g. Italian)"
              value={form.cuisine}
              onChange={(e) => setForm((f) => ({ ...f, cuisine: e.target.value }))}
              className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
            <input
              required
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="rounded-xl border border-espresso/15 bg-cream px-3 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            >
              {["breakfast", "lunch", "dinner", "dessert", "snack", "drink"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={form.difficulty}
              onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
              className="rounded-xl border border-espresso/15 bg-cream px-3 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            >
              {["easy", "medium", "hard"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={form.dietType}
              onChange={(e) => setForm((f) => ({ ...f, dietType: e.target.value }))}
              className="rounded-xl border border-espresso/15 bg-cream px-3 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            >
              {["veg", "non-veg", "vegan"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Prep (min)"
              value={form.prepTime}
              onChange={(e) => setForm((f) => ({ ...f, prepTime: Number(e.target.value) }))}
              className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
            <input
              type="number"
              placeholder="Cook (min)"
              value={form.cookingTime}
              onChange={(e) => setForm((f) => ({ ...f, cookingTime: Number(e.target.value) }))}
              className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
            <input
              type="number"
              placeholder="Servings"
              value={form.servings}
              onChange={(e) => setForm((f) => ({ ...f, servings: Number(e.target.value) }))}
              className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
          </div>
          <p className="pt-1 text-xs text-espresso/50 dark:text-cream/50">
            Ingredients and steps default to one placeholder row — full add/remove-row editing can be
            extended here the same way as the fields above.
          </p>
          <AnimatedButton type="submit" className="w-full justify-center" disabled={saving}>
            {saving ? "Publishing..." : "Publish recipe"}
          </AnimatedButton>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardRecipes;
