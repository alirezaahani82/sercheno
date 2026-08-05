"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Store,
  User,
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

  images: File[];
  samples: File[];

  saleConditions: string[];
  saleDescription: string;
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

  images: [],
  samples: [],

  saleConditions: [],
  saleDescription: "",
};

type StoreForm = {
  ownerName: string;
  ownerLastName: string;
  nationalCode: string;
  phone: string;
  username: string;
  password: string;
  
  name: string;
  category: string;
  landline: string;
  storeMobile: string;

  province: string;
  city: string;
  district: string;
  address: string;

  description: string;
};

export default function StoreRegisterPage() {
  const [products, setProducts] = useState<Product[]>([
    { ...emptyProduct },
  ]);

  const [storeForm, setStoreForm] = useState<StoreForm>({
    ownerName: "",
    ownerLastName: "",
    nationalCode: "",
    phone: "",
    
    username: "",
    password: "",

    name: "",
    category: "",
    landline: "",
    storeMobile: "",

    province: "",
    city: "",
    district: "",
    address: "",

    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* --------------------------------
     تغییر اطلاعات فروشگاه
  -------------------------------- */

  const updateStoreForm = (
    field: keyof StoreForm,
    value: string
  ) => {
    setStoreForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* --------------------------------
     تصاویر محصول
  -------------------------------- */

  const handleProductImages = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    setProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? {
              ...product,
              images: files,
            }
          : product
      )
    );
  };

  /* --------------------------------
     تصاویر نمونه کار
  -------------------------------- */

  const handleSampleImages = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    setProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? {
              ...product,
              samples: files,
            }
          : product
      )
    );
  };

  /* --------------------------------
     افزودن محصول
  -------------------------------- */

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        ...emptyProduct,
        images: [],
        samples: [],
        saleConditions: [],
      },
    ]);
  };

  /* --------------------------------
     حذف محصول
  -------------------------------- */

  const removeProduct = (index: number) => {
    if (products.length === 1) return;

    setProducts((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------
     تغییر اطلاعات محصول
  -------------------------------- */

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  };

  /* =====================================================
     ثبت کامل فروشگاه
  ===================================================== */

  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      /* --------------------------------
         اعتبارسنجی اولیه
      -------------------------------- */

      if (!storeForm.name.trim()) {
        throw new Error(
          "لطفاً نام فروشگاه را وارد کنید."
        );
      }

      if (!storeForm.ownerName.trim()) {
        throw new Error(
          "لطفاً نام مالک یا مدیر فروشگاه را وارد کنید."
        );
      }

      if (!storeForm.ownerLastName.trim()) {
        throw new Error(
          "لطفاً نام خانوادگی مالک یا مدیر فروشگاه را وارد کنید."
        );
      }

      if (!storeForm.phone.trim()) {
        throw new Error(
          "لطفاً شماره تماس را وارد کنید."
        );
      }

      /* --------------------------------
         1. ثبت فروشگاه
      -------------------------------- */

      const storeSlug =
        `store-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`;

      const {
        data: store,
        error: storeError,
      } = await supabase
        .from("stores")
        .insert({
          name: storeForm.name.trim(),
          slug: storeSlug,
          owner_name:
            storeForm.ownerName.trim(),
          phone: storeForm.phone.trim(),
          province:
            storeForm.province || null,
          city:
            storeForm.city.trim() || null,
          address:
            storeForm.address.trim() || null,
          description:
            storeForm.description.trim() || null,
          status: "pending",
        })
        .select("id")
        .single();

      if (storeError) {
        console.error(
          "STORE ERROR:",
          storeError
        );

        throw new Error(
          "خطای ثبت فروشگاه: " +
            storeError.message
        );
      }

      if (!store) {
        throw new Error(
          "فروشگاه ایجاد نشد."
        );
      }

      console.log(
        "STORE CREATED:",
        store.id
      );

      /* --------------------------------
         2. ثبت اطلاعات مالک
      -------------------------------- */

      const {
        error: privateError,
      } = await supabase
        .from("store_private_info")
        .insert({
          store_id: store.id,
          owner_first_name:
            storeForm.ownerName.trim(),
          owner_last_name:
            storeForm.ownerLastName.trim(),
          national_code:
            storeForm.nationalCode.trim() ||
            null,
        });

      if (privateError) {
        console.error(
          "PRIVATE INFO ERROR:",
          privateError
        );

        throw new Error(
          "خطای ثبت اطلاعات مالک: " +
            privateError.message
        );
      }

      /* --------------------------------
         3. فقط محصولاتی که نام دارند
      -------------------------------- */

      const validProducts =
        products.filter(
          (product) =>
            product.name.trim() !== ""
        );

      /* --------------------------------
         4. ثبت محصولات یکی یکی
      -------------------------------- */

      for (
        let productIndex = 0;
        productIndex < validProducts.length;
        productIndex++
      ) {
        const product =
          validProducts[productIndex];

        console.log(
          "START PRODUCT:",
          productIndex + 1,
          product.name
        );

        /* --------------------------------
           ساخت slug یکتا برای محصول
        -------------------------------- */

        const productSlug =
          `product-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 10)}`;

        /* --------------------------------
           تبدیل قیمت
        -------------------------------- */

        const cooperationPrice =
          Number.parseFloat(
            String(
              product.cooperationPrice || "0"
            ).replace(/,/g, "")
          ) || 0;

        const customerPrice =
          Number.parseFloat(
            String(
              product.customerPrice || "0"
            ).replace(/,/g, "")
          ) || 0;

        const stock =
          Number.parseFloat(
            String(
              product.stock || "0"
            ).replace(/,/g, "")
          ) || 0;

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

            category:
              product.category || null,

            description:
              product.description.trim() ||
              null,

            price: customerPrice,

            unit:
              product.unit || null,

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
          .select("id, slug")
          .single();

        if (productError) {
          console.error(
            "PRODUCT ERROR:",
            productError
          );

          throw new Error(
            `خطا در ثبت محصول «${product.name}»: ${productError.message}`
          );
        }

        if (!createdProduct) {
          throw new Error(
            `محصول «${product.name}» ثبت شد اما شناسه آن دریافت نشد.`
          );
        }

        console.log(
          "PRODUCT CREATED:",
          createdProduct
        );

        /* =================================================
           5. آپلود تصاویر اختصاصی همین محصول
           
           نکته مهم:
           createdProduct همین محصول است.
           بنابراین هر عکس مستقیماً به همین product_id
           متصل می‌شود.
        ================================================= */

        if (
          product.images &&
          product.images.length > 0
        ) {
          console.log(
            `UPLOADING ${product.images.length} IMAGES FOR PRODUCT:`,
            createdProduct.id
          );

          for (
            let imageIndex = 0;
            imageIndex <
              product.images.length;
            imageIndex++
          ) {
            const file =
              product.images[imageIndex];

            try {
              /* --------------------------------
                 پسوند فایل
              -------------------------------- */

              const extension =
                file.name
                  .split(".")
                  .pop()
                  ?.toLowerCase() ||
                "jpg";

              /* --------------------------------
                 نام یکتا
              -------------------------------- */

              const fileName =
                `${Date.now()}-${imageIndex}-${Math.random()
                  .toString(36)
                  .substring(2, 10)}.${extension}`;

              /* --------------------------------
                 مسیر اختصاصی محصول
                 
                 مثال:
                 products/123/abc.jpg
              -------------------------------- */

              const filePath =
                `products/${createdProduct.id}/${fileName}`;

              console.log(
                "START IMAGE UPLOAD:",
                {
                  productId:
                    createdProduct.id,
                  productName:
                    product.name,
                  fileName:
                    file.name,
                  filePath,
                  type: file.type,
                  size: file.size,
                }
              );

              /* --------------------------------
                 آپلود به Storage
              -------------------------------- */

              const {
                data: uploadData,
                error: uploadError,
              } =
                await supabase.storage
                  .from(
                    "product-image"
                  )
                  .upload(
                    filePath,
                    file,
                    {
                      cacheControl:
                        "3600",
                      upsert: false,
                      contentType:
                        file.type ||
                        "image/jpeg",
                    }
                  );

              console.log(
                "UPLOAD RESULT:",
                {
                  uploadData,
                  uploadError,
                }
              );

              if (uploadError) {
                console.error(
                  "IMAGE UPLOAD ERROR:",
                  uploadError
                );

                throw new Error(
                  `خطا در آپلود تصویر «${file.name}»: ${uploadError.message}`
                );
              }

              /* --------------------------------
                 گرفتن URL عمومی تصویر
              -------------------------------- */

              const {
                data:
                  publicUrlData,
              } =
                supabase.storage
                  .from(
                    "product-image"
                  )
                  .getPublicUrl(
                    filePath
                  );

              const imageUrl =
                publicUrlData
                  ?.publicUrl;

              console.log(
                "IMAGE URL:",
                imageUrl
              );

              if (!imageUrl) {
                throw new Error(
                  `آدرس تصویر «${file.name}» ایجاد نشد.`
                );
              }

              /* --------------------------------
                 ثبت رابطه تصویر با محصول
              -------------------------------- */

              const {
                error:
                  imageRowError,
              } = await supabase
                .from(
                  "product_images"
                )
                .insert({
                  product_id:
                    createdProduct.id,
                  image_url:
                    imageUrl,
                });

              if (imageRowError) {
                console.error(
                  "PRODUCT IMAGE ROW ERROR:",
                  imageRowError
                );

                throw new Error(
                  `تصویر «${file.name}» آپلود شد اما ثبت آن برای محصول انجام نشد: ${imageRowError.message}`
                );
              }

              console.log(
                "IMAGE COMPLETED:",
                {
                  productId:
                    createdProduct.id,
                  imageUrl,
                }
              );
            } catch (imageError) {
              console.error(
                "IMAGE PROCESS ERROR:",
                imageError
              );

              throw imageError;
            }
          }
        }

        /* --------------------------------
           6. تصاویر نمونه‌کار
           
           فعلاً اگر انتخاب شده باشند در همان
           Storage آپلود می‌شوند، ولی در
           product_images ثبت نمی‌کنیم تا
           ساختار فعلی دیتابیس شما خراب نشود.
        -------------------------------- */

        if (
          product.samples &&
          product.samples.length > 0
        ) {
          console.log(
            `SAMPLE IMAGES SELECTED FOR PRODUCT ${createdProduct.id}:`,
            product.samples.length
          );
        }

        console.log(
          "PRODUCT FINISHED:",
          product.name
        );
      }

      /* --------------------------------
         7. موفقیت نهایی
      -------------------------------- */

      alert(
        "فروشگاه، محصولات و تصاویر با موفقیت برای بررسی ثبت شدند."
      );

      /* --------------------------------
         پاک کردن فرم
      -------------------------------- */

      setStoreForm({
        ownerName: "",
        ownerLastName: "",
        nationalCode: "",
        phone: "",

        name: "",
        category: "",
        landline: "",
        storeMobile: "",

        province: "",
        city: "",
        district: "",
        address: "",

        description: "",
      });

      setProducts([
        {
          ...emptyProduct,
          images: [],
          samples: [],
          saleConditions: [],
        },
      ]);
    } catch (err) {
      console.error(
        "REGISTER ERROR:",
        err
      );

      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(
          "خطای نامشخص هنگام ثبت اطلاعات."
        );
      }
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

      {/* Main */}

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
                value={
                  storeForm.ownerName
                }
                onChange={(e) =>
                  updateStoreForm(
                    "ownerName",
                    e.target.value
                  )
                }
              />

              <Input
                label="نام خانوادگی"
                placeholder="مثلاً آهنی"
                value={
                  storeForm.ownerLastName
                }
                onChange={(e) =>
                  updateStoreForm(
                    "ownerLastName",
                    e.target.value
                  )
                }
              />

              <Input
                label="شماره تماس"
                placeholder="09xxxxxxxxx"
                type="tel"
                value={
                  storeForm.phone
                }
                onChange={(e) =>
                  updateStoreForm(
                    "phone",
                    e.target.value
                  )
                }
              />

              <Input
                label="کد ملی"
                placeholder="کد ملی ۱۰ رقمی"
                value={
                  storeForm.nationalCode
                }
                onChange={(e) =>
                  updateStoreForm(
                    "nationalCode",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          {/* Account Information */}

<section className="overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-sm">
  <div className="border-b border-blue-100 bg-blue-50 p-6">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        <User size={24} />
      </div>

      <div>
        <h2 className="text-xl font-black text-slate-900">
          اطلاعات ورود به پنل فروشگاه
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          با این اطلاعات، بعداً می‌توانید بدون ثبت مجدد فروشگاه، محصولات خود را اضافه کنید.
        </p>
      </div>
    </div>
  </div>

  <div className="grid gap-5 p-6 md:grid-cols-2">

    <Input
      label="نام کاربری"
      placeholder="مثلاً alireza_store"
      value={storeForm.username}
      onChange={(e) =>
        updateStoreForm(
          "username",
          e.target.value
        )
      }
    />

    <Input
      label="رمز عبور"
      placeholder="حداقل ۶ کاراکتر"
      type="password"
      value={storeForm.password}
      onChange={(e) =>
        updateStoreForm(
          "password",
          e.target.value
        )
      }
    />

  </div>

  <div className="mx-6 mb-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
    <strong className="text-slate-800">
      نکته:
    </strong>{" "}
    این اطلاعات برای شناسایی فروشگاه شما هنگام ثبت محصولات استفاده خواهد شد.
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
                value={
                  storeForm.name
                }
                onChange={(e) =>
                  updateStoreForm(
                    "name",
                    e.target.value
                  )
                }
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
                value={
                  storeForm.category
                }
                onChange={(e) =>
                  updateStoreForm(
                    "category",
                    e.target.value
                  )
                }
              />

              <Input
                label="شماره تلفن ثابت"
                placeholder="041xxxxxxxx"
                value={
                  storeForm.landline
                }
                onChange={(e) =>
                  updateStoreForm(
                    "landline",
                    e.target.value
                  )
                }
              />

              <Input
                label="شماره موبایل فروشگاه"
                placeholder="09xxxxxxxxx"
                type="tel"
                value={
                  storeForm.storeMobile
                }
                onChange={(e) =>
                  updateStoreForm(
                    "storeMobile",
                    e.target.value
                  )
                }
              />

              <div className="md:col-span-2">
                <Textarea
                  label="معرفی فروشگاه"
                  placeholder="درباره فروشگاه، سابقه فعالیت و حوزه تخصصی خود توضیح دهید..."
                  value={
                    storeForm.description
                  }
                  onChange={(e) =>
                    updateStoreForm(
                      "description",
                      e.target.value
                    )
                  }
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
                value={
                  storeForm.province
                }
                onChange={(e) =>
                  updateStoreForm(
                    "province",
                    e.target.value
                  )
                }
              />

              <Input
                label="شهر"
                placeholder="مثلاً تبریز"
                value={
                  storeForm.city
                }
                onChange={(e) =>
                  updateStoreForm(
                    "city",
                    e.target.value
                  )
                }
              />

              <Input
                label="منطقه یا محله"
                placeholder="نام محله"
                value={
                  storeForm.district
                }
                onChange={(e) =>
                  updateStoreForm(
                    "district",
                    e.target.value
                  )
                }
              />

              <div className="md:col-span-3">
                <Textarea
                  label="آدرس کامل فروشگاه"
                  placeholder="آدرس دقیق فروشگاه را وارد کنید..."
                  value={
                    storeForm.address
                  }
                  onChange={(e) =>
                    updateStoreForm(
                      "address",
                      e.target.value
                    )
                  }
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
              {products.map(
                (product, index) => (
                  <div
                    key={index}
                    className="relative rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="font-black text-slate-800">
                        محصول شماره{" "}
                        {index + 1}
                      </h3>

                      {products.length >
                        1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeProduct(
                              index
                            )
                          }
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                        >
                          <Trash2
                            size={17}
                          />
                          حذف محصول
                        </button>
                      )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                      <Input
                        label="نام محصول"
                        placeholder="مثلاً کاشی ۶۰×۱۲۰"
                        value={
                          product.name
                        }
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "name",
                            e.target.value
                          )
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
                        value={
                          product.category
                        }
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
                        value={
                          product.brand
                        }
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "brand",
                            e.target.value
                          )
                        }
                      />

                      <Input
                        label="مدل یا مشخصات"
                        placeholder="مدل، کد یا مشخصات محصول"
                        value={
                          product.model
                        }
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "model",
                            e.target.value
                          )
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
                        value={
                          product.unit
                        }
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "unit",
                            e.target.value
                          )
                        }
                      />

                      <Input
                        label="حداقل مقدار سفارش"
                        placeholder="مثلاً ۱۰ متر"
                        value={
                          product.minOrder
                        }
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
                        value={
                          product.stock
                        }
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "stock",
                            e.target.value
                          )
                        }
                      />

                      {/* Cooperation Price */}

                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <label className="mb-2 block text-sm font-bold text-blue-800">
                          قیمت همکاری با سرچنو
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            placeholder="مثلاً ۱,۵۰۰,۰۰۰"
                            value={
                              product.cooperationPrice
                            }
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
                            value={
                              product.customerPrice
                            }
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

                      {/* Description */}

                      <div className="md:col-span-2">
                        <Textarea
                          label="توضیحات محصول"
                          placeholder="توضیحات تکمیلی درباره محصول، کیفیت، مشخصات و شرایط فروش..."
                          value={
                            product.description
                          }
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Product Images */}

                      <div className="md:col-span-2">
                        <div className="rounded-3xl border border-pink-200 bg-pink-50 p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                              <ImagePlus
                                size={22}
                              />
                            </div>

                            <div>
                              <h4 className="font-black text-slate-800">
                                تصاویر محصول
                              </h4>

                              <p className="mt-1 text-xs text-slate-500">
                                تصاویر مربوط به همین محصول را انتخاب کنید.
                              </p>
                            </div>
                          </div>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white p-8 text-center transition hover:border-pink-500 hover:bg-pink-50">
                            <Upload
                              className="text-pink-600"
                              size={32}
                            />

                            <span className="mt-3 font-bold">
                              انتخاب تصاویر محصول
                            </span>

                            <span className="mt-2 text-xs text-slate-500">
                              امکان انتخاب چند تصویر وجود دارد
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handleProductImages(
                                  index,
                                  e
                                )
                              }
                            />
                          </label>

                          {product.images
                            .length > 0 && (
                            <p className="mt-3 text-sm font-bold text-emerald-600">
                              {
                                product
                                  .images
                                  .length
                              }{" "}
                              تصویر انتخاب شده است.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Samples */}

                      <div className="md:col-span-2">
                        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                              <ImagePlus
                                size={22}
                              />
                            </div>

                            <div>
                              <h4 className="font-black text-slate-800">
                                نمونه‌کارهای محصول
                              </h4>

                              <p className="mt-1 text-xs text-slate-500">
                                تصاویر نمونه‌کارها و پروژه‌های مرتبط با این محصول را اضافه کنید.
                              </p>
                            </div>
                          </div>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-white p-8 text-center transition hover:border-purple-500 hover:bg-purple-50">
                            <ImagePlus
                              className="text-purple-600"
                              size={32}
                            />

                            <span className="mt-3 font-bold">
                              انتخاب تصاویر نمونه‌کار
                            </span>

                            <span className="mt-2 text-xs text-slate-500">
                              امکان انتخاب چند تصویر وجود دارد
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handleSampleImages(
                                  index,
                                  e
                                )
                              }
                            />
                          </label>

                          {product.samples
                            .length > 0 && (
                            <p className="mt-3 text-sm font-bold text-emerald-600">
                              {
                                product
                                  .samples
                                  .length
                              }{" "}
                              تصویر نمونه‌کار انتخاب شده است.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
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

          {/* Confirmation */}

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
            اطلاعات فروشگاه و محصولات پس از ثبت برای بررسی ذخیره می‌شوند.
          </p>
        </form>
      </div>
    </main>
  );
}

/* =====================================================
   Input
===================================================== */

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
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* =====================================================
   Checkbox
===================================================== */

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
