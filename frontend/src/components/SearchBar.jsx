import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search recipes or ingredients..." }) => (
  <div className="relative">
    <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-espresso/40 dark:text-cream/40" size={20} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-full border border-espresso/15 bg-cream-soft py-4 pl-14 pr-6 font-body text-base outline-none transition-shadow focus:shadow-lg focus:shadow-ember/10 dark:border-cream/15 dark:bg-espresso-deep dark:text-cream"
    />
  </div>
);

export default SearchBar;
