import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Search,
  Star,
  CheckCircle2,
  Phone,
  Package,
} from "lucide-react";

const materials: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  "ajor-block": {
    title: "آجر و بلوک",
    description:
      "خرید و مقایسه انواع آجر، بلوک و مصالح بنایی از فروشندگان و تأمین‌کنندگان معتبر.",
    image: "/materials/ajor.jpg",
  },

  "cement-concrete": {
    title: "سیمان و بتن",
    description:
      "انواع سیمان، بتن آماده و محصولات مرتبط با اجرای پروژه‌های ساختمانی.",
    image: "/materials/cement.jpg",
  },

  "tile-ceramic": {
    title: "کاشی و سرامیک",
    description:
      "مقایسه و خرید انواع کاشی، سرامیک و محصولات پوششی ساختمان.",
    image: "/materials/tile.jpg",
  },

  stone: {
    title: "سنگ ساختمانی",
    description:
      "انواع سنگ نما، تراورتن، مرمریت، گرانیت و سنگ‌های ساختمانی.",
    image: "/materials/stone.jpg",
  },

  "iron-steel": {
    title: "آهن و فولاد",
    description:
      "خرید انواع میلگرد، تیرآهن، نبشی، ناودانی و محصولات فولادی.",
    image: "/materials/steel.jpg",
  },

  "doors-windows": {
    title: "درب و پنجره",
    description:
      "انواع درب و پنجره UPVC، آلومینیومی، شیشه‌ای و یراق‌آلات ساختمانی.",
    image: "/materials/doors-windows.jpg",
  },

  paint: {
    title: "رنگ و پوشش",
    description:
      "انواع رنگ ساختمانی، پوشش‌های محافظ، رنگ نما و محصولات مرتبط.",
    image: "/materials/paint.jpg",
  },

  "pipes-fittings": {
    title: "لوله و اتصالات",
    description:
      "انواع لوله، اتصالات و تجهیزات مورد استفاده در ساختمان.",
    image: "/materials/pipes.jpg",
  },

  "electricity-lighting": {
    title: "برق و روشنایی",
    description:
      "تجهیزات برق ساختمان، روشنایی، کلید و پریز و تجهیزات الکتریکی.",
    image: "/materials/electricity.jpg",
  },

  "mechanical-installations": {
    title: "تأسیسات مکانیکی",
    description:
      "تجهیزات گرمایشی، سرمایشی، آبرسانی و تأسیسات مکانیکی ساختمان.",
    image: "/materials/mechanical.jpg",
  },

  insulation: {
    title: "عایق و ایزوگام",
    description:
      "انواع عایق‌های ساختمانی، ایزوگام و محصولات آب‌بندی.",
    image: "/materials/insulation.jpg",
  },

  "interior-decoration": {
    title: "دکوراسیون داخلی",
    description:
      "محصولات و تجهیزات مورد استفاده در طراحی و اجرای دکوراسیون داخلی.",
    image: "/materials/interior.jpg",
  },
};

const sampleProducts = [
  {
    title: "محصول نمونه",
    seller: "فروشگاه نمونه",
    city: "تبریز",
    rating: "۴.۸",
  },
  {
    title: "محصول ساختمانی",
    seller: "تأمین‌کننده نمونه",
    city: "تبریز",
    rating: "۴.۹",
  },
  {
    title: "محصول باکیفیت",
    seller: "فروشگاه مصالح",
    city: "تبریز",
    rating: "۴.۷",
  },
];

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const material = materials[slug];

  if (!material) {
    notFound();
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
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

          <Link
            href="/register"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
          >
            ثبت فروشگاه
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}

      <div className="mx-auto max-w-7xl px-5 pt-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Link
            href="/materials"
            className="hover:text-blue-700"
          >
            مصالح و تجهیزات
          </Link>

          <ArrowRight className="h-4 w-4" />

          <span className="font-bold text-slate-800">
            {material.title}
          </span>

        </div>
      </div>

      {/* Hero */}

      <section className="mx-auto max-w-7xl px-5 py-8">

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900">

          <div className="absolute inset-0">

            <img
              src={material.image}
              alt={material.title}
              className="h-full w-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/75 to-slate-900/40" />

          </div>

          <div className="relative px-7 py-20 sm:px-12 sm:py-28">

            <div className="max-w-2xl text-white">

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                بازار تخصصی سرچنو
              </span>

              <h1 className="mt-5 text-4xl font-black sm:text-6xl">
                {material.title}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-8 text-blue-100 sm:text-base">
                {material.description}
              </p>

              {/* Search */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-800">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    placeholder={`جست‌وجو در ${material.title}...`}
                    className="w-full bg-transparent text-sm outline-none"
                  />

                </div>

                <button className="rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white hover:bg-blue-500">
                  جست‌وجو
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-5 py-12">

        <div className="mb-8">

          <span className="text-sm font-bold text-blue-700">
            محصولات
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            محصولات {material.title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            محصولات ثبت‌شده توسط فروشندگان و تأمین‌کنندگان سرچنو
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {sampleProducts.map((product) => (

            <div
              key={product.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-52 items-center justify-center bg-slate-100">

                <Package className="h-16 w-16 text-slate-300" />

              </div>

              <div className="p-5">

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {material.title}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">

                    <Star className="h-4 w-4 fill-current" />

                    {product.rating}

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

                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">

                  <CheckCircle2 className="h-4 w-4" />

                  تأمین‌کننده تأییدشده

                </div>

                <button className="mt-5 w-full rounded-xl bg-slate-100 py-3 text-sm font-bold transition hover:bg-blue-700 hover:text-white">
                  مشاهده محصول
                </button>

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* Seller CTA */}

      <section className="mx-auto max-w-7xl px-5 pb-16">

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-blue-700 to-blue-950 px-7 py-14 text-center text-white">

          <h2 className="text-2xl font-black sm:text-3xl">
            فروشنده {material.title} هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولات خود را به مشتریان
            جدید معرفی کنید.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800 hover:bg-blue-50"
          >
            ثبت فروشگاه
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-950 py-10 text-center text-sm text-slate-400">

        <div className="mx-auto max-w-7xl px-5">

          <p className="font-bold text-white">
            سرچنو — بازار هوشمند ساخت‌وساز
          </p>

          <p className="mt-3">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </p>

        </div>

      </footer>

    </main>
  );
}
