"use client";

import Link from "next/link";

export default function SettingsAdminPage() {
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
              تنظیمات و دسترسی‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت تنظیمات سامانه، مدیران، نقش‌ها، دسترسی‌ها و امنیت پنل مدیریت
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* System Status */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">
                وضعیت سامانه
              </span>
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>

            <div className="mt-3 text-xl font-black text-emerald-600">
              فعال
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              وضعیت ثبت‌نام
            </div>

            <div className="mt-3 text-xl font-black text-emerald-600">
              فعال
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              وضعیت فروشگاه‌ها
            </div>

            <div className="mt-3 text-xl font-black text-emerald-600">
              فعال
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              وضعیت مناقصات
            </div>

            <div className="mt-3 text-xl font-black text-emerald-600">
              فعال
            </div>
          </div>

        </div>

        {/* General Settings */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              تنظیمات عمومی سامانه
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تنظیمات اصلی عملکرد سرچنو
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                نام سامانه
              </label>

              <input
                type="text"
                defaultValue="سرچنو"
                className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                عنوان سامانه
              </label>

              <input
                type="text"
                defaultValue="بازار هوشمند ساخت‌وساز"
                className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                شماره تماس پشتیبانی
              </label>

              <input
                type="text"
                placeholder="شماره تماس پشتیبانی"
                className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                ایمیل پشتیبانی
              </label>

              <input
                type="email"
                placeholder="info@sercheno.ir"
                className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="rounded-xl bg-blue-700 px-7 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              ذخیره تنظیمات
            </button>
          </div>

        </section>

        {/* Access Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              مدیریت دسترسی‌ها
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تعیین سطح دسترسی مدیران و کاربران پنل مدیریت
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[850px] text-right">

              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-4 py-4 font-bold">
                    کاربر
                  </th>

                  <th className="px-4 py-4 font-bold">
                    نقش
                  </th>

                  <th className="px-4 py-4 font-bold">
                    وضعیت
                  </th>

                  <th className="px-4 py-4 font-bold">
                    آخرین ورود
                  </th>

                  <th className="px-4 py-4 font-bold">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-slate-100">
                  <td className="px-4 py-5">
                    <div className="font-black text-slate-800">
                      مدیر اصلی
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      alireza
                    </div>
                  </td>

                  <td className="px-4 py-5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      مدیر کل
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      فعال
                    </span>
                  </td>

                  <td className="px-4 py-5 text-sm text-slate-500">
                    —
                  </td>

                  <td className="px-4 py-5">
                    <span className="text-xs font-bold text-slate-400">
                      دسترسی کامل
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-5">
                    <div className="font-black text-slate-800">
                      پشتیبان
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      هنوز اضافه نشده
                    </div>
                  </td>

                  <td className="px-4 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                      پشتیبان
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                      —
                    </span>
                  </td>

                  <td className="px-4 py-5 text-sm text-slate-500">
                    —
                  </td>

                  <td className="px-4 py-5">
                    <button
                      type="button"
                      className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      افزودن
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* Roles */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              نقش‌ها و سطح دسترسی
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              دسترسی هر نقش به بخش‌های مختلف پنل مدیریت
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="text-3xl">👑</div>

              <h3 className="mt-3 font-black text-slate-900">
                مدیر کل
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                دسترسی کامل به تمام ۱۷ پنل مدیریت و تنظیمات سامانه.
              </p>

              <div className="mt-4 rounded-xl bg-white px-4 py-3 text-xs font-bold text-blue-700">
                دسترسی کامل
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="text-3xl">🛡️</div>

              <h3 className="mt-3 font-black text-slate-900">
                پشتیبان
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                دسترسی محدود به بخش‌های خدمات، کاربران و پشتیبانی.
              </p>

              <div className="mt-4 rounded-xl bg-white px-4 py-3 text-xs font-bold text-amber-700">
                دسترسی محدود
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">👁️</div>

              <h3 className="mt-3 font-black text-slate-900">
                مشاهده‌گر
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                فقط مشاهده اطلاعات بدون امکان تغییر یا حذف.
              </p>

              <div className="mt-4 rounded-xl bg-white px-4 py-3 text-xs font-bold text-slate-500">
                فقط مشاهده
              </div>
            </div>

          </div>

        </section>

        {/* Security */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🔐
            </div>

            <div>
              <h2 className="text-xl font-black">
                امنیت پنل مدیریت
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                کنترل موارد امنیتی حساب مدیریت
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-black">
                تغییر رمز عبور
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                تغییر رمز عبور حساب مدیر اصلی.
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold transition hover:bg-white/20"
              >
                تغییر رمز
              </button>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-black">
                ورودهای اخیر
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                بررسی ورودهای اخیر به پنل مدیریت.
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold transition hover:bg-white/20"
              >
                مشاهده ورودها
              </button>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-black">
                خروج از همه دستگاه‌ها
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                پایان دادن به نشست‌های فعال حساب مدیریت.
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/30"
              >
                خروج از همه
              </button>
            </div>

          </div>

        </section>

        {/* Danger Zone */}
        <section className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">

          <h2 className="text-xl font-black text-red-700">
            ⚠️ بخش حساس مدیریت
          </h2>

          <p className="mt-2 text-sm leading-7 text-red-600">
            تغییرات این قسمت می‌تواند روی عملکرد کل سامانه تأثیر بگذارد.
            قبل از اتصال به Supabase، عملیات حساس باید با تأیید مدیر اصلی انجام شود.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              تنظیمات پیشرفته
            </button>

            <button
              type="button"
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
            >
              مشاهده فعالیت‌های مدیریتی
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}
