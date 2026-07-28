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
                    سرچنو
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

                قبلاً در سرچنو ثبت‌نام کرده‌اید؟

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
