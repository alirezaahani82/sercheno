"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  Star,
  SlidersHorizontal,
  Building2,
  ShoppingBag,
  ShieldCheck,
  Package,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string | null;
  category: string | null;
  subcategory: string | null;
  brand: string | null;
  model: string | null;
  price: number | null;
  customer_price: number | null;
  cooperation_price: number | null;
  stock: number | null;
  unit: string | null;
  description: string | null;
  seller_id: string | null;
  status: string | null;
  slug: string | null;
  image_url: string | null;
  created_at: string | null;
};

const categories = [
  {
    title: "آجر، بلوک و سفال",
    count: "۱۲۴ فروشنده",
    href: "/materials/brick-block",
    image: "/materials/brick-block.jpg",
  },
  {
    title: "سیمان، بتن و مصالح پودری",
    count: "۸۶ فروشنده",
    href: "/materials/cement-concrete",
    image: "/materials/cement-concrete.jpg",
  },
  {
    title: "درب و پنجره",
    count: "۷۴ فروشنده",
    href: "/materials/doors-windows",
    image: "/materials/doors-windows.jpg",
  },
  {
    title: "برق و روشنایی",
    count: "۵۸ فروشنده",
    href: "/materials/electrical-lighting",
    image: "/materials/electrical-lighting.jpg",
  },
  {
    title: "عایق و ایزوگام",
    count: "۳۶ فروشنده",
    href: "/materials/insulation",
    image: "/materials/insulation.jpg",
  },
  {
    title: "دکوراسیون داخلی",
    count: "۸۲ فروشنده",
    href: "/materials/interior-decoration",
    image: "/materials/interior-decoration.jpg",
  },
  {
    title: "آهن‌آلات و فولاد",
    count: "۱۵۶ فروشنده",
    href: "/materials/iron-steel",
    image: "/materials/iron-steel.jpg",
  },
  {
    title: "تأسیسات مکانیکی",
    count: "۴۷ فروشنده",
    href: "/materials/mechanical-installations",
    image: "/materials/mechanical-installations.jpg",
  },
  {
    title: "رنگ و پوشش",
    count: "۶۳ فروشنده",
    href: "/materials/paint-coatings",
    image: "/materials/paint-coatings.jpg",
  },
  {
    title: "لوله و اتصالات",
    count: "۹۱ فروشنده",
    href: "/materials/plumbing-pipes",
    image: "/materials/plumbing-pipes.jpg",
  },
  {
    title: "تجهیزات و لوازم بهداشتی",
    count: "۶۹ فروشنده",
    href: "/materials/sanitary",
    image: "/materials/sanitary.jpg",
  },
  {
    title: "سنگ، کاشی و سرامیک",
    count: "۲۱۸ فروشنده",
    href: "/materials/stone-tile",
    image: "/materials/stone-tile.jpg",
  },
];

const sellers = [
  {
    name: "مصالح ساختمانی سهند",
    type: "تأمین‌کننده مصالح ساختمانی",
    city: "تبریز",
    rating: "۴.۹",
    products: "۸۶ محصول",
  },
  {
    name: "فروشگاه کاشی آذران",
    type: "فروشنده سنگ، کاشی و سرامیک",
    city: "تبریز",
    rating: "۴.۸",
    products: "۱۲۴ محصول",
  },
  {
    name: "پنجره‌سازی نوین",
    type: "تولیدکننده درب و پنجره",
    city: "تبریز",
    rating: "۴.۹",
    products: "۳۸ محصول",
  },
];

