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
  SlidersHorizontal,
  Loader2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  seller: string | null;
  city: string | null;
  rating: number | string | null;
  image: string | null;
  status: string | null;
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

const ironKeywords = [
  "آهن",
  "فولاد",
  "میلگرد",
  "تیرآهن",
  "نبشی",
  "ناودانی",
  "پروفیل",
  "قوطی",
  "ورق فولادی",
  "ورق",
  "وال‌پست",
  "لوله فولادی",
  "تسمه",
  "پلیت",
  "صفحه ستون",
  "پیچ و مهره",
  "مفتول",
  "مش",
  "شبکه",
];

export default function IronSteelPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [city, setCity] = useState("همه شهرها");

  const [category, setCategory] = useState("همه");

  const [sort, setSort] = useState("جدیدترین");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      /*
       * محصولات مستقیماً از جدول products خوانده می‌شوند.
       * فقط محصولات approved نمایش داده می‌شوند.
       */

      const { data, error } = await supabase
        .from("products")
        .select(
          "id,title,description,category,seller,city,rating,image,status"
        )
        .eq("status", "approved")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("IRON STEEL SUPABASE ERROR:", error);

        setError(
          "دریافت محصولات آهن و فولاد با خطا مواجه شد."
        );

        return;
      }

      setProducts(
        Array.isArray(data)
          ? (data as Product[])
          : []
      );
    } catch (err) {
      console.error("IRON STEEL LOAD ERROR:", err);

      setError(
        "دریافت محصولات آهن و فولاد با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryText =
        product.category?.trim() || "";

      const titleText =
        product.title?.trim() || "";

      const descriptionText =
        product.description?.trim() || "";

      const combinedText =
        ${categoryText} ${titleText} ${descriptionText}
          .toLowerCase();

      return ironKeywords.some((keyword) =>
        combinedText.includes(keyword.toLowerCase())
      );
    });

    if (category !== "همه") {
      result = result.filter(
        (product) =>
          product.category?.trim() === category
      );
    }

    if (city !== "همه شهرها") {
      result = result.filter(
        (product) =>
          product.city?.trim() === city
      );
    }

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
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      });
    }

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
    category,
    city,
    search,
    sort,
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

            <Link href="/">
              خانه
            </Link>

            <Link
              href="/materials"
              className="font-bold text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link href="/service">
              خدمات ساختمانی
            </Link>

            <Link href="/about">
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
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
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
              تأییدشده سرچنو پیدا کنید.
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
                  type="button"
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
              type="button"
              onClick={() =>
                setCategory(item)
              }
              className={rounded-full px-5 py-3 text-sm font-bold transition ${
                category === item
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }}
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

              <div>

                <label className="text-sm font-bold">
                  نحوه فروش
                </label>

                <div className="mt-3 space-y-3 text-sm">

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیلویی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    شاخه‌ای
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    تنی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    عمده
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    خرده
                  </label>

                </div>

              </div>

              <div className="border-t border-slate-100 pt-5">

                <label className="flex items-center gap-3 text-sm">

                  <input
                    type="checkbox"
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

                <option>
                  جدیدترین
                </option>

                <option>
                  بیشترین امتیاز
                </option>

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
                  type="button"
                  onClick={loadProducts}
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
                    محصول تأییدشده‌ای برای آهن و فولاد وجود ندارد
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                    محصول پس از ثبت توسط فروشنده و تأیید
                    در پنل مدیریت، در این صفحه نمایش داده می‌شود.
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
                          {product.category || "آهن و فولاد"}
                        </div>

                      </div>

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
                          href={/materials/iron-steel/${product.id}}
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

                <span className="rounded-xl bg-white/10

