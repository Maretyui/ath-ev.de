import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canPublishContent } from "@/lib/abac";
import type { Role } from "@/lib/generated/prisma/client";

function parseBoolean(value: string | null) {
  return value === "true" || value === "1";
}

function unauthorizedResponse() {
  return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

function badRequest(message: string) {
  return Response.json({ success: false, error: message }, { status: 400 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10)));
  const upcoming = parseBoolean(url.searchParams.get("upcoming"));
  const now = new Date();

  const where = upcoming ? { date: { gte: now } } : undefined;

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
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return unauthorizedResponse();
  }

  let payload;
  try {
    payload = verifyToken(authToken);
  } catch {
    return unauthorizedResponse();
  }

  if (!canPublishContent(payload.role as Role)) {
    return unauthorizedResponse();
  }

  const body = await request.json();
  const { title, date, time, location, description, image } = body;

  if (!title || !date || !time || !location) {
    return badRequest("Title, date, time and location are required.");
  }

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
}
