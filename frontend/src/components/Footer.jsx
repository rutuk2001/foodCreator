import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, ChefHat } from "lucide-react";

const categories = ["Breakfast", "Dinner", "Dessert", "Snack", "Drinks"];

const Footer = () => (
  <footer className="bg-char text-cream">
    <div className="container-wide grid gap-12 py-16 md:grid-cols-4">
      <div>
        <div className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
          <ChefHat className="text-ember" size={22} />
          Maya's Kitchen
        </div>
        <p className="max-w-xs text-sm text-cream/60">
          Cinematic recipes and cooking Shorts, cooked and shared from a real kitchen in Milan.
        </p>
      </div>

      <div>
        <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Categories</h4>
        <ul className="space-y-2 text-sm text-cream/70">
          {categories.map((c) => (
            <li key={c}>
              <Link to={`/recipes?category=${c.toLowerCase()}`} className="hover:text-ember">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Explore</h4>
        <ul className="space-y-2 text-sm text-cream/70">
          <li><Link to="/recipes" className="hover:text-ember">Recipe Database</Link></li>
          <li><Link to="/about" className="hover:text-ember">About Maya</Link></li>
          <li><Link to="/contact" className="hover:text-ember">Collaborate</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Follow the kitchen</h4>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="rounded-full border border-cream/20 p-2.5 hover:border-ember hover:text-ember">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="YouTube" className="rounded-full border border-cream/20 p-2.5 hover:border-ember hover:text-ember">
            <Youtube size={18} />
          </a>
          <a href="mailto:hello@mayaskitchen.com" aria-label="Email" className="rounded-full border border-cream/20 p-2.5 hover:border-ember hover:text-ember">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-cream/10 py-6">
      <p className="container-wide text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Maya's Kitchen. All recipes made with love.
      </p>
    </div>
  </footer>
);

export default Footer;
