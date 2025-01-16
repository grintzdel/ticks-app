'use server'

import {ZodError} from 'zod'
import {addJiraSchema, type addJiraData} from '@/schemas/auth/addJira.schema'

interface addJiraResponse {
    success: boolean
    error?: string
}

export async function addJira(formData: addJiraData, token: string): Promise<addJiraResponse> {
    try {
        const validatedData = addJiraSchema.parse(formData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms/jira/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(validatedData),
            cache: 'no-store'
        })

        if (!response.ok) {
            const errorText = await response.text()
            try {
                const errorData = JSON.parse(errorText)
                return {
                    success: false,
                    error: errorData.message || 'Erreur lors de l\'ajout de Jira'
                }
            } catch {
                return {
                    success: false,
                    error: `Erreur ${response.status}`
                }
            }
        }

        return {success: true}
    } catch (error) {
        console.error('Erreur:', error)
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