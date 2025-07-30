'use client'

import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { updateBoardProjectStatus, updateStageTasksStatusInBoard } from '@/features/board/queryFunctions/boardQueryFunctions'
import { BoardDetailsStatusType } from '@/features/board/types/types'
import { cn } from '@/utils/tailwind-merge'
import { Checkbox } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type ProjectDoneCheckboxProps = {
    boardDetails: BoardDetailsStatusType | undefined
    boardDetailsLoader: boolean
}

const ProjectDoneCheckbox = ({ boardDetails, boardDetailsLoader }: ProjectDoneCheckboxProps) => {
    console.log(' ProjectDoneCheckbox - boardDetails:', boardDetails)
    const queryClient = useQueryClient()
    const updateStageTasksStatusInBoardMutation = useMutation({ mutationFn: updateStageTasksStatusInBoard })
    const updateBoardProjectStatusMutation = useMutation({ mutationFn: updateBoardProjectStatus })

    const moveStageToDone = async (stageId: string, from: 'todo' | 'in progress') => {
        await updateStageTasksStatusInBoard({ stageId, from, to: 'done' })
        // optional: invalidate per stage here
    }

    const moveAllTasksToDone = async () => {
        const todoPromises = boardDetails?.todo?.map(stage =>
            stage?._id ? moveStageToDone(stage._id, 'todo') : Promise.resolve()
        ) ?? []

        const inProgressPromises = boardDetails?.inprogress?.map(stage =>
            stage?._id ? moveStageToDone(stage._id, 'in progress') : Promise.resolve()
        ) ?? []

        await Promise.all([...todoPromises, ...inProgressPromises])
    }

    const changeProjectStatus = () => {
        updateBoardProjectStatusMutation?.mutate(boardDetails?._id ?? '', {
            onError: () => { },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: ['getBoardDetailsStatusById', boardDetails?._id]
                })
            },
        })
    }


    const checkboxOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            await moveAllTasksToDone()
        }
        changeProjectStatus()
    }

    return (
        <section className={cn("bg-white p-4 rounded-xl mt-6", { 'min-h-18 animate-pulse': boardDetailsLoader })}>
            {
                updateStageTasksStatusInBoardMutation?.isPending || updateBoardProjectStatusMutation?.isPending ?
                    <div className='fixed top-0 left-0 size-full bg-red-50/50 z-[100000]  flex items-center justify-center'>
                        <Icon name={'Loader'} color={''} className='animate-spin' fontSize={40} />
                    </div> : null
            }
            {
                boardDetailsLoader ? null :
                    <Checkbox
                        label="Complete the project by ticking this box. Project information edits won’t be allowed after that."
                        size="sm"
                        color={COLOR_PRIMARY}
                        defaultChecked={boardDetails?.status === 'completed'}
                        onChange={(e) => {
                            checkboxOnChange(e)
                            console.log(e.currentTarget.checked)
                        }}
                    />
            }
        </section>
    )
}

export default ProjectDoneCheckbox