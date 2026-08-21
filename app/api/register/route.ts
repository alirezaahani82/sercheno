import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const phone = String(body.phone || "").trim();
    const city = String(body.city || "").trim();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !city ||
      !username ||
      !password
    ) {
      return NextResponse.json(
        {
          error: "لطفاً تمام اطلاعات ثبت‌نام را وارد کنید.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "تنظیمات Supabase روی سرور کامل نیست. SUPABASE_SERVICE_ROLE_KEY را بررسی کنید.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    /*
     * برای اینکه کاربر بتواند با نام کاربری وارد شود،
     * یک ایمیل داخلی و غیرقابل مشاهده برای سیستم Auth می‌سازیم.
     *
     * کاربر همچنان با username خودش وارد خواهد شد.
     */
    const safeUsername = username
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");

    if (!safeUsername) {
      return NextResponse.json(
        {
          error:
            "نام کاربری باید شامل حروف انگلیسی، عدد، _ یا - باشد.",
        },
        { status: 400 }
      );
    }

    const internalEmail = `${safeUsername}@sercheno.local`;

    /*
     * بررسی نام کاربری تکراری
     */
    const { data: existingUser, error: existingError } =
      await supabase
        .from("customers")
        .select("id")
        .eq("username", username)
        .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        {
          error: existingError.message,
        },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        {
          error: "این نام کاربری قبلاً ثبت شده است.",
        },
        { status: 409 }
      );
    }

    /*
     * ساخت حساب در Supabase Auth
     */
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.admin.createUser({
      email: internalEmail,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        username,
        phone,
        city,
      },
    });

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          error: "ساخت حساب کاربری انجام نشد.",
        },
        { status: 500 }
      );
    }

    /*
     * ثبت اطلاعات اولیه مشتری
     */
    const { error: customerError } = await supabase
      .from("customers")
      .insert({
        auth_user_id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        city,
        username,
        profile_completed: false,
        is_active: true,
        orders_count: 0,
        loyalty_points: 0,
      });

    /*
     * اگر ثبت اطلاعات مشتری شکست خورد،
     * حساب Auth ساخته‌شده را هم حذف می‌کنیم.
     */
    if (customerError) {
      await supabase.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        {
          error: customerError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "حساب کاربری با موفقیت ایجاد شد.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی در ثبت‌نام رخ داد.",
      },
      { status: 500 }
    );
  }
}
