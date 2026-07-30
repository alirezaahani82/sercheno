"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: string;
  title: string;
  type: "product" | "service";
  quantity: number;
  price: number | null;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("sercheno-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    setLoading(false);
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem("sercheno-cart", JSON.stringify(items));
  };

  const increaseQuantity = (id: string) => {
    updateCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    updateCart([]);
  };

  const total = cart.reduce((sum, item) => {
    if (item.price === null) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  const productCount = cart.filter(
    (item) => item.type === "product"
  ).length;

  const serviceCount = cart.filter(
    (item) => item.type === "service"
  ).length;

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="text-center">
          <div className="text-5xl">🛒</div>
          <p className="mt-4 font-bold text-slate-600">
            در حال آماده‌سازی سبد خرید...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-2xl shadow-lg shadow-blue-700/20">
              🔎
            </div>

            <div>
              <h1 className="text-xl font-black text-slate-900">
                سرچنو
              </h1>

              <p className="text-xs font-medium text-slate-400">
                بازار آنلاین مصالح و خدمات ساختمانی
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
          >
            ادامه خرید
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">

        {/* Title */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            🛒 سبد خرید سرچنو
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            انتخاب‌های شما
          </h2>

          <p className="mt-3 text-slate-500">
            مصالح و خدمات مورد نیاز خود را در یک سفارش مدیریت کنید.
          </p>
        </div>
{/* Empty */}
        {cart.length === 0 ? (
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center sm:py-28">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-50 text-6xl">
                🛒
              </div>

              <h3 className="mt-7 text-2xl font-black text-slate-900 sm:text-3xl">
                سبد خرید شما خالی است
              </h3>

              <p className="mt-3 max-w-md leading-7 text-slate-500">
                از میان مصالح ساختمانی و خدمات تخصصی سرچنو،
                موارد مورد نیازتان را انتخاب کنید.
              </p>

              <Link
                href="/"
                className="mt-8 rounded-2xl bg-blue-700 px-8 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                شروع خرید و انتخاب خدمات
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-7 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">
                    کل اقلام
                  </span>

                  <span className="rounded-xl bg-blue-50 px-3 py-2 text-xl">
                    🛒
                  </span>
                </div>

                <p className="mt-3 text-2xl font-black text-slate-900">
                  {cart.length.toLocaleString("fa-IR")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">
                    مصالح
                  </span>

                  <span className="rounded-xl bg-amber-50 px-3 py-2 text-xl">
                    🧱
                  </span>
                </div>

                <p className="mt-3 text-2xl font-black text-slate-900">
                  {productCount.toLocaleString("fa-IR")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">
                    خدمات
                  </span>

                  <span className="rounded-xl bg-emerald-50 px-3 py-2 text-xl">
                    🔧
                  </span>
                </div>

                <p className="mt-3 text-2xl font-black text-slate-900">
                  {serviceCount.toLocaleString("fa-IR")}
                </p>
              </div>

            </div>

            {/* Content */}
            <div className="grid gap-7 lg:grid-cols-[1fr_380px]">

              {/* Items */}
              <section className="space-y-5">

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">
                    اقلام انتخاب‌شده
                  </h3>

                  <button
                    onClick={clearCart}
                    className="text-sm font-bold text-red-500 transition hover:text-red-700"
                  >
                    پاک کردن سبد
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="p-5 sm:p-6">

                      <div className="flex gap-4">
{/* Icon */}
                        <div
                          className={flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl ${
                            item.type === "product"
                              ? "bg-amber-50"
                              : "bg-emerald-50"
                          }}
                        >
                          {item.type === "product"
                            ? "🧱"
                            : "🔧"}
                        </div>

                        {/* Information */}
                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <div>
                              <span
                                className={inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                  item.type === "product"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-emerald-50 text-emerald-700"
                                }}
                              >
                                {item.type === "product"
                                  ? "مصالح ساختمانی"
                                  : "خدمات ساختمانی"}
                              </span>

                              <h4 className="mt-2 text-lg font-black text-slate-900">
                                {item.title}
                              </h4>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(item.id)
                              }
                              className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              title="حذف"
                            >
                              🗑️
                            </button>

                          </div>

                          {/* Bottom */}
                          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Quantity */}
                            <div className="flex items-center gap-3">

                              <span className="text-sm font-bold text-slate-500">
                                تعداد:
                              </span>

                              <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">

                                <button
                                  onClick={() =>
                                    increaseQuantity(item.id)
                                  }
                                  className="flex h-10 w-10 items-center justify-center bg-slate-50 text-lg font-black transition hover:bg-blue-50 hover:text-blue-700"
                                >
                                  +
                                </button>

                                <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 bg-white font-black">
                                  {item.quantity.toLocaleString(
                                    "fa-IR"
                                  )}
                                </span>

                                <button
                                  onClick={() =>
                                    decreaseQuantity(item.id)
                                  }
                                  className="flex h-10 w-10 items-center justify-center bg-slate-50 text-lg font-black transition hover:bg-blue-50 hover:text-blue-700"
                                >
                                  −
                                </button>

                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              {item.price === null ? (
                                <div>
                                  <p className="text-xs text-slate-400">
                                    مبلغ خدمت
                                  </p>

                                  <p className="mt-1 font-black text-amber-600">
                                    قیمت توافقی
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-xs text-slate-400">
                                    مبلغ
                                  </p>

                                  <p className="mt-1 text-lg font-black text-blue-700">
                                    {(
                                      item.price *
                                      item.quantity
                                    ).toLocaleString("fa-IR")}{" "}
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
                ))}

              </section>

              {/* Summary */}
              <aside className="lg:sticky lg:top-6 lg:h-fit">

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

                  <div className="bg-gradient-to-l from-blue-700 to-blue-600 px-6 py-7 text-white">

                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                        🛍️
                      </div>

                      <div>
                        <h3 className="text-xl font-black">
                          خلاصه سفارش
                        </h3>

                        <p className="mt-1 text-sm text-blue-100">
                          بررسی نهایی انتخاب‌های شما
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

                        <span className="font-black text-slate-900">
                          {cart.length.toLocaleString("fa-IR")}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                          مصالح
                        </span>

                        <span className="font-bold">
                          {productCount.toLocaleString("fa-IR")}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                          خدمات
                        </span>

                        <span className="font-bold">
                          {serviceCount.toLocaleString("fa-IR")}
                        </span>
                      </div>

                    </div>

                    <div className="my-6 border-t border-dashed border-slate-200" />

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <p className="text-sm font-bold text-slate-500">
                        مبلغ قابل محاسبه
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-2xl font-black text-blue-700">
                          {total.toLocaleString("fa-IR")}
                        </span>

                        <span className="mb-1 font-bold text-slate-500">
                          تومان
                        </span>

                      </div>

                      {cart.some(
                        (item) => item.price === null
                      ) && (
                        <p className="mt-3 text-xs leading-6 text-amber-600">
                          قیمت برخی خدمات پس از بررسی درخواست
                          و هماهنگی با متخصص مشخص می‌شود.
                        </p>
                      )}

                    </div>

                    <button
                      className="mt-6 w-full rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                    >
                      ادامه ثبت سفارش
                    </button>

                    <Link
                      href="/"
                      className="mt-3 block w-full rounded-2xl border border-slate-200 py-4 text-center font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      ادامه خرید
                    </Link>

                    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">

                      <span className="text-xl">
                        🔒
                      </span>

                      <p className="text-xs font-bold leading-5 text-emerald-700">
                        اطلاعات سفارش شما در سرچنو
                        با امنیت نگهداری می‌شود.
                      </p>

                    </div>

                  </div>
                </div>

              </aside>

            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-slate-400">
          © سرچنو — بازار آنلاین مصالح و خدمات ساختمانی
        </div>
      </footer>
    </main>
  );
}
