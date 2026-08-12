"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Store,
  User,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
} from "lucide-react";

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

  /*
  --------------------------------
  تغییر اطلاعات فروشگاه
  --------------------------------
  */

  const updateStoreForm = (
    field: keyof StoreForm,
    value: string
  ) => {
    setStoreForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  =====================================================
  ثبت فروشگاه
  =====================================================
  */

  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      /*
      --------------------------------
      اعتبارسنجی اولیه
      --------------------------------
      */

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

      if (!storeForm.username.trim()) {
        throw new Error(
          "لطفاً نام کاربری فروشگاه را وارد کنید."
        );
      }

      if (!storeForm.password.trim()) {
        throw new Error(
          "لطفاً رمز عبور فروشگاه را وارد کنید."
        );
      }

      if (storeForm.password.trim().length < 6) {
        throw new Error(
          "رمز عبور باید حداقل ۶ کاراکتر باشد."
        );
      }

      /*
      --------------------------------
      ساخت Slug فروشگاه
      --------------------------------
      */

      const storeSlug =
        `store-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`;

      /*
      =====================================================
      1. ثبت فروشگاه
      =====================================================
      */

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

          phone:
            storeForm.phone.trim(),

          province:
            storeForm.province || null,

          city:
            storeForm.city.trim() || null,

          address:
            storeForm.address.trim() || null,

          description:
            storeForm.description.trim() || null,

          status: "pending",

          username:
            storeForm.username.trim(),

          password_hash:
            storeForm.password,
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

      /*
      =====================================================
      2. ثبت اطلاعات خصوصی مالک
      =====================================================
      */

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

      /*
      =====================================================
      3. ثبت موفق
      =====================================================
      */

      alert(
        "فروشگاه شما با موفقیت برای بررسی ثبت شد."
      );

      /*
      --------------------------------
      پاک کردن فرم
      --------------------------------
      */

      setStoreForm({
        username: "",
        password: "",

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
      {/* =====================================================
          Header
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

          {/* لوگو */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
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

          {/* دکمه‌های سمت راست */}

          <div className="flex items-center gap-2">

            {/* ثبت محصول */}

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link
                href="/store/product-register"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                <Package size={19} />
                ثبت محصول
              </Link>

              <div className="text-sm text-slate-500">
                قبلاً حساب فروشگاه دارید؟

                <span className="mx-1 font-bold text-slate-700">
                  از اینجا
                </span>

                <Link
                  href="/store/product-register"
                  className="font-black text-blue-700 transition hover:text-blue-900"
                >
                  ثبت محصول کنید
                </Link>
              </div>

            </div>

            {/* بازگشت */}

            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              <span className="hidden sm:inline">
                بازگشت به صفحه اصلی
              </span>

              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </header>

      {/* =====================================================
          Hero
      ===================================================== */}

      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-5 py-14 text-white">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
            <Store size={40} />
          </div>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            ثبت فروشگاه در سرچنو
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو معرفی کنید و
            مشتریان بیشتری برای کسب‌وکار خود پیدا کنید.
          </p>

        </div>
      </section>

      {/* =====================================================
          Main
      ===================================================== */}

      <div className="mx-auto max-w-5xl px-5 py-12">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >

          {/* =====================================================
              Owner Information
          ===================================================== */}

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
                value={storeForm.ownerName}
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
                value={storeForm.ownerLastName}
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
                value={storeForm.phone}
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
                value={storeForm.nationalCode}
                onChange={(e) =>
                  updateStoreForm(
                    "nationalCode",
                    e.target.value
                  )
                }
              />

            </div>

          </section>

          {/* =====================================================
              Account Information
          ===================================================== */}

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
                    با این اطلاعات، بعداً می‌توانید بدون
                    ثبت مجدد فروشگاه، محصولات خود را اضافه کنید.
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
              این اطلاعات برای ورود فروشگاه به پنل اختصاصی
              و ثبت محصولات بعدی استفاده خواهد شد.

            </div>

          </section>

          {/* =====================================================
              Store Information
          ===================================================== */}

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
                value={storeForm.name}
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
                  "درب و پنجره",
                  "برق و روشنایی",
                  "آسانسور",
                  "عایق و ایزولاسیون",
                  "دکوراسیون داخلی",
                  "آهن و فولاد",
                  "تأسیسات مکانیکی",
                  "رنگ و پوشش",
                  "لوله و اتصالات",
                  "بهداشتی",
                  "سنگ و کاشی",
                ]}
                value={storeForm.category}
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
                value={storeForm.landline}
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
                value={storeForm.storeMobile}
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
                  value={storeForm.description}
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

          {/* =====================================================
              Address
          ===================================================== */}

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
                value={storeForm.province}
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
                value={storeForm.city}
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
                value={storeForm.district}
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
                  value={storeForm.address}
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

          {/* =====================================================
              Working Hours
          ===================================================== */}

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

          {/* =====================================================
              Confirmation
          ===================================================== */}

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
                  اطلاعات ثبت‌شده توسط تیم سرچنو بررسی خواهد شد
                  و پس از تأیید، فروشگاه شما در پلتفرم نمایش داده
                  می‌شود. پس از تأیید فروشگاه، می‌توانید محصولات
                  و مصالح خود را از طریق پنل فروشگاه ثبت کنید.
                </p>

              </div>

            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                required
                className="mt-1 h-5 w-5 accent-blue-700"
              />

              <span className="text-sm leading-7 text-slate-700">
                صحت اطلاعات واردشده را تأیید می‌کنم و با قوانین و مقررات
                استفاده از خدمات سرچنو موافقم.
              </span>

            </label>

          </section>

          {/* =====================================================
              Submit Store
          ===================================================== */}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-5 text-lg font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <CheckCircle2 size={24} />

            {submitting
              ? "در حال ثبت فروشگاه..."
              : "ثبت فروشگاه برای بررسی"}

          </button>

          <p className="text-center text-xs text-slate-400">
            اطلاعات فروشگاه پس از ثبت برای بررسی ذخیره می‌شوند.
          </p>

          {/* =====================================================
              ثبت محصول بعد از ثبت فروشگاه
          ===================================================== */}

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Package size={28} />
              </div>

              <h3 className="mt-4 text-lg font-black text-emerald-900">
                فروشگاه خود را ثبت کرده‌اید؟
              </h3>

              <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-emerald-800">
                پس از ثبت و تأیید فروشگاه، می‌توانید با ورود به
                پنل فروشگاه، محصولات و مصالح قابل ارائه خود را
                ثبت و مدیریت کنید.
              </p>

              <Link
                href="/store/product-register"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                <Package size={19} />
                ثبت محصول
              </Link>

            </div>

          </div>

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
