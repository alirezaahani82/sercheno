"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Store,
  User,
  Phone,
  MapPin,
  Package,
  ImagePlus,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Upload,
  Clock,
  Truck,
  CreditCard,
  FileText,
  ShieldCheck,
} from "lucide-react";

type Product = {
  name: string;
  category: string;
  brand: string;
  model: string;
  unit: string;
  minOrder: string;
  stock: string;
  cooperationPrice: string;
  customerPrice: string;
  description: string;
};

const emptyProduct: Product = {
  name: "",
  category: "",
  brand: "",
  model: "",
  unit: "",
  minOrder: "",
  stock: "",
  cooperationPrice: "",
  customerPrice: "",
  description: "",
};

export default function StoreRegisterPage() {
  const [products, setProducts] = useState<Product[]>([
    { ...emptyProduct },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
  setSubmitting(true);

  try {
    const { error } = await supabase
      .from("stores")
      .insert({
        name: "فروشگاه تست سرچنو",
        ` slug: ` store-${Date.now()},
        status: "pending",
      });

    if (error) {
      console.error("STORE INSERT ERROR:", error);
      alert("خطا در ثبت فروشگاه: " + error.message);
      return;
    }

    alert("فروشگاه با موفقیت ثبت شد ✅");
  } finally {
    setSubmitting(false);
  }
};

  const [productImages, setProductImages] = useState<File[]>([]);
  const [sampleImages, setSampleImages] = useState<File[]>([]);

  const addProduct = () => {
    setProducts([...products, { ...emptyProduct }]);
  };

  const removeProduct = (index: number) => {
    if (products.length === 1) return;

    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const updatedProducts = [...products];

    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };

    setProducts(updatedProducts);
  };

  const handleProductImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProductImages(Array.from(event.target.files));
    }
  };

  const handleSampleImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setSampleImages(Array.from(event.target.files));
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

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            بازگشت به صفحه اصلی
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
            <Store size={40} />
          </div>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            ثبت فروشگاه در سرچنو
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه و محصولات خود را در سرچنو معرفی کنید و
            مشتریان بیشتری برای کسب‌وکار خود پیدا کنید.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <div className="mx-auto max-w-5xl px-5 py-12">
        <form className="space-y-8">
          {/* Owner Information */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <User size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    اطلاعات مالک یا مدیر فروشگاه
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    اطلاعات شخص مسئول فروشگاه را وارد کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              <Input
                label="نام"
                placeholder="مثلاً علیرضا"
              />

              <Input
                label="نام خانوادگی"
                placeholder="مثلاً آهنی"
              />

              <Input
                label="شماره تماس"
                placeholder="09xxxxxxxxx"
                type="tel"
              />

              <Input
                label="کد ملی"
                placeholder="کد ملی ۱۰ رقمی"
              />
            </div>
          </section>

          {/* Store Information */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Store size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    اطلاعات فروشگاه
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    اطلاعات اصلی کسب‌وکار خود را وارد کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              <Input
                label="نام فروشگاه یا مجموعه"
                placeholder="نام فروشگاه"
              />

              <Select
                label="دسته‌بندی اصلی فعالیت"
                options={[
                  "آجر و بلوک",
                  "سیمان و بتن",
                  "کاشی و سرامیک",
                  "سنگ ساختمانی",
                  "آهن و مصالح فلزی",
                  "درب و پنجره",
                  "رنگ و پوشش",
                  "تأسیسات و تجهیزات",
                  "سایر",
                ]}
              />

              <Input
                label="شماره تلفن ثابت"
                placeholder="041xxxxxxxx"
              />

              <Input
                label="شماره موبایل فروشگاه"
                placeholder="09xxxxxxxxx"
                type="tel"
              />

              <div className="md:col-span-2">
                <Textarea
                  label="معرفی فروشگاه"
                  placeholder="درباره فروشگاه، سابقه فعالیت و حوزه تخصصی خود توضیح دهید..."
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <MapPin size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    آدرس و محدوده فعالیت
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    محل فعالیت فروشگاه و محدوده ارسال را مشخص کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-3">
              <Select
                label="استان"
                options={[
                  "آذربایجان شرقی",
                  "آذربایجان غربی",
                  "اردبیل",
                  "تهران",
                  "زنجان",
                  "البرز",
                  "سایر",
                ]}
              />

              <Input
                label="شهر"
                placeholder="مثلاً تبریز"
              />

              <Input
                label="منطقه یا محله"
                placeholder="نام محله"
              />

              <div className="md:col-span-3">
                <Textarea
                  label="آدرس کامل فروشگاه"
                  placeholder="آدرس دقیق فروشگاه را وارد کنید..."
                />
              </div>
            </div>
          </section>

          {/* Working Hours */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <Clock size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  ساعات کاری
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  زمان فعالیت فروشگاه را مشخص کنید.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="ساعت شروع فعالیت"
                placeholder="مثلاً ۸:۰۰"
              />

              <Input
                label="ساعت پایان فعالیت"
                placeholder="مثلاً ۲۰:۰۰"
              />
            </div>
          </section>

          {/* Products */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Package size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">
                      محصولات و مصالح قابل ارائه
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      محصولات فروشگاه خود را همراه با قیمت ثبت کنید.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addProduct}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                >
                  <Plus size={18} />
                  افزودن محصول
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="relative rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-black text-slate-800">
                      محصول شماره {index + 1}
                    </h3>
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                        حذف محصول
                      </button>
                    )}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="نام محصول"
                      placeholder="مثلاً کاشی ۶۰×۱۲۰"
                      value={product.name}
                      onChange={(e) =>
                        updateProduct(index, "name", e.target.value)
                      }
                    />

                    <Select
                      label="دسته‌بندی محصول"
                      options={[
                        "آجر و بلوک",
                        "سیمان و بتن",
                        "کاشی و سرامیک",
                        "سنگ ساختمانی",
                        "آهن و مصالح فلزی",
                        "درب و پنجره",
                        "رنگ و پوشش",
                        "تأسیسات و تجهیزات",
                      ]}
                      value={product.category}
                      onChange={(e) =>
                        updateProduct(
                          index,
                          "category",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="برند"
                      placeholder="نام برند"
                      value={product.brand}
                      onChange={(e) =>
                        updateProduct(index, "brand", e.target.value)
                      }
                    />

                    <Input
                      label="مدل یا مشخصات"
                      placeholder="مدل، کد یا مشخصات محصول"
                      value={product.model}
                      onChange={(e) =>
                        updateProduct(index, "model", e.target.value)
                      }
                    />

                    <Select
                      label="واحد فروش"
                      options={[
                        "عدد",
                        "متر",
                        "مترمربع",
                        "مترمکعب",
                        "کیلوگرم",
                        "تن",
                        "کیسه",
                        "شاخه",
                        "دستگاه",
                      ]}
                      value={product.unit}
                      onChange={(e) =>
                        updateProduct(index, "unit", e.target.value)
                      }
                    />

                    <Input
                      label="حداقل مقدار سفارش"
                      placeholder="مثلاً ۱۰ متر"
                      value={product.minOrder}
                      onChange={(e) =>
                        updateProduct(
                          index,
                          "minOrder",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="موجودی تقریبی"
                      placeholder="مثلاً ۵۰۰ عدد"
                      value={product.stock}
                      onChange={(e) =>
                        updateProduct(index, "stock", e.target.value)
                      }
                    />

                    <div />

                    {/* Cooperation Price */}
                    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                      <label className="mb-2 block text-sm font-bold text-blue-800">
                        قیمت همکاری با سرچنو
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="مثلاً ۱,۵۰۰,۰۰۰"
                          value={product.cooperationPrice}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "cooperationPrice",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <span className="absolute left-4 top-3 text-xs text-slate-400">
                          ریال
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-blue-600">
                        قیمت ویژه همکاری و تأمین از طریق سرچنو
                      </p>
                    </div>

                    {/* Customer Price */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <label className="mb-2 block text-sm font-bold text-emerald-800">
                        قیمت مشتریان سرچنو
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="مثلاً ۱,۷۰۰,۰۰۰"
                          value={product.customerPrice}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "customerPrice",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <span className="absolute left-4 top-3 text-xs text-slate-400">
                          ریال
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-emerald-600">
                        قیمتی که مشتریان سرچنو مشاهده می‌کنند
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <Textarea
                        label="توضیحات محصول"
                        placeholder="توضیحات تکمیلی درباره محصول، کیفیت، مشخصات و شرایط فروش..."
                        value={product.description}
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Images */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                <ImagePlus size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  تصاویر محصولات
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  تصاویر محصولات قابل ارائه در فروشگاه را بارگذاری کنید.
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-blue-400 hover:bg-blue-50">
              <Upload className="text-blue-600" size={36} />
              <span className="mt-4 font-bold">
                برای انتخاب تصاویر کلیک کنید
              </span>

              <span className="mt-2 text-xs text-slate-500">
                امکان انتخاب چند تصویر وجود دارد
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleProductImages}
              />
            </label>

            {productImages.length > 0 && (
              <p className="mt-4 text-sm font-bold text-emerald-600">
                {productImages.length} تصویر انتخاب شده است.
              </p>
            )}
          </section>

          {/* Samples */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <ImagePlus size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  نمونه‌کارها
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  تصاویر نمونه‌کارها و پروژه‌های انجام‌شده را بارگذاری کنید.
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-purple-400 hover:bg-purple-50">
              <ImagePlus className="text-purple-600" size={36} />

              <span className="mt-4 font-bold">
                بارگذاری تصاویر نمونه‌کار
              </span>

              <span className="mt-2 text-xs text-slate-500">
                تصاویر پروژه‌ها و نمونه‌کارهای واقعی خود را اضافه کنید.
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleSampleImages}
              />
            </label>

            {sampleImages.length > 0 && (
              <p className="mt-4 text-sm font-bold text-emerald-600">
                {sampleImages.length} تصویر نمونه‌کار انتخاب شده است.
              </p>
            )}
          </section>

          {/* Business Conditions */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <Truck size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  شرایط فروش و خدمات
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  امکانات و شرایط فروشگاه خود را مشخص کنید.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <CheckBox label="فروش عمده" />
              <CheckBox label="فروش جزئی" />
              <CheckBox label="فروش نقدی" />
              <CheckBox label="فروش اعتباری" />
              <CheckBox label="فروش اقساطی" />
              <CheckBox label="ارسال به شهرهای دیگر" />
              <CheckBox label="امکان ارسال فوری" />
            </div>

            <div className="mt-6">
              <Textarea
                label="توضیحات شرایط فروش"
                placeholder="شرایط پرداخت، ارسال، تخفیف و سایر توضیحات..."
              />
            </div>
          </section>

          {/* Final Confirmation */}
          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck
                className="mt-1 shrink-0 text-blue-700"
                size={28}
              />
              <div>
                <h3 className="font-black text-blue-900">
                  بررسی و تأیید اطلاعات
                </h3>

                <p className="mt-2 text-sm leading-7 text-blue-800">
                  اطلاعات ثبت‌شده توسط تیم سرچنو بررسی خواهد شد و
                  پس از تأیید، فروشگاه و محصولات شما در پلتفرم نمایش داده
                  می‌شود.
                </p>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-blue-700"
              />

              <span className="text-sm leading-7 text-slate-700">
                صحت اطلاعات واردشده را تأیید می‌کنم و با قوانین و مقررات
                استفاده از خدمات سرچنو موافقم.
              </span>
            </label>
          </section>

          {/* Submit */}
         <button
  type="button"
  onClick={handleSubmit}
  disabled={submitting}
  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-lg font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
>
  <CheckCircle2 size={24} />

  {submitting
    ? "در حال ثبت فروشگاه..."
    : "ثبت فروشگاه برای بررسی"}
</button>

          <p className="text-center text-xs text-slate-400">
            در این مرحله اطلاعات فقط در فرم وارد می‌شود و هنوز در پایگاه
            داده ذخیره نخواهد شد.
          </p>
        </form>
      </div>
    </main>
  );
}

/* Input Component */
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* Select Component */
function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">
          انتخاب کنید
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* Textarea Component */
function Textarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <textarea
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* Checkbox Component */
function CheckBox({
  label,
}: {
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
      <input
        type="checkbox"
        className="h-5 w-5 accent-blue-700"
      />

      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>
    </label>
  );
}
