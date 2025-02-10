'use client'

import GradientBackground from '@/components/SVG/GradientBackground'
import RegisterFormWrapper from '@/components/ui/forms/register/RegisterFormWrapper'
import StepIndicator from '@/components/ui/forms/common/StepIndicator'
import {REGISTER_STEPS} from '@/utils/auth/RegisterSteps'
import {useState, useEffect} from 'react'
import {getTempToken} from '@/store/auth/tempToken'
import {getRegistrationStep} from '@/store/auth/registrationState'

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1)
    const currentStepData = REGISTER_STEPS[currentStep]

    useEffect(() => {
        const savedStep = getRegistrationStep()
        const tempToken = getTempToken()

        if (savedStep && tempToken) {
            setCurrentStep(savedStep)
        }
    }, [])

    return (
        <>
            <GradientBackground/>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-screen h-screen m-0 rounded-none p-6 bg-white
                    sm:w-[80%] sm:h-auto sm:rounded-2xl sm:px-[5%] sm:py-[4%]
                    md:w-[70%] md:px-[8%] md:py-[4%]
                    lg:w-[44%] lg:px-[8%] lg:py-[5%] shadow-2xl">
                    <div className="flex flex-col justify-center w-full h-full">
                        <StepIndicator currentStep={currentStep} totalSteps={4}/>
                        <h1 className="text-2xl font-bold mb-6
                            md:text-[28px] 
                            lg:text-[32px] lg:mb-8">
                            {currentStepData.title}
                        </h1>
                        {currentStepData.description && (
                            <p className="font-light text-[#4F4F4F] mb-8 text-sm leading-5
                                md:text-base 
                                lg:mb-10">
                                {currentStepData.description}
                            </p>
                        )}
                        <RegisterFormWrapper currentStep={currentStep} onStepChange={setCurrentStep}/>
                    </div>
                </div>
            </div>
        </>
    )
}