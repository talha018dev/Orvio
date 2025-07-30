import Icon from '@/components/UI/Icon'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'

const ActivitySteps = () => {
    const totalSteps = 10
    const inProgress = 1
    const done = 1

    const calculateWhiteDivWidth = () => {
        const completedSteps = done + inProgress
        const remainingSteps = totalSteps - completedSteps
        const adjustMentWidth = (((done + inProgress) === totalSteps) ? 0 : 1)

        let whiteDivWidth = (remainingSteps / totalSteps) * 100 + adjustMentWidth
        // @ts-ignore
        if (inProgress === 1 && done === 0) {
            whiteDivWidth = 0
        }
        return whiteDivWidth
    }

    return (
        <div className="relative overflow-hidden w-full">
            {/* @ts-ignore */}
            <div className={cn("absolute inset-0 bg-gradient-to-r from-[#F79D00] to-[#059669] z-0 rounded-full", { 'bg-transparent': inProgress === 1 && done === 0 })} />
            <div
                className="absolute inset-0 rounded-r-[13px] z-10 bg-pageBgColor"
                style={{
                    // width: `${100 - ((done + inProgress) / totalSteps) * 100 + (((done + inProgress) === totalSteps) ? 0 : 4)}%`,
                    width: `${calculateWhiteDivWidth()}%`,
                    left: 'auto',
                    right: 0,
                }}
            />
            <div className={cn("relative z-20 ml-[5px] flex items-center justify-between gap-1 rounded-full text-xs min-w-fit",)}>
                {
                    Array.from({ length: totalSteps }, (_, index) => {
                        if (index < done) {
                            return (
                                // <div key={index + 1} className='w-6 h-6'>
                                <div key={index + 1}
                                    className={cn('bg-white flex items-center justify-center text-center rounded-full h-4 w-4 flex-shrink-0', { 'ml-0': index + 1 === 1 })}
                                >
                                    <Icon name={'Check'} color={''} fontSize={12} />
                                </div>
                                // </div>
                            )
                        }

                        return (
                            <div
                                className={cn
                                    (' m-0.5 flex items-center text-secondaryText justify-center text-center rounded-full h-6 w-6 flex-shrink-0',
                                        //@ts-ignore
                                        { 'border-2 border-inProgressColor text-inProgressText bg-white': inProgress === 1 && done === 0 && index + 1 === 1 },
                                        { 'bg-white': index + 1 <= done + inProgress },
                                        { 'test-svg relative': (index + 1 === done + inProgress && index + 1 !== 1) },
                                    )}
                                key={index + 1}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </div>




    )
}

export default ActivitySteps