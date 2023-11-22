import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" }),
  lastName: z.string({ required_error: "Last Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Contraseña inválida" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Contraseña inválida" }),
});
