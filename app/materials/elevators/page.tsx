"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Building2,
  ShoppingBag,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string | null;
  category: string | null;
  price: number | null;
  customer_price: number | null;
  cooperation_price: number | null;
  stock: number | null;
  unit: string | null;
  description: string | null;
  seller_id: string | null;
  status: string | null;
  created_at: string | null;
  brand: string | null;
  model: string | null;
  min_order: number | null;
};

type StoreInfo = {
  id: string;
  name: string | null;
};

const elevatorCategories = [
  {
    title: "کابین آسانسور",
    image: "/materials/elevators/elevator-cabin.jpg",
  },
  {
    title: "درب آسانسور",
    image: "/materials/elevators/elevator-door.jpg",
  },
  {
    title: "موتور آسانسور",
    image: "/materials/elevators/elevator-motor.jpg",
  },
  {
    title: "تابلو فرمان",
    image: "/materials/elevators/elevator-control-panel.jpg",
  },
  {
    title: "ریل آسانسور",
    image: "/materials/elevators/elevator-rail.jpg",
  },
  {
    title: "سیم بکسل",
    image: "/materials/elevators/elevator-cable.jpg",
  },
  {
    title: "تجهیزات ایمنی",
    image: "/materials/elevators/elevator-safety.jpg",
  },
  {
    title: "قطعات و لوازم آسانسور",
    image: "/materials/elevators/elevator-parts.jpg",
  },
];

