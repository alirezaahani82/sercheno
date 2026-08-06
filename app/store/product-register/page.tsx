"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Store,
  LockKeyhole,
  UserRound,
  ArrowRight,
  ShieldCheck,
  Package,
  CheckCircle2,
} from "lucide-react";

export default function ProductRegisterLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (loading) return;

    setErrorMessage("");

    if (!username.trim()) {
      setErrorMessage("لطفاً نام کاربری فروشگاه را وارد کنید.");
      return;
    }

    if (!password) {
      setErrorMessage("لطفاً رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("stores")
        .select(
          "id,name,username,password_hash,status"
        )
        .eq("username", username.trim())
        .maybeSingle();

      if (error) {
        console.error("STORE LOGIN ERROR:", error);

        setErrorMessage(
          "خطا در بررسی اطلاعات. لطفاً دوباره تلاش کنید."
        );

        return;
      }

      if (!data) {
        setErrorMessage(
          "این نام کاربری در سرچنو ثبت نشده است. ابتدا فروشگاه خود را ثبت کنید."
        );

        return;
      }

      if (data.password_hash !== password) {
        setErrorMessage(
          "نام کاربری یا رمز عبور صحیح نیست."
        );

        return;
      }

      if (data.status === "rejected") {
        setErrorMessage(
          "وضعیت فروشگاه شما رد شده است. لطفاً با پشتیبانی سرچنو تماس بگیرید."
        );

        return;
      }

      /*
        ورود موفق
        شناسه فروشگاه را برای صفحه ثبت محصول
        در sessionStorage نگه می‌داریم.
      */

      sessionStorage.setItem(
        "sercheno_store_id",
        data.id
      );

      sessionStorage.setItem(
        "sercheno_store_name",
        data.name
      );

      sessionStorage.setItem(
        "sercheno_store_username",
        data.username
      );

      router.push(
        "/store/product-register/form"
      );
    } catch (error) {
      console.error(
        "PRODUCT REGISTER LOGIN ERROR:",
        error
      );

      setErrorMessage(
        "خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}

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
            href="/store/register"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            ثبت فروشگاه جدید
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Hero */}

      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <Package size={18} />
                مدیریت محصولات فروشگاه
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                محصول جدیدتان را
                <br />
                به سرچنو اضافه کنید
              </h1>

              <p className="mt-5 leading-8 text-blue-100">
                اگر قبلاً فروشگاه خود را در سرچنو ثبت کرده‌اید،
                نیازی نیست دوباره اطلاعات فروشگاه را وارد کنید.
                فقط با نام کاربری و رمز عبور فروشگاه وارد شوید
                و محصولات خود را ثبت کنید.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="font-black">
                    ثبت سریع محصول
                  </div>

                  <div className="mt-1 text-xs text-blue-100">
                    بدون ثبت دوباره فروشگاه
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="font-black">
                    مدیریت ساده‌تر
                  </div>

                  <div className="mt-1 text-xs text-blue-100">
                    محصولات در حساب فروشگاه شما
                  </div>
                </div>
              </div>
            </div>

            {/* Sparrow / Advertisement */}

            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />

              <div className="relative text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-5xl">
                  🐦
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  فروشگاه شما، محصولات شما
                </h2>

                <p className="mt-3 text-sm leading-7 text-blue-100">
                  محصولات خود را در بازار هوشمند ساخت‌وساز
                  سرچنو معرفی کنید.
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold">
                  <ShieldCheck size={19} />
                  ورود امن به حساب فروشگاه
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main */}

      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Login Card */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Store size={27} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  ورود به حساب فروشگاه
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  اطلاعات ورود فروشگاه خود را وارد کنید.
                </p>
              </div>
            </div>

            {/* Username */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                نام کاربری فروشگاه
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute right-4 top-4 text-slate-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="نام کاربری فروشگاه"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-4 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                رمز عبور فروشگاه
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute right-4 top-4 text-slate-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="رمز عبور"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-4 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
              </div>
            </div>

            {/* Error */}

            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Login Button */}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 text-base font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "در حال بررسی اطلاعات..."
              ) : (
                <>
                  <CheckCircle2 size={21} />
                  ورود و ثبت محصول
                </>
              )}
            </button>

            {/* Register Store */}

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                هنوز فروشگاه خود را در سرچنو ثبت نکرده‌اید؟
              </p>

              <Link
                href="/store/register"
                className="mt-3 inline-flex items-center gap-2 font-black text-blue-700 hover:text-blue-800"
              >
                ثبت فروشگاه جدید
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          {/* Side Panel */}

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black">
                چرا ثبت محصول در سرچنو؟
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Package size={19} />
                  </div>

                  <div>
                    <div className="font-black">
                      معرفی محصولات
                    </div>

                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      محصولات شما در معرض دید خریداران و فعالان
                      حوزه ساخت‌وساز قرار می‌گیرد.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <div className="font-black">
                      حساب اختصاصی فروشگاه
                    </div>

                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      محصولات از طریق حساب فروشگاه شما مدیریت می‌شوند.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
              <div className="text-3xl">
                🐦
              </div>

              <h3 className="mt-4 text-lg font-black">
                سرچنو؛ بازار هوشمند ساخت‌وساز
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                فروشگاه خود را یک‌بار ثبت کنید و محصولاتتان را
                به‌سادگی به ویترین دیجیتال خود اضافه کنید.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
