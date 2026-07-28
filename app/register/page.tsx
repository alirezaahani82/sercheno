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
            مرکز پشتیبانی سرچینو
          </div>

          <h1 className="text-4xl font-black sm:text-6xl">
            چطور می‌توانیم
            <span className="block text-blue-400">
              کمکتان کنیم؟
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-300">
            اگر درباره استفاده از سرچینو، ثبت کسب‌وکار، ثبت خدمات یا نحوه
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
                سوال یا درخواست خود را برای تیم سرچینو ارسال کنید.
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
                پاسخ سوالات رایج درباره نحوه استفاده از سرچینو را مشاهده کنید.
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
                  چگونه در سرچینو ثبت‌نام کنم؟
                </h3>

                <p className="mt-3 leading-8 text-slate-500">
                  برای استفاده از امکانات سرچینو می‌توانید از گزینه ثبت‌نام
                  در صفحه اصلی استفاده کنید.
                </p>
              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-black">
                  چگونه خدمات خود را در سرچینو ثبت کنم؟
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
                  سرچینو بستری برای جست‌وجو، معرفی و ارتباط میان کاربران،
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
"use client";

import Link from "next/link";
import {
  UserPlus,
  User,
  Phone,
  MapPin,
  CreditCard,
  CalendarDays,
  UserRound,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="لوگوی سرچینو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black text-blue-700">
                سرچینو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          <Link
            href="/login"
            className="text-sm font-bold text-blue-700 hover:text-blue-800"
          >
            ورود به حساب
          </Link>

        </div>
      </header>


      {/* MAIN */}
      <section className="px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-5xl">

          <div className="grid overflow-hidden rounded-[2.5rem] bg-white shadow-xl lg:grid-cols-5">

            {/* SIDE */}
            <div className="relative overflow-hidden bg-slate-950 p-8 text-white lg:col-span-2 lg:p-10">

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                  <UserPlus className="h-8 w-8" />
                </div>

                <h1 className="mt-8 text-3xl font-black leading-relaxed">
                  به خانواده
                  <span className="block text-blue-400">
                    سرچینو
                  </span>
                  خوش آمدید
                </h1>

                <p className="mt-6 leading-8 text-slate-300">
                  برای ایجاد حساب کاربری، اطلاعات خود را وارد کنید و به
                  دنیای جدیدی از جست‌وجو، انتخاب و ارتباط با فروشندگان و
                  متخصصان دسترسی داشته باشید.
                </p>

                <div className="mt-10 flex items-start gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />

                  <p className="text-sm leading-7 text-slate-400">
                    اطلاعات شما برای ایجاد حساب کاربری دریافت می‌شود و
                    در مراحل بعدی، امکانات بیشتری برای مدیریت حساب شما
                    در سرچینو فراهم خواهد شد.
                  </p>
                </div>

              </div>
            </div>


            {/* FORM */}
            <div className="p-7 sm:p-10 lg:col-span-3">

              <div>
                <span className="text-sm font-bold text-blue-700">
                  ایجاد حساب کاربری
                </span>

                <h2 className="mt-3 text-3xl font-black">
                  ثبت‌نام مشتری
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  لطفاً اطلاعات خود را با دقت وارد کنید.
                </p>
              </div>


              <form className="mt-8 space-y-5">

                {/* NAME */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام
                    </label>

                    <div className="relative">
                      <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
<input
                        type="text"
                        placeholder="نام"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام خانوادگی
                    </label>

                    <div className="relative">
                      <UserRound className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="نام خانوادگی"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                </div>


                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    شماره تماس
                  </label>

                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="09123456789"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 text-right outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>


                {/* NATIONAL CODE */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    کد ملی
                  </label>

                  <div className="relative">
                    <CreditCard className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="کد ملی ۱۰ رقمی"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>


                {/* BIRTH DATE + FATHER */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      تاریخ تولد
                    </label>

                    <div className="relative">
                      <CalendarDays className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="مثلاً ۱۳۸۰/۰۱/۰۱"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام پدر
                    </label>

                    <div className="relative">
                      <UserRound className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
placeholder="نام پدر"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                </div>


                {/* ADDRESS */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    آدرس
                  </label>

                  <div className="relative">
                    <MapPin className="absolute right-4 top-5 h-5 w-5 text-slate-400" />

                    <textarea
                      rows={4}
                      placeholder="آدرس محل سکونت خود را وارد کنید"
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>


                {/* SUBMIT */}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 hover:-translate-y-0.5"
                >
                  ایجاد حساب کاربری
                  <ArrowLeft className="h-5 w-5" />
                </button>

              </form>


              {/* LOGIN */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">

                قبلاً در سرچینو ثبت‌نام کرده‌اید؟

                <Link
                  href="/login"
                  className="mr-2 font-black text-blue-700 hover:text-blue-800"
                >
                  ورود به حساب
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

