import { z } from 'zod';

export const createBarberShopSchema = z.object({
    name: z.string({ required_error: 'Name is required' }),
    location: z.array(
        z.object({
            state: z.string({ required_error: 'State is required' }),
            city: z.string({ required_error: 'City is required' }),
            street: z.string({ required_error: 'Street is required' }),
        })
    ),
    workingDays: z.array(
        z.object({
            day: z.string({ required_error: 'Day is required' }),
            schedule: z.string({ required_error: 'Schedule is required' }),
        })
    ),
    logoImage: z.string({ required_error: 'Logo Image is required' }),
    photos: z.array(
        z.object({
            image: z.string({ required_error: 'Image URL is required' }),
        })
    ),
    owner: z.string({ required_error: 'Owner ID is required' }),
});

export const updateBarberShopSchema = z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    name: z.string({ required_error: 'Name is required' }).optional(),
    location: z.array(
        z.object({
            state: z.string({ required_error: 'State is required' }).optional(),
            city: z.string({ required_error: 'City is required' }).optional(),
            street: z.string({ required_error: 'Street is required' }).optional(),
        })
    ).optional(),
    workingDays: 
        z.object({
            day: z.string({ required_error: 'Day is required' }).optional(),
            schedule: z.string({ required_error: 'Schedule is required' }).optional(),
        }),
    logoImage: z.string({ required_error: 'Logo Image is required' }).optional(),
    photos: z.array(
        z.object({
            image: z.string({ required_error: 'Image URL is required' }).optional(),
        })
    ).optional(),
    owner: z.string({ required_error: 'Owner ID is required' }).optional(),
});

