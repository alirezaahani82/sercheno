import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowLeft,
  Star,
  CheckCircle2,
  Package,
  Building2,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const categories = [
  "همه",
  "میلگرد",
  "تیرآهن",
  "نبشی",
  "ناودانی",
  "قوطی و پروفیل",
  "ورق فولادی",
  "وال‌پست",
  "لوله فولادی",
  "تسمه",
  "پلیت و صفحه ستون",
  "پیچ و مهره",
  "مفتول و سیم آرماتوربندی",
  "مش و شبکه",
];

const products = [
  {
    title: "میلگرد آجدار A3",
    type: "میلگرد",
    brand: "ذوب‌آهن اصفهان",
    seller: "آهن‌آلات آذربایجان",
    city: "تبریز",
    rating: "۴.۹",
    image: "/materials/iron/میلگرد.jpg",
  },
  {
    title: "تیرآهن IPE",
    type: "تیرآهن",
    brand: "ذوب‌آهن اصفهان",
    seller: "بازرگانی فولاد تبریز",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/iron/تیرآهن.jpg",
  },
  {
    title: "نبشی بال مساوی",
    type: "نبشی",
    brand: "فولاد ایرانی",
    seller: "فروشگاه آهن شرق",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/iron/نبشی.jpg",
  },
  {
    title: "ناودانی UPN",
    type: "ناودانی",
    brand: "فولاد مبارکه",
    seller: "تأمین فولاد آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/iron/ناودانی.jpg",
  },
  {
    title: "قوطی و پروفیل ساختمانی",
    type: "قوطی و پروفیل",
    brand: "پروفیل ایرانی",
    seller: "پروفیل‌فروشی نوین",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/iron/قوطی-پروفیل.jpg",
  },
  {
    title: "ورق سیاه فولادی",
    type: "ورق فولادی",
    brand: "فولاد مبارکه",
    seller: "بازرگانی فولاد ایران",
    city: "تبریز",
    rating: "۴.۹",
    image: "/materials/iron/ورق-سیاه.jpg",
  },
  {
    title: "وال‌پست منقطع",
    type: "وال‌پست",
    brand: "تولیدکننده ایرانی",
    seller: "مصالح نوین ساختمان",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/iron/وال-پست.jpg",
  },
  {
    title: "لوله فولادی داربستی",
    type: "لوله فولادی",
    brand: "فولاد ایرانی",
    seller: "لوله و پروفیل آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/iron/لوله.jpg",
  },
  {
    title: "پلیت و صفحه ستون",
    type: "پلیت و صفحه ستون",
    brand: "تولید سفارشی",
    seller: "خدمات برش و فولاد تبریز",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/iron/پلیت.jpg",
  },
  {
    title: "مفتول آرماتوربندی",
    type: "مفتول و سیم آرماتوربندی",
    brand: "فولاد ایرانی",
    seller: "تأمین‌کننده مصالح سهند",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/iron/مفتول.jpg",
  },
  {
    title: "مش و شبکه فولادی",
    type: "مش و شبکه",
    brand: "تولیدکننده ایرانی",
    seller: "مش فولادی آذربایجان",
    city: "تبریز",
    rating: "۴.۶",
    image: "/materials/iron/مش.jpg",
  },
  {
    title: "پیچ و مهره سازه‌ای",
    type: "پیچ و مهره",
    brand: "صنعتی",
    seller: "اتصالات سازه تبریز",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/iron/پیچ-مهره.jpg",
  },
];

