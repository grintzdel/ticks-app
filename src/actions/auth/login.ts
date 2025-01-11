'use server'

import {loginSchema, type LoginData} from '@/schemas/auth/login.schema'
import {ZodError} from 'zod'

interface LoginResponse {
    success: boolean
    error?: string
}

export async function login(formData: LoginData): Promise<LoginResponse> {
    try {
        const validatedData = loginSchema.parse(formData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
            cache: 'no-store'
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                error: errorData.message || 'Erreur lors de la connexion'
            }
        }

        return {success: true}
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                error: error.errors[0].message
            }
        }
        return {
            success: false,
            error: 'Erreur de connexion au serveur'
        }
    }
}