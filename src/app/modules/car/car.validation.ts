import { z } from 'zod'

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'The name of the car is required'),
    description: z
      .string()
      .min(1, 'A brief description of the car is required'),
    color: z.string().min(1, 'The color of the car is required'),
    status: z
      .enum(['available', 'unavailable', 'booked', 'returned'])
      .default('available'),
    features: z
      .enum([
        'GPS',
        'Child Seat',
        'Bluetooth',
        'Backup Camera',
        'Heated Seats',
        'Sunroof',
        'All-Wheel Drive',
      ])
      .array()
      .min(1, 'At least one feature is required'),
    pricePerHour: z.number({
      required_error: 'The cost per hour of booking is required',
    }),
    location: z.enum([
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
    ]),
    images: z
      .array(z.string())
      .min(1, 'At least one image of the car is required'),
    year: z.number({
      required_error: 'The manufacturing year of the car is required',
    }),
    model: z.string().min(1, 'The model of the car is required'),
    seats: z.number({
      required_error: 'The number of seats is required',
    }),
    // fuelType: z.string().min(1, 'The fuel type of the car is required'),
    // transmission: z.enum(['automatic', 'manual']).(1, 'The transmission type is required'),
    isDeleted: z.boolean().default(false),
  }),
})

export const CarValidation = {
  createCarValidationSchema,
}
