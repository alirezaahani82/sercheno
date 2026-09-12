"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";

type Professional = {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  service: string;
  province: string;
  city: string;
  activity_area: string;
  experience: string;
  description: string;
  skills: string;
  cooperation_type: string;
  availability: string;
  certificates: string;
  price_info: string;
  show_phone: boolean;
  profile_image_url?: string | null;
  work_image_1_url?: string | null;
  work_image_2_url?: string | null;
  work_image_3_url?: string | null;
  status: string;
  created_at: string;
  rating?: number | null;
  review_count?: number | null;
  rank?: string | null;
};

export default function ProfessionalPage() {
  const params = useParams();
  const id = params?.id as string;

  const [professional, setProfessional] =
    useState<Professional | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfessional() {
      try {
        const response = await fetch("/api/services", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "خطا در دریافت اطلاعات متخصص"
          );
        }

        const found = Array.isArray(data)
          ? data.find(
              (item: Professional) => item.id === id
            )
          : null;

        if (!found) {
          setError("متخصص موردنظر پیدا نشد.");
          return;
        }

        setProfessional(found);
      } catch (err) {
        console.error(err);

        setError(
          "دریافت اطلاعات متخصص با مشکل مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProfessional();
    }
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">
            👷
          </div>

          <p className="text-gray-500">
            در حال دریافت اطلاعات متخصص...
          </p>
        </div>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error || !professional) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">

          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h1 className="text-xl font-bold text-gray-900">
            {error || "متخصص پیدا نشد"}
          </h1>

          <p className="mt-3 text-gray-500">
            ممکن است متخصص هنوز تأیید نشده باشد
            یا اطلاعات او در دسترس نباشد.
          </p>

          <Link
            href="/service"
            className="inline-block mt-6 rounded-xl bg-gray-900 text-white px-6 py-3"
          >
            بازگشت به خدمات
          </Link>

        </div>
      </main>
    );
  }

  /* ================= CATEGORY ================= */

  const category = SERVICE_CATEGORIES.find(
    (item) => item.name === professional.service
  );

  const categoryHref = category
    ? `/service/${category.slug}`
    : "/service";

  /* ================= PORTFOLIO ================= */

  const portfolioImages = [
    professional.work_image_1_url,
    professional.work_image_2_url,
    professional.work_image_3_url,
  ].filter(Boolean) as string[];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50"
    >

      {/* ================= TOP ================= */}

      <section className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 py-4">

          <Link
            href={categoryHref}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            ← بازگشت به {professional.service}
          </Link>

        </div>

      </section>


      {/* ================= PROFILE HEADER ================= */}

      <section className="relative overflow-hidden bg-gray-900">

        <div className="absolute inset-0 opacity-20">

          {professional.profile_image_url && (
            <img
              src={professional.profile_image_url}
              alt=""
              className="w-full h-full object-cover blur-2xl"
            />
          )}

        </div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* ================= PROFILE PHOTO ================= */}

            <div className="shrink-0">

              <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden border-4 border-white/20 bg-gray-200 shadow-2xl">

                {professional.profile_image_url ? (

                  <img
                    src={professional.profile_image_url}
                    alt={`${professional.first_name} ${professional.last_name}`}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-7xl">
                    👷
                  </div>

                )}

              </div>

            </div>


            {/* ================= BASIC INFO ================= */}

            <div className="text-white text-center md:text-right flex-1">

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">

                <span className="rounded-full bg-amber-400/20 border border-amber-300/30 px-4 py-1.5 text-sm text-amber-200">
                  رتبه: {professional.rank || "ویژه"}
                </span>

                <span className="rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm">
                  ✓ تأیید شده توسط سرچنو
                </span>

              </div>


              <h1 className="text-3xl md:text-5xl font-bold">
                {professional.first_name}{" "}
                {professional.last_name}
              </h1>


              <p className="mt-4 text-xl text-white/90">
                {professional.service}
              </p>


              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  ⭐ {professional.rating || 4.8}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  {professional.review_count || 12} نظر
                </span>

                {professional.experience && (
                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    سابقه: {professional.experience}
                  </span>
                )}

              </div>


              <div className="mt-6 text-white/80">

                📍{" "}
                {professional.city || "نامشخص"}

                {professional.province
                  ? `، ${professional.province}`
                  : ""}

                {professional.activity_area
                  ? ` — ${professional.activity_area}`
                  : ""}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          {/* ================= MAIN ================= */}

          <div className="lg:col-span-2 space-y-8">


            {/* ================= ABOUT ================= */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <h2 className="text-2xl font-bold text-gray-900">
                درباره این متخصص
              </h2>

              <div className="mt-5 text-gray-600 leading-8 whitespace-pre-line">

                {professional.description ||
                  "توضیحاتی برای این متخصص ثبت نشده است."}

              </div>

            </section>


            {/* ================= SKILLS ================= */}

            {professional.skills && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  مهارت‌ها و تخصص‌ها
                </h2>

                <div className="mt-5 bg-gray-50 rounded-xl p-5 text-gray-700 leading-8 whitespace-pre-line">
                  {professional.skills}
                </div>

              </section>
            )}


            {/* ================= CERTIFICATES ================= */}

            {professional.certificates && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  مدارک و گواهینامه‌ها
                </h2>

                <div className="mt-5 bg-gray-50 rounded-xl p-5 text-gray-700 leading-8 whitespace-pre-line">
                  {professional.certificates}
                </div>

              </section>
            )}


            {/* ================= PORTFOLIO ================= */}

            {portfolioImages.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  نمونه‌کارها
                </h2>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                  {portfolioImages.map(
                    (image, index) => (

                      <div
                        key={image}
                        className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
                      >

                        <img
                          src={image}
                          alt={`نمونه کار ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />

                      </div>

                    )
                  )}

                </div>

              </section>
            )}


            {/* ================= WORK INFORMATION ================= */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <h2 className="text-2xl font-bold text-gray-900">
                اطلاعات همکاری
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">


                {professional.cooperation_type && (
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      نوع همکاری
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {professional.cooperation_type}
                    </p>

                  </div>
                )}


                {professional.availability && (
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      زمان فعالیت
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {professional.availability}
                    </p>

                  </div>
                )}


                {professional.price_info && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">

                    <p className="text-sm text-gray-500">
                      اطلاعات هزینه خدمات
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {professional.price_info}
                    </p>

                  </div>
                )}

              </div>

            </section>

          </div>


          {/* ================= SIDEBAR ================= */}

          <aside className="space-y-6">


            {/* ================= CONTACT CARD ================= */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">

              <h2 className="text-xl font-bold text-gray-900">
                ارتباط با متخصص
              </h2>

              <p className="mt-3 text-sm text-gray-500 leading-6">
                برای دریافت اطلاعات بیشتر درباره خدمات،
                هزینه و هماهنگی پروژه می‌توانید با متخصص تماس بگیرید.
              </p>


              {professional.show_phone &&
              professional.phone ? (

                <a
                  href={`tel:${professional.phone}`}
                  className="mt-6 block w-full text-center rounded-xl bg-gray-900 text-white py-4 font-bold hover:bg-black transition"
                >
                  📞 تماس با متخصص
                </a>

              ) : (

                <div className="mt-6 rounded-xl bg-gray-100 text-gray-500 text-center py-4 text-sm">
                  شماره تماس توسط متخصص نمایش داده نشده است.
                </div>

              )}


              <div className="mt-6 pt-6 border-t border-gray-100">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-gray-500">
                    وضعیت
                  </span>

                  <span className="text-green-600 font-bold">
                    ✓ تأیید شده
                  </span>

                </div>


                <div className="flex items-center justify-between text-sm mt-4">

                  <span className="text-gray-500">
                    دسته‌بندی
                  </span>

                  <span className="font-bold text-gray-900">
                    {professional.service}
                  </span>

                </div>

              </div>

            </section>


            {/* ================= LOCATION ================= */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

              <h2 className="text-xl font-bold text-gray-900">
                محل فعالیت
              </h2>

              <div className="mt-5 space-y-4">

                <div>

                  <p className="text-sm text-gray-500">
                    استان
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {professional.province || "ثبت نشده"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    شهر
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {professional.city || "ثبت نشده"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    محدوده فعالیت
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {professional.activity_area || "ثبت نشده"}
                  </p>

                </div>

              </div>

            </section>

          </aside>

        </div>

      </section>


      {/* ================= FOOTER CTA ================= */}

      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-4 py-12 text-center">

          <h2 className="text-2xl md:text-3xl font-bold">
            سرچنو؛ ارتباط مستقیم با متخصصان ساخت‌وساز
          </h2>

          <p className="mt-4 text-white/70">
            متخصص موردنظر خود را پیدا کنید و اجرای پروژه خود را آسان‌تر کنید.
          </p>

          <Link
            href="/service"
            className="inline-block mt-6 bg-white text-gray-900 rounded-xl px-8 py-3 font-bold hover:bg-gray-100 transition"
          >
            مشاهده همه خدمات
          </Link>

        </div>

      </section>

    </main>
  );
                    }
