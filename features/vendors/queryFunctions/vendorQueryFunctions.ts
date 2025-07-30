import {PlansListType, SinglePlanType} from '@/features/vendors/types/types'
import {axiosRequest} from '@/utils/axios-utils'

export const getVendorsList = async (pagination: any) => {
  return await axiosRequest({
    url: `/vendor`,
    method: 'get',
    params: pagination,
  })
}
export const inviteVendor = async (email: string) => {
  return await axiosRequest({
    url: `/auth/vendor/invite`,
    method: 'post',
    data: {email},
  })
}
export const reinviteVendor = async (vendorId: string) => {
  return await axiosRequest({
    url: `/auth/vendor/resend-invite/${vendorId}`,
    method: 'post',
  })
}
export const getEinDetails = async (ein: string) => {
  return await axiosRequest({
    url: `/vendor/ein/${ein}`,
    method: 'get',
  })
}
export const getPlansList = async (): Promise<PlansListType> => {
  return await axiosRequest({
    url: `/plan`,
    method: 'get',
  })
}
export const getPlanDetails = async (planId: string): Promise<SinglePlanType> => {
  return await axiosRequest({
    url: `/plan/${planId}`,
    method: 'get',
  })
}

export const vendorTokenVerification = async (vendorData: {token: string}) => {
  return await axiosRequest({
    url: `/auth/vendor-token/verify`,
    method: 'post',
    data: vendorData,
  })
}
export const vendorSelfSignUp = async (vendorData: string) => {
  return await axiosRequest({
    url: `/auth/vendor/self-signup`,
    method: 'post',
    data: vendorData,
  })
}
