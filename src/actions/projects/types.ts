export interface Project {
    id: number
    title: string
    type: string
    info: {
        account: number
        issues: string
    }
}

export interface PlatformProject {
    projectId: number
    name: string
    issuesType: Array<{
        id: string
        name: string
    }>
}

export interface Platform {
    id: number
    type: string
    projects: PlatformProject[]
}