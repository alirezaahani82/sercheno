"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterProjectPage() {
  const [personType, setPersonType] = useState<"real" | "legal">("real");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
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
            href="/"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-l from-blue-950 via-blue-900 to-blue-800 py-20 text-white">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur">
            🏗️ مناقصات کشوری سرچنو
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            پروژه ساختمانی خود را
            <span className="mt-3 block text-cyan-300">
              برای اجرای تخصصی ثبت کنید
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            پروژه خود را در سرچنو ثبت کنید تا فروشندگان، پیمانکاران و
            متخصصان واجد شرایط بتوانند پیشنهاد خود را برای اجرای آن ارائه
            کنند.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

          {/* Section 1 */}
          <div>
            <div className="mb-7">
              <span className="text-sm font-bold text-blue-700">
                مرحله اول
              </span>

              <h2 className="mt-2 text-2xl font-black">
                اطلاعات ثبت‌کننده پروژه
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                نوع شخصیت ثبت‌کننده پروژه را مشخص کنید.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPersonType("real")}
                className={`rounded-2xl border p-5 text-right transition ${
                  personType === "real"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div className="text-lg font-black">
                  👤 شخص حقیقی
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  ثبت پروژه توسط شخص حقیقی
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPersonType("legal")}
                className={`rounded-2xl border p-5 text-right transition ${
                  personType === "legal"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div className="text-lg font-black">
                  🏢 شخص حقوقی
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  ثبت پروژه توسط شرکت، سازمان یا مجموعه حقوقی
                </div>
              </button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field
                label={personType === "real" ? "نام و نام خانوادگی" : "نام شرکت / سازمان"}
                placeholder={
                  personType === "real"
                    ? "نام و نام خانوادگی"
                    : "نام کامل شرکت یا سازمان"
                }
              />

              {personType === "real" ? (
                <Field
                  label="کد ملی"
                  placeholder="کد ملی"
                />
              ) : (
                <Field
                  label="شماره ثبت"
                  placeholder="شماره ثبت شرکت / سازمان"
                />
              )}

              {personType === "legal" && (
                <>
                  <Field
                    label="نام مدیر عامل"
                    placeholder="نام و نام خانوادگی مدیر عامل"
                  />

                  <Field
                    label="سمت یا موقعیت در پروژه"
                    placeholder="مثلاً مدیر پروژه، نماینده شرکت، مالک یا کارفرما"
                  />
                </>
              )}

              <Field
                label="شماره تماس"
                placeholder="شماره تماس"
                type="tel"
              />

              <Field
                label="ایمیل"
                placeholder="example@email.com"
                type="email"
              />
            </div>
          </div>

          <div className="my-12 h-px bg-slate-200" />

          {/* Section 2 */}
          <div>
            <div className="mb-7">
              <span className="text-sm font-bold text-blue-700">
                مرحله دوم
              </span>

              <h2 className="mt-2 text-2xl font-black">
                اطلاعات پروژه
              </h2>
            </div>

            <div className="grid gap-5">
              <Field
                label="عنوان پروژه"
                placeholder="مثلاً ساخت مجتمع مسکونی ۸ واحدی"
              />

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  شرح پروژه و خدمات یا تخصص مورد نیاز
                </label>

                <textarea
                  rows={7}
                  placeholder="شرح کامل پروژه، عملیات مورد نیاز، تخصص مورد انتظار، حجم تقریبی کار و هر توضیحی که برای ارائه پیشنهاد دقیق لازم است..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field
                  label="استان"
                  placeholder="استان پروژه"
                />

                <Field
                  label="شهر"
                  placeholder="شهر پروژه"
                />

                <Field
                  label="محدوده / آدرس پروژه"
                  placeholder="آدرس یا محدوده تقریبی"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  نوع پروژه
                </label>

                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
                  <option>انتخاب نوع پروژه</option>
                  <option>ساختمان مسکونی</option>
                  <option>مجتمع تجاری</option>
                  <option>مجتمع اداری</option>
                  <option>پروژه صنعتی</option>
                  <option>پروژه عمرانی</option>
                  <option>بازسازی و نوسازی</option>
                  <option>تأسیسات ساختمانی</option>
                  <option>سایر</option>
                </select>
              </div>
            </div>
          </div>

          <div className="my-12 h-px bg-slate-200" />

          {/* Section 3 */}
          <div>
            <div className="mb-7">
              <span className="text-sm font-bold text-blue-700">
                مرحله سوم
              </span>

              <h2 className="mt-2 text-2xl font-black">
                زمان‌بندی پروژه
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Field
                label="تاریخ شروع پروژه"
                placeholder="۱۴۰۵/۰۱/۱۵"
              />

              <Field
                label="تاریخ پایان پروژه"
                placeholder="۱۴۰۵/۰۶/۳۰"
              />

              <Field
                label="مهلت ارسال پیشنهاد"
                placeholder="۱۴۰۵/۰۱/۳۰"
              />
            </div>
          </div>

          <div className="my-12 h-px bg-slate-200" />

          {/* Section 4 */}
          <div>
            <div className="mb-7">
              <span className="text-sm font-bold text-blue-700">
                مرحله چهارم
              </span>

              <h2 className="mt-2 text-2xl font-black">
                مدارک و توضیحات تکمیلی
              </h2>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  توضیحات تکمیلی
                </label>

                <textarea
                  rows={5}
                  placeholder="اطلاعات تکمیلی مورد نیاز برای شرکت‌کنندگان در مناقصه..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <label className="block text-sm font-bold text-slate-700">
                  بارگذاری مدارک پروژه
                </label>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  در صورت نیاز می‌توانید نقشه، تصاویر، مشخصات فنی یا
                  مدارک مرتبط با پروژه را بارگذاری کنید.
                </p>

                <input
                  type="file"
                  multiple
                  className="mt-5 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex gap-3">
              <div className="text-xl">ℹ️</div>

              <div>
                <h3 className="font-black text-blue-900">
                  توجه
                </h3>

                <p className="mt-2 text-sm leading-7 text-blue-800">
                  اطلاعات پروژه باید دقیق و واقعی باشد. پس از بررسی
                  اطلاعات، پروژه برای انتشار در بخش مناقصات سرچنو آماده
                  خواهد شد و شرکت‌ها و متخصصان می‌توانند پیشنهاد خود را
                  ارائه کنند.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full rounded-2xl bg-blue-700 px-6 py-5 text-lg font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800"
          >
            ثبت پروژه و ارسال برای بررسی
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-slate-400">
            با ثبت پروژه، صحت اطلاعات واردشده را تأیید می‌کنید.
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}
