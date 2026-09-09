import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "علیرضا آهنی | بنیان‌گذار سرچنو | مدیرعامل امیر توان پویای گستر",
  description:
    "وب‌سایت رسمی و رزومه علیرضا آهنی؛ بنیان‌گذار پلتفرم هوشمند سرچنو و مدیرعامل شرکت امیر توان پویای گستر، فعال در حوزه فناوری، ساخت‌وساز و کسب‌وکار.",
  keywords: [
    "علیرضا آهنی",
    "Alireza Ahani",
    "سرچنو",
    "Sercheno",
    "امیر توان پویای گستر",
    "بنیانگذار سرچنو",
    "مدیرعامل امیر توان پویای گستر",
    "رزومه علیرضا آهنی",
    "کارآفرین",
    "ساخت و ساز",
    "هوش مصنوعی",
    "فناوری",
  ],
  alternates: {
    canonical: "https://sercheno-ywf1.vercel.app/alirezaahani",
  },
  openGraph: {
    title: "علیرضا آهنی | بنیان‌گذار سرچنو",
    description:
      "وب‌سایت رسمی علیرضا آهنی؛ بنیان‌گذار سرچنو و مدیرعامل شرکت امیر توان پویای گستر.",
    url: "https://sercheno-ywf1.vercel.app/alirezaahani",
    siteName: "علیرضا آهنی",
    locale: "fa_IR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "علیرضا آهنی | بنیان‌گذار سرچنو",
    description:
      "وب‌سایت رسمی و رزومه علیرضا آهنی",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "علیرضا آهنی",
  alternateName: "Alireza Ahani",
  url: "https://sercheno-ywf1.vercel.app/alirezaahani",
  jobTitle: [
    "بنیان‌گذار سرچنو",
    "مدیرعامل شرکت امیر توان پویای گستر",
  ],
  worksFor: {
    "@type": "Organization",
    name: "شرکت امیر توان پویای گستر",
  },
  founder: {
    "@type": "Organization",
    name: "سرچنو",
  },
  knowsAbout: [
    "فناوری",
    "هوش مصنوعی",
    "ساخت‌وساز",
    "مصالح ساختمانی",
    "کسب‌وکار",
    "برنامه‌نویسی",
    "مدیریت",
  ],
};

