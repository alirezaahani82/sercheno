"use client";

import Link from "next/link";

const categories = [
  {
    slug: "brick-block",
    title: "آجر، بلوک و سفال",
    icon: "🧱",
    color: "bg-orange-50",
    status: "فعال",
  },
  {
    slug: "cement-concrete",
    title: "سیمان و بتن",
    icon: "🏗️",
    color: "bg-slate-100",
    status: "فعال",
  },
  {
    slug: "doors-windows",
    title: "درب و پنجره",
    icon: "🪟",
    color: "bg-blue-50",
    status: "فعال",
  },
  {
    slug: "electrical-lighting",
    title: "برق و روشنایی",
    icon: "💡",
    color: "bg-yellow-50",
    status: "فعال",
  },
  {
    slug: "insulation",
    title: "عایق و ایزوگام",
    icon: "🧱",
    color: "bg-emerald-50",
    status: "فعال",
  },
  {
    slug: "interior-decoration",
    title: "دکوراسیون داخلی",
    icon: "🛋️",
    color: "bg-pink-50",
    status: "فعال",
  },
  {
    slug: "iron-steel",
    title: "آهن و فولاد",
    icon: "🔩",
    color: "bg-slate-100",
    status: "فعال",
  },
  {
    slug: "mechanical-installations",
    title: "تأسیسات مکانیکی",
    icon: "⚙️",
    color: "bg-indigo-50",
    status: "فعال",
  },
  {
    slug: "paint-coatings",
    title: "رنگ و پوشش",
    icon: "🎨",
    color: "bg-purple-50",
    status: "فعال",
  },
  {
    slug: "plumbing-pipes",
    title: "لوله و اتصالات",
    icon: "🔧",
    color: "bg-cyan-50",
    status: "فعال",
  },
  {
    slug: "sanitary",
    title: "شیرآلات و تجهیزات بهداشتی",
    icon: "🚿",
    color: "bg-sky-50",
    status: "فعال",
  },
  {
    slug: "stone-tile",
    title: "سنگ نما، کاشی و سرامیک",
    icon: "🪨",
    color: "bg-stone-100",
    status: "فعال",
  },
  {
    slug: "elevators",
    title: "آسانسور و تجهیزات",
    icon: "🛗",
    color: "bg-blue-50",
    status: "فعال",
  },
];

export default function CategoriesAdminPage() {
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
              مدیریت دسته‌بندی‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت دسته‌بندی‌های مصالح، تجهیزات و بازار سرچنو
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              کل دسته‌بندی‌ها
            </div>

            <div className="mt-3 text-3xl font-black text-slate-900">
              {categories.length}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              دسته‌بندی فعال
            </div>

            <div className="mt-3 text-3xl font-black text-emerald-600">
              {categories.filter((item) => item.status === "فعال").length}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              دسته‌بندی غیرفعال
            </div>

            <div className="mt-3 text-3xl font-black text-red-500">
              ۰
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-500">
              زیر‌دسته‌ها
            </div>

            <div className="mt-3 text-3xl font-black text-blue-700">
              ۰
            </div>
          </div>

        </div>

        {/* Actions */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black">
                فهرست دسته‌بندی‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                دسته‌بندی‌های اصلی بازار سرچنو
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              + افزودن دسته‌بندی
            </button>

          </div>

          {/* Search */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">

            <input
              type="text"
              placeholder="جست‌وجوی دسته‌بندی..."
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="rounded-2xl bg-slate-100 px-5 py-4 text-sm outline-none">
              <option>همه وضعیت‌ها</option>
              <option>فعال</option>
              <option>غیرفعال</option>
            </select>

            <button
              type="button"
              className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              جست‌وجو
            </button>

          </div>

        </section>

        {/* Categories Grid */}
        <section className="mt-6">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {categories.map((category) => (
              <div
                key={category.slug}
                className="group rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    {category.status}
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-black text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {category.slug}
                </p>

                <div className="mt-5 flex gap-2">

                  <Link
                    href={`/materials/${category.slug}`}
                    className="flex-1 rounded-xl bg-blue-50 px-3 py-3 text-center text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                  >
                    مشاهده
                  </Link>

                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    ویرایش
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Information */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl">
              💡
            </div>

            <div>
              <h3 className="font-black text-slate-900">
                مدیریت دسته‌بندی‌ها
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                در این بخش مدیر می‌تواند دسته‌بندی‌های اصلی و در آینده
                زیر‌دسته‌های محصولات را مدیریت، ویرایش، فعال یا غیرفعال کند.
                محصولات ثبت‌شده نیز بر اساس این دسته‌بندی‌ها در بازار سرچنو
                نمایش داده خواهند شد.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
