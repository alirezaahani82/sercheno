"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type ImageType = "desktop" | "mobile";

export default function AdvertisementsPage() {
  const [title, setTitle] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [description, setDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [advertisementType, setAdvertisementType] =
    useState("internal");

  const [desktopFile, setDesktopFile] =
    useState<File | null>(null);

  const [mobileFile, setMobileFile] =
    useState<File | null>(null);

  const [desktopPreview, setDesktopPreview] =
    useState("");

  const [mobilePreview, setMobilePreview] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* =====================================================
     IMAGE VALIDATION
  ===================================================== */

  function validateImage(
    file: File,
    type: ImageType
  ): Promise<string | null> {
    return new Promise((resolve) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        resolve(
          "فرمت تصویر باید JPG، JPEG، PNG یا WebP باشد."
        );
        return;
      }

      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        resolve(
          "حجم تصویر نباید بیشتر از ۲ مگابایت باشد."
        );
        return;
      }

      const image = new Image();

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        if (type === "desktop") {
          if (
            width < 1200 ||
            height < 400
          ) {
            resolve(
              "ابعاد تصویر دسکتاپ بسیار کوچک است. حداقل ابعاد باید ۱۲۰۰×۴۰۰ پیکسل باشد."
            );
            return;
          }

          if (
            width > 2400 ||
            height > 800
          ) {
            resolve(
              "ابعاد تصویر دسکتاپ بیش از حد مجاز است. حداکثر ابعاد ۲۴۰۰×۸۰۰ پیکسل است."
            );
            return;
          }

          const ratio = width / height;

          if (
            Math.abs(ratio - 3) > 0.08
          ) {
            resolve(
              "نسبت تصویر دسکتاپ باید تقریباً ۳ به ۱ باشد."
            );
            return;
          }
        }

        if (type === "mobile") {
          if (
            width < 750 ||
            height < 900
          ) {
            resolve(
              "ابعاد تصویر موبایل بسیار کوچک است. حداقل ابعاد باید ۷۵۰×۹۰۰ پیکسل باشد."
            );
            return;
          }

          if (
            width > 1500 ||
            height > 1800
          ) {
            resolve(
              "ابعاد تصویر موبایل بیش از حد مجاز است. حداکثر ابعاد ۱۵۰۰×۱۸۰۰ پیکسل است."
            );
            return;
          }

          const ratio = width / height;

          if (
            Math.abs(ratio - 0.8333) > 0.08
          ) {
            resolve(
              "نسبت تصویر موبایل باید تقریباً ۵ به ۶ باشد."
            );
            return;
          }
        }

        resolve(null);
      };

      image.onerror = () => {
        resolve(
          "خواندن تصویر امکان‌پذیر نیست."
        );
      };

      image.src = URL.createObjectURL(file);
    });
  }

  /* =====================================================
     FILE HANDLER
  ===================================================== */

  async function handleFileChange(
    file: File | undefined,
    type: ImageType
  ) {
    if (!file) return;

    setError("");
    setSuccess("");

    const validationError =
      await validateImage(file, type);

    if (validationError) {
      setError(validationError);

      if (type === "desktop") {
        setDesktopFile(null);
        setDesktopPreview("");
      } else {
        setMobileFile(null);
        setMobilePreview("");
      }

      return;
    }

    const preview =
      URL.createObjectURL(file);

    if (type === "desktop") {
      setDesktopFile(file);
      setDesktopPreview(preview);
    } else {
      setMobileFile(file);
      setMobilePreview(preview);
    }
  }

  /* =====================================================
     UPLOAD
  ===================================================== */

  async function uploadFile(
    file: File,
    type: ImageType
  ) {
    const extension =
      file.name.split(".").pop()?.toLowerCase() ||
      "webp";

    const fileName =
      `${crypto.randomUUID()}-${type}.${extension}`;

    const filePath =
      `internal/${fileName}`;

    const { error } =
      await supabase.storage
        .from("advertisements")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (error) {
      throw error;
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("advertisements")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("عنوان تبلیغ را وارد کنید.");
      return;
    }

    if (!advertiserName.trim()) {
      setError(
        "نام فروشنده یا تبلیغ‌دهنده را وارد کنید."
      );
      return;
    }

    if (!desktopFile) {
      setError(
        "تصویر تبلیغ دسکتاپ را انتخاب کنید."
      );
      return;
    }

    if (!mobileFile) {
      setError(
        "تصویر تبلیغ موبایل را انتخاب کنید."
      );
      return;
    }

    setLoading(true);

    try {
      /* ===============================
         UPLOAD DESKTOP
      =============================== */

      const desktopUrl =
        await uploadFile(
          desktopFile,
          "desktop"
        );

      /* ===============================
         UPLOAD MOBILE
      =============================== */

      const mobileUrl =
        await uploadFile(
          mobileFile,
          "mobile"
        );

      /* ===============================
         INSERT DATABASE
      =============================== */

      const { error: insertError } =
        await supabase
          .from("advertisements")
          .insert({
            title: title.trim(),

            image_url: desktopUrl,

            mobile_image_url: mobileUrl,

            description:
              description.trim() || null,

            target_url:
              targetUrl.trim() || null,

            advertiser_name:
              advertiserName.trim(),

            advertisement_type:
              advertisementType,

            status: "pending",

            sort_order: 0,

            start_date: null,

            end_date: null,
          });

      if (insertError) {
        throw insertError;
      }

      /* ===============================
         SUCCESS
      =============================== */

      setSuccess(
        "تبلیغ شما با موفقیت ثبت شد و پس از بررسی مدیریت منتشر خواهد شد."
      );

      setTitle("");
      setAdvertiserName("");
      setDescription("");
      setTargetUrl("");

      setDesktopFile(null);
      setMobileFile(null);

      setDesktopPreview("");
      setMobilePreview("");
    } catch (error) {
      console.error(
        "ADVERTISEMENT SUBMIT ERROR:",
        error
      );

      setError(
        "ثبت تبلیغ انجام نشد. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-10"
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">
          <div className="text-sm font-black text-blue-700">
            تبلیغات سرچنو
          </div>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            ثبت تبلیغ
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            تبلیغ خود را ثبت کنید تا پس از بررسی مدیریت
            در سرچنو نمایش داده شود.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFO */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black text-slate-900">
              اطلاعات تبلیغ
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  عنوان تبلیغ
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="مثلاً فروشگاه مصالح ساختمانی"
                  className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  نام فروشنده / تبلیغ‌دهنده
                </label>

                <input
                  type="text"
                  value={advertiserName}
                  onChange={(e) =>
                    setAdvertiserName(
                      e.target.value
                    )
                  }
                  placeholder="نام شرکت یا فروشگاه"
                  className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  لینک مقصد تبلیغ
                </label>

                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) =>
                    setTargetUrl(
                      e.target.value
                    )
                  }
                  placeholder="https://example.com"
                  dir="ltr"
                  className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  نوع تبلیغ
                </label>

                <select
                  value={advertisementType}
                  onChange={(e) =>
                    setAdvertisementType(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="internal">
                    تبلیغات داخلی
                  </option>

                  <option value="external">
                    تبلیغات خارجی
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold">
                  توضیحات
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="توضیحات تبلیغ..."
                  className="w-full resize-none rounded-2xl bg-slate-100 px-4 py-4 text-sm leading-7 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

            </div>
          </section>

          {/* DESKTOP IMAGE */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-black">
                  تصویر تبلیغ دسکتاپ
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  حداقل ۱۲۰۰×۴۰۰ و حداکثر
                  ۲۴۰۰×۸۰۰ پیکسل
                  <br />
                  نسبت تصویر: ۳ به ۱
                  <br />
                  حداکثر حجم: ۲ مگابایت
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-xs font-black text-blue-700">
                🖥️ دسکتاپ
              </div>

            </div>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-blue-300 hover:bg-blue-50">

              {desktopPreview ? (
                <img
                  src={desktopPreview}
                  alt="پیش‌نمایش دسکتاپ"
                  className="max-h-72 w-full object-contain"
                />
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="text-4xl">
                    🖥️
                  </div>

                  <div className="mt-4 text-sm font-black">
                    انتخاب تصویر دسکتاپ
                  </div>

                  <div className="mt-2 text-xs text-slate-400">
                    JPG، PNG یا WebP
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(
                    e.target.files?.[0],
                    "desktop"
                  )
                }
              />

            </label>

          </section>

          {/* MOBILE IMAGE */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-black">
                  تصویر تبلیغ موبایل
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  حداقل ۷۵۰×۹۰۰ و حداکثر
                  ۱۵۰۰×۱۸۰۰ پیکسل
                  <br />
                  نسبت تصویر: ۵ به ۶
                  <br />
                  حداکثر حجم: ۲ مگابایت
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">
                📱 موبایل
              </div>

            </div>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-emerald-300 hover:bg-emerald-50">

              {mobilePreview ? (
                <img
                  src={mobilePreview}
                  alt="پیش‌نمایش موبایل"
                  className="max-h-[500px] w-full object-contain"
                />
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="text-4xl">
                    📱
                  </div>

                  <div className="mt-4 text-sm font-black">
                    انتخاب تصویر موبایل
                  </div>

                  <div className="mt-2 text-xs text-slate-400">
                    JPG، PNG یا WebP
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(
                    e.target.files?.[0],
                    "mobile"
                  )
                }
              />

            </label>

          </section>

          {/* ERROR */}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-700">
              {success}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-700 py-5 text-sm font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "در حال ثبت تبلیغ..."
              : "ثبت تبلیغ برای بررسی"}
          </button>

        </form>

      </div>
    </main>
  );
                  }
