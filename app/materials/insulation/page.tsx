import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowLeft,
  Star,
  CheckCircle2,
  Package,
  Building2,
  ShieldCheck,
  Phone,
} from "lucide-react";

const products = [
  {
    title: "ایزوگام استاندارد",
    type: "ایزوگام",
    seller: "عایق‌کاری آذربایجان",
    city: "تبریز",
    rating: "۴.۹",
    image: "/materials/insulation/isogam.jpg",
  },
  {
    title: "ایزوگام دولایه",
    type: "ایزوگام",
    seller: "عایق‌گستر تبریز",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/insulation/isogam-double.jpg",
  },
  {
    title: "قیر ساختمانی",
    type: "قیر",
    seller: "تأمین مصالح سهند",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/insulation/bitumen.jpg",
  },
  {
    title: "پشم سنگ تخته‌ای",
    type: "عایق حرارتی",
    seller: "عایق نوین آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/insulation/rockwool.jpg",
  },
  {
    title: "پشم شیشه",
    type: "عایق حرارتی",
    seller: "عایق‌کاران تبریز",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/insulation/glasswool.jpg",
  },
  {
    title: "عایق XPS",
    type: "عایق حرارتی",
    seller: "پارس عایق",
    city: "تبریز",
    rating: "۴.۹",
    image: "/materials/insulation/xps.jpg",
  },
  {
    title: "یونولیت EPS",
    type: "یونولیت",
    seller: "پلاستوفوم آذربایجان",
    city: "تبریز",
    rating: "۴.۶",
    image: "/materials/insulation/eps.jpg",
  },
  {
    title: "عایق الاستومری",
    type: "عایق تأسیسات",
    seller: "عایق‌گستر نوین",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/insulation/elastomeric.jpg",
  },
  {
    title: "فوم عایق ساختمانی",
    type: "فوم",
    seller: "فوم و عایق سهند",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/insulation/foam.jpg",
  },
  {
    title: "ژئوممبران",
    type: "عایق رطوبتی",
    seller: "پوشش آب‌بند آذربایجان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/insulation/geomembrane.jpg",
  },
  {
    title: "چسب آب‌بندی",
    type: "آب‌بندی",
    seller: "مواد شیمیایی ساختمان",
    city: "تبریز",
    rating: "۴.۷",
    image: "/materials/insulation/waterproof-adhesive.jpg",
  },
  {
    title: "مواد آب‌بندی بتن",
    type: "آب‌بندی",
    seller: "تأمین مصالح ساختمان",
    city: "تبریز",
    rating: "۴.۸",
    image: "/materials/insulation/concrete-waterproofing.jpg",
  },
];

const categories = [
  "همه",
  "ایزوگام",
  "قیر",
  "عایق رطوبتی",
  "عایق حرارتی",
  "عایق صوتی",
  "پشم سنگ",
  "پشم شیشه",
  "XPS",
  "EPS و یونولیت",
  "فوم",
  "عایق الاستومری",
  "ژئوممبران",
  "مواد آب‌بندی",
  "چسب آب‌بندی",
];

export default function InsulationPage() {
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
            <Link href="/">
              خانه
            </Link>

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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 lg:py-14">

          {/* تصویر بالای صفحه */}
          <div className="mx-auto mb-8 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">

            <img
              src="/materials/insulation.jpg"
              alt="عایق و ایزوگام ساختمانی"
              className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
            />

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

              عایق، ایزوگام و

              <span className="mt-2 block text-cyan-300">
                آب‌بندی ساختمان
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">

              انواع ایزوگام، قیر، عایق‌های حرارتی و صوتی،
              پشم سنگ، پشم شیشه، XPS، یونولیت، فوم،
              ژئوممبران و محصولات آب‌بندی را از
              تأمین‌کنندگان ساختمانی پیدا کنید.

            </p>

            {/* Search */}
            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="مثلاً ایزوگام، پشم سنگ، XPS، قیر..."
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
            دسته‌بندی
          </span>

          <h2 className="mt-2 text-2xl font-black">
            نوع عایق و مصالح مورد نیاز
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            محصول مورد نظر خود را انتخاب کنید.
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

            <h3 className="font-black">
              فیلتر محصولات
            </h3>

            <div className="mt-7 space-y-6">

              <div>

                <label className="text-sm font-bold">
                  نوع محصول
                </label>

                <select className="mt-3 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none">

                  <option>همه موارد</option>
                  <option>ایزوگام</option>
                  <option>قیر</option>
                  <option>عایق حرارتی</option>
                  <option>عایق صوتی</option>
                  <option>پشم سنگ</option>
                  <option>پشم شیشه</option>
                  <option>XPS</option>
                  <option>EPS</option>
                  <option>فوم</option>
                  <option>ژئوممبران</option>
                  <option>آب‌بندی</option>

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
                  <option>زنجان</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold">
                  نحوه فروش
                </label>

                <div className="mt-3 space-y-3 text-sm">

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    عددی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    متری
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    کیلویی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    تنی
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    عمده
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

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-2xl font-black">
                  محصولات عایق و ایزوگام
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

      {/* Bulk section */}
      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-900 to-blue-950 p-8 text-white lg:p-12">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین عمده
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                خرید عمده عایق و ایزوگام
              </h2>

              <p className="mt-4 leading-8 text-slate-300">

                برای پروژه‌های ساختمانی، عمرانی و صنعتی
                می‌توانید تأمین‌کنندگان عمده ایزوگام،
                قیر، عایق و محصولات آب‌بندی را پیدا کنید.

              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش عمده
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش متری
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش کیلویی
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تنی
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
            فروشنده عایق و ایزوگام هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">

            فروشگاه خود را در سرچنو ثبت کنید و
            محصولات عایق و آب‌بندی خود را
            در معرض دید خریداران قرار دهید.

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

                <p>
                  قوانین و مقررات
                </p>

                <p>
                  پشتیبانی
                </p>

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
