import EmptyListView from '@/components/EmptyListView'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/UI/Accordion'
import BoardDetailsTaskStatusDropdown from '@/features/board/components/BoardDetailsTaskStatusDropdown'
import SingleTask from '@/features/board/components/SingleTask'
import { updateStageTaskPositionInBoard } from '@/features/board/queryFunctions/boardQueryFunctions'
import { Todo } from '@/features/board/types/types'
import { useMutation } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { createSwapy, SlotItemMapArray, Swapy } from 'swapy'

type SingleBoardListItemProps = {
    stage: Todo
    index: number
    container: RefObject<HTMLDivElement | null>
    swapy: RefObject<Swapy | null>
    accordionUpdated: boolean
    setAccordionUpdated: any
    currentTab: 'ToDo' | 'InProgress' | 'Done'
    boardId: string
    projectId: string
    stageMap: Map<string, string>
}

const SingleBoardListItem = ({ stage, index, accordionUpdated, setAccordionUpdated, currentTab, boardId, projectId, stageMap }: SingleBoardListItemProps) => {

    const swapy = useRef<Swapy | null>(null)
    const container = useRef<HTMLDivElement | null>(null)
    const updateStageTaskPositionInBoardMutation = useMutation({ mutationFn: updateStageTaskPositionInBoard })

    const [items, setItems] = useState<SlotItemMapArray | null>(null)


    useEffect(() => {
        if (container.current) {
            swapy.current = createSwapy(container.current, {
                animation: 'spring',
                // dragAxis: 'y',
                autoScrollOnDrag: true,
            })
            updatePositionOnSwapEnd(swapy)
        }
        return () => {
            swapy.current?.destroy()
            setAccordionUpdated(false)
        }
    }, [accordionUpdated])

    const updatePositionOnSwapEnd = (swapy: React.RefObject<Swapy | null>) => {
        swapy?.current?.onSwapEnd((event) => {
            setItems(event?.slotItemMap?.asArray)

            const newStageTaskPositionArray = event?.slotItemMap?.asArray.map((item, index) => {
                const [id, rest] = item?.item?.split('/@@SPLIT@@/');
                // const [name, position] = rest.split('/@@POSITION@@/');
                return {
                    taskId: id,
                    taskName: rest,
                    position: index
                }
            })

            const updatedData = {
                stageId: stage?._id,
                tasks: newStageTaskPositionArray
            }

            updateStageTaskPositionInBoardMutation.mutate(updatedData,
                {
                    onSuccess: (data: any) => {
                    },
                    onError: (error: any) => {
                        if (error?.data?.message) {
                        }
                    },
                }
            )
        })
    }

    return (
        <AccordionItem key={stage?._id} value={stage?._id} className='rounded-lg bg-white relative !overflow-visible'>
            <AccordionTrigger className='w-full text-left text-primaryText cursor-pointer py-4 px-2 mb-4 data-closed:mb-0 data-expanded:mb-0'>
                <div className='flex items-start justify-between'>
                    <div className='break-all max-w-[85%]'>{stage?.name}</div>
                    <ChevronDown className='h-4 w-4 min-w-4 mt-1 text-primaryText transition-transform duration-200 group-data-expanded:-rotate-180 ' />
                </div>
            </AccordionTrigger>
            <BoardDetailsTaskStatusDropdown
                currentTab={currentTab}
                stageId={stage?._id}
                boardId={boardId}
                projectId={projectId}
            />
            <AccordionContent className=''>
                <div ref={container} className="relative min-h-[40px] flex flex-col gap-2 px-2 pb-2">
                    {
                        stage?.tasks?.length ? stage?.tasks?.map((task, index) => {
                            return (
                                <SingleTask
                                    key={task?._id}
                                    task={task}
                                    index={index}
                                    stage={stage}
                                    stageMap={stageMap}
                                    boardId={boardId}
                                />
                            )
                        }) : <EmptyListView text={'No task found'} className='mt-0 py-6' />
                    }
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default SingleBoardListItem