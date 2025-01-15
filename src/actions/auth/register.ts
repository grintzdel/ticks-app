'use server'

import {registerSchema, type RegisterData} from '@/schemas/auth/register.schema'
import {ZodError} from 'zod'

export interface RegisterResponse {
    success: boolean
    error?: string
}

export async function register(formData: RegisterData): Promise<RegisterResponse> {
    try {
        const validatedData = registerSchema.parse(formData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                error: errorData.message || 'Erreur lors de l\'inscription'
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