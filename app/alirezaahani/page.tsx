"use client";
import Image from "next/image";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "علیرضا آهنی",
  alternateName: "Alireza Ahani",
  url: "https://sercheno-ywf1.vercel.app/alirezaahani",
  jobTitle: "کارآفرین، مدیر و بنیان‌گذار سرچنو",
  worksFor: {
    "@type": "Organization",
    name: "شرکت امیر توان پویای گستر",
  },
  founder: {
    "@type": "Organization",
    name: "سرچنو",
  },
  knowsAbout: [
    "مدیریت و توسعه کسب و کار",
    "فناوری",
    "برنامه نویسی",
    "هوش مصنوعی",
    "صنعت ساختمان",
    "توسعه وب",
    "Python",
    "بازاریابی",
    "ایده پردازی",
    "نوآوری",
  ],
};

const expertise = [
  {
    icon: "▣",
    title: "مدیریت و توسعه کسب و کار",
    text: "برنامه‌ریزی، مدیریت و توسعه ایده‌ها و کسب‌وکارهای جدید.",
  },
  {
    icon: "</>",
    title: "فناوری و برنامه نویسی",
    text: "استفاده از فناوری و برنامه‌نویسی برای ساخت راهکارهای کاربردی.",
  },
  {
    icon: "AI",
    title: "هوش مصنوعی",
    text: "بررسی و استفاده از ظرفیت هوش مصنوعی در محصولات و کسب‌وکارها.",
  },
  {
    icon: "⌂",
    title: "صنعت ساختمان",
    text: "فعالیت و تجربه در حوزه ساختمان، مصالح و خدمات ساختمانی.",
  },
  {
    icon: "WEB",
    title: "توسعه وب",
    text: "طراحی و توسعه وب‌سایت‌ها و پلتفرم‌های مبتنی بر وب.",
  },
  {
    icon: "PY",
    title: "Python",
    text: "برنامه‌نویسی و استفاده از Python در پروژه‌های نرم‌افزاری و هوش مصنوعی.",
  },
  {
    icon: "MKT",
    title: "بازاریابی",
    text: "ایده‌پردازی برای معرفی محصولات و ایجاد ارتباط با بازار.",
  },
  {
    icon: "✦",
    title: "ایده‌پردازی و نوآوری",
    text: "تبدیل ایده‌های اولیه به پروژه‌ها و محصولات قابل توسعه.",
  },
];

