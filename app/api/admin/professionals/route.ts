import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getStoragePath(value: string | null | undefined) {
  if (!value) return null;

  try {
    // اگر مقدار ذخیره‌شده URL کامل باشد
    const marker = "/storage/v1/object/";

    const markerIndex = value.indexOf(marker);

    if (markerIndex !== -1) {
      const afterMarker = value.substring(
        markerIndex + marker.length
      );

      const parts = afterMarker.split("/");

      // public / professionals / ...
      // authenticated / professionals / ...
      if (
        parts.length >= 3 &&
        parts[1] === "professionals"
      ) {
        return parts
          .slice(2)
          .join("/");
      }
    }

    // اگر خود path ذخیره شده باشد
    if (value.startsWith("professionals/")) {
      return value.substring(
        "professionals/".length
      );
    }

    return value;
  } catch {
    return null;
  }
}

async function createSignedUrl(
  value: string | null | undefined
) {
  const path = getStoragePath(value);

  if (!path) return null;

  const { data, error } =
    await supabaseAdmin.storage
      .from("professionals")
      .createSignedUrl(path, 60 * 60);

  if (error) {
    console.error(
      "SIGNED URL ERROR:",
      error
    );

    return null;
  }

  return data?.signedUrl || null;
}

export async function GET() {
  try {
    /*
     * بررسی اینکه مدیر وارد پنل شده است
     */
    const supabase = await createServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز. ابتدا وارد پنل مدیریت شوید.",
        },
        { status: 401 }
      );
    }

    /*
     * دریافت متخصص‌ها با Service Role
     * تا RLS جلوی پنل مدیریت را نگیرد.
     */
    const {
      data,
      error,
    } = await supabaseAdmin
      .from("professionals")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "ADMIN PROFESSIONALS SELECT ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    /*
     * ساخت لینک موقت برای تصاویر Private
     */
    const professionalsWithImages =
      await Promise.all(
        (data || []).map(
          async (professional) => {
            const [
              profileImage,
              workImage1,
              workImage2,
              workImage3,
            ] = await Promise.all([
              createSignedUrl(
                professional.profile_image
              ),
              createSignedUrl(
                professional.work_image_1
              ),
              createSignedUrl(
                professional.work_image_2
              ),
              createSignedUrl(
                professional.work_image_3
              ),
            ]);

            return {
              ...professional,

              profile_image_url:
                profileImage,

              work_image_1_url:
                workImage1,

              work_image_2_url:
                workImage2,

              work_image_3_url:
                workImage3,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      professionals:
        professionalsWithImages,
    });
  } catch (error) {
    console.error(
      "ADMIN PROFESSIONALS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "خطا در دریافت متخصص‌ها.",
      },
      { status: 500 }
    );
  }
}

/*
 * تغییر وضعیت متخصص
 */
export async function PATCH(
  request: Request
) {
  try {
    /*
     * بررسی ورود مدیر
     */
    const supabase = await createServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "دسترسی غیرمجاز.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = String(
      body.id || ""
    );

    const status = String(
      body.status || ""
    );

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "شناسه متخصص ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    if (
      ![
        "approved",
        "rejected",
        "pending",
      ].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "وضعیت نامعتبر است.",
        },
        { status: 400 }
      );
    }

    const {
      error,
    } = await supabaseAdmin
      .from("professionals")
      .update({
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(
        "ADMIN STATUS UPDATE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "وضعیت متخصص با موفقیت تغییر کرد.",
    });
  } catch (error) {
    console.error(
      "ADMIN PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "خطا در تغییر وضعیت.",
      },
      { status: 500 }
    );
  }
}
