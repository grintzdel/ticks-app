import React from "react";

import type {Metadata} from "next"
import {Public_Sans} from "next/font/google"
import "./globals.css"
import {Toaster} from "sonner";

export const metadata: Metadata = {
    title: "Ticks - Solution IA pour la création de tickets",
    description: "Créez des tickets, gérez vos issues et synchronisez-les avec Jira ou Trello.",
}

const publicSans = Public_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: '--font-public-sans',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={`${publicSans.variable}`}>
        <body>
        {children}
        <Toaster/>
        </body>
        </html>
    )
}