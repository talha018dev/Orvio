import { emailValidator, resetPasswordValidator } from "@/constants/globalConstants"
import { z } from "zod"

export const updateProfileSchema = z.object({
    email: z
        .string({ required_error: "Email address is required." })
        .refine(
            (value) => {
                return !value || emailValidator.test(value)
            },
            {
                message: 'Invalid email address.',
            }
        ),
    name: z.string({ required_error: "Client name is required." }),
    phone: z.string({ required_error: "Phone is required." }),

})

export const changePasswordSchema = z.object({
    oldPassword: z.string(),
    password: z.string({ required_error: "Password is required." })
        .refine((value) => {
            return resetPasswordValidator.test(value)
        }, {
            message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
        }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn’t match.",
    path: ["confirmPassword"],
})