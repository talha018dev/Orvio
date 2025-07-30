import { StageDetailsType } from "@/features/stages/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const createStage = async (stageData?: any) => {
    return await axiosRequest({
        url: `/stage/template`,
        method: "post",
        data: stageData
    })
}
export const updateStage = async (stageData?: any) => {
    return await axiosRequest({
        url: `/stage/template/${stageData?.stageId}`,
        method: "patch",
        data: stageData
    })
}

export const getStagesList = async (pagination: any) => {
    return await axiosRequest({
        url: `/stage/template`,
        method: "get",
        params: pagination
    })
}

export const getStageDetails = async (stageId: string): Promise<StageDetailsType> => {
    return await axiosRequest({
        url: `/stage/template/${stageId}`,
        method: "get",
    })
}

export const updateStageStatus = async (stageData?: any) => {
    return await axiosRequest({
        url: `/stage/template/${stageData?.stageId}`,
        method: "put",
        data: stageData
    })
}