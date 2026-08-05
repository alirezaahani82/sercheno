"use client";

import Link from "next/link";

export default function PaymentsAdminPage() {
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
              مدیریت پرداخت‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت تراکنش‌ها، پرداخت‌های موفق، ناموفق، در انتظار و بازپرداخت‌ها
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
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                کل پرداخت‌ها
              </span>
              <span className="text-2xl">💳</span>
            </div>

            <div className="mt-4 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                موفق
              </span>
              <span className="text-2xl">✅</span>
            </div>

            <div className="mt-4 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                در انتظار
              </span>
              <span className="text-2xl">⏳</span>
            </div>

            <div className="mt-4 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                ناموفق
              </span>
              <span className="text-2xl">❌</span>
            </div>

            <div className="mt-4 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                بازپرداخت
              </span>
              <span className="text-2xl">↩️</span>
            </div>

            <div className="mt-4 text-3xl font-black text-purple-600">
              ۰
            </div>
          </div>

        </div>

        {/* Amount Statistics */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl bg-gradient-to-l from-blue-700 to-blue-900 p-7 text-white shadow-sm">
            <div className="text-sm font-bold text-blue-100">
              مبلغ کل پرداخت‌های موفق
            </div>

            <div className="mt-4 text-3xl font-black">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-blue-200">
              مجموع تراکنش‌های موفق
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-l from-emerald-600 to-emerald-800 p-7 text-white shadow-sm">
            <div className="text-sm font-bold text-emerald-100">
              مبلغ دریافتی امروز
            </div>

            <div className="mt-4 text-3xl font-black">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-emerald-200">
              پرداخت‌های موفق امروز
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-l from-purple-600 to-purple-800 p-7 text-white shadow-sm">
            <div className="text-sm font-bold text-purple-100">
              مبلغ بازپرداخت‌شده
            </div>

            <div className="mt-4 text-3xl font-black">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-purple-200">
              مجموع مبالغ برگشت داده‌شده
            </p>
          </div>

        </div>

        {/* Filters */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              جست‌وجو و فیلتر پرداخت‌ها
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تراکنش مورد نظر را بر اساس اطلاعات پرداخت پیدا کنید.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">

            <input
              type="text"
              placeholder="شماره تراکنش..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="شماره سفارش..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="نام مشتری..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>موفق</option>
              <option>در انتظار</option>
              <option>ناموفق</option>
              <option>بازپرداخت‌شده</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              جست‌وجو
            </button>

          </div>
        </section>

        {/* Payments Table */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست تراکنش‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                تمام پرداخت‌های ثبت‌شده در سیستم
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              خروجی گزارش
            </button>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[950px] text-right text-sm">

              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-4 font-bold">
                    شماره تراکنش
                  </th>

                  <th className="px-4 py-4 font-bold">
                    سفارش
                  </th>

                  <th className="px-4 py-4 font-bold">
                    مشتری
                  </th>

                  <th className="px-4 py-4 font-bold">
                    مبلغ
                  </th>

                  <th className="px-4 py-4 font-bold">
                    روش پرداخت
                  </th>

                  <th className="px-4 py-4 font-bold">
                    تاریخ
                  </th>

                  <th className="px-4 py-4 font-bold">
                    وضعیت
                  </th>

                  <th className="px-4 py-4 font-bold">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-16 text-center"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                      💳
                    </div>

                    <h3 className="mt-5 text-xl font-black text-slate-800">
                      هنوز تراکنشی ثبت نشده است
                    </h3>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
                      پس از اتصال سیستم پرداخت به Supabase، تمام تراکنش‌های
                      واقعی کاربران در این قسمت نمایش داده خواهند شد.
                    </p>
                  </td>
                </tr>
              </tbody>

            </table>

          </div>
        </section>

        {/* Payment Methods */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black text-slate-900">
            روش‌های پرداخت
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            وضعیت پرداخت‌ها بر اساس درگاه و روش پرداخت
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="text-3xl">🏦</div>

              <h3 className="mt-4 font-black">
                درگاه اینترنتی
              </h3>

              <div className="mt-3 text-2xl font-black text-blue-700">
                ۰
              </div>

              <p className="mt-1 text-xs text-slate-400">
                تراکنش
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="text-3xl">💳</div>

              <h3 className="mt-4 font-black">
                کارت بانکی
              </h3>

              <div className="mt-3 text-2xl font-black text-emerald-600">
                ۰
              </div>

              <p className="mt-1 text-xs text-slate-400">
                تراکنش
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="text-3xl">📱</div>

              <h3 className="mt-4 font-black">
                پرداخت آنلاین
              </h3>

              <div className="mt-3 text-2xl font-black text-purple-600">
                ۰
              </div>

              <p className="mt-1 text-xs text-slate-400">
                تراکنش
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="text-3xl">🧾</div>

              <h3 className="mt-4 font-black">
                سایر روش‌ها
              </h3>

              <div className="mt-3 text-2xl font-black text-amber-600">
                ۰
              </div>

              <p className="mt-1 text-xs text-slate-400">
                تراکنش
              </p>
            </div>

          </div>
        </section>

        {/* Payment Controls */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            مدیریت عملیات پرداخت
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🔎</div>

              <h3 className="mt-3 font-black">
                بررسی تراکنش
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                مشاهده جزئیات کامل هر تراکنش
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">↩️</div>

              <h3 className="mt-3 font-black">
                بازپرداخت
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                مدیریت درخواست‌های بازپرداخت وجه
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📊</div>

              <h3 className="mt-3 font-black">
                گزارش پرداخت‌ها
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                گزارش‌گیری از عملکرد پرداخت‌ها
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🔐</div>

              <h3 className="mt-3 font-black">
                کنترل امنیت
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                بررسی تراکنش‌های مشکوک و ناموفق
              </p>
            </div>

          </div>
        </section>

        {/* Notice */}
        <section className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              ℹ️
            </div>

            <div>
              <h2 className="font-black text-blue-900">
                اتصال به سیستم پرداخت
              </h2>

              <p className="mt-2 text-sm leading-7 text-blue-800">
                در این مرحله اطلاعات به‌صورت اولیه نمایش داده می‌شود.
                پس از اتصال درگاه پرداخت و Supabase، وضعیت و مبالغ واقعی
                تراکنش‌ها به‌صورت خودکار در این پنل نمایش داده خواهند شد.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
