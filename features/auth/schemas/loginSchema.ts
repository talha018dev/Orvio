import { emailValidator, isEmptyString } from "@/constants/globalConstants"
import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email address is required." })
        // .refine(isEmptyString, {
        //     message: 'Email address is required.',
        // })
        .refine(
            (value) => {
                return !value || emailValidator.test(value)
            },
            {
                message: 'Invalid email address.',
            }
        ),
    password: z.string({ required_error: "Password is required." })
        // .refine(isEmptyString, {
        //     message: 'Password is required.',
        // }),
})
