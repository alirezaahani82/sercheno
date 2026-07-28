import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "سرچنو | بازار هوشمند ساخت‌وساز",
  description:
    "سرچنو، پلتفرم جست‌وجو و مقایسه مصالح ساختمانی، تجهیزات، فروشندگان، تأمین‌کنندگان و متخصصان صنعت ساختمان.",

  keywords: [
    "سرچنو",
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

  openGraph: {
    title: "سرچنو | بازار هوشمند ساخت‌وساز",
    description:
      "مصالح ساختمانی، تجهیزات، فروشندگان، تأمین‌کنندگان و متخصصان صنعت ساختمان را در سرچنو پیدا کنید.",
    siteName: "سرچنو",
    locale: "fa_IR",
    type: "website",
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
    <html
      lang="fa"
      dir="rtl"
      className={${geistSans.variable} ${geistMono.variable} h-full antialiased}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
