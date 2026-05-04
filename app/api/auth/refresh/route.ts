import { cookies } from "next/headers";
import { createTokens, verifyToken } from "@/lib/auth";
import { handleError } from "@/lib/api";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;

    if (!token) {
      return Response.json(
        { success: false, error: "No refresh token" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (payload.type !== "refresh") {
      return Response.json(
        { success: false, error: "Invalid token type" },
        { status: 401 }
      );
    }

    const { authToken } = createTokens(payload.userId, payload.email, payload.role);
    const secure = process.env.SECURE_COOKIES === "true";

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
  } catch (error) {
    return handleError(error);
  }
}
