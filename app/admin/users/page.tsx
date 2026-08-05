"use client";

import Link from "next/link";

export default function UsersAdminPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-bold text-blue-700">
              پنل مدیریت سرچنو
            </div>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              مدیریت کاربران
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت حساب‌های کاربری، وضعیت کاربران و فعالیت آن‌ها در سرچنو
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کل کاربران
            </div>

            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کاربران فعال
            </div>

            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کاربران جدید
            </div>

            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مسدود شده
            </div>

            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

        </div>

        {/* User Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست کاربران
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                اطلاعات کاربران پس از اتصال این بخش به Supabase در این قسمت
                نمایش داده خواهد شد.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                type="button"
                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                همه کاربران
              </button>

              <button
                type="button"
                className="rounded-xl bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-200"
              >
                فعال
              </button>

              <button
                type="button"
                className="rounded-xl bg-red-100 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-200"
              >
                مسدود شده
              </button>

            </div>

          </div>

          {/* Search */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row">

            <input
              type="text"
              placeholder="جست‌وجو بر اساس نام، شماره موبایل یا ایمیل..."
              className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              className="rounded-2xl bg-blue-700 px-8 py-4 text-sm font-black text-white transition hover:bg-blue-800"
            >
              جست‌وجو
            </button>

          </div>

          {/* Empty State */}
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              👤
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز کاربری برای نمایش وجود ندارد
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              پس از اتصال پنل مدیریت کاربران به Supabase، کاربران ثبت‌نام‌شده
              در این قسمت نمایش داده می‌شوند و امکان مدیریت وضعیت حساب آن‌ها
              فراهم خواهد شد.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}
