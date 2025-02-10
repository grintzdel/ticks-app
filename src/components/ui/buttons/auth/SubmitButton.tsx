export type ButtonVariant = 'full' | 'rounded' | 'blank'

interface SubmitButtonProps {
    text: string
    disabled?: boolean
    onClick?: () => void
    type?: 'submit' | 'button'
    className?: string
    variant?: ButtonVariant
}

export default function SubmitButton({
    text,
    disabled = false,
    onClick,
    type = 'submit',
    className = '',
    variant = 'full'
}: SubmitButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'full':
                return 'w-full rounded-[14px] font-semibold text-[23px] py-3 px-4'
            case 'rounded':
                return 'w-auto rounded-full py-[7px] px-[25px] font-semibold text-[15px]'
            case 'blank':
                return 'text-start text-[18px] text-[#1E1E1E] text-opacity-50 font-light mt-[30px]'    
            default:
                return 'w-full rounded-[14px] py-3 px-4'
        }
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`transition-all duration-200 
                ${getVariantClasses()}
                ${disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 blur-[0.3px]'
                    : variant === 'blank' 
                        ? 'hover:text-gray-700' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                } ${className}`}
        >
            {text}
        </button>
    )
}