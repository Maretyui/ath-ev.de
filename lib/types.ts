import type { Role } from "./generated/prisma/client";

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  type: "access" | "refresh";
}

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}
