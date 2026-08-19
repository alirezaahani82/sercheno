"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   ICON SYSTEM
   بدون ایموجی؛ آیکون‌های SVG سبک و حرفه‌ای
========================================================= */

type IconName =
  | "search"
  | "location"
  | "cart"
  | "user"
  | "store"
  | "worker"
  | "arrow"
  | "chevron"
  | "spark"
  | "robot"
  | "bell"
  | "building"
  | "shield"
  | "truck"
  | "check"
  | "phone"
  | "menu"
  | "close"
  | "tender"
  | "clock"
  | "star"
  | "filter"
  | "plus"
  | "message";

function Icon({
  name,
  size = 22,
  strokeWidth = 1.8,
  className = "",
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "location":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "cart":
      return (
        <svg {...common}>
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L20 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );

    case "store":
      return (
        <svg {...common}>
          <path d="M4 10v10h16V10" />
          <path d="M3 10 5 4h14l2 6" />
          <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );

    case "worker":
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21a7 7 0 0 1 14 0" />
          <path d="M7 6.5a5 5 0 0 1 10 0" />
          <path d="M8 5h8" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.2 5.8L19 11l-5.8 1.2L12 18l-1.2-5.8L5 11l5.8-2.2L12 3Z" />
          <path d="m19 17 .5 2.5L22 20l-2.5.5L19 23l-.5-2.5L16 20l2.5-.5L19 17Z" />
        </svg>
      );

    case "robot":
      return (
        <svg {...common}>
          <rect x="5" y="7" width="14" height="11" rx="3" />
          <path d="M12 3v4" />
          <circle cx="12" cy="2.5" r=".7" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <path d="M9 15h6" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M5 21V5l7-2 7 2v16" />
          <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
          <path d="M11 21v-4h2v4" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      );

    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v10H3z" />
          <path d="M14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M6 3h3l1.5 4-2 1.5a15 15 0 0 0 7 7L17 13l4 1.5v3c0 1.4-1 2.5-2.4 2.5C10.7 20.5 3.5 13.3 3.5 5.4 3.5 4 4.6 3 6 3Z" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case "tender":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M6 20V9h12v11" />
          <path d="M4 9h16" />
          <path d="m5 9 7-5 7 5" />
          <path d="M9 13h6M9 16h6" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
      );

    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.8-4A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   DATA
========================================================= */

const materialCategories = [
  {
    slug: "brick-block",
    title: "آجر، بلوک و سفال",
    count: "۱۲۴ فروشنده",
    image: "/materials/brick-block.jpg",
  },
  {
    slug: "cement-concrete",
    title: "سیمان و بتن",
    count: "۸۶ فروشنده",
    image: "/materials/cement-concrete.jpg",
  },
  {
    slug: "doors-windows",
    title: "درب و پنجره",
    count: "۷۴ فروشنده",
    image: "/materials/doors-windows.jpg",
  },
  {
    slug: "electrical-lighting",
    title: "برق و روشنایی",
    count: "۵۸ فروشنده",
    image: "/materials/electrical-lighting.jpg",
  },
  {
    slug: "insulation",
    title: "عایق و ایزوگام",
    count: "۳۶ فروشنده",
    image: "/materials/insulation.jpg",
  },
  {
    slug: "interior-decoration",
    title: "دکوراسیون داخلی",
    count: "۸۲ فروشنده",
    image: "/materials/interior-decoration.jpg",
  },
  {
    slug: "iron-steel",
    title: "آهن و فولاد",
    count: "۱۵۶ فروشنده",
    image: "/materials/iron-steel.jpg",
  },
  {
    slug: "mechanical-installations",
    title: "تأسیسات مکانیکی",
    count: "۴۷ فروشنده",
    image: "/materials/mechanical-installations.jpg",
  },
  {
    slug: "paint-coatings",
    title: "رنگ و پوشش",
    count: "۶۳ فروشنده",
    image: "/materials/paint-coatings.jpg",
  },
  {
    slug: "plumbing-pipes",
    title: "لوله و اتصالات",
    count: "۹۱ فروشنده",
    image: "/materials/plumbing-pipes.jpg",
  },
  {
    slug: "sanitary",
    title: "شیرآلات و تجهیزات بهداشتی",
    count: "۶۹ فروشنده",
    image: "/materials/sanitary.jpg",
  },
  {
    slug: "stone-tile",
    title: "سنگ نما، کاشی و سرامیک",
    count: "۲۱۸ فروشنده",
    image: "/materials/stone-tile.jpg",
  },
  {
    slug: "elevators",
    title: "آسانسور و تجهیزات",
    count: "۳۲ فروشنده",
    image: "/materials/elevator-hero.jpg",
  },
];

