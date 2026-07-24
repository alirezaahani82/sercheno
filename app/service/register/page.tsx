"use client";

import { useState } from "react";

const services = [
  "بنا و استادکار",
  "کارگر ساختمانی",
  "نصاب درب و پنجره",
  "نصاب کاشی و سرامیک",
  "جوشکار",
  "برق‌کار ساختمان",
  "لوله‌کش",
  "گچ‌کار",
  "نقاش ساختمان",
  "کناف‌کار",
  "سنگ‌کار",
  "آرماتوربند",
  "قالب‌بند",
  "کابینت‌کار",
  "نصاب آسانسور",
  "اپراتور ماشین‌آلات",
  "مهندس و ناظر",
  "سایر خدمات",
];

export default function ServiceRegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="سرچینو"
              className="h-12 w-12 rounded-xl object-contain"
            />

            <div>
              <div className="text-xl font-black text-blue-700">
                سرچینو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </a>

          <a
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </header>

      {/* Main */}
      <section className="px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          
          {/* Title */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
              🛠️
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              ارائه‌دهنده خدمات ساختمانی هستید؟
            </h1>

            <p className="mt-4 leading-8 text-slate-500">
              تخصص و مهارت خود را در سرچینو ثبت کنید و به مشتریان
              بیشتری دسترسی پیدا کنید.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-10 rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex flex-1 items-center"
                >
                  <div
                    className={flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      step >= item
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-400"
                    }}
                  >
                    {item}
                  </div>

                  {item < 5 && (
                    <div
                      className={mx-2 h-1 flex-1 rounded-full ${
                        step > item
                          ? "bg-blue-700"
                          : "bg-slate-100"
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-5 text-center text-xs text-slate-500">
              <span>اطلاعات</span>
              <span>تخصص</span>
              <span>موقعیت</span>
              <span>تجربه</span>
              <span>تأیید</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-black">
                  اطلاعات شخصی
                </h2>
<p className="mt-2 text-sm text-slate-500">
                  اطلاعات اولیه خود را وارد کنید.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام
                    </label>

                    <input
                      type="text"
                      placeholder="نام شما"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام خانوادگی
                    </label>

                    <input
                      type="text"
                      placeholder="نام خانوادگی شما"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-bold">
                      شماره موبایل
                    </label>

                    <input
                      type="tel"
                      placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-black">
                  تخصص و مهارت شما چیست؟
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  اصلی‌ترین خدمتی که ارائه می‌دهید را انتخاب کنید.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={rounded-2xl border p-4 text-sm font-bold transition ${
                        selectedService === service
                          ? "border-blue-700 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                      }}
                    >
                      {selectedService === service && "✓ "}
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-black">
                  محل فعالیت شما
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  مشخص کنید در کدام منطقه فعالیت می‌کنید.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      استان
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none">
                      <option>آذربایجان شرقی</option>
                      <option>تهران</option>
                      <option>آذربایجان غربی</option>
                      <option>اردبیل</option>
                      <option>زنجان</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      شهر
                    </label>
<select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none">
                      <option>تبریز</option>
                      <option>تهران</option>
                      <option>ارومیه</option>
                      <option>اردبیل</option>
                      <option>زنجان</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-bold">
                      محدوده فعالیت
                    </label>

                    <input
                      type="text"
                      placeholder="مثلاً تبریز و حومه"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-black">
                  تجربه و معرفی خودتان
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  توضیح کوتاهی درباره تجربه و توانایی‌های خود بنویسید.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      چند سال سابقه کار دارید؟
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none">
                      <option>کمتر از ۱ سال</option>
                      <option>۱ تا ۳ سال</option>
                      <option>۳ تا ۵ سال</option>
                      <option>۵ تا ۱۰ سال</option>
                      <option>بیشتر از ۱۰ سال</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      درباره تخصص و تجربه خود بنویسید
                    </label>

                    <textarea
                      rows={6}
                      placeholder="مثلاً ۸ سال سابقه اجرای پروژه‌های ساختمانی..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                    <div className="text-3xl">📷</div>

                    <h3 className="mt-3 font-bold">
                      افزودن نمونه‌کار
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      در نسخه نهایی می‌توانید تصاویر پروژه‌های خود را
                      بارگذاری کنید.
                    </p>

                    <button className="mt-4 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold">
                      انتخاب تصاویر
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-black">
                  اطلاعات شما آماده ثبت است
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-500">
                  پس از ثبت نهایی، پروفایل خدمات شما در سرچینو ایجاد
                  می‌شود و مشتریان می‌توانند تخصص شما را مشاهده کنند.
                </p>
<div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-5 text-right">
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <span className="text-sm text-slate-500">
                      تخصص انتخاب‌شده
                    </span>

                    <span className="font-bold">
                      {selectedService || "انتخاب نشده"}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4">
                    <span className="text-sm text-slate-500">
                      وضعیت پروفایل
                    </span>

                    <span className="font-bold text-amber-600">
                      آماده بررسی
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert("پروفایل شما با موفقیت ثبت شد.")}
                  className="mt-8 rounded-xl bg-emerald-600 px-10 py-4 font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                >
                  ثبت پروفایل من در سرچینو
                </button>
              </div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                  onClick={previousStep}
                  disabled={step === 1}
                  className={rounded-xl px-6 py-3 font-bold ${
                    step === 1
                      ? "cursor-not-allowed text-slate-300"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }}
                >
                  مرحله قبل
                </button>

                <button
                  onClick={nextStep}
                  className="rounded-xl bg-blue-700 px-8 py-3 font-bold text-white hover:bg-blue-800"
                >
                  مرحله بعد
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="mt-8 text-center">
                <button
                  onClick={previousStep}
                  className="text-sm font-bold text-blue-700"
                >
                  ← بازگشت و ویرایش اطلاعات
                </button>
              </div>
            )}
          </div>

          {/* Trust Box */}
          <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex gap-4">
              <div className="text-2xl">🔒</div>

              <div>
                <h3 className="font-black">
                  اطلاعات شما محفوظ است
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  اطلاعات ثبت‌شده شما برای ایجاد پروفایل حرفه‌ای
                  متخصصان استفاده می‌شود. در نسخه نهایی، امکان تأیید
                  هویت و اعتبارسنجی متخصصان نیز به سیستم اضافه خواهد شد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-sm text-slate-400">
        © ۱۴۰۵ سرچینو — بازار هوشمند ساخت‌وساز
      </footer>
    </main>
  );
}
