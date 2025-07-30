import { getActivityDetailsByBoardId } from "@/features/activity/queryFunctions/activityQueryFunctions"
import { queryOptions } from "@tanstack/react-query"

export function getActivityDetailsByBoardIdQueryOptions(boardId: string) {
    return queryOptions({
        queryKey: ['getActivityDetailsByBoardId', boardId],
        queryFn: () => getActivityDetailsByBoardId(boardId),
        enabled: !!(boardId && boardId !== 'unavailableBoard'),
        staleTime: 0
    })
}