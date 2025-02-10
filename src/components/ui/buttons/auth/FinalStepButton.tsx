'use client'

import { useRouter } from 'next/navigation'
import SubmitButton from './SubmitButton'
import { clearRegistrationState } from '@/store/auth/registrationState'

interface FinalStepButtonProps {
    selectedPlan: string | null
}

export default function FinalStepButton({ selectedPlan }: FinalStepButtonProps) {
    const router = useRouter()

    const handleClick = () => {
        clearRegistrationState()
        router.push('/login?fromRegistration=true')
    }

    return (
        <SubmitButton
            text="Terminer l'inscription"
            type="button"
            variant="full"
            disabled={!selectedPlan}
            onClick={handleClick}
        />
    )
}