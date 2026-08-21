import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
        },
        { status: 401 }
      );
    }

    const { data: customers, error: customerError } = await supabase
      .from("customers")
      .select(`
        id,
        first_name,
        last_name,
        phone,
        city,
        username,
        national_code,
        birth_date,
        father_name,
        job,
        address,
        profile_completed,
        purchase_count,
        loyalty_points,
        is_active,
        created_at,
        updated_at,
        auth_user_id
      `)
      .eq("auth_user_id", user.id);

    if (customerError) {
      console.error("CUSTOMER PROFILE ERROR:", customerError);

      return NextResponse.json(
        {
          success: false,
          message: "خطا در دریافت پروفایل مشتری",
          error: customerError.message,
        },
        { status: 500 }
      );
    }

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "هیچ پروفایلی برای این کاربر پیدا نشد",
        },
        { status: 404 }
      );
    }

    if (customers.length > 1) {
      return NextResponse.json(
        {
          success: false,
          message: "برای این کاربر چند پروفایل وجود دارد",
          count: customers.length,
        },
        { status: 409 }
      );
    }

    const customer = customers[0];

    return NextResponse.json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("CUSTOMER PROFILE API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات مشتری",
      },
      { status: 500 }
    );
  }
}
