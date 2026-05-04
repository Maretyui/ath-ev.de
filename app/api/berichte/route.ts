import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10)));
  const skip = (page - 1) * limit;

  const [total, berichte] = await Promise.all([
    prisma.bericht.count(),
    prisma.bericht.findMany({
      orderBy: { publishedAt: "desc" },
      include: { publisher: { select: { email: true } } },
      skip,
      take: limit,
    }),
  ]);

  return Response.json({
    success: true,
    data: berichte,
    pagination: { page, limit, total },
  });
}
