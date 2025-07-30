import { z } from "zod";

export const createStageSchema = z.object({
    templateName: z.string({ required_error: "Template name is required." }).optional(),
    stage: z.array(
        z.object({
            stageName: z.string({ required_error: "Stage name is required." }),
            tasks: z.array(
                z.object({
                    taskName: z.string({ required_error: "Task name is required." }),
                })
            )
        })
    )
})