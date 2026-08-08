"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  ArrowLeft,
  Star,
  CheckCircle2,
  Package,
  Building2,
  Phone,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  seller?: string | null;
  city?: string | null;
  rating?: string | number | null;
  image?: string | null;
  status?: string | null;
  brand?: string | null;
};

const categories = [
  "همه",
  "میلگرد",
  "تیرآهن",
  "نبشی",
  "ناودانی",
  "قوطی و پروفیل",
  "ورق فولادی",
  "وال‌پست",
  "لوله فولادی",
  "تسمه",
  "پلیت و صفحه ستون",
  "پیچ و مهره",
  "مفتول و سیم آرماتوربندی",
  "مش و شبکه",
];

const cities = [
  "همه شهرها",
  "تبریز",
  "تهران",
  "ارومیه",
  "زنجان",
];

export default function IronSteelPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("همه شهرها");
  const [category, setCategory] = useState("همه");
  const [sort, setSort] = useState("جدیدترین");

  const [saleTypes, setSaleTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/products?category=iron-steel",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const data = await response.json();

        setProducts(
          Array.isArray(data.products)
            ? data.products
            : []
        );
      } catch (err) {
        console.error(err);
        setError(
          "دریافت محصولات آهن و فولاد با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const toggleSaleType = (type: string) => {
    setSaleTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // دسته‌بندی
    if (category !== "همه") {
      result = result.filter(
        (product) =>
          product.category?.trim() === category
      );
    }

    // شهر
    if (city !== "همه شهرها") {
      result = result.filter(
        (product) =>
          product.city?.trim() === city
      );
    }

    // جست‌وجو
    if (search.trim()) {
      const query = search
        .trim()
        .toLowerCase();

      result = result.filter((product) => {
        const text = [
          product.title,
          product.description,
          product.category,
          product.seller,
          product.city,
          product.brand,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      });
    }

    // فقط تأمین‌کنندگان تأییدشده
    if (verifiedOnly) {
      result = result.filter(
        (product) =>
          product.status === "approved" ||
          product.status === "تأییدشده" ||
          product.status === "approved"
      );
    }

    // مرتب‌سازی
    if (sort === "بیشترین امتیاز") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    products,
    search,
    city,
    category,
    sort,
    verifiedOnly,
  ]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* HEADER */}
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

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">

            <Link
              href="/"
              className="hover:text-blue-700"
            >
              خانه
            </Link>

            <Link
              href="/materials"
              className="font-bold text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link
              href="/service"
              className="hover:text-blue-700"
            >
              خدمات ساختمانی
            </Link>

            <Link
              href="/about"
              className="hover:text-blue-700"
            >
              درباره سرچنو
            </Link>

          </nav>

          <div className="flex items-center gap-2">

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold sm:block"
            >
              ورود
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              ثبت‌نام
            </Link>

          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-800 to-blue-900">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 lg:py-16">

          <div className="mx-auto mb-8 flex h-52 max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">

            <div className="text-center text-white">

              <div className="text-6xl">
                🏗️
              </div>

              <p className="mt-4 text-sm text-slate-300">
                آهن، فولاد و مقاطع ساختمانی
              </p>

              <p className="mt-1 text-xs text-slate-400">
                تصویر اصلی را می‌توانید بعداً در مسیر
                /public/materials/iron-steel.jpg
                قرار دهید.
              </p>

            </div>

          </div>

          <div className="mx-auto max-w-4xl text-center text-white">

            <Link
              href="/materials"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به مصالح و تجهیزات
            </Link>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">

              آهن، فولاد و مقاطع

              <span className="mt-2 block text-cyan-300">
                ساختمانی
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">

              انواع میلگرد، تیرآهن، نبشی، ناودانی،
              قوطی و پروفیل، ورق، وال‌پست، لوله فولادی
              و سایر محصولات آهن و فولاد را از تأمین‌کنندگان
              سرچنو پیدا کنید.

            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 text-right shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    type="text"
                    placeholder="مثلاً میلگرد، تیرآهن، وال‌پست، پروفیل..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />

                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-48">

                  <MapPin className="h-5 w-5 text-slate-400" />

                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  >

                    {cities.map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                <button
                  onClick={() => {}}
                  className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  جست‌وجو
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-6">

          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی آهن‌آلات
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            محصول مورد نیاز خود را انتخاب کنید
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            از میلگرد و تیرآهن تا وال‌پست و اتصالات سازه‌ای
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                category === item
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* FILTER */}
          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 lg:block">

            <div className="flex items-center justify-between">

              <h3 className="font-black">
                فیلتر محصولات
              </h3>

              <SlidersHorizontal className="h-5 w-5 text-blue-700" />

            </div>

            <div className="mt-7 space-y-6">

              {/* CATEGORY */}

              <div>

                <label className="text-sm font-bold">
                  نوع محصول
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
                >

                  {categories.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* CITY */}

              <div>

                <label className="text-sm font-bold">
                  شهر
                </label>

                <select
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
                >

                  {cities.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* GRADE */}

              <div>

                <label className="text-sm font-bold">
                  استاندارد / گرید
                </label>

                <select
                  className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
                >

                  <option>همه</option>
                  <option>A1</option>
                  <option>A2</option>
                  <option>A3</option>
                  <option>A4</option>
                  <option>ST37</option>
                  <option>ST52</option>

                </select>

              </div>

              {/* BRAND */}

              <div>

                <label className="text-sm font-bold">
                  کارخانه / برند
                </label>

                <select
                  className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
                >

                  <option>همه برندها</option>
                  <option>ذوب‌آهن اصفهان</option>
                  <option>فولاد مبارکه</option>
                  <option>فولاد میانه</option>
                  <option>شاهین بناب</option>
                  <option>ظفر بناب</option>
                  <option>آذرفولاد امین</option>

                </select>

              </div>

              {/* SALE TYPE */}

              <div>

                <label className="text-sm font-bold">
                  نحوه فروش
                </label>

                <div className="mt-3 space-y-3 text-sm">

                  {[
                    "کیلویی",
                    "شاخه‌ای",
                    "تنی",
                    "عمده",
                    "خرده",
                  ].map((item) => (

                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2"
                    >

                      <input
                        type="checkbox"
                        checked={saleTypes.includes(item)}
                        onChange={() =>
                          toggleSaleType(item)
                        }
                      />

                      {item}

                    </label>

                  ))}

                </div>

              </div>

              {/* VERIFIED */}

              <div className="border-t border-slate-100 pt-5">

                <label className="flex cursor-pointer items-center gap-3 text-sm">

                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) =>
                      setVerifiedOnly(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />

                  فقط تأمین‌کنندگان تأییدشده

                </label>

              </div>

            </div>

          </aside>

          {/* PRODUCT LIST */}

          <div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  محصولات آهن و فولاد
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  فقط محصولات تأییدشده توسط مدیریت سرچنو نمایش داده می‌شوند.
                </p>

              </div>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >

                <option>جدیدترین</option>
                <option>بیشترین امتیاز</option>
                <option>ارزان‌ترین</option>

              </select>

            </div>

            {/* LOADING */}

            {loading && (

              <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">

                <div className="text-center">

                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-700" />

                  <p className="mt-4 text-sm text-slate-500">
                    در حال دریافت محصولات تأییدشده...
                  </p>

                </div>

              </div>

            )}

            {/* ERROR */}

            {!loading && error && (

              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

                <p className="font-bold text-red-700">
                  {error}
                </p>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-5 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white"
                >
                  تلاش مجدد
                </button>

              </div>

            )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              filteredProducts.length === 0 && (

                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">

                  <Package className="mx-auto h-12 w-12 text-slate-300" />

                  <h3 className="mt-5 text-xl font-black">
                    هنوز محصول تأییدشده‌ای وجود ندارد
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">

                    پس از ثبت محصول توسط فروشنده و تأیید آن
                    در پنل مدیریت سرچنو، محصول در این صفحه
                    نمایش داده خواهد شد.

                  </p>

                </div>

              )}

            {/* PRODUCTS */}

            {!loading &&
              !error &&
              filteredProducts.length > 0 && (

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredProducts.map((product) => (

                    <div
                      key={product.id}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* IMAGE */}

                      <div className="relative h-56 overflow-hidden bg-slate-100">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">

                            <Package className="h-16 w-16 text-slate-300" />

                          </div>

                        )}

                        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur">

                          {product.category ||
                            "آهن و فولاد"}

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="p-5">

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">

                            <Star className="h-4 w-4 fill-current" />

                            {product.rating || "۵.۰"}

                          </div>

                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">

                            <CheckCircle2 className="h-4 w-4" />

                            تأییدشده

                          </span>

                        </div>

                        <h3 className="mt-4 font-black">
                          {product.title}
                        </h3>

                        {product.brand && (

                          <p className="mt-2 text-sm font-bold text-blue-700">
                            {product.brand}
                          </p>

                        )}

                        {product.description && (

                          <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-500">
                            {product.description}
                          </p>

                        )}

                        {product.seller && (

                          <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-700">

                            <Building2 className="h-4 w-4 text-blue-700" />

                            {product.seller}

                          </div>

                        )}

                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                          <MapPin className="h-4 w-4" />

                          {product.city || "تبریز"}

                        </div>

                        <Link
                          href={`/materials/iron-steel/${product.id}`}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                        >

                          مشاهده محصول

                          <ArrowLeft className="h-4 w-4" />

                        </Link>

                      </div>

                    </div>

                  ))}

                </div>

              )}

          </div>

        </div>

      </section>

      {/* BULK */}

      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-950 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین آهن پروژه
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                تأمین عمده آهن‌آلات ساختمانی
              </h2>

              <p className="mt-4 leading-8 text-slate-300">

                برای پروژه‌های ساختمانی می‌توانید انواع
                میلگرد، تیرآهن، پروفیل، ورق، وال‌پست و سایر
                مقاطع فولادی را از تأمین‌کنندگان پیدا کنید.

              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش کیلویی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش شاخه‌ای
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تنی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش عمده
                </span>

              </div>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

                  <Package className="h-7 w-7" />

                </div>

                <div>

                  <h3 className="font-black">
                    نیاز به آهن‌آلات پروژه دارید؟
                  </h3>

                  <p className="mt-1 text-sm text-slate-300">
                    با فروشندگان و تأمین‌کنندگان ارتباط بگیرید.
                  </p>

                </div>

              </div>

              <Link
                href="/register"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-black text-blue-900"
              >
                ثبت فروشگاه و محصول
                <ArrowLeft className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-5 pb-16">

        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-700 px-6 py-14 text-center text-white">

          <Building2 className="mx-auto h-10 w-10" />

          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            فروشنده یا تأمین‌کننده آهن‌آلات هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">

            فروشگاه خود را در سرچنو ثبت کنید و محصولات آهن و
            فولاد خود را به خریداران و سازندگان معرفی کنید.

          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800"
          >

            ثبت فروشگاه

            <ArrowLeft className="h-4 w-4" />

          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-slate-950 text-slate-300">

        <div className="mx-auto max-w-7xl px-5 py-12">

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

                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان،
                تأمین‌کنندگان و متخصصان صنعت ساختمان.

              </p>

            </div>

            <div>

              <h3 className="font-bold text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">

                <Link
                  href="/materials"
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
                  href="/register"
                  className="block hover:text-white"
                >
                  ثبت فروشگاه
                </Link>

              </div>

            </div>

            <div>

              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">

                <Link
                  href="/about"
                  className="block hover:text-white"
                >
                  درباره سرچنو
                </Link>

                <p className="flex items-center gap-2">

                  <Phone className="h-4 w-4" />

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

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">

            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.

          </div>

        </div>

      </footer>

    </main>
  );
}
