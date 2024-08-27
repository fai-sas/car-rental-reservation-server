import { z } from 'zod'

const signUpUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name cannot be more than 50 characters'),
    // email: z.string(),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    confirmPassword: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    role: z.enum(['user', 'admin']).default('user'),
    // phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Description is required'),
    // termsAccepted: z.boolean({
    //   message: 'Terms and Conditions need to accepted',
    // }),
  }),
})

const signInUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

export const UserValidation = {
  signUpUserValidationSchema,
  signInUserValidationSchema,
  refreshTokenValidationSchema,
}
