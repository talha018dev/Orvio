'use client'

import { Accordion } from '@/components/UI/Accordion'
import Icon from '@/components/UI/Icon'
import SingleBoardListItem from '@/features/board/components/SingleBoardListItem'
import { BoardDetailsStatusType } from '@/features/board/types/types'
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton'
import { cn } from '@/utils/tailwind-merge'
import { useRef, useState } from 'react'
import { Swapy } from 'swapy'

export type OptionType = {
    value: string;
    label: string;
    role?: string;

};

type BoardItemProps = {
    listItems: BoardDetailsStatusType['todo'] | undefined
    listItemsLoader: boolean
    currentTab: 'ToDo' | 'InProgress' | 'Done'
    boardId: string
    projectId: string
    boardDetails: BoardDetailsStatusType | undefined
}

const BoardItems = ({ listItems, listItemsLoader, currentTab, boardId, projectId, boardDetails }: BoardItemProps) => {
    const swapy = useRef<Swapy | null>(null)
    const container = useRef<HTMLDivElement | null>(null)
    const [accordionUpdated, setAccordionUpdated] = useState(false)

    if (listItemsLoader) return <ProjectListSkeleton skeletonClassName='h-14' className='mt-6' />
    let stageMap: Map<string, string> = new Map()

    return (
        <section className={cn('bg-pageBgColor text-primaryText mt-7', { 'relative': boardDetails?.status === 'completed' && currentTab === 'Done' })}>
            {
                boardDetails?.status === 'completed' && currentTab === 'Done' ? <div className='absolute z-[1000] top-0 left-0 size-full cursor-not-allowed bg-white/50' /> : null
            }
            <>
                <Accordion
                    onValueChange={() => {
                        setAccordionUpdated(true)
                    }}
                    className='flex w-full flex-col gap-4 '
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    {
                        listItems?.length ? listItems?.map((stage, index) => {
                            stageMap.set(stage?._id, stage?.name)

                            return (
                                <SingleBoardListItem
                                    key={stage?._id}
                                    stage={stage}
                                    index={index}
                                    container={container}
                                    swapy={swapy}
                                    accordionUpdated={accordionUpdated}
                                    setAccordionUpdated={setAccordionUpdated}
                                    currentTab={currentTab}
                                    boardId={boardId}
                                    projectId={projectId}
                                    stageMap={stageMap}
                                />
                            )
                        }) :
                            <div className={cn('flex items-center flex-col mt-10')}>
                                <Icon name={'Rows'} color={'#94A3B8'} weight='regular' fontSize={24} />
                                <div className='text-sm text-primaryText mt-2'>No stage and task found</div>
                                <div className='text-xs text-secondaryText mt-2'>Get started by adding stage and task on edit page</div>
                            </div>
                    }
                </Accordion>
            </>

        </section>
    )
}

export default BoardItems
