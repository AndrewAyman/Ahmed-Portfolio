"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { loginAction, registerAction } from "@/app/actions/auth-actions";
import { Lock, Mail, User, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ClientAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");
    if (res?.role === "ADMIN") {
      window.location.href = "/client/admin";
    } else {
      window.location.href = "/client/portal";
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await registerAction(formData);

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    window.location.href = "/client/portal";
  }

  return (
    <div className="relative flex flex-col justify-between bg-[#080808] p-4 sm:p-6 w-full min-h-screen overflow-hidden font-sans text-white">
      {/* Background ambient red glow */}
      <div className="top-1/4 left-1/2 absolute bg-red-600/10 blur-[140px] rounded-full w-[500px] h-[500px] -translate-x-1/2 pointer-events-none" />

      {/* Top Navbar Brand */}
      <header className="z-10 relative flex justify-between items-center mx-auto pt-3 sm:pt-4 w-full max-w-6xl">
        <Link href="/home" className="group flex items-center gap-2">
          <span className="text-zinc-400 group-hover:text-white text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition">
            ← Back to Portfolio
          </span>
        </Link>
        <span className="bg-red-600/10 px-3 py-1 border border-red-600/20 rounded-full font-semibold text-[10px] sm:text-[11px] text-red-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
          Portal Gateway
        </span>
      </header>

      {/* Main Auth Card */}
      <main className="z-10 relative flex justify-center items-center my-6 sm:my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#111111]/90 shadow-2xl shadow-black/90 backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex justify-center items-center bg-red-600/10 shadow-lg shadow-red-600/20 mb-3 border border-red-600/30 rounded-full w-12 h-12 text-red-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-white text-xl sm:text-2xl uppercase tracking-wider">
              Client Portal
            </h1>
            <p className="mt-1 text-zinc-400 text-xs uppercase tracking-widest">
              Ahmed Osama Production
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-black/60 mb-6 p-1 border border-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-lg ${
                isLogin
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-lg ${
                !isLogin
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Animated Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="client@brand.com or admin"
                      className="bg-black/50 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      className="bg-black/50 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-lg shadow-red-600/20 mt-2 py-3 rounded-xl w-full font-medium text-white text-xs uppercase tracking-widest transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Enter Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Full Name / Brand Name
                  </label>
                  <div className="relative">
                    <User className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Acme Studio"
                      className="bg-black/50 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="client@brand.com"
                      className="bg-black/50 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400 text-xs uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="top-3 left-3.5 absolute w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={6}
                      placeholder="Min 6 characters"
                      className="bg-black/50 py-2.5 pr-4 pl-10 border border-white/10 focus:border-red-600 rounded-xl focus:outline-none w-full text-white text-sm transition placeholder-zinc-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-lg shadow-red-600/20 mt-2 py-3 rounded-xl w-full font-medium text-white text-xs uppercase tracking-widest transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Create Client Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="z-10 relative py-4 text-zinc-600 text-xs text-center uppercase tracking-widest">
        © {new Date().getFullYear()} Ahmed Osama Production. All rights reserved.
      </footer>
    </div>
  );
}

