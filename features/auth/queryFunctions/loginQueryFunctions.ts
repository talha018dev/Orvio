import { axiosRequest } from "@/utils/axios-utils"

export const login = async (loginData: any) => {
    return await axiosRequest({
        url: `/auth/sign-in`,
        method: "post",
        data: loginData,
    })
}
export const forgotPassword = async (email: string) => {
    return await axiosRequest({
        url: `/auth/forgot-password`,
        method: "post",
        data: { email },
    })
}

export const verifyResetLink = async (verifyData: any) => {
    return await axiosRequest({
        url: '/auth/token/verify',
        method: 'post',
        data: verifyData,
    })
}

export const resetPassword = async (data: any) => {
    return await axiosRequest({
        url: `/auth/reset-password`,
        method: "post",
        data: data,
    })
}
export const setupPassword = async (data: any) => {
    return await axiosRequest({
        url: `/auth/set-password`,
        method: "post",
        data: data,
    })
}
export const warmup = async () => {
    return await axiosRequest({
        url: `/client/warmup`,
        method: "get",
    })
}