const serviceCategories = [
  {
    image: "/materials/bana.jpg",
    title: "بنا و استادکار",
    text: "اجرای انواع عملیات ساختمانی",
  },
  {
    image: "/materials/nasabpen.jpg",
    title: "نصاب درب و پنجره",
    text: "UPVC، آلومینیوم و شیشه",
  },
  {
    image: "/materials/kashikar.jpg",
    title: "نصاب کاشی و سرامیک",
    text: "اجرای حرفه‌ای و دقیق",
  },
  {
    image: "/materials/bargkar.jpg",
    title: "برق‌کار",
    text: "تأسیسات و برق ساختمان",
  },
  {
    image: "/materials/loolekesh.jpg",
    title: "لوله‌کش",
    text: "تأسیسات آب و فاضلاب",
  },
  {
    image: "/materials/jooshkar.jpg",
    title: "جوشکار",
    text: "انواع جوشکاری ساختمانی",
  },
  {
    image: "/materials/nagash.jpg",
    title: "نقاش ساختمان",
    text: "رنگ‌آمیزی و دکوراسیون",
  },
  {
    image: "/materials/gachkar.jpg",
    title: "گچ‌کار",
    text: "اجرای گچ‌کاری و سفیدکاری",
  },
  {
    image: "/materials/asansorkar.jpg",
    title: "نصاب و تعمیر آسانسور",
    text: "نصب، سرویس و تعمیر آسانسور",
  },
  {
    image: "/materials/nomakar.jpg",
    title: "نماکار",
    text: "اجرای انواع نمای ساختمان",
  },
  {
    image: "/materials/kanafkar.jpg",
    title: "کناف‌کار",
    text: "اجرای کناف و سقف کاذب",
  },
  {
    image: "/materials/mohandes.jpg",
    title: "مهندس و پیمانکار",
    text: "مهندسی، اجرا و مدیریت پروژه",
  },
];

const popularSearches = [
  {
    title: "میلگرد",
    href: "/materials/iron-steel",
  },
  {
    title: "کاشی و سرامیک",
    href: "/materials/stone-tile",
  },
  {
    title: "پنجره UPVC",
    href: "/materials/doors-windows",
  },
  {
    title: "سیمان",
    href: "/materials/cement-concrete",
  },
  {
    title: "آسانسور",
    href: "/materials/elevators",
  },
];

const popularServices = [
  "نصاب کاشی و سرامیک",
  "نصاب درب و پنجره",
  "بنا",
  "جوشکار",
  "برق‌کار",
  "لوله‌کش",
];

/* =========================================================
   SUPPORT CHAT
========================================================= */

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [repliedAt, setRepliedAt] = useState("");
   const [phone, setPhone] = useState<string | null>(null);
const [hasNewMessage, setHasNewMessage] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userName.trim() || !userPhone.trim() || !message.trim()) {
      alert("نام، شماره تماس و پیام را کامل وارد کنید.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName.trim(),
          user_phone: userPhone.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("خطا در ارسال پیام");
      }

      localStorage.setItem(
        "sercheno_support_phone",
        userPhone.trim()
      );

      setMessage("");

      alert("پیام شما با موفقیت برای پشتیبانی ارسال شد.");
      setOpen(false);
    } catch {
      alert("ارسال پیام انجام نشد. دوباره تلاش کنید.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    function openSupportChat() {
      setOpen(true);
    }

    window.addEventListener(
      "open-sercheno-support",
      openSupportChat
    );

    return () => {
      window.removeEventListener(
        "open-sercheno-support",
        openSupportChat
      );
    };
  }, []);

