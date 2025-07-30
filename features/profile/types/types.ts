export interface ProfileDetailsType {
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
    address: Address
}

export interface Address {
    _id: string
    createdBy: string
    userId: string
    addressLine: any
    city: any
    state: any
    country: any
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    zip: any
    clientId: string
}
