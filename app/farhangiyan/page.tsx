
"use client";

import { useMemo, useState } from "react";

const lessons = [
  {
    title: "سوز و حرص در تعلیم و تربیت",
    short: "دلسوزی",
    icon: "♥",
    color: "rose",
    quote: "معلم موفق، نسبت به رشد و آینده شاگردان خود بی‌تفاوت نیست.",
    meaning:
      "معلم باید رشد علمی، اخلاقی و شخصیتی دانش‌آموزان را جدی بگیرد و برای یادگیری آنان دغدغه داشته باشد.",
    example:
      "دانش‌آموزی در درس ضعیف است. معلم به‌جای برچسب زدن، علت مشکل را پیدا می‌کند و برای کمک به او راهی تازه می‌آزماید.",
    practice: "هر روز برای کمک به دانش‌آموزی که به حمایت بیشتری نیاز دارد، یک اقدام مشخص انجام دهیم.",
  },
  {
    title: "سعه صدر داشته باشد",
    short: "بردباری",
    icon: "◉",
    color: "amber",
    quote: "کلاس درس به معلمی نیاز دارد که در شرایط دشوار، آرامش خود را حفظ کند.",
    meaning:
      "سعه صدر یعنی ظرفیت شنیدن، تحمل شرایط دشوار، برخورد سنجیده با اشتباهات و مدیریت هیجان‌ها.",
    example:
      "دانش‌آموزی پاسخ اشتباهی می‌دهد یا پرسشی تکراری می‌پرسد. معلم با آرامش پاسخ می‌دهد و او را تحقیر نمی‌کند.",
    practice: "پیش از واکنش به رفتار نامناسب، مکث کنیم و علت رفتار دانش‌آموز را بسنجیم.",
  },
  {
    title: "بی‌تکلف باشد",
    short: "صمیمیت",
    icon: "✳",
    color: "teal",
    quote: "وقار معلم با صمیمیت و سادگی او منافاتی ندارد.",
    meaning:
      "معلم می‌تواند بدون رفتارهای تصنعی و تشریفات غیرضروری، محترمانه و صمیمی با شاگردان ارتباط برقرار کند.",
    example:
      "معلم هنگام گفت‌وگو با دانش‌آموزان، به حرف آن‌ها گوش می‌دهد و بدون فاصله‌گذاری غیرضروری، فضای امنی برای پرسش ایجاد می‌کند.",
    practice: "در ارتباط با دانش‌آموزان، طبیعی، محترمانه و قابل‌اعتماد باشیم.",
  },
  {
    title: "مخلص باشد",
    short: "اخلاص",
    icon: "✦",
    color: "violet",
    quote: "ارزش کار تربیتی تنها به دیده‌شدن آن وابسته نیست.",
    meaning:
      "اخلاص یعنی هدف اصلی فعالیت آموزشی و تربیتی، انجام درست مسئولیت و خدمت صادقانه باشد، نه صرفاً جلب توجه دیگران.",
    example:
      "معلم برای یادگیری بهتر کلاس وقت می‌گذارد، حتی وقتی این تلاش در معرض تشویق یا تقدیر عمومی قرار نمی‌گیرد.",
    practice: "پیش از هر فعالیت آموزشی، هدف خود را از انجام آن روشن کنیم.",
  },
  {
    title: "خود را فارغ‌التحصیل نداند",
    short: "یادگیری مداوم",
    icon: "↗",
    color: "blue",
    quote: "معلم خوب، هم‌زمان با آموزش دادن، یادگیرنده نیز باقی می‌ماند.",
    meaning:
      "پایان تحصیلات رسمی به معنای پایان یادگیری نیست. معلم باید دانش، روش تدریس و شناخت خود از دانش‌آموزان را به‌روز کند.",
    example:
      "معلم پس از مشاهده بی‌علاقگی کلاس، روش تدریس خود را بررسی می‌کند و راهکارهای تازه‌ای می‌آموزد.",
    practice: "هر هفته زمانی برای مطالعه، بازنگری تدریس و یادگیری یک مهارت تازه اختصاص دهیم.",
  },
  {
    title: "توفیقاتش را از خدا بداند",
    short: "توکل و قدردانی",
    icon: "☼",
    color: "amber",
    quote: "تلاش، برنامه‌ریزی و توکل می‌توانند در کنار یکدیگر معنا پیدا کنند.",
    meaning:
      "در نگاه دینی کتاب، معلم موفق نعمت‌ها و فرصت‌های خود را فراموش نمی‌کند و در کنار تلاش و مسئولیت‌پذیری، به خدا توکل دارد.",
    example:
      "معلم پس از موفقیت دانش‌آموزان، هم از تلاش آنان و هم از همکاران و فرصت‌های فراهم‌شده قدردانی می‌کند.",
    practice: "موفقیت را فرصتی برای شکرگزاری و تلاش بیشتر بدانیم، نه دلیلی برای غرور.",
  },
  {
    title: "شجاعت و شهامت داشته باشد",
    short: "شهامت",
    icon: "⬡",
    color: "rose",
    quote: "معلم مسئولیت‌پذیر، در موقعیت‌های دشوار از انجام وظیفه درست کنار نمی‌کشد.",
    meaning:
      "شهامت در معلمی یعنی بیان سنجیده حقیقت، دفاع از حق دانش‌آموز و تصمیم‌گیری مسئولانه، بدون بی‌احترامی یا شتاب‌زدگی.",
    example:
      "وقتی دانش‌آموزی مورد تمسخر قرار می‌گیرد، معلم با قاطعیت و احترام از کرامت او دفاع می‌کند.",
    practice: "در موقعیت‌های دشوار، اصول اخلاقی و عدالت را مبنای تصمیم خود قرار دهیم.",
  },
  {
    title: "اعتمادبه‌نفس داشته باشد",
    short: "خودباوری",
    icon: "◎",
    color: "teal",
    quote: "معلم باید به توانایی رشد خود و شاگردانش باور داشته باشد.",
    meaning:
      "اعتمادبه‌نفس یعنی توانایی تصمیم‌گیری و تدریس با اطمینان معقول، همراه با پذیرش اشتباه و آمادگی برای اصلاح آن.",
    example:
      "اگر معلم پاسخ پرسشی را نداند، صادقانه اعلام می‌کند که موضوع را بررسی خواهد کرد و در جلسه بعد پاسخ می‌دهد.",
    practice: "توانایی‌های خود را تقویت کنیم و ندانستن یک موضوع را فرصتی برای یادگیری بدانیم.",
  },
  {
    title: "اهل مطالعه و افزایش دانش باشد",
    short: "دانش‌افزایی",
    icon: "▤",
    color: "blue",
    quote: "برای آموزش درست، باید پیوسته آموخت.",
    meaning:
      "مطالعه منابع معتبر و آشنایی با نیازهای آموزشی، پایه‌ای برای تدریس دقیق‌تر و پاسخ‌گویی بهتر به پرسش‌هاست.",
    example:
      "معلم پیش از شروع یک مبحث، منابع مناسب را بررسی می‌کند و مثال‌هایی متناسب با زندگی روزمره دانش‌آموزان می‌یابد.",
    practice: "مطالعه را به بخشی منظم از برنامه هفتگی خود تبدیل کنیم.",
  },
  {
    title: "با اخلاق و خوش‌رفتار باشد",
    short: "اخلاق حرفه‌ای",
    icon: "❋",
    color: "violet",
    quote: "رفتار معلم بخشی از آموزش اوست.",
    meaning:
      "احترام، انصاف، راست‌گویی و رعایت کرامت دانش‌آموزان، اعتماد متقابل و محیطی امن برای یادگیری ایجاد می‌کند.",
    example:
      "معلم هنگام اصلاح اشتباه، درباره پاسخ یا رفتار دانش‌آموز صحبت می‌کند، نه اینکه شخصیت او را زیر سؤال ببرد.",
    practice: "میان نقد رفتار نادرست و بی‌احترامی به شخصیت دانش‌آموز تفاوت بگذاریم.",
  },
  {
    title: "عدالت را رعایت کند",
    short: "عدالت",
    icon: "⚖",
    color: "amber",
    quote: "هر دانش‌آموز شایسته احترام و فرصت منصفانه برای یادگیری است.",
    meaning:
      "عدالت یعنی پرهیز از تبعیض و ارزیابی منصفانه؛ در عین حال، توجه به نیازهای متفاوت دانش‌آموزان نیز ضروری است.",
    example:
      "معلم هنگام نمره‌دهی، معیارهای مشخصی دارد و علاقه شخصی یا وضعیت خانوادگی را جایگزین عملکرد آموزشی نمی‌کند.",
    practice: "معیارهای ارزشیابی را شفاف و قابل توضیح برای همه دانش‌آموزان تنظیم کنیم.",
  },
  {
    title: "صبور و امیدوار باشد",
    short: "صبر",
    icon: "⌛",
    color: "teal",
    quote: "رشد آموزشی همیشه فوری و یکسان نیست.",
    meaning:
      "صبر به معلم کمک می‌کند تفاوت‌های فردی را بپذیرد، از پیشرفت‌های کوچک غافل نشود و در مسیر آموزش استمرار داشته باشد.",
    example:
      "دانش‌آموزی با چند بار تمرین هنوز مسئله را حل نمی‌کند. معلم به‌جای سرزنش، شیوه توضیح را تغییر می‌دهد.",
    practice: "پیشرفت هر دانش‌آموز را با مسیر رشد خودش نیز مقایسه کنیم.",
  },
  {
    title: "اهل عمل و مسئولیت‌پذیر باشد",
    short: "عمل‌گرایی",
    icon: "✓",
    color: "blue",
    quote: "دانش و توصیه زمانی اثرگذارند که به رفتار تبدیل شوند.",
    meaning:
      "معلم باید در انجام وظایف خود پیگیر باشد و میان آنچه به شاگردان آموزش می‌دهد و رفتار شخصی‌اش هماهنگی ایجاد کند.",
    example:
      "معلمی که درباره نظم صحبت می‌کند، خودش نیز برای حضور به‌موقع، آمادگی کلاس و انجام تعهدات اهمیت قائل است.",
    practice: "برای هر توصیه تربیتی، نمونه‌ای از اجرای آن در رفتار خود پیدا کنیم.",
  },
];

