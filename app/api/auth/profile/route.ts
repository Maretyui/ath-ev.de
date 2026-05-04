import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return unauthorizedResponse();
    }

    const payload = verifyToken(token);

    const body = await request.json();
    const { username } = profileSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: { username },
      select: { id: true, email: true, username: true },
    });

    return Response.json({ success: true, data: user });
  } catch (error) {
    return handleError(error);
  }
}
