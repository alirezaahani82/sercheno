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

    const { data: customers, error: customerError } =
      await supabase
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
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: customers[0],
    });
  } catch (error) {
    console.error("CUSTOMER PROFILE GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات مشتری",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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

    const body = await request.json();

    const {
      first_name,
      last_name,
      phone,
      city,
      national_code,
      birth_date,
      father_name,
      job,
      address,
    } = body;

    if (
      !national_code ||
      !birth_date ||
      !father_name ||
      !job ||
      !address
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفاً تمام اطلاعات هویتی الزامی را تکمیل کنید.",
        },
        { status: 400 }
      );
    }

    const { data: customer, error: updateError } =
      await supabase
        .from("customers")
        .update({
          first_name: first_name || null,
          last_name: last_name || null,
          phone: phone || null,
          city: city || null,
          national_code: national_code.trim(),
          birth_date: birth_date.trim(),
          father_name: father_name.trim(),
          job: job.trim(),
          address: address.trim(),
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("auth_user_id", user.id)
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
        .single();

    if (updateError) {
      console.error(
        "CUSTOMER PROFILE UPDATE ERROR:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          message: "ذخیره اطلاعات پروفایل انجام نشد.",
          error: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "اطلاعات هویتی شما با موفقیت ثبت شد.",
      customer,
    });
  } catch (error) {
    console.error("CUSTOMER PROFILE PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ذخیره اطلاعات پروفایل",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
