"use client";

import Link from "next/link";

export default function AdsAdminPage() {
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
              مدیریت تبلیغات
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت تبلیغات فروشندگان، متخصصان، برندها و کمپین‌های تبلیغاتی سرچنو
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
              کل تبلیغات
            </div>

            <div className="mt-3 text-3xl font-black text-slate-900">
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
              در انتظار تأیید
            </div>

            <div className="mt-3 text-3xl font-black text-amber-500">
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
              درآمد تبلیغات
            </div>

            <div className="mt-3 text-2xl font-black text-purple-600">
              ۰ تومان
            </div>
          </div>

        </div>

        {/* Main Management */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست تبلیغات
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                تبلیغات ثبت‌شده پس از اتصال این بخش به Supabase در این قسمت نمایش داده خواهند شد.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              + ایجاد تبلیغ جدید
            </button>

          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی تبلیغ یا نام کسب‌وکار..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>فعال</option>
              <option>در انتظار تأیید</option>
              <option>پایان‌یافته</option>
              <option>رد شده</option>
              <option>غیرفعال</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه نوع تبلیغات</option>
              <option>تبلیغ ویژه</option>
              <option>تبلیغ دسته‌بندی</option>
              <option>تبلیغ محصول</option>
              <option>تبلیغ فروشگاه</option>
              <option>تبلیغ خدمات</option>
              <option>بنر صفحه اصلی</option>
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
              📢
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز تبلیغی ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              تبلیغات فروشندگان و متخصصان پس از ثبت و تأیید مدیر در این قسمت
              نمایش داده خواهند شد.
            </p>

          </div>

        </section>

        {/* Advertising Types */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black text-slate-900">
            انواع تبلیغات سرچنو
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            ساختار تبلیغات قابل ارائه در پلتفرم
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">🏠</div>

              <h3 className="mt-3 font-black">
                تبلیغ صفحه اصلی
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                نمایش برند یا کسب‌وکار در بخش‌های ویژه صفحه اصلی سرچنو.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">🧱</div>

              <h3 className="mt-3 font-black">
                تبلیغ دسته‌بندی
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                نمایش تبلیغ در دسته‌بندی مرتبط با محصول یا خدمت.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">⭐</div>

              <h3 className="mt-3 font-black">
                تبلیغ ویژه
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                قرار گرفتن فروشگاه، محصول یا متخصص در جایگاه ویژه.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">🏪</div>

              <h3 className="mt-3 font-black">
                تبلیغ فروشگاه
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                معرفی فروشگاه‌ها و تأمین‌کنندگان به کاربران سرچنو.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">👷</div>

              <h3 className="mt-3 font-black">
                تبلیغ خدمات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                معرفی استادکاران و متخصصان ساختمانی.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl">🖼️</div>

              <h3 className="mt-3 font-black">
                تبلیغات بنری
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                نمایش بنرهای تبلیغاتی در موقعیت‌های مختلف پلتفرم.
              </p>
            </div>

          </div>

        </section>

        {/* Campaign Management */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black">
                مدیریت کمپین‌های تبلیغاتی
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                کنترل زمان، جایگاه، بودجه و وضعیت تبلیغات
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">
              مرکز تبلیغات
            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📅</div>

              <h3 className="mt-3 font-black">
                زمان‌بندی
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                تعیین تاریخ شروع و پایان کمپین.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📍</div>

              <h3 className="mt-3 font-black">
                جایگاه نمایش
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                انتخاب محل نمایش تبلیغ در سرچنو.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">👁️</div>

              <h3 className="mt-3 font-black">
                آمار نمایش
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                بررسی بازدید و عملکرد تبلیغات.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">💰</div>

              <h3 className="mt-3 font-black">
                درآمد تبلیغات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                بررسی مبلغ تبلیغات و درآمد حاصل از کمپین‌ها.
              </p>
            </div>

          </div>

        </section>

        {/* Advertising Rules */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-black text-slate-900">
            کنترل و تأیید تبلیغات
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="text-2xl">🔍</div>

              <h3 className="mt-3 font-black text-slate-800">
                بررسی محتوا
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                بررسی متن، تصویر و اطلاعات تبلیغ قبل از انتشار.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="text-2xl">✅</div>

              <h3 className="mt-3 font-black text-slate-800">
                تأیید و انتشار
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                تأیید تبلیغات مناسب و فعال‌سازی کمپین.
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-5">
              <div className="text-2xl">🚫</div>

              <h3 className="mt-3 font-black text-slate-800">
                رد یا توقف
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                توقف تبلیغات نامناسب یا مغایر با قوانین سرچنو.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
