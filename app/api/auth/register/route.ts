import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createTokens, hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

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

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message).join(", ");
    return Response.json({ success: false, error: errors }, { status: 400 });
  }

  const { email, password } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json(
      { success: false, error: "Email already in use" },
      { status: 400 }
    );
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

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

  return Response.json(
    {
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    },
    { status: 201 }
  );
}
