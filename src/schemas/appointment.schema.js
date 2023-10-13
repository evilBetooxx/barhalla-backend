import { z } from 'zod';

export const createAppointmentSchema = z.object({
    clientID: z.string({ required_error: 'Client ID is required' }),
    barberShopID: z.string({ required_error: 'Barber Shop ID is required' }),
    appointmentDate: z.string({ required_error: 'Appointment Date is required' }),
    appointmentTime: z.string({ required_error: 'Appointment Time is required' }),
});

export const updateAppointmentSchema = z.object({
    clientID: z.string({ required_error: 'Client ID is required' }).optional(),
    barberShopID: z.string({ required_error: 'Barber Shop ID is required' }).optional(),
    appointmentDate: z.string({ required_error: 'Appointment Date is required' }).optional(),
    appointmentTime: z.string({ required_error: 'Appointment Time is required' }).optional(),
});

