"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  SERVICE_CATEGORIES,
  getServiceCategory,
} from "@/lib/service-categories";

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

export default function ServiceCategoryPage() {
  const params = useParams();

  const slug = params?.slug as string;

  const [professionals, setProfessionals] = useState<
    Professional[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const category = getServiceCategory(slug);

  useEffect(() => {
    async function loadProfessionals() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/services", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "خطا در دریافت متخصصان"
          );
        }

        const approvedProfessionals =
          Array.isArray(data)
            ? data.filter(
                (item: Professional) =>
                  item.service === category?.name
              )
            : [];

        setProfessionals(
          approvedProfessionals
        );
      } catch (err) {
        console.error(err);

        setError(
          "دریافت اطلاعات متخصصان با مشکل مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      loadProfessionals();
    } else {
      setLoading(false);
      setError(
        "دسته‌بندی موردنظر پیدا نشد."
      );
    }
  }, [slug, category?.name]);

  /* ================= CATEGORY NOT FOUND ================= */

  if (!category) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">

          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            دسته‌بندی پیدا نشد
          </h1>

          <p className="mt-3 text-gray-500">
            صفحه‌ای که به دنبال آن هستید وجود ندارد.
          </p>

          <Link
            href="/service"
            className="inline-block mt-6 rounded-xl bg-gray-900 text-white px-6 py-3"
          >
            مشاهده همه خدمات
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50"
    >

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="relative h-[280px] md:h-[400px]">

          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">

            <div className="text-white max-w-3xl">

              <p className="mb-4 text-sm md:text-base text-white/80">
                سرچنو | پلتفرم هوشمند ساخت‌وساز
              </p>

              <h1 className="text-3xl md:text-5xl font-bold">
                {category.name}
              </h1>

              <p className="mt-5 text-sm md:text-lg text-white/90 leading-8">
                {category.description}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BREADCRUMB ================= */}

      <section className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/service"
              className="hover:text-gray-900"
            >
              خدمات
            </Link>

            <span>←</span>

            <span className="text-gray-900 font-medium">
              {category.name}
            </span>

          </div>

        </div>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        {/* ================= TITLE ================= */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                متخصصان {category.name}
              </h2>

              <p className="mt-2 text-gray-600">
                متخصص موردنظر خود را انتخاب کنید و اطلاعات کامل او را مشاهده کنید.
              </p>

            </div>


            {!loading &&
              !error &&
              professionals.length > 0 && (

                <div className="rounded-xl bg-white border border-gray-100 px-4 py-3 text-sm text-gray-600">

                  <span className="font-bold text-gray-900">
                    {professionals.length}
                  </span>{" "}
                  متخصص تأییدشده

                </div>

              )}

          </div>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="text-center py-20">

            <div className="text-5xl mb-4">
              👷
            </div>

            <p className="text-gray-500">
              در حال دریافت متخصصان...
            </p>

          </div>

        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              خطا در دریافت اطلاعات
            </h3>

            <p className="mt-3 text-red-500">
              {error}
            </p>

          </div>

        )}


        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          professionals.length === 0 && (

            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

              <div className="text-6xl mb-5">
                👷
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                هنوز متخصصی در این دسته ثبت نشده است
              </h3>

              <p className="mt-3 text-gray-500 leading-7">
                به‌زودی متخصصان تأییدشده این حوزه
                در سرچنو نمایش داده خواهند شد.
              </p>

              <Link
                href="/service/register"
                className="inline-block mt-6 rounded-xl bg-gray-900 text-white px-6 py-3"
              >
                ثبت‌نام به‌عنوان متخصص
              </Link>

            </div>

          )}


        {/* ================= PROFESSIONAL CARDS ================= */}

        {!loading &&
          !error &&
          professionals.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {professionals.map(
                (professional) => (

                  <Link
                    key={professional.id}
                    href={`/service/professional/${professional.id}`}
                    className="group"
                  >

                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

                      {/* ================= PHOTO ================= */}

                      <div className="relative h-64 bg-gray-100 overflow-hidden">

                        {professional.profile_image_url ? (

                          <img
                            src={
                              professional.profile_image_url
                            }
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
                            ⭐{" "}
                            {professional.rating || 4.8}
                          </span>

                        </div>


                        {/* ================= RANK ================= */}

                        <div className="mt-2">

                          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">

                            رتبه:{" "}
                            {professional.rank ||
                              "ویژه"}

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

                            {professional.city ||
                              "نامشخص"}

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

                )
              )}

            </div>

          )}

      </section>


      {/* ================= OTHER CATEGORIES ================= */}

      <section className="bg-white border-t border-gray-100">

        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-gray-900">
              سایر خدمات سرچنو
            </h2>

            <p className="mt-2 text-gray-500">
              برای مشاهده متخصصان سایر حوزه‌ها، یکی از دسته‌ها را انتخاب کنید.
            </p>

          </div>


          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {SERVICE_CATEGORIES
              .filter(
                (item) =>
                  item.slug !== category.slug
              )
              .map((item) => (

                <Link
                  key={item.slug}
                  href={`/service/${item.slug}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >

                  <div className="h-32 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                  </div>

                  <div className="p-4">

                    <h3 className="font-bold text-gray-900">
                      {item.name}
                    </h3>

                  </div>

                </Link>

              ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-4 py-12 text-center">

          <h2 className="text-2xl md:text-3xl font-bold">
            متخصص هستید؟
          </h2>

          <p className="mt-4 text-white/70">
            خدمات خود را در سرچنو ثبت کنید و به مشتریان جدید دسترسی پیدا کنید.
          </p>

          <Link
            href="/service/register"
            className="inline-block mt-6 bg-white text-gray-900 rounded-xl px-8 py-3 font-bold hover:bg-gray-100 transition"
          >
            ثبت‌نام به‌عنوان متخصص
          </Link>

        </div>

      </section>

    </main>
  );
        }
