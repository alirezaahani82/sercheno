"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  Building2,
  Check,
  ChevronLeft,
  Globe2,
  Layers3,
  MapPin,
  Menu,
  Network,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950"
    >
      {/* =========================
          NAVBAR
      ========================== */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-5 text-white shadow-2xl backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                <Search className="h-5 w-5 text-white" />
              </div>

              <div>
                <div className="text-lg font-black">سرچینو</div>
                <div className="text-[10px] text-slate-400">
                  جست‌وجو، انتخاب، ارتباط
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
              <a href="#about" className="transition hover:text-white">
                درباره ما
              </a>
              <a href="#how" className="transition hover:text-white">
                چگونه کار می‌کند؟
              </a>
              <a href="#business" className="transition hover:text-white">
                مدل کسب‌وکار
              </a>
              <a href="#company" className="transition hover:text-white">
                شرکت
              </a>
            </div>

            <Link
              href="/"
              className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl md:flex"
            >
              ورود به سرچینو
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-white/10 p-2 md:hidden"
              aria-label="باز کردن منو"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>

          {menuOpen && (
            <div className="mt-2 rounded-2xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl md:hidden">
              <div className="grid gap-4 text-sm">
                <a href="#about" onClick={() => setMenuOpen(false)}>
                  درباره ما
                </a>
                <a href="#how" onClick={() => setMenuOpen(false)}>
                  چگونه کار می‌کند؟
                </a>
                <a href="#business" onClick={() => setMenuOpen(false)}>
                  مدل کسب‌وکار
                </a>
                <a href="#company" onClick={() => setMenuOpen(false)}>
                  شرکت
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* =========================
          HERO
      ========================== */}
      <section className="relative min-h-[900px] overflow-hidden bg-[#030712] text-white">
        <div className="absolute inset-0">
          <div className="absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute left-[-10%] top-[40%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                      <Network className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="relative mt-10">
                    <div className="absolute right-6 top-8 h-[230px] w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent" />

                    <div className="space-y-8">
                      <HeroStep
                        icon={<Search className="h-5 w-5" />}
                        title="جست‌وجو"
                        text="نیاز خود را پیدا کن"
                      />

                      <HeroStep
                        icon={<Layers3 className="h-5 w-5" />}
                        title="کشف و بررسی"
                        text="گزینه‌های مناسب را ببین"
                      />

                      <HeroStep
                        icon={<Users className="h-5 w-5" />}
                        title="ارتباط"
                        text="با ارائه‌دهنده ارتباط بگیر"
                      />

                      <HeroStep
                        icon={<Check className="h-5 w-5" />}
                        title="انتخاب"
                        text="تصمیم بهتر بگیر"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-sm font-bold">
                      بازار، نزدیک‌تر از همیشه
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      اتصال هوشمند خریدار و فروشنده
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      </section>

      {/* =========================
          ABOUT
      ========================== */}
      <section id="about" className="bg-[#f8fafc] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="font-bold text-blue-600">
                داستان سرچینو
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                ما می‌خواهیم پیدا کردن،
                <span className="block text-blue-600">
                  سخت نباشد.
                </span>
              </h2>
            </div>

            <div className="text-lg leading-10 text-slate-600">
              <p>
                در بازار سنتی، پیدا کردن محصول مناسب، فروشنده قابل اعتماد یا
                تأمین‌کننده مورد نیاز گاهی به ساعت‌ها جست‌وجو و تماس نیاز دارد.
                سرچینو با یک ایده ساده شکل گرفته است:
              </p>

              <p className="mt-6 font-black text-slate-950">
                چرا پیدا کردن آنچه می‌خواهیم باید این‌قدر دشوار باشد؟
              </p>

              <p className="mt-6">
                سرچینو تلاش می‌کند این فاصله را کوتاه کند؛ فاصله میان یک نیاز
                و یک راه‌حل، میان یک خریدار و یک فروشنده و میان یک کسب‌وکار
                و مشتریان آینده آن.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<Search className="h-6 w-6" />}
              title="پیدا کردن"
              text="کاربر بتواند کالا، خدمات یا کسب‌وکار مورد نیاز خود را سریع‌تر پیدا کند."
            />
<InfoCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="انتخاب بهتر"
              text="اطلاعات و گزینه‌های مناسب را بررسی کند و با آگاهی بیشتری تصمیم بگیرد."
            />

            <InfoCard
              icon={<Users className="h-6 w-6" />}
              title="ارتباط مستقیم"
              text="میان مشتری و ارائه‌دهنده کالا یا خدمات، ارتباط ساده‌تر و سریع‌تری شکل بگیرد."
            />
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section id="how" className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-bold text-blue-600">
              تجربه سرچینو
            </span>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              از نیاز تا انتخاب،
              <span className="text-blue-600"> یک مسیر ساده</span>
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              ما فرآیند جست‌وجو و پیدا کردن کالا و خدمات را به یک تجربه
              ساده، سریع و قابل فهم تبدیل می‌کنیم.
            </p>
          </div>

          <div className="relative mt-20">
            <div className="absolute right-[12%] left-[12%] top-12 hidden h-px bg-gradient-to-l from-blue-200 via-cyan-200 to-blue-200 lg:block" />

            <div className="grid gap-12 lg:grid-cols-4">
              <ProcessCard
                number="۰۱"
                icon={<Search className="h-7 w-7" />}
                title="جست‌وجو"
                text="نیاز خود را در میان دسته‌بندی‌ها و کسب‌وکارهای موجود جست‌وجو کنید."
              />

              <ProcessCard
                number="۰۲"
                icon={<Layers3 className="h-7 w-7" />}
                title="کشف"
                text="گزینه‌های مختلف را ببینید و اطلاعات مورد نیاز خود را بررسی کنید."
              />

              <ProcessCard
                number="۰۳"
                icon={<Users className="h-7 w-7" />}
                title="ارتباط"
                text="با فروشنده، تأمین‌کننده یا ارائه‌دهنده خدمات مورد نظر ارتباط بگیرید."
              />

              <ProcessCard
                number="۰۴"
                icon={<Check className="h-7 w-7" />}
                title="انتخاب"
                text="با اطلاعات بهتر، انتخاب آگاهانه‌تر و تجربه خرید مناسب‌تری داشته باشید."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BUSINESS MODEL
      ========================== */}
      <section id="business" className="bg-[#030712] py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="font-bold text-cyan-400">
                مدل کسب‌وکار
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                سرچینو فقط یک فروشگاه اینترنتی نیست.
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-300">
                سرچینو با نگاه به مدل Marketplace طراحی شده است؛ بستری که
                می‌تواند خریداران را به فروشندگان، تأمین‌کنندگان و ارائه‌دهندگان
                خدمات متصل کند.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-300">
                هدف ما ایجاد یک اکوسیستم دیجیتال است که در آن کسب‌وکارها فرصت
                بیشتری برای دیده‌شدن و معرفی محصولات و خدمات خود داشته باشند
                و مشتریان نیز بتوانند سریع‌تر به گزینه‌های مناسب دسترسی پیدا کنند.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Tag text="Marketplace" />
                <Tag text="تجارت دیجیتال" />
                <Tag text="جست‌وجوی کالا و خدمات" />
                <Tag text="اتصال خریدار و فروشنده" />
              </div>
            </div>
