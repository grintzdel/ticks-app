import {z} from 'zod'

export const addJiraSchema = z.object({
    url: z.string()
        .min(14, 'URL invalide')
        .transform(url => url.replace(/^https?:\/\//, '')),
    emailjira: z.string().email('Email invalide'),
    token: z.string().min(4, 'Token invalide'),
})

export type addJiraData = z.infer<typeof addJiraSchema>