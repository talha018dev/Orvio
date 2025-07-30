import { z } from "zod";

export const addFileLinkSchema = z.object({
    expirationDate: z.object({
        value: z.string({ required_error: "Expiration date is required." }),
        label: z.string({ required_error: "Expiration date is required." }),
    }),
    files: z.array(
        z.object({
            url: z.string({ required_error: "Files is required." }),
        })
    ).nonempty({ message: "At least one file is required." }),
})