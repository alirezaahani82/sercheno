
"use client";

import { useMemo, useState } from "react";

const presenters = [
  "علیرضا آهنی",
  "عرفان اکبرزاده",
  "علی اکبری",
  "سید حسین میرقاسمی",
];

const qualities = [
  { n: 1, title: "سوز و حرص داشته باشد", group: "تعهد تربیتی", desc: "معلم نسبت به یادگیری و رشد دانش‌آموزان دغدغه‌مند است و بی‌تفاوت از کنار مشکلات آنان نمی‌گذرد.", example: "دانش‌آموزی در یادگیری ضعیف است؛ معلم به‌جای برچسب‌زدن، علت مشکل را پیدا می‌کند و راه دیگری برای آموزش می‌آزماید.", question: "چگونه می‌توان به پیشرفت همه دانش‌آموزان اهمیت داد، بدون آنکه به آن‌ها فشار روانی وارد کنیم؟" },
  { n: 2, title: "سعهٔ صدر داشته باشد", group: "تعهد تربیتی", desc: "گشاده‌رویی، تحمل دشواری‌ها و توان شنیدن نظرهای متفاوت، زمینهٔ ارتباط و آموزش بهتر را فراهم می‌کند.", example: "دانش‌آموزی با اعتراض تند سؤال می‌پرسد؛ معلم ابتدا آرامش خود را حفظ می‌کند و سپس موضوع را بررسی می‌کند.", question: "تفاوت سعهٔ صدر با پذیرفتن رفتار نادرست چیست؟" },
  { n: 3, title: "بی‌تکلف باشد", group: "تعهد تربیتی", desc: "معلم در رفتار و ارتباط با شاگردان، صادقانه و طبیعی باشد و برای خود فاصله‌ای تصنعی ایجاد نکند.", example: "اگر معلم پاسخ پرسشی را نمی‌داند، به‌جای تظاهر به دانایی، صادقانه اعلام می‌کند که بررسی خواهد کرد.", question: "چگونه می‌توان هم صمیمی بود و هم جایگاه حرفه‌ای معلم را حفظ کرد؟" },
  { n: 4, title: "مخلص باشد", group: "تعهد تربیتی", desc: "هدف اصلی فعالیت آموزشی، خدمت صادقانه و رشد فراگیران باشد، نه صرفاً شهرت، تحسین یا منفعت شخصی.", example: "معلم موفقیت دانش‌آموز را مهم‌تر از آن می‌داند که تمام اعتبار کار به نام خودش ثبت شود.", question: "چه نشانه‌هایی می‌تواند اخلاص در کار معلمی را نشان دهد؟" },
  { n: 5, title: "خود را فارغ‌التحصیل نداند", group: "تعهد تربیتی", desc: "پایان تحصیلات رسمی، پایان یادگیری نیست؛ معلم باید دانش و مهارت خود را پیوسته به‌روز کند.", example: "معلم از همکار باتجربه بازخورد می‌گیرد و روش تازه‌ای را برای تدریس یک مفهوم امتحان می‌کند.", question: "چرا معلمی که خودش یاد نمی‌گیرد، در آموزش دیگران با محدودیت روبه‌رو می‌شود؟" },
  { n: 6, title: "توفیقاتش را از خدا بداند", group: "تعهد تربیتی", desc: "در نگاه دینی کتاب، معلم در کنار تلاش و مسئولیت‌پذیری، موفقیت را نعمتی می‌داند که شایستهٔ شکرگزاری است.", example: "معلم پس از موفقیت کلاس، علاوه بر تلاش خود، از کمک همکاران و حمایت خانواده‌ها نیز قدردانی می‌کند.", question: "چگونه می‌توان توکل را با تلاش، برنامه‌ریزی و مسئولیت‌پذیری همراه کرد؟" },
  { n: 7, title: "باشهامت باشد", group: "رشد حرفه‌ای", desc: "معلم برای انجام وظیفهٔ درست، بیان محترمانهٔ حقیقت و اصلاح روش‌های نادرست به شجاعت نیاز دارد.", example: "معلم با رعایت احترام، دربارهٔ روشی که باعث محروم‌شدن برخی دانش‌آموزان از یادگیری شده است، تذکر می‌دهد.", question: "مرز شجاعت حرفه‌ای و بی‌احترامی کجاست؟" },
  { n: 8, title: "اعتمادبه‌نفس داشته باشد", group: "رشد حرفه‌ای", desc: "باور واقع‌بینانه به توانایی‌های خود، معلم را در مدیریت کلاس و مواجهه با مسائل تازه یاری می‌کند.", example: "هنگامی که طرح درس طبق انتظار پیش نمی‌رود، معلم دستپاچه نمی‌شود و راه جایگزین انتخاب می‌کند.", question: "اعتمادبه‌نفس چه تفاوتی با غرور و خودبرتربینی دارد؟" },
  { n: 9, title: "مردمی باشد", group: "ارتباط انسانی", desc: "معلم با زندگی و مسائل واقعی مردم آشنا باشد و آموزش را از نیازهای جامعه جدا نکند.", example: "برای آموزش محاسبات، از مثال‌های خرید، بودجهٔ خانواده و مسائل روزمره استفاده می‌کند.", question: "چگونه می‌توان آموزش مدرسه را به زندگی واقعی پیوند زد؟" },
  { n: 10, title: "صراحت لهجه داشته باشد", group: "ارتباط انسانی", desc: "معلم باید روشن، قابل‌فهم و صریح سخن بگوید؛ بدون ابهام‌آفرینی یا تحقیر مخاطب.", example: "به‌جای گفتن «اصلاً درس نمی‌خوانی»، دقیق توضیح می‌دهد کدام بخش تکلیف ناقص است و چگونه اصلاح شود.", question: "چطور می‌توان صریح بود، اما احساسات دانش‌آموز را جریحه‌دار نکرد؟" },
  { n: 11, title: "منصف باشد", group: "عدالت و اخلاق", desc: "قضاوت معلم باید بر شواهد و معیارهای روشن تکیه داشته باشد، نه علاقهٔ شخصی یا پیش‌داوری.", example: "در بررسی اختلاف دو دانش‌آموز، به حرف هر دو گوش می‌دهد و پیش از نتیجه‌گیری شواهد را بررسی می‌کند.", question: "چگونه می‌توان در موقعیت‌های مبهم، منصفانه تصمیم گرفت؟" },
  { n: 12, title: "بامحبت و صمیمی باشد", group: "ارتباط انسانی", desc: "محبت و صمیمیت سالم، احساس امنیت و تعلق را در کلاس تقویت می‌کند.", example: "معلم متوجه غیبت مکرر دانش‌آموز می‌شود و به‌جای سرزنش فوری، علت را با احترام جویا می‌شود.", question: "چگونه می‌توان میان محبت و حفظ حدود حرفه‌ای تعادل برقرار کرد؟" },
  { n: 13, title: "اهل هدایت و عمل باشد", group: "الگوبودن", desc: "معلم باید تا حد امکان میان آنچه آموزش می‌دهد و رفتاری که از خود نشان می‌دهد هماهنگی ایجاد کند.", example: "معلمی که نظم را آموزش می‌دهد، خود نیز به زمان کلاس و تعهداتش پایبند است.", question: "اگر رفتار معلم با توصیه‌هایش تناقض داشته باشد، چه اثری بر یادگیری می‌گذارد؟" },
  { n: 14, title: "آراسته باشد", group: "الگوبودن", desc: "پاکیزگی، آراستگی متناسب و نظم محیط آموزشی، احترام به مخاطب و فضای یادگیری را نشان می‌دهد.", example: "معلم با پوشش مرتب و کلاس منظم، بدون تجمل‌گرایی، محیطی مناسب برای آموزش فراهم می‌کند.", question: "چرا آراستگی را نباید با تجمل‌گرایی یکی دانست؟" },
  { n: 15, title: "اخلاق خوب داشته باشد", group: "الگوبودن", desc: "ادب، خوش‌رفتاری، کنترل خشم و رعایت حرمت انسان‌ها از پایه‌های اعتماد در کلاس هستند.", example: "معلم اشتباه دانش‌آموز را اصلاح می‌کند، اما شخصیت او را زیر سؤال نمی‌برد.", question: "کدام رفتار اخلاقی معلم بیشترین اثر را بر فضای کلاس دارد؟" },
  { n: 16, title: "متواضع باشد", group: "الگوبودن", desc: "معلم توانایی‌ها و دانش خود را می‌شناسد، اما خود را بی‌نیاز از آموختن و نقد نمی‌بیند.", example: "پیشنهاد مناسب دانش‌آموز را می‌پذیرد و اگر در محاسبه‌ای اشتباه کرده باشد، آن را اصلاح می‌کند.", question: "چگونه می‌توان متواضع بود، بدون آنکه اقتدار آموزشی از بین برود؟" },
  { n: 17, title: "سابقهٔ نیک داشته باشد", group: "الگوبودن", desc: "رفتار مسئولانه و خوش‌نامی معلم در طول زمان، سرمایه‌ای برای اعتماد و اثرگذاری تربیتی است.", example: "پایبندی به قول‌ها و رعایت انصاف در موقعیت‌های مختلف، اعتبار حرفه‌ای معلم را تقویت می‌کند.", question: "اعتماد دانش‌آموزان چگونه در طول زمان ساخته یا تخریب می‌شود؟" },
  { n: 18, title: "دلبستهٔ مقام و پست نباشد", group: "تعهد تربیتی", desc: "مسئولیت آموزشی نباید صرفاً وسیله‌ای برای کسب عنوان، قدرت یا امتیاز شخصی باشد.", example: "معلم کاری را که به رشد کلاس کمک می‌کند، حتی اگر دیده نشود، با مسئولیت‌پذیری انجام می‌دهد.", question: "چگونه می‌توان پیشرفت شغلی را با خدمت صادقانه جمع کرد؟" },
  { n: 19, title: "آمادهٔ پاسخگویی باشد", group: "رشد حرفه‌ای", desc: "معلم باید بتواند دربارهٔ تصمیم‌ها، روش تدریس و ارزیابی‌های خود توضیح روشن و مسئولانه بدهد.", example: "دانش‌آموز دربارهٔ نمره‌اش سؤال می‌کند؛ معلم معیار تصحیح را توضیح می‌دهد و در صورت لزوم برگه را دوباره بررسی می‌کند.", question: "چرا پاسخگویی با سرزنش‌پذیری یا ضعف اقتدار یکسان نیست؟" },
  { n: 20, title: "شناخت و بصیرت عمیق داشته باشد", group: "رشد حرفه‌ای", desc: "معلم باید موضوع درس، شرایط فراگیران و پیامدهای تربیتی تصمیم‌های خود را عمیق‌تر بشناسد.", example: "پیش از انتخاب روش تدریس، سطح آمادگی کلاس و تفاوت‌های فردی دانش‌آموزان را بررسی می‌کند.", question: "چه تفاوتی میان داشتن اطلاعات و برخورداری از بصیرت وجود دارد؟" },
  { n: 21, title: "دلسوز شاگردان باشد", group: "تعهد تربیتی", desc: "دلسوزی یعنی توجه جدی به نیازهای آموزشی و انسانی دانش‌آموز و پیگیری رشد او.", example: "برای دانش‌آموزی که از درس عقب مانده، برنامهٔ جبرانی واقع‌بینانه‌ای تنظیم می‌کند.", question: "دلسوزی چگونه می‌تواند به استقلال دانش‌آموز کمک کند؟" },
  { n: 22, title: "واقع‌گرا باشد", group: "رشد حرفه‌ای", desc: "معلم امکانات، محدودیت‌ها و شرایط واقعی کلاس را می‌بیند و بر همان اساس برنامه‌ریزی می‌کند.", example: "برای کلاسی با امکانات محدود، فعالیتی کم‌هزینه و متناسب با هدف یادگیری طراحی می‌کند.", question: "چگونه می‌توان واقع‌گرا بود و در عین حال به بهبود شرایط امید داشت؟" },
  { n: 23, title: "صبور باشد", group: "ارتباط انسانی", desc: "یادگیری به زمان نیاز دارد؛ معلم باید در برابر خطا و تفاوت سرعت یادگیری، واکنشی سنجیده نشان دهد.", example: "مفهومی را با مثال دیگری توضیح می‌دهد، به‌جای آنکه از تکرار سؤال دانش‌آموز عصبانی شود.", question: "صبر چه تفاوتی با نادیده‌گرفتن مشکل دارد؟" },
  { n: 24, title: "دردآشنا باشد", group: "ارتباط انسانی", desc: "معلم باید دشواری‌های واقعی زندگی فراگیران را درک کند و شرایط آنان را در تصمیم‌های آموزشی ببیند.", example: "قبل از قضاوت دربارهٔ تکلیف انجام‌نشده، دربارهٔ موانع احتمالی دانش‌آموز گفت‌وگو می‌کند.", question: "چگونه می‌توان شرایط دانش‌آموز را درک کرد، بدون آنکه معیارهای آموزشی را کنار گذاشت؟" },
  { n: 25, title: "تکلیف‌گرا باشد", group: "تعهد تربیتی", desc: "معلم به‌جای تمرکز صرف بر گلایه از مشکلات، مسئولیت خود را در شرایط موجود شناسایی می‌کند.", example: "با وجود کمبود امکانات، بخش‌هایی از درس را با ابزار ساده و فعالیت گروهی پیش می‌برد.", question: "چگونه می‌توان محدودیت‌های واقعی را پذیرفت و همچنان مسئولانه عمل کرد؟" },
  { n: 26, title: "باظرفیت باشد", group: "ارتباط انسانی", desc: "ظرفیت روحی به معلم کمک می‌کند انتقاد، اختلاف‌نظر و دشواری‌های کلاس را با پختگی مدیریت کند.", example: "با شنیدن انتقاد دانش‌آموز، ابتدا موضوع را می‌فهمد و بعد پاسخ می‌دهد.", question: "چه تمرین‌هایی می‌تواند ظرفیت شنیدن نقد را افزایش دهد؟" },
  { n: 27, title: "منضبط باشد", group: "رشد حرفه‌ای", desc: "نظم در زمان، برنامه، پیگیری امور و رعایت تعهدات، کیفیت و پیش‌بینی‌پذیری آموزش را بالا می‌برد.", example: "معلم کلاس را به‌موقع آغاز می‌کند و اهداف و مراحل فعالیت را از قبل مشخص می‌سازد.", question: "نظم چگونه می‌تواند با انعطاف‌پذیری همراه باشد؟" },
  { n: 28, title: "عزم قوی داشته باشد", group: "رشد حرفه‌ای", desc: "اراده و استمرار، معلم را در مسیر اصلاح روش‌ها و عبور از دشواری‌های آموزشی یاری می‌کند.", example: "پس از نتیجهٔ ضعیف یک آزمون، به‌جای رهاکردن موضوع، علت را تحلیل و برنامهٔ تازه‌ای اجرا می‌کند.", question: "چگونه می‌توان میان پافشاری بر هدف و اصلاح روش تفاوت گذاشت؟" },
  { n: 29, title: "به هدف ایمان داشته باشد", group: "تعهد تربیتی", desc: "باور به ارزش یادگیری و رشد انسان، انگیزهٔ معلم را در مسیر طولانی تربیت حفظ می‌کند.", example: "حتی وقتی پیشرفت دانش‌آموز تدریجی است، با ارزیابی واقع‌بینانه و تشویق مناسب مسیر را ادامه می‌دهد.", question: "چگونه می‌توان امید به رشد را با ارزیابی واقع‌بینانه همراه کرد؟" },
  { n: 30, title: "عادل باشد", group: "عدالت و اخلاق", desc: "عدالت یعنی تصمیم‌گیری بر پایهٔ معیارهای روشن و پرهیز از تبعیض؛ با توجه به تفاوت‌های مرتبط با نیازهای آموزشی.", example: "معلم برای همه معیار ارزیابی مشخص دارد و حمایت لازم را برای دسترسی منصفانه به یادگیری فراهم می‌کند.", question: "آیا عدالت همیشه به معنای رفتار کاملاً یکسان با همه است؟" },
  { n: 31, title: "حامی محرومان باشد", group: "عدالت و اخلاق", desc: "معلم به دانش‌آموزانی که با محرومیت یا موانع بیشتری روبه‌رو هستند، توجه و حمایت متناسب نشان می‌دهد.", example: "برای دانش‌آموز فاقد ابزار آموزشی، راه جایگزین و محترمانه‌ای فراهم می‌کند تا از فعالیت کنار نماند.", question: "چگونه می‌توان حمایت کرد، بدون آنکه دانش‌آموز احساس برچسب‌خوردن کند؟" },
  { n: 32, title: "توکل داشته باشد", group: "تعهد تربیتی", desc: "در نگاه دینی کتاب، توکل به معنای اتکا به خدا در کنار کوشش، تدبیر و انجام مسئولیت است.", example: "معلم با برنامه‌ریزی و پیگیری وظیفه‌اش را انجام می‌دهد و در برابر نتیجه، امید و آرامش خود را حفظ می‌کند.", question: "تفاوت توکل با کنارگذاشتن تلاش چیست؟" },
  { n: 33, title: "بانشاط باشد", group: "ارتباط انسانی", desc: "نشاط سنجیدهٔ معلم می‌تواند فضای یادگیری را پویاتر کند و مشارکت دانش‌آموزان را افزایش دهد.", example: "معلم با شروعی پرانرژی، پرسشی جذاب و فعالیت کوتاه، توجه کلاس را جلب می‌کند.", question: "چگونه می‌توان نشاط کلاس را بدون سطحی‌شدن آموزش حفظ کرد؟" },
];

