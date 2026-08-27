"use client";

import { useEffect, useState } from "react";

const journeyStages = [
  {
    number: "01",
    title: "آگاهی و شکل‌گیری نیاز",
    icon: "💡",
    emotion: "نیازمند راهنمایی",
    touchpoints: "گوگل، تبلیغات، شبکه‌های اجتماعی، معرفی",
    pain: "مشتری هنوز نمی‌داند دقیقاً چه محصول یا خدمتی نیاز دارد.",
    data: "منبع ورود، جست‌وجوی اولیه، دسته‌بندی مورد علاقه",
    action:
      "ایجاد محتوای آموزشی و معرفی ساده دسته‌بندی‌ها و خدمات سرچنو",
  },
  {
    number: "02",
    title: "جست‌وجو",
    icon: "🔎",
    emotion: "کنجکاو",
    touchpoints: "جست‌وجو، دسته‌بندی مصالح، خدمات",
    pain: "پیدا کردن محصول یا متخصص مناسب می‌تواند زمان‌بر باشد.",
    data: "عبارت جست‌وجو، دسته‌بندی، شهر، صفحات مشاهده‌شده",
    action:
      "بهبود جست‌وجو و دسته‌بندی برای کوتاه کردن مسیر رسیدن به گزینه مناسب",
  },
  {
    number: "03",
    title: "مقایسه و ارزیابی",
    icon: "⚖️",
    emotion: "دقیق و محتاط",
    touchpoints: "صفحه محصول، فروشنده، متخصص، قیمت و شرایط",
    pain: "مشتری برای تصمیم‌گیری به اطلاعات و اعتماد نیاز دارد.",
    data: "محصولات مشاهده‌شده، کلیک فروشنده، شرایط خرید، زمان مقایسه",
    action:
      "شفاف‌سازی اطلاعات، شرایط پرداخت، اعتبار فروشنده و مقایسه گزینه‌ها",
  },
  {
    number: "04",
    title: "تصمیم و خرید",
    icon: "🛒",
    emotion: "تصمیم‌گیرنده",
    touchpoints: "سبد خرید، ثبت سفارش، ارتباط با فروشنده",
    pain: "هر اصطکاک در خرید می‌تواند باعث رها کردن فرایند شود.",
    data: "سبد خرید، سفارش، روش پرداخت، نرخ تبدیل",
    action:
      "کاهش اصطکاک خرید و ایجاد مسیر شفاف برای سفارش و پرداخت",
  },
  {
    number: "05",
    title: "دریافت محصول یا خدمت",
    icon: "📦",
    emotion: "منتظر نتیجه",
    touchpoints: "فروشنده، متخصص، تحویل، پشتیبانی",
    pain: "تفاوت بین انتظار و تجربه واقعی می‌تواند رضایت را کاهش دهد.",
    data: "زمان تحویل، پیام‌های پشتیبانی، مشکلات سفارش",
    action:
      "پیگیری تجربه پس از خرید و ثبت نقاط ضعف و قوت",
  },
  {
    number: "06",
    title: "رضایت و ارزیابی",
    icon: "⭐",
    emotion: "ارزیاب",
    touchpoints: "نظرسنجی، پشتیبانی، بازخورد",
    pain: "اگر صدای مشتری شنیده نشود، فرصت اصلاح از بین می‌رود.",
    data: "CSAT، NPS، نظر متنی، شکایت و پیشنهاد",
    action:
      "تبدیل بازخورد مشتری به اقدام مشخص برای بهبود تجربه",
  },
  {
    number: "07",
    title: "بازگشت و وفاداری",
    icon: "🔄",
    emotion: "وفادار یا در معرض ریزش",
    touchpoints: "CRM، پیشنهادها، پیام‌رسانی",
    pain: "مشتری ممکن است پس از اولین خرید دیگر برنگردد.",
    data: "تکرار خرید، فاصله خرید، علاقه‌مندی‌ها، تعامل",
    action:
      "شخصی‌سازی ارتباط و ایجاد دلیل برای بازگشت مشتری",
  },
  {
    number: "08",
    title: "توصیه به دیگران",
    icon: "🤝",
    emotion: "حامی برند",
    touchpoints: "معرفی، شبکه اجتماعی، رضایت و بازخورد",
    pain: "تجربه ضعیف مانع تبدیل مشتری به سفیر برند می‌شود.",
    data: "معرفی، NPS، اشتراک‌گذاری و بازخورد",
    action:
      "تبدیل مشتری راضی به یکی از کانال‌های رشد سرچنو",
  },
];

