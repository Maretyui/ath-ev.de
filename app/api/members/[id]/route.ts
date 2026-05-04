import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditMembers } from "@/lib/abac";
import { memberUpdateSchema } from "@/lib/validation";
import { handleError, unauthorizedResponse } from "@/lib/api";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/members/[id] — returns single member (authenticated only)
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return unauthorizedResponse();
    }

    verifyToken(token);

    const member = await prisma.member.findUnique({ where: { id } });
    if (!member) {
      return Response.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: member });
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/members/[id] — update member (manager+ only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return unauthorizedResponse();
    }

    const payload = verifyToken(token);

    if (!canEditMembers(payload.role)) {
      return Response.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const result = memberUpdateSchema.parse(body);

    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing) {
      return Response.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    const { geburtstag, ...rest } = result;
    const data: Record<string, unknown> = { ...rest };
    if (geburtstag !== undefined) {
      data.geburtstag = geburtstag ? new Date(geburtstag) : null;
    }

    const member = await prisma.member.update({
      where: { id },
      data,
    });

    return Response.json({ success: true, data: member });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/members/[id] — delete member (manager+ only)
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return unauthorizedResponse();
    }

    const payload = verifyToken(token);

    if (!canEditMembers(payload.role)) {
      return Response.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing) {
      return Response.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    await prisma.member.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
