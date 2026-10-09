import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { ArrowRight, PlayCircle } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { getRecipes } from "../api/recipes";
import { getVideos } from "../api/videos";
import RevealSection from "../components/RevealSection";
import RecipeCard from "../components/RecipeCard";
import VideoCard from "../components/VideoCard";
import FloatingIngredient from "../components/FloatingIngredient";
import SteamTrail from "../components/SteamTrail";
import AnimatedButton from "../components/AnimatedButton";
import CookingLoader from "../components/CookingLoader";
import { staggerContainer } from "../components/AnimatedCard";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [videos, setVideos] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getRecipes({ limit: 3, sort: "-views" })
      .then((res) => setRecipes(res.data.data))
      .catch(() => setRecipes([]));
    getVideos({ limit: 4 })
      .then((res) => setVideos(res.data.data))
      .catch(() => setVideos([]));
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're in the kitchen community!");
    setEmail("");
  };

  return (
    <motion.main {...pageTransition}>
      <Helmet>
        <title>Maya's Kitchen — Recipes, Shorts & a Creator's Table</title>
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden bg-char pb-28 pt-40 text-cream md:pt-48">
        <div className="absolute inset-0 bg-grain" />
        <FloatingIngredient emoji="🍋" className="left-[8%] top-[22%]" delay={0} />
        <FloatingIngredient emoji="🌿" className="right-[12%] top-[16%]" delay={1.2} duration={7} />
        <FloatingIngredient emoji="🍅" className="left-[18%] bottom-[18%]" delay={0.6} duration={5.5} />
        <FloatingIngredient emoji="🧄" className="right-[6%] bottom-[26%]" delay={2} duration={6.5} />

        <div className="container-wide relative grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="eyebrow mb-5"
            >
              Creator &amp; Chef — Maya Rossi
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-balance font-display text-5xl font-medium leading-[1.05] md:text-7xl"
            >
              Food worth <span className="italic text-ember-light">stopping</span> the scroll for.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-6 max-w-md text-lg text-cream/70"
            >
              Cinematic recipes, real technique, and the Shorts that started it all — cooked in a
              home kitchen in Milan and shared with two million people every week.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/recipes">
                <AnimatedButton icon={ArrowRight}>Explore Recipes</AnimatedButton>
              </Link>
              <a href="#shorts">
                <AnimatedButton variant="secondary" icon={PlayCircle} className="!text-cream !border-cream/30 hover:!border-cream">
                  Watch My Videos
                </AnimatedButton>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-ember/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=80"
              alt="Charred lemon butter salmon plated on a dark ceramic dish"
              className="relative h-full w-full rounded-[3rem] object-cover shadow-2xl"
            />
            <SteamTrail className="left-1/2 top-4 -translate-x-1/2" />
          </motion.div>
        </div>
      </section>

      {/* FEATURED RECIPES */}
      <section className="container-wide py-24">
        <RevealSection className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Most cooked this week</p>
            <h2 className="font-display text-4xl font-medium md:text-5xl">Featured Recipes</h2>
          </div>
          <Link to="/recipes" className="flex items-center gap-1 font-semibold text-ember hover:underline">
            View all recipes <ArrowRight size={16} />
          </Link>
        </RevealSection>

        {recipes === null ? (
          <CookingLoader label="Plating up featured recipes..." />
        ) : recipes.length === 0 ? (
          <p className="text-espresso/60 dark:text-cream/60">
            No recipes yet — connect the backend and run <code>npm run seed</code> to populate demo data.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-8 md:grid-cols-3"
          >
            {recipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </motion.div>
        )}
      </section>

      {/* SHORTS */}
      <section id="shorts" className="bg-espresso-deep py-24 text-cream">
        <div className="container-wide">
          <RevealSection className="mb-12">
            <p className="eyebrow mb-3">Straight from the pan</p>
            <h2 className="font-display text-4xl font-medium md:text-5xl">Latest Shorts</h2>
          </RevealSection>

          {videos === null ? (
            <CookingLoader label="Loading Shorts..." />
          ) : videos.length === 0 ? (
            <p className="text-cream/50">No videos yet — add some from the creator dashboard.</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 gap-5 md:grid-cols-4"
            >
              {videos.map((v) => (
                <VideoCard key={v._id} video={v} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CREATOR STORY */}
      <section className="container-wide grid items-center gap-12 py-24 md:grid-cols-2">
        <RevealSection>
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
            alt="Maya plating a dish in her home kitchen"
            className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-xl"
          />
        </RevealSection>
        <RevealSection delay={0.1}>
          <p className="eyebrow mb-3">The person behind the pan</p>
          <h2 className="mb-6 font-display text-4xl font-medium leading-tight md:text-5xl">
            From a rented studio kitchen to two million cooks a week.
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-espresso/70 dark:text-cream/70">
            Maya started posting 30-second cooking clips from a one-burner studio kitchen in 2019.
            What began as a way to remember her grandmother's recipes became a daily table for
            millions of home cooks looking for food that actually works on a weeknight.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-espresso/70 dark:text-cream/70">
            Every recipe on this site is tested at least five times before it's shared — cooked in a
            real kitchen, by a real person, for people who just want dinner to taste like it should.
          </p>
          <Link to="/about">
            <AnimatedButton variant="secondary" icon={ArrowRight}>
              Read the full story
            </AnimatedButton>
          </Link>
        </RevealSection>
      </section>

      {/* NEWSLETTER */}
      <section className="relative overflow-hidden bg-sage-deep py-24 text-cream">
        <div className="absolute inset-0 bg-grain" />
        <RevealSection className="container-wide relative text-center">
          <h2 className="mx-auto max-w-xl text-balance font-display text-4xl font-medium md:text-5xl">
            Join my kitchen community
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/70">
            One email a week: a new recipe, a technique worth learning, and whatever's cooking behind the scenes.
          </p>
          <form onSubmit={handleNewsletter} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-cream/20 bg-cream/10 px-6 py-3.5 text-cream placeholder-cream/40 outline-none focus:border-cream"
            />
            <AnimatedButton type="submit" className="justify-center whitespace-nowrap">
              Join free
            </AnimatedButton>
          </form>
        </RevealSection>
      </section>
    </motion.main>
  );
};

export default Home;
