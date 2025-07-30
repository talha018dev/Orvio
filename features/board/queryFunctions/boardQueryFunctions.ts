import { BoardDetailsStatusType, BoardDetailsType, TaskDetailsType } from "@/features/board/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const getBoardDetailsStatusById = async (boardId: string): Promise<BoardDetailsStatusType> => {
    return await axiosRequest({
        url: `board/status/${boardId}`,
        method: "get",
    })
}
export const getBoardDetailsById = async (boardId: string): Promise<BoardDetailsType> => {
    return await axiosRequest({
        url: `board/${boardId}`,
        method: "get",
    })
}
export const getTaskDetailsById = async (taskId: string): Promise<TaskDetailsType> => {
    return await axiosRequest({
        url: `task/${taskId}`,
        method: "get",
    })
}

export const createBoard = async (stageData?: any) => {
    return await axiosRequest({
        url: `/board`,
        method: "post",
        data: stageData
    })
}
export const editBoard = async (stageData?: any) => {
    return await axiosRequest({
        url: `/board/${stageData?.boardId}`,
        method: "patch",
        data: stageData
    })
}

export const updateStageTaskPositionInBoard = async (stageData?: any) => {
    return await axiosRequest({
        url: `/stage/update-position`,
        method: "patch",
        data: stageData
    })
}
export const updateStageTasksStatusInBoard = async (stageData?: any) => {
    return await axiosRequest({
        url: `/task/bulk-status-update`,
        method: "put",
        data: stageData
    })
}
export const updateBoardProjectStatus = async (boardId: string) => {
    return await axiosRequest({
        url: `/board/completed/${boardId}`,
        method: "patch",
    })
}
export const updateTaskDetailsInBoard = async (taskData?: any) => {
    return await axiosRequest({
        url: `/task/${taskData?.id}`,
        method: "patch",
        data: taskData
    })
}