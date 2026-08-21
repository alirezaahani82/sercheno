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
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    username: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim();
    const city = form.city.trim();
    const username = form.username.trim().toLowerCase();
    const password = form.password;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !city ||
      !username ||
      !password
    ) {
      setError("لطفاً تمام اطلاعات را تکمیل کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل باید به صورت 09123456789 وارد شود.");
      return;
    }

    if (username.length < 4) {
      setError("نام کاربری باید حداقل ۴ کاراکتر باشد.");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      /*
       * Supabase Auth به ایمیل نیاز دارد.
       * ایمیل داخلی از username ساخته می‌شود و
       * مشتری نیازی به دیدن آن ندارد.
       */
      const internalEmail = `${username}@sercheno.local`;

      /*
       * ساخت حساب در Supabase Auth
       */
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: internalEmail,
          password,
        });

      if (authError) {
        if (
          authError.message.toLowerCase().includes("already") ||
          authError.message.toLowerCase().includes("registered")
        ) {
          throw new Error("این نام کاربری قبلاً ثبت شده است.");
        }

        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error("حساب کاربری ایجاد نشد.");
      }

      /*
       * ذخیره اطلاعات اولیه مشتری
       */
      const { error: customerError } = await supabase
        .from("customers")
        .insert({
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          phone,
          city,
          username,
          profile_completed: false,
          purchase_count: 0,
          loyalty_points: 0,
          is_active: true,
        });

      if (customerError) {
        /*
         * اگر ساخت customers شکست خورد،
         * حساب Auth را هم حذف نمی‌کنیم؛
         * چون حذف Auth از سمت Client مجاز نیست.
         */
        console.error("CUSTOMER INSERT ERROR:", customerError);

        throw new Error(
          "حساب ساخته شد اما ذخیره اطلاعات مشتری با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
        );
      }

      /*
       * اگر Supabase نیاز به تأیید ایمیل داشته باشد،
       * ممکن است session نداشته باشیم.
       * در هر دو حالت کاربر را به Login می‌فرستیم.
       */
      setSuccess("حساب شما با موفقیت ایجاد شد.");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "در ثبت‌نام خطایی رخ داد. دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
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
                  برای ایجاد حساب کاربری در سرچنو، اطلاعات اولیه
                  خود را وارد کنید و به دنیای جدیدی از جست‌وجو،
                  انتخاب و خرید مصالح و خدمات ساختمانی دسترسی
                  داشته باشید.
                </p>

                <div className="mt-10 flex items-start gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />

                  <p className="text-sm leading-7 text-slate-400">
                    اطلاعات هویتی شما در مرحله ثبت‌نام اولیه دریافت
                    نمی‌شود. پس از ورود به حساب، می‌توانید پروفایل
                    هویتی خود را تکمیل کنید.
                  </p>
                </div>

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

              {/* ERROR */}
              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-bold leading-7 text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-700">
                  {success}
                  <div className="mt-1 text-xs font-medium">
                    در حال انتقال به صفحه ورود...
                  </div>
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="mt-8 space-y-5"
              >
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
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="نام"
                        autoComplete="given-name"
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
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
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
                      value={form.phone}
                      onChange={handleChange}
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
                      value={form.city}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="">
                        شهر خود را انتخاب کنید
                      </option>

                      <option value="تبریز">تبریز</option>
                      <option value="تهران">تهران</option>
                      <option value="ارومیه">ارومیه</option>
                      <option value="زنجان">زنجان</option>
                      <option value="اردبیل">اردبیل</option>
                      <option value="مراغه">مراغه</option>
                      <option value="مرند">مرند</option>
                      <option value="میانه">میانه</option>
                      <option value="شبستر">شبستر</option>
                      <option value="اهر">اهر</option>
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
                      value={form.username}
                      onChange={handleChange}
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
                      value={form.password}
                      onChange={handleChange}
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-12 pl-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
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
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "در حال ایجاد حساب..."
                    : "ایجاد حساب کاربری"}

                  {!loading && <ArrowLeft className="h-5 w-5" />}
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
