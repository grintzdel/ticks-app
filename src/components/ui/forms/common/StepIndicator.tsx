interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export default function StepIndicator({currentStep, totalSteps}: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-start mb-7">
            {Array.from({length: totalSteps}).map((_, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`
                w-3 h-3 rounded-full 
                ${index + 1 <= currentStep
                            ? 'bg-[#007AFF]'
                            : 'border border-[#B9B9C3]'
                        }
              `}
                    />
                    {index < totalSteps - 1 && (
                        <div className="mx-[6px] w-6 h-[1px] bg-[#B9B9C3]"/>
                    )}
                </div>
            ))}
        </div>
    )
}