import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  Star,
  SlidersHorizontal,
  Building2,
  ShoppingBag,
  Phone,
  ShieldCheck,
  Package,
  X,
} from "lucide-react";

const categories = [
  { icon: "🧱", title: "آجر و بلوک", count: "۱۲۴ فروشنده" },
  { icon: "🏗️", title: "سیمان و بتن", count: "۸۶ فروشنده" },
  { icon: "⬛", title: "کاشی و سرامیک", count: "۲۱۸ فروشنده" },
  { icon: "🪨", title: "سنگ ساختمانی", count: "۹۷ فروشنده" },
  { icon: "🔩", title: "آهن و فولاد", count: "۱۵۶ فروشنده" },
  { icon: "🪟", title: "درب و پنجره", count: "۷۴ فروشنده" },
  { icon: "🎨", title: "رنگ و پوشش", count: "۶۳ فروشنده" },
  { icon: "🚰", title: "لوله و اتصالات", count: "۹۱ فروشنده" },
  { icon: "⚡", title: "برق و روشنایی", count: "۵۸ فروشنده" },
  { icon: "❄️", title: "تأسیسات مکانیکی", count: "۴۷ فروشنده" },
  { icon: "🏠", title: "عایق و ایزوگام", count: "۳۶ فروشنده" },
  { icon: "✨", title: "دکوراسیون داخلی", count: "۸۲ فروشنده" },
];

const products = [
  {
    title: "کاشی پرسلان ۶۰×۱۲۰",
    category: "کاشی و سرامیک",
    seller: "فروشگاه کاشی آذران",
    city: "تبریز",
    rating: "۴.۸",
    verified: true,
    image: "⬛",
  },
  {
    title: "پنجره دوجداره UPVC",
    category: "درب و پنجره",
    seller: "پنجره‌سازی نوین",
    city: "تبریز",
    rating: "۴.۹",
    verified: true,
    image: "🪟",
  },
  {
    title: "سیمان تیپ ۲",
    category: "سیمان و بتن",
    seller: "مصالح ساختمانی سهند",
    city: "تبریز",
    rating: "۴.۷",
    verified: true,
    image: "🏗️",
  },
  {
    title: "سنگ تراورتن نما",
    category: "سنگ ساختمانی",
    seller: "سنگبری آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    verified: true,
    image: "🪨",
  },
];

const sellers = [
  {
    name: "مصالح ساختمانی سهند",
    type: "تأمین‌کننده مصالح ساختمانی",
    city: "تبریز",
    rating: "۴.۹",
    products: "۸۶ محصول",
  },
  {
    name: "فروشگاه کاشی آذران",
    type: "فروشنده کاشی و سرامیک",
    city: "تبریز",
    rating: "۴.۸",
    products: "۱۲۴ محصول",
  },
  {
    name: "پنجره‌سازی نوین",
    type: "تولیدکننده درب و پنجره",
    city: "تبریز",
    rating: "۴.۹",
    products: "۳۸ محصول",
  },
];

