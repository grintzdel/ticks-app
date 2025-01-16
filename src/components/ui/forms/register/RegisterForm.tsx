'use client'

import {useState, FormEvent} from 'react'

import {useRouter} from 'next/navigation'

import type {RegisterData} from '@/schemas/auth/register.schema'
import type {addJiraData} from '@/schemas/auth/addJira.schema'

import {RegisterResponse} from '@/actions/auth/register'
import {addJira} from '@/actions/auth/addJira'

import {getTempToken} from '@/store/auth/tempToken'
import {clearRegistrationState} from '@/store/auth/registrationState'

import FormField from '@/components/ui/forms/common/FormField'
import PlatformCard from '@/components/ui/forms/register/PlatformCard'
import PlanCard from '@/components/ui/forms/register/PlanCard'

import {SUBSCRIPTION_PLANS} from '@/utils/auth/planData'

interface RegisterFormProps {
    onSubmit: (data: RegisterData) => Promise<RegisterResponse>
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

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (currentStep === 1) {
            const registrationData = {
                firstname: formData.firstname,
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
            const result = await onSubmit(registrationData)
            if (result.success && result.token) {
                setCurrentStep(2)
            }
        } else if (currentStep === 3) {
            const token = getTempToken()
            if (!token) {
                console.error('Token temporaire manquant')
                return
            }

            const jiraData: addJiraData = {
                url: formData.projectUrl,
                emailJira: formData.accountEmail,
                token: formData.apiToken
            }
            try {
                const result = await addJira(jiraData, token)
                if (result.success) {
                    setCurrentStep(4)
                } else {
                    console.error(result.error)
                }
            } catch (error) {
                console.error('Erreur lors de l\'ajout de Jira:', error)
            }
        } else {
            setCurrentStep(currentStep + 1)
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
                    <div className="flex flex-col gap-5">
                        <PlatformCard
                            platformId="jira"
                            onLink={setCurrentStep}
                        />
                        <PlatformCard
                            platformId="trello"
                            onLink={setCurrentStep}
                        />
                        <button
                            onClick={() => setCurrentStep(4)}
                            className="text-[#1E1E1E] text-opacity-50 text-lg font-light mt-8 text-start"
                            type="button"
                        >
                            Ignorer L'étape
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
                    <div className="space-y-6">
                        <div className="flex flex-col gap-6">
                            {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                                <PlanCard
                                    key={plan.id}
                                    {...plan}
                                    isSelected={selectedPlan === null ? null : selectedPlan === plan.id}
                                    onSelect={setSelectedPlan}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                clearRegistrationState()
                                router.push('/login')
                            }}
                            disabled={!selectedPlan}
                            className={`w-full py-3 px-4 rounded-full transition-all ${
                                selectedPlan
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 blur-[0.3px]'
                            }`}
                        >
                            Valider
                        </button>
                    </div>
                )
        }
    }

    return (
        <>
            {renderStepContent()}
        </>
    )
}