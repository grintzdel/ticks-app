'use client'

import {useState, useEffect} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import LoginForm from '@/components/ui/forms/login/LoginForm'
import FormWrapper from '@/components/ui/forms/common/FormWrapper'
import {login} from '@/actions/auth/login'
import type {LoginData} from '@/schemas/auth/login.schema'
import {useConfetti} from '@/hooks/useConfetti'

export default function LoginFormWrapper() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        const fromRegistration = searchParams.get('fromRegistration')
        if (fromRegistration === 'true') {
            setShowConfetti(true)
        }
    }, [searchParams])

    useConfetti(showConfetti)

    const handleLogin = async (formData: LoginData) => {
        try {
            setError(null)
            const result = await login(formData)
            if (result.success) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/')
                    router.refresh()
                }, 1000)
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
            successMessage="Connexion réussie ! Redirection..."
        >
            <LoginForm onSubmit={handleLogin}/>
        </FormWrapper>
    )
}