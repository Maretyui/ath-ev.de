import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createTokens, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

const REFRESH_EXPIRY = Number(process.env.REFRESH_EXPIRY ?? 604800);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { success: false, error: "Invalid input" },
      { status: 400 }
    );
  }

  const { email, password } = result.data;

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
  const secure = process.env.NODE_ENV === "production";

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
}
