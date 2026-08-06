"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight,
  Store,
  Package,
  Upload,
  ImagePlus,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";

type StoreInfo = {
  id: string;
  name: string;
  owner_name: string | null;
  phone: string | null;
  province: string | null;
  city: string | null;
};

type ProductForm = {
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

const emptyProduct: ProductForm = {
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

export default function AddProductPage() {
  const router = useRouter();
  const [storeId, setStoreId] = useState<string | null>(null);
const [storeName, setStoreName] = useState("");
const [products, setProducts] = useState<any[]>([]);
const [loadingStore, setLoadingStore] = useState(true);

useEffect(() => {
  const id = sessionStorage.getItem("sercheno_store_id");
  const name = sessionStorage.getItem("sercheno_store_name");

  if (!id) {
    router.replace("/store/product-register");
    return;
  }

  setStoreId(id);
  setStoreName(name || "");

  const loadStoreProducts = async () => {
    setLoadingStore(true);

    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          id,
          name,
          slug,
          category,
          description,
          price,
          unit,
          stock,
          brand,
          model,
          min_order,
          cooperation_price,
          customer_price,
          status
        `
        )
        .eq("seller_id", id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "LOAD STORE PRODUCTS ERROR:",
          error
        );
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error(
        "LOAD PRODUCTS ERROR:",
        error
      );
    } finally {
      setLoadingStore(false);
    }
  };

  loadStoreProducts();
}, [router]);

  const [store, setStore] = useState<StoreInfo | null>(null);
  const [product, setProduct] =
    useState<ProductForm>(emptyProduct);

  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* --------------------------------
     دریافت فروشگاه واردشده
  -------------------------------- */

  useEffect(() => {
    const storeId = sessionStorage.getItem(
      "sercheno_store_id"
    );

    if (!storeId) {
      router.replace("/store/product-register");
      return;
    }

    const loadStore = async () => {
      try {
        const { data, error } = await supabase
          .from("stores")
          .select(
            "id,name,owner_name,phone,province,city"
          )
          .eq("id", storeId)
          .maybeSingle();

        if (error) {
          console.error("STORE LOAD ERROR:", error);
          setError(
            "اطلاعات فروشگاه دریافت نشد. دوباره وارد شوید."
          );
          return;
        }

        if (!data) {
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
          "خطایی هنگام دریافت اطلاعات فروشگاه رخ داد."
        );
      } finally {
        setLoadingStore(false);
      }
    };

    loadStore();
  }, [router]);

  /* --------------------------------
     تغییر فیلد محصول
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
     تصاویر
  -------------------------------- */

  const handleImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(
      event.target.files
    );

    setImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------
     تبدیل عدد
  -------------------------------- */

  const parseNumber = (value: string) => {
    return (
      Number.parseFloat(
        String(value || "").replace(/,/g, "")
      ) || 0
    );
  };

  /* --------------------------------
     ثبت محصول
  -------------------------------- */

  const handleSubmit = async () => {
    if (submitting) return;

    setError("");
    setMessage("");

    if (!store) {
      setError(
        "اطلاعات فروشگاه موجود نیست. دوباره وارد شوید."
      );
      return;
    }

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
      setError("لطفاً واحد فروش را انتخاب کنید.");
      return;
    }

    if (!product.customerPrice.trim()) {
      setError(
        "لطفاً قیمت مشتریان سرچنو را وارد کنید."
      );
      return;
    }

    setSubmitting(true);

    try {
      /* --------------------------------
         slug محصول
      -------------------------------- */

      const productSlug =
        `product-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 10)}`;

      const cooperationPrice = parseNumber(
        product.cooperationPrice
      );

      const customerPrice = parseNumber(
        product.customerPrice
      );

      const stock = parseNumber(
        product.stock
      );

      /* --------------------------------
         ثبت محصول
      -------------------------------- */

      const {
        data: createdProduct,
        error: productError,
      } = await supabase
        .from("products")
        .insert({
          name: product.name.trim(),

          slug: productSlug,

          category: product.category,

          description:
            product.description.trim() ||
            null,

          price: customerPrice,

          unit: product.unit,

          stock: stock,

          seller_id: store.id,

          status: "active",

          brand:
            product.brand.trim() || null,

          model:
            product.model.trim() || null,

          min_order:
            product.minOrder.trim() || null,

          cooperation_price:
            cooperationPrice,

          customer_price:
            customerPrice,
        })
        .select("id,slug")
        .single();

      if (productError) {
        console.error(
          "PRODUCT INSERT ERROR:",
          productError
        );

        throw new Error(
          `خطا در ثبت محصول: ${productError.message}`
        );
      }

      if (!createdProduct) {
        throw new Error(
          "محصول ثبت شد اما شناسه آن دریافت نشد."
        );
      }

      /* --------------------------------
         آپلود تصاویر
      -------------------------------- */

      for (
        let i = 0;
        i < images.length;
        i++
      ) {
        const file = images[i];

        const extension =
          file.name
            .split(".")
            .pop()
            ?.toLowerCase() || "jpg";

        const fileName =
          `${Date.now()}-${i}-${Math.random()
            .toString(36)
            .substring(2, 10)}.${extension}`;

        const filePath =
          `products/${createdProduct.id}/${fileName}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("product-image")
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: false,
              contentType:
                file.type ||
                "image/jpeg",
            }
          );

        if (uploadError) {
          console.error(
            "IMAGE UPLOAD ERROR:",
            uploadError
          );

          throw new Error(
            `محصول ثبت شد اما تصویر «${file.name}» آپلود نشد: ${uploadError.message}`
          );
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("product-image")
          .getPublicUrl(filePath);

        const imageUrl =
          publicUrlData.publicUrl;

        if (!imageUrl) {
          throw new Error(
            "آدرس تصویر دریافت نشد."
          );
        }

        const {
          error: imageRowError,
        } = await supabase
          .from("product_images")
          .insert({
            product_id:
              createdProduct.id,
            image_url: imageUrl,
          });

        if (imageRowError) {
          console.error(
            "IMAGE ROW ERROR:",
            imageRowError
          );

          throw new Error(
            `تصویر آپلود شد اما ثبت ارتباط تصویر با محصول انجام نشد: ${imageRowError.message}`
          );
        }
      }

      /* --------------------------------
         موفقیت
      -------------------------------- */

      setMessage(
        "محصول با موفقیت ثبت شد و برای نمایش در سرچنو آماده است."
      );

      setProduct({
        ...emptyProduct,
      });

      setImages([]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(
        "ADD PRODUCT ERROR:",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "خطای نامشخص هنگام ثبت محصول."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* --------------------------------
     Loading
  -------------------------------- */

  if (loadingStore) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />

          <p className="mt-5 font-bold text-slate-700">
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
            href="/store/product-register"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            خروج از حساب فروشگاه
            <ArrowRight size={18} />
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
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <CheckCircle2 size={17} />
                حساب فروشگاه شناسایی شد
              </div>

              <h1 className="text-3xl font-black sm:text-4xl">
                ثبت محصول جدید
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
                محصول جدید خود را ثبت کنید تا در بازار
                هوشمند ساخت‌وساز سرچنو به خریداران نمایش داده شود.
              </p>
            </div>

            {store && (
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}

          <section className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Package size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">
                      اطلاعات محصول
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      مشخصات محصول را با دقت وارد کنید.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <Input
                  label="نام محصول *"
                  placeholder="مثلاً کاشی ۶۰×۱۲۰"
                  value={product.name}
                  onChange={(e) =>
                    updateProduct(
                      "name",
                      e.target.value
                    )
                  }
                />

                <Select
                  label="دسته‌بندی *"
                  value={product.category}
                  options={[
                    "آجر و بلوک",
                    "سیمان و بتن",
                    "کاشی و سرامیک",
                    "سنگ ساختمانی",
                    "آهن و مصالح فلزی",
                    "درب و پنجره",
                    "رنگ و پوشش",
                    "تأسیسات و تجهیزات",
                    "ابزار و ماشین‌آلات",
                    "سایر",
                  ]}
                  onChange={(e) =>
                    updateProduct(
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
                    updateProduct(
                      "brand",
                      e.target.value
                    )
                  }
                />

                <Input
                  label="مدل یا مشخصات"
                  placeholder="مدل، کد یا مشخصات فنی"
                  value={product.model}
                  onChange={(e) =>
                    updateProduct(
                      "model",
                      e.target.value
                    )
                  }
                />

                <Select
                  label="واحد فروش *"
                  value={product.unit}
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
                  onChange={(e) =>
                    updateProduct(
                      "unit",
                      e.target.value
                    )
                  }
                />

                <Input
                  label="حداقل مقدار سفارش"
                  placeholder="مثلاً ۱۰ عدد"
                  value={product.minOrder}
                  onChange={(e) =>
                    updateProduct(
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
                    updateProduct(
                      "stock",
                      e.target.value
                    )
                  }
                />

                {/* Cooperation */}

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                  <label className="mb-2 block text-sm font-black text-blue-900">
                    قیمت همکاری سرچنو
                  </label>

                  <input
                    type="text"
                    placeholder="مثلاً ۱۵۰۰۰۰۰"
                    value={
                      product.cooperationPrice
                    }
                    onChange={(e) =>
                      updateProduct(
                        "cooperationPrice",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <p className="mt-2 text-xs text-blue-700">
                    قیمت ویژه همکاری با سرچنو
                  </p>
                </div>

                {/* Customer */}

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <label className="mb-2 block text-sm font-black text-emerald-900">
                    قیمت مشتریان سرچنو *
                  </label>

                  <input
                    type="text"
                    placeholder="مثلاً ۱۷۰۰۰۰۰"
                    value={
                      product.customerPrice
                    }
                    onChange={(e) =>
                      updateProduct(
                        "customerPrice",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <p className="mt-2 text-xs text-emerald-700">
                    قیمتی که مشتریان مشاهده خواهند کرد
                  </p>
                </div>

                {/* Description */}

                <div className="md:col-span-2">
                  <Textarea
                    label="توضیحات محصول"
                    placeholder="کیفیت، مشخصات فنی، کاربرد، رنگ، ابعاد و سایر توضیحات..."
                    value={product.description}
                    onChange={(e) =>
                      updateProduct(
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Images */}

                <div className="md:col-span-2">
                  <div className="rounded-3xl border border-pink-200 bg-pink-50 p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                        <ImagePlus size={24} />
                      </div>

                      <div>
                        <h3 className="font-black">
                          تصاویر محصول
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          تصاویر واقعی و باکیفیت محصول را اضافه کنید.
                        </p>
                      </div>
                    </div>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white p-8 text-center transition hover:border-pink-500 hover:bg-pink-50">
                      <Upload
                        size={34}
                        className="text-pink-600"
                      />

                      <span className="mt-3 font-black">
                        انتخاب تصاویر
                      </span>

                      <span className="mt-2 text-xs text-slate-500">
                        امکان انتخاب چند تصویر وجود دارد
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImages}
                      />
                    </label>

                    {images.length > 0 && (
                      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {images.map(
                          (file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2"
                            >
                              <img
                                src={URL.createObjectURL(
                                  file
                                )}
                                alt={file.name}
                                className="h-32 w-full rounded-xl object-cover"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(
                                    index
                                  )
                                }
                                className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"
                              >
                                <Trash2 size={15} />
                              </button>

                              <p className="mt-2 truncate px-1 text-xs text-slate-500">
                                {file.name}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}

              <div className="space-y-3 px-6 pb-2">
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-700">
                    {message}
                  </div>
                )}
              </div>

              {/* Submit */}

              <div className="p-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-lg font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    "در حال ثبت محصول..."
                  ) : (
                    <>
                      <CheckCircle2 size={24} />
                      ثبت محصول در سرچنو
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Sidebar */}

          <aside className="space-y-5">
            {/* Store */}

            {store && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Store size={24} />
                  </div>

                  <div>
                    <div className="text-xs text-slate-500">
                      فروشگاه فعال
                    </div>

                    <div className="mt-1 font-black">
                      {store.name}
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  {store.owner_name && (
                    <div className="rounded-xl bg-slate-50 p-3">
                      <span className="text-slate-500">
                        مدیر:
                      </span>{" "}
                      <span className="font-bold">
                        {store.owner_name}
                      </span>
                    </div>
                  )}

                  {store.city && (
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                      <MapPin size={17} />
                      {store.province} -{" "}
                      {store.city}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Guide */}

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={24}
                  className="text-blue-700"
                />

                <h3 className="font-black text-blue-900">
                  نکات ثبت محصول
                </h3>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-blue-800">
                <li>
                  ✓ نام محصول را واضح و دقیق وارد کنید.
                </li>

                <li>
                  ✓ قیمت و موجودی واقعی ثبت کنید.
                </li>

                <li>
                  ✓ تصاویر باکیفیت باعث دیده‌شدن بهتر محصول می‌شود.
                </li>

                <li>
                  ✓ مشخصات فنی محصول را کامل بنویسید.
                </li>
              </ul>
            </div>

            {/* Add Another */}

            {message && (
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setError("");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50"
              >
                <Plus size={19} />
                ثبت محصول جدید
              </button>
            )}

            {/* Back */}

            <Link
              href="/store/product-register"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              بازگشت به ورود فروشگاه
              <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </div>

      {/* Footer */}

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-5 text-center text-xs text-slate-400">
          ثبت و مدیریت محصولات فروشگاه‌ها در سرچنو
        </div>
      </footer>
    </main>
  );
}

/* =====================================================
   Input
===================================================== */

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
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
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* =====================================================
   Select
===================================================== */

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
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">
          انتخاب کنید
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =====================================================
   Textarea
===================================================== */

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
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
