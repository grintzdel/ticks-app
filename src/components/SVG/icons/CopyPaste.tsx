import {IconsProps} from "@/components/SVG/icons/IconsProps"

export default function CopyPaste({className}: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 36 36"
        >
            <circle cx="17.921" cy="17.58" r="17.58" fill="#DDD9FB"></circle>
            <path
                fill="#DDD9FB"
                d="M24.036 15.287h-6.88c-.844 0-1.528.684-1.528 1.529v6.879c0 .844.684 1.529 1.529 1.529h6.879c.844 0 1.528-.685 1.528-1.53v-6.878c0-.845-.684-1.529-1.528-1.529"
            ></path>
            <path
                fill="#DDD9FB"
                d="M12.57 19.873h-.764a1.53 1.53 0 0 1-1.529-1.529v-6.879a1.53 1.53 0 0 1 1.529-1.528h6.88a1.53 1.53 0 0 1 1.528 1.528v.765"
            ></path>
            <path
                stroke="#5E31BD"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.529"
                d="M12.57 19.873h-.764a1.53 1.53 0 0 1-1.529-1.529v-6.879a1.53 1.53 0 0 1 1.529-1.528h6.88a1.53 1.53 0 0 1 1.528 1.528v.765m-3.057 3.057h6.879c.844 0 1.528.684 1.528 1.529v6.879c0 .844-.684 1.529-1.528 1.529h-6.88a1.53 1.53 0 0 1-1.528-1.53v-6.878c0-.845.684-1.529 1.529-1.529"
            ></path>
        </svg>
    );
}