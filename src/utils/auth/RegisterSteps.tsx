interface StepContent {
    title: string
    description: string
}

export const REGISTER_STEPS: Record<number, StepContent> = {
    1: {
        title: "Bienvenue à bord ! 🎉",
        description: "Aujourd'hui marque le début d'une nouvelle aventure. Inscris-toi maintenant et commence à gérer tes projets !"
    },
    2: {
        title: "Relie tes projets en un instant ! 🚀",
        description: "Connecte Ticks à Jira ou Trello et simplifie ta gestion dès maintenant."
    },
    3: {
        title: "Prêt à vous connecter !",
        description: "Saisissez l'URL de votre Jira, l'e-mail associé à votre compte, et votre API Token. En quelques instants, Ticks sera synchronisé pour simplifier votre gestion de projet !"
    },
    4: {
        title: "Dernière étape",
        description: "Plus que quelques informations et c'est bon !"
    }
}