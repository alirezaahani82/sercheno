import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string | null;
  slug: string | null;
  category: string | null;
  subcategory: string | null;
  description: string | null;
  customer_price: number | null;
  unit: string | null;
  stock: number | null;
  brand: string | null;
  model: string | null;
  min_order: number | null;
  sales_conditions: string | null;
  updated_at: string | null;
};

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error:
            "سؤال خود را وارد کنید.",
        },
        { status: 400 }
      );
    }

    /*
     * فقط محصولات فعال سرچنو
     */

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        category,
        subcategory,
        description,
        customer_price,
        unit,
        stock,
        brand,
        model,
        min_order,
        sales_conditions,
        updated_at
      `)
      .eq(
        "status",
        "active"
      )
      .order(
        "updated_at",
        {
          ascending: false,
        }
      )
      .limit(100);

    if (error) {
      console.error(
        "AI PRODUCTS ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "خطا در دریافت اطلاعات محصولات سرچنو.",
        },
        { status: 500 }
      );
    }

    const products: Product[] =
      data || [];

    /*
     * نکته امنیتی بسیار مهم:
     *
     * cooperation_price
     * اصلاً در SELECT بالا وجود ندارد.
     *
     * بنابراین AI عمومی هیچ دسترسی
     * به قیمت همکاری ندارد.
     */

    const normalizedMessage =
      message.toLowerCase();

    /*
     * جستجوی ساده اولیه
     *
     * در مرحله بعد این قسمت را
     * هوشمندتر می‌کنیم.
     */

    const matchedProducts =
      products.filter(
        (product) => {
          const text = [
            product.name,
            product.category,
            product.subcategory,
            product.description,
            product.brand,
            product.model,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return text.includes(
            normalizedMessage
          );
        }
      );

    return NextResponse.json({
      success: true,

      message,

      products:
        matchedProducts.slice(
          0,
          20
        ),
    });
  } catch (error) {
    console.error(
      "AI API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "خطای داخلی سرور.",
      },
      { status: 500 }
    );
  }
}
