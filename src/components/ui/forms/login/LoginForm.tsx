'use client'

import {useState, FormEvent} from 'react'

import FormField from '@/components/ui/forms/common/FormField'
import type {LoginData} from '@/schemas/auth/login.schema'

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
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Se connecter
            </button>
        </form>
    )
}