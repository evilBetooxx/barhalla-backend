import { z } from 'zod';

//export const createClientSchema = z.object({
//    firstName: z.string({ required_error: 'First name is required' }),
//    lastName: z.string({ required_error: 'Last name is required' }),
//    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
//    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters long' }),
// });

export const updateClientSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' }).optional(),
    lastName: z.string({ required_error: 'Last name is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }).optional(),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters long' }).optional(),
});
