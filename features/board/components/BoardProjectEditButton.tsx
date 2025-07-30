'use client'

import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { getBoardDetailsStatusByIdQueryOptions } from '@/features/board/queryOptions/boardQueryOptions'
import { cn } from '@/utils/tailwind-merge'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

type BoardProjectEditButtonProps = {
    projectId: string
    boardId: string
    projectName: string
}

const BoardProjectEditButton = ({ projectId, boardId, projectName }: BoardProjectEditButtonProps) => {
    const { data: boardDetails, isFetching: boardDetailsLoader, refetch: refetchBoardDetails } = useQuery(getBoardDetailsStatusByIdQueryOptions(boardId))

    return (
        <Link
            className={cn('ml-auto')}
            href={boardDetails?.status === 'completed' ? '#' : `/board/${projectId}/${boardId}/edit?projectName=${projectName}`}
        >
            <div className={cn("flex items-center gap-1 border border-borderColor bg-white text-primaryText hover:bg-transparent focus:bg-transparent justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg", {'bg-disabledColor hover:bg-disabledColor cursor-not-allowed': boardDetails?.status === 'completed'})}>
                <Icon name={"PencilSimpleLine"} color={COLOR_PRIMARY_TEXT} fontSize={14} />
                <div>Edit</div>
            </div>
        </Link>
    )
}

export default BoardProjectEditButton