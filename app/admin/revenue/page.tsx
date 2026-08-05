"use client";

import Link from "next/link";

export default function RevenueAdminPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-bold text-emerald-600">
              پنل مدیریت سرچنو
            </div>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              مدیریت سود و درآمد
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              بررسی درآمد، سود، منابع درآمدی و عملکرد مالی سرچنو
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* Main Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                درآمد کل
              </span>
              <span className="text-2xl">💰</span>
            </div>

            <div className="mt-4 text-3xl font-black text-blue-700">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              مجموع درآمد ثبت‌شده
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                هزینه کل
              </span>
              <span className="text-2xl">💸</span>
            </div>

            <div className="mt-4 text-3xl font-black text-red-500">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              مجموع هزینه‌های ثبت‌شده
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                سود خالص
              </span>
              <span className="text-2xl">📈</span>
            </div>

            <div className="mt-4 text-3xl font-black text-emerald-600">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              درآمد پس از کسر هزینه‌ها
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                حاشیه سود
              </span>
              <span className="text-2xl">📊</span>
            </div>

            <div className="mt-4 text-3xl font-black text-purple-600">
              ۰٪
            </div>

            <p className="mt-2 text-xs text-slate-400">
              درصد سود نسبت به درآمد
            </p>
          </div>

        </div>

        {/* Revenue Sources */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              منابع درآمد سرچنو
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              درآمد هر بخش به‌صورت جداگانه قابل بررسی خواهد بود.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl bg-blue-50 p-6">
              <div className="text-3xl">🏪</div>

              <h3 className="mt-4 font-black">
                فروشگاه‌ها و محصولات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                درآمد حاصل از فروش محصولات و خدمات فروشندگان
              </p>

              <div className="mt-5 text-2xl font-black text-blue-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-6">
              <div className="text-3xl">🛠️</div>

              <h3 className="mt-4 font-black">
                خدمات متخصصان
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                درآمد حاصل از خدمات و فعالیت متخصصان
              </p>

              <div className="mt-5 text-2xl font-black text-emerald-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-3xl bg-purple-50 p-6">
              <div className="text-3xl">📋</div>

              <h3 className="mt-4 font-black">
                شرکت در مناقصات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                درآمد حاصل از هزینه شرکت در مناقصات
              </p>

              <div className="mt-5 text-2xl font-black text-purple-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-3xl bg-amber-50 p-6">
              <div className="text-3xl">➕</div>

              <h3 className="mt-4 font-black">
                سایر درآمدها
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                سایر منابع درآمدی سرچنو
              </p>

              <div className="mt-5 text-2xl font-black text-amber-700">
                ۰ تومان
              </div>
            </div>

          </div>
        </section>

        {/* Profit Overview */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                وضعیت سود
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                مقایسه درآمد و هزینه برای محاسبه سود واقعی سرچنو
              </p>
            </div>

            <select className="rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none">
              <option>امسال</option>
              <option>این ماه</option>
              <option>ماه گذشته</option>
              <option>سه ماه اخیر</option>
              <option>شش ماه اخیر</option>
              <option>سال گذشته</option>
            </select>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-slate-500">
                درآمد
              </div>

              <div className="mt-3 text-2xl font-black text-blue-700">
                ۰ تومان
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-0 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-slate-500">
                هزینه
              </div>

              <div className="mt-3 text-2xl font-black text-red-500">
                ۰ تومان
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-0 rounded-full bg-red-500" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-slate-500">
                سود خالص
              </div>

              <div className="mt-3 text-2xl font-black text-emerald-600">
                ۰ تومان
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-0 rounded-full bg-emerald-500" />
              </div>
            </div>

          </div>
        </section>

        {/* Monthly Revenue */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black text-slate-900">
            درآمد ماهانه
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            گزارش درآمد ماه‌های سال
          </p>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[700px] text-right text-sm">

              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-4 font-bold">
                    ماه
                  </th>

                  <th className="px-4 py-4 font-bold">
                    درآمد
                  </th>

                  <th className="px-4 py-4 font-bold">
                    هزینه
                  </th>

                  <th className="px-4 py-4 font-bold">
                    سود
                  </th>

                  <th className="px-4 py-4 font-bold">
                    وضعیت
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  "فروردین",
                  "اردیبهشت",
                  "خرداد",
                  "تیر",
                  "مرداد",
                  "شهریور",
                  "مهر",
                  "آبان",
                  "آذر",
                  "دی",
                  "بهمن",
                  "اسفند",
                ].map((month) => (
                  <tr
                    key={month}
                    className="border-b border-slate-100"
                  >
                    <td className="px-4 py-4 font-bold text-slate-700">
                      {month}
                    </td>

                    <td className="px-4 py-4 text-blue-700">
                      ۰ تومان
                    </td>

                    <td className="px-4 py-4 text-red-500">
                      ۰ تومان
                    </td>

                    <td className="px-4 py-4 font-bold text-emerald-600">
                      ۰ تومان
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                        بدون داده
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </section>

        {/* Revenue Transactions */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                آخرین درآمدها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                آخرین مبالغی که برای سرچنو ثبت شده‌اند
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
            >
              ثبت درآمد
            </button>

          </div>

          <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              💰
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز درآمدی ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              پس از اتصال این بخش به سیستم مالی و Supabase، درآمدهای واقعی
              سرچنو در این قسمت نمایش داده خواهند شد.
            </p>

          </div>

        </section>

        {/* Important Financial Controls */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            کنترل و تحلیل درآمد
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📈</div>

              <h3 className="mt-3 font-black">
                رشد درآمد
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                مقایسه درآمد با دوره‌های قبلی
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🎯</div>

              <h3 className="mt-3 font-black">
                هدف درآمدی
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                تعیین و بررسی اهداف درآمدی
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🧮</div>

              <h3 className="mt-3 font-black">
                محاسبه سود
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                محاسبه سود ناخالص و خالص
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📑</div>

              <h3 className="mt-3 font-black">
                گزارش مالی
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                دریافت گزارش کامل درآمد و سود
              </p>
            </div>

          </div>
        </section>

        {/* Admin Notice */}
        <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🔐
            </div>

            <div>
              <h2 className="font-black text-emerald-900">
                دسترسی مالی مدیر اصلی
              </h2>

              <p className="mt-2 text-sm leading-7 text-emerald-800">
                اطلاعات سود، درآمد، هزینه و عملکرد مالی باید فقط برای مدیر
                اصلی قابل مشاهده و مدیریت باشد.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
