"use client";

import Link from "next/link";

const panels = [
  {
    title: "مدیریت متخصصان",
    description: "بررسی، تأیید و مدیریت متخصصان خدمات ساختمانی",
    href: "/admin/service",
    icon: "👷",
  },
  {
    title: "مدیریت فروشندگان",
    description: "بررسی و مدیریت فروشگاه‌ها و تأمین‌کنندگان",
    href: "/admin/stores",
    icon: "🏪",
  },
  {
    title: "مدیریت کاربران",
    description: "مدیریت کاربران و حساب‌های مشتریان سرچنو",
    href: "/admin/users",
    icon: "👤",
  },
  {
    title: "مدیریت مشتریان",
    description: "مشاهده و مدیریت مشتریان و فعالیت‌های آن‌ها",
    href: "/admin/customers",
    icon: "🧑‍💼",
  },
  {
    title: "مناقصات",
    description: "مدیریت پروژه‌ها، مناقصات و پیشنهادهای شرکت‌ها",
    href: "/admin/tenders",
    icon: "📋",
  },
  {
    title: "پروژه‌های ثبت‌شده",
    description: "بررسی و مدیریت پروژه‌های ثبت‌شده",
    href: "/admin/projects",
    icon: "🏗️",
  },
  {
    title: "مدیریت محصولات",
    description: "مدیریت محصولات و کالاهای ساختمانی",
    href: "/admin/products",
    icon: "📦",
  },
  {
    title: "دسته‌بندی‌ها",
    description: "مدیریت دسته‌بندی مصالح، تجهیزات و خدمات",
    href: "/admin/categories",
    icon: "🗂️",
  },
  {
    title: "سفارش‌ها",
    description: "پیگیری و مدیریت سفارش‌های ثبت‌شده",
    href: "/admin/orders",
    icon: "🛒",
  },
  {
    title: "مالی",
    description: "مدیریت درآمد، هزینه‌ها و تراکنش‌های سرچنو",
    href: "/admin/finance",
    icon: "💰",
  },
  {
    title: "سود و درآمد",
    description: "گزارش سود، درآمد و عملکرد مالی",
    href: "/admin/revenue",
    icon: "📈",
  },
  {
    title: "پرداخت‌ها",
    description: "مدیریت پرداخت‌ها و وضعیت تراکنش‌ها",
    href: "/admin/payments",
    icon: "💳",
  },
  {
    title: "گزارش‌ها",
    description: "گزارش‌های مدیریتی و آماری سرچنو",
    href: "/admin/reports",
    icon: "📊",
  },
  {
    title: "پیام‌ها و پشتیبانی",
    description: "مدیریت پیام‌ها، درخواست‌ها و پشتیبانی کاربران",
    href: "/admin/support",
    icon: "💬",
  },
  {
    title: "تبلیغات",
    description: "مدیریت تبلیغات و جایگاه‌های تبلیغاتی",
    href: "/admin/ads",
    icon: "📢",
  },
  {
    title: "اعلان‌ها",
    description: "مدیریت اعلان‌ها و اطلاع‌رسانی‌های سامانه",
    href: "/admin/notifications",
    icon: "🔔",
  },
  {
    title: "تنظیمات و دسترسی",
    description: "تنظیمات سامانه و مدیریت دسترسی‌های مدیریتی",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function AdminDashboard() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 text-slate-900"
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="سرچنو"
              className="h-14 w-14 rounded-2xl object-contain"
            />

            <div>
              <h1 className="text-2xl font-black text-blue-700">
                داشبورد مدیریت سرچنو فقط علیرضا آهنی دسترسی دارد
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                مدیریت کامل پلتفرم سرچنو
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            مشاهده سایت ←
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* Welcome */}
        <section className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-l from-blue-700 to-blue-900 p-8 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                🔐 دسترسی مدیر اصلی
              </span>

              <h2 className="mt-5 text-3xl font-black">
                خوش آمدید، مدیر سرچنو
              </h2>

              <p className="mt-3 max-w-2xl leading-8 text-blue-100">
                از این بخش می‌توانید تمام قسمت‌های مدیریتی سرچنو،
                کاربران، فروشندگان، متخصصان، محصولات، مناقصات و
                امور مالی را مدیریت کنید.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 px-7 py-6 text-center backdrop-blur">
              <div className="text-4xl font-black">
                ۱۷
              </div>

              <div className="mt-2 text-sm text-blue-100">
                پنل مدیریتی
              </div>
            </div>
          </div>
        </section>

        {/* Panels */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              پنل‌های مدیریت
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              برای ورود به هر بخش، پنل مورد نظر را انتخاب کنید.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {panels.map((panel, index) => (
              <Link
                key={panel.href}
                href={panel.href}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl transition group-hover:bg-blue-100">
                    {panel.icon}
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-black">
                  {panel.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-7 text-slate-500">
                  {panel.description}
                </p>

                <div className="mt-5 text-sm font-black text-blue-700 transition group-hover:text-blue-800">
                  ورود به پنل ←
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Info */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-bold text-slate-400">
              وضعیت سامانه
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />

              <span className="font-black text-emerald-600">
                فعال
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-bold text-slate-400">
              سطح دسترسی
            </div>

            <div className="mt-3 font-black text-blue-700">
              مدیر اصلی
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-bold text-slate-400">
              دسترسی
            </div>

            <div className="mt-3 font-black text-slate-800">
              تمام پنل‌ها
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
