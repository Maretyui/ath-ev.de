import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const bericht = await prisma.bericht.findUnique({
    where: { id },
    include: { publisher: { select: { email: true } } },
  });

  if (!bericht) {
    return Response.json({ success: false, error: "Bericht nicht gefunden" }, { status: 404 });
  }

  return Response.json({ success: true, data: bericht });
}
