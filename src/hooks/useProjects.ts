import {useState, useEffect} from 'react'
import {Project} from "@/actions/projects/types"
import {fetchUserProjects} from "@/actions/projects/projects"

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadProjects = async () => {
        try {
            setIsLoading(true)

            const response = await fetchUserProjects()

            if (response.success && response.data) {
                setProjects(response.data)
            }
        } catch (error) {
            console.error('Erreur chargement projets:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadProjects();
    }, [])

    return {projects, isLoading, refreshProjects: loadProjects}
}