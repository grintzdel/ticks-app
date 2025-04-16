import { z } from "zod"

export const createTicketSchema = z.object({
   id_type_champs: z.number({
    required_error: "L'ID du type de champ est requis"
    }),
    prompt: z.string({
        required_error: "Le prompt est requis"
    })
})

export type CreateProjectData = z.infer<typeof createTicketSchema>