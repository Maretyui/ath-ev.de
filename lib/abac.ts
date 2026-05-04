import type { Role } from "./generated/prisma/client";

const ROLE_RANK: Record<Role, number> = {
  user: 1,
  publisher: 2,
  manager: 3,
  admin: 4,
};

export function hasRole(userRole: Role, required: Role): boolean {
  return ROLE_RANK[userRole] >= ROLE_RANK[required];
}

export function canViewMembers(role: Role): boolean {
  return hasRole(role, "user");
}

export function canEditMembers(role: Role): boolean {
  return hasRole(role, "manager");
}

export function canPublishContent(role: Role): boolean {
  return hasRole(role, "publisher");
}

export function canManageUsers(role: Role): boolean {
  return hasRole(role, "admin");
}

export function canEditResource(
  userId: string,
  resourceOwnerId: string,
  role: Role
): boolean {
  return userId === resourceOwnerId || role === "admin";
}
