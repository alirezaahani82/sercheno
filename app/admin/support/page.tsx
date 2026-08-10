"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type SupportMessage = {
  id: number | string;
  user_name: string | null;
  user_phone: string | null;
  message: string | null;
  admin_reply: string | null;
  status: string | null;
  created_at: string | null;
  replied_at: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SupportAdminPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMessages() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("support_messages")
      .select(
        "id,user_name,user_phone,message,admin_reply,status,created_at,replied_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPPORT ADMIN ERROR:", error);
      setError(error.message);
      setMessages([]);
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 px-5 py-10 text-slate-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              پشتیبانی سرچنو
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              پیام‌های کاربران را از اینجا مشاهده و مدیریت کنید.
            </p>
          </div>

          <button
            onClick={loadMessages}
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          >
            🔄 بروزرسانی
          </button>
        </div>

        {loading && (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <p className="font-bold text-slate-600">
              در حال دریافت پیام‌ها...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-black">
              خطا در دریافت پیام‌ها
            </p>

            <p className="mt-2 text-sm">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <div className="text-5xl">📭</div>

            <h2 className="mt-4 text-xl font-black">
              هنوز پیامی دریافت نشده است
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              اگر در جدول Supabase پیام وجود دارد، احتمالاً مشکل از
              دسترسی RLS جدول است.
            </p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="space-y-5">
            {messages.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-black">
                      {item.user_name || "بدون نام"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      📞 {item.user_phone || "شماره ثبت نشده"}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-black ${
                        item.status === "replied"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status === "replied"
                        ? "پاسخ داده شده"
                        : "در انتظار پاسخ"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-bold text-slate-400">
                    پیام کاربر
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-slate-700">
                    {item.message}
                  </p>
                </div>

                {item.admin_reply && (
                  <div className="mt-4 rounded-2xl bg-blue-50 p-5">
                    <p className="text-xs font-bold text-blue-500">
                      پاسخ پشتیبانی
                    </p>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-blue-900">
                      {item.admin_reply}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-5 text-xs text-slate-400">
                  <span>
                    🕐 ارسال:{" "}
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString("fa-IR")
                      : "-"}
                  </span>

                  {item.replied_at && (
                    <span>
                      ✅ پاسخ:{" "}
                      {new Date(item.replied_at).toLocaleString("fa-IR")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
