"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  id?: string;
  auth_user_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  city?: string;
  profile_completed?: boolean;
  is_active?: boolean;
  orders_count?: number;
  loyalty_points?: number;
};

export default function CustomerPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      /*
       * اطلاعات مشتری که هنگام ورود دریافت شده است.
       *
       * اگر Login API اطلاعات مشتری را در localStorage
       * ذخیره کرده باشد، اینجا نمایش داده می‌شود.
       */
      const savedCustomer =
        localStorage.getItem("sercheno_customer");

      if (savedCustomer) {
        setCustomer(JSON.parse(savedCustomer));
      }
    } catch (error) {
      console.error(
        "CUSTOMER DATA ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("sercheno_customer");

    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="text-lg font-black text-slate-800">
            در حال بارگذاری پنل مشتری...
          </div>

          <div className="mt-3 text-sm text-slate-400">
            لطفاً کمی صبر کنید
          </div>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 px-5"
      >
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
            👤
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            ورود به حساب لازم است
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            برای مشاهده پنل مشتری ابتدا وارد حساب کاربری خود شوید.
          </p>

          <Link
            href="/login"
            className="mt-6 block rounded-2xl bg-blue-700 px-5 py-4 font-black text-white transition hover:bg-blue-800"
          >
            ورود به حساب
          </Link>

          <Link
            href="/register"
            className="mt-3 block rounded-2xl bg-slate-100 px-5 py-4 font-bold text-slate-700 transition hover:bg-slate-200"
          >
            ثبت‌نام مشتری
          </Link>
        </div>
      </main>
    );
  }

  const firstName =
    customer.first_name || "مشتری";

  const lastName =
    customer.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim();

  const profileCompleted =
    customer.profile_completed === true;

  const ordersCount =
    customer.orders_count ?? 0;

  const loyaltyPoints =
    customer.loyalty_points ?? 0;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 text-slate-900"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          {/* LOGO */}
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

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="hidden rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 sm:block"
            >
              صفحه اصلی
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              خروج
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10">

        {/* WELCOME */}
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-10">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">

            <div className="text-sm font-bold text-blue-400">
              پنل مشتری سرچنو
            </div>

            <h1 className="mt-4 text-3xl font-black leading-relaxed sm:text-4xl">
              سلام 👋{" "}
              <span className="text-blue-400">
                {firstName}
              </span>
              ، خوش اومدی به سرچنو
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
              از این قسمت می‌توانید اطلاعات حساب خود را مدیریت کنید،
              پروفایل هویتی خود را تکمیل کنید، خریدهای خود را مشاهده
              کنید و امتیاز باشگاه مشتریان خود را بررسی کنید.
            </p>

          </div>
        </div>

        {/* PROFILE WARNING */}
        {!profileCompleted && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                  ⚠️
                </div>

                <div>
                  <h2 className="font-black text-amber-900">
                    پروفایل شما کامل نیست
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-amber-800/80">
                    برای انجام خرید در سرچنو باید اطلاعات هویتی
                    و پروفایل خود را تکمیل کنید.
                  </p>
                </div>

              </div>

              <Link
                href="/customer/profile"
                className="shrink-0 rounded-2xl bg-amber-500 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-amber-600"
              >
                تکمیل اطلاعات هویتی
              </Link>

            </div>

          </div>
        )}

        {/* PROFILE COMPLETED */}
        {profileCompleted && (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                ✓
              </div>

              <div>
                <div className="font-black text-emerald-800">
                  پروفایل شما تکمیل شده است
                </div>

                <div className="mt-1 text-xs text-emerald-700">
                  امکان استفاده از امکانات خرید برای شما فعال است.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* STATISTICS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* ORDERS */}
          <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <div className="text-sm font-bold text-slate-500">
                  تعداد خریدها
                </div>

                <div className="mt-3 text-3xl font-black text-slate-900">
                  {ordersCount}
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                📦
              </div>

            </div>

          </div>

          {/* CART */}
          <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <div className="text-sm font-bold text-slate-500">
                  سبد خرید
                </div>

                <div className="mt-3 text-3xl font-black text-slate-900">
                  ۰
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                🛒
              </div>

            </div>

          </div>

          {/* LOYALTY */}
          <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <div className="text-sm font-bold text-slate-500">
                  امتیاز باشگاه مشتریان
                </div>

                <div className="mt-3 text-3xl font-black text-amber-500">
                  {loyaltyPoints}
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
                ⭐
              </div>

            </div>

          </div>

          {/* PROFILE */}
          <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <div className="text-sm font-bold text-slate-500">
                  وضعیت پروفایل
                </div>

                <div
                  className={`mt-3 text-lg font-black ${
                    profileCompleted
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {profileCompleted
                    ? "تکمیل شده"
                    : "ناقص"}
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                👤
              </div>

            </div>

          </div>

        </div>

        {/* DASHBOARD GRID */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* PROFILE */}
          <section className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-black">
                  اطلاعات حساب من
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  اطلاعات اولیه حساب مشتری
                </p>
              </div>

              <Link
                href="/customer/profile"
                className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100"
              >
                ویرایش
              </Link>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <InfoItem
                label="نام و نام خانوادگی"
                value={fullName}
              />

              <InfoItem
                label="نام کاربری"
                value={customer.username || "-"}
              />

              <InfoItem
                label="شماره تماس"
                value={customer.phone || "-"}
              />

              <InfoItem
                label="شهر"
                value={customer.city || "-"}
              />

            </div>

          </section>

          {/* CLUB */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
                ⭐
              </div>

              <div>
                <h2 className="font-black">
                  باشگاه مشتریان
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  امتیازات شما
                </p>
              </div>

            </div>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-center">

              <div className="text-4xl font-black text-amber-500">
                {loyaltyPoints}
              </div>

              <div className="mt-2 text-sm font-bold text-slate-500">
                امتیاز
              </div>

            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-600"
            >
              مشاهده جزئیات باشگاه
            </button>

          </section>

        </div>

        {/* ACTIONS */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black">
            دسترسی سریع
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* COMPLETE PROFILE */}
            <Link
              href="/customer/profile"
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="text-2xl">
                👤
              </div>

              <div className="mt-4 font-black">
                تکمیل پروفایل
              </div>

              <div className="mt-2 text-xs leading-6 text-slate-500">
                اطلاعات هویتی و شخصی خود را تکمیل کنید.
              </div>
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <div className="text-2xl">
                🛒
              </div>

              <div className="mt-4 font-black">
                سبد خرید
              </div>

              <div className="mt-2 text-xs leading-6 text-slate-500">
                کالاهای انتخاب‌شده خود را مشاهده کنید.
              </div>
            </Link>

            {/* ORDERS */}
            <Link
              href="/customer/orders"
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <div className="text-2xl">
                📦
              </div>

              <div className="mt-4 font-black">
                خریدهای قبلی
              </div>

              <div className="mt-2 text-xs leading-6 text-slate-500">
                سفارش‌ها و خریدهای قبلی خود را ببینید.
              </div>
            </Link>

            {/* SHOP */}
            <Link
              href="/"
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-purple-300 hover:bg-purple-50"
            >
              <div className="text-2xl">
                🏗️
              </div>

              <div className="mt-4 font-black">
                ادامه خرید
              </div>

              <div className="mt-2 text-xs leading-6 text-slate-500">
                به بازار سرچنو بروید و محصولات را مشاهده کنید.
              </div>
            </Link>

          </div>

        </section>

        {/* PURCHASE NOTICE */}
        {!profileCompleted && (
          <section className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="text-sm font-bold text-blue-400">
                  خرید در سرچنو
                </div>

                <h2 className="mt-2 text-xl font-black">
                  قبل از خرید، پروفایل خود را تکمیل کنید
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-400">
                  برای حفظ امنیت معاملات و تکمیل اطلاعات مشتری،
                  تکمیل اطلاعات هویتی قبل از خرید الزامی است.
                </p>
              </div>

              <Link
                href="/customer/profile"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700"
              >
                تکمیل پروفایل
              </Link>

            </div>

          </section>
        )}

      </section>

      {/* FOOTER */}
      <footer className="pb-8 text-center text-xs text-slate-400">
        © سرچنو - بازار هوشمند ساخت‌وساز
      </footer>

    </main>
  );
}

/* INFO ITEM */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-2 font-black text-slate-800">
        {value}
      </div>
    </div>
  );
                }