export default function MaterialsPage() {
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
              <div className="text-2xl font-black tracking-tight text-blue-700">
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

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 sm:block"
            >
              ورود
            </Link>
<Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl text-center text-white">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur">
              <ShoppingBag className="h-4 w-4" />
              بازار مصالح و تجهیزات ساختمانی
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              مصالح مورد نیاز پروژه‌تان را
              <span className="mt-2 block text-cyan-300">
                در سرچنو پیدا کنید
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              بین صدها فروشنده و تأمین‌کننده جست‌وجو کنید،
              محصولات را مقایسه کنید و مستقیماً با فروشنده ارتباط بگیرید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-9 rounded-3xl bg-white p-3 text-right shadow-2xl">
              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="نام محصول یا مصالح را جست‌وجو کنید..."
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

            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-blue-100">
              <span>جست‌وجوهای محبوب:</span>

              <button className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
                کاشی ۶۰×۱۲۰
              </button>

              <button className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
                سیمان
              </button>

              <button className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
                پنجره UPVC
              </button>

              <button className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
                سنگ نما
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              دسته‌بندی مصالح
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              چه چیزی نیاز دارید؟
            </h2>
<p className="mt-3 text-sm text-slate-500">
              دسته‌بندی مورد نظر خود را انتخاب کنید.
            </p>
          </div>

          <button className="hidden items-center gap-2 text-sm font-bold text-blue-700 sm:flex">
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.title}
              className="group rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition group-hover:bg-blue-50">
                {category.icon}
              </div>

              <h3 className="mt-4 text-sm font-black">
                {category.title}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                {category.count}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600">
                محصولات پیشنهادی
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                مصالح پرطرفدار
              </h2>
            </div>

            <button className="hidden text-sm font-bold text-blue-700 sm:block">
              مشاهده همه ←
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex h-48 items-center justify-center bg-slate-100 text-7xl">
                  {product.image}
                </div>

                <div className="p-5">

                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {product.category}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {product.rating}
                    </div>
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

                  {product.verified && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      تأمین‌کننده تأییدشده
                    </div>
                  )}

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-700 hover:text-white">
                    مشاهده جزئیات
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Marketplace */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Filters */}
          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 lg:block">

            <div className="flex items-center justify-between">
              <h3 className="font-black">
                فیلتر نتایج
              </h3>

              <SlidersHorizontal className="h-5 w-5 text-blue-700" />
            </div>

            <div className="mt-7 space-y-6">

              <div>
                <label className="text-sm font-bold">
                  دسته‌بندی
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">
                  <option>همه دسته‌بندی‌ها</option>
                  <option>کاشی و سرامیک</option>
                  <option>سیمان و بتن</option>
                  <option>سنگ ساختمانی</option>
                  <option>درب و پنجره</option>
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

              <div className="border-t border-slate-100 pt-5">

                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded"
                  />

                  فقط تأمین‌کنندگان تأییدشده
                </label>

              </div>

            </div>
          </aside>

          {/* Sellers */}
          <div>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-2xl font-black">
                  تأمین‌کنندگان برتر
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  بهترین فروشندگان و تأمین‌کنندگان مصالح در سرچنو
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold">
                مرتب‌سازی
                <ChevronDown className="h-4 w-4" />
              </button>

            </div>

            <div className="space-y-4">

              {sellers.map((seller) => (
                <div
                  key={seller.name}
                  className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                      <Building2 className="h-8 w-8 text-blue-700" />
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black">
                          {seller.name}
                        </h3>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          <ShieldCheck className="h-3 w-3" />
                          تأییدشده
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {seller.type}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
<span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {seller.city}
                        </span>

                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          {seller.rating}
                        </span>

                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {seller.products}
                        </span>

                      </div>
                    </div>

                    <button className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                      مشاهده فروشگاه
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-blue-700 to-blue-950 px-6 py-14 text-center text-white">

          <div className="mx-auto max-w-3xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              فروشنده یا تأمین‌کننده مصالح هستید؟
            </h2>

            <p className="mt-4 leading-8 text-blue-100">
              فروشگاه خود را در سرچنو ثبت کنید و محصولات و خدمات خود را
              به مشتریان جدید معرفی کنید.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/register"
                className="rounded-xl bg-white px-8 py-4 font-black text-blue-800 transition hover:bg-blue-50"
              >
                ثبت فروشگاه
              </Link>

              <Link
                href="/about"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white"
              >
                درباره سرچنو
              </Link>

            </div>

          </div>
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
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان مصالح،
                تأمین‌کنندگان و متخصصان صنعت ساختمان.
              </p>

            </div>

            <div>
              <h3 className="font-bold text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link href="/materials" className="block hover:text-white">
                  مصالح و تجهیزات
                </Link>

                <Link href="/service" className="block hover:text-white">
                  خدمات ساختمانی
                </Link>

                <Link href="/register" className="block hover:text-white">
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

                <p>تماس با ما</p>
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