const completed = [
  "ایجاد پلتفرم سرچنو برای اتصال مشتری به مصالح، تجهیزات، فروشندگان و خدمات ساختمانی",
  "طراحی مسیرهای مختلف برای خرید مصالح و دریافت خدمات ساختمانی",
  "ایجاد دسته‌بندی‌های تخصصی مصالح و تجهیزات",
  "ایجاد سیستم ثبت متخصصان و خدمات ساختمانی",
  "ایجاد زیرساخت فروشگاه و فروشندگان",
  "ایجاد پنل مشتری و مسیر ورود به حساب کاربری",
  "ایجاد سیستم پشتیبانی و پیام مشتری",
  "ایجاد زیرساخت تصاویر محصولات در Supabase Storage",
  "طراحی سیستم تبلیغات با تصویر دسکتاپ و موبایل و تأیید مدیریت",
];

const futurePlans = [
  "تکمیل Customer Journey بر اساس داده واقعی رفتار مشتری",
  "ایجاد پروفایل 360 درجه مشتری",
  "اتصال داده‌های سفارش، جست‌وجو، سبد خرید، پشتیبانی و نظرسنجی به CRM",
  "اجرای نظرسنجی‌های مرحله‌ای در نقاط مهم سفر مشتری",
  "محاسبه و پایش CSAT و NPS",
  "شناسایی مشتریان در معرض ریزش",
  "شخصی‌سازی پیشنهادهای محصول و خدمت",
  "ایجاد داشبورد هوشمند بازاریابی و CX",
  "تبدیل داده‌های خام به دانش و سپس تصمیم مدیریتی",
];

const crmItems = [
  {
    icon: "👤",
    title: "شناخت مشتری",
    text: "شناخت نیاز، رفتار، علاقه‌مندی، خرید و تعاملات مشتری",
  },
  {
    icon: "🧩",
    title: "یکپارچه‌سازی داده",
    text: "ترکیب داده‌های خرید، جست‌وجو، پشتیبانی و بازخورد",
  },
  {
    icon: "🎯",
    title: "شخصی‌سازی",
    text: "ارائه پیام، محصول و خدمت متناسب با نیاز هر مشتری",
  },
  {
    icon: "🔔",
    title: "اقدام به‌موقع",
    text: "ارتباط با مشتری در لحظه‌ای که احتمال نیاز یا ریزش وجود دارد",
  },
  {
    icon: "❤️",
    title: "وفاداری",
    text: "تبدیل رابطه کوتاه‌مدت به رابطه بلندمدت",
  },
];

const cxItems = [
  {
    title: "اعتماد",
    icon: "🛡️",
    text: "شفافیت فروشنده، اطلاعات محصول، شرایط معامله و پشتیبانی",
  },
  {
    title: "سادگی",
    icon: "✨",
    text: "کاهش تعداد مراحل و پیچیدگی در جست‌وجو و خرید",
  },
  {
    title: "سرعت",
    icon: "⚡",
    text: "کم کردن زمان پیدا کردن محصول، فروشنده یا متخصص مناسب",
  },
  {
    title: "شفافیت",
    icon: "🔍",
    text: "اطلاعات روشن درباره محصول، فروشنده، خدمات و شرایط خرید",
  },
  {
    title: "پشتیبانی",
    icon: "💬",
    text: "شنیدن صدای مشتری قبل، حین و بعد از خرید",
  },
  {
    title: "شخصی‌سازی",
    icon: "🎯",
    text: "حرکت از تجربه عمومی به تجربه متناسب با نیاز هر مشتری",
  },
];