export default function AlirezaAhaniPage() {
  return (
    <main className={styles.page} dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="#home" className={styles.logo}>
            <span>علیرضا آهنی</span>
          </a>

          <nav className={styles.nav}>
            <a href="#about">درباره من</a>
            <a href="#experience">سوابق</a>
            <a href="#skills">مهارت‌ها</a>
            <a href="#sercheno">سرچنو</a>
            <a href="#company">شرکت</a>
            <a href="#contact">تماس</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                وب‌سایت رسمی علیرضا آهنی
              </span>

              <h1>
                علیرضا آهنی
              </h1>

              <h2>
                بنیان‌گذار <strong>سرچنو</strong>
              </h2>

              <p>
                فعال در حوزه فناوری، ساخت‌وساز، کسب‌وکار و توسعه
                پلتفرم‌های دیجیتال؛ با تمرکز بر ایجاد راهکارهای
                هوشمند برای صنعت ساختمان.
              </p>

              <div className={styles.heroButtons}>
                <a href="#about" className={styles.primaryButton}>
                  درباره من
                </a>

                <a
                  href="#sercheno"
                  className={styles.secondaryButton}
                >
                  آشنایی با سرچنو
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.profileCard}>
                <div className={styles.profileCircle}>
                  <span>ع</span>
                </div>

                <h3>علیرضا آهنی</h3>
                <p>کارآفرین و مدیر کسب‌وکار</p>

                <div className={styles.profileLine} />

                <span>
                  Founder of Sercheno
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>ABOUT ME</span>
            <h2>درباره من</h2>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.about-img.jpg}>
              <div className={styles.imagePlaceholder}>
                <span>علیرضا آهنی</span>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <h3>
                من علیرضا آهنی هستم.
              </h3>

              <p>
                در مسیر حرفه‌ای خود تلاش کرده‌ام میان تجربه‌های
                اجرایی، کسب‌وکار، فناوری و صنعت ساخت‌وساز ارتباط
                ایجاد کنم و از ظرفیت فناوری برای حل مسائل واقعی
                استفاده کنم.
              </p>

              <p>
                یکی از مهم‌ترین پروژه‌هایی که در این مسیر توسعه داده‌ام،
                <strong> سرچنو </strong>
                است؛ پلتفرمی هوشمند با هدف ایجاد ارتباط میان
                مصرف‌کنندگان، فروشندگان مصالح، متخصصان و فعالان
                صنعت ساختمان.
              </p>

              <p>
                نگاه من به کسب‌وکار، ترکیبی از شناخت بازار،
                تجربه اجرایی، فناوری و توسعه راهکارهای قابل استفاده
                برای مردم و کسب‌وکارهاست.
              </p>

              <div className={styles.infoGrid}>
                <div>
                  <span>نام</span>
                  <strong>علیرضا آهنی</strong>
                </div>

                <div>
                  <span>حوزه فعالیت</span>
                  <strong>فناوری و ساخت‌وساز</strong>
                </div>

                <div>
                  <span>پروژه اصلی</span>
                  <strong>سرچنو</strong>
                </div>

                <div>
                  <span>شرکت</span>
                  <strong>امیر توان پویای گستر</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className={`${styles.section} ${styles.graySection}`}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>EXPERIENCE</span>
            <h2>سوابق و مسیر حرفه‌ای</h2>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>01</div>

              <div>
                <h3>مدیریت و توسعه کسب‌وکار</h3>

                <p>
                  فعالیت در زمینه مدیریت، توسعه کسب‌وکار و ایجاد
                  راهکارهای جدید برای بازار مصالح و خدمات ساختمانی.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>02</div>

              <div>
                <h3>فناوری و برنامه‌نویسی</h3>

                <p>
                  علاقه و فعالیت در حوزه فناوری، برنامه‌نویسی،
                  توسعه محصولات دیجیتال و استفاده از هوش مصنوعی
                  در حل مسائل کسب‌وکار.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>03</div>

              <div>
                <h3>صنعت ساختمان</h3>

                <p>
                  تجربه و شناخت اجرایی از صنعت ساختمان، مصالح،
                  خدمات تخصصی و ارتباط میان متخصصان و مصرف‌کنندگان.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>04</div>

              <div>
                <h3>توسعه سرچنو</h3>

                <p>
                  طراحی و توسعه ایده سرچنو با هدف ایجاد یک بازار
                  هوشمند و یکپارچه برای مصالح، خدمات و نیازهای
                  صنعت ساختمان.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>SKILLS</span>
            <h2>مهارت‌ها و حوزه‌های فعالیت</h2>
          </div>

          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <span>01</span>
              <h3>مدیریت</h3>
              <p>
                مدیریت کسب‌وکار، برنامه‌ریزی و توسعه پروژه.
              </p>
            </div>

            <div className={styles.skillCard}>
              <span>02</span>
              <h3>فناوری</h3>
              <p>
                توسعه محصولات و راهکارهای دیجیتال.
              </p>
            </div>

            <div className={styles.skillCard}>
              <span>03</span>
              <h3>هوش مصنوعی</h3>
              <p>
                بررسی کاربردهای هوش مصنوعی در کسب‌وکار و صنعت.
              </p>
            </div>

            <div className={styles.skillCard}>
              <span>04</span>
              <h3>ساخت‌وساز</h3>
              <p>
                شناخت مصالح، خدمات و فرآیندهای صنعت ساختمان.
              </p>
            </div>

            <div className={styles.skillCard}>
              <span>05</span>
              <h3>کارآفرینی</h3>
              <p>
                ایده‌پردازی، ایجاد کسب‌وکار و توسعه بازار.
              </p>
            </div>

            <div className={styles.skillCard}>
              <span>06</span>
              <h3>برنامه‌نویسی</h3>
              <p>
                توسعه و پیاده‌سازی محصولات مبتنی بر وب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sercheno */}
      <section id="sercheno" className={styles.serchenoSection}>
        <div className={styles.container}>
          <div className={styles.serchenoGrid}>
            <div>
              <span className={styles.serchenoLabel}>
                SERCHENO
              </span>

              <h2>
                سرچنو چیست؟
              </h2>

              <p>
                سرچنو یک پلتفرم هوشمند در حوزه ساخت‌وساز است که
                با هدف ساده‌تر کردن فرآیند پیدا کردن مصالح،
                فروشندگان، متخصصان و خدمات ساختمانی ایجاد شده است.
              </p>

              <p>
                ایده اصلی سرچنو این است که کاربر بتواند نیاز خود
                برای ساخت‌وساز را در یک محیط یکپارچه جست‌وجو کند،
                گزینه‌های مختلف را ببیند، مقایسه کند و با فروشنده
                یا متخصص موردنظر ارتباط بگیرد.
              </p>

              <div className={styles.serchenoFeatures}>
                <div>جست‌وجوی مصالح ساختمانی</div>
                <div>پیدا کردن متخصصان</div>
                <div>ثبت فروشگاه و خدمات</div>
                <div>هوش مصنوعی ساختمان</div>
                <div>مناقصات کشوری</div>
                <div>ارتباط فعالان صنعت ساختمان</div>
              </div>

              <a
                href="https://sercheno-ywf1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                ورود به سرچنو
              </a>
            </div>

            <div className={styles.serchenoCard}>
              <div className={styles.sparrow}>
                🐦
              </div>

              <h3>سرچنو</h3>

              <strong>
                بازار هوشمند ساخت‌وساز ایران
              </strong>

              <p>
                هر چیزی برای ساختن،
                <br />
                در سرچنو پیدا کن.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>COMPANY</span>
            <h2>امیر توان پویای گستر</h2>
          </div>

          <div className={styles.companyBox}>
            <div>
              <h3>
                شرکت امیر توان پویای گستر
              </h3>

              <p>
                شرکت امیر توان پویای گستر مجموعه‌ای است که در مسیر
                توسعه کسب‌وکارهای مبتنی بر فناوری و صنعت ساختمان
                فعالیت می‌کند و سرچنو یکی از پروژه‌های اصلی آن است.
              </p>
            </div>

            <div className={styles.companyStats}>
              <div>
                <strong>01</strong>
                <span>مدیریت کسب‌وکار</span>
              </div>

              <div>
                <strong>02</strong>
                <span>فناوری</span>
              </div>

              <div>
                <strong>03</strong>
                <span>ساخت‌وساز</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className={styles.visionSection}>
        <div className={styles.container}>
          <span>VISION</span>

          <h2>
            ساختن آینده،
            <br />
            با ترکیب تجربه و فناوری
          </h2>

          <p>
            هدف من توسعه راهکارهایی است که فناوری را از یک ابزار
            صرف به بخشی از زندگی واقعی کسب‌وکارها و مردم تبدیل کند.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>CONTACT</span>
            <h2>ارتباط با من</h2>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <span>نام</span>
              <strong>علیرضا آهنی</strong>
            </div>

            <div className={styles.contactCard}>
              <span>شرکت</span>
              <strong>امیر توان پویای گستر</strong>
            </div>

            <div className={styles.contactCard}>
              <span>پروژه</span>
              <strong>سرچنو</strong>
            </div>

            <div className={styles.contactCard}>
              <span>وب‌سایت</span>
              <a
                href="https://sercheno-ywf1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                sercheno
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div>
            <strong>علیرضا آهنی</strong>

            <p>
              بنیان‌گذار سرچنو و مدیرعامل شرکت امیر توان پویای گستر
            </p>
          </div>

          <div>
            © {new Date().getFullYear()} Alireza Ahani
          </div>
        </div>
      </footer>
    </main>
  );
}
