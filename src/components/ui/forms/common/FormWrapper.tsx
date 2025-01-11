import FormAlert from '@/components/ui/forms/common/FormAlert'

interface FormWrapperProps {
    error: string | null
    success: boolean
    successMessage: string
    children: React.ReactNode
}

export default function FormWrapper({
                                        error,
                                        success,
                                        successMessage,
                                        children
                                    }: FormWrapperProps) {
    return (
        <>
            {error && <FormAlert type="error" message={error}/>}
            {success && <FormAlert type="success" message={successMessage}/>}
            {children}
        </>
    )
}