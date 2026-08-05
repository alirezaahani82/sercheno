"use client";

import Link from "next/link";

export default function TendersAdminPage() {
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
              مدیریت مناقصات کشوری
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت پروژه‌ها، مناقصات، پیشنهادها و وضعیت برگزاری مناقصات
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
              کل مناقصات
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              در انتظار بررسی
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              فعال
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              پایان‌یافته
            </div>
            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              لغو شده
            </div>
            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

        </div>

        {/* Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست پروژه‌ها و مناقصات
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                پروژه‌های ثبت‌شده پس از اتصال این بخش به Supabase در این قسمت
                نمایش داده خواهند شد.
              </p>
            </div>

            <Link
              href="/tenders/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-800"
            >
              + ثبت پروژه جدید
            </Link>

          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی پروژه یا عنوان مناقصه..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>در انتظار بررسی</option>
              <option>فعال</option>
              <option>پایان‌یافته</option>
              <option>لغو شده</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه نوع پروژه‌ها</option>
              <option>ساختمانی</option>
              <option>تأسیسات</option>
              <option>مصالح و تجهیزات</option>
              <option>خدمات فنی</option>
              <option>پیمانکاری</option>
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
              📋
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز مناقصه‌ای ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              پروژه‌هایی که توسط اشخاص حقیقی یا حقوقی در سرچنو ثبت می‌شوند،
              پس از بررسی و تأیید مدیر در این قسمت نمایش داده خواهند شد.
            </p>

          </div>

        </section>

        {/* Tender Rules */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            کنترل مناقصات
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🔍</div>
              <h3 className="mt-3 font-black">
                بررسی پروژه
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                بررسی اطلاعات و مدارک قبل از انتشار مناقصه
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📢</div>
              <h3 className="mt-3 font-black">
                انتشار
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                انتشار پروژه برای فروشندگان و متخصصان واجد شرایط
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📨</div>
              <h3 className="mt-3 font-black">
                پیشنهادها
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                مشاهده و مدیریت پیشنهادهای ارسال‌شده
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🏆</div>
              <h3 className="mt-3 font-black">
                نتیجه مناقصه
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                ثبت نتیجه و تعیین برنده مناقصه
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
