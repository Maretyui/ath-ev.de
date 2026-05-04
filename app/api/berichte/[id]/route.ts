import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditResource } from "@/lib/abac";
import { berichtSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";
import type { Role } from "@/lib/generated/prisma/client";

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

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const bericht = await prisma.bericht.findUnique({
      where: { id },
      include: { publisher: { select: { email: true, username: true } } },
    });

    if (!bericht) {
      return Response.json({ success: false, error: "Bericht nicht gefunden" }, { status: 404 });
    }

    return Response.json({ success: true, data: bericht });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = await getPayload();

    if (!payload) return unauthorizedResponse();

    const existing = await prisma.bericht.findUnique({ where: { id } });

    if (!existing) {
      return Response.json({ success: false, error: "Bericht nicht gefunden" }, { status: 404 });
    }

    if (!canEditResource(payload.userId, existing.publisherId, payload.role as Role)) {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, image } = berichtSchema.parse(body);

    const bericht = await prisma.bericht.update({
      where: { id },
      data: { title, content, image: image ?? "" },
      include: { publisher: { select: { email: true, username: true } } },
    });

    return Response.json({ success: true, data: bericht });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = await getPayload();

    if (!payload) return unauthorizedResponse();

    const existing = await prisma.bericht.findUnique({ where: { id } });

    if (!existing) {
      return Response.json({ success: false, error: "Bericht nicht gefunden" }, { status: 404 });
    }

    if (!canEditResource(payload.userId, existing.publisherId, payload.role as Role)) {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await prisma.bericht.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
