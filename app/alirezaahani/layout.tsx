import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "علیرضا آهنی | بنیان‌گذار سرچنو و مدیرعامل شرکت امیر توان پویای گستر",

  description:
    "علیرضا آهنی، کارآفرین، مدیر، فعال حوزه فناوری و صنعت ساختمان، بنیان‌گذار پلتفرم هوشمند سرچنو و مدیرعامل شرکت امیر توان پویای گستر.",

  keywords: [
    "علیرضا آهنی",
    "Alireza Ahani",
    "علیرضا آهنی تبریز",
    "علیرضا آهنی سرچنو",
    "بنیانگذار سرچنو",
    "سرچنو",
    "امیر توان پویای گستر",
    "کارآفرین",
    "هوش مصنوعی",
    "فناوری",
    "صنعت ساختمان",
  ],

  authors: [
    {
      name: "علیرضا آهنی",
      url: "https://sercheno-ywf1.vercel.app/alirezaahani",
    },
  ],

  creator: "علیرضا آهنی",

  alternates: {
    canonical:
      "https://sercheno-ywf1.vercel.app/alirezaahani",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "علیرضا آهنی | بنیان‌گذار سرچنو و فعال حوزه فناوری و ساخت‌وساز",

    description:
      "صفحه رسمی علیرضا آهنی؛ کارآفرین، مدیر و بنیان‌گذار سرچنو.",

    url:
      "https://sercheno-ywf1.vercel.app/alirezaahani",

    siteName: "سرچنو",

    locale: "fa_IR",

    type: "profile",

    images: [
      {
        url: "https://sercheno-ywf1.vercel.app/A.png",
        width: 760,
        height: 650,
        alt: "علیرضا آهنی",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "علیرضا آهنی | بنیان‌گذار سرچنو",

    description:
      "علیرضا آهنی، کارآفرین و فعال حوزه فناوری و صنعت ساختمان.",

    images: [
      "https://sercheno-ywf1.vercel.app/A.png",
    ],
  },
};

export default function AlirezaAhaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
