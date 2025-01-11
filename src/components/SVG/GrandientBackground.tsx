export default function GradientBackground() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
            <svg
                width="1600"
                height="900"
                viewBox="0 0 1600 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-full h-full object-cover object-center"
                preserveAspectRatio="xMidYMid slice"
            >
                <g filter="url(#filter0_f_1101_4843)">
                    <path
                        d="M549.588 823.346C697.046 274.452 1217.97 227.732 1460 272.984C1823.48 313.344 1847.6 -71.909 1559.06 -119.607C1270.51 -167.305 1034.51 -114.103 598.683 312.427C162.854 738.957 88.7807 479.37 -65.3959 757.303C-219.572 1035.24 365.265 1509.46 549.588 823.346Z"
                        fill="url(#paint0_linear_1101_4843)"/>
                </g>
                <g filter="url(#filter1_f_1101_4843)">
                    <path
                        d="M650.91 916.259C774.272 432.162 1210.08 390.958 1412.56 430.868C1716.64 466.463 1736.82 126.689 1495.42 84.6221C1254.03 42.5549 1056.59 89.476 691.983 465.654C327.372 841.832 265.403 612.889 136.42 858.012C7.43728 1103.13 496.707 1521.38 650.91 916.259Z"
                        fill="url(#paint1_linear_1101_4843)"/>
                </g>
                <defs>
                    <filter id="filter0_f_1101_4843" x="-207.667" y="-250.667" width="2080.56" height="1544.63"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="58.3333" result="effect1_foregroundBlur_1101_4843"/>
                    </filter>
                    <filter id="filter1_f_1101_4843" x="-18.3336" y="-61.4051" width="1812.04" height="1423.17"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="66.6667" result="effect1_foregroundBlur_1101_4843"/>
                    </filter>
                    <linearGradient id="paint0_linear_1101_4843" x1="1768.55" y1="720.07" x2="-99.1185" y2="683.248"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8FECF0"/>
                        <stop offset="0.333333" stopColor="#A29DDF"/>
                        <stop offset="0.666667" stopColor="#607ED3"/>
                        <stop offset="0.849598" stopColor="#607ED3"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1101_4843" x1="1670.69" y1="825.175" x2="108.147" y2="795.953"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8FECF0"/>
                        <stop offset="0.333333" stopColor="#A29DDF"/>
                        <stop offset="0.666667" stopColor="#607ED3"/>
                        <stop offset="0.849598" stopColor="#607ED3"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}