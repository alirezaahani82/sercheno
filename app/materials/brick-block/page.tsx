import Link from "next/link";
import { ArrowRight, MapPin, Search, ShieldCheck, Star } from "lucide-react";

export default function BrickBlockPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="سرچنو"
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
            href="/materials"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به مصالح
          </Link>

        </div>
      </header>


      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="relative h-[420px]">

          <img
            src="/materials/brick-block.jpg"
            alt="آجر بلوک و سفال ساختمانی"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/60 to-slate-950/20" />

          <div className="absolute inset-0 flex items-center">

            <div className="mx-auto w-full max-w-7xl px-5 text-white">

              <div className="max-w-2xl">

                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                  مصالح ساختمانی
                </span>

                <h1 className="mt-5 text-4xl font-black sm:text-6xl">
                  آجر، بلوک و سفال
                </h1>

                <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
                  انواع آجر، بلوک و سفال ساختمانی را از فروشندگان و
                  تأمین‌کنندگان معتبر در سرچنو پیدا کنید.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    آجر ساختمانی
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    بلوک سیمانی
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    بلوک سبک
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    سفال
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Search */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                placeholder="مثلاً آجر فشاری، بلوک سبک، سفال ۱۵..."
                className="w-full bg-transparent outline-none"
              />

            </div>

            <button className="rounded-2xl bg-blue-700 px-8 py-4 font-black text-white hover:bg-blue-800">
              جست‌وجو
            </button>

          </div>

        </div>

      </section>


      {/* Sub Categories */}
      <section className="mx-auto max-w-7xl px-5 pb-14">

        <div className="mb-7">
          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            چه نوع مصالحی نیاز دارید؟
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "آجر ساختمانی",
            "آجر فشاری",
            "بلوک سیمانی",
            "بلوک سبک",
            "بلوک هبلکس",
            "سفال دیواری",
            "سفال سقفی",
            "آجر نما",
          ].map((item) => (
            <button
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-right font-bold transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              {item}
            </button>
          ))}

        </div>

      </section>


      {/* Sellers */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8">

            <span className="text-sm font-bold text-emerald-600">
              فروشندگان
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              تأمین‌کنندگان آجر، بلوک و سفال
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              فروشندگان و تأمین‌کنندگان این دسته را در شهرهای مختلف پیدا کنید.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {[
              "مصالح ساختمانی سهند",
              "فروش مصالح تبریز",
              "بلوک و سفال آذربایجان",
            ].map((seller) => (

              <div
                key={seller}
                className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                    🧱
                  </div>

                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    <ShieldCheck className="h-3 w-3" />
                    تأییدشده
                  </span>

                </div>

                <h3 className="mt-5 font-black">
                  {seller}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  فروشنده آجر، بلوک و سفال ساختمانی
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">

                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    تبریز
                  </span>

                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    ۴.۸
                  </span>

                </div>

                <button className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  مشاهده فروشگاه
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-slate-950 py-10 text-center text-sm text-slate-400">

        <div className="mx-auto max-w-7xl px-5">

          <div className="font-black text-white">
            سرچنو
          </div>

          <p className="mt-2">
            بازار هوشمند ساخت‌وساز
          </p>

          <p className="mt-5 text-xs">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </p>

        </div>

      </footer>

    </main>
  );
}
