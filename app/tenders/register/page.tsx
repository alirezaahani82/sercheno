"use client";

import Link from "next/link";
import { useState } from "react";

type PersonType = " حقیقی" | "حقوقی";

export default function RegisterProjectPage() {
  const [personType, setPersonType] = useState<PersonType>(" حقیقی");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass = "mb-2 block text-sm font-bold text-slate-700";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="لوگوی سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">سرچنو</div>
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
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="/monagese.jpg"
            alt="مناقصات کشوری سرچنو"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950 via-blue-950/90 to-slate-950/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <div className="max-w-4xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur">
              🏗️ مناقصات کشوری سرچنو
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              پروژه خود را ثبت کنید،
              <span className="mt-3 block text-cyan-300">
                بهترین پیشنهادها را دریافت کنید
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-9 text-blue-100 sm:text-lg">
              در سرچنو، کارفرمایان، انبوه‌سازان، شرکت‌ها و سازمان‌ها می‌توانند
              پروژه‌های ساختمانی و اجرایی خود را معرفی کنند تا فروشندگان،
              پیمانکاران و متخصصان واجد شرایط برای اجرای آن اعلام آمادگی کنند.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-2xl">📋</div>
                <div className="mt-3 font-black">ثبت پروژه</div>
                <div className="mt-1 text-sm text-blue-100">
                  مشخصات پروژه را وارد کنید
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-2xl">📣</div>
                <div className="mt-3 font-black">دریافت پیشنهاد</div>
                <div className="mt-1 text-sm text-blue-100">
                  پیشنهاد متخصصان را بررسی کنید
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-2xl">🤝</div>
                <div className="mt-3 font-black">انتخاب مجری</div>
                <div className="mt-1 text-sm text-blue-100">
                  با گزینه مناسب وارد مذاکره شوید
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="border-b border-slate-100 pb-7">
              <span className="text-sm font-bold text-blue-700">
                فرم ثبت پروژه
              </span>

              <h2 className="mt-2 text-3xl font-black">
                اطلاعات پروژه را وارد کنید
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                اطلاعات را تا حد امکان دقیق وارد کنید تا پیشنهادهای مناسب‌تری
                دریافت کنید.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-10">
              {/* Owner */}
              <div>
                <h3 className="text-xl font-black">۱. مشخصات ثبت‌کننده</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>نوع ثبت‌کننده</label>

                    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() => setPersonType(" حقیقی")}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          personType === " حقیقی"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        شخص حقیقی
                      </button>

                      <button
                        type="button"
                        onClick={() => setPersonType("حقوقی")}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          personType === "حقوقی"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        شخص حقوقی
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      {personType === "حقوقی"
                        ? "نام شرکت / سازمان"
                        : "نام و نام خانوادگی"}
                    </label>

                    <input
                      required
                      className={inputClass}
                      placeholder={
                        personType === "حقوقی"
                          ? "مثلاً شرکت ساختمانی..."
                          : "نام و نام خانوادگی"
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {personType === "حقوقی"
                        ? "شناسه ملی شرکت / سازمان"
                        : "کد ملی"}
                    </label>

                    <input
                      required
                      inputMode="numeric"
                      className={inputClass}
                      placeholder={
                        personType === "حقوقی"
                          ? "شناسه ملی"
                          : "کد ملی"
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>شماره تماس</label>

                    <input
                      required
                      type="tel"
                      className={inputClass}
                      placeholder="09xxxxxxxxx"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>ایمیل</label>

                    <input
                      type="email"
                      className={inputClass}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Project */}
              <div>
                <h3 className="text-xl font-black">۲. مشخصات پروژه</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>عنوان پروژه</label>

                    <input
                      required
                      className={inputClass}
                      placeholder="مثلاً اجرای اسکلت فلزی یک ساختمان ۸ طبقه"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>نوع پروژه</label>

                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        انتخاب کنید
                      </option>
                      <option>ساختمان مسکونی</option>
                      <option>ساختمان تجاری</option>
                      <option>ساختمان اداری</option>
                      <option>مجتمع و پروژه انبوه‌سازی</option>
                      <option>پروژه صنعتی</option>
                      <option>بازسازی</option>
                      <option>تأسیسات</option>
                      <option>راه و محوطه‌سازی</option>
                      <option>سایر</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>مرحله پروژه</label>

                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        انتخاب کنید
                      </option>
                      <option>طراحی و برنامه‌ریزی</option>
                      <option>تخریب</option>
                      <option>فونداسیون</option>
                      <option>اسکلت</option>
                      <option>سفت‌کاری</option>
                      <option>نازک‌کاری</option>
                      <option>تأسیسات</option>
                      <option>تکمیل و تحویل</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>استان</label>

                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        انتخاب استان
                      </option>
                      <option>آذربایجان شرقی</option>
                      <option>آذربایجان غربی</option>
                      <option>تهران</option>
                      <option>البرز</option>
                      <option>اصفهان</option>
                      <option>فارس</option>
                      <option>خراسان رضوی</option>
                      <option>سایر</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>شهر</label>

                    <input
                      required
                      className={inputClass}
                      placeholder="مثلاً تبریز"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>آدرس یا محدوده پروژه</label>

                    <input
                      required
                      className={inputClass}
                      placeholder="آدرس پروژه یا محدوده اجرای کار"
                    />
                  </div>
                </div>
              </div>

              {/* Scope */}
              <div>
                <h3 className="text-xl font-black">۳. شرح نیاز پروژه</h3>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>شرح پروژه</label>

                    <textarea
                      required
                      rows={6}
                      className={`${inputClass} resize-none`}
                      placeholder="شرح کامل پروژه، نوع کار، محدوده فعالیت و انتظارات خود را بنویسید..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      خدمات یا تخصص مورد نیاز
                    </label>

                    <textarea
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="مثلاً اجرای اسکلت فلزی، تأمین میلگرد، نصب آسانسور، اجرای نما و..."
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-xl font-black">۴. زمان‌بندی پروژه</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>تاریخ تقریبی شروع</label>

                    <input type="date" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>مدت تقریبی اجرا</label>

                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>
                        انتخاب مدت
                      </option>
                      <option>کمتر از ۱ ماه</option>
                      <option>۱ تا ۳ ماه</option>
                      <option>۳ تا ۶ ماه</option>
                      <option>۶ تا ۱۲ ماه</option>
                      <option>بیش از ۱۲ ماه</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-xl font-black">۵. اطلاعات مالی پروژه</h3>

                <div className="mt-5">
                  <label className={labelClass}>
                    بودجه یا برآورد تقریبی پروژه
                  </label>

                  <input
                    className={inputClass}
                    placeholder="اختیاری — مبلغ را به تومان وارد کنید"
                  />

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    اعلام بودجه در زمان ثبت پروژه الزامی نیست و می‌توانید آن را
                    در ادامه فرآیند مشخص کنید.
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-xl font-black">۶. مدارک و فایل‌های پروژه</h3>

                <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-7 text-center">
                  <div className="text-4xl">📎</div>

                  <h4 className="mt-3 font-black">
                    فایل‌های مرتبط را اضافه کنید
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    نقشه، تصاویر، فایل PDF، مشخصات فنی یا سایر مدارک مرتبط
                  </p>

                  <input
                    type="file"
                    multiple
                    className="mx-auto mt-5 block max-w-full text-sm"
                  />

                  <p className="mt-3 text-xs text-slate-400">
                    بارگذاری فایل اختیاری است.
                  </p>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xl font-black">
                  ۷. تأیید اطلاعات و شرایط انتشار
                </h3>

                <div className="mt-5 rounded-2xl bg-blue-50 p-6 text-sm leading-8 text-slate-600">
                  <p>
                    با ثبت پروژه در سرچنو، ثبت‌کننده تأیید می‌کند که اطلاعات
                    ارائه‌شده تا حد اطلاع وی صحیح است و اختیار لازم برای ثبت
                    پروژه و انتشار اطلاعات آن را دارد.
                  </p>

                  <p className="mt-3">
                    ثبت پروژه در سرچنو به‌تنهایی به معنی انعقاد قرارداد،
                    انتخاب پیمانکار یا ایجاد تعهد قطعی میان طرفین نیست.
                    قرارداد و شرایط نهایی اجرای پروژه باید مستقیماً میان
                    طرفین و مطابق توافق آنها تنظیم و امضا شود.
                  </p>

                  <p className="mt-3">
                    سرچنو بستر معرفی پروژه و ارتباط میان کارفرما و
                    فروشندگان، پیمانکاران و متخصصان است و اطلاعات پروژه
                    می‌تواند پیش از انتشار توسط تیم سرچنو بررسی شود.
                  </p>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3">
                  <input
                    required
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-blue-700"
                  />

                  <span className="text-sm leading-7 text-slate-600">
                    صحت اطلاعات واردشده را تأیید می‌کنم و با بررسی و انتشار
                    اطلاعات پروژه در چارچوب قوانین و مقررات سرچنو موافقم.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="border-t border-slate-100 pt-7">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-700 px-6 py-5 text-lg font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  ثبت پروژه در مناقصات سرچنو
                </button>

                {submitted && (
                  <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-center text-sm font-bold leading-7 text-emerald-700">
                    اطلاعات فرم آماده ارسال است. در مرحله بعدی می‌توانیم این
                    فرم را به Supabase متصل کنیم تا پروژه واقعاً در دیتابیس
                    ثبت شود.
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🏗️
              </div>

              <h3 className="mt-5 text-xl font-black">
                چه کسانی می‌توانند پروژه ثبت کنند؟
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <div className="flex gap-3">
                  <span className="text-blue-700">✓</span>
                  <span>اشخاص حقیقی و مالکان پروژه</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-blue-700">✓</span>
                  <span>شرکت‌ها و اشخاص حقوقی</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-blue-700">✓</span>
                  <span>انبوه‌سازان و سازندگان</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-blue-700">✓</span>
                  <span>سازمان‌ها و مجموعه‌های دارای پروژه</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-7 text-white">
              <div className="text-3xl">⚖️</div>

              <h3 className="mt-4 text-xl font-black">
                یک فرآیند شفاف و حرفه‌ای
              </h3>

              <p className="mt-3 text-sm leading-8 text-slate-300">
                هدف سرچنو ایجاد یک مسیر شفاف برای معرفی پروژه، دریافت
                پیشنهاد و ارتباط مستقیم میان کارفرما و مجری است.
              </p>
            </div>

            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7">
              <div className="text-2xl">💡</div>

              <h3 className="mt-3 font-black text-amber-900">
                برای دریافت پیشنهاد بهتر
              </h3>

              <p className="mt-3 text-sm leading-7 text-amber-800">
                شرح دقیق پروژه، شهر اجرا، زمان‌بندی، مقدار کار و تخصص مورد
                نیاز را تا حد امکان کامل وارد کنید.
              </p>
            </div>

            <Link
              href="/tenders"
              className="block rounded-[2rem] border border-slate-200 bg-white p-7 text-center font-black text-blue-700 transition hover:border-blue-200 hover:shadow-lg"
            >
              مشاهده پروژه‌های فعال ←
            </Link>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="سرچنو"
                className="h-10 w-10 rounded-xl object-contain"
              />

              <div>
                <div className="font-black text-white">سرچنو</div>
                <div className="text-xs">بازار هوشمند ساخت‌وساز</div>
              </div>
            </div>

            <div className="text-center text-xs sm:text-left">
              © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
