"use client";

import Link from "next/link";

const materialCategories = [
  {
    slug: "brick-block",
    title: "آجر، بلوک و سفال",
    count: "۱۲۴ فروشنده",
    image: "/materials/brick-block.jpg",
  },
  {
    slug: "cement-concrete",
    title: "سیمان و بتن",
    count: "۸۶ فروشنده",
    image: "/materials/cement-concrete.jpg",
  },
  {
    slug: "doors-windows",
    title: "درب و پنجره",
    count: "۷۴ فروشنده",
    image: "/materials/doors-windows.jpg",
  },
  {
    slug: "electrical-lighting",
    title: "برق و روشنایی",
    count: "۵۸ فروشنده",
    image: "/materials/electrical-lighting.jpg",
  },
  {
    slug: "insulation",
    title: "عایق و ایزوگام",
    count: "۳۶ فروشنده",
    image: "/materials/insulation.jpg",
  },
  {
    slug: "interior-decoration",
    title: "دکوراسیون داخلی",
    count: "۸۲ فروشنده",
    image: "/materials/interior-decoration.jpg",
  },
  {
    slug: "iron-steel",
    title: "آهن و فولاد",
    count: "۱۵۶ فروشنده",
    image: "/materials/iron-steel.jpg",
  },
  {
    slug: "mechanical-installations",
    title: "تأسیسات مکانیکی",
    count: "۴۷ فروشنده",
    image: "/materials/mechanical-installations.jpg",
  },
  {
    slug: "paint-coatings",
    title: "رنگ و پوشش",
    count: "۶۳ فروشنده",
    image: "/materials/paint-coatings.jpg",
  },
  {
    slug: "plumbing-pipes",
    title: "لوله و اتصالات",
    count: "۹۱ فروشنده",
    image: "/materials/plumbing-pipes.jpg",
  },
  {
    slug: "sanitary",
    title: "شیرآلات و تجهیزات بهداشتی",
    count: "۶۹ فروشنده",
    image: "/materials/sanitary.jpg",
  },
  {
    slug: "stone-tile",
    title: "سنگ نما، کاشی و سرامیک",
    count: "۲۱۸ فروشنده",
    image: "/materials/stone-tile.jpg",
  },
  {
    slug: "elevators",
    title: "آسانسور و تجهیزات ",
    count: "32 فروشنده",
    image: "/materials/elevator-hero.jpg",
  },
];

const serviceCategories = [
  {
    slug: "service",
    title: "بنا و استاد کار",
    count: "اجرا انوع عملیات ساختمانی",
    image: "/materials/bana.jpg",
  },
  {
    icon: "🪟",
    title: "نصاب درب و پنجره",
    text: "UPVC، آلومینیوم و شیشه",
  },
  {
    icon: "⬛",
    title: "نصاب کاشی و سرامیک",
    text: "اجرای حرفه‌ای و دقیق",
  },
  {
    icon: "⚡",
    title: "برق‌کار",
    text: "تأسیسات و برق ساختمان",
  },
  {
    icon: "🔧",
    title: "لوله‌کش",
    text: "تأسیسات آب و فاضلاب",
  },
  {
    icon: "🔥",
    title: "جوشکار",
    text: "انواع جوشکاری ساختمانی",
  },
  {
    icon: "🎨",
    title: "نقاش ساختمان",
    text: "رنگ‌آمیزی و دکوراسیون",
  },
  {
    icon: "🧰",
    title: "سایر متخصصان",
    text: "متخصص مورد نظر خود را پیدا کنید",
  },
];

const popularServices = [
  "نصاب کاشی و سرامیک",
  "نصاب درب و پنجره",
  "بنا",
  "جوشکار",
  "برق‌کار",
  "لوله‌کش",
];

