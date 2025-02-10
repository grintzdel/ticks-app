import {LogoProps} from "@/components/SVG/logos/LogoProps";

export default function TrelloLogo({className}: LogoProps) {
    return (
        <svg className={className}
             xmlns="http://www.w3.org/2000/svg"
             width="800"
             height="800"
             preserveAspectRatio="xMidYMid"
             viewBox="0 0 256 256"
        >
            <defs>
                <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#0091E6"></stop>
                    <stop offset="100%" stopColor="#0079BF"></stop>
                </linearGradient>
            </defs>
            <rect width="256" height="256" fill="url(#linearGradient-1)" rx="25"></rect>
            <rect
                width="78.08"
                height="112"
                x="144.64"
                y="33.28"
                fill="#FFF"
                rx="12"
            ></rect>
            <rect
                width="78.08"
                height="176"
                x="33.28"
                y="33.28"
                fill="#FFF"
                rx="12"
            ></rect>
        </svg>
    );
}