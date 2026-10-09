import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { submitContact } from "../api/contact";
import RevealSection from "../components/RevealSection";
import AnimatedButton from "../components/AnimatedButton";

const collabTypes = [
  { value: "brand-deal", label: "Brand deal" },
  { value: "restaurant-feature", label: "Restaurant feature" },
  { value: "recipe-development", label: "Recipe development" },
  { value: "media", label: "Media / press" },
  { value: "other", label: "Something else" },
];

const initialForm = { name: "", email: "", company: "", collaborationType: "brand-deal", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await submitContact(form);
      toast.success(data.message);
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send your message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.main {...pageTransition} className="pt-32">
      <Helmet><title>Collaborate — Maya's Kitchen</title></Helmet>

      <section className="container-wide grid gap-16 pb-24 md:grid-cols-2">
        <RevealSection>
          <p className="eyebrow mb-3">For brands &amp; restaurants</p>
          <h1 className="mb-6 text-balance font-display text-4xl font-medium md:text-5xl">
            Let's cook something up together.
          </h1>
          <p className="max-w-md text-lg text-espresso/70 dark:text-cream/70">
            Whether it's a product feature, a restaurant collaboration, or a recipe series — tell me
            a bit about it and I'll get back to you within a few days.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-cream-soft p-8 dark:bg-espresso-deep">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={update("email")}
                className="rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
              />
            </div>
            <input
              placeholder="Company (optional)"
              value={form.company}
              onChange={update("company")}
              className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
            <select
              value={form.collaborationType}
              onChange={update("collaborationType")}
              className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            >
              {collabTypes.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <textarea
              required
              rows={5}
              placeholder="Tell me about the project..."
              value={form.message}
              onChange={update("message")}
              className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
            />
            <AnimatedButton type="submit" icon={Send} className="w-full justify-center" disabled={submitting}>
              {submitting ? "Sending..." : "Send message"}
            </AnimatedButton>
          </form>
        </RevealSection>
      </section>
    </motion.main>
  );
};

export default Contact;
