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
            <main className="w-full
            p-[30px]
            md:p-[45px]
            xl:p-[60px]
            ">
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    )
}