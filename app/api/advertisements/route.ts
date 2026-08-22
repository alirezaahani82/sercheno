import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY!;

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(
      "ADVERTISEMENT SUBMISSION:",
      body
    );

    const {
      title,
      image_url,
      mobile_image_url,
      description,
      target_url,
      advertiser_name,
      advertisement_type,
      start_date,
      end_date,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          error: "عنوان تبلیغ الزامی است.",
        },
        { status: 400 }
      );
    }

    if (!image_url) {
      return NextResponse.json(
        {
          error: "تصویر دسکتاپ تبلیغ ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    if (!mobile_image_url) {
      return NextResponse.json(
        {
          error: "تصویر موبایل تبلیغ ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("advertisements")
        .insert({
          title: title.trim(),

          image_url,

          mobile_image_url,

          description:
            description?.trim() || null,

          target_url:
            target_url?.trim() || null,

          advertiser_name:
            advertiser_name?.trim() || null,

          advertisement_type:
            advertisement_type || "internal",

          status: "pending",

          sort_order: 0,

          start_date:
            start_date || null,

          end_date:
            end_date || null,
        })
        .select()
        .single();

    if (error) {
      console.error(
        "ADVERTISEMENT INSERT ERROR:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      advertisement: data,
    });
  } catch (error) {
    console.error(
      "ADVERTISEMENT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطای ناشناخته در ثبت تبلیغ",
      },
      { status: 500 }
    );
  }
}
