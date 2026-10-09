import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserPlus } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { useAuth } from "../context/AuthContext";
import AnimatedButton from "../components/AnimatedButton";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) navigate("/");
  };

  return (
    <motion.main {...pageTransition} className="flex min-h-[80vh] items-center justify-center px-6 pt-24">
      <Helmet><title>Create account — Maya's Kitchen</title></Helmet>
      <div className="w-full max-w-sm rounded-3xl bg-cream-soft p-8 dark:bg-espresso-deep">
        <h1 className="mb-2 font-display text-3xl font-semibold">Join the kitchen</h1>
        <p className="mb-8 text-sm text-espresso/60 dark:text-cream/60">
          Save favorites, build collections, and rate what you cook.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="Password (min. 6 characters)"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <AnimatedButton type="submit" icon={UserPlus} className="w-full justify-center" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </AnimatedButton>
        </form>
        <p className="mt-6 text-center text-sm text-espresso/60 dark:text-cream/60">
          Already have an account? <Link to="/login" className="font-semibold text-ember hover:underline">Sign in</Link>
        </p>
      </div>
    </motion.main>
  );
};

export default Register;
