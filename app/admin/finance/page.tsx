"use client";

import Link from "next/link";

export default function FinanceAdminPage() {
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
              مدیریت مالی
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت درآمد، هزینه‌ها، پرداخت‌ها، سود، تراکنش‌ها و وضعیت مالی سرچنو
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* Main Financial Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                موجودی حساب سرچنو
              </span>
              <span className="text-2xl">💰</span>
            </div>

            <div className="mt-4 text-3xl font-black text-emerald-600">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              موجودی قابل استفاده
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                درآمد کل
              </span>
              <span className="text-2xl">📈</span>
            </div>

            <div className="mt-4 text-3xl font-black text-blue-700">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              مجموع درآمدهای ثبت‌شده
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
              <span className="text-2xl">📊</span>
            </div>

            <div className="mt-4 text-3xl font-black text-purple-600">
              ۰ تومان
            </div>

            <p className="mt-2 text-xs text-slate-400">
              درآمد منهای هزینه
            </p>
          </div>

        </div>

        {/* Secondary Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              پرداخت‌های موفق
            </div>

            <div className="mt-3 text-2xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              پرداخت‌های در انتظار
            </div>

            <div className="mt-3 text-2xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مبالغ در انتظار تسویه
            </div>

            <div className="mt-3 text-2xl font-black text-orange-500">
              ۰ تومان
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مبالغ برگشتی
            </div>

            <div className="mt-3 text-2xl font-black text-red-500">
              ۰ تومان
            </div>
          </div>

        </div>

        {/* Quick Financial Actions */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              مدیریت مالی
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              بخش‌های مختلف امور مالی سرچنو را مدیریت کنید.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="text-3xl">💳</div>
              <h3 className="mt-4 font-black">
                تراکنش‌ها
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                مشاهده تمام تراکنش‌های مالی
              </p>
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="text-3xl">💰</div>
              <h3 className="mt-4 font-black">
                درآمدها
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                مدیریت منابع درآمد سرچنو
              </p>
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="text-3xl">💸</div>
              <h3 className="mt-4 font-black">
                هزینه‌ها
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                ثبت و کنترل هزینه‌های کسب‌وکار
              </p>
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="text-3xl">📊</div>
              <h3 className="mt-4 font-black">
                گزارش سود و زیان
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                بررسی سود و زیان در بازه‌های مختلف
              </p>
            </button>

          </div>
        </section>

        {/* Revenue Sources */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black text-slate-900">
            منابع درآمد سرچنو
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            درآمدها از چه بخش‌هایی ایجاد شده‌اند؟
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-2xl">🏪</div>
              <h3 className="mt-3 font-black">
                فروشگاه‌ها
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                درآمد حاصل از فروش و خدمات فروشگاه‌ها
              </p>

              <div className="mt-4 text-xl font-black text-blue-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="text-2xl">🛠️</div>
              <h3 className="mt-3 font-black">
                خدمات
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                درآمد حاصل از خدمات و متخصصان
              </p>

              <div className="mt-4 text-xl font-black text-emerald-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-purple-50 p-5">
              <div className="text-2xl">📋</div>
              <h3 className="mt-3 font-black">
                مناقصات
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                هزینه شرکت در مناقصات
              </p>

              <div className="mt-4 text-xl font-black text-purple-700">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="text-2xl">➕</div>
              <h3 className="mt-3 font-black">
                سایر درآمدها
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                سایر منابع درآمدی
              </p>

              <div className="mt-4 text-xl font-black text-amber-700">
                ۰ تومان
              </div>
            </div>

          </div>
        </section>

        {/* Transactions */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                آخرین تراکنش‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                آخرین فعالیت‌های مالی سرچنو
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              مشاهده همه تراکنش‌ها
            </button>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[700px] text-right text-sm">

              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-4 font-bold">
                    شرح
                  </th>

                  <th className="px-4 py-4 font-bold">
                    نوع
                  </th>

                  <th className="px-4 py-4 font-bold">
                    مبلغ
                  </th>

                  <th className="px-4 py-4 font-bold">
                    وضعیت
                  </th>

                  <th className="px-4 py-4 font-bold">
                    تاریخ
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-14 text-center text-slate-400"
                  >
                    هنوز تراکنشی ثبت نشده است.
                  </td>
                </tr>
              </tbody>

            </table>

          </div>
        </section>

        {/* Financial Reports */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            گزارش‌های مالی
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            در نسخه متصل به Supabase، گزارش‌های کامل مالی در این بخش نمایش داده
            خواهند شد.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📅</div>
              <h3 className="mt-3 font-black">
                گزارش روزانه
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                درآمد و هزینه‌های روزانه
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📆</div>
              <h3 className="mt-3 font-black">
                گزارش ماهانه
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                بررسی عملکرد مالی ماه
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📈</div>
              <h3 className="mt-3 font-black">
                گزارش سود و زیان
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                محاسبه سود خالص و ناخالص
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📑</div>
              <h3 className="mt-3 font-black">
                گزارش کامل مالی
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                گزارش جامع عملکرد مالی سرچنو
              </p>
            </div>

          </div>
        </section>

        {/* Financial Control */}
        <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
              🔐
            </div>

            <div>
              <h2 className="font-black text-amber-900">
                کنترل مالی مدیر
              </h2>

              <p className="mt-2 text-sm leading-7 text-amber-800">
                دسترسی به اطلاعات مالی، درآمد، هزینه، سود، تسویه‌ها و تراکنش‌های
                سرچنو باید فقط در اختیار مدیر اصلی باشد.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
