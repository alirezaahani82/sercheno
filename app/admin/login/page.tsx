"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const login = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from("admin_users")
    .select("email,is_active")
    .eq("username", username)
    .single();

  alert("DATA: " + JSON.stringify(data));
  alert("ERROR: " + JSON.stringify(error));

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  if (!data) {
    alert("کاربری پیدا نشد");
    setLoading(false);
    return;
  }

  if (!data.is_active) {
    alert("این حساب غیرفعال است.");
    setLoading(false);
    return;
  }

  const { error: loginError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });

  setLoading(false);

  if (loginError) {
    alert("رمز عبور اشتباه است.");
    return;
  }

  router.push("/admin/service");
};

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-100"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-center text-3xl font-black">
          ورود به پنل مدیریت
        </h1>

        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-xl border p-4"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-xl border p-4"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>

      </div>
    </main>
  );
}

