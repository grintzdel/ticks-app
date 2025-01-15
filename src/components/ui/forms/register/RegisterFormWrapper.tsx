'use client'

import {useState, useEffect} from 'react'
import RegisterForm from '@/components/ui/forms/register/RegisterForm'
import FormWrapper from '@/components/ui/forms/common/FormWrapper'
import {register} from '@/actions/auth/register'
import type {RegisterData} from '@/schemas/auth/register.schema'

interface RegisterFormWrapperProps {
    onStepChange: (step: number) => void
}

export default function RegisterFormWrapper({onStepChange}: RegisterFormWrapperProps) {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    useEffect(() => {
        onStepChange(currentStep)
    }, [currentStep, onStepChange])

    const handleRegister = async (formData: RegisterData) => {
        try {
            setError(null)
            const result = await register(formData)
            if (result.success) {
                setSuccess(true)
            } else {
                setError(result.error || 'Une erreur inconnue est survenue')
            }
        } catch (err) {
            setError('Une erreur est survenue')
        }
    }

    return (
        <FormWrapper
            error={error}
            success={success}
            successMessage="Inscription réussie !"
        >
            <RegisterForm
                onSubmit={handleRegister}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </FormWrapper>
    )
}