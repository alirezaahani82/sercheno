"use client";

import Link from "next/link";
import {
  Search,
  Store,
  Users,
  CheckCircle2,
  Building2,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Rocket,
  Phone,
  MapPin,
  ArrowLeft,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200">
                <Sparkles className="h-4 w-4" />
                آینده خرید و فروش، هوشمندتر از همیشه
              </div>

              <h1 className="text-5xl font-black leading-tight sm:text-6xl">
                به دنیای
                <span className="block text-blue-400">
                  سرچینو
                </span>
                خوش آمدید
              </h1>

              <p className="mt-7 text-lg leading-9 text-slate-300">
                سرچینو یک پلتفرم هوشمند برای جست‌وجو، معرفی، مقایسه و ارتباط
                میان خریداران، فروشندگان، تأمین‌کنندگان و ارائه‌دهندگان خدمات
                است؛ جایی که پیدا کردن آنچه نیاز دارید، ساده‌تر و سریع‌تر
                از همیشه می‌شود.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-900 transition hover:-translate-y-1"
                >
                  شروع جست‌وجو
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-900 p-7">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      تجربه‌ای متفاوت
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      یک جست‌وجو، دنیایی از انتخاب‌ها
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <Search className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Search className="h-6 w-6" />
                    </div>

                    <div>
                      <h4 className="font-bold">جست‌وجو کن</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        نیاز خود را سریع و آسان پیدا کن
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>

                    <div>
                      <h4 className="font-bold">بررسی کن</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        گزینه‌های مناسب را بررسی کن
                      </p>
                    </div>
                  </div>
<div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Users className="h-6 w-6" />
                    </div>

                    <div>
                      <h4 className="font-bold">انتخاب کن</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        با فروشنده یا تأمین‌کننده ارتباط بگیر
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* INTRO */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">

          <span className="font-bold text-blue-600">
            درباره سرچینو
          </span>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            سرچینو؛ پلی میان نیاز و انتخاب
          </h2>

          <p className="mt-7 text-lg leading-9 text-slate-600">
            ما در سرچینو تلاش می‌کنیم مسیر پیدا کردن کالا و خدمات را برای
            مشتریان کوتاه‌تر و مسیر دیده‌شدن و فروش را برای کسب‌وکارها
            هموارتر کنیم. هدف ما ایجاد بستری مدرن و قابل اعتماد است که در
            آن خریدار بتواند راحت‌تر به گزینه‌های مناسب دسترسی پیدا کند
            و فروشنده نیز بتواند کسب‌وکار خود را به مشتریان بیشتری معرفی کند.
          </p>

        </div>
      </section>


      {/* FEATURES */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <span className="font-bold text-blue-600">
              چرا سرچینو؟
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              برای یک تجربه بهتر ساخته شده‌ایم
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <Search className="h-10 w-10 text-blue-600" />

              <h3 className="mt-6 text-xl font-black">
                جست‌وجوی آسان
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                نیاز خود را سریع‌تر پیدا کنید و زمان کمتری برای جست‌وجو
                در بازار صرف کنید.
              </p>
            </div>


            <div className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <Store className="h-10 w-10 text-blue-600" />

              <h3 className="mt-6 text-xl font-black">
                دیده‌شدن کسب‌وکارها
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                فرصتی برای معرفی بهتر محصولات و خدمات و رسیدن به مشتریان جدید.
              </p>
            </div>


            <div className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <ShieldCheck className="h-10 w-10 text-blue-600" />

              <h3 className="mt-6 text-xl font-black">
                شفافیت بیشتر
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                اطلاعات کسب‌وکارها و خدمات در بستری منظم‌تر و قابل دسترس‌تر
                ارائه می‌شود.
              </p>
            </div>


            <div className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <Zap className="h-10 w-10 text-blue-600" />

              <h3 className="mt-6 text-xl font-black">
                ارتباط سریع‌تر
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                فاصله میان مشتری و فروشنده را کاهش می‌دهیم تا ارتباط آسان‌تر
                شکل بگیرد.
              </p>
            </div>

          </div>
        </div>
      </section>
{/* HOW IT WORKS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>

              <span className="font-bold text-blue-600">
                چگونه کار می‌کند؟
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                خرید و پیدا کردن خدمات،
                <span className="block text-blue-600">
                  ساده‌تر از همیشه
                </span>
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-600">
                سرچینو با هدف ساده‌سازی فرآیند جست‌وجو و ارتباط میان مشتری
                و ارائه‌دهنده کالا یا خدمات طراحی شده است.
              </p>

              <div className="mt-10 space-y-7">

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">
                    ۰۱
                  </div>

                  <div>
                    <h3 className="font-black">
                      نیاز خود را جست‌وجو کنید
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      محصول، کالا یا خدمات مورد نیازتان را در سرچینو پیدا کنید.
                    </p>
                  </div>
                </div>


                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">
                    ۰۲
                  </div>

                  <div>
                    <h3 className="font-black">
                      گزینه‌های مناسب را بررسی کنید
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      کسب‌وکارها و ارائه‌دهندگان مرتبط با نیاز خود را بررسی کنید.
                    </p>
                  </div>
                </div>


                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">
                    ۰۳
                  </div>

                  <div>
                    <h3 className="font-black">
                      انتخاب و ارتباط
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      با گزینه مناسب ارتباط بگیرید و فرآیند خرید یا دریافت
                      خدمات را دنبال کنید.
                    </p>
                  </div>
                </div>

              </div>
            </div>


            <div className="rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-2xl">

              <div className="h-full rounded-[2.8rem] bg-slate-950 p-10 text-white">

                <Target className="h-12 w-12 text-cyan-400" />

                <h3 className="mt-8 text-3xl font-black">
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
      </section>


      {/* BUILDING MARKET */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-14 lg:grid-cols-2">

            <div>
              <span className="font-bold text-cyan-400">
                تمرکز اولیه سرچینو
              </span>
<h2 className="mt-4 text-3xl font-black sm:text-5xl">
                از بازار ساختمان،
                <span className="block text-blue-400">
                  به یک بازار دیجیتال بزرگ
                </span>
              </h2>
            </div>

            <div>

              <p className="text-lg leading-9 text-slate-300">
                سرچینو فعالیت خود را با تمرکز بر حوزه ساختمان و کالاها و
                خدمات مرتبط با آن آغاز کرده است؛ حوزه‌ای گسترده که در آن
                پیدا کردن تأمین‌کننده مناسب، مقایسه گزینه‌ها و برقراری
                ارتباط با فروشندگان می‌تواند زمان‌بر باشد.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-300">
                چشم‌انداز ما این است که با توسعه این زیرساخت، دامنه فعالیت
                سرچینو گسترده‌تر شود و این پلتفرم به بستری برای جست‌وجو و
                معرفی طیف وسیعی از کالاها و خدمات تبدیل شود.
              </p>

            </div>

          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold">
              مصالح ساختمانی
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold">
              تجهیزات و تأسیسات
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold">
              درب و پنجره
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold">
              خدمات تخصصی
            </div>

          </div>

        </div>
      </section>


      {/* COMPANY */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">

          <div className="overflow-hidden rounded-[3rem] border border-slate-200 bg-slate-50 shadow-xl">

            <div className="bg-gradient-to-l from-blue-700 to-indigo-800 p-10 text-white">

              <Building2 className="h-12 w-12 text-cyan-300" />

              <h2 className="mt-7 text-3xl font-black sm:text-4xl">
                سرچینو توسط چه مجموعه‌ای ساخته شده است؟
              </h2>

            </div>

            <div className="p-8 sm:p-14">

              <p className="text-lg leading-10 text-slate-700">
                پلتفرم
                <strong className="mx-1 text-slate-950">
                  سرچینو
                </strong>
                توسط شرکت
                <strong className="mx-1 text-blue-700">
                  امیرتوان پویای گستر
                </strong>
                ایجاد و توسعه یافته است.
              </p>

              <p className="mt-6 text-lg leading-10 text-slate-700">
                ایده‌پردازی، طراحی مدل کسب‌وکار و مدل فروش، طراحی تجربه
                کاربری، مدیریت و هدایت پروژه و همچنین طراحی و برنامه‌نویسی
                صفر تا صد پلتفرم سرچینو، بر عهده مدیرعامل شرکت امیرتوان
                پویای گستر،
                <strong className="mx-1 text-slate-950">
                  علیرضا آهنی
                </strong>
                می‌باشد.
              </p>

              <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">

                <p className="leading-8 text-slate-700">
                  ما باور داریم ساخت یک پلتفرم موفق فقط به برنامه‌نویسی ختم
                  نمی‌شود؛ بلکه ترکیبی از شناخت بازار، ایده‌پردازی، طراحی،
                  فناوری، مدیریت و ایجاد یک تجربه ارزشمند برای کاربر است.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* VISION */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <Rocket className="mx-auto h-12 w-12 text-blue-600" />

          <h2 className="mt-7 text-3xl font-black sm:text-5xl">
            چشم‌انداز ما
          </h2>
<p className="mt-7 text-xl leading-10 text-slate-600">
            ما می‌خواهیم سرچینو به جایی تبدیل شود که هر زمان فردی به دنبال
            یک کالا، محصول، فروشنده، تأمین‌کننده یا ارائه‌دهنده خدمات است،
            بتواند با چند کلیک به گزینه‌های مناسب دسترسی پیدا کند.
          </p>

          <p className="mt-6 text-2xl font-black leading-relaxed">
            سرچینو؛ جایی برای پیدا کردن، انتخاب کردن و ارتباط گرفتن.
          </p>

        </div>
      </section>


      {/* CONTACT */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <span className="font-bold text-cyan-400">
                با ما در ارتباط باشید
              </span>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                آماده‌ایم صدای شما را بشنویم
              </h2>

              <p className="mt-6 text-lg leading-9 text-slate-400">
                برای ارتباط با مجموعه سرچینو و شرکت امیرتوان پویای گستر،
                می‌توانید از اطلاعات زیر استفاده کنید.
              </p>

            </div>


            <div className="space-y-5">

              <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-6">

                <Phone className="mt-1 h-6 w-6 text-cyan-400" />

                <div>

                  <p className="text-sm text-slate-400">
                    شماره تماس
                  </p>

                  <a
                    href="tel:09144389280"
                    className="mt-2 block text-xl font-black"
                    dir="ltr"
                  >
                    09144389280
                  </a>

                </div>

              </div>


              <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-6">

                <MapPin className="mt-1 h-6 w-6 text-cyan-400" />

                <div>

                  <p className="text-sm text-slate-400">
                    آدرس دفتر مرکزی
                  </p>

                  <p className="mt-2 text-lg font-bold leading-8">
                    آذربایجان شرقی، تبریز، ولیعصر، روبه‌روی ساختمان افرا،
                    پلاک ۱۳۹
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-black sm:text-4xl">
            آماده‌ای جست‌وجو را شروع کنی؟
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            به سرچینو برگرد و دنیای جدیدی از انتخاب‌ها را کشف کن.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            ورود به سرچینو
            <ArrowLeft className="h-5 w-5" />
          </Link>

        </div>
      </section>

    </main>
  );
}
