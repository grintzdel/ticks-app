'use client'

import {useState, FormEvent} from 'react'

import Link from 'next/link'

import FormField from '@/components/ui/forms/common/FormField'
import type {LoginData} from '@/schemas/auth/login.schema'

import SubmitButton from '@/components/ui/buttons/auth/SubmitButton'

interface LoginFormProps {
    onSubmit: (data: LoginData) => Promise<void>
}

export default function LoginForm({onSubmit}: LoginFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await onSubmit(formData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Exemple@gmail.com"
                    required
                />
                <FormField
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Votre mot de passe"
                    required
                />
                <SubmitButton text="Se connecter" variant="full"/>
            </form>
            <p className="text-center mt-6 text-[#313957] text-xl">
                Vous n'avez pas de compte ? {' '}
                <Link
                    href="/register"
                    className="text-[#313957] text-xl underline"
                >
                    Inscrivez-vous
                </Link>
            </p>
        </>
    )
}