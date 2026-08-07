"use client";

import { useEffect, useState } from "react";
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
  { value: "mechanical-installations", label: "تأسیسات مکانیکی" },
  { value: "paint-coatings", label: "رنگ و پوشش" },
  { value: "plumbing-pipes", label: "لوله و اتصالات" },
  { value: "sanitary", label: "لوازم بهداشتی" },
  { value: "stone-tile", label: "سنگ و کاشی" },
];

const units = [
  "عدد",
  "متر",
  "متر مربع",
  "متر مکعب",
  "کیلوگرم",
  "تن",
  "بسته",
  "شاخه",
  "دستگاه",
  "سرویس",
];

type StoreInfo = {
  id: string;
  name: string;
  owner_name: string | null;
  status: string | null;
};

type ProductForm = {
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  description: string;
  price: string;
  customer_price: string;
  cooperation_price: string;
  min_order: string;
  unit: string;
  stock: string;
};

export default function StoreProductRegisterPage() {
  const router = useRouter();

  const [store, setStore] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [product, setProduct] = useState<ProductForm>({
    name: "",
    category: "",
    subcategory: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    customer_price: "",
    cooperation_price: "",
    min_order: "",
    unit: "",
    stock: "",
  });

  /* --------------------------------
     دریافت فروشگاه واردشده
  -------------------------------- */

  useEffect(() => {
    const loadStore = async () => {
      try {
        const storeId =
          sessionStorage.getItem("sercheno_store_id");

        if (!storeId) {
          router.replace("/store/product-register");
          return;
        }

        const { data, error } = await supabase
          .from("stores")
          .select("id,name,owner_name,status")
          .eq("id", storeId)
          .single();

        if (error || !data) {
          console.error(error);

          sessionStorage.removeItem(
            "sercheno_store_id"
          );

          router.replace("/store/product-register");
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

    loadStore();
  }, [router]);

  /* --------------------------------
     تغییر اطلاعات فرم
  -------------------------------- */

  const updateProduct = (
    field: keyof ProductForm,
    value: string
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* --------------------------------
     انتخاب عکس
  -------------------------------- */

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------
     ثبت محصول
  -------------------------------- */

  const handleSubmit = async () => {
    if (submitting) return;

    setError("");
    setSuccess("");

    if (!store) {
      setError("اطلاعات فروشگاه پیدا نشد.");
      return;
    }

    if (!product.name.trim()) {
      setError("لطفاً نام محصول را وارد کنید.");
      return;
    }

    if (!product.category) {
      setError("لطفاً دسته‌بندی محصول را انتخاب کنید.");
      return;
    }

    if (!product.unit) {
      setError("لطفاً واحد فروش محصول را انتخاب کنید.");
      return;
    }

    if (!product.customer_price) {
      setError("لطفاً قیمت مشتری را وارد کنید.");
      return;
    }

    if (!product.cooperation_price) {
      setError("لطفاً قیمت همکاری را وارد کنید.");
      return;
    }

    setSubmitting(true);

    try {
      const sellerId =
        sessionStorage.getItem("sercheno_store_id");

      if (!sellerId) {
        router.replace("/store/product-register");
        return;
      }

      const slug =
        `${product.name
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;

      const { data, error } = await supabase
        .from("products")
        .insert({
          name: product.name.trim(),

          slug,

          category: product.category,

          subcategory:
            product.subcategory.trim() || null,

          description:
            product.description.trim() || null,

          price: Number(
            product.price ||
              product.customer_price ||
              0
          ),

          customer_price:
            Number(product.customer_price) || 0,

          cooperation_price:
            Number(product.cooperation_price) || 0,

          stock:
            Number(product.stock) || 0,

          unit: product.unit,

          brand:
            product.brand.trim() || null,

          model:
            product.model.trim() || null,

          min_order:
            Number(product.min_order) || 1,

          seller_id: sellerId,

          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error(
          "PRODUCT INSERT ERROR:",
          error
        );

        setError(
          "خطا در ثبت محصول: " + error.message
        );

        return;
      }

      console.log(
        "PRODUCT CREATED:",
        data
      );

      setSuccess(
        "محصول با موفقیت ثبت شد و برای بررسی مدیریت سرچنو ارسال گردید."
      );

      setProduct({
        name: "",
        category: "",
        subcategory: "",
        brand: "",
        model: "",
        description: "",
        price: "",
        customer_price: "",
        cooperation_price: "",
        min_order: "",
        unit: "",
        stock: "",
      });

      setImages([]);

      /*
       * فعلاً تصاویر را ذخیره نمی‌کنیم.
       * در مرحله بعد اتصال Storage را انجام می‌دهیم.
       */

    } catch (err) {
      console.error(err);

      setError(
        "خطای غیرمنتظره‌ای هنگام ثبت محصول رخ داد."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* --------------------------------
     Loading
  -------------------------------- */

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
                ثبت محصول
              </div>
            </div>
          </Link>

          <Link
            href="/store/product-register/form"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight size={18} />
            بازگشت به پنل فروشگاه
          </Link>

        </div>
      </header>

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-14 text-white">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3 text-blue-200">
                <PackagePlus size={25} />

                <span className="font-bold">
                  ثبت محصول جدید
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black sm:text-4xl">
                افزودن محصول به فروشگاه
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-100">
                اطلاعات محصول را با دقت وارد کنید.
                پس از ثبت، محصول توسط مدیریت سرچنو بررسی
                و در صورت تأیید در دسته‌بندی مربوطه نمایش داده خواهد شد.
              </p>

            </div>

            {store && (
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">

                <div className="flex items-center gap-3">

                  <Store size={25} />

                  <div>
                    <div className="text-xs text-blue-200">
                      فروشگاه
                    </div>

                    <div className="mt-1 text-lg font-black">
                      {store.name}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* Main */}

      <div className="mx-auto max-w-6xl px-5 py-10">

        <div className="grid gap-7 lg:grid-cols-3">

          {/* Form */}

          <section className="lg:col-span-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-black">
                اطلاعات محصول
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                مشخصات اصلی محصول را وارد کنید.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                {/* Name */}

                <FormField
                  label="نام محصول"
                  required
                >
                  <input
                    value={product.name}
                    onChange={(e) =>
                      updateProduct(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً پنجره دوجداره UPVC"
                    className="input"
                  />
                </FormField>

                {/* Category */}

                <FormField
                  label="دسته‌بندی محصول"
                  required
                >
                  <select
                    value={product.category}
                    onChange={(e) =>
                      updateProduct(
                        "category",
                        e.target.value
                      )
                    }
                    className="input"
                  >
                    <option value="">
                      انتخاب کنید
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </option>
                    ))}

                  </select>
                </FormField>

                {/* Subcategory */}

                <FormField label="زیر دسته‌بندی">
                  <input
                    value={product.subcategory}
                    onChange={(e) =>
                      updateProduct(
                        "subcategory",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً پنجره دو جداره"
                    className="input"
                  />
                </FormField>

                {/* Brand */}

                <FormField label="برند">
                  <input
                    value={product.brand}
                    onChange={(e) =>
                      updateProduct(
                        "brand",
                        e.target.value
                      )
                    }
                    placeholder="نام برند"
                    className="input"
                  />
                </FormField>

                {/* Model */}

                <FormField label="مدل یا مشخصات">
                  <input
                    value={product.model}
                    onChange={(e) =>
                      updateProduct(
                        "model",
                        e.target.value
                      )
                    }
                    placeholder="مدل، کد یا مشخصات"
                    className="input"
                  />
                </FormField>

                {/* Unit */}

                <FormField
                  label="واحد فروش"
                  required
                >
                  <select
                    value={product.unit}
                    onChange={(e) =>
                      updateProduct(
                        "unit",
                        e.target.value
                      )
                    }
                    className="input"
                  >
                    <option value="">
                      انتخاب کنید
                    </option>

                    {units.map((unit) => (
                      <option
                        key={unit}
                        value={unit}
                      >
                        {unit}
                      </option>
                    ))}

                  </select>
                </FormField>

                {/* Customer Price */}

                <FormField
                  label="قیمت مشتری"
                  required
                >
                  <input
                    type="number"
                    min="0"
                    value={product.customer_price}
                    onChange={(e) =>
                      updateProduct(
                        "customer_price",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً 1500000"
                    className="input"
                  />
                </FormField>

                {/* Cooperation */}

                <FormField
                  label="قیمت همکاری"
                  required
                >
                  <input
                    type="number"
                    min="0"
                    value={product.cooperation_price}
                    onChange={(e) =>
                      updateProduct(
                        "cooperation_price",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً 1300000"
                    className="input"
                  />
                </FormField>

                {/* Min order */}

                <FormField label="حداقل مقدار سفارش">
                  <input
                    type="number"
                    min="1"
                    value={product.min_order}
                    onChange={(e) =>
                      updateProduct(
                        "min_order",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً 1"
                    className="input"
                  />
                </FormField>

                {/* Stock */}

                <FormField label="موجودی">
                  <input
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={(e) =>
                      updateProduct(
                        "stock",
                        e.target.value
                      )
                    }
                    placeholder="مثلاً 50"
                    className="input"
                  />
                </FormField>

              </div>

              {/* Description */}

              <div className="mt-6">

                <FormField label="توضیحات محصول">

                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      updateProduct(
                        "description",
                        e.target.value
                      )
                    }
                    rows={6}
                    placeholder="توضیحات تکمیلی درباره محصول، مشخصات، کیفیت، شرایط فروش و..."
                    className="input resize-none"
                  />

                </FormField>

              </div>

              {/* Images */}

              <div className="mt-7">

                <label className="mb-3 block text-sm font-bold">
                  تصاویر محصول
                </label>

                <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-8 text-center">

                  <Upload
                    size={38}
                    className="mx-auto text-blue-600"
                  />

                  <p className="mt-3 font-black">
                    انتخاب تصاویر محصول
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    در این مرحله انتخاب تصاویر انجام می‌شود.
                    اتصال ذخیره‌سازی تصاویر را در مرحله بعد تکمیل می‌کنیم.
                  </p>

                  <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800">

                    <Upload size={18} />

                    انتخاب تصویر

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImages}
                      className="hidden"
                    />

                  </label>

                </div>

                {images.length > 0 && (
                  <div className="mt-4 space-y-2">

                    {images.map((image, index) => (
                      <div
                        key={`${image.name}-${index}`}
                        className="flex items-center justify-between rounded-xl bg-slate-100 p-3 text-sm"
                      >

                        <span className="truncate">
                          {image.name}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="mr-3 rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <X size={17} />
                        </button>

                      </div>
                    ))}

                  </div>
                )}

              </div>

              {/* Error */}

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}

              {success && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-bold leading-7 text-emerald-800">

                  <CheckCircle2
                    size={23}
                    className="mt-1 shrink-0 text-emerald-600"
                  />

                  <span>
                    {success}
                  </span>

                </div>
              )}

              {/* Submit */}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {submitting ? (
                  "در حال ثبت محصول..."
                ) : (
                  <>
                    <PackagePlus size={22} />
                    ثبت محصول برای بررسی
                  </>
                )}

              </button>

            </div>

          </section>

          {/* Sidebar */}

          <aside className="space-y-5">

            {/* Store */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Store size={24} />
                </div>

                <div>

                  <div className="text-xs text-slate-500">
                    فروشگاه شما
                  </div>

                  <div className="font-black">
                    {store?.name}
                  </div>

                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">

                <div className="flex items-center gap-2 font-bold">

                  {store?.status === "approved" ? (
                    <>
                      <CheckCircle2
                        size={18}
                        className="text-emerald-600"
                      />

                      فروشگاه تأیید شده
                    </>
                  ) : (
                    <>
                      <Clock
                        size={18}
                        className="text-amber-500"
                      />

                      فروشگاه در انتظار بررسی
                    </>
                  )}

                </div>

              </div>

            </div>

            {/* Security */}

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={25}
                  className="mt-1 shrink-0 text-emerald-600"
                />

                <div>

                  <h3 className="font-black text-emerald-900">
                    بررسی محصول
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-emerald-800">
                    پس از ثبت محصول، وضعیت آن «در انتظار بررسی»
                    خواهد بود. پس از تأیید مدیریت، محصول در سرچنو
                    نمایش داده می‌شود.
                  </p>

                </div>

              </div>

            </div>

            {/* Advertising */}

            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white">

              <div className="text-sm font-bold text-blue-200">
                تبلیغات سرچنو
              </div>

              <h3 className="mt-3 text-xl font-black">
                محصولاتت را بیشتر دیده‌شدن!
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                محصولات تأییدشده می‌توانند در دسته‌بندی تخصصی
                خودشان در سرچنو نمایش داده شوند.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

/* --------------------------------
   Form Field
-------------------------------- */

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="mr-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}
