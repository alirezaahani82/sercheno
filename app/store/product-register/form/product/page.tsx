"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  PackagePlus,
  Store,
  Upload,
  X,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const categories = [
  { value: "brick-block", label: "آجر و بلوک" },
  { value: "cement-concrete", label: "سیمان و بتن" },
  { value: "doors-windows", label: "درب و پنجره" },
  { value: "electrical-lighting", label: "برق و روشنایی" },
  { value: "elevators", label: "آسانسور" },
  { value: "insulation", label: "عایق‌کاری" },
  { value: "interior-decoration", label: "دکوراسیون داخلی" },
  { value: "iron-steel", label: "آهن و فولاد" },
  {
    value: "mechanical-installations",
    label: "تأسیسات مکانیکی",
  },
  { value: "paint-coatings", label: "رنگ و پوشش" },
  { value: "plumbing-pipes", label: "لوله و اتصالات" },
  { value: "sanitary", label: "بهداشتی" },
  { value: "stone-tile", label: "سنگ و کاشی" },
];

const salesConditions = [
  {
    key: "bulk",
    label: "فروش عمده",
  },
  {
    key: "credit",
    label: "فروش اعتباری",
  },
  {
    key: "fast_delivery",
    label: "امکان ارسال فوری",
  },
  {
    key: "retail",
    label: "فروش جزئی",
  },
  {
    key: "cash",
    label: "فروش نقدی",
  },
  {
    key: "installment",
    label: "فروش اقساطی",
  },
  {
    key: "other_cities",
    label: "ارسال به شهرهای دیگر",
  },
];

type ProductForm = {
  name: string;
  category: string;
  brand: string;
  model: string;
  unit: string;
  customerPrice: string;
  cooperationPrice: string;
  minOrder: string;
  stock: string;
  description: string;
  salesDescription: string;
};

const emptyProduct: ProductForm = {
  name: "",
  category: "",
  brand: "",
  model: "",
  unit: "",
  customerPrice: "",
  cooperationPrice: "",
  minOrder: "1",
  stock: "",
  description: "",
  salesDescription: "",
};