export default function ElevatorsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,category,price,customer_price,cooperation_price,stock,unit,description,seller_id,status,created_at,brand,model,min_order"
        )
        .eq("category", "elevators")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("ELEVATOR PRODUCTS ERROR:", error);
        setProducts([]);
        return;
      }

      setProducts(data || []);

      const sellerIds = [
        ...new Set(
          (data || [])
            .map((product) => product.seller_id)
            .filter(Boolean)
        ),
      ];

      if (sellerIds.length > 0) {
        const { data: storeData, error: storeError } =
          await supabase
            .from("stores")
            .select("id,name")
            .in("id", sellerIds);

        if (storeError) {
          console.error("ELEVATOR STORE ERROR:", storeError);
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach((store: StoreInfo) => {
          storeMap[store.id] = store.name || "فروشگاه";
        });

        setStores(storeMap);
      } else {
        setStores({});
      }
    } catch (error) {
      console.error("ELEVATOR PAGE ERROR:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return true;

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.model?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText)
    );
  });

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
              <div className="text-2xl font-black tracking-tight text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">

            <Link
              href="/"
              className="hover:text-blue-700"
            >
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

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0">

          <img
            src="/materials/elevators-hero.jpg"
            alt="آسانسور و تجهیزات آسانسور"
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-950/80 to-slate-950/70" />

        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-24">

          <div className="max-w-4xl text-white">

            <Link
              href="/materials"
              className="mb-6 inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به مصالح و تجهیزات
            </Link>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur">

              <ShoppingBag className="h-4 w-4" />

              آسانسور و تجهیزات آسانسور

            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">

              تمام تجهیزات آسانسور

              <span className="mt-3 block text-cyan-300">
                در سرچنو
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">

              از کابین و درب آسانسور تا موتور، تابلو فرمان،
              ریل، سیم بکسل، تجهیزات ایمنی و قطعات مورد نیاز
              پروژه‌های آسانسور را از فروشندگان و تأمین‌کنندگان
              پیدا کنید.

            </p>

            {/* Search */}

            <div className="mt-9 rounded-3xl bg-white p-3 text-right shadow-2xl">

              <div className="flex flex-col gap-3 lg:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="مثلاً کابین، موتور، ریل، درب یا تابلو فرمان..."
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

                <button
                  type="button"
                  className="rounded-2xl bg-blue-700 px-10 py-4 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  جست‌وجو
                </button>

              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-blue-100">

              <span>
                جست‌وجوهای محبوب:
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                کابین آسانسور
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                موتور آسانسور
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                درب آسانسور
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                ریل آسانسور
              </span>

            </div>

          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-8">

          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی تجهیزات
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            چه تجهیزاتی برای آسانسور نیاز دارید؟
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            دسته مورد نظر خود را انتخاب کنید.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

          {elevatorCategories.map((category) => (

            <Link
              key={category.title}
              href="/materials/elevators"
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="h-40 overflow-hidden bg-slate-100">

                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-5 text-center">

                <h3 className="text-sm font-black">
                  {category.title}
                </h3>

              </div>

            </Link>

          ))}

        </div>
      </section>

      {/* Products */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-8">

            <span className="text-sm font-bold text-emerald-600">
              محصولات تأییدشده
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              محصولات و تجهیزات آسانسور
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              محصولاتی که توسط تیم سرچنو تأیید شده‌اند در این بخش نمایش داده می‌شوند.
            </p>

          </div>

          {loading ? (

            <div className="py-16 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

              <p className="mt-5 font-bold text-slate-500">
                در حال دریافت محصولات...
              </p>

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                🛗
              </div>

              <h3 className="mt-5 text-xl font-black">
                هنوز محصول تأییدشده‌ای وجود ندارد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                پس از تأیید محصول توسط تیم سرچنو، محصول در این صفحه نمایش داده خواهد شد.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center justify-center bg-slate-100 py-10 text-6xl">
                    🛗
                  </div>

                  <div className="p-6">

                    <div className="flex items-center justify-between gap-3">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        آسانسور
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">

                        <ShieldCheck className="h-3 w-3" />

                        تأییدشده

                      </span>

                    </div>

                    <h3 className="mt-4 text-lg font-black">
                      {product.name || "محصول بدون نام"}
                    </h3>

                    {product.brand && (

                      <p className="mt-2 text-sm text-slate-500">
                        برند: {product.brand}
                      </p>

                    )}

                    {product.model && (

                      <p className="mt-1 text-sm text-slate-500">
                        مدل: {product.model}
                      </p>

                    )}

                    {product.description && (

                      <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                        {product.description}
                      </p>

                    )}

                    <div className="mt-5 space-y-3">

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                        <span className="font-bold text-slate-500">
                          قیمت مشتری
                        </span>

                        <span className="font-black text-blue-700">

                          {(
                            product.customer_price ??
                            product.price ??
                            0
                          ).toLocaleString("fa-IR")}{" "}
                          تومان

                        </span>

                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">

                        <span className="font-bold text-slate-500">
                          موجودی
                        </span>

                        <span className="font-black">

                          {(product.stock ?? 0).toLocaleString("fa-IR")}{" "}
                          {product.unit || ""}

                        </span>

                      </div>

                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                      <Building2 className="h-4 w-4" />

                      {product.seller_id
                        ? stores[product.seller_id] || "فروشگاه"
                        : "فروشگاه نامشخص"}

                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">

                      <Star className="h-4 w-4 fill-current" />

                      فروشنده تأییدشده

                    </div>

                    <button
                      type="button"
                      className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                    >
                      مشاهده جزئیات محصول
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

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

                  <option>همه تجهیزات</option>
                  <option>کابین آسانسور</option>
                  <option>درب آسانسور</option>
                  <option>موتور آسانسور</option>
                  <option>تابلو فرمان</option>
                  <option>ریل آسانسور</option>
                  <option>سیم بکسل</option>
                  <option>تجهیزات ایمنی</option>
                  <option>قطعات آسانسور</option>

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

          {/* Info */}

          <div>

            <div className="mb-6">

              <h2 className="text-2xl font-black">
                تأمین‌کنندگان تجهیزات آسانسور
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                فروشندگان و تأمین‌کنندگان دارای محصول تأییدشده در سرچنو در
                بخش محصولات بالا نمایش داده می‌شوند.
              </p>

            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white">

                  <Building2 className="h-7 w-7 text-blue-700" />

                </div>

                <div>

                  <h3 className="font-black text-blue-950">
                    تأمین‌کنندگان آسانسور در سرچنو
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-blue-800/70">
                    با ثبت و تأیید محصولات، فروشگاه و محصولات تأمین‌کنندگان
                    در این صفحه قابل مشاهده خواهند بود.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="px-5 pb-16">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-blue-700 to-blue-950 px-6 py-14 text-center text-white">

          <div className="mx-auto max-w-3xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              فروشنده یا تأمین‌کننده تجهیزات آسانسور هستید؟
            </h2>

            <p className="mt-4 leading-8 text-blue-100">
              محصولات و تجهیزات آسانسور خود را در سرچنو معرفی کنید
              و مشتریان جدید پیدا کنید.
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
                  href="/materials/elevators"
                  className="block hover:text-white"
                >
                  آسانسور و تجهیزات آسانسور
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

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </div>

        </div>
      </footer>

    </main>
  );
}
