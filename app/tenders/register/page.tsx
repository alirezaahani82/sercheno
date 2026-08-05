"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterProjectPage() {
  const [personType, setPersonType] = useState<"real" | "legal">("real");

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
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
              <div className="text-2xl font-black tracking-tight text-blue-700">
                سرچنو
              </div>
              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          <Link
            href="/tenders"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            بازگشت به مناقصات
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/monagese.jpg"
            alt="مناقصات کشوری سرچنو"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/80" />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950 via-blue-900/70 to-blue-950/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:py-24">
          <div className="max-w-3xl text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur">
              مناقصات کشوری سرچنو
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              پروژه ساختمانی خود را
              <span className="mt-3 block text-cyan-300">
                به بهترین پیشنهاد بسپارید
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              پروژه خود را در سرچنو ثبت کنید تا فروشندگان، تأمین‌کنندگان،
              متخصصان و شرکت‌های فعال صنعت ساختمان بتوانند پیشنهاد خود را
              برای اجرای آن ارائه کنند.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* Form */}
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 bg-slate-50 p-7 sm:p-9">
              <h2 className="text-2xl font-black">
                ثبت پروژه جدید
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                اطلاعات پروژه را با دقت وارد کنید تا پیشنهادهای مناسب‌تری
                دریافت کنید.
              </p>
            </div>

            <form className="space-y-10 p-6 sm:p-9">

              {/* Applicant */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۱. اطلاعات ثبت‌کننده پروژه
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setPersonType("real")}
                    className={`rounded-2xl border p-5 text-right transition ${
                      personType === "real"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="text-lg font-black">
                      شخص حقیقی
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      برای مالک، کارفرما یا فردی که پروژه را شخصاً ثبت می‌کند.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPersonType("legal")}
                    className={`rounded-2xl border p-5 text-right transition ${
                      personType === "legal"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="text-lg font-black">
                      شخص حقوقی
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      برای شرکت، سازمان، مجموعه یا مؤسسه ثبت‌کننده پروژه.
                    </p>
                  </button>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {personType === "real" ? (
                    <>
                      <Field
                        label="نام و نام خانوادگی"
                        placeholder="مثلاً علیرضا آهنی"
                      />

                      <Field
                        label="کد ملی"
                        placeholder="کد ملی"
                        inputMode="numeric"
                      />

                      <Field
                        label="شماره تماس"
                        placeholder="۰۹۱۲..."
                        inputMode="tel"
                      />

                      <Field
                        label="سمت / نقش در پروژه"
                        placeholder="مثلاً مالک، کارفرما، مدیر پروژه"
                      />
                    </>
                  ) : (
                    <>
                      <Field
                        label="نام شرکت / سازمان"
                        placeholder="نام کامل شرکت یا سازمان"
                      />

                      <Field
                        label="شناسه ملی"
                        placeholder="شناسه ملی"
                        inputMode="numeric"
                      />

                      <Field
                        label="شماره ثبت"
                        placeholder="شماره ثبت شرکت"
                        inputMode="numeric"
                      />

                      <Field
                        label="نام مدیرعامل"
                        placeholder="نام و نام خانوادگی مدیرعامل"
                      />

                      <Field
                        label="شماره تماس"
                        placeholder="شماره تماس شرکت یا نماینده"
                        inputMode="tel"
                      />
                    </>
                  )}
                </div>
              </section>

              {/* Project Information */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۲. اطلاعات پروژه
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="عنوان پروژه"
                    placeholder="مثلاً احداث ساختمان مسکونی ۸ طبقه"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      نوع پروژه
                    </label>

                    <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option>ساختمان مسکونی</option>
                      <option>ساختمان تجاری</option>
                      <option>ساختمان اداری</option>
                      <option>مجتمع مسکونی</option>
                      <option>مجتمع تجاری</option>
                      <option>صنعتی</option>
                      <option>راه و ابنیه</option>
                      <option>تأسیسات</option>
                      <option>بازسازی</option>
                      <option>سایر</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      استان
                    </label>

                    <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option>آذربایجان شرقی</option>
                      <option>تهران</option>
                      <option>آذربایجان غربی</option>
                      <option>اردبیل</option>
                      <option>زنجان</option>
                      <option>البرز</option>
                      <option>اصفهان</option>
                      <option>فارس</option>
                      <option>خراسان رضوی</option>
                      <option>سایر استان‌ها</option>
                    </select>
                  </div>

                  <Field
                    label="شهر"
                    placeholder="مثلاً تبریز"
                  />

                  <Field
                    label="محدوده / آدرس تقریبی پروژه"
                    placeholder="آدرس یا محدوده اجرای پروژه"
                  />

                  <Field
                    label="متراژ / حجم تقریبی پروژه"
                    placeholder="مثلاً ۵۰۰۰ مترمربع"
                  />
                </div>
              </section>

              {/* Description */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۳. شرح پروژه و خدمات یا تخصص مورد نیاز
                </h3>

                <textarea
                  rows={7}
                  placeholder="شرح کامل پروژه، عملیات مورد نیاز، مصالح یا تجهیزات مورد نیاز، تخصص مورد انتظار، حجم کار و سایر توضیحات مهم را وارد کنید..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-8 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </section>

              {/* Timeline */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۴. زمان‌بندی پروژه
                </h3>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field
                    label="تاریخ شروع پروژه"
                    placeholder="۱۴۰۵/۰۶/۰۱"
                  />

                  <Field
                    label="تاریخ پایان پروژه"
                    placeholder="۱۴۰۶/۰۶/۰۱"
                  />

                  <Field
                    label="مهلت ارسال پیشنهاد"
                    placeholder="۱۴۰۵/۰۵/۲۵"
                  />
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  تاریخ‌ها را به صورت شمسی و با فرمت ۱۴۰۵/۰۶/۰۱ وارد کنید.
                </p>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۵. شرایط و توضیحات شرکت در پروژه
                </h3>

                <textarea
                  rows={5}
                  placeholder="در صورت وجود شرایط خاص برای شرکت‌کنندگان، مدارک مورد نیاز، سابقه کاری، مجوزها یا الزامات فنی را وارد کنید..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-8 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </section>

              {/* Documents */}
              <section>
                <h3 className="mb-5 text-lg font-black">
                  ۶. توضیحات و مدارک پروژه
                </h3>

                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-7 text-center transition hover:border-blue-300 hover:bg-blue-50/30">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                    📎
                  </div>

                  <h4 className="mt-4 font-black">
                    مدارک و فایل‌های پروژه را بارگذاری کنید
                  </h4>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-500">
                    نقشه‌ها، تصاویر، فایل‌های توضیحات، مشخصات فنی، جدول
                    مقادیر، فایل PDF یا سایر مدارک مرتبط با پروژه را
                    می‌توانید اضافه کنید.
                  </p>

                  <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                    انتخاب فایل
                    <input
                      type="file"
                      multiple
                      className="hidden"
                    />
                  </label>

                  <p className="mt-3 text-xs text-slate-400">
                    امکان انتخاب چند فایل وجود دارد.
                  </p>
                </div>
              </section>

              {/* Confirmation */}
              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex gap-4">
                  <input
                    id="confirm"
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-blue-700"
                  />

                  <label
                    htmlFor="confirm"
                    className="cursor-pointer text-sm leading-7 text-slate-700"
                  >
                    تأیید می‌کنم اطلاعات واردشده صحیح است و اختیار ثبت این
                    پروژه و دریافت پیشنهاد از فروشندگان، تأمین‌کنندگان و
                    متخصصان را دارم.
                  </label>
                </div>
              </section>

              {/* Submit */}
              <div className="border-t border-slate-100 pt-7">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-700 py-5 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  ثبت پروژه و انتشار مناقصه
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-slate-400">
                  پس از ثبت، اطلاعات پروژه بررسی شده و در صورت تأیید در بخش
                  مناقصات سرچنو منتشر خواهد شد.
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-28">

            {/* Who can participate */}
            <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-7 text-white shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-3xl">
                🏆
              </div>

              <h2 className="mt-5 text-xl font-black">
                چه کسانی می‌توانند در مناقصه‌های سرچنو شرکت کنند؟
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                فروشندگان، تأمین‌کنندگان، شرکت‌ها و متخصصان فعال صنعت
                ساختمان می‌توانند متناسب با موضوع پروژه پیشنهاد خود را
                ارسال کنند.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "فروشندگان مصالح و تجهیزات ساختمانی",
                  "تأمین‌کنندگان و شرکت‌های بازرگانی",
                  "پیمانکاران و شرکت‌های ساختمانی",
                  "استادکاران و متخصصان فنی",
                  "تولیدکنندگان محصولات ساختمانی",
                  "مجریان و ارائه‌دهندگان خدمات تخصصی",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/5 p-3 text-sm"
                  >
                    <span className="mt-0.5 text-cyan-300">✓</span>
                    <span className="leading-6 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/tenders/participate"
                className="mt-6 block rounded-xl bg-cyan-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300"
              >
                مشاهده صفحه شرکت در مناقصه ←
              </Link>
            </div>

            {/* Tips */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="font-black">
                برای دریافت پیشنهاد بهتر
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500">
                <div className="flex gap-3">
                  <span className="font-black text-blue-700">۱</span>
                  <span>
                    شرح پروژه و حجم کار را تا حد امکان دقیق وارد کنید.
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="font-black text-blue-700">۲</span>
                  <span>
                    نقشه، تصاویر و مدارک مرتبط را در بخش بارگذاری اضافه کنید.
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="font-black text-blue-700">۳</span>
                  <span>
                    مهلت ارسال پیشنهاد را متناسب با حجم پروژه تعیین کنید.
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.</p>
        <p className="mt-2">شرکت امیر توان پویای گستر</p>
      </footer>
    </main>
  );
}

function Field({
  label,
  placeholder,
  inputMode,
}: {
  label: string;
  placeholder: string;
  inputMode?: "numeric" | "tel" | "text";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