export default function ProductRegisterPage() {
  const router = useRouter();

  const [product, setProduct] =
    useState<ProductForm>(emptyProduct);

  const [conditions, setConditions] =
    useState<Record<string, boolean>>({
      bulk: false,
      credit: false,
      fast_delivery: false,
      retail: false,
      cash: false,
      installment: false,
      other_cities: false,
    });

  const [images, setImages] = useState<File[]>([]);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const updateField = (
    field: keyof ProductForm,
    value: string
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleCondition = (key: string) => {
    setConditions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    setImages((prev) => [
      ...prev,
      ...files,
    ]);
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async () => {
    if (submitting) return;

    setError("");
    setSuccess("");

    if (!product.name.trim()) {
      setError("لطفاً نام محصول را وارد کنید.");
      return;
    }

    if (!product.category) {
      setError(
        "لطفاً دسته‌بندی محصول را انتخاب کنید."
      );
      return;
    }

    if (!product.unit) {
      setError(
        "لطفاً واحد فروش را انتخاب کنید."
      );
      return;
    }

    if (!product.customerPrice.trim()) {
      setError(
        "لطفاً قیمت مشتریان سرچنو را وارد کنید."
      );
      return;
    }

    if (!product.cooperationPrice.trim()) {
      setError(
        "لطفاً قیمت همکاری با سرچنو را وارد کنید."
      );
      return;
    }

    const storeId =
      sessionStorage.getItem(
        "sercheno_store_id"
      );

    if (!storeId) {
      setError(
        "فروشگاه واردشده پیدا نشد. لطفاً دوباره وارد حساب فروشگاه شوید."
      );

      return;
    }

    setSubmitting(true);

    try {
      /*
       * تبدیل شرایط فروش به متن قابل ذخیره
       */

      const selectedConditions =
        salesConditions
          .filter(
            (condition) =>
              conditions[condition.key]
          )
          .map(
            (condition) =>
              condition.label
          );

      /*
       * ثبت محصول
       *
       * تغییر اصلی:
       * select().single() حذف شده است.
       * فقط INSERT انجام می‌شود.
       */

      const { error: insertError } =
        await supabase
          .from("products")
          .insert({
            name: product.name.trim(),
            slug:
  product.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    + "-" +
  Date.now(),

            category: product.category,

            subcategory: null,

            brand:
              product.brand.trim() || null,

            model:
              product.model.trim() || null,

            description:
              product.description.trim() || null,

            price:
              Number(product.customerPrice) || 0,

            customer_price:
              Number(product.customerPrice) || 0,

            cooperation_price:
              Number(product.cooperationPrice) || 0,

            unit: product.unit,

            stock:
              Number(product.stock) || 0,

            min_order:
              Number(product.minOrder) || 1,

            seller_id: storeId,

            status: "pending",

            sales_conditions:
              selectedConditions.length > 0
                ? selectedConditions.join("، ")
                : null,

            sales_description:
              product.salesDescription.trim() ||
              null,
          });

      console.log(
        "PRODUCT INSERT ERROR:",
        insertError
      );

      if (insertError) {
        console.error(insertError);

        setError(
          "خطا در ثبت محصول: " +
            insertError.message
        );

        return;
      }

      setSuccess(
        "محصول با موفقیت برای بررسی ارسال شد."
      );

      setTimeout(() => {
        router.push(
          "/store/product-register/form"
        );
      }, 1500);
    } catch (err) {
      console.error(err);

      setError(
        "خطای غیرمنتظره‌ای هنگام ثبت اطلاعات رخ داد."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
            <img
              src="/logo.png"
              alt="سرچنو"
              className="h-11 w-11 rounded-2xl object-contain"
            />

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
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            بازگشت به پنل
            <ArrowRight size={18} />
          </Link>

        </div>
      </header>

      {/* Hero */}

      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-12 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
            <PackagePlus size={40} />
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            ثبت محصول جدید
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-blue-100">
            مشخصات محصول، قیمت‌ها و شرایط فروش را وارد کنید.
            محصول پس از ثبت توسط تیم سرچنو بررسی خواهد شد.
          </p>

        </div>

      </section>

      {/* Main */}

      <div className="mx-auto max-w-5xl px-5 py-10">

        <div className="space-y-6">

          {/* Main Information */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <PackagePlus size={27} />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  اطلاعات محصول
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  مشخصات اصلی محصول را وارد کنید.
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold">
                  نام محصول*
                </label>

                <input
                  value={product.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً پنجره دوجداره UPVC"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  دسته‌بندی محصول*
                </label>

                <select
                  value={product.category}
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  className="input"
                >
                  <option value="">
                    انتخاب کنید
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  برند
                </label>

                <input
                  value={product.brand}
                  onChange={(e) =>
                    updateField(
                      "brand",
                      e.target.value
                    )
                  }
                  placeholder="نام برند"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  مدل یا مشخصات
                </label>

                <input
                  value={product.model}
                  onChange={(e) =>
                    updateField(
                      "model",
                      e.target.value
                    )
                  }
                  placeholder="مدل، کد یا مشخصات"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  واحد فروش*
                </label>

                <select
                  value={product.unit}
                  onChange={(e) =>
                    updateField(
                      "unit",
                      e.target.value
                    )
                  }
                  className="input"
                >
                  <option value="">
                    انتخاب کنید
                  </option>

                  <option value="عدد">
                    عدد
                  </option>

                  <option value="متر">
                    متر
                  </option>

                  <option value="مترمربع">
                    مترمربع
                  </option>

                  <option value="کیلوگرم">
                    کیلوگرم
                  </option>

                  <option value="تن">
                    تن
                  </option>

                  <option value="شاخه">
                    شاخه
                  </option>

                  <option value="بسته">
                    بسته
                  </option>

                  <option value="دستگاه">
                    دستگاه
                  </option>
                </select>
              </div>

            </div>

          </section>

          {/* Prices */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">
              <h2 className="text-xl font-black">
                قیمت و موجودی
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                قیمت‌های قابل نمایش برای مشتریان سرچنو را مشخص کنید.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  قیمت مشتریان سرچنو*
                </label>

                <input
                  type="number"
                  min="0"
                  value={product.customerPrice}
                  onChange={(e) =>
                    updateField(
                      "customerPrice",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً 1500000"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  قیمت همکاری با سرچنو*
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    product.cooperationPrice
                  }
                  onChange={(e) =>
                    updateField(
                      "cooperationPrice",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً 1300000"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  حداقل مقدار سفارش
                </label>

                <input
                  type="number"
                  min="1"
                  value={product.minOrder}
                  onChange={(e) =>
                    updateField(
                      "minOrder",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً 1"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  موجودی
                </label>

                <input
                  type="number"
                  min="0"
                  value={product.stock}
                  onChange={(e) =>
                    updateField(
                      "stock",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً 50"
                  className="input"
                />
              </div>

            </div>

          </section>

          {/* Sales Conditions */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-black">
                شرایط فروش و خدمات
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                امکانات و شرایط فروشگاه خود را مشخص کنید.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {salesConditions.map(
                (condition) => (
                  <label
                    key={condition.key}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      conditions[
                        condition.key
                      ]
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-slate-50 hover:bg-white"
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={
                        conditions[
                          condition.key
                        ]
                      }
                      onChange={() =>
                        toggleCondition(
                          condition.key
                        )
                      }
                      className="h-5 w-5 accent-blue-700"
                    />

                    <span className="text-sm font-bold">
                      {condition.label}
                    </span>

                  </label>
                )
              )}

            </div>

            <div className="mt-6">

              <label className="mb-2 block text-sm font-bold">
                توضیحات شرایط فروش
              </label>

              <textarea
                value={
                  product.salesDescription
                }
                onChange={(e) =>
                  updateField(
                    "salesDescription",
                    e.target.value
                  )
                }
                rows={5}
                placeholder="مثلاً شرایط پرداخت، نحوه ارسال، تخفیف خرید عمده، شرایط اقساط و سایر توضیحات..."
                className="input resize-none"
              />

            </div>

          </section>

          {/* Description */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-black">
              توضیحات محصول
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              توضیحات تکمیلی درباره محصول، مشخصات و کیفیت.
            </p>

            <textarea
              value={product.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              rows={6}
              placeholder="توضیحات تکمیلی درباره محصول..."
              className="input mt-5 resize-none"
            />

          </section>

          {/* Images */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-black">
                تصاویر محصول
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                تصاویر واضح و باکیفیت محصول را انتخاب کنید.
              </p>

            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-blue-400 hover:bg-blue-50">

              <Upload
                size={40}
                className="text-blue-600"
              />

              <div className="mt-4 font-black">
                انتخاب تصاویر محصول
              </div>

              <div className="mt-2 text-xs text-slate-500">
                می‌توانید چند تصویر انتخاب کنید.
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />

            </label>

            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                {images.map(
                  (image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >

                      <img
                        src={URL.createObjectURL(
                          image
                        )}
                        alt={image.name}
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow"
                      >
                        <X size={16} />
                      </button>

                    </div>
                  )
                )}

              </div>
            )}

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">

              در این مرحله تصاویر برای انتخاب در فرم آماده می‌شوند.
              اتصال دائمی تصاویر به فضای ذخیره‌سازی را در مرحله بعد تکمیل می‌کنیم.

            </div>

          </section>

          {/* Messages */}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold leading-7 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-bold leading-7 text-emerald-700">
              {success}
            </div>
          )}

          {/* Submit */}

          <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <ShieldCheck
                size={28}
                className="mt-1 shrink-0 text-blue-700"
              />

              <div>

                <h3 className="font-black text-blue-950">
                  بررسی و تأیید اطلاعات
                </h3>

                <p className="mt-1 text-sm leading-7 text-blue-800">
                  پس از ثبت محصول، اطلاعات برای بررسی تیم
                  سرچنو ارسال می‌شود و پس از تأیید در سایت
                  نمایش داده خواهد شد.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {submitting ? (
                <>
                  <Clock size={20} />
                  در حال ثبت محصول...
                </>
              ) : (
                <>
                  <CheckCircle2 size={22} />
                  ثبت محصول برای بررسی
                </>
              )}

            </button>

          </section>

        </div>

      </div>

      {/* Footer */}

      <footer className="border-t border-slate-200 bg-white py-8">

        <div className="mx-auto max-w-5xl px-5 text-center text-xs text-slate-400">
          ثبت محصولات فروشگاه‌ها در سرچنو
        </div>

      </footer>

    </main>
  );
}
