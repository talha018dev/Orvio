import { getBoardDetailsById, getBoardDetailsStatusById, getTaskDetailsById } from "@/features/board/queryFunctions/boardQueryFunctions"
import { queryOptions } from "@tanstack/react-query"

export function getBoardDetailsStatusByIdQueryOptions(boardId: string) {
    return queryOptions({
        queryKey: ['getBoardDetailsStatusById', boardId],
        queryFn: () => getBoardDetailsStatusById(boardId),
        enabled: !!boardId,
        staleTime: 0
    })
}
export function getBoardDetailsByIdQueryOptions(boardId: string) {
    return queryOptions({
        queryKey: ['getBoardDetailsById', boardId],
        queryFn: () => getBoardDetailsById(boardId),
        enabled: !!boardId,
        staleTime: 0
    })
}
export function getTaskDetailsByIdQueryOptions(taskId: string, drawerVisibility: 'Open' | 'Closed') {
    return queryOptions({
        queryKey: ['getTaskDetailsById', taskId],
        queryFn: () => getTaskDetailsById(taskId),
        enabled: !!(taskId && drawerVisibility === 'Open'),
        staleTime: 0
    })
}