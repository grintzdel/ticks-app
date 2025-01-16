import {z} from 'zod'

export const addJiraSchema = z.object({
    url: z.string()
        .min(14, 'URL invalide')
        .transform(url => {
            url = url.replace(/^https?:\/\//, '')
            url = url.replace(/(.+\.net).*/, '$1')
            return url
        }),
    emailJira: z.string().email('Email invalide'),
    token: z.string().min(4, 'Token invalide'),
})

export type addJiraData = z.infer<typeof addJiraSchema>