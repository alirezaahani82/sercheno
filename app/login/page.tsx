"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("لطفاً نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "نام کاربری یا رمز عبور صحیح نیست.");
        return;
      }

      window.location.href = "/customer";
    } catch (error) {
      console.error(error);
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="لوگوی سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          <Link
            href="/register"
            className="text-sm font-bold text-blue-700 transition hover:text-blue-800"
          >
            ثبت‌نام
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <section className="px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-white shadow-xl lg:grid-cols-5">

            {/* SIDE */}
            <div className="relative overflow-hidden bg-slate-950 p-8 text-white lg:col-span-2 lg:p-10">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
                  👋
                </div>

                <h1 className="mt-8 text-3xl font-black leading-relaxed">
                  خوش آمدید به

                  <span className="block text-blue-400">
                    سرچنو
                  </span>
                </h1>

                <p className="mt-6 leading-8 text-slate-300">
                  برای ورود به حساب کاربری خود، نام کاربری و
                  رمز عبور اختصاصی خود را وارد کنید.
                </p>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-black text-white">
                    ورود امن
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    برای ورود به حساب مشتری فقط نام کاربری و
                    رمز عبور شما مورد نیاز است.
                  </p>
                </div>
              </div>
            </div>

            {/* LOGIN FORM */}
            <div className="p-7 sm:p-10 lg:col-span-3">

              <div>
                <span className="text-sm font-bold text-blue-700">
                  ورود به حساب
                </span>

                <h2 className="mt-3 text-3xl font-black">
                  ورود مشتری
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  نام کاربری و رمز عبور خود را وارد کنید.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}
              {typeof window !== "undefined" &&
                new URLSearchParams(window.location.search).get(
                  "registered"
                ) === "1" && (
                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-700">
                    حساب شما با موفقیت ایجاد شد.
                    <br />
                    اکنون با نام کاربری و رمز عبور خود وارد شوید.
                  </div>
                )}

              {/* ERROR */}
              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                {/* USERNAME */}
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-bold"
                  >
                    نام کاربری
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="نام کاربری خود را وارد کنید"
                    autoComplete="username"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold"
                  >
                    رمز عبور
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 pl-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                    >
                      {showPassword ? "مخفی" : "نمایش"}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "در حال ورود..."
                    : "ورود به حساب"}

                  <span className="text-lg">
                    ←
                  </span>
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
                حساب کاربری ندارید؟

                <Link
                  href="/register"
                  className="mr-2 font-black text-blue-700 transition hover:text-blue-800"
                >
                  ثبت‌نام مشتری
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <footer className="pb-8 text-center text-xs text-slate-400">
        © سرچنو - بازار هوشمند ساخت‌وساز
      </footer>
    </main>
  );
}
