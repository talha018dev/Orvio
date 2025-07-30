import {resetPasswordValidator} from '@/constants/globalConstants'
import {z} from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z.string({required_error: 'Password is required.'}).refine(
      (value) => {
        return resetPasswordValidator.test(value)
      },
      {
        message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
      }
    ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Password doesn’t match.',
    path: ['confirmNewPassword'],
  })
