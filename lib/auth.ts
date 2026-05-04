import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { JwtPayload } from "./types";
import type { Role } from "./generated/prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY = Number(process.env.JWT_EXPIRY ?? 900);
const REFRESH_EXPIRY = Number(process.env.REFRESH_EXPIRY ?? 604800);

export function createTokens(userId: string, email: string, role: Role) {
  const accessPayload: Omit<JwtPayload, "iat" | "exp"> = {
    userId,
    email,
    role,
    type: "access",
  };
  const refreshPayload: Omit<JwtPayload, "iat" | "exp"> = {
    userId,
    email,
    role,
    type: "refresh",
  };

  const authToken = jwt.sign(accessPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
  const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRY,
  });

  return { authToken, refreshToken };
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
