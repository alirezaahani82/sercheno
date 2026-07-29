import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // فقط مسیر پنل مدیریت را محافظت می‌کنیم
  if (pathname.startsWith("/admin/service")) {
    const hasSession = request.cookies.get("sb-access-token");

    if (!hasSession) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/service/:path*"],
};

