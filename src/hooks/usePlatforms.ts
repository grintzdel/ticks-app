import { useState, useEffect } from 'react'
import { Platform } from "@/actions/projects/types"
import { fetchUserPlatforms } from "@/actions/projects/platforms"

export function usePlatforms() {
    const [platforms, setPlatforms] = useState<Platform[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadPlatforms = async () => {
        try {
            setIsLoading(true)
            const response = await fetchUserPlatforms()
            if (response.success && response.data) {
                setPlatforms(response.data)
            }
        } catch (error) {
            console.error('Erreur chargement plateformes:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPlatforms();
    }, [])

    return { platforms, isLoading, refreshPlatforms: loadPlatforms }
}