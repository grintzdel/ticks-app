'use client'

import {useState, FormEvent} from 'react'
import FormField from '@/components/ui/forms/common/FormField'
import type {RegisterData} from '@/schemas/auth/register.schema'

interface RegisterFormProps {
    onSubmit: (data: RegisterData) => Promise<void>
    currentStep: number
    setCurrentStep: (step: number) => void
}

export default function RegisterForm({onSubmit, currentStep, setCurrentStep}: RegisterFormProps) {
    const [formData, setFormData] = useState({
        firstname: '',
        name: '',
        email: '',
        password: '',
        projectUrl: '',
        accountEmail: '',
        apiToken: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        } else {
            await onSubmit({
                firstname: formData.firstname,
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
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
            case 2:
                return (
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="w-full p-4 border-2 border-[#007AFF] rounded-xl hover:bg-[#007AFF] hover:text-white transition-colors"
                        >
                            Compte Personnel
                        </button>
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="w-full p-4 border-2 border-[#007AFF] rounded-xl hover:bg-[#007AFF] hover:text-white transition-colors"
                        >
                            Compte Professionnel
                        </button>
                    </div>
                )
            case 3:
                return (
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="Url de votre projet"
                            type="text"
                            value={formData.projectUrl}
                            onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                            placeholder="https://votre-projet.atlassian.net"
                            required
                        />
                        <FormField
                            label="Email de votre compte"
                            type="email"
                            value={formData.accountEmail}
                            onChange={(e) => setFormData({...formData, accountEmail: e.target.value})}
                            placeholder="email@exemple.com"
                            required
                        />
                        <FormField
                            label="API Token Jira"
                            type="text"
                            value={formData.apiToken}
                            onChange={(e) => setFormData({...formData, apiToken: e.target.value})}
                            placeholder="Votre token API"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Continuer
                        </button>
                    </form>
                )
            case 4:
                return (
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="Url de votre projet"
                            type="text"
                            value={formData.projectUrl}
                            onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                            placeholder="https://votre-projet.atlassian.net"
                            required
                        />
                        <FormField
                            label="Email de votre compte"
                            type="email"
                            value={formData.accountEmail}
                            onChange={(e) => setFormData({...formData, accountEmail: e.target.value})}
                            placeholder="email@exemple.com"
                            required
                        />
                        <FormField
                            label="API Token Jira"
                            type="text"
                            value={formData.apiToken}
                            onChange={(e) => setFormData({...formData, apiToken: e.target.value})}
                            placeholder="Votre token API"
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
    }

    return (
        <>
            {renderStepContent()}
        </>
    )
}