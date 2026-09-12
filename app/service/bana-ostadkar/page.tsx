"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Professional = {
  id: string;
  first_name: string;
  last_name: string;
  service: string;
  province: string;
  city: string;
  activity_area: string;
  experience: string;
  description: string;
  price_info: string;
  profile_image_url?: string | null;
  rating?: number | null;
  review_count?: number | null;
  rank?: string | null;
};

export default function BanaOstadkarPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const response = await fetch("/api/services", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "خطا در دریافت متخصصان"
          );
        }

        const approvedProfessionals = Array.isArray(data)
          ? data.filter(
              (item: Professional) =>
                item.service === "بنا و استادکار"
            )
          : [];

        setProfessionals(approvedProfessionals);
      } catch (err) {
        console.error(err);
        setError(
          "دریافت اطلاعات متخصصان با مشکل مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfessionals();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="relative h-[260px] md:h-[360px]">

          <img
            src="/images/services/bana-ostadkar.jpg"
            alt="بنا و استادکار سرچنو"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">

            <div className="text-white">

              <p className="mb-3 text-sm md:text-base text-white/80">
                سرچنو | پلتفرم هوشمند ساخت‌وساز
              </p>

              <h1 className="text-3xl md:text-5xl font-bold">
                بنا و استادکار
              </h1>

              <p className="mt-4 text-sm md:text-lg text-white/90 max-w-2xl mx-auto">
                پیدا کردن بناها و استادکاران ساختمانی تأییدشده در سرچنو
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            بناها و استادکاران تأییدشده
          </h2>

          <p className="mt-2 text-gray-600">
            متخصص موردنظر خود را انتخاب کنید و اطلاعات کامل او را مشاهده کنید.
          </p>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-20 text-gray-500">
            در حال دریافت متخصصان...
          </div>
        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="text-center py-20 text-red-500">
            {error}
          </div>
        )}


        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          professionals.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

              <div className="text-5xl mb-4">
                👷
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                هنوز متخصصی در این دسته ثبت نشده است
              </h3>

              <p className="mt-2 text-gray-500">
                به‌زودی بناها و استادکاران تأییدشده در این قسمت نمایش داده می‌شوند.
              </p>

            </div>
          )}


        {/* ================= PROFESSIONAL CARDS ================= */}

        {!loading &&
          !error &&
          professionals.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {professionals.map((professional) => (

                <Link
                  key={professional.id}
                  href={`/service/professional/${professional.id}`}
                  className="group"
                >

                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

                    {/* ================= PERSONAL PHOTO ================= */}

                    <div className="relative h-64 bg-gray-100 overflow-hidden">

                      {professional.profile_image_url ? (

                        <img
                          src={professional.profile_image_url}
                          alt={`${professional.first_name} ${professional.last_name}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-7xl">
                          👷
                        </div>

                      )}

                    </div>


                    {/* ================= INFO ================= */}

                    <div className="p-5">

                      <div className="flex items-center justify-between gap-2">

                        <h3 className="text-lg font-bold text-gray-900">

                          {professional.first_name}{" "}

                          {professional.last_name}

                        </h3>

                        <span className="text-sm whitespace-nowrap">
                          ⭐ 4.8
                        </span>

                      </div>


                      {/* ================= RANK ================= */}

                      <div className="mt-2">

                        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                          رتبه: ویژه
                        </span>

                      </div>


                      {/* ================= DETAILS ================= */}

                      <div className="mt-4 text-sm text-gray-600">

                        <div className="mb-2">

                          <span className="font-semibold text-gray-800">
                            تخصص:
                          </span>{" "}

                          {professional.service}

                        </div>


                        <div className="mb-2">

                          <span className="font-semibold text-gray-800">
                            محل فعالیت:
                          </span>{" "}

                          {professional.city || "نامشخص"}

                          {professional.province
                            ? `، ${professional.province}`
                            : ""}

                        </div>


                        {professional.experience && (

                          <div className="mb-2">

                            <span className="font-semibold text-gray-800">
                              سابقه:
                            </span>{" "}

                            {professional.experience}

                          </div>

                        )}

                      </div>


                      {/* ================= PRICE ================= */}

                      {professional.price_info && (

                        <div className="mt-4 pt-4 border-t border-gray-100">

                          <span className="text-xs text-gray-500">
                            هزینه خدمات
                          </span>

                          <p className="mt-1 font-bold text-gray-900">
                            {professional.price_info}
                          </p>

                        </div>

                      )}


                      {/* ================= BUTTON ================= */}

                      <div className="mt-5">

                        <span className="block text-center rounded-xl bg-gray-900 text-white py-3 text-sm font-medium group-hover:bg-black transition">

                          مشاهده پروفایل

                        </span>

                      </div>

                    </div>

                  </article>

                </Link>

              ))}

            </div>

          )}

      </section>

    </main>
  );
}
