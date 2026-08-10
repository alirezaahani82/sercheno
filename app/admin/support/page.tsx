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
  const [sendingId, setSendingId] = useState<string | number | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});
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
      console.error("LOAD SUPPORT ERROR:", error);
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

  function changeReply(id: string | number, value: string) {
    setReplies((prev) => ({
      ...prev,
      [String(id)]: value,
    }));
  }

  async function sendReply(id: string | number) {
    const reply = replies[String(id)]?.trim();

    if (!reply) {
      alert("لطفاً متن پاسخ را بنویسید.");
      return;
    }

    setSendingId(id);

    const { error } = await supabase
      .from("support_messages")
      .update({
        admin_reply: reply,
        status: "replied",
        replied_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("REPLY ERROR:", error);
      alert("خطا در ارسال پاسخ: " + error.message);
      setSendingId(null);
      return;
    }

    setReplies((prev) => ({
      ...prev,
      [String(id)]: "",
    }));

    await loadMessages();

    setSendingId(null);

    alert("پاسخ با موفقیت ثبت شد.");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 px-5 py-10 text-slate-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black">
              پشتیبانی سرچنو
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              پیام‌های کاربران و پاسخ‌های پشتیبانی
            </p>
          </div>

          <button
            onClick={loadMessages}
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            🔄 بروزرسانی
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <div className="text-4xl">⏳</div>

            <p className="mt-4 font-bold text-slate-600">
              در حال دریافت پیام‌ها...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="font-black">
              خطا در دریافت پیام‌ها
            </h2>

            <p className="mt-2 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && messages.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <div className="text-5xl">📭</div>

            <h2 className="mt-4 text-xl font-black">
              هنوز پیامی دریافت نشده است
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              در حال حاضر پیامی در سیستم پشتیبانی وجود ندارد.
            </p>
          </div>
        )}

        {/* Messages */}
        {!loading && !error && messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((item) => {
              const id = String(item.id);

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >
                  {/* User Info */}
                  <div className="border-b border-slate-100 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-xl font-black">
                          {item.user_name || "بدون نام"}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                          📞 {item.user_phone || "شماره ثبت نشده"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-xs font-black ${
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

                    {item.created_at && (
                      <p className="mt-4 text-xs text-slate-400">
                        🕐 تاریخ ارسال:{" "}
                        {new Date(item.created_at).toLocaleString("fa-IR")}
                      </p>
                    )}
                  </div>

                  {/* User Message */}
                  <div className="p-6">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-black text-slate-400">
                        پیام کاربر
                      </p>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-slate-700">
                        {item.message || "-"}
                      </p>
                    </div>

                    {/* Existing Reply */}
                    {item.admin_reply && (
                      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <p className="text-xs font-black text-blue-600">
                          🤖 پاسخ پشتیبانی سرچنو
                        </p>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-blue-950">
                          {item.admin_reply}
                        </p>

                        {item.replied_at && (
                          <p className="mt-3 text-xs text-blue-400">
                            پاسخ داده شده در:{" "}
                            {new Date(
                              item.replied_at
                            ).toLocaleString("fa-IR")}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Reply Box */}
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm font-black text-slate-700">
                        ✍️ پاسخ ادمین
                      </p>

                      <textarea
                        value={replies[id] || ""}
                        onChange={(e) =>
                          changeReply(item.id, e.target.value)
                        }
                        rows={4}
                        placeholder="پاسخ خود را برای کاربر بنویسید..."
                        className="mt-3 w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-600"
                      />

                      <button
                        type="button"
                        onClick={() => sendReply(item.id)}
                        disabled={sendingId === item.id}
                        className="mt-3 w-full rounded-2xl bg-blue-700 py-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {sendingId === item.id
                          ? "در حال ارسال پاسخ..."
                          : item.admin_reply
                          ? "🔄 بروزرسانی پاسخ"
                          : "📨 ارسال پاسخ"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
