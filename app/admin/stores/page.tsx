"use client";

import Link from "next/link";

export default function StoresAdminPage() {
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
              مدیریت فروشندگان و فروشگاه‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت، بررسی و تأیید فروشگاه‌ها و تأمین‌کنندگان ثبت‌شده در سرچنو
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
              کل فروشگاه‌ها
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
              در انتظار بررسی
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
              تأیید شده
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
              رد شده
            </div>
            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

        </div>

        {/* Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فروشگاه‌ها و تأمین‌کنندگان
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                پس از اتصال به Supabase، اطلاعات واقعی فروشگاه‌ها در این قسمت نمایش داده می‌شود.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                className="rounded-xl bg-amber-100 px-5 py-3 text-sm font-bold text-amber-700"
              >
                در انتظار بررسی
              </button>

              <button
                className="rounded-xl bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-700"
              >
                تأیید شده
              </button>

              <button
                className="rounded-xl bg-red-100 px-5 py-3 text-sm font-bold text-red-700"
              >
                رد شده
              </button>

            </div>

          </div>

          {/* Empty State */}
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              🏪
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز فروشگاهی برای نمایش وجود ندارد
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              پس از ثبت فروشگاه توسط فروشندگان، اطلاعات آن‌ها در این قسمت
              نمایش داده می‌شود و شما می‌توانید آن‌ها را بررسی و تأیید کنید.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}
