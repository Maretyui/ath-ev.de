import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("authToken")?.value;
  if (!token) return false;
  try {
    const payload = verifyToken(token);
    return payload.type === "access";
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (isAuthenticated(request)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.redirect(new URL("/intern", request.url));
}

export const config = {
  matcher: [
    "/api/members/:path*",
    "/api/berichte/:path*",
    "/api/termine/:path*",
    "/api/users/:path*",
    // /intern/* excluding /intern itself, /intern/login, /intern/register
    "/intern/((?!login|register).*)",
  ],
};
