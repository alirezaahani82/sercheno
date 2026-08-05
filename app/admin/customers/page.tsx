"use client";

import Link from "next/link";

export default function CustomersAdminPage() {
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
              مدیریت مشتریان
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت مشتریان، خریداران و افرادی که از خدمات سرچنو استفاده می‌کنند
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کل مشتریان
            </div>

            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مشتریان فعال
            </div>

            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مشتریان جدید
            </div>

            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              خرید انجام‌شده
            </div>

            <div className="mt-3 text-3xl font-black text-purple-600">
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

        {/* Customer Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست مشتریان
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                اطلاعات مشتریان پس از اتصال پنل به Supabase در این قسمت نمایش داده خواهد شد.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                type="button"
                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                همه
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

          {/* Search & Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی نام، موبایل یا ایمیل مشتری..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه شهرها</option>
              <option>تبریز</option>
              <option>تهران</option>
              <option>ارومیه</option>
              <option>زنجان</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه مشتریان</option>
              <option>خریدار مصالح</option>
              <option>دریافت‌کننده خدمات</option>
              <option>هر دو</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-blue-700 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-800"
            >
              جست‌وجو
            </button>

          </div>

          {/* Empty State */}
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              👥
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز مشتری‌ای برای نمایش وجود ندارد
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              پس از ثبت‌نام کاربران و ایجاد فعالیت خرید یا دریافت خدمات،
              اطلاعات مشتریان در این قسمت نمایش داده خواهد شد.
            </p>

          </div>

        </section>

        {/* Customer Activity */}
        <section className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              🛒
            </div>

            <h3 className="mt-5 font-black">
              خریدهای مشتریان
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              مشاهده سفارش‌ها و خریدهای انجام‌شده توسط مشتریان
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
              🛠️
            </div>

            <h3 className="mt-5 font-black">
              درخواست‌های خدمات
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              مشاهده درخواست‌های خدمات ثبت‌شده توسط مشتریان
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
              📋
            </div>

            <h3 className="mt-5 font-black">
              فعالیت مشتریان
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              بررسی فعالیت و تعامل مشتریان در پلتفرم سرچنو
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}
