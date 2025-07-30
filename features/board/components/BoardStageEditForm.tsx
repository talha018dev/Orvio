'use client'

import { getBoardDetailsByIdQueryOptions } from '@/features/board/queryOptions/boardQueryOptions'
import CreateStageForm from '@/features/stages/components/CreateStageForm'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type BoardStageEditFormProps = {
    boardId: string
    projectId: string
    projectName: string
}

const BoardStageEditForm = ({ boardId, projectId, projectName }: BoardStageEditFormProps) => {
    const { data: boardDetails, isFetching: boardDetailsLoader } = useQuery(getBoardDetailsByIdQueryOptions(boardId))

    return (
        <div>
            <CreateStageForm
                boardDetails={boardDetails}
                boardDetailsLoader={boardDetailsLoader}
                formType={'boardEdit'}
                projectId={projectId}
                projectName={projectName}
            // stageId={stageId === 'blank' ? undefined : stageId}
            />
        </div>
    )
}

export default BoardStageEditForm