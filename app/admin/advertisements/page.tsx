"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  id: string;
  title: string | null;
  image_url: string | null;
  mobile_image_url: string | null;
  created_at: string | null;
  update_at: string | null;
  description: string | null;
  target_url: string | null;
  advertiser_name: string | null;
  advertisement_type: string | null;
  status: string | null;
  sort_order: number | null;
  start_date: string | null;
  end_date: string | null;
};

export default function AdminAdvertisementsPage() {
  const [advertisements, setAdvertisements] = useState<
    Advertisement[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(
    null
  );

  const [filter, setFilter] = useState("all");

  async function loadAdvertisements() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/advertisements?status=${encodeURIComponent(filter)}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("خطا در دریافت تبلیغات");
      }

      const data = await response.json();

      setAdvertisements(data.advertisements || []);
    } catch (error) {
      console.error(
        "ADMIN ADVERTISEMENTS LOAD ERROR:",
        error
      );

      alert("دریافت تبلیغات انجام نشد.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdvertisements();
  }, [filter]);

  async function changeStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    const confirmText =
      status === "approved"
        ? "آیا از تأیید این تبلیغ مطمئن هستید؟"
        : "آیا از رد کردن این تبلیغ مطمئن هستید؟";

    if (!confirm(confirmText)) {
      return;
    }

    try {
      setActionLoading(id);

      const response = await fetch(
        "/api/admin/advertisements",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "خطا در تغییر وضعیت تبلیغ"
        );
      }

      setAdvertisements((previous) =>
        previous.map((advertisement) =>
          advertisement.id === id
            ? {
                ...advertisement,
                status,
              }
            : advertisement
        )
      );

      alert(
        status === "approved"
          ? "تبلیغ با موفقیت تأیید شد."
          : "تبلیغ رد شد."
      );
    } catch (error) {
      console.error(
        "ADVERTISEMENT STATUS ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "تغییر وضعیت تبلیغ انجام نشد."
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteAdvertisement(id: string) {
    if (
      !confirm(
        "آیا مطمئن هستید که می‌خواهید این تبلیغ را حذف کنید؟"
      )
    ) {
      return;
    }

    try {
      setActionLoading(id);

      const response = await fetch(
        "/api/admin/advertisements",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "خطا در حذف تبلیغ"
        );
      }

      setAdvertisements((previous) =>
        previous.filter(
          (advertisement) => advertisement.id !== id
        )
      );

      alert("تبلیغ با موفقیت حذف شد.");
    } catch (error) {
      console.error(
        "ADVERTISEMENT DELETE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "حذف تبلیغ انجام نشد."
      );
    } finally {
      setActionLoading(null);
    }
  }

  function getStatusLabel(status: string | null) {
    switch (status) {
      case "approved":
        return "تأیید شده";

      case "rejected":
        return "رد شده";

      case "pending":
        return "در انتظار بررسی";

      default:
        return status || "نامشخص";
    }
  }

  function getStatusClass(status: string | null) {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                مدیریت تبلیغات
              </h1>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                تبلیغات ثبت‌شده را بررسی، تأیید یا رد کنید.
              </p>
            </div>

            <a
              href="/advertisements"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              صفحه ثبت تبلیغات
            </a>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                filter === "all"
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              همه
            </button>

            <button
              type="button"
              onClick={() => setFilter("pending")}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                filter === "pending"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              در انتظار بررسی
            </button>

            <button
              type="button"
              onClick={() => setFilter("approved")}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                filter === "approved"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              تأیید شده
            </button>

            <button
              type="button"
              onClick={() => setFilter("rejected")}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              رد شده
            </button>

            <button
              type="button"
              onClick={loadAdvertisements}
              className="mr-auto rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
            >
              بروزرسانی
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

            <p className="mt-4 text-sm font-bold text-slate-500">
              در حال دریافت تبلیغات...
            </p>
          </div>
        ) : advertisements.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">—</div>

            <h2 className="mt-4 text-lg font-black text-slate-800">
              تبلیغی پیدا نشد
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              در این وضعیت هنوز تبلیغی ثبت نشده است.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {advertisements.map((advertisement) => (
              <article
                key={advertisement.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {/* TOP */}
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-black text-slate-900">
                        {advertisement.title ||
                          "بدون عنوان"}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                          advertisement.status
                        )}`}
                      >
                        {getStatusLabel(
                          advertisement.status
                        )}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      تبلیغ‌کننده:{" "}
                      <span className="font-bold text-slate-600">
                        {advertisement.advertiser_name ||
                          "ثبت نشده"}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    ترتیب نمایش:{" "}
                    <span className="font-black text-slate-700">
                      {advertisement.sort_order ?? 0}
                    </span>
                  </div>
                </div>

                {/* IMAGES */}
                <div className="grid gap-5 p-5 lg:grid-cols-2">
                  {/* DESKTOP */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">
                        تصویر دسکتاپ
                      </h3>

                      <span className="text-xs text-slate-400">
                        Desktop
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      {advertisement.image_url ? (
                        <img
                          src={advertisement.image_url}
                          alt={
                            advertisement.title ||
                            "تبلیغ دسکتاپ"
                          }
                          className="h-auto max-h-[300px] w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                          تصویر دسکتاپ ثبت نشده
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MOBILE */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">
                        تصویر موبایل
                      </h3>

                      <span className="text-xs text-slate-400">
                        Mobile
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      {advertisement.mobile_image_url ? (
                        <img
                          src={advertisement.mobile_image_url}
                          alt={
                            advertisement.title ||
                            "تبلیغ موبایل"
                          }
                          className="h-auto max-h-[300px] w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                          تصویر موبایل ثبت نشده
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* INFO */}
                <div className="grid gap-4 border-t border-slate-100 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <div className="text-xs text-slate-400">
                      نوع تبلیغ
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-700">
                      {advertisement.advertisement_type ||
                        "ثبت نشده"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">
                      لینک مقصد
                    </div>

                    <div className="mt-1 break-all text-sm font-bold text-blue-700">
                      {advertisement.target_url ||
                        "ثبت نشده"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">
                      شروع نمایش
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-700">
                      {advertisement.start_date ||
                        "ثبت نشده"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">
                      پایان نمایش
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-700">
                      {advertisement.end_date ||
                        "ثبت نشده"}
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {advertisement.description && (
                  <div className="border-t border-slate-100 p-5">
                    <div className="text-xs font-black text-slate-400">
                      توضیحات
                    </div>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {advertisement.description}
                    </p>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row">
                  {advertisement.status !==
                    "approved" && (
                    <button
                      type="button"
                      disabled={
                        actionLoading === advertisement.id
                      }
                      onClick={() =>
                        changeStatus(
                          advertisement.id,
                          "approved"
                        )
                      }
                      className="flex-1 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading ===
                      advertisement.id
                        ? "در حال انجام..."
                        : "تأیید تبلیغ"}
                    </button>
                  )}

                  {advertisement.status !==
                    "rejected" && (
                    <button
                      type="button"
                      disabled={
                        actionLoading === advertisement.id
                      }
                      onClick={() =>
                        changeStatus(
                          advertisement.id,
                          "rejected"
                        )
                      }
                      className="flex-1 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading ===
                      advertisement.id
                        ? "در حال انجام..."
                        : "رد تبلیغ"}
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={
                      actionLoading === advertisement.id
                    }
                    onClick={() =>
                      deleteAdvertisement(
                        advertisement.id
                      )
                    }
                    className="rounded-2xl bg-slate-200 px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    حذف تبلیغ
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
  }
