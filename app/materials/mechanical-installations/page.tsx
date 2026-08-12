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

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  storeName: string;
};

export default function MechanicalInstallationsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({});

  /* =========================
     مقدار خرید
  ========================= */

  const getQuantity = (product: Product) => {
    const minOrder = Math.max(
      product.min_order ?? 1,
      1
    );

    return quantities[product.id] ?? minOrder;
  };

  /* =========================
     افزایش مقدار
  ========================= */

  const increaseQuantity = (product: Product) => {
    const current = getQuantity(product);
    const stock = product.stock ?? 0;

    if (stock > 0 && current >= stock) {
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: current + 1,
    }));
  };

  /* =========================
     کاهش مقدار
  ========================= */

  const decreaseQuantity = (product: Product) => {
    const current = getQuantity(product);

    const minOrder = Math.max(
      product.min_order ?? 1,
      1
    );

    if (current <= minOrder) {
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: current - 1,
    }));
  };

  /* =========================
     تغییر مستقیم تعداد
  ========================= */

  const changeQuantity = (
    product: Product,
    value: string
  ) => {
    if (value === "") {
      return;
    }

    const quantity = Number(value);

    if (Number.isNaN(quantity)) {
      return;
    }

    const minOrder = Math.max(
      product.min_order ?? 1,
      1
    );

    const stock = product.stock ?? 0;

    if (quantity < minOrder) {
      return;
    }

    if (stock > 0 && quantity > stock) {
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: quantity,
    }));
  };

  /* =========================
     افزودن به سبد خرید
  ========================= */

  const addToCart = (product: Product) => {
    const quantity = getQuantity(product);

    const price =
      product.customer_price ??
      product.price ??
      0;

    const storeName =
      product.seller_id
        ? stores[product.seller_id] ||
          "فروشگاه"
        : "فروشگاه نامشخص";

    const newItem: CartItem = {
      productId: product.id,

      name:
        product.name ||
        "محصول بدون نام",

      price,

      quantity,

      unit:
        product.unit ||
        "عدد",

      storeName,
    };

    const existingCart: CartItem[] =
      JSON.parse(
        localStorage.getItem(
          "sercheno_cart"
        ) || "[]"
      );

    const existingIndex =
      existingCart.findIndex(
        (item) =>
          item.productId ===
          product.id
      );

    if (existingIndex >= 0) {
      existingCart[
        existingIndex
      ].quantity += quantity;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem(
      "sercheno_cart",
      JSON.stringify(existingCart)
    );

    window.dispatchEvent(
      new Event("sercheno-cart-updated")
    );

    alert(
      "محصول با موفقیت به سبد خرید اضافه شد."
    );
  };

  /* =========================
     دریافت محصولات
  ========================= */

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================
     بروزرسانی شمارنده سبد
  ========================= */

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart: CartItem[] =
          JSON.parse(
            localStorage.getItem(
              "sercheno_cart"
            ) || "[]"
          );

        const count = cart.reduce(
          (
            total: number,
            item: CartItem
          ) =>
            total +
            Number(
              item.quantity || 0
            ),
          0
        );

        setCartCount(count);
      } catch (error) {
        console.error(
          "CART COUNT ERROR:",
          error
        );

        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener(
      "sercheno-cart-updated",
      updateCartCount
    );

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "sercheno-cart-updated",
        updateCartCount
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  /* =========================
     بارگذاری محصولات تأسیسات مکانیکی
  ========================= */

  const loadProducts = async () => {
    try {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from("products")
        .select(
          "id,name,category,price,customer_price,cooperation_price,stock,unit,description,seller_id,status,created_at,brand,model,min_order"
        )
        .eq(
          "category",
          "mechanical-installations"
        )
        .eq(
          "status",
          "active"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "MECHANICAL INSTALLATIONS PRODUCTS ERROR:",
          error
        );

        return;
      }

      setProducts(data || []);

      const sellerIds = [
        ...new Set(
          (data || [])
            .map(
              (product) =>
                product.seller_id
            )
            .filter(Boolean)
        ),
      ];

      if (sellerIds.length > 0) {
        const {
          data: storeData,
          error: storeError,
        } = await supabase
          .from("stores")
          .select("id,name")
          .in(
            "id",
            sellerIds
          );

        if (storeError) {
          console.error(
            "STORE ERROR:",
            storeError
          );
        }

        const storeMap: Record<
          string,
          string
        > = {};

        (
          storeData || []
        ).forEach(
          (
            store: StoreInfo
          ) => {
            storeMap[
              store.id
            ] =
              store.name ||
              "فروشگاه";
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

  /* =========================
     جستجوی محصولات
  ========================= */

  const filteredProducts =
    products.filter(
      (product) => {
        const searchText =
          search
            .trim()
            .toLowerCase();

        if (!searchText) {
          return true;
        }

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

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >

      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

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

          {/* Cart */}

          <Link
            href="/cart"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl transition hover:bg-blue-50 hover:text-blue-700"
            title="سبد خرید"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                {cartCount.toLocaleString(
                  "fa-IR"
                )}
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

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="relative h-[420px]">

          <img
            src="/materials/mechanical-installations.jpg"
            alt="تأسیسات مکانیکی ساختمان"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/65 to-slate-950/20" />

          <div className="absolute inset-0 flex items-center">

            <div className="mx-auto w-full max-w-7xl px-5 text-white">

              <div className="max-w-3xl">

                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                  تأسیسات مکانیکی ساختمان
                </span>

                <h1 className="mt-5 text-4xl font-black sm:text-6xl">
                  تأسیسات مکانیکی
                </h1>

                <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
                  انواع تجهیزات و محصولات مورد نیاز
                  برای اجرای تأسیسات مکانیکی ساختمان،
                  از سیستم‌های لوله‌کشی آب و فاضلاب
                  تا گرمایش، سرمایش، تهویه، موتورخانه
                  و تجهیزات کنترلی را از تأمین‌کنندگان
                  معتبر در سرچنو پیدا و خریداری کنید.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    لوله و اتصالات
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    پمپ و تجهیزات آبرسانی
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    گرمایش
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    سرمایش
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    تهویه و موتورخانه
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="مثلاً پمپ آب، لوله پنج‌لایه، شیرآلات، پکیج، رادیاتور..."
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

      {/* ================= SUB CATEGORIES ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14">

        <div className="mb-7">

          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی تخصصی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            چه تجهیزاتی برای تأسیسات مکانیکی نیاز دارید؟
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            محصولات تأسیسات مکانیکی بر اساس
            سیستم مصرفی، محل نصب، نوع تجهیزات،
            کاربرد، جنس، ظرفیت و نوع اجرای پروژه
            دسته‌بندی شده‌اند.
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "لوله و اتصالات",
            "لوله آب",
            "لوله فاضلاب",
            "لوله پنج‌لایه",
            "لوله تک‌لایه",
            "لوله پلی‌پروپیلن",
            "لوله PVC",
            "لوله UPVC",
            "لوله پلی‌اتیلن",
            "لوله مسی",
            "لوله فولادی",
            "لوله گالوانیزه",

            "اتصالات لوله",
            "زانو",
            "سه‌راهی",
            "چهارراهی",
            "تبدیل",
            "بوشن",
            "مغزی",
            "فلنج",
            "اتصالات پنج‌لایه",
            "اتصالات پلی‌پروپیلن",
            "اتصالات پلی‌اتیلن",

            "شیرآلات",
            "شیر آب",
            "شیر فلکه",
            "شیر یک‌طرفه",
            "شیر پروانه‌ای",
            "شیر توپی",
            "شیر فشارشکن",
            "شیر کنترل",
            "شیرآلات ساختمانی",
            "شیرآلات صنعتی",

            "پمپ و آبرسانی",
            "پمپ آب",
            "پمپ خانگی",
            "پمپ سیرکولاتور",
            "پمپ طبقاتی",
            "پمپ کف‌کش",
            "پمپ لجن‌کش",
            "پمپ شناور",
            "پمپ بوستر",
            "بوستر پمپ",
            "منبع تحت فشار",
            "منبع ذخیره آب",

            "گرمایش",
            "پکیج",
            "پکیج دیواری",
            "پکیج زمینی",
            "رادیاتور",
            "رادیاتور پنلی",
            "رادیاتور آلومینیومی",
            "رادیاتور حوله‌ای",
            "گرمایش از کف",
            "کلکتور گرمایش از کف",
            "دیگ آب گرم",
            "دیگ چدنی",
            "دیگ فولادی",

            "موتورخانه",
            "مشعل",
            "دیگ موتورخانه",
            "منبع کویل‌دار",
            "منبع دوجداره",
            "منبع انبساط",
            "سختی‌گیر",
            "فیلتر آب",
            "رسوب‌گیر",
            "تجهیزات موتورخانه",

            "سرمایش",
            "چیلر",
            "چیلر تراکمی",
            "چیلر جذبی",
            "فن‌کویل",
            "فن‌کویل سقفی",
            "فن‌کویل زمینی",
            "کولر گازی",
            "اسپلیت",
            "داکت اسپلیت",

            "تهویه",
            "هواساز",
            "اگزاست فن",
            "فن سانتریفیوژ",
            "فن محوری",
            "تهویه صنعتی",
            "کانال هوا",
            "دریچه هوا",
            "دمپر",
            "فیلتر هوا",

            "تجهیزات فاضلاب",
            "کف‌شور",
            "سیفون",
            "تله فاضلاب",
            "چاه‌بازکن",
            "پمپ فاضلاب",
            "منهول",
            "لوله فاضلاب ساختمان",

            "تجهیزات کنترل",
            "ترموستات",
            "کنترلر دما",
            "شیر ترموستاتیک",
            "گیج فشار",
            "گیج دما",
            "فلومتر",
            "پرشر سوئیچ",

            "عایق تأسیسات",
            "عایق لوله",
            "عایق الاستومری",
            "عایق پشم سنگ",
            "عایق پشم شیشه",
            "عایق حرارتی لوله",
            "عایق صوتی تأسیسات",

            "متعلقات نصب",
            "بست لوله",
            "ساپورت تأسیسات",
            "بست فلزی",
            "نوار تفلون",
            "چسب لوله",
            "واشر",
            "پیچ و مهره تأسیسات",
            "متعلقات موتورخانه",

            "تجهیزات تأسیسات مکانیکی ساختمانی",
            "تجهیزات تأسیسات مکانیکی صنعتی",
            "تجهیزات آبرسانی",
            "تجهیزات فاضلاب",
            "تجهیزات گرمایشی",
            "تجهیزات سرمایشی",
            "تجهیزات تهویه مطبوع",
            "تجهیزات موتورخانه",
          ].map(
            (item) => (
              <button
                key={item}
                type="button"
                className="rounded-2xl border border-slate-200 bg-white p-5 text-right font-bold transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                {item}
              </button>
            )
          )}

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8">

            <span className="text-sm font-bold text-emerald-600">
              محصولات تأییدشده
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              محصولات تأسیسات مکانیکی
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              محصولات تأییدشده توسط تیم سرچنو
              در این بخش نمایش داده می‌شوند.
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
                🔧
              </div>

              <h3 className="mt-5 text-xl font-black">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                در حال حاضر محصول تأییدشده‌ای
                در این دسته وجود ندارد.
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

                    {/* Product Image/Icon */}

                    <div className="flex items-center justify-center bg-slate-100 py-10 text-6xl">
                      🔧
                    </div>

                    <div className="p-6">

                      {/* Status */}

                      <div className="flex items-center justify-between gap-3">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          تأسیسات مکانیکی
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">

                          <ShieldCheck className="h-3 w-3" />

                          تأییدشده

                        </span>

                      </div>

                      {/* Name */}

                      <h3 className="mt-4 text-lg font-black">
                        {product.name ||
                          "محصول بدون نام"}
                      </h3>

                      {/* Brand */}

                      {product.brand && (
                        <p className="mt-2 text-sm text-slate-500">
                          برند:{" "}
                          {product.brand}
                        </p>
                      )}

                      {/* Model */}

                      {product.model && (
                        <p className="mt-1 text-sm text-slate-500">
                          مدل:{" "}
                          {product.model}
                        </p>
                      )}

                      {/* Description */}

                      {product.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                          {product.description}
                        </p>
                      )}

                      {/* Price + Quantity */}

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

                        {/* Quantity */}

                        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

                          <div className="mb-3 flex items-center justify-between">

                            <span className="text-sm font-black text-slate-800">
                              مقدار خرید
                            </span>

                            <span className="text-xs font-bold text-slate-400">
                              واحد فروش:{" "}
                              {product.unit ||
                                "عدد"}
                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  product
                                )
                              }
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-black text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                            >
                              −
                            </button>

                            <input
  type="number"
  min={product.min_order ?? 1}
  max={product.stock && product.stock > 0 ? product.stock : undefined}
  value={quantities[product.id] ?? getQuantity(product)}
  onChange={(e) => {
    const rawValue = e.target.value;

    // اجازه بده کاربر موقتاً فیلد را خالی کند
    if (rawValue === "") {
      setQuantities((prev) => ({
        ...prev,
        [product.id]: 0,
      }));
      return;
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: value,
    }));
  }}
  onBlur={() => {
    const minOrder = Math.max(
      product.min_order ?? 1,
      1
    );

    const stock = product.stock ?? 0;

    let value =
      quantities[product.id] ?? minOrder;

    // کمتر از حداقل خرید
    if (value < minOrder) {
      value = minOrder;
    }

    // بیشتر از موجودی
    if (stock > 0 && value > stock) {
      value = stock;
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: value,
    }));
  }}
  className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-center text-lg font-black text-blue-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
