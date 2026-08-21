"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  id?: string;
  auth_user_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  city?: string;

  national_code?: string;
  birth_date?: string;
  father_name?: string;
  job?: string;
  address?: string;

  profile_completed?: boolean;
};

export default function CustomerProfilePage() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [nationalCode, setNationalCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    try {
      const savedCustomer = localStorage.getItem("sercheno_customer");

      if (!savedCustomer) {
        window.location.href = "/login";
        return;
      }

      const parsedCustomer: Customer = JSON.parse(savedCustomer);

      setCustomer(parsedCustomer);

      setNationalCode(parsedCustomer.national_code || "");
      setBirthDate(parsedCustomer.birth_date || "");
      setFatherName(parsedCustomer.father_name || "");
      setJob(parsedCustomer.job || "");
      setAddress(parsedCustomer.address || "");
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
      setError("اطلاعات حساب قابل بارگذاری نیست.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!customer) {
      setError("ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    if (!nationalCode.trim()) {
      setError("لطفاً کد ملی را وارد کنید.");
      return;
    }

    if (!/^\d{10}$/.test(nationalCode.trim())) {
      setError("کد ملی باید دقیقاً ۱۰ رقم باشد.");
      return;
    }

    if (!birthDate.trim()) {
      setError("لطفاً تاریخ تولد را وارد کنید.");
      return;
    }

    if (!fatherName.trim()) {
      setError("لطفاً نام پدر را وارد کنید.");
      return;
    }

    if (!job.trim()) {
      setError("لطفاً شغل خود را وارد کنید.");
      return;
    }

    if (!address.trim()) {
      setError("لطفاً آدرس خود را وارد کنید.");
      return;
    }

    try {
      setSaving(true);

      /*
       * در این مرحله API ذخیره پروفایل را صدا می‌زنیم.
       *
       * API مرحله بعد در:
       * app/api/customer/profile/route.ts
       *
       * ساخته خواهد شد.
       */
      const response = await fetch(
        "/api/customer/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nationalCode: nationalCode.trim(),
            birthDate: birthDate.trim(),
            fatherName: fatherName.trim(),
            job: job.trim(),
            address: address.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "ذخیره اطلاعات پروفایل انجام نشد."
        );
        return;
      }

      /*
       * اطلاعات جدید را داخل localStorage نیز
       * به‌روزرسانی می‌کنیم تا پنل مشتری
       * بلافاصله وضعیت تکمیل پروفایل را نشان دهد.
       */
      const updatedCustomer: Customer = {
        ...customer,

        national_code: nationalCode.trim(),
        birth_date: birthDate.trim(),
        father_name: fatherName.trim(),
        job: job.trim(),
        address: address.trim(),

        profile_completed: true,
      };

      localStorage.setItem(
        "sercheno_customer",
        JSON.stringify(updatedCustomer)
      );

      setCustomer(updatedCustomer);

      setMessage(
        "اطلاعات هویتی شما با موفقیت ثبت شد."
      );

      /*
       * چند لحظه بعد به پنل مشتری برمی‌گردیم.
       */
      setTimeout(() => {
        window.location.href = "/customer";
      }, 1200);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);

      setError(
        "ارتباط با سرور برقرار نشد. دوباره تلاش کنید."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("sercheno_customer");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-xl">
          <div className="text-lg font-black text-slate-800">
            در حال بارگذاری...
          </div>

          <div className="mt-2 text-sm text-slate-400">
            لطفاً کمی صبر کنید
          </div>
        </div>
      </main>
    );
  }

  if (!customer) {
    return null;
  }

  const fullName =
    `${customer.first_name || ""} ${
      customer.last_name || ""
    }`.trim();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 text-slate-900"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
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

          {/* HEADER BUTTONS */}
          <div className="flex items-center gap-2">
            <Link
              href="/customer"
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              پنل مشتری
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        {/* TITLE */}
        <div className="mb-6 overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-9">
          <div className="text-sm font-bold text-blue-400">
            پروفایل مشتری
          </div>

          <h1 className="mt-3 text-3xl font-black leading-relaxed sm:text-4xl">
            تکمیل اطلاعات هویتی
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
            سلام{" "}
            <span className="font-black text-blue-400">
              {fullName || "مشتری"}
            </span>
            👋
            <br />
            برای استفاده از امکان خرید در سرچنو، لطفاً
            اطلاعات هویتی و شخصی خود را کامل کنید.
          </p>
        </div>

        {/* WARNING */}
        <div className="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              ⚠️
            </div>

            <div>
              <div className="font-black text-amber-900">
                تکمیل اطلاعات برای خرید الزامی است
              </div>

              <p className="mt-2 text-sm leading-7 text-amber-800/80">
                اطلاعات زیر برای تکمیل پروفایل مشتری
                دریافت می‌شود. تا زمانی که پروفایل شما
                کامل نشود، امکان ثبت خرید فعال نخواهد شد.
              </p>
            </div>
          </div>
        </div>

        {/* BASIC INFO */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="text-sm font-bold text-blue-700">
              اطلاعات اولیه حساب
            </div>

            <h2 className="mt-2 text-2xl font-black">
              اطلاعات ثبت‌نام
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoBox
              label="نام و نام خانوادگی"
              value={fullName || "-"}
            />

            <InfoBox
              label="نام کاربری"
              value={customer.username || "-"}
            />

            <InfoBox
              label="شماره تماس"
              value={customer.phone || "-"}
            />

            <InfoBox
              label="شهر"
              value={customer.city || "-"}
            />
          </div>
        </section>

        {/* IDENTITY FORM */}
        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="text-sm font-bold text-blue-700">
              مرحله دوم
            </div>

            <h2 className="mt-2 text-2xl font-black">
              اطلاعات هویتی و شخصی
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              لطفاً اطلاعات زیر را با دقت وارد کنید.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-6"
          >
            {/* NATIONAL CODE + BIRTH DATE */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* NATIONAL CODE */}
              <div>
                <label
                  htmlFor="nationalCode"
                  className="mb-2 block text-sm font-black"
                >
                  کد ملی
                </label>

                <input
                  id="nationalCode"
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  maxLength={10}
                  value={nationalCode}
                  onChange={(event) =>
                    setNationalCode(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="۱۰ رقم کد ملی"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-right outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* BIRTH DATE */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="mb-2 block text-sm font-black"
                >
                  تاریخ تولد
                </label>

                <input
                  id="birthDate"
                  type="text"
                  value={birthDate}
                  onChange={(event) =>
                    setBirthDate(event.target.value)
                  }
                  placeholder="مثلاً ۱۳۸۰/۰۱/۰۱"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  تاریخ تولد را به صورت شمسی وارد کنید.
                </p>
              </div>
            </div>

            {/* FATHER NAME */}
            <div>
              <label
                htmlFor="fatherName"
                className="mb-2 block text-sm font-black"
              >
                نام پدر
              </label>

              <input
                id="fatherName"
                type="text"
                value={fatherName}
                onChange={(event) =>
                  setFatherName(event.target.value)
                }
                placeholder="نام پدر"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* JOB */}
            <div>
              <label
                htmlFor="job"
                className="mb-2 block text-sm font-black"
              >
                شغل
              </label>

              <input
                id="job"
                type="text"
                value={job}
                onChange={(event) =>
                  setJob(event.target.value)
                }
                placeholder="مثلاً مهندس، پیمانکار، فروشنده، کارمند و..."
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-black"
              >
                آدرس
              </label>

              <textarea
                id="address"
                rows={5}
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="آدرس کامل محل سکونت"
                required
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-700">
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "در حال ذخیره اطلاعات..."
                : "ذخیره و تکمیل پروفایل"}

              <span className="text-xl">
                ←
              </span>
            </button>
          </form>
        </section>

        {/* SECURITY */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🛡️
            </div>

            <div>
              <h3 className="font-black">
                امنیت اطلاعات شما
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                اطلاعات هویتی شما برای مدیریت حساب و
                انجام امن معاملات در سرچنو استفاده خواهد شد.
              </p>
            </div>
          </div>
        </section>

        {/* BACK */}
        <div className="mt-6 text-center">
          <Link
            href="/customer"
            className="text-sm font-black text-blue-700 hover:text-blue-800"
          >
            ← بازگشت به پنل مشتری
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pb-8 text-center text-xs text-slate-400">
        © سرچنو - بازار هوشمند ساخت‌وساز
      </footer>
    </main>
  );
}

/* INFO BOX */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-2 font-black text-slate-800">
        {value}
      </div>
    </div>
  );
              }
