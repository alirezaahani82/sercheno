"use client";

import Link from "next/link";

export default function OrdersAdminPage() {
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
              مدیریت سفارش‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت سفارش‌های ثبت‌شده، وضعیت ارسال، پرداخت و اطلاعات مشتریان
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
              کل سفارش‌ها
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              در انتظار پرداخت
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              در حال پردازش
            </div>
            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              ارسال‌شده
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              لغوشده
            </div>
            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

        </div>

        {/* Orders Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست سفارش‌ها
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                سفارش‌های ثبت‌شده توسط مشتریان پس از اتصال این بخش به Supabase
                در این قسمت نمایش داده خواهند شد.
              </p>
            </div>

          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی شماره سفارش یا مشتری..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              defaultValue="all"
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="pending">در انتظار پرداخت</option>
              <option value="processing">در حال پردازش</option>
              <option value="shipped">ارسال‌شده</option>
              <option value="delivered">تحویل‌شده</option>
              <option value="cancelled">لغوشده</option>
            </select>

            <select
              defaultValue="all"
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none"
            >
              <option value="all">همه روش‌های پرداخت</option>
              <option value="online">پرداخت آنلاین</option>
              <option value="installment">پرداخت اقساطی</option>
              <option value="cash">پرداخت مستقیم</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              جست‌وجو و فیلتر
            </button>

          </div>

          {/* Empty State */}
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              🛒
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز سفارشی ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              سفارش‌های مشتریان پس از ثبت خرید در این قسمت نمایش داده می‌شوند
              و مدیر می‌تواند وضعیت پرداخت، پردازش، ارسال و تحویل آن‌ها را
              مدیریت کند.
            </p>

          </div>

        </section>

        {/* Order Management */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            مدیریت چرخه سفارش
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">💳</div>

              <h3 className="mt-3 font-black">
                پرداخت
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                بررسی وضعیت پرداخت و ثبت تراکنش سفارش
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📦</div>

              <h3 className="mt-3 font-black">
                پردازش سفارش
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                بررسی اقلام، فروشنده و آماده‌سازی سفارش
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🚚</div>

              <h3 className="mt-3 font-black">
                ارسال
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                مدیریت وضعیت ارسال و اطلاعات تحویل سفارش
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">✅</div>

              <h3 className="mt-3 font-black">
                تحویل
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                ثبت تحویل سفارش و تکمیل فرآیند خرید
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
