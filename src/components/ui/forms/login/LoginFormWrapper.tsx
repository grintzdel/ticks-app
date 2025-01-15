'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import LoginForm from '@/components/ui/forms/login/LoginForm'
import FormWrapper from '@/components/ui/forms/common/FormWrapper'
import {login} from '@/actions/auth/login'
import type {LoginData} from '@/schemas/auth/login.schema'

export default function LoginFormWrapper() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

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