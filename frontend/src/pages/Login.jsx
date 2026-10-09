import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LogIn } from "lucide-react";

import { pageTransition } from "../hooks/pageTransition";
import { useAuth } from "../context/AuthContext";
import AnimatedButton from "../components/AnimatedButton";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok) navigate("/");
  };

  return (
    <motion.main {...pageTransition} className="flex min-h-[80vh] items-center justify-center px-6 pt-24">
      <Helmet><title>Sign in — Maya's Kitchen</title></Helmet>
      <div className="w-full max-w-sm rounded-3xl bg-cream-soft p-8 dark:bg-espresso-deep">
        <h1 className="mb-2 font-display text-3xl font-semibold">Welcome back</h1>
        <p className="mb-8 text-sm text-espresso/60 dark:text-cream/60">
          Sign in to save favorites and leave reviews.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <AnimatedButton type="submit" icon={LogIn} className="w-full justify-center" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </AnimatedButton>
        </form>
        <p className="mt-6 text-center text-sm text-espresso/60 dark:text-cream/60">
          New here? <Link to="/register" className="font-semibold text-ember hover:underline">Create an account</Link>
        </p>
        <p className="mt-4 text-center font-mono text-xs text-espresso/40 dark:text-cream/40">
          Demo creator login: maya@kitchen.com / password123
        </p>
      </div>
    </motion.main>
  );
};

export default Login;
