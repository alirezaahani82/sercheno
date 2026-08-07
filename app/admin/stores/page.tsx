"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Store,
  CheckCircle2,
  XCircle,
  Clock3,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

type StoreItem = {
  id: string;
  name: string;
  owner_name: string | null;
  phone: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  description: string | null;
  status: string | null;
  created_at: string | null;
};

export default function StoresAdminPage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const loadStores = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } = await supabase
        .from("stores")
        .select(
          "id,name,owner_name,phone,province,city,address,description,status,created_at"
        )
        .order("created_at", {
          ascending: false,
        });

      if (supabaseError) {
        console.error("LOAD STORES ERROR:", supabaseError);
        setError(
          "خطا در دریافت فروشگاه‌ها: " +
            supabaseError.message
        );
        return;
      }

      setStores(data || []);
    } catch (err) {
      console.error("STORES ERROR:", err);

      setError(
        "خطای غیرمنتظره هنگام دریافت فروشگاه‌ها."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const updateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    if (updatingId) return;

    const message =
      status === "approved"
        ? "آیا از تأیید این فروشگاه مطمئن هستید؟"
        : "آیا از رد کردن این فروشگاه مطمئن هستید؟";

    if (!window.confirm(message)) {
      return;
    }

    setUpdatingId(id);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("stores")
        .update({
          status,
        })
        .eq("id", id);

      if (updateError) {
        console.error(
          "UPDATE STORE STATUS ERROR:",
          updateError
        );

        setError(
          "خطا در تغییر وضعیت فروشگاه: " +
            updateError.message
        );

        return;
      }

      setStores((prev) =>
        prev.map((store) =>
          store.id === id
            ? {
                ...store,
                status,
              }
            : store
        )
      );
    } catch (err) {
      console.error(
        "STATUS UPDATE ERROR:",
        err
      );

      setError(
        "خطای غیرمنتظره هنگام تغییر وضعیت فروشگاه."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const total = stores.length;

  const pendingCount = stores.filter(
    (store) => store.status === "pending"
  ).length;

  const approvedCount = stores.filter(
    (store) => store.status === "approved"
  ).length;

  const rejectedCount = stores.filter(
    (store) => store.status === "rejected"
  ).length;

  const filteredStores = stores.filter(
    (store) => {
      if (filter === "pending") {
        return store.status === "pending";
      }

      if (filter === "approved") {
        return store.status === "approved";
      }

      if (filter === "rejected") {
        return store.status === "rejected";
      }

      return true;
    }
  );

  const statusLabel = (
    status: string | null
  ) => {
    if (status === "approved") {
      return "تأیید شد";
    }

    if (status === "rejected") {
      return "رد شد";
    }

    return "در انتظار بررسی";
  };

  const statusClass = (
    status: string | null
  ) => {
    if (status === "approved") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  const formatDate = (
    date: string | null
  ) => {
    if (!date) return "نامشخص";

    return new Date(date).toLocaleDateString(
      "fa-IR"
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="text-sm font-bold text-blue-700">
              پنل مدیریت سرچنو
            </div>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              مدیریت فروشندگان و فروشگاه‌ها
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              بررسی، تأیید و مدیریت فروشگاه‌های ثبت‌شده در سرچنو
            </p>
          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={loadStores}
              className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-200"
            >
              <RefreshCw size={18} />
              بروزرسانی
            </button>

            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
            >
              داشبورد اصلی
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="کل فروشگاه‌ها"
            value={total}
            icon={<Store size={24} />}
            className="text-slate-900"
            iconClass="bg-blue-100 text-blue-700"
          />

          <StatCard
            title="در انتظار بررسی"
            value={pendingCount}
            icon={<Clock3 size={24} />}
            className="text-amber-500"
            iconClass="bg-amber-100 text-amber-700"
          />

          <StatCard
            title="تأیید شده"
            value={approvedCount}
            icon={<CheckCircle2 size={24} />}
            className="text-emerald-600"
            iconClass="bg-emerald-100 text-emerald-700"
          />

          <StatCard
            title="رد شده"
            value={rejectedCount}
            icon={<XCircle size={24} />}
            className="text-red-500"
            iconClass="bg-red-100 text-red-700"
          />

        </div>

        {/* Management */}

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                فروشگاه‌های ثبت‌شده
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                فروشگاه‌ها را بررسی کنید و وضعیت آن‌ها را تغییر دهید.
              </p>
            </div>

            {/* Filters */}

            <div className="flex flex-wrap gap-2">

              <FilterButton
                active={filter === "all"}
                onClick={() =>
                  setFilter("all")
                }
              >
                همه
              </FilterButton>

              <FilterButton
                active={filter === "pending"}
                onClick={() =>
                  setFilter("pending")
                }
              >
                در انتظار بررسی
              </FilterButton>

              <FilterButton
                active={filter === "approved"}
                onClick={() =>
                  setFilter("approved")
                }
              >
                تأیید شده
              </FilterButton>

              <FilterButton
                active={filter === "rejected"}
                onClick={() =>
                  setFilter("rejected")
                }
              >
                رد شده
              </FilterButton>

            </div>

          </div>

          {/* Loading */}

          {loading && (
            <div className="mt-8 rounded-3xl bg-slate-50 p-12 text-center">

              <RefreshCw
                size={35}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="mt-4 text-sm font-bold text-slate-500">
                در حال دریافت فروشگاه‌ها...
              </p>

            </div>
          )}

          {/* Empty */}

          {!loading &&
            filteredStores.length === 0 && (
              <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                  🏪
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-800">
                  فروشگاهی برای نمایش وجود ندارد
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  در این بخش فروشگاه‌هایی که توسط کاربران ثبت شده‌اند
                  نمایش داده می‌شوند.
                </p>

              </div>
            )}

          {/* Store List */}

          {!loading &&
            filteredStores.length > 0 && (
              <div className="mt-8 space-y-5">

                {filteredStores.map(
                  (store) => (
                    <div
                      key={store.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >

                      {/* Top */}

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        <div className="flex items-start gap-4">

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                            <Store size={27} />
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-3">

                              <h3 className="text-xl font-black text-slate-900">
                                {store.name}
                              </h3>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(
                                  store.status
                                )}`}
                              >
                                {statusLabel(
                                  store.status
                                )}
                              </span>

                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              مالک/مدیر:{" "}
                              <span className="font-bold text-slate-700">
                                {store.owner_name ||
                                  "ثبت نشده"}
                              </span>
                            </p>

                          </div>

                        </div>

                        {/* Actions */}

                        <div className="flex flex-wrap gap-2">

                          <button
                            type="button"
                            disabled={
                              updatingId ===
                              store.id
                            }
                            onClick={() =>
                              updateStatus(
                                store.id,
                                "approved"
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <CheckCircle2
                              size={18}
                            />

                            {updatingId ===
                            store.id
                              ? "در حال ثبت..."
                              : "تأیید فروشگاه"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              updatingId ===
                              store.id
                            }
                            onClick={() =>
                              updateStatus(
                                store.id,
                                "rejected"
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <XCircle
                              size={18}
                            />
                            رد فروشگاه
                          </button>

                        </div>

                      </div>

                      {/* Information */}

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        <InfoItem
                          label="شماره تماس"
                          value={
                            store.phone ||
                            "ثبت نشده"
                          }
                        />

                        <InfoItem
                          label="استان"
                          value={
                            store.province ||
                            "ثبت نشده"
                          }
                        />

                        <InfoItem
                          label="شهر"
                          value={
                            store.city ||
                            "ثبت نشده"
                          }
                        />

                        <InfoItem
                          label="تاریخ ثبت"
                          value={formatDate(
                            store.created_at
                          )}
                        />

                      </div>

                      {/* Address */}

                      {store.address && (
                        <div className="mt-3 rounded-2xl bg-white p-4">

                          <div className="text-xs font-bold text-slate-400">
                            آدرس
                          </div>

                          <div className="mt-1 text-sm font-bold text-slate-700">
                            {store.address}
                          </div>

                        </div>
                      )}

                      {/* Description */}

                      {store.description && (
                        <div className="mt-3 rounded-2xl bg-white p-4">

                          <div className="text-xs font-bold text-slate-400">
                            توضیحات
                          </div>

                          <div className="mt-1 text-sm leading-7 text-slate-600">
                            {store.description}
                          </div>

                        </div>
                      )}

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

/* =========================================
   Stat Card
========================================= */

function StatCard({
  title,
  value,
  icon,
  className,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  className: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="text-sm font-bold text-slate-500">
          {title}
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <div
        className={`mt-4 text-3xl font-black ${className}`}
      >
        {value}
      </div>

    </div>
  );
}

/* =========================================
   Filter Button
========================================= */

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================
   Info Item
========================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">

      <div className="text-xs font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-black text-slate-700">
        {value}
      </div>

    </div>
  );
}
