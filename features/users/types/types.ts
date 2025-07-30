
export type CollaboratorsListType = {
    _id: string
    created_by?: string
    clientId: string
    email: string
    name: string
    phone: string
    status: string
    role: string
    registrationType: string
    isVerified: boolean
    isRegistered: boolean
    deactivateDate: any
    verificationCode: any
    avatar: any
    lastLogin?: string
    createdAt: string
    updatedAt: string
    __v: number
    createdBy?: string
    stripeCustomerId: any
    receiveUpdate?: string
}[]


export type ClientsListType = SingleClientsListType[]

export interface SingleClientsListType {
  _id: string
  createdBy: string
  email: string
  name: string
  phone: string
  status: any
  role: string
  registrationType: string
  isVerified: boolean
  isRegistered: boolean
  deactivateDate: any
  verificationCode: any
  avatar: any
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  address: Address
}

export interface Address {
  _id: string
  createdBy: string
  userId: string
  addressLine?: string
  zipCode?: string
  city?: string
  state?: string
  country?: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface UsersListType {
  data: SingleUserType[]
  count: number
}

export interface SingleUserType {
  _id: string
  createdBy: string
  email: string
  name: string
  phone: string
  status: 'active' | 'inactive' | 'invited'
  role: string
  registrationType: string
  isVerified: boolean
  isRegistered: boolean
  deactivateDate: any
  verificationCode: any
  avatar: any
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}





export type IncompleteUsersType = SingleIncompleteUserType[]

export interface SingleIncompleteUserType {
  _id: string
  createdBy: string
  email: string
  name: string
  phone: string
  status: 'active' | 'inactive' | 'invited'
  role: string
  registrationType: string
  isVerified: boolean
  isRegistered: boolean
  deactivateDate: any
  verificationCode: any
  avatar: any
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  address: Address
  user: any[]
  allUser: any[]
}

export interface Address {
  _id: string
  createdBy: string
  userId: string
  addressLine?: string
  zip: any
  city?: string
  state?: string
  country?: string
  status: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}



export interface UserDetailsType {
  _id: string
  createdBy: string
  email: string
  name: string
  phone: string
  status: 'active' | 'inactive' | 'invited'
  role: string
  registrationType: string
  isVerified: boolean
  isRegistered: boolean
  deactivateDate: any
  verificationCode: any
  avatar: any
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  address: Address
}

export interface Address {
  _id: string
  createdBy: string
  userId: string
  addressLine?: string
  zip: any
  city?: string
  state?: string
  country?: string
  status: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}