const themes = [
  { title: "تعهد تربیتی", icon: "✦", desc: "انگیزه، اخلاص و مسئولیت در رشد انسان", color: "#e9d8ad" },
  { title: "ارتباط انسانی", icon: "◈", desc: "محبت، صبر، ظرفیت و شناخت شرایط شاگرد", color: "#d8e5db" },
  { title: "عدالت و اخلاق", icon: "⚖", desc: "انصاف، عدالت و حمایت از محرومان", color: "#d9e3f3" },
  { title: "رشد حرفه‌ای", icon: "↗", desc: "یادگیری مداوم، نظم و توانمندی حرفه‌ای", color: "#f1ded6" },
  { title: "الگوبودن", icon: "◎", desc: "هماهنگی گفتار و رفتار و اخلاق نیک", color: "#e4d8ef" },
];

const questions = [
  {
    q: "اگر دانش‌آموزی بارها یک اشتباه را تکرار کند، معلم چگونه باید برخورد کند؟",
    a: "با صبر و سعهٔ صدر، علت خطا را بررسی کند، روش توضیح را تغییر دهد و بازخورد روشن ارائه دهد؛ بدون تحقیر دانش‌آموز.",
  },
  {
    q: "آیا عدالت یعنی با همهٔ دانش‌آموزان دقیقاً یکسان رفتار کنیم؟",
    a: "نه لزوماً. معیارها باید منصفانه و شفاف باشند؛ اما گاهی برای فراهم‌شدن فرصت برابر یادگیری، حمایت‌های متفاوت لازم است.",
  },
  {
    q: "اگر معلم پاسخ سؤالی را نداند، چه رفتاری مناسب‌تر است؟",
    a: "صادقانه بگوید که پاسخ دقیق را بررسی می‌کند و در زمان مناسب نتیجه را ارائه دهد. این رفتار با صداقت و یادگیری مستمر سازگار است.",
  },
  {
    q: "کدام صفات معلمی بیشتر از همه در رفتار روزانه دیده می‌شوند؟",
    a: "پاسخ قطعی و یکسانی وجود ندارد؛ نظم، انصاف، صبر، محبت و هماهنگی گفتار و رفتار از نمونه‌هایی هستند که دانش‌آموزان مستقیماً تجربه می‌کنند.",
  },
];

