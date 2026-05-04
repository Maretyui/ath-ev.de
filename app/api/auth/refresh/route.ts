import { cookies } from "next/headers";
import { createTokens, verifyToken } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) {
    return Response.json(
      { success: false, error: "No refresh token" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return Response.json(
      { success: false, error: "Invalid or expired refresh token" },
      { status: 401 }
    );
  }

  if (payload.type !== "refresh") {
    return Response.json(
      { success: false, error: "Invalid token type" },
      { status: 401 }
    );
  }

  const { authToken } = createTokens(payload.userId, payload.email, payload.role);
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set("authToken", authToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 900,
    path: "/",
  });

  return Response.json({
    success: true,
    user: { id: payload.userId, email: payload.email, role: payload.role },
  });
}
