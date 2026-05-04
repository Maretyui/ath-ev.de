import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken, verifyPassword, hashPassword } from "@/lib/auth";
import { changePasswordSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return unauthorizedResponse();
    }

    const payload = verifyToken(token);

    const body = await request.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !(await verifyPassword(currentPassword, user.password))) {
      return Response.json(
        { success: false, error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    return Response.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
