export const setTempToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('temp_token', token)
    }
}

export const getTempToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('temp_token')
        return token
    }
    return null
}