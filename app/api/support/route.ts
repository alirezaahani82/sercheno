import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// دریافت پیام جدید از کاربر
export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("SUPPORT BODY:", body);

    const user_name = body.user_name?.trim();
    const user_phone = body.user_phone?.trim();
    const message = body.message?.trim();

    if (!user_name || !user_phone || !message) {
      return Response.json(
        {
          error: "نام، شماره تماس و پیام الزامی است",
          received: body,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("support_messages")
      .insert({
        user_name: user_name,
        user_phone: user_phone,
        message: message,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return Response.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("SUPPORT API ERROR:", error);

    return Response.json(
      {
        error: "خطا در ارسال پیام",
      },
      { status: 500 }
    );
  }
}


// بررسی پاسخ پشتیبانی برای کاربر
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const phone = searchParams.get("phone")?.trim();

    if (!phone) {
      return Response.json(
        {
          error: "شماره تماس ارسال نشده است",
          hasNewMessage: false,
        },
        { status: 400 }
      );
    }

    console.log("CHECK SUPPORT PHONE:", phone);

    const { data, error } = await supabase
      .from("support_messages")
      .select("id, message, admin_reply, status, replied_at")
      .eq("user_phone", phone)
      .eq("status", "replied")
      .not("admin_reply", "is", null)
      .order("replied_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("SUPABASE GET ERROR:", error);

      return Response.json(
        {
          error: error.message,
          hasNewMessage: false,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return Response.json({
        hasNewMessage: false,
      });
    }

    return Response.json({
      hasNewMessage: true,
      data: {
        id: data.id,
        message: data.message,
        admin_reply: data.admin_reply,
        status: data.status,
        replied_at: data.replied_at,
      },
    });
  } catch (error) {
    console.error("SUPPORT GET ERROR:", error);

    return Response.json(
      {
        error: "خطا در بررسی پاسخ پشتیبانی",
        hasNewMessage: false,
      },
      { status: 500 }
    );
  }
}
