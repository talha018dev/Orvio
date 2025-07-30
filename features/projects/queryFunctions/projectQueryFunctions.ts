import { ActiveProjectsListType, IncompleteProjectDetailsType, ProjectDetailsType, ZipCodeDetailsType } from "@/features/projects/types/types"
import { axiosRequest } from "@/utils/axios-utils"

export const createProject = async (projectData: any) => {
    return await axiosRequest({
        url: `/project`,
        method: "post",
        data: projectData?.formData,
        contentType: 'multipart/form-data'
    })
}
export const updateProject = async (projectData: any, projectId?: string) => {
    return await axiosRequest({
        url: `/project/${projectData?.projectId}`,
        method: "patch",
        data: projectData?.formData,
        contentType: 'multipart/form-data'
    })
}
export const deleteTemporaryProjectUpdate = async (projectData?: any) => {
    return await axiosRequest({
        url: `/project/discard/${projectData?.projectId}`,
        method: "delete",
    })
}
export const addProjectFileLinks = async (fileData?: any) => {
    return await axiosRequest({
        url: `/project/add-files`,
        method: "put",
        data: fileData
    })
}

export const getZipCodeDetails = async (zipCode: string): Promise<ZipCodeDetailsType> => {
    return await axiosRequest({
        url: `/address/zip/${zipCode}`,
        method: "get",
    })
}
export const getProjectDetails = async (projectId: string): Promise<ProjectDetailsType> => {
    return await axiosRequest({
        url: `/project/${projectId}`,
        method: "get",
    })
}
export const getTemporaryProjectDetails = async (projectId: string): Promise<ProjectDetailsType> => {
    return await axiosRequest({
        url: `/project/temporary/${projectId}`,
        method: "get",
    })
}
export const getIncompleteProjectDetails = async (): Promise<IncompleteProjectDetailsType> => {
    return await axiosRequest({
        url: `/project/incomplete-setup`,
        method: "get",
    })
}
export const getActiveProjectListDropdown = async (pagination: any): Promise<ActiveProjectsListType> => {
    return await axiosRequest({
        url: `/project/active`,
        method: "get",
        params: pagination
    })
}
export const getAllProjectsListDropdown = async (pagination: any): Promise<ActiveProjectsListType> => {
    return await axiosRequest({
        url: `/project/all`,
        method: "get",
        params: pagination
    })
}
export const getAllProjectsList = async (pagination: any) => {
    return await axiosRequest({
        url: `/project/all`,
        method: "get",
        params: pagination
    })
}
export const getProjectsListByUserId = async (pagination: any, userId: string) => {
    return await axiosRequest({
        url: `/project/user/${userId}`,
        method: "get",
        params: pagination
    })
}
export const getActiveProjectsList = async (pagination: any) => {
    return await axiosRequest({
        url: `/project/active`,
        method: "get",
        params: pagination
    })
}
export const getUpcomingProjectsList = async (pagination: any) => {
    return await axiosRequest({
        url: `/project/upcoming`,
        method: "get",
        params: pagination
    })
}
export const getCompletedProjectsList = async (pagination: any) => {
    return await axiosRequest({
        url: `/project/completed`,
        method: "get",
        params: pagination
    })
}