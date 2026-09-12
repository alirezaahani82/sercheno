"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/lib/service-categories";

type Professional = {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  service: string;
  province: string;
  city: string;
  activity_area: string;
  experience: string;
  description: string;
  skills?: string;
  cooperation_type?: string;
  availability?: string;
  certificates?: string;
  price_info?: string;
  show_phone?: boolean;
  profile_image_url?: string | null;
  work_image_1_url?: string | null;
  work_image_2_url?: string | null;
  work_image_3_url?: string | null;
  status: string;
  created_at: string;
  rating?: number | null;
  review_count?: number | null;
  rank?: string | null;
};

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

  const [professionals, setProfessionals] =
    useState<Professional[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* ================= FETCH PROFESSIONALS ================= */

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/services",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "خطا در دریافت متخصصان"
          );
        }

        setProfessionals(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.error(
          "SERVICE PAGE ERROR:",
          err
        );

        setError(
          "دریافت اطلاعات متخصصان با مشکل مواجه شد."
        );

      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);


  /* ================= FILTER ================= */

  const filteredProfessionals =
    professionals.filter((person) => {

      const categoryMatch =
        selectedCategory === "همه خدمات" ||
        person.service === selectedCategory;

      const cityMatch =
        selectedCity === "همه شهرها" ||
        person.city === selectedCity;

      const searchText =
        search.trim().toLowerCase();

      const searchMatch =
        searchText === "" ||
        String(person.first_name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(person.last_name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(person.service || "")
          .toLowerCase()
          .includes(searchText) ||
        String(person.city || "")
          .toLowerCase()
          .includes(searchText) ||
        String(person.skills || "")
          .toLowerCase()
          .includes(searchText);

      return (
        categoryMatch &&
        cityMatch &&
        searchMatch
      );
    });


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link
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

          </Link>


          <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">

            <Link
              href="/"
              className="text-slate-600 hover:text-blue-700"
            >
              خانه
            </Link>

            <Link
              href="/#materials"
              className="text-slate-600 hover:text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link
              href="/service"
              className="text-blue-700"
            >
              خدمات ساختمانی
            </Link>

          </nav>


          <div className="flex items-center gap-2">

            <button
              type="button"
              className="hidden rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 sm:block"
            >
              ورود
            </button>

            <Link
              href="/service/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
            >
              ثبت‌نام
            </Link>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">

        <div className="mx-auto max-w-7xl px-5 py-20">

          <div className="mx-auto max-w-4xl text-center text-white">

            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm">
              🛠️ خدمات ساختمانی سرچنو
            </div>


            <h1 className="text-4xl font-black leading-tight sm:text-5xl">

              متخصص مورد نیاز پروژه‌تان را

              <span className="text-cyan-300">
                {" "}پیدا کنید
              </span>

            </h1>


            <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100">

              از بنا و استادکار تا نصاب، جوشکار،
              برق‌کار، مهندس و سایر متخصصان؛
              متخصص مورد نیاز خود را در شهر خود پیدا
              کنید و با او ارتباط بگیرید.

            </p>


            {/* ================= SEARCH ================= */}

            <div className="mx-auto mt-10 rounded-3xl bg-white p-3 shadow-2xl">

              <div className="flex flex-col gap-3 md:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">

                  <span className="text-xl">
                    🔍
                  </span>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="مثلاً نصاب کاشی، برق‌کار یا جوشکار..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />

                </div>


                <select
                  value={selectedCity}
                  onChange={(event) =>
                    setSelectedCity(
                      event.target.value
                    )
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


                <button
                  type="button"
                  onClick={() => {
                    const results =
                      document.getElementById(
                        "service-results"
                      );

                    results?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-2xl bg-blue-700 px-8 py-4 font-bold text-white hover:bg-blue-800"
                >
                  جست‌وجوی متخصص
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CATEGORY CARDS ================= */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-16"
      >

        <div className="mb-8">

          <span className="text-sm font-bold text-blue-700">
            ۱۳ دسته تخصصی
          </span>

          <h2 className="mt-2 text-3xl font-black">
            خدمات ساختمانی سرچنو
          </h2>

          <p className="mt-3 text-slate-500">
            حوزه تخصصی موردنظر خود را انتخاب کنید و متخصصان تأییدشده آن دسته را ببینید.
          </p>

        </div>


        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

          {SERVICE_CATEGORIES.map(
            (category: ServiceCategory) => (

              <Link
                key={category.slug}
                href={`/service/${category.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative h-40 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-3 right-3 left-3">

                    <h3 className="text-base font-black text-white sm:text-lg">
                      {category.name}
                    </h3>

                  </div>

                </div>


                <div className="p-4">

                  <p className="line-clamp-2 text-xs leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <div className="mt-4 text-sm font-bold text-blue-700">
                    مشاهده متخصصان ←
                  </div>

                </div>

              </Link>

            )
          )}

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <section
        id="service-results"
        className="mx-auto max-w-7xl px-5 pb-16"
      >

        <div className="grid gap-8 lg:grid-cols-4">


          {/* ================= SIDEBAR ================= */}

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="mb-5 text-lg font-black">
              دسته‌بندی خدمات
            </h2>


            <div className="space-y-2">

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    "همه خدمات"
                  )
                }
                className={`w-full rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
                  selectedCategory ===
                  "همه خدمات"
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                همه خدمات
              </button>


              {SERVICE_CATEGORIES.map(
                (category) => (

                  <button
                    key={category.slug}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        category.name
                      )
                    }
                    className={`w-full rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
                      selectedCategory ===
                      category.name
                        ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {category.name}
                  </button>

                )
              )}

            </div>


            {/* ================= PROVIDER CTA ================= */}

            <div className="mt-8 rounded-2xl bg-emerald-50 p-5">

              <div className="text-3xl">
                👷
              </div>

              <h3 className="mt-3 font-black">
                متخصص هستید؟
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                تخصص و خدمات خود را در سرچنو ثبت کنید
                و مشتریان جدید پیدا کنید.
              </p>

              <Link
                href="/service/register"
                className="mt-5 block rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-emerald-700"
              >
                ثبت خدمات و تخصص
              </Link>

            </div>

          </aside>


          {/* ================= RESULTS ================= */}

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

                <span className="font-black text-slate-900">
                  {filteredProfessionals.length}
                </span>{" "}
                متخصص پیدا شد

              </div>

            </div>


            {/* ================= LOADING ================= */}

            {loading && (

              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                <div className="text-4xl">
                  ⏳
                </div>

                <h3 className="mt-5 text-xl font-black">
                  در حال دریافت متخصصان...
                </h3>

              </div>

            )}


            {/* ================= ERROR ================= */}

            {!loading && error && (

              <div className="rounded-3xl border border-red-100 bg-white p-12 text-center">

                <div className="text-5xl">
                  ⚠️
                </div>

                <h3 className="mt-5 text-xl font-black">
                  خطا در دریافت اطلاعات
                </h3>

                <p className="mt-3 text-sm text-red-500">
                  {error}
                </p>

              </div>

            )}


            {/* ================= EMPTY ================= */}

            {!loading &&
              !error &&
              filteredProfessionals.length === 0 && (

                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                  <div className="text-5xl">
                    🔍
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    متخصصی پیدا نشد
                  </h3>

                  <p className="mt-3 text-sm text-slate-500">
                    فیلترها یا عبارت جست‌وجو را تغییر دهید.
                  </p>

                </div>

              )}


            {/* ================= PROFESSIONAL CARDS ================= */}

            {!loading &&
              !error &&
              filteredProfessionals.length > 0 && (

                <div className="grid gap-5 md:grid-cols-2">

                  {filteredProfessionals.map(
                    (person) => (

                      <Link
                        key={person.id}
                        href={`/service/professional/${person.id}`}
                        className="group"
                      >

                        <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">


                          <div className="flex items-start gap-4">


                            {/* ================= PHOTO ================= */}

                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-blue-50">

                              {person.profile_image_url ? (

                                <img
                                  src={
                                    person.profile_image_url
                                  }
                                  alt={`${person.first_name} ${person.last_name}`}
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                              ) : (

                                <div className="flex h-full w-full items-center justify-center text-3xl">
                                  👷
                                </div>

                              )}

                            </div>


                            <div className="min-w-0 flex-1">

                              <div className="flex items-start justify-between gap-2">

                                <h3 className="font-black">
                                  {person.first_name}{" "}
                                  {person.last_name}
                                </h3>

                                <span className="whitespace-nowrap text-sm">
                                  ⭐{" "}
                                  {person.rating ||
                                    4.8}
                                </span>

                              </div>


                              <p className="mt-1 text-sm font-bold text-blue-700">
                                {person.service}
                              </p>


                              <p className="mt-1 text-xs text-slate-400">
                                📍{" "}
                                {person.city ||
                                  "نامشخص"}
                              </p>

                            </div>


                            <div className="hidden rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600 sm:block">
                              ✓ تأیید شده
                            </div>

                          </div>


                          {/* ================= DETAILS ================= */}

                          <div className="mt-5 space-y-2 text-sm text-slate-500">

                            <p>

                              <span className="font-bold text-slate-700">
                                محدوده فعالیت:
                              </span>{" "}

                              {person.activity_area ||
                                "ثبت نشده"}

                            </p>


                            <p>

                              <span className="font-bold text-slate-700">
                                سابقه فعالیت:
                              </span>{" "}

                              {person.experience ||
                                "ثبت نشده"}

                            </p>

                          </div>


                          <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-500">

                            {person.description ||
                              "توضیحی برای این متخصص ثبت نشده است."}

                          </p>


                          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                            <span className="text-xs text-slate-400">
                              رتبه:{" "}
                              {person.rank ||
                                "ویژه"}
                            </span>


                            <span className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white group-hover:bg-blue-800">
                              مشاهده پروفایل
                            </span>

                          </div>

                        </article>

                      </Link>

                    )
                  )}

                </div>

              )}

          </div>

        </div>

      </section>


      {/* ================= REQUEST SERVICE ================= */}

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

                {cities
                  .filter(
                    (city) =>
                      city !== "همه شهرها"
                  )
                  .map((city) => (

                    <option
                      key={city}
                      value={city}
                    >
                      {city}
                    </option>

                  ))}

              </select>


              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-blue-700 py-4 font-bold text-white hover:bg-blue-800"
              >
                ثبت درخواست خدمات
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PROVIDER CTA ================= */}

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

          <Link
            href="/service/register"
            className="mt-8 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
          >
            ثبت خدمات و تخصص
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-950 text-slate-300">

        <div className="mx-auto max-w-7xl px-5 py-14">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <Link
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

              </Link>


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

                <Link
                  href="/"
                  className="block hover:text-white"
                >
                  مصالح و تجهیزات
                </Link>

                <Link
                  href="/service"
                  className="block hover:text-white"
                >
                  خدمات ساختمانی
                </Link>

                <Link
                  href="/service/register"
                  className="block hover:text-white"
                >
                  ثبت خدمات
                </Link>

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
