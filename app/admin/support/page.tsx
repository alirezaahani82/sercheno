"use client";

import Link from "next/link";

export default function SupportAdminPage() {
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
              پیام‌ها و پشتیبانی
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت پیام‌های کاربران، درخواست‌های پشتیبانی، تیکت‌ها و ارتباط با مشتریان
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
              کل پیام‌ها
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              جدید
            </div>
            <div className="mt-3 text-3xl font-black text-blue-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              در حال بررسی
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              پاسخ‌داده‌شده
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              بسته‌شده
            </div>
            <div className="mt-3 text-3xl font-black text-slate-400">
              ۰
            </div>
          </div>

        </div>

        {/* Support Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                صندوق پیام‌ها و درخواست‌های پشتیبانی
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                پیام‌های کاربران پس از اتصال این بخش به Supabase در این قسمت نمایش داده می‌شوند.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              + ایجاد تیکت جدید
            </button>

          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی نام، شماره یا موضوع..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>جدید</option>
              <option>در حال بررسی</option>
              <option>پاسخ‌داده‌شده</option>
              <option>بسته‌شده</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه موضوعات</option>
              <option>مشکل حساب کاربری</option>
              <option>سفارش و خرید</option>
              <option>پرداخت</option>
              <option>فروشگاه</option>
              <option>خدمات ساختمانی</option>
              <option>مناقصات</option>
              <option>گزارش تخلف</option>
              <option>سایر</option>
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
              💬
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز پیام یا تیکتی ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              پیام‌ها و درخواست‌های پشتیبانی کاربران پس از اتصال این بخش به
              Supabase در این قسمت نمایش داده خواهند شد.
            </p>

          </div>

        </section>

        {/* Support Categories */}
        <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              👤
            </div>

            <h3 className="mt-5 font-black">
              پشتیبانی کاربران
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              مشکلات حساب کاربری، ثبت‌نام، ورود و اطلاعات کاربران.
            </p>

            <div className="mt-5 text-sm font-bold text-blue-700">
              ۰ درخواست
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
              🛒
            </div>

            <h3 className="mt-5 font-black">
              سفارش و خرید
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              پیگیری سفارش‌ها، خرید مصالح و مشکلات مربوط به فروشگاه‌ها.
            </p>

            <div className="mt-5 text-sm font-bold text-emerald-700">
              ۰ درخواست
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
              📋
            </div>

            <h3 className="mt-5 font-black">
              پشتیبانی مناقصات
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              مشکلات ثبت پروژه، شرکت در مناقصه، پیشنهادها و نتایج.
            </p>

            <div className="mt-5 text-sm font-bold text-amber-600">
              ۰ درخواست
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl">
              🚨
            </div>

            <h3 className="mt-5 font-black">
              گزارش تخلف
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              بررسی گزارش‌های تخلف، محتوای نامناسب و مشکلات کاربران.
            </p>

            <div className="mt-5 text-sm font-bold text-red-600">
              ۰ گزارش
            </div>
          </div>

        </section>

        {/* Admin Notes */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              🛡️
            </div>

            <div>
              <h2 className="text-xl font-black">
                مدیریت ارتباط با کاربران
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                در این بخش مدیر می‌تواند پیام‌ها را بررسی کند، به کاربران پاسخ
                دهد، وضعیت تیکت‌ها را تغییر دهد، درخواست‌ها را به بخش مربوطه
                ارجاع دهد و سوابق مکالمات را مشاهده کند.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📥</div>
              <h3 className="mt-3 font-black">
                دریافت پیام
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                دریافت و دسته‌بندی پیام‌های کاربران
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">✉️</div>
              <h3 className="mt-3 font-black">
                پاسخ‌گویی
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                ارسال پاسخ و پیگیری درخواست
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🗂️</div>
              <h3 className="mt-3 font-black">
                سوابق
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                نگهداری سوابق پیام‌ها و مکالمات
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
