import { z } from "zod"

export const createProjectSchema = z.object({
    type: z.string({
        required_error: "Le type est requis"
    }),
    title: z.string({
        required_error: "Le titre est requis"
    }),
    info: z.object({
        account: z.number({
            required_error: "L'ID du compte est requis"
        }),
        id: z.number({
            required_error: "L'ID du projet est requis"
        }),
        issues: z.number({
            required_error: "L'ID du type de ticket est requis"
        })
    })
})

export type CreateProjectData = z.infer<typeof createProjectSchema>