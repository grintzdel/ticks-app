"use client"

import {useState} from "react"
import {Plus, Loader2} from "lucide-react"


import {CreateProjectDialog} from "@/components/ui/dialog/create-project-dialog"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar"

import TicksLogo from "@/components/SVG/logos/TicksLogo"
import LogoutIcon from "@/components/SVG/icons/LogoutIcon"
import {useProjects} from "@/hooks/useProjects";
import {usePlatforms} from "@/hooks/usePlatforms";

import {logout} from "@/actions/auth/logout";

export function AppSidebar() {
    const {projects, isLoading: projectsLoading, refreshProjects} = useProjects()
    const {platforms, isLoading: platformsLoading} = usePlatforms()
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                    <TicksLogo/>
                </SidebarHeader>

                {projectsLoading ? (
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                    </div>
                ) : (
                    <>

                        <SidebarMenu>
                            <SidebarMenuItem platform="jira">
                                <a href="/create-ticket/example">
                                    Model Ticks
                                </a>
                            </SidebarMenuItem>
                        </SidebarMenu>


                        {projects.map((project) => (
                            <SidebarGroup key={project.id}>
                                <SidebarGroupLabel>{project.title}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem platform={project.type.toLowerCase()}>
                                            <a href={`/create-ticket/${project.info.account}/${project.id}`}>
                                                {project.info.issues}
                                            </a>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton
                    onClick={() => setIsDialogOpen(true)}
                    disabled={projectsLoading}
                >
                    <Plus className="h-4 w-4"/>
                    Lier un projet
                </SidebarMenuButton>

                <SidebarMenuButton>
                    <Plus className="h-4 w-4"/>
                    Ajouter un compte
                </SidebarMenuButton>

                <SidebarMenuButton
                    variant="logout"
                    onClick={() => logout()}
                >
                    <LogoutIcon className="h-4 w-4"/>
                    Déconnexion
                </SidebarMenuButton>
            </SidebarFooter>

            <CreateProjectDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                platforms={platforms}
                onSuccess={refreshProjects}
            />
        </Sidebar>
    )
}