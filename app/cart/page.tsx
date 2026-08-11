"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Store,
  Package,
  CreditCard,
} from "lucide-react";

type CartItem = {
  productId?: string;
  id?: string;

  name?: string | null;
  title?: string | null;

  type?: "product" | "service";

  price?: number | null;
  customer_price?: number | null;

  quantity: number;

  unit?: string | null;
  category?: string | null;
  brand?: string | null;
  model?: string | null;

  storeName?: string | null;

  description?: string | null;
};

const CART_KEY = "sercheno_cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* -----------------------------
     دریافت سبد خرید
  ----------------------------- */

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(
      "sercheno-cart-updated",
      handleCartUpdate
    );

    window.addEventListener(
      "storage",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "sercheno-cart-updated",
        handleCartUpdate
      );

      window.removeEventListener(
        "storage",
        handleCartUpdate
      );
    };
  }, []);

  const loadCart = () => {
    try {
      const savedCart =
        localStorage.getItem(CART_KEY);

      if (!savedCart) {
        setCart([]);
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(savedCart);

      if (Array.isArray(parsed)) {
        setCart(parsed);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error(
        "CART LOAD ERROR:",
        error
      );

      setCart([]);
    }

    setLoading(false);
  };

  /* -----------------------------
     ذخیره سبد
  ----------------------------- */

  const saveCart = (
    items: CartItem[]
  ) => {
    setCart(items);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(items)
    );

    window.dispatchEvent(
      new Event("sercheno-cart-updated")
    );
  };

  /* -----------------------------
     شناسه یکتا
  ----------------------------- */

  const getItemId = (
    item: CartItem
  ) => {
    return (
      item.productId ||
      item.id ||
      ""
    );
  };

  /* -----------------------------
     نام محصول
  ----------------------------- */

  const getItemName = (
    item: CartItem
  ) => {
    return (
      item.name ||
      item.title ||
      "محصول بدون نام"
    );
  };

  /* -----------------------------
     قیمت
  ----------------------------- */

  const getItemPrice = (
    item: CartItem
  ) => {
    if (
      item.customer_price !==
      undefined
    ) {
      return item.customer_price;
    }

    return item.price ?? null;
  };

  /* -----------------------------
     افزایش مقدار
  ----------------------------- */

  const increaseQuantity = (
    item: CartItem
  ) => {
    const id = getItemId(item);

    const updated = cart.map(
      (cartItem) =>
        getItemId(cartItem) === id
          ? {
              ...cartItem,
              quantity:
                Number(
                  cartItem.quantity || 0
                ) + 1,
            }
          : cartItem
    );

    saveCart(updated);
  };

  /* -----------------------------
     کاهش مقدار
  ----------------------------- */

  const decreaseQuantity = (
    item: CartItem
  ) => {
    const id = getItemId(item);

    const updated = cart
      .map((cartItem) =>
        getItemId(cartItem) === id
          ? {
              ...cartItem,
              quantity:
                Number(
                  cartItem.quantity || 0
                ) - 1,
            }
          : cartItem
      )
      .filter(
        (cartItem) =>
          Number(
            cartItem.quantity || 0
          ) > 0
      );

    saveCart(updated);
  };

  /* -----------------------------
     حذف محصول
  ----------------------------- */

  const removeItem = (
    item: CartItem
  ) => {
    const id = getItemId(item);

    const updated = cart.filter(
      (cartItem) =>
        getItemId(cartItem) !== id
    );

    saveCart(updated);
  };

  /* -----------------------------
     پاک کردن کل سبد
  ----------------------------- */

  const clearCart = () => {
    const confirmed =
      window.confirm(
        "آیا مطمئن هستید که می‌خواهید همه محصولات سبد خرید حذف شوند؟"
      );

    if (!confirmed) return;

    saveCart([]);
  };

  /* -----------------------------
     تعداد کل واحدها
  ----------------------------- */

  const totalQuantity =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ),
      0
    );

  /* -----------------------------
     تعداد محصولات
  ----------------------------- */

  const productCount =
    cart.filter(
      (item) =>
        item.type !== "service"
    ).length;

  /* -----------------------------
     تعداد خدمات
  ----------------------------- */

  const serviceCount =
    cart.filter(
      (item) =>
        item.type === "service"
    ).length;

  /* -----------------------------
     مبلغ کل
  ----------------------------- */

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => {
        const price =
          getItemPrice(item);

        if (
          price === null ||
          price === undefined
        ) {
          return sum;
        }

        return (
          sum +
          Number(price) *
            Number(
              item.quantity || 0
            )
        );
      },
      0
    );
  }, [cart]);

  /* -----------------------------
     محصولات دارای قیمت توافقی
  ----------------------------- */

  const hasAgreementPrice =
    cart.some(
      (item) =>
        getItemPrice(item) ===
          null ||
        getItemPrice(item) ===
          undefined
    );

  /* -----------------------------
     Loading
  ----------------------------- */

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-blue-100">
            <ShoppingCart className="h-10 w-10 text-blue-700" />
          </div>

          <p className="mt-5 font-bold text-slate-500">
            در حال آماده‌سازی سبد خرید...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f8fa] text-slate-900"
    >

      {/* =========================
          HEADER
      ========================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

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

              <div className="text-xl font-black text-blue-700 sm:text-2xl">
                سرچنو
              </div>

              <div className="text-[11px] text-slate-400 sm:text-xs">
                بازار هوشمند ساخت‌وساز
              </div>

            </div>

          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowRight className="h-4 w-4" />
            ادامه خرید
          </Link>

        </div>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        {/* عنوان */}

        <div className="mb-8">

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">

            <ShoppingCart className="h-4 w-4" />

            سبد خرید سرچنو

          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            سبد خرید شما
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            محصولات و خدمات انتخاب‌شده خود را بررسی و مقدار مورد نیاز را تنظیم کنید.
          </p>

        </div>

        {/* =========================
            EMPTY CART
        ========================= */}

        {cart.length === 0 ? (

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">

            <div className="flex flex-col items-center px-6 py-24 text-center sm:py-32">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">

                <ShoppingCart className="h-14 w-14 text-blue-700" />

              </div>

              <h2 className="mt-7 text-2xl font-black sm:text-3xl">
                سبد خرید شما خالی است
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
                از میان مصالح ساختمانی و خدمات تخصصی سرچنو،
                محصولات مورد نیاز پروژه خود را انتخاب کنید.
              </p>

              <Link
                href="/materials"
                className="mt-8 rounded-2xl bg-blue-700 px-8 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-1 hover:bg-blue-800"
              >
                مشاهده مصالح ساختمانی
              </Link>

            </div>

          </div>

        ) : (

          <>

            {/* =========================
                CART INFO
            ========================= */}

            <div className="mb-7 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-slate-500">
                    تعداد محصولات
                  </span>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <Package className="h-5 w-5 text-blue-700" />
                  </div>

                </div>

                <div className="mt-3 text-2xl font-black">
                  {productCount.toLocaleString(
                    "fa-IR"
                  )}
                </div>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-slate-500">
                    مجموع مقدار
                  </span>

                  <div className="rounded-xl bg-amber-50 p-3">
                    📦
                  </div>

                </div>

                <div className="mt-3 text-2xl font-black">
                  {totalQuantity.toLocaleString(
                    "fa-IR"
                  )}
                </div>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-slate-500">
                    خدمات
                  </span>

                  <div className="rounded-xl bg-emerald-50 p-3">
                    🔧
                  </div>

                </div>

                <div className="mt-3 text-2xl font-black">
                  {serviceCount.toLocaleString(
                    "fa-IR"
                  )}
                </div>

              </div>

            </div>

            {/* =========================
                CONTENT
            ========================= */}

            <div className="grid gap-7 lg:grid-cols-[1fr_380px]">

              {/* =====================
                  ITEMS
              ===================== */}

              <section>

                <div className="mb-5 flex items-center justify-between">

                  <h2 className="text-xl font-black">
                    اقلام انتخاب‌شده
                  </h2>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="flex items-center gap-2 text-sm font-bold text-red-500 transition hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    پاک کردن سبد
                  </button>

                </div>

                <div className="space-y-4">

                  {cart.map(
                    (item, index) => {

                      const itemId =
                        getItemId(item) ||
                        `item-${index}`;

                      const itemPrice =
                        getItemPrice(item);

                      const itemTotal =
                        itemPrice !==
                        null &&
                        itemPrice !==
                          undefined
                          ? Number(
                              itemPrice
                            ) *
                            Number(
                              item.quantity ||
                                0
                            )
                          : null;

                      return (

                        <div
                          key={`${itemId}-${index}`}
                          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                        >

                          <div className="p-5 sm:p-6">

                            {/* محصول */}

                            <div className="flex gap-4">

                              {/* آیکون */}

                              <div
                                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl ${
                                  item.type ===
                                  "service"
                                    ? "bg-emerald-50"
                                    : "bg-amber-50"
                                }`}
                              >
                                {item.type ===
                                "service"
                                  ? "🔧"
                                  : "🧱"}
                              </div>

                              {/* اطلاعات */}

                              <div className="min-w-0 flex-1">

                                <div className="flex items-start justify-between gap-3">

                                  <div>

                                    <span
                                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${
                                        item.type ===
                                        "service"
                                          ? "bg-emerald-50 text-emerald-700"
                                          : "bg-amber-50 text-amber-700"
                                      }`}
                                    >
                                      {item.type ===
                                      "service"
                                        ? "خدمات ساختمانی"
                                        : "مصالح ساختمانی"}
                                    </span>

                                    <h3 className="mt-2 text-lg font-black sm:text-xl">
                                      {getItemName(
                                        item
                                      )}
                                    </h3>

                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeItem(
                                        item
                                      )
                                    }
                                    className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                    title="حذف محصول"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>

                                </div>

                                {/* اطلاعات محصول */}

                                <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">

                                  {item.brand && (
                                    <div>
                                      <span className="font-bold">
                                        برند:
                                      </span>{" "}
                                      {item.brand}
                                    </div>
                                  )}

                                  {item.model && (
                                    <div>
                                      <span className="font-bold">
                                        مدل:
                                      </span>{" "}
                                      {item.model}
                                    </div>
                                  )}

                                  {item.category && (
                                    <div>
                                      <span className="font-bold">
                                        دسته:
                                      </span>{" "}
                                      {item.category}
                                    </div>
                                  )}

                                  {item.storeName && (
                                    <div className="flex items-center gap-1">
                                      <Store className="h-3.5 w-3.5" />
                                      <span className="font-bold">
                                        فروشگاه:
                                      </span>{" "}
                                      {item.storeName}
                                    </div>
                                  )}

                                </div>

                                {/* پایین کارت */}

                                <div className="mt-5 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">

                                  {/* مقدار */}

                                  <div>

                                    <div className="mb-2 text-xs font-bold text-slate-400">
                                      مقدار خرید
                                    </div>

                                    <div className="flex items-center gap-3">

                                      <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">

                                        <button
                                          type="button"
                                          onClick={() =>
                                            increaseQuantity(
                                              item
                                            )
                                          }
                                          className="flex h-11 w-11 items-center justify-center bg-slate-50 transition hover:bg-blue-50 hover:text-blue-700"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>

                                        <span className="flex h-11 min-w-16 items-center justify-center border-x border-slate-200 px-2 text-center font-black"
                                        >
                                          {Number(
                                            item.quantity ||
                                              0
                                          ).toLocaleString(
                                            "fa-IR"
                                          )}
                                        </span>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            decreaseQuantity(
                                              item
                                            )
                                          }
                                          className="flex h-11 w-11 items-center justify-center bg-slate-50 transition hover:bg-blue-50 hover:text-blue-700"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>

                                      </div>

                                      <span className="text-sm font-bold text-slate-500">
                                        {item.unit ||
                                          "عدد"}
                                      </span>

                                    </div>

                                  </div>

                                  {/* قیمت */}

                                  <div className="text-right">

                                    {itemPrice ===
                                    null ||
                                    itemPrice ===
                                      undefined ? (

                                      <div>

                                        <p className="text-xs text-slate-400">
                                          قیمت
                                        </p>

                                        <p className="mt-1 font-black text-amber-600">
                                          توافقی
                                        </p>

                                      </div>

                                    ) : (

                                      <div>

                                        <p className="text-xs text-slate-400">
                                          مبلغ محصول
                                        </p>

                                        <p className="mt-1 text-xl font-black text-blue-700">
                                          {Number(
                                            itemTotal
                                          ).toLocaleString(
                                            "fa-IR"
                                          )}{" "}
                                          تومان
                                        </p>

                                        <p className="mt-1 text-[11px] text-slate-400">
                                          قیمت واحد:{" "}
                                          {Number(
                                            itemPrice
                                          ).toLocaleString(
                                            "fa-IR"
                                          )}{" "}
                                          تومان
                                        </p>

                                      </div>

                                    )}

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              </section>

              {/* =====================
                  SUMMARY
              ===================== */}

              <aside className="lg:sticky lg:top-24 lg:h-fit">

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">

                  <div className="bg-gradient-to-l from-blue-800 to-blue-600 px-6 py-7 text-white">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                        <ShoppingCart className="h-6 w-6" />
                      </div>

                      <div>

                        <h2 className="text-xl font-black">
                          خلاصه سفارش
                        </h2>

                        <p className="mt-1 text-xs text-blue-100">
                          بررسی نهایی سبد خرید
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-6">

                    <div className="space-y-4">

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          تعداد اقلام
                        </span>

                        <span className="font-black">
                          {cart.length.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          مجموع مقدار
                        </span>

                        <span className="font-black">
                          {totalQuantity.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          محصولات
                        </span>

                        <span className="font-bold">
                          {productCount.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          خدمات
                        </span>

                        <span className="font-bold">
                          {serviceCount.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                      </div>

                    </div>

                    <div className="my-6 border-t border-dashed border-slate-200" />

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <CreditCard className="h-4 w-4" />
                        مبلغ قابل محاسبه
                      </div>

                      <div className="mt-3 flex items-end justify-between">

                        <span className="text-3xl font-black text-blue-700">
                          {total.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                        <span className="mb-1 text-sm font-bold text-slate-500">
                          تومان
                        </span>

                      </div>

                      {hasAgreementPrice && (
                        <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-700">
                          قیمت بعضی از اقلام توافقی است و مبلغ نهایی آن‌ها پس از هماهنگی با فروشنده مشخص می‌شود.
                        </div>
                      )}

                    </div>

                    <button
                      type="button"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      ادامه ثبت سفارش
                    </button>

                    <Link
                      href="/materials"
                      className="mt-3 block w-full rounded-2xl border border-slate-200 py-4 text-center font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      ادامه خرید مصالح
                    </Link>

                    <div className="mt-6 rounded-2xl bg-emerald-50 p-4">

                      <div className="flex gap-3">

                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                        <p className="text-xs font-bold leading-6 text-emerald-700">
                          محصولات این سبد از فروشندگان ثبت‌شده و تأییدشده سرچنو انتخاب می‌شوند.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </aside>

            </div>

          </>

        )}

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="mt-10 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center">

          <div className="font-black text-slate-900">
            سرچنو
          </div>

          <p className="mt-2 text-sm text-slate-400">
            بازار هوشمند ساخت‌وساز
          </p>

          <p className="mt-5 text-xs text-slate-400">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </p>

        </div>

      </footer>

    </main>
  );
}
