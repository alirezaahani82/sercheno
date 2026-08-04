import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowLeft,
  Star,
  CheckCircle2,
  ShieldCheck,
  Package,
  Building2,
  Phone,
} from "lucide-react";

const products = [
  {
    title: "سیمان تیپ ۲",
    type: "سیمان کیسه‌ای",
    seller: "مصالح ساختمانی سهند",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/cement-type2.jpg",
  },
  {
    title: "سیمان فله‌ای",
    type: "سیمان فله",
    seller: "تأمین مصالح آذربایجان",
    city: "تبریز",
    rating: "۴.۹",
    image: "/materials/cement-bulk.jpg",
  },
  {
    title: "سیمان سفید",
    type: "سیمان سفید",
    seller: "مصالح ساختمانی تبریز",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/white-cement.jpg",
  },
  {
    title: "گچ ساختمانی",
    type: "گچ",
    seller: "گچ و مصالح سهند",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/plaster.jpg",
  },
  {
    title: "گچ پلیمری",
    type: "گچ پلیمری",
    seller: "تأمین مصالح نوین",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/polymer-plaster.jpg",
  },
  {
    title: "پودر سنگ",
    type: "پودر سنگ",
    seller: "سنگبری آذربایجان",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/stone-powder.jpg",
  },
  {
    title: "سنگ‌پی",
    type: "سنگ‌پی و مصالح زیرسازی",
    seller: "مصالح ساختمانی سهند",
    city: "تبریز",
    rating: "۴.۶",
    image: "/materials/stone-pi.jpg",
  },
  {
    title: "ماسه شسته",
    type: "ماسه",
    seller: "شن و ماسه آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/washed-sand.jpg",
  },
];

const categories = [
  "همه",
  "سیمان کیسه‌ای",
  "سیمان فله",
  "سیمان سفید",
  "گچ",
  "گچ پلیمری",
  "پودر سنگ",
  "سنگ‌پی",
  "ماسه",
  "شن",
  "مصالح زیرسازی",
];

export default function CementPage() {
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
            <Link href="/">خانه</Link>

            <Link
              href="/materials"
              className="font-bold text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link href="/service">
              خدمات ساختمانی
            </Link>

            <Link href="/about">
              درباره سرچنو
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold sm:block"
            >
              ورود
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </header>
{/* Hero */}
<section className="relative min-h-[420px] overflow-hidden">

  {/* تصویر واقعی سیمان */}
  <img
    src="/materials/cement-concrete.jpg"
    alt="سیمان و مصالح ساختمانی"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* لایه تیره روی تصویر */}
  <div className="absolute inset-0 bg-blue-950/75" />

  {/* افکت‌های نوری */}
  <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

  <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

  {/* محتوای Hero */}
  <div className="relative mx-auto max-w-7xl px-5 py-14 lg:py-20">

    <div className="mx-auto max-w-4xl text-center text-white">

      <Link
        href="/materials"
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur"
      >
        <ArrowLeft className="h-4 w-4" />
        بازگشت به مصالح و تجهیزات
      </Link>

      <h1 className="text-3xl font-black leading-tight sm:text-5xl">
        سیمان، گچ و مصالح
        <span className="mt-2 block text-cyan-300">
          ساختمانی
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
        انواع سیمان، سیمان فله‌ای، گچ، پودر سنگ،
        سنگ‌پی، ماسه و سایر مصالح مورد نیاز پروژه‌های
        ساختمانی را از تأمین‌کنندگان پیدا کنید.
      </p>

      {/* Search */}
      <div className="mx-auto mt-8 rounded-3xl bg-white p-3 shadow-2xl">
        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="مثلاً سیمان تیپ ۲، گچ، ماسه شسته..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 lg:w-48">
            <MapPin className="h-5 w-5 text-slate-400" />

            <select className="w-full bg-transparent text-sm text-slate-700 outline-none">
              <option>تبریز</option>
              <option>تهران</option>
              <option>ارومیه</option>
              <option>زنجان</option>
              <option>همه شهرها</option>
            </select>
          </div>

          <button className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white hover:bg-blue-800">
            جست‌وجو
          </button>

        </div>
      </div>

    </div>
  </div>
