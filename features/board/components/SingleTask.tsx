import { AvatarCircles } from '@/components/UI/AvatarCircles'
import Icon from '@/components/UI/Icon'
import { COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import EditTaskDrawer from '@/features/board/components/EditTaskDrawer'
import TaskStatus from '@/features/board/components/TaskStatus'
import { Task, Todo } from '@/features/board/types/types'
import { getCollaboratorsListQueryOptions } from '@/features/users/queryOptions/userQueryOptions'
import { formatDate, formatDate2 } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type SingleTaskProps = {
    task: Task
    index: number
    stage: Todo
    stageMap: Map<string, string>
    boardId: string
}

const SingleTask = ({ task, index, stage, stageMap, boardId }: SingleTaskProps) => {
    const [drawerVisibility, setDrawerVisibility] = React.useState<'Open' | 'Closed'>('Closed')
    const { data: collaboratorsList } = useQuery(getCollaboratorsListQueryOptions())
    const [collaboratorsMap, setCollaboratorsMap] = useState<Map<any, any>>(new Map())

    useEffect(() => {
        if (collaboratorsList?.length) {
            const map = new Map()
            collaboratorsList?.forEach((collaborator) => {
                map.set(collaborator?._id, collaborator)
            })
            setCollaboratorsMap(map)
        }
    }, [collaboratorsList?.length])


    return (
        <div data-swapy-slot={task?._id} key={task?._id}>
            <div
                // /@@POSITION@@/${task?.position ?? index + 1}
                data-swapy-item={`${task?._id}/@@SPLIT@@/${task?.name}`}
                key={task?._id}
                className='bg-pageBgColor text-sm text-primaryText rounded-lg py-2 px-3 pl-1 flex items-center gap-2'
            >
                <div data-swapy-handle className='cursor-grab focus:cursor-grabbing active:cursor-grabbing h-full'>
                    <Icon name={'DotsSixVertical'} color='' fontSize={14} />
                </div>
                <div className='w-full'>
                    <div className='flex items-start gap-2'>
                        <div className='text-sm text-primaryText break-all text-wrap w-full'>{task?.name}</div>
                        {/* <div className='ml-auto mb-auto flex flex-col justify-between gap-2'> */}
                            <TaskStatus status={task?.status} className='ml-auto min-w-fit' />

                        {/* </div> */}
                    </div>
                    <div>
                        {
                            !task?.dependentOn?.length && !task?.collaboratorIds?.length && !task?.startDate && !task?.endDate ?
                                <div onClick={() => setDrawerVisibility('Open')} className='bg-darkGray inline-block p-1 rounded-full mt-2 cursor-pointer'>
                                    <Icon name={'Plus'} color={COLOR_SECONDARY_TEXT} fontSize={12} />
                                </div> :
                                <div className='flex items-center mt-3 w-full gap-2'>
                                    {
                                        task?.collaboratorIds.length ?
                                            <div className='flex items-center space-x-2'>
                                                <AvatarCircles
                                                    numPeople={Math.max(task?.collaboratorIds.length - 3, 0)}
                                                    avatarUrls={task?.collaboratorIds?.slice(0, 3)?.map((collaborator) => {
                                                        const getInitials = collaboratorsMap?.get(collaborator)?.name?.split(' ').slice(0, 2).map((word: string) => word[0]).join('').toUpperCase();
                                                        return {
                                                            imageUrl: null,
                                                            profileName: getInitials
                                                        }
                                                    })}
                                                />
                                            </div> : null
                                    }
                                    {
                                        task?.startDate && task?.endDate ?
                                            <div className='flex items-center gap-1'>
                                                <div className='ml-auto'>
                                                    <Icon name={'CalendarDots'} color={COLOR_SECONDARY_TEXT} weight='regular' />
                                                </div>
                                                <div className='text-primaryText mr-3'>{`${formatDate2(task?.startDate)} - ${formatDate2(task?.endDate)}`}</div>
                                            </div> : null
                                    }

                                    <Icon name={'Link'} color={'#B45309'} weight='regular' fontSize={14} />
                                    <div>{task?.dependentOn?.length ?? 0}</div>
                                    {
                                        !task?.dependentOn?.length && !task?.collaboratorIds?.length && !task?.startDate && !task?.endDate ? null :
                                            <div onClick={() => setDrawerVisibility('Open')} className='bg-darkGray p-1 inline-block rounded-full mt-auto ml-auto cursor-pointer'>
                                                <Icon name={'PencilSimpleLine'} color={COLOR_SECONDARY_TEXT} fontSize={12} weight='regular' />
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                    <EditTaskDrawer
                        task={task}
                        index={index}
                        drawerVisibility={drawerVisibility}
                        setDrawerVisibility={setDrawerVisibility}
                        stageMap={stageMap}
                        boardId={boardId}
                        collaboratorsMap={collaboratorsMap}
                        setCollaboratorsMap={setCollaboratorsMap}
                    />
                </div>
                {/* <div className='ml-auto mb-auto flex flex-col justify-between gap-2'>
                    <TaskStatus status={task?.status} className='ml-auto' />
                    {
                        !task?.dependentOn?.length && !task?.collaboratorIds?.length && !task?.startDate && !task?.endDate ? null :
                            <div onClick={() => setDrawerVisibility('Open')} className='bg-darkGray p-1 inline-block rounded-full mt-auto ml-auto cursor-pointer'>
                                <Icon name={'PencilSimpleLine'} color={COLOR_SECONDARY_TEXT} fontSize={12} weight='regular' />
                            </div>
                    }
                </div> */}
            </div>
        </div>
    )
}

export default SingleTask