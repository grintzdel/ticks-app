'use server'

import {cookies} from 'next/headers'
import {ZodError} from 'zod'
import {Platform} from "@/actions/projects/types"

interface PlatformsResponse {
    success: boolean
    data?: Platform[]
    error?: string
}

export async function fetchUserPlatforms(): Promise<PlatformsResponse> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return {
                success: false,
                error: 'Session expirée, veuillez vous reconnecter'
            }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Erreur lors de la récupération des plateformes'
            }
        }

        return {
            success: true,
            data: data.data
        }
    } catch (error) {
        console.error('Erreur fetchUserPlatforms:', error)
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