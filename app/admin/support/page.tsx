"use client";

import Link from "next/link";

export default function ReportsAdminPage() {
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
              گزارش‌ها و آمار
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              بررسی عملکرد، فروش، کاربران، مشتریان، سفارش‌ها، مناقصات و فعالیت‌های سرچنو
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ← داشبورد اصلی
          </Link>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کاربران
            </div>
            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
            <div className="mt-2 text-xs text-slate-400">
              تعداد کل کاربران ثبت‌شده
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              سفارش‌ها
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-600">
              ۰
            </div>
            <div className="mt-2 text-xs text-slate-400">
              مجموع سفارش‌های ثبت‌شده
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              درآمد
            </div>
            <div className="mt-3 text-3xl font-black text-indigo-600">
              ۰ تومان
            </div>
            <div className="mt-2 text-xs text-slate-400">
              درآمد ثبت‌شده سرچنو
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              مناقصات
            </div>
            <div className="mt-3 text-3xl font-black text-amber-500">
              ۰
            </div>
            <div className="mt-2 text-xs text-slate-400">
              مجموع پروژه‌ها و مناقصات
            </div>
          </div>

        </div>

        {/* Report Filters */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              فیلتر گزارش‌ها
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              بازه زمانی و نوع گزارش مورد نظر را انتخاب کنید.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option>گزارش کلی</option>
              <option>گزارش کاربران</option>
              <option>گزارش مشتریان</option>
              <option>گزارش سفارش‌ها</option>
              <option>گزارش فروش</option>
              <option>گزارش مالی</option>
              <option>گزارش پرداخت‌ها</option>
              <option>گزارش مناقصات</option>
              <option>گزارش محصولات</option>
              <option>گزارش متخصصان</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option>امروز</option>
              <option>۷ روز گذشته</option>
              <option>۳۰ روز گذشته</option>
              <option>۳ ماه گذشته</option>
              <option>۶ ماه گذشته</option>
              <option>سال جاری</option>
              <option>همه زمان‌ها</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option>همه شهرها</option>
              <option>تبریز</option>
              <option>تهران</option>
              <option>ارومیه</option>
              <option>زنجان</option>
              <option>سایر شهرها</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-blue-700 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-800"
            >
              تولید گزارش
            </button>

          </div>
        </section>

        {/* Main Reports */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">
                  گزارش فعالیت کاربران
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  ثبت‌نام، ورود و فعالیت کاربران
                </p>
              </div>

              <div className="text-3xl">
                👥
              </div>
            </div>

            <div className="mt-6 space-y-3">

              {[
                ["کاربران جدید", "۰"],
                ["کاربران فعال", "۰"],
                ["کاربران غیرفعال", "۰"],
                ["ثبت‌نام‌های امروز", "۰"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4"
                >
                  <span className="text-sm text-slate-600">
                    {title}
                  </span>

                  <span className="font-black text-slate-900">
                    {value}
                  </span>
                </div>
              ))}

            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">
                  گزارش سفارش‌ها
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  وضعیت سفارش‌ها و میزان خرید
                </p>
              </div>

              <div className="text-3xl">
                🛒
              </div>
            </div>

            <div className="mt-6 space-y-3">

              {[
                ["کل سفارش‌ها", "۰"],
                ["در انتظار پرداخت", "۰"],
                ["پرداخت‌شده", "۰"],
                ["تکمیل‌شده", "۰"],
                ["لغوشده", "۰"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4"
                >
                  <span className="text-sm text-slate-600">
                    {title}
                  </span>

                  <span className="font-black text-slate-900">
                    {value}
                  </span>
                </div>
              ))}

            </div>
          </div>

        </section>

        {/* Financial Reports */}
        <section className="mt-6 rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black">
                گزارش مالی سرچنو
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                خلاصه وضعیت درآمد، هزینه، سود و پرداخت‌ها
              </p>
            </div>

            <Link
              href="/admin/finance"
              className="rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/20"
            >
              مدیریت مالی ←
            </Link>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-sm text-slate-400">
                درآمد کل
              </div>

              <div className="mt-3 text-2xl font-black">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-sm text-slate-400">
                هزینه کل
              </div>

              <div className="mt-3 text-2xl font-black">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-sm text-slate-400">
                سود خالص
              </div>

              <div className="mt-3 text-2xl font-black text-emerald-400">
                ۰ تومان
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-sm text-slate-400">
                پرداخت‌های موفق
              </div>

              <div className="mt-3 text-2xl font-black">
                ۰
              </div>
            </div>

          </div>

        </section>

        {/* Business Reports */}
        <section className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-3xl">🏪</div>

            <h3 className="mt-4 text-lg font-black">
              گزارش فروشندگان
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              تعداد فروشگاه‌ها، فروشندگان فعال، محصولات و عملکرد فروشندگان.
            </p>

            <Link
              href="/admin/stores"
              className="mt-5 inline-block text-sm font-bold text-blue-700"
            >
              مشاهده پنل فروشندگان ←
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-3xl">👷</div>

            <h3 className="mt-4 text-lg font-black">
              گزارش متخصصان
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              وضعیت متخصصان، درخواست‌ها، تأییدها و فعالیت ارائه‌دهندگان خدمات.
            </p>

            <Link
              href="/admin/service"
              className="mt-5 inline-block text-sm font-bold text-emerald-700"
            >
              مدیریت متخصصان ←
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-3xl">📋</div>

            <h3 className="mt-4 text-lg font-black">
              گزارش مناقصات
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              پروژه‌ها، مناقصات فعال، پیشنهادها و نتایج مناقصات.
            </p>

            <Link
              href="/admin/tenders"
              className="mt-5 inline-block text-sm font-bold text-amber-600"
            >
              مدیریت مناقصات ←
            </Link>
          </div>

        </section>

        {/* Empty State */}
        <section className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
            📊
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-800">
            گزارش‌های زنده هنوز فعال نشده‌اند
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            پس از اتصال پنل گزارش‌ها به Supabase، اطلاعات واقعی کاربران،
            سفارش‌ها، فروش، درآمد، پرداخت‌ها و مناقصات به‌صورت خودکار
            در این صفحه نمایش داده خواهد شد.
          </p>

        </section>

      </div>
    </main>
  );
}
