import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditMembers } from "@/lib/abac";
import { memberUpdateSchema } from "@/lib/validation";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/members/[id] — returns single member (authenticated only)
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    verifyToken(token);
  } catch {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) {
    return Response.json(
      { success: false, error: "Member not found" },
      { status: 404 }
    );
  }

  return Response.json({ success: true, data: member });
}

// PUT /api/members/[id] — update member (manager+ only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!canEditMembers(payload.role)) {
    return Response.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const result = memberUpdateSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message).join(", ");
    return Response.json({ success: false, error: errors }, { status: 400 });
  }

  const existing = await prisma.member.findUnique({ where: { id } });
  if (!existing) {
    return Response.json(
      { success: false, error: "Member not found" },
      { status: 404 }
    );
  }

  const { geburtstag, ...rest } = result.data;
  const data: Record<string, unknown> = { ...rest };
  if (geburtstag !== undefined) {
    data.geburtstag = geburtstag ? new Date(geburtstag) : null;
  }

  const member = await prisma.member.update({
    where: { id },
    data,
  });

  return Response.json({ success: true, data: member });
}

// DELETE /api/members/[id] — delete member (manager+ only)
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

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
}
