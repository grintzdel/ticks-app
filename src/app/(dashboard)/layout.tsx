import React from "react";

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar/sidebar"
import {AppSidebar} from "@/components/ui/sidebar/app-sidebar"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    )
}