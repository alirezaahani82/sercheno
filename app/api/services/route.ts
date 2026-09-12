import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // دریافت فقط متخصصانی که توسط ادمین تأیید شده‌اند
    const { data, error } = await supabaseAdmin
      .from("professionals")
      .select(`
        id,
        first_name,
        last_name,
        phone,
        service,
        province,
        city,
        activity_area,
        experience,
        description,
        skills,
        cooperation_type,
        availability,
        certificates,
        price_info,
        show_phone,
        profile_image,
        work_image_1,
        work_image_2,
        work_image_3,
        status,
        created_at
      `)
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "GET PROFESSIONALS ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: "خطا در دریافت متخصصان",
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    // ساخت لینک موقت برای تصاویر خصوصی
    const professionals = await Promise.all(
      (data || []).map(async (professional) => {
        let profile_image_url: string | null = null;
        let work_image_1_url: string | null = null;
        let work_image_2_url: string | null = null;
        let work_image_3_url: string | null = null;

        // =========================
        // عکس پروفایل
        // =========================

        if (professional.profile_image) {
          const { data: signedProfile } =
            await supabaseAdmin.storage
              .from("professionals")
              .createSignedUrl(
                professional.profile_image,
                60 * 60
              );

          profile_image_url =
            signedProfile?.signedUrl || null;
        }

        // =========================
        // نمونه کار اول
        // =========================

        if (professional.work_image_1) {
          const { data: signedImage1 } =
            await supabaseAdmin.storage
              .from("professionals")
              .createSignedUrl(
                professional.work_image_1,
                60 * 60
              );

          work_image_1_url =
            signedImage1?.signedUrl || null;
        }

        // =========================
        // نمونه کار دوم
        // =========================

        if (professional.work_image_2) {
          const { data: signedImage2 } =
            await supabaseAdmin.storage
              .from("professionals")
              .createSignedUrl(
                professional.work_image_2,
                60 * 60
              );

          work_image_2_url =
            signedImage2?.signedUrl || null;
        }

        // =========================
        // نمونه کار سوم
        // =========================

        if (professional.work_image_3) {
          const { data: signedImage3 } =
            await supabaseAdmin.storage
              .from("professionals")
              .createSignedUrl(
                professional.work_image_3,
                60 * 60
              );

          work_image_3_url =
            signedImage3?.signedUrl || null;
        }

        // =========================
        // خروجی عمومی
        // =========================

        return {
          id: professional.id,

          first_name: professional.first_name,
          last_name: professional.last_name,

          service: professional.service,

          province: professional.province,
          city: professional.city,
          activity_area: professional.activity_area,

          experience: professional.experience,
          description: professional.description,

          skills: professional.skills,
          cooperation_type:
            professional.cooperation_type,
          availability:
            professional.availability,
          certificates:
            professional.certificates,

          price_info: professional.price_info,

          show_phone:
            professional.show_phone,

          // فقط اگر اجازه نمایش شماره داده شده باشد
          phone:
            professional.show_phone
              ? professional.phone
              : null,

          profile_image_url,

          work_image_1_url,
          work_image_2_url,
          work_image_3_url,

          status: professional.status,
          created_at: professional.created_at,

          // =========================
          // امتیاز دمو
          // =========================

          rating: 4.8,
          review_count: 12,

          // رتبه دمو
          rank: "ویژه",
        };
      })
    );

    return NextResponse.json(
      professionals,
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "SERVICES API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "خطای داخلی سرور",
      },
      { status: 500 }
    );
  }
}
