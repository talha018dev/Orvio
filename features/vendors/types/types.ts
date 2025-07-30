export interface VendorsListType {
  data: SingleVendorsListType[]
  count: number
}

export interface SingleVendorsListType {
  _id: string
  createdBy: string
  email: string
  name: any
  phone: any
  status: 'invited' | 'active'
  ein: any
  vendorAdminId: any
  currentPlanId: any
  stripeCustomerId: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}





export type PlansListType = SinglePlanType[]

export interface SinglePlanType {
  _id: string
  name: string
  clientId: string
  __v: number
  _originalBackup: any
  activationDate: string
  alternatePlanId: any
  createdAt: string
  createdBy: string
  deactivationDate: string
  discountPercent: any
  features: any[]
  isPopular: boolean
  limits: Limits
  pricing: Pricing
  status: string
  updatedAt: string
  description?: string
}

export interface Limits {
  projects: number
  users: number
  stages: number
  templates: number
}

export interface Pricing {
  monthly: number
  yearly: number
}


export interface VendorSignUpInfoType {
  vendorEmail: string | undefined
  vendorName: string | undefined
  vendorPhone: string | undefined
  ein: string | undefined
  email: string | undefined
  name: string | undefined
  phone: string | undefined
  receiveUpdate: string | undefined
  password: string | undefined
  confirmPassword: string | undefined
  plan: SinglePlanType | undefined
  planId: string | undefined
  
}
