'use client'

import {useState, FormEvent} from 'react'

import FormField from '@/components/ui/forms/common/FormField'
import type {RegisterData} from '@/schemas/auth/register.schema'

interface RegisterFormProps {
    onSubmit: (data: RegisterData) => Promise<void>
}

export default function RegisterForm({onSubmit}: RegisterFormProps) {
    const [formData, setFormData] = useState({
        firstname: '',
        name: '',
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
                label="Prénom"
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                placeholder="Jean"
                required
            />
            <FormField
                label="Nom"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Dupont"
                required
            />
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
                placeholder="Au moins 8 caractères"
                required
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                S'inscrire
            </button>
        </form>
    )
}