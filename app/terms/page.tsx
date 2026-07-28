"use client";

import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Store,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

export default function TermsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-cyan-300">
            <FileText className="h-4 w-4" />
            قوانین و مقررات سرچنو
          </div>

          <h1 className="text-4xl font-black sm:text-6xl">
            قوانین استفاده از
            <span className="block text-blue-400">
              پلتفرم سرچنو
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-300">
            استفاده از پلتفرم سرچنو به معنای پذیرش قوانین و مقررات آن است.
            لطفاً پیش از استفاده از خدمات، این قوانین را با دقت مطالعه کنید.
          </p>

        </div>
      </section>


      {/* CONTENT */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">

          <div className="space-y-6">

            {/* 1 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <UserCheck className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-black">
                  ۱. شرایط استفاده
                </h2>
              </div>

              <p className="mt-5 leading-9 text-slate-600">
                کاربران موظف هستند هنگام استفاده از سرچنو اطلاعات صحیح و
                معتبر ارائه دهند و از ثبت اطلاعات نادرست یا گمراه‌کننده
                خودداری کنند. هر کاربر مسئول فعالیت‌ها و اطلاعاتی است که
                توسط حساب کاربری وی در پلتفرم ثبت می‌شود.
              </p>

            </div>


            {/* 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <Store className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-black">
                  ۲. مسئولیت فروشندگان و ارائه‌دهندگان خدمات
                </h2>
              </div>

              <p className="mt-5 leading-9 text-slate-600">
                فروشندگان، تأمین‌کنندگان و ارائه‌دهندگان خدمات مسئول صحت
                اطلاعات مربوط به محصولات، خدمات، قیمت‌ها، مشخصات و سایر
                اطلاعات ثبت‌شده توسط خود هستند. سرچنو بستری برای معرفی و
                ارتباط میان کاربران و ارائه‌دهندگان کالا و خدمات است.
              </p>

            </div>


            {/* 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-black">
                  ۳. حفظ اطلاعات کاربران
                </h2>
              </div>

              <p className="mt-5 leading-9 text-slate-600">
                سرچنو تلاش می‌کند اطلاعات کاربران را در چارچوب قوانین و
                مقررات مربوطه حفظ و از آن‌ها محافظت کند. کاربران نیز موظف
                هستند اطلاعات حساب کاربری خود را به شکل امن نگهداری کنند.
              </p>

            </div>


            {/* 4 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
<div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <AlertCircle className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-black">
                  ۴. محتوای ممنوع
                </h2>
              </div>

              <p className="mt-5 leading-9 text-slate-600">
                انتشار محتوای خلاف قوانین جمهوری اسلامی ایران، اطلاعات
                جعلی، محتوای توهین‌آمیز، کلاهبرداری، تبلیغات غیرمجاز یا
                هرگونه محتوایی که حقوق دیگران را نقض کند، در سرچنو ممنوع است.
              </p>

            </div>


            {/* 5 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <FileText className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-black">
                  ۵. تغییر قوانین
                </h2>
              </div>

              <p className="mt-5 leading-9 text-slate-600">
                سرچنو می‌تواند در صورت نیاز قوانین و مقررات خود را به‌روزرسانی
                کند. نسخه جدید قوانین پس از انتشار در همین صفحه قابل مشاهده
                خواهد بود.
              </p>

            </div>

          </div>


          {/* BACK */}
          <div className="mt-12 text-center">

            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white transition hover:-translate-y-1"
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
