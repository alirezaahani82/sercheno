"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string | null;
  category: string | null;
  price: number | null;
  customer_price: number | null;
  cooperation_price: number | null;
  stock: number | null;
  unit: string | null;
  description: string | null;
  seller_id: string | null;
  status: string | null;
  created_at: string | null;
  brand: string | null;
  model: string | null;
  min_order: number | null;
};

type StoreInfo = {
  id: string;
  name: string | null;
};

const categories = [
  "همه",
  "ایزوگام",
  "قیر",
  "عایق رطوبتی",
  "عایق حرارتی",
  "عایق صوتی",
  "پشم سنگ",
  "پشم شیشه",
  "XPS",
  "EPS و یونولیت",
  "فوم",
  "عایق الاستومری",
  "ژئوممبران",
  "مواد آب‌بندی",
  "چسب آب‌بندی",
];

const cities = [
  "همه شهرها",
  "تبریز",
  "تهران",
  "ارومیه",
  "زنجان",
];

export default function InsulationPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("همه شهرها");
  const [category, setCategory] = useState("همه");
  const [sort, setSort] = useState("جدیدترین");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error: productError } = await supabase
        .from("products")
        .select(
          "id,name,category,price,customer_price,cooperation_price,stock,unit,description,seller_id,status,created_at,brand,model,min_order"
        )
        .eq("category", "insulation")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (productError) {
        console.error("INSULATION PRODUCTS ERROR:", productError);
        setError("دریافت محصولات با خطا مواجه شد.");
        return;
      }

      const productList = data || [];

      setProducts(productList);

      const sellerIds = [
        ...new Set(
          productList
            .map((product) => product.seller_id)
            .filter(Boolean)
        ),
      ];

      if (sellerIds.length > 0) {
        const { data: storeData, error: storeError } =
          await supabase
            .from("stores")
            .select("id,name")
            .in("id", sellerIds);

        if (storeError) {
          console.error("INSULATION STORE ERROR:", storeError);
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach((store: StoreInfo) => {
          storeMap[store.id] = store.name || "فروشگاه";
        });

        setStores(storeMap);
      } else {
        setStores({});
      }
    } catch (err) {
      console.error("INSULATION LOAD ERROR:", err);
      setError("دریافت محصولات با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "همه") {
      result = result.filter(
        (product) =>
          product.category?.trim() === category
      );
    }

    if (city !== "همه شهرها") {
      result = result.filter(
        (product) =>
          product.description
            ?.toLowerCase()
            .includes(city.toLowerCase()) ||
          stores[product.seller_id || ""] === city
      );
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((product) => {
        const sellerName =
          stores[product.seller_id || ""] || "";

        const text = [
          product.name,
          product.description,
          product.category,
          product.brand,
          product.model,
          sellerName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      });
    }

    if (sort === "بیشترین امتیاز") {
      // فعلاً امتیاز در جدول products وجود ندارد،
      // بنابراین ترتیب ثبت محصولات حفظ می‌شود.
      result = [...result];
    }

    if (sort === "ارزان‌ترین") {
      result.sort(
        (a, b) =>
          Number(
            a.customer_price ??
              a.price ??
              0
          ) -
          Number(
            b.customer_price ??
              b.price ??
              0
          )
      );
    }

    return result;
  }, [
    products,
    search,
    city,
    category,
    sort,
    stores,
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
              className="hidden rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 sm:block"
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

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 lg:py-14">

          <div className="mx-auto mb-8 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">

            <img
              src="/materials/insulation.jpg"
              alt="عایق و ایزوگام ساختمانی"
              className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
            />

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
              عایق، ایزوگام و

              <span className="mt-2 block text-cyan-300">
                آب‌بندی ساختمان
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              انواع ایزوگام، قیر، عایق‌های حرارتی و صوتی،
              پشم سنگ، پشم شیشه، XPS، یونولیت، فوم،
              ژئوممبران و محصولات آب‌بندی را از
              تأمین‌کنندگان ساختمانی پیدا کنید.
            </p>

            {/* SEARCH */}

            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    type="text"
                    placeholder="مثلاً ایزوگام، پشم سنگ، XPS، قیر..."
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
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            نوع عایق و مصالح مورد نیاز
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            محصول مورد نظر خود را انتخاب کنید.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          {categories.map((item) => (

            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
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

            <h3 className="font-black">
              فیلتر محصولات
            </h3>

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
                    عددی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    متری
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیلویی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    تنی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    عمده
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

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-2xl font-black">
                  محصولات عایق و ایزوگام
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
                  type="button"
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

                  {filteredProducts.map((product) => {

                    const storeName =
                      product.seller_id
                        ? stores[product.seller_id] ||
                          "فروشگاه"
                        : "فروشگاه نامشخص";

                    const customerPrice =
                      product.customer_price ??
                      product.price ??
                      0;

                    return (
                      <div
                        key={product.id}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* IMAGE */}

                        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100">

                          <Package className="h-16 w-16 text-slate-300" />

                          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur">
                            {product.category || "عایق ساختمانی"}
                          </div>

                        </div>

                        {/* CONTENT */}

                        <div className="p-5">

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-1 text-sm font-bold text-amber-500">

                              <Star className="h-4 w-4 fill-current" />

                              ۵.۰

                            </div>

                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">

                              <CheckCircle2 className="h-4 w-4" />

                              تأییدشده

                            </span>

                          </div>

                          <h3 className="mt-4 font-black">
                            {product.name ||
                              "محصول بدون نام"}
                          </h3>

                          {product.brand && (
                            <p className="mt-2 text-sm text-slate-500">
                              برند: {product.brand}
                            </p>
                          )}

                          {product.model && (
                            <p className="mt-1 text-sm text-slate-500">
                              مدل: {product.model}
                            </p>
                          )}

                          {product.description && (
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                              {product.description}
                            </p>
                          )}

                          {/* SELLER */}

                          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700">

                            <Building2 className="h-4 w-4 text-blue-700" />

                            {storeName}

                          </div>

                          {/* CITY */}

                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                            <MapPin className="h-4 w-4" />

                            تبریز

                          </div>

                          {/* PRICE */}

                          <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">

                            <span className="text-xs font-bold text-slate-500">
                              قیمت مشتری
                            </span>

                            <span className="font-black text-blue-700">
                              {customerPrice.toLocaleString(
                                "fa-IR"
                              )}{" "}
                              تومان
                            </span>

                          </div>

                          {/* STOCK */}

                          <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                            <span className="text-xs font-bold text-slate-500">
                              موجودی
                            </span>

                            <span className="font-black">
                              {(product.stock ?? 0).toLocaleString(
                                "fa-IR"
                              )}{" "}
                              {product.unit || ""}
                            </span>

                          </div>

                          {/* DETAILS */}

                          <Link
                            href={`/materials/insulation/${product.id}`}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                          >
                            مشاهده محصول

                            <ArrowLeft className="h-4 w-4" />

                          </Link>

                        </div>
                      </div>
                    );
                  })}

                </div>

              )}

          </div>
        </div>
      </section>

      {/* BULK */}

      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-900 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین عمده
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                خرید عمده عایق و ایزوگام
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                برای پروژه‌های ساختمانی، عمرانی و صنعتی
                می‌توانید تأمین‌کنندگان عمده ایزوگام،
                قیر، عایق و محصولات آب‌بندی را پیدا کنید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش عمده
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش متری
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش کیلویی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تنی
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
                    نیاز به تأمین عمده دارید؟
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
            فروشنده عایق و ایزوگام هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و
            محصولات عایق و آب‌بندی خود را
            در معرض دید خریداران قرار دهید.
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
