"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Store,
  Package,
  ArrowRight,
  Trash2,
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
  subcategory: string | null;
  min_order: number | null;
};

type StoreInfo = {
  id: string;
  name: string | null;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================
     دریافت محصولات
  ========================= */

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,category,subcategory,brand,model,price,customer_price,cooperation_price,stock,unit,min_order,description,seller_id,status,created_at"
        )
        .order("created_at", {
          ascending: false,
        });

      console.log("PRODUCTS DATA:", data);
      console.log("PRODUCTS ERROR:", error);

      if (error) {
        console.error("PRODUCTS ERROR:", error);

        setError(
          `خطا در دریافت محصولات: ${error.message}`
        );

        return;
      }

      const loadedProducts = data || [];

      setProducts(loadedProducts);

      /* =========================
         دریافت فروشگاه‌ها
      ========================= */

      const sellerIds = [
        ...new Set(
          loadedProducts
            .map((product) => product.seller_id)
            .filter(Boolean)
        ),
      ];

      if (sellerIds.length > 0) {
        const {
          data: storeData,
          error: storeError,
        } = await supabase
          .from("stores")
          .select("id,name")
          .in("id", sellerIds);

        if (storeError) {
          console.error(
            "STORE ERROR:",
            storeError
          );
        }

        const storeMap: Record<string, string> = {};

        (storeData || []).forEach(
          (store: StoreInfo) => {
            storeMap[store.id] =
              store.name || "فروشگاه";
          }
        );

        setStores(storeMap);
      }
    } catch (err) {
      console.error(err);
      setError(
        "خطای غیرمنتظره‌ای رخ داد."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     تغییر وضعیت محصول
  ========================= */

  const updateStatus = async (
    productId: string,
    status: "active" | "rejected"
  ) => {
    if (updating || deleting) return;

    try {
      setUpdating(productId);
      setError("");

      const {
        error: updateError,
      } = await supabase
        .from("products")
        .update({
          status,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) {
        console.error(
          updateError
        );

        setError(
          `تغییر وضعیت محصول انجام نشد: ${updateError.message}`
        );

        return;
      }

      setProducts((current) =>
        current.map((product) =>
          product.id === productId
            ? {
                ...product,
                status,
              }
            : product
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        "خطایی هنگام تغییر وضعیت محصول رخ داد."
      );
    } finally {
      setUpdating(null);
    }
  };

  /* =========================
     حذف محصول تأییدشده
  ========================= */

  const deleteProduct = async (
    product: Product
  ) => {
    if (
      deleting ||
      updating
    ) {
      return;
    }

    /* فقط محصولات تأییدشده قابل حذف هستند */

    if (
      product.status !== "active"
    ) {
      return;
    }

    const productName =
      product.name ||
      "این محصول";

    const confirmed =
      window.confirm(
        `آیا مطمئن هستید که می‌خواهید محصول «${productName}» را حذف کنید؟\n\nاین عملیات محصول را از محصولات تأییدشده حذف می‌کند.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(product.id);
      setError("");

      const {
        error: deleteError,
      } = await supabase
        .from("products")
        .delete()
        .eq(
          "id",
          product.id
        );

      if (deleteError) {
        console.error(
          "DELETE PRODUCT ERROR:",
          deleteError
        );

        setError(
          `حذف محصول انجام نشد: ${deleteError.message}`
        );

        return;
      }

      /* حذف محصول از لیست پنل بدون Refresh */

      setProducts((current) =>
        current.filter(
          (item) =>
            item.id !== product.id
        )
      );
    } catch (err) {
      console.error(
        "DELETE PRODUCT ERROR:",
        err
      );

      setError(
        "خطایی هنگام حذف محصول رخ داد."
      );
    } finally {
      setDeleting(null);
    }
  };

  /* =========================
     فیلتر محصولات
  ========================= */

  const filteredProducts =
    products.filter(
      (product) => {
        if (filter === "all") {
          return true;
        }

        return (
          product.status ===
          filter
        );
      }
    );

  /* =========================
     آمار
  ========================= */

  const pendingCount =
    products.filter(
      (product) =>
        product.status ===
        "pending"
    ).length;

  const activeCount =
    products.filter(
      (product) =>
        product.status ===
        "active"
    ).length;

  const rejectedCount =
    products.filter(
      (product) =>
        product.status ===
        "rejected"
    ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 text-slate-900"
    >
      {/* =========================
          Header
      ========================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-sm font-bold text-blue-700">
                پنل مدیریت سرچنو
              </div>

              <h1 className="text-2xl font-black">
                مدیریت محصولات
              </h1>
            </div>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <ArrowRight size={18} />

            داشبورد مدیریت
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* =========================
            Statistics
        ========================= */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={
              <Package size={22} />
            }
            title="کل محصولات"
            value={products.length.toString()}
          />

          <StatCard
            icon={
              <Clock size={22} />
            }
            title="در انتظار بررسی"
            value={pendingCount.toString()}
          />

          <StatCard
            icon={
              <CheckCircle2 size={22} />
            }
            title="تأیید شده"
            value={activeCount.toString()}
          />

          <StatCard
            icon={
              <XCircle size={22} />
            }
            title="رد شده"
            value={rejectedCount.toString()}
          />
        </section>

        {/* =========================
            Filters
        ========================= */}

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <FilterButton
              active={
                filter === "pending"
              }
              onClick={() =>
                setFilter("pending")
              }
              label={`در انتظار بررسی (${pendingCount})`}
            />

            <FilterButton
              active={
                filter === "active"
              }
              onClick={() =>
                setFilter("active")
              }
              label={`تأیید شده (${activeCount})`}
            />

            <FilterButton
              active={
                filter === "rejected"
              }
              onClick={() =>
                setFilter("rejected")
              }
              label={`رد شده (${rejectedCount})`}
            />

            <FilterButton
              active={
                filter === "all"
              }
              onClick={() =>
                setFilter("all")
              }
              label={`همه (${products.length})`}
            />
          </div>
        </section>

        {/* =========================
            Error
        ========================= */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 font-bold text-red-700">
            {error}
          </div>
        )}

        {/* =========================
            Products
        ========================= */}

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-black">
              محصولات ثبت‌شده
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              محصولات فروشگاه‌ها را بررسی و وضعیت آن‌ها را مدیریت کنید.
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

              <p className="mt-5 font-bold text-slate-500">
                در حال دریافت محصولات...
              </p>
            </div>
          ) : filteredProducts.length ===
            0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
              <Package
                size={50}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-black">
                محصولی برای نمایش وجود ندارد
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                در این وضعیت هنوز محصولی ثبت نشده است.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      {/* =========================
                          Product Info
                      ========================= */}

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-black">
                            {product.name ||
                              "بدون نام"}
                          </h3>

                          <StatusBadge
                            status={
                              product.status
                            }
                          />
                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <div>
                            <span className="font-bold">
                              دسته‌بندی:
                            </span>{" "}
                            {product.category ||
                              "ثبت نشده"}
                          </div>

                          <div className="flex items-center gap-1">
                            <Store
                              size={16}
                            />

                            <span className="font-bold">
                              فروشگاه:
                            </span>{" "}
                            {product.seller_id
                              ? stores[
                                  product
                                    .seller_id
                                ] ||
                                "فروشگاه ثبت‌شده"
                              : "نامشخص"}
                          </div>

                          <div>
                            <span className="font-bold">
                              قیمت مشتریان سرچنو:
                            </span>{" "}
                            {(
                              product.customer_price ??
                              product.price ??
                              0
                            ).toLocaleString(
                              "fa-IR"
                            )}
                          </div>

                          <div>
                            <span className="font-bold">
                              قیمت همکاری با سرچنو:
                            </span>{" "}
                            {(
                              product.cooperation_price ??
                              0
                            ).toLocaleString(
                              "fa-IR"
                            )}
                          </div>

                          <div>
                            <span className="font-bold">
                              موجودی:
                            </span>{" "}
                            {(
                              product.stock ??
                              0
                            ).toLocaleString(
                              "fa-IR"
                            )}{" "}
                            {product.unit ||
                              ""}
                          </div>
                        </div>

                        {product.description && (
                          <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                            {
                              product.description
                            }
                          </p>
                        )}
                      </div>

                      {/* =========================
                          Actions
                      ========================= */}

                      <div className="flex flex-wrap gap-2">
                        {/* مشاهده */}

                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                        >
                          <Eye
                            size={17}
                          />

                          مشاهده
                        </button>

                        {/* =========================
                            Pending Actions
                        ========================= */}

                        {product.status ===
                          "pending" && (
                          <>
                            <button
                              type="button"
                              disabled={
                                updating ===
                                  product.id ||
                                deleting !==
                                  null
                              }
                              onClick={() =>
                                updateStatus(
                                  product.id,
                                  "active"
                                )
                              }
                              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-50"
                            >
                              <CheckCircle2
                                size={17}
                              />

                              {updating ===
                              product.id
                                ? "در حال تأیید..."
                                : "تأیید"}
                            </button>

                            <button
                              type="button"
                              disabled={
                                updating ===
                                  product.id ||
                                deleting !==
                                  null
                              }
                              onClick={() =>
                                updateStatus(
                                  product.id,
                                  "rejected"
                                )
                              }
                              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50"
                            >
                              <XCircle
                                size={17}
                              />

                              {updating ===
                              product.id
                                ? "در حال رد..."
                                : "رد"}
                            </button>
                          </>
                        )}

                        {/* =========================
                            Active / Delete
                        ========================= */}

                        {product.status ===
                          "active" && (
                          <button
                            type="button"
                            disabled={
                              deleting ===
                                product.id ||
                              updating !==
                                null
                            }
                            onClick={() =>
                              deleteProduct(
                                product
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2
                              size={17}
                            />

                            {deleting ===
                            product.id
                              ? "در حال حذف..."
                              : "حذف محصول"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================
   Stat Card
========================= */

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
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500">
            {title}
          </div>

          <div className="mt-1 text-2xl font-black">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Filter Button
========================= */

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-5 py-3 text-sm font-black transition ${
        active
          ? "bg-blue-700 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

/* =========================
   Status Badge
========================= */

function StatusBadge({
  status,
}: {
  status: string | null;
}) {
  if (status === "active") {
    return (
      <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
        تأیید شده
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="rounded-lg bg-red-100 px-3 py-1 text-xs font-black text-red-700">
        رد شده
      </span>
    );
  }

  return (
    <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
      در انتظار بررسی
    </span>
  );
}
