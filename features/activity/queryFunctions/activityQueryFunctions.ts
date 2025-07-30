import { ActivityDetailsType } from "@/features/activity/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const getActivityDetailsByBoardId = async (boardId: string): Promise<ActivityDetailsType> => {
    return await axiosRequest({
        url: `board/activity/${boardId}`,
        method: "get",
    })
}