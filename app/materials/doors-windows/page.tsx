"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
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

export default function DoorsWindowsPage() {
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
        .eq("category", "doors-windows")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("DOORS WINDOWS PRODUCTS ERROR:", error);
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
          console.error("DOORS WINDOWS STORE ERROR:", storeError);
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach(
          (store: StoreInfo) => {
            storeMap[store.id] =
              store.name || "فروشگاه";
          }
        );

        setStores(storeMap);
      }
    } catch (error) {
      console.error("DOORS WINDOWS LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return true;

    return (
      product.name
        ?.toLowerCase()
        .includes(searchText) ||
      product.brand
        ?.toLowerCase()
        .includes(searchText) ||
      product.model
        ?.toLowerCase()
        .includes(searchText) ||
      product.description
        ?.toLowerCase()
        .includes(searchText)
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

          <Link
            href="/register"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          >
            ثبت فروشگاه
          </Link>

        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Link
            href="/"
            className="hover:text-blue-700"
          >
            خانه
          </Link>

          <ArrowRight className="h-4 w-4" />

          <Link
            href="/materials"
            className="hover:text-blue-700"
          >
            مصالح و تجهیزات
          </Link>

          <ArrowRight className="h-4 w-4" />

          <span className="font-bold text-slate-800">
            درب و پنجره
          </span>

        </div>

      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 py-6">

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900">

          <img
            src="/materials/doors-windows.jpg"
            alt="درب و پنجره ساختمانی"
            className="h-[360px] w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/50 to-transparent" />

          <div className="absolute inset-0 flex items-center">

            <div className="max-w-2xl px-7 sm:px-12">

              <span className="rounded-full bg-blue-600/90 px-4 py-2 text-xs font-bold text-white">
                مصالح و تجهیزات ساختمانی
              </span>

              <h1 className="mt-5 text-3xl font-black text-white sm:text-5xl">
                درب و پنجره
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-200 sm:text-base">
                جست‌وجو و مقایسه انواع درب، پنجره UPVC،
                پنجره آلومینیومی و محصولات مرتبط از فروشندگان
                و تولیدکنندگان در سرچنو.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-5 py-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="جست‌وجو در درب و پنجره..."
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-52">

              <MapPin className="h-5 w-5 text-slate-400" />

              <select className="w-full bg-transparent text-sm outline-none">

                <option>
                  همه شهرها
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

            </div>

            <button
              type="button"
              className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white hover:bg-blue-800"
            >
              جست‌وجو
            </button>

          </div>

        </div>

      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-8">

        <div>
          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            دسته‌بندی درب و پنجره
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

          {[
            "پنجره UPVC",
            "پنجره آلومینیومی",
            "درب ورودی",
            "درب داخلی",
          ].map((item) => (

            <button
              key={item}
              type="button"
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-black transition hover:border-blue-300 hover:bg-blue-50"
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      {/* Products */}
      <section className="bg-white py-14">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8">

            <span className="text-sm font-bold text-emerald-600">
              محصولات تأییدشده
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              محصولات درب و پنجره
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              محصولات تأییدشده فروشندگان سرچنو در این دسته نمایش داده می‌شوند.
            </p>

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
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                🪟
              </div>

              <h3 className="mt-5 text-xl font-black">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                در حال حاضر محصول تأییدشده‌ای در دسته درب و پنجره وجود ندارد.
              </p>

            </div>

          ) : (

            /* Product Grid */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Product Image Placeholder */}
                  <div className="flex h-52 items-center justify-center bg-slate-100">

                    <span className="text-7xl">
                      🪟
                    </span>

                  </div>

                  <div className="p-6">

                    <div className="flex items-center justify-between gap-3">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        درب و پنجره
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">

                        <ShieldCheck className="h-3 w-3" />

                        تأییدشده

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

                      <div className="flex items-center justify-between text-sm">

                        <span className="font-bold text-slate-500">
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
                    <div className="mt-3 rounded-xl bg-slate-50 p-3">

                      <div className="flex items-center justify-between text-sm">

                        <span className="font-bold text-slate-500">
                          موجودی
                        </span>

                        <span className="font-black">

                          {(product.stock ?? 0).toLocaleString("fa-IR")}{" "}
                          {product.unit || ""}

                        </span>

                      </div>

                    </div>

                    {/* Store */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                      <MapPin className="h-4 w-4" />

                      {product.seller_id
                        ? stores[product.seller_id] || "فروشگاه"
                        : "فروشگاه نامشخص"}

                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">

                      <Star className="h-4 w-4 fill-current" />

                      فروشنده تأییدشده

                    </div>

                    <button
                      type="button"
                      className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800"
                    >
                      مشاهده محصول
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        <div className="rounded-[2rem] bg-gradient-to-l from-blue-700 to-blue-950 px-6 py-12 text-center text-white">

          <h2 className="text-2xl font-black">
            فروشنده درب و پنجره هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولاتتان را
            به مشتریان جدید معرفی کنید.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800 hover:bg-blue-50"
          >
            <Phone className="h-5 w-5" />
            ثبت فروشگاه
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-10 text-center text-sm text-slate-400">

        <div className="font-black text-white">
          سرچنو
        </div>

        <p className="mt-2">
          بازار هوشمند ساخت‌وساز
        </p>

        <p className="mt-5 text-xs text-slate-600">
          © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
        </p>

      </footer>

    </main>
  );
}
