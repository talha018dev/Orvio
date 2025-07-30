import { ClientsListType, CollaboratorsListType, SingleClientsListType, UserDetailsType } from "@/features/users/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const getCollaboratorsList = async (): Promise<CollaboratorsListType> => {
    return await axiosRequest({
        url: `/user/collaborators`,
        method: "get",
    })
}
export const getClientsList = async (): Promise<ClientsListType> => {
    return await axiosRequest({
        url: `/user/clients`,
        method: "get",
    })
}
export const getClientDetails = async (clientId: string | null): Promise<SingleClientsListType> => {
    return await axiosRequest({
        url: `/user/${clientId}`,
        method: "get",
    })
}
export const createClient = async (projectData: any) => {
    return await axiosRequest({
        url: `/auth/sign-up/invite`,
        method: "post",
        data: projectData,
    })
}
export const addExistingClientToProject = async (projectData: any) => {
    return await axiosRequest({
        url: `/project/add-client`,
        method: "patch",
        data: projectData,
    })
}

export const getUsersList = async (pagination: any) => {
    return await axiosRequest({
        url: `/user`,
        method: "get",
        params: pagination
    })
}
export const createUser = async (userData: any) => {
    return await axiosRequest({
        url: `/auth/sign-up/invite`,
        method: "post",
        data: userData,
        // data: userData?.formData,
        // contentType: 'multipart/form-data'
    })
}
export const getIncompleteUser = async () => {
    return await axiosRequest({
        url: `/user/incomplete-user`,
        method: "get",
    })
}
export const getUserDetails = async (userId: string): Promise<UserDetailsType> => {
    return await axiosRequest({
        url: `/user/${userId}`,
        method: "get",
    })
}
export const updateUserStatus = async (userData?: any) => {
    return await axiosRequest({
        url: `/user/status/${userData?.userId}`,
        method: "put",
        data: userData
    })
}