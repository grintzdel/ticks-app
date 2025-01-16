export const setRegistrationStep = (step: number) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('registration_step', step.toString())
    }
}

export const getRegistrationStep = (): number | null => {
    if (typeof window !== 'undefined') {
        const step = localStorage.getItem('registration_step')
        return step ? parseInt(step) : null
    }
    return null
}

export const clearRegistrationState = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('registration_step')
        localStorage.removeItem('temp_token')
    }
}