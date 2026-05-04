import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import type { JwtPayload } from "@/lib/types";

export function unauthorizedResponse() {
  return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function getAuthPayload(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    return verifyToken(authToken);
  } catch {
    return null;
  }
}
