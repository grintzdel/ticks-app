import { z } from 'zod'

export const registerSchema = z.object({
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(4, 'Le mot de passe doit contenir au moins 4 caractères')
})

export type RegisterData = z.infer<typeof registerSchema>