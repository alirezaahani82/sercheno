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

  useEffect(() => {
    const savedCart = localStorage.getItem("sercheno-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem("sercheno-cart", JSON.stringify(items));
  };

  const increaseQuantity = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updated);
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
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => {
    if (item.price === null) return sum;

    return sum + item.price * item.quantity;
  }, 0);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 px-5 py-10"
    >
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              🛒 سبد خرید من
            </h1>

            <p className="mt-2 text-slate-500">
              مصالح و خدمات انتخاب‌شده شما
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-white px-5 py-3 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-black">
              سبد خرید شما خالی است
            </h2>

            <p className="mt-3 text-slate-500">
              مصالح یا خدمات مورد نیازتان را به سبد اضافه کنید.
            </p>

            <Link
              href="/"
              className="mt-7 inline-block rounded-xl bg-blue-700 px-8 py-4 font-bold text-white hover:bg-blue-800"
            >
              مشاهده محصولات و خدمات
            </Link>

          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">

            <div className="space-y-4 lg:col-span-2">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {item.type === "product"
                          ? "مصالح"
                          : "خدمات"}
                      </span>

                      <h2 className="mt-3 text-xl font-black">
                        {item.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-bold text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>

                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">
<button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="h-10 w-10 rounded-xl bg-slate-100 font-black hover:bg-slate-200"
                      >
                        +
                      </button>

                      <span className="min-w-8 text-center font-black">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="h-10 w-10 rounded-xl bg-slate-100 font-black hover:bg-slate-200"
                      >
                        −
                      </button>

                    </div>

                    <div className="text-left">

                      {item.price === null ? (
                        <span className="font-bold text-amber-600">
                          قیمت توافقی
                        </span>
                      ) : (
                        <span className="font-black text-blue-700">
                          {(
                            item.price * item.quantity
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <div className="h-fit rounded-3xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-black">
                خلاصه سفارش
              </h2>

              <div className="my-6 border-t border-slate-100" />

              <div className="flex justify-between">

                <span className="text-slate-500">
                  تعداد اقلام
                </span>

                <span className="font-bold">
                  {cart.length}
                </span>

              </div>

              <div className="mt-4 flex justify-between">

                <span className="text-slate-500">
                  مبلغ قابل محاسبه
                </span>

                <span className="font-black text-blue-700">
                  {total.toLocaleString("fa-IR")} تومان
                </span>

              </div>

              <button
                className="mt-7 w-full rounded-xl bg-blue-700 py-4 font-black text-white hover:bg-blue-800"
              >
                ادامه ثبت سفارش
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

