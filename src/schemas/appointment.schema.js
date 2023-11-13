import { z } from "zod";

export const createAppointmentSchema = z.object({
  date: z.string({ required_error: "Date is required" }),
  time: z.string({ required_error: "Time is required" }),
  clientID: z.string({ required_error: "Client ID is required" }),
  barberShopID: z.string({ required_error: "Barber Shop ID is required" }),
  paymentID: z.string({ required_error: "Payment ID is required" }),
});

export const updateAppointmentSchema = z.object({
  date: z.string({ required_error: "Date is required" }).optional(),
  time: z.string({ required_error: "Time is required" }).optional(),
  clientID: z.string({ required_error: "Client ID is required" }).optional(),
  barberShopID: z
    .string({ required_error: "Barber Shop ID is required" })
    .optional(),
  paymentID: z.string({ required_error: "Payment ID is required" }).optional(),
});
