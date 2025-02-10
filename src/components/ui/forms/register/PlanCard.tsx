'use client'

import CheckIcon from '@/components/SVG/icons/CheckIcon'
import CrossIcon from '@/components/SVG/icons/CrossIcon'

interface PlanCardProps {
    id: string
    name: string
    description: string
    features: { text: string; available: boolean }[]
    price: {
        amount: string
        unit: string
    }
    recommended?: boolean
    isSelected: boolean | null
    onSelect: (id: string) => void
}

export default function PlanCard({
                                     id,
                                     name,
                                     description,
                                     features,
                                     price,
                                     recommended,
                                     isSelected,
                                     onSelect
                                 }: PlanCardProps) {

    const getOpacityClass = () => {
        if (isSelected === null) return ''
        return !isSelected ? 'opacity-50 blur-[0.3px]' : ''
    }

    return (
        <div
            onClick={() => onSelect(id)}
            className={`py-8 px-5 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                recommended ? 'border-[#E7E7E8] border-[0.77px] shadow-premium' : 'border-[#E7E7E8]'
            } ${getOpacityClass()}`}
        >
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            {description && (
                <p className="text-[#4D525F] text-base">{description}</p>
            )}

            <hr className="my-2"/>

            <div className="flex flex-wrap gap-2 mb-[10px]">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-[6px]">
                        <div className={`rounded-full p-[6px] ${
                            feature.available
                                ? 'bg-[#ECF0FB]'
                                : 'bg-red-100'
                        }`}>
                            {feature.available ? (
                                <CheckIcon className="w-4 h-4 text-blue-500"/>
                            ) : (
                                <CrossIcon className="w-4 h-4 text-red-500"/>
                            )}
                        </div>
                        <span className="text-[#4D525F] text-xs">
                            {feature.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="text-start">
                <div className="flex items-baseline">
                    <span className="text-[37px] font-bold">{price.amount}</span>
                    <span className="text-[10px] text-[#4D525F]">{price.unit}</span>
                </div>
            </div>
        </div>
    )
}