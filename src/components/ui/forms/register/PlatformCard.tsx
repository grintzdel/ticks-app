import {platforms} from '@/utils/auth/platformsData'

import SubmitButton from '@/components/ui/buttons/auth/SubmitButton'

interface PlatformCardProps {
    platformId: keyof typeof platforms
    onLink: (nextStep: number) => void
}

export default function PlatformCard({platformId, onLink}: PlatformCardProps) {
    const platform = platforms[platformId]
    const Logo = platform.logo

    const handleClick = () => {
        onLink(platform.nextStep)
    }

    return (
        <div
            className="flex items-center justify-between py-3 px-2 border border-[#D0D5DD] rounded-lg bg-[#F9F8FF] bg-opacity-90">
            <div className="flex items-center gap-5">
                <Logo className="w-14 h-14"/>
                <span className="text-lg font-semibold">{platform.name}</span>
            </div>
            <SubmitButton text="Lier" variant="rounded-sm" type="button" onClick={handleClick} />
        </div>
    )
}