<div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

              <div className="relative rounded-[3rem] border border-white/10 bg-white/[0.04] p-8">
                <div className="grid gap-4">
                  <BusinessNode
                    icon={<Users className="h-6 w-6" />}
                    title="خریدار"
                    text="نیاز خود را جست‌وجو می‌کند"
                  />

                  <div className="mr-8 h-7 w-px bg-blue-500/50" />

                  <BusinessNode
                    icon={<Search className="h-6 w-6" />}
                    title="سرچینو"
                    text="نیاز و بازار را به هم متصل می‌کند"
                    featured
                  />

                  <div className="mr-8 h-7 w-px bg-cyan-500/50" />

                  <BusinessNode
                    icon={<Store className="h-6 w-6" />}
                    title="فروشنده و تأمین‌کننده"
                    text="محصول یا خدمات خود را معرفی می‌کند"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BUILDING MARKET
      ========================== */}
      <section className="bg-slate-50 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="font-bold text-blue-600">
                شروع از صنعت ساختمان
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                یک بازار بزرگ،
                <span className="block text-blue-600">
                  یک فرصت بزرگ دیجیتال
                </span>
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-600">
                سرچینو فعالیت خود را با تمرکز بر حوزه ساختمان و کالاها و خدمات
                مرتبط با آن آغاز کرده است؛ بازاری گسترده که نیازمند دسترسی
                سریع‌تر به فروشندگان، تأمین‌کنندگان و متخصصان است.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MarketCard
                icon={<Building2 className="h-6 w-6" />}
                title="مصالح ساختمانی"
              />

              <MarketCard
                icon={<Layers3 className="h-6 w-6" />}
                title="تجهیزات و تأسیسات"
              />

              <MarketCard
                icon={<Store className="h-6 w-6" />}
                title="درب و پنجره"
              />

              <MarketCard
                icon={<Zap className="h-6 w-6" />}
                title="خدمات تخصصی"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BUYER / SELLER
      ========================== */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-bold text-blue-600">
              ارزش پیشنهادی سرچینو
            </span>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              برای هر دو طرف بازار،
              <span className="text-blue-600"> ارزش ایجاد می‌کنیم</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <AudienceCard
              icon={<Users className="h-8 w-8" />}
              title="برای خریداران"
              description="سرچینو کمک می‌کند مسیر پیدا کردن کالا، خدمات و تأمین‌کننده کوتاه‌تر شود."
              items={[
                "دسترسی آسان‌تر به کسب‌وکارها",
                "کاهش زمان جست‌وجو",
                "بررسی گزینه‌های مختلف",
                "ارتباط آسان‌تر با فروشندگان",
              ]}
            />
