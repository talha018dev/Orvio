'use client'

import Icon from '@/components/UI/Icon'
import { useWindowSize } from '@/hooks/useWindowSize'
import { cn } from '@/utils/tailwind-merge'
import React, { useEffect, useRef, useState } from 'react'

const ActivitySteps2 = ({ boardId, activityDetails, activityDetailsLoader }: { boardId: 'unavailableBoard' | string & {}, activityDetails: any, activityDetailsLoader: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [gap, setGap] = useState<number | null>(null);
    const [clipValue, setClipValue] = useState<string>('0px')
    const [containerWidth, setContainerWidth] = useState(0)

    const windowSize = useWindowSize()

    const [totalSteps, setTotalSteps] = useState(0)
    const [inProgress, setInProgress] = useState(0)
    const [done, setDone] = useState(0)

    const calculateGap = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const children = Array.from(container.children) as HTMLDivElement[];

        const containerWidthLocal = container.getBoundingClientRect().width;
        const totalChildrenWidth = children.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);

        const numberOfGaps = children.length - 1;
        const computedGap = numberOfGaps > 0 ? (containerWidthLocal - totalChildrenWidth) / numberOfGaps : 0;

        const clip =
            done + inProgress === totalSteps ? '100%' :
                inProgress + done === 1 ? '0px' :
                    `${(done + inProgress) * (computedGap + 32) - computedGap}px`

        setGap(computedGap);
        setClipValue(clip)
        setContainerWidth(containerWidthLocal)
    };

    useEffect(() => {
        if (boardId !== 'unavailableBoard') {
            calculateGap()
        }
    }, [windowSize, boardId, done, inProgress, totalSteps])

    useEffect(() => {
        if (!activityDetailsLoader && activityDetails) {
            setTotalSteps(activityDetails?.totalStep)
            setInProgress(!activityDetails?.currentStepName ? 0 : activityDetails?.currentStepName?.split(',')?.length ?? 0)
            setDone(activityDetails?.doneStep)
        }
    }, [activityDetailsLoader, activityDetails])

    if (activityDetailsLoader) {
        return (
            <section className='bg-white rounded-xl'>
                <div className='w-full h-6 bg-pageBgColor rounded-full animate-pulse' />
                <div className='w-1/2 h-5 mt-4 bg-pageBgColor rounded-md animate-pulse' />
                <div className='w-1/3 h-5 mt-2 bg-pageBgColor rounded-md animate-pulse' />
            </section>
        )
    }

    if (boardId === 'unavailableBoard') {
        return (
            <section>
                <div className='text-sm text-secondaryText '>
                    <span className='text-primaryText'>
                        0
                    </span> out of 0
                    stages are completed.
                </div>
                <div className='text-sm text-secondaryText mt-2'><span className='text-primaryText'>(n/a)</span> stage(s) are ongoing.</div>
            </section>
        )
    }

    return (
        <>
            {
                totalSteps < 2 ? null :
                    <section className={`relative w-full h-6 overflow-hidden [--gap-size:${gap}px]`}>
                        <div
                            className={cn("absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-[#F79D00] to-[#059669] rounded-full z-100", { 'bg-pageBgColor': inProgress === 1 && done === 0 && inProgress + done === totalSteps })}
                            style={{
                                clipPath: `polygon(0px 0px, ${clipValue} 0px, ${clipValue} 100%, 0px 100%)`
                                // clipPath: `polygon(0px 0px, ${clipPathValue} 0px, ${clipPathValue} 100%, 0px 100%)`
                                // clipPath: `polygon(0px 0px, 50% 0px, 50% 100%, 0px 100%)`
                            }}
                        />
                        <div className='absolute top-0 left-0 w-full h-6 bg-pageBgColor z-10 rounded-full'></div>
                        <div className={cn("relative z-1000 h-full flex overflow-x-auto overflow-y-hidden w-full bg-transparent rounded-full")}>
                            <section
                                ref={containerRef}
                                className={cn(
                                    "flex gap-0 mx-2 justify-between items-center flex-grow flex-shrink min-w-max",
                                    { 'ml-0': inProgress === 1 && done === 0 },
                                    { 'ml-[4.5px]': inProgress + done === 1 },
                                    { 'ml-0': inProgress === 1 && inProgress + done === 1 })
                                }
                            >
                                {Array.from({ length: totalSteps }, (_, index) => {
                                    const currentItem = index + 1

                                    if (index < done) {
                                        return (
                                            <div
                                                key={currentItem}
                                                className={cn(
                                                    'bg-white mx-1 flex items-center justify-center text-center rounded-full h-4 w-4 flex-shrink-0',
                                                    { 'ml-0': currentItem === 1 },
                                                    { 'test-svg relative': currentItem === done + inProgress && currentItem !== totalSteps },
                                                )}
                                            >
                                                <Icon name="Check" color="" fontSize={12} />
                                            </div>
                                        )
                                    }

                                    return (
                                        <div
                                            key={currentItem}
                                            style={{
                                                "--before-width": `${gap ?? 0}px`,
                                                "--after-width": `${currentItem === totalSteps ? 12 : gap ?? 0}px`,
                                            } as React.CSSProperties}
                                            className={cn(
                                                `mx-1 text-xs flex items-center justify-center text-primaryText h-6 w-6`,
                                                { 'mr-0 ': currentItem === totalSteps },
                                                { 'ml-0 border-2 border-[#F79D00] rounded-full': currentItem === 1 && inProgress + done === 1 },
                                                { 'todoStageStep relative': currentItem >= done + inProgress + 1 },
                                                { 'test-svg relative': currentItem === done + inProgress && currentItem !== totalSteps },
                                                { 'bg-pageBgColor text-secondaryText': currentItem > inProgress + done },
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex items-center justify-center size-5 rounded-full',
                                                    { 'bg-white': currentItem <= done + inProgress },
                                                    // { 'ml-0 border-2 border-inProgressColor text-inProgressText rounded-full': currentItem === 1 && inProgress + done === 1 },
                                                )}
                                            >
                                                {index + 1}
                                            </div>
                                        </div>
                                    )
                                })}
                            </section>
                        </div>
                    </section>
            }
            <div className={cn('text-sm text-secondaryText mt-4', { 'mt-0': totalSteps < 2 })}>
                <span className='text-primaryText'>
                    {activityDetails?.doneStep}
                </span> out of&nbsp;
                {activityDetails?.totalStep} stages are completed.
            </div>
            <div className='text-sm text-secondaryText mt-2'><span className='text-primaryText  break-all'>({boardId === 'unavailableBoard' || !activityDetails?.currentStepName ? 'n/a' : activityDetails?.currentStepName})</span> stage(s) are ongoing.</div>
        </>
    )
}

export default ActivitySteps2