export default function MaterialsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("همه شهرها");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          category,
          subcategory,
          brand,
          model,
          price,
          customer_price,
          cooperation_price,
          stock,
          unit,
          description,
          seller_id,
          status,
          slug,
          image_url,
          created_at
        `)
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("MATERIALS PRODUCTS ERROR:", error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("LOAD PRODUCTS ERROR:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      query === "" ||
      (product.name || "").toLowerCase().includes(query) ||
      (product.category || "").toLowerCase().includes(query) ||
      (product.subcategory || "").toLowerCase().includes(query) ||
      (product.brand || "").toLowerCase().includes(query) ||
      (product.model || "").toLowerCase().includes(query);

    const matchesCity = city === "همه شهرها";

    return matchesSearch && matchesCity;
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
              <div className="text-2xl font-black tracking-tight text-blue-700">
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
              className="transition hover:text-blue-700"
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
              className="transition hover:text-blue-700"
            >
              خدمات ساختمانی
            </Link>

            <Link
              href="/about"
              className="transition hover:text-blue-700"
            >
              درباره سرچنو
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:block"
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

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-blue-950">
        <img
          src="/materials/materials-hero.jpg"
          alt="مصالح و تجهیزات ساختمانی سرچنو"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/85 to-blue-700/75" />

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur">
              <ShoppingBag className="h-4 w-4" />
              بازار مصالح و تجهیزات ساختمانی
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              تمام مصالح مورد نیاز پروژه‌تان را

              <span className="mt-2 block text-cyan-300">
                در سرچنو پیدا کنید
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              بین فروشندگان و تأمین‌کنندگان مصالح ساختمانی
              جست‌وجو کنید، محصولات را مقایسه کنید و
              مستقیماً با فروشنده ارتباط بگیرید.
            </p>

            {/* SEARCH */}

            <div className="mx-auto mt-9 rounded-3xl bg-white p-3 text-right shadow-2xl">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="نام محصول یا مصالح را جست‌وجو کنید..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-48">
                  <MapPin className="h-5 w-5 text-slate-400" />

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  >
                    <option>تبریز</option>
                    <option>تهران</option>
                    <option>ارومیه</option>
                    <option>زنجان</option>
                    <option>همه شهرها</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSearch(search.trim())}
                  className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  جست‌وجو
                </button>
              </div>
            </div>

            {/* محبوب */}

            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-blue-100">
              <span>
                جست‌وجوهای محبوب:
              </span>

              <button
                type="button"
                onClick={() => setSearch("کاشی ۶۰×۱۲۰")}
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                کاشی ۶۰×۱۲۰
              </button>

              <button
                type="button"
                onClick={() => setSearch("سیمان")}
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                سیمان
              </button>

              <button
                type="button"
                onClick={() => setSearch("میلگرد")}
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                میلگرد
              </button>

              <button
                type="button"
                onClick={() => setSearch("پنجره UPVC")}
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                پنجره UPVC
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              دسته‌بندی مصالح
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              چه چیزی نیاز دارید؟
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              دسته‌بندی مورد نظر خود را انتخاب کنید.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-3xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto h-24 w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <h3 className="mt-4 text-sm font-black leading-6">
                {category.title}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                {category.count}
              </p>

              <div className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-blue-700 opacity-0 transition group-hover:opacity-100">
                مشاهده دسته
                <ArrowLeft className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600">
                محصولات
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                {search.trim()
                  ? `نتایج جست‌وجوی «${search.trim()}»`
                  : "تمام محصولات سرچنو"}
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                {loadingProducts
                  ? "در حال دریافت محصولات..."
                  : `${filteredProducts.length} محصول موجود است`}
              </p>
            </div>

            <Link
              href="/materials"
              className="hidden text-sm font-bold text-blue-700 sm:block"
            >
              مشاهده همه ←
            </Link>
          </div>

          {loadingProducts ? (
            <div className="py-16 text-center text-sm text-slate-500">
              در حال دریافت محصولات...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
              <Package className="mx-auto h-12 w-12 text-slate-300" />

              <h3 className="mt-4 font-black">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                عبارت جست‌وجوی دیگری را امتحان کنید.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ================= PRODUCT IMAGE ================= */}

                  <Link
                    href={
                      product.slug
                        ? `/products/${product.slug}`
                        : "/materials"
                    }
                    className="block"
                  >
                    <div className="h-48 overflow-hidden bg-slate-100">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name || "محصول سرچنو"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100">
                          <Package className="h-16 w-16 text-slate-300" />
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {product.category || "مصالح ساختمانی"}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        —
                      </div>
                    </div>

                    <Link
                      href={
                        product.slug
                          ? `/products/${product.slug}`
                          : "/materials"
                      }
                    >
                      <h3 className="mt-4 font-black transition hover:text-blue-700">
                        {product.name || "محصول بدون نام"}
                      </h3>
                    </Link>

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

                    {product.price !== null && (
                      <p className="mt-3 text-sm font-black text-blue-700">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </p>
                    )}

                    {product.stock !== null && (
                      <div className="mt-3 text-xs text-slate-400">
                        موجودی: {product.stock.toLocaleString("fa-IR")}{" "}
                        {product.unit || ""}
                      </div>
                    )}

                    {product.status === "active" && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                        محصول تأییدشده
                      </div>
                    )}

                    <Link
                      href={
                        product.slug
                          ? `/products/${product.slug}`
                          : "/materials"
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-700 hover:text-white"
                    >
                      مشاهده جزئیات
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= MARKETPLACE ================= */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* FILTERS */}

          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 lg:block">
            <div className="flex items-center justify-between">
              <h3 className="font-black">
                فیلتر نتایج
              </h3>

              <SlidersHorizontal className="h-5 w-5 text-blue-700" />
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <label className="text-sm font-bold">
                  دسته‌بندی
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">
                  <option>
                    همه دسته‌بندی‌ها
                  </option>

                  {categories.map((category) => (
                    <option key={category.href}>
                      {category.title}
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
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
                >
                  <option>همه شهرها</option>
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                  <option>زنجان</option>
                </select>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded"
                  />
                  فقط تأمین‌کنندگان تأییدشده
                </label>
              </div>
            </div>
          </aside>

          {/* SELLERS */}

          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-black">
                  تأمین‌کنندگان برتر
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  بهترین فروشندگان و تأمین‌کنندگان مصالح در سرچنو
                </p>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold"
              >
                مرتب‌سازی
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {sellers.map((seller) => (
                <div
                  key={seller.name}
                  className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                      <Building2 className="h-8 w-8 text-blue-700" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black">
                          {seller.name}
                        </h3>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          <ShieldCheck className="h-3 w-3" />
                          تأییدشده
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {seller.type}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {seller.city}
                        </span>

                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          {seller.rating}
                        </span>

                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {seller.products}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                    >
                      مشاهده فروشگاه
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-5 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-blue-700 to-blue-950 px-6 py-14 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-black sm:text-3xl">
              فروشنده یا تأمین‌کننده مصالح هستید؟
            </h2>

            <p className="mt-4 leading-8 text-blue-100">
              فروشگاه خود را در سرچنو ثبت کنید و محصولات
              خود را به خریداران و سازندگان معرفی کنید.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-xl bg-white px-8 py-4 font-black text-blue-800 transition hover:bg-blue-50"
              >
                ثبت فروشگاه
              </Link>

              <Link
                href="/about"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white"
              >
                درباره سرچنو
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

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
                  className="block transition hover:text-white"
                >
                  مصالح و تجهیزات
                </Link>

                <Link
                  href="/service"
                  className="block transition hover:text-white"
                >
                  خدمات ساختمانی
                </Link>

                <Link
                  href="/register"
                  className="block transition hover:text-white"
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
                  className="block transition hover:text-white"
                >
                  درباره سرچنو
                </Link>

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

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </main>
  );
} 