const surveyQuestions = [
  "چقدر پیدا کردن محصول یا خدمت موردنظر برای شما آسان بود؟",
  "چقدر به اطلاعات فروشنده یا ارائه‌دهنده خدمت اعتماد کردید؟",
  "تجربه شما از سرعت و سادگی سرچنو چگونه بود؟",
  "آیا احتمال دارد دوباره از سرچنو استفاده کنید؟",
  "آیا سرچنو را به یک دوست یا همکار پیشنهاد می‌کنید؟",
  "اگر فقط یک چیز را می‌توانستید در سرچنو تغییر دهید، چه چیزی بود؟",
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 text-sm font-black tracking-widest text-blue-600">
        {eyebrow}
      </div>

      <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-500 md:text-lg">
        {description}
      </p>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-transparent">
      <div
        className="h-full bg-blue-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function DataFlow() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
        <div className="text-4xl">📊</div>
        <div className="mt-5 text-2xl font-black text-slate-950">
          DATA
        </div>
        <p className="mt-3 leading-8 text-slate-600">
          داده خام از رفتار، خرید، جست‌وجو، پشتیبانی و نظرسنجی مشتری.
        </p>
      </div>

      <div className="relative rounded-[2rem] border border-violet-100 bg-violet-50 p-7">
        <div className="hidden md:block absolute -right-5 top-1/2 text-2xl">
          ←
        </div>
        <div className="text-4xl">🧠</div>
        <div className="mt-5 text-2xl font-black text-slate-950">
          KNOWLEDGE
        </div>
        <p className="mt-3 leading-8 text-slate-600">
          تحلیل داده و پیدا کردن الگوها، نیازها، نقاط اصطکاک و فرصت‌ها.
        </p>
      </div>

      <div className="relative rounded-[2rem] border border-emerald-100 bg-emerald-50 p-7">
        <div className="hidden md:block absolute -right-5 top-1/2 text-2xl">
          ←
        </div>
        <div className="text-4xl">💎</div>
        <div className="mt-5 text-2xl font-black text-slate-950">
          WISDOM
        </div>
        <p className="mt-3 leading-8 text-slate-600">
          تبدیل دانش به تصمیم مدیریتی و طراحی تجربه بهتر برای مشتری.
        </p>
      </div>
    </div>
  );
}

