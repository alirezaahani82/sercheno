export type ServiceCategory = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "بنا و استادکار",
    slug: "bana-ostadkar",
    image: "/images/services/bana-ostadkar.jpg",
    description: "بناها و استادکاران ساختمانی برای اجرای انواع پروژه‌های ساختمانی",
  },
  {
    name: "نصاب درب و پنجره",
    slug: "door-window-installer",
    image: "/images/services/door-window-installer.jpg",
    description: "نصابان حرفه‌ای درب و پنجره UPVC و آلومینیومی",
  },
  {
    name: "نصاب کاشی و سرامیک",
    slug: "tile-installer",
    image: "/images/services/tile-installer.jpg",
    description: "متخصصان نصب کاشی، سرامیک و اجرای کف و دیوار",
  },
  {
    name: "برق‌کار",
    slug: "electrician",
    image: "/images/services/electrician.jpg",
    description: "خدمات برق ساختمان و اجرای تأسیسات الکتریکی",
  },
  {
    name: "لوله‌کش",
    slug: "plumber",
    image: "/images/services/plumber.jpg",
    description: "خدمات لوله‌کشی، تأسیسات آب و فاضلاب ساختمان",
  },
  {
    name: "جوشکار",
    slug: "welder",
    image: "/images/services/welder.jpg",
    description: "جوشکاری و اجرای سازه‌ها و قطعات فلزی",
  },
  {
    name: "نقاش ساختمان",
    slug: "painter",
    image: "/images/services/painter.jpg",
    description: "نقاشی، رنگ‌آمیزی و اجرای پوشش‌های ساختمانی",
  },
  {
    name: "گچ‌کار",
    slug: "plasterer",
    image: "/images/services/plasterer.jpg",
    description: "اجرای گچ‌کاری و خدمات مربوط به دیوار و سقف",
  },
  {
    name: "نصاب و تعمیر آسانسور",
    slug: "elevator",
    image: "/images/services/elevator.jpg",
    description: "نصب، سرویس و تعمیر آسانسور",
  },
  {
    name: "نماکار",
    slug: "facade",
    image: "/images/services/facade.jpg",
    description: "اجرای انواع نمای ساختمان",
  },
  {
    name: "کناف‌کار",
    slug: "kanaf",
    image: "/images/services/kanaf.jpg",
    description: "اجرای کناف، سقف کاذب و دکوراسیون داخلی",
  },
  {
    name: "مهندس و پیمانکار",
    slug: "engineer-contractor",
    image: "/images/services/engineer-contractor.jpg",
    description: "مهندسان، پیمانکاران و متخصصان اجرای پروژه‌های ساختمانی",
  },
  {
    name: "سایر خدمات",
    slug: "other",
    image: "/images/services/other.jpg",
    description: "سایر خدمات تخصصی حوزه ساخت‌وساز",
  },
];

export function getServiceCategory(slug: string) {
  return SERVICE_CATEGORIES.find(
    (category) => category.slug === slug
  );
}
