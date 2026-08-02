import Link from "next/link";
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
} from "lucide-react";

const products = [
  {
    title: "پنجره دوجداره UPVC",
    description: "پنجره دوجداره مناسب ساختمان‌های مسکونی و اداری",
    seller: "پنجره‌سازی نوین",
    city: "تبریز",
    rating: "۴.۹",
  },
  {
    title: "درب ورودی ساختمان",
    description: "انواع درب ورودی با امکان سفارش در ابعاد مختلف",
    seller: "درب و پنجره آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
  },
  {
    title: "پنجره آلومینیومی",
    description: "تولید پنجره آلومینیومی در مدل‌های مختلف",
    seller: "آلومینیوم سازان تبریز",
    city: "تبریز",
    rating: "۴.۷",
  },
];

export default function DoorsWindowsPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
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

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link href="/" className="hover:text-blue-700">
              خانه
            </Link>

            <Link
              href="/materials"
              className="font-bold text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link href="/service" className="hover:text-blue-700">
              خدمات ساختمانی
            </Link>

            <Link href="/about" className="hover:text-blue-700">
              درباره سرچنو
            </Link>
          </nav>

          <Link
            href="/register"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          >
            ثبت فروشگاه
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">
            خانه
          </Link>

          <ArrowRight className="h-4 w-4" />

          <Link href="/materials" className="hover:text-blue-700">
            مصالح و تجهیزات
          </Link>

          <ArrowRight className="h-4 w-4" />

          <span className="font-bold text-slate-800">
            درب و پنجره
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 py-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900">

          <img
            src="/materials/doors-windows.jpg"
            alt="درب و پنجره"
            className="h-[360px] w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/50 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-7 sm:px-12">

              <span className="rounded-full bg-blue-600/90 px-4 py-2 text-xs font-bold text-white">
                مصالح و تجهیزات ساختمانی
              </span>

              <h1 className="mt-5 text-3xl font-black text-white sm:text-5xl">
                درب و پنجره
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-200 sm:text-base">
                جست‌وجو و مقایسه انواع درب، پنجره UPVC،
                پنجره آلومینیومی و محصولات مرتبط از فروشندگان
                و تولیدکنندگان در سرچنو.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-5 py-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                placeholder="جست‌وجو در درب و پنجره..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-52">
              <MapPin className="h-5 w-5 text-slate-400" />

              <select className="w-full bg-transparent text-sm outline-none">
                <option>همه شهرها</option>
                <option>تبریز</option>
                <option>تهران</option>
                <option>ارومیه</option>
              </select>
            </div>

            <button className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white hover:bg-blue-800">
              جست‌وجو
            </button>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-8">

        <h2 className="text-2xl font-black">
          دسته‌بندی درب و پنجره
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

          {[
            "پنجره UPVC",
            "پنجره آلومینیومی",
            "درب ورودی",
            "درب داخلی",
          ].map((item) => (
            <button
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-black transition hover:border-blue-300 hover:bg-blue-50"
            >
              {item}
            </button>
          ))}

        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              محصولات
            </span>

            <h2 className="mt-2 text-2xl font-black">
              محصولات درب و پنجره
            </h2>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <div
              key={product.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-52 items-center justify-center bg-slate-100">
                <span className="text-7xl">🪟</span>
              </div>

              <div className="p-5">

                <div className="flex items-center justify-between">

                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {product.rating}
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    درب و پنجره
                  </span>

                </div>

                <h3 className="mt-4 text-lg font-black">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {product.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-4">

                  <p className="text-sm font-bold">
                    {product.seller}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-4 w-4" />
                    {product.city}
                  </div>

                </div>

                <button className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  مشاهده محصول
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Sellers */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">

          <h2 className="text-2xl font-black">
            فروشندگان و تولیدکنندگان درب و پنجره
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {[
              "پنجره‌سازی نوین",
              "درب و پنجره آذربایجان",
              "آلومینیوم سازان تبریز",
            ].map((seller) => (
              <div
                key={seller}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <ShieldCheck className="h-7 w-7 text-blue-700" />
                  </div>

                  <div>
                    <h3 className="font-black">
                      {seller}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      تولیدکننده و تأمین‌کننده
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">

                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    تبریز
                  </span>

                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    ۴.۹
                  </span>

                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold hover:bg-blue-700 hover:text-white">
                  مشاهده فروشگاه
                </button>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        <div className="rounded-[2rem] bg-gradient-to-l from-blue-700 to-blue-950 px-6 py-12 text-center text-white">

          <h2 className="text-2xl font-black">
            فروشنده درب و پنجره هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولاتتان را
            به مشتریان جدید معرفی کنید.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800 hover:bg-blue-50"
          >
            <Phone className="h-5 w-5" />
            ثبت فروشگاه
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-10 text-center text-sm text-slate-400">

        <div className="font-black text-white">
          سرچنو
        </div>

        <p className="mt-2">
          بازار هوشمند ساخت‌وساز
        </p>

        <p className="mt-5 text-xs text-slate-600">
          © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
        </p>

      </footer>
    </main>
  );
}
