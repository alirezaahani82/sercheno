"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Droplets,
  Wrench,
  Building2,
  Phone,
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

const subCategories = [
  "لوله آب",
  "لوله فاضلاب",
  "لوله PVC",
  "لوله پلی‌اتیلن",
  "لوله پنج‌لایه",
  "اتصالات آب",
  "اتصالات فاضلاب",
  "شیرآلات",
  "لوله پوش‌فیت",
  "لوله گالوانیزه",
  "پمپ آب",
  "تجهیزات تأسیسات",
];

export default function PlumbingPipesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("همه");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      /*
       * محصولات تأییدشده دسته لوله و تأسیسات
       */
      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,category,price,customer_price,cooperation_price,stock,unit,description,seller_id,status,created_at,brand,model,min_order"
        )
        .eq("category", "plumbing-pipes")
        .eq("status", "active")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("PLUMBING PRODUCTS ERROR:", error);
        setProducts([]);
        return;
      }

      const productList = (data || []) as Product[];

      setProducts(productList);

      /*
       * دریافت فروشگاه‌های مربوط به محصولات
       */
      const sellerIds = [
        ...new Set(
          productList
            .map((product) => product.seller_id)
            .filter(
              (id): id is string =>
                Boolean(id)
            )
        ),
      ];

      if (sellerIds.length === 0) {
        setStores({});
        return;
      }

      const { data: storeData, error: storeError } =
        await supabase
          .from("stores")
          .select("id,name")
          .in("id", sellerIds);

      if (storeError) {
        console.error(
          "PLUMBING STORE ERROR:",
          storeError
        );

        setStores({});
        return;
      }

      const storeMap: Record<string, string> = {};

      (storeData || []).forEach(
        (store: StoreInfo) => {
          storeMap[store.id] =
            store.name || "فروشگاه";
        }
      );

      setStores(storeMap);
    } catch (error) {
      console.error(
        "PLUMBING LOAD ERROR:",
        error
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  /*
   * فیلتر و جست‌وجوی واقعی
   */
  const filteredProducts = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.brand
          ?.toLowerCase()
          .includes(searchText) ||
        product.model
          ?.toLowerCase()
          .includes(searchText) ||
        product.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesType =
        selectedType === "همه" ||
        product.name
          ?.toLowerCase()
          .includes(
            selectedType.toLowerCase()
          ) ||
        product.description
          ?.toLowerCase()
          .includes(
            selectedType.toLowerCase()
          );

      return matchesSearch && matchesType;
    });
  }, [products, search, selectedType]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* ================= HEADER ================= */}

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

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 lg:py-16">
          <div className="relative mx-auto mb-10 h-64 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <img
              src="/materials/plumbing-pipes.jpg"
              alt="لوله و تجهیزات تأسیسات ساختمان"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/60 to-transparent" />

            <div className="absolute inset-0 flex items-center px-8">
              <div className="text-white">
                <Droplets className="h-14 w-14 text-cyan-300" />

                <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                  لوله، اتصالات و تجهیزات تأسیسات
                </h2>

                <p className="mt-2 text-sm text-blue-100">
                  تأمین تجهیزات مورد نیاز پروژه‌های ساختمانی
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center text-white">
            <Link
              href="/materials"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به مصالح و تجهیزات
            </Link>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              لوله، اتصالات و
              <span className="mt-2 block text-cyan-300">
                تأسیسات ساختمان
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              انواع لوله آب، فاضلاب، PVC، پلی‌اتیلن،
              پنج‌لایه، پوش‌فیت، اتصالات، شیرآلات،
              پمپ آب و تجهیزات تأسیسات ساختمان را
              از فروشندگان و تأمین‌کنندگان سرچنو پیدا کنید.
            </p>

            {/* Search */}

            <div className="mx-auto mt-8 rounded-3xl bg-white p-3 text-right shadow-2xl">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="مثلاً لوله پنج‌لایه، PVC، پوش‌فیت..."
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
          </div>
        </div>
      </section>

      {/* ================= SUB CATEGORIES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-7">
          <span className="text-sm font-bold text-blue-700">
            دسته‌بندی تأسیسات
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            چه نوع محصولی نیاز دارید؟
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            دسته مورد نیاز خود را انتخاب کنید.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setSelectedType(
                  selectedType === item
                    ? "همه"
                    : item
                )
              }
              className={`rounded-2xl border p-5 text-right font-bold transition hover:-translate-y-1 hover:shadow-lg ${
                selectedType === item
                  ? "border-blue-600 bg-blue-700 text-white"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600">
                محصولات تأییدشده
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                محصولات لوله و تأسیسات
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                فقط محصولاتی که توسط ادمین سرچنو تأیید
                شده‌اند نمایش داده می‌شوند.
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600">
              {filteredProducts.length.toLocaleString(
                "fa-IR"
              )}{" "}
              محصول
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

              <p className="mt-5 font-bold text-slate-500">
                در حال دریافت محصولات...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                🚰
              </div>

              <h3 className="mt-5 text-xl font-black">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                در حال حاضر محصول تأییدشده‌ای در
                دسته لوله و تأسیسات وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Product image placeholder */}

                    <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                      <Droplets className="h-20 w-20 text-blue-300 transition duration-500 group-hover:scale-110" />

                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700">
                        تأسیسات
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {product.category ||
                            "plumbing-pipes"}
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          <ShieldCheck className="h-3 w-3" />
                          تأییدشده
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-black">
                        {product.name ||
                          "محصول بدون نام"}
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
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            تومان
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
                          <span className="font-bold text-slate-500">
                            حداقل سفارش
                          </span>

                          <span className="font-black">
                            {(
                              product.min_order ??
                              1
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            {product.unit || ""}
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
                          <span className="font-bold text-slate-500">
                            موجودی
                          </span>

                          <span className="font-black">
                            {(
                              product.stock ?? 0
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            {product.unit || ""}
                          </span>
                        </div>
                      </div>

                      {/* Store */}

                      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                        <Building2 className="h-4 w-4 text-blue-600" />

                        {product.seller_id
                          ? stores[
                              product.seller_id
                            ] ||
                            "فروشگاه"
                          : "فروشگاه نامشخص"}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="h-4 w-4" />

                        تبریز
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-xs text-amber-500">
                        <Star className="h-4 w-4 fill-current" />

                        فروشنده تأییدشده
                      </div>

                      <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                      >
                        مشاهده جزئیات محصول
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= PROJECT SECTION ================= */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-blue-950 to-cyan-800 p-8 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                تأمین تأسیسات پروژه
              </span>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                تأمین عمده لوله و تجهیزات ساختمانی
              </h2>

              <p className="mt-4 leading-8 text-blue-100">
                برای پروژه‌های ساختمانی می‌توانید
                انواع لوله، اتصالات، شیرآلات، پمپ
                و تجهیزات تأسیسات را از فروشندگان
                و تأمین‌کنندگان سرچنو پیدا کنید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش عمده
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش خرده
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  تأمین پروژه
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                  فروش تأییدشده
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Wrench className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="font-black">
                    نیاز به تأمین تجهیزات دارید؟
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    با فروشندگان و تأمین‌کنندگان
                    ارتباط بگیرید.
                  </p>
                </div>
              </div>

              <Link
                href="/register"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-black text-blue-900"
              >
                ثبت فروشگاه و محصول
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-5 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-700 px-6 py-14 text-center text-white">
          <Droplets className="mx-auto h-10 w-10" />

          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            فروشنده یا تأمین‌کننده لوله و تأسیسات هستید؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
            فروشگاه خود را در سرچنو ثبت کنید و محصولات
            خود را به سازندگان و خریداران معرفی کنید.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-black text-blue-800"
          >
            ثبت فروشگاه
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

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
                پلتفرم جست‌وجو، مقایسه و ارتباط با
                فروشندگان، تأمین‌کنندگان و متخصصان
                صنعت ساختمان.
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
