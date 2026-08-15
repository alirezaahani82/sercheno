import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سرچنو | بازار هوشمند ساخت‌وساز",
    short_name: "سرچنو",
    description:
      "بازار هوشمند ساخت‌وساز؛ خرید مصالح، تجهیزات، خدمات ساختمانی و مناقصات در یکجا.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#1d4ed8",
    orientation: "portrait",
    lang: "fa",
    dir: "rtl",

    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
