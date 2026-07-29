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
};

export default function AdminPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfessionals = async () => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ADMIN ERROR:", error);
      alert("خطا در دریافت اطلاعات");
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
      alert("خطا در تغییر وضعیت");
      return;
    }

    alert(
      status === "approved"
        ? "متخصص با موفقیت تأیید شد."
        : "متخصص رد شد."
    );

    fetchProfessionals();
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-100 p-5">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            پنل مدیریت سرچنو
          </h1>

          <p className="mt-2 text-slate-500">
            بررسی و مدیریت درخواست‌های ثبت خدمات
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center">
            در حال دریافت اطلاعات...
          </div>
        ) : professionals.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center">
            <div className="text-4xl">📭</div>

            <h2 className="mt-4 text-xl font-black">
              درخواست جدیدی وجود ندارد
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              همه درخواست‌ها بررسی شده‌اند.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {professionals.map((professional) => (
              <div
                key={professional.id}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5">

                  <div>
                    <h2 className="text-xl font-black">
                      {professional.first_name}{" "}
                      {professional.last_name}
                    </h2>

                    <p className="mt-2 text-blue-700 font-bold">
                      {professional.service}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <span className="text-sm text-slate-400">
                        شماره موبایل
                      </span>

                      <p className="font-bold">
                        {professional.phone}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm text-slate-400">
                        محل فعالیت
                      </span>

                      <p className="font-bold">
                        {professional.province} -{" "}
                        {professional.city}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm text-slate-400">
                        محدوده فعالیت
                      </span>

                      <p className="font-bold">
                        {professional.activity_area || "ثبت نشده"}
                      </p>
                    </div>
<div>
                      <span className="text-sm text-slate-400">
                        سابقه کار
                      </span>

                      <p className="font-bold">
                        {professional.experience || "ثبت نشده"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <span className="text-sm text-slate-400">
                      توضیحات متخصص
                    </span>

                    <p className="mt-2 leading-7">
                      {professional.description || "توضیحی ثبت نشده"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() =>
                        updateStatus(
                          professional.id,
                          "approved"
                        )
                      }
                      className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
                    >
                      ✓ تأیید متخصص
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          professional.id,
                          "rejected"
                        )
                      }
                      className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                    >
                      ✕ رد درخواست
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
