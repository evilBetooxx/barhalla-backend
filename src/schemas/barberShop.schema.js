import { z } from "zod";

export const createBarberShopSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  location: z.object({
    city: z.string({ required_error: "City is required" }),
    street: z.string({ required_error: "Street is required" }),
  }),
  services: z.array(
    z.object({
      name: z.string({ required_error: "Service name is required" }),
      price: z.number({ required_error: "Service price is required" }),
    })
  ),
  workingDays: z.object({
    days: z.string({ required_error: "Working days are required" }),
    schedule: z.string({ required_error: "Working schedule is required" }),
  }),
  logoImage: z.string({ required_error: "Logo Image is required" }),
  photos: z.array(
    z.object({
      imageURL: z.string({ required_error: "Image URL is required" }),
    })
  ),
});

export const updateBarberShopSchema = z.object({
  name: z.string({ required_error: "Name is a string" }).optional(),
  description: z
    .string({ required_error: "Description is a string" })
    .optional(),
  location: z
    .object({
      city: z.string({ required_error: "City is a string" }).optional(),
      street: z.string({ required_error: "Street is a string" }).optional(),
    })
    .optional(),
  services: z
    .array(
      z.object({
        name: z
          .string({ required_error: "Service name is a string" })
          .optional(),
        price: z
          .number({ required_error: "Service price is a number" })
          .optional(),
      })
    )
    .optional(),
  workingDays: z
    .object({
      days: z.string({ required_error: "Working days is a string" }).optional(),
      schedule: z
        .string({ required_error: "Working schedule is a string" })
        .optional(),
    })
    .optional(),
  logoImage: z.string({ required_error: "Logo Image is a string" }).optional(),
  photos: z
    .array(
      z.object({
        imageURL: z
          .string({ required_error: "Image URL is a string" })
          .optional(),
      })
    )
    .optional(),
});
