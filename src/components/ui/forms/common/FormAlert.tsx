interface FormAlertProps {
    type: 'error' | 'success'
    message: string
}

export default function FormAlert({type, message}: FormAlertProps) {
    const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100'
    const textColor = type === 'error' ? 'text-red-700' : 'text-green-700'

    return (
        <div className={`mb-4 p-3 ${bgColor} ${textColor} rounded`}>
            {message}
        </div>
    )
}