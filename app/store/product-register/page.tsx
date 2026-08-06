"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PackagePlus,
  Store,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Megaphone,
  Truck,
  BarChart3,
  CheckCircle2,
  LockKeyhole,
  UserRound,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function ProductRegisterPage() {
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

    if (!password.trim()) {
      setErrorMessage("لطفاً رمز عبور فروشگاه را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      /*
        جست‌وجوی فروشگاه بر اساس نام کاربری و رمز عبور

        توجه:
        این کد فرض می‌کند ستون‌های username و password
        به جدول stores اضافه شده‌اند.
      */

      const { data: store, error } = await supabase
        .from("stores")
        .select("id,name,username,password,status")
        .eq("username", username.trim())
        .eq("password", password)
        .maybeSingle();

      if (error) {
        console.error("STORE LOGIN ERROR:", error);

        throw new Error(
          "خطا در بررسی اطلاعات فروشگاه. لطفاً دوباره تلاش کنید."
        );
      }

      if (!store) {
        setErrorMessage(
          "نام کاربری یا رمز عبور صحیح نیست، یا هنوز فروشگاهی با این مشخصات در سرچنو ثبت نشده است."
        );

        return;
      }

      /*
        فروشگاه پیدا شد.

        شناسه فروشگاه را برای صفحه ثبت محصول
        در sessionStorage نگه می‌داریم.
      */

      sessionStorage.setItem(
        "sercheno_store_id",
        String(store.id)
      );

      sessionStorage.setItem(
        "sercheno_store_name",
        store.name || ""
      );

      sessionStorage.setItem(
        "sercheno_store_username",
        store.username || username.trim()
      );

      /*
        انتقال به صفحه ثبت محصول
      */

      window.location.href = "/store/product-register/form";
    } catch (error) {
      console.error("PRODUCT REGISTER LOGIN ERROR:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "خطای نامشخصی رخ داد. لطفاً دوباره تلاش کنید."
        );
      }
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

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

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
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            ثبت فروشگاه جدید
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-14 text-white">

        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <Sparkles size={17} />
                پنل اختصاصی فروشندگان سرچنو
              </div>

              <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                محصول جدیدت را
                <span className="text-cyan-300">
                  {" "}سریع و حرفه‌ای{" "}
                </span>
                در سرچنو ثبت کن
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                اگر قبلاً فروشگاه خود را در سرچنو ثبت کرده‌اید،
                دیگر نیازی به تکمیل دوباره اطلاعات فروشگاه نیست.
                فقط وارد حساب فروشگاه شوید و محصولات خود را اضافه کنید.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <PackagePlus size={23} />
                  <div className="mt-2 font-black">
                    ثبت محصول
                  </div>
                  <div className="mt-1 text-xs text-blue-100">
                    سریع و ساده
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <ShoppingBag size={23} />
                  <div className="mt-2 font-black">
                    نمایش در بازار
                  </div>
                  <div className="mt-1 text-xs text-blue-100">
                    دسترسی مشتریان
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <BarChart3 size={23} />
                  <div className="mt-2 font-black">
                    رشد فروش
                  </div>
                  <div className="mt-1 text-xs text-blue-100">
                    دیده‌شدن بیشتر
                  </div>
                </div>

              </div>
            </div>

            {/* Login Card */}

            <div className="rounded-[2rem] border border-white/20 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <LockKeyhole size={27} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    ورود فروشگاه
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    برای ثبت محصول وارد حساب فروشگاه شوید.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    نام کاربری فروشگاه
                  </label>

                  <div className="relative">
                    <UserRound
                      size={19}
                      className="absolute right-4 top-3.5 text-slate-400"
                    />

                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="نام کاربری فروشگاه"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    رمز عبور
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute right-4 top-3.5 text-slate-400"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="رمز عبور فروشگاه"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "در حال بررسی..."
                  ) : (
                    <>
                      ورود و ثبت محصول
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>

              </div>

              <div className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-6 text-slate-500">
                حساب فروشگاه ندارید؟
                <Link
                  href="/store/register"
                  className="mr-1 font-black text-blue-700 hover:text-blue-900"
                >
                  ابتدا فروشگاه خود را ثبت کنید
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Advertising / Promotion */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Advertisement */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-7 text-white shadow-lg">

            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative">

              <div className="flex items-center gap-3">
                <Megaphone size={25} />

                <span className="text-sm font-black">
                  تبلیغات ویژه سرچنو
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-black leading-9">
                محصولاتت را بیشتر دیده‌شده کن!
              </h3>

              <p className="mt-3 text-sm leading-7 text-emerald-50">
                در آینده می‌توانید با استفاده از تبلیغات
                ویژه سرچنو، محصولات و فروشگاه خود را در
                بخش‌های ویژه بازار نمایش دهید.
              </p>

              <button
                type="button"
                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
              >
                به‌زودی فعال می‌شود
              </button>

            </div>
          </div>

          {/* Store Benefits */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Store size={23} />
              </div>

              <div>
                <h3 className="font-black">
                  فروشگاه شما در سرچنو
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  یک حساب، چندین محصول
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-4">

              <Benefit text="نیازی به ثبت دوباره اطلاعات فروشگاه نیست" />
              <Benefit text="امکان ثبت چندین محصول" />
              <Benefit text="مدیریت بهتر محصولات و قیمت‌ها" />
              <Benefit text="دیده‌شدن در بازار تخصصی ساخت‌وساز" />

            </div>

          </div>

          {/* Delivery */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Truck size={23} />
            </div>

            <h3 className="mt-5 text-xl font-black">
              بازار ساخت‌وساز
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              سرچنو تلاش می‌کند ارتباط میان فروشندگان،
              تأمین‌کنندگان، متخصصان و فعالان حوزه ساخت‌وساز
              را ساده‌تر و سریع‌تر کند.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-700">
              <ShieldCheck size={19} />
              محیط تخصصی ساخت‌وساز
            </div>

          </div>

        </div>

      </section>

      {/* Steps */}

      <section className="mx-auto max-w-6xl px-5 pb-14">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

          <div className="text-center">

            <div className="text-sm font-black text-blue-700">
              مسیر ثبت محصول
            </div>

            <h2 className="mt-2 text-2xl font-black">
              فقط چند قدم تا نمایش محصول شما
            </h2>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">

            <Step
              number="۱"
              title="ورود فروشگاه"
              text="نام کاربری و رمز عبور فروشگاه خود را وارد کنید."
            />

            <Step
              number="۲"
              title="ثبت محصول"
              text="اطلاعات محصول، قیمت و مشخصات را وارد کنید."
            />

            <Step
              number="۳"
              title="افزودن تصویر"
              text="تصاویر باکیفیت محصول را اضافه کنید."
            />

            <Step
              number="۴"
              title="بررسی سرچنو"
              text="اطلاعات محصول بررسی و پس از تأیید منتشر می‌شود."
            />

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-200 bg-white px-5 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">

          <div className="text-sm text-slate-500">
            © سرچنو - بازار هوشمند ساخت‌وساز
          </div>

          <Link
            href="/"
            className="text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            بازگشت به صفحه اصلی
          </Link>

        </div>

      </footer>

    </main>
  );
}

/* =====================================================
   Benefit
===================================================== */

function Benefit({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 size={15} />
      </div>

      <span className="text-sm font-bold leading-6 text-slate-600">
        {text}
      </span>

    </div>
  );
}

/* =====================================================
   Step
===================================================== */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-700/20">
        {number}
      </div>

      <h3 className="mt-4 font-black text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}
