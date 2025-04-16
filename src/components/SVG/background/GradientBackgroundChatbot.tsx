import {IconsProps} from "@/components/SVG/icons/IconsProps"

export default function GradientBackgroundChatbot({className}: IconsProps) {
    return (
        <div className="fixed bottom-0 inset-0 w-full h-full -z-10 overflow-hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="1600"
                height="900"
                viewBox="0 0 1600 900"
                className="absolute bottom-[-20%] right-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <g filter="url(#filter0_f_1933_10535)">
                    <circle cx="904" cy="590.914" r="140" fill="#3772D9"></circle>
                </g>
                <g filter="url(#filter1_f_1933_10535)">
                    <circle cx="707" cy="707.914" r="207" fill="#7648DF"></circle>
                </g>
                <defs>
                    <filter
                        id="filter0_f_1933_10535"
                        x="464"
                        y="150.914"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        ></feBlend>
                        <feGaussianBlur
                            result="effect1_foregroundBlur_1933_10535"
                            stdDeviation="150"
                        ></feGaussianBlur>
                    </filter>
                    <filter
                        id="filter1_f_1933_10535"
                        x="0"
                        y="0.914"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        ></feBlend>
                        <feGaussianBlur
                            result="effect1_foregroundBlur_1933_10535"
                            stdDeviation="250"
                        ></feGaussianBlur>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}