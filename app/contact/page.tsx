"use client";

import Link from "next/link";
import {
  Phone,
  MapPin,
  Mail,
  Clock3,
  ArrowLeft,
  MessageCircle,
  Building2,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200">
              <MessageCircle className="h-4 w-4" />
              با ما در ارتباط باشید
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              چطور می‌توانیم
              <span className="block text-blue-400">
                به شما کمک کنیم؟
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-300">
              برای ارتباط با تیم سرچنو، دریافت اطلاعات بیشتر، پیشنهاد همکاری
              یا مطرح کردن سوالات خود، می‌توانید از راه‌های ارتباطی زیر با ما
              در تماس باشید.
            </p>

          </div>
        </div>
      </section>


      {/* CONTACT CARDS */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        <div className="grid gap-5 md:grid-cols-3">

          {/* PHONE */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Phone className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-xl font-black">
              تماس تلفنی
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              برای ارتباط مستقیم با مجموعه سرچنو می‌توانید با شماره زیر تماس
              بگیرید.
            </p>

            <a
              href="tel:09144389280"
              dir="ltr"
              className="mt-5 block text-lg font-black text-blue-700"
            >
              09144389280
            </a>
          </div>


          {/* ADDRESS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <MapPin className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-xl font-black">
              آدرس دفتر مرکزی
            </h3>

            <p className="mt-3 text-sm leading-8 text-slate-500">
              آذربایجان شرقی، تبریز، ولیعصر، روبه‌روی ساختمان افرا،
              پلاک ۱۳۹
            </p>
          </div>


          {/* EMAIL */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <Mail className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-xl font-black">
              ارتباط آنلاین
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              برای ارسال پیشنهادها و درخواست‌های همکاری می‌توانید از طریق
              راه‌های ارتباطی آنلاین با ما در تماس باشید.
            </p>

            <p className="mt-5 font-bold text-indigo-700">
              به‌زودی فعال می‌شود
            </p>
          </div>

        </div>
      </section>


      {/* MAIN CONTACT SECTION */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-2">

            {/* INFO */}
            <div>
<span className="font-bold text-blue-600">
                ارتباط با سرچنو
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                همیشه آماده شنیدن صدای شما هستیم
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-600">
                سرچنو با هدف ایجاد ارتباطی ساده‌تر میان مشتریان، فروشندگان،
                تأمین‌کنندگان و متخصصان فعالیت می‌کند. نظرات، پیشنهادها و
                بازخوردهای شما به ما کمک می‌کند تا خدمات بهتری ارائه دهیم.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Clock3 className="h-6 w-6 text-blue-600" />

                  <div>
                    <p className="font-black">
                      ساعات پاسخگویی
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      شنبه تا پنجشنبه — در ساعات کاری
                    </p>
                  </div>
                </div>


                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Building2 className="h-6 w-6 text-blue-600" />

                  <div>
                    <p className="font-black">
                      مجموعه امیرتوان پویای گستر
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      توسعه‌دهنده پلتفرم سرچنو
                    </p>
                  </div>
                </div>

              </div>

            </div>


            {/* MESSAGE BOX */}
            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">

              <h3 className="text-2xl font-black">
                پیام خود را برای ما ارسال کنید
              </h3>

              <p className="mt-3 leading-8 text-slate-400">
                فرم ارسال پیام در حال توسعه است. در حال حاضر می‌توانید از
                طریق شماره تماس مجموعه با ما ارتباط برقرار کنید.
              </p>

              <div className="mt-8 space-y-4">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    نام و نام خانوادگی
                  </label>

                  <input
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-bold">
                    شماره تماس
                  </label>

                  <input
                    type="tel"
                    placeholder="شماره تماس خود را وارد کنید"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-bold">
                    موضوع پیام
                  </label>

                  <input
                    type="text"
                    placeholder="موضوع پیام"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-bold">
                    پیام شما
                  </label>

                  <textarea
                    rows={5}
placeholder="پیام خود را بنویسید..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>


                <button
                  type="button"
                  className="w-full rounded-2xl bg-blue-600 py-4 font-black transition hover:bg-blue-700"
                >
                  ارسال پیام
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-black sm:text-4xl">
            می‌خواهید بیشتر درباره سرچنو بدانید؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            درباره اهداف، چشم‌انداز و مسیر توسعه پلتفرم سرچنو بیشتر بدانید.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-slate-950 transition hover:-translate-y-1"
          >
            درباره سرچنو
            <ArrowLeft className="h-5 w-5" />
          </Link>

        </div>
      </section>


      {/* BACK HOME */}
      <section className="bg-white py-10">
        <div className="text-center">

          <Link
            href="/"
            className="font-bold text-blue-700 hover:text-blue-800"
          >
            ← بازگشت به صفحه اصلی
          </Link>

        </div>
      </section>

    </main>
  );
}
