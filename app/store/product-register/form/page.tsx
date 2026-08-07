"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Store,
  Package,
  Plus,
  Edit3,
  LogOut,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type StoreInfo = {
  id: string;
  name: string;
  owner_name: string | null;
  phone: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  description: string | null;
  status: string | null;
};

type Product = {
  id: string;
  name: string;
  price: number | null;
  customer_price: number | null;
  cooperation_price: number | null;
  stock: number | null;
  unit: string | null;
  status: string | null;
  description: string | null;
};

export default function StorePanelPage() {
  const router = useRouter();

  const [store, setStore] = useState<StoreInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStore();
  }, []);

  const loadStore = async () => {
    try {
      setLoading(true);
      setError("");

      const storeId =
        sessionStorage.getItem("sercheno_store_id");

      if (!storeId) {
        router.replace("/store/product-register");
        return;
      }

      /* -----------------------------
         دریافت اطلاعات فروشگاه
      ----------------------------- */

      const {
        data: storeData,
        error: storeError,
      } = await supabase
        .from("stores")
        .select(
          "id,name,owner_name,phone,province,city,address,description,status"
        )
        .eq("id", storeId)
        .single();

      if (storeError || !storeData) {
        console.error(storeError);

        sessionStorage.removeItem(
          "sercheno_store_id"
        );

        router.replace("/store/product-register");

        return;
      }

      setStore(storeData);

      /* -----------------------------
         دریافت محصولات فروشگاه
      ----------------------------- */

      const {
        data: productData,
        error: productError,
      } = await supabase
        .from("products")
        .select(
          "id,name,price,customer_price,cooperation_price,stock,unit,status,description"
        )
        .eq("seller_id", storeId)
        .order("created_at", {
          ascending: false,
        });

      if (productError) {
        console.error(productError);
        setError(
          "خطا در دریافت محصولات فروشگاه."
        );
        return;
      }

      setProducts(productData || []);
    } catch (err) {
      console.error(err);

      setError(
        "خطایی هنگام دریافت اطلاعات فروشگاه رخ داد."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     خروج
  ----------------------------- */

  const logout = () => {
    sessionStorage.removeItem(
      "sercheno_store_id"
    );

    sessionStorage.removeItem(
      "sercheno_store_name"
    );

    sessionStorage.removeItem(
      "sercheno_store_owner"
    );

    router.replace(
      "/store/product-register"
    );
  };

  /* -----------------------------
     وضعیت فروشگاه
  ----------------------------- */

  const statusBox = () => {
    if (store?.status === "approved") {
      return (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          <CheckCircle2 size={18} />
          فروشگاه تأیید شده
        </div>
      );
    }

    if (store?.status === "rejected") {
      return (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
          <XCircle size={18} />
          فروشگاه رد شده
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
        <Clock size={18} />
        در انتظار بررسی
      </div>
    );
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

          <p className="mt-5 font-bold text-slate-600">
            در حال دریافت پنل فروشگاه...
          </p>
        </div>
      </main>
    );
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
              alt="سرچنو"
              className="h-11 w-11 rounded-2xl object-contain"
            />

            <div>
              <div className="text-xl font-black text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                پنل فروشگاه
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={18} />
            خروج
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* Store Header */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-7 text-white shadow-lg">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
                <Store size={40} />
              </div>

              <div>

                <div className="text-sm text-blue-200">
                  پنل اختصاصی فروشگاه
                </div>

                <h1 className="mt-1 text-3xl font-black">
                  {store?.name}
                </h1>

                <p className="mt-2 text-sm text-blue-100">
                  مدیر فروشگاه:{" "}
                  {store?.owner_name || "ثبت نشده"}
                </p>

              </div>

            </div>

            {statusBox()}

          </div>

        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 font-bold text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<Package size={22} />}
            title="کل محصولات"
            value={products.length.toString()}
          />

          <StatCard
            icon={<CheckCircle2 size={22} />}
            title="محصولات فعال"
            value={products
              .filter(
                (p) => p.status === "active"
              )
              .length.toString()}
          />

          <StatCard
            icon={<Clock size={22} />}
            title="در انتظار بررسی"
            value={products
              .filter(
                (p) => p.status === "pending"
              )
              .length.toString()}
          />

          <StatCard
            icon={<Store size={22} />}
            title="وضعیت فروشگاه"
            value={
              store?.status === "approved"
                ? "تأیید شده"
                : "در انتظار بررسی"
            }
          />

        </section>

        {/* Store Information */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-black">
                اطلاعات فروشگاه
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                اطلاعات فروشگاه و مالک را مشاهده و مدیریت کنید.
              </p>

            </div>

            <Link
              href="/store/product-register/form/edit"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
            >
              <Edit3 size={18} />
              ویرایش اطلاعات فروشگاه
            </Link>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              icon={<Store size={18} />}
              title="نام فروشگاه"
              value={store?.name}
            />

            <InfoItem
              icon={<User size={18} />}
              title="مالک / مدیر"
              value={store?.owner_name}
            />

            <InfoItem
              icon={<Phone size={18} />}
              title="شماره تماس"
              value={store?.phone}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              title="استان"
              value={store?.province}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              title="شهر"
              value={store?.city}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              title="آدرس"
              value={store?.address}
            />

          </div>

        </section>

        {/* Products */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-black">
                محصولات فروشگاه
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                محصولات ثبت‌شده خود را مشاهده و مدیریت کنید.
              </p>

            </div>

            <Link
              href="/store/product-register/form/product"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <Plus size={18} />
              ثبت محصول جدید
            </Link>

          </div>

          {products.length === 0 ? (
            <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

              <Package
                size={45}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-black">
                هنوز محصولی ثبت نکرده‌اید
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                اولین محصول فروشگاه خود را ثبت کنید.
              </p>

              <Link
                href="/store/product-register/form/product"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white"
              >
                <Plus size={18} />
                ثبت اولین محصول
              </Link>

            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-black text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {product.unit || "واحد مشخص نشده"}
                      </p>

                    </div>

                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                      {product.status || "فعال"}
                    </span>

                  </div>

                  <div className="mt-5 space-y-2 text-sm">

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        قیمت مشتری
                      </span>

                      <strong>
                        {product.customer_price ??
                          product.price ??
                          0}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        قیمت همکاری
                      </span>

                      <strong>
                        {product.cooperation_price ??
                          0}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        موجودی
                      </span>

                      <strong>
                        {product.stock ?? 0}
                      </strong>
                    </div>

                  </div>

                  <div className="mt-5 flex gap-2">

                    <Link
                      href={`/store/product-register/form/product/${product.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-bold text-blue-700 ring-1 ring-slate-200"
                    >
                      <Edit3 size={16} />
                      ویرایش
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

/* --------------------------------
   Stat Card
-------------------------------- */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500">
            {title}
          </div>

          <div className="mt-1 text-xl font-black">
            {value}
          </div>
        </div>

      </div>

    </div>
  );
}

/* --------------------------------
   Info Item
-------------------------------- */

function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        {icon}
        {title}
      </div>

      <div className="mt-2 text-sm font-black text-slate-800">
        {value || "ثبت نشده"}
      </div>

    </div>
  );
}
