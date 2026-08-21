import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("تنظیمات Supabase کامل نیست.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| دریافت اطلاعات پروفایل مشتری
|
| فعلاً auth_user_id از localStorage به API ارسال می‌شود.
| در مرحله بعد می‌توانیم احراز هویت را کاملاً با Cookie/Session امن کنیم.
|--------------------------------------------------------------------------
*/

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    const { searchParams } = new URL(request.url);

    const authUserId = searchParams.get("auth_user_id");

    if (!authUserId) {
      return NextResponse.json(
        {
          error: "شناسه کاربر ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }

    const { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle();

    if (error) {
      console.error("GET CUSTOMER PROFILE ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          error: "اطلاعات مشتری پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        customer,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("PROFILE GET ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی در دریافت اطلاعات پروفایل رخ داد.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| PUT
|--------------------------------------------------------------------------
| تکمیل / ویرایش اطلاعات پروفایل مشتری
|--------------------------------------------------------------------------
*/

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    const body = await request.json();

    const authUserId = String(body.auth_user_id || "").trim();

    if (!authUserId) {
      return NextResponse.json(
        {
          error: "شناسه کاربر ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * اطلاعات قابل ویرایش پروفایل
     */

    const firstName = String(body.first_name || "").trim();
    const lastName = String(body.last_name || "").trim();
    const phone = String(body.phone || "").trim();
    const city = String(body.city || "").trim();

    const nationalCode = String(
      body.national_code || ""
    ).trim();

    const birthDate = String(
      body.birth_date || ""
    ).trim();

    const address = String(
      body.address || ""
    ).trim();

    const postalCode = String(
      body.postal_code || ""
    ).trim();

    /*
     * بررسی اطلاعات ضروری
     */

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !city
    ) {
      return NextResponse.json(
        {
          error:
            "نام، نام خانوادگی، شماره تماس و شهر الزامی است.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * اعتبارسنجی کد ملی در صورت وارد شدن
     */

    if (
      nationalCode &&
      !/^\d{10}$/.test(nationalCode)
    ) {
      return NextResponse.json(
        {
          error:
            "کد ملی باید دقیقاً ۱۰ رقم باشد.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * اعتبارسنجی شماره موبایل
     */

    if (
      phone &&
      !/^09\d{9}$/.test(phone)
    ) {
      return NextResponse.json(
        {
          error:
            "شماره موبایل باید به شکل 09123456789 باشد.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * اعتبارسنجی کد پستی در صورت وارد شدن
     */

    if (
      postalCode &&
      !/^\d{10}$/.test(postalCode)
    ) {
      return NextResponse.json(
        {
          error:
            "کد پستی باید دقیقاً ۱۰ رقم باشد.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * بروزرسانی مشتری
     */

    const { data: updatedCustomer, error } =
      await supabase
        .from("customers")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone,
          city,
          national_code: nationalCode || null,
          birth_date: birthDate || null,
          address: address || null,
          postal_code: postalCode || null,

          /*
           * وقتی اطلاعات پروفایل ذخیره شد،
           * پروفایل را تکمیل‌شده در نظر می‌گیریم.
           */

          profile_completed: true,

          updated_at: new Date().toISOString(),
        })
        .eq("auth_user_id", authUserId)
        .select("*")
        .single();

    if (error) {
      console.error(
        "UPDATE CUSTOMER PROFILE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!updatedCustomer) {
      return NextResponse.json(
        {
          error:
            "اطلاعات مشتری بروزرسانی نشد.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * بروزرسانی metadata در Supabase Auth
     */

    const { error: authUpdateError } =
      await supabase.auth.admin.updateUserById(
        authUserId,
        {
          user_metadata: {
            first_name: firstName,
            last_name: lastName,
            phone,
            city,
            national_code: nationalCode || null,
            birth_date: birthDate || null,
          },
        }
      );

    if (authUpdateError) {
      console.error(
        "AUTH PROFILE UPDATE ERROR:",
        authUpdateError
      );

      /*
       * این خطا باعث شکست کل عملیات نمی‌شود،
       * چون اطلاعات اصلی customers قبلاً ذخیره شده است.
       */
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "اطلاعات پروفایل با موفقیت ذخیره شد.",
        customer: updatedCustomer,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PROFILE PUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "خطایی در ذخیره اطلاعات پروفایل رخ داد.",
      },
      {
        status: 500,
      }
    );
  }
}
