import {IconsProps} from "@/components/SVG/icons/IconsProps"

export default function AddToBin({className}: IconsProps) {
    return (
        <div
            className="flex items-center p-2 bg-[#C5DFF8] rounded-[6px] cursor-pointer hover:bg-white border border-[#C5DFF8] transition">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                viewBox="0 0 19 19"
            >
                <path
                    stroke="#2E5EC7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.384"
                    d="M2.61 5.074h13.582M14.682 5.074V15.64c0 .754-.755 1.51-1.51 1.51H5.627c-.754 0-1.509-.756-1.509-1.51V5.074"
                ></path>
                <path
                    stroke="#2E5EC7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.384"
                    d="M6.38 5.075v-1.51c0-.754.755-1.508 1.51-1.508h3.019c.754 0 1.509.754 1.509 1.509v1.51M7.889 8.848v4.527M10.91 8.848v4.527"
                ></path>
            </svg>
        </div>

    );
}