'use server'

import {cookies} from 'next/headers'
import {loginSchema, type LoginData} from '@/schemas/auth/login.schema'
import {ZodError} from 'zod'

interface LoginResponse {
    success: boolean
    error?: string
    firstConnexion?: boolean
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

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Erreur lors de la connexion'
            }
        }

        const cookieStore = await cookies()
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })

        return {
            success: true,
            firstConnexion: data.firstConnection
        }
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