"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Search,
  ShieldCheck,
  Star,
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

export default function PaintCoatingsPage() {
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
        .eq("category", "paint-coatings")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("PAINT PRODUCTS ERROR:", error);
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
          console.error("STORE ERROR:", storeError);
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach(
          (store: StoreInfo) => {
            storeMap[store.id] = store.name || "فروشگاه";
          }
        );

        setStores(storeMap);
      }
    } catch (error) {
      console.error(error);
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
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="سرچنو"
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

          <Link
            href="/materials"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به مصالح
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800">
        <div className="mx-auto max-w-7xl px-5 py-16 text-white">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
              مصالح و تجهیزات
            </span>

            <h1 className="mt-6 text-4xl font-black sm:text-6xl">
              رنگ، پوشش و عایق‌های سطحی
            </h1>

            <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
              انواع رنگ ساختمانی، رنگ صنعتی، پوشش‌های محافظ،
              پرایمر، بتونه و سایر محصولات رنگ و پوشش را
              از فروشندگان و تأمین‌کنندگان سرچنو پیدا کنید.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-white p-3 shadow-2xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                <Search className="h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="مثلاً رنگ اکریلیک، رنگ روغنی، پرایمر..."
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                />
              </div>

              <button
                type="button"
                className="rounded-2xl bg-blue-700 px-8 py-4 font-black text-white hover:bg-blue-800"
              >
                جست‌وجو
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <span className="text-sm font-bold text-blue-700">
          دسته‌بندی رنگ و پوشش
        </span>

        <h2 className="mt-2 text-2xl font-black">
          محصولات رنگ و پوشش
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "رنگ ساختمانی",
            "رنگ اکریلیک",
            "رنگ روغنی",
            "رنگ صنعتی",
            "پرایمر",
            "بتونه",
            "پوشش ضدزنگ",
            "پوشش‌های محافظ",
          ].map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-2xl border border-slate-200 bg-white p-5 text-right font-bold transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8">
            <span className="text-sm font-bold text-emerald-600">
              محصولات تأییدشده
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              محصولات رنگ و پوشش
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              فقط محصولاتی که توسط ادمین سرچنو تأیید شده‌اند
              در این صفحه نمایش داده می‌شوند.
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

              <p className="mt-5 font-bold text-slate-500">
                در حال دریافت محصولات...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                🎨
              </div>

              <h3 className="mt-5 text-xl font-black">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                در حال حاضر محصول تأییدشده‌ای در این دسته وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-center bg-slate-100 py-10 text-6xl">
                    🎨
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        رنگ و پوشش
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

                    <div className="mt-3 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-500">
                          موجودی
                        </span>

                        <span className="font-black">
                          {(product.stock ?? 0).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          {product.unit || ""}
                        </span>
                      </div>
                    </div>

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
                      مشاهده جزئیات محصول
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate-950 py-10 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-7xl px-5">
          <div className="font-black text-white">
            سرچنو
          </div>

          <p className="mt-2">
            بازار هوشمند ساخت‌وساز
          </p>

          <p className="mt-5 text-xs">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </main>
  );
}