export default function MBAPage() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [surveyScore, setSurveyScore] = useState(0);
  const [showSurvey, setShowSurvey] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const active = journeyStages[activeJourney];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenu(false);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900"
    >
      <ScrollProgress />

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-xl shadow-lg shadow-blue-700/20">
              <img
    src="/logo.png"
    alt="لوگو سرچنو"
    className="h-10 w-10 object-contain"
  />
            </div>

            <div className="text-right">
              <div className="font-black">سرچنو</div>
              <div className="text-[10px] font-bold text-slate-400">
                MBA CASE STUDY
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-5 text-xs font-black lg:flex">
            <button onClick={() => scrollTo("journey")}>
              سفر مشتری
            </button>
            <button onClick={() => scrollTo("cx")}>
              تجربه مشتری
            </button>
            <button onClick={() => scrollTo("crm")}>
              CRM
            </button>
            <button onClick={() => scrollTo("survey")}>
              نظرسنجی
            </button>
            <button onClick={() => scrollTo("data")}>
              داده → دانش → خرد
            </button>
          </nav>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-black lg:hidden"
          >
            منو
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
            <div className="grid gap-2">
              <button
                onClick={() => scrollTo("journey")}
                className="rounded-xl bg-slate-50 p-3 text-right font-bold"
              >
                سفر مشتری
              </button>
              <button
                onClick={() => scrollTo("cx")}
                className="rounded-xl bg-slate-50 p-3 text-right font-bold"
              >
                تجربه مشتری
              </button>
              <button
                onClick={() => scrollTo("crm")}
                className="rounded-xl bg-slate-50 p-3 text-right font-bold"
              >
                CRM
              </button>
              <button
                onClick={() => scrollTo("survey")}
                className="rounded-xl bg-slate-50 p-3 text-right font-bold"
              >
                نظرسنجی
              </button>
              <button
                onClick={() => scrollTo("data")}
                className="rounded-xl bg-slate-50 p-3 text-right font-bold"
              >
                داده → دانش → خرد
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}

      <section id="hero" className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
              🎓 پروژه درس مدیریت بازاریابی
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[1.15] tracking-tight text-slate-950 md:text-7xl">
              از داده
              <br />
              تا دانش
              <br />
              تا <span className="text-blue-700">خرد</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-9 text-slate-600">
              مطالعه موردی مدیریت سفر مشتری، تجربه مشتری، CRM و نظرسنجی
              در پلتفرم هوشمند ساخت‌وساز و ساز؛ <strong>سرچنو</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("journey")}
                className="rounded-2xl bg-blue-700 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-700/20 transition hover:-translate-y-1 hover:bg-blue-800"
              >
                شروع مطالعه موردی
              </button>

              <button
                onClick={() => scrollTo("data")}
                className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black transition hover:-translate-y-1"
              >
                مدل Data → Wisdom
              </button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="text-2xl font-black">CX</div>
                <div className="mt-1 text-[11px] text-slate-400">
                  تجربه مشتری
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="text-2xl font-black">CRM</div>
                <div className="mt-1 text-[11px] text-slate-400">
                  رابطه با مشتری
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="text-2xl font-black">CJM</div>
                <div className="mt-1 text-[11px] text-slate-400">
                  سفر مشتری
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-blue-600/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
              <img
                src="/hero-searchino.jpg"
                alt="سرچنو و تجربه مشتری"
                className="h-[480px] w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-7 pt-32 text-white">
                <div className="text-xs font-black text-blue-300">
                  SERCHENO × MBA
                </div>

                <div className="mt-2 text-2xl font-black">
                  طراحی تجربه مشتری در صنعت ساخت‌وساز
                </div>

                <div className="mt-2 text-sm text-slate-300">
                  یک کسب‌وکار واقعی، یک مسئله واقعی، یک مطالعه موردی کاربردی
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div className="text-sm font-black text-blue-600">
            چرا این پروژه؟
          </div>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            به جای اینکه درباره بازاریابی صحبت کنیم،
            <br />
            آن را روی یک کسب‌وکار واقعی اجرا می‌کنیم.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-9 text-slate-500">
            سرچنو یک پروژه واقعی در حال توسعه است. بنابراین این مطالعه
            موردی تلاش می‌کند مفاهیم مدیریت بازاریابی را از حالت تئوری
            خارج کند و آن‌ها را در نقاط تماس واقعی یک پلتفرم دیجیتال
            ساخت‌وساز بررسی کند.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["01", "شناخت", "مشتری چه کسی است؟"],
              ["02", "درک", "چه تجربه‌ای دارد؟"],
              ["03", "ارتباط", "چطور رابطه را مدیریت کنیم؟"],
              ["04", "تصمیم", "چه اقدامی باید انجام دهیم؟"],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-right"
              >
                <div className="text-xs font-black text-blue-600">{n}</div>
                <div className="mt-3 font-black">{t}</div>
                <div className="mt-2 text-xs leading-6 text-slate-500">
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER JOURNEY */}

      <section id="journey" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="CUSTOMER JOURNEY"
            title="سفر مشتری سرچنو"
            description="سفر مشتری فقط لحظه خرید نیست؛ از لحظه شکل‌گیری نیاز آغاز می‌شود و می‌تواند تا بازگشت، وفاداری و توصیه برند ادامه پیدا کند."
          />

          <div className="mt-14 overflow-x-auto pb-4">
            <div className="flex min-w-[1050px] gap-3">
              {journeyStages.map((stage, index) => (
                <button
                  key={stage.number}
                  onClick={() => setActiveJourney(index)}
                  className={`min-w-[125px] flex-1 rounded-3xl border p-5 text-right transition ${
                    activeJourney === index
                      ? "border-blue-600 bg-blue-700 text-white shadow-xl shadow-blue-700/20"
                      : "border-slate-200 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className="text-xs font-black opacity-60">
                    {stage.number}
                  </div>

                  <div className="mt-3 text-2xl">{stage.icon}</div>

                  <div className="mt-3 text-sm font-black leading-6">
                    {stage.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="overflow-hidden rounded-[2.5rem] bg-slate-900">
              <img
                src="/hush.jpg"
                alt="Customer Journey"
                className="h-full min-h-[360px] w-full object-cover opacity-90"
              />
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 md:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-sm font-black text-blue-600">
                    مرحله {active.number}
                  </div>

                  <h3 className="mt-2 text-2xl font-black">
                    {active.title}
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4 text-3xl">
                  {active.icon}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-xs font-black text-slate-400">
                    احساس مشتری
                  </div>
                  <div className="mt-2 font-black">{active.emotion}</div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-xs font-black text-slate-400">
                    نقاط تماس
                  </div>
                  <div className="mt-2 text-sm font-bold leading-7">
                    {active.touchpoints}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="text-xs font-black text-red-600">
                  نقطه درد مشتری
                </div>
                <div className="mt-2 text-sm font-bold leading-7 text-red-900">
                  {active.pain}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="text-xs font-black text-blue-600">
                  داده قابل جمع‌آوری
                </div>
                <div className="mt-2 text-sm font-bold leading-7 text-blue-950">
                  {active.data}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="text-xs font-black text-emerald-600">
                  تصمیم بازاریابی سرچنو
                </div>
                <div className="mt-2 text-sm font-bold leading-7 text-emerald-950">
                  {active.action}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETED / FUTURE */}

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="SERCHENO ROADMAP"
            title="چه کارهایی انجام شده و چه کارهایی باقی مانده؟"
            description="این پروژه همزمان با توسعه واقعی سرچنو شکل می‌گیرد؛ بنابراین مرز بین وضعیت فعلی و نقشه راه آینده مشخص نگه داشته شده است."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-7 md:p-10">
              <div className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-black text-emerald-300">
                ✓ انجام شده / پیاده‌سازی شده
              </div>

              <h3 className="mt-5 text-2xl font-black">
                زیرساخت‌های تجربه مشتری
              </h3>

              <div className="mt-7 space-y-3">
                {completed.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-7 text-slate-300"
                  >
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-blue-400/20 bg-blue-500/10 p-7 md:p-10">
              <div className="inline-flex rounded-full bg-blue-400/15 px-4 py-2 text-xs font-black text-blue-300">
                ◌ نقشه راه
              </div>

              <h3 className="mt-5 text-2xl font-black">
                آینده Customer-Centric سرچنو
              </h3>

              <div className="mt-7 space-y-3">
                {futurePlans.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-7 text-slate-300"
                  >
                    <span className="mt-1 text-blue-300">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CX */}

      <section id="cx" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="CUSTOMER EXPERIENCE"
            title="تجربه مشتری سرچنو"
            description="تجربه مشتری مجموع برداشت‌ها، احساسات و ارزیابی‌هایی است که در نقاط تماس مختلف قبل، هنگام و بعد از تعامل با کسب‌وکار شکل می‌گیرد."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2.5rem] bg-slate-900">
              <img
                src="/gah.jpg"
                alt="Customer Experience"
                className="h-full min-h-[500px] w-full object-cover"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {cxItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-3xl">{item.icon}</div>

                  <h3 className="mt-5 text-lg font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-blue-100 bg-blue-50 p-8 text-center md:p-12">
            <div className="text-4xl">❤️</div>

            <h3 className="mt-5 text-2xl font-black">
              هدف CX در سرچنو
            </h3>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              هدف فقط افزایش فروش نیست؛ هدف این است که مشتری در مسیر
              پیدا کردن، مقایسه، خرید، دریافت خدمت و پشتیبانی احساس کند
              سرچنو فرآیند تصمیم‌گیری او را ساده‌تر، شفاف‌تر و قابل‌اعتمادتر
              کرده است.
            </p>
          </div>
        </div>
      </section>

      {/* CRM */}

      <section id="crm" className="scroll-mt-24 bg-white py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="CUSTOMER RELATIONSHIP MANAGEMENT"
            title="CRM سرچنو"
            description="CRM در سرچنو قرار است از یک دفترچه اطلاعات مشتری فراتر برود و به سیستم شناخت، ارتباط، تحلیل و اقدام تبدیل شود."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-10">
              <div className="text-5xl">👤</div>

              <h3 className="mt-6 text-3xl font-black">
                Customer 360°
              </h3>

              <p className="mt-5 leading-8 text-slate-300">
                تصویر کامل‌تر مشتری با اتصال اطلاعات حساب، رفتار
                دیجیتال، خرید، تعاملات، پشتیبانی و بازخورد.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "اطلاعات مشتری",
                  "سوابق خرید",
                  "جست‌وجو و رفتار",
                  "پشتیبانی",
                  "نظرسنجی",
                  "علاقه‌مندی‌ها",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {crmItems.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    {item.icon}
                  </div>

                  <div>
                    <div className="text-xs font-black text-blue-600">
                      0{index + 1}
                    </div>

                    <h3 className="mt-1 text-lg font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SURVEY */}

      <section id="survey" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="VOICE OF CUSTOMER"
            title="نظرسنجی و صدای مشتری"
            description="نظرسنجی برای سرچنو فقط گرفتن یک عدد نیست؛ هدف پیدا کردن چرایی تجربه مشتری و تبدیل آن به اقدام است."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2.5rem] bg-slate-900">
              <img
                src="/hero-searchino.jpg"
                alt="Customer Survey"
                className="h-full min-h-[500px] w-full object-cover"
              />
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-sm md:p-10">
              <div className="text-4xl">⭐</div>

              <h3 className="mt-5 text-2xl font-black">
                نمونه نظرسنجی CX سرچنو
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                این فرم در نسخه آینده می‌تواند به CRM و دیتابیس واقعی
                سرچنو متصل شود.
              </p>

              <div className="mt-7">
                <div className="text-sm font-black">
                  میزان رضایت کلی شما؟
                </div>

                <div className="mt-4 flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => setSurveyScore(score)}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition ${
                        surveyScore >= score
                          ? "bg-amber-100"
                          : "bg-slate-100"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>

                {surveyScore > 0 && (
                  <div className="mt-3 text-sm font-bold text-blue-700">
                    امتیاز انتخاب‌شده: {surveyScore} از ۵
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                {surveyQuestions.map((question, index) => (
                  <div
                    key={question}
                    className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7"
                  >
                    <span className="ml-2 text-blue-600">
                      {index + 1}.
                    </span>
                    {question}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowSurvey(!showSurvey)}
                className="mt-6 w-full rounded-2xl bg-blue-700 py-4 text-sm font-black text-white"
              >
                {showSurvey
                  ? "بستن توضیحات"
                  : "این داده چگونه وارد CRM می‌شود؟"}
              </button>

              {showSurvey && (
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-8 text-emerald-950">
                  پاسخ نظرسنجی می‌تواند به یک رکورد Voice of Customer
                  تبدیل شود؛ سپس بر اساس مرحله سفر مشتری، نوع مشتری،
                  محصول یا خدمت و زمان ثبت بازخورد دسته‌بندی شود.
                  در مرحله بعد، داده‌های کمی مانند CSAT و NPS با
                  نظرات متنی ترکیب می‌شوند تا تصمیم مدیریتی ساخته شود.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DATA KNOWLEDGE WISDOM */}

      <section id="data" className="scroll-mt-24 bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="DATA → KNOWLEDGE → WISDOM"
            title="از عدد به تصمیم مدیریتی"
            description="ارزش واقعی داده زمانی ایجاد می‌شود که از داده خام به الگو، از الگو به بینش و از بینش به تصمیم برسیم."
          />

          <div className="mt-14 overflow-hidden rounded-[2.5rem]">
            <img
              src="/monagese.jpg"
              alt="Data Knowledge Wisdom"
              className="h-[300px] w-full object-cover opacity-90 md:h-[450px]"
            />
          </div>

          <DataFlow />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="text-sm font-black text-blue-300">
                DATA
              </div>

              <div className="mt-5 text-2xl font-black">
                «مشتری ۵ بار سیمان جست‌وجو کرد»
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                این هنوز فقط یک مشاهده خام است.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="text-sm font-black text-violet-300">
                KNOWLEDGE
              </div>

              <div className="mt-5 text-2xl font-black">
                «نیاز مشتری احتمالاً جدی است»
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                با ترکیب چند داده، الگو و احتمال نیاز را تشخیص می‌دهیم.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="text-sm font-black text-emerald-300">
                WISDOM
              </div>

              <div className="mt-5 text-2xl font-black">
                «فرآیند مقایسه سیمان را ساده کنیم»
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                دانش زمانی ارزشمند است که به اقدام مدیریتی منجر شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER CASE */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="overflow-hidden rounded-[3rem] bg-white shadow-xl ring-1 ring-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="order-2 p-8 md:p-12 lg:order-1">
                <div className="text-sm font-black text-blue-600">
                  A REAL CUSTOMER SCENARIO
                </div>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                  اگر یک مشتری برای خرید سیمان وارد سرچنو شود چه اتفاقی
                  می‌افتد؟
                </h2>

                <div className="mt-8 space-y-4">
                  {[
                    ["۱", "نیاز", "برای پروژه ساختمانی به سیمان نیاز دارد."],
                    ["۲", "جست‌وجو", "سیمان را در سرچنو جست‌وجو می‌کند."],
                    ["۳", "مقایسه", "چند فروشنده و شرایط را بررسی می‌کند."],
                    ["۴", "تصمیم", "بر اساس قیمت، اعتماد و شرایط خرید انتخاب می‌کند."],
                    ["۵", "خرید", "سفارش و فرایند پرداخت انجام می‌شود."],
                    ["۶", "تجربه", "تحویل و کیفیت را تجربه می‌کند."],
                    ["۷", "بازخورد", "رضایت یا مشکل خود را ثبت می‌کند."],
                    ["۸", "بازگشت", "در پروژه بعدی دوباره به سرچنو مراجعه می‌کند."],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-xs font-black text-white">
                        {n}
                      </div>

                      <div>
                        <div className="font-black">{title}</div>
                        <div className="mt-1 text-sm leading-7 text-slate-500">
                          {text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <img
                  src="/monagese.jpg"
                  alt="Construction customer"
                  className="h-full min-h-[550px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC MODEL */}

      <section className="bg-blue-700 py-24 text-white">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <div className="text-sm font-black tracking-widest text-blue-200">
            THE SERCHENO MODEL
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            گوش دادن → فهمیدن → تصمیم گرفتن → بهتر کردن
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-9 text-blue-100 md:text-lg">
            سفر مشتری، تجربه مشتری، CRM و نظرسنجی چهار سیستم جدا از هم
            نیستند؛ باید در یک حلقه یادگیری قرار بگیرند.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              ["👂", "LISTEN", "صدای مشتری را بشنو"],
              ["🧠", "UNDERSTAND", "داده را به بینش تبدیل کن"],
              ["🎯", "ACT", "تصمیم مدیریتی بگیر"],
              ["🔄", "IMPROVE", "تجربه را بهبود بده"],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur"
              >
                <div className="text-4xl">{icon}</div>
                <div className="mt-5 text-sm font-black">{title}</div>
                <div className="mt-2 text-sm text-blue-100">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCLUSION */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <img
            src="/logo.png"
            alt="Sercheno"
            className="mx-auto h-40 w-40 rounded-[2rem] object-cover shadow-xl"
          />

          <div className="mt-8 text-sm font-black text-blue-600">
            MBA MARKETING MANAGEMENT
          </div>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            سرچنو فقط محصول نمی‌فروشد؛
            <br />
            <span className="text-blue-700">
              تجربه تصمیم‌گیری را طراحی می‌کند.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-9 text-slate-500">
            آینده سرچنو در گرو شناخت عمیق‌تر مشتری، کاهش نقاط اصطکاک،
            شنیدن صدای مشتری، استفاده از داده و تبدیل آن به تصمیم‌های
            مدیریتی است.
          </p>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl">
            <div className="text-sm font-black text-slate-400">
              تهیه‌کننده
            </div>

            <div className="mt-3 text-2xl font-black">
              علیرضا آهنی
            </div>

            <div className="mt-2 text-sm text-slate-500">
              دانشجوی MBA اجرایی — دانشگاه مدیریت صنعتی
            </div>

            <div className="mx-auto mt-6 h-px max-w-xs bg-slate-200" />

            <div className="mt-6 text-sm font-black text-slate-400">
              استاد درس مدیریت بازاریابی
            </div>

            <div className="mt-3 text-xl font-black">
              استاد بهزاد ولادی
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <div className="font-black text-slate-950">
            SERCHENO × MBA
          </div>

          <div className="mt-2 text-xs text-slate-400">
            Customer Journey · Customer Experience · CRM · Voice of Customer
          </div>

          <div className="mt-5 text-xs text-slate-400">
            پروژه درس مدیریت بازاریابی — دانشگاه مدیریت صنعتی
          </div>
        </div>
      </footer>
    </main>
  );
      }
