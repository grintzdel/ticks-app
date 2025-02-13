'use server'

import {cookies} from 'next/headers'
import {CreateProjectData} from '@/schemas/projects/create-project.schema'

import {Project} from "@/actions/projects/types"


interface ProjectsResponse {
    success: boolean
    data?: Project[]
    error?: string
}

export async function fetchUserProjects(): Promise<ProjectsResponse> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return {
                success: false,
                error: 'Session expirée, veuillez vous reconnecter'
            }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/projects/get`, {
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
                error: data.message || 'Erreur lors de la récupération des projets'
            }
        }

        const projects = Array.isArray(data) ? data : data.data

        return {
            success: true,
            data: projects
        }
    } catch (error) {
        console.error('Erreur complète:', error)
        return {
            success: false,
            error: 'Erreur de connexion au serveur'
        }
    }
}

export async function createProject(data: CreateProjectData): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return {
                success: false,
                error: 'Session expirée, veuillez vous reconnecter'
            }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/projects/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Réponse serveur:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            })
            return {
                success: false,
                error: errorData.message || 'Erreur lors de la création du projet'
            }
        }

        return {success: true}
    } catch (error) {
        console.error('Erreur complète:', error)
        return {
            success: false,
            error: 'Erreur de connexion au serveur'
        }
    }
}