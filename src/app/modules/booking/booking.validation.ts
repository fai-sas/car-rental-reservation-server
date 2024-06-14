import { z } from 'zod'

const dateSchema = z.string().refine(
  (dateString) => {
    // Regex pattern to match "YYYY-MM-DD" format
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateFormatRegex.test(dateString)
  },
  {
    message:
      "Date must be in the format 'YYYY-MM-DD' for Example : '2024-06-15'",
  }
)

const createBookingValidationSchema = z.object({
  body: z.object({
    date: dateSchema,
    user: z.string().min(1, 'User ID is required').optional(),
    car: z.string().min(1, 'Car ID is required'),
    startTime: z.string().min(1, 'Start time is required'),
    // endTime: z.string().min(1, 'End time is required').default('null'),
    totalCost: z.number().default(0),
    isBooked: z.enum(['unconfirmed', 'confirmed']).default('unconfirmed'),
  }),
})

export const BookingValidation = {
  createBookingValidationSchema,
}