const questions = [
  {
    q: "کدام رفتار نمونه‌ای از سعه صدر است؟",
    options: [
      "سرزنش دانش‌آموز به دلیل پرسش تکراری",
      "گوش‌دادن به پرسش و توضیح دوباره با آرامش",
      "نادیده‌گرفتن همه مشکلات کلاس",
      "مقایسه تحقیرآمیز دانش‌آموزان",
    ],
    correct: 1,
    why: "سعه صدر با آرامش، تحمل و واکنش سنجیده در موقعیت دشوار ارتباط دارد.",
  },
  {
    q: "معلمی که خود را فارغ‌التحصیل نهایی نمی‌داند، چه می‌کند؟",
    options: [
      "به روش‌های قدیمی خود بسنده می‌کند",
      "فقط از دانش‌آموزان انتظار تغییر دارد",
      "پیوسته مطالعه می‌کند و روش تدریسش را بهبود می‌دهد",
      "از پذیرش اشتباه خودداری می‌کند",
    ],
    correct: 2,
    why: "یادگیری مداوم به معلم کمک می‌کند دانش و شیوه تدریس خود را بهبود دهد.",
  },
  {
    q: "کدام گزینه با اخلاص در کار معلمی سازگارتر است؟",
    options: [
      "انجام وظیفه فقط برای دریافت تحسین",
      "توجه به رشد شاگرد و انجام صادقانه مسئولیت",
      "نادیده‌گرفتن نیازهای دانش‌آموز",
      "رقابت ناسالم با همکاران",
    ],
    correct: 1,
    why: "اخلاص بر نیت درست و خدمت صادقانه تأکید دارد.",
  },
  {
    q: "اعتمادبه‌نفس حرفه‌ای کدام رفتار را تقویت می‌کند؟",
    options: [
      "پذیرفتن اینکه معلم هرگز اشتباه نمی‌کند",
      "پنهان‌کردن ندانستن پاسخ",
      "پذیرش ندانستن و پیگیری پاسخ درست",
      "ردکردن پرسش‌های دشوار",
    ],
    correct: 2,
    why: "خودباوری واقعی با صداقت و آمادگی برای یادگیری همراه است.",
  },
  {
    q: "عدالت در ارزشیابی دانش‌آموزان یعنی چه؟",
    options: [
      "دادن نمره برابر بدون توجه به معیارها",
      "توجه صرف به دانش‌آموزان ممتاز",
      "استفاده از معیارهای روشن و منصفانه",
      "تأثیر دادن علاقه شخصی در نمره",
    ],
    correct: 2,
    why: "معیارهای شفاف و پرهیز از تبعیض، پایه ارزشیابی منصفانه هستند.",
  },
];

