import { einValidator, emailValidator, resetPasswordValidator } from '@/constants/globalConstants'
import { z } from 'zod'

export const VendorSetupStep1Schema = z.object({
  vendorEmail: z.string({required_error: 'Email address is required.'}).refine(
    (value) => {
      return !value || emailValidator.test(value)
    },
    {
      message: 'Invalid email address.',
    }
  ),
  vendorName: z.string({required_error: 'Company name is required.'}),
  vendorPhone: z.string({required_error: 'Phone is required.'}),
})
export const VendorSetupStep2Schema = z.object({
  ein: z
    .string({required_error: 'EIN is required.'})
    .refine(
      (value) => {
        return !value || einValidator.test(value)
      },
      {
        message: 'Invalid format: Use "23456789" pattern.',
      }
    ),
  addressLine: z.string({required_error: 'Address is required.'}),
  zip: z.string({required_error: 'Zip is required.'}),
})
export const VendorSetupStep3Schema = z
  .object({
    name: z.string({required_error: 'User name is required.'}),
    email: z.string({required_error: 'Email address is required.'}).refine(
      (value) => {
        return !value || emailValidator.test(value)
      },
      {
        message: 'Invalid email address.',
      }
    ),
    phone: z.string({required_error: 'Phone is required.'}),
    password: z.string({required_error: 'Password is required.'}).refine(
      (value) => {
        return resetPasswordValidator.test(value)
      },
      {
        message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password doesn’t match.',
    path: ['confirmPassword'],
  })
