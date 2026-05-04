import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createTokens, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { handleError } from "@/lib/api";

const REFRESH_EXPIRY = Number(process.env.REFRESH_EXPIRY ?? 604800);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.password))) {
      return Response.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { authToken, refreshToken } = createTokens(
      user.id,
      user.email,
      user.role
    );

    const cookieStore = await cookies();
    const secure = process.env.SECURE_COOKIES === "true";

    cookieStore.set("authToken", authToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: 900,
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: REFRESH_EXPIRY,
      path: "/",
    });

    return Response.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    return handleError(error);
  }
}
