import {platforms} from '@/utils/auth/platformsData'

interface PlatformCardProps {
    platformId: keyof typeof platforms
    onLink: (nextStep: number) => void
}

export default function PlatformCard({platformId, onLink}: PlatformCardProps) {
    const platform = platforms[platformId]
    const Logo = platform.logo

    return (
        <div
            className="flex items-center justify-between py-3 px-2 border-[#D0D5DD] rounded-lg bg-[#F9F8FF] bg-opacity-90 ">
            <div className="flex items-center gap-5">
                <Logo className="w-14 h-14"/>
                <span className="text-lg font-semibold">{platform.name}</span>
            </div>
            <button
                onClick={() => onLink(platform.nextStep)}
                className="px-6 py-2 text-white border-none rounded-full text-[15px] bg-[#3772D9] font-semibold"
            >
                Lier
            </button>
        </div>
    )
}