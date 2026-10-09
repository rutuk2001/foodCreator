// Signature brand element: three staggered wisps of steam rising from a hot
// dish, built with pure CSS keyframes (see tailwind.config.js: steam1/2/3)
// so it stays lightweight and respects prefers-reduced-motion globally.
const SteamTrail = ({ className = "" }) => (
  <div className={`pointer-events-none absolute flex gap-3 ${className}`} aria-hidden="true">
    <span className="block h-16 w-2.5 rounded-full bg-cream/70 blur-[3px] animate-steam1" />
    <span className="block h-20 w-2.5 rounded-full bg-cream/60 blur-[3px] animate-steam2" />
    <span className="block h-14 w-2.5 rounded-full bg-cream/70 blur-[3px] animate-steam3" />
  </div>
);

export default SteamTrail;
