"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Tender = {
  id: string | number;
  title: string;
  type: string;
  province: string;
  city: string;
  issuer: string;
  issuerType: string;
  budget: string;
  deadline: string;
  participationFee: string;
  description: string;
  status: string;
  createdAt: string;
};

const sampleTenders: Tender[] = [
  {
    id: "sample-1",
    title: "اجرای عملیات ساختمانی و تکمیل پروژه مسکونی",
    type: "مناقصه اجرای ساختمان",
    province: "آذربایجان شرقی",
    city: "تبریز",
    issuer: "انبوه‌ساز و سرمایه‌گذار پروژه",
    issuerType: "حقیقی",
    budget: "اعلام پس از بررسی اسناد",
    deadline: "۱۴۰۵/۰۶/۳۰",
    participationFee: "۵۰۰٬۰۰۰ تومان",
    description:
      "انتخاب پیمانکار واجد شرایط جهت اجرای عملیات ساختمانی، تأسیسات و تکمیل پروژه.",
    status: "فعال",
    createdAt: "۱۴۰۵/۰۵/۰۱",
  },
  {
    id: "sample-2",
    title: "تأمین و اجرای درب و پنجره پروژه ساختمانی",
    type: "مناقصه تأمین و اجرا",
    province: "تهران",
    city: "تهران",
    issuer: "شرکت ساختمانی",
    issuerType: "حقوقی",
    budget: "اعلام در اسناد مناقصه",
    deadline: "۱۴۰۵/۰۷/۱۰",
    participationFee: "۷۵۰٬۰۰۰ تومان",
    description:
      "تأمین، ساخت و نصب درب و پنجره UPVC و آلومینیومی مطابق مشخصات فنی پروژه.",
    status: "فعال",
    createdAt: "۱۴۰۵/۰۵/۰۴",
  },
  {
    id: "sample-3",
    title: "اجرای نمای ساختمان و سنگ‌کاری پروژه",
    type: "مناقصه اجرای نما",
    province: "آذربایجان غربی",
    city: "ارومیه",
    issuer: "مجری پروژه ساختمانی",
    issuerType: "حقیقی",
    budget: "اعلام در اسناد مناقصه",
    deadline: "۱۴۰۵/۰۶/۲۵",
    participationFee: "۳۵۰٬۰۰۰ تومان",
    description:
      "انتخاب مجری جهت اجرای نمای ساختمان شامل زیرسازی، سنگ‌کاری و جزئیات اجرایی.",
    status: "فعال",
    createdAt: "۱۴۰۵/۰۵/۰۶",
  },
];

