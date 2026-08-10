import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