useEffect(() => {
  const savedPhone =
    localStorage.getItem("sercheno_support_phone");

  if (!savedPhone || !savedPhone.trim()) {
    return;
  }

  const cleanPhone = savedPhone.trim();

  setPhone(cleanPhone);

  async function checkMessage() {
    try {
      const response = await fetch(
        `/api/support?phone=${encodeURIComponent(cleanPhone)}`
      );

      if (!response.ok) return;

      const data = await response.json();

      if (data.hasNewMessage) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error(
        "SUPPORT NOTIFICATION ERROR:",
        error
      );
    }
  }

  checkMessage();

  const interval = setInterval(
    checkMessage,
    15000
  );

  return () => clearInterval(interval);
}, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-2xl shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-blue-800"
        title="پشتیبانی سرچنو"
      >
        <Icon name="message" size={25} />
      </button>

      {open && (
        <div className="fixed bottom-24 left-4 z-[9999] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-blue-700 p-5 text-white">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="سرچنو"
                className="h-11 w-11 rounded-xl bg-white object-contain p-1"
              />

              <div>
                <h3 className="font-black">
                  پشتیبانی سرچنو
                </h3>

                <p className="mt-1 text-xs text-blue-100">
                  پاسخ‌گوی شما هستیم
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {adminReply && (
            <div className="border-b border-slate-200 bg-emerald-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-black text-emerald-800">
                <Icon name="message" size={17} />
                پاسخ پشتیبانی
              </div>

              <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700 shadow-sm">
                {adminReply}
              </div>

              {repliedAt && (
                <div className="mt-2 text-[11px] text-slate-400">
                  پاسخ داده شده توسط پشتیبانی سرچنو
                </div>
              )}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-3 p-5"
          >
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              required
              className="w-full rounded-2xl bg-slate-100 p-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="شماره تماس"
              required
              dir="ltr"
              className="w-full rounded-2xl bg-slate-100 p-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="پیام خود را بنویسید..."
              required
              className="w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-2xl bg-blue-700 py-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-50"
            >
              {sending ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* =========================================================
   SUPPORT NOTIFICATION
========================================================= */

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("تبریز");

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [mobileMenu, setMobileMenu] = useState(false);

  async function askSerchenoAI() {
    const question = aiQuestion.trim();

    if (!question) return;

    setAiLoading(true);
    setAiError("");
    setAiAnswer("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        s: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "خطا در دریافت پاسخ"
        );
      }

      setAiAnswer(data.answer || "");
    } catch (error) {
      console.error("SERCHENO AI FRONTEND ERROR:", error);

      setAiError(
        "در ارتباط با هوش مصنوعی سرچنو خطایی رخ داد. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setAiLoading(false);
    }
  }

  function handleSearch() {
    const query = search.trim();

    if (!query) {
      window.location.href = "/materials#products";
      return;
    }

    window.location.href =
      `/materials?search=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}#products`;
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >

      {/* =====================================================
          
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
  <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <img
        src="/logo.png"
        alt="لوگوی سرچنو"
        className="h-10 w-10 object-contain sm:h-11 sm:w-11"
      />

      <div>
        <div className="text-xl font-black tracking-tight text-blue-700 sm:text-2xl">
          سرچنو
        </div>

        <div className="hidden text-[10px] font-medium text-slate-400 sm:block">
          بازار هوشمند ساخت‌وساز
        </div>
      </div>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
      <Link
        href="/"
        className="font-black text-blue-700"
      >
        خانه
      </Link>

      <Link
        href="/materials"
        className="transition hover:text-blue-700"
      >
        مصالح و تجهیزات
      </Link>

      <Link
        href="/service"
        className="transition hover:text-blue-700"
      >
        خدمات ساختمانی
      </Link>

      <Link
        href="/tenders"
        className="transition hover:text-blue-700"
      >
        مناقصات
      </Link>

      <Link
        href="/about"
        className="transition hover:text-blue-700"
      >
        درباره سرچنو
      </Link>
    </nav>

    {/* Actions */}
    <div className="flex items-center gap-2">

      <Link
        href="/cart"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
        title="سبد خرید"
      >
        <Icon name="cart" size={21} />

        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-black text-white">
          0
        </span>
      </Link>

      <Link
        href="/login"
        className="hidden rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:block"
      >
        ورود
      </Link>

      <Link
        href="/register"
        className="hidden rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 sm:block"
      >
        ثبت‌نام
      </Link>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileMenu(!mobileMenu)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 lg:hidden"
      >
        <Icon
          name={mobileMenu ? "close" : "menu"}
          size={21}
        />
      </button>
    </div>
  </div>

  {/* Mobile menu */}
  {mobileMenu && (
    <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
      <nav className="space-y-1">

        {[
          ["خانه", "/"],
          ["مصالح و تجهیزات", "/materials"],
          ["خدمات ساختمانی", "/service"],
          ["مناقصات", "/tenders"],
          ["درباره سرچنو", "/about"],
          ["ورود", "/login"],
          ["ثبت‌نام", "/register"],
        ].map(([title, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileMenu(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-slate-50 hover:text-blue-700"
          >
            {title}
          </Link>
        ))}

        {/* Download app */}
        <a
          href="https://drive.google.com/uc?export=download&id=1CuC1wRW-3b5tFxBP9ccIj4B9CAZ8wWcT"
          className="mt-2 block rounded-xl bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
        >
          دانلود اپلیکیشن سرچنو
        </a>

      </nav>
    </div>
  )}
</header>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-searchino.jpg"
            alt="بازار هوشمند ساخت‌وساز سرچنو"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/70" />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-950/70 to-slate-950/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-5xl text-center text-white">
            {/* Top badge */}
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur-xl">
              <Icon
                name="spark"
                size={15}
                className="text-cyan-300"
              />

              بازار هوشمند ساخت‌وساز ایران
            </div>

            <h1 className="text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              هر چیزی برای ساختن،
              <span className="mt-2 block text-cyan-300">
                در سرچنو پیدا کن
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-blue-100 sm:text-lg">
              مصالح، تجهیزات، فروشندگان، استادکاران و متخصصان
              ساختمانی را پیدا کنید، مقایسه کنید و مستقیم ارتباط بگیرید.
            </p>

            {/* Main Search */}
            <div className="mx-auto mt-9 max-w-5xl rounded-[2rem] border border-white/15 bg-white p-3 text-right shadow-2xl">
              {/* Search tabs */}
              <div className="flex gap-2 border-b border-slate-100 p-1">
                <Link
                  href="/materials"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white"
                >
                  <Icon name="building" size={18} />
                  خرید مصالح
                </Link>

                <Link
                  href="/service"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  <Icon name="worker" size={18} />
                  دریافت خدمات
                </Link>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_150px_120px]">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3.5">
                  <Icon
                    name="search"
                    size={21}
                    className="text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="مثلاً سیمان، میلگرد، کاشی یا آسانسور..."
                    className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="h-full w-full appearance-none rounded-2xl bg-slate-100 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none"
                  >
                    <option value="تبریز">تبریز</option>
                    <option value="تهران">تهران</option>
                    <option value="ارومیه">ارومیه</option>
                    <option value="زنجان">زنجان</option>
                    <option value="همه">همه شهرها</option>
                  </select>

                  <Icon
                    name="location"
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="rounded-2xl bg-blue-700 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  جست‌وجو
                </button>
              </div>

              {/* Popular searches */}
              <div className="mt-3 flex flex-wrap items-center gap-2 px-2 pb-1 text-xs">
                <span className="font-bold text-slate-400">
                  جست‌وجوهای محبوب:
                </span>

                {popularSearches.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["shield", "فروشندگان و متخصصان"],
                ["truck", "دسترسی به تأمین‌کنندگان"],
                ["check", "جست‌وجوی سریع"],
                ["robot", "هوش مصنوعی تخصصی"],
              ].map(([icon, title]) => (
                <div
                  key={title}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold text-blue-100 backdrop-blur"
                >
                  <Icon
                    name={icon as IconName}
                    size={17}
                    className="text-cyan-300"
                  />
                  {title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUE PROPOSITION
      ===================================================== */}

      <section className="relative z-10 mx-auto -mt-7 max-w-6xl px-5">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">
          {[
            {
              icon: "search" as IconName,
              title: "پیدا کن",
              text: "محصول یا متخصص مورد نیازت را سریع پیدا کن.",
            },
            {
              icon: "filter" as IconName,
              title: "مقایسه کن",
              text: "گزینه‌های مختلف را بررسی و انتخاب کن.",
            },
            {
              icon: "phone" as IconName,
              title: "ارتباط بگیر",
              text: "مستقیم با فروشنده یا متخصص ارتباط بگیر.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 p-6 ${
                index !== 2
                  ? "border-b border-slate-100 sm:border-b-0 sm:border-l"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon name={item.icon} size={22} />
              </div>

              <div>
                <h3 className="font-black">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pt-16">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-2">
          <Link
            href="/store/register"
            className="group relative min-h-[280px] overflow-hidden"
          >
            <img
              src="/gah.jpg"
              alt="ثبت فروشگاه"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/70 to-blue-950/20" />

            <div className="relative z-10 flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Icon name="store" size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                فروشنده یا تأمین‌کننده هستید؟
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-7 text-blue-100">
                فروشگاه و محصولات خود را در سرچنو معرفی کنید و
                مشتریان جدید پیدا کنید.
              </p>

              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-800">
                ثبت فروشگاه
                <Icon name="arrow" size={17} />
              </div>
            </div>
          </Link>

          <Link
            href="/service/register"
            className="group relative min-h-[280px] overflow-hidden"
          >
            <img
              src="/ostadkar.jpg"
              alt="ثبت خدمات ساختمانی"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-emerald-950/95 via-emerald-900/70 to-emerald-950/20" />

            <div className="relative z-10 flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Icon name="worker" size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                استادکار یا متخصص هستید؟
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-7 text-emerald-100">
                تخصص، سابقه و محدوده فعالیت خود را ثبت کنید و
                مشتریان جدید بگیرید.
              </p>

              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-800">
                ثبت خدمات
                <Icon name="arrow" size={17} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          MATERIALS
      ===================================================== */}

      <section
        id="materials"
        className="mx-auto max-w-7xl px-5 py-20"
      >
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-black text-blue-700">
              بازار مصالح
            </span>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              مصالح و تجهیزات ساختمانی
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              دسته‌بندی مورد نیاز پروژه‌تان را انتخاب کنید.
            </p>
          </div>

          <Link
            href="/materials"
            className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-50 sm:flex"
          >
            مشاهده همه
            <Icon name="arrow" size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {materialCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/materials/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="relative h-32 overflow-hidden bg-slate-100 sm:h-36">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 min-h-10 text-sm font-black leading-5">
                  {item.title}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {item.count}
                  </span>

                  <Icon
                    name="chevron"
                    size={16}
                    className="text-slate-300 transition group-hover:text-blue-700"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="border-y border-slate-100 bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <span className="text-sm font-black text-emerald-600">
                خدمات ساختمانی
              </span>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                متخصص مورد نیاز پروژه‌تان را پیدا کنید
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                از استادکار و بنا تا نصاب، جوشکار و مهندس.
              </p>
            </div>

            <Link
              href="/service"
              className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-emerald-600 transition hover:bg-emerald-50 sm:flex"
            >
              همه خدمات
              <Icon name="arrow" size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((service) => (
              <Link
                key={service.title}
                href="/service"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

                  <div className="absolute bottom-4 right-4 rounded-lg border border-white/20 bg-white/90 px-3 py-1.5 text-[11px] font-black text-slate-800 backdrop-blur">
                    متخصص خدمات
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-black">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {service.text}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-black text-emerald-600">
                    مشاهده متخصصان
                    <Icon name="arrow" size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          AI
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div
          className="relative overflow-hidden rounded-[2.5rem] border border-blue-900/20 shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(2,6,23,0.96), rgba(15,23,42,0.84)), url('/hush.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_400px] lg:p-14">
            <div className="flex flex-col justify-center text-white">
              <div className="flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">
                <Icon name="robot" size={16} />
                هوش مصنوعی سرچنو
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                قبل از شروع پروژه،
                <span className="block text-cyan-300">
                  از سرچنو بپرسید
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
                درباره مصالح، روش اجرا، برآورد اولیه، متخصص مناسب
                و مراحل پروژه سؤال کنید و یک راهنمای هوشمند دریافت کنید.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "برآورد هزینه",
                  "پیشنهاد مصالح",
                  "پیشنهاد متخصص",
                  "تحلیل پروژه",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-[11px] font-bold text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white p-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white">
                  <Icon name="robot" size={24} />
                </div>

                <div>
                  <h3 className="font-black text-slate-900">
                    سؤال خود را بپرسید
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    راهنمای هوشمند پروژه ساختمانی
                  </p>
                </div>
              </div>

              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  askSerchenoAI();
                }}
              >
                <textarea
                  value={aiQuestion}
                  onChange={(e) =>
                    setAiQuestion(e.target.value)
                  }
                  rows={5}
                  placeholder="مثلاً برای ساخت یک ساختمان ۴ طبقه با ۸ واحد چه مصالحی نیاز دارم؟"
                  disabled={aiLoading}
                  className="w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-600"
                />

                <button
                  type="submit"
                  disabled={
                    aiLoading || !aiQuestion.trim()
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Icon name="robot" size={18} />

                  {aiLoading
                    ? "در حال بررسی سؤال..."
                    : "پرسیدن از هوش مصنوعی"}
                </button>
              </form>

              {aiError && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
                  {aiError}
                </div>
              )}

              {aiAnswer && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-blue-800">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-700 text-white">
                      <Icon name="robot" size={16} />
                    </div>

                    پاسخ هوش مصنوعی سرچنو
                  </div>

                  <div className="whitespace-pre-wrap text-sm leading-8 text-slate-700">
                    {aiAnswer}
                  </div>
                </div>
              )}

              <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
                پاسخ‌های مربوط به قیمت محصولات بر اساس اطلاعات
                به‌روز محصولات فعال سرچنو ارائه می‌شوند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR SERVICES
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-slate-900 lg:grid-cols-[1fr_420px]">
          <div className="p-8 text-white sm:p-12">
            <span className="text-sm font-black text-cyan-300">
              خدمات پرتقاضا
            </span>

            <h2 className="mt-4 text-3xl font-black">
              دنبال متخصص خاصی هستید؟
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300">
              نوع خدمت مورد نیازتان را انتخاب کنید و متخصصان
              فعال در شهر خود را پیدا کنید.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {popularServices.map((service) => (
                <Link
                  key={service}
                  href="/service"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Icon name="worker" size={24} />
            </div>

            <h3 className="mt-5 text-xl font-black">
              درخواست خدمات ثبت کنید
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              پروژه خود را توضیح دهید تا متخصص مناسب را پیدا کنید.
            </p>

            <div className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="مثلاً نصب ۲۰۰ متر کاشی"
                className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select className="w-full rounded-xl bg-slate-100 px-4 py-4 text-sm outline-none">
                <option>انتخاب شهر</option>
                <option>تبریز</option>
                <option>تهران</option>
                <option>ارومیه</option>
                <option>زنجان</option>
              </select>

              <Link
                href="/service"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 text-sm font-black text-white transition hover:bg-blue-800"
              >
                ثبت درخواست خدمات
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TENDERS
      ===================================================== */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/monagese.jpg"
            alt="مناقصات کشوری سرچنو"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/80" />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-950/75 to-slate-950/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">
              <Icon name="tender" size={17} />
              فرصت‌های بزرگ ساخت‌وساز
            </div>

            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
              مناقصات کشوری سرچنو
            </h2>

            <p className="mt-5 text-sm leading-8 text-blue-100 sm:text-base">
              پروژه‌های ساختمانی و عمرانی را پیدا کنید،
              پیشنهاد خود را ارائه دهید و برای پروژه‌های بزرگ
              با سازمان‌ها و انبوه‌سازان رقابت کنید.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 text-white backdrop-blur-xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                <Icon name="worker" size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                فروشنده یا متخصص هستید؟
              </h3>

              <p className="mt-4 text-sm leading-8 text-blue-100">
                در مناقصات فعال شرکت کنید، توان اجرایی و
                پیشنهاد خود را ثبت کنید و برای گرفتن پروژه
                اقدام کنید.
              </p>

              <Link
                href="/tenders"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-black text-blue-950 transition hover:bg-cyan-200"
              >
                مشاهده مناقصات
                <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 text-white backdrop-blur-xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                <Icon name="building" size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                انبوه‌ساز یا سازمان هستید؟
              </h3>

              <p className="mt-4 text-sm leading-8 text-blue-100">
                پروژه ساختمانی یا عمرانی خود را ثبت کنید تا
                پیمانکاران، فروشندگان و متخصصان واجد شرایط
                پیشنهاد خود را ارسال کنند.
              </p>

              <Link
                href="/tenders/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-emerald-950 transition hover:bg-emerald-300"
              >
                ثبت پروژه
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-xs leading-7 text-blue-100 backdrop-blur">
            <strong className="text-white">
              یک پروژه، چند پیشنهاد، یک انتخاب بهتر
            </strong>
            <br />
            سرچنو ارتباط میان کارفرما، سازمان، انبوه‌ساز،
            پیمانکار، فروشنده و متخصص را ساده‌تر می‌کند.
          </div>
        </div>
      </section>

      {/* =====================================================
          JOIN
      ===================================================== */}

      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black text-blue-700">
              به سرچنو بپیوندید
            </span>

            <h2 className="mt-3 text-3xl font-black">
              کسب‌وکار یا مهارت خود را در سرچنو معرفی کنید
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              فروشنده مصالح، تأمین‌کننده، استادکار، مهندس یا پیمانکار
              هستید؟ حضور حرفه‌ای خود را در سرچنو بسازید.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link
              href="/store/register"
              className="group flex items-center gap-5 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon name="store" size={30} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black">
                  ثبت فروشگاه و تأمین‌کننده
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  محصولات و فروشگاه خود را به مشتریان سرچنو معرفی کنید.
                </p>
              </div>

              <Icon
                name="arrow"
                size={20}
                className="shrink-0 text-blue-700 transition group-hover:translate-x-[-4px]"
              />
            </Link>

            <Link
              href="/service/register"
              className="group flex items-center gap-5 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Icon name="worker" size={30} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black">
                  ثبت تخصص و خدمات
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  تخصص، سابقه و محدوده فعالیت خود را ثبت کنید.
                </p>
              </div>

              <Icon
                name="arrow"
                size={20}
                className="shrink-0 text-emerald-700 transition group-hover:translate-x-[-4px]"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <img
                  src="/logo.png"
                  alt="سرچنو"
                  className="h-12 w-12 object-contain"
                />

                <div>
                  <div className="text-xl font-black text-white">
                    سرچنو
                  </div>

                  <div className="text-xs text-slate-500">
                    بازار هوشمند ساخت‌وساز
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-8 text-slate-400">
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان
                مصالح، تأمین‌کنندگان، متخصصان و فعالان صنعت ساختمان.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
                  <Icon
                    name="shield"
                    size={16}
                    className="text-cyan-300"
                  />
                  پلتفرم تخصصی ساختمان
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
                  <Icon
                    name="robot"
                    size={16}
                    className="text-cyan-300"
                  />
                  هوش مصنوعی سرچنو
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  href="/materials"
                  className="block transition hover:text-white"
                >
                  مصالح و تجهیزات
                </Link>

                <Link
                  href="/service"
                  className="block transition hover:text-white"
                >
                  خدمات ساختمانی
                </Link>

                <Link
                  href="/tenders"
                  className="block transition hover:text-white"
                >
                  مناقصات کشوری
                </Link>

                <Link
                  href="/store/register"
                  className="block transition hover:text-white"
                >
                  ثبت فروشگاه
                </Link>

                <Link
                  href="/service/register"
                  className="block transition hover:text-white"
                >
                  ثبت خدمات
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  href="/about"
                  className="block transition hover:text-white"
                >
                  درباره سرچنو
                </Link>

                <Link
                  href="/contact"
                  className="block transition hover:text-white"
                >
                  تماس با ما
                </Link>

                <Link
                  href="/support"
                  className="block transition hover:text-white"
                >
                  پشتیبانی
                </Link>

                <Link
                  href="/terms"
                  className="block transition hover:text-white"
                >
                  قوانین و مقررات
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-right">
              <div>
                <p className="text-xs text-slate-500">
                  © ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  شرکت امیر توان پویای گستر
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  مؤسس: علیرضا آهنی
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="/etehadiye.png"
                  alt="لوگوی اتحادیه"
                  className="h-20 w-auto object-contain"
                />

                <span className="mt-2 text-[10px] text-slate-500">
                  اتحادیه کسب‌وکارهای مجازی
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SupportChat />
    </main>
  );
}
