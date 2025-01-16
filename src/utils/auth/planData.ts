interface PlanFeature {
    text: string
    available: boolean
}

interface Plan {
    id: string
    name: string
    description: string
    features: PlanFeature[]
    price: {
        amount: string
        unit: string
    }
    recommended?: boolean
}

export const SUBSCRIPTION_PLANS: Record<string, Plan> = {
    free: {
        id: 'free',
        name: 'Gratuit',
        description: 'Continuer avec notre solution gratuite',
        features: [
            {text: '10 tickets offerts par mois', available: true},
            {text: 'API illimitée', available: false},
        ],
        price: {
            amount: '0€',
            unit: '/mois'
        }
    },
    pro: {
        id: 'pro',
        name: 'Premium',
        description: 'Passer a une solution qui vous changeras la vie',
        features: [
            {text: 'Tickets illimités', available: true},
            {text: 'Toutes les intégrations', available: true},
            {text: 'Support prioritaire', available: true},
        ],
        price: {
            amount: '0.01€',
            unit: '/ticket'
        },
        recommended: true
    }
}