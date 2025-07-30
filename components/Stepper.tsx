import Icon from "@/components/UI/Icon"
import { COLOR_WHITE } from "@/constants/colorConstants"
import { cn } from "@/utils/tailwind-merge"
import React from "react"
import { ClassNameValue } from "tailwind-merge"

type StepperProps = {
    currentStep: number
    maxLength?: number
    className?: ClassNameValue
}

const Stepper = ({ currentStep, maxLength = 3, className = '' }: StepperProps) => {
    return (
        <div className={cn("flex items-center gap-2 justify-center", className)}>
            {Array.from({ length: maxLength }, (_, i) => {
                const step = i + 1
                const isComplete = currentStep > step
                const isCurrent = currentStep === step

                return (
                    <React.Fragment key={step}>
                        <p
                            className={cn(
                                "size-9 py-1.5 px-3.5 flex items-center justify-center rounded-full bg-white text-primaryText text-sm",
                                {
                                    'text-primary border-2 border-primary': isCurrent,
                                    'bg-primary py-0 px-2': isComplete,
                                }
                            )}
                        >
                            {isComplete ? <Icon name="Check" color={COLOR_WHITE} fontSize={40} /> : step}
                        </p>
                        {step < maxLength && (
                            <p
                                className={cn("w-full h-1 bg-lightGray rounded-full", {
                                    'bg-primary': currentStep > step,
                                })}
                            />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Stepper