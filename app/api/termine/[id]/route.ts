import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditResource } from "@/lib/abac";
import { terminSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";
import type { Role } from "@/lib/generated/prisma/client";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const termin = await prisma.termin.findUnique({ where: { id } });

    if (!termin) {
      return Response.json({ success: false, error: "Termin nicht gefunden" }, { status: 404 });
    }

    return Response.json({ success: true, data: termin });
  } catch (error) {
    return handleError(error);
  }
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
  try {
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
    const { title, date, time, location, description, image } = terminSchema.parse(body);

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
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
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
  } catch (error) {
    return handleError(error);
  }
}
