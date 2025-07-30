import { ProfileDetailsType } from "@/features/profile/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const getProfileDetails = async (userId: string): Promise<ProfileDetailsType> => {
    return await axiosRequest({
        url: `/user/${userId}`,
        method: "get",
    })
}

export const uploadProfileImage = async (userData: any) => {
    return await axiosRequest({
        url: `user/avatar`,
        method: "post",
        data: userData,
        contentType: 'multipart/form-data'
    })
}
export const updateProfile = async (userData: any) => {
    return await axiosRequest({
        url: `user/${userData?.userId}`,
        method: "patch",
        data: userData,
    })
}
export const changeUserPassword = async (userData: any) => {
    return await axiosRequest({
        url: `user/change-password/${userData?.userId}`,
        method: "patch",
        data: userData,
    })
}