"use client";

import Link from "next/link";
const materialCategories = [
  { icon: "🧱", title: "آجر و بلوک", count: "۱۲۴ فروشنده" },
  { icon: "🏗️", title: "سیمان و بتن", count: "۸۶ فروشنده" },
  { icon: "⬛", title: "کاشی و سرامیک", count: "۲۱۸ فروشنده" },
  { icon: "🪨", title: "سنگ ساختمانی", count: "۹۷ فروشنده" },
  { icon: "🔩", title: "آهن و مصالح فلزی", count: "۱۵۶ فروشنده" },
  { icon: "🪟", title: "درب و پنجره", count: "۷۴ فروشنده" },
  { icon: "🎨", title: "رنگ و پوشش", count: "۶۳ فروشنده" },
  { icon: "🔧", title: "تأسیسات و تجهیزات", count: "۱۴۲ فروشنده" },
];

const serviceCategories = [
  { icon: "👷", title: "بنا و استادکار", text: "اجرای انواع عملیات ساختمانی" },
  { icon: "🪟", title: "نصاب درب و پنجره", text: "UPVC، آلومینیوم و شیشه" },
  { icon: "⬛", title: "نصاب کاشی و سرامیک", text: "اجرای حرفه‌ای و دقیق" },
  { icon: "⚡", title: "برق‌کار", text: "تأسیسات و برق ساختمان" },
  { icon: "🔧", title: "لوله‌کش", text: "تأسیسات آب و فاضلاب" },
  { icon: "🔥", title: "جوشکار", text: "انواع جوشکاری ساختمانی" },
  { icon: "🎨", title: "نقاش ساختمان", text: "رنگ‌آمیزی و دکوراسیون" },
  { icon: "🧰", title: "سایر متخصصان", text: "متخصص مورد نظر خود را پیدا کنید" },
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
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="لوگوی سرچینو"
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
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#home" className="text-blue-700">
              خانه
            </a>
            <a href="/materials" className="hover:text-blue-700">
              مصالح و تجهیزات
            </a>
            <a href="#services" className="hover:text-blue-700">
              خدمات ساختمانی
            </a>
            <a href="/materials" className="hover:text-blue-700">
              فروشندگان و متخصصان
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
        className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600"
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl text-center text-white">
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur">
              <span>🚀</span>
              <span>همه چیز برای ساخت‌وساز، در یکجا</span>
            </div>
<h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              هر چیزی برای ساختن،
<br />
              <span className="text-cyan-300">در سرچینو پیدا کن</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              مصالح ساختمانی، تجهیزات و متخصصان مورد نیاز پروژه‌تان را
              جست‌وجو کنید، مقایسه کنید و با بهترین گزینه ارتباط بگیرید.
            </p>

            {/* Search Box */}
            <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-3 shadow-2xl">
              
              <div className="grid grid-cols-2 gap-2 border-b border-slate-100 p-2 sm:flex">
               <a
  href="/materials"
                 className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white"
                 >
                  🧱 خرید مصالح
                </a>

                <a
  href="/service"
  className="rounded-xl px-5 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-100"
>
  🛠️ دریافت خدمات
</a>
                  
                
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="مثلاً کاشی، سیمان، پنجره یا نصاب..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>

                <select className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none">
                  <option>📍 تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                  <option>زنجان</option>
                </select>

                <button className="rounded-2xl bg-blue-700 px-8 py-4 font-bold text-white hover:bg-blue-800">
                  جست‌وجو
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-blue-100">
              <span>جست‌وجوهای محبوب:</span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                کاشی ۶۰×۱۲۰
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                پنجره UPVC
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                نصاب سرامیک
              </span>
            </div>
          </div>
        </div>
      </section>

     {/* Quick Actions */}
<section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
  <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl sm:grid-cols-2">

    {/* Materials Quick Action */}
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

        <a
          href="/materials"
          className="text-sm font-bold text-blue-700 hover:text-blue-800"
        >
          شروع ←
        </a>

      </div>
    </div>

    {/* Services Quick Action */}
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

        <a
          href="/service"
          className="text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          شروع ←
        </a>

      </div>
    </div>

  </div>
</section>
      
{/* Materials */}
      <section id="materials" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              بازار مصالح
            </span>

            <h2 className="mt-2 text-3xl font-black">
              مصالح و تجهیزات ساختمانی
            </h2>

            <p className="mt-3 text-slate-500">
              محصول مورد نیاز پروژه‌تان را از میان فروشندگان پیدا کنید.
            </p>
          </div>

          <a
  href="/materials"
  className="hidden font-bold text-blue-700 sm:block"
>
  مشاهده همه ←
</a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
         {materialCategories.map((item) => (
  <a
    key={item.title}
    href="/materials"
    className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
  >
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition group-hover:bg-blue-50">
      {item.icon}
    </div>

    <h3 className="mt-4 text-sm font-bold">
      {item.title}
    </h3>

    <p className="mt-2 text-xs text-slate-400">
      {item.count}
    </p>
  </a>
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

            <a
  href="/service"
  className="hidden font-bold text-emerald-600 sm:block"
>
  همه خدمات ←
</a>
              
            
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((service) => (
              <div
                key={service.title}
                className="group cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
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
              </div>
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
<button
                    key={service}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                  >
                    {service}
                  </button>
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
                  placeholder="مثلاً نصب ۲۰۰ متر کاشی"
                  className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none">
                  <option>انتخاب شهر</option>
                  <option>تبریز</option>
                  <option>تهران</option>
                  <option>ارومیه</option>
                </select>

                <button className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white hover:bg-blue-800">
                  ثبت درخواست خدمات
                </button>
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
              به سرچینو بپیوندید
            </span>

            <h2 className="mt-3 text-3xl font-black">
              کسب‌وکار یا مهارت خود را در سرچینو معرفی کنید
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              چه فروشنده مصالح باشید و چه استادکار و متخصص ساختمانی،
              می‌توانید در سرچینو خدمات و محصولات خود را به مشتریان
              معرفی کنید.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            
            {/* Seller */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🏪
              </div>

              <a
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
</a>

              <a
  href="/store/register"
  className="mt-7 inline-block rounded-xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:bg-blue-800"
>
  ثبت فروشگاه
</a>
            </div>

            {/* Service Provider */}
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

             <a
  href="/service/register"
  className="mt-7 inline-block rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700"
>
  ثبت خدمات و تخصص
</a> 
                
              
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
            سرچینو چطور کار می‌کند؟
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            ["۱", "جست‌وجو کنید", "محصول یا خدمت مورد نیاز خود را جست‌وجو کنید."],
            ["۲", "مقایسه کنید", "گزینه‌های مختلف را بررسی و مقایسه کنید."],
            ["۳", "انتخاب کنید", "فروشنده یا متخصص مناسب را انتخاب کنید."],
            ["۴", "ارتباط بگیرید", "برای خرید یا دریافت خدمات اقدام کنید."],
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
            در سرچینو، مصالح و تجهیزات مورد نیازتان را پیدا کنید و
            متخصصان مناسب پروژه را به‌راحتی پیدا کنید.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
  href="/materials"
  className="rounded-xl bg-white px-8 py-4 text-center font-black text-blue-800"
>
  جست‌وجوی مصالح
</a>

           <a
  href="/service"
  className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-center font-black text-white"
>
  پیدا کردن متخصص
</a> 
              
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-14">
          
          <div className="grid gap-10 md:grid-cols-4">
            
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="سرچینو"
                  className="h-12 w-12 rounded-xl object-contain"
                />

                <div>
                  <div className="text-xl font-black text-white">
                    سرچینو
                  </div>

                  <div className="text-xs text-slate-500">
                    بازار هوشمند ساخت‌وساز
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان مصالح،
                تأمین‌کنندگان و متخصصان صنعت ساختمان.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                خدمات سرچینو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <a href="/materials" className="block hover:text-white">
  مصالح و تجهیزات
</a>
                <a href="/service" className="block hover:text-white">
  خدمات ساختمانی
</a>
                <a
  href="/store/register"
  className="..."
>
  ثبت فروشگاه
</a>
                <a href="/service/register" className="block hover:text-white">
  ثبت خدمات
</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>
<div className="mt-5 space-y-3 text-sm">
  <Link href="/about" className="block">
    درباره سرچینو
  </Link>

  <Link href="/contact" className="block">
  تماس با ما
</Link>
  <Link href="/terms" className="block hover:text-white">
    قوانین و مقررات
  </Link>
  <Link href="/support" className="block hover:text-white">
    پشتیبانی
  </Link>
</div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-slate-500">
            © ۱۴۰۵ سرچینو — تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </main>
  );
}
