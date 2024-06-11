import { z } from 'zod'

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'The name of the car is required'),
    description: z
      .string()
      .min(1, 'A brief description of the car is required'),
    color: z.string().min(1, 'The color of the car is required'),
    isElectric: z.boolean({
      required_error: 'It must be specified if the car is electric',
    }),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()).min(1, 'Features of the car are required'),
    pricePerHour: z.number({
      required_error: 'The cost per hour of booking is required',
    }),
    isDeleted: z.boolean().default(false),
  }),
})

export const CarValidation = {
  createCarValidationSchema,
}
