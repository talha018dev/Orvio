import DropDown from '@/components/UI/Dropdown'
import Icon from '@/components/UI/Icon'
import { updateStageTasksStatusInBoard } from '@/features/board/queryFunctions/boardQueryFunctions'
import { cn } from '@/utils/tailwind-merge'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const BoardDetailsTaskStatusDropdown = ({ currentTab, stageId, boardId, projectId, }: { currentTab: 'ToDo' | 'InProgress' | 'Done', stageId: string, boardId: string, projectId: string, }) => {
    const updateStageTasksStatusInBoardMutation = useMutation({ mutationFn: updateStageTasksStatusInBoard })
    const queryClient = useQueryClient()

    const statusChangeActions = {
        ToDo: [
            { label: 'Move all task to in progress', target: 'InProgress' },
            { label: 'Move all task to done', target: 'Done' },
        ],
        InProgress: [
            { label: 'Move all task to todo', target: 'ToDo' },
            { label: 'Move all task to done', target: 'Done' },
        ],
        Done: [
            { label: 'Move all task to todo', target: 'ToDo' },
            { label: 'Move all task to in progress', target: 'InProgress' },
        ],
    } as const

    useEffect(() => {
        return () => {
            if (updateStageTasksStatusInBoardMutation.isPending) {
                queryClient.invalidateQueries({ queryKey: ['getBoardDetailsStatusById', boardId] })
            }
        }
    }, [updateStageTasksStatusInBoardMutation.isPending])

    const moveAllTasks = (target: 'ToDo' | 'InProgress' | 'Done') => {
        const updatedData = {
            stageId,
            from: currentTab === 'ToDo' ? 'todo' : currentTab === 'InProgress' ? 'in progress' : 'done',
            to: target === 'ToDo' ? 'todo' : target === 'InProgress' ? 'in progress' : 'done'
        }

        updateStageTasksStatusInBoardMutation?.mutate(updatedData,
            {
                // onSuccess(data, variables, context) {
                //     queryClient.invalidateQueries({ queryKey: ['getBoardDetailsStatusById', boardId] })
                // },
                onError: (error, variables, context) => {

                },
                onSettled: () => {
                    queryClient.invalidateQueries({ queryKey: ['getBoardDetailsStatusById', boardId] })
                }
            }
        )
    }

    const currentActions = statusChangeActions[currentTab ?? 'ToDo'] || [];

    return (
        <div className='absolute top-4 h-full right-12 leading-4 text-right w-1/2'>
            {
                updateStageTasksStatusInBoardMutation?.isPending ?
                    <div className={cn
                        ('absolute top-[-83px] right-[-66px] max-w-(--max-width) w-[100dvw] cursor-not-allowed bg-transparent h-10 rounded-full',
                            { 'h-34 top-[-180px] rounded-xl': currentTab === 'Done' }
                        )}>

                    </div> : null
            }
            <DropDown
                button={
                    <>
                        {
                            updateStageTasksStatusInBoardMutation?.isPending ?
                                <div className='flex justify-end mt-1'>
                                    <Icon name={'Loader'} color={''} className='animate-spin' />
                                </div> :
                                <div className='cursor-pointer h-4 w-4 min-w-4 flex ml-auto'>...</div>
                        }
                    </>
                }
            >
                <div className='text-left'>
                    {currentActions.map(({ label, target }) => (
                        <div
                            key={target}
                            onClick={() => moveAllTasks(target)}
                            className='py-1.5 px-3 hover:bg-pageBgColor rounded-lg cursor-pointer transition-all duration-300'
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </DropDown>
        </div>
    )
}

export default BoardDetailsTaskStatusDropdown