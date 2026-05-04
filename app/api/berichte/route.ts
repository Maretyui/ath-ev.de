import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canPublishContent } from "@/lib/abac";
import { berichtSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";
import type { Role } from "@/lib/generated/prisma/client";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10)));
    const publisherId = url.searchParams.get("publisherId") ?? undefined;
    const skip = (page - 1) * limit;

    const where = publisherId ? { publisherId } : undefined;

    const [total, berichte] = await Promise.all([
      prisma.bericht.count({ where }),
      prisma.bericht.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        include: { publisher: { select: { email: true, username: true } } },
        skip,
        take: limit,
      }),
    ]);

    return Response.json({
      success: true,
      data: berichte,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) return unauthorizedResponse();

    const payload = verifyToken(authToken);

    if (!canPublishContent(payload.role as Role)) {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, image } = berichtSchema.parse(body);

    const bericht = await prisma.bericht.create({
      data: {
        title,
        content,
        image: image ?? "",
        publisherId: payload.userId,
      },
      include: { publisher: { select: { email: true, username: true } } },
    });

    return Response.json({ success: true, data: bericht }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
