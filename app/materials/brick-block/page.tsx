"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  ShoppingCart,
  Minus,
  Plus,
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

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  storeName: string;
};

export default function BrickBlockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const addToCart = (product: Product) => {
  const quantity = product.min_order ?? 1;

  const price =
    product.customer_price ??
    product.price ??
    0;

  const storeName = product.seller_id
    ? stores[product.seller_id] || "فروشگاه"
    : "فروشگاه نامشخص";

  const newItem: CartItem = {
    productId: product.id,
    name: product.name || "محصول بدون نام",
    price,
    quantity,
    unit: product.unit || "عدد",
    storeName,
  };

  const existingCart: CartItem[] = JSON.parse(
    localStorage.getItem("sercheno_cart") || "[]"
  );

  const existingIndex = existingCart.findIndex(
    (item) => item.productId === product.id
  );

  if (existingIndex >= 0) {
    existingCart[existingIndex].quantity += quantity;
  } else {
    existingCart.push(newItem);
  }

  localStorage.setItem(
    "sercheno_cart",
    JSON.stringify(existingCart)
  );

  alert("محصول با موفقیت به سبد خرید اضافه شد.");
};
  const [quantities, setQuantities] = useState<Record<string, number>>({});

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
        .eq("category", "brick-block")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("BRICK PRODUCTS ERROR:", error);
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
            storeMap[store.id] =
              store.name || "فروشگاه";
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

  const filteredProducts = products.filter(
    (product) => {
      const searchText = search
        .trim()
        .toLowerCase();

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
    }
  );

  const getQuantity = (product: Product) => {
  const minOrder = Math.max(product.min_order ?? 1, 1);
  return quantities[product.id] ?? minOrder;
};

const increaseQuantity = (product: Product) => {
  const current = getQuantity(product);

  setQuantities((prev) => ({
    ...prev,
    [product.id]: current + 1,
  }));
};

const decreaseQuantity = (product: Product) => {
  const current = getQuantity(product);
  const minOrder = Math.max(product.min_order ?? 1, 1);

  if (current <= minOrder) return;

  setQuantities((prev) => ({
    ...prev,
    [product.id]: current - 1,
  }));
};

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
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
  href="/cart"
  className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl transition hover:bg-blue-50 hover:text-blue-700"
  title="سبد خرید"
>
  🛒

  {cartCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
      {cartCount}
    </span>
  )}
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

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div className="relative h-[420px]">

          <img
            src="/materials/brick-block.jpg"
            alt="آجر بلوک و سفال ساختمانی"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/60 to-slate-950/20" />

          <div className="absolute inset-0 flex items-center">

            <div className="mx-auto w-full max-w-7xl px-5 text-white">

              <div className="max-w-2xl">

                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                  مصالح ساختمانی
                </span>

                <h1 className="mt-5 text-4xl font-black sm:text-6xl">
                  آجر، بلوک و سفال
                </h1>

                <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
                  انواع آجر، بلوک و سفال ساختمانی را از فروشندگان و
                  تأمین‌کنندگان معتبر در سرچنو پیدا کنید.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    آجر ساختمانی
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    بلوک سیمانی
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    بلوک سبک
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    سفال
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Search */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="مثلاً آجر فشاری، بلوک سبک، سفال ۱۵..."
                className="w-full bg-transparent outline-none"
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

      </section>

      {/* Sub Categories */}

      <section className="mx-auto max-w-7xl px-5 pb-14">

        <div className="mb-7">
          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            چه نوع مصالحی نیاز دارید؟
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "آجر ساختمانی",
            "آجر فشاری",
            "بلوک سیمانی",
            "بلوک سبک",
            "بلوک هبلکس",
            "سفال دیواری",
            "سفال سقفی",
            "آجر نما",
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

      {/* Products */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8">

            <span className="text-sm font-bold text-emerald-600">
              محصولات تأییدشده
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              محصولات آجر، بلوک و سفال
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              محصولاتی که توسط تیم سرچنو تأیید شده‌اند در این بخش نمایش داده می‌شوند.
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
                🧱
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

              {filteredProducts.map(
                (product) => (

                  <div
                    key={product.id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    <div className="flex items-center justify-center bg-slate-100 py-10 text-6xl">
                      🧱
                    </div>

                    <div className="p-6">

                      <div className="flex items-center justify-between gap-3">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          آجر، بلوک و سفال
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

                      <div className="mt-5 space-y-3">

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                          <span className="font-bold text-slate-500">
                            قیمت مشتری
                          </span>

                          <span className="font-black text-blue-700">
                            {(
                              product.customer_price ??
                              product.price ??
                              0
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            تومان
                          </span>

                        </div>

                       {/* مقدار خرید */}

<div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

  <div className="mb-3 flex items-center justify-between">

    <span className="text-sm font-black text-slate-800">
      مقدار خرید
    </span>

    <span className="text-xs font-bold text-slate-400">
      واحد فروش: {product.unit || "عدد"}
    </span>

  </div>

  <div className="flex items-center gap-2">

    {/* منفی */}
    <button
      type="button"
      onClick={() => decreaseQuantity(product)}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-black text-slate-700 shadow-sm hover:bg-red-50 hover:text-red-600"
    >
      −
    </button>

    {/* ورود مستقیم عدد */}
    <input
      type="number"
      min={product.min_order || 1}
      max={product.stock || undefined}
      value={quantities[product.id] ?? product.min_order ?? 1}
      onChange={(e) => {
        const value = Number(e.target.value);

        if (value < 1) return;

        setQuantities((prev) => ({
          ...prev,
          [product.id]: value,
        }));
      }}
      className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-center text-lg font-black text-blue-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    />

    {/* مثبت */}
    <button
      type="button"
      onClick={() => increaseQuantity(product)}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-2xl font-black text-white hover:bg-blue-800"
    >
      +
    </button>

  </div>

  <p className="mt-3 text-center text-xs text-slate-400">
    حداقل خرید:{" "}
    {(product.min_order ?? 1).toLocaleString("fa-IR")}{" "}
    {product.unit || "واحد"}
  </p>

</div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

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

                      {/* مبلغ کل خرید */}

<div className="mt-3 rounded-2xl bg-blue-50 p-4">

  <div className="flex items-center justify-between gap-3">

    <span className="text-sm font-bold text-slate-600">
      مبلغ کل خرید
    </span>

    <span className="text-lg font-black text-blue-700">
      {(
        (product.customer_price ??
          product.price ??
          0) *
        (quantities[product.id] ??
          product.min_order ??
          1)
      ).toLocaleString("fa-IR")}{" "}
      تومان
    </span>

  </div>

</div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                        <MapPin className="h-4 w-4" />

                        {product.seller_id
                          ? stores[
                              product.seller_id
                            ] || "فروشگاه"
                          : "فروشگاه نامشخص"}

                      </div>

                      <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">

                        <Star className="h-4 w-4 fill-current" />

                        فروشنده تأییدشده

                      </div>

                     <button
  type="button"
  onClick={() => addToCart(product)}
  className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
>
  خرید محصول
</button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

      {/* Footer */}

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