<AudienceCard
              icon={<Store className="h-8 w-8" />}
              title="برای فروشندگان و کسب‌وکارها"
              description="سرچینو فرصتی برای معرفی بهتر کسب‌وکار و قرار گرفتن در مسیر جست‌وجوی مشتریان ایجاد می‌کند."
              items={[
                "معرفی محصولات و خدمات",
                "دیده‌شدن در فضای دیجیتال",
                "دسترسی به مشتریان جدید",
                "ایجاد فرصت‌های فروش بیشتر",
              ]}
            />
          </div>
        </div>
      </section>

      {/* =========================
          VISION
      ========================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 py-32 text-white">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Globe2 className="mx-auto h-14 w-14 text-cyan-300" />

          <h2 className="mt-8 text-4xl font-black sm:text-6xl">
            چشم‌انداز ما
          </h2>

          <p className="mt-8 text-xl leading-10 text-blue-100 sm:text-2xl">
            ساخت یک زیرساخت دیجیتال که پیدا کردن کالا، خدمات، فروشنده،
            تأمین‌کننده و متخصص را برای مردم و کسب‌وکارها ساده‌تر کند.
          </p>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <p className="text-2xl font-black leading-relaxed">
              ما می‌خواهیم سرچینو به جایی تبدیل شود که وقتی کسی چیزی می‌خواهد،
              اولین سؤالش این باشد:
            </p>

            <p className="mt-5 text-3xl font-black text-cyan-300">
              «در سرچینو پیداش کنم؟»
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          COMPANY
      ========================== */}
      <section id="company" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-2xl">
            <div className="bg-slate-950 p-10 text-white sm:p-14">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 text-blue-400">
                    <Building2 className="h-7 w-7" />
                    <span className="font-bold">
                      یک محصول از یک مجموعه ایرانی
                    </span>
                  </div>

                  <h2 className="mt-7 text-4xl font-black sm:text-5xl">
                    امیرتوان پویای گستر
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <div className="text-sm text-slate-400">
                    محصول و پلتفرم
                  </div>
                  <div className="mt-1 font-black text-white">
                    سرچینو
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-14">
              <p className="text-lg leading-10 text-slate-700">
                پلتفرم <strong className="text-slate-950">سرچینو</strong> توسط
                شرکت <strong className="text-blue-700">امیرتوان پویای گستر</strong>{" "}
                ایجاد و توسعه یافته است.
              </p>

              <p className="mt-7 text-lg leading-10 text-slate-700">
                ایده‌پردازی، طراحی مدل کسب‌وکار و مدل فروش، طراحی تجربه کاربری،
                مدیریت و هدایت پروژه و همچنین طراحی و برنامه‌نویسی صفر تا صد
                پلتفرم سرچینو، بر عهده مدیرعامل شرکت امیرتوان پویای گستر،
                <strong className="text-slate-950"> علیرضا آهنی</strong>،
                می‌باشد.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <CompanyPoint
                  icon={<Target className="h-5 w-5" />}
                  text="ایده‌پردازی و استراتژی"
                />