export default function FarhangiyanPage() {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [read, setRead] = useState<number[]>([]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);

  const filtered = useMemo(
    () =>
      lessons
        .map((lesson, index) => ({ ...lesson, index }))
        .filter((lesson) =>
          `${lesson.title} ${lesson.short} ${lesson.meaning}`
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
    [search]
  );

  const current = lessons[active];
  const progress = Math.round((read.length / lessons.length) * 100);
  const score = questions.reduce(
    (sum, question, index) =>
      sum + (answers[index] === question.correct ? 1 : 0),
    0
  );

  function selectLesson(index: number) {
    setActive(index);
    setQuizOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markRead() {
    setRead((previous) =>
      previous.includes(active) ? previous : [...previous, active]
    );
  }

  function nextLesson() {
    markRead();
    setActive((previous) => Math.min(previous + 1, lessons.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main
      dir="rtl"
      className={`min-h-screen bg-[#f5f1e8] text-[#172b35] ${
        showPresentation ? "presentation-mode" : ""
      }`}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap");

        .presentation-mode .site-header,
        .presentation-mode .site-sidebar,
        .presentation-mode .site-footer,
        .presentation-mode .presentation-toggle {
          display: none !important;
        }

        .presentation-mode .lesson-content {
          max-width: 1100px;
          margin: 0 auto;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Vazirmatn", Tahoma, sans-serif;
        }

        @media print {
          .site-header,
          .site-sidebar,
          .site-footer,
          .presentation-toggle,
          .interactive-controls {
            display: none !important;
          }

          main {
            background: white !important;
            color: black !important;
          }

          .lesson-content {
            max-width: 100% !important;
          }

          .print-card {
            break-inside: avoid;
          }
        }
      `}</style>

      <header className="site-header border-b border-[#d9cfbb] bg-[#172b35] text-[#f7f1e5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <a href="/" className="text-xl font-black tracking-tight">
            سرچنو
            <span className="mr-2 text-xs font-medium text-[#d5b777]">
              / فضای یادگیری
            </span>
          </a>

          <button
            type="button"
            onClick={() => setShowPresentation((value) => !value)}
            className="presentation-toggle rounded-full border border-[#d5b777]/60 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            {showPresentation ? "بازگشت به صفحه کامل" : "حالت ارائه کلاسی ↗"}
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#172b35] px-5 pb-16 pt-10 text-[#f7f1e5] md:px-8 md:pb-24 md:pt-16">
        <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full border border-[#d5b777]/15" />
        <div className="absolute -left-8 -top-16 h-56 w-56 rounded-full border border-[#d5b777]/20" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#d5b777] md:text-sm">
            <span>دانشگاه فرهنگیان</span>
            <span>/</span>
            <span>مهارت‌های معلمی</span>
            <span>/</span>
            <span>فصل دوم</span>
          </div>

          <div className="grid items-end gap-10 md:grid-cols-[1.5fr_0.7fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d5b777]/30 px-4 py-2 text-xs text-[#e5cf9b]">
                <span>✦</span>
                <span>روایت یک مسیر؛ از دانستن تا معلم‌شدن</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.5] md:text-6xl md:leading-[1.45]">
                صفات معلم
                <span className="block text-[#d5b777]">شخصیت، رسالت، اثرگذاری</span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#e0e5e2] md:text-base md:leading-9">
                نگاهی آموزشی و کاربردی به فصل دوم کتاب مهارت‌های معلمی
                استاد محسن قرائتی؛ برای دانشجومعلمانی که می‌خواهند علاوه بر
                آموزش، در رشد انسان‌ها نیز اثرگذار باشند.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setShowPresentation(false);
                    selectLesson(0);
                  }}
                  className="rounded-xl bg-[#d5b777] px-6 py-3 font-bold text-[#172b35] transition hover:bg-[#e7cb8d]"
                >
                  شروع مطالعه <span className="mr-2">←</span>
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("lesson-list")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm transition hover:bg-white/10"
                >
                  مشاهده فهرست مطالب
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="rounded-[2rem] border border-[#d5b777]/25 bg-white/[0.04] p-7">
                <div className="mb-5 text-sm text-[#d5b777]">
                  اندیشه آغازین
                </div>
                <div className="text-5xl text-[#d5b777]">“</div>
                <p className="text-xl font-semibold leading-10">
                  معلمی فقط انتقال دانش نیست؛ ساختن فرصت رشد برای انسان‌هاست.
                </p>
                <div className="mt-6 h-px bg-[#d5b777]/30" />
                <div className="mt-4 text-xs leading-7 text-[#c8d0cf]">
                  یادگیری · اخلاق · مسئولیت · تربیت
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 md:max-w-2xl md:gap-8">
            <div>
              <div className="text-2xl font-black text-[#d5b777]">
                {lessons.length}
              </div>
              <div className="mt-1 text-xs text-[#d3d9d7]">بخش آموزشی</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#d5b777]">
                {questions.length}
              </div>
              <div className="mt-1 text-xs text-[#d3d9d7]">پرسش ارزیابی</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#d5b777]">۱</div>
              <div className="mt-1 text-xs text-[#d3d9d7]">مسیر رشد معلم</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[290px_minmax(0,1fr)] md:px-8 md:py-14">
        <aside
          id="lesson-list"
          className="site-sidebar h-fit space-y-5 md:sticky md:top-5"
        >
          <div className="rounded-2xl border border-[#e0d7c6] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-extrabold">مسیر یادگیری</h2>
              <span className="text-xs text-[#8a7958]">
                {read.length} از {lessons.length}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#eee8dc]">
              <div
                className="h-full rounded-full bg-[#b89a5c] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-xs leading-6 text-[#77766d]">
              با مطالعه هر بخش، آن را تکمیل کن و مسیر پیشرفتت را ببین.
            </p>

            <label className="mt-5 block text-xs font-semibold text-[#52616a]">
              جست‌وجو در موضوعات
            </label>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="مثلاً سعه صدر..."
              className="mt-2 w-full rounded-xl border border-[#e2daca] bg-[#faf8f3] px-4 py-3 text-sm outline-none transition focus:border-[#b89a5c]"
            />

            <nav className="mt-4 space-y-1.5">
              {filtered.map((lesson) => (
                <button
                  key={lesson.index}
                  onClick={() => selectLesson(lesson.index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition ${
                    active === lesson.index
                      ? "bg-[#172b35] text-white"
                      : "text-[#44545b] hover:bg-[#f5f1e8]"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                      active === lesson.index
                        ? "bg-[#d5b777] text-[#172b35]"
                        : "bg-[#f1ebdf] text-[#8c774a]"
                    }`}
                  >
                    {read.includes(lesson.index) ? "✓" : lesson.index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">
                    {lesson.short}
                  </span>
                  {active === lesson.index && (
                    <span className="text-[#d5b777]">←</span>
                  )}
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="py-5 text-center text-sm text-[#77766d]">
                  موضوعی پیدا نشد.
                </p>
              )}
            </nav>
          </div>

          <div className="rounded-2xl bg-[#e9e0ce] p-5">
            <div className="text-xs font-bold text-[#8a7040]">
              مکثی برای اندیشیدن
            </div>
            <p className="mt-3 text-sm leading-8 text-[#394b50]">
              اگر امروز وارد کلاس شوی، دوست داری دانش‌آموزانت در کنار تو چه
              احساسی داشته باشند؟
            </p>
          </div>
        </aside>

        <section className="lesson-content min-w-0">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-[#8c8069] md:text-sm">
              فصل دوم کتاب مهارت‌های معلمی
              <span className="mx-2">/</span>
              بخش {active + 1}
            </div>

            <button
              onClick={() => window.print()}
              className="interactive-controls rounded-lg border border-[#dcd2bf] bg-white px-4 py-2 text-xs font-semibold transition hover:bg-[#f9f6ef]"
            >
              چاپ یا ذخیره PDF
            </button>
          </div>

          <article className="print-card overflow-hidden rounded-[1.75rem] border border-[#e0d7c6] bg-white">
            <div className="relative overflow-hidden bg-[#172b35] p-7 text-white md:p-10">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-[#d5b777]/20" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d5b777] text-2xl text-[#172b35]">
                    {current.icon}
                  </span>
                  <span className="text-sm text-[#d5b777]">
                    صفت {String(active + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-relaxed md:text-4xl">
                  {current.title}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-[#dce3e1] md:text-base">
                  {current.quote}
                </p>
              </div>
            </div>

            <div className="space-y-7 p-6 md:p-10">
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg text-[#b89a5c]">◈</span>
                  <h3 className="font-extrabold">مفهوم و تبیین آموزشی</h3>
                </div>
                <p className="text-sm leading-9 text-[#46565b] md:text-base md:leading-10">
                  {current.meaning}
                </p>
              </section>

              <div className="h-px bg-[#eee8dc]" />

              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg text-[#b89a5c]">◇</span>
                  <h3 className="font-extrabold">این صفت در کلاس چه شکلی دارد؟</h3>
                </div>
                <div className="rounded-2xl bg-[#f7f4ed] p-5 md:p-6">
                  <div className="mb-3 text-xs font-bold text-[#947b48]">
                    یک موقعیت واقعی
                  </div>
                  <p className="text-sm leading-9 text-[#46565b]">
                    {current.example}
                  </p>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg text-[#b89a5c]">✦</span>
                  <h3 className="font-extrabold">تمرین برای دانشجومعلم</h3>
                </div>
                <p className="rounded-2xl border border-[#e8dcc3] p-5 text-sm leading-9 text-[#46565b]">
                  {current.practice}
                </p>
              </section>

              <div className="interactive-controls flex flex-wrap items-center justify-between gap-3 border-t border-[#eee8dc] pt-6">
                <button
                  onClick={() => setActive((value) => Math.max(value - 1, 0))}
                  disabled={active === 0}
                  className="rounded-xl border border-[#ded5c5] px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-35"
                >
                  بخش قبلی
                </button>

                <button
                  onClick={markRead}
                  disabled={read.includes(active)}
                  className="rounded-xl border border-[#b89a5c] px-5 py-3 text-sm font-semibold text-[#796139] transition hover:bg-[#f7f1e4] disabled:opacity-60"
                >
                  {read.includes(active) ? "✓ مطالعه شد" : "علامت‌گذاری مطالعه"}
                </button>

                <button
                  onClick={nextLesson}
                  disabled={active === lessons.length - 1}
                  className="rounded-xl bg-[#172b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29434e] disabled:opacity-35"
                >
                  بخش بعدی ←
                </button>
              </div>
            </div>
          </article>

          <section className="mt-8 rounded-[1.75rem] border border-[#e0d7c6] bg-white p-6 md:p-9">
            <div className="text-xs font-bold text-[#a08751]">
              جمع‌بندی فصل
            </div>
            <h2 className="mt-3 text-2xl font-black leading-relaxed">
              معلم خوب، در عمل شناخته می‌شود.
            </h2>
            <p className="mt-4 text-sm leading-9 text-[#52616a]">
              صفات معلمی زمانی ارزش آموزشی پیدا می‌کنند که در رفتار روزمره
              نمود داشته باشند؛ در نحوه شنیدن، شیوه توضیح دادن، برخورد با
              اشتباه، رعایت عدالت و تلاش برای یادگیری بیشتر. این ویژگی‌ها
              باید در کنار دانش تخصصی، مهارت تدریس و شناخت دانش‌آموزان رشد کنند.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["۱", "خودشناسی", "نقاط قوت و ضعف حرفه‌ای خود را بشناسیم."],
                ["۲", "تمرین", "هر صفت را به یک رفتار عملی تبدیل کنیم."],
                ["۳", "بازنگری", "از تجربه تدریس و بازخورد دیگران بیاموزیم."],
                ["۴", "استمرار", "رشد معلمی را مسیری همیشگی بدانیم."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-xl bg-[#f7f4ed] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7dcc3] text-sm font-black text-[#7d663d]">
                      {number}
                    </span>
                    <span className="font-bold">{title}</span>
                  </div>
                  <p className="mt-3 text-xs leading-7 text-[#69777a]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="interactive-controls mt-8 overflow-hidden rounded-[1.75rem] bg-[#172b35] p-6 text-white md:p-9">
            <div className="text-xs font-bold text-[#d5b777]">
              خودآزمایی پایانی
            </div>
            <h2 className="mt-3 text-2xl font-black">
              چقدر از مفاهیم آموخته‌شده را به خاطر سپرده‌ای؟
            </h2>
            <p className="mt-3 text-sm leading-8 text-[#dce3e1]">
              به پنج پرسش پاسخ بده و نتیجه را همراه با توضیح هر پاسخ ببین.
            </p>

            {!quizOpen ? (
              <button
                onClick={() => {
                  setQuizOpen(true);
                  setFinished(false);
                  setAnswers({});
                }}
                className="mt-6 rounded-xl bg-[#d5b777] px-6 py-3 font-bold text-[#172b35] transition hover:bg-[#e7cb8d]"
              >
                شروع آزمون ←
              </button>
            ) : (
              <div className="mt-7 space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.q}
                    className="rounded-2xl border border-white/15 p-5"
                  >
                    <div className="text-xs text-[#d5b777]">
                      پرسش {index + 1} از {questions.length}
                    </div>
                    <h3 className="mt-3 font-bold leading-8">
                      {question.q}
                    </h3>
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const selected = answers[index] === optionIndex;
                        const isCorrect = question.correct === optionIndex;

                        return (
                          <button
                            key={option}
                            onClick={() => {
                              if (finished) return;
                              setAnswers((previous) => ({
                                ...previous,
                                [index]: optionIndex,
                              }));
                            }}
                            className={`w-full rounded-xl border px-4 py-3 text-right text-sm leading-7 transition ${
                              finished && isCorrect
                                ? "border-emerald-400 bg-emerald-400/10"
                                : selected
                                  ? "border-[#d5b777] bg-[#d5b777]/10"
                                  : "border-white/10 hover:bg-white/5"
                            }`}
                          >
                            <span className="ml-2 text-[#d5b777]">
                              {["الف", "ب", "ج", "د"][optionIndex]}.
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {finished && (
                      <p className="mt-4 text-sm leading-8 text-[#dce3e1]">
                        <span className="font-bold text-[#d5b777]">
                          توضیح:
                        </span>{" "}
                        {question.why}
                      </p>
                    )}
                  </div>
                ))}

                {!finished ? (
                  <button
                    disabled={Object.keys(answers).length !== questions.length}
                    onClick={() => setFinished(true)}
                    className="rounded-xl bg-[#d5b777] px-6 py-3 font-bold text-[#172b35] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    بررسی پاسخ‌ها
                  </button>
                ) : (
                  <div className="rounded-2xl border border-[#d5b777]/40 p-6">
                    <div className="text-sm text-[#d5b777]">نتیجه آزمون</div>
                    <div className="mt-2 text-4xl font-black">
                      {score} از {questions.length}
                    </div>
                    <p className="mt-3 text-sm leading-8 text-[#dce3e1]">
                      {score === questions.length
                        ? "عالی است! به همه پرسش‌ها درست پاسخ دادی."
                        : "پاسخ‌ها و توضیحات را مرور کن و برای تثبیت یادگیری دوباره تلاش کن."}
                    </p>
                    <button
                      onClick={() => {
                        setAnswers({});
                        setFinished(false);
                      }}
                      className="mt-5 rounded-xl border border-white/20 px-5 py-3 text-sm hover:bg-white/10"
                    >
                      تلاش دوباره
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="mt-8 rounded-2xl border border-[#e0d7c6] bg-white p-6">
            <h2 className="font-extrabold">مشخصات ارائه</h2>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl bg-[#f7f4ed] p-4">
                <div className="text-xs text-[#8a806f]">درس</div>
                <div className="mt-2 font-semibold">مهارت‌های معلمی</div>
              </div>
              <div className="rounded-xl bg-[#f7f4ed] p-4">
                <div className="text-xs text-[#8a806f]">موضوع</div>
                <div className="mt-2 font-semibold">فصل دوم؛ صفات معلم</div>
              </div>
              <div className="rounded-xl bg-[#f7f4ed] p-4">
                <div className="text-xs text-[#8a806f]">استاد درس</div>
                <div className="mt-2 font-semibold">استاد واسع</div>
              </div>
              <div className="rounded-xl bg-[#f7f4ed] p-4">
                <div className="text-xs text-[#8a806f]">ارائه‌دهنده</div>
                <div className="mt-2 font-semibold">علیرضا آهنی</div>
              </div>
            </div>
            <p className="mt-5 text-xs leading-7 text-[#817d72]">
              منبع اصلی: محسن قرائتی، کتاب مهارت‌های معلمی، فصل دوم «صفات
              معلم». توضیحات و مثال‌های این صفحه با هدف آموزش و کاربردی‌سازی
              مفاهیم تنظیم شده‌اند و نقل‌قول مستقیم از متن کتاب محسوب نمی‌شوند.
            </p>
          </section>

          <footer className="site-footer py-8 text-center text-xs leading-7 text-[#8a806f]">
            تهیه‌شده برای ارائه دانشگاهی درس مهارت‌های معلمی
            <div>طراحی آموزشی در بستر سرچنو</div>
          </footer>
        </section>
      </div>
    </main>
  );
}
