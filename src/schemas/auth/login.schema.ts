import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(4, 'Le mot de passe doit contenir au moins 4 caractères')
})

export type LoginData = z.infer<typeof loginSchema>