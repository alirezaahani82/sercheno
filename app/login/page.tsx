"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  UserRound,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function LoginPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
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
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700"
          >
            بازگشت به صفحه اصلی
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          
          {/* Right Side */}
          <div className="text-center lg:text-right">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-700 lg:mx-0">
              <UserRound className="h-10 w-10" />
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight sm:text-5xl">
              خوش آمدید به
              <span className="block text-blue-700">
                سرچینو
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-9 text-slate-600 lg:mx-0">
              اگر قبلاً در سرچینو حساب کاربری ایجاد کرده‌اید،
              مشخصات خود را وارد کنید تا وارد حساب کاربری خود شوید.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                <Search className="h-4 w-4 text-blue-600" />
                جست‌وجوی آسان
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                تجربه‌ای مطمئن
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            
            <div className="mb-8">
              <h2 className="text-2xl font-black">
                ورود به حساب کاربری
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                برای ورود، شماره تماس و مشخصات خود را وارد کنید.
              </p>
            </div>

            <form className="space-y-5">
              
              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  نام
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <UserRound className="h-5 w-5 text-slate-400" />
<input
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  نام خانوادگی
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <UserRound className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  شماره تماس
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Phone className="h-5 w-5 text-slate-400" />

                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="09123456789"
                    className="w-full bg-transparent text-left text-sm outline-none"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 hover:-translate-y-0.5"
              >
                ورود به حساب کاربری
                <ArrowLeft className="h-5 w-5" />
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                هنوز در سرچینو حساب کاربری ندارید؟
              </p>

              <Link
                href="/register"
                className="mt-3 inline-block font-black text-blue-700 transition hover:text-blue-800"
              >
                ایجاد حساب کاربری جدید
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © ۱۴۰۵ سرچینو — تمامی حقوق محفوظ است.
      </footer>
    </main>
  );
}
