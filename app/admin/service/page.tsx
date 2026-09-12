"use client";

import { useEffect, useState } from "react";

type Professional = {
  id: string;

  first_name: string;
  last_name: string;

  phone: string;

  username?: string;
  auth_user_id?: string;

  national_code?: string;
  birth_date?: string;

  service: string;

  province: string;
  city: string;
  activity_area: string;

  experience: string;

  skills?: string;
  description: string;

  certificates?: string;
  cooperation_type?: string;
  availability?: string;
  price_info?: string;

  show_phone?: boolean;

  profile_image?: string;
  work_image_1?: string;
  work_image_2?: string;
  work_image_3?: string;

  profile_image_url?: string;
  work_image_1_url?: string;
  work_image_2_url?: string;
  work_image_3_url?: string;

  status: string;

  rejection_reason?: string;
  admin_note?: string;

  created_at: string;
  updated_at?: string;
};

export default function ServiceAdminPage() {
  const [
    professionals,
    setProfessionals,
  ] = useState<Professional[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const [
    updatingId,
    setUpdatingId,
  ] = useState<string | null>(null);

  /*
   * دریافت متخصص‌ها
   */
  const fetchProfessionals =
    async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/admin/professionals",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result =
          await response.json();

        console.log(
          "ADMIN API RESULT:",
          result
        );

        if (!response.ok) {
          alert(
            result.message ||
              "خطا در دریافت متخصص‌ها"
          );

          return;
        }

        setProfessionals(
          result.professionals || []
        );
      } catch (error) {
        console.error(error);

        alert(
          "خطا در ارتباط با سرور."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  /*
   * خروج
   */
  const logout = async () => {
    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );
    } catch {}

    window.location.href =
      "/admin/login";
  };

  /*
   * تغییر وضعیت
   */
  const updateStatus = async (
    id: string,
    status:
      | "approved"
      | "rejected"
      | "pending"
  ) => {
    try {
      setUpdatingId(id);

      const response = await fetch(
        "/api/admin/professionals",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "خطا در تغییر وضعیت."
        );

        return;
      }

      alert(
        status === "approved"
          ? "متخصص با موفقیت تأیید و منتشر شد."
          : status === "rejected"
          ? "درخواست متخصص رد شد."
          : "وضعیت به در انتظار بررسی تغییر کرد."
      );

      await fetchProfessionals();
    } catch (error) {
      console.error(error);

      alert(
        "خطا در ارتباط با سرور."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
   * فیلتر
   */
  const filteredProfessionals =
    professionals.filter(
      (professional) => {
        if (
          statusFilter === "all"
        ) {
          return true;
        }

        return (
          professional.status ===
          statusFilter
        );
      }
    );

  /*
   * وضعیت
   */
  const getStatusLabel = (
    status: string
  ) => {
    if (status === "pending") {
      return (
        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
          🟠 در انتظار بررسی
        </span>
      );
    }

    if (status === "approved") {
      return (
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
          🟢 تأیید شده
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
          🔴 رد شده
        </span>
      );
    }

    return null;
  };

  /*
   * نمایش تاریخ
   */
  const formatDate = (
    value?: string
  ) => {
    if (!value) {
      return "ثبت نشده";
    }

    try {
      return new Date(
        value
      ).toLocaleString("fa-IR");
    } catch {
      return value;
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 p-5 sm:p-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <h1 className="text-3xl font-black text-slate-900">
                پنل مدیریت خدمات سرچنو
              </h1>

              <p className="mt-2 text-slate-500">
                بررسی، مدیریت و انتشار متخصصان خدمات ساختمانی
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={
                  fetchProfessionals
                }
                className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                🔄 بروزرسانی
              </button>

              <button
                onClick={logout}
                className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
              >
                خروج از پنل
              </button>

            </div>
          </div>
        </div>

        {/* ================= FILTERS ================= */}

        <div className="mb-8 grid gap-3 sm:grid-cols-4">

          <button
            onClick={() =>
              setStatusFilter(
                "all"
              )
            }
            className={`rounded-2xl p-4 text-center font-bold transition ${
              statusFilter ===
              "all"
                ? "bg-blue-700 text-white"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            همه

            <div className="mt-1 text-sm">
              {professionals.length}
            </div>
          </button>

          <button
            onClick={() =>
              setStatusFilter(
                "pending"
              )
            }
            className={`rounded-2xl p-4 text-center font-bold transition ${
              statusFilter ===
              "pending"
                ? "bg-amber-500 text-white"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            در انتظار بررسی

            <div className="mt-1 text-sm">
              {
                professionals.filter(
                  (p) =>
                    p.status ===
                    "pending"
                ).length
              }
            </div>
          </button>

          <button
            onClick={() =>
              setStatusFilter(
                "approved"
              )
            }
            className={`rounded-2xl p-4 text-center font-bold transition ${
              statusFilter ===
              "approved"
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            تأیید شده

            <div className="mt-1 text-sm">
              {
                professionals.filter(
                  (p) =>
                    p.status ===
                    "approved"
                ).length
              }
            </div>
          </button>

          <button
            onClick={() =>
              setStatusFilter(
                "rejected"
              )
            }
            className={`rounded-2xl p-4 text-center font-bold transition ${
              statusFilter ===
              "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            رد شده

            <div className="mt-1 text-sm">
              {
                professionals.filter(
                  (p) =>
                    p.status ===
                    "rejected"
                ).length
              }
            </div>
          </button>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-4 font-bold text-slate-700">
              در حال دریافت درخواست‌ها...
            </p>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          filteredProfessionals.length ===
            0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="text-5xl">
                📭
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900">
                درخواست جدیدی وجود ندارد
              </h2>

              <p className="mt-3 text-slate-500">
                متخصصی با این وضعیت پیدا نشد.
              </p>

            </div>
          )}

        {/* ================= PROFESSIONALS ================= */}

        {!loading &&
          filteredProfessionals.length >
            0 && (
            <div className="space-y-8">

              {filteredProfessionals.map(
                (professional) => (
                  <div
                    key={
                      professional.id
                    }
                    className="overflow-hidden rounded-3xl bg-white shadow-sm"
                  >

                    {/* ================= CARD HEADER ================= */}

                    <div className="border-b border-slate-100 p-6">

                      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                        <div>
                          <h2 className="text-2xl font-black text-slate-900">
                            {
                              professional.first_name
                            }{" "}
                            {
                              professional.last_name
                            }
                          </h2>

                          <p className="mt-2 font-bold text-blue-700">
                            {
                              professional.service
                            }
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            ثبت شده در:{" "}
                            {formatDate(
                              professional.created_at
                            )}
                          </p>
                        </div>

                        <div>
                          {getStatusLabel(
                            professional.status
                          )}
                        </div>

                      </div>
                    </div>

                    {/* ================= PHOTOS ================= */}

                    {(professional.profile_image_url ||
                      professional.work_image_1_url ||
                      professional.work_image_2_url ||
                      professional.work_image_3_url) && (

                      <div className="border-b border-slate-100 bg-slate-50 p-6">

                        <h3 className="mb-5 text-xl font-black text-slate-900">
                          📸 تصاویر متخصص
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                          {/* Profile */}

                          {professional.profile_image_url && (
                            <div>
                              <p className="mb-2 font-bold text-slate-600">
                                عکس پرسنلی
                              </p>

                              <a
                                href={
                                  professional.profile_image_url
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    professional.profile_image_url
                                  }
                                  alt="عکس پرسنلی"
                                  className="h-64 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
                                />
                              </a>
                            </div>
                          )}

                          {/* Work 1 */}

                          {professional.work_image_1_url && (
                            <div>
                              <p className="mb-2 font-bold text-slate-600">
                                نمونه کار ۱
                              </p>

                              <a
                                href={
                                  professional.work_image_1_url
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    professional.work_image_1_url
                                  }
                                  alt="نمونه کار ۱"
                                  className="h-64 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
                                />
                              </a>
                            </div>
                          )}

                          {/* Work 2 */}

                          {professional.work_image_2_url && (
                            <div>
                              <p className="mb-2 font-bold text-slate-600">
                                نمونه کار ۲
                              </p>

                              <a
                                href={
                                  professional.work_image_2_url
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    professional.work_image_2_url
                                  }
                                  alt="نمونه کار ۲"
                                  className="h-64 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
                                />
                              </a>
                            </div>
                          )}

                          {/* Work 3 */}

                          {professional.work_image_3_url && (
                            <div>
                              <p className="mb-2 font-bold text-slate-600">
                                نمونه کار ۳
                              </p>

                              <a
                                href={
                                  professional.work_image_3_url
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    professional.work_image_3_url
                                  }
                                  alt="نمونه کار ۳"
                                  className="h-64 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
                                />
                              </a>
                            </div>
                          )}

                        </div>
                      </div>
                    )}

                    {/* ================= PERSONAL INFO ================= */}

                    <div className="p-6">

                      <h3 className="mb-5 text-xl font-black text-slate-900">
                        👤 اطلاعات شخصی
                      </h3>

                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        <Info
                          title="نام"
                          value={
                            professional.first_name
                          }
                        />

                        <Info
                          title="نام خانوادگی"
                          value={
                            professional.last_name
                          }
                        />

                        <Info
                          title="نام کاربری"
                          value={
                            professional.username
                          }
                        />

                        <Info
                          title="شماره موبایل"
                          value={
                            professional.phone
                          }
                        />

                        <Info
                          title="کد ملی"
                          value={
                            professional.national_code
                          }
                        />

                        <Info
                          title="تاریخ تولد"
                          value={
                            professional.birth_date
                          }
                        />

                      </div>
                    </div>

                    {/* ================= SERVICE INFO ================= */}

                    <div className="border-t border-slate-100 p-6">

                      <h3 className="mb-5 text-xl font-black text-slate-900">
                        🏗️ اطلاعات تخصص و فعالیت
                      </h3>

                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        <Info
                          title="خدمت / تخصص"
                          value={
                            professional.service
                          }
                        />

                        <Info
                          title="استان"
                          value={
                            professional.province
                          }
                        />

                        <Info
                          title="شهر"
                          value={
                            professional.city
                          }
                        />

                        <Info
                          title="محدوده فعالیت"
                          value={
                            professional.activity_area
                          }
                        />

                        <Info
                          title="سابقه کار"
                          value={
                            professional.experience
                          }
                        />

                        <Info
                          title="نوع همکاری"
                          value={
                            professional.cooperation_type
                          }
                        />

                        <Info
                          title="زمان فعالیت"
                          value={
                            professional.availability
                          }
                        />

                        <Info
                          title="نمایش شماره تلفن"
                          value={
                            professional.show_phone
                              ? "بله"
                              : "خیر"
                          }
                        />

                      </div>

                      {/* Skills */}

                      <LongInfo
                        title="مهارت‌ها"
                        value={
                          professional.skills
                        }
                      />

                      {/* Certificates */}

                      <LongInfo
                        title="مدارک و گواهینامه‌ها"
                        value={
                          professional.certificates
                        }
                      />

                      {/* Price */}

                      <LongInfo
                        title="اطلاعات قیمت"
                        value={
                          professional.price_info
                        }
                      />

                      {/* Description */}

                      <LongInfo
                        title="معرفی و توضیحات متخصص"
                        value={
                          professional.description
                        }
                      />

                    </div>

                    {/* ================= ADMIN INFO ================= */}

                    {(professional.admin_note ||
                      professional.rejection_reason) && (

                      <div className="border-t border-slate-100 bg-slate-50 p-6">

                        <h3 className="mb-4 text-xl font-black">
                          📝 اطلاعات مدیریت
                        </h3>

                        {professional.admin_note && (
                          <div className="mb-3 rounded-xl bg-white p-4">
                            <span className="font-bold">
                              یادداشت مدیر:
                            </span>

                            <p className="mt-2 text-slate-600">
                              {
                                professional.admin_note
                              }
                            </p>
                          </div>
                        )}

                        {professional.rejection_reason && (
                          <div className="rounded-xl bg-white p-4">
                            <span className="font-bold text-red-600">
                              دلیل رد:
                            </span>

                            <p className="mt-2 text-slate-600">
                              {
                                professional.rejection_reason
                              }
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                    {/* ================= ACTIONS ================= */}

                    <div className="flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row">

                      {professional.status ===
                        "pending" && (
                        <>
                          <button
                            disabled={
                              updatingId ===
                              professional.id
                            }
                            onClick={() =>
                              updateStatus(
                                professional.id,
                                "approved"
                              )
                            }
                            className="rounded-xl bg-emerald-600 px-8 py-4 font-black text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {updatingId ===
                            professional.id
                              ? "در حال انجام..."
                              : "✓ تأیید و انتشار متخصص"}
                          </button>

                          <button
                            disabled={
                              updatingId ===
                              professional.id
                            }
                            onClick={() =>
                              updateStatus(
                                professional.id,
                                "rejected"
                              )
                            }
                            className="rounded-xl bg-red-600 px-8 py-4 font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            ✕ رد درخواست
                          </button>
                        </>
                      )}

                      {professional.status ===
                        "approved" && (
                        <button
                          disabled={
                            updatingId ===
                            professional.id
                          }
                          onClick={() =>
                            updateStatus(
                              professional.id,
                              "rejected"
                            )
                          }
                          className="rounded-xl bg-red-600 px-8 py-4 font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ✕ لغو تأیید و رد متخصص
                        </button>
                      )}

                      {professional.status ===
                        "rejected" && (
                        <button
                          disabled={
                            updatingId ===
                            professional.id
                          }
                          onClick={() =>
                            updateStatus(
                              professional.id,
                              "approved"
                            )
                          }
                          className="rounded-xl bg-emerald-600 px-8 py-4 font-black text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ✓ تأیید و انتشار متخصص
                        </button>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>
    </main>
  );
}

/*
 * کامپوننت نمایش اطلاعات کوتاه
 */
function Info({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <span className="text-sm text-slate-400">
        {title}
      </span>

      <p className="mt-1 break-words font-bold text-slate-800">
        {value || "ثبت نشده"}
      </p>

    </div>
  );
}

/*
 * کامپوننت نمایش اطلاعات طولانی
 */
function LongInfo({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) {
  return (
    <div className="mt-5 rounded-2xl bg-slate-50 p-5">

      <span className="text-sm font-bold text-slate-400">
        {title}
      </span>

      <p className="mt-2 whitespace-pre-wrap leading-8 text-slate-700">
        {value || "ثبت نشده است."}
      </p>

    </div>
  );
              }
