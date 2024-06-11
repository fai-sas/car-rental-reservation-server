import { z } from 'zod'

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.date().min(new Date(), 'Booking date is required'),
    user: z.string().min(1, 'User ID is required'),
    car: z.string().min(1, 'Car ID is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    totalCost: z.number().default(0),
    isBooked: z.enum(['unconfirmed', 'confirmed']).default('unconfirmed'),
  }),
})

export const BookingValidation = {
  createBookingValidationSchema,
}