/>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  product
                                )
                              }
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-2xl font-black text-white transition hover:bg-blue-800"
                            >
                              +
                            </button>

                          </div>

                          <p className="mt-3 text-center text-xs text-slate-400">
                            حداقل خرید:{" "}
                            {(
                              product.min_order ??
                              1
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            {product.unit ||
                              "واحد"}
                          </p>

                        </div>

                        {/* Stock */}

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                          <span className="font-bold text-slate-500">
                            موجودی
                          </span>

                          <span className="font-black">

                            {(
                              product.stock ??
                              0
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            {product.unit ||
                              ""}

                          </span>

                        </div>

                      </div>

                      {/* Total Price */}

                      <div className="mt-3 rounded-2xl bg-blue-50 p-4">

                        <div className="flex items-center justify-between gap-3">

                          <span className="text-sm font-bold text-slate-600">
                            مبلغ کل خرید
                          </span>

                          <span className="text-lg font-black text-blue-700">

                            {(
                              (
                                product.customer_price ??
                                product.price ??
                                0
                              ) *
                              getQuantity(
                                product
                              )
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            تومان

                          </span>

                        </div>

                      </div>

                      {/* Store */}

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                        <MapPin className="h-4 w-4" />

                        {product.seller_id
                          ? stores[
                              product.seller_id
                            ] ||
                            "فروشگاه"
                          : "فروشگاه نامشخص"}

                      </div>

                      {/* Seller */}

                      <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">

                        <Star className="h-4 w-4 fill-current" />

                        فروشنده تأییدشده

                      </div>

                      {/* Buy */}

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
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

      {/* ================= FOOTER ================= */}

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
