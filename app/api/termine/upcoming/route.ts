import { prisma } from "@/lib/prisma";

export async function GET() {
  const termine = await prisma.termin.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 4,
  });

  return Response.json({ success: true, data: termine });
}
