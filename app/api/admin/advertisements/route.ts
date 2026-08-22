import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
}

if (!supabaseServiceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
}

const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/* =========================================================
   GET
   دریافت تبلیغات برای پنل مدیریت
========================================================= */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("advertisements")
      .select(
        `
        id,
        title,
        image_url,
        mobile_image_url,
        created_at,
        update_at,
        description,
        target_url,
        advertiser_name,
        advertisement_type,
        status,
        sort_order,
        start_date,
        end_date
        `
      )
      .order("sort_order", {
        ascending: true,
      })
      .order("created_at", {
        ascending: false,
      });

    if (
      status &&
      status !== "all"
    ) {
      query = query.eq("status", status);
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      console.error(
        "ADMIN ADVERTISEMENTS GET ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "خطا در دریافت تبلیغات از پایگاه داده",
          details: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      advertisements: data || [],
    });
  } catch (error) {
    console.error(
      "ADMIN ADVERTISEMENTS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "خطای داخلی سرور",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PATCH
   تغییر وضعیت تبلیغ
   approved / rejected
========================================================= */

export async function PATCH(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const id = body?.id;
    const status = body?.status;

    if (!id) {
      return NextResponse.json(
        {
          error: "شناسه تبلیغ ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      status !== "approved" &&
      status !== "rejected"
    ) {
      return NextResponse.json(
        {
          error:
            "وضعیت تبلیغ معتبر نیست.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("advertisements")
      .update({
        status,
        update_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        `
        id,
        title,
        image_url,
        mobile_image_url,
        created_at,
        update_at,
        description,
        target_url,
        advertiser_name,
        advertisement_type,
        status,
        sort_order,
        start_date,
        end_date
        `
      )
      .single();

    if (error) {
      console.error(
        "ADVERTISEMENT STATUS UPDATE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "تغییر وضعیت تبلیغ انجام نشد.",
          details: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      advertisement: data,
    });
  } catch (error) {
    console.error(
      "ADVERTISEMENT PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "خطای داخلی سرور",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   حذف تبلیغ
========================================================= */

export async function DELETE(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "شناسه تبلیغ ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      error,
    } = await supabaseAdmin
      .from("advertisements")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "ADVERTISEMENT DELETE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "حذف تبلیغ انجام نشد.",
          details: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "ADVERTISEMENT DELETE API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "خطای داخلی سرور",
      },
      {
        status: 500,
      }
    );
  }
}
