import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { canEditMembers } from "@/lib/abac";
import { memberSchema } from "@/lib/validation";

// GET /api/members — returns all members (authenticated only)
export async function GET(request: NextRequest) {
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

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "name";
  const order = searchParams.get("order") ?? "asc";

  // Validate sort column
  const validSortColumns = [
    "name",
    "street",
    "plz",
    "ort",
    "telefon",
    "email",
    "geburtstag",
    "jugend",
  ];
  const sortColumn = validSortColumns.includes(sort) ? sort : "name";
  const sortOrder = order === "desc" ? "desc" : "asc";

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const members = await prisma.member.findMany({
    where,
    orderBy: { [sortColumn]: sortOrder },
  });

  const total = members.length;
  const jugendliche = members.filter((m) => m.jugend).length;

  return Response.json({
    success: true,
    data: members,
    total,
    jugendliche,
    role: payload.role,
  });
}

// POST /api/members — create new member (manager+ only)
export async function POST(request: NextRequest) {
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

  const result = memberSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message).join(", ");
    return Response.json({ success: false, error: errors }, { status: 400 });
  }

  const { name, street, plz, ort, telefon, email, geburtstag, jugend } =
    result.data;

  const member = await prisma.member.create({
    data: {
      name,
      street,
      plz,
      ort,
      telefon,
      email,
      geburtstag: geburtstag ? new Date(geburtstag) : null,
      jugend: jugend ?? false,
      createdBy: payload.userId,
    },
  });

  return Response.json({ success: true, data: member }, { status: 201 });
}
