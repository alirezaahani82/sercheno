import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./sw/register";
import MobileBottomNav from "@/components/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "سرچنو | پلتفرم هوشمند ساخت‌وساز و ساز",

  description:
    "سرچنو، پلتفرم هوشمند ساخت‌وساز و ساز برای خرید و فروش مصالح ساختمانی، تجهیزات، خدمات ساختمانی، فروشندگان، تأمین‌کنندگان و متخصصان صنعت ساختمان.",

  alternates: {
    canonical: "https://sercheno-ywf1.vercel.app/",
  },

  keywords: [
    "سرچنو",
    "سرچنو مصالح ساختمانی",
    "مصالح ساختمانی",
    "خرید مصالح ساختمانی",
    "فروش مصالح ساختمانی",
    "تجهیزات ساختمانی",
    "فروشندگان مصالح",
    "تأمین‌کنندگان مصالح",
    "خدمات ساختمانی",
    "متخصصان ساختمانی",
    "استادکار ساختمانی",
  ],

  authors: [
    {
      name: "سرچنو",
    },
  ],

  creator: "سرچنو",
  publisher: "سرچنو",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "سرچنو | پلتفرم هوشمند ساخت‌وساز و ساز",

    description:
      "سرچنو، پلتفرم هوشمند خرید و فروش مصالح ساختمانی، تجهیزات و خدمات ساختمانی.",

    siteName: "سرچنو",

    locale: "fa_IR",

    type: "website",

    url: "https://sercheno-ywf1.vercel.app/",

    images: [
      {
        url: "https://sercheno-ywf1.vercel.app/logo.png",
        width: 512,
        height: 512,
        alt: "لوگوی سرچنو",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "سرچنو | پلتفرم هوشمند ساخت‌وساز و ساز",
    description:
      "پلتفرم هوشمند خرید و فروش مصالح ساختمانی، تجهیزات و خدمات ساختمانی.",
    images: ["https://sercheno-ywf1.vercel.app/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <>
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="enamad" content="69928544" />
      </head>

      <body className="min-h-full flex flex-col">
  <ServiceWorkerRegister />

  {children}

  <MobileBottomNav />
</body>
    </html>
  </>
);
}
