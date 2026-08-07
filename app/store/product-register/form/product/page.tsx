"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PackagePlus,
  ArrowRight,
  Store,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const categories = [
  "درب و پنجره",
  "مصالح ساختمانی",
  "تأسیسات",
  "برق",
  "ابزار و تجهیزات",
  "آهن و فولاد",
  "رنگ و پوشش",
  "سایر",
];

type StoreInfo = {
  id: string;
  name: string;
  status: string | null;
};

export default function ProductRegisterPage() {
  const router = useRouter();

  const [store, setStore] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [customerPrice, setCustomerPrice] = useState("");
  const [cooperationPrice, setCooperationPrice] = useState("");

  const [unit, setUnit] = useState("عدد");
  const [stock, setStock] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [minOrder, setMinOrder] = useState("");

  /* -----------------------------
     دریافت فروشگاه واردشده
  ----------------------------- */

  useEffect(() => {
    const storeId =
      sessionStorage.getItem("sercheno_store_id");

    if (!storeId) {
      router.replace("/store/product-register");
      return;
    }

    loadStore(storeId);
  }, [router]);

  const loadStore = async (storeId: string) => {
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("id,name,status")
        .eq("id", storeId)
        .single();

      if (error || !data) {
        console.error(error);

        setError(
          "اطلاعات فروشگاه پیدا نشد. دوباره وارد حساب فروشگاه شوید."
        );

        return;
      }

      setStore(data);
    } catch (err) {
      console.error(err);

      setError(
        "خطا در دریافت اطلاعات فروشگاه."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     ثبت محصول
  ----------------------------- */

  const handleSubmit = async () => {
    if (submitting) return;

    setError("");
    setMessage("");

    if (!store) {
      setError("فروشگاه واردشده پیدا نشد.");
      return;
    }

    if (!name.trim()) {
      setError("نام محصول را وارد کنید.");
      return;
    }

    if (!category) {
      setError("دسته‌بندی محصول را انتخاب کنید.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("products")
        .insert({
          name: name.trim(),

          category: category,

          subcategory:
            subcategory.trim() || null,

          description:
            description.trim() || null,

          price:
            price.trim()
              ? Number(price)
              : null,

          customer_price:
            customerPrice.trim()
              ? Number(customerPrice)
              : null,

          cooperation_price:
            cooperationPrice.trim()
              ? Number(cooperationPrice)
              : null,

          unit:
            unit.trim() || "عدد",

          stock:
            stock.trim()
              ? Number(stock)
              : 0,

          brand:
            brand.trim() || null,

          model:
            model.trim() || null,

          min_order:
            minOrder.trim()
              ? Number(minOrder)
              : null,

          seller_id: store.id,

          status: "pending",
        });

      if (error) {
        console.error(error);

        setError(
          "خطا در ثبت محصول: " + error.message
        );

        return;
      }

      setMessage(
        "محصول با موفقیت ثبت شد و برای بررسی مدیریت سرچنو ارسال گردید."
      );

      /* پاک کردن فرم */

      setName("");
      setCategory("");
      setSubcategory("");
      setDescription("");
      setPrice("");
      setCustomerPrice("");
      setCooperationPrice("");
      setStock("");
      setBrand("");
      setModel("");
      setMinOrder("");

    } catch (err) {
      console.error(err);

      setError(
        "خطای غیرمنتظره هنگام ثبت محصول."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* -----------------------------
     Loading
  ----------------------------- */

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

          <p className="mt-5 font-bold text-slate-600">
            در حال دریافت اطلاعات فروشگاه...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link
            href="/store/product-register/form"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Store size={23} />
            </div>

            <div>
              <div className="text-xl font-black text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                پنل فروشگاه
              </div>
            </div>
          </Link>

          <Link
            href="/store/product-register/form"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight size={18} />
            بازگشت به پنل
          </Link>

        </div>
      </header>

      {/* Page */}

      <div className="mx-auto max-w-5xl px-5 py-10">

        {/* Title */}

        <section className="mb-6 rounded-3xl bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-7 text-white shadow-lg">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <PackagePlus size={32} />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                ثبت محصول جدید
              </h1>

              <p className="mt-2 text-sm text-blue-100">
                فروشگاه: {store?.name}
              </p>
            </div>

          </div>

        </section>

        {/* Messages */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 font-bold leading-7 text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 font-bold leading-7 text-emerald-700">
            <CheckCircle2
              size={23}
              className="mt-1 shrink-0"
            />

            <div>{message}</div>
          </div>
        )}

        {/* Form */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black">
                نام محصول *
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="مثلاً پنجره دوجداره UPVC"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-black">
                دسته‌بندی *
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="">
                  انتخاب دسته‌بندی
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}

            <div>
              <label className="mb-2 block text-sm font-black">
                زیر‌دسته
              </label>

              <input
                value={subcategory}
                onChange={(e) =>
                  setSubcategory(e.target.value)
                }
                placeholder="مثلاً پنجره UPVC"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Brand */}

            <div>
              <label className="mb-2 block text-sm font-black">
                برند
              </label>

              <input
                value={brand}
                onChange={(e) =>
                  setBrand(e.target.value)
                }
                placeholder="نام برند"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Model */}

            <div>
              <label className="mb-2 block text-sm font-black">
                مدل
              </label>

              <input
                value={model}
                onChange={(e) =>
                  setModel(e.target.value)
                }
                placeholder="مدل محصول"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Unit */}

            <div>
              <label className="mb-2 block text-sm font-black">
                واحد
              </label>

              <input
                value={unit}
                onChange={(e) =>
                  setUnit(e.target.value)
                }
                placeholder="عدد، متر، کیلوگرم و..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Stock */}

            <div>
              <label className="mb-2 block text-sm font-black">
                موجودی
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Customer Price */}

            <div>
              <label className="mb-2 block text-sm font-black">
                قیمت مشتری
              </label>

              <input
                type="number"
                value={customerPrice}
                onChange={(e) =>
                  setCustomerPrice(e.target.value)
                }
                placeholder="تومان"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Cooperation Price */}

            <div>
              <label className="mb-2 block text-sm font-black">
                قیمت همکاری
              </label>

              <input
                type="number"
                value={cooperationPrice}
                onChange={(e) =>
                  setCooperationPrice(e.target.value)
                }
                placeholder="تومان"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-black">
                قیمت پایه
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="تومان"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Min Order */}

            <div>
              <label className="mb-2 block text-sm font-black">
                حداقل سفارش
              </label>

              <input
                type="number"
                value={minOrder}
                onChange={(e) =>
                  setMinOrder(e.target.value)
                }
                placeholder="مثلاً 1"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black">
                توضیحات محصول
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                placeholder="توضیحات کامل محصول، مشخصات، ویژگی‌ها و شرایط فروش..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Submit */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "در حال ثبت محصول..."
              : "ثبت محصول برای بررسی"}
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-slate-400">
            پس از ثبت، محصول ابتدا در وضعیت «در انتظار بررسی»
            قرار می‌گیرد و بعد از تأیید مدیریت سرچنو منتشر خواهد شد.
          </p>

        </section>

      </div>
    </main>
  );
}