</section>
      {/* Category buttons */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-6">
          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            مصالح مورد نیاز خود را انتخاب کنید
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                index === 0
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Filters */}
          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 lg:block">

            <h3 className="font-black">
              فیلتر محصولات
            </h3>

            <div className="mt-7 space-y-6">

              <div>
                <label className="text-sm font-bold">
                  نوع مصالح
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">
                  <option>همه موارد</option>
                  <option>سیمان کیسه‌ای</option>
                  <option>سیمان فله</option>
                  <option>گچ</option>
                  <option>پودر سنگ</option>
                  <option>سنگ‌پی</option>
                  <option>ماسه</option>
                  <option>شن</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold">
                  شهر
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">
                  <option>همه شهرها</option>
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold">
                  نحوه فروش
                </label>

                <div className="mt-3 space-y-3 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیسه‌ای
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    فله‌ای
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیلویی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    تنی
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                  />

                  فقط تأمین‌کنندگان تأییدشده
                </label>
              </div>

            </div>
          </aside>

          {/* Products */}
          <div>

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  محصولات سیمان و مصالح
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  مشاهده محصولات ثبت‌شده توسط فروشندگان سرچنو
                </p>
              </div>

              <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option>جدیدترین</option>
                <option>بیشترین امتیاز</option>
                <option>ارزان‌ترین</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {products.map((product) => (
                <div
                  key={product.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="relative h-56 overflow-hidden bg-slate-100">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur">
                      {product.type}
                    </div>
                  </div>

                  <div className="p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        {product.rating}
                      </div>

                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                        موجود
                      </span>

                    </div>

                    <h3 className="mt-4 font-black">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {product.seller}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="h-4 w-4" />
                      {product.city}
                    </div>

                    <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                      مشاهده محصول
                      <ArrowLeft className="h-4 w-4" />
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Bulk cement special section */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-900 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                خرید عمده
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                خرید سیمان فله‌ای و مصالح عمده
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                اگر برای پروژه ساختمانی خود به حجم بالایی از
                سیمان، ماسه، شن یا سایر مصالح نیاز دارید،
                تأمین‌کنندگان عمده را در سرچنو پیدا کنید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش کیلویی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تنی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش فله‌ای
                </span>

              </div>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Package className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="font-black">
                    نیاز به تأمین عمده دارید؟
                  </h3>

                  <p className="mt-1 text-sm text-slate-300">
                    با فروشندگان و تأمین‌کنندگان ارتباط بگیرید.
                  </p>
                </div>

              </div>

              <Link
                href="/register"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-black text-blue-900"
              >
                ثبت فروشگاه و محصول
                <ArrowLeft className="h-4 w-4" />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16">

        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-700 px-6 py-14 text-center text-white">

          <Building2 className="mx-auto h-10 w-10" />

          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            فروشنده سیمان، گچ یا مصالح هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولاتتان را
            در معرض دید خریداران و سازندگان قرار دهید.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800"
          >
            ثبت فروشگاه
            <ArrowLeft className="h-4 w-4" />
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">

        <div className="mx-auto max-w-7xl px-5 py-12">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <Link href="/" className="flex items-center gap-3">

                <img
                  src="/logo.png"
                  alt="سرچنو"
                  className="h-12 w-12 rounded-xl object-contain"
                />

                <div>
                  <div className="text-xl font-black text-white">
                    سرچنو
                  </div>

                  <div className="text-xs text-slate-500">
                    بازار هوشمند ساخت‌وساز
                  </div>
                </div>

              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان،
                تأمین‌کنندگان و متخصصان صنعت ساختمان.
              </p>

            </div>

            <div>
              <h3 className="font-bold text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link href="/materials" className="block">
                  مصالح و تجهیزات
                </Link>

                <Link href="/service" className="block">
                  خدمات ساختمانی
                </Link>

                <Link href="/register" className="block">
                  ثبت فروشگاه
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link href="/about" className="block">
                  درباره سرچنو
                </Link>

                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  تماس با ما
                </p>

                <p>قوانین و مقررات</p>
                <p>پشتیبانی</p>
              </div>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </div>

        </div>

      </footer>
    </main>
  );
}
