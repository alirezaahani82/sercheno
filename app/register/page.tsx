"use client";

import Link from "next/link";
import {
  UserPlus,
  User,
  Phone,
  MapPin,
  UserRound,
  LockKeyhole,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* LOGO */}
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

          {/* LOGIN */}
          <Link
            href="/login"
            className="text-sm font-bold text-blue-700 transition hover:text-blue-800"
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

              <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">
                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
                  <UserPlus className="h-8 w-8" />
                </div>

                {/* TITLE */}
                <h1 className="mt-8 text-3xl font-black leading-relaxed">
                  به خانواده
                  <span className="block text-blue-400">
                    سرچنو
                  </span>
                  خوش آمدید
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-6 leading-8 text-slate-300">
                  برای ایجاد حساب کاربری در سرچنو، اطلاعات اولیه خود
                  را وارد کنید و به دنیای جدیدی از جست‌وجو، انتخاب و
                  خرید مصالح و خدمات ساختمانی دسترسی داشته باشید.
                </p>

                {/* SECURITY */}
                <div className="mt-10 flex items-start gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />

                  <p className="text-sm leading-7 text-slate-400">
                    اطلاعات هویتی شما در مرحله ثبت‌نام اولیه دریافت
                    نمی‌شود. پس از ورود به حساب، می‌توانید پروفایل
                    هویتی خود را تکمیل کنید.
                  </p>
                </div>

                {/* INFO */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-bold text-white">
                    نکته مهم
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    برای انجام خرید در سرچنو، تکمیل اطلاعات هویتی
                    و پروفایل کاربری در مرحله بعد الزامی خواهد بود.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="p-7 sm:p-10 lg:col-span-3">
              {/* TITLE */}
              <div>
                <span className="text-sm font-bold text-blue-700">
                  ایجاد حساب کاربری
                </span>

                <h2 className="mt-3 text-3xl font-black">
                  ثبت‌نام مشتری
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  برای ساخت حساب، اطلاعات زیر را وارد کنید.
                </p>
              </div>

              {/* FORM */}
              <form className="mt-8 space-y-5">
                {/* NAME */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* FIRST NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام
                    </label>

                    <div className="relative">
                      <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="firstName"
                        placeholder="نام"
                        autoComplete="given-name"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نام خانوادگی
                    </label>

                    <div className="relative">
                      <UserRound className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="lastName"
                        placeholder="نام خانوادگی"
                        autoComplete="family-name"
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
                      name="phone"
                      dir="ltr"
                      placeholder="09123456789"
                      autoComplete="tel"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 text-right outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* CITY */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    شهر
                  </label>

                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <select
                      name="city"
                      defaultValue=""
                      className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="" disabled>
                        شهر خود را انتخاب کنید
                      </option>

                      <option value="تبریز">
                        تبریز
                      </option>

                      <option value="تهران">
                        تهران
                      </option>

                      <option value="ارومیه">
                        ارومیه
                      </option>

                      <option value="زنجان">
                        زنجان
                      </option>

                      <option value="اردبیل">
                        اردبیل
                      </option>

                      <option value="مراغه">
                        مراغه
                      </option>

                      <option value="مرند">
                        مرند
                      </option>

                      <option value="میانه">
                        میانه
                      </option>

                      <option value="شبستر">
                        شبستر
                      </option>

                      <option value="اهر">
                        اهر
                      </option>
                    </select>
                  </div>
                </div>

                {/* USERNAME */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    نام کاربری
                  </label>

                  <div className="relative">
                    <UserRound className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="username"
                      placeholder="نام کاربری خود را وارد کنید"
                      autoComplete="username"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    نام کاربری برای ورود بعدی شما به پنل مشتری استفاده می‌شود.
                  </p>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    رمز عبور
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                      aria-label={
                        showPassword
                          ? "مخفی کردن رمز عبور"
                          : "نمایش رمز عبور"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
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
                  className="mr-2 font-black text-blue-700 transition hover:text-blue-800"
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
