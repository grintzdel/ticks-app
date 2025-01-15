'use server'

import {addJiraSchema, type addJiraData} from '@/schemas/auth/addJira.schema'
import {ZodError} from 'zod'

interface addJiraResponse {
    success: boolean
    error?: string
}

export async function addJira(formData: addJiraData): Promise<addJiraResponse> {
    try {
        const validatedData = addJiraSchema.parse(formData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms/jira/add`, {
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