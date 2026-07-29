"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Professional = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  service: string;
  province: string;
  city: string;
  activity_area: string;
  experience: string;
  description: string;
  status: string;
  created_at: string;
};

export default function ServiceAdminPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

const fetchProfessionals = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from("professionals")
    .select("*");

  console.log("ADMIN DATA:", data);
  console.log("ADMIN ERROR:", error);

  if (error) {
    alert("خطا در دریافت اطلاعات: " + error.message);
    setLoading(false);
    return;
  }

    setProfessionals(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const updateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    const { error } = await supabase
      .from("professionals")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("UPDATE ERROR:", error);
      alert("خطا در تغییر وضعیت: " + error.message);
      return;
    }

    alert(
      status === "approved"
        ? "متخصص با موفقیت تأیید شد."
        : "درخواست متخصص رد شد."
    );

    fetchProfessionals();
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 p-5 sm:p-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900">
                پنل مدیریت خدمات سرچنو
              </h1>

              <p className="mt-2 text-slate-500">
                بررسی و مدیریت درخواست‌های ثبت متخصصان خدمات ساختمانی
              </p>
            </div>

            <button
              onClick={fetchProfessionals}
              className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
            >
              بروزرسانی
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-4xl">⏳</div>

            <p className="mt-4 font-bold text-slate-700">
              در حال دریافت درخواست‌ها...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && professionals.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">📭</div>

            <h2 className="mt-5 text-2xl font-black text-slate-900">
              درخواست جدیدی وجود ندارد
            </h2>

            <p className="mt-3 text-slate-500">
              در حال حاضر درخواست ثبت خدماتی برای بررسی وجود ندارد.
            </p>
          </div>
        )}

        {/* Professionals */}
        {!loading && professionals.length > 0 && (
          <div className="space-y-6">

            {professionals.map((professional) => (
              <div
                key={professional.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >

                {/* Card Header */}
                <div className="border-b border-slate-100 p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        {professional.first_name}{" "}
                        {professional.last_name}
                      </h2>
<p className="mt-2 font-bold text-blue-700">
                        {professional.service}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
                      در انتظار بررسی
                    </span>

                  </div>
                </div>

                {/* Information */}
                <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">

                  <div>
                    <span className="text-sm text-slate-400">
                      شماره موبایل
                    </span>

                    <p className="mt-1 font-bold">
                      {professional.phone || "ثبت نشده"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-slate-400">
                      استان
                    </span>

                    <p className="mt-1 font-bold">
                      {professional.province || "ثبت نشده"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-slate-400">
                      شهر
                    </span>

                    <p className="mt-1 font-bold">
                      {professional.city || "ثبت نشده"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-slate-400">
                      محدوده فعالیت
                    </span>

                    <p className="mt-1 font-bold">
                      {professional.activity_area || "ثبت نشده"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-slate-400">
                      سابقه کار
                    </span>

                    <p className="mt-1 font-bold">
                      {professional.experience || "ثبت نشده"}
                    </p>
                  </div>

                </div>

                {/* Description */}
                <div className="mx-6 rounded-2xl bg-slate-50 p-5">
                  <span className="text-sm font-bold text-slate-400">
                    معرفی و توضیحات متخصص
                  </span>

                  <p className="mt-2 leading-8 text-slate-700">
                    {professional.description || "توضیحی ثبت نشده است."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 p-6 sm:flex-row">

                  <button
                    onClick={() =>
                      updateStatus(
                        professional.id,
                        "approved"
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-8 py-4 font-black text-white hover:bg-emerald-700"
                  >
                    ✓ تأیید و انتشار متخصص
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        professional.id,
                        "rejected"
                      )
                    }
                    className="rounded-xl bg-red-600 px-8 py-4 font-black text-white hover:bg-red-700"
                  >
                    ✕ رد درخواست
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