function normalizeTender(row: any): Tender {
  return {
    id: row.id ?? crypto.randomUUID(),

    title:
      row.title ??
      row.project_title ??
      row.projectTitle ??
      row.name ??
      "پروژه ساختمانی",

    type:
      row.type ??
      row.project_type ??
      row.tender_type ??
      row.tenderType ??
      "مناقصه ساختمانی",

    province:
      row.province ??
      row.project_province ??
      row.location_province ??
      "نامشخص",

    city:
      row.city ??
      row.project_city ??
      row.location_city ??
      "نامشخص",

    issuer:
      row.issuer ??
      row.issuer_name ??
      row.organization_name ??
      row.company_name ??
      row.full_name ??
      "ثبت‌کننده پروژه",

    issuerType:
      row.issuer_type ??
      row.applicant_type ??
      row.person_type ??
      "حقوقی",

    budget:
      row.budget ??
      row.project_budget ??
      row.estimated_budget ??
      "اعلام در اسناد مناقصه",

    deadline:
      row.deadline ??
      row.submission_deadline ??
      row.proposal_deadline ??
      row.offer_deadline ??
      "اعلام نشده",

    participationFee:
      row.participation_fee ??
      row.tender_fee ??
      row.registration_fee ??
      "رایگان",

    description:
      row.description ??
      row.project_description ??
      row.project_needs ??
      row.details ??
      "اطلاعات کامل پروژه در اسناد مناقصه درج شده است.",

    status: row.status ?? "فعال",

    createdAt:
      row.created_at ??
      row.createdAt ??
      row.created_date ??
      "",
  };
}

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("همه استان‌ها");
  const [type, setType] = useState("همه انواع");
  const [sort, setSort] = useState("جدیدترین");

  useEffect(() => {
    loadTenders();
  }, []);

  async function loadTenders() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("tenders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("TENDERS ERROR:", error);

        setTenders(sampleTenders);
        return;
      }

      if (data && data.length > 0) {
        setTenders(data.map(normalizeTender));
      } else {
        setTenders(sampleTenders);
      }
    } catch (error) {
      console.error(error);
      setTenders(sampleTenders);
    } finally {
      setLoading(false);
    }
  }

  const provinces = useMemo(() => {
    const values = tenders
      .map((item) => item.province)
      .filter(Boolean);

    return ["همه استان‌ها", ...Array.from(new Set(values))];
  }, [tenders]);

  const tenderTypes = useMemo(() => {
    const values = tenders
      .map((item) => item.type)
      .filter(Boolean);

    return ["همه انواع", ...Array.from(new Set(values))];
  }, [tenders]);

  const filteredTenders = useMemo(() => {
    let result = [...tenders];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((item) =>
        [
          item.title,
          item.type,
          item.province,
          item.city,
          item.issuer,
          item.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (province !== "همه استان‌ها") {
      result = result.filter(
        (item) => item.province === province
      );
    }

    if (type !== "همه انواع") {
      result = result.filter((item) => item.type === type);
    }

    if (sort === "جدیدترین") {
      result.reverse();
    }

    return result;
  }, [tenders, search, province, type, sort]);

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
              alt="لوگوی سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-2xl font-black tracking-tight text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                بازار هوشمند ساخت‌وساز
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">
            <Link
              href="/"
              className="hover:text-blue-700"
            >
              خانه
            </Link>

            <Link
              href="/materials"
              className="hover:text-blue-700"
            >
              مصالح و تجهیزات
            </Link>

            <Link
              href="/service"
              className="hover:text-blue-700"
            >
              خدمات ساختمانی
            </Link>

            <Link
              href="/tenders"
              className="text-blue-700"
            >
              مناقصات کشوری
            </Link>

            <Link
              href="/about"
              className="hover:text-blue-700"
            >
              درباره سرچنو
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/tenders/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              ثبت پروژه
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/monagese.jpg"
            alt="مناقصات کشوری سرچنو"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/75" />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/70 to-blue-950/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-28 lg:py-32">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur-md">
              <span>🏗️</span>
              مناقصات و پروژه‌های ساختمانی سراسر کشور
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              پروژه‌های بزرگ،
              <span className="block text-cyan-300">
                فرصت‌های بزرگ‌تر
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-9 text-blue-100 sm:text-lg">
              در سرچنو پروژه‌های ساختمانی و عمرانی ثبت‌شده را
              ببینید، اسناد پروژه را بررسی کنید و برای اجرای
              پروژه مورد نظر خود پیشنهاد ارسال کنید.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#tenders"
                className="rounded-2xl bg-white px-7 py-4 text-center font-black text-blue-800 shadow-xl transition hover:-translate-y-1"
              >
                مشاهده مناقصات فعال
              </a>

              <Link
                href="/tenders/register"
                className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                ثبت پروژه و مناقصه
              </Link>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["📋", "پروژه‌های فعال"],
                ["🏢", "سازمان‌ها و شرکت‌ها"],
                ["👷", "پیمانکاران و متخصصان"],
                ["🇮🇷", "پوشش کشوری"],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                >
                  <div className="text-xl">{icon}</div>
                  <div className="mt-2 text-xs font-bold text-blue-100">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section
        id="tenders"
        className="mx-auto max-w-7xl px-5 py-16"
      >
        {/* Section title */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-sm font-black text-blue-700">
              فرصت‌های پروژه
            </span>

            <h2 className="mt-2 text-3xl font-black">
              مناقصات فعال ساختمانی
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-500">
              پروژه مناسب تخصص و ظرفیت خود را پیدا کنید و
              پیشنهاد اجرای خود را برای برگزارکننده ارسال کنید.
            </p>
          </div>

          <Link
            href="/tenders/register"
            className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-800"
          >
            ثبت پروژه جدید
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">
              <span className="text-xl">🔍</span>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="نام پروژه، تخصص، شهر یا برگزارکننده را جست‌وجو کنید..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <select
              value={province}
              onChange={(e) =>
                setProvince(e.target.value)
              }
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-bold outline-none"
            >
              {provinces.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-bold outline-none"
            >
              {tenderTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-bold outline-none"
            >
              <option>جدیدترین</option>
              <option>نزدیک‌ترین مهلت</option>
            </select>
          </div>
        </div>

        {/* Result header */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-500">
            {loading
              ? "در حال دریافت مناقصات..."
              : `${filteredTenders.length} مناقصه قابل مشاهده`}
          </div>

          <div className="hidden text-xs text-slate-400 sm:block">
            فقط پروژه‌های بدون تأمین مالی در این بخش منتشر می‌شوند.
          </div>
        </div>

        {/* Tender Cards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-[2rem] bg-white"
                />
              ))}
            </>
          ) : filteredTenders.length === 0 ? (
            <div className="lg:col-span-2 rounded-[2rem] border border-dashed border-slate-300 bg-white p-16 text-center">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-5 text-xl font-black">
                مناقصه‌ای پیدا نشد
              </h3>

              <p className="mt-3 text-sm text-slate-500">
                فیلترها یا عبارت جست‌وجو را تغییر دهید.
              </p>
            </div>
          ) : (
            filteredTenders.map((tender) => (
              <article
                key={tender.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl"
              >
                {/* Card top */}
                <div className="relative overflow-hidden bg-gradient-to-l from-blue-950 to-blue-800 p-6 text-white">
                  <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-300">
                        ● {tender.status}
                      </div>

                      <h3 className="mt-4 text-xl font-black leading-8">
                        {tender.title}
                      </h3>

                      <div className="mt-3 text-sm text-blue-100">
                        {tender.type}
                      </div>
                    </div>

                    <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur sm:flex">
                      🏗️
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="line-clamp-2 text-sm leading-7 text-slate-500">
                    {tender.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-400">
                        محل اجرای پروژه
                      </div>

                      <div className="mt-2 text-sm font-black">
                        📍 {tender.province}
                        {tender.city &&
                          tender.city !== "نامشخص"
                          ? `، ${tender.city}`
                          : ""}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-400">
                        برگزارکننده
                      </div>

                      <div className="mt-2 truncate text-sm font-black">
                        {tender.issuer}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-red-50 p-4">
                      <div className="text-xs text-red-400">
                        مهلت ارسال پیشنهاد
                      </div>

                      <div className="mt-2 text-sm font-black text-red-700">
                        ⏰ {tender.deadline}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4">
                      <div className="text-xs text-amber-500">
                        هزینه شرکت
                      </div>

                      <div className="mt-2 text-sm font-black text-amber-700">
                        💳 {tender.participationFee}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div className="text-xs text-slate-400">
                      نوع برگزارکننده:{" "}
                      <span className="font-bold text-slate-600">
                        {tender.issuerType}
                      </span>
                    </div>

                    <Link
                      href={`/tenders/${tender.id}`}
                      className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition group-hover:bg-blue-800"
                    >
                      مشاهده جزئیات ←
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* How Tender Works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center">
            <span className="text-sm font-black text-blue-700">
              فرآیند شرکت
            </span>

            <h2 className="mt-3 text-3xl font-black">
              شرکت در مناقصه در سرچنو چطور انجام می‌شود؟
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-500">
              روند شرکت ساده طراحی شده تا پیمانکاران، فروشندگان
              و متخصصان بتوانند سریع پروژه مناسب خود را پیدا کنند.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              [
                "۱",
                "پروژه را پیدا کنید",
                "مناقصه متناسب با تخصص، شهر و ظرفیت خود را انتخاب کنید.",
              ],
              [
                "۲",
                "اسناد را بررسی کنید",
                "شرح پروژه، شرایط، مهلت و مدارک مورد نیاز را مطالعه کنید.",
              ],
              [
                "۳",
                "پیشنهاد ارسال کنید",
                "پیشنهاد اجرای پروژه و مدارک مورد نیاز را ارسال کنید.",
              ],
              [
                "۴",
                "انتخاب شوید",
                "برگزارکننده پیشنهادها را بررسی کرده و پیمانکار مناسب را انتخاب می‌کند.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-black text-white">
                  {number}
                </div>

                <h3 className="mt-5 font-black">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-800 to-blue-950 p-8 text-white sm:p-10">
            <div className="text-4xl">🏢</div>

            <h2 className="mt-6 text-2xl font-black">
              پروژه ساختمانی دارید؟
            </h2>

            <p className="mt-4 leading-8 text-blue-100">
              پروژه خود را در سرچنو ثبت کنید تا پیمانکاران،
              فروشندگان و متخصصان واجد شرایط بتوانند پیشنهاد
              خود را ارسال کنند.
            </p>

            <Link
              href="/tenders/register"
              className="mt-7 inline-block rounded-xl bg-white px-6 py-4 font-black text-blue-800 transition hover:bg-blue-50"
            >
              ثبت پروژه
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white sm:p-10">
            <div className="text-4xl">👷</div>

            <h2 className="mt-6 text-2xl font-black">
              پیمانکار یا متخصص هستید؟
            </h2>

            <p className="mt-4 leading-8 text-emerald-50">
              پروژه‌های متناسب با تخصص خود را پیدا کنید،
              اسناد را بررسی کنید و برای برنده شدن در پروژه
              پیشنهاد حرفه‌ای خود را ارسال کنید.
            </p>

            <Link
              href="#tenders"
              className="mt-7 inline-block rounded-xl bg-white px-6 py-4 font-black text-emerald-800 transition hover:bg-emerald-50"
            >
              مشاهده مناقصات
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-right">
            <div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <img
                  src="/logo.png"
                  alt="سرچنو"
                  className="h-11 w-11 rounded-xl object-contain"
                />

                <div>
                  <div className="text-xl font-black text-white">
                    سرچنو
                  </div>

                  <div className="text-xs text-slate-500">
                    بازار هوشمند ساخت‌وساز
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                سامانه جست‌وجو، ارتباط و برگزاری فرصت‌های
                پروژه و مناقصات صنعت ساختمان.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-sm">
              <Link
                href="/"
                className="hover:text-white"
              >
                خانه
              </Link>

              <Link
                href="/materials"
                className="hover:text-white"
              >
                مصالح
              </Link>

              <Link
                href="/service"
                className="hover:text-white"
              >
                خدمات
              </Link>

              <Link
                href="/tenders/register"
                className="hover:text-white"
              >
                ثبت پروژه
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
            © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </main>
  );
}
