'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import RegisterForm from '@/components/ui/forms/register/RegisterForm'
import FormWrapper from '@/components/ui/forms/common/FormWrapper'
import {register} from '@/actions/auth/register'
import type {RegisterData} from '@/schemas/auth/register.schema'
import {RegisterResponse} from '@/actions/auth/register'
import {REGISTER_STEPS} from '@/utils/auth/RegisterSteps'
import {setTempToken} from '@/store/auth/tempToken'
import {setRegistrationStep} from '@/store/auth/registrationState'

interface RegisterFormWrapperProps {
    currentStep: number
    onStepChange: (step: number) => void
}

export default function RegisterFormWrapper({currentStep, onStepChange}: RegisterFormWrapperProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleRegister = async (formData: RegisterData): Promise<RegisterResponse> => {
        try {
            setError(null)
            const result = await register(formData)

            if (result.success && result.token) {
                setTempToken(result.token)
                setRegistrationStep(currentStep + 1)
                onStepChange(currentStep + 1)
                return result
            } else {
                setError(result.error || 'Une erreur inconnue est survenue')
            }
            return result
        } catch (err) {
            setError('Une erreur est survenue')
            return {success: false, error: 'Une erreur est survenue'}
        }
    }

    return (
        <FormWrapper
            error={error}
            success={success}
            successMessage="Inscription réussie ! Redirection vers la connexion..."
        >
            <RegisterForm
                onSubmit={handleRegister}
                currentStep={currentStep}
                setCurrentStep={onStepChange}
            />
        </FormWrapper>
    )
}