import { z } from "zod";

const strongPassword = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: strongPassword,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: strongPassword,
});

export const terminSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(120, "Title is too long"),
  date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Date must be YYYY-MM-DD"),
  time: z.string().min(4, "Time is required").max(5, "Time is invalid"),
  location: z.string().min(3, "Location is required").max(120, "Location is too long"),
  description: z.string().max(5000).optional(),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  street: z.string().min(3, "Street is required").max(150, "Street is too long"),
  plz: z.string().min(4, "PLZ must be at least 4 characters").max(10, "PLZ is too long"),
  ort: z.string().min(2, "City is required").max(100, "City is too long"),
  telefon: z.string().min(5, "Phone number is too short").max(30, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
  geburtstag: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Date must be YYYY-MM-DD").optional().or(z.literal("")),
  jugend: z.boolean().optional(),
});

export const memberUpdateSchema = memberSchema.partial();