export default function FarhangiyanPage() {
  const [activeTab, setActiveTab] = useState("شروع");
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("همه");
  const [expanded, setExpanded] = useState<number | null>(1);
  const [presentation, setPresentation] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return qualities.filter((item) => {
      const matchesTheme = selectedTheme === "همه" || item.group === selectedTheme;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.desc.toLowerCase().includes(term) ||
        item.example.toLowerCase().includes(term);
      return matchesTheme && matchesSearch;
    });
  }, [search, selectedTheme]);

  const goTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const printPage = () => window.print();

  return (
    <main dir="rtl" className={presentation ? "farhangi presentation-mode" : "farhangi"}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap');
        :root { scroll-behavior: smooth; }
        body { margin: 0; }
        .farhangi { --navy: #152c35; --navy2: #203d46; --gold: #c7a66a; --paper: #f7f4ed; --ink: #26383c; --muted: #718087; font-family: 'Vazirmatn', Tahoma, sans-serif; color: var(--ink); background: var(--paper); min-height: 100vh; }
        .farhangi * { box-sizing: border-box; }
        .farhangi button, .farhangi input { font: inherit; }
        .farhangi button { cursor: pointer; }
        .f-container { max-width: 1180px; margin: auto; padding: 0 24px; }
        .f-nav { position: sticky; top: 0; z-index: 30; background: rgba(21,44,53,.97); color: #fff; border-bottom: 1px solid rgba(199,166,106,.35); backdrop-filter: blur(12px); }
        .f-nav-inner { display:flex; align-items:center; justify-content:space-between; gap:16px; min-height:68px; }
        .f-brand { display:flex; align-items:center; gap:12px; font-weight:800; letter-spacing:-.4px; }
        .f-brand-mark { display:grid; place-items:center; width:39px; height:39px; border:1px solid var(--gold); color:var(--gold); border-radius:12px; font-size:21px; }
        .f-nav-links { display:flex; gap:5px; flex-wrap:wrap; }
        .f-nav-links button { background:transparent; border:0; color:#d8e0df; padding:9px 12px; border-radius:9px; font-size:12px; }
        .f-nav-links button:hover,.f-nav-links button.active { background:rgba(255,255,255,.1); color:#fff; }
        .f-actions { display:flex; gap:8px; }
        .f-btn { border:1px solid rgba(255,255,255,.25); color:#fff; background:transparent; padding:9px 13px; border-radius:10px; font-size:12px; }
        .f-btn.gold { background:var(--gold); border-color:var(--gold); color:var(--navy); font-weight:800; }
        .f-hero { background:radial-gradient(ellipse at 80% 20%,#2a4c55 0%,transparent 48%),linear-gradient(125deg,#142b34,#203d45 60%,#182e37); color:#fff; position:relative; overflow:hidden; }
        .f-hero:after { content:""; position:absolute; width:400px;height:400px;border:1px solid rgba(199,166,106,.15);border-radius:50%;left:-100px;top:-160px;box-shadow:0 0 0 45px rgba(199,166,106,.025),0 0 0 90px rgba(199,166,106,.025); }
        .f-hero-grid { position:relative; z-index:1; display:grid; grid-template-columns:1.25fr .75fr; gap:40px; align-items:center; padding-top:90px; padding-bottom:85px; }
        .f-kicker { color:var(--gold); font-size:12px; font-weight:700; letter-spacing:1px; display:flex; align-items:center; gap:10px; }
        .f-kicker:before { content:""; width:28px;height:1px;background:var(--gold); }
        .f-hero h1 { font-size:clamp(34px,5vw,60px); line-height:1.55; margin:20px 0 14px; font-weight:900; letter-spacing:-1.5px; }
        .f-hero h1 span { color:var(--gold); }
        .f-lead { color:#d5dfdf; line-height:2.2; font-size:15px; max-width:680px; }
        .f-presenters { display:flex; flex-wrap:wrap; gap:8px; margin-top:26px; }
        .f-presenter { padding:8px 13px; border:1px solid rgba(255,255,255,.19); border-radius:30px; background:rgba(255,255,255,.05); font-size:12px; }
        .f-hero-buttons { display:flex; gap:10px; flex-wrap:wrap; margin-top:30px; }
        .f-hero-buttons button { padding:13px 19px; border-radius:11px; border:1px solid var(--gold); background:var(--gold); color:var(--navy); font-weight:800; }
        .f-hero-buttons button.secondary { background:transparent; color:white; border-color:rgba(255,255,255,.3); }
        .f-book { border:1px solid rgba(199,166,106,.45); border-radius:20px; padding:32px; background:linear-gradient(145deg,rgba(255,255,255,.09),rgba(255,255,255,.025)); position:relative; max-width:360px; justify-self:center; width:100%; box-shadow:0 30px 80px #091a2040; }
        .f-book:before { content:""; position:absolute; top:0; right:26px; width:3px; height:100%; background:var(--gold); opacity:.7; }
        .f-book-label { color:var(--gold); font-size:11px; letter-spacing:1px; }
        .f-book h2 { font-size:30px; line-height:1.8; margin:18px 0; }
        .f-book p { font-size:12px; color:#c6d1d0; line-height:2.1; }
        .f-book-bottom { border-top:1px solid #ffffff22; margin-top:25px; padding-top:18px; color:var(--gold); font-size:11px; }
        .f-section { padding:76px 0; scroll-margin-top:80px; }
        .f-section.light { background:#fff; }
        .f-section.dark { background:var(--navy); color:white; }
        .f-section-head { display:flex; align-items:end; justify-content:space-between; gap:24px; margin-bottom:32px; }
        .f-section-head h2 { font-size:clamp(25px,3vw,36px); margin:10px 0; line-height:1.7; color:var(--navy); }
        .f-section.dark .f-section-head h2 { color:white; }
        .f-section-head p { color:var(--muted); line-height:2; font-size:13px; max-width:580px; margin:0; }
        .f-section.dark .f-section-head p { color:#b8c7c9; }
        .f-eyebrow { color:#9a7940; font-size:11px; font-weight:800; letter-spacing:.5px; }
        .f-intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .f-paper-card { padding:28px; background:#fff; border:1px solid #e8e4da; border-radius:16px; }
        .f-paper-card h3 { margin:0 0 12px; font-size:17px; color:var(--navy); }
        .f-paper-card p { margin:0; line-height:2.2; font-size:13px; color:#58676b; }
        .f-callout { border-right:3px solid var(--gold); background:#f0eadc; padding:20px 24px; border-radius:10px; line-height:2.2; font-size:14px; margin-top:20px; }
        .f-theme-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:12px; }
        .f-theme { text-align:right; border:1px solid #e5e0d5; border-radius:14px; background:#fff; padding:18px 15px; min-height:145px; color:var(--ink); transition:transform .2s,border-color .2s; }
        .f-theme:hover { transform:translateY(-3px); border-color:var(--gold); }
        .f-theme-icon { width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-size:20px;margin-bottom:12px; }
        .f-theme strong { display:block;font-size:13px;margin-bottom:7px; }
        .f-theme span { font-size:11px;color:var(--muted);line-height:1.9;display:block; }
        .f-toolbar { display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap; margin:25px 0; }
        .f-search { background:white; border:1px solid #ddd8cc; border-radius:11px; padding:12px 15px; width:min(100%,360px); outline:none; color:var(--ink); }
        .f-search:focus { border-color:var(--gold); box-shadow:0 0 0 3px #c7a66a22; }
        .f-filters { display:flex; gap:7px; flex-wrap:wrap; }
        .f-filter { border:1px solid #ddd8cc; border-radius:30px; padding:8px 12px; background:#fff; font-size:11px; color:#526368; }
        .f-filter.active { background:var(--navy); color:white; border-color:var(--navy); }
        .f-quality-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
        .f-quality { border:1px solid #e5e0d5; background:#fff; border-radius:14px; overflow:hidden; }
        .f-quality-top { display:flex; gap:14px; align-items:flex-start; padding:19px; }
        .f-number { width:38px; height:38px; flex-shrink:0; display:grid; place-items:center; border-radius:11px; background:#f0eadc; color:#896a34; font-weight:900; font-size:13px; }
        .f-quality-main { flex:1; min-width:0; }
        .f-quality-main h3 { margin:2px 0 7px; font-size:15px; color:var(--navy); }
        .f-quality-main p { margin:0; font-size:12px; line-height:2.1; color:#667579; }
        .f-quality-tag { display:inline-block; font-size:10px; color:#8b713f; background:#f5f0e5; border-radius:20px; padding:5px 9px; margin-top:10px; }
        .f-expand { border:0; background:transparent; color:#8c713e; font-size:11px; padding:7px 10px; }
        .f-quality-detail { border-top:1px solid #eee9df; padding:18px 20px 20px; background:#fcfbf8; }
        .f-quality-detail h4 { margin:0 0 7px; color:var(--navy); font-size:12px; }
        .f-quality-detail p { font-size:12px; color:#596b70; line-height:2.15; margin:0 0 16px; }
        .f-quality-detail p:last-child { margin-bottom:0; }
        .f-quote { max-width:820px; margin:auto; text-align:center; padding:20px 0; }
        .f-quote-mark { font-family:Georgia,serif; font-size:60px; color:var(--gold); height:48px; }
        .f-quote h2 { font-size:clamp(22px,3vw,34px); line-height:2; margin:15px 0 20px; }
        .f-quote p { color:#bfcccd; font-size:13px; line-height:2.2; }
        .f-pill { display:inline-flex; padding:7px 12px; border:1px solid #ffffff2b; border-radius:30px; font-size:11px; color:var(--gold); }
        .f-case-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
        .f-case { border:1px solid #e5e0d5; background:white; border-radius:15px; padding:24px; }
        .f-case .f-case-icon { color:#a8874e; font-size:23px; }
        .f-case h3 { font-size:15px; color:var(--navy); margin:12px 0 10px; }
        .f-case p { font-size:12px; line-height:2.2; color:#637277; }
        .f-case button { border:0; background:#f3eee3; color:#6f552b; padding:9px 12px; border-radius:8px; font-size:11px; }
        .f-question { background:white; border:1px solid #e6e1d6; border-radius:16px; padding:26px; }
        .f-question-count { color:#927340; font-size:11px; font-weight:800; }
        .f-question h3 { font-size:20px; line-height:2; color:var(--navy); margin:14px 0 20px; }
        .f-answer { padding:16px 18px; border-right:3px solid var(--gold); background:#f5f0e6; font-size:13px; line-height:2.2; border-radius:8px; }
        .f-question-actions { display:flex; justify-content:space-between; gap:10px; margin-top:22px; flex-wrap:wrap; }
        .f-question-actions button { border:1px solid #ddd5c5; background:white; border-radius:9px; padding:10px 14px; font-size:12px; color:var(--navy); }
        .f-question-actions button.primary { background:var(--navy); color:white; border-color:var(--navy); }
        .f-conclusion-grid { display:grid; grid-template-columns:1fr 1fr; gap:25px; align-items:center; }
        .f-conclusion-grid h2 { font-size:clamp(25px,3vw,36px); line-height:1.8; margin:12px 0; }
        .f-conclusion-grid p { font-size:13px; line-height:2.3; color:#c5d0d1; }
        .f-checklist { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
        .f-checklist li { padding:14px 16px; background:#ffffff0a; border:1px solid #ffffff18; border-radius:10px; color:#e1e7e6; font-size:12px; line-height:2; }
        .f-checklist li:before { content:"✓"; color:var(--gold); font-weight:900; margin-left:10px; }
        .f-source { border-top:1px solid #e5e0d5; padding-top:20px; margin-top:30px; color:#738084; font-size:11px; line-height:2.2; }
        .f-footer { background:#10242c; color:#b9c7c8; padding:30px 0; font-size:11px; }
        .f-footer-inner { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; }
        .presentation-mode .f-nav { display:none; }
        .presentation-mode .f-hero-grid { min-height:85vh; }
        .presentation-mode .f-container { max-width:1280px; }
        .presentation-mode .f-section { padding:95px 0; }
        .presentation-mode .f-quality-grid { grid-template-columns:1fr; }
        .presentation-mode .f-quality { max-width:900px; }
        .presentation-mode .f-presenter { font-size:14px; }
        .f-present-mode-exit { position:fixed;z-index:100;left:18px;top:18px;background:#c7a66a;color:#152c35;border:0;padding:10px 14px;border-radius:10px;font-weight:800;box-shadow:0 4px 20px #0003; }
        @media(max-width:850px) {
          .f-nav-links { display:none; }
          .f-hero-grid { grid-template-columns:1fr; padding-top:55px; padding-bottom:55px; }
          .f-book { display:none; }
          .f-theme-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .f-theme:last-child { grid-column:span 2; }
          .f-case-grid { grid-template-columns:1fr; }
          .f-intro-grid,.f-conclusion-grid { grid-template-columns:1fr; }
          .f-section { padding:55px 0; }
          .f-section-head { align-items:flex-start; flex-direction:column; gap:10px; }
        }
        @media(max-width:580px) {
          .f-container { padding:0 16px; }
          .f-actions .f-btn { padding:8px; font-size:10px; }
          .f-brand { font-size:12px; }
          .f-quality-grid { grid-template-columns:1fr; }
          .f-toolbar { align-items:stretch; }
          .f-search { width:100%; }
          .f-filters { gap:6px; }
          .f-filter { font-size:10px; padding:7px 9px; }
          .f-hero h1 { font-size:36px; }
          .f-lead { font-size:13px; }
          .f-paper-card { padding:21px; }
        }
        @media print {
          body,.farhangi { background:white!important; color:#222!important; }
          .f-nav,.f-hero-buttons,.f-toolbar,.f-expand,.f-question-actions,.f-footer,.f-present-mode-exit { display:none!important; }
          .f-hero { background:white!important; color:#111!important; border-bottom:2px solid #c7a66a; }
          .f-hero-grid { display:block; padding:20px 0!important; min-height:0!important; }
          .f-hero h1,.f-book h2,.f-section-head h2,.f-conclusion-grid h2 { color:#172e36!important; }
          .f-lead,.f-book p,.f-section.dark p,.f-conclusion-grid p { color:#333!important; }
          .f-book { display:none!important; }
          .f-section,.f-section.dark,.f-section.light { background:white!important; color:#222!important; padding:22px 0!important; break-inside:avoid; }
          .f-theme-grid { grid-template-columns:repeat(3,1fr); }
          .f-quality-grid { grid-template-columns:1fr 1fr; }
          .f-quality { break-inside:avoid; }
          .f-quality-detail { display:block!important; }
          .f-case-grid { grid-template-columns:repeat(3,1fr); }
          .f-question { break-inside:avoid; }
          .f-source { color:#444!important; }
        }
      `}</style>

      {presentation && (
        <button className="f-present-mode-exit" onClick={() => setPresentation(false)}>
          ✕ خروج از حالت ارائه
        </button>
      )}

      <header className="f-nav">
        <div className="f-container f-nav-inner">
          <div className="f-brand">
            <span className="f-brand-mark">م</span>
            <span>کارگاه صفات معلمی</span>
          </div>
          <nav className="f-nav-links">
            {["شروع", "مقدمه", "محورها", "صفات", "گفت‌وگو", "جمع‌بندی"].map((id) => (
              <button
                key={id}
                className={activeTab === id ? "active" : ""}
                onClick={() => goTo(id)}
              >
                {id}
              </button>
            ))}
          </nav>
          <div className="f-actions">
            <button className="f-btn" onClick={printPage}>چاپ / PDF</button>
            <button className="f-btn gold" onClick={() => setPresentation(!presentation)}>
              {presentation ? "نمای عادی" : "حالت ارائه"}
            </button>
          </div>
        </div>
      </header>

      <section className="f-hero" id="شروع">
        <div className="f-container f-hero-grid">
          <div>
            <div className="f-kicker">دانشگاه فرهنگیان · ارائهٔ پژوهشی</div>
            <h1>معلم خوب،<br /><span>چه ویژگی‌هایی</span> دارد؟</h1>
            <p className="f-lead">
              بررسی تحلیلی صفات معلمی از نگاه استاد محسن قرائتی؛
              از دغدغهٔ تربیت و عدالت تا اخلاق حرفه‌ای، رشد مداوم و رابطهٔ انسانی با دانش‌آموز.
            </p>
            <div className="f-presenters">
              {presenters.map((name) => <span className="f-presenter" key={name}>{name}</span>)}
            </div>
            <div className="f-hero-buttons">
              <button onClick={() => goTo("مقدمه")}>ورود به ارائه ←</button>
              <button className="secondary" onClick={() => goTo("صفات")}>مرور ۳۳ صفت</button>
            </div>
          </div>
          <div className="f-book">
            <div className="f-book-label">پژوهش و تحلیل آموزشی</div>
            <h2>صفات<br />معلمی</h2>
            <p>فصل دوم کتاب «مهارت معلمی»</p>
            <p>نویسنده: استاد محسن قرائتی</p>
            <div className="f-book-bottom">از ویژگی‌های فردی تا مسئولیت اجتماعی معلم</div>
          </div>
        </div>
      </section>

      <section className="f-section" id="مقدمه">
        <div className="f-container">
          <div className="f-section-head">
            <div>
              <div className="f-eyebrow">بخش اول · طرح مسئله</div>
              <h2>چرا صفات معلم اهمیت دارند؟</h2>
            </div>
            <p>آموزش فقط انتقال اطلاعات نیست؛ شخصیت، رفتار و شیوهٔ ارتباط معلم نیز بر تجربهٔ یادگیری اثر می‌گذارد.</p>
          </div>
          <div className="f-intro-grid">
            <article className="f-paper-card">
              <h3>۱. بیان مسئله</h3>
              <p>
                چرا دو معلم با دانش تخصصی نزدیک به هم ممکن است تجربه‌های آموزشی متفاوتی برای دانش‌آموزان بسازند؟
                بخشی از پاسخ را باید در صفاتی مانند صبر، انصاف، مسئولیت‌پذیری، شناخت مخاطب و هماهنگی گفتار و رفتار جست‌وجو کرد.
              </p>
            </article>
            <article className="f-paper-card">
              <h3>۲. هدف ارائه</h3>
              <p>
                هدف، معرفی و تحلیل صفات مطرح‌شده در فصل دوم کتاب، پیوند دادن آن‌ها با موقعیت‌های واقعی کلاس درس
                و فراهم‌کردن زمینه‌ای برای گفت‌وگوی انتقادی دربارهٔ معلم شایسته است.
              </p>
            </article>
            <article className="f-paper-card">
              <h3>۳. پرسش محوری</h3>
              <p>
                صفات فردی و اخلاقی معلم چگونه می‌توانند بر کیفیت رابطهٔ آموزشی، عدالت در کلاس و رشد علمی و انسانی دانش‌آموزان اثر بگذارند؟
              </p>
            </article>
            <article className="f-paper-card">
              <h3>۴. روش ارائه</h3>
              <p>
                روش کار، مطالعهٔ محتوای فصل، دسته‌بندی موضوعی صفات، تحلیل موقعیت‌های فرضی کلاس و گفت‌وگوی مشارکتی است.
                مثال‌های این صفحه برای کاربردی‌کردن مفاهیم طراحی شده‌اند.
              </p>
            </article>
          </div>
          <div className="f-callout">
            <strong>ایدهٔ مرکزی:</strong> معلم شایسته تنها کسی نیست که درس را خوب می‌داند؛ او باید بتواند دانش خود را با اخلاق،
            مسئولیت‌پذیری و شناخت انسان همراه کند.
          </div>
        </div>
      </section>

      <section className="f-section light" id="محورها">
        <div className="f-container">
          <div className="f-section-head">
            <div>
              <div className="f-eyebrow">بخش دوم · چارچوب مفهومی</div>
              <h2>صفات معلمی در پنج محور</h2>
            </div>
            <p>این دسته‌بندی، چارچوب تحلیلی ارائه‌دهندگان است تا ارتباط میان صفات روشن‌تر شود؛ عنوان‌های اصلی کتاب در بخش بعد آمده‌اند.</p>
          </div>
          <div className="f-theme-grid">
            {themes.map((theme) => (
              <button className="f-theme" key={theme.title} onClick={() => { setSelectedTheme(theme.title); goTo("صفات"); }}>
                <span className="f-theme-icon" style={{ background: theme.color }}>{theme.icon}</span>
                <strong>{theme.title}</strong>
                <span>{theme.desc}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 15 }}>
            <button className="f-filter" onClick={() => { setSelectedTheme("همه"); goTo("صفات"); }}>
              نمایش همهٔ صفات ←
            </button>
          </div>
        </div>
      </section>

      <section className="f-section" id="صفات">
        <div className="f-container">
          <div className="f-section-head">
            <div>
              <div className="f-eyebrow">بخش سوم · متن اصلی پژوهش</div>
              <h2>۳۳ صفت معلم در کتاب مهارت معلمی</h2>
            </div>
            <p>هر مورد شامل شرح کوتاه، نمونهٔ کاربردی و یک پرسش برای تحلیل جمعی است. برای دیدن جزئیات، هر کارت را باز کنید.</p>
          </div>
          <div className="f-toolbar">
            <input
              className="f-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جست‌وجو در صفات و توضیحات..."
              aria-label="جست‌وجو در صفات معلمی"
            />
            <div className="f-filters">
              {["همه", ...themes.map((t) => t.title)].map((theme) => (
                <button key={theme} className={"f-filter " + (selectedTheme === theme ? "active" : "")}
                  onClick={() => setSelectedTheme(theme)}>
                  {theme}
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#778488", marginBottom: 14 }}>
            {filtered.length} مورد از {qualities.length} صفت
          </div>
          <div className="f-quality-grid">
            {filtered.map((item) => (
              <article className="f-quality" key={item.n}>
                <div className="f-quality-top">
                  <span className="f-number">{String(item.n).padStart(2, "0")}</span>
                  <div className="f-quality-main">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <span className="f-quality-tag">{item.group}</span>
                  </div>
                  <button className="f-expand" onClick={() => setExpanded(expanded === item.n ? null : item.n)}>
                    {expanded === item.n ? "بستن −" : "تحلیل +"}
                  </button>
                </div>
                {(expanded === item.n || showAll) && (
                  <div className="f-quality-detail">
                    <h4>نمونه در کلاس درس</h4>
                    <p>{item.example}</p>
                    <h4>پرسش برای گفت‌وگو</h4>
                    <p>{item.question}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="f-paper-card" style={{ marginTop: 15 }}>
              موردی با این عبارت پیدا نشد؛ عبارت دیگری را جست‌وجو کنید.
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 25 }}>
            <button className="f-filter" onClick={() => setShowAll(!showAll)}>
              {showAll ? "بستن جزئیات همهٔ صفات" : "نمایش جزئیات همهٔ صفات"}
            </button>
          </div>
        </div>
      </section>

      <section className="f-section dark">
        <div className="f-container">
          <div className="f-quote">
            <div className="f-quote-mark">“</div>
            <span className="f-pill">مکث و تأمل</span>
            <h2>دانستنِ راه درست کافی نیست؛<br />معلم باید آن را در رفتار خود نشان دهد.</h2>
            <p>
              این عبارت، جمع‌بندی مفهومی ارائه‌دهندگان از اهمیت هماهنگی گفتار و رفتار است و نقل‌قول مستقیم از کتاب محسوب نمی‌شود.
              در نگاه حرفه‌ای، رفتار معلم بخشی از محیط یادگیری است.
            </p>
          </div>
        </div>
      </section>

      <section className="f-section" id="گفت‌وگو">
        <div className="f-container">
          <div className="f-section-head">
            <div>
              <div className="f-eyebrow">بخش چهارم · مشارکت مخاطبان</div>
              <h2>کارگاه تحلیل موقعیت‌های کلاسی</h2>
            </div>
            <p>در کنفرانس، از دانشجویان بخواهید موقعیت را تحلیل کنند و سپس پاسخ پیشنهادی را ببینند.</p>
          </div>
          <div className="f-case-grid">
            <article className="f-case">
              <div className="f-case-icon">01 / گفت‌وگو</div>
              <h3>دانش‌آموز معترض</h3>
              <p>دانش‌آموزی در برابر نمرهٔ خود اعتراض می‌کند و لحن مناسبی ندارد. معلم چگونه هم احترام را حفظ کند و هم موضوع را منصفانه بررسی کند؟</p>
              <button onClick={() => { setQuestionIndex(1); setShowAnswer(false); goTo("پرسش‌پایانی"); }}>بحث دربارهٔ عدالت ←</button>
            </article>
            <article className="f-case">
              <div className="f-case-icon">02 / مسئولیت</div>
              <h3>دانش‌آموز کم‌برخوردار</h3>
              <p>دانش‌آموزی به دلیل نداشتن امکانات، تکلیفش را کامل انجام نداده است. چه راهکاری میان عدالت، دلسوزی و مسئولیت‌پذیری تعادل ایجاد می‌کند؟</p>
              <button onClick={() => { setQuestionIndex(0); setShowAnswer(false); goTo("پرسش‌پایانی"); }}>بحث دربارهٔ حمایت ←</button>
            </article>
            <article className="f-case">
              <div className="f-case-icon">03 / رشد حرفه‌ای</div>
              <h3>معلم و اشتباه علمی</h3>
              <p>معلم متوجه می‌شود توضیحی که جلسهٔ قبل داده، دقیق نبوده است. کدام صفات به او کمک می‌کنند اشتباه را اصلاح کند؟</p>
              <button onClick={() => { setQuestionIndex(2); setShowAnswer(false); goTo("پرسش‌پایانی"); }}>بحث دربارهٔ صداقت ←</button>
            </article>
          </div>
        </div>
      </section>

      <section className="f-section light" id="پرسش‌پایانی">
        <div className="f-container">
          <div className="f-section-head">
            <div>
              <div className="f-eyebrow">بخش پنجم · ارزیابی مفهومی</div>
              <h2>پرسش‌های پایانی برای گفت‌وگو</h2>
            </div>
            <p>این بخش برای مشارکت و تبادل نظر طراحی شده است، نه آزمون نمره‌دار.</p>
          </div>
          <div className="f-question">
            <div className="f-question-count">پرسش {questionIndex + 1} از {questions.length}</div>
            <h3>{questions[questionIndex].q}</h3>
            {showAnswer && <div className="f-answer">{questions[questionIndex].a}</div>}
            <div className="f-question-actions">
              <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "پنهان‌کردن پاسخ پیشنهادی" : "مشاهدهٔ پاسخ پیشنهادی"}
              </button>
              <button className="primary" onClick={() => { setQuestionIndex((questionIndex + 1) % questions.length); setShowAnswer(false); }}>
                پرسش بعدی ←
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="f-section dark" id="جمع‌بندی">
        <div className="f-container f-conclusion-grid">
          <div>
            <div className="f-eyebrow">نتیجه‌گیری پژوهش</div>
            <h2>معلمی، ترکیب دانش، اخلاق و مسئولیت است.</h2>
            <p>
              بررسی صفات مطرح‌شده در فصل دوم نشان می‌دهد که شایستگی معلم را نمی‌توان تنها به تسلط بر محتوای درسی محدود کرد.
              رابطهٔ انسانی، انصاف، یادگیری مداوم، انضباط و پایبندی عملی به ارزش‌ها نیز در این تصویر جای دارند.
            </p>
            <p>
              هیچ معلمی یک‌شبه به همهٔ این صفات دست نمی‌یابد؛ رشد حرفه‌ای فرایندی مستمر است که با خودارزیابی،
              تجربه، مطالعه و دریافت بازخورد تقویت می‌شود.
            </p>
          </div>
          <ul className="f-checklist">
            <li>دانش تخصصی را با یادگیری مستمر همراه کنیم.</li>
            <li>با همهٔ دانش‌آموزان محترمانه و منصفانه رفتار کنیم.</li>
            <li>پیش از قضاوت، شرایط و تفاوت‌های فردی را بشناسیم.</li>
            <li>میان آنچه می‌گوییم و آنچه انجام می‌دهیم هماهنگی ایجاد کنیم.</li>
            <li>هر روز یک رفتار حرفه‌ای خود را ارزیابی و اصلاح کنیم.</li>
          </ul>
        </div>
        <div className="f-container">
          <div className="f-source">
            <strong>منبع اصلی:</strong> قرائتی، محسن، <em>مهارت معلمی</em>، فصل دوم: «صفات معلم»،
            بخش صفحات ۳۲ تا ۷۳ در نسخهٔ بررسی‌شده.
            <br />
            <strong>روش استفاده از منبع:</strong> عنوان صفات بر اساس فهرست فصل تنظیم شده است؛ شرح‌های کوتاه،
            مثال‌های کلاسی و پرسش‌ها برای این ارائه بازنویسی و تدوین شده‌اند و نقل‌قول مستقیم از کتاب نیستند.
            برای استناد دقیق به آیات، روایات یا عبارت‌های نویسنده، متن چاپ مورد استفادهٔ کلاس را بررسی کنید.
          </div>
        </div>
      </section>

      <footer className="f-footer">
        <div className="f-container f-footer-inner">
          <div>ارائهٔ پژوهشی فصل دوم کتاب مهارت معلمی · صفات معلم</div>
          <div>ارائه‌دهندگان: {presenters.join(" · ")}</div>
          <button className="f-btn" onClick={() => goTo("شروع")}>بازگشت به ابتدای صفحه ↑</button>
        </div>
      </footer>
    </main>
  );
}