export default function AlirezaAhaniPage() {
  return (
    <>
      <main dir="rtl" className="alireza-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        {/* ================= HEADER ================= */}

        <header className="site-header">
          <div className="header-container">
            <a href="#home" className="brand">
              علیرضا آهنی
            </a>

            <nav className="desktop-nav">
              <a href="#home">خانه</a>
              <a href="#about">درباره من</a>
              <a href="#expertise">تخصص‌ها</a>
              <a href="#activities">فعالیت‌ها</a>
              <a href="#projects">پروژه‌ها</a>
              <a href="#sercheno">سرچنو</a>
              <a href="#contact">تماس با من</a>
            </nav>

            <a href="#contact" className="header-contact">
              تماس با من
            </a>
          </div>
        </header>

        {/* ================= HERO ================= */}

        <section id="home" className="hero">
          <div className="hero-container">
            <div className="hero-image-wrapper">
              <Image
                src="/A.png"
                alt="علیرضا آهنی"
                width={760}
                height={650}
                priority
                className="hero-image"
              />
            </div>

            <div className="hero-content">
              <span className="hero-small-title">سلام، من</span>

              <h1>
                علیرضا آهنی
              </h1>

              <h2>
                کارآفرین، مدیر و فعال حوزه فناوری و صنعت ساختمان
              </h2>

              <p>
                در مسیر ساختن کسب‌وکار، توسعه فناوری و ایجاد راهکارهای
                نوآورانه برای صنعت ساختمان فعالیت می‌کنم. بنیان‌گذار
                پلتفرم هوشمند «سرچنو» و مدیرعامل شرکت «امیر توان پویای
                گستر» هستم.
              </p>

              <div className="hero-buttons">
                <a href="#about" className="btn btn-primary">
                  درباره من
                </a>

                <a href="#activities" className="btn btn-secondary">
                  مشاهده فعالیت‌ها
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-title">
              <span>ABOUT ME</span>
              <h2>درباره من</h2>
            </div>

            <div className="about-grid">
              <div className="about-text">
                <h3>
                  علیرضا آهنی هستم؛ علاقه‌مند به ساختن، فناوری و توسعه
                  کسب‌وکار
                </h3>

                <p>
                  در مسیر حرفه‌ای خود تلاش کرده‌ام میان دانش مهندسی،
                  مدیریت، فناوری و نیازهای واقعی بازار ارتباط ایجاد
                  کنم.
                </p>

                <p>   
                  در مسیر حرفه‌ای خود تلاش کرده‌ام میان دانش مهندسی، مدیریت، آموزش، فناوری و نیازهای واقعی بازار ارتباطی مؤثر ایجاد کنم و از ترکیب این حوزه‌ها برای شکل‌دادن به ایده‌ها و راهکارهای کاربردی استفاده کنم.
دارای مدرک کارشناسی مهندسی عمران هستم و هم‌زمان در مسیر توسعه دانش و مهارت‌های مدیریتی و آموزشی خود نیز فعالیت می‌کنم. در حال حاضر دانشجوی کارشناسی تربیت معلم و دانشجوی مقطع کارشناسی ارشد مدیریت اجرایی هستم. همچنین به‌عنوان دبیر رسمی آموزش و پرورش در حوزه آموزش و تربیت فعالیت دارم.
در کنار مسیر دانشگاهی و آموزشی، به‌صورت تخصصی در حوزه‌های فناوری، برنامه‌نویسی، توسعه وب، هوش مصنوعی و مدیریت کسب‌وکار فعالیت می‌کنم و دارای مدارک و گواهینامه‌های بین‌المللی در حوزه‌های Python، AWS و CIW هستم. همچنین دارای گواهینامه بین‌المللی تولید درب و پنجره UPVC هستم و تجربه فعالیت اجرایی در صنعت درب و پنجره و صنعت ساختمان را نیز دارم.
یکی از مهم‌ترین تجربه‌ها و پروژه‌هایی که در این مسیر شکل داده‌ام، سرچنو است؛ پلتفرمی هوشمند در حوزه صنعت ساخت‌وساز که با هدف ایجاد ارتباط میان خریداران، فروشندگان، تولیدکنندگان، متخصصان و ارائه‌دهندگان خدمات ساختمانی ایجاد شده است.
در طراحی و توسعه سرچنو تلاش کرده‌ام فناوری را از یک مفهوم صرفاً دیجیتال خارج کرده و آن را به ابزاری برای حل مسائل واقعی صنعت ساختمان تبدیل کنم؛ از جست‌وجو و مقایسه مصالح و تجهیزات ساختمانی گرفته تا دسترسی به متخصصان، خدمات اجرایی، هوش مصنوعی و فرصت‌های کسب‌وکار.
نگاه من به کارآفرینی، صرفاً ایجاد یک کسب‌وکار نیست؛ بلکه معتقدم یک ایده زمانی ارزشمند است که بتواند نیازی واقعی را شناسایی کند، راهکاری قابل اجرا ارائه دهد و برای افراد و کسب‌وکارها ارزش ایجاد کند.
ترکیب مهندسی عمران، مدیریت اجرایی، آموزش، برنامه‌نویسی، فناوری و تجربه اجرایی در صنعت ساختمان به من این امکان را داده است که مسائل را از زوایای مختلف ببینم و برای تبدیل ایده‌ها به پروژه‌های واقعی تلاش کنم.
هدف من ساختن، یادگیری مداوم، توسعه ایده‌های نوآورانه و ایجاد کسب‌وکارهایی است که در دنیای واقعی کاربرد داشته باشند.
                </p>

            

                <div className="about-info">
                  <div>
                    <span>نام</span>
                    <strong>علیرضا آهنی</strong>
                  </div>

                  <div>
                    <span>حوزه اصلی</span>
                    <strong>فناوری و ساخت‌وساز</strong>
                  </div>

                  <div>
                    <span>سمت</span>
                    <strong>مدیر و کارآفرین</strong>
                  </div>

                  <div>
                    <span>پروژه شاخص</span>
                    <strong>سرچنو</strong>
                  </div>
                </div>
              </div>

              <div className="about-image-box">
                <Image
                  src="/about-img.jpg"
                  alt="علیرضا آهنی - درباره من"
                  width={700}
                  height={700}
                  className="about-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACTIVITIES ================= */}

        <section
          id="activities"
          className="section activities-section"
        >
          <div className="container">
            <div className="section-title center">
              <span>ACTIVITIES</span>
              <h2>حوزه‌های تخصص و فعالیت</h2>

              <p>
                حوزه‌هایی که در آن‌ها تجربه، علاقه و فعالیت حرفه‌ای
                دارم.
              </p>
            </div>

            <div className="expertise-grid" id="expertise">
              {expertise.map((item) => (
                <div className="expertise-card" key={item.title}>
                  <div className="expertise-icon">
                    {item.icon}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERCHENO ================= */}

        <section id="sercheno" className="sercheno-section">
          <div className="container">
            <div className="sercheno-grid">
              <div className="sercheno-content">
                <span className="gold-label">
                  SERCHENO
                </span>

                <h2>
                  سرچنو؛ پلتفرم هوشمند ساخت‌وساز
                </h2>

                <p>
                  سرچنو یک پلتفرم هوشمند در حوزه ساخت‌وساز است که با
                  هدف ایجاد ارتباط میان مشتریان، فروشندگان مصالح،
                  تولیدکنندگان، فروشگاه‌ها، متخصصان و ارائه‌دهندگان
                  خدمات ساختمانی ایجاد شده است.
                </p>

                <p>
                  در سرچنو کاربران می‌توانند نیازهای خود در حوزه
                  ساخت‌وساز را جست‌وجو کنند، محصولات و خدمات را پیدا
                  کنند و با فعالان این صنعت ارتباط بگیرند.
                </p>

                <p>
                  یکی از بخش‌های مهم سرچنو، استفاده از ظرفیت هوش
                  مصنوعی برای کمک به کاربران در زمینه مصالح، روش‌های
                  اجرا، برآورد اولیه، انتخاب متخصص و تحلیل پروژه است.
                </p>

                <div className="sercheno-points">
                  <span>مصالح ساختمانی</span>
                  <span>خدمات ساختمانی</span>
                  <span>متخصصان</span>
                  <span>فروشگاه‌ها</span>
                  <span>هوش مصنوعی</span>
                  <span>مناقصات</span>
                </div>

                <a
                  href="https://sercheno-ywf1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  ورود به سرچنو
                </a>
              </div>

<div className="sercheno-card">
  <img
    src="/hero-searchino.jpg"
    alt="سرچنو | پلتفرم هوشمند ساخت‌وساز"
    className="sercheno-project-image"
  />
</div>
            </div>
          </div>
        </section>

        {/* ================= IDEA ================= */}

        <section className="idea-section">
          <div className="container">
            <div className="idea-box">
              <div>
                <span>LET&apos;S TALK</span>

                <h2>
                  یک ایده دارید؟
                </h2>

                <p>
                  اگر ایده‌ای برای یک کسب‌وکار، محصول دیجیتال، پروژه
                  ساختمانی یا راهکار هوشمند دارید، می‌توانیم در مورد
                  آن صحبت کنیم.
                </p>
              </div>

              <a href="#contact" className="btn btn-white">
                تماس با من
              </a>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

<section id="projects" className="section projects-section">
  <div className="container">

    <div className="section-title center">
      <span>PROJECTS</span>
      <h2>پروژه‌ها و فعالیت‌های شاخص</h2>
    </div>

    <div className="projects-grid">

      {/* Project 1 - Sercheno */}

      <article className="project-card">

        <div className="project-image">
          <img
            src="/logo.png"
            alt="سرچنو | پلتفرم هوشمند ساخت‌وساز"
          />
        </div>

        <div className="project-content">
          <span>01</span>

          <h3>سرچنو</h3>

          <p>
            پلتفرم هوشمند ساخت‌وساز برای جست‌وجو، ارتباط و
            دسترسی آسان‌تر به مصالح، خدمات و متخصصان صنعت
            ساختمان.
          </p>

          <a
            href="https://sercheno-ywf1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            مشاهده پروژه ←
          </a>
        </div>

      </article>


      {/* Project 2 - Sercheno AI */}

      <article className="project-card">

        <div className="project-image">
          <img
            src="/hush.jpg"
            alt="هوش مصنوعی سرچنو | Smart Construction AI"
          />
        </div>

        <div className="project-content">
          <span>02</span>

          <h3>پروژه هوش مصنوعی سرچنو</h3>

          <p>
            توسعه قابلیت‌های هوش مصنوعی برای پاسخ‌گویی به
            نیازهای کاربران و کمک به تحلیل، انتخاب و تصمیم‌گیری
            در پروژه‌های ساختمانی.
          </p>

          <a href="#sercheno">
            مشاهده پروژه ←
          </a>
        </div>

      </article>


      {/* Project 3 - Melkoko */}

      <article className="project-card">

        <div className="project-image">
          <img
            src="/melkku.png"
            alt="ملک‌کو | پلتفرم هوشمند املاک"
          />
        </div>

        <div className="project-content">
          <span>03</span>

          <h3>پروژه هوشمند ملک‌کو</h3>

          <p>
            ایده و پروژه‌ای در حوزه جست‌وجوی ملک، زمین، خانه و
            املاک با نگاه به ایجاد تجربه‌ای هوشمندتر برای
            کاربران بازار املاک.
          </p>

          <a href="#projects">
            مشاهده پروژه ←
          </a>
        </div>

      </article>

    </div>
  </div>
</section>
                  


        {/* ================= CONTACT ================= */}

        <section id="contact" className="contact-section">
          <div className="container">
            <div className="contact-grid">

              <div className="contact-text">
                <span>CONTACT ME</span>

                <h2>
                  با من در ارتباط باشید
                </h2>

                <p>
                  برای همکاری، پیشنهاد پروژه، ایده کسب‌وکار، فناوری،
                  هوش مصنوعی، ساخت‌وساز یا هر موضوع مرتبط می‌توانید
                  با من در ارتباط باشید.
                </p>

                <div className="contact-number">
                  <small>شماره تماس</small>

                  <a href="tel:09144389280">
                    ۰۹۱۴۴۳۸۹۲۸۰
                  </a>
                </div>
              </div>

              <div className="contact-links">

                <a
                  href="tel:09144389280"
                  className="contact-link"
                >
                  <div className="contact-icon">☎</div>

                  <div>
                    <small>تماس تلفنی</small>
                    <strong>۰۹۱۴۴۳۸۹۲۸۰</strong>
                  </div>
                </a>

                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <div className="contact-icon">✈</div>

                  <div>
                    <small>تلگرام</small>
                    <strong>در تلگرام پیام دهید</strong>
                  </div>
                </a>

                <a
                  href="https://instagram.com/sercheno.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <div className="contact-icon">◎</div>

                  <div>
                    <small>اینستاگرام</small>
                    <strong>sercheno.ir</strong>
                  </div>
                </a>

                <a
                  href="https://sercheno-ywf1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <div className="contact-icon">↗</div>

                  <div>
                    <small>پلتفرم</small>
                    <strong>سرچنو</strong>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}

        <footer className="footer">
          <div className="container footer-inner">

            <div>
              <strong>علیرضا آهنی</strong>

              <p>
                کارآفرین، مدیر و بنیان‌گذار سرچنو
              </p>
            </div>

            <div className="footer-center">
              <a href="#home">خانه</a>
              <a href="#about">درباره من</a>
              <a href="#projects">پروژه‌ها</a>
              <a href="#contact">تماس با من</a>
            </div>

            <div className="footer-copy">
              © {new Date().getFullYear()} Alireza Ahani
            </div>

          </div>
        </footer>
      </main>

      {/* ================= STYLES ================= */}

      <style>{`
        * {
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          font-family:
            Tahoma,
            Arial,
            sans-serif;
          background: #ffffff;
          color: #1c2340;
        }

        a {
          text-decoration: none;
        }

        .alireza-page {
          overflow: hidden;
          background: #ffffff;
          color: #1c2340;
          line-height: 1.9;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* HEADER */

        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid #eeeeF4;
          backdrop-filter: blur(12px);
        }

        .header-container {
          width: min(1250px, calc(100% - 40px));
          min-height: 78px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .brand {
          color: #20264a;
          font-size: 23px;
          font-weight: 900;
          white-space: nowrap;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex: 1;
        }

        .desktop-nav a {
          position: relative;
          color: #444b68;
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s;
        }

        .desktop-nav a:hover {
          color: #5752ca;
        }

        .desktop-nav a:hover::after {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          bottom: -12px;
          height: 2px;
          background: #6159d6;
          border-radius: 20px;
        }

        .header-contact {
          color: #5752ca;
          font-size: 14px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* HERO */

        .hero {
          min-height: 680px;
          background:
            radial-gradient(
              circle at 15% 50%,
              rgba(99, 91, 205, 0.08),
              transparent 35%
            ),
            linear-gradient(
              120deg,
              #f8f8fc 0%,
              #ffffff 55%,
              #fafaff 100%
            );
          display: flex;
          align-items: center;
        }

        .hero-container {
          width: min(1250px, calc(100% - 40px));
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 35px;
          direction: ltr;
        }

        .hero-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          min-height: 580px;
        }

        .hero-image {
          width: 100%;
          max-width: 650px;
          height: auto;
          object-fit: contain;
        }

        .hero-content {
          direction: rtl;
          text-align: right;
          padding: 50px 0;
        }

        .hero-small-title {
          color: #22263c;
          font-size: 18px;
          display: block;
          margin-bottom: 2px;
        }

        .hero h1 {
          margin: 0;
          color: #5a55cc;
          font-size: clamp(48px, 6vw, 76px);
          font-weight: 900;
          line-height: 1.25;
        }

        .hero h2 {
          margin: 12px 0 22px;
          color: #20243d;
          font-size: clamp(21px, 2.5vw, 32px);
          line-height: 1.7;
          font-weight: 700;
        }

        .hero p {
          max-width: 610px;
          margin: 0;
          color: #666b80;
          font-size: 16px;
          line-height: 2.2;
        }

        .hero-buttons {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn {
          min-height: 52px;
          padding: 0 28px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .btn-primary {
          background: #625bd4;
          color: white;
          box-shadow: 0 10px 25px rgba(98, 91, 212, 0.18);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          background: #5049bd;
        }

        .btn-secondary {
          background: #242a45;
          color: white;
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          background: #171c32;
        }
        .sercheno-card {
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.sercheno-project-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 24px;
}

        /* TITLES */

        .section {
          padding: 110px 0;
        }

        .section-title {
          margin-bottom: 55px;
        }

        .section-title.center {
          text-align: center;
        }

        .section-title span {
          display: block;
          color: #655fd2;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .section-title h2 {
          margin: 0;
          color: #20253e;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 900;
          line-height: 1.5;
        }

        .section-title p {
          max-width: 650px;
          margin: 12px auto 0;
          color: #74798b;
        }

        /* ABOUT */

        .about-section {
          background: #ffffff;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .about-text {
          order: 1;
        }

        .about-image-box {
          order: 2;
          position: relative;
        }

        .about-image-box::before {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          right: -18px;
          top: -18px;
          border-top: 4px solid #625bd4;
          border-right: 4px solid #625bd4;
          border-radius: 8px;
          z-index: 0;
        }

        .about-image {
          position: relative;
          z-index: 1;
          width: 100%;
          height: auto;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          box-shadow: 0 25px 70px rgba(30, 35, 60, 0.13);
        }

        .about-text h3 {
          margin: 0 0 22px;
          color: #20253e;
          font-size: 29px;
          line-height: 1.7;
        }

        .about-text p {
          color: #696f82;
          font-size: 15px;
          line-height: 2.3;
          margin: 0 0 15px;
        }

        .about-text strong {
          color: #5752ca;
        }

        .about-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 30px;
        }

        .about-info div {
          padding: 15px 17px;
          background: #f7f7fb;
          border-radius: 9px;
          border: 1px solid #eeeeF5;
        }

        .about-info span {
          display: block;
          color: #9094a4;
          font-size: 11px;
        }

        .about-info strong {
          display: block;
          color: #292e47;
          font-size: 14px;
        }

        /* ACTIVITIES */

        .activities-section {
          background: #f8f8fc;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .expertise-card {
          min-height: 225px;
          padding: 27px 22px;
          background: #ffffff;
          border: 1px solid #ececf3;
          border-radius: 12px;
          transition: 0.25s;
        }

        .expertise-card:hover {
          transform: translateY(-6px);
          border-color: #d8d5f5;
          box-shadow: 0 20px 45px rgba(40, 42, 80, 0.08);
        }

        .expertise-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #eeedff;
          color: #5d57cc;
          font-size: 13px;
          font-weight: 900;
        }

        .expertise-card h3 {
          margin: 18px 0 7px;
          color: #262b44;
          font-size: 17px;
        }

        .expertise-card p {
          margin: 0;
          color: #777c8e;
          font-size: 13px;
          line-height: 2;
        }

        /* SERCHENO */

        .sercheno-section {
          padding: 120px 0;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(103, 94, 214, 0.22),
              transparent 35%
            ),
            #202640;
          color: #ffffff;
        }

        .sercheno-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 70px;
          align-items: center;
        }

        .gold-label {
          color: #d8b45c;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 900;
        }

        .sercheno-content h2 {
          margin: 10px 0 22px;
          font-size: clamp(35px, 5vw, 52px);
          line-height: 1.5;
        }

        .sercheno-content p {
          color: #c9ccda;
          font-size: 15px;
          line-height: 2.2;
        }

        .sercheno-points {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin: 25px 0 30px;
        }

        .sercheno-points span {
          padding: 8px 14px;
          color: #e1e3ec;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 7px;
          font-size: 12px;
        }

        .btn-gold {
          background: #d3aa4e;
          color: #1d2339;
        }

        .btn-gold:hover {
          transform: translateY(-3px);
          background: #e2bd68;
        }

        .sercheno-card {
          padding: 50px 30px;
          background: #ffffff;
          color: #222740;
          text-align: center;
          border-radius: 22px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        .sercheno-logo-symbol {
          font-size: 75px;
          line-height: 1;
          margin-bottom: 15px;
        }

        .sercheno-card h3 {
          margin: 0;
          color: #20253e;
          font-size: 38px;
          font-weight: 900;
        }

        .sercheno-card > span {
          color: #555a72;
          font-size: 13px;
          letter-spacing: 4px;
        }

        .sercheno-line {
          width: 50px;
          height: 2px;
          margin: 22px auto;
          background: #d1a84e;
        }

        .sercheno-card p {
          color: #72778a;
          margin: 0 0 7px;
        }

        .sercheno-card strong {
          color: #252a42;
          font-size: 17px;
        }

        /* IDEA */

        .idea-section {
          padding: 75px 0;
          background: #625bd4;
        }

        .idea-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
        }

        .idea-box > div {
          max-width: 700px;
        }

        .idea-box span {
          color: #dcd9ff;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .idea-box h2 {
          margin: 3px 0 5px;
          color: white;
          font-size: 42px;
        }

        .idea-box p {
          margin: 0;
          color: #e9e8ff;
          font-size: 15px;
        }

        .btn-white {
          flex-shrink: 0;
          background: white;
          color: #5650c6;
        }

        .btn-white:hover {
          transform: translateY(-3px);
        }

        /* PROJECTS */

        .projects-section {
          background: #ffffff;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .project-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e8e8f0;
          border-radius: 16px;
          transition: 0.3s;
        }

        .project-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 25px 55px rgba(30, 35, 60, 0.1);
        }

        .project-image {
          height: 245px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .project-image::before {
          content: "";
          position: absolute;
          width: 230px;
          height: 230px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .project-sercheno {
          background:
            radial-gradient(
              circle,
              #4d518b 0%,
              #282e50 55%,
              #1d233c 100%
            );
        }

        .project-ai {
          background:
            radial-gradient(
              circle,
              #5651a5 0%,
              #272c51 58%,
              #1c223a 100%
            );
        }

        .project-melkoko {
          background:
            radial-gradient(
              circle,
              #7067b8 0%,
              #34365d 55%,
              #222640 100%
            );
        }

        .project-image div {
          position: relative;
          z-index: 1;
          color: white;
        }

        .project-image span {
          display: block;
          font-size: 50px;
          font-weight: 900;
          color: #d9b45b;
        }

        .project-image strong {
          display: block;
          margin-top: 5px;
          font-size: 23px;
        }

        .project-image small {
          display: block;
          color: #cfd2e0;
          font-size: 9px;
          letter-spacing: 2px;
          margin-top: 3px;
        }

        .project-content {
          padding: 25px;
        }

        .project-content > span {
          color: #655fd2;
          font-size: 11px;
          font-weight: 900;
        }

        .project-content h3 {
          margin: 7px 0 10px;
          color: #262b44;
          font-size: 20px;
        }

        .project-content p {
          min-height: 105px;
          margin: 0 0 15px;
          color: #777c8d;
          font-size: 13px;
          line-height: 2;
        }

        .project-content a {
          color: #5b55c8;
          font-size: 13px;
          font-weight: 800;
        }

        /* CONTACT */

        .contact-section {
          padding: 110px 0;
          background: #f7f7fb;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .contact-text > span {
          color: #625bd4;
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: 900;
        }

        .contact-text h2 {
          margin: 5px 0 18px;
          color: #20253e;
          font-size: 45px;
          line-height: 1.5;
        }

        .contact-text > p {
          color: #707589;
          font-size: 15px;
          line-height: 2.2;
        }

        .contact-number {
          margin-top: 25px;
          padding: 18px 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #ebebf2;
        }

        .contact-number small {
          display: block;
          color: #9498a8;
          font-size: 11px;
        }

        .contact-number a {
          color: #292e47;
          font-size: 25px;
          font-weight: 900;
        }

        .contact-links {
          display: grid;
          gap: 13px;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 17px;
          padding: 19px;
          background: #ffffff;
          border: 1px solid #e9e9f0;
          border-radius: 12px;
          transition: 0.25s;
        }

        .contact-link:hover {
          transform: translateX(-5px);
          border-color: #d8d5f5;
          box-shadow: 0 15px 35px rgba(30, 35, 60, 0.07);
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #eeedff;
          color: #5c56cb;
          font-size: 21px;
        }

        .contact-link small {
          display: block;
          color: #9599a8;
          font-size: 10px;
        }

        .contact-link strong {
          display: block;
          color: #282d46;
          font-size: 14px;
        }

        /* FOOTER */

        .footer {
          padding: 45px 0;
          background: #1c223a;
          color: white;
        }

        .footer-inner {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          gap: 25px;
        }

        .footer strong {
          font-size: 20px;
        }

        .footer p {
          margin: 4px 0 0;
          color: #aeb2c2;
          font-size: 12px;
        }

        .footer-center {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .footer-center a {
          color: #c4c7d3;
          font-size: 12px;
        }

        .footer-center a:hover {
          color: #d5b15d;
        }

        .footer-copy {
          text-align: left;
          color: #9297aa;
          font-size: 11px;
          direction: ltr;
        }

        /* MOBILE */

        @media (max-width: 1050px) {
          .desktop-nav {
            gap: 16px;
          }

          .desktop-nav a {
            font-size: 12px;
          }

          .expertise-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 850px) {
          .header-contact {
            display: none;
          }

          .desktop-nav {
            display: none;
          }

          .hero {
            padding: 45px 0 0;
          }

          .hero-container {
            grid-template-columns: 1fr;
            direction: rtl;
          }

          .hero-content {
            order: 1;
            text-align: center;
            padding: 20px 0 55px;
          }

          .hero-image-wrapper {
            order: 2;
            min-height: auto;
          }

          .hero-image {
            max-width: 500px;
          }

          .hero p {
            margin: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .about-grid,
          .sercheno-grid,
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-text {
            order: 1;
          }

          .about-image-box {
            order: 2;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-content p {
            min-height: auto;
          }

          .idea-box {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-center {
            flex-wrap: wrap;
          }

          .footer-copy {
            text-align: center;
          }
        }

        @media (max-width: 550px) {
          .container,
          .header-container,
          .hero-container {
            width: min(100% - 28px, 1180px);
          }

          .hero h1 {
            font-size: 48px;
          }

          .hero h2 {
            font-size: 20px;
          }

          .hero p {
            font-size: 14px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-buttons .btn {
            width: 100%;
          }

          .section {
            padding: 75px 0;
          }

          .about-info {
            grid-template-columns: 1fr;
          }

          .expertise-grid {
            grid-template-columns: 1fr;
          }

          .section-title h2 {
            font-size: 34px;
          }

          .sercheno-section {
            padding: 80px 0;
          }

          .sercheno-points {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .contact-text h2 {
            font-size: 35px;
          }

          .contact-number a {
            font-size: 21px;
          }
        }
      `}</style>
    </>
  );
}
