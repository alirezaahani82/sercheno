"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
 
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
    image: "/materials/sayer.jpg",
    title: "سایر متخصصان",
    text: "متخصص مورد نظر خود را پیدا کنید",
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
    image: "/materials/kooler.jpg",
    title: "نصب و تعمیر کولر و پکیج",
    text: "نصب، سرویس و تعمیر تجهیزات",
  },
  {
    image: "/materials/nazafat.jpg",
    title: "نظافت‌کار",
    text: "خدمات نظافت ساختمان و پروژه",
  },
  {
    image: "/materials/almator.jpg",
    title: "آرماتوربند",
    text: "اجرای آرماتور و اسکلت بتنی",
  },
  {
    image: "/materials/simankar.jpg",
    title: "سیمانکار",
    text: "اجرای سیمان‌کاری ساختمان",
  },
  {
    image: "/materials/mohandes.jpg",
    title: "مهندس و پیمانکار",
    text: "مهندسی، اجرا و مدیریت پروژه",
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

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [repliedAt, setRepliedAt] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.entDefault();

    if (
      !userName.trim() ||
      !userPhone.trim() ||
      !message.trim()
    ) {
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
    } catch (error) {
      alert("ارسال پیام انجام نشد. دوباره تلاش کنید.");
    } finally {
      setSending(false);
    }
  }

  // باز کردن پنجره پشتیبانی با کلیک روی اعلان
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

  // دریافت پاسخ پشتیبانی
  useEffect(() => {
    async function loadReply() {
      try {
        const savedPhone =
          localStorage.getItem("sercheno_support_phone");

        if (!savedPhone) return;

        const response = await fetch(
          `/api/support?phone=${encodeURIComponent(savedPhone)}`
        );

        if (!response.ok) return;

        const data = await response.json();

        if (data.data) {
          setAdminReply(data.data.admin_reply || "");
          setRepliedAt(data.data.replied_at || "");
        }
      } catch (error) {
        console.error(
          "LOAD SUPPORT REPLY ERROR:",
          error
        );
      }
    }

    loadReply();

    const interval = setInterval(loadReply, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* دکمه ثابت پشتیبانی */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 text-3xl text-white shadow-2xl transition hover:scale-110 hover:bg-blue-800"
        title="پشتیبانی سرچنو"
      >
        💬
      </button>

      {/* پنجره پشتیبانی */}
      {open && (
        <div className="fixed bottom-24 left-6 z-[9999] w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="bg-blue-700 p-5 text-white">
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
                  پیام خود را برای پشتیبان ارسال کنید
                </p>
              </div>
            </div>
          </div>

          {/* پاسخ ادمین */}
          {adminReply && (
            <div className="border-b border-slate-200 bg-emerald-50 p-5">
              <div className="mb-2 text-sm font-black text-emerald-800">
                💬 پاسخ پشتیبانی
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

          {/* فرم */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3 p-5"
          >
            <input
              type="text"
              value={userName}
              onChange={(e) =>
                setUserName(e.target.value)
              }
              placeholder="نام و نام خانوادگی"
              required
              className="w-full rounded-2xl bg-slate-100 p-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="tel"
              value={userPhone}
              onChange={(e) =>
                setUserPhone(e.target.value)
              }
              placeholder="شماره تماس"
              required
              dir="ltr"
              className="w-full rounded-2xl bg-slate-100 p-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              rows={5}
              placeholder="پیام خود را بنویسید..."
              required
              className="w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              disabled={sending}
              className="mt-2 w-full rounded-2xl bg-blue-700 py-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-50"
            >
              {sending
                ? "در حال ارسال..."
                : "ارسال پیام"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
function SupportNotification() {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [phone, setPhone] = useState("");

 useEffect(() => {
  const savedPhone = localStorage.getItem("sercheno_support_phone");

  if (!savedPhone) return;

  const phoneValue = savedPhone;

  setPhone(phoneValue);

  async function checkMessage() {
    try {
      const response = await fetch(
        `/api/support?phone=${encodeURIComponent(phoneValue)}`
      );

      if (!response.ok) return;

      const data = await response.json();

      if (data.hasNewMessage) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error("SUPPORT NOTIFICATION ERROR:", error);
    }
  }

  checkMessage();

  const interval = setInterval(checkMessage, 15000);

  return () => clearInterval(interval);
}, []);

  if (!hasNewMessage || !phone) {
    return null;
  }

  function openSupport() {
    window.dispatchEvent(new Event("open-sercheno-support"));
    setHasNewMessage(false);
  }

  return (
    <button
      type="button"
      onClick={openSupport}
      className="fixed right-5 top-24 z-[100] flex items-center gap-3 rounded-2xl border border-blue-200 bg-white px-5 py-3 text-right shadow-2xl transition hover:-translate-y-1 hover:shadow-blue-200"
    >
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        🔔

        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
      </div>

      <div>
        <div className="text-sm font-black text-slate-900">
          شما پیام جدید دارید
        </div>

        <div className="mt-1 text-xs text-slate-500">
          پاسخ جدیدی از پشتیبانی سرچنو
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("تبریز");

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
   async function askSerchenoAI() {
    const question = aiQuestion.trim();

    if (!question) {
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiAnswer("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
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
     <SupportNotification />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
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

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link href="/" className="font-bold text-blue-700">
              خانه
            </Link>

            <Link href="/materials" className="hover:text-blue-700">
              مصالح و تجهیزات
            </Link>

            <Link href="/service" className="hover:text-blue-700">
              خدمات ساختمانی
            </Link>

            <Link href="/about" className="hover:text-blue-700">
              درباره سرچنو
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl transition hover:bg-blue-50 hover:text-blue-700"
              title="سبد خرید"
            >
              🛒

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-black text-white">
                0
              </span>
            </Link>

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block"
            >
              ورود
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-[650px] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/hero-searchino.jpg"
            alt="سرچنو - بازار هوشمند ساخت‌وساز"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/65" />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/55 to-blue-950/30" />
        </div>

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:py-32">
          <div className="mx-auto max-w-5xl text-center text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur-md">
              <span>🚀</span>
              <span>همه چیز برای ساخت‌وساز، در یکجا</span>
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              هر چیزی برای ساختن،

              <span className="mt-3 block text-cyan-300">
                در سرچنو پیدا کن
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              مصالح ساختمانی، تجهیزات و متخصصان مورد نیاز پروژه‌تان را
              جست‌وجو کنید، مقایسه کنید و با بهترین گزینه ارتباط بگیرید.
            </p>

            {/* Search Engine */}
            <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/20 bg-white/95 p-3 text-right shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-2 gap-2 border-b border-slate-200 p-2 sm:flex">
                <Link
                  href="/materials"
                  className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800"
                >
                  🧱 خرید مصالح
                </Link>

                <Link
                  href="/service"
                  className="rounded-xl px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  🛠️ دریافت خدمات
                </Link>
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">
                  <span className="text-xl">🔍</span>

                 <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
  placeholder="مثلاً سیمان، میلگرد، آسانسور یا کاشی..."
  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
/>
                </div>

               <select
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-700 outline-none sm:w-44"
>
                  <option value="تبریز">📍 تبریز</option>
                  <option value="تهران">تهران</option>
                  <option value="ارومیه">ارومیه</option>
                  <option value="زنجان">زنجان</option>
                  <option value="همه">همه شهرها</option>
                </select>

                <button
  type="button"
  onClick={handleSearch}
  className="rounded-2xl bg-blue-700 px-10 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
>
  جست‌وجو
</button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-blue-100">
              <span className="px-2 py-2">جست‌وجوهای محبوب:</span>

              <Link
                href="/materials/stone-tile"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
              >
                کاشی ۶۰×۱۲۰
              </Link>

              <Link
                href="/materials/doors-windows"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
              >
                پنجره UPVC
              </Link>

              <Link
                href="/materials/iron-steel"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
              >
                میلگرد
              </Link>

              <Link
                href="/materials/elevators"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
              >
                آسانسور
              </Link>
            </div>
          </div>
        </div>
      </section>
      

      {/* Quick Actions */}
      
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl sm:grid-cols-2">
          {/* Store */}
          <Link
            href="/store/register"
            className="group relative min-h-[270px] overflow-hidden border-b border-slate-100 sm:border-b-0 sm:border-l"
          >
            <img
              src="/gah.jpg"
              alt="ثبت فروشگاه و تأمین‌کننده"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/65 to-blue-950/25" />

            <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-end p-7 text-white">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
                🏪
              </div>

              <h3 className="text-2xl font-black">
                فروشنده یا تأمین‌کننده هستید؟
              </h3>

              <p className="mt-2 max-w-md text-sm leading-7 text-blue-100">
                فروشگاه و محصولات خود را در سرچنو ثبت کنید و مشتریان جدید
                پیدا کنید.
              </p>

              <div className="mt-5 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-800 transition group-hover:bg-blue-50">
                ثبت فروشگاه ←
              </div>
            </div>
          </Link>

          {/* Service */}
          <Link
            href="/service/register"
            className="group relative min-h-[270px] overflow-hidden"
          >
            <img
              src="/ostadkar.jpg"
              alt="ثبت خدمات و تخصص"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-emerald-950/90 via-emerald-900/60 to-emerald-950/20" />

            <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-end p-7 text-white">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
                👷
              </div>

              <h3 className="text-2xl font-black">
                استادکار یا ارائه‌دهنده خدمات هستید؟
              </h3>

              <p className="mt-2 max-w-md text-sm leading-7 text-emerald-100">
                تخصص، سابقه کار، نمونه‌کار و محدوده فعالیت خود را ثبت کنید
                و مشتریان جدید بگیرید.
              </p>

              <div className="mt-5 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-800 transition group-hover:bg-emerald-50">
                ثبت خدمات و تخصص ←
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Materials */}
      <section
        id="materials"
        className="mx-auto max-w-7xl px-5 py-20"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold text-blue-700">
              بازار مصالح
            </span>

            <h2 className="mt-2 text-3xl font-black">
              مصالح و تجهیزات ساختمانی
            </h2>

            <p className="mt-3 text-slate-500">
              دسته‌بندی مورد نیاز پروژه‌تان را انتخاب کنید.
            </p>
          </div>

          <Link
            href="/materials"
            className="hidden font-bold text-blue-700 sm:block"
          >
            مشاهده همه ←
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {materialCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/materials/${item.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <h3 className="text-sm font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {item.count}
                </p>

                <div className="mt-4 text-xs font-bold text-blue-700 opacity-0 transition group-hover:opacity-100">
                  ورود به دسته ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600">
                خدمات ساختمانی
              </span>

              <h2 className="mt-2 text-3xl font-black">
                متخصص مورد نیاز پروژه‌تان را پیدا کنید
              </h2>

              <p className="mt-3 text-slate-500">
                از استادکار و بنا تا نصاب، جوشکار و متخصصان فنی.
              </p>
            </div>

            <Link
              href="/service"
              className="hidden font-bold text-emerald-600 sm:block"
            >
              همه خدمات ←
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((service) => (
              <Link
                key={service.title}
                href="/service"
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-black text-slate-900 backdrop-blur">
                    متخصص خدمات
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-black">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {service.text}
                  </p>

                  <div className="mt-5 text-sm font-bold text-emerald-600">
                    مشاهده متخصصان ←
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI SERCHENO */}
<section className="mx-auto max-w-7xl px-5 py-12">
  <div
    className="relative overflow-hidden rounded-[2.5rem] border border-blue-200 shadow-2xl"
    style={{
      backgroundImage:
        "linear-gradient(90deg, rgba(2,6,23,0.94), rgba(15,23,42,0.78)), url('/hush.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="relative z-10 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_360px] lg:items-center lg:p-12">

      {/* متن AI */}
      <div className="text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">
          🤖 AI SERCHENO
          <span>•</span>
          هوش مصنوعی سرچنو
        </div>

        <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
          می‌خواهید بدانید پروژه‌تان
          <span className="block text-cyan-300">
            چقدر بودجه نیاز دارد؟
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
          سؤال خود را از هوش مصنوعی سرچنو بپرسید.
          درباره مصالح، متخصصان، هزینه و اجرای پروژه از سرچنو راهنمایی بگیرید.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200">
            📊 برآورد هزینه
          </span>

          <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200">
            🧱 پیشنهاد مصالح
          </span>

          <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200">
            👷 پیشنهاد متخصص
          </span>

          <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200">
            🏗️ تحلیل پروژه
          </span>
        </div>
      </div>

      {/* باکس سؤال */}
      <div className="rounded-[2rem] border border-white/10 bg-white/95 p-5 shadow-2xl">

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-2xl shadow-lg">
            🤖
          </div>

          <div>
            <h3 className="font-black text-slate-900">
              از هوش مصنوعی سرچنو بپرسید
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              پاسخ هوشمند مخصوص پروژه‌های ساختمانی
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
    name="ai-question"
    value={aiQuestion}
    onChange={(e) => setAiQuestion(e.target.value)}
    rows={5}
    placeholder="مثلاً برای ساخت یک ساختمان ۴ طبقه با ۸ واحد چه مصالحی نیاز دارم؟"
    className="w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-600"
    disabled={aiLoading}
  />

  <button
    type="submit"
    disabled={aiLoading || !aiQuestion.trim()}
    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {aiLoading ? (
      <>
        ⏳
        در حال بررسی سؤال شما...
      </>
    ) : (
      <>
        🤖 پرسیدن از AI SERCHENO
        <span>←</span>
      </>
    )}
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
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">
        🤖
      </span>

      پاسخ هوش مصنوعی سرچنو
    </div>

    <div className="whitespace-pre-wrap text-sm leading-8 text-slate-700">
      {aiAnswer}
    </div>
  </div>
)}

       <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
  پاسخ‌های مربوط به قیمت محصولات بر اساس اطلاعات به‌روز محصولات
  فعال سرچنو ارائه می‌شوند. قیمت همکاری برای کاربران عمومی قابل نمایش نیست.
</p>
      </div>

    </div>
  </div>
</section>
      
      {/* Popular Services */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-cyan-300">
                خدمات پرتقاضا
              </span>

              <h2 className="mt-4 text-3xl font-black leading-relaxed">
                دنبال متخصص خاصی هستید؟
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                نوع خدمت مورد نیازتان را انتخاب کنید و متخصصان فعال در
                شهر خود را پیدا کنید.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {popularServices.map((service) => (
                  <Link
                    key={service}
                    href="/service"
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 text-slate-900">
              <h3 className="text-xl font-black">
                درخواست خدمات خود را ثبت کنید
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                پروژه‌تان را توضیح دهید تا متخصصان مناسب شما را پیدا کنند.
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
                </select>

                <Link
                  href="/service"
                  className="block w-full rounded-xl bg-blue-700 py-4 text-center font-bold text-white hover:bg-blue-800"
                >
                  ثبت درخواست خدمات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Tenders */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img
            src="/monagese.jpg"
            alt="مناقصات کشوری سرچنو"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/75" />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-950/70 to-slate-950/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2 text-sm font-bold text-cyan-200 backdrop-blur">
              فرصت‌های بزرگ ساخت‌وساز
            </span>

            <h2 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">
              مناقصات کشوری سرچنو
            </h2>

            <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
              پروژه‌های ساختمانی و عمرانی را پیدا کنید، پیشنهاد خود را
              ارائه دهید و برای اجرای پروژه‌های بزرگ با سازمان‌ها و
              انبوه‌سازان رقابت کنید.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* For sellers and professionals */}
            <div className="group rounded-[2rem] border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15 sm:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/15 text-3xl">
                🏗️
              </div>

              <h3 className="mt-6 text-2xl font-black">
                فروشنده یا متخصص هستید؟
              </h3>

              <p className="mt-4 leading-8 text-blue-100">
                در مناقصات فعال شرکت کنید، پیشنهاد قیمت و توان اجرایی
                خود را ثبت کنید و برای گرفتن پروژه‌های ساختمانی و عمرانی
                اقدام کنید.
              </p>

              <Link
                href="/tenders"
                className="mt-7 inline-flex rounded-xl bg-cyan-300 px-7 py-4 font-black text-blue-950 transition hover:bg-cyan-200"
              >
                شرکت در مناقصه ←
              </Link>
            </div>

            {/* For organizations and developers */}
            <div className="group rounded-[2rem] border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15 sm:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-300/15 text-3xl">
                🏢
              </div>

              <h3 className="mt-6 text-2xl font-black">
                انبوه‌ساز یا سازمان هستید؟
              </h3>

              <p className="mt-4 leading-8 text-blue-100">
                پروژه ساختمانی یا عمرانی خود را ثبت کنید تا فروشندگان،
                پیمانکاران و متخصصان واجد شرایط پیشنهادهای خود را برای
                اجرای پروژه ارسال کنند.
              </p>

              <Link
                href="/tenders/register"
                className="mt-7 inline-flex rounded-xl bg-emerald-400 px-7 py-4 font-black text-emerald-950 transition hover:bg-emerald-300"
              >
                ثبت پروژه ←
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-sm leading-7 text-blue-100 backdrop-blur">
            <span className="font-black text-white">
              یک پروژه، چند پیشنهاد، یک انتخاب بهتر
            </span>
            <br />
            سرچنو ارتباط میان کارفرما، انبوه‌ساز، سازمان، فروشنده،
            پیمانکار و متخصص را ساده‌تر می‌کند.
          </div>
        </div>
      </section>

      {/* Provider Section */}
      <section id="providers" className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold text-blue-700">
              به سرچنو بپیوندید
            </span>

            <h2 className="mt-3 text-3xl font-black">
              کسب‌وکار یا مهارت خود را در سرچنو معرفی کنید
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              چه فروشنده مصالح باشید و چه استادکار و متخصص ساختمانی،
              می‌توانید در سرچنو خدمات و محصولات خود را به مشتریان
              معرفی کنید.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/store/register"
              className="group relative min-h-[300px] overflow-hidden rounded-3xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src="/gah.jpg"
                alt="ثبت فروشگاه"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/65 to-blue-950/20" />

              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-8 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
                  🏪
                </div>

                <h3 className="mt-6 text-2xl font-black">
                  فروشنده یا تأمین‌کننده هستید؟
                </h3>

                <p className="mt-3 max-w-xl leading-7 text-blue-100">
                  فروشگاه و محصولات خود را ثبت کنید و مشتریان جدید پیدا کنید.
                </p>

                <div className="mt-7 inline-block w-fit rounded-xl bg-white px-6 py-4 font-bold text-blue-800 transition group-hover:bg-blue-50">
                  ثبت فروشگاه
                </div>
              </div>
            </Link>

            <Link
              href="/service/register"
              className="group relative min-h-[300px] overflow-hidden rounded-3xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src="/ostadkar.jpg"
                alt="ثبت خدمات و تخصص"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-emerald-950/90 via-emerald-900/65 to-emerald-950/20" />

              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-8 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
                  👷
                </div>

                <h3 className="mt-6 text-2xl font-black">
                  استادکار یا ارائه‌دهنده خدمات هستید؟
                </h3>

                <p className="mt-3 max-w-xl leading-7 text-emerald-100">
                  تخصص، سابقه کار، نمونه‌کار و محدوده فعالیت خود را ثبت کنید
                  و مشتریان جدید بگیرید.
                </p>

                <div className="mt-7 inline-block w-fit rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 transition group-hover:bg-emerald-50">
                  ثبت خدمات و تخصص
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  className="h-12 w-12 rounded-xl object-contain"
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

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                پلتفرم جست‌وجو، مقایسه و ارتباط با فروشندگان مصالح،
                تأمین‌کنندگان و متخصصان صنعت ساختمان.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                خدمات سرچنو
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  href="/materials"
                  className="block hover:text-white"
                >
                  مصالح و تجهیزات
                </Link>

                <Link
                  href="/service"
                  className="block hover:text-white"
                >
                  خدمات ساختمانی
                </Link>

                <Link
                  href="/store/register"
                  className="block hover:text-white"
                >
                  ثبت فروشگاه
                </Link>

                <Link
                  href="/service/register"
                  className="block hover:text-white"
                >
                  ثبت خدمات
                </Link>

                <Link
                  href="/tenders"
                  className="block hover:text-white"
                >
                  مناقصات کشوری
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">
                ارتباط با ما
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  href="/about"
                  className="block hover:text-white"
                >
                  درباره سرچنو
                </Link>

                <Link
                  href="/contact"
                  className="block hover:text-white"
                >
                  تماس با ما
                </Link>

                <Link
                  href="/terms"
                  className="block hover:text-white"
                >
                  قوانین و مقررات
                </Link>

                <Link
                  href="/support"
                  className="block hover:text-white"
                >
                  پشتیبانی
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-slate-500">
            <p>© ۱۴۰۵ سرچنو — تمامی حقوق محفوظ است.</p>

            <div className="flex flex-col items-center justify-center">
  <img
    src="/etehadiye.png"
    alt="لوگوی اتحادیه"
    className="h-24 w-auto object-contain"
  />

  <p className="mt-3 text-xs text-slate-400">
    اتحادیه کسب و کار های مجازی
  </p>
</div>

            <p className="mt-2">
              شرکت امیر توان پویای گستر
            </p>

            <p className="mt-1">
              مؤسس: علیرضا آهنی
            </p>
          </div>
        </div>
      </footer>
      <SupportChat />
    </main>
  );
}
