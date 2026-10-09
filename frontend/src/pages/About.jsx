import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { pageTransition } from "../hooks/pageTransition";
import RevealSection from "../components/RevealSection";

const timeline = [
  { year: "2019", title: "First clip, one burner", text: "Posted a 30-second pasta clip from a rented studio kitchen in Milan — it got 40 views." },
  { year: "2020", title: "The first viral Short", text: "A 45-second focaccia video crossed a million views overnight and the account never looked back." },
  { year: "2022", title: "Full-time creator", text: "Left restaurant work to cook, film, and write recipes full time, three days a week in test kitchens." },
  { year: "2024", title: "First brand collaboration", text: "Partnered with a cookware label to design a limited pan collection tested entirely on-camera." },
  { year: "2026", title: "Two million cooks a week", text: "The recipe database now serves a community that actually cooks, not just watches." },
];

const gallery = [
  "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1556910633-5099dc3971e8?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=700&q=80",
];

const About = () => (
  <motion.main {...pageTransition} className="pt-32">
    <Helmet><title>About Maya — Maya's Kitchen</title></Helmet>

    <section className="container-wide pb-20 text-center">
      <p className="eyebrow mb-3">The person behind the pan</p>
      <h1 className="mx-auto max-w-2xl text-balance font-display text-5xl font-medium md:text-6xl">
        Cooking is the one thing I never got tired of filming.
      </h1>
    </section>

    <section className="container-wide pb-24">
      <div className="relative mx-auto max-w-2xl border-l border-espresso/15 pl-8 dark:border-cream/15">
        {timeline.map((t, i) => (
          <RevealSection key={t.year} delay={i * 0.05} className="relative mb-12 last:mb-0">
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-cream bg-ember dark:border-char" />
            <p className="font-mono text-sm text-ember">{t.year}</p>
            <h3 className="mb-2 font-display text-2xl font-semibold">{t.title}</h3>
            <p className="text-espresso/70 dark:text-cream/70">{t.text}</p>
          </RevealSection>
        ))}
      </div>
    </section>

    <section className="bg-espresso-deep py-24 text-cream">
      <div className="container-wide">
        <RevealSection className="mb-10">
          <p className="eyebrow mb-3">Behind the scenes</p>
          <h2 className="font-display text-4xl font-medium">The kitchen setup</h2>
        </RevealSection>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((src, i) => (
            <RevealSection key={src} delay={i * 0.08} className="overflow-hidden rounded-2xl">
              <img src={src} alt="Behind the scenes in the kitchen" className="aspect-[3/4] w-full object-cover" />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  </motion.main>
);

export default About;
