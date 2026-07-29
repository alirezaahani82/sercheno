"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
const categories = [
  "همه خدمات",
  "بنا و استادکار",
  "نصاب درب و پنجره",
  "نصاب کاشی و سرامیک",
  "برق‌کار",
  "لوله‌کش",
  "جوشکار",
  "نقاش ساختمان",
];

const cities = [
  "همه شهرها",
  "تبریز",
  "تهران",
  "ارومیه",
  "زنجان",
];

export default function ServicePage() {
  const [selectedCategory, setSelectedCategory] =
    useState("همه خدمات");
  const [selectedCity, setSelectedCity] =
    useState("همه شهرها");

  const [search, setSearch] = useState("");
    const [professionals, setProfessionals] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfessionals = async () => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    console.log("APPROVED PROFESSIONALS:", data);
    console.log("SERVICE ERROR:", error);

    if (error) {
      console.error("خطا در دریافت متخصصان:", error);
      setLoading(false);
      return;
    }

    setProfessionals(data || []);
    setLoading(false);
  };

  fetchProfessionals();
}, []);


 const filteredProfessionals = professionals.filter((person) => {
  const categoryMatch =
    selectedCategory === "همه خدمات" ||
    person.service === selectedCategory;

  const cityMatch =
    selectedCity === "همه شهرها" ||
    person.city === selectedCity;

const searchMatch =
  search.trim() === "" ||
  String(person.first_name) .includes(search) ||
  String(person.last_name) .includes(search) ||
  String(person.service) .includes(search) ||
  String(person.city) .includes(search);

return categoryMatch && cityMatch && searchMatch;

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
              alt="لوگوی سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">
                سرچنو
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
              href="/service"
              className="text-blue-700"
            >
              خدمات ساختمانی
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 sm:block">
              ورود
            </button>

            <button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
              ثبت‌نام
            </button>
          </div>
        </div>
      </header>
{/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm">
              🛠️ خدمات ساختمانی سرچنو
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              متخصص مورد نیاز پروژه‌تان را
              <span className="text-cyan-300">
                {" "}
                پیدا کنید
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100">
              از بنا و استادکار تا نصاب، جوشکار، برق‌کار و
              لوله‌کش؛ متخصص مورد نیاز خود را در شهر خود پیدا
              کنید و با او ارتباط بگیرید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 rounded-3xl bg-white p-3 shadow-2xl">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">
                  <span className="text-xl">
                    🔍
                  </span>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="مثلاً نصاب کاشی، برق‌کار یا جوشکار..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>

                <select
                  value={selectedCity}
                  onChange={(event) =>
                    setSelectedCity(event.target.value)
                  }
                  className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-700 outline-none"
                >
                  {cities.map((city) => (
                    <option
                      key={city}
                      value={city}
                    >
                      📍 {city}
                    </option>
                  ))}
                </select>

                <button className="rounded-2xl bg-blue-700 px-8 py-4 font-bold text-white hover:bg-blue-800">
                  جست‌وجوی متخصص
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Main */}
<section className="mx-auto max-w-7xl px-5 py-16">
  <div className="grid gap-8 lg:grid-cols-4">

    {/* Sidebar */}
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-black">
        دسته‌بندی خدمات
      </h2>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={w-full rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                : "text-slate-600 hover:bg-slate-100"
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-emerald-50 p-5">
        <div className="text-3xl">👷</div>

        <h3 className="mt-3 font-black">
          متخصص هستید؟
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          تخصص و خدمات خود را در سرچنو ثبت کنید
          و مشتریان جدید پیدا کنید.
        </p>

        <a
          href="/service/register"
          className="mt-5 block rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-emerald-700"
        >
          ثبت خدمات و تخصص
        </a>
      </div>
    </aside>

    {/* Results */}
    <div className="lg:col-span-3">

      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-sm font-bold text-blue-700">
            متخصصان ساختمانی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            متخصص مناسب خود را پیدا کنید
          </h2>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
          {filteredProfessionals.length} متخصص پیدا شد
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <div className="text-4xl">⏳</div>

          <h3 className="mt-5 text-xl font-black">
            در حال دریافت متخصصان...
          </h3>
        </div>
      ) : filteredProfessionals.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <div className="text-5xl">🔍</div>

          <h3 className="mt-5 text-xl font-black">
            متخصصی پیدا نشد
          </h3>

          <p className="mt-3 text-sm text-slate-500">
            فیلترها یا عبارت جست‌وجو را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredProfessionals.map((person) => (
            <div
              key={person.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  👷
                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="font-black">
                    {person.first_name} {person.last_name}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-blue-700">
                    {person.service}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    📍 {person.city}
                  </p>

                </div>

                <div className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                  ✓ تأیید شده
                </div>

              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-500">
<p>
                  <span className="font-bold text-slate-700">
                    محدوده فعالیت:
                  </span>{" "}
                  {person.activity_area || "ثبت نشده"}
                </p>

                <p>
                  <span className="font-bold text-slate-700">
                    سابقه فعالیت:
                  </span>{" "}
                  {person.experience || "ثبت نشده"}
                </p>

              </div>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                {person.description || "توضیحی برای این متخصص ثبت نشده است."}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                <span className="text-xs text-slate-400">
                  متخصص تأییدشده سرچنو
                </span>

                <button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  مشاهده پروفایل
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  </div>
</section>

      {/* Request Service */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-900 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-bold text-cyan-300">
                متخصص پیدا نکردید؟
              </span>
<h2 className="mt-4 text-3xl font-black leading-relaxed">
                درخواست خدمات خود را ثبت کنید
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                نوع پروژه و خدمت مورد نیازتان را ثبت کنید
                تا متخصصان مناسب بتوانند با شما ارتباط بگیرند.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <h3 className="text-xl font-black">
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

              <button className="mt-3 w-full rounded-xl bg-blue-700 py-4 font-bold text-white hover:bg-blue-800">
                ثبت درخواست خدمات
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-blue-50 px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-5xl">
            👷‍♂️
          </div>

          <h2 className="mt-5 text-3xl font-black">
            استادکار یا متخصص هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            تخصص، سابقه کاری، شهر محل فعالیت و خدمات خود را
            در سرچنو ثبت کنید تا مشتریان بیشتری شما را پیدا کنند.
          </p>

          <a
            href="/service/register"
            className="mt-8 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
          >
            ثبت خدمات و تخصص
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <a
                href="/"
                className="flex items-center gap-3"
              >
                <img
                  src="/logo.png"
                  alt="سرچنو"
                  className="h-12 w-12 rounded-xl object-contain"
                />

                <div>
                  <div className="text-xl font-black text-white">
                    سرچنو
                  </div>

                  <div className="text-xs text-slate-500">
                    بازار هوشمند ساخت‌وساز
                  </div>
                </div>
              </a>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان
                مصالح، تأمین‌کنندگان و متخصصان صنعت ساختمان.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <a
                  href="/"
                  className="block hover:text-white"
                >
                  مصالح و تجهیزات
                </a>

                <a
                  href="/service"
                  className="block hover:text-white"
                >
                  خدمات ساختمانی
                </a>

                <a
                  href="/service/register"
                  className="block hover:text-white"
                >
                  ثبت خدمات
                </a>
              </div>
            </div>
<div>
              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <p>
                  درباره سرچنو
                </p>

                <p>
                  تماس با ما
                </p>

                <p>
                  قوانین و مقررات
                </p>

                <p>
                  پشتیبانی
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-slate-500">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </main>
  );
}
