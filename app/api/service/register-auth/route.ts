import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const username = String(
      body.username || ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      body.password || ""
    );

    if (
      !/^[a-z0-9_]{4,30}$/.test(
        username
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "نام کاربری نامعتبر است.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "رمز عبور باید حداقل ۸ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    /*
     * ایمیل سیستمی داخلی
     *
     * متخصص این ایمیل را نمی‌بیند.
     * ورود آینده با username انجام می‌شود.
     */
    const internalEmail =
      `${username}@accounts.sercheno.local`;

    const {
      data,
      error,
    } =
      await supabaseAdmin.auth.admin.createUser(
        {
          email: internalEmail,
          password,
          email_confirm: true,
        }
      );

    if (error) {
      console.error(
        "AUTH CREATE ERROR:",
        error
      );

      if (
        error.message
          .toLowerCase()
          .includes("already")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "این نام کاربری قبلاً ثبت شده است.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "ساخت حساب کاربری انجام نشد.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: data.user.id,
    });
  } catch (error) {
    console.error(
      "REGISTER AUTH API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "خطا در ساخت حساب کاربری.",
      },
      { status: 500 }
    );
  }
}
