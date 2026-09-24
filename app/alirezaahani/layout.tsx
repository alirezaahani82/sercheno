import type { Metadata } from "next";

const profileUrl =
  "https://sercheno-ywf1.vercel.app/alirezaahani";

const profileImage =
  "https://sercheno-ywf1.vercel.app/A.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://sercheno-ywf1.vercel.app"),

  title: {
    default:
      "علیرضا آهنی | Alireza Ahani | بنیان‌گذار سرچنو و مدیر",
    template: "%s | علیرضا آهنی",
  },

  description:
    "علیرضا آهنی (Alireza Ahani)، کارآفرین، مدیر و فعال حوزه فناوری، هوش مصنوعی و صنعت ساختمان؛ بنیان‌گذار سرچنو و مدیرعامل شرکت امیر توان پویای گستر.",

  keywords: [
    "علیرضا آهنی",
    "Alireza Ahani",
    "Alireza Ahani Tabriz",
    "علیرضا آهنی تبریز",
    "علیرضا آهنی سرچنو",
    "Alireza Ahani Sercheno",
    "علیرضا آهنی هوش مصنوعی",
    "علیرضا آهنی فناوری",
    "علیرضا آهنی کارآفرین",
    "علیرضا آهنی مدیر",
    "علیرضا آهنی رزومه",
    "سرچنو",
    "بنیانگذار سرچنو",
    "امیر توان پویای گستر",
    "هوش مصنوعی",
    "فناوری",
    "ساخت و ساز",
    "صنعت ساختمان",
  ],

  authors: [
    {
      name: "علیرضا آهنی",
      url: profileUrl,
    },
  ],

  creator: "علیرضا آهنی",

  publisher: "سرچنو",

  category: "profile",

  alternates: {
    canonical: profileUrl,
    languages: {
      "fa-IR": profileUrl,
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "profile",
    locale: "fa_IR",
    url: profileUrl,
    siteName: "سرچنو",

    title:
      "علیرضا آهنی | Alireza Ahani | بنیان‌گذار سرچنو",

    description:
      "صفحه رسمی علیرضا آهنی؛ کارآفرین، مدیر و فعال حوزه فناوری، هوش مصنوعی و صنعت ساختمان.",

    images: [
      {
        url: profileImage,
        width: 760,
        height: 650,
        alt: "علیرضا آهنی | Alireza Ahani",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "علیرضا آهنی | Alireza Ahani | بنیان‌گذار سرچنو",

    description:
      "صفحه رسمی علیرضا آهنی؛ کارآفرین، مدیر و فعال حوزه فناوری و صنعت ساختمان.",

    images: [profileImage],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function AlirezaAhaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
