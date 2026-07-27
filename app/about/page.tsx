"use client";

import Link from "next/link";
import {
  Search,
  Store,
  Users,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Rocket,
  Phone,
  MapPin,
  ChevronLeft,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-white text-slate-900"
    >
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="text-white">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                آینده خرید و فروش، هوشمندتر از همیشه
              </div>

              <h1 className="text-5xl font-black leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
                به دنیای
                <span className="block bg-gradient-to-l from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  سرچینو
                </span>
                خوش آمدید
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
                سرچینو یک پلتفرم هوشمند برای جست‌وجو، معرفی، مقایسه و ارتباط
                میان خریداران، فروشندگان، تأمین‌کنندگان و ارائه‌دهندگان خدمات
                است؛ جایی که پیدا کردن آنچه نیاز دارید، ساده‌تر و سریع‌تر از
                همیشه می‌شود.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-900 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  شروع جست‌وجو
                  <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
                </Link>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  ارتباط با ما
                </a>
              </div>
            </div>

            {/* HERO CARD */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-2xl" />

              <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">تجربه‌ای متفاوت</p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        یک جست‌وجو، دنیایی از انتخاب‌ها
                      </h3>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                      <Search className="h-7 w-7" />
                    </div>
                  </div>
<div className="space-y-4">
                    {[
                      ["جست‌وجو کن", "نیاز خود را سریع و آسان پیدا کن", Search],
                      ["بررسی کن", "گزینه‌های مناسب را مقایسه کن", CheckCircle2],
                      ["انتخاب کن", "به فروشنده یا تأمین‌کننده متصل شو", Users],
                    ].map(([title, desc, Icon], index) => {
                      const IconComponent = Icon as React.ElementType;

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.04] p-4"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            <IconComponent className="h-6 w-6" />
                          </div>

                          <div>
                            <h4 className="font-bold text-white">{title}</h4>
                            <p className="mt-1 text-sm text-slate-400">
                              {desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <span className="text-sm font-bold text-blue-600">درباره ما</span>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            سرچینو؛ پلی میان نیاز و انتخاب
          </h2>

          <p className="mx-auto mt-7 max-w-4xl text-lg leading-9 text-slate-600">
            ما در سرچینو تلاش می‌کنیم مسیر پیدا کردن کالا و خدمات را برای
            مشتریان کوتاه‌تر و مسیر دیده‌شدن و فروش را برای کسب‌وکارها هموارتر
            کنیم. هدف ما ایجاد بستری مدرن و قابل اعتماد است که در آن خریدار
            بتواند راحت‌تر به گزینه‌های مناسب دسترسی پیدا کند و فروشنده نیز
            بتواند کسب‌وکار خود را به مشتریان بیشتری معرفی کند.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold text-blue-600">
              چرا سرچینو؟
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              برای یک تجربه بهتر ساخته شده‌ایم
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              ما فناوری را در خدمت ساده‌تر شدن فرآیند جست‌وجو، انتخاب و ارتباط
              قرار داده‌ایم.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Search,
                title: "جست‌وجوی آسان",
                text: "نیاز خود را سریع‌تر پیدا کنید و زمان کمتری برای جست‌وجو در بازار صرف کنید.",
              },
              {
                icon: Store,
                title: "دیده‌شدن کسب‌وکارها",
                text: "فرصتی برای معرفی بهتر محصولات و خدمات و رسیدن به مشتریان جدید.",
              },
              {
                icon: ShieldCheck,
                title: "شفافیت بیشتر",
                text: "اطلاعات کسب‌وکارها و خدمات در بستری منظم‌تر و قابل دسترس‌تر ارائه می‌شود.",
              },
              {
                icon: Zap,
                title: "ارتباط سریع‌تر",
                text: "فاصله میان مشتری و فروشنده را کاهش می‌دهیم تا ارتباط آسان‌تر شکل بگیرد.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
return (
                <div
                  key={index}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-7 text-xl font-black">{item.title}</h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-blue-600">
                چگونه کار می‌کند؟
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                خرید و پیدا کردن خدمات،
                <span className="block text-blue-600">ساده‌تر از همیشه</span>
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-600">
                سرچینو با هدف ساده‌سازی فرآیند جست‌وجو و ارتباط میان مشتری و
                ارائه‌دهنده کالا یا خدمات طراحی شده است.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    number: "۰۱",
                    title: "نیاز خود را جست‌وجو کنید",
                    text: "محصول، کالا یا خدمات مورد نیازتان را در سرچینو پیدا کنید.",
                  },
                  {
                    number: "۰۲",
                    title: "گزینه‌های مناسب را بررسی کنید",
                    text: "کسب‌وکارها و ارائه‌دهندگان مرتبط با نیاز خود را بررسی کنید.",
                  },
                  {
                    number: "۰۳",
                    title: "انتخاب و ارتباط",
                    text: "با گزینه مناسب ارتباط بگیرید و فرآیند خرید یا دریافت خدمات را دنبال کنید.",
                  },
                ].map((step) => (
                  <div key={step.number} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-lg font-black">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-2xl">
                <div className="rounded-[2.8rem] bg-slate-950 p-8 text-white sm:p-12">
                  <Target className="h-12 w-12 text-cyan-400" />

                  <h3 className="mt-8 text-3xl font-black leading-tight">
                    هدف ما چیست؟
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-slate-300">
                    ساخت بستری که جست‌وجوی کالا و خدمات را برای مشتری آسان‌تر
                    کند و به کسب‌وکارها کمک کند تا بهتر دیده شوند، راحت‌تر
                    ارتباط برقرار کنند و فرصت‌های بیشتری برای رشد داشته باشند.
                  </p>

                  <div className="mt-10 flex items-center gap-3 text-cyan-300">
                    <Rocket className="h-6 w-6" />
<span className="font-bold">
                      حرکت به سوی آینده‌ای دیجیتال
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDING MARKET */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-cyan-400">
                تمرکز اولیه سرچینو
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                از بازار ساختمان،
                <span className="block text-blue-400">
                  به یک بازار دیجیتال بزرگ
                </span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-9 text-slate-300">
                سرچینو فعالیت خود را با تمرکز بر حوزه ساختمان و کالاها و خدمات
                مرتبط با آن آغاز کرده است؛ حوزه‌ای گسترده که در آن پیدا کردن
                تأمین‌کننده مناسب، مقایسه گزینه‌ها و برقراری ارتباط با فروشندگان
                می‌تواند زمان‌بر باشد.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-300">
                چشم‌انداز ما این است که با توسعه این زیرساخت، دامنه فعالیت
                سرچینو گسترده‌تر شود و این پلتفرم به بستری برای جست‌وجو و معرفی
                طیف وسیعی از کالاها و خدمات تبدیل شود.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "مصالح ساختمانی",
              "تجهیزات و تأسیسات",
              "درب و پنجره",
              "خدمات تخصصی",
            ].map((item) => (
              <div
  key={item}
  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
>
  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
  <span className="font-bold">{item}</span>
</div>

