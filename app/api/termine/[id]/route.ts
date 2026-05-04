import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditResource, canPublishContent } from "@/lib/abac";
import type { Role } from "@/lib/generated/prisma/client";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const termin = await prisma.termin.findUnique({ where: { id } });

  if (!termin) {
    return Response.json({ success: false, error: "Termin nicht gefunden" }, { status: 404 });
  }

  return Response.json({ success: true, data: termin });
}

function unauthorizedResponse() {
  return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

function badRequest(message: string) {
  return Response.json({ success: false, error: message }, { status: 400 });
}

async function getPayload() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) return null;

  try {
    return verifyToken(authToken);
  } catch {
    return null;
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = await getPayload();

  if (!payload) {
    return unauthorizedResponse();
  }

  const existing = await prisma.termin.findUnique({ where: { id } });

  if (!existing) {
    return Response.json({ success: false, error: "Termin nicht gefunden" }, { status: 404 });
  }

  if (!canEditResource(payload.userId, existing.createdById, payload.role as Role)) {
    return unauthorizedResponse();
  }

  const body = await request.json();
  const { title, date, time, location, description, image } = body;

  if (!title || !date || !time || !location) {
    return badRequest("Title, date, time and location are required.");
  }

  const termin = await prisma.termin.update({
    where: { id },
    data: {
      title,
      date: new Date(date),
      time,
      location,
      description: description ?? "",
      image: image ?? "",
    },
  });

  return Response.json({ success: true, data: termin });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = await getPayload();

  if (!payload) {
    return unauthorizedResponse();
  }

  const existing = await prisma.termin.findUnique({ where: { id } });

  if (!existing) {
    return Response.json({ success: false, error: "Termin nicht gefunden" }, { status: 404 });
  }

  if (!canEditResource(payload.userId, existing.createdById, payload.role as Role)) {
    return unauthorizedResponse();
  }

  await prisma.termin.delete({ where: { id } });
  return Response.json({ success: true });
}
