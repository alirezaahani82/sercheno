import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "سؤال خود را وارد کنید.",
        },
        { status: 400 }
      );
    }

    /*
     * ============================
     * دریافت محصولات فعال سرچنو
     * ============================
     *
     * توجه:
     * cooperation_price عمداً اینجا
     * SELECT نشده است.
     */

    const { data, error } = await supabase
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
      .eq("status", "active")
      .order("updated_at", {
        ascending: false,
      })
      .limit(200);

    if (error) {
      console.error(
        "SERCHENO PRODUCTS ERROR:",
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

    const products: Product[] = data || [];

    /*
     * ============================
     * آماده‌سازی اطلاعات برای AI
     * ============================
     */

    const productContext = products
      .map((product) => {
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          description: product.description,
          customer_price:
            product.customer_price,
          unit: product.unit,
          stock: product.stock,
          brand: product.brand,
          model: product.model,
          min_order: product.min_order,
          sales_conditions:
            product.sales_conditions,
          updated_at: product.updated_at,
        };
      });

    /*
     * ============================
     * دستور اصلی AI سرچنو
     * ============================
     */

    const systemPrompt = `
تو «هوش مصنوعی سرچنو» هستی.

سرچنو یک پلتفرم هوشمند حوزه ساختمان و ساخت‌وساز است.

وظیفه تو این است که به زبان فارسی و به شکل دقیق، کاربردی و قابل فهم
به پرسش‌های کاربران در حوزه ساختمان، مصالح ساختمانی، اجرا، برآورد،
خرید مصالح، پروژه‌های ساختمانی، نیروی اجرایی و موضوعات مرتبط پاسخ بدهی.

قوانین بسیار مهم:

1. اگر سؤال کاربر درباره قیمت محصولات سرچنو است،
   فقط قیمت موجود در اطلاعات محصولات سرچنو را مبنا قرار بده.

2. قیمت customer_price قیمت قابل نمایش به مشتری است.

3. هرگز درباره cooperation_price صحبت نکن و هرگز آن را نمایش نده.
   این قیمت خصوصی و مخصوص مدیریت سرچنو است.

4. فقط محصولاتی که status آنها active است در اطلاعاتی که در اختیار تو قرار گرفته‌اند
   قابل استفاده هستند.

5. اگر محصول موردنظر در اطلاعات سرچنو وجود ندارد،
   قیمت آن را حدس نزن و قیمت ساختگی ارائه نکن.

6. اگر قیمت محصول موجود نیست یا customer_price آن null است،
   صادقانه بگو قیمت مشتری در حال حاضر در دیتابیس سرچنو ثبت نشده است.

7. اگر کاربر درباره قیمت پرسید، تا حد امکان نام محصول، برند،
   مدل، واحد فروش، موجودی و حداقل سفارش را نیز در صورت وجود اعلام کن.

8. قیمت‌ها را با جداکننده هزارگان و به صورت خوانا نمایش بده.

9. اگر سؤال کاربر قیمت نبود، می‌توانی از دانش عمومی خودت
   برای پاسخ تخصصی در حوزه ساختمان استفاده کنی.

10. در موضوعات تخصصی ساختمان، پاسخ را کاربردی و مرحله‌به‌مرحله ارائه کن.

11. اگر برای پاسخ دقیق به اطلاعاتی مثل متراژ، تعداد طبقات، نوع سازه،
   ضخامت دیوار، نوع سقف یا شهر نیاز داری، از کاربر سؤال تکمیلی بپرس.

12. هرگز ادعا نکن که اطلاعاتی را از دیتابیس سرچنو گرفته‌ای
   مگر اینکه واقعاً در context محصولات سرچنو وجود داشته باشد.

13. هرگز cooperation_price را افشا نکن؛ حتی اگر کاربر مستقیماً درخواست کند.

14. اگر کاربر پرسید «قیمت همکاری چیست؟» یا «قیمت همکاری را بگو»،
   پاسخ بده:
   «قیمت همکاری برای کاربران عمومی قابل نمایش نیست.»

15. پاسخ‌ها فارسی باشند مگر اینکه کاربر زبان دیگری درخواست کند.

اطلاعات محصولات فعال سرچنو:
${JSON.stringify(productContext)}
`;

    /*
     * ============================
     * درخواست از OpenAI
     * ============================
     */

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.2,

        max_tokens: 1200,
      });

    const answer =
      completion.choices[0]?.message
        ?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        {
          error:
            "پاسخی از هوش مصنوعی دریافت نشد.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(
      "SERCHENO AI ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "در ارتباط با هوش مصنوعی سرچنو خطایی رخ داد.",
      },
      { status: 500 }
    );
  }
}
