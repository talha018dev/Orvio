export type ZipCodeDetailsType = {
  zip: string
  latitude: number
  longitude: number
  city: string
  state: string
  country: string
}


export type ProjectDetailsType = {
  budget: number
  startDate: string
  endDate: any
  document: string
  _id: string
  createdBy: string
  name: string
  type: string
  brief: string
  status: string
  isSetupDone: boolean
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  contract: Contract
  files: {
    _id: string
    createdBy: string
    name: string
    url: string
    key: any
    uploadedDate: string
    size: any
    expirationDate: string
    type: string
    status: string
    projectId: string
    createdAt: string
    updatedAt: string
    __v: number
  }[]
  collaborators: Collaborator[]
  client: Client
  otherUsers: {
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
    address: any
    __v: number
  }[]
}

export interface Contract {
  _id: string
  createdBy: string
  budget: number
  startDate: string
  endDate: any
  status: string
  projectId: string
  clientId: string
  createdAt: string
  document: string
  updatedAt: string
  __v: number

}

export interface Collaborator {
  _id: string
  createdBy: string
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
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}





export type IncompleteProjectDetailsType = Root2[]

export interface Root2 {
  _id: string
  createdBy: string
  name: string
  type: string
  brief: string
  status: string
  isSetupDone: boolean
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}





export type ActiveProjectsListType = {
  data: SingleActiveProjectsListType[]
  count: number
}

export interface SingleActiveProjectsListType {
  _id: string
  boardId: string
  createdBy: string
  name: string
  type: string
  brief: string
  status: 'active' | 'upcoming' | 'completed'
  isSetupDone: boolean
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  contract: Contract
  client?: Client
  collaborators: Collaborator[]
}


export interface Client {
  _id: string
  createdBy: string
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
  stripeCustomerId: any
  receiveUpdate: string
  lastLogin: string
  clientId: string
  address: any
  createdAt: string
  updatedAt: string
  __v: number
}

export type CreateProjectStepOneType = {
  createdBy: string
  name: string
  type: string
  brief: string
  status: string
  isSetupDone: boolean
  clientId: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
