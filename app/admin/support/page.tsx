"use client";

import { useEffect, useState } from "react";

type SupportMessage = {
  id: number;
  user_name: string;
  user_phone: string;
  message: string;
  admin_reply: string | null;
  status: string | null;
  created_at: string;
  replied_at: string | null;
};

export default function AdminSupportPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<Record<number, string>>({});
  const [sending, setSending] = useState<number | null>(null);

  async function loadMessages() {
    try {
      const response = await fetch("/api/support");

      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleReply(id: number) {
    const text = reply[id]?.trim();

    if (!text) {
      alert("لطفاً پاسخ را بنویسید.");
      return;
    }

    setSending(id);

    try {
      const response = await fetch("/api/support", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          admin_reply: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "خطا در ارسال پاسخ");
        return;
      }

      setReply((prev) => ({
        ...prev,
        [id]: "",
      }));

      await loadMessages();

      alert("پاسخ با موفقیت ثبت شد.");
    } catch (error) {
      console.error(error);
      alert("خطا در ارتباط با سرور");
    } finally {
      setSending(null);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-100 p-5">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 rounded-3xl bg-white p-6 shadow">
          <h1 className="text-3xl font-black text-slate-900">
            پشتیبانی سرچنو
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            مدیریت پیام‌های کاربران و پاسخ به درخواست‌های پشتیبانی
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            در حال دریافت پیام‌ها...
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500">
            هنوز پیامی دریافت نشده است.
          </div>
        ) : (
          <div className="space-y-6">

            {messages.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >

                <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      {item.user_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      📞 {item.user_phone}
                    </p>
                  </div>

                  <div className="text-left">
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

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleString("fa-IR")}
                    </p>
                  </div>

                </div>

                <div className="mt-5 rounded-2xl bg-slate-100 p-5">
                  <div className="mb-2 text-xs font-black text-blue-700">
                    پیام کاربر
                  </div>

                  <p className="leading-8 text-slate-700">
                    {item.message}
                  </p>
                </div>

                {item.admin_reply && (
                  <div className="mt-4 rounded-2xl bg-emerald-50 p-5">
                    <div className="mb-2 text-xs font-black text-emerald-700">
                      پاسخ پشتیبان
                    </div>

                    <p className="leading-8 text-slate-700">
                      {item.admin_reply}
                    </p>
                  </div>
                )}

                <div className="mt-5">

                  <textarea
                    value={reply[item.id] || ""}
                    onChange={(e) =>
                      setReply((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="پاسخ خود را برای کاربر بنویسید..."
                    className="w-full resize-none rounded-2xl bg-slate-100 p-4 text-sm leading-7 outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <button
                    type="button"
                    onClick={() => handleReply(item.id)}
                    disabled={sending === item.id}
                    className="mt-3 rounded-2xl bg-blue-700 px-7 py-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-50"
                  >
                    {sending === item.id
                      ? "در حال ثبت پاسخ..."
                      : "ثبت پاسخ"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
