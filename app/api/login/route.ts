import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "لطفاً نام کاربری و رمز عبور را وارد کنید.",
        },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "تنظیمات Supabase روی سرور کامل نیست.",
        },
        { status: 500 }
      );
    }

    /*
     * اتصال ادمین به Supabase
     */
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
     * پیدا کردن مشتری بر اساس نام کاربری
     */
    const { data: customer, error: customerError } =
      await supabase
        .from("customers")
        .select(
          "id, auth_user_id, first_name, last_name, username, phone, city, profile_completed, is_active, orders_count, loyalty_points"
        )
        .eq("username", username)
        .maybeSingle();

    if (customerError) {
      console.error(
        "CUSTOMER LOOKUP ERROR:",
        customerError
      );

      return NextResponse.json(
        {
          error:
            "خطا در بررسی اطلاعات کاربر: " +
            customerError.message,
        },
        { status: 500 }
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          error:
            "نام کاربری یا رمز عبور صحیح نیست.",
        },
        { status: 401 }
      );
    }

    /*
     * بررسی فعال بودن حساب
     */
    if (customer.is_active === false) {
      return NextResponse.json(
        {
          error:
            "حساب کاربری شما غیرفعال یا مسدود شده است.",
        },
        { status: 403 }
      );
    }

    /*
     * بررسی اینکه auth_user_id وجود داشته باشد
     */
    if (!customer.auth_user_id) {
      return NextResponse.json(
        {
          error:
            "حساب کاربری شما به سیستم ورود متصل نیست. لطفاً با پشتیبانی سرچنو تماس بگیرید.",
        },
        { status: 500 }
      );
    }

    /*
     * ساخت ایمیل داخلی همانند Register
     */
    const safeUsername = username
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");

    if (!safeUsername) {
      return NextResponse.json(
        {
          error:
            "نام کاربری نامعتبر است.",
        },
        { status: 400 }
      );
    }

    const internalEmail =
      `${safeUsername}@sercheno.local`;

    /*
     * ورود به Supabase Auth
     *
     * برای Login واقعی از یک کلاینت معمولی
     * استفاده می‌کنیم.
     */
    const authClient = createClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const {
      data: authData,
      error: authError,
    } =
      await authClient.auth.signInWithPassword({
        email: internalEmail,
        password,
      });

    if (authError) {
      console.error(
        "AUTH LOGIN ERROR:",
        authError
      );

      return NextResponse.json(
        {
          error:
            "نام کاربری یا رمز عبور صحیح نیست.",
        },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          error:
            "ورود به حساب انجام نشد.",
        },
        { status: 401 }
      );
    }

    /*
     * بررسی تطابق حساب Auth با customers
     */
    if (
      authData.user.id !==
      customer.auth_user_id
    ) {
      return NextResponse.json(
        {
          error:
            "حساب کاربری با اطلاعات مشتری مطابقت ندارد.",
        },
        { status: 500 }
      );
    }

    /*
     * پاسخ موفق
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "ورود با موفقیت انجام شد.",

        customer: {
          id: customer.id,
          auth_user_id:
            customer.auth_user_id,

          first_name:
            customer.first_name,

          last_name:
            customer.last_name,

          username:
            customer.username,

          phone:
            customer.phone,

          city:
            customer.city,

          profile_completed:
            customer.profile_completed,

          is_active:
            customer.is_active,

          orders_count:
            customer.orders_count ?? 0,

          loyalty_points:
            customer.loyalty_points ?? 0,
        },

        session: {
          access_token:
            authData.session?.access_token || null,

          refresh_token:
            authData.session?.refresh_token || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "LOGIN SERVER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "خطایی در سرور هنگام ورود رخ داد.",
      },
      { status: 500 }
    );
  }
}
