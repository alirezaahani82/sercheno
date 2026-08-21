"use client";

import Link from "next/link";
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
          <Link
            href="/"
            className="flex items-center gap-3"
          >
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

            {/* SIDE PANEL */}
            <div className="relative overflow-hidden bg-slate-950 p-8 text-white lg:col-span-2 lg:p-10">

              {/* Decorative circles */}
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">

                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
                  👤
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
                  برای ایجاد حساب کاربری در سرچنو، اطلاعات اولیه
                  خود را وارد کنید و به دنیای جدیدی از جست‌وجو،
                  انتخاب و خرید مصالح و خدمات ساختمانی دسترسی
                  داشته باشید.
                </p>

                {/* SECURITY */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">

                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      🛡️
                    </span>

                    <p className="font-bold">
                      امنیت اطلاعات
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    اطلاعات هویتی شما در مرحله ثبت‌نام اولیه
                    دریافت نمی‌شود. پس از ورود به حساب، می‌توانید
                    پروفایل هویتی خود را تکمیل کنید.
                  </p>

                </div>

                {/* IMPORTANT INFO */}
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

                  <p className="text-sm font-black text-blue-300">
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

              {/* FORM TITLE */}
              <div>

                <span className="text-sm font-bold text-blue-700">
                  ایجاد حساب کاربری
                </span>

                <h2 className="mt-3 text-3xl font-black">
                  ثبت‌نام مشتری
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  برای ساخت حساب کاربری، اطلاعات اولیه زیر را
                  وارد کنید.
                </p>

              </div>

              {/* REGISTER FORM */}
              <form
                className="mt-8 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >

                {/* NAME */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* FIRST NAME */}
                  <div>

                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-bold"
                    >
                      نام
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="نام"
                      autoComplete="given-name"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* LAST NAME */}
                  <div>

                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-bold"
                    >
                      نام خانوادگی
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="نام خانوادگی"
                      autoComplete="family-name"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold"
                  >
                    شماره تماس
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    placeholder="09123456789"
                    autoComplete="tel"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-right outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                {/* CITY */}
                <div>

                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-bold"
                  >
                    شهر
                  </label>

                  <select
                    id="city"
                    name="city"
                    defaultValue=""
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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

                {/* USERNAME */}
                <div>

                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-bold"
                  >
                    نام کاربری
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    autoComplete="username"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    این نام کاربری برای ورود بعدی شما به پنل مشتری
                    استفاده خواهد شد.
                  </p>

                </div>

                {/* PASSWORD */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold"
                  >
                    رمز عبور
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 pl-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword((value) => !value);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                    >
                      {showPassword ? "مخفی" : "نمایش"}
                    </button>

                  </div>

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    رمز عبور باید حداقل ۶ کاراکتر باشد.
                  </p>

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 active:translate-y-0"
                >
                  <span>
                    ایجاد حساب کاربری
                  </span>

                  <span className="text-lg">
                    ←
                  </span>
                </button>

              </form>

              {/* LOGIN */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">

                <span>
                  قبلاً در سرچنو ثبت‌نام کرده‌اید؟
                </span>

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

      {/* FOOTER */}
      <footer className="pb-8 text-center text-xs text-slate-400">
        © سرچنو - بازار هوشمند ساخت‌وساز
      </footer>

    </main>
  );
              }
