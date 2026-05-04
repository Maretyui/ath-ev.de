import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canPublishContent } from "@/lib/abac";
import { terminSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";
import type { Role } from "@/lib/generated/prisma/client";

function parseBoolean(value: string | null) {
  return value === "true" || value === "1";
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10)));
    const upcoming = parseBoolean(url.searchParams.get("upcoming"));
    const createdById = url.searchParams.get("createdById") ?? undefined;
    const now = new Date();

    const where = {
      ...(upcoming ? { date: { gte: now } } : {}),
      ...(createdById ? { createdById } : {}),
    };

    const [total, termine] = await Promise.all([
      prisma.termin.count({ where }),
      prisma.termin.findMany({
        where,
        orderBy: { date: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return Response.json({ success: true, data: termine, pagination: { page, limit, total } });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      return unauthorizedResponse();
    }

    const payload = verifyToken(authToken);

    if (!canPublishContent(payload.role as Role)) {
      return Response.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, date, time, location, description, image } = terminSchema.parse(body);

    const termin = await prisma.termin.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
        description: description ?? "",
        image: image ?? "",
        createdById: payload.userId,
      },
    });

    return Response.json({ success: true, data: termin }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
