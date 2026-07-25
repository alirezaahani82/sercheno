"use client";

import { useState } from "react";

const serviceCategories = [
  "همه خدمات",
  "بنا و استادکار",
  "نصاب درب و پنجره",
  "نصاب کاشی و سرامیک",
  "برق‌کار",
  "لوله‌کش",
  "جوشکار",
  "نقاش ساختمان",
  "سایر متخصصان",
];

const specialists = [
  {
    name: "علی رضایی",
    service: "نصاب درب و پنجره",
    city: "تبریز",
    area: "ولیعصر و ائل‌گلی",
    experience: "۱۲ سال سابقه",
    rating: "۴.۹",
    projects: "۸۷ پروژه",
    verified: true,
    icon: "🪟",
  },
  {
    name: "محمد احمدی",
    service: "نصاب کاشی و سرامیک",
    city: "تبریز",
    area: "مرکز شهر و نصف‌راه",
    experience: "۹ سال سابقه",
    rating: "۴.۸",
    projects: "۶۴ پروژه",
    verified: true,
    icon: "⬛",
  },
  {
    name: "حسین کریمی",
    service: "بنا و استادکار",
    city: "تبریز",
    area: "آبرسان و ولیعصر",
    experience: "۱۵ سال سابقه",
    rating: "۴.۹",
    projects: "۱۱۲ پروژه",
    verified: true,
    icon: "👷",
  },
  {
    name: "رضا مرادی",
    service: "برق‌کار",
    city: "تبریز",
    area: "ائل‌گلی و باغمیشه",
    experience: "۷ سال سابقه",
    rating: "۴.۷",
    projects: "۵۳ پروژه",
    verified: false,
    icon: "⚡",
  },
  {
    name: "امیر حسینی",
    service: "جوشکار",
    city: "تبریز",
    area: "شرق تبریز",
    experience: "۱۰ سال سابقه",
    rating: "۴.۸",
    projects: "۷۶ پروژه",
    verified: true,
    icon: "🔥",
  },
  {
    name: "مهدی موسوی",
    service: "لوله‌کش",
    city: "تبریز",
    area: "مرکز و غرب تبریز",
    experience: "۸ سال سابقه",
    rating: "۴.۶",
    projects: "۴۱ پروژه",
    verified: false,
    icon: "🔧",
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("همه خدمات");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("تبریز");

  const filteredSpecialists = specialists.filter((specialist) => {
    const categoryMatch =
      selectedCategory === "همه خدمات" ||
      specialist.service === selectedCategory;

    const searchMatch =
      specialist.name.includes(search) ||
      specialist.service.includes(search) ||
      specialist.area.includes(search);

    return categoryMatch && searchMatch;
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="لوگوی سرچینو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">
                سرچینو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">
            <a
              href="/"
              className="text-slate-600 hover:text-blue-700"
            >
              خانه
            </a>

            <a
              href="/#materials"
              className="text-slate-600 hover:text-blue-700"
            >
              مصالح و تجهیزات
            </a>

            <a
              href="/services"
              className="text-blue-700"
            >
              خدمات ساختمانی
            </a>

            <a
              href="/#providers"
              className="text-slate-600 hover:text-blue-700"
            >
              ثبت خدمات
            </a>
          </nav>

          <a
            href="/service/register"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            ثبت خدمات
          </a>
        </div>
      </header>
{/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur">
              🛠️ خدمات ساختمانی سرچینو
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              متخصص مورد نیاز پروژه‌تان را
              <span className="block text-cyan-300">
                سریع پیدا کنید
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              از بنا و استادکار تا نصاب، برق‌کار، جوشکار و سایر
              متخصصان ساختمانی را در شهر خود پیدا کنید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 rounded-3xl bg-white p-3 shadow-2xl">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="text-xl">
                    🔍
                  </span>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    type="text"
                    placeholder="مثلاً نصاب پنجره، بنا، برق‌کار..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>

                <select
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 outline-none"
                >
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                  <option>زنجان</option>
                </select>

                <button className="rounded-2xl bg-blue-700 px-10 py-4 font-black text-white transition hover:bg-blue-800">
                  جست‌وجو
                </button>
              </div>
            </div>

            <div className="mt-6 text-sm text-blue-100">
              متخصصان فعال در شهر:
              <span className="mr-2 font-black text-white">
                {city}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black">
                دسته‌بندی خدمات
              </h2>

              <div className="mt-5 space-y-2">
                {serviceCategories.map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      className={`w-full rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
                        selectedCategory === category
                          ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
<div className="mt-8 rounded-2xl bg-emerald-50 p-5">
                <div className="text-2xl">
                  👷
                </div>

                <h3 className="mt-3 font-black">
                  متخصص هستید؟
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  تخصص و خدمات خود را در سرچینو ثبت کنید
                  و مشتریان جدید پیدا کنید.
                </p>

                <a
                  href="/service/register"
                  className="mt-4 block rounded-xl bg-emerald-600 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  ثبت خدمات و تخصص
                </a>
              </div>
            </div>
          </aside>

          {/* Specialists */}
          <div className="lg:col-span-3">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="text-sm font-bold text-blue-700">
                  متخصصان ساختمانی
                </span>

                <h2 className="mt-2 text-2xl font-black">
                  {selectedCategory}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {filteredSpecialists.length} متخصص
                  برای انتخاب شما
                </p>
              </div>

              <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none">
                <option>
                  مرتب‌سازی: پیشنهادی
                </option>
                <option>
                  بالاترین امتیاز
                </option>
                <option>
                  بیشترین سابقه
                </option>
              </select>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {filteredSpecialists.map(
                (specialist) => (
                  <div
                    key={specialist.name}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                        {specialist.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black">
                            {specialist.name}
                          </h3>

                          {specialist.verified && (
                            <span
                              title="متخصص تأیید شده"
                              className="text-sm text-blue-600"
                            >
                              ✓
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-bold text-blue-700">
                          {specialist.service}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>
                          {specialist.city} —{" "}
                          {specialist.area}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>🕒</span>
                        <span>
                          {specialist.experience}
                        </span>
                      </div>
<div className="text-xs text-slate-500">
                  بازار هوشمند ساخت‌وساز
                </div>
              </div>
            </a>

            <div className="text-center text-xs text-slate-500">
              © ۱۴۰۵ سرچینو — تمامی حقوق محفوظ است.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
<div className="flex items-center gap-2">
                        <span>⭐</span>
                        <span className="font-bold text-slate-700">
                          {specialist.rating}
                        </span>

                        <span>
                          ({specialist.projects})
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button className="rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                        مشاهده پروفایل
                      </button>

                      <button className="rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                        درخواست خدمات
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {filteredSpecialists.length === 0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="text-5xl">
                  🔍
                </div>

                <h3 className="mt-5 text-xl font-black">
                  متخصصی پیدا نشد
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  عبارت جست‌وجو یا دسته‌بندی دیگری را امتحان کنید.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Request Service */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-cyan-300">
                متخصص مناسب پیدا نکردید؟
              </span>

              <h2 className="mt-4 text-3xl font-black leading-relaxed">
                درخواست خدمات خود را ثبت کنید
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                نوع پروژه و خدمت مورد نیازتان را ثبت کنید
                تا بتوانید متخصص مناسب پروژه خود را پیدا کنید.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <h3 className="text-lg font-black">
                چه خدمتی نیاز دارید؟
              </h3>

              <input
                placeholder="مثلاً نصب ۲۰۰ متر کاشی"
                className="mt-5 w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select className="mt-3 w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none">
                <option>
                  انتخاب شهر
                </option>
                <option>
                  تبریز
                </option>
                <option>
                  تهران
                </option>
                <option>
                  ارومیه
                </option>
              </select>

              <button className="mt-3 w-full rounded-xl bg-blue-700 py-4 font-black text-white transition hover:bg-blue-800">
                ثبت درخواست خدمات
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a
              href="/"
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="سرچینو"
                className="h-11 w-11 rounded-xl object-contain"
              />

              <div>
                <div className="font-black text-white">
                  سرچینو
                </div>
                <div className="text-xs text-slate-500">
                  بازار هوشمند ساخت‌وساز
                </div>
              </div>
            </a>

            <div className="text-center text-xs text-slate-500">
              © ۱۴۰۵ سرچینو — تمامی حقوق محفوظ است.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