export default function Home() {
  return (
    <main
      dir="rtl"
      id="home"
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
            <Link href="/" className="font-bold text-blue-700">
              خانه
            </Link>

            <Link
              href="/materials"
              className="hover:text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link
              href="/service"
              className="hover:text-blue-700"
            >
              خدمات ساختمانی
            </Link>

            <Link
              href="/about"
              className="hover:text-blue-700"
            >
              درباره سرچنو
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl transition hover:bg-blue-50 hover:text-blue-700"
              title="سبد خرید"
            >
              🛒
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-black text-white">
                0
              </span>
            </Link>

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block"
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
<section
  id="home"
  className="relative min-h-[650px] overflow-hidden"
>
  {/* Hero Background Image */}
  <div className="absolute inset-0">
    <img
      src="/hero-searchino.jpg"
      alt="سرچنو - بازار هوشمند ساخت‌وساز"
      className="h-full w-full object-cover"
    />

    {/* Dark blue overlay */}
    <div className="absolute inset-0 bg-blue-950/65" />

    {/* Gradient for better readability */}
    <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/55 to-blue-950/30" />
  </div>

  {/* Decorative effects */}
  <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
  <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

  {/* Hero Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:py-32">
    <div className="mx-auto max-w-5xl text-center text-white">

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur-md">
        <span>🚀</span>
        <span>همه چیز برای ساخت‌وساز، در یکجا</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
        هر چیزی برای ساختن،
        <span className="mt-3 block text-cyan-300">
          در سرچنو پیدا کن
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
        مصالح ساختمانی، تجهیزات و متخصصان مورد نیاز پروژه‌تان را
        جست‌وجو کنید، مقایسه کنید و با بهترین گزینه ارتباط بگیرید.
      </p>

      {/* Search Engine */}
      <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/20 bg-white/95 p-3 text-right shadow-2xl backdrop-blur-md">

        {/* Search Type */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-200 p-2 sm:flex">

          <Link
            href="/materials"
            className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800"
          >
            🧱 خرید مصالح
          </Link>

          <Link
            href="/service"
            className="rounded-xl px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            🛠️ دریافت خدمات
          </Link>

        </div>

        {/* Search Fields */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">

          {/* Search Input */}
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">

            <span className="text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="مثلاً سیمان، میلگرد، آسانسور، کاشی یا نصاب..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

          </div>

          {/* City */}
          <select
            className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-700 outline-none sm:w-44"
            defaultValue="تبریز"
          >
            <option value="تبریز">
              📍 تبریز
            </option>

            <option value="تهران">
              تهران
            </option>

            <option value="ارومیه">
              ارومیه
            </option>

            <option value="زنجان">
              زنجان
            </option>

            <option value="همه">
              همه شهرها
            </option>
          </select>

          {/* Search Button */}
          <button
            type="button"
            className="rounded-2xl bg-blue-700 px-10 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            جست‌وجو
          </button>

        </div>
      </div>

      {/* Popular Searches */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-blue-100">

        <span className="px-2 py-2">
          جست‌وجوهای محبوب:
        </span>

        <Link
          href="/materials/stone-tile"
          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
        >
          کاشی ۶۰×۱۲۰
        </Link>

        <Link
          href="/materials/doors-windows"
          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
        >
          پنجره UPVC
        </Link>

        <Link
          href="/materials/iron-steel"
          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
        >
          میلگرد
        </Link>

        <Link
          href="/materials/elevator"
          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
        >
          آسانسور
        </Link>

      </div>

    </div>
  </div>
</section>

      {/* Quick Actions */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl sm:grid-cols-2">
          <div className="border-b border-slate-100 p-7 sm:border-b-0 sm:border-l">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🧱
              </div>

              <div className="flex-1">
                <h3 className="font-black">
                  مصالح و تجهیزات می‌خواهید؟
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  فروشندگان و تأمین‌کنندگان را پیدا کنید.
                </p>
              </div>

              <Link
                href="/materials"
                className="text-sm font-bold text-blue-700 hover:text-blue-800"
              >
                شروع ←
              </Link>
            </div>
          </div>

          <div className="p-7">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                🛠️
              </div>

              <div className="flex-1">
                <h3 className="font-black">
                  نیروی متخصص می‌خواهید؟
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  استادکار و متخصص مناسب پروژه را پیدا کنید.
                </p>
              </div>

              <Link
                href="/service"
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800"
              >
                شروع ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section
        id="materials"
        className="mx-auto max-w-7xl px-5 py-20"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              بازار مصالح
            </span>

            <h2 className="mt-2 text-3xl font-black">
              مصالح و تجهیزات ساختمانی
            </h2>

            <p className="mt-3 text-slate-500">
              دسته‌بندی مورد نیاز پروژه‌تان را انتخاب کنید.
            </p>
          </div>

          <Link
            href="/materials"
            className="hidden font-bold text-blue-700 sm:block"
          >
            مشاهده همه ←
          </Link>
        </div>

        {/* 12 Categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {materialCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/materials/${item.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <h3 className="text-sm font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {item.count}
                </p>

                <div className="mt-4 text-xs font-bold text-blue-700 opacity-0 transition group-hover:opacity-100">
                  ورود به دسته ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600">
                خدمات ساختمانی
              </span>

              <h2 className="mt-2 text-3xl font-black">
                متخصص مورد نیاز پروژه‌تان را پیدا کنید
              </h2>

              <p className="mt-3 text-slate-500">
                از استادکار و بنا تا نصاب، جوشکار و متخصصان فنی.
              </p>
            </div>

            <Link
              href="/service"
              className="hidden font-bold text-emerald-600 sm:block"
            >
              همه خدمات ←
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((service) => (
              <Link
                href="/service"
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {service.icon}
                </div>

                <h3 className="mt-5 font-black">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {service.text}
                </p>

                <div className="mt-5 text-sm font-bold text-emerald-600">
                  مشاهده متخصصان ←
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-cyan-300">
                خدمات پرتقاضا
              </span>

              <h2 className="mt-4 text-3xl font-black leading-relaxed">
                دنبال متخصص خاصی هستید؟
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                نوع خدمت مورد نیازتان را انتخاب کنید و متخصصان فعال در
                شهر خود را پیدا کنید.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {popularServices.map((service) => (
                  <Link
                    key={service}
                    href="/service"
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 text-slate-900">
              <h3 className="text-xl font-black">
                درخواست خدمات خود را ثبت کنید
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                پروژه‌تان را توضیح دهید تا متخصصان مناسب شما را پیدا کنند.
              </p>

              <div className="mt-5 space-y-3">
                <input
                  type="text"
                  placeholder="مثلاً نصب ۲۰۰ متر کاشی"
                  className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none">
                  <option>انتخاب شهر</option>
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                </select>

                <Link
                  href="/service"
                  className="block w-full rounded-xl bg-blue-700 py-4 text-center font-bold text-white hover:bg-blue-800"
                >
                  ثبت درخواست خدمات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Section */}
      <section id="providers" className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold text-blue-700">
              به سرچنو بپیوندید
            </span>

            <h2 className="mt-3 text-3xl font-black">
              کسب‌وکار یا مهارت خود را در سرچنو معرفی کنید
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              چه فروشنده مصالح باشید و چه استادکار و متخصص ساختمانی،
              می‌توانید در سرچنو خدمات و محصولات خود را به مشتریان
              معرفی کنید.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/store/register"
              className="block rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🏪
              </div>

              <h3 className="mt-6 text-2xl font-black">
                فروشنده یا تأمین‌کننده هستید؟
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                فروشگاه و محصولات خود را ثبت کنید و مشتریان جدید پیدا کنید.
              </p>

              <div className="mt-7 inline-block rounded-xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:bg-blue-800">
                ثبت فروشگاه
              </div>
            </Link>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                👷
              </div>

              <h3 className="mt-6 text-2xl font-black">
                استادکار یا ارائه‌دهنده خدمات هستید؟
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                تخصص، سابقه کار، نمونه‌کار و محدوده فعالیت خود را ثبت کنید
                و مشتریان جدید بگیرید.
              </p>

              <Link
                href="/service/register"
                className="mt-7 inline-block rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700"
              >
                ثبت خدمات و تخصص
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <span className="text-sm font-bold text-blue-700">
            ساده و سریع
          </span>

          <h2 className="mt-3 text-3xl font-black">
            سرچنو چطور کار می‌کند؟
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            [
              "۱",
              "جست‌وجو کنید",
              "محصول یا خدمت مورد نیاز خود را جست‌وجو کنید.",
            ],
            [
              "۲",
              "مقایسه کنید",
              "گزینه‌های مختلف را بررسی و مقایسه کنید.",
            ],
            [
              "۳",
              "انتخاب کنید",
              "فروشنده یا متخصص مناسب را انتخاب کنید.",
            ],
            [
              "۴",
              "ارتباط بگیرید",
              "برای خرید یا دریافت خدمات اقدام کنید.",
            ],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="rounded-3xl border border-slate-200 bg-white p-7 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 font-black text-white">
                {number}
              </div>

              <h3 className="mt-5 font-black">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-blue-700 to-blue-900 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-black">
            پروژه ساخت‌وسازتان را ساده‌تر شروع کنید
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            در سرچنو، مصالح و تجهیزات مورد نیازتان را پیدا کنید و
            متخصصان مناسب پروژه را به‌راحتی پیدا کنید.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/materials"
              className="rounded-xl bg-white px-8 py-4 text-center font-black text-blue-800"
            >
              جست‌وجوی مصالح
            </Link>

            <Link
              href="/service"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-center font-black text-white"
            >
              پیدا کردن متخصص
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
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
                  href="/store/register"
                  className="block hover:text-white"
                >
                  ثبت فروشگاه
                </Link>

                <Link
                  href="/service/register"
                  className="block hover:text-white"
                >
                  ثبت خدمات
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

                <Link
                  href="/contact"
                  className="block hover:text-white"
                >
                  تماس با ما
                </Link>

                <Link
                  href="/terms"
                  className="block hover:text-white"
                >
                  قوانین و مقررات
                </Link>

                <Link
                  href="/support"
                  className="block hover:text-white"
                >
                  پشتیبانی
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-slate-500">
            <p>© ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.</p>

            <p className="mt-2">
              شرکت امیر توان پویای گستر
            </p>

            <p className="mt-1">
              مؤسس: علیرضا آهنی
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
