import { cookies } from "next/headers";
import { ZodError } from "zod";
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

/**
 * Unified error handler for API routes.
 * Converts ZodError and other exceptions to consistent HTTP responses.
 */
export function handleError(error: unknown): Response {
  if (error instanceof ZodError) {
    const details = error.flatten().fieldErrors;
    return Response.json(
      {
        success: false,
        error: "Validation error",
        details,
      },
      { status: 400 }
    );
  }

  if (error instanceof Error && error.message === "Unauthorized") {
    return unauthorizedResponse();
  }

  // Generic server error
  console.error("API Error:", error);
  return Response.json(
    { success: false, error: "Server error" },
    { status: 500 }
  );
}
