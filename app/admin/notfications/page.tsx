"use client";

import Link from "next/link";

export default function NotificationsAdminPage() {
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
              مدیریت اعلان‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت اعلان‌های کاربران، فروشندگان، متخصصان و اطلاع‌رسانی‌های
              سامانه
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
              کل اعلان‌ها
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              خوانده نشده
            </div>
            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              ارسال شده
            </div>
            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              اعلان سیستمی
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              اعلان مهم
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
          </div>

        </div>

        {/* Create Notification */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              ارسال اعلان جدید
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              یک اعلان برای کاربران یا گروه مشخصی از کاربران ارسال کنید.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                عنوان اعلان
              </label>

              <input
                type="text"
                placeholder="مثلاً تأیید حساب کاربری"
                className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                گیرنده
              </label>

              <select className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>انتخاب گروه کاربران</option>
                <option>همه کاربران</option>
                <option>مشتریان</option>
                <option>فروشندگان</option>
                <option>متخصصان</option>
                <option>کاربران تأیید نشده</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                نوع اعلان
              </label>

              <select className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>اطلاع‌رسانی عمومی</option>
                <option>سیستمی</option>
                <option>مهم</option>
                <option>موفقیت</option>
                <option>هشدار</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                کانال ارسال
              </label>

              <select className="w-full rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>اعلان داخل سایت</option>
                <option>پیامک</option>
                <option>ایمیل</option>
                <option>داخل سایت + پیامک</option>
                <option>همه کانال‌ها</option>
              </select>
            </div>

          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              متن اعلان
            </label>

            <textarea
              rows={5}
              placeholder="متن اعلان را وارد کنید..."
              className="w-full resize-none rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              ذخیره پیش‌نویس
            </button>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-7 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              ارسال اعلان
            </button>

          </div>

        </section>

        {/* Filters */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فهرست اعلان‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                تاریخچه اعلان‌های ارسال‌شده از پنل مدیریت
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              حذف اعلان‌های قدیمی
            </button>

          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی عنوان اعلان..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه گیرندگان</option>
              <option>همه کاربران</option>
              <option>مشتریان</option>
              <option>فروشندگان</option>
              <option>متخصصان</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>خوانده شده</option>
              <option>خوانده نشده</option>
              <option>ارسال شده</option>
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
              🔔
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-800">
              هنوز اعلانی ثبت نشده است
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              اعلان‌هایی که از طریق پنل مدیریت ارسال می‌شوند، پس از اتصال
              این بخش به Supabase در این قسمت نمایش داده خواهند شد.
            </p>

          </div>

        </section>

        {/* Notification Types */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <h2 className="text-xl font-black">
            انواع اعلان‌های سرچنو
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">👤</div>

              <h3 className="mt-3 font-black">
                کاربران
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                ثبت‌نام، ورود، تغییر اطلاعات و وضعیت حساب کاربران
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🏪</div>

              <h3 className="mt-3 font-black">
                فروشندگان
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                تأیید فروشگاه، محصولات، سفارش‌ها و وضعیت فروشنده
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">🛠️</div>

              <h3 className="mt-3 font-black">
                متخصصان
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                تأیید تخصص، درخواست خدمات و وضعیت پروفایل متخصصان
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-2xl">📋</div>

              <h3 className="mt-3 font-black">
                مناقصات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                انتشار مناقصه، پیشنهاد جدید، برنده شدن و پایان مناقصه
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
