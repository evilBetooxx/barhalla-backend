import { z } from "zod";

export const createReviewSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  comment: z.string({ required_error: "Comment is required" }),
  rating: z.number({ required_error: "Rating is required" }),
  clientID: z.string({ required_error: "Client ID is required" }),
  barberShopID: z.string({ required_error: "BarberShop ID is required" }),
});

export const updateReviewSchema = z.object({
  title: z.string({ required_error: "Title is a string" }).optional(),
  comment: z.string({ required_error: "Comment is a string" }).optional(),
  rating: z.number({ required_error: "Rating is a number" }).optional(),
  clientID: z.string({ required_error: "Client ID is a string" }).optional(),
  barberShopID: z
    .string({ required_error: "BarberShop ID is a string" })
    .optional(),
});
