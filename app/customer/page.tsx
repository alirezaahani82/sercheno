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

  national_code?: string;
  birth_date?: string;
  father_name?: string;
  job?: string;
  address?: string;
  postal_code?: string;

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
      const savedCustomer = localStorage.getItem("sercheno_customer");

      if (!savedCustomer) {
        setLoading(false);
        return;
      }

      const parsedCustomer: Customer = JSON.parse(savedCustomer);

      setCustomer(parsedCustomer);
    } catch (error) {
      console.error("CUSTOMER DATA ERROR:", error);
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
        className="flex min-h-screen items-center justify-center bg-slate-100 px-5"
      >
        <div className="rounded-[2rem] bg-white px-10 py-9 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            ⏳
          </div>

          <h1 className="mt-5 text-xl font-black text-slate-800">
            در حال بارگذاری پنل مشتری
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            لطفاً کمی صبر کنید...
          </p>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-5"
      >
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
            👤
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            ورود به حساب لازم است
          </h1>

          <p className="mt-3 text-sm leading-8 text-slate-500">
            برای مشاهده پنل مشتری سرچنو ابتدا وارد حساب
            کاربری خود شوید.
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

  const firstName = customer.first_name || "مشتری";
  const lastName = customer.last_name || "";

  const fullName = `${firstName} ${lastName}`.trim();

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
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          {/* LOGO */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="لوگوی سرچنو"
              className="h-11 w-11 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">
                سرچنو
              </div>

              <div className="hidden text-xs text-slate-500 sm:block">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-2">
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

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-7 sm:py-10">
        {/* =================================================== */}
        {/* WELCOME */}
        {/* =================================================== */}

        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <div className="text-sm font-bold text-blue-400">
              پنل مشتری سرچنو
            </div>

            <h1 className="mt-4 text-3xl font-black leading-relaxed sm:text-4xl">
              سلام{" "}
              <span className="text-blue-400">
                {firstName}
              </span>{" "}
              👋
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
              به پنل مشتری سرچنو خوش آمدید.
              از این قسمت می‌توانید پروفایل، خریدها،
              سفارش‌ها، سبد خرید و امتیازات خود را مدیریت کنید.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                شروع خرید
              </Link>

              <Link
                href="/customer/profile"
                className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/20"
              >
                مشاهده پروفایل
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================== */}
        {/* PROFILE STATUS */}
        {/* =================================================== */}

        {!profileCompleted ? (
          <section className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                  ⚠️
                </div>

                <div>
                  <h2 className="font-black text-amber-900">
                    پروفایل شما هنوز کامل نیست
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-amber-800/80">
                    برای استفاده از امکانات خرید و معاملات،
                    اطلاعات هویتی خود را تکمیل کنید.
                  </p>
                </div>
              </div>

              <Link
                href="/customer/profile"
                className="rounded-2xl bg-amber-500 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-amber-600"
              >
                تکمیل پروفایل
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700">
                ✓
              </div>

              <div>
                <div className="font-black text-emerald-800">
                  پروفایل شما تکمیل شده است
                </div>

                <div className="mt-1 text-xs text-emerald-700">
                  حساب شما آماده استفاده از امکانات مشتری است.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =================================================== */}
        {/* STATISTICS */}
        {/* =================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="تعداد خریدها"
            value={ordersCount.toString()}
            icon="📦"
            bg="bg-blue-50"
          />

          <StatCard
            title="سبد خرید"
            value="۰"
            icon="🛒"
            bg="bg-orange-50"
          />

          <StatCard
            title="امتیاز باشگاه"
            value={loyaltyPoints.toString()}
            icon="⭐"
            bg="bg-amber-50"
          />

          <StatCard
            title="وضعیت پروفایل"
            value={
              profileCompleted
                ? "تکمیل"
                : "ناقص"
            }
            icon="👤"
            bg="bg-emerald-50"
          />
        </section>

        {/* =================================================== */}
        {/* PROFILE + CLUB */}
        {/* =================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* PROFILE */}

          <div className="rounded-[2rem] bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-bold text-blue-700">
                  حساب کاربری
                </div>

                <h2 className="mt-2 text-2xl font-black">
                  اطلاعات من
                </h2>
              </div>

              <Link
                href="/customer/profile"
                className="rounded-xl bg-blue-50 px-4 py-2 text-center text-sm font-black text-blue-700 transition hover:bg-blue-100"
              >
                ویرایش پروفایل
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoItem
                label="نام و نام خانوادگی"
                value={fullName || "-"}
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
          </div>

          {/* CLUB */}

          <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
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

            <div className="mt-7 rounded-2xl bg-slate-50 p-6 text-center">
              <div className="text-4xl font-black text-amber-500">
                {loyaltyPoints}
              </div>

              <div className="mt-2 text-sm font-bold text-slate-500">
                امتیاز
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
            >
              مشاهده جزئیات باشگاه
            </button>
          </div>
        </section>

        {/* =================================================== */}
        {/* QUICK ACCESS */}
        {/* =================================================== */}

        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="text-sm font-bold text-blue-700">
              دسترسی سریع
            </div>

            <h2 className="mt-2 text-2xl font-black">
              امکانات پنل مشتری
            </h2>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              href="/customer/profile"
              icon="👤"
              title="پروفایل من"
              description="مشاهده و تکمیل اطلاعات هویتی و شخصی"
            />

            <ActionCard
              href="/cart"
              icon="🛒"
              title="سبد خرید"
              description="مشاهده کالاهای انتخاب‌شده و ادامه خرید"
            />

            <ActionCard
              href="/customer/orders"
              icon="📦"
              title="سفارش‌های من"
              description="مشاهده سفارش‌ها و سوابق خرید"
            />

            <ActionCard
              href="/"
              icon="🏗️"
              title="بازار سرچنو"
              description="مشاهده مصالح، تجهیزات و خدمات ساختمانی"
            />
          </div>
        </section>

        {/* =================================================== */}
        {/* CUSTOMER FEATURES */}
        {/* =================================================== */}

        <section className="mt-6 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon="💳"
            title="خرید آسان"
            description="امکان خرید محصولات و خدمات ساختمانی از بازار سرچنو."
          />

          <FeatureCard
            icon="📋"
            title="مدیریت سفارش‌ها"
            description="سوابق سفارش‌ها و وضعیت خریدهای خود را مشاهده کنید."
          />

          <FeatureCard
            icon="⭐"
            title="باشگاه مشتریان"
            description="با خرید از سرچنو امتیاز دریافت کرده و از مزایا استفاده کنید."
          />
        </section>

        {/* =================================================== */}
        {/* PURCHASE NOTICE */}
        {/* =================================================== */}

        {!profileCompleted && (
          <section className="mt-6 overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-bold text-blue-400">
                  آماده خرید هستید؟
                </div>

                <h2 className="mt-2 text-2xl font-black">
                  ابتدا پروفایل خود را تکمیل کنید
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  تکمیل اطلاعات هویتی برای انجام امن معاملات
                  در سرچنو ضروری است.
                </p>
              </div>

              <Link
                href="/customer/profile"
                className="shrink-0 rounded-2xl bg-blue-600 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-blue-700"
              >
                تکمیل اطلاعات
              </Link>
            </div>
          </section>
        )}
      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        © سرچنو - بازار هوشمند ساخت‌وساز
      </footer>
    </main>
  );
}

/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

function StatCard({
  title,
  value,
  icon,
  bg,
}: {
  title: string;
  value: string;
  icon: string;
  bg: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">
            {title}
          </div>

          <div className="mt-3 text-3xl font-black text-slate-900">
            {value}
          </div>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${bg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* INFO ITEM */
/* ========================================================= */

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

      <div className="mt-2 break-words font-black text-slate-800">
        {value}
      </div>
    </div>
  );
}

/* ========================================================= */
/* ACTION CARD */
/* ========================================================= */

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
    >
      <div className="text-3xl transition group-hover:scale-110">
        {icon}
      </div>

      <div className="mt-4 font-black text-slate-900">
        {title}
      </div>

      <div className="mt-2 text-xs leading-6 text-slate-500">
        {description}
      </div>
    </Link>
  );
}

/* ========================================================= */
/* FEATURE CARD */
/* ========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        {icon}
      </div>

      <h3 className="mt-5 font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
                }