export default function IronSteelPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-800 to-blue-900">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 lg:py-16">

          {/* فعلاً عکس هدر را آپلود نمی‌کنیم */}
          <div className="mx-auto mb-8 flex h-52 max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">

            <div className="text-center text-white">
              <div className="text-6xl">🏗️</div>

              <p className="mt-4 text-sm text-slate-300">
                محل تصویر آهن و فولاد
              </p>

              <p className="mt-1 text-xs text-slate-400">
                بعداً تصویر واقعی در مسیر
                /public/materials/steel-iron.jpg
                قرار می‌گیرد.
              </p>
            </div>

          </div>

          <div className="mx-auto max-w-4xl text-center text-white">

            <Link
              href="/materials"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به مصالح و تجهیزات
            </Link>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              آهن، فولاد و مقاطع
              <span className="mt-2 block text-cyan-300">
                ساختمانی
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              انواع میلگرد، تیرآهن، نبشی، ناودانی،
              قوطی و پروفیل، ورق، وال‌پست، لوله فولادی
              و سایر محصولات آهن و فولاد را از تأمین‌کنندگان
              سرچنو پیدا کنید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 text-right shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="مثلاً میلگرد، تیرآهن، وال‌پست، پروفیل..."
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

                <button className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white transition hover:bg-blue-800">
                  جست‌وجو
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-6">

          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی آهن‌آلات
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            محصول مورد نیاز خود را انتخاب کنید
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            از میلگرد و تیرآهن تا وال‌پست و اتصالات سازه‌ای
          </p>

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

            <div className="flex items-center justify-between">

              <h3 className="font-black">
                فیلتر محصولات
              </h3>

              <SlidersHorizontal className="h-5 w-5 text-blue-700" />

            </div>

            <div className="mt-7 space-y-6">

              <div>
                <label className="text-sm font-bold">
                  نوع محصول
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه محصولات</option>
                  <option>میلگرد</option>
                  <option>تیرآهن</option>
                  <option>نبشی</option>
                  <option>ناودانی</option>
                  <option>قوطی و پروفیل</option>
                  <option>ورق فولادی</option>
                  <option>وال‌پست</option>
                  <option>لوله فولادی</option>
                  <option>اتصالات</option>

                </select>
              </div>

              <div>

                <label className="text-sm font-bold">
                  استاندارد / گرید
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه</option>
                  <option>A1</option>
                  <option>A2</option>
                  <option>A3</option>
                  <option>A4</option>
                  <option>ST37</option>
                  <option>ST52</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold">
                  کارخانه / برند
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه برندها</option>
                  <option>ذوب‌آهن اصفهان</option>
                  <option>فولاد مبارکه</option>
                  <option>فولاد میانه</option>
                  <option>شاهین بناب</option>
                  <option>ظفر بناب</option>
                  <option>آذرفولاد امین</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold">
                  نحوه فروش
                </label>

                <div className="mt-3 space-y-3 text-sm">

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیلویی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    شاخه‌ای
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    تنی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    عمده
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    خرده
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

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  محصولات آهن و فولاد
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  محصولات ثبت‌شده توسط فروشندگان و تأمین‌کنندگان سرچنو
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

                    <p className="mt-2 text-sm font-bold text-blue-700">
                      {product.brand}
                    </p>

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

      {/* Special section */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-950 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین آهن پروژه
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                تأمین عمده آهن‌آلات ساختمانی
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                برای پروژه‌های ساختمانی می‌توانید انواع
                میلگرد، تیرآهن، پروفیل، ورق، وال‌پست و سایر
                مقاطع فولادی را از تأمین‌کنندگان پیدا کنید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش کیلویی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش شاخه‌ای
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تنی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش عمده
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
                    نیاز به آهن‌آلات پروژه دارید؟
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
            فروشنده یا تأمین‌کننده آهن‌آلات هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولات آهن و
            فولاد خود را به خریداران و سازندگان معرفی کنید.
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

                <Link
                  href="/materials"
                  className="block hover:text-white"
                >
                  مصالح و تجهیزات
                </Link>

                <Link
                  href="/service"
                  className="block hover:text-white"
                >
                  خدمات ساختمانی
                </Link>

                <Link
                  href="/register"
                  className="block hover:text-white"
                >
                  ثبت فروشگاه
                </Link>

              </div>

            </div>

            <div>

              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">

                <Link
                  href="/about"
                  className="block hover:text-white"
                >
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
