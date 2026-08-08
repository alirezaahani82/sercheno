"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowLeft,
  Star,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Zap,
  Lightbulb,
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

export default function ElectricalLightingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,category,price,customer_price,cooperation_price,stock,unit,description,seller_id,status,created_at,brand,model,min_order"
        )
        .eq("category", "electrical-lighting")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("ELECTRICAL PRODUCTS ERROR:", error);
        setProducts([]);
        return;
      }

      setProducts(data || []);

      const sellerIds = [
        ...new Set(
          (data || [])
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
          console.error("ELECTRICAL STORE ERROR:", storeError);
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach(
          (store: StoreInfo) => {
            storeMap[store.id] =
              store.name || "فروشگاه";
          }
        );

        setStores(storeMap);
      } else {
        setStores({});
      }
    } catch (error) {
      console.error("ELECTRICAL LOAD ERROR:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return true;

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.model?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
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
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
            >
              ثبت‌نام
            </Link>

          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 lg:py-20">

          <div className="mx-auto max-w-5xl text-center text-white">

            {/* تصویر */}
            <div className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur">

              <img
                src="/materials/electrical-lighting.jpg"
                alt="برق و روشنایی ساختمان"
                className="h-56 w-full object-cover sm:h-72 lg:h-80"
              />

            </div>

            <Link
              href="/materials"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به مصالح و تجهیزات
            </Link>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              برق و روشنایی
              <span className="mt-2 block text-cyan-300">
                ساختمان
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              انواع سیم و کابل، کلید و پریز، لامپ، چراغ،
              پروژکتور، تابلو برق، فیوز، لوله برق و تجهیزات
              برق و روشنایی ساختمان را از فروشندگان و
              تأمین‌کنندگان پیدا کنید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 text-right shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="مثلاً کابل، کلید و پریز، لامپ LED..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />

                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-48">

                  <MapPin className="h-5 w-5 text-slate-400" />

                  <select className="w-full bg-transparent text-sm text-slate-700 outline-none">
                    <option>تبریز</option>
                    <option>تهران</option>
                    <option>ارومیه</option>
                    <option>زنجان</option>
                    <option>همه شهرها</option>
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

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-6">

          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            تجهیزات برق و روشنایی مورد نیاز خود را انتخاب کنید
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            از سیم و کابل تا روشنایی و تجهیزات حفاظتی ساختمان.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          {[
            "همه",
            "سیم و کابل",
            "کلید و پریز",
            "لامپ",
            "چراغ سقفی",
            "پروژکتور",
            "تابلو برق",
            "فیوز",
            "لوله برق",
            "جعبه تقسیم",
            "روشنایی محوطه",
            "روشنایی صنعتی",
            "تجهیزات برق ساختمان",
            "آیفون",
          ].map((category, index) => (

            <button
              key={category}
              type="button"
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                index === 0
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Filters */}
          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 lg:block">

            <h3 className="font-black">
              فیلتر محصولات
            </h3>

            <div className="mt-7 space-y-6">

              <div>

                <label className="text-sm font-bold">
                  نوع محصول
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه موارد</option>
                  <option>سیم و کابل</option>
                  <option>کلید و پریز</option>
                  <option>لامپ</option>
                  <option>چراغ</option>
                  <option>پروژکتور</option>
                  <option>تابلو برق</option>
                  <option>فیوز</option>
                  <option>لوله برق</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold">
                  شهر
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه شهرها</option>
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                  <option>زنجان</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold">
                  نوع فروش
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
                    حلقه‌ای
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

          {/* Products */}
          <div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  محصولات برق و روشنایی
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  مشاهده محصولات تأییدشده ثبت‌شده توسط فروشندگان سرچنو
                </p>

              </div>

              <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">

                <option>جدیدترین</option>
                <option>بیشترین امتیاز</option>
                <option>ارزان‌ترین</option>

              </select>

            </div>

            {/* Loading */}
            {loading ? (

              <div className="py-16 text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

                <p className="mt-5 font-bold text-slate-500">
                  در حال دریافت محصولات...
                </p>

              </div>

            ) : filteredProducts.length === 0 ? (

              /* Empty */
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">

                  <Zap className="h-8 w-8 text-blue-700" />

                </div>

                <h3 className="mt-5 text-xl font-black">
                  محصولی پیدا نشد
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  در حال حاضر محصول تأییدشده‌ای در دسته برق و روشنایی وجود ندارد.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-5 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
                  >
                    پاک کردن جست‌وجو
                  </button>
                )}

              </div>

            ) : (

              /* Product Grid */
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredProducts.map((product) => (

                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Product Image / Icon */}
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100">

                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50">

                        <Zap className="h-12 w-12 text-blue-700" />

                      </div>

                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur">
                        برق و روشنایی
                      </div>

                    </div>

                    {/* Product Info */}
                    <div className="p-5">

                      <div className="flex items-center justify-between gap-2">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {product.category || "برق و روشنایی"}
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">

                          <CheckCircle2 className="h-3 w-3" />

                          موجود

                        </span>

                      </div>

                      <h3 className="mt-4 text-lg font-black">
                        {product.name || "محصول بدون نام"}
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

                      {/* Price */}
                      <div className="mt-5 rounded-xl bg-slate-50 p-3">

                        <div className="flex items-center justify-between gap-3">

                          <span className="text-sm font-bold text-slate-500">
                            قیمت مشتری
                          </span>

                          <span className="font-black text-blue-700">

                            {(
                              product.customer_price ??
                              product.price ??
                              0
                            ).toLocaleString("fa-IR")}{" "}
                            تومان

                          </span>

                        </div>

                      </div>

                      {/* Stock */}
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                        <span className="font-bold text-slate-500">
                          موجودی
                        </span>

                        <span className="font-black">

                          {(product.stock ?? 0).toLocaleString("fa-IR")}{" "}
                          {product.unit || ""}

                        </span>

                      </div>

                      {/* Seller */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                        <MapPin className="h-4 w-4" />

                        {product.seller_id
                          ? stores[product.seller_id] || "فروشگاه"
                          : "فروشگاه نامشخص"}

                      </div>

                      <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600">

                        <ShieldCheck className="h-4 w-4" />

                        فروشنده تأییدشده

                      </div>

                      <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">

                        <Star className="h-4 w-4 fill-current" />

                        تأمین‌کننده معتبر سرچنو

                      </div>

                      <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                      >
                        مشاهده محصول
                        <ArrowLeft className="h-4 w-4" />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

      {/* Special Section */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-900 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین تجهیزات پروژه
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                خرید عمده تجهیزات برق و روشنایی
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                برای پروژه‌های ساختمانی، صنعتی و تجاری،
                سیم و کابل، تابلو برق، تجهیزات حفاظتی و
                انواع تجهیزات روشنایی را از تأمین‌کنندگان
                معتبر پیدا کنید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  سیم و کابل
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  تابلو برق
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  روشنایی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  تجهیزات حفاظتی
                </span>

              </div>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

                  <Lightbulb className="h-7 w-7 text-yellow-300" />

                </div>

                <div>

                  <h3 className="font-black">
                    نیاز به تأمین تجهیزات دارید؟
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

          <Zap className="mx-auto h-10 w-10" />

          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            فروشنده تجهیزات برق و روشنایی هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولات خود را
            در معرض دید سازندگان، پیمانکاران و خریداران قرار دهید.
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

      {/* Footer */}
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
