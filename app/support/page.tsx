"use client";

import Link from "next/link";
import {
  Headphones,
  MessageCircle,
  Phone,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

export default function SupportPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-cyan-300">
            <Headphones className="h-4 w-4" />
            مرکز پشتیبانی سرچنو
          </div>

          <h1 className="text-4xl font-black sm:text-6xl">
            چطور می‌توانیم
            <span className="block text-blue-400">
              کمکتان کنیم؟
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-300">
            اگر درباره استفاده از سرچنو، ثبت کسب‌وکار، ثبت خدمات یا نحوه
            فعالیت در پلتفرم سوالی دارید، می‌توانید از راه‌های زیر با ما
            در ارتباط باشید.
          </p>

        </div>
      </section>


      {/* SUPPORT OPTIONS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-6 md:grid-cols-3">

            {/* PHONE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Phone className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-black">
                تماس با پشتیبانی
              </h3>

              <p className="mt-3 leading-8 text-slate-500">
                برای دریافت راهنمایی می‌توانید با شماره پشتیبانی تماس بگیرید.
              </p>

              <a
                href="tel:09144389280"
                dir="ltr"
                className="mt-5 block font-black text-blue-700"
              >
                09144389280
              </a>

            </div>


            {/* MESSAGE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <MessageCircle className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-black">
                ارسال پیام
              </h3>

              <p className="mt-3 leading-8 text-slate-500">
                سوال یا درخواست خود را برای تیم سرچنو ارسال کنید.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-700"
              >
                تماس با ما
                <ArrowLeft className="h-4 w-4" />
              </Link>

            </div>


            {/* FAQ */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <HelpCircle className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-black">
                سوالات متداول
              </h3>

              <p className="mt-3 leading-8 text-slate-500">
                پاسخ سوالات رایج درباره نحوه استفاده از سرچنو را مشاهده کنید.
              </p>

              <p className="mt-5 font-bold text-indigo-700">
                به‌زودی فعال می‌شود
              </p>

            </div>

          </div>


          {/* FAQ SECTION */}
          <div className="mt-20">

            <div className="text-center">

              <span className="font-bold text-blue-600">
                سوالات متداول
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                پاسخ برخی از سوالات شما
              </h2>

            </div>
<div className="mx-auto mt-10 max-w-4xl space-y-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-black">
                  چگونه در سرچنو ثبت‌نام کنم؟
                </h3>

                <p className="mt-3 leading-8 text-slate-500">
                  برای استفاده از امکانات سرچنو می‌توانید از گزینه ثبت‌نام
                  در صفحه اصلی استفاده کنید.
                </p>
              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-black">
                  چگونه خدمات خود را در سرچنو ثبت کنم؟
                </h3>

                <p className="mt-3 leading-8 text-slate-500">
                  ارائه‌دهندگان خدمات ساختمانی می‌توانند از بخش ثبت خدمات
                  و تخصص، اطلاعات حرفه‌ای خود را ثبت کنند.
                </p>
              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-black">
                  آیا سرچینو فروشنده کالا است؟
                </h3>

                <p className="mt-3 leading-8 text-slate-500">
                  سرچنو بستری برای جست‌وجو، معرفی و ارتباط میان کاربران،
                  فروشندگان، تأمین‌کنندگان و ارائه‌دهندگان خدمات است.
                </p>
              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-black">
                  چگونه با پشتیبانی تماس بگیرم؟
                </h3>

                <p className="mt-3 leading-8 text-slate-500">
                  برای ارتباط با پشتیبانی می‌توانید از صفحه تماس با ما
                  استفاده کنید یا با شماره تماس مجموعه ارتباط بگیرید.
                </p>
              </div>

            </div>

          </div>


          {/* BACK HOME */}
          <div className="mt-14 text-center">

            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 font-bold text-white transition hover:-translate-y-1"
            >
              بازگشت به صفحه اصلی
              <ArrowLeft className="h-5 w-5" />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
