import React from 'react'
import JiraLogo from '@/components/SVG/logos/JiraLogo'
import TrelloLogo from '@/components/SVG/logos/TrelloLogo'

type LogoProps = {
    className?: string
}

export const platforms = {
    jira: {
        name: 'Jira',
        logo: (props: LogoProps) => <JiraLogo {...props} />,
        nextStep: 3
    },
    trello: {
        name: 'Trello',
        logo: (props: LogoProps) => <TrelloLogo {...props} />,
        nextStep: 3
    }
} as const