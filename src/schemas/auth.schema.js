import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string({ required_error: "Nombre requerido" }),
  lastName: z.string({ required_error: "Apellido requerido" }),
  email: z
    .string({ required_error: "Email requerido" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Contaseña requerida" })
    .min(6, { message: "Contraseña inválida" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email requerido" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Contaseña requerida" })
    .min(6, { message: "Contraseña inválida" }),
});