function CompanyPoint({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-blue-600">{icon}</div>
      <span className="text-sm font-bold text-slate-700">{text}</span>
    </div>
  );
}

function ContactBox({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) {
  const contentElement = href ? (
    <a
      href={href}
      dir="ltr"
      className="mt-2 block text-xl font-black text-white transition hover:text-cyan-300"
    >
      {content}
    </a>
  ) : (
    <p className="mt-2 text-lg font-bold leading-8 text-white">{content}</p>
  );

  return (
    <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div>
        <div className="text-sm text-slate-500">{title}</div>
        {contentElement}
      </div>
    </div>
  );
}
<CompanyPoint
                  icon={<Layers3 className="h-5 w-5" />}
                  text="طراحی محصول و تجربه کاربری"
                />

                <CompanyPoint
                  icon={<Rocket className="h-5 w-5" />}
                  text="توسعه و مدیریت پروژه"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT
      ========================== */}
      <section className="bg-[#030712] py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="font-bold text-cyan-400">
                ارتباط با ما
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                بیایید آینده را
                <span className="block text-blue-400">
                  با هم بسازیم.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-9 text-slate-400">
                برای ارتباط با مجموعه سرچینو و شرکت امیرتوان پویای گستر،
                می‌توانید از اطلاعات زیر استفاده کنید.
              </p>
            </div>

            <div className="space-y-5">
              <ContactBox
                icon={<Phone className="h-6 w-6" />}
                title="شماره تماس"
                content="09144389280"
                href="tel:09144389280"
              />

              <ContactBox
                icon={<MapPin className="h-6 w-6" />}
                title="آدرس دفتر مرکزی"
                content="آذربایجان شرقی، تبریز، ولیعصر، روبه‌روی ساختمان افرا، پلاک ۱۳۹"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Search className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-4xl font-black sm:text-5xl">
            چیزی که دنبالش هستی،
            <span className="block text-blue-600">
              شاید همین‌جا باشد.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            به سرچینو برگرد و جست‌وجوی خود را آغاز کن.
          </p>

          <Link
            href="/"
            className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
          >
            ورود به سرچینو
            <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
          </Link>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} سرچینو — تمامی حقوق محفوظ است.
          </div>

          <div className="flex items-center gap-2">
            <span>طراحی و توسعه توسط</span>
            <strong className="text-slate-950">
              امیرتوان پویای گستر
            </strong>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   COMPONENTS
========================= */

function HeroStep({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative z-10 flex items-center gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
        {icon}
      </div>
<div>
        <div className="font-black">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{text}</div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-black">{title}</h3>

      <p className="mt-4 leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function ProcessCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative z-10 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border-8 border-white bg-slate-950 text-white shadow-xl">
        {icon}
      </div>

      <div className="mt-5 text-xs font-black text-blue-600">
        مرحله {number}
      </div>

      <h3 className="mt-2 text-xl font-black">{title}</h3>

      <p className="mt-4 leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
      {text}
    </span>
  );
}

function BusinessNode({
  icon,
  title,
  text,
  featured = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <div
      className={flex items-center gap-5 rounded-3xl border p-5 ${
        featured
          ? "border-blue-500/30 bg-blue-500/10"
          : "border-white/10 bg-white/5"
      }}
    >
      <div
        className={flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
          featured
            ? "bg-blue-500 text-white"
            : "bg-white/5 text-blue-400"
        }}
      >
        {icon}
      </div>

      <div>
        <div className="font-black">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{text}</div>
      </div>
    </div>
  );
}

function MarketCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="group flex min-h-40 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-black">{title}</h3>
        <ChevronLeft className="h-5 w-5 text-slate-300 transition group-hover:-translate-x-1 group-hover:text-blue-600" />
      </div>
    </div>
  );
}

function AudienceCard({
  icon,
  title,
  description,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 sm:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white">
        {icon}
      </div>

      <h3 className="mt-8 text-3xl font-black">{title}</h3>

      <p className="mt-5 leading-8 text-slate-600">{description}</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              <Check className="h-3.5 w-3.5" />
            </div>

            <span className="font-bold text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
