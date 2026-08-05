"use client";

import Link from "next/link";

export default function ProjectsAdminPage() {
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
              پروژه‌های ثبت‌شده
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت پروژه‌های ثبت‌شده توسط اشخاص حقیقی، شرکت‌ها و سازمان‌ها
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
              کل پروژه‌ها
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
              منتشرشده
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
              ردشده
            </div>
            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

        </div>

        {/* Filters */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-black">
                فهرست پروژه‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                پروژه‌های ثبت‌شده در بخش مناقصات سرچنو
              </p>
            </div>

            <Link
              href="/tenders/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800"
            >
              + ثبت پروژه جدید
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">

            <input
              type="text"
              placeholder="جست‌وجوی عنوان پروژه..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>در انتظار بررسی</option>
              <option>منتشرشده</option>
              <option>پایان‌یافته</option>
              <option>ردشده</option>
            </select>

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه نوع متقاضی</option>
              <option>شخص حقیقی</option>
              <option>شرکت خصوصی</option>
              <option>سازمان</option>
              <option>انبوه‌ساز</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              جست‌وجو
            </button>

          </div>

        </section>

        {/* Projects Table */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-right">

              <thead className="bg-slate-900 text-sm text-white">
                <tr>
                  <th className="px-5 py-5">پروژه</th>
                  <th className="px-5 py-5">ثبت‌کننده</th>
                  <th className="px-5 py-5">نوع</th>
                  <th className="px-5 py-5">شهر</th>
                  <th className="px-5 py-5">مهلت پیشنهاد</th>
                  <th className="px-5 py-5">وضعیت</th>
                  <th className="px-5 py-5">عملیات</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td colSpan={7}>
                    <div className="px-6 py-20 text-center">

                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                        🏗️
                      </div>

                      <h3 className="mt-5 text-xl font-black text-slate-800">
                        هنوز پروژه‌ای ثبت نشده است
                      </h3>

                      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
                        پس از ثبت پروژه در بخش مناقصات، اطلاعات پروژه‌ها
                        در این قسمت برای بررسی و مدیریت نمایش داده می‌شود.
                      </p>

                      <Link
                        href="/tenders/register"
                        className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                      >
                        ثبت پروژه
                      </Link>

                    </div>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* Project Management Cards */}
        <section className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
              🔍
            </div>

            <h3 className="mt-5 font-black">
              بررسی پروژه‌ها
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              بررسی اطلاعات، مدارک و توضیحات پروژه قبل از انتشار در سامانه.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
              📢
            </div>

            <h3 className="mt-5 font-black">
              انتشار مناقصه
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              انتشار پروژه تأییدشده برای شرکت‌ها، فروشندگان و متخصصان واجد شرایط.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl">
              🛑
            </div>

            <h3 className="mt-5 font-black">
              مدیریت وضعیت
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              توقف، تمدید، پایان یا رد پروژه‌ها و کنترل وضعیت مناقصات.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}
