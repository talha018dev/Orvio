import { z } from "zod"
import moment from 'moment'
import { emailValidator } from "@/constants/globalConstants";

export const createProjectStepOneSchema = z.object({
    projectName: z.string({ required_error: "Project title/name is required." }),
    projectType: z.object({
        value: z.string({ required_error: "Project type is required." }),
        label: z.string({ required_error: "Project type is required." }),
    }),
    brief: z.string().max(2000, "Project brief must be at most 2000 characters.").optional(),
})

export const createProjectStepTwoSchema = z.object({
    budget: z.string({ required_error: "Budget is required." }).refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        { message: "Budget must be a number greater then or equal to 0.00" }
    ),
    endDate: z.union([z.string(), z.date(), z.null()]).optional().refine(
        (date) => {
            if (date === "" || date === undefined || date === null) return true; // Allow empty string
            return moment(date).isSameOrAfter(moment(), "day"); // Validate if it's a date
        },
        { message: "End date must be today or a future date." }
    ),
    collaborators: z.array(z.object({
        value: z.string({ required_error: "Collaborators is required." }),
        label: z.string({ required_error: "Collaborators is required." }),
    }))
    // .nonempty({ message: "Collaborators is required." }),
})
export const createProjectStepThreeSchema = z.object({
